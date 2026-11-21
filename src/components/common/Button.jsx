import React from 'react';

/**
 * Reusable Button Component
 * Supports variants: 'primary' (TikTok red), 'secondary' (white outline), 'green' (success green)
 */
export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  style = {},
  className = '',
  type = 'button',
  title = '',
  ...props
}) {
  const variantClass = variant === 'secondary' ? 'secondary' : variant === 'green' ? 'green' : 'primary';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`.trim()}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{
        ...style,
        opacity: disabled ? (style.opacity || 0.45) : (style.opacity || 1),
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      {...props}
    >
      {children}
    </button>
  );
}
