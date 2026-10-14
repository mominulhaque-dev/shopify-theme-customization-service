export type BackdropVariant =
  | "aurora"
  | "mesh"
  | "grid"
  | "dots"
  | "beams"
  | "rings"
  | "contour"
  | "organic";

interface BackdropProps {
  variant?: BackdropVariant;
  /** Dark sections swap to the on-deep palette and higher-contrast masks. */
  tone?: "light" | "dark";
  /** Adds fine film grain over the variant. */
  noise?: boolean;
  /** Adds parallax-drifting abstract outlines (desktop only, see backdrops-2.css). */
  shapes?: boolean;
  className?: string;
}

/**
 * Decorative section backdrop. Eight variants so no two adjacent bands share
 * the same effect — the aurora belongs to the hero, the grid to the pricing
 * ladder, contour lines to timeline sections, and so on.
 *
 * All of it is inert: aria-hidden, pointer-events:none, pinned behind content
 * by `.has-backdrop` (base.css). Motion comes from CSS keyframes plus the
 * `data-mask-move` / `data-sweep` / `data-drift` / `data-parallax` hooks that
 * MotionProvider picks up, so a visitor with reduced motion gets the same
 * composition standing still.
 */
export default function Backdrop({
  variant = "aurora",
  tone = "light",
  noise = false,
  shapes = false,
  className,
}: BackdropProps) {
  const classes = ["bd", `bd-${variant}`, tone === "dark" ? "bd-dark" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {variant === "aurora" && (
        <>
          <span className="bd-blob b1" />
          <span className="bd-blob b2" />
          <span className="bd-blob b3" />
          <div className="bd-mask" data-mask-move="16" data-prop="mask" data-to-x="68%" data-to-y="58%" />
        </>
      )}

      {variant === "mesh" && (
        <>
          <div className="bd-mesh-layer" />
          <div className="bd-mask" data-mask-move="22" data-prop="mask" data-to-x="30%" data-to-y="70%" />
        </>
      )}

      {variant === "grid" && (
        <>
          <div
            className="bd-grid-layer"
            data-mask-move="19"
            data-prop="grid"
            data-to-x="72%"
            data-to-y="46%"
          />
          <span className="bd-blob b1" />
        </>
      )}

      {variant === "dots" && (
        <div
          className="bd-dots-layer"
          data-mask-move="21"
          data-prop="dot"
          data-to-x="38%"
          data-to-y="72%"
        />
      )}

      {variant === "beams" && (
        <>
          <div className="bd-beams-layer" />
          <div className="bd-beam-sweep" data-sweep="12" />
        </>
      )}

      {variant === "rings" && (
        <>
          <div className="bd-rings-layer" />
          <span className="bd-blob b2" />
        </>
      )}

      {variant === "contour" && <ContourLines />}

      {variant === "organic" && (
        <>
          <span className="bd-organic-shape" style={{ top: "-12%", left: "-8%" }} />
          <span className="bd-organic-shape o2" />
        </>
      )}

      {shapes && (
        <>
          <span className="bd-float sq" style={{ top: "14%", left: "6%" }} data-parallax="0.5" />
          <span className="bd-float ci" style={{ top: "62%", left: "-3%" }} data-parallax="-0.4" />
          <span className="bd-float pill" style={{ top: "24%", right: "4%" }} data-parallax="0.35" />
          <span className="bd-float tri" style={{ bottom: "12%", right: "12%" }} data-drift="14" />
        </>
      )}

      {noise && <div className="bd-noise" style={{ backgroundImage: NOISE_URI }} />}
    </div>
  );
}

/** Stacked contour curves, drawn on scroll via DrawSVG and drifting after. */
function ContourLines() {
  return (
    <svg
      className="bd-contour-svg"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      data-draw=""
      focusable="false"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          data-draw-line=""
          d={`M-40 ${120 + i * 78} C 220 ${60 + i * 74}, 430 ${210 + i * 70}, 660 ${150 + i * 76} S 1040 ${
            70 + i * 72
          }, 1240 ${170 + i * 74}`}
        />
      ))}
    </svg>
  );
}

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";
