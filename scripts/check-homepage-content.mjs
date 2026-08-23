#!/usr/bin/env node
/**
 * Homepage content guard.
 *
 * The brief for this site is explicit that homepage copy is preserved, not
 * rewritten (CLAUDE.md §3). This script reads every string literal out of
 * src/data/homepage.ts and asserts each one is present in the prerendered
 * homepage HTML, so a layout or animation change cannot silently drop a
 * paragraph. Run after `npm run build`.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DATA = join(process.cwd(), "src", "data", "homepage.ts");
const HTML = join(process.cwd(), ".next", "server", "app", "index.html");

const source = await readFile(DATA, "utf8");
let html = await readFile(HTML, "utf8");

// Strip tags so copy split across elements by the reveal wrappers still matches,
// and normalise the entities React escapes plus whitespace.
html = html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, "")
  .replace(/&#x27;|&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&")
  .replace(/&#x2F;/g, "/")
  .replace(/\s+/g, " ");

// Every prose-looking string literal in the data file. Extracted with a small
// scanner rather than a regex: a regex over quotes alternates between "inside"
// and "outside" the string and happily matches the code *between* two literals.
function stringLiterals(code) {
  const out = [];
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    if (ch === "/" && code[i + 1] === "/") {
      while (i < code.length && code[i] !== "\n") i += 1;
      continue;
    }
    if (ch === "/" && code[i + 1] === "*") {
      i = code.indexOf("*/", i + 2);
      if (i === -1) break;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let value = "";
      i += 1;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === "\\") {
          value += code[i + 1] === "n" ? " " : code[i + 1];
          i += 2;
          continue;
        }
        value += code[i];
        i += 1;
      }
      i += 1;
      out.push(value);
      continue;
    }
    i += 1;
  }

  return out;
}

const literals = stringLiterals(source)
  .map((text) => text.replace(/\s+/g, " ").trim())
  .filter((text) => text.length >= 12)
  .filter((text) => /[a-z]{3}\s/.test(text))
  .filter((text) => !text.startsWith("@/"))
  .filter((text) => !text.includes("/*"));

const missing = literals.filter((text) => !html.includes(text));

console.log(`Homepage strings checked: ${literals.length}`);

if (missing.length) {
  console.error(`\nMissing from the rendered homepage (${missing.length}):`);
  for (const text of missing) console.error(`  ${text.slice(0, 110)}…`);
  process.exit(1);
}

console.log("All homepage copy present in the rendered output.");
