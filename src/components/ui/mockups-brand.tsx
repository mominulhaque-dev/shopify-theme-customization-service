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
      <rect x="0" y="0" width="560" height="118" fill="#15141a" />
      <text x="28" y="72" fontFamily="Poppins, sans-serif" fontSize="54" fontWeight="600" fill="#fff">
        Aa Gg
      </text>
      <text x="300" y="46" fontFamily="monospace" fontSize="9" fill="#dcff6b" letterSpacing="1.4">
        DISPLAY / 300 400 500 600
      </text>
      <text x="300" y="66" fontFamily="monospace" fontSize="9" fill="#c4c4c4">
        font-display: swap
      </text>
      <text x="300" y="84" fontFamily="monospace" fontSize="9" fill="#c4c4c4">
        woff2, self-hosted in assets/
      </text>
      <text x="300" y="102" fontFamily="monospace" fontSize="9" fill="#c4c4c4">
        licence: webfont, 250k pv
      </text>

      {[
        { size: 26, weight: 600, label: "H1  clamp(2rem, 4.4vw, 3rem)", y: 156 },
        { size: 19, weight: 600, label: "H2  clamp(1.5rem, 3vw, 1.75rem)", y: 194 },
        { size: 14, weight: 400, label: "Body  1rem / 1.5", y: 228 },
      ].map((row) => (
        <g key={row.label}>
          <text
            x="28"
            y={row.y}
            fontFamily="Poppins, sans-serif"
            fontSize={row.size}
            fontWeight={row.weight}
            fill="#15141a"
          >
            Storefront typography
          </text>
          <text x="28" y={row.y + 16} fontFamily="monospace" fontSize="8.5" fill="#939393" letterSpacing="0.8">
            {row.label}
          </text>
        </g>
      ))}
      <rect x="28" y="258" width="504" height="1" fill="#e3e3e3" />
      <text x="28" y="282" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.2">
        FALLBACK STACK MEASURED TO MATCH — NO LAYOUT SHIFT ON SWAP
      </text>
    </svg>
  );
}

/** Token swatches: the palette and contrast pairs a redesign is built from. */
export function PaletteSwatches() {
  const swatches = [
    { hex: "#15141a", name: "--ink", use: "Body text" },
    { hex: "#173eb8", name: "--brand", use: "Actions" },
    { hex: "#c3ff00", name: "--accent", use: "Accent" },
    { hex: "#15141a", name: "--deep", use: "Dark bands" },
    { hex: "#f7f5f1", name: "--wash", use: "Tinted rows" },
    { hex: "#ffffff", name: "--paper", use: "Page" },
  ];

  return (
    <svg
      viewBox="0 0 560 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Colour token swatches with their CSS custom property names and roles, plus a note that every text pairing has its contrast ratio computed rather than estimated"
    >
      <rect width="560" height="280" fill="#fff" />
      <text x="24" y="30" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        DESIGN TOKENS WRITTEN INTO THE THEME
      </text>
      {swatches.map((sw, i) => {
        const x = 24 + (i % 3) * 176;
        const y = 48 + Math.floor(i / 3) * 106;
        return (
          <g key={sw.name}>
            <rect x={x} y={y} width="160" height="58" rx="7" fill={sw.hex} stroke="#e3e3e3" />
            <text x={x} y={y + 76} fontFamily="monospace" fontSize="9.5" fill="#15141a">
              {sw.name}
            </text>
            <text x={x} y={y + 90} fontFamily="monospace" fontSize="8.5" fill="#939393">
              {sw.hex} · {sw.use}
            </text>
          </g>
        );
      })}
      <rect x="24" y="252" width="512" height="1" fill="#e3e3e3" />
      <text x="24" y="272" fontFamily="monospace" fontSize="9" fill="#173eb8" letterSpacing="1.2">
        EVERY PAIR MEASURED — CONTRAST COMPUTED, NOT EYEBALLED
      </text>
    </svg>
  );
}
