#!/usr/bin/env node
/**
 * Internal link audit.
 *
 * Reads the HTML Next.js prerendered into .next/server/app, collects every
 * internal href, and checks each one against the set of pages that actually got
 * built. Also fails on the placeholder hrefs that are easy to leave behind:
 * "#", "javascript:void(0)", and empty href attributes.
 *
 * Run after `npm run build`:  node scripts/audit-links.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** ".next/server/app/services/shopify-development.html" → "/services/shopify-development/" */
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  return `/${rel}/`;
}

const files = await walk(APP_DIR);
if (files.length === 0) {
  console.error("No prerendered HTML found. Run `npm run build` first.");
  process.exit(1);
}

const routes = new Set(files.map(routeOf));
// Trailing-slash-insensitive lookups, so /hire and /hire/ both resolve.
const normalise = (href) => (href.endsWith("/") ? href : `${href}/`);

const problems = [];
const seen = new Map();

for (const file of files) {
  const html = await readFile(file, "utf8");
  const from = routeOf(file);

  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    const raw = match[1];

    if (raw === "" || raw === "#" || raw.startsWith("javascript:")) {
      problems.push({ from, href: raw || "(empty)", reason: "placeholder href" });
      continue;
    }
    // External, protocol-relative, anchors, mail/tel, and asset paths.
    if (/^(https?:|mailto:|tel:|\/\/|#)/.test(raw)) continue;
    if (!raw.startsWith("/")) continue;
    if (/\.(css|js|svg|png|jpe?g|webp|avif|ico|woff2?|xml|txt|json)$/.test(raw)) continue;
    if (raw.startsWith("/_next/") || raw.startsWith("/api/")) continue;

    const path = normalise(raw.split(/[?#]/)[0]);
    if (routes.has(path)) {
      seen.set(path, (seen.get(path) ?? 0) + 1);
      continue;
    }
    problems.push({ from, href: raw, reason: "no page for this route" });
  }
}

const orphans = [...routes].filter(
  (route) => route !== "/" && !seen.has(route) && !route.startsWith("/_")
);

console.log(`Pages built:      ${routes.size}`);
console.log(`Internal targets: ${seen.size} distinct`);

if (orphans.length) {
  console.log(`\nPages nothing links to (${orphans.length}):`);
  for (const route of orphans) console.log(`  ${route}`);
}

if (problems.length) {
  console.error(`\nBroken or placeholder links (${problems.length}):`);
  const grouped = new Map();
  for (const problem of problems) {
    const key = `${problem.href} — ${problem.reason}`;
    grouped.set(key, [...(grouped.get(key) ?? []), problem.from]);
  }
  for (const [key, from] of grouped) {
    console.error(`  ${key}`);
    console.error(`      linked from: ${[...new Set(from)].slice(0, 6).join(", ")}`);
  }
  process.exit(1);
}

console.log("\nNo broken links, no placeholder hrefs.");
