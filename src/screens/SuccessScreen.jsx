import React from 'react';
import { useWallet } from '../context/WalletContext';
import { moneyFmt, coinFmt } from '../utils/formatters';
import Button from '../components/common/Button';
import { TikTokCoinIcon } from '../components/common/Coin';
import { getThemeById } from '../data/themes';

export default function SuccessScreen() {
  const { lastTx, toolbox, setScreen } = useWallet();
  const currentTheme = getThemeById(toolbox.theme || 'glitter-shimmer');

  if (!lastTx) {
    return (
      <div className="screen" style={{ padding: 24, textAlign: 'center', background: currentTheme.pageBg }}>
        <p>No exchange data found.</p>
        <Button
          variant="primary"
          onClick={() => setScreen('home')}
          style={{ background: 'var(--red)', color: '#ffffff', boxShadow: '0 4px 14px rgba(254, 44, 85, 0.35)' }}
        >
          Go to Home
        </Button>
      </div>
    );
  }

  const isRedTheme = toolbox.exchangeCompleteStyle === 'red';
  const modeTitle = toolbox.walletMode === 'transfer' ? 'Transfer' : toolbox.walletMode === 'exchange' ? 'Exchange' : 'Recharge';
  const verb = toolbox.walletMode === 'transfer' ? 'transferred' : toolbox.walletMode === 'exchange' ? 'exchanged' : 'recharged';

  return (
    <div className="success" style={{ background: currentTheme.pageBg }}>
      <div className={`check ${isRedTheme ? 'red-theme' : ''}`}>✓</div>
      <h1>{modeTitle} completed</h1>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        You {verb} for <TikTokCoinIcon size={20} /> {coinFmt(lastTx.coins)} Coins
      </h3>

      <div className="details">
        <div className="row">
          <span>Recipient</span>
          <span className="recipient-cell">
            {lastTx.avatar ? (
              <img
                src={lastTx.avatar}
                className="recipient-thumb"
                alt={lastTx.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            <span className="recipient-names">
              <strong>{lastTx.name}</strong>
              <small>@{lastTx.handle}</small>
            </span>
          </span>
        </div>
        <div className="row">
          <span>Coins {modeTitle === 'Transfer' ? 'Transferred' : modeTitle === 'Exchange' ? 'Exchanged' : 'Recharged'}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <TikTokCoinIcon size={16} /> {coinFmt(lastTx.coins)} Coins
          </span>
        </div>
        <div className="row">
          <span>Deducted Amount</span>
          <span>{moneyFmt(lastTx.amount, toolbox.currency)}</span>
        </div>
        <div className="row">
          <span>Time</span>
          <span>{lastTx.time}</span>
        </div>

        {/* Start gifter level */}
        <div className="gifter-card">
          <div className="tiktok-tile">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z" />
            </svg>
          </div>
          <div className="gifter-info">
            <h4>Start gifter level</h4>
            <p>
              Send your first Gift to begin your gifter journey and unlock more rewards as you level up.
            </p>
          </div>
        </div>
      </div>

      <Button
        variant={isRedTheme ? 'primary' : 'green'}
        onClick={() => setScreen('home')}
        style={isRedTheme ? {
          background: 'var(--red)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(254, 44, 85, 0.35)'
        } : {}}
      >
        Go back
      </Button>
    </div>
  );
}
