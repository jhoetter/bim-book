// Preprocess mkdocs-flavoured markdown into standard HTML-enriched markdown
export function preprocessMarkdown(raw: string): string {
  let out = raw

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
      const content = body.replace(/^(    |\t)/gm, '').trim()
      const titleHtml = title
        ? `<p class="admonition-title">${title}</p>\n\n`
        : ''
      return `\n<div class="admonition admonition-${type}">\n\n${titleHtml}${content}\n\n</div>\n`
    },
  )

  // 3. Convert LaTeX \[...\] display math → $$...$$ (remark-math v6 only supports $/$$ delimiters)
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `$$${math}$$`)
  // Convert \(...\) inline math → $...$
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math}$`)

  // 4. Fix relative image paths: ../assets/ → /assets/
  out = out.replace(/\]\(\.\.\/assets\//g, '](/assets/')

  // 5. Convert ::TERM:: markers to gloss spans for hover tooltips
  // Matches letters, digits, hyphens, German umlauts, apostrophes, spaces
  out = out.replace(/::([\w\-äöüÄÖÜß' ]+)::/g, (_, term: string) => {
    const id = term.trim().toLowerCase()
    return `<span data-gloss="${id}">${term.trim()}</span>`
  })

  // 6. Convert ^^formula-id^^ markers to formula spans
  out = out.replace(/\^\^([\w\-]+)\^\^/g, (_, id: string) =>
    `<span data-formula="${id.trim()}"></span>`
  )

  return out
}
