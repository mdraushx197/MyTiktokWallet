import React, { useEffect, useState, useRef } from 'react';
import { fmt, coinFmt } from '../../utils/formatters';
import { TikTokCoinIcon } from '../common/Coin';
import ApexLevel50Diamond from '../common/ApexLevel50Diamond';
import { getThemeById } from '../../data/themes';

export default function BalanceDisplay({
  balance,
  coins,
  currency = 'USD',
  themeId = 'glitter-shimmer',
  lastDeduction,
  onAnimationEnd,
  onRecharge
}) {
  const currentTheme = getThemeById(themeId);
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (lastDeduction) {
      const { startBalance, endBalance, startCoins, endCoins } = lastDeduction;
      const duration = 1200;
      const startTime = performance.now();
      setIsAnimating(true);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentBal = startBalance - (startBalance - endBalance) * ease;
        const currentCoins = Math.round(startCoins - (startCoins - endCoins) * ease);

        setDisplayBalance(currentBal);
        setDisplayCoins(currentCoins);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setDisplayBalance(endBalance);
          setDisplayCoins(endCoins);
          setTimeout(() => {
            setIsAnimating(false);
            if (onAnimationEnd) onAnimationEnd();
          }, 350);
        }
      };

      const delayTimer = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(step);
      }, 200);

      return () => {
        clearTimeout(delayTimer);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    } else {
      setDisplayBalance(balance);
      setDisplayCoins(coins);
    }
  }, [lastDeduction, balance, coins]);

  return (
    <div className="rewards-card-container">
      {/* Dark Main Card with Luxury Dynamic Gradient Theme */}
      <div
        className={`rewards-dark-card ${currentTheme.isGlitter ? 'has-glitter' : ''}`}
        style={{
          background: currentTheme.cardGradient,
          boxShadow: currentTheme.cardShadow || `0 10px 30px ${currentTheme.accentColor}33, 0 2px 10px rgba(0,0,0,0.3)`
        }}
      >
        {/* Subtle TikTok Watermark Logo Silhouette */}
        <svg className="rewards-watermark" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z" />
        </svg>

        {/* Profile & Level 50 Apex Section */}
        <div className="rewards-profile-section">
          <div className="rewards-profile-avatar-wrap">
            <img
              src="/assets/apex_profile.jpg"
              alt="Apex"
              className="rewards-profile-avatar"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/assets/avatar.jpg";
              }}
            />
          </div>
          <div className="rewards-profile-info">
            <div className="rewards-profile-name" style={{ color: currentTheme.textColor, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>Apex</div>
            <div className="rewards-level-badge" title="Apex Gifter Level 50">
              <ApexLevel50Diamond size={19} />
              <span className="rewards-level-badge-num">50</span>
            </div>
          </div>
        </div>

        {/* Card Header Label */}
        <div className="rewards-card-header" style={{ color: currentTheme.subTextColor, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>LIVE rewards</div>

        {/* Amount Row: Dynamic Currency + Number */}
        <div className="rewards-amount-row">
          <div className="rewards-amount-left">
            <span className="rewards-cur-badge" style={{ color: currentTheme.textColor, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>{currency || 'USD'}</span>
            <span
              className="rewards-big-num"
              id="homeBigBalance"
              style={{
                color: isAnimating ? '#fe2c55' : currentTheme.textColor,
                textShadow: '0 1px 3px rgba(0,0,0,0.45)',
                transition: isAnimating ? 'none' : 'color 0.4s ease'
              }}
            >
              {fmt(displayBalance)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="rewards-card-divider" style={{ background: currentTheme.dividerColor }} />

        {/* Spacious Coins Section */}
        <div className="rewards-coins-section" onClick={onRecharge}>
          <div className="rewards-coins-head">
            <span className="rewards-coins-label" style={{ color: currentTheme.subTextColor, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Coins</span>
            <span className="chevron" style={{ color: currentTheme.subTextColor }}>›</span>
          </div>
          <div className="rewards-coins-val">
            <TikTokCoinIcon size={24} />
            <span className="rewards-coins-count" style={{ color: currentTheme.textColor, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>
              {displayCoins ? coinFmt(displayCoins) : '0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
