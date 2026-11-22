import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { moneyFmt, coinFmt, cleanHandle } from '../utils/formatters';
import Coin, { TikTokCoinIcon } from '../components/common/Coin';
import Button from '../components/common/Button';
import CreatorLookup from '../components/exchange/CreatorLookup';
import ProfileCard from '../components/exchange/ProfileCard';
import CoinPacks from '../components/exchange/CoinPacks';
import CustomKeypadSheet from '../components/exchange/CustomKeypadSheet';
import ExchangeConfirmModal from '../components/exchange/ExchangeConfirmModal';
import { getThemeById } from '../data/themes';

export default function ExchangeScreen() {
  const {
    balance,
    coins,
    username,
    handleUsernameChange,
    clearUsername,
    selectedCoins,
    setSelectedCoins,
    selectPack,
    profile,
    profileLoading,
    profileError,
    showExchangeModal,
    setShowExchangeModal,
    toolbox,
    setScreen,
    executeExchange
  } = useWallet();

  const [isCustomSheetOpen, setIsCustomSheetOpen] = useState(false);

  const currentTheme = getThemeById(toolbox.theme || 'glitter-shimmer');
  const clean = cleanHandle(username, toolbox.autoAtRemove);
  const canExchange = Boolean(clean && selectedCoins > 0);
  const actionTitle = toolbox.walletMode === 'transfer' ? 'Transfer' : toolbox.walletMode === 'exchange' ? 'Exchange' : 'Recharge';

  const handleExchangeClick = () => {
    // If not ready, do nothing (no popup)
    if (!canExchange) return;
    setShowExchangeModal(true);
  };

  return (
    <div className="screen" style={{ background: currentTheme.pageBg }}>
      <header className="topbar" style={{ background: 'transparent' }}>
        <button
          type="button"
          className="icon"
          onClick={() => setScreen('home')}
        >
          ‹
        </button>
        <h2>{actionTitle}</h2>
        <span
          className="icon icon-passive"
          aria-hidden="true"
          onClick={(e) => e.preventDefault()}
        >
          ?
        </span>
      </header>

      <div className="exchange">
        <div className="big" id="exchangeBalance">
          {moneyFmt(balance, toolbox.currency)}
        </div>
        <div className="conversion" id="exchangeCoins">
          = {moneyFmt(balance, toolbox.currency)} ( <TikTokCoinIcon size={16} /> {coinFmt(coins)} )
        </div>
        <div className="label" style={{ marginTop: 24 }}>
          Available balance to exchange for Coins
        </div>

        <CreatorLookup
          username={username}
          onChange={handleUsernameChange}
          onClear={clearUsername}
        />

        <div id="profileContainer">
          <ProfileCard
            profile={profile}
            loading={profileLoading}
            error={profileError}
            username={clean}
            followerTextSize={toolbox.followerTextSize}
            searchLoadingStyle={toolbox.searchLoading.style}
          />
        </div>

        <CoinPacks
          selected={selectedCoins}
          onSelectPack={selectPack}
          onOpenCustom={() => setIsCustomSheetOpen(true)}
          currency={toolbox.currency}
          accentColor={currentTheme.accentColor}
        />
      </div>

      <div className="sticky">
        {/* User requirement: "keep the all recharge button red" */}
        <Button
          id="exchangeSubmitBtn"
          variant="primary"
          disabled={!canExchange}
          onClick={handleExchangeClick}
          style={canExchange ? {
            background: 'var(--red)',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(254, 44, 85, 0.35)',
            border: 'none'
          } : {}}
        >
          {actionTitle}
        </Button>
      </div>

      <CustomKeypadSheet
        isOpen={isCustomSheetOpen}
        initialCoins={selectedCoins}
        maxCoins={coins}
        currency={toolbox.currency}
        onClose={() => setIsCustomSheetOpen(false)}
        onDone={(val) => setSelectedCoins(val)}
      />

      <ExchangeConfirmModal
        isOpen={showExchangeModal}
        username={clean}
        selectedCoins={selectedCoins}
        currency={toolbox.currency}
        confirmTitle={toolbox.confirmWithdrawalTitle}
        actionTitle={actionTitle}
        onClose={() => setShowExchangeModal(false)}
        onConfirm={executeExchange}
      />
    </div>
  );
}
