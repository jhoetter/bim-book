import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface HeadingItem {
  id: string
  level: number
  text: string
}

export function TableOfContents() {
  const location = useLocation()
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const rafRef = useRef(0)

  const updateActiveHeading = useCallback(() => {
    const scrollRoot = document.querySelector<HTMLElement>('.content-area')
    if (!scrollRoot || headings.length === 0) return

    const rootRect = scrollRoot.getBoundingClientRect()
    const activationY = rootRect.top + 130
    const headingEls = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headingEls.length === 0) return

    let current = headingEls[0]
    for (const el of headingEls) {
      if (el.getBoundingClientRect().top <= activationY) current = el
      else break
    }

    const scrollBottom = scrollRoot.scrollTop + scrollRoot.clientHeight
    if (scrollRoot.scrollHeight - scrollBottom < 4) current = headingEls[headingEls.length - 1]

    setActiveId(prev => prev === current.id ? prev : current.id)
  }, [headings])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      updateActiveHeading()
    })
  }, [updateActiveHeading])

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = Array.from(document.querySelectorAll('.prose h1, .prose h2, .prose h3'))
      const items: HeadingItem[] = els
        .filter(el => el.id)
        .map(el => {
          const clone = el.cloneNode(true) as Element
          clone.querySelector('.prose-anchor')?.remove()
          return {
            id: el.id,
            level: parseInt(el.tagName[1]),
            text: clone.textContent?.trim() ?? '',
          }
        })
      setHeadings(items)
      setActiveId(items[0]?.id ?? '')
    }, 80)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    if (headings.length === 0) return
    const scrollRoot = document.querySelector<HTMLElement>('.content-area')
    if (!scrollRoot) return

    updateActiveHeading()
    const delayed = window.setTimeout(updateActiveHeading, 250)
    scrollRoot.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.clearTimeout(delayed)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      scrollRoot.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [headings, scheduleUpdate, updateActiveHeading])

  if (headings.length < 2) return null

  return (
    <nav className="toc" aria-label="Seitenstruktur">
      {headings.map(({ id, level, text }) => {
        const isActive = activeId === id
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`toc-item toc-item--h${level}${isActive ? ' toc-item--active' : ''}`}
            onClick={e => {
              e.preventDefault()
              setActiveId(id)
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span className="toc-label">{text}</span>
            <span className="toc-bar" />
          </a>
        )
      })}
    </nav>
  )
}
