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
  out = out.replace(
    /^!!! (\w+)(?:\s+"([^"]*)")?\n((?:(?:    |\t)[^\n]*\n?)*)/gm,
    (_match, type: string, title: string | undefined, body: string) => {
      const content = body.replace(/^(    |\t)/gm, '').trim()
      const titleHtml = title
        ? `<p class="admonition-title">${title}</p>\n\n`
        : ''
      return `\n<div class="admonition admonition-${type}">\n\n${titleHtml}${content}\n\n</div>\n`
    },
  )

  // 3. Fix relative image paths: ../assets/ → /assets/
  out = out.replace(/\]\(\.\.\/assets\//g, '](/assets/')

  return out
}
