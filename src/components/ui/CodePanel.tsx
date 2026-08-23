import type { ReactNode } from "react";

type Lang = "liquid" | "css" | "json" | "js";

interface CodePanelProps {
  /** File path shown in the panel header — real theme paths only. */
  file: string;
  lang?: Lang;
  code: string;
  className?: string;
}

/**
 * Syntax-tinted code panel. Deliberately a ~40-line tokenizer rather than a
 * highlighter dependency: the only languages on this site are Liquid, CSS,
 * JSON and a little JS, the snippets are short, and shipping Prism/Shiki to a
 * marketing page to colour twelve lines is not a trade worth making.
 */
export default function CodePanel({ file, lang = "liquid", code, className }: CodePanelProps) {
  return (
    <div className={`code ${className ?? ""}`.trim()}>
      <div className="code-head">
        <span>{file}</span>
        <span aria-hidden="true">{lang}</span>
      </div>
      <pre>
        <code>{highlight(code, lang)}</code>
      </pre>
    </div>
  );
}

const PATTERNS: Record<Lang, RegExp> = {
  liquid:
    /(\{%-?[\s\S]*?-?%\}|\{\{-?[\s\S]*?-?\}\})|("[^"\n]*"|'[^'\n]*')|(<\/?[a-zA-Z][\w-]*)|(\{#[\s\S]*?#\})/g,
  css: /(\/\*[\s\S]*?\*\/)|(--[\w-]+|[.#][\w-]+|@[\w-]+)|("[^"\n]*"|'[^'\n]*')|(:\s*[^;{\n]+)/g,
  json: /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\btrue\b|\bfalse\b|\bnull\b|-?\d+\.?\d*)/g,
  js: /(\/\/[^\n]*)|(\b(?:const|let|function|return|if|else|new|await|async|export|import|from)\b)|("[^"\n]*"|'[^'\n]*'|`[^`]*`)/g,
};

/** Class per capture group index, in the order each language's regex declares them. */
const GROUP_CLASS: Record<Lang, string[]> = {
  liquid: ["k", "s", "t", "c"],
  css: ["c", "k", "s", "p"],
  json: ["k", "s", "t"],
  js: ["c", "k", "s"],
};

function highlight(code: string, lang: Lang): ReactNode[] {
  const pattern = PATTERNS[lang];
  const classes = GROUP_CLASS[lang];
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;
  while ((match = pattern.exec(code)) !== null) {
    if (match.index > last) out.push(code.slice(last, match.index));
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    out.push(
      <span key={key++} className={classes[groupIndex] ?? "p"}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < code.length) out.push(code.slice(last));

  return out;
}
