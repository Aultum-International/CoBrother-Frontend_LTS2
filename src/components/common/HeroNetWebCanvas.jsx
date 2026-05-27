import { useEffect, useRef, useState } from 'react';

const DEFAULT_PARTICLE_COUNT = 72;
const LINE_COLOR = '129, 140, 248';
const PARTICLE_COLOR = '99, 102, 241';

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

function getViewportTier() {
  if (typeof window === 'undefined') return 'lg';
  const w = window.innerWidth;
  if (w < 640) return 'sm';
  if (w < 1024) return 'md';
  return 'lg';
}

function tierParams(tier) {
  switch (tier) {
    case 'sm':
      return {
        particleCount: 10,
        linkDistance: 100,
        mouseLinkDistance: 85,
        lineAlpha: 0.055,
        mouseLineAlpha: 0.07,
        particleAlphaMul: 0.3,
        velocityMul: 0.4,
      };
    case 'md':
      return {
        particleCount: 20,
        linkDistance: 122,
        mouseLinkDistance: 128,
        lineAlpha: 0.075,
        mouseLineAlpha: 0.1,
        particleAlphaMul: 0.42,
        velocityMul: 0.55,
      };
    default:
      return {
        particleCount: 64,
        linkDistance: 140,
        mouseLinkDistance: 160,
        lineAlpha: 0.22,
        mouseLineAlpha: 0.35,
        particleAlphaMul: 1,
        velocityMul: 1,
      };
  }
}

/**
 * Trapezoid clip — desktop hero only (keeps net off the headline column).
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
  const [viewportTier, setViewportTier] = useState(() => getViewportTier());
  const tierRef = useRef(getViewportTier());
  const animParamsRef = useRef(tierParams(viewportTier));

  useEffect(() => {
    const syncTier = () => {
      const next = getViewportTier();
      tierRef.current = next;
      animParamsRef.current = tierParams(next);
      setViewportTier((prev) => (prev === next ? prev : next));
    };
    syncTier();
    window.addEventListener('resize', syncTier, { passive: true });
    return () => window.removeEventListener('resize', syncTier);
  }, []);

  const isHeroDesktop = isHero && viewportTier === 'lg';

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
      const p = tierParams(tierRef.current);
      animParamsRef.current = p;

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

      const count = particleCountProp ?? (isHero ? p.particleCount : DEFAULT_PARTICLE_COUNT);
      particlesRef.current = createParticles(count, width, height);
    };

    const mapMouseToCanvas = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseMove = (e) => {
      if (tierRef.current !== 'lg') return;
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
      ctx.lineWidth = tierRef.current === 'lg' ? 0.85 : 0.65;
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

      const p = animParamsRef.current;
      const particles = particlesRef.current;
      const reduced = reducedMotionRef.current;
      const mouse = mouseRef.current;
      const vm = p.velocityMul;

      ctx.clearRect(0, 0, width, height);

      if (!reduced) {
        for (const part of particles) {
          part.x += part.vx * vm;
          part.y += part.vy * vm;
          if (part.x <= 0 || part.x >= width) part.vx *= -1;
          if (part.y <= 0 || part.y >= height) part.vy *= -1;
          part.x = Math.max(0, Math.min(width, part.x));
          part.y = Math.max(0, Math.min(height, part.y));
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          drawLine(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y,
            p.linkDistance,
            p.lineAlpha,
          );
        }
      }

      if (mouse.active && mouse.x != null && mouse.y != null) {
        for (const part of particles) {
          drawLine(part.x, part.y, mouse.x, mouse.y, p.mouseLinkDistance, p.mouseLineAlpha);
          const dx = part.x - mouse.x;
          const dy = part.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = tierRef.current === 'lg' ? 0.4 : 0.22;
          if (dist < 100 && !reduced) {
            part.x += (dx / dist) * pull;
            part.y += (dy / dist) * pull;
          }
        }
      }

      const pam = p.particleAlphaMul;
      for (const part of particles) {
        const glow = part.radius > 2;
        ctx.beginPath();
        ctx.fillStyle = glow
          ? `rgba(${PARTICLE_COLOR}, ${0.35 * pam})`
          : `rgba(${PARTICLE_COLOR}, ${0.55 * pam})`;
        ctx.arc(part.x, part.y, glow ? part.radius * 1.65 : part.radius * 0.95, 0, Math.PI * 2);
        ctx.fill();
        if (glow) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${0.65 * pam})`;
          ctx.arc(part.x, part.y, part.radius * 0.5, 0, Math.PI * 2);
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
  }, [particleCountProp, isHero, viewportTier]);

  const transformStyle = {
    ...(tiltDeg !== 0 || offsetY !== 0
      ? { transform: `rotate(${tiltDeg}deg) translateY(${offsetY}px)` }
      : {}),
    ...(isHeroDesktop
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
    ? 'hero__canvas hero__canvas--hero pointer-events-none absolute z-[1] overflow-hidden'
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
