import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
import { CalcUValue }   from './calculators/CalcUValue'
import { CalcDewPoint } from './calculators/CalcDewPoint'
import { CalcSound }    from './calculators/CalcSound'
import { CalcHoai }     from './calculators/CalcHoai'
import type { Components } from 'react-markdown'

const CALC_COMPONENTS = {
  'calc-u-value':  () => <CalcUValue />,
  'calc-dewpoint': () => <CalcDewPoint />,
  'calc-sound':    () => <CalcSound />,
  'calc-hoai':     () => <CalcHoai />,
} as unknown as Partial<Components>

interface LightboxState {
  src: string
  alt: string
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

export function MarkdownPage({ content }: Props) {
  const processed = preprocessMarkdown(content)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

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

  return (
    <>
      <div className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
          components={{
            ...CALC_COMPONENTS,
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
            a({ href, children, ...rest }) {
              const isExternal = href?.startsWith('http')
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
