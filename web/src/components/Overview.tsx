import { ChapterReferenceGraph } from './ChapterReferenceGraph'

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
