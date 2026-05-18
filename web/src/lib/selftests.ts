import { useEffect, useState } from 'react'
import type { SelfTest } from '../data/selftests'

const STORAGE_KEY = 'bim-book-selftests-v1'
const SYNC_EVENT = 'bim-selftest-change'

export interface SelfTestResult {
  testId: string
  answers: Record<string, string[]>
  score: number
  total: number
  submittedAt: number
}

export type SelfTestResultMap = Record<string, SelfTestResult>

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const bSet = new Set(b)
  return a.every(item => bSet.has(item))
}

export function scoreSelfTest(test: SelfTest, answers: Record<string, string[]>): { score: number; total: number } {
  const total = test.questions.length
  const score = test.questions.reduce((sum, question) => {
    const answer = answers[question.id] ?? []
    return sum + (sameSet(answer, question.correctOptionIds) ? 1 : 0)
  }, 0)
  return { score, total }
}

function load(): SelfTestResultMap {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  catch { return {} }
}

function persist(results: SelfTestResultMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
  window.dispatchEvent(new CustomEvent(SYNC_EVENT))
}

export function useSelfTestResults() {
  const [results, setResults] = useState<SelfTestResultMap>(load)

  useEffect(() => {
    const sync = () => setResults(load())
    window.addEventListener(SYNC_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SYNC_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const saveResult = (test: SelfTest, answers: Record<string, string[]>) => {
    const { score, total } = scoreSelfTest(test, answers)
    const next = {
      ...load(),
      [test.id]: {
        testId: test.id,
        answers,
        score,
        total,
        submittedAt: Date.now(),
      },
    }
    persist(next)
    setResults(next)
  }

  const clearResult = (testId: string) => {
    const next = { ...load() }
    delete next[testId]
    persist(next)
    setResults(next)
  }

  return { results, saveResult, clearResult }
}
