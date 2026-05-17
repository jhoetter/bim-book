import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import {
  AIHifi,
  CloseIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
  SearchIcon,
  LinkedModelIcon,
  AgentIcon,
} from 'bim-icons'

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
      } catch { /* malformed */ }
    }
  }
}

// ── Tool labels ────────────────────────────────────────────────────────────────

const TOOL_ACTIVITY: Record<string, (i: Record<string, unknown>) => string> = {
  book_search:   (i) => `Suche nach „${String(i.query ?? '')}"`,
  book_cat:      (i) => `Lese Kapitel ${String(i.chapter ?? '')}`,
  book_ls:       ()  => 'Kapitelübersicht laden',
  book_toc:      ()  => 'Inhaltsverzeichnis abrufen',
  book_metadata: ()  => 'Buchmetadaten abrufen',
  book_image:    (i) => `Abbildung ${String(i.id ?? '')} laden`,
  calc_u_value:  ()  => 'U-Wert berechnen',
  calc_dewpoint: ()  => 'Taupunkt analysieren',
  calc_sound:    ()  => 'Schallschutz berechnen',
  calc_hoai:     ()  => 'HOAI-Honorar ermitteln',
}

function toolIcon(name: string, isDone: boolean) {
  if (isDone)                      return <CheckIcon size={12} strokeWidth={2.5} />
  if (name.startsWith('book_search')) return <SearchIcon size={12} strokeWidth={2} />
  if (name.startsWith('calc_'))    return <AgentIcon size={12} strokeWidth={2} />
  return <LinkedModelIcon size={12} strokeWidth={1.5} />
}

// ── Tool activity pill ─────────────────────────────────────────────────────────

function ToolCard({ item, onToggle }: { item: ToolCallContent; onToggle: () => void }) {
  const fn = TOOL_ACTIVITY[item.name]
  const label = fn ? fn(item.input) : item.name.replace(/_/g, ' ')
  const isDone = item.result !== undefined

  return (
    <div className="chat-activity-wrap">
      <button
        className={`chat-activity ${isDone ? 'chat-activity--done' : 'chat-activity--running'}`}
        onClick={isDone ? onToggle : undefined}
        type="button"
      >
        <span className={`chat-activity__icon ${isDone ? 'chat-activity__icon--done' : 'chat-activity__icon--running'}`}>
          {toolIcon(item.name, isDone)}
        </span>
        <span className="chat-activity__label">{label}</span>
        {!isDone && <span className="chat-activity__pulse" />}
        {isDone && (
          <span className="chat-activity__toggle">
            {item.expanded ? <ChevronDownIcon size={10} strokeWidth={2} /> : <ChevronRightIcon size={10} strokeWidth={2} />}
          </span>
        )}
      </button>
      {isDone && item.expanded && (
        <div className="chat-activity__details">
          {item.result!.slice(0, 800)}{item.result!.length > 800 ? '\n…' : ''}
        </div>
      )}
    </div>
  )
}

// ── Assistant message ──────────────────────────────────────────────────────────

// Normalize LaTeX delimiters the AI might output (\[...\] → $$...$$, \(...\) → $...$)
function normalizeMath(text: string): string {
  return text
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `$$${m}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m}$`)
}

function AssistantMessage({ items, onToggleTool }: { items: ContentItem[]; onToggleTool: (id: string) => void }) {
  return (
    <div className="chat-msg chat-msg--assistant">
      {items.map((item, i) => {
        if (item.type === 'text') {
          return item.text ? (
            <div key={i} className="chat-msg-prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
              >
                {normalizeMath(item.text)}
              </ReactMarkdown>
            </div>
          ) : null
        }
        return <ToolCard key={item.id} item={item} onToggle={() => onToggleTool(item.id)} />
      })}
    </div>
  )
}

// ── Expand icon (no bim-icons equivalent) ─────────────────────────────────────

function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="8,1 12,1 12,5" />
      <line x1="7.5" y1="5.5" x2="12" y2="1" />
      <polyline points="5,12 1,12 1,8" />
      <line x1="5.5" y1="7.5" x2="1" y2="12" />
    </svg>
  )
}

function CollapseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="12,5 8,5 8,1" />
      <line x1="8" y1="5" x2="12.5" y2="0.5" />
      <polyline points="1,8 5,8 5,12" />
      <line x1="5" y1="8" x2="0.5" y2="12.5" />
    </svg>
  )
}

// ── Suggestions ────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Wie berechne ich den U-Wert einer Außenwand?',
  'Was sind die HOAI Leistungsphasen?',
  'Erkläre Taupunkt und Kondensation',
]

// ── Main ChatPanel ─────────────────────────────────────────────────────────────

export function ChatPanel() {
  const [open, setOpen]         = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [streaming, setStreaming] = useState(false)
  const messagesRef  = useRef<HTMLDivElement>(null)
  const bottomRef    = useRef<HTMLDivElement>(null)
  const abortRef     = useRef<AbortController | null>(null)
  const textareaRef  = useRef<HTMLTextAreaElement>(null)
  const atBottomRef  = useRef(true)

  const pendingMsgRef = useRef<string | null>(null)

  // Listen for palette commands
  useEffect(() => {
    const onOpen = () => setOpen(true)
    const onSend = (e: Event) => {
      const msg = (e as CustomEvent<{ message: string }>).detail?.message
      if (msg) { pendingMsgRef.current = msg }
      setOpen(true)
    }
    document.addEventListener('bim:open-chat', onOpen)
    document.addEventListener('bim:chat-send', onSend)
    return () => {
      document.removeEventListener('bim:open-chat', onOpen)
      document.removeEventListener('bim:chat-send', onSend)
    }
  }, [])

  // Auto-focus on open, auto-send if a message was queued from the palette
  useEffect(() => {
    if (!open) return
    const pending = pendingMsgRef.current
    if (pending) {
      pendingMsgRef.current = null
      setTimeout(() => send(pending), 80)
    } else {
      setTimeout(() => textareaRef.current?.focus(), 50)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Track whether user has scrolled away from bottom
  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const onScroll = () => {
      atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-scroll only when user is near the bottom
  useEffect(() => {
    if (atBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, streaming])

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

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

  const send = useCallback(async (text?: string) => {
    const msgText = (text ?? input).trim()
    if (!msgText || streaming) return

    setInput('')
    setStreaming(true)
    atBottomRef.current = true

    const userMsg: Message      = { role: 'user',      items: [{ type: 'text', text: msgText }] }
    const assistantMsg: Message = { role: 'assistant', items: [] }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    const assistantIndex = messages.length + 1

    const history = [
      ...messages.flatMap(m => {
        const txt = m.items.filter(i => i.type === 'text').map(i => (i as TextContent).text).join('')
        return txt ? [{ role: m.role, content: txt }] : []
      }),
      { role: 'user', content: msgText },
    ]

    const ctrl = new AbortController()
    abortRef.current = ctrl

    const update = (fn: (msg: Message) => Message) =>
      setMessages(prev => prev.map((m, i) => i === assistantIndex ? fn(m) : m))

    try {
      await streamChat(
        history,
        (delta) => update(msg => {
          const items = [...msg.items]
          const last = items[items.length - 1]
          if (last?.type === 'text') return { ...msg, items: [...items.slice(0, -1), { type: 'text', text: last.text + delta }] }
          return { ...msg, items: [...items, { type: 'text', text: delta }] }
        }),
        (id, name, toolInput) => update(msg => ({
          ...msg, items: [...msg.items, { type: 'tool_call', id, name, input: toolInput, expanded: false }],
        })),
        (toolUseId, result) => update(msg => ({
          ...msg, items: msg.items.map(item =>
            item.type === 'tool_call' && item.id === toolUseId ? { ...item, result } : item
          ),
        })),
        () => setStreaming(false),
        (errMsg) => {
          update(msg => ({ ...msg, items: [...msg.items, { type: 'text', text: `Fehler: ${errMsg}` }] }))
          setStreaming(false)
        },
        ctrl.signal,
      )
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        update(msg => ({ ...msg, items: [...msg.items, { type: 'text', text: 'Verbindungsfehler — läuft der API-Server? (make server-dev)' }] }))
      }
      setStreaming(false)
    }
  }, [input, streaming, messages])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const stop  = () => { abortRef.current?.abort(); setStreaming(false) }
  const clear = () => { stop(); setMessages([]) }

  return (
    <>
      <button
        className={`chat-bubble ${open ? 'chat-bubble--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="BIM-Assistent"
        type="button"
      >
        {open ? <CloseIcon size={18} strokeWidth={2} /> : <AIHifi size={26} />}
      </button>

      {open && (
        <div className={`chat-panel ${expanded ? 'chat-panel--expanded' : ''}`}>
          {/* Header */}
          <div className="chat-panel-header">
            <span className="chat-panel-title">BIM-Assistent</span>
            <div className="chat-panel-actions">
              {messages.length > 0 && (
                <button className="chat-icon-btn" onClick={clear} title="Verlauf löschen" type="button">
                  <DeleteIcon size={13} strokeWidth={1.5} />
                </button>
              )}
              <button className="chat-icon-btn" onClick={() => setExpanded(e => !e)} title={expanded ? 'Verkleinern' : 'Vergrößern'} type="button">
                {expanded ? <CollapseIcon /> : <ExpandIcon />}
              </button>
              <button className="chat-icon-btn" onClick={() => setOpen(false)} title="Schließen" type="button">
                <CloseIcon size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={messagesRef}>
            {messages.length === 0 && (
              <div className="chat-empty">
                <p className="chat-empty-label">Frag mich alles zum Buch</p>
                <ul className="chat-suggestions">
                  {SUGGESTIONS.map(s => (
                    <li key={s}>
                      <button className="chat-suggestion" onClick={() => send(s)} type="button">{s}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((msg, i) =>
              msg.role === 'user' ? (
                <div key={i} className="chat-msg chat-msg--user">
                  {(msg.items[0] as TextContent).text}
                </div>
              ) : (
                <AssistantMessage key={i} items={msg.items} onToggleTool={(id) => toggleTool(i, id)} />
              )
            )}

            {streaming && messages[messages.length - 1]?.items.length === 0 && (
              <div className="chat-thinking"><span /><span /><span /></div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-field">
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Frage stellen…"
                rows={1}
                disabled={streaming}
              />
              {streaming ? (
                <button className="chat-send-btn chat-send-btn--stop" onClick={stop} type="button" title="Abbrechen">
                  <span className="chat-stop-icon" />
                </button>
              ) : (
                <button className="chat-send-btn" onClick={() => send()} disabled={!input.trim()} type="button" title="Senden">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6.5" y1="11" x2="6.5" y2="2" />
                    <polyline points="3,5 6.5,2 10,5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
