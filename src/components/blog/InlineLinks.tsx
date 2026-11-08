import Link from "next/link";
import type { ReactNode } from "react";

/** Renders blog text, turning [label](/path/) into internal links. */
export function InlineLinks({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[2] ?? "/"} className="ilink">
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Same text with the link markup removed, for meta tags and JSON-LD. */
export function plainText(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
}
