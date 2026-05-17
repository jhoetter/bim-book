import { useEffect } from 'react'
import { PARTS, getContent } from '../chapters'
import type { Chapter, Part } from '../chapters'
import { PrintMarkdownPage } from './PrintMarkdownPage'

const SKIP_PART_LABEL = new Set(['Überblick', 'Nachschlagewerke', 'Anhang'])

interface Props {
  onDone: () => void
}

function ChapterSection({ chapter, part }: { chapter: Chapter; part: Part }) {
  const partLabel = !SKIP_PART_LABEL.has(part.title) ? part.title : null

  if (chapter.coverImage) {
    return (
      <div className="pdf-chapter">
        {/* Full-page chapter cover: image fills the page, title overlaid at bottom */}
        <div className="pdf-chapter-cover-page">
          <img
            src={chapter.coverImage}
            alt=""
            aria-hidden="true"
            className="pdf-chapter-cover-img"
            loading="eager"
          />
          <div className="pdf-chapter-cover-overlay">
            {partLabel && <p className="pdf-chapter-cover-part">{partLabel}</p>}
            <h1 className="pdf-chapter-cover-h1">
              {chapter.num && (
                <span className="pdf-chapter-cover-num">{chapter.num} · </span>
              )}
              {chapter.title}
            </h1>
          </div>
        </div>
        {/* Content page after the cover */}
        <div className="pdf-chapter-content">
          <PrintMarkdownPage content={getContent(chapter.path)} />
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-chapter">
      <header className="pdf-chapter-header">
        {partLabel && <p className="pdf-chapter-part">{partLabel}</p>}
        <h1 className="pdf-chapter-h1">
          {chapter.num && <span className="pdf-chapter-num">{chapter.num} · </span>}
          {chapter.title}
        </h1>
      </header>
      <PrintMarkdownPage content={getContent(chapter.path)} />
    </div>
  )
}

export function PdfPrintView({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => window.print(), 600)
    const handleAfterPrint = () => onDone()
    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [onDone])

  // Render Nachschlagewerke (Glossar, Formelsammlung) at the very end
  const mainParts = PARTS.filter(p => p.title !== 'Überblick' && p.title !== 'Nachschlagewerke')
  const nachschlageParts = PARTS.filter(p => p.title === 'Nachschlagewerke')
  const orderedParts = [...mainParts, ...nachschlageParts]

  return (
    <div id="pdf-print-view">
      {/* Simple title page */}
      <div className="pdf-cover">
        <div className="pdf-cover-inner">
          <p className="pdf-cover-eyebrow">Kompendium</p>
          <h1 className="pdf-cover-title">BIM</h1>
          <div className="pdf-cover-rule" />
          <p className="pdf-cover-subtitle">
            Architektur · Bauphysik · Digitale Planungsmethoden
          </p>
          <p className="pdf-cover-year">{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* All chapters in order, appendix last */}
      {orderedParts.flatMap(part =>
        part.chapters
          .filter(ch => ch.id !== 'index')
          .map(chapter => (
            <ChapterSection key={chapter.id} chapter={chapter} part={part} />
          ))
      )}
    </div>
  )
}
