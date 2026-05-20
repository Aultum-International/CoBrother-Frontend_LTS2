import { memo, useEffect, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import SoldStampSlam from './SoldStampSlam';

function formatInr(n) {
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

/** Fixed slot + inner GPU scale — no layout jump; blur only on card face, stamp sibling stays sharp. */
const DomainHeroCard = memo(function DomainHeroCard({
  item,
  dist,
  sealed,
  revealActive,
  onRevealDone,
}) {
  const reduce = useReducedMotion();
  const [ry, setRy] = useState(0);
  const [showSlam, setShowSlam] = useState(false);
  const [postReveal, setPostReveal] = useState(false);

  /* Subtle center emphasis — many samples = smooth motion as dist changes frame-to-frame */
  const scale = useTransform(
    dist,
    [0, 28, 56, 90, 130, 170, 220, 280, 340],
    reduce
      ? [1, 1, 1, 1, 1, 1, 1, 1, 1]
      : [1.03, 1.029, 1.024, 1.012, 0.995, 0.978, 0.962, 0.948, 0.938],
  );
  const opacity = useTransform(
    dist,
    [0, 50, 100, 160, 220],
    reduce ? [1, 1, 1, 1, 1] : [1, 0.985, 0.97, 0.955, 0.94],
  );
  const bgAlpha = useTransform(dist, [0, 50, 110, 200], [1, 0.94, 0.86, 0.78]);
  const cardBg = useMotionTemplate`rgba(255, 255, 255, ${bgAlpha})`;
  const shOpacity = useTransform(dist, [0, 75, 150, 230], [0.14, 0.07, 0.04, 0.028]);
  const shBlur = useTransform(dist, [0, 75, 150], [48, 22, 13]);
  const shY = useTransform(dist, [0, 75, 150], [28, 13, 9]);
  const cardShadow = useMotionTemplate`0 ${shY}px ${shBlur}px -16px rgba(15, 23, 42, ${shOpacity})`;
  const blurPx = useTransform(
    dist,
    [0, 88, 132, 210, 300],
    reduce ? [0, 0, 0, 0, 0] : [0, 0, 0.3, 1.35, 2],
  );
  const cardFilter = useMotionTemplate`blur(${blurPx}px)`;

  useEffect(() => {
    if (sealed) setPostReveal(false);
  }, [sealed]);

  const isSold = item.status === 'sold';
  const locked = sealed || postReveal;
  const showListing = item.status === 'available' || (isSold && !locked);

  useEffect(() => {
    if (!revealActive || sealed || reduce || !isSold) return undefined;
    let cancelled = false;
    const run = async () => {
      setRy(180);
      await new Promise((r) => setTimeout(r, 580));
      if (cancelled) return;
      setRy(0);
      await new Promise((r) => setTimeout(r, 120));
      if (cancelled) return;
      setShowSlam(true);
      await new Promise((r) => setTimeout(r, 1120));
      if (cancelled) return;
      setShowSlam(false);
      onRevealDone?.(item.id);
      setPostReveal(true);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [revealActive, sealed, reduce, isSold, item.id, onRevealDone]);

  const initial = (item.name || '?').slice(0, 1).toUpperCase();
  const avatarClass = locked
    ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-inner'
    : isSold && !locked
      ? 'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-inner'
      : 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-inner';

  const frontFaceContent = locked ? (
    <>
      <div
        className={`mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${avatarClass}`}
        aria-hidden
      >
        ✓
      </div>
      <p className="w-full truncate font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
        {item.name}
        <span className="text-indigo-600">.{item.tld}</span>
      </p>
      <p className="mt-3 line-clamp-2 w-full flex-1 text-xs leading-relaxed text-slate-500 md:text-[13px]">
        <span className="font-medium text-slate-700">{item.owner}</span>
        <span className="mx-1.5 text-slate-300">·</span>
        <span className="font-semibold text-slate-800">{formatInr(item.price)}</span>
        <span className="mt-1.5 block text-[11px] font-normal text-slate-400">
          Recorded sale on Cobrother
        </span>
      </p>
      <div className="mt-auto flex w-full items-center justify-center gap-2 pt-2">
        <span className="rounded-full border border-red-200 bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
          Sold
        </span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          Verified
        </span>
      </div>
    </>
  ) : showListing ? (
    <>
      <div
        className={`mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${avatarClass}`}
        aria-hidden
      >
        {initial}
      </div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:text-xs">
        {isSold ? 'Marketplace' : 'Available'}
      </p>
      <p className="w-full truncate font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
        {item.name}
        <span className="text-indigo-600">.{item.tld}</span>
      </p>
      <p className="mt-auto line-clamp-2 w-full pt-3 text-xs leading-relaxed text-slate-500 md:text-[13px]">
        <span className="font-semibold text-slate-800">{formatInr(item.price)}</span>
        {isSold ? (
          <span className="mt-1.5 block text-[11px] font-normal text-slate-400">
            Listed on marketplace · seals when centered
          </span>
        ) : (
          <span className="mt-1.5 block text-[11px] font-normal text-slate-400">
            Premium name · secure checkout
          </span>
        )}
      </p>
    </>
  ) : (
    <p className="mt-auto text-xs font-medium text-slate-400 md:text-sm">Processing…</p>
  );

  return (
    <div
      className="relative shrink-0 overflow-visible"
      style={{ width: 268, height: 228 }}
    >
      <motion.div
        className="h-full w-full origin-center transform-gpu will-change-transform"
        style={{
          scale,
          opacity,
          translateZ: 0,
        }}
      >
        <div className="h-full w-full [perspective:1100px]" style={{ perspective: '1100px' }}>
          <motion.div
            className="relative h-full w-full transform-gpu"
            style={{ transformStyle: 'preserve-3d', translateZ: 0 }}
            animate={{ rotateY: reduce ? 0 : ry }}
            transition={{ duration: 0.62, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <motion.div
                className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-3xl px-6 py-6 text-center ring-1 ring-slate-900/[0.045] ring-inset md:px-7 md:py-7"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: cardShadow,
                  filter: cardFilter,
                  translateZ: 0,
                  willChange: 'filter',
                }}
              >
                {frontFaceContent}
              </motion.div>
              <SoldStampSlam visible={showSlam} />
            </div>

            <div
              className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-6 text-center shadow-inner ring-1 ring-slate-900/[0.04] ring-inset md:px-7 md:py-7"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                translateZ: 0,
              }}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-500">
                <span className="text-xl">⟳</span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 md:text-xs">Authenticating</p>
              <p className="mt-1.5 text-xs text-slate-600 md:text-sm">Secure transfer</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

export default DomainHeroCard;
