/*
 * Outcome illustrations: what the merchant gets, drawn without code.
 *
 * The rest of the visuals registry shows the work from a developer's side
 * (Liquid, schema, CSS). Most visitors are store owners, so these show the
 * result from their side: a section that appears, a setting they can change
 * themselves, a quote they approve. Registered in visuals.tsx as `ill-*`,
 * so any one of them is a one-word swap for a real screenshot later.
 */

const INK = "#15141a";
const BRAND = "#173eb8";
const ACCENT = "#c3ff00";
const WASH = "#f7f5f1";
const LINE = "#e3e3e3";
const MUTED = "#6e6e6e";
const SOFT = "#c4c4c4";
const FONT = "Poppins, 'Segoe UI', sans-serif";

function Check({ x, y, r = 11, fill = ACCENT, stroke = INK }: { x: number; y: number; r?: number; fill?: string; stroke?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <path
        d={`M${x - r * 0.42} ${y + r * 0.02} l${r * 0.3} ${r * 0.3} l${r * 0.56} -${r * 0.62}`}
        fill="none"
        stroke={stroke}
        strokeWidth={r * 0.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Browser chrome with three dots, used by several scenes. */
function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#fff" stroke={LINE} />
      <rect x={x} y={y} width={w} height="26" rx="12" fill={WASH} />
      <rect x={x} y={y + 14} width={w} height="12" fill={WASH} />
      <circle cx={x + 16} cy={y + 13} r="3.5" fill={SOFT} />
      <circle cx={x + 28} cy={y + 13} r="3.5" fill={SOFT} />
      <circle cx={x + 40} cy={y + 13} r="3.5" fill={SOFT} />
    </g>
  );
}

/** A new section dropped into an existing store page. */
export function IllNewSection() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A store page where a new highlighted section has been added between the existing banner and products">
      <rect width="560" height="400" fill={WASH} />
      <Window x={40} y={34} w={360} h={330} />
      {/* existing page */}
      <rect x="60" y="76" width="320" height="70" rx="8" fill="#e9e7e2" />
      <rect x="76" y="96" width="140" height="10" rx="5" fill={SOFT} />
      <rect x="76" y="114" width="96" height="8" rx="4" fill={SOFT} />
      {/* the new section */}
      <rect x="54" y="160" width="332" height="86" rx="10" fill="#fff" stroke={BRAND} strokeWidth="2.5" />
      <rect x="70" y="176" width="64" height="54" rx="6" fill={ACCENT} />
      <rect x="146" y="180" width="150" height="10" rx="5" fill={INK} />
      <rect x="146" y="198" width="190" height="7" rx="3.5" fill={SOFT} />
      <rect x="146" y="212" width="80" height="18" rx="9" fill={BRAND} />
      {/* products below */}
      {[60, 168, 276].map((px) => (
        <g key={px}>
          <rect x={px} y="262" width="96" height="62" rx="6" fill="#e9e7e2" />
          <rect x={px} y="332" width="70" height="7" rx="3.5" fill={SOFT} />
        </g>
      ))}
      {/* callout */}
      <path d="M386 203 C 420 203, 420 150, 440 150" fill="none" stroke={BRAND} strokeWidth="2" strokeDasharray="4 4" />
      <rect x="420" y="96" width="122" height="78" rx="12" fill={INK} />
      <text x="436" y="126" fontFamily={FONT} fontSize="15" fontWeight="600" fill="#fff">New section</text>
      <text x="436" y="148" fontFamily={FONT} fontSize="12" fill={SOFT}>added to your</text>
      <text x="436" y="164" fontFamily={FONT} fontSize="12" fill={SOFT}>current theme</text>
      <circle cx="386" cy="160" r="15" fill={ACCENT} />
      <path d="M386 152 v16 M378 160 h16" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** A plain settings panel: the owner changes the section without code. */
export function IllEditYourself() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A simple settings panel with a text field, an on switch and colour choices, next to the store page updating as the settings change">
      <rect width="560" height="400" fill={WASH} />
      {/* settings panel */}
      <rect x="36" y="44" width="200" height="312" rx="14" fill="#fff" stroke={LINE} />
      <text x="56" y="78" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK}>Section settings</text>
      <text x="56" y="110" fontFamily={FONT} fontSize="11" fill={MUTED}>Heading</text>
      <rect x="56" y="118" width="160" height="30" rx="7" fill={WASH} stroke={LINE} />
      <text x="66" y="138" fontFamily={FONT} fontSize="12" fill={INK}>Summer sale</text>
      <rect x="148" y="125" width="1.5" height="16" fill={BRAND} />
      <text x="56" y="180" fontFamily={FONT} fontSize="11" fill={MUTED}>Show badge</text>
      <rect x="176" y="167" width="40" height="22" rx="11" fill={BRAND} />
      <circle cx="205" cy="178" r="8" fill="#fff" />
      <text x="56" y="222" fontFamily={FONT} fontSize="11" fill={MUTED}>Colour</text>
      {[INK, BRAND, ACCENT, "#e0b23a"].map((c, i) => (
        <circle key={c} cx={68 + i * 30} cy="246" r="11" fill={c} stroke={i === 2 ? INK : "none"} strokeWidth="2.5" />
      ))}
      <rect x="56" y="288" width="160" height="40" rx="20" fill={INK} />
      <text x="136" y="313" fontFamily={FONT} fontSize="13" fontWeight="600" fill="#fff" textAnchor="middle">Save</text>
      {/* arrow */}
      <path d="M248 200 h34" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M276 192 l9 8 l-9 8" fill="none" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* live page */}
      <Window x={296} y={80} w={228} h={240} />
      <rect x="312" y="122" width="196" height="96" rx="8" fill={ACCENT} />
      <text x="328" y="164" fontFamily={FONT} fontSize="19" fontWeight="600" fill={INK}>Summer sale</text>
      <rect x="328" y="178" width="96" height="8" rx="4" fill={INK} opacity="0.35" />
      <rect x="448" y="132" width="50" height="20" rx="10" fill={INK} />
      <text x="473" y="146" fontFamily={FONT} fontSize="10" fontWeight="600" fill={ACCENT} textAnchor="middle">NEW</text>
      <rect x="312" y="234" width="92" height="66" rx="6" fill="#e9e7e2" />
      <rect x="416" y="234" width="92" height="66" rx="6" fill="#e9e7e2" />
      {/* badge */}
      <rect x="330" y="340" width="170" height="34" rx="17" fill={INK} />
      <Check x={350} y={357} r={9} />
      <text x="366" y="362" fontFamily={FONT} fontSize="12.5" fontWeight="500" fill="#fff">No code needed</text>
    </svg>
  );
}

/** The same feature working on desktop, on a phone and in the theme editor. */
export function IllWorksEverywhere() {
  const widget = (x: number, y: number, w: number) => (
    <g>
      <rect x={x} y={y} width={w} height={w * 0.42} rx="6" fill={ACCENT} />
      <rect x={x + 8} y={y + 10} width={w * 0.5} height="7" rx="3.5" fill={INK} />
      <rect x={x + 8} y={y + 24} width={w * 0.32} height="12" rx="6" fill={BRAND} />
    </g>
  );
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="The same store feature shown working on a laptop, on a phone and inside the Shopify theme editor, each with a check mark">
      <rect width="560" height="400" fill={WASH} />
      {/* laptop */}
      <rect x="34" y="96" width="220" height="150" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="18" y="246" width="252" height="14" rx="7" fill={INK} />
      {widget(54, 120, 180)}
      <rect x="54" y="208" width="84" height="26" rx="4" fill="#e9e7e2" />
      <rect x="150" y="208" width="84" height="26" rx="4" fill="#e9e7e2" />
      {/* phone */}
      <rect x="290" y="86" width="104" height="190" rx="16" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="326" y="94" width="32" height="5" rx="2.5" fill={INK} />
      {widget(302, 112, 80)}
      <rect x="302" y="160" width="80" height="44" rx="4" fill="#e9e7e2" />
      <rect x="302" y="212" width="80" height="44" rx="4" fill="#e9e7e2" />
      {/* editor */}
      <rect x="420" y="96" width="120" height="164" rx="10" fill="#fff" stroke={LINE} />
      <rect x="420" y="96" width="40" height="164" rx="10" fill={INK} />
      <rect x="440" y="96" width="20" height="164" fill={INK} />
      {[114, 132, 150].map((ry) => (
        <rect key={ry} x="428" y={ry} width="24" height="8" rx="4" fill={ry === 132 ? ACCENT : "#383643"} />
      ))}
      {widget(468, 116, 62)}
      <rect x="468" y="152" width="62" height="40" rx="4" fill="#e9e7e2" />
      {/* labels + checks */}
      {[
        { x: 144, label: "Computer" },
        { x: 342, label: "Phone" },
        { x: 480, label: "Theme editor" },
      ].map((d) => (
        <g key={d.label}>
          <Check x={d.x} y={312} r={14} />
          <text x={d.x} y={350} fontFamily={FONT} fontSize="14" fontWeight="500" fill={INK} textAnchor="middle">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

/** A fixed quote the owner approves before any work starts. */
export function IllFixedQuote() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A written quote listing the agreed changes, a fixed price and a delivery date, stamped approved before work starts">
      <rect width="560" height="400" fill={WASH} />
      <rect x="120" y="40" width="300" height="320" rx="14" fill="#fff" stroke={LINE} />
      <rect x="120" y="40" width="300" height="56" rx="14" fill={BRAND} />
      <rect x="120" y="80" width="300" height="16" fill={BRAND} />
      <text x="144" y="75" fontFamily={FONT} fontSize="18" fontWeight="600" fill="#fff">Your quote</text>
      {["New product page layout", "Bundle offer section", "Mobile checks on real phones"].map((t, i) => (
        <g key={t}>
          <Check x={152} y={128 + i * 34} r={9} />
          <text x="172" y={133 + i * 34} fontFamily={FONT} fontSize="13" fill={INK}>{t}</text>
        </g>
      ))}
      <rect x="144" y="226" width="252" height="1" fill={LINE} />
      <text x="144" y="256" fontFamily={FONT} fontSize="12" fill={MUTED}>Fixed price</text>
      <text x="396" y="258" fontFamily={FONT} fontSize="20" fontWeight="600" fill={INK} textAnchor="end">$250</text>
      <text x="144" y="290" fontFamily={FONT} fontSize="12" fill={MUTED}>Ready by</text>
      <text x="396" y="291" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="end">in 2 weeks</text>
      <rect x="144" y="312" width="252" height="28" rx="14" fill={WASH} />
      <text x="270" y="330" fontFamily={FONT} fontSize="11" fill={MUTED} textAnchor="middle">No surprise bills</text>
      {/* stamp */}
      <g transform="rotate(-12 438 132)">
        <rect x="368" y="104" width="140" height="56" rx="10" fill={ACCENT} stroke={INK} strokeWidth="3" />
        <text x="438" y="130" fontFamily={FONT} fontSize="16" fontWeight="600" fill={INK} textAnchor="middle">APPROVED</text>
        <text x="438" y="148" fontFamily={FONT} fontSize="10" fill={INK} textAnchor="middle">before we start</text>
      </g>
    </svg>
  );
}

/** A theme update arrives and the owner's changes are still there. */
export function IllSafeUpdate() {
  const store = (x: number) => (
    <g>
      <rect x={x} y="110" width="170" height="190" rx="12" fill="#fff" stroke={LINE} />
      <rect x={x + 16} y="130" width="138" height="40" rx="6" fill="#e9e7e2" />
      <rect x={x + 16} y="182" width="138" height="44" rx="6" fill={ACCENT} />
      <rect x={x + 16} y="238" width="64" height="44" rx="6" fill="#e9e7e2" />
      <rect x={x + 90} y="238" width="64" height="44" rx="6" fill={ACCENT} />
    </g>
  );
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Your store before and after a theme update: the customized parts, shown in green, are still in place afterwards">
      <rect width="560" height="400" fill={WASH} />
      <text x="117" y="92" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="middle">Before update</text>
      <text x="443" y="92" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="middle">After update</text>
      {store(32)}
      {store(358)}
      {/* update arrow */}
      <circle cx="280" cy="205" r="44" fill={BRAND} />
      <path d="M262 196 a20 20 0 0 1 36 -6" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M300 182 l-1 10 l-10 -2" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M298 214 a20 20 0 0 1 -36 6" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M260 228 l1 -10 l10 2" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="280" y="272" fontFamily={FONT} fontSize="12" fill={MUTED} textAnchor="middle">Theme update</text>
      {/* reassurance */}
      <rect x="150" y="326" width="260" height="40" rx="20" fill={INK} />
      <Check x={176} y={346} r={11} />
      <text x="196" y="351" fontFamily={FONT} fontSize="13.5" fontWeight="500" fill="#fff">Your changes are kept</text>
    </svg>
  );
}

/** Three kinds of theme and how easily each takes changes. */
export function IllThemeFit() {
  const cards = [
    { x: 28, title: "New themes", sub: "Dawn, Refresh…", level: 3, note: "Easy to change" },
    { x: 205, title: "Premium themes", sub: "Prestige, Impulse…", level: 2, note: "Change with care" },
    { x: 382, title: "Older themes", sub: "Debut, Brooklyn…", level: 1, note: "Upgrade first" },
  ];
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Three kinds of Shopify theme compared: new themes are easy to change, premium themes change with care, older themes are best upgraded first">
      <rect width="560" height="400" fill={WASH} />
      {cards.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y="54" width="150" height="292" rx="14" fill="#fff" stroke={LINE} />
          <rect x={c.x + 16} y="72" width="118" height="70" rx="8" fill={c.level === 3 ? ACCENT : c.level === 2 ? "#dfe6fb" : "#e9e7e2"} />
          <rect x={c.x + 28} y="88" width="60" height="8" rx="4" fill={INK} opacity="0.55" />
          <rect x={c.x + 28} y="104" width="40" height="14" rx="7" fill={BRAND} opacity={c.level === 1 ? 0.35 : 1} />
          <text x={c.x + 75} y="172" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="middle">{c.title}</text>
          <text x={c.x + 75} y="192" fontFamily={FONT} fontSize="11" fill={MUTED} textAnchor="middle">{c.sub}</text>
          {/* ease meter */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={c.x + 33 + i * 30} y={242 - i * 14} width="22" height={18 + i * 14} rx="4"
              fill={i < c.level ? (c.level === 3 ? BRAND : c.level === 2 ? BRAND : "#e0b23a") : LINE} />
          ))}
          <rect x={c.x + 16} y="284" width="118" height="40" rx="20" fill={c.level === 3 ? INK : WASH} />
          <text x={c.x + 75} y="309" fontFamily={FONT} fontSize="12" fontWeight="600" fill={c.level === 3 ? "#fff" : INK} textAnchor="middle">{c.note}</text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Small scope icon for each pricing tier, drawn on the dark band: how much of
 * the store a tier touches, from one section to every template.
 */
export function TierScopeIcon({ level }: { level: 1 | 2 | 3 | 4 }) {
  const page = (x: number, y: number, fillAll: boolean, highlightRow: boolean) => (
    <g>
      <rect x={x} y={y} width="30" height="38" rx="4" fill={fillAll ? ACCENT : "none"} stroke={fillAll ? ACCENT : SOFT} strokeWidth="1.8" />
      {[8, 17, 26].map((ry) => (
        <rect key={ry} x={x + 5} y={y + ry} width="20" height="5" rx="2"
          fill={fillAll ? INK : highlightRow && ry === 17 ? ACCENT : "#55525f"} opacity={fillAll ? 0.55 : 1} />
      ))}
    </g>
  );
  const labels = { 1: "One section", 2: "One full page", 3: "Every page", 4: "Every page type, rebuilt" } as const;
  return (
    <svg className="tier-icon" viewBox="0 0 96 48" width="96" height="48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={labels[level]}>
      {level === 1 && page(2, 5, false, true)}
      {level === 2 && page(2, 5, true, false)}
      {level === 3 && [0, 1, 2].map((i) => <g key={i}>{page(2 + i * 32, 5, true, false)}</g>)}
      {level === 4 && (
        <g>
          {[0, 1, 2].map((i) => <g key={i}>{page(2 + i * 32, 5, true, false)}</g>)}
          <circle cx="86" cy="38" r="9" fill={BRAND} stroke="#15141a" strokeWidth="2" />
          <path d="M82 38 h8 M86 34 v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/** Old theme to Online Store 2.0: the store's content and customizations come along. */
export function IllMigration() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="An old theme being moved to a new Online Store 2.0 theme, with the store's sections and customizations carried across">
      <rect width="560" height="400" fill={WASH} />
      {/* old */}
      <text x="128" y="70" fontFamily={FONT} fontSize="14" fontWeight="600" fill={MUTED} textAnchor="middle">Old theme</text>
      <rect x="44" y="86" width="168" height="220" rx="12" fill="#fff" stroke={LINE} />
      {[106, 152, 198, 244].map((y, i) => (
        <rect key={y} x="60" y={y} width="136" height="36" rx="6" fill="#e9e7e2" opacity={1 - i * 0.12} />
      ))}
      <path d="M150 96 l-14 30 l12 8 l-16 34" fill="none" stroke={SOFT} strokeWidth="2" />
      {/* arrow */}
      <rect x="230" y="176" width="100" height="40" rx="20" fill={BRAND} />
      <text x="272" y="201" fontFamily={FONT} fontSize="13" fontWeight="600" fill="#fff" textAnchor="middle">Move</text>
      <path d="M302 189 l9 7 l-9 7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* new */}
      <text x="432" y="70" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="middle">New 2.0 theme</text>
      <rect x="348" y="86" width="168" height="220" rx="12" fill="#fff" stroke={BRAND} strokeWidth="2" />
      {[106, 152, 198, 244].map((y, i) => (
        <g key={y}>
          <rect x="364" y={y} width="136" height="36" rx="6" fill={i % 2 ? "#dfe6fb" : ACCENT} />
          <rect x="374" y={y + 14} width="60" height="7" rx="3.5" fill={INK} opacity="0.5" />
        </g>
      ))}
      <rect x="140" y="336" width="280" height="40" rx="20" fill={INK} />
      <Check x={166} y={356} r={11} />
      <text x="186" y="361" fontFamily={FONT} fontSize="13.5" fontWeight="500" fill="#fff">Your content comes with you</text>
    </svg>
  );
}

/** The four steps of every project, left to right. */
export function IllProcess() {
  const steps = [
    { n: "1", t: "Quote", s: "Fixed price", icon: "quote" },
    { n: "2", t: "Copy", s: "Store stays live", icon: "copy" },
    { n: "3", t: "Build", s: "You review", icon: "build" },
    { n: "4", t: "Launch", s: "Files handed over", icon: "launch" },
  ];
  return (
    <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Four steps: a fixed-price quote, a copy of your store so the live shop keeps selling, the build with your review, and launch with the files handed over">
      <rect width="560" height="300" fill={WASH} />
      <path d="M86 118 H474" stroke={SOFT} strokeWidth="2" strokeDasharray="5 6" />
      {steps.map((st, i) => {
        const x = 86 + i * 129;
        return (
          <g key={st.n}>
            <circle cx={x} cy="118" r="44" fill={i === 3 ? INK : "#fff"} stroke={i === 3 ? INK : LINE} strokeWidth="2" />
            {st.icon === "quote" && (<g><rect x={x - 15} y="98" width="30" height="40" rx="4" fill={BRAND} /><rect x={x - 9} y="108" width="18" height="4" rx="2" fill="#fff" /><rect x={x - 9} y="117" width="14" height="4" rx="2" fill="#fff" /><rect x={x - 9} y="126" width="18" height="4" rx="2" fill={ACCENT} /></g>)}
            {st.icon === "copy" && (<g><rect x={x - 18} y="96" width="26" height="32" rx="4" fill="#e9e7e2" /><rect x={x - 8} y="106" width="26" height="32" rx="4" fill={BRAND} /></g>)}
            {st.icon === "build" && (<g><rect x={x - 20} y="100" width="40" height="30" rx="4" fill="#fff" stroke={INK} strokeWidth="2.5" /><rect x={x - 14} y="107" width="20" height="7" rx="2" fill={ACCENT} /><rect x={x - 14} y="118" width="28" height="5" rx="2" fill={SOFT} /><rect x={x - 8} y="133" width="16" height="4" rx="2" fill={INK} /></g>)}
            {st.icon === "launch" && (<g><path d={`M${x} 94 c12 10 14 26 8 38 h-16 c-6 -12 -4 -28 8 -38z`} fill={ACCENT} /><circle cx={x} cy="114" r="5" fill={INK} /><path d={`M${x - 8} 132 l-6 8 M${x + 8} 132 l6 8`} stroke={ACCENT} strokeWidth="3" strokeLinecap="round" /></g>)}
            <circle cx={x + 30} cy="86" r="13" fill={ACCENT} stroke={INK} strokeWidth="2" />
            <text x={x + 30} y="91" fontFamily={FONT} fontSize="13" fontWeight="600" fill={INK} textAnchor="middle">{st.n}</text>
            <text x={x} y="200" fontFamily={FONT} fontSize="18" fontWeight="600" fill={INK} textAnchor="middle">{st.t}</text>
            <text x={x} y="224" fontFamily={FONT} fontSize="12.5" fill={MUTED} textAnchor="middle">{st.s}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** What the owner receives at the end: files, notes, a walkthrough. */
export function IllHandover() {
  const items = ["Your theme files", "A list of every change", "How-to video for your team", "Notes for future updates"];
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A handover package containing the theme files, a list of every change, a how-to video and notes for future updates">
      <rect width="560" height="400" fill={WASH} />
      {/* box */}
      <path d="M60 170 L150 130 L240 170 L150 210 Z" fill="#d9cfb8" />
      <path d="M60 170 V290 L150 330 V210 Z" fill="#c9bc9e" />
      <path d="M240 170 V290 L150 330 V210 Z" fill="#b9aa88" />
      <rect x="128" y="140" width="44" height="190" fill={BRAND} opacity="0.9" transform="skewY(0)" />
      <circle cx="150" cy="118" r="26" fill={ACCENT} stroke={INK} strokeWidth="2.5" />
      <path d="M139 118 l8 8 l15 -16" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* list */}
      <rect x="276" y="86" width="248" height="228" rx="14" fill="#fff" stroke={LINE} />
      <text x="298" y="122" fontFamily={FONT} fontSize="16" fontWeight="600" fill={INK}>What you get</text>
      {items.map((t, i) => (
        <g key={t}>
          <Check x={308} y={158 + i * 38} r={10} />
          <text x="328" y={163 + i * 38} fontFamily={FONT} fontSize="13" fill={INK}>{t}</text>
        </g>
      ))}
    </svg>
  );
}

/** A plain store before a redesign and the same store after. */
export function IllRedesign() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="The same store before a redesign, plain and grey, and after, with a bold brand look">
      <rect width="560" height="400" fill={WASH} />
      <text x="140" y="62" fontFamily={FONT} fontSize="14" fontWeight="600" fill={MUTED} textAnchor="middle">Before</text>
      <text x="420" y="62" fontFamily={FONT} fontSize="14" fontWeight="600" fill={INK} textAnchor="middle">After</text>
      {/* before */}
      <Window x={36} y={76} w={208} h={250} />
      <rect x="52" y="116" width="176" height="70" rx="6" fill="#e9e7e2" />
      <rect x="64" y="140" width="90" height="8" rx="4" fill={SOFT} />
      {[52, 112, 172].map((x) => <rect key={x} x={x} y="200" width="56" height="56" rx="4" fill="#e9e7e2" />)}
      <rect x="52" y="270" width="176" height="36" rx="4" fill="#e9e7e2" />
      {/* after */}
      <Window x={316} y={76} w={208} h={250} />
      <rect x="332" y="116" width="176" height="70" rx="8" fill={INK} />
      <text x="346" y="146" fontFamily={FONT} fontSize="16" fontWeight="600" fill="#fff">New season</text>
      <rect x="346" y="158" width="64" height="18" rx="9" fill={ACCENT} />
      {[332, 392, 452].map((x, i) => <rect key={x} x={x} y="200" width="56" height="56" rx="8" fill={i === 1 ? ACCENT : "#dfe6fb"} />)}
      <rect x="332" y="270" width="176" height="36" rx="18" fill={BRAND} />
      <text x="420" y="293" fontFamily={FONT} fontSize="12.5" fontWeight="600" fill="#fff" textAnchor="middle">Shop now</text>
      {/* arrow */}
      <circle cx="280" cy="200" r="22" fill={BRAND} />
      <path d="M270 200 h18 M282 192 l8 8 l-8 8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="170" y="346" width="220" height="36" rx="18" fill={INK} />
      <text x="280" y="369" fontFamily={FONT} fontSize="13" fontWeight="500" fill="#fff" textAnchor="middle">Same theme, new look</text>
    </svg>
  );
}

/** A small brand kit (colours, type, buttons) applied across the store. */
export function IllBrandKit() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A brand kit with colours, a typeface and button styles, applied consistently to every page of the store">
      <rect width="560" height="400" fill={WASH} />
      <rect x="36" y="56" width="236" height="288" rx="14" fill="#fff" stroke={LINE} />
      <text x="58" y="92" fontFamily={FONT} fontSize="15" fontWeight="600" fill={INK}>Your brand kit</text>
      <text x="58" y="122" fontFamily={FONT} fontSize="11" fill={MUTED}>Colours</text>
      {[INK, BRAND, ACCENT, "#dfe6fb"].map((c, i) => (
        <rect key={c} x={58 + i * 50} y="132" width="40" height="40" rx="10" fill={c} stroke={i === 3 ? LINE : "none"} />
      ))}
      <text x="58" y="202" fontFamily={FONT} fontSize="11" fill={MUTED}>Font</text>
      <text x="58" y="246" fontFamily={FONT} fontSize="40" fontWeight="600" fill={INK}>Aa</text>
      <text x="130" y="244" fontFamily={FONT} fontSize="13" fill={MUTED}>Headings + text</text>
      <text x="58" y="284" fontFamily={FONT} fontSize="11" fill={MUTED}>Buttons</text>
      <rect x="58" y="294" width="88" height="30" rx="15" fill={BRAND} />
      <rect x="156" y="294" width="88" height="30" rx="15" fill="#fff" stroke={INK} strokeWidth="2" />
      {/* pages */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${300 + i * 22} ${80 + i * 34})`}>
          <rect width="190" height="210" rx="12" fill="#fff" stroke={LINE} />
          <rect x="14" y="16" width="162" height="56" rx="8" fill={i === 2 ? INK : "#e9e7e2"} />
          {i === 2 && <rect x="26" y="34" width="70" height="9" rx="4.5" fill="#fff" />}
          {i === 2 && <rect x="26" y="50" width="44" height="12" rx="6" fill={ACCENT} />}
          <rect x="14" y="86" width="74" height="60" rx="8" fill={i === 2 ? ACCENT : "#e9e7e2"} />
          <rect x="102" y="86" width="74" height="60" rx="8" fill={i === 2 ? "#dfe6fb" : "#e9e7e2"} />
          <rect x="14" y="162" width="96" height="28" rx="14" fill={i === 2 ? BRAND : "#e9e7e2"} />
        </g>
      ))}
    </svg>
  );
}

/** A phone showing a store that loads fast, with a gauge in the green. */
export function IllSpeed() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A store loading quickly on a phone, with a speed gauge pointing to fast">
      <rect width="560" height="400" fill={WASH} />
      {/* phone */}
      <rect x="70" y="50" width="160" height="300" rx="26" fill="#fff" stroke={INK} strokeWidth="4" />
      <rect x="128" y="62" width="44" height="7" rx="3.5" fill={INK} />
      <rect x="88" y="86" width="124" height="80" rx="8" fill={ACCENT} />
      <rect x="100" y="106" width="70" height="9" rx="4.5" fill={INK} />
      <rect x="100" y="124" width="44" height="14" rx="7" fill={BRAND} />
      <rect x="88" y="178" width="58" height="62" rx="6" fill="#e9e7e2" />
      <rect x="154" y="178" width="58" height="62" rx="6" fill="#e9e7e2" />
      <rect x="88" y="290" width="124" height="34" rx="17" fill={BRAND} />
      <text x="150" y="312" fontFamily={FONT} fontSize="12" fontWeight="600" fill="#fff" textAnchor="middle">Add to cart</text>
      {/* gauge */}
      <path d="M290 270 A110 110 0 0 1 510 270" fill="none" stroke={LINE} strokeWidth="22" strokeLinecap="round" />
      <path d="M290 270 A110 110 0 0 1 368 165" fill="none" stroke="#e0b23a" strokeWidth="22" strokeLinecap="round" opacity="0.35" />
      <path d="M440 168 A110 110 0 0 1 510 270" fill="none" stroke={ACCENT} strokeWidth="22" strokeLinecap="round" />
      <path d="M400 270 L478 206" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <circle cx="400" cy="270" r="12" fill={INK} />
      <text x="400" y="318" fontFamily={FONT} fontSize="26" fontWeight="600" fill={INK} textAnchor="middle">Fast</text>
      <text x="400" y="342" fontFamily={FONT} fontSize="12.5" fill={MUTED} textAnchor="middle">measured on real shoppers&apos; phones</text>
    </svg>
  );
}

/** A new store, set up and ready to take its first order. */
export function IllNewStore() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="A new online store with an open sign and a checklist of setup tasks all ticked, ready for its first order">
      <rect width="560" height="400" fill={WASH} />
      {/* shop */}
      <rect x="40" y="120" width="250" height="220" rx="12" fill="#fff" stroke={LINE} />
      <path d="M40 120 h250 v34 a20 20 0 0 1 -31 0 a20 20 0 0 1 -31 0 a20 20 0 0 1 -31 0 a20 20 0 0 1 -32 0 a20 20 0 0 1 -31 0 a20 20 0 0 1 -31 0 a20 20 0 0 1 -31 0 a20 20 0 0 1 -32 0 z" fill={BRAND} />
      {[71, 133, 196, 259].map((x) => <rect key={x} x={x - 16} y="120" width="31" height="34" fill={ACCENT} opacity="0.9" />)}
      <rect x="64" y="186" width="96" height="124" rx="6" fill="#e9e7e2" />
      <rect x="176" y="186" width="90" height="60" rx="6" fill="#dfe6fb" />
      {/* open sign */}
      <line x1="221" y1="258" x2="206" y2="276" stroke={INK} strokeWidth="2" />
      <line x1="221" y1="258" x2="236" y2="276" stroke={INK} strokeWidth="2" />
      <rect x="186" y="276" width="70" height="30" rx="6" fill={ACCENT} stroke={INK} strokeWidth="2" />
      <text x="221" y="296" fontFamily={FONT} fontSize="13" fontWeight="600" fill={INK} textAnchor="middle">OPEN</text>
      {/* checklist */}
      <rect x="318" y="84" width="206" height="250" rx="14" fill="#fff" stroke={LINE} />
      <text x="338" y="118" fontFamily={FONT} fontSize="15" fontWeight="600" fill={INK}>Ready to sell</text>
      {["Theme chosen", "Pages built", "Payments tested", "Shipping set", "Works on phones"].map((t, i) => (
        <g key={t}>
          <Check x={346} y={152 + i * 36} r={10} />
          <text x="366" y={157 + i * 36} fontFamily={FONT} fontSize="13" fill={INK}>{t}</text>
        </g>
      ))}
    </svg>
  );
}
