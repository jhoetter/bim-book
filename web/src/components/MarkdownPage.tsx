import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import { preprocessMarkdown } from '../lib/markdown'
import { getBreadcrumb } from '../chapters'
import { applyTextHighlights, compactContext, getRangeQuote, useTextHighlights } from '../lib/highlights'
import { CalcUValue }   from './calculators/CalcUValue'
import { CalcDewPoint } from './calculators/CalcDewPoint'
import { CalcSound }    from './calculators/CalcSound'
import { CalcHoai }     from './calculators/CalcHoai'
import { GlossTooltip } from './GlossTooltip'
import { FormulaTooltip } from './FormulaTooltip'
import { GlossarFull } from './GlossarFull'
import { FormelSammlung } from './FormelSammlung'
import { IfcReferenz } from './IfcReferenz'
import { NormenReferenz } from './NormenReferenz'
import { SelfTestOverview } from './SelfTestOverview'
import { MarkierungenFull } from './MarkierungenFull'
import { QuellenReferenz } from './QuellenReferenz'
import { ImagePlaceholder } from './ImagePlaceholder'
import { AIHifi } from 'bim-icons'
import type { Components } from 'react-markdown'

const CALC_COMPONENTS = {
  'calc-u-value':    () => <CalcUValue />,
  'calc-dewpoint':   () => <CalcDewPoint />,
  'calc-sound':      () => <CalcSound />,
  'calc-hoai':       () => <CalcHoai />,
  'glossar-full':    () => <GlossarFull />,
  'formel-sammlung': () => <FormelSammlung />,
  'markierungen-full': () => <MarkierungenFull />,
  'selbsttest-uebersicht': () => <SelfTestOverview />,
  'ifc-referenz':    () => <IfcReferenz />,
  'normen-referenz': () => <NormenReferenz />,
  'quellen-referenz': () => <QuellenReferenz />,
} as unknown as Partial<Components>

interface LightboxState {
  src: string
  alt: string
}

interface SelectionPopoverState {
  x: number
  y: number
  text: string
  context: string
  prefix: string
  suffix: string
  pageOffset: number
  headingId?: string
  headingTitle?: string
  headingLevel?: number
}

interface Props {
  content: string
}

function imgIdFromSrc(src: string): string {
  const filename = src.split('/').pop() ?? src
  return 'img-' + filename.replace(/\.[^.]+$/, '')
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

function makeHeading(Tag: HeadingTag) {
  return function HeadingWithAnchor({ id, children, ...rest }: React.ComponentPropsWithoutRef<HeadingTag> & { id?: string }) {
    return (
      <Tag id={id} className="prose-heading" {...rest}>
        {children}
        {id && (
          <a href={`#${id}`} className="prose-anchor" aria-hidden="true">#</a>
        )}
      </Tag>
    )
  }
}

function MarkerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 1.5 12.5 5.5 6 12H2v-4L8.5 1.5Z" />
      <path d="M7 3 11 7" />
      <path d="M2 12h10" />
    </svg>
  )
}

function closestContextText(range: Range): string {
  const startEl = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer as Element
    : range.startContainer.parentElement
  const block = startEl?.closest('p, li, blockquote, td, th, figcaption, .admonition')
  return compactContext(block?.textContent ?? range.toString())
}

function cleanHeadingText(el: Element): string {
  const clone = el.cloneNode(true) as Element
  clone.querySelector('.prose-anchor')?.remove()
  return compactContext(clone.textContent ?? '')
}

function headingBeforeRange(root: HTMLElement, range: Range) {
  let current: { id: string; text: string; level: number } | null = null
  root.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]').forEach(el => {
    const position = el.compareDocumentPosition(range.startContainer)
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      current = { id: el.id, text: cleanHeadingText(el), level: parseInt(el.tagName[1], 10) }
    }
  })
  return current
}

export function MarkdownPage({ content }: Props) {
  const location = useLocation()
  const processed = preprocessMarkdown(content)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [selPopover, setSelPopover] = useState<SelectionPopoverState | null>(null)
  const proseRef = useRef<HTMLDivElement>(null)
  const selPopoverOpenedAtRef = useRef(0)
  const path = location.pathname.replace(/^\//, '') || 'index'
  const { part, chapter } = getBreadcrumb(location.pathname)
  const { highlights, add: addHighlight, remove: removeHighlight } = useTextHighlights()

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox])

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) { setSelPopover(null); return }
    const text = sel.toString().trim()
    if (!text) { setSelPopover(null); return }
    const range = sel.getRangeAt(0)
    if (!proseRef.current?.contains(range.commonAncestorContainer)) { setSelPopover(null); return }
    const quote = getRangeQuote(proseRef.current, range, sel.toString())
    if (!quote) { setSelPopover(null); return }
    const heading = headingBeforeRange(proseRef.current, range)
    const rect = range.getBoundingClientRect()
    selPopoverOpenedAtRef.current = Date.now()
    setSelPopover({
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: quote.text,
      context: closestContextText(range),
      prefix: quote.prefix,
      suffix: quote.suffix,
      pageOffset: quote.pageOffset,
      headingId: heading?.id,
      headingTitle: heading?.text,
      headingLevel: heading?.level,
    })
  }, [])

  useEffect(() => {
    const closeUnlessJustOpened = () => {
      if (Date.now() - selPopoverOpenedAtRef.current < 250) return
      setSelPopover(null)
    }
    const onMouseDown = (e: MouseEvent) => {
      const popoverEl = document.querySelector('.sel-popover')
      if (popoverEl && popoverEl.contains(e.target as Node)) return
      closeUnlessJustOpened()
    }
    const onScroll = () => closeUnlessJustOpened()
    document.addEventListener('mousedown', onMouseDown)
    const scrollRoot = document.querySelector('.content-area')
    scrollRoot?.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      scrollRoot?.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    applyTextHighlights(proseRef.current, highlights.filter(item => item.path === path))
    return () => { applyTextHighlights(null, []) }
  }, [highlights, path, processed])

  const askAI = useCallback((text: string) => {
    setSelPopover(null)
    window.getSelection()?.removeAllRanges()
    document.dispatchEvent(new CustomEvent('bim:chat-send', {
      detail: { message: `Erkläre mir diesen Abschnitt: „${text}"` },
    }))
  }, [])

  const markText = useCallback((selection: SelectionPopoverState) => {
    addHighlight({
      path,
      title: chapter ?? 'Überblick',
      part,
      headingId: selection.headingId,
      headingTitle: selection.headingTitle,
      headingLevel: selection.headingLevel,
      text: selection.text,
      context: selection.context,
      prefix: selection.prefix,
      suffix: selection.suffix,
      pageOffset: selection.pageOffset,
    })
    setSelPopover(null)
    window.getSelection()?.removeAllRanges()
  }, [addHighlight, chapter, part, path])

  const removeTextHighlight = useCallback((id: string) => {
    removeHighlight(id)
    setSelPopover(null)
    window.getSelection()?.removeAllRanges()
  }, [removeHighlight])

  const selectedHighlight = selPopover
    ? highlights.find(item => {
        if (item.path !== path) return false
        const itemStart = item.pageOffset
        const itemEnd = itemStart + item.text.length
        const selStart = selPopover.pageOffset
        const selEnd = selStart + selPopover.text.length
        return selStart < itemEnd && selEnd > itemStart
      })
    : undefined

  return (
    <>
      <div ref={proseRef} onMouseUp={handleMouseUp}>
      <div className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
          components={{
            ...CALC_COMPONENTS,
            'img-placeholder': (props: { node?: { properties?: Record<string, unknown> } }) =>
              <ImagePlaceholder
                node={props.node}
                onOpen={(src, alt) => setLightbox({ src, alt })}
              />,
            h1: makeHeading('h1'),
            h2: makeHeading('h2'),
            h3: makeHeading('h3'),
            h4: makeHeading('h4'),
            img({ src, alt }) {
              const id = src ? imgIdFromSrc(src) : undefined
              return (
                <figure id={id}>
                  <img
                    src={src}
                    alt={alt ?? ''}
                    loading="lazy"
                    onClick={() => src && setLightbox({ src, alt: alt ?? '' })}
                  />
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              )
            },
            span(props) {
              const { node, children, ...rest } = props as typeof props & { node?: { properties?: Record<string, unknown> } }
              const glossTerm = node?.properties?.dataGloss as string | undefined
              const formulaId = node?.properties?.dataFormula as string | undefined
              if (glossTerm) {
                return <GlossTooltip term={glossTerm}>{children}</GlossTooltip>
              }
              if (formulaId) {
                return <FormulaTooltip id={formulaId} />
              }
              return <span {...rest}>{children}</span>
            },
            a({ href, children, ...rest }) {
              const isExternal = href?.startsWith('http')
              if (href && !isExternal && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // Convert relative .md paths (../chapters/X.md, ./X.md) to router paths (/chapters/X)
                const to = href.startsWith('/')
                  ? href
                  : '/' + href.replace(/^(?:\.\.\/|\.\/)+/, '').replace(/\.md(#|$)/, '$1')
                return <Link to={to} {...rest}>{children}</Link>
              }
              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  {...rest}
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {processed}
        </ReactMarkdown>
      </div>
      </div>

      {selPopover && createPortal(
        <div
          className="sel-popover"
          style={{ left: selPopover.x, top: selPopover.y }}
        >
          {selectedHighlight ? (
            <button
              className="sel-popover__btn sel-popover__btn--remove"
              onMouseDown={e => e.preventDefault()}
              onClick={() => removeTextHighlight(selectedHighlight.id)}
            >
              <MarkerIcon />
              Aufheben
            </button>
          ) : (
            <button
              className="sel-popover__btn sel-popover__btn--marker"
              onMouseDown={e => e.preventDefault()}
              onClick={() => markText(selPopover)}
            >
              <MarkerIcon />
              Markieren
            </button>
          )}
          <button
            className="sel-popover__btn sel-popover__ai"
            onMouseDown={e => e.preventDefault()}
            onClick={() => askAI(selPopover.text)}
          >
            <AIHifi size={14} />
            Mit KI erklären
          </button>
        </div>,
        document.body
      )}

      {lightbox && createPortal(
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Schließen">
            ✕
          </button>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} />
            {lightbox.alt && (
              <p className="lightbox-caption">{lightbox.alt}</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
