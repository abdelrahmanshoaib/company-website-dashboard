// Rich content support: free text with fenced embed blocks.
//
// Authors paste ad/embed code (HTML + <style>) inside fenced blocks:
//
//   ```embed
//   <div class="my-ad">...</div>
//   <style>.my-ad { ... }</style>
//   ```
//
// (```html works as an alias.) Everything outside fences renders as plain
// paragraphs, exactly as before. Embed HTML is sanitized by sanitizeEmbed()
// before rendering: <script>, event handlers, javascript: URLs, meta refresh
// and <base> are stripped; iframes are forced into sandbox mode.

export type ContentBlock = { type: "text"; text: string } | { type: "embed"; html: string };

const FENCE = /```(?:embed|html)\s*\r?\n([\s\S]*?)```/g;

export function splitBlocks(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  FENCE.lastIndex = 0;
  while ((m = FENCE.exec(text)) !== null) {
    if (m.index > last) blocks.push({ type: "text", text: text.slice(last, m.index) });
    if (m[1].trim()) blocks.push({ type: "embed", html: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < text.length) blocks.push({ type: "text", text: text.slice(last) });
  return blocks.filter((b) => b.type === "embed" || b.text.trim().length > 0);
}

// If a title was edited but its SEO meta title was never customized
// (still equals the old title), keep it in sync automatically.
// Returns the merged {en, ar} value.
export function syncMetaTitle(
  storedMeta: { en: string; ar: string },
  oldTitle: { en: string; ar: string },
  newTitle: { en: string; ar: string } | undefined,
  incomingMeta: { en?: string; ar?: string } | undefined
): { en: string; ar: string } {
  const next = { ...storedMeta };
  if (incomingMeta?.en !== undefined) next.en = incomingMeta.en;
  if (incomingMeta?.ar !== undefined) next.ar = incomingMeta.ar;
  if (newTitle?.en && newTitle.en !== oldTitle.en) {
    if (!incomingMeta?.en && storedMeta.en === oldTitle.en) next.en = newTitle.en;
  }
  if (newTitle?.ar !== undefined && newTitle.ar !== oldTitle.ar) {
    if (incomingMeta?.ar === undefined && storedMeta.ar === oldTitle.ar) next.ar = newTitle.ar;
  }
  return next;
}

export function sanitizeEmbed(html: string): string {
  let out = html;
  // Unwrap full pasted documents — keep body content only.
  const bodyMatch = out.match(/<body[^>]*>([\s\S]*)<\/body\s*>/i);
  if (bodyMatch) out = bodyMatch[1];
  // Strip scripts entirely (use sandboxed iframes for JS embeds instead).
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
  out = out.replace(/<\/?script\b[^>]*>/gi, "");
  // Strip event-handler attributes (onclick=, onerror=, ...).
  out = out.replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s"'`=<>]+)/gi, "");
  // Neutralize dangerous URL schemes in href/src/action.
  out = out.replace(
    /\b(href|src|xlink:href|action)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (full: string, attr: string, _q: string, d1: string, d2: string, d3: string) => {
      const url = (d1 ?? d2 ?? d3 ?? "").trim();
      if (/^\s*(javascript|vbscript)/i.test(url)) return `${attr}="#"`;
      if (/^\s*data\s*:\s*text\/html/i.test(url)) return `${attr}="#"`;
      return full;
    }
  );
  // Strip refresh redirects and <base> (would hijack page links).
  out = out.replace(/<meta\b[^>]*http-equiv\s*=\s*["']?refresh[^>]*>/gi, "");
  out = out.replace(/<base\b[^>]*>/gi, "");
  // Force sandbox on iframes missing it (still allows video players).
  out = out.replace(/<iframe\b([^>]*)>/gi, (full: string, attrs: string) => {
    if (/sandbox\s*=/i.test(attrs)) return full;
    return `<iframe sandbox="allow-scripts allow-same-origin allow-presentation"${attrs}>`;
  });
  return out.trim();
}
