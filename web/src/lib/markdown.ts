function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/\n/g, ' ').trim()
}

// Preprocess mkdocs-flavoured markdown into standard HTML-enriched markdown
export function preprocessMarkdown(raw: string): string {
  let out = raw

  // 0. Convert <!-- IMAGE\nkey: val\n...\n-->\n![alt](path) pairs into <img-placeholder> elements
  out = out.replace(
    /<!-- IMAGE\n([\s\S]*?)-->\n!\[([^\]]*)\]\(([^)]*)\)/g,
    (_match, body: string, alt: string, path: string) => {
      const attrs: Record<string, string> = {}
      for (const line of body.trim().split('\n')) {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue
        const key = line.slice(0, colonIdx).trim()
        const value = line.slice(colonIdx + 1).trim()
        if (key && value) attrs[key] = value
      }
      const src = path.replace('../assets/', '/assets/')
      return (
        `<img-placeholder` +
        ` data-name="${escAttr(attrs.name ?? '')}"` +
        ` data-type="${escAttr(attrs.type ?? '')}"` +
        ` data-size="${escAttr(attrs.size ?? '')}"` +
        ` data-desc="${escAttr(attrs.desc ?? '')}"` +
        ` data-caption="${escAttr(attrs.caption ?? '')}"` +
        ` data-tags="${escAttr(attrs.tags ?? '')}"` +
        ` data-src="${escAttr(src)}"` +
        ` data-alt="${escAttr(alt)}"` +
        `></img-placeholder>`
      )
    }
  )

  // 1. Strip mkdocs tabbed syntax (=== "Tab"\n    content) → bold heading + content
  out = out.replace(
    /^=== "([^"]+)"\n((?:(?:    |\t)[^\n]*\n?)*)/gm,
    (_match, title: string, body: string) => {
      const content = body.replace(/^(    |\t)/gm, '')
      return `\n**${title}**\n\n${content}`
    },
  )

  // 2. Convert !!! type "title"\n    content → <div class="admonition …">
  // Body pattern also captures blank lines so multi-paragraph/code/table blocks stay inside
  out = out.replace(
    /^!!! (\w+)(?:\s+"([^"]*)")?\n((?:(?:(?:    |\t)[^\n]*|)\n)*)/gm,
    (_match, type: string, title: string | undefined, body: string) => {
      if (type === 'ziel') return '\n'

      const content = body.replace(/^(    |\t)/gm, '').trim()
      const titleHtml = title
        ? `<p class="admonition-title">${title}</p>\n\n`
        : ''
      return `\n<div class="admonition admonition-${type}">\n\n${titleHtml}${content}\n\n</div>\n\n`
    },
  )

  // 3. Convert LaTeX \[...\] display math → $$...$$ (remark-math v6 only supports $/$$ delimiters)
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `$$${math}$$`)
  // Convert \(...\) inline math → $...$
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math}$`)

  // 4. Strip subtitle line + intro description block (between first two --- after H1)
  out = out.replace(
    /^(# [^\n]+\n)(?:\n\*[^\n]+\*\n)?\n---\n[\s\S]*?\n---\n/,
    '$1\n',
  )

  // 5. Fix relative image paths: ../assets/ → /assets/
  out = out.replace(/\]\(\.\.\/assets\//g, '](/assets/')

  // 6. Convert ::TERM:: markers to gloss spans for hover tooltips
  // Matches letters, digits, hyphens, German umlauts, apostrophes, spaces
  out = out.replace(/::([\w\-äöüÄÖÜß' ]+)::/g, (_, term: string) => {
    const id = term.trim().toLowerCase()
    return `<span data-gloss="${id}">${term.trim()}</span>`
  })

  // 7. Convert ^^formula-id^^ markers to formula spans
  out = out.replace(/\^\^([\w\-]+)\^\^/g, (_, id: string) =>
    `<span data-formula="${id.trim()}"></span>`
  )

  return out
}
