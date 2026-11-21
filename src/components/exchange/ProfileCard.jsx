import React from 'react';
import { numFmt } from '../../utils/formatters';

export default function ProfileCard({
  profile,
  loading,
  error,
  username,
  followerTextSize = 2,
  searchLoadingStyle = 'classic'
}) {
  if (!username) return null;

  const map = { 1: '13px', 2: '16px', 3: '18px', 4: '20px', 5: '22px', 6: '24px' };
  const chipFontSize = map[followerTextSize] || '16px';

  if (loading) {
    const s = (searchLoadingStyle || 'classic').toLowerCase();
    return (
      <div className="profile-msg loading">
        {s === 'dots' && <div className="loader-dots"><span /><span /><span /></div>}
        {s === 'ring' && <div className="loader-ring" style={{ width: 24, height: 24, borderWidth: 3 }} />}
        {s === 'modern' && <div className="loader-modern" style={{ width: 24, height: 24 }} />}
        {s === 'squares' && <div className="loader-squares" style={{ width: 22, height: 22 }} />}
        {s !== 'dots' && s !== 'ring' && s !== 'modern' && s !== 'squares' && <div className="spinner" />}
        <div>Connecting to TikTok &amp; fetching profile for <strong>@{username}</strong>...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-msg notfound">
        <span style={{ fontSize: 24 }}>⚠️</span>
        <div>{error}</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="profile-card">
      <div className="profile-top">
        <div className="pavatar">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.nickname || profile.username}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.parentElement.innerHTML = '<span style="font-size:38px">👤</span>';
              }}
            />
          ) : (
            <span style={{ fontSize: 38 }}>👤</span>
          )}
        </div>
        <div className="pinfo">
          <div className="pname-row">
            <span className="pname" title={profile.nickname || profile.username}>
              {profile.nickname || profile.username}
            </span>
            {Boolean(profile.verified) && (
              <svg className="pbadge" viewBox="0 0 24 24" width="22" height="22" fill="#20d5ec" title="Verified Creator">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.9-5.9 1.4 1.4-7.3 7.3z" />
              </svg>
            )}
          </div>
          <div className="puser">@{profile.username}</div>
          <div className="stats-chips">
            <div className="stat-pill" style={{ fontSize: chipFontSize }}>
              👥 <strong>{numFmt(profile.followers)}</strong> Followers
            </div>
            <div className="stat-pill" style={{ fontSize: chipFontSize }}>
              ❤️ <strong>{numFmt(profile.likes)}</strong> Likes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
