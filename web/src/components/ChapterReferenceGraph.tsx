import { useMemo, useState } from 'react'
import { getChapterReferenceGraph, type ChapterGraphNode } from '../chapters'
import { OverviewCard } from './OverviewCard'

interface PartGroup {
  partTitle: string
  shortTitle: string
  nodes: ChapterGraphNode[]
}

function shortPartTitle(title: string): string {
  return title
    .replace(/^Teil /, '')
    .replace(' – ', ' · ')
}

function groupByPart(nodes: ChapterGraphNode[]): PartGroup[] {
  const groups: PartGroup[] = []
  for (const node of nodes) {
    const current = groups[groups.length - 1]
    if (current?.partTitle === node.partTitle) current.nodes.push(node)
    else groups.push({
      partTitle: node.partTitle,
      shortTitle: shortPartTitle(node.partTitle),
      nodes: [node],
    })
  }
  return groups
}

export function ChapterReferenceGraph() {
  const graph = useMemo(() => getChapterReferenceGraph(), [])
  const groups = useMemo(() => groupByPart(graph.nodes), [graph.nodes])
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const byId = useMemo(
    () => new Map(graph.nodes.map(node => [node.chapter.id, node])),
    [graph.nodes],
  )

  const focused = focusedId ? byId.get(focusedId) ?? null : null
  const connectedIds = new Set<string>()
  if (focused) {
    for (const edge of graph.edges) {
      if (edge.sourceId === focused.chapter.id || edge.targetId === focused.chapter.id) {
        connectedIds.add(edge.sourceId)
        connectedIds.add(edge.targetId)
      }
    }
  }

  const cardBadge = (node: ChapterGraphNode, isFocused: boolean, isConnected: boolean): string | undefined => {
    if (isFocused) return 'Ausgewählt'
    if (focused && isConnected) return 'Verknüpft'
    return node.chapter.num === '1' ? 'Einstieg' : undefined
  }

  return (
    <section className="chapter-graph-section" aria-labelledby="chapter-graph-title">
      <div className="chapter-graph-head">
        <div>
          <h2 id="chapter-graph-title" className="overview-part-label">Kapitelkarte</h2>
          <p className="chapter-graph-summary">
            {graph.nodes.length} Kapitel in {groups.length} Teilen, {graph.edges.length} Querverweis-Beziehungen, {graph.totalLinks} gesetzte Kapitelverweise
          </p>
          <p className="chapter-map-hint">
            Kapitel fokussieren: direkt verknüpfte Kapitel bleiben hell, alle anderen treten zurück.
          </p>
        </div>
      </div>

      <div className="chapter-map-shell">
        <div className="chapter-map-scroll" onMouseLeave={() => setFocusedId(null)}>
          <div className="chapter-map-grid" aria-label="Kapitel nach Buchteilen">
            {groups.map(group => (
              <section key={group.partTitle} className="chapter-map-part" aria-label={group.partTitle}>
                <div className="chapter-map-part-head">
                  <span>{group.shortTitle}</span>
                  <span>{group.nodes.length}</span>
                </div>
                <div className="chapter-map-part-list">
                  {group.nodes.map(node => {
                    const isFocused = focused?.chapter.id === node.chapter.id
                    const isConnected = connectedIds.has(node.chapter.id)
                    return (
                      <OverviewCard
                        key={node.chapter.id}
                        chapter={node.chapter}
                        showDescription={isFocused}
                        badge={cardBadge(node, isFocused, isConnected)}
                        className={[
                          'overview-card--map',
                          isFocused ? 'overview-card--map-focused' : '',
                          focused && isConnected && !isFocused ? 'overview-card--map-connected' : '',
                          focused && !isConnected && !isFocused ? 'overview-card--map-muted' : '',
                        ].filter(Boolean).join(' ')}
                        onMouseEnter={() => setFocusedId(node.chapter.id)}
                        onFocus={() => setFocusedId(node.chapter.id)}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
