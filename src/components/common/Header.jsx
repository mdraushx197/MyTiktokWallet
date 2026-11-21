import React from 'react';

/**
 * Top navigation header component
 */
export default function Header({
  title = '',
  onBack,
  rightContent,
  subtitle,
  className = ''
}) {
  return (
    <header className={`topbar ${className}`.trim()}>
      {onBack ? (
        <button className="icon" onClick={onBack} title="Back">‹</button>
      ) : (
        <div style={{ width: 36 }} />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>{title}</h2>
        {subtitle && <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{subtitle}</small>}
      </div>

      {rightContent ? (
        <div className="topbar-right">{rightContent}</div>
      ) : (
        <div style={{ width: 36 }} />
      )}
    </header>
  );
}
