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
  const hasUser = Boolean(clean && clean.length > 0);
  const actionTitle = toolbox.walletMode === 'transfer' ? 'Transfer' : toolbox.walletMode === 'exchange' ? 'Exchange' : 'Recharge';

  const handleExchangeClick = () => {
    if (!clean) {
      showTopNotification('Please enter a creator username first');
      return;
    }
    // Auto-default to 350 Coins if none selected yet
    if (!selectedCoins || selectedCoins <= 0) {
      setSelectedCoins(350);
    }
    setShowExchangeModal(true);
  };

  return (
    <div className="screen" style={{ background: currentTheme.pageBg }}>
      <header className="topbar" style={{ background: 'transparent', borderBottom: `1px solid ${currentTheme.dividerColor}` }}>
        <button
          type="button"
          className="icon"
          onClick={() => setScreen('home')}
          style={{ color: currentTheme.textColor }}
        >
          ‹
        </button>
        <h2 style={{ color: currentTheme.textColor }}>{actionTitle}</h2>
        <span
          className="icon icon-passive"
          aria-hidden="true"
          onClick={(e) => e.preventDefault()}
          style={{ color: currentTheme.textColor }}
        >
          ?
        </span>
      </header>

      <div className="exchange">
        <div className="big" id="exchangeBalance" style={{ color: currentTheme.textColor }}>
          {moneyFmt(balance, toolbox.currency)}
        </div>
        <div className="conversion" id="exchangeCoins" style={{ color: currentTheme.subTextColor }}>
          = {moneyFmt(balance, toolbox.currency)} ( <TikTokCoinIcon size={16} /> {coinFmt(coins)} )
        </div>
        <div className="label" style={{ marginTop: 24, color: currentTheme.subTextColor }}>
          Available balance to exchange for Coins
        </div>

        <CreatorLookup
          username={username}
          onChange={handleUsernameChange}
          onClear={clearUsername}
          onSubmitImmediate={handleExchangeClick}
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

      <div className="sticky" style={{ background: 'transparent' }}>
        {/* User requirement: "keep the all recharge button red" & active upon typing username */}
        <Button
          id="exchangeSubmitBtn"
          variant="primary"
          disabled={!hasUser}
          onClick={handleExchangeClick}
          style={{
            background: 'var(--red)',
            color: '#ffffff',
            boxShadow: hasUser ? '0 4px 16px rgba(254, 44, 85, 0.45)' : 'none',
            border: 'none',
            opacity: hasUser ? 1 : 0.45,
            cursor: hasUser ? 'pointer' : 'not-allowed'
          }}
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
