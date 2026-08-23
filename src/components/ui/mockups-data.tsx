/* Data-shaped visuals. Deliberately no invented numbers: these show the
   *metrics we work against* (Core Web Vitals thresholds, funnel stages,
   architectural ceilings), never results attributed to a client. Where a figure
   does animate a number it counts to a published Shopify/Google threshold. */

/** Core Web Vitals targets a theme build is held to. */
export function SpeedGauge() {
  const rings = [
    { label: "LCP", target: "2.5s", pct: 0.72, note: "Largest Contentful Paint" },
    { label: "INP", target: "200ms", pct: 0.84, note: "Interaction to Next Paint" },
    { label: "CLS", target: "0.1", pct: 0.9, note: "Cumulative Layout Shift" },
  ];

  return (
    <svg
      viewBox="0 0 560 230"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      data-draw=""
      aria-label="Three dials showing the Core Web Vitals thresholds a theme build is held to: LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1"
    >
      <rect width="560" height="230" fill="#fff" />
      <text x="24" y="34" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        THRESHOLDS WE BUILD AGAINST
      </text>
      {rings.map((ring, i) => {
        const cx = 108 + i * 172;
        const r = 46;
        const c = 2 * Math.PI * r;
        return (
          <g key={ring.label}>
            <circle cx={cx} cy={116} r={r} fill="none" stroke="#f7f5f1" strokeWidth="12" />
            <circle
              data-draw-line=""
              cx={cx}
              cy={116}
              r={r}
              fill="none"
              stroke="#c3ff00"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${c * ring.pct} ${c}`}
              transform={`rotate(-90 ${cx} 116)`}
            />
            <text x={cx} y="112" textAnchor="middle" fontFamily="monospace" fontSize="19" fontWeight="700" fill="#15141a">
              {ring.target}
            </text>
            <text x={cx} y="130" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.2">
              {ring.label}
            </text>
            <text x={cx} y="192" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#6e6e6e">
              {ring.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Where theme-level friction sits in the purchase funnel. */
export function FunnelChart() {
  const stages = [
    { label: "Session", w: 480, note: "Landing template" },
    { label: "Product view", w: 400, note: "Collection filtering, search" },
    { label: "Variant chosen", w: 300, note: "Variant picker, stock state" },
    { label: "Add to cart", w: 216, note: "Cart drawer, upsell block" },
    { label: "Checkout start", w: 140, note: "Cart template, trust signals" },
  ];

  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Purchase funnel from session to checkout, annotated with the theme surface responsible for each step"
    >
      <rect width="560" height="300" fill="#fff" />
      <text x="24" y="30" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        WHERE THEME WORK MOVES THE NUMBER
      </text>
      {stages.map((stage, i) => {
        const y = 50 + i * 48;
        return (
          <g key={stage.label}>
            <rect
              x={24}
              y={y}
              width={stage.w}
              height="34"
              rx="6"
              fill={i === 0 ? "#f7f5f1" : "#173eb8"}
              opacity={i === 0 ? 1 : 1 - i * 0.13}
            />
            <text x={38} y={y + 22} fontFamily="sans-serif" fontSize="11" fontWeight="600" fill={i === 0 ? "#15141a" : "#fff"}>
              {stage.label}
            </text>
            <text x={Math.max(stage.w + 34, 190)} y={y + 22} fontFamily="monospace" fontSize="9" fill="#6e6e6e">
              {stage.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** How far customization can go per theme generation, before code is required. */
export function ThemeCeilingChart() {
  const rows = [
    { label: "Online Store 2.0", editor: 0.72, note: "Dawn, Refresh, Craft" },
    { label: "Premium 2.0", editor: 0.6, note: "Prestige, Impulse, Symmetry" },
    { label: "Legacy / vintage", editor: 0.24, note: "Debut, Brooklyn, Turbo" },
  ];

  return (
    <svg
      viewBox="0 0 560 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chart comparing how much of a typical customization each theme generation absorbs in the theme editor versus how much needs code: Online Store 2.0 themes cover the most in settings, legacy themes the least"
    >
      <rect width="560" height="260" fill="#fff" />
      <g fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.2">
        <text x="42" y="42">SETTINGS REACH THIS FAR</text>
        <text x="386" y="42">PAST HERE, CODE</text>
      </g>
      <rect x="24" y="34" width="14" height="8" rx="2" fill="#c3ff00" />
      <rect x="366" y="34" width="14" height="8" rx="2" fill="#e3d3b4" />
      {rows.map((row, i) => {
        const y = 76 + i * 62;
        const full = 512;
        return (
          <g key={row.label}>
            <text x="24" y={y - 8} fontFamily="sans-serif" fontSize="12" fontWeight="600" fill="#15141a">
              {row.label}
            </text>
            <rect x="24" y={y} width={full * row.editor} height="20" rx="4" fill="#c3ff00" />
            <rect x={24 + full * row.editor} y={y} width={full * (1 - row.editor)} height="20" rx="4" fill="#e3d3b4" />
            <text x="24" y={y + 36} fontFamily="monospace" fontSize="9" fill="#939393">
              {row.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
