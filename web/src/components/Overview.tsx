import { NavLink } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { ChapterReferenceGraph } from './ChapterReferenceGraph'
import { BOOKS, getBook } from '../books'

const STATUS_LABEL = {
  current: 'Aktuelles Buch',
  planned: 'Skizze',
  idea: 'Idee',
}

export function LibraryOverview() {
  return (
    <main className="library-page">
      <section className="library-hero">
        <p className="library-kicker">Buchbibliothek</p>
        <h1>Vom Entwurf zum Modell</h1>
        <p>
          Eine wachsende Buchreihe entlang des Gebäudelebenszyklus. Das aktuelle Buch bleibt
          fokussiert auf Architektur, Bauprozess und BIM; angrenzende Domänen bekommen eigene
          Bücher statt das Grundlagenwerk zu überfrachten.
        </p>
      </section>

      <section className="lifecycle-strip" aria-label="Gebäudelebenszyklus">
        {['Grundstück & Entwicklung', 'Planung & Genehmigung', 'Bauausführung', 'Betrieb & Verwaltung', 'Transaktion', 'Umbau / Abbruch'].map(label => (
          <span key={label}>{label}</span>
        ))}
      </section>

      <section className="book-grid" aria-label="Bücher">
        {BOOKS.map(book => (
          <NavLink
            key={book.slug}
            to={book.href}
            className={`book-card book-card--${book.status}`}
            style={{ '--book-accent': book.accent } as CSSProperties}
          >
            <span className="book-card-status">{STATUS_LABEL[book.status]}</span>
            <h2>{book.title}</h2>
            <p className="book-card-subtitle">{book.subtitle}</p>
            <p className="book-card-desc">{book.description}</p>
            <div className="book-card-tags">
              {book.domains.slice(0, 5).map(tag => <span key={tag}>{tag}</span>)}
            </div>
            <div className="book-card-life">
              {book.lifecycle.map(stage => <span key={stage}>{stage}</span>)}
            </div>
          </NavLink>
        ))}
      </section>
    </main>
  )
}

export function Overview() {
  return (
    <div className="overview-page">
      <div className="overview-header">
        <h1 className="overview-title">BIM von Grund auf</h1>
        <p className="overview-subtitle">
          Ein Kompendium für Architekten, Ingenieure und BIM-Koordinatoren
        </p>
      </div>

      <ChapterReferenceGraph />
    </div>
  )
}

export function BookPlaceholder({ slug }: { slug: string | undefined }) {
  const book = getBook(slug)

  if (!book) {
    return (
      <main className="content">
        <div className="book-placeholder">
          <p className="library-kicker">Nicht gefunden</p>
          <h1>Buch nicht gefunden</h1>
          <p>Für diesen Buch-Slug ist noch kein Eintrag in der Bibliothek angelegt.</p>
          <NavLink to="/" className="book-placeholder-link">Zur Buchübersicht</NavLink>
        </div>
      </main>
    )
  }

  return (
    <main className="content">
      <div className="book-placeholder" style={{ '--book-accent': book.accent } as CSSProperties}>
        <p className="library-kicker">{STATUS_LABEL[book.status]}</p>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <div className="book-card-tags">
          {book.domains.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <p className="book-placeholder-note">
          Dieses Buch ist als eigener Wissensraum vorgesehen. Inhalte, Tracker und Kapitelstruktur
          können später hier eingehängt werden, ohne das aktuelle BIM-Grundlagenbuch zu vermischen.
        </p>
        <NavLink to="/" className="book-placeholder-link">Zur Buchübersicht</NavLink>
      </div>
    </main>
  )
}
