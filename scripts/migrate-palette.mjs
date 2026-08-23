/* One-shot palette + token migration: forest-green system -> fatjoe.com blue/lime.
   Run once from the project root:  node scripts/migrate-palette.mjs
   Kept in the repo as the record of exactly which value became which. */
import { readFileSync, writeFileSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

/* Old value -> new value. Every key is a colour from the green build; every
   value is either a fatjoe.com colour or a documented derivation from one. */
const HEX = {
  "#0b1f17": "#15141a", // ink
  "#2c4239": "#383643", // ink-2
  "#4d6259": "#6e6e6e", // muted
  "#566b62": "#6e6e6e", // stray earlier muted
  "#5f7469": "#939393", // muted-soft
  "#0a5d42": "#173eb8", // forest -> brand blue
  "#084832": "#12308f", // forest-hover -> brand-hover
  "#0f7a56": "#2a55c9", // mid forest -> mid blue
  "#3f6d5c": "#4a5570", // muted mid
  "#5d8a78": "#8f96a8", // muted mid light
  "#052e21": "#15141a", // deep
  "#073b2b": "#24222e", // deep-2
  "#063324": "#1d1b24", // stray deep
  "#12503c": "#383643", // line-dark
  "#17c47f": "#c3ff00", // signal -> accent lime
  "#12b573": "#b0e800", // stray signal
  "#0e8f5b": "#5c7a00", // signal-ink -> accent-ink
  "#7fd9b4": "#dcff6b", // light signal -> light lime
  "#a9c8bb": "#c4c4c4", // on-deep
  "#7ba795": "#939393", // on-deep-dim
  "#fbfcfb": "#f9f9f9", // paper -> off-white panel (the CSS token itself is #fff)
  "#eef6f1": "#f7f5f1", // wash -> cream
  "#e4f0e9": "#f3f3f3", // wash-2
  "#e6ece9": "#f0efec",
  "#eef1ef": "#f3f3f3",
  "#d5e5dc": "#e3e3e3", // line
  "#bcd6c8": "#c4c4c4", // line-strong
  "#d7dedb": "#dcdcdc",
  "#c9d4cf": "#cfcfcf",
  "#b9c6c0": "#c4c4c4",
};

/* Same mapping in rgb() space, for the alpha-carrying declarations. */
const RGB = {
  "23, 196, 127": "195, 255, 0", // signal -> accent
  "10, 93, 66": "23, 62, 184", // forest -> brand
  "15, 122, 86": "42, 85, 201", // mid forest -> mid blue
  "127, 217, 180": "220, 255, 107", // light signal -> light lime
  "169, 200, 187": "196, 196, 196", // on-deep
  "5, 46, 33": "21, 20, 26", // deep (shadows)
  "7, 59, 43": "36, 34, 46", // deep-2
  "238, 246, 241": "247, 245, 241", // wash
  "251, 252, 251": "255, 255, 255", // paper
};

/* Colour-named tokens -> palette-neutral ones. Longest key first. */
const TOKENS = [
  ["--forest-hover", "--brand-hover"],
  ["--forest", "--brand"],
  ["--signal-ink", "--accent-ink"],
  ["--signal", "--accent"],
];

const SKIP = new Set(["tokens.css"]);
const EXT = new Set([".css", ".tsx", ".ts"]);
const counts = {};
let touched = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (EXT.has(extname(entry)) && !SKIP.has(entry)) migrate(path);
  }
}

function migrate(path) {
  const before = readFileSync(path, "utf8");
  let out = before;

  for (const [from, to] of Object.entries(HEX)) {
    out = out.replace(new RegExp(from, "gi"), (m) => {
      counts[from] = (counts[from] || 0) + 1;
      return m === m.toUpperCase() ? to.toUpperCase() : to;
    });
  }
  for (const [from, to] of Object.entries(RGB)) {
    // tolerate any spacing after the commas
    const loose = from.replace(/, /g, ",\\s*");
    out = out.replace(new RegExp(loose, "g"), () => {
      counts[from] = (counts[from] || 0) + 1;
      return to;
    });
  }
  for (const [from, to] of TOKENS) {
    out = out.replace(new RegExp(`${from}(?![\\w-])`, "g"), () => {
      counts[from] = (counts[from] || 0) + 1;
      return to;
    });
  }

  if (out !== before) {
    writeFileSync(path, out);
    touched += 1;
  }
}

walk("src");
console.log(`files rewritten: ${touched}`);
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(String(v).padStart(4), k);
}
