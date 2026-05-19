import { useState, useEffect, useCallback, useRef, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
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
import { bookmarkKey, useBookmarks } from '../lib/bookmarks'
import { getBreadcrumb } from '../chapters'
import { bookPath, normalizeBookPath } from '../books'
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
import { QuellenReferenz } from './QuellenReferenz'
import { ImagePlaceholder } from './ImagePlaceholder'
import { AIHifi } from 'bim-icons'
import type { Components } from 'react-markdown'
import { MarkierungenFull } from './MarkierungenFull'

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

function normalizeAssetSrc(src?: string): string | undefined {
  if (!src) return src
  if (/^(?:https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src
  const stripped = src.replace(/^(?:\.\.\/|\.\/)+/, '')
  return stripped.startsWith('assets/') ? `/${stripped}` : src
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingContext {
  path: string
  part: string | null
  pageTitle: string
  bookmarks: ReturnType<typeof useBookmarks>['bookmarks']
  toggleBookmark: ReturnType<typeof useBookmarks>['toggle']
}

function reactNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(reactNodeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return reactNodeText(node.props.children)
  return ''
}

function HeadingBookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M2.5 1.5A1 1 0 0 1 3.5.5h7a1 1 0 0 1 1 1v11.25a.25.25 0 0 1-.388.208L7 10.25l-4.112 2.708A.25.25 0 0 1 2.5 12.75V1.5Z" />
    </svg>
  )
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
  clone.querySelector('.prose-bookmark')?.remove()
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

function makeHeading(Tag: HeadingTag, ctx: HeadingContext) {
  return function HeadingWithAnchor({ id, children, ...rest }: ComponentPropsWithoutRef<HeadingTag> & { id?: string }) {
    const headingTitle = reactNodeText(children).trim()
    const headingLevel = parseInt(Tag[1], 10)
    const target = id
      ? { path: ctx.path, title: ctx.pageTitle, part: ctx.part, headingId: id, headingTitle, headingLevel }
      : null
    const isBookmarked = target ? ctx.bookmarks.some(b => bookmarkKey(b) === bookmarkKey(target)) : false

    return (
      <Tag id={id} className="prose-heading" {...rest}>
        {children}
        {id && (
          <a href={`#${id}`} className="prose-anchor" aria-hidden="true">#</a>
        )}
        {target && (
          <button
            type="button"
            className={`prose-bookmark${isBookmarked ? ' prose-bookmark--active' : ''}`}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              ctx.toggleBookmark(target)
            }}
            aria-label={isBookmarked ? 'Abschnittsmarker entfernen' : 'Abschnitt merken'}
            title={isBookmarked ? 'Abschnittsmarker entfernen' : 'Abschnitt merken'}
          >
            <HeadingBookmarkIcon filled={isBookmarked} />
          </button>
        )}
      </Tag>
    )
  }
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
  const { bookmarks, toggle: toggleBookmark } = useBookmarks()
  const { highlights, add: addHighlight, remove: removeHighlight } = useTextHighlights()
  const headingContext = { path, part, pageTitle: chapter ?? 'Überblick', bookmarks, toggleBookmark }

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
            h1: makeHeading('h1', headingContext),
            h2: makeHeading('h2', headingContext),
            h3: makeHeading('h3', headingContext),
            h4: makeHeading('h4', headingContext),
            img({ src, alt }) {
              const resolvedSrc = normalizeAssetSrc(src)
              const id = resolvedSrc ? imgIdFromSrc(resolvedSrc) : undefined
              return (
                <figure id={id}>
                  <img
                    src={resolvedSrc}
                    alt={alt ?? ''}
                    loading="lazy"
                    onClick={() => resolvedSrc && setLightbox({ src: resolvedSrc, alt: alt ?? '' })}
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
                // Convert relative .md paths (../chapters/X.md, ./X.md) to the active book route.
                const raw = href.startsWith('/')
                  ? href
                  : '/' + href.replace(/^(?:\.\.\/|\.\/)+/, '').replace(/\.md(#|$)/, '$1')
                const [rawPath, rawHash = ''] = raw.split('#')
                const normalizedPath = normalizeBookPath(rawPath)
                const to = normalizedPath.startsWith('chapters/') || normalizedPath.startsWith('appendix/') || ['index', 'glossar', 'markierungen', 'formelsammlung', 'selbsttests'].includes(normalizedPath)
                  ? `${bookPath(normalizedPath)}${rawHash ? `#${rawHash}` : ''}`
                  : raw
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
