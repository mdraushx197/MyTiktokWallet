import React from 'react';
import { useWallet } from '../context/WalletContext';
import { moneyFmt } from '../utils/formatters';
import Button from '../components/common/Button';
import RewardsCards from '../components/home/RewardsCards';
import BalanceDisplay from '../components/home/BalanceDisplay';
import TransactionList from '../components/home/TransactionList';

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

  return (
    <div className="screen">
      {/* Topbar: < opens Toolbox, LIVE rewards centered, X does nothing */}
      <header className="home-topbar">
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
        <Button variant="primary" onClick={openExchange}>
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
