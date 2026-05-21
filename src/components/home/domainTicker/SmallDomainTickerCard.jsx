import { memo } from 'react';
import { motion } from 'framer-motion';

const statusStyles = {
  sold: 'border-emerald-200/80 bg-emerald-50/80 text-emerald-700',
  unsold: 'border-rose-200/80 bg-rose-50/80 text-rose-700',
};

const statusLabels = {
  sold: 'SOLD',
  unsold: 'UNSOLD',
};

function StatusStamp({ status }) {
  const isSold = status === 'sold';
  const tone = isSold
    ? {
        color: '#059669',
        plate: 'rgba(240, 253, 244, 0.86)',
        inkOpacity: 0.88,
        shadow: 'drop-shadow(0 12px 16px rgba(5, 150, 105, 0.24))',
        textSize: 34,
        label: 'SOLD',
      }
    : {
        color: '#b91c1c',
        plate: 'rgba(255, 241, 242, 0.94)',
        inkOpacity: 0.98,
        shadow: 'drop-shadow(0 14px 18px rgba(185, 28, 28, 0.3))',
        textSize: 28,
        label: 'UNSOLD',
      };

  return (
    <motion.div
      className="pointer-events-none absolute -right-1 -top-3 z-20 h-[78px] w-[100px] origin-center"
      initial={{ opacity: 0, scale: 1.45, rotate: -21, y: -26 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: -12,
        y: 0,
      }}
      transition={{
        opacity: { duration: 0.42, ease: 'easeOut' },
        scale: { type: 'spring', stiffness: 155, damping: 12, mass: 0.85 },
        rotate: { type: 'spring', stiffness: 130, damping: 14, mass: 0.9 },
        y: { type: 'spring', stiffness: 145, damping: 13, mass: 0.9 },
      }}
      style={{ color: tone.color, filter: tone.shadow }}
    >
      <motion.span
        className="absolute inset-4 rounded-full bg-current/10 blur-md"
        initial={{ opacity: 0, scale: 0.35 }}
        animate={{ opacity: [0, 0.42, 0.16], scale: [0.35, 1.18, 1] }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <svg
        viewBox="0 0 180 140"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id={`stamp-rough-${status}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed={isSold ? 7 : 11} />
            <feDisplacementMap in="SourceGraphic" scale="0.9" />
          </filter>
        </defs>

        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#stamp-rough-${status})`}
        >
          <circle
            cx="90"
            cy="70"
            r="57"
            strokeWidth="9"
            strokeDasharray="2 5"
            opacity="0.9"
          />
          <circle cx="90" cy="70" r="48" strokeWidth="4" opacity="0.86" />
          <circle cx="90" cy="70" r="42" strokeWidth="2.5" opacity="0.7" />
          <rect
            x="22"
            y="43"
            width="136"
            height="54"
            rx="4"
            strokeWidth="7"
            transform="rotate(-13 90 70)"
            fill={tone.plate}
          />
          <circle cx="34" cy="70" r="4.5" fill="currentColor" strokeWidth="0" transform="rotate(-13 90 70)" />
          <circle cx="146" cy="70" r="4.5" fill="currentColor" strokeWidth="0" transform="rotate(-13 90 70)" />
        </g>

        <g fill="currentColor" opacity={tone.inkOpacity} filter={`url(#stamp-rough-${status})`}>
          <text
            x="90"
            y="78"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(-13 90 70)"
            className="select-none fill-current font-sans font-black tracking-[0.06em]"
            style={{ fontSize: tone.textSize }}
          >
            {tone.label}
          </text>
          <text x="56" y="45" className="fill-current text-[20px] font-black">★</text>
          <text x="84" y="33" className="fill-current text-[18px] font-black">★</text>
          <text x="112" y="45" className="fill-current text-[20px] font-black">★</text>
          <text x="61" y="111" className="fill-current text-[18px] font-black">★</text>
          <text x="91" y="118" className="fill-current text-[20px] font-black">★</text>
          <text x="121" y="110" className="fill-current text-[18px] font-black">★</text>
        </g>
      </svg>
    </motion.div>
  );
}

const SmallDomainTickerCard = memo(function SmallDomainTickerCard({
  item,
  index = 0,
  focused = false,
  cardWidth = 224,
}) {
  const isSold = item.status === 'sold';

  return (
    <motion.article
      className="group relative flex h-[70px] shrink-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/80 bg-white/80 px-3.5 py-3 shadow-[0_16px_38px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:h-[76px] sm:px-4"
      style={{ width: cardWidth }}
      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: focused ? -1 : 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(238,242,255,0.34),rgba(255,255,255,0.58))]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
      {focused ? <StatusStamp status={item.status} /> : null}

      <div className="relative min-w-0">
        <p className="truncate text-[14px] font-bold leading-tight text-slate-900 sm:text-base">
          {item.domain}
        </p>
        <p className="mt-1 truncate text-[11px] font-medium text-slate-500">
          {item.owner || 'Verified buyer'}
        </p>
      </div>

      <div className="relative flex shrink-0 flex-col items-end gap-1">
        <span
          className={`rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${
            statusStyles[item.status] || statusStyles.unsold
          }`}
        >
          {statusLabels[item.status] || 'UNSOLD'}
        </span>
        {isSold ? (
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.55)]"
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.16, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        ) : null}
      </div>
    </motion.article>
  );
});

export default SmallDomainTickerCard;
