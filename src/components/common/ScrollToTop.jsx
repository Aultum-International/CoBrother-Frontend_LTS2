import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on route change (window + AppLayout scroll container).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const layoutScroll = document.querySelector('[data-app-layout-scroll]');
    if (layoutScroll) {
      layoutScroll.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
