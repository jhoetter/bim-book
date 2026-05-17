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

// ── Print-safe Formelsammlung: cards without interactive toggles ───────────
function FormelSammlungPrint() {
  return (
    <div className="formel-sammlung formel-sammlung--print">
      {FORMULAS.map(entry => (
        <div key={entry.id} className="formel-card">
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
      ))}
    </div>
  )
}

const PLACEHOLDER = () => (
  <div className="pdf-no-interactive">
    Interaktiver Rechner — nur in der Web-App verfügbar
  </div>
)

const PRINT_COMPONENTS: Partial<Components> = {
  'calc-u-value':    PLACEHOLDER,
  'calc-dewpoint':   PLACEHOLDER,
  'calc-sound':      PLACEHOLDER,
  'calc-hoai':       PLACEHOLDER,
  'glossar-full':    () => <GlossarPrint />,
  'formel-sammlung': () => <FormelSammlungPrint />,
} as unknown as Partial<Components>

export function PrintMarkdownPage({ content }: { content: string }) {
  const processed = preprocessMarkdown(content)
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
        components={{
          ...PRINT_COMPONENTS,
          img({ src, alt }) {
            return (
              <figure>
                <img src={src} alt={alt ?? ''} loading="eager" />
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
                  <span className="formula-badge-label">{entry.badge}</span>
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
