import { useState } from 'react'

interface Props {
  node?: { properties?: Record<string, unknown> }
}

export function ImagePlaceholder({ node }: Props) {
  const p = node?.properties ?? {}
  const name    = (p['dataName']    as string) || ''
  const type    = (p['dataType']    as string) || ''
  const size    = (p['dataSize']    as string) || ''
  const desc    = (p['dataDesc']    as string) || ''
  const caption = (p['dataCaption'] as string) || ''
  const tags    = (p['dataTags']    as string) || ''
  const src     = (p['dataSrc']     as string) || ''
  const alt     = (p['dataAlt']     as string) || caption

  const [loaded, setLoaded] = useState(false)

  const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

  if (loaded) {
    return (
      <figure>
        <img src={src} alt={alt} loading="lazy" />
        {(caption || alt) && <figcaption>{caption || alt}</figcaption>}
      </figure>
    )
  }

  return (
    <>
      {src && (
        <img
          src={src}
          style={{ display: 'none' }}
          onLoad={() => setLoaded(true)}
          alt=""
        />
      )}
      <figure className="img-placeholder-card">
        <div className="img-placeholder-card__header">
          <svg className="img-placeholder-card__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <span className="img-placeholder-card__name">{name}</span>
          {type && <span className="img-placeholder-card__badge">{type}</span>}
          {size && <span className="img-placeholder-card__badge">{size}</span>}
        </div>
        <div className="img-placeholder-card__body">
          {desc && (
            <>
              <div className="img-placeholder-card__prompt-label">Bildprompt</div>
              <div className="img-placeholder-card__prompt">{desc}</div>
            </>
          )}
          {tagList.length > 0 && (
            <div className="img-placeholder-card__tags">
              {tagList.map(tag => (
                <span key={tag} className="img-placeholder-card__tag">#{tag}</span>
              ))}
            </div>
          )}
          {caption && (
            <div className="img-placeholder-card__caption">{caption}</div>
          )}
        </div>
      </figure>
    </>
  )
}
