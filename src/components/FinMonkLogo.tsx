/**
 * FinMonk brand mark — person reading / "M" motif with blue-to-purple gradient ring.
 * Use `size` to control width/height (default 40px).
 * The SVG is self-contained with unique gradient IDs so it renders correctly
 * when used multiple times on the same page.
 */

interface FinMonkLogoProps {
  /** Width and height in pixels (square). Default: 40 */
  size?: number;
  className?: string;
}

export default function FinMonkLogo({ size = 40, className = '' }: FinMonkLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FinMonk logo"
      role="img"
      className={className}
    >
      <defs>
        {/* Outer ring gradient: blue → purple */}
        <linearGradient id="fm-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Inner mark gradient: blue → purple */}
        <linearGradient id="fm-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* ── Outer ring ── */}
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke="url(#fm-ring)"
        strokeWidth="3.5"
        fill="white"
      />

      {/* ── Head (circle) ── */}
      <circle cx="50" cy="24" r="9" fill="url(#fm-mark)" />

      {/* ── Body / M shape ──
          Two arms raised + chevron body, drawn as a single path */}
      <path
        d="
          M28 42
          C28 42 36 34 44 40
          L50 46
          L56 40
          C64 34 72 42 72 42
          L72 56
          L50 72
          L28 56
          Z
        "
        fill="url(#fm-mark)"
      />

      {/* ── Inner V / chevron cutout (white) ── */}
      <path
        d="M38 46 L50 58 L62 46"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Base platform ── */}
      <path
        d="M22 72 Q50 80 78 72"
        stroke="url(#fm-mark)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
