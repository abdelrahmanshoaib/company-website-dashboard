import { splitBlocks, sanitizeEmbed } from "@/lib/sanitize";

// Renders free text with fenced ```embed blocks.
// Plain text behaves exactly like before (blank line = new paragraph).
// Embed blocks render their sanitized HTML+CSS inline so ad code keeps
// its full styling. <script> is always stripped for security.
export function RichContent({ text, className }: { text: string; className?: string }) {
  const blocks = splitBlocks(text);
  return (
    <div className={className}>
      {blocks.map((b, i) =>
        b.type === "embed" ? (
          <div
            key={i}
            className="embed-block"
            dangerouslySetInnerHTML={{ __html: sanitizeEmbed(b.html) }}
          />
        ) : (
          b.text.split(/\n{2,}/).map((p, j) => (
            <p key={`${i}-${j}`} className="mt-4 leading-loose text-[var(--color-ink)]/90">
              {p}
            </p>
          ))
        )
      )}
    </div>
  );
}
