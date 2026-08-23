/**
 * Abstract, brand-colored illustration of a browser window showing a theme
 * editor sidebar + storefront preview. Stands in for a real product
 * screenshot (see CLAUDE.md §"Image strategy" for the swap-in plan once
 * real client screenshots exist) — built as SVG rather than a stock photo
 * so it stays on-brand and needs no binary asset in this build.
 */
export default function ThemeEditorMockup() {
  return (
    <svg
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a Shopify theme editor: a settings sidebar next to a live storefront preview"
    >
      <rect x="0" y="0" width="560" height="400" rx="14" fill="#fff" stroke="#d5e5dc" />
      <rect x="0" y="0" width="560" height="34" rx="14" fill="#eef6f1" />
      <rect x="0" y="20" width="560" height="14" fill="#eef6f1" />
      <circle cx="20" cy="17" r="5" fill="#d5e5dc" />
      <circle cx="38" cy="17" r="5" fill="#d5e5dc" />
      <circle cx="56" cy="17" r="5" fill="#d5e5dc" />

      {/* sidebar */}
      <rect x="16" y="50" width="160" height="24" rx="4" fill="#0a5d42" />
      <rect x="16" y="86" width="160" height="14" rx="3" fill="#d5e5dc" />
      <rect x="16" y="108" width="130" height="14" rx="3" fill="#d5e5dc" />
      <rect x="16" y="130" width="150" height="14" rx="3" fill="#d5e5dc" />
      <rect x="16" y="152" width="110" height="14" rx="3" fill="#d5e5dc" />
      <rect x="16" y="182" width="160" height="1" fill="#d5e5dc" />
      <rect x="16" y="198" width="160" height="14" rx="3" fill="#d5e5dc" />
      <rect x="16" y="220" width="140" height="14" rx="3" fill="#d5e5dc" />

      {/* preview pane */}
      <rect x="196" y="50" width="348" height="330" rx="8" fill="#fbfcfb" stroke="#d5e5dc" />
      <rect x="216" y="72" width="180" height="18" rx="3" fill="#0b1f17" />
      <rect x="216" y="100" width="280" height="10" rx="2" fill="#a9c8bb" />
      <rect x="216" y="118" width="220" height="10" rx="2" fill="#a9c8bb" />
      <rect x="216" y="146" width="120" height="34" rx="6" fill="#17c47f" />

      <rect x="216" y="204" width="150" height="100" rx="6" fill="#eef6f1" />
      <rect x="378" y="204" width="150" height="100" rx="6" fill="#eef6f1" />
      <rect x="232" y="224" width="118" height="10" rx="2" fill="#a9c8bb" />
      <rect x="232" y="242" width="80" height="10" rx="2" fill="#a9c8bb" />
      <rect x="394" y="224" width="118" height="10" rx="2" fill="#a9c8bb" />
      <rect x="394" y="242" width="80" height="10" rx="2" fill="#a9c8bb" />

      <rect x="216" y="322" width="312" height="1" fill="#d5e5dc" />
      <rect x="216" y="340" width="90" height="10" rx="2" fill="#566b62" />
      <rect x="316" y="340" width="90" height="10" rx="2" fill="#566b62" />
      <rect x="416" y="340" width="90" height="10" rx="2" fill="#566b62" />
    </svg>
  );
}
