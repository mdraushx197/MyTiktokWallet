import React from 'react';

/**
 * Authentic iPhone iOS 17/18 Notification Banner
 * Matches latest iPhone design with frosted glassmorphism, TikTok app icon,
 * uppercase app name, timestamp, bold notification title, and description body.
 */
export default function NotificationBanner({
  visible = false,
  title = 'LIVE rewards',
  message = 'Successfully sent coins to recipient',
  time = 'now',
  onClick
}) {
  return (
    <div
      className={`ios-notif-wrapper ${visible ? 'show' : ''}`}
      onClick={onClick}
      role="alert"
      aria-live="polite"
    >
      <div className="ios-notif-banner">
        {/* iOS Header: App Icon + TIKTOK title + now */}
        <div className="ios-notif-head">
          <div className="ios-notif-app">
            <div className="ios-app-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z" />
              </svg>
            </div>
            <span className="ios-app-name">TIKTOK</span>
          </div>
          <span className="ios-notif-time">{time || 'now'}</span>
        </div>

        {/* iOS Body: Title & Content */}
        <div className="ios-notif-body">
          <div className="ios-notif-title">{title}</div>
          <div className="ios-notif-desc">{message}</div>
        </div>
      </div>
    </div>
  );
}
