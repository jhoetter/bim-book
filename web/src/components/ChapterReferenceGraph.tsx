import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getChapterReferenceGraph, type ChapterGraphNode } from '../chapters'

const WIDTH = 1100
const HEIGHT = 640
const CX = WIDTH / 2
const CY = HEIGHT / 2 + 4
const RX = 405
const RY = 238

const PART_COLORS = [
  '#2563eb',
  '#059669',
  '#d97706',
  '#7c3aed',
  '#dc2626',
  '#0891b2',
  '#64748b',
]

interface PositionedNode extends ChapterGraphNode {
  x: number
  y: number
  labelX: number
  labelY: number
  anchor: 'start' | 'middle' | 'end'
  color: string
  radius: number
}

function chapterHref(path: string): string {
  return `/${path}`
}

function compactTitle(title: string): string {
  return title.length > 24 ? `${title.slice(0, 22)}...` : title
}

function edgePath(source: PositionedNode, target: PositionedNode): string {
  const mx = (source.x + target.x) / 2
  const my = (source.y + target.y) / 2
  const dx = target.x - source.x
  const dy = target.y - source.y
  const length = Math.max(Math.hypot(dx, dy), 1)
  const curve = Math.min(80, Math.max(28, length * 0.12))
  const side = source.chapter.num < target.chapter.num ? 1 : -1
  const qx = mx - (dy / length) * curve * side
  const qy = my + (dx / length) * curve * side
  return `M ${source.x} ${source.y} Q ${qx} ${qy} ${target.x} ${target.y}`
}

export function ChapterReferenceGraph() {
  const navigate = useNavigate()
  const graph = useMemo(() => getChapterReferenceGraph(), [])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const positioned = useMemo(() => {
    const partIndex = new Map<string, number>()
    graph.nodes.forEach(node => {
      if (!partIndex.has(node.partTitle)) partIndex.set(node.partTitle, partIndex.size)
    })

    const maxTotal = Math.max(1, ...graph.nodes.map(node => node.total))
    return graph.nodes.map((node, index): PositionedNode => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / graph.nodes.length
      const x = CX + Math.cos(angle) * RX
      const y = CY + Math.sin(angle) * RY
      const labelOffset = 25
      const labelX = x + Math.cos(angle) * labelOffset
      const labelY = y + Math.sin(angle) * labelOffset + 4
      const anchor = Math.abs(Math.cos(angle)) < 0.2
        ? 'middle'
        : Math.cos(angle) > 0 ? 'start' : 'end'

      return {
        ...node,
        x,
        y,
        labelX,
        labelY,
        anchor,
        color: PART_COLORS[(partIndex.get(node.partTitle) ?? 0) % PART_COLORS.length],
        radius: 9 + Math.sqrt(node.total / maxTotal) * 10,
      }
    })
  }, [graph.nodes])

  const byId = useMemo(
    () => new Map(positioned.map(node => [node.chapter.id, node])),
    [positioned],
  )

  const activeNode = hoveredId ? byId.get(hoveredId) : null
  const strongestNodes = [...positioned]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
  const connectedIds = new Set<string>()
  if (hoveredId) {
    for (const edge of graph.edges) {
      if (edge.sourceId === hoveredId) connectedIds.add(edge.targetId)
      if (edge.targetId === hoveredId) connectedIds.add(edge.sourceId)
    }
  }

  return (
    <section className="chapter-graph-section" aria-labelledby="chapter-graph-title">
      <div className="chapter-graph-head">
        <div>
          <h2 id="chapter-graph-title" className="overview-part-label">Querverweis-Graph</h2>
          <p className="chapter-graph-summary">
            {graph.nodes.length} Kapitel, {graph.edges.length} Verbindungen, {graph.totalLinks} gesetzte Kapitelverweise
          </p>
        </div>
        <div className="chapter-graph-legend" aria-label="Legende">
          <span><i className="chapter-graph-legend-line" /> Verweis</span>
          <span><i className="chapter-graph-legend-node" /> Kapitel</span>
        </div>
      </div>

      <div className="chapter-graph-panel">
        <div className="chapter-graph-canvas" onMouseLeave={() => setHoveredId(null)}>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Netzwerk der Kapitel-Querverweise">
            <defs>
              <marker id="chapter-graph-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 8 4 L 0 8 z" className="chapter-graph-arrow" />
              </marker>
            </defs>
            <g className="chapter-graph-edges">
              {graph.edges.map(edge => {
                const source = byId.get(edge.sourceId)
                const target = byId.get(edge.targetId)
                if (!source || !target) return null
                const active = !hoveredId || edge.sourceId === hoveredId || edge.targetId === hoveredId
                return (
                  <path
                    key={`${edge.sourceId}-${edge.targetId}`}
                    d={edgePath(source, target)}
                    className={`chapter-graph-edge${active ? ' chapter-graph-edge--active' : ''}`}
                    strokeWidth={Math.min(4.5, 1 + edge.count * 0.85)}
                    markerEnd="url(#chapter-graph-arrow)"
                  />
                )
              })}
            </g>
            <g className="chapter-graph-nodes">
              {positioned.map(node => {
                const active = !hoveredId || hoveredId === node.chapter.id || connectedIds.has(node.chapter.id)
                return (
                  <g
                    key={node.chapter.id}
                    className={`chapter-graph-node${active ? ' chapter-graph-node--active' : ''}`}
                    transform={`translate(${node.x} ${node.y})`}
                    role="link"
                    tabIndex={0}
                    aria-label={`Kapitel ${node.chapter.num}: ${node.chapter.title}`}
                    onMouseEnter={() => setHoveredId(node.chapter.id)}
                    onFocus={() => setHoveredId(node.chapter.id)}
                    onClick={() => navigate(chapterHref(node.chapter.path))}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' && event.key !== ' ') return
                      event.preventDefault()
                      navigate(chapterHref(node.chapter.path))
                    }}
                  >
                    <circle r={node.radius + 5} className="chapter-graph-node-hit" />
                    <circle r={node.radius} fill={node.color} />
                    <text className="chapter-graph-node-num" dy="0.34em">{node.chapter.num}</text>
                    <title>{`Kapitel ${node.chapter.num}: ${node.chapter.title}`}</title>
                  </g>
                )
              })}
            </g>
            <g className="chapter-graph-labels" aria-hidden="true">
              {positioned.map(node => {
                const active = !hoveredId || hoveredId === node.chapter.id || connectedIds.has(node.chapter.id)
                return (
                  <text
                    key={node.chapter.id}
                    x={node.labelX}
                    y={node.labelY}
                    textAnchor={node.anchor}
                    className={`chapter-graph-label${active ? ' chapter-graph-label--active' : ''}`}
                  >
                    {compactTitle(node.chapter.title)}
                  </text>
                )
              })}
            </g>
          </svg>
        </div>

        <aside className="chapter-graph-detail" aria-live="polite">
          {activeNode ? (
            <>
              <span className="chapter-graph-detail-kicker">Kapitel {activeNode.chapter.num}</span>
              <h3>{activeNode.chapter.title}</h3>
              <dl>
                <div>
                  <dt>Eingehend</dt>
                  <dd>{activeNode.incoming}</dd>
                </div>
                <div>
                  <dt>Ausgehend</dt>
                  <dd>{activeNode.outgoing}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <span className="chapter-graph-detail-kicker">Stärkste Knoten</span>
              <ol className="chapter-graph-toplist">
                {strongestNodes.map(node => (
                  <li key={node.chapter.id}>
                    <span>{node.chapter.num}</span>
                    <strong>{node.chapter.title}</strong>
                    <em>{node.total}</em>
                  </li>
                ))}
              </ol>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}
