import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getChapterReferenceGraph, type ChapterGraphEdge, type ChapterGraphNode } from '../chapters'
import { OverviewCard } from './OverviewCard'
import { bookPath } from '../books'

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

function edgeTargets(edges: ChapterGraphEdge[], id: string, direction: 'incoming' | 'outgoing'): ChapterGraphEdge[] {
  return edges
    .filter(edge => direction === 'incoming' ? edge.targetId === id : edge.sourceId === id)
    .sort((a, b) => b.count - a.count)
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
  const incoming = focused ? edgeTargets(graph.edges, focused.chapter.id, 'incoming') : []
  const outgoing = focused ? edgeTargets(graph.edges, focused.chapter.id, 'outgoing') : []
  const connectedIds = new Set<string>()
  for (const edge of [...incoming, ...outgoing]) {
    connectedIds.add(edge.sourceId)
    connectedIds.add(edge.targetId)
  }

  return (
    <section className="chapter-graph-section" aria-labelledby="chapter-graph-title">
      <div className="chapter-graph-head">
        <div>
          <h2 id="chapter-graph-title" className="overview-part-label">Kapitelkarte</h2>
          <p className="chapter-graph-summary">
            {graph.nodes.length} Kapitel in {groups.length} Teilen, {graph.edges.length} Querverweis-Beziehungen, {graph.totalLinks} gesetzte Kapitelverweise
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
                        showDescription={false}
                        badge={node.chapter.num === '1' ? 'Einstieg' : undefined}
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

        <aside className="chapter-map-focus" aria-label="Fokussiertes Kapitel">
          {focused ? (
            <>
              <p className="chapter-map-focus-kicker">Fokus</p>
              <h3>Kap. {focused.chapter.num} · {focused.chapter.title}</h3>
              <p className="chapter-map-focus-meta">
                {focused.incoming} eingehende, {focused.outgoing} ausgehende Verweise
              </p>

              <div className="chapter-map-links">
                <div>
                  <h4>Verweist auf</h4>
                  {outgoing.length > 0 ? (
                    outgoing.slice(0, 8).map(edge => {
                      const target = byId.get(edge.targetId)
                      if (!target) return null
                      return (
                        <NavLink key={`${edge.sourceId}-${edge.targetId}`} to={bookPath(target.chapter.path)}>
                          <span>Kap. {target.chapter.num}</span>
                          <strong>{target.chapter.title}</strong>
                          <em>{edge.count}×</em>
                        </NavLink>
                      )
                    })
                  ) : (
                    <p>Keine ausgehenden Kapitelverweise.</p>
                  )}
                </div>

                <div>
                  <h4>Wird referenziert von</h4>
                  {incoming.length > 0 ? (
                    incoming.slice(0, 8).map(edge => {
                      const source = byId.get(edge.sourceId)
                      if (!source) return null
                      return (
                        <NavLink key={`${edge.sourceId}-${edge.targetId}`} to={bookPath(source.chapter.path)}>
                          <span>Kap. {source.chapter.num}</span>
                          <strong>{source.chapter.title}</strong>
                          <em>{edge.count}×</em>
                        </NavLink>
                      )
                    })
                  ) : (
                    <p>Keine eingehenden Kapitelverweise.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="chapter-map-empty">Ein Kapitel fokussieren, um seine Querverweise zu sehen.</p>
          )}
        </aside>
      </div>
    </section>
  )
}
