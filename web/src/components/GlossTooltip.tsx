import { useState, useRef, useCallback } from 'react'
import { GLOSSAR_MAP } from '../data/glossar'

interface Props {
  term: string
  children: React.ReactNode
}

export function GlossTooltip({ term, children }: Props) {
  const [open, setOpen] = useState(false)
  const [above, setAbove] = useState(true)
  const ref = useRef<HTMLSpanElement>(null)

  const entry = GLOSSAR_MAP[term]

  const show = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setAbove(rect.top > 160)
    }
    setOpen(true)
  }, [])

  const hide = useCallback(() => setOpen(false), [])

  if (!entry) {
    return <span className="gloss gloss--unknown">{children}</span>
  }

  return (
    <span
      ref={ref}
      className={`gloss${open ? ' gloss--open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`Glossar: ${entry.term}`}
    >
      {children}
      {open && (
        <span
          className={`gloss-popover${above ? ' gloss-popover--above' : ' gloss-popover--below'}`}
          role="tooltip"
        >
          <span className="gloss-popover-term">
            {entry.term}
            {entry.abbrev && (
              <span className="gloss-popover-abbrev"> ({entry.abbrev})</span>
            )}
          </span>
          <span className="gloss-popover-def">{entry.definition}</span>
          {entry.image && (
            <img className="gloss-popover-img" src={entry.image} alt={entry.term} />
          )}
        </span>
      )}
    </span>
  )
}
