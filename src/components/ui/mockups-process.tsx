/* Process-shaped visuals: breakpoints, schedule, QA. */

/** The device widths every template is actually checked at. */
export function BreakpointGrid() {
  const devices = [
    { label: "360", note: "Small phone", w: 46, h: 84 },
    { label: "390", note: "Phone", w: 54, h: 96 },
    { label: "768", note: "Tablet", w: 92, h: 112 },
    { label: "1024", note: "Laptop", w: 128, h: 92 },
    { label: "1440", note: "Desktop", w: 160, h: 104 },
  ];
  let x = 24;

  return (
    <svg
      viewBox="0 0 560 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The five viewport widths every template is QA'd at, from a 360 pixel phone to a 1440 pixel desktop"
    >
      <rect width="560" height="220" fill="#fff" />
      <text x="24" y="28" fontFamily="monospace" fontSize="9" fill="#6e6e6e" letterSpacing="1.4">
        QA MATRIX — EVERY TEMPLATE, EVERY WIDTH
      </text>
      {devices.map((d, i) => {
        const cx = x;
        x += d.w + 28;
        return (
          <g key={d.label}>
            <rect x={cx} y={168 - d.h} width={d.w} height={d.h} rx="6" fill="#f9f9f9" stroke={i > 2 ? "#c3ff00" : "#e3e3e3"} />
            <rect x={cx + 6} y={174 - d.h} width={d.w - 12} height="5" rx="2.5" fill="#c4c4c4" />
            <rect x={cx + 6} y={184 - d.h} width={(d.w - 12) * 0.7} height="5" rx="2.5" fill="#f7f5f1" />
            <rect x={cx + 6} y={152} width={d.w - 12} height="10" rx="3" fill="#173eb8" opacity="0.85" />
            <text x={cx} y={188} fontFamily="monospace" fontSize="9.5" fill="#15141a">
              {d.label}px
            </text>
            <text x={cx} y={202} fontFamily="monospace" fontSize="8.5" fill="#939393">
              {d.note}
            </text>
          </g>
        );
      })}
      <rect x="24" y="168" width="512" height="1" fill="#e3e3e3" />
    </svg>
  );
}

/** Project schedule: staged milestones with the client's approval gates. */
export function TimelineGantt() {
  const bars = [
    { label: "Scope + audit", start: 0, len: 2, tone: "#173eb8" },
    { label: "Staging duplicate", start: 1.6, len: 1, tone: "#2a55c9" },
    { label: "Build — milestone 1", start: 2.4, len: 3, tone: "#c3ff00" },
    { label: "Review + revisions", start: 4.6, len: 2.4, tone: "#dcff6b" },
    { label: "Device QA", start: 6.4, len: 1.6, tone: "#2a55c9" },
    { label: "Publish + handover", start: 7.6, len: 1.4, tone: "#15141a" },
  ];
  const unit = 52;

  return (
    <svg
      viewBox="0 0 560 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Project schedule showing scope, staging, build milestones, review, device QA and handover overlapping across roughly nine weeks, with approval gates before build and before publish"
    >
      <rect width="560" height="300" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
        <g key={w}>
          <rect x={168 + w * unit} y="40" width="1" height="216" fill="#f7f5f1" />
          <text x={168 + w * unit} y="32" fontFamily="monospace" fontSize="8.5" fill="#939393">
            W{w + 1}
          </text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const y = 52 + i * 34;
        return (
          <g key={bar.label}>
            <text x="24" y={y + 14} fontFamily="sans-serif" fontSize="11" fill="#15141a">
              {bar.label}
            </text>
            <rect x={168 + bar.start * unit} y={y} width={bar.len * unit} height="19" rx="5" fill={bar.tone} />
          </g>
        );
      })}
      <g stroke="#7e5606" strokeWidth="1.2" strokeDasharray="4 3">
        <path d="M290 44V262" />
        <path d="M462 44V262" />
      </g>
      <text x="290" y="278" fontFamily="monospace" fontSize="8.5" fill="#7e5606">
        scope signed
      </text>
      <text x="440" y="278" fontFamily="monospace" fontSize="8.5" fill="#7e5606">
        publish approved
      </text>
    </svg>
  );
}

/** Handover artefacts: what the merchant receives at close. */
export function HandoverCard() {
  const items = [
    "Theme files exported (.zip)",
    "Change log, file by file",
    "Update-risk notes per core edit",
    "Section + block usage guide",
    "Editor walkthrough recording",
    "Staging theme left in place",
  ];

  return (
    <svg
      viewBox="0 0 560 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Handover checklist: exported theme files, a file-by-file change log, update-risk notes, a section usage guide, an editor walkthrough recording and the staging theme left in place"
    >
      <rect width="560" height="250" fill="#fff" />
      <rect x="0" y="0" width="560" height="44" fill="#f7f5f1" />
      <text x="24" y="28" fontFamily="monospace" fontSize="9.5" fill="#173eb8" letterSpacing="1.4">
        HANDOVER PACKET
      </text>
      {items.map((item, i) => {
        const y = 70 + i * 29;
        return (
          <g key={item}>
            <rect x="24" y={y - 11} width="15" height="15" rx="4" fill="#c3ff00" />
            <path d={`M28 ${y - 4} l3 3 l4.5 -5`} stroke="#15141a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <text x="50" y={y + 1} fontFamily="sans-serif" fontSize="12" fill="#383643">
              {item}
            </text>
            <rect x="24" y={y + 12} width="512" height="1" fill="#f7f5f1" />
          </g>
        );
      })}
    </svg>
  );
}
