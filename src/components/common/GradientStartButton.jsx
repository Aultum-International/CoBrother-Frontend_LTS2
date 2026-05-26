import '../../styles/gradient-start-button.css';

const GRADIENT_LAYERS = [
  { delay: '0s', duration: '25s' },
  { delay: '0.15s', duration: '15.9s' },
  { delay: '0.53s', duration: '26.4s' },
  { delay: '0.45s', duration: '17.8s' },
  { delay: '1.6s', duration: '19.2s' },
  { delay: '1.6s', duration: '29.2s' },
  { delay: '1.6s', duration: '20.2s' },
];

export default function GradientStartButton({
  children = 'Start',
  onClick,
  className = '',
  variant = 'nav',
  type = 'button',
}) {
  const wrapperClass = [
    'gradient-start-btn-wrapper',
    variant === 'nav' ? 'gradient-start-btn-wrapper--nav' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <div className="gradient-start-btn-light" aria-hidden="true" />
      {GRADIENT_LAYERS.map((layer, index) => (
        <div
          key={index}
          className="gradient-start-btn-layer"
          style={{
            animationDelay: layer.delay,
            animationDuration: layer.duration,
          }}
          aria-hidden="true"
        />
      ))}
      <button type={type} className="gradient-start-btn" onClick={onClick}>
        {children}
      </button>
      <div className="gradient-start-btn-overlay" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
