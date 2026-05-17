import { config } from 'dotenv'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '..', '..', '.env') })

import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import type { MessageParam, ContentBlock } from '@anthropic-ai/sdk/resources/messages.js'
import { BOOK_TOOLS, executeTool } from './book-tools.js'

const app = express()
app.use(cors())
app.use(express.json())

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Du bist ein intelligenter Assistent für das Fachbuch "BIM von Grund auf" von Johannes Hötter.

Das Buch behandelt Architektur, Bautechnik, Bauphysik, TGA (technische Gebäudeausrüstung), Recht & Prozesse sowie Building Information Modeling (BIM).

Du hast Zugriff auf alle Kapitel des Buchs und auf bauphysikalische Rechentools. Nutze sie aktiv:

Buchwerkzeuge:
- book_search oder book_toc: Relevante Abschnitte finden
- book_cat: Genaue Inhalte lesen (gibt auch Bildbeschreibungen zurück)
- book_metadata / book_image: Metadaten und Abbildungen abfragen
- Zitiere konkrete Stellen und nenne das Kapitel

Rechentools (direkt berechenbar, ohne Buch):
- calc_u_value: U-Wert-Berechnung nach DIN EN ISO 6946 + GEG 2024 Vergleich
- calc_dewpoint: Taupunkt & Schimmelrisiko nach DIN 4108-2
- calc_sound: Schalldämmmaß R'w nach Massengesetz + DIN 4109
- calc_hoai: HOAI 2021 Honorarberechnung für Objektplanung

Antworte präzise, sachlich und auf Deutsch. Wenn du etwas nicht weißt oder es nicht im Buch steht, sag es klar.`

interface SSEEvent {
  type: 'text' | 'tool_call' | 'tool_result' | 'done' | 'error'
  content?: string
  id?: string
  name?: string
  input?: Record<string, unknown>
  tool_use_id?: string
  result?: string
  message?: string
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body as { messages: MessageParam[] }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY nicht gesetzt' })
    return
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  const send = (event: SSEEvent) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`)
  }

  try {
    let currentMessages: MessageParam[] = [...messages]
    const MAX_TURNS = 8

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const pendingToolUses: Map<string, { id: string; name: string; inputJson: string }> = new Map()
      const completedToolUses: Array<{ id: string; name: string; input: Record<string, unknown> }> = []
      let activeBlockIndex: number | null = null

      const stream = anthropic.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: currentMessages,
        tools: BOOK_TOOLS,
      })

      for await (const event of stream) {
        if (event.type === 'content_block_start') {
          activeBlockIndex = event.index
          if (event.content_block.type === 'tool_use') {
            pendingToolUses.set(String(event.index), {
              id: event.content_block.id,
              name: event.content_block.name,
              inputJson: '',
            })
          }
        } else if (event.type === 'content_block_delta') {
          if (event.delta.type === 'text_delta') {
            send({ type: 'text', content: event.delta.text })
          } else if (event.delta.type === 'input_json_delta') {
            const pending = pendingToolUses.get(String(event.index))
            if (pending) pending.inputJson += event.delta.partial_json
          }
        } else if (event.type === 'content_block_stop') {
          const pending = pendingToolUses.get(String(activeBlockIndex))
          if (pending) {
            let input: Record<string, unknown> = {}
            try { input = JSON.parse(pending.inputJson || '{}') } catch { /* */ }
            send({ type: 'tool_call', id: pending.id, name: pending.name, input })
            completedToolUses.push({ id: pending.id, name: pending.name, input })
          }
        }
      }

      const finalMsg = await stream.finalMessage()

      if (finalMsg.stop_reason !== 'tool_use' || completedToolUses.length === 0) break

      // Execute all tools and collect results
      const toolResults: Array<{ type: 'tool_result'; tool_use_id: string; content: string }> = []
      for (const toolUse of completedToolUses) {
        const result = executeTool(toolUse.name, toolUse.input)
        send({ type: 'tool_result', tool_use_id: toolUse.id, name: toolUse.name, result })
        toolResults.push({ type: 'tool_result', tool_use_id: toolUse.id, content: result })
      }

      currentMessages = [
        ...currentMessages,
        { role: 'assistant', content: finalMsg.content as ContentBlock[] },
        { role: 'user', content: toolResults },
      ]
    }

    send({ type: 'done' })
  } catch (err) {
    send({ type: 'error', message: String(err) })
  } finally {
    res.end()
  }
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: !!process.env.ANTHROPIC_API_KEY })
})

const PORT = process.env.PORT ?? 51741
app.listen(PORT, () => {
  console.log(`BIM Book API server running on http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠  ANTHROPIC_API_KEY nicht gesetzt – /api/chat wird nicht funktionieren')
  }
})
