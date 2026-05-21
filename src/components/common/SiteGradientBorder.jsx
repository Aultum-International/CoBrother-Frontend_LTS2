/**
 * Static viewport edge glow.
 * Matches the search bar's cyan / rose / purple glow without moving sweep lines.
 */
export default function SiteGradientBorder() {
  return (
    <>
      <div className="site-static-border" aria-hidden />
      <style>{`
        .site-static-border {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 1100;
        }

        .site-static-border::before,
        .site-static-border::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .site-static-border::before {
          padding: 2px;
          background:
            linear-gradient(135deg,
              rgba(0, 195, 255, 0.62) 0%,
              rgba(99, 102, 241, 0.44) 24%,
              rgba(120, 80, 220, 0.48) 48%,
              rgba(168, 85, 247, 0.42) 66%,
              rgba(255, 48, 108, 0.46) 86%,
              rgba(0, 195, 255, 0.48) 100%);
          box-shadow:
            inset 0 0 0 1px rgba(120, 80, 220, 0.24),
            0 0 18px rgba(120, 80, 220, 0.16);
        }

        .site-static-border::after {
          padding: 9px;
          opacity: 0.72;
          filter: blur(13px);
          background:
            linear-gradient(135deg,
              rgba(0, 195, 255, 0.32) 0%,
              rgba(99, 102, 241, 0.18) 28%,
              rgba(120, 80, 220, 0.26) 52%,
              rgba(168, 85, 247, 0.2) 72%,
              rgba(255, 48, 108, 0.26) 100%);
        }
      `}</style>
    </>
  );
}
