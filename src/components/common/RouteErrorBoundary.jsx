import { Component } from 'react';

/**
 * Route-level error boundary for lazy-loaded pages.
 * Keeps the shell alive if a single route chunk fails.
 */
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('RouteErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
          <div className="text-4xl" aria-hidden>⚠️</div>
          <h1 className="font-display text-xl font-semibold text-gray-900 m-0">
            Something went wrong. Please refresh the page.
          </h1>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-glow btn-glow-sm"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
