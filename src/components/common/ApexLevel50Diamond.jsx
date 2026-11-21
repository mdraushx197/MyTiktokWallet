import React from 'react';

/**
 * High-definition 4K TikTok Level 50 Apex Gifter Diamond
 * Renders the exact faceted icosahedron gem with metallic gold struts & glowing core
 */
export default function ApexLevel50Diamond({ size = 20, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))',
        ...style
      }}
    >
      <defs>
        {/* Outer gold rim gradient */}
        <linearGradient id="goldRim" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="40%" stopColor="#FFAA00" />
          <stop offset="70%" stopColor="#D47800" />
          <stop offset="100%" stopColor="#FFD24D" />
        </linearGradient>

        {/* Center glowing amber triangle */}
        <linearGradient id="centerAmber" x1="50" y1="38" x2="50" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="45%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FF8F00" />
        </linearGradient>

        {/* Top facet: soft lilac */}
        <linearGradient id="facetTop" x1="50" y1="4" x2="50" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D0FE" />
          <stop offset="100%" stopColor="#E879F9" />
        </linearGradient>

        {/* Top Left facet: royal purple */}
        <linearGradient id="facetTopLeft" x1="8" y1="26" x2="31" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        {/* Top Right facet: light violet */}
        <linearGradient id="facetTopRight" x1="92" y1="26" x2="69" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Mid Left facet: deep amethyst */}
        <linearGradient id="facetMidLeft" x1="8" y1="26" x2="8" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>

        {/* Mid Right facet: magenta violet */}
        <linearGradient id="facetMidRight" x1="92" y1="26" x2="92" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#A21CAF" />
        </linearGradient>

        {/* Bottom Left facet: neon rose/fuchsia */}
        <linearGradient id="facetBottomLeft" x1="8" y1="74" x2="50" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>

        {/* Bottom Right facet: crimson magenta */}
        <linearGradient id="facetBottomRight" x1="92" y1="74" x2="50" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Bottom facet: deep imperial purple */}
        <linearGradient id="facetBottom" x1="50" y1="72" x2="50" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>

        {/* Inner glow filter */}
        <filter id="diamondGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFB800" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Main Hexagonal Gem Body */}
      <g filter="url(#diamondGlow)">
        {/* Facet 1: Top */}
        <polygon points="50,6 31,38 69,38" fill="url(#facetTop)" />

        {/* Facet 2: Top Left */}
        <polygon points="50,6 8,26 31,38" fill="url(#facetTopLeft)" />

        {/* Facet 3: Top Right */}
        <polygon points="50,6 92,26 69,38" fill="url(#facetTopRight)" />

        {/* Facet 4: Mid Left */}
        <polygon points="8,26 8,74 31,38" fill="url(#facetMidLeft)" />

        {/* Facet 5: Mid Right */}
        <polygon points="92,26 92,74 69,38" fill="url(#facetMidRight)" />

        {/* Facet 6: Center Inverted Triangle (Amber Gold Core) */}
        <polygon points="31,38 69,38 50,72" fill="url(#centerAmber)" />

        {/* Facet 7: Bottom Left */}
        <polygon points="8,74 31,38 50,72" fill="url(#facetBottomLeft)" />

        {/* Facet 8: Bottom Right */}
        <polygon points="92,74 69,38 50,72" fill="url(#facetBottomRight)" />

        {/* Facet 9: Bottom Bottom-Left */}
        <polygon points="8,74 50,72 50,94" fill="url(#facetBottomLeft)" />

        {/* Facet 10: Bottom Bottom-Right */}
        <polygon points="92,74 50,72 50,94" fill="url(#facetBottomRight)" />

        {/* Facet 11: Bottom Point */}
        <polygon points="31,73 50,94 69,73" fill="url(#facetBottom)" opacity="0.3" />
      </g>

      {/* Golden Metallic Struts (Wireframe Facet Edges) */}
      <g stroke="url(#goldRim)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* Outer Hexagon Rim */}
        <polygon points="50,6 92,26 92,74 50,94 8,74 8,26" fill="none" strokeWidth="4.5" />

        {/* Center Triangle Inverted */}
        <polygon points="31,38 69,38 50,72" fill="none" strokeWidth="3" />

        {/* Radial Struts */}
        <line x1="50" y1="6" x2="31" y2="38" />
        <line x1="50" y1="6" x2="69" y2="38" />
        <line x1="8" y1="26" x2="31" y2="38" />
        <line x1="92" y1="26" x2="69" y2="38" />
        <line x1="8" y1="74" x2="31" y2="38" />
        <line x1="92" y1="74" x2="69" y2="38" />
        <line x1="8" y1="74" x2="50" y2="72" />
        <line x1="92" y1="74" x2="50" y2="72" />
        <line x1="50" y1="72" x2="50" y2="94" />
      </g>

      {/* Subtle Specular Highlights */}
      <circle cx="50" cy="38" r="3" fill="#FFFFFF" opacity="0.75" />
      <polygon points="50,8 44,18 50,15" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}
