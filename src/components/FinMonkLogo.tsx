/**
 * FinMonk brand logo — uses the actual logo image.
 */
import logoSrc from './finMonk logo.png';

interface FinMonkLogoProps {
  size?: number;
  className?: string;
}

export default function FinMonkLogo({ size = 40, className = '' }: FinMonkLogoProps) {
  return (
    <img
      src={logoSrc}
      alt="FinMonk logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
