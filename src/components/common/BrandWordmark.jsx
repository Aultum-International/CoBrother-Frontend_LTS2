import brandWordmark from '../../assets/Cobrother_logo.png';

export default function BrandWordmark({ className = 'h-5 w-auto', alt = 'CoBrother', inline = false }) {
  return (
    <img
      src={brandWordmark}
      alt={alt}
      className={`${inline ? 'inline-block align-middle' : 'block'} ${className}`}
    />
  );
}
