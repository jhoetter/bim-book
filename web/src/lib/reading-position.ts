export interface HeadingInfo {
  id: string
  text: string
  level: number
}

const HEADING_SELECTOR = '.prose h1[id], .prose h2[id], .prose h3[id]'

function headingText(el: Element): string {
  const clone = el.cloneNode(true) as Element
  clone.querySelector('.prose-anchor')?.remove()
  clone.querySelector('.prose-bookmark')?.remove()
  return clone.textContent?.trim() ?? ''
}

export function getHeadingInfo(id: string): HeadingInfo | null {
  const el = document.getElementById(id)
  if (!el || !el.matches(HEADING_SELECTOR)) return null
  return {
    id: el.id,
    text: headingText(el),
    level: parseInt(el.tagName[1], 10),
  }
}

export function getCurrentHeadingInfo(): HeadingInfo | null {
  const scrollRoot = document.querySelector<HTMLElement>('.content-area')
  if (!scrollRoot) {
    const hashId = decodeURIComponent(window.location.hash.slice(1))
    return hashId ? getHeadingInfo(hashId) : null
  }

  const base = scrollRoot.getBoundingClientRect().top
  const threshold = base + 130
  let current: HTMLElement | null = null

  document.querySelectorAll<HTMLElement>(HEADING_SELECTOR).forEach(el => {
    if (el.getBoundingClientRect().top <= threshold) current = el
  })

  if (current) return getHeadingInfo(current.id)

  const hashId = decodeURIComponent(window.location.hash.slice(1))
  return hashId ? getHeadingInfo(hashId) : null
}

export function scrollToHeading(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  history.replaceState(null, '', `${window.location.pathname}#${id}`)
  return true
}
