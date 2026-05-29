import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_WIDTH = 160;
const MENU_HEIGHT = 190;

/**
 * Renders a share menu in a portal with fixed positioning so it is not clipped
 * by overflow parents or covered by the page footer.
 */
export default function ShareDropdownPortal({ open, anchorRef, onClose, children }) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !anchorRef?.current) return undefined;

    const updatePosition = () => {
      const rect = anchorRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < MENU_HEIGHT + 12 && rect.top > MENU_HEIGHT;
      const top = openUpward ? rect.top - MENU_HEIGHT - 8 : rect.bottom + 8;
      const left = Math.min(
        Math.max(8, rect.right - MENU_WIDTH),
        window.innerWidth - MENU_WIDTH - 8,
      );
      setCoords({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorRef]);

  if (!open) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[1090] cursor-default border-0 bg-transparent p-0"
        aria-label="Close share menu"
        onClick={onClose}
      />
      <div
        className="fixed z-[1100] min-w-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        style={{ top: coords.top, left: coords.left }}
        role="menu"
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
