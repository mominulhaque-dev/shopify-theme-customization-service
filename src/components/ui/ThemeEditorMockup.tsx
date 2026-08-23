/**
 * Theme editor: settings sidebar beside a live storefront preview.
 *
 * Upgraded from the flat first version — the sidebar's active row, the section
 * list and the preview's primary block now carry `data-draw-line` connectors so
 * MotionProvider draws the relationship between "setting on the left" and
 * "result on the right" as the figure scrolls in. That relationship is the
 * whole argument of the themes section, so it is worth animating.
 */
export default function ThemeEditorMockup() {
  return (
    <svg
      viewBox="0 0 560 372"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      data-draw=""
      aria-label="Shopify theme editor: a settings sidebar on the left connected to the matching blocks in a storefront preview on the right"
    >
      <rect x="0" y="0" width="560" height="372" fill="#fff" />

      {/* sidebar */}
      <rect x="14" y="16" width="164" height="26" rx="5" fill="#173eb8" />
      <rect x="26" y="26" width="86" height="6" rx="3" fill="#dcff6b" />
      <text x="14" y="60" fontFamily="monospace" fontSize="8" fill="#6e6e6e" letterSpacing="1.2">
        SECTIONS
      </text>
      {[70, 92, 114, 136].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y} width="164" height="16" rx="4" fill={i === 1 ? "#f7f5f1" : "#f9f9f9"} stroke="#e3e3e3" />
          <rect x="22" y={y + 5} width={i === 1 ? 74 : 56 + i * 8} height="6" rx="3" fill={i === 1 ? "#173eb8" : "#c4c4c4"} />
          <rect x="164" y={y + 5} width="6" height="6" rx="1" fill="#e3e3e3" />
        </g>
      ))}
      <text x="14" y="176" fontFamily="monospace" fontSize="8" fill="#6e6e6e" letterSpacing="1.2">
        SETTINGS
      </text>
      <rect x="14" y="186" width="164" height="14" rx="4" fill="#f9f9f9" stroke="#e3e3e3" />
      <rect x="22" y="191" width="48" height="5" rx="2.5" fill="#c4c4c4" />
      <rect x="14" y="208" width="164" height="14" rx="4" fill="#f9f9f9" stroke="#e3e3e3" />
      <rect x="22" y="213" width="70" height="5" rx="2.5" fill="#c4c4c4" />
      <circle cx="24" cy="238" r="7" fill="#c3ff00" />
      <rect x="38" y="235" width="52" height="6" rx="3" fill="#c4c4c4" />
      <rect x="14" y="262" width="96" height="20" rx="5" fill="#173eb8" />

      {/* divider */}
      <rect x="190" y="12" width="1" height="348" fill="#e3e3e3" />

      {/* preview pane */}
      <rect x="206" y="16" width="340" height="340" rx="8" fill="#f9f9f9" stroke="#e3e3e3" />
      <rect x="222" y="32" width="308" height="22" rx="4" fill="#f7f5f1" />
      <rect x="232" y="40" width="40" height="6" rx="3" fill="#15141a" />
      <rect x="470" y="40" width="50" height="6" rx="3" fill="#c4c4c4" />

      <rect x="222" y="68" width="170" height="14" rx="3" fill="#15141a" />
      <rect x="222" y="90" width="220" height="7" rx="3" fill="#c4c4c4" />
      <rect x="222" y="104" width="184" height="7" rx="3" fill="#c4c4c4" />
      <rect x="222" y="126" width="104" height="26" rx="6" fill="#c3ff00" />

      <rect x="222" y="172" width="146" height="86" rx="6" fill="#f7f5f1" stroke="#e3e3e3" />
      <rect x="384" y="172" width="146" height="86" rx="6" fill="#f7f5f1" stroke="#e3e3e3" />
      <rect x="236" y="188" width="100" height="7" rx="3" fill="#c4c4c4" />
      <rect x="236" y="202" width="64" height="7" rx="3" fill="#c4c4c4" />
      <rect x="398" y="188" width="100" height="7" rx="3" fill="#c4c4c4" />
      <rect x="398" y="202" width="64" height="7" rx="3" fill="#c4c4c4" />

      <rect x="222" y="276" width="308" height="1" fill="#e3e3e3" />
      <rect x="222" y="292" width="86" height="7" rx="3" fill="#6e6e6e" />
      <rect x="320" y="292" width="86" height="7" rx="3" fill="#6e6e6e" />
      <rect x="418" y="292" width="86" height="7" rx="3" fill="#6e6e6e" />
      <rect x="222" y="318" width="140" height="7" rx="3" fill="#e3e3e3" />

      {/* setting → result connectors */}
      <g stroke="#c3ff00" strokeWidth="1.2" fill="none" strokeDasharray="3 3">
        <path data-draw-line="" d="M178 100 C 196 100, 196 133, 214 133" />
        <path data-draw-line="" d="M178 238 C 196 238, 196 215, 214 215" />
      </g>
      <circle cx="214" cy="133" r="2.6" fill="#c3ff00" />
      <circle cx="214" cy="215" r="2.6" fill="#c3ff00" />
    </svg>
  );
}
