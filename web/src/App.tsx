import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { MarkdownPage } from './components/MarkdownPage'
import { Gallery } from './components/Gallery'
import { ChatPanel } from './components/ChatPanel'
import { getContent, getNavigation, ALL_CHAPTERS } from './chapters'
import { NavLink } from 'react-router-dom'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

function Pagination({ id }: { id: string }) {
  const { prev, next } = getNavigation(id)
  if (!prev && !next) return null
  return (
    <div className="pagination">
      <div className="pagination-prev">
        {prev && (
          <NavLink to={chapterHref(prev.path)}>
            <span className="pagination-arrow">←</span>
            <span className="pagination-label">
              {prev.num ? `Kapitel ${prev.num}` : prev.title}
            </span>
            <span className="pagination-chapter">{prev.title}</span>
          </NavLink>
        )}
      </div>
      <div className="pagination-next">
        {next && (
          <NavLink to={chapterHref(next.path)}>
            <span className="pagination-label">
              {next.num ? `Kapitel ${next.num}` : next.title}
            </span>
            <span className="pagination-chapter">{next.title}</span>
            <span className="pagination-arrow">→</span>
          </NavLink>
        )}
      </div>
    </div>
  )
}

function ChapterRoute() {
  const { '*': slug } = useParams()
  // useParams '*' only captures the tail after the route prefix (/chapters/ or /appendix/)
  // but getContent needs the full relative path like "chapters/04-tragwerk"
  const location = useLocation()
  const path = location.pathname.replace(/^\//, '')  // strip leading /
  const content = getContent(path)
  const chapter = ALL_CHAPTERS.find(c => c.path === path)
  const id = chapter?.id ?? (slug ?? '')

  return (
    <main className="content">
      <MarkdownPage content={content} />
      <Pagination id={id} />
    </main>
  )
}

function IndexRoute() {
  const content = getContent('index')
  return (
    <main className="content">
      <MarkdownPage content={content} />
      <Pagination id="index" />
    </main>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<IndexRoute />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/chapters/*" element={<ChapterRoute />} />
            <Route path="/appendix/*" element={<ChapterRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <ChatPanel />
    </BrowserRouter>
  )
}
