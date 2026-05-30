import coBrotherLogo from '../../assets/Cobrother_logo.png';

/**
 * SaaS-style route / auth loading shell — lightweight, no layout shift.
 */
export default function PageLoader({
  message = 'Preparing your workspace...',
  fullScreen = true,
}) {
  const wrapperClass = fullScreen
    ? 'page-loader page-loader--fullscreen'
    : 'page-loader page-loader--inline';

  return (
    <div className={wrapperClass} role="status" aria-live="polite" aria-busy="true">
      <div className="page-loader-inner">
        <img
          src={coBrotherLogo}
          alt=""
          className="page-loader-logo"
          aria-hidden
        />
        <div className="page-loader-spinner" aria-hidden>
          <span className="page-loader-spinner-track" />
          <span className="page-loader-spinner-head" />
        </div>
        <p className="page-loader-text">{message}</p>
      </div>
    </div>
  );
}
