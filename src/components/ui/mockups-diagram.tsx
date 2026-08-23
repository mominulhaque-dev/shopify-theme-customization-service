/* Explanatory diagrams. Where a diagram shows a *relationship* the connecting
   strokes carry data-draw-line, so MotionProvider draws them in on scroll and
   the reader watches the relationship form rather than arriving at a finished
   picture. */

/** Side-by-side before/after panels with a labelled divider. */
export function BeforeAfterMockup() {
  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Before and after panels: a cramped stock layout on the left, the same page rebuilt with clear hierarchy and a custom block on the right"
    >
      <rect width="560" height="300" fill="#fff" />

      {/* before */}
      <rect x="0" y="0" width="272" height="300" fill="#f9f9f9" />
      <text x="16" y="24" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        BEFORE
      </text>
      <rect x="16" y="38" width="240" height="54" rx="5" fill="#f0efec" />
      <rect x="28" y="56" width="120" height="8" rx="4" fill="#c4c4c4" />
      <rect x="28" y="70" width="86" height="6" rx="3" fill="#cfcfcf" />
      {[104, 138, 172].map((y) => (
        <rect key={y} x="16" y={y} width="240" height="24" rx="4" fill="#f3f3f3" />
      ))}
      <rect x="16" y="206" width="112" height="20" rx="4" fill="#dcdcdc" />
      <rect x="16" y="238" width="240" height="46" rx="4" fill="#f3f3f3" />

      {/* divider */}
      <rect x="278" y="0" width="1.5" height="300" fill="#c3ff00" opacity="0.5" />
      <circle cx="278.75" cy="150" r="16" fill="#fff" stroke="#c3ff00" />
      <path d="M272 150h13m0 0-4-4m4 4-4 4" stroke="#173eb8" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* after */}
      <rect x="288" y="0" width="272" height="300" fill="#fff" />
      <text x="304" y="24" fontFamily="monospace" fontSize="9" fill="#173eb8" letterSpacing="1.4">
        AFTER
      </text>
      <rect x="304" y="38" width="240" height="70" rx="7" fill="#f7f5f1" />
      <rect x="318" y="54" width="150" height="12" rx="4" fill="#15141a" />
      <rect x="318" y="72" width="108" height="6" rx="3" fill="#6e6e6e" />
      <rect x="318" y="86" width="82" height="14" rx="5" fill="#173eb8" />
      <rect x="304" y="122" width="114" height="60" rx="7" fill="#f9f9f9" stroke="#e3e3e3" />
      <rect x="430" y="122" width="114" height="60" rx="7" fill="#f9f9f9" stroke="#e3e3e3" />
      <rect x="316" y="136" width="70" height="6" rx="3" fill="#6e6e6e" />
      <rect x="316" y="150" width="44" height="6" rx="3" fill="#c3ff00" />
      <rect x="442" y="136" width="70" height="6" rx="3" fill="#6e6e6e" />
      <rect x="442" y="150" width="44" height="6" rx="3" fill="#c3ff00" />
      <rect x="304" y="196" width="240" height="52" rx="7" fill="#f7f5f1" stroke="#c3ff00" strokeDasharray="4 3" />
      <rect x="316" y="210" width="96" height="6" rx="3" fill="#173eb8" />
      <rect x="316" y="226" width="150" height="6" rx="3" fill="#c4c4c4" />
      <rect x="304" y="262" width="240" height="22" rx="6" fill="#173eb8" />
    </svg>
  );
}

/** Legacy theme → Online Store 2.0 migration: what carries over and how. */
export function MigrationDiagram() {
  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      data-draw=""
      aria-label="Migration diagram: hard-coded Liquid templates on a legacy theme rebuilt as JSON templates, schema-driven sections and metafields on an Online Store 2.0 theme"
    >
      <rect width="560" height="300" fill="#fff" />

      <text x="16" y="26" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        LEGACY THEME
      </text>
      <rect x="16" y="40" width="188" height="230" rx="9" fill="#f9f9f9" stroke="#e3e3e3" />
      {["index.liquid", "product.liquid", "collection.liquid", "snippets/", "theme.liquid"].map((label, i) => (
        <g key={label}>
          <rect x="32" y={62 + i * 40} width="156" height="28" rx="5" fill="#f3f3f3" />
          <text x="44" y={80 + i * 40} fontFamily="monospace" fontSize="9" fill="#6e6e6e">
            {label}
          </text>
        </g>
      ))}

      <text x="356" y="26" fontFamily="monospace" fontSize="9" fill="#173eb8" letterSpacing="1.4">
        ONLINE STORE 2.0
      </text>
      <rect x="356" y="40" width="188" height="230" rx="9" fill="#f7f5f1" stroke="#c3ff00" />
      {["templates/*.json", "sections/ + schema", "blocks / presets", "metafields", "layout/theme.liquid"].map(
        (label, i) => (
          <g key={label}>
            <rect x="372" y={62 + i * 40} width="156" height="28" rx="5" fill="#fff" stroke="#e3e3e3" />
            <text x="384" y={80 + i * 40} fontFamily="monospace" fontSize="9" fill="#173eb8">
              {label}
            </text>
          </g>
        )
      )}

      <g stroke="#c3ff00" strokeWidth="1.3" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} data-draw-line="" d={`M204 ${76 + i * 40} C 262 ${76 + i * 40}, 300 ${76 + i * 40}, 356 ${76 + i * 40}`} />
        ))}
      </g>
      <rect x="236" y="128" width="88" height="24" rx="12" fill="#fff" stroke="#c3ff00" />
      <text x="252" y="144" fontFamily="monospace" fontSize="9" fill="#173eb8">
        rebuilt
      </text>
    </svg>
  );
}

/** Sections + blocks: how one section definition yields reorderable instances. */
export function SectionStackDiagram() {
  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      data-draw=""
      aria-label="One section definition with a schema produces reusable instances a merchant can add, reorder and edit in the theme editor"
    >
      <rect width="560" height="300" fill="#fff" />
      <rect x="16" y="46" width="200" height="208" rx="9" fill="#15141a" />
      <text x="34" y="74" fontFamily="monospace" fontSize="9" fill="#dcff6b" letterSpacing="1.2">
        sections/feature.liquid
      </text>
      {[92, 116, 140, 164, 188, 212].map((y, i) => (
        <rect
          key={y}
          x="34"
          y={y}
          width={i % 3 === 0 ? 150 : 108 + i * 6}
          height="7"
          rx="3.5"
          fill={i === 2 || i === 4 ? "#c3ff00" : "#4a5570"}
        />
      ))}
      <rect x="34" y="230" width="120" height="7" rx="3.5" fill="#dcff6b" />

      <g stroke="#c3ff00" strokeWidth="1.3" fill="none">
        <path data-draw-line="" d="M216 100 C 268 100, 280 84, 332 84" />
        <path data-draw-line="" d="M216 150 C 268 150, 280 150, 332 150" />
        <path data-draw-line="" d="M216 200 C 268 200, 280 216, 332 216" />
      </g>

      {[62, 128, 194].map((y, i) => (
        <g key={y}>
          <rect x="332" y={y} width="212" height="44" rx="7" fill="#f9f9f9" stroke="#e3e3e3" />
          <rect x="346" y={y + 12} width="14" height="14" rx="3" fill="#f7f5f1" stroke="#c3ff00" />
          <rect x="372" y={y + 14} width={92 - i * 12} height="6" rx="3" fill="#15141a" />
          <rect x="372" y={y + 26} width={128 - i * 16} height="5" rx="2.5" fill="#c4c4c4" />
          <rect x="516" y={y + 16} width="14" height="3" rx="1.5" fill="#e3e3e3" />
          <rect x="516" y={y + 23} width="14" height="3" rx="1.5" fill="#e3e3e3" />
        </g>
      ))}
      <text x="332" y="270" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.2">
        MERCHANT-EDITABLE INSTANCES
      </text>
    </svg>
  );
}
