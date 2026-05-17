import { useState } from 'react'
import { GLOSSAR } from '../data/glossar'

export function GlossarFull() {
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? GLOSSAR.filter(e =>
        e.term.toLowerCase().includes(search.toLowerCase()) ||
        (e.abbrev?.toLowerCase().includes(search.toLowerCase())) ||
        e.definition.toLowerCase().includes(search.toLowerCase())
      )
    : GLOSSAR

  return (
    <div className="glossar-full">
      <div className="glossar-search-wrap">
        <input
          className="glossar-search"
          type="search"
          placeholder="Begriff suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Glossar durchsuchen"
        />
        <span className="glossar-count">{filtered.length} Einträge</span>
      </div>
      <div className="glossar-list">
        {filtered.map(entry => (
          <div key={entry.id} className="glossar-entry">
            <div className="glossar-entry-left">
              <span className="glossar-entry-term">{entry.term}</span>
              {entry.abbrev && (
                <span className="glossar-entry-abbrev">{entry.abbrev}</span>
              )}
            </div>
            <div className="glossar-entry-body">
              <p className="glossar-entry-def">{entry.definition}</p>
            </div>
            {entry.image && (
              <div className="glossar-entry-img-wrap">
                <img
                  className="glossar-entry-img"
                  src={entry.image}
                  alt={entry.term}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
