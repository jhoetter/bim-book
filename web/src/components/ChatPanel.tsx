import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// ── Types ──────────────────────────────────────────────────────────────────────

interface TextContent  { type: 'text'; text: string }
interface ToolCallContent {
  type: 'tool_call'
  id: string
  name: string
  input: Record<string, unknown>
  result?: string
  expanded: boolean
}

type ContentItem = TextContent | ToolCallContent

interface Message {
  role: 'user' | 'assistant'
  items: ContentItem[]
}

// ── SSE streaming ──────────────────────────────────────────────────────────────

async function streamChat(
  userMessages: Array<{ role: string; content: string }>,
  onText: (delta: string) => void,
  onToolCall: (id: string, name: string, input: Record<string, unknown>) => void,
  onToolResult: (id: string, result: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
  signal: AbortSignal,
): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: userMessages }),
    signal,
  })

  if (!res.ok) {
    onError(`HTTP ${res.status}: ${await res.text()}`)
    return
  }

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buf = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })

    const lines = buf.split('\n')
    buf = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      try {
        const ev = JSON.parse(line.slice(6))
        if (ev.type === 'text')        onText(ev.content)
        if (ev.type === 'tool_call')   onToolCall(ev.id, ev.name, ev.input)
        if (ev.type === 'tool_result') onToolResult(ev.tool_use_id, ev.result)
        if (ev.type === 'done')        onDone()
        if (ev.type === 'error')       onError(ev.message)
      } catch { /* malformed event */ }
    }
  }
}

// ── Tool name display ──────────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  book_ls:       'book ls',
  book_cat:      'book cat',
  book_search:   'book search',
  book_toc:      'book toc',
  book_metadata: 'book metadata',
}

function ToolCard({ item, onToggle }: { item: ToolCallContent; onToggle: () => void }) {
  const label = TOOL_LABELS[item.name] ?? item.name
  const argStr = Object.entries(item.input)
    .map(([k, v]) => `--${k}="${String(v)}"`)
    .join(' ')

  return (
    <div className="chat-tool-card">
      <button className="chat-tool-header" onClick={onToggle} type="button">
        <span className="chat-tool-prompt">$</span>
        <span className="chat-tool-cmd">{label}</span>
        {argStr && <span className="chat-tool-args">{argStr}</span>}
        <span className="chat-tool-status">
          {item.result !== undefined ? '✓' : <span className="chat-tool-spinner" />}
        </span>
        <span className="chat-tool-toggle">{item.expanded ? '▲' : '▼'}</span>
      </button>

      {item.expanded && (
        <div className="chat-tool-body">
          {item.result !== undefined ? (
            <pre className="chat-tool-output">{item.result.slice(0, 800)}{item.result.length > 800 ? '\n…' : ''}</pre>
          ) : (
            <span className="chat-tool-running">Wird ausgeführt…</span>
          )}
        </div>
      )}
    </div>
  )
}

// ── Message display ────────────────────────────────────────────────────────────

function AssistantMessage({
  items,
  onToggleTool,
}: {
  items: ContentItem[]
  onToggleTool: (id: string) => void
}) {
  return (
    <div className="chat-msg chat-msg--assistant">
      {items.map((item, i) => {
        if (item.type === 'text') {
          return item.text ? (
            <div key={i} className="chat-msg-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.text}</ReactMarkdown>
            </div>
          ) : null
        }
        return (
          <ToolCard
            key={item.id}
            item={item}
            onToggle={() => onToggleTool(item.id)}
          />
        )
      })}
    </div>
  )
}

// ── Main ChatPanel ─────────────────────────────────────────────────────────────

export function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const toggleTool = useCallback((msgIndex: number, toolId: string) => {
    setMessages(prev => prev.map((msg, i) => {
      if (i !== msgIndex) return msg
      return {
        ...msg,
        items: msg.items.map(item =>
          item.type === 'tool_call' && item.id === toolId
            ? { ...item, expanded: !item.expanded }
            : item
        ),
      }
    }))
  }, [])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return

    setInput('')
    setStreaming(true)

    const userMsg: Message = { role: 'user', items: [{ type: 'text', text }] }
    const assistantMsg: Message = { role: 'assistant', items: [] }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    const assistantIndex = messages.length + 1

    // Build conversation history for API
    const history = [
      ...messages.flatMap(m => {
        const textParts = m.items.filter(i => i.type === 'text').map(i => (i as TextContent).text).join('')
        return textParts ? [{ role: m.role, content: textParts }] : []
      }),
      { role: 'user', content: text },
    ]

    const ctrl = new AbortController()
    abortRef.current = ctrl

    const updateAssistant = (fn: (msg: Message) => Message) => {
      setMessages(prev => prev.map((m, i) => i === assistantIndex ? fn(m) : m))
    }

    try {
      await streamChat(
        history,
        (delta) => {
          updateAssistant(msg => {
            const items = [...msg.items]
            const last = items[items.length - 1]
            if (last?.type === 'text') {
              return { ...msg, items: [...items.slice(0, -1), { type: 'text', text: last.text + delta }] }
            }
            return { ...msg, items: [...items, { type: 'text', text: delta }] }
          })
        },
        (id, name, toolInput) => {
          updateAssistant(msg => ({
            ...msg,
            items: [...msg.items, { type: 'tool_call', id, name, input: toolInput, expanded: false }],
          }))
        },
        (toolUseId, result) => {
          updateAssistant(msg => ({
            ...msg,
            items: msg.items.map(item =>
              item.type === 'tool_call' && item.id === toolUseId
                ? { ...item, result }
                : item
            ),
          }))
        },
        () => setStreaming(false),
        (errMsg) => {
          updateAssistant(msg => ({
            ...msg,
            items: [...msg.items, { type: 'text', text: `\n\n*Fehler: ${errMsg}*` }],
          }))
          setStreaming(false)
        },
        ctrl.signal,
      )
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        updateAssistant(msg => ({
          ...msg,
          items: [...msg.items, { type: 'text', text: `\n\n*Verbindungsfehler*` }],
        }))
      }
      setStreaming(false)
    }
  }, [input, streaming, messages])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    setStreaming(false)
  }

  const clear = () => {
    stop()
    setMessages([])
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`chat-bubble ${open ? 'chat-bubble--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="BIM-Assistent"
        type="button"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H7l-4 3V15H4a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="chat-panel-title">
              <span className="chat-panel-dot" />
              BIM-Assistent
            </div>
            <div className="chat-panel-actions">
              {messages.length > 0 && (
                <button className="chat-icon-btn" onClick={clear} title="Verlauf löschen" type="button">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 4h10M6 4V2.5h4V4M5.5 4l.5 9h4l.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <button className="chat-icon-btn" onClick={() => setOpen(false)} title="Schließen" type="button">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <div className="chat-empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                  </svg>
                </div>
                <p>Stell mir eine Frage zum Buch!</p>
                <p className="chat-empty-hint">Ich kann alle 23 Kapitel durchsuchen und dir präzise Antworten mit Quellenangaben geben.</p>
              </div>
            )}

            {messages.map((msg, i) => (
              msg.role === 'user' ? (
                <div key={i} className="chat-msg chat-msg--user">
                  {(msg.items[0] as TextContent).text}
                </div>
              ) : (
                <AssistantMessage
                  key={i}
                  items={msg.items}
                  onToggleTool={(toolId) => toggleTool(i, toolId)}
                />
              )
            ))}

            {streaming && (
              <div className="chat-thinking">
                <span /><span /><span />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Frage stellen… (Enter zum Senden)"
              rows={2}
              disabled={streaming}
            />
            <div className="chat-input-actions">
              {streaming ? (
                <button className="chat-send-btn chat-send-btn--stop" onClick={stop} type="button">
                  Stopp
                </button>
              ) : (
                <button
                  className="chat-send-btn"
                  onClick={send}
                  disabled={!input.trim()}
                  type="button"
                >
                  Senden
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
