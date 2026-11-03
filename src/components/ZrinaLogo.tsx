import React from 'react';

interface ZrinaLogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Official gljivobook.app by Zrina Neon Logo (from attached PNG).
 * Used uniformly across the application header, modals, and PWA icons.
 */
export const ZrinaLogo: React.FC<ZrinaLogoProps> = ({
  className = 'w-11 h-11',
}) => {
  return (
    <img
      src="/zrina-neon-512.png?v=34"
      alt="gljivobook.app by Zrina"
      draggable={false}
      className={`shrink-0 select-none object-cover bg-[#01080c] ${className}`}
    />
  );
};
