/* Storefront-shaped mockups. All decorative-but-described: each <svg> carries a
   role="img" + aria-label so the figure means something without sight. */

/** Homepage-style storefront: hero band, trust bar, collection grid. */
export function StorefrontMockup() {
  return (
    <svg
      viewBox="0 0 560 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Storefront homepage layout: header, hero band with a call to action, a trust bar and a three-up collection grid"
    >
      <rect width="560" height="380" fill="#fff" />
      <rect x="0" y="0" width="560" height="34" fill="#fbfcfb" />
      <rect x="24" y="13" width="58" height="8" rx="4" fill="#0b1f17" />
      {[300, 356, 412].map((x) => (
        <rect key={x} x={x} y="14" width="40" height="6" rx="3" fill="#a9c8bb" />
      ))}
      <rect x="480" y="10" width="56" height="14" rx="7" fill="#0a5d42" />
      <rect x="0" y="34" width="560" height="1" fill="#d5e5dc" />

      {/* hero */}
      <rect x="0" y="35" width="560" height="150" fill="#eef6f1" />
      <rect x="24" y="66" width="196" height="16" rx="4" fill="#0b1f17" />
      <rect x="24" y="90" width="164" height="16" rx="4" fill="#0b1f17" />
      <rect x="24" y="118" width="220" height="7" rx="3" fill="#4d6259" />
      <rect x="24" y="134" width="176" height="7" rx="3" fill="#4d6259" />
      <rect x="24" y="154" width="112" height="22" rx="6" fill="#0a5d42" />
      <rect x="300" y="52" width="236" height="118" rx="8" fill="#d5e5dc" />
      <circle cx="418" cy="111" r="30" fill="#a9c8bb" />

      {/* trust bar */}
      <rect x="0" y="185" width="560" height="34" fill="#052e21" />
      {[40, 190, 340, 452].map((x) => (
        <rect key={x} x={x} y="198" width="70" height="7" rx="3.5" fill="#7fd9b4" opacity="0.75" />
      ))}

      {/* collection grid */}
      <rect x="24" y="240" width="120" height="8" rx="4" fill="#0b1f17" />
      {[24, 208, 392].map((x) => (
        <g key={x}>
          <rect x={x} y="262" width="144" height="82" rx="8" fill="#fbfcfb" stroke="#d5e5dc" />
          <rect x={x + 14} y="276" width="116" height="34" rx="5" fill="#eef6f1" />
          <rect x={x + 14} y="318" width="76" height="6" rx="3" fill="#4d6259" />
          <rect x={x + 14} y="330" width="42" height="6" rx="3" fill="#17c47f" />
        </g>
      ))}
    </svg>
  );
}

/** Product template: gallery, variant picker, bundle block, sticky add to cart. */
export function ProductPageMockup() {
  return (
    <svg
      viewBox="0 0 560 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Product page layout: image gallery on the left, variant picker, quantity, bundle block and add-to-cart button on the right"
    >
      <rect width="560" height="380" fill="#fff" />
      <rect x="0" y="0" width="560" height="30" fill="#fbfcfb" />
      <rect x="24" y="11" width="52" height="8" rx="4" fill="#0b1f17" />
      <rect x="0" y="30" width="560" height="1" fill="#d5e5dc" />

      {/* gallery */}
      <rect x="24" y="50" width="252" height="238" rx="8" fill="#eef6f1" stroke="#d5e5dc" />
      <circle cx="150" cy="150" r="52" fill="#d5e5dc" />
      <rect x="118" y="216" width="64" height="8" rx="4" fill="#a9c8bb" />
      {[24, 84, 144, 204].map((x) => (
        <rect key={x} x={x} y="298" width="52" height="52" rx="6" fill="#fbfcfb" stroke={x === 24 ? "#0a5d42" : "#d5e5dc"} />
      ))}

      {/* details */}
      <rect x="304" y="50" width="86" height="6" rx="3" fill="#17c47f" />
      <rect x="304" y="68" width="200" height="14" rx="4" fill="#0b1f17" />
      <rect x="304" y="92" width="70" height="12" rx="4" fill="#0a5d42" />
      <rect x="304" y="118" width="60" height="6" rx="3" fill="#4d6259" />
      {[304, 348, 392].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="132"
          width="38"
          height="24"
          rx="5"
          fill={i === 0 ? "#0a5d42" : "#fbfcfb"}
          stroke={i === 0 ? "#0a5d42" : "#d5e5dc"}
        />
      ))}
      <rect x="304" y="170" width="60" height="6" rx="3" fill="#4d6259" />
      <rect x="304" y="184" width="86" height="24" rx="5" fill="#fbfcfb" stroke="#d5e5dc" />

      {/* bundle block — the custom section */}
      <rect x="304" y="220" width="232" height="62" rx="7" fill="#eef6f1" stroke="#17c47f" strokeDasharray="4 3" />
      <rect x="316" y="232" width="92" height="6" rx="3" fill="#0a5d42" />
      {[316, 388, 460].map((x) => (
        <rect key={x} x={x} y="248" width="64" height="24" rx="5" fill="#fff" stroke="#d5e5dc" />
      ))}

      <rect x="304" y="296" width="232" height="30" rx="7" fill="#0a5d42" />
      <rect x="376" y="307" width="88" height="8" rx="4" fill="#7fd9b4" />
      <rect x="304" y="336" width="150" height="6" rx="3" fill="#a9c8bb" />
    </svg>
  );
}

/** Mobile layout — sits inside the .phone frame in mockups.css. */
export function MobileLayoutMockup() {
  return (
    <svg
      viewBox="0 0 240 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mobile storefront layout: compact header, stacked hero, single-column product cards and a thumb-reachable sticky add-to-cart bar"
    >
      <rect width="240" height="440" fill="#fff" />
      <rect x="0" y="0" width="240" height="34" fill="#fbfcfb" />
      <rect x="14" y="14" width="14" height="2.5" rx="1.25" fill="#0b1f17" />
      <rect x="14" y="19" width="14" height="2.5" rx="1.25" fill="#0b1f17" />
      <rect x="98" y="13" width="44" height="7" rx="3.5" fill="#0b1f17" />
      <circle cx="222" cy="17" r="7" fill="#eef6f1" />
      <rect x="0" y="34" width="240" height="1" fill="#d5e5dc" />

      <rect x="0" y="35" width="240" height="128" fill="#eef6f1" />
      <rect x="16" y="56" width="150" height="12" rx="4" fill="#0b1f17" />
      <rect x="16" y="74" width="118" height="12" rx="4" fill="#0b1f17" />
      <rect x="16" y="98" width="170" height="6" rx="3" fill="#4d6259" />
      <rect x="16" y="120" width="208" height="30" rx="7" fill="#0a5d42" />

      <rect x="16" y="180" width="96" height="7" rx="3.5" fill="#0b1f17" />
      {[200, 292].map((y) => (
        <g key={y}>
          <rect x="16" y={y} width="208" height="80" rx="8" fill="#fbfcfb" stroke="#d5e5dc" />
          <rect x="26" y={y + 10} width="60" height="60" rx="6" fill="#eef6f1" />
          <rect x="98" y={y + 18} width="104" height="7" rx="3.5" fill="#4d6259" />
          <rect x="98" y={y + 34} width="70" height="7" rx="3.5" fill="#a9c8bb" />
          <rect x="98" y={y + 52} width="46" height="7" rx="3.5" fill="#17c47f" />
        </g>
      ))}

      <rect x="0" y="388" width="240" height="52" fill="#fbfcfb" />
      <rect x="0" y="388" width="240" height="1" fill="#d5e5dc" />
      <rect x="16" y="402" width="208" height="26" rx="7" fill="#0a5d42" />
      <rect x="90" y="411" width="60" height="7" rx="3.5" fill="#7fd9b4" />
    </svg>
  );
}
