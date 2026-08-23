/* Brand-system visuals for the design-layer pages (fonts, CSS, redesign). */

/** Type specimen: how a licensed custom face lands across the theme's scale. */
export function FontSpecimen() {
  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Type specimen card showing a display face at heading size, its weights, and the resulting body, caption and button sizes as declared in the theme's stylesheet"
    >
      <rect width="560" height="300" fill="#fff" />
      <rect x="0" y="0" width="560" height="118" fill="#052e21" />
      <text x="28" y="72" fontFamily="Bricolage Grotesque, sans-serif" fontSize="54" fontWeight="800" fill="#fff" letterSpacing="-2">
        Aa Gg
      </text>
      <text x="300" y="46" fontFamily="monospace" fontSize="9" fill="#7fd9b4" letterSpacing="1.4">
        DISPLAY / 500 700 800
      </text>
      <text x="300" y="66" fontFamily="monospace" fontSize="9" fill="#a9c8bb">
        font-display: swap
      </text>
      <text x="300" y="84" fontFamily="monospace" fontSize="9" fill="#a9c8bb">
        woff2, self-hosted in assets/
      </text>
      <text x="300" y="102" fontFamily="monospace" fontSize="9" fill="#a9c8bb">
        licence: webfont, 250k pv
      </text>

      {[
        { size: 26, weight: 800, label: "H1  clamp(2.1rem, 4.4vw, 3.35rem)", y: 156 },
        { size: 19, weight: 700, label: "H2  clamp(1.75rem, 3vw, 2.45rem)", y: 194 },
        { size: 14, weight: 500, label: "Body  1.0625rem / 1.62", y: 228 },
      ].map((row) => (
        <g key={row.label}>
          <text
            x="28"
            y={row.y}
            fontFamily="Bricolage Grotesque, sans-serif"
            fontSize={row.size}
            fontWeight={row.weight}
            fill="#0b1f17"
            letterSpacing="-0.6"
          >
            Storefront typography
          </text>
          <text x="28" y={row.y + 16} fontFamily="monospace" fontSize="8.5" fill="#5f7469" letterSpacing="0.8">
            {row.label}
          </text>
        </g>
      ))}
      <rect x="28" y="258" width="504" height="1" fill="#d5e5dc" />
      <text x="28" y="282" fontFamily="monospace" fontSize="9" fill="#4d6259" letterSpacing="1.2">
        FALLBACK STACK MEASURED TO MATCH — NO LAYOUT SHIFT ON SWAP
      </text>
    </svg>
  );
}

/** Token swatches: the palette and contrast pairs a redesign is built from. */
export function PaletteSwatches() {
  const swatches = [
    { hex: "#0b1f17", name: "--ink", use: "Body text" },
    { hex: "#0a5d42", name: "--forest", use: "Actions" },
    { hex: "#17c47f", name: "--signal", use: "Accent" },
    { hex: "#052e21", name: "--deep", use: "Dark bands" },
    { hex: "#eef6f1", name: "--wash", use: "Tinted rows" },
    { hex: "#fbfcfb", name: "--paper", use: "Page" },
  ];

  return (
    <svg
      viewBox="0 0 560 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Colour token swatches with their CSS custom property names and roles, plus a note that every text pairing is checked for WCAG AA contrast"
    >
      <rect width="560" height="280" fill="#fff" />
      <text x="24" y="30" fontFamily="monospace" fontSize="9" fill="#4d6259" letterSpacing="1.4">
        DESIGN TOKENS WRITTEN INTO THE THEME
      </text>
      {swatches.map((sw, i) => {
        const x = 24 + (i % 3) * 176;
        const y = 48 + Math.floor(i / 3) * 106;
        return (
          <g key={sw.name}>
            <rect x={x} y={y} width="160" height="58" rx="7" fill={sw.hex} stroke="#d5e5dc" />
            <text x={x} y={y + 76} fontFamily="monospace" fontSize="9.5" fill="#0b1f17">
              {sw.name}
            </text>
            <text x={x} y={y + 90} fontFamily="monospace" fontSize="8.5" fill="#5f7469">
              {sw.hex} · {sw.use}
            </text>
          </g>
        );
      })}
      <rect x="24" y="252" width="512" height="1" fill="#d5e5dc" />
      <text x="24" y="272" fontFamily="monospace" fontSize="9" fill="#0a5d42" letterSpacing="1.2">
        EVERY TEXT PAIR CHECKED AT WCAG AA OR BETTER
      </text>
    </svg>
  );
}
