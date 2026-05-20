import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import DomainHeroCard from './DomainHeroCard';
import { DOMAIN_HERO_MOCK } from './mockDomainHeroData';

const CARD_W = 268;
const GAP = 12;
const STEP = CARD_W + GAP;
const PAD = 12;
/** Full loop duration — higher = slower drift past the viewport */
const LOOP_MS = 46000;

function doubleList(list) {
  return [...list, ...list];
}

const doubled = doubleList(DOMAIN_HERO_MOCK);
const SEGMENT = DOMAIN_HERO_MOCK.length * STEP;

function CarouselSlot({
  index,
  item,
  trackX,
  containerW,
  sealedIds,
  revealSlot,
  onRevealDone,
}) {
  const cw = containerW || 360;
  const dist = useTransform(trackX, (xv) =>
    Math.abs(xv + PAD + index * STEP + CARD_W / 2 - cw / 2),
  );
  const sealed = sealedIds.has(item.id);
  return (
    <DomainHeroCard
      item={item}
      dist={dist}
      sealed={sealed}
      revealActive={revealSlot === index && !sealed}
      onRevealDone={onRevealDone}
    />
  );
}

export default function RecentlySoldHeroCarousel({ className = '' }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const [cw, setCw] = useState(360);
  const trackX = useMotionValue(0);
  const [sealedIds, setSealedIds] = useState(() => new Set());
  const [revealSlot, setRevealSlot] = useState(null);
  const stableRef = useRef({ idx: -1, since: 0 });
  const sealedIdsRef = useRef(sealedIds);
  const revealSlotRef = useRef(revealSlot);
  const pausedRef = useRef(false);
  const cwRef = useRef(cw);
  cwRef.current = cw;
  sealedIdsRef.current = sealedIds;
  revealSlotRef.current = revealSlot;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setCw(Math.max(240, el.offsetWidth)));
    ro.observe(el);
    setCw(Math.max(240, el.offsetWidth));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return undefined;
    let raf = 0;
    let last = performance.now();
    const pxPerMs = SEGMENT / LOOP_MS;
    const tick = (now) => {
      const raw = now - last;
      last = now;
      const dt = Math.min(28, Math.max(5, raw));
      if (!pausedRef.current) {
        let v = trackX.get() - pxPerMs * dt;
        while (v <= -SEGMENT) v += SEGMENT;
        trackX.set(v);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, trackX]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const onRevealDone = useCallback((id) => {
    setSealedIds((prev) => new Set(prev).add(id));
    setRevealSlot(null);
    resume();
  }, [resume]);

  useMotionValueEvent(trackX, 'change', (xv) => {
    if (reduce || revealSlotRef.current !== null) return;
    const cw2 = cwRef.current || 360;
    let bestI = -1;
    let bestD = 1e9;
    for (let i = 0; i < doubled.length; i += 1) {
      const cardCenter = xv + PAD + i * STEP + CARD_W / 2;
      const d = Math.abs(cardCenter - cw2 / 2);
      if (d < bestD) {
        bestD = d;
        bestI = i;
      }
    }
    if (bestI < 0 || bestD > 62) {
      stableRef.current = { idx: -1, since: performance.now() };
      return;
    }
    const now = performance.now();
    if (stableRef.current.idx !== bestI) {
      stableRef.current = { idx: bestI, since: now };
      return;
    }
    if (now - stableRef.current.since < 420) return;
    const item = doubled[bestI];
    if (item.status !== 'sold' || sealedIdsRef.current.has(item.id)) return;
    pause();
    setRevealSlot(bestI);
  });

  const sealedKey = useMemo(() => [...sealedIds].sort().join(','), [sealedIds]);

  const slots = useMemo(
    () =>
      doubled.map((item, index) => (
        <CarouselSlot
          key={`${item.id}-${index}`}
          index={index}
          item={item}
          trackX={trackX}
          containerW={cw}
          sealedIds={sealedIds}
          revealSlot={revealSlot}
          onRevealDone={onRevealDone}
        />
      )),
    [trackX, cw, sealedKey, revealSlot, onRevealDone, sealedIds],
  );

  return (
    <div className={`min-h-0 min-w-0 overflow-visible ${className}`}>
      {/*
        One soft horizontal mask on the viewport (no stacked white gradient layers).
        Tighter card gap + no 1px borders on faces reduces vertical seams between cards.
      */}
      <div
        ref={wrapRef}
        className="relative mx-auto w-full overflow-x-clip overflow-y-visible px-3 py-6 sm:px-4 sm:py-7 md:px-5 md:py-8"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.92) 14%, #000 50%, rgba(0,0,0,0.92) 86%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.92) 14%, #000 50%, rgba(0,0,0,0.92) 86%, transparent 100%)',
        }}
      >
        <motion.div
          className="relative z-0 flex w-max flex-row items-center gap-3 transform-gpu will-change-transform"
          style={{
            x: trackX,
            paddingLeft: PAD,
            translateZ: 0,
          }}
        >
          {slots}
        </motion.div>
      </div>
    </div>
  );
}
