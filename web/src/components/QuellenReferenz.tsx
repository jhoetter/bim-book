import { useMemo, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ALL_CHAPTERS } from '../chapters'
import { SOURCES, type SourceGroup, type SourceKind } from '../data/sources'
import { FilterPill, toggle } from './FilterPill'

type OpenFilter = 'gruppe' | 'typ' | 'kapitel' | null

const GROUP_ORDER: SourceGroup[] = [
  'Atlas-Reihe',
  'Grundlagen und Entwurf',
  'Baukonstruktion',
  'Holzbau',
  'Gebäudetechnik',
  'Sanierung und Denkmalpflege',
  'Recht und Verträge',
  'Bauausführung',
  'Zeichnen und Darstellung',
  'Digital und BIM',
  'Bauphysik',
  'Tragwerkslehre',
  'Normen und Gesetze',
]

const KIND_ORDER: SourceKind[] = ['Buch', 'Leitfaden', 'Norm/Gesetz', 'Standard/Daten', 'Skript']

const CHAPTERS = ALL_CHAPTERS.filter(chapter => chapter.num && !chapter.isReferencePage)
const CHAPTER_BY_ID = new Map(CHAPTERS.map(chapter => [chapter.id, chapter]))

export function QuellenReferenz() {
  const [search, setSearch] = useState('')
  const [activeGroups, setActiveGroups] = useState<Set<SourceGroup>>(new Set())
  const [activeKinds, setActiveKinds] = useState<Set<SourceKind>>(new Set())
  const [activeChapters, setActiveChapters] = useState<Set<string>>(new Set())
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openFilter) return
    const handleClick = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenFilter(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openFilter])

  function toggleOpen(key: NonNullable<OpenFilter>) {
    setOpenFilter(prev => prev === key ? null : key)
  }

  const chapterOptions = useMemo(() => {
    const used = new Set(SOURCES.flatMap(source => source.chapters))
    return CHAPTERS.filter(chapter => used.has(chapter.id))
  }, [])

  const filtered = SOURCES.filter(source => {
    if (activeGroups.size > 0 && !activeGroups.has(source.group)) return false
    if (activeKinds.size > 0 && !activeKinds.has(source.kind)) return false
    if (activeChapters.size > 0 && !source.chapters.some(id => activeChapters.has(id))) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        source.title.toLowerCase().includes(q) ||
        source.shortTitle.toLowerCase().includes(q) ||
        source.group.toLowerCase().includes(q) ||
        source.kind.toLowerCase().includes(q) ||
        source.note.toLowerCase().includes(q)
      )
    }
    return true
  })

  const hasFilters = activeGroups.size > 0 || activeKinds.size > 0 || activeChapters.size > 0

  function resetFilters() {
    setActiveGroups(new Set())
    setActiveKinds(new Set())
    setActiveChapters(new Set())
    setOpenFilter(null)
  }

  const groupLabel = activeGroups.size === 1 ? `Gruppe: ${[...activeGroups][0]}` : `Gruppe: ${activeGroups.size}`
  const kindLabel = activeKinds.size === 1 ? `Typ: ${[...activeKinds][0]}` : `Typ: ${activeKinds.size}`
  const chapterLabel = activeChapters.size === 1
    ? `Kap. ${CHAPTER_BY_ID.get([...activeChapters][0])?.num ?? [...activeChapters][0]}`
    : `Kapitel: ${activeChapters.size}`

  return (
    <div className="quellen-referenz">
      <div className="glossar-filter-bar" ref={filterBarRef}>
        <input
          className="glossar-search"
          type="search"
          placeholder="Quelle oder Thema suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Quellen durchsuchen"
        />
        <FilterPill
          label="Gruppe"
          isActive={activeGroups.size > 0}
          activeLabel={groupLabel}
          isOpen={openFilter === 'gruppe'}
          onToggle={() => toggleOpen('gruppe')}
          onClear={() => setActiveGroups(new Set())}
        >
          {GROUP_ORDER.map(group => (
            <label key={group} className={`filter-option${activeGroups.has(group) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeGroups.has(group)}
                onChange={() => setActiveGroups(s => toggle(s, group))}
              />
              {group}
            </label>
          ))}
        </FilterPill>
        <FilterPill
          label="Typ"
          isActive={activeKinds.size > 0}
          activeLabel={kindLabel}
          isOpen={openFilter === 'typ'}
          onToggle={() => toggleOpen('typ')}
          onClear={() => setActiveKinds(new Set())}
        >
          {KIND_ORDER.map(kind => (
            <label key={kind} className={`filter-option${activeKinds.has(kind) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeKinds.has(kind)}
                onChange={() => setActiveKinds(s => toggle(s, kind))}
              />
              {kind}
            </label>
          ))}
        </FilterPill>
        <FilterPill
          label="Kapitel"
          isActive={activeChapters.size > 0}
          activeLabel={chapterLabel}
          isOpen={openFilter === 'kapitel'}
          onToggle={() => toggleOpen('kapitel')}
          onClear={() => setActiveChapters(new Set())}
        >
          {chapterOptions.map(chapter => (
            <label key={chapter.id} className={`filter-option${activeChapters.has(chapter.id) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeChapters.has(chapter.id)}
                onChange={() => setActiveChapters(s => toggle(s, chapter.id))}
              />
              {chapter.num}. {chapter.title}
            </label>
          ))}
        </FilterPill>
        {hasFilters && (
          <button className="gallery-reset" onClick={resetFilters}>Alle zurücksetzen</button>
        )}
        <span className="glossar-count">{filtered.length} Quellen</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Quellen für diese Filterauswahl.</p>
      ) : (
        <div className="quellen-list">
          {filtered.map(source => (
            <article key={source.id} className="quellen-entry">
              <div className="quellen-entry-main">
                <div className="quellen-entry-head">
                  <h3 className="quellen-title">{source.title}</h3>
                  <div className="quellen-entry-tags">
                    <span className="glossar-tag glossar-tag--thema">{source.group}</span>
                    <span className="glossar-tag glossar-tag--typ">{source.kind}</span>
                  </div>
                </div>
                <p className="quellen-note">{source.note}</p>
              </div>
              <div className="quellen-chapters-block">
                <span className="quellen-chapters-label">Verwendet in</span>
                <div className="quellen-chapters" aria-label={`Verwendet in Kapiteln für ${source.shortTitle}`}>
                  {source.chapters.map(chapterId => {
                    const chapter = CHAPTER_BY_ID.get(chapterId)
                    if (!chapter) return null
                    return (
                      <Link key={chapterId} to={`/${chapter.path}`} className="source-chapter-chip">
                        <span className="source-chapter-num">{chapter.num}</span>
                        <span className="source-chapter-title">{chapter.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
