import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { compactContext, textHighlightHref, useTextHighlights, type TextHighlight } from '../lib/highlights'

function formatDate(value: number): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
}

function sendToChat(message: string) {
  document.dispatchEvent(new CustomEvent('bim:chat-send', { detail: { message } }))
}

function HighlightEntry({ highlight, onRemove }: {
  highlight: TextHighlight
  onRemove: (id: string) => void
}) {
  const locationLabel = highlight.headingTitle
    ? `${highlight.title} · ${highlight.headingTitle}`
    : highlight.title
  const context = compactContext(highlight.context)

  return (
    <article className="markierung-entry">
      <div className="markierung-swatch" aria-hidden="true" />
      <div className="markierung-body">
        <div className="markierung-head">
          <Link className="markierung-location" to={textHighlightHref(highlight)}>
            {locationLabel}
          </Link>
          {highlight.part && <span className="glossar-tag glossar-tag--typ">{highlight.part}</span>}
        </div>

        <p className="markierung-quote">{highlight.text}</p>
        {context && <p className="markierung-context">{context}</p>}

        <div className="markierung-meta">
          <span>{formatDate(highlight.createdAt)}</span>
          <div className="markierung-actions">
            <button
              className="markierung-action"
              onClick={() => sendToChat(`Erkläre mir diese markierte Stelle: „${highlight.text}"\n\nKontext: ${context}\n\nQuelle: ${locationLabel}`)}
            >
              KI fragen
            </button>
            <button
              className="markierung-action"
              onClick={() => sendToChat(`Visualisiere mir diesen Begriff oder Abschnitt anschaulich: „${highlight.text}"\n\nKontext: ${context}\n\nQuelle: ${locationLabel}`)}
            >
              Visualisieren
            </button>
            <button className="markierung-action markierung-action--danger" onClick={() => onRemove(highlight.id)}>
              Entfernen
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function MarkierungenFull() {
  const { highlights, remove } = useTextHighlights()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return highlights
    return highlights.filter(highlight => {
      const haystack = [
        highlight.text,
        highlight.context,
        highlight.title,
        highlight.headingTitle,
        highlight.part,
      ].filter(Boolean).join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [highlights, search])

  return (
    <div className="markierungen-full">
      <div className="glossar-filter-bar">
        <input
          className="glossar-search"
          type="search"
          placeholder="Markierungen suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Markierungen durchsuchen"
        />
        <span className="glossar-count">{filtered.length} Markierungen</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">
          {highlights.length === 0
            ? 'Noch keine Textstellen markiert.'
            : 'Keine Markierungen für diese Suche.'}
        </p>
      ) : (
        <div className="markierung-list">
          {filtered.map(highlight => (
            <HighlightEntry key={highlight.id} highlight={highlight} onRemove={remove} />
          ))}
        </div>
      )}
    </div>
  )
}
