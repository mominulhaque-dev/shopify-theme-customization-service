import sanitizeHtml from "sanitize-html";
import type { BlogBlock } from "@/data/blog";
import { slug as toSlug } from "@/lib/slug";

/**
 * HTML helpers for blog bodies. Posts written in the admin are stored as HTML
 * (from the rich-text editor); the original five posts are data blocks and are
 * converted to the same HTML so one renderer serves both.
 */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Escapes text and turns [label](/path/) into links. */
export function inlineToHtml(text: string): string {
  return esc(text).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, (_m, label: string, href: string) => `<a href="${href}">${label}</a>`);
}

export function blocksToHtml(blocks: BlogBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `<h2>${esc(b.text)}</h2>`;
        case "h3":
          return `<h3>${esc(b.text)}</h3>`;
        case "p":
          return `<p>${inlineToHtml(b.text)}</p>`;
        case "list": {
          const tag = b.ordered ? "ol" : "ul";
          return `<${tag}>${b.items.map((i) => `<li><p>${inlineToHtml(i)}</p></li>`).join("")}</${tag}>`;
        }
        case "callout":
          return `<blockquote><p><strong>${esc(b.title)}</strong></p><p>${inlineToHtml(b.text)}</p></blockquote>`;
        case "table":
          return `<table><tbody><tr>${b.columns.map((c) => `<th><p>${esc(c)}</p></th>`).join("")}</tr>${b.rows
            .map((r) => `<tr>${r.map((c) => `<td><p>${esc(c)}</p></td>`).join("")}</tr>`)
            .join("")}</tbody></table>`;
      }
    })
    .join("\n");
}

/** Allow-list for anything that came from the editor. */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "code", "pre",
      "a", "ul", "ol", "li", "blockquote", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "title"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      col: ["span"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external = /^https?:\/\//i.test(href);
        const out: Record<string, string> = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
        return { tagName, attribs: out };
      },
    },
  });
}

const stripTags = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

/**
 * Final pass before render: ids on h2 (for the table of contents), internal
 * links styled as site links, tables wrapped so they scroll on phones, lazy images.
 */
export function prepareHtml(html: string): { html: string; headings: { id: string; text: string }[] } {
  const headings: { id: string; text: string }[] = [];
  const used = new Set<string>();
  let out = html.replace(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = stripTags(inner);
    let id = toSlug(text) || "section";
    let n = 2;
    while (used.has(id)) id = `${toSlug(text)}-${n++}`;
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  out = out
    .replace(/<a href="(\/[^"]*)">/g, '<a href="$1" class="ilink">')
    .replace(/<table>/g, '<div class="post-table"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<img /g, '<img loading="lazy" decoding="async" ');
  return { html: out, headings };
}

export function readMinutes(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export { stripTags };
