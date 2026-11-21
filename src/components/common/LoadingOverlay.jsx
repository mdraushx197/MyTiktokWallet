import React from 'react';

export default function LoadingOverlay({
  visible = false,
  text = 'Processing...',
  style = 'dots'
}) {
  if (!visible) return null;

  const s = (style || 'dots').toLowerCase();

  return (
    <div className="loader-overlay" id="tempLoaderOverlay">
      <div className="loader-card">
        {s === 'classic' && <div className="loader-classic" />}
        {s === 'modern' && <div className="loader-modern" />}
        {s === 'ring' && <div className="loader-ring" />}
        {s === 'squares' && <div className="loader-squares" />}
        {s !== 'classic' && s !== 'modern' && s !== 'ring' && s !== 'squares' && (
          <div className="loader-dots">
            <span />
            <span />
            <span />
          </div>
        )}
        <div className="loader-text">{text}</div>
      </div>
    </div>
  );
}
