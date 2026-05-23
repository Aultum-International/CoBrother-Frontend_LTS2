import { Pencil } from 'lucide-react';

/** Consistent edit pencil icon (Lucide) — use instead of ✏ emoji. */
export function EditIcon({ size = 16, className = '' }) {
  return (
    <Pencil
      size={size}
      strokeWidth={2.25}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    />
  );
}

/** Label + pencil for btn-glow and text buttons. */
export default function EditActionLabel({
  children = 'Edit',
  iconSize = 16,
  className = '',
}) {
  return (
    <span className={`inline-flex items-center gap-2 leading-none ${className}`.trim()}>
      <EditIcon size={iconSize} />
      <span>{children}</span>
    </span>
  );
}
