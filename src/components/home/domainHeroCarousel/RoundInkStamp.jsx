/**
 * Circular ink stamp — sold (green) or unsold (red).
 */
const STYLES = {
  sold: {
    outer: 'border-emerald-800 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800',
    inner: 'border-emerald-900/40',
    shadow:
      'shadow-[0_8px_24px_rgba(6,95,70,0.45),0_4px_12px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]',
    text: 'text-white',
  },
  unsold: {
    outer: 'border-red-800 bg-gradient-to-br from-red-500 via-red-600 to-red-800',
    inner: 'border-red-900/40',
    shadow:
      'shadow-[0_8px_24px_rgba(185,28,28,0.45),0_4px_12px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.22)]',
    text: 'text-white',
  },
};

const SIZES = {
  sm: { box: 'h-[52px] w-[52px] border-[2.5px]', inner: 'inset-[5px] border-[1.5px]', text: 'text-[8px] tracking-[0.12em]' },
  md: { box: 'h-[68px] w-[68px] border-[3px]', inner: 'inset-[6px] border-2', text: 'text-[9px] tracking-[0.14em]' },
  lg: { box: 'h-[92px] w-[92px] border-[3px]', inner: 'inset-[7px] border-2', text: 'text-[10px] tracking-[0.18em]' },
};

export default function RoundInkStamp({
  variant = 'sold',
  size = 'sm',
  label,
  className = '',
}) {
  const theme = STYLES[variant] ?? STYLES.sold;
  const dim = SIZES[size] ?? SIZES.sm;
  const displayLabel =
    label ?? (size === 'lg' ? null : variant === 'unsold' ? 'UNSOLD' : 'SOLD');
  const lines =
    displayLabel == null
      ? variant === 'unsold'
        ? ['DOMAIN', 'UNSOLD']
        : ['DOMAIN', 'SOLD']
      : String(displayLabel).split('\n');

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${dim.box} ${theme.outer} ${theme.shadow} -rotate-12 ${className}`.trim()}
      aria-hidden
    >
      <div
        className={`pointer-events-none absolute rounded-full ${dim.inner} ${theme.inner} border`}
        aria-hidden
      />
      <span
        className={`relative z-10 px-1 text-center font-black uppercase leading-tight ${dim.text} ${theme.text}`}
        style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.35)' }}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </div>
  );
}
