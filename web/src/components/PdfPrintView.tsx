import { useEffect } from 'react'
import { PARTS, getContent } from '../chapters'
import { PrintMarkdownPage } from './PrintMarkdownPage'

const SKIP_PART_LABEL = new Set(['Überblick', 'Nachschlagewerke'])

interface Props {
  onDone: () => void
}

export function PdfPrintView({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => window.print(), 500)
    const handleAfterPrint = () => onDone()
    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [onDone])

  return (
    <div id="pdf-print-view">
      {/* Cover page */}
      <div className="pdf-cover">
        <div className="pdf-cover-inner">
          <p className="pdf-cover-eyebrow">Kompendium</p>
          <h1 className="pdf-cover-title">BIM</h1>
          <p className="pdf-cover-subtitle">
            Architektur · Bauphysik · Digitale Planungsmethoden
          </p>
          <div className="pdf-cover-rule" />
          <p className="pdf-cover-year">{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* All chapters */}
      {PARTS.flatMap(part =>
        part.chapters
          .filter(ch => ch.id !== 'index')
          .map(chapter => (
            <section key={chapter.id} className="pdf-chapter">
              {chapter.coverImage && (
                <div className="pdf-chapter-hero">
                  <img
                    src={chapter.coverImage}
                    alt=""
                    aria-hidden="true"
                    className="pdf-chapter-hero-img"
                    loading="eager"
                  />
                </div>
              )}
              <header className="pdf-chapter-header">
                {!SKIP_PART_LABEL.has(part.title) && (
                  <p className="pdf-chapter-part">{part.title}</p>
                )}
                <h1 className="pdf-chapter-h1">
                  {chapter.num && (
                    <span className="pdf-chapter-num">{chapter.num} · </span>
                  )}
                  {chapter.title}
                </h1>
              </header>
              <PrintMarkdownPage content={getContent(chapter.path)} />
            </section>
          ))
      )}
    </div>
  )
}
