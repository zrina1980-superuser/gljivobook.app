import React, { useId } from 'react';

interface ZrinaLogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Bio-Cyber Hybrid Vector Emblem (50% mycelium/forest + 50% digital technology):
 * - Palette: Deep dark forest (#040d09), chlorophyll emerald (#10b981), neon cyan (#00f5ff), spore gold (#f59e0b).
 * - Z-emblem: Organic mushroom cap arch at top, mycelium diagonal with spore bio-nodes, and hyphae roots branching into PCB traces at base.
 * - Outer rings: Tree rings & radar contours with spore nodes.
 * - Bottom wordmark: white "gljivobook" + emerald green ".app" (#10b981).
 */
export const ZrinaLogo: React.FC<ZrinaLogoProps> = ({
  className = 'w-11 h-11',
  showWordmark = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const forestGlowId = `forestGlow-${uid}`;
  const bioCyberGradId = `bioCyberGrad-${uid}`;
  const glowBioId = `glowBio-${uid}`;
  const glowSubtleId = `glowSubtle-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      className={`shrink-0 select-none ${className}`}
      aria-label="gljivobook.app by Zrina"
      role="img"
    >
      <defs>
        {/* Duboka tamna šumska podloga */}
        <radialGradient id={forestGlowId} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#082017" />
          <stop offset="60%" stopColor="#040d09" />
          <stop offset="100%" stopColor="#000201" />
        </radialGradient>

        {/* Bio-Cyber gradijent: Spore zlato -> Smaragd klorofil -> Neon cijan */}
        <linearGradient id={bioCyberGradId} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="30%" stopColor="#10b981" />
          <stop offset="70%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Neon & Spore sjaj */}
        <filter id={glowBioId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={glowSubtleId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pozadina ikone */}
      <rect width="512" height="512" rx="115" fill={`url(#${forestGlowId})`} />

      {/* Pozadinske hife micelija i terenske GPS koordinate */}
      <g fill="#10b981" opacity="0.16" fontFamily="monospace" fontSize="7.5">
        <text x="36" y="68">mycelium.network = active;</text>
        <text x="36" y="82">spore.density: 94.2%</text>
        <text x="335" y="68">45°54&apos;N 15°51&apos;E</text>
        <text x="335" y="82">alt: 460m // topo</text>
        <circle cx="115" cy="100" r="1.5" />
        <circle cx="395" cy="115" r="1.5" />
        <circle cx="410" cy="340" r="1.5" />
        <circle cx="90" cy="370" r="1.5" />
      </g>

      {/* Vanjski prsten: Spoj godova drveta i radarskih izohipsa */}
      <g filter={`url(#${glowSubtleId})`}>
        <circle
          cx="256"
          cy="225"
          r="185"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.8"
          opacity="0.45"
          strokeDasharray="24 10 70 8 40 14 90 10"
        />
        <circle
          cx="256"
          cy="225"
          r="198"
          fill="none"
          stroke="#00f5ff"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="8 16 35 12 60 18"
        />
        <circle
          cx="256"
          cy="225"
          r="172"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* Spore / GPS točke na obodu */}
        <circle cx="71" cy="225" r="3.5" fill="#10b981" opacity="0.7" />
        <circle cx="441" cy="225" r="3.5" fill="#00f5ff" opacity="0.7" />
        <circle cx="256" cy="40" r="3.5" fill="#f59e0b" opacity="0.8" />
      </g>

      {/* Organska silueta klobuka koja lebdi iznad amblema */}
      <g
        filter={`url(#${glowSubtleId})`}
        stroke="#10b981"
        strokeWidth="3"
        fill="none"
        opacity="0.75"
        strokeLinecap="round"
      >
        <path d="M 180 125 C 215 95, 297 95, 332 125" />
        <ellipse cx="256" cy="105" rx="3" ry="1.5" fill="#f59e0b" stroke="none" />
        <ellipse cx="225" cy="112" rx="2" ry="1" fill="#10b981" stroke="none" />
        <ellipse cx="287" cy="112" rx="2" ry="1" fill="#00f5ff" stroke="none" />
      </g>

      {/* Glavni Z amblem: Spoj organske strukture gljive i digitalnih vodova */}
      <g filter={`url(#${glowBioId})`}>
        {/* Masivna vanjska kontura Z s organskim lukom na vrhu */}
        <path
          d="M 175 145
             C 215 125, 297 125, 337 145
             L 337 165
             L 245 270
             L 337 270
             L 337 320
             L 175 320
             L 175 300
             L 267 190
             L 175 190 Z"
          fill="none"
          stroke={`url(#${bioCyberGradId})`}
          strokeWidth="13"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Unutrašnjost: Organske hife micelija koje se granaju u tiskane vodove */}
        {/* Gornji dio (lamele / cjevčice prelaze u vodove) */}
        <path
          d="M 210 160 C 240 152, 275 152, 305 160"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="312" cy="160" r="3" fill="#f59e0b" />
        <circle cx="203" cy="160" r="3" fill="#f59e0b" />

        {/* Dijagonala: Micelijska nit s čvorištima spora */}
        <path
          d="M 285 195 Q 265 225, 225 265"
          stroke="#10b981"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="285" cy="195" r="3.5" fill="#10b981" />
        <circle cx="255" cy="230" r="2.5" fill="#00f5ff" />
        <circle cx="225" cy="265" r="3.5" fill="#10b981" />

        {/* Baza: Korijenje / rizomorfi koji izbijaju iz stručka */}
        <path
          d="M 205 295 L 305 295"
          stroke="#00f5ff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="198" cy="295" r="3" fill="#00f5ff" />
        <circle cx="312" cy="295" r="3" fill="#00f5ff" />

        {/* Organski izbojci micelija na dnu */}
        <path
          d="M 220 325 C 215 340, 205 348, 195 352"
          stroke="#10b981"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="193" cy="353" r="2" fill="#10b981" />

        <path
          d="M 290 325 C 298 338, 310 345, 325 350"
          stroke="#00f5ff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="327" cy="351" r="2" fill="#00f5ff" />
      </g>

      {/* Oznake koda < / > stilizirane kao stilizirane spore / mikološke zagrade */}
      <g
        filter={`url(#${glowSubtleId})`}
        stroke="#10b981"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 145 200 L 126 218 L 145 236" />
        <path d="M 367 200 L 386 218 L 367 236" />
      </g>

      {/* Tipografija: gljivobook.app */}
      {showWordmark && (
        <g filter={`url(#${glowSubtleId})`}>
          <text
            x="256"
            y="442"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
            fontSize="44"
            fontWeight="900"
            letterSpacing="-0.5px"
            textAnchor="middle"
          >
            <tspan fill="#ffffff">gljivobook</tspan>
            <tspan fill="#10b981">.app</tspan>
          </text>
        </g>
      )}
    </svg>
  );
};
