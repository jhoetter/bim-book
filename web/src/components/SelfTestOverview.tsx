import { Link } from 'react-router-dom'
import { SELF_TESTS } from '../data/selftests'
import { ALL_CHAPTERS } from '../chapters'
import { useSelfTestResults } from '../lib/selftests'

function chapterHref(path: string): string {
  return path === 'index' ? '/' : `/${path}`
}

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(ts)
}

export function SelfTestOverview() {
  const { results, clearResult } = useSelfTestResults()
  const done = SELF_TESTS.filter(test => results[test.id]).length
  const totalQuestions = SELF_TESTS.reduce((sum, test) => sum + test.questions.length, 0)
  const answeredQuestions = SELF_TESTS.reduce((sum, test) => sum + (results[test.id]?.total ?? 0), 0)
  const points = SELF_TESTS.reduce((sum, test) => sum + (results[test.id]?.score ?? 0), 0)

  return (
    <div className="selftest-overview">
      <div className="selftest-overview-summary">
        <div className="selftest-summary-item">
          <span>{done}</span>
          <small>von {SELF_TESTS.length} Tests</small>
        </div>
        <div className="selftest-summary-item">
          <span>{points}</span>
          <small>von {answeredQuestions || totalQuestions} Punkten</small>
        </div>
      </div>

      <div className="selftest-table" role="table" aria-label="Selbsttests und Ergebnisse">
        <div className="selftest-table-row selftest-table-row--head" role="row">
          <span role="columnheader">Kapitel</span>
          <span role="columnheader">Typen</span>
          <span role="columnheader">Ergebnis</span>
          <span role="columnheader">Aktion</span>
        </div>
        {SELF_TESTS.map(test => {
          const chapter = ALL_CHAPTERS.find(ch => ch.id === test.chapterId)
          const result = results[test.id]
          const hasMultiple = test.questions.some(q => q.type === 'multiple')
          const hasSingle = test.questions.some(q => q.type === 'single')
          return (
            <div key={test.id} className="selftest-table-row" role="row">
              <div className="selftest-table-main" role="cell">
                <span className="selftest-table-num">{chapter?.num ? `Kapitel ${chapter.num}` : 'Referenz'}</span>
                <Link to={chapter ? chapterHref(chapter.path) : '#'}>{chapter?.title ?? test.title}</Link>
              </div>
              <div className="selftest-table-tags" role="cell">
                {hasSingle && <span className="glossar-tag glossar-tag--typ">Single Choice</span>}
                {hasMultiple && <span className="glossar-tag glossar-tag--thema">Multiple Choice</span>}
              </div>
              <div className="selftest-table-result" role="cell">
                {result ? (
                  <>
                    <strong>{result.score}/{result.total}</strong>
                    <span>{formatDate(result.submittedAt)}</span>
                  </>
                ) : (
                  <span>Nicht bearbeitet</span>
                )}
              </div>
              <div className="selftest-table-actions" role="cell">
                <Link className="selftest-link" to={chapter ? chapterHref(chapter.path) : '#'}>Öffnen</Link>
                {result && (
                  <button className="selftest-text-btn" onClick={() => clearResult(test.id)}>
                    Zurücksetzen
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
