/**
 * Static cyan / purple / rose viewport edge glow.
 * Kept for compatibility if older pages import this component.
 */
export default function RotatingBorderBeam() {
  return (
    <div className="static-edge-beam-root pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <style>{`
        .static-edge-beam-root::before,
        .static-edge-beam-root::after {
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

        .static-edge-beam-root::before {
          padding: 2px;
          background:
            linear-gradient(135deg,
              rgba(0, 195, 255, 0.58),
              rgba(99, 102, 241, 0.34) 30%,
              rgba(120, 80, 220, 0.42) 58%,
              rgba(255, 48, 108, 0.4));
        }

        .static-edge-beam-root::after {
          padding: 7px;
          opacity: 0.62;
          filter: blur(12px);
          background:
            linear-gradient(135deg,
              rgba(0, 195, 255, 0.3),
              rgba(120, 80, 220, 0.24),
              rgba(255, 48, 108, 0.24));
        }
      `}</style>
    </div>
  );
}
