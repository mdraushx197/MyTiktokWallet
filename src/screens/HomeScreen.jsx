import React from 'react';
import { useWallet } from '../context/WalletContext';
import { moneyFmt } from '../utils/formatters';
import Button from '../components/common/Button';
import RewardsCards from '../components/home/RewardsCards';
import BalanceDisplay from '../components/home/BalanceDisplay';
import TransactionList from '../components/home/TransactionList';
import { getThemeById } from '../data/themes';

export default function HomeScreen() {
  const {
    balance,
    coins,
    upcomingBalance,
    toolbox,
    transactions,
    lastDeduction,
    setLastDeduction,
    openExchange,
    setScreen
  } = useWallet();

  const currentTheme = getThemeById(toolbox.theme || 'glitter-shimmer');

  return (
    <div className="screen" style={{ background: currentTheme.pageBg }}>
      {/* Topbar: < opens Toolbox, LIVE rewards centered, X does nothing */}
      <header className="home-topbar" style={{ background: 'transparent' }}>
        <button
          type="button"
          className="icon"
          onClick={() => setScreen('toolbox')}
          title="Settings"
        >
          ‹
        </button>
        <h2 className="home-title">LIVE rewards</h2>
        <button
          type="button"
          className="icon home-close-btn"
          title="Close"
          onClick={() => { }}
        >
          ×
        </button>
      </header>

      {/* Modern TikTok LIVE Rewards Container Card */}
      <BalanceDisplay
        balance={balance}
        coins={coins}
        currency={toolbox.currency}
        themeId={toolbox.theme || 'glitter-shimmer'}
        lastDeduction={lastDeduction}
        onAnimationEnd={() => setLastDeduction(null)}
        onRecharge={openExchange}
      />

      <section className="actions">
        {/* User requirement: "keep the all recharge button red" */}
        <Button
          variant="primary"
          onClick={openExchange}
          style={{
            background: 'var(--red)',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(254, 44, 85, 0.35)',
            border: 'none'
          }}
        >
          {toolbox.walletMode === 'transfer' ? 'Transfer' : toolbox.walletMode === 'exchange' ? 'Exchange' : 'Recharge'}
        </Button>
        <Button variant="secondary" onClick={openExchange} style={{ marginTop: 8 }}>
          Withdraw
        </Button>
        <div className="limit-row">
          <span className="limit-label">Daily withdrawal limit (Remain/Total)</span>
          <span className="limit-value">
            {moneyFmt(1000, toolbox.currency)}/{moneyFmt(1000, toolbox.currency)}
          </span>
        </div>
      </section>

      <TransactionList
        transactions={transactions}
        currency={toolbox.currency}
        transferLabel={toolbox.transferLabel}
      />
    </div>
  );
}
