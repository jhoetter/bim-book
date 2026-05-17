import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css'
import { preprocessMarkdown } from '../lib/markdown'

interface LightboxState {
  src: string
  alt: string
}

interface Props {
  content: string
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
            img({ src, alt }) {
              return (
                <figure>
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
