import React from 'react';

export default function NotificationBanner({
  visible = false,
  title = 'TikTok LIVE Rewards',
  message = 'Successfully sent coins to recipient',
  time = 'now',
  onClick
}) {
  return (
    <div
      className={`top-notification ${visible ? 'show' : ''}`.trim()}
      onClick={onClick}
    >
      <div className="top-notif-card">
        <div className="top-notif-header">
          <span className="top-notif-title">{title}</span>
          <span className="top-notif-time">{time}</span>
        </div>
        <div className="top-notif-message">{message}</div>
      </div>
    </div>
  );
}
