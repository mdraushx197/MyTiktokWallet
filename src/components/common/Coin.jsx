import React from 'react';
import { coinFmt } from '../../utils/formatters';

/**
 * TikTok Coin SVG icon matching the gold coin badge from the recharge screen
 */
export function TikTokCoinIcon({ size = 18, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <circle cx="12" cy="12" r="11" fill="url(#ttCoinGrad)" />
      <circle cx="12" cy="12" r="9.5" stroke="#FFA700" strokeWidth="1" opacity="0.6" fill="none" />
      <path
        d="M15.4 7.6a3.6 3.6 0 0 1-2.1-.65v5.15a3.1 3.1 0 1 1-2.6-3.07v1.98a1.2 1.2 0 1 0 1.2 1.19V4.5h1.75a3.6 3.6 0 0 0 2.75 2.75v1.85z"
        fill="#FFFFFF"
      />
      <defs>
        <linearGradient id="ttCoinGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC83B" />
          <stop offset="1" stopColor="#FF9800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Reusable Coin Component
 * Displays TikTok coin icon and/or formatted coin count
 */
export default function Coin({
  amount,
  size = 18,
  showAmount = true,
  iconOnly = false,
  className = '',
  style = {}
}) {
  if (iconOnly) {
    return (
      <span
        className={`coin-icon ${className}`.trim()}
        role="img"
        aria-label="coin"
        style={{ fontSize: `${size}px`, display: 'inline-flex', alignItems: 'center', ...style }}
      >
        🪙
      </span>
    );
  }

  return (
    <span
      className={`coin-display ${className}`.trim()}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', ...style }}
    >
      <span className="coin" style={{ fontSize: `${size}px` }}>🪙</span>
      {showAmount && amount !== undefined && (
        <span className="coin-value">{coinFmt(amount)}</span>
      )}
    </span>
  );
}
