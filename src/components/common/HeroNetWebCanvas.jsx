import { useEffect, useRef } from 'react';

const DEFAULT_PARTICLE_COUNT = 72;
const LINK_DISTANCE = 140;
const MOUSE_LINK_DISTANCE = 160;
const PARTICLE_COLOR = '99, 102, 241';
const LINE_COLOR = '129, 140, 248';

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createParticles(count, width, height) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.35, 0.35),
    vy: randomBetween(-0.35, 0.35),
    radius: randomBetween(1.2, 2.8),
  }));
}

/**
 * Reusable constellation / net-web canvas background with mouse-reactive links.
 * pointer-events-none — does not block clicks on content above.
 */
/**
 * Trapezoid inside hero canvas box: diagonal rises from bottom-left → top-right.
 * Box starts ~1.5rem past the text column (see wrapper class).
 */
const HERO_CLIP = 'polygon(0% 100%, 100% 100%, 100% 0%, 14% 0%)';

const HERO_MASK = `
  linear-gradient(105deg, transparent 0%, rgba(0,0,0,0.2) 25%, #000 45%),
  linear-gradient(to right, #000 0%, #000 100%)
`;

export default function HeroNetWebCanvas({
  className = '',
  canvasId,
  variant = 'full',
  particleCount: particleCountProp,
  tiltDeg = 0,
  offsetY = 0,
}) {
  const isHero = variant === 'hero';
  const particleCount =
    particleCountProp ?? (isHero ? 64 : DEFAULT_PARTICLE_COUNT);
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, active: false });
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { width, height, dpr };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(particleCount, width, height);
      } else {
        particlesRef.current.forEach((p) => {
          p.x = Math.min(width, Math.max(0, p.x));
          p.y = Math.min(height, Math.max(0, p.y));
        });
      }
    };

    const mapMouseToCanvas = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseMove = (e) => {
      const { x, y } = mapMouseToCanvas(e.clientX, e.clientY);
      mouseRef.current = { x, y, active: true };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: null, y: null, active: false };
    };

    const drawLine = (x1, y1, x2, y2, maxDist, baseAlpha) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      if (dist > maxDist) return;
      const alpha = baseAlpha * (1 - dist / maxDist);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
      ctx.lineWidth = 0.85;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const tick = () => {
      const { width, height } = sizeRef.current;
      if (width < 1 || height < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const particles = particlesRef.current;
      const reduced = reducedMotionRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          drawLine(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y,
            LINK_DISTANCE,
            0.22,
          );
        }
      }

      if (mouse.active && mouse.x != null && mouse.y != null) {
        for (const p of particles) {
          drawLine(p.x, p.y, mouse.x, mouse.y, MOUSE_LINK_DISTANCE, 0.35);
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 100 && !reduced) {
            p.x += (dx / dist) * 0.4;
            p.y += (dy / dist) * 0.4;
          }
        }
      }

      for (const p of particles) {
        const glow = p.radius > 2;
        ctx.beginPath();
        ctx.fillStyle = glow
          ? `rgba(${PARTICLE_COLOR}, 0.35)`
          : `rgba(${PARTICLE_COLOR}, 0.55)`;
        ctx.arc(p.x, p.y, glow ? p.radius * 1.8 : p.radius, 0, Math.PI * 2);
        ctx.fill();
        if (glow) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.7)`;
          ctx.arc(p.x, p.y, p.radius * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const section = wrapper.closest('.hero-glow-section');
    const moveTarget = section || window;
    moveTarget.addEventListener('mousemove', onMouseMove, { passive: true });
    moveTarget.addEventListener('mouseleave', onMouseLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      moveTarget.removeEventListener('mousemove', onMouseMove);
      moveTarget.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [particleCount]);

  const transformStyle = {
    ...(tiltDeg !== 0 || offsetY !== 0
      ? { transform: `rotate(${tiltDeg}deg) translateY(${offsetY}px)` }
      : {}),
    ...(isHero
      ? {
          clipPath: HERO_CLIP,
          WebkitClipPath: HERO_CLIP,
          WebkitMaskImage: HERO_MASK,
          maskImage: HERO_MASK,
          WebkitMaskComposite: 'add',
          maskComposite: 'add',
        }
      : {}),
  };

  const wrapperClass = isHero
    ? 'hero__canvas hero__canvas--hero pointer-events-none absolute top-0 right-0 bottom-0 z-[1] left-[38%] overflow-hidden sm:left-[max(42%,calc(700px+2.5rem))] lg:left-[max(36rem,calc(700px+1.5rem))]'
    : 'hero__canvas pointer-events-none absolute inset-0 z-[1] overflow-hidden';

  return (
    <div
      ref={wrapperRef}
      className={`${wrapperClass} ${className}`.trim()}
      style={Object.keys(transformStyle).length ? transformStyle : undefined}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        id={canvasId}
        className="block h-full w-full"
      />
    </div>
  );
}
