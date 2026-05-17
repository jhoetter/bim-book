import { useEffect, useRef, useState } from 'react'
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
  const observerRef = useRef<IntersectionObserver | null>(null)

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
    observerRef.current?.disconnect()

    // Scroll happens inside .content-area, not the viewport — pass it as root
    const scrollRoot = document.querySelector('.content-area') as HTMLElement | null

    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      {
        root: scrollRoot,
        // 80px top inset (topbar + padding), activate in top ~30% of scroll area
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [headings])

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
