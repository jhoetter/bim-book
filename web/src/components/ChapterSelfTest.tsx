import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SelfTest, SelfTestQuestion } from '../data/selftests'
import { useSelfTestResults } from '../lib/selftests'

const DRAFT_EVENT = 'bim-selftest-draft-change'

interface Props {
  test: SelfTest
}

function isAnswered(answer: string[] | undefined): boolean {
  return !!answer && answer.length > 0
}

function optionState(optionId: string, selected: string[], correct: string[], submitted: boolean): string {
  if (!submitted) return ''
  const isSelected = selected.includes(optionId)
  const isCorrect = correct.includes(optionId)
  if (isCorrect) return ' selftest-option--correct'
  if (isSelected) return ' selftest-option--wrong'
  return ''
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const bSet = new Set(b)
  return a.every(item => bSet.has(item))
}

function correctAnswerText(question: SelfTestQuestion): string {
  return question.options
    .filter(option => question.correctOptionIds.includes(option.id))
    .map(option => option.text)
    .join('; ')
}

export function ChapterSelfTest({ test }: Props) {
  const { results, saveResult, clearResult } = useSelfTestResults()
  const result = results[test.id]
  const submitted = !!result
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string[]>>(() => loadDraft(test.id))

  useEffect(() => {
    setDraftAnswers(submitted ? result.answers : loadDraft(test.id))
  }, [result, submitted, test.id])

  useEffect(() => {
    const sync = () => {
      if (!submitted) setDraftAnswers(loadDraft(test.id))
    }
    window.addEventListener(DRAFT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(DRAFT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [submitted, test.id])

  const visibleAnswers = result ? result.answers : draftAnswers
  const visibleAllAnswered = test.questions.every(question => isAnswered(visibleAnswers[question.id]))

  function setAnswer(questionId: string, optionId: string, type: 'single' | 'multiple') {
    if (submitted) return
    const current = visibleAnswers[questionId] ?? []
    const nextForQuestion = type === 'single'
      ? [optionId]
      : current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId]
    const nextAnswers = { ...visibleAnswers, [questionId]: nextForQuestion }
    persistDraft(test.id, nextAnswers)
    setDraftAnswers(nextAnswers)
  }

  return (
    <section className="selftest-chapter" aria-labelledby={`${test.id}-title`}>
      <div className="selftest-chapter-head">
        <div>
          <p className="selftest-kicker">Optionaler Selbsttest</p>
          <h2 id={`${test.id}-title`} className="selftest-title">{test.title}</h2>
        </div>
        {result && (
          <div className="selftest-score" aria-label={`Ergebnis ${result.score} von ${result.total}`}>
            <span>{result.score}</span>
            <small>/{result.total}</small>
          </div>
        )}
      </div>

      <div className="selftest-question-list">
        {test.questions.map((question, index) => {
          const selected = visibleAnswers[question.id] ?? []
          const isCorrect = sameSet(selected, question.correctOptionIds)
          return (
            <fieldset key={question.id} className="selftest-question">
              <legend>
                <span className="selftest-question-num">{index + 1}</span>
                {question.prompt}
              </legend>
              <div className="selftest-option-list">
                {question.options.map(option => (
                  <label
                    key={option.id}
                    className={`selftest-option${selected.includes(option.id) ? ' selftest-option--selected' : ''}${optionState(option.id, selected, question.correctOptionIds, submitted)}`}
                  >
                    <input
                      type={question.type === 'single' ? 'radio' : 'checkbox'}
                      name={question.id}
                      checked={selected.includes(option.id)}
                      disabled={submitted}
                      onChange={() => setAnswer(question.id, option.id, question.type)}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
              {submitted && (
                <div className={`selftest-feedback${isCorrect ? ' selftest-feedback--correct' : ' selftest-feedback--wrong'}`}>
                  <p className="selftest-feedback-title">
                    {isCorrect ? 'Richtig.' : 'Nicht ganz richtig.'}
                  </p>
                  {!isCorrect && (
                    <p className="selftest-correct-answer">
                      <strong>Korrekte Antwort{question.correctOptionIds.length > 1 ? 'en' : ''}:</strong> {correctAnswerText(question)}
                    </p>
                  )}
                  <p className="selftest-explanation">{question.explanation}</p>
                </div>
              )}
            </fieldset>
          )
        })}
      </div>

      <div className="selftest-actions">
        {!submitted ? (
          <button
            className="selftest-primary"
            disabled={!visibleAllAnswered}
            onClick={() => {
              saveResult(test, visibleAnswers)
              localStorage.removeItem(draftKey(test.id))
            }}
          >
            Auswerten
          </button>
        ) : (
          <button
            className="selftest-secondary"
            onClick={() => {
              clearResult(test.id)
              localStorage.removeItem(draftKey(test.id))
              setDraftAnswers({})
            }}
          >
            Neu starten
          </button>
        )}
        <Link className="selftest-link" to="/selbsttests">Alle Selbsttests</Link>
        {!submitted && !visibleAllAnswered && (
          <span className="selftest-hint">Alle Fragen beantworten, dann auswerten.</span>
        )}
      </div>
    </section>
  )
}

function draftKey(testId: string): string {
  return `bim-book-selftest-draft-${testId}`
}

function loadDraft(testId: string): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(draftKey(testId)) ?? '{}')
  } catch {
    return {}
  }
}

function persistDraft(testId: string, answers: Record<string, string[]>) {
  localStorage.setItem(draftKey(testId), JSON.stringify(answers))
  window.dispatchEvent(new CustomEvent(DRAFT_EVENT))
}
