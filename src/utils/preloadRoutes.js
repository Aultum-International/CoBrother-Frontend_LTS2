/** Preload high-traffic authenticated routes after login (non-blocking). */
export function preloadAuthenticatedRoutes() {
  const preload = (loader) => {
    try {
      loader();
    } catch {
      // ignore preload failures
    }
  };

  preload(() => import(/* webpackChunkName: "dashboard" */ '../pages/DashboardPage'));
  preload(() => import(/* webpackChunkName: "domains" */ '../pages/DomainsPage'));
  preload(() => import(/* webpackChunkName: "ventures" */ '../pages/VenturesPage'));
  preload(() => import(/* webpackChunkName: "auctions" */ '../pages/AuctionsPage'));
}
