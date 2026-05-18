import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import katex from 'katex'
import { preprocessMarkdown } from '../lib/markdown'
import { GLOSSAR } from '../data/glossar'
import { FORMULAS, FORMULA_MAP } from '../data/formulas'
import { SOURCES } from '../data/sources'
import type { FormulaEntry } from '../data/formulas'
import type { Components } from 'react-markdown'

function tex(src: string, display = false) {
  return katex.renderToString(src, { throwOnError: false, displayMode: display, output: 'html', trust: false })
}

// ── Print-safe Glossar: clean 2-column grid ────────────────────────────────
function GlossarPrint() {
  return (
    <div className="glossar-print">
      {GLOSSAR.map(entry => (
        <div key={entry.id} className="gp-entry">
          <div className="gp-term">
            <span className="gp-name">{entry.term}</span>
            {entry.abbrev && <span className="gp-abbrev">{entry.abbrev}</span>}
          </div>
          <p className="gp-def">{entry.definition}</p>
        </div>
      ))}
    </div>
  )
}

// ── Single formula card (reused for Formelsammlung and inline calc replacements)
function FormulaCard({ entry }: { entry: FormulaEntry }) {
  return (
    <div className="formel-card">
      <div className="formel-card-header">
        <h3 className="formel-card-name">{entry.name}</h3>
        {entry.norm && <span className="formel-card-norm">{entry.norm}</span>}
      </div>
      <div
        className="formel-card-display"
        dangerouslySetInnerHTML={{ __html: tex(entry.displayTex, true) }}
      />
      {entry.variables.length > 0 && (
        <table className="formel-vars-table">
          <tbody>
            {entry.variables.map(v => (
              <tr key={v.symbol} className="formel-var-row">
                <td className="formel-var-sym" dangerouslySetInnerHTML={{ __html: tex(v.symbol) }} />
                <td className="formel-var-desc">{v.description}</td>
                <td className="formel-var-unit">{v.unit}</td>
                {v.example && <td className="formel-var-example">z.B. {v.example}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {entry.example && (
        <div className="formel-card-example">
          <span className="formel-example-label">Beispiel · Kastanienallee 7: </span>
          <span className="formel-example-text">{entry.example.description}</span>
          <span className="formel-example-result">
            {' → '}<strong>{entry.example.result} {entry.example.unit}</strong>
          </span>
        </div>
      )}
    </div>
  )
}

// ── Print-safe Formelsammlung: all formula cards ───────────────────────────
function FormelSammlungPrint() {
  return (
    <div className="formel-sammlung formel-sammlung--print">
      {FORMULAS.map(entry => <FormulaCard key={entry.id} entry={entry} />)}
    </div>
  )
}

function QuellenPrint() {
  return (
    <div className="quellen-print">
      {SOURCES.map(entry => (
        <div key={entry.id} className="qp-entry">
          <div className="qp-head">
            <span className="qp-title">{entry.title}</span>
            <span className="qp-kind">{entry.group} · {entry.kind}</span>
          </div>
          <p className="qp-note">{entry.note}</p>
        </div>
      ))}
    </div>
  )
}

// ── Inline calc replacements: show the formula, skip the interactive UI ────
function CalcCard({ id }: { id: string }) {
  const entry = FORMULA_MAP[id]
  if (!entry) return null
  return (
    <div className="formel-sammlung formel-sammlung--print">
      <FormulaCard entry={entry} />
    </div>
  )
}

const PRINT_COMPONENTS: Partial<Components> = {
  'calc-u-value':    () => <CalcCard id="u-wert" />,
  'calc-dewpoint':   () => <CalcCard id="glaser" />,
  'calc-sound':      () => <CalcCard id="schalldaemmass" />,
  'calc-hoai':       () => <CalcCard id="hoai" />,
  'glossar-full':    () => <GlossarPrint />,
  'formel-sammlung': () => <FormelSammlungPrint />,
  'quellen-referenz': () => <QuellenPrint />,
} as unknown as Partial<Components>

function normalizeImageSrc(src: string | undefined): string | undefined {
  if (!src) return undefined
  if (src.startsWith('http') || src.startsWith('/')) return src
  if (src.startsWith('../assets/')) return src.replace('../assets/', '/assets/')
  if (src.startsWith('assets/')) return `/${src}`
  return src
}

function PrintImagePlaceholder({ node }: { node?: { properties?: Record<string, unknown> } }) {
  const p = node?.properties ?? {}
  const src = normalizeImageSrc((p.dataSrc as string | undefined) ?? '')
  const alt = (p.dataAlt as string | undefined) ?? ''
  const caption = (p.dataCaption as string | undefined) || alt

  if (!src) return null

  return (
    <figure>
      <img src={src} alt={alt} loading="eager" decoding="sync" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function PrintMarkdownPage({ content }: { content: string }) {
  const processed = preprocessMarkdown(content)
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
        components={{
          ...PRINT_COMPONENTS,
          'img-placeholder': PrintImagePlaceholder,
          img({ src, alt }) {
            const normalizedSrc = normalizeImageSrc(src)
            return (
              <figure>
                <img src={normalizedSrc} alt={alt ?? ''} loading="eager" decoding="sync" />
                {alt && <figcaption>{alt}</figcaption>}
              </figure>
            )
          },
          span(props) {
            const { node, children, ...rest } = props as typeof props & { node?: { properties?: Record<string, unknown> } }
            const glossTerm = node?.properties?.dataGloss as string | undefined
            const formulaId = node?.properties?.dataFormula as string | undefined
            if (glossTerm) {
              return <span className="gloss-print">{children}</span>
            }
            if (formulaId) {
              const entry = FORMULA_MAP[formulaId]
              if (!entry) return <span>[?]</span>
              return (
                <span className="formula-print">
                  <span className="formula-badge-icon">ƒ</span>
                  <span className="formula-badge-label">{entry.name}</span>
                </span>
              )
            }
            return <span {...rest}>{children}</span>
          },
          a({ href, children, ...rest }) {
            const isExternal = href?.startsWith('http')
            return (
              <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} {...rest}>
                {children}
              </a>
            )
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  )
}
