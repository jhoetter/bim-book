import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { getChapterReferenceGraph, type ChapterGraphNode } from '../chapters'
import { OverviewCard } from './OverviewCard'

const WIDTH = 1500
const HEIGHT = 920
const CANVAS_PAD = 220
const TOTAL_WIDTH = WIDTH + CANVAS_PAD * 2
const TOTAL_HEIGHT = HEIGHT + CANVAS_PAD * 2
const CX = WIDTH / 2
const CY = HEIGHT / 2 + 10
const RX = 600
const RY = 335
const BASE_RENDER_SCALE = 0.82
const MIN_ZOOM = 0.75
const MAX_ZOOM = 1.75
const ZOOM_STEP = 0.15

interface PositionedNode extends ChapterGraphNode {
  x: number
  y: number
  angle: number
}

interface EdgeCurve {
  path: string
  arrows: {
    x: number
    y: number
    rotation: number
  }[]
}

interface PartBand {
  partTitle: string
  title: string
  path: string
  labelX: number
  labelY: number
  labelAnchor: 'start' | 'middle' | 'end'
}

function pointOnEllipse(angle: number, rx: number, ry: number): { x: number; y: number } {
  return {
    x: CX + Math.cos(angle) * rx,
    y: CY + Math.sin(angle) * ry,
  }
}

function partTitleLabel(title: string): string {
  return title.replace(' – ', ': ')
}

function makePartBands(nodes: PositionedNode[]): PartBand[] {
  const groups: { title: string; start: number; end: number }[] = []
  for (let index = 0; index < nodes.length; index += 1) {
    const previous = groups[groups.length - 1]
    if (previous?.title === nodes[index].partTitle) previous.end = index
    else groups.push({ title: nodes[index].partTitle, start: index, end: index })
  }

  return groups.map(group => {
    const startAngle = -Math.PI / 2 + (Math.PI * 2 * (group.start - 0.42)) / nodes.length
    const endAngle = -Math.PI / 2 + (Math.PI * 2 * (group.end + 0.42)) / nodes.length
    const start = pointOnEllipse(startAngle, RX + 118, RY + 84)
    const end = pointOnEllipse(endAngle, RX + 118, RY + 84)
    const midAngle = (startAngle + endAngle) / 2
    const label = pointOnEllipse(midAngle, RX + 132, RY + 101)
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
    const anchor = Math.abs(Math.cos(midAngle)) < 0.2
      ? 'middle'
      : Math.cos(midAngle) > 0 ? 'start' : 'end'

    return {
      partTitle: group.title,
      title: partTitleLabel(group.title),
      path: `M ${start.x} ${start.y} A ${RX + 118} ${RY + 84} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      labelX: label.x,
      labelY: label.y,
      labelAnchor: anchor,
    }
  })
}

function getEdgeCurve(source: PositionedNode, target: PositionedNode, count: number): EdgeCurve {
  const mx = (source.x + target.x) / 2
  const my = (source.y + target.y) / 2
  const dx = target.x - source.x
  const dy = target.y - source.y
  const length = Math.max(Math.hypot(dx, dy), 1)
  const curve = Math.min(120, Math.max(42, length * 0.13))
  const qx = mx - (dy / length) * curve
  const qy = my + (dx / length) * curve
  const arrowCount = Math.min(5, Math.max(2, Math.ceil(count / 2)))
  const arrows = Array.from({ length: arrowCount }, (_, index) => {
    const t = (index + 1) / (arrowCount + 1)
    const inv = 1 - t
    const x = inv * inv * source.x + 2 * inv * t * qx + t * t * target.x
    const y = inv * inv * source.y + 2 * inv * t * qy + t * t * target.y
    const tx = 2 * inv * (qx - source.x) + 2 * t * (target.x - qx)
    const ty = 2 * inv * (qy - source.y) + 2 * t * (target.y - qy)
    return {
      x,
      y,
      rotation: Math.atan2(ty, tx) * 180 / Math.PI,
    }
  })

  return {
    path: `M ${source.x} ${source.y} Q ${qx} ${qy} ${target.x} ${target.y}`,
    arrows,
  }
}

export function ChapterReferenceGraph() {
  const graph = useMemo(() => getChapterReferenceGraph(), [])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const didCenter = useRef(false)
  const renderScale = zoom * BASE_RENDER_SCALE

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || didCenter.current) return
    didCenter.current = true
    requestAnimationFrame(() => {
      canvas.scrollLeft = Math.max(0, (canvas.scrollWidth - canvas.clientWidth) / 2)
      canvas.scrollTop = Math.max(0, (canvas.scrollHeight - canvas.clientHeight) / 2)
    })
  }, [])

  const setClampedZoom = (next: number | ((current: number) => number)) => {
    setZoom(current => {
      const value = typeof next === 'function' ? next(current) : next
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value))
    })
  }

  const positioned = useMemo(() => {
    return graph.nodes.map((node, index): PositionedNode => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / graph.nodes.length
      const x = CX + Math.cos(angle) * RX
      const y = CY + Math.sin(angle) * RY
      return {
        ...node,
        x,
        y,
        angle,
      }
    })
  }, [graph.nodes])

  const partBands = useMemo(() => makePartBands(positioned), [positioned])

  const byId = useMemo(
    () => new Map(positioned.map(node => [node.chapter.id, node])),
    [positioned],
  )
  const activePartTitle = hoveredId ? byId.get(hoveredId)?.partTitle : null

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
      </div>

      <div className="chapter-graph-panel">
        <div
          ref={canvasRef}
          className="chapter-graph-canvas"
          onMouseLeave={() => setHoveredId(null)}
          onWheel={(event) => {
            if (!event.ctrlKey && !event.metaKey) return
            event.preventDefault()
            setClampedZoom(current => current + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP))
          }}
        >
          <div className="chapter-graph-zoom" aria-label="Zoom">
            <button type="button" onClick={() => setClampedZoom(current => current - ZOOM_STEP)} aria-label="Graph verkleinern">−</button>
            <button type="button" onClick={() => setClampedZoom(1)} aria-label="Zoom zurücksetzen">{Math.round(zoom * 100)}%</button>
            <button type="button" onClick={() => setClampedZoom(current => current + ZOOM_STEP)} aria-label="Graph vergrößern">+</button>
          </div>
          <div
            className="chapter-graph-stage"
            style={{
              width: `${TOTAL_WIDTH * renderScale}px`,
              height: `${TOTAL_HEIGHT * renderScale}px`,
              '--graph-zoom': zoom,
            } as CSSProperties}
          >
            <svg viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`} role="img" aria-label="Netzwerk der Kapitel-Querverweise">
              <g className="chapter-graph-parts" aria-hidden="true" transform={`translate(${CANVAS_PAD} ${CANVAS_PAD})`}>
                {partBands.map(part => (
                  <g
                    key={part.title}
                    className={[
                      'chapter-graph-part',
                      activePartTitle
                        ? part.partTitle === activePartTitle ? 'chapter-graph-part--active' : 'chapter-graph-part--dimmed'
                        : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <path d={part.path} className="chapter-graph-part-band" />
                    <text
                      x={part.labelX}
                      y={part.labelY}
                      textAnchor={part.labelAnchor}
                      className="chapter-graph-part-label"
                    >
                      {part.title}
                    </text>
                  </g>
                ))}
              </g>
              <g className="chapter-graph-edges" transform={`translate(${CANVAS_PAD} ${CANVAS_PAD})`}>
                {graph.edges.map(edge => {
                  const source = byId.get(edge.sourceId)
                  const target = byId.get(edge.targetId)
                  if (!source || !target) return null
                  const curve = getEdgeCurve(source, target, edge.count)
                  const relation = !hoveredId
                    ? 'idle'
                    : edge.sourceId === hoveredId ? 'outgoing'
                      : edge.targetId === hoveredId ? 'incoming'
                        : 'dimmed'
                  return (
                    <g
                      key={`${edge.sourceId}-${edge.targetId}`}
                      className={`chapter-graph-edge-wrap chapter-graph-edge-wrap--${relation}`}
                    >
                      <path
                        d={curve.path}
                        className="chapter-graph-edge"
                        strokeWidth={Math.min(8, 1.2 + edge.count * 1.05)}
                      />
                      {curve.arrows.map((arrow, index) => (
                        <path
                          key={index}
                          d="M -7 -5 L 1 0 L -7 5"
                          className="chapter-graph-edge-arrow"
                          transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.rotation})`}
                          strokeWidth={Math.min(3.5, 1.2 + edge.count * 0.35)}
                        />
                      ))}
                    </g>
                  )
                })}
              </g>
            </svg>
            <div className="chapter-graph-card-layer" aria-label="Kapitel im Querverweis-Graphen">
              {positioned.map(node => {
                const isEntry = node.chapter.num === '1'
                const isHovered = hoveredId === node.chapter.id
                const active = !hoveredId || isHovered || connectedIds.has(node.chapter.id) || isEntry
                return (
                  <OverviewCard
                    key={node.chapter.id}
                    chapter={node.chapter}
                    badge={isEntry ? 'Einstieg' : undefined}
                    showDescription={isHovered}
                    className={[
                      'overview-card--graph',
                      active ? 'overview-card--graph-active' : '',
                      isEntry ? 'overview-card--graph-entry' : '',
                      isEntry && !hoveredId ? 'overview-card--graph-entry-idle' : '',
                      isHovered ? 'overview-card--graph-hovered' : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      left: `${((node.x + CANVAS_PAD) / TOTAL_WIDTH) * 100}%`,
                      top: `${((node.y + CANVAS_PAD) / TOTAL_HEIGHT) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredId(node.chapter.id)}
                    onFocus={() => setHoveredId(node.chapter.id)}
                  />
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
