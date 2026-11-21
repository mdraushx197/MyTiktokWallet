import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Button from '../components/common/Button';
import { LUXURY_THEMES } from '../data/themes';

export default function ToolboxScreen() {
  const {
    balance,
    setBalance,
    upcomingBalance,
    setUpcomingBalance,
    toolbox,
    setToolbox,
    setScreen,
    previewLoadingAnimation,
    showTopNotification
  } = useWallet();

  const [localBalance, setLocalBalance] = useState(balance);
  const [localUpcoming, setLocalUpcoming] = useState(upcomingBalance);
  const [withdrawalName, setWithdrawalName] = useState(toolbox.confirmWithdrawalTitle);
  const [transferTitle, setTransferTitle] = useState(toolbox.transferDetailsTitle);
  const [transferLabel, setTransferLabel] = useState(toolbox.transferLabel);

  const updateSetting = (key, val) => {
    setToolbox(prev => ({ ...prev, [key]: val }));
  };

  const handleBalanceChange = (e) => {
    const val = e.target.value;
    setLocalBalance(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) setBalance(num);
  };

  const handleUpcomingChange = (e) => {
    const val = e.target.value;
    setLocalUpcoming(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) setUpcomingBalance(num);
  };

  const handleWithdrawalNameChange = (e) => {
    const val = e.target.value;
    setWithdrawalName(val);
    updateSetting('confirmWithdrawalTitle', val);
  };

  const handleTransferTitleChange = (e) => {
    const val = e.target.value;
    setTransferTitle(val);
    updateSetting('transferDetailsTitle', val);
  };

  const handleTransferLabelChange = (e) => {
    const val = e.target.value;
    setTransferLabel(val);
    updateSetting('transferLabel', val);
  };

  const handleSave = () => {
    const numBal = parseFloat(localBalance);
    if (!isNaN(numBal) && numBal >= 0) setBalance(numBal);

    const numUp = parseFloat(localUpcoming);
    if (!isNaN(numUp) && numUp >= 0) setUpcomingBalance(numUp);

    setToolbox(prev => ({
      ...prev,
      confirmWithdrawalTitle: withdrawalName,
      transferDetailsTitle: transferTitle,
      transferLabel: transferLabel
    }));

    showTopNotification('Toolbox settings saved!');
    setScreen('home');
  };

  const updatePayment = (key, val) => {
    setToolbox(prev => ({
      ...prev,
      paymentLoading: { ...prev.paymentLoading, [key]: val }
    }));
  };

  const updateSearch = (key, val) => {
    setToolbox(prev => ({
      ...prev,
      searchLoading: { ...prev.searchLoading, [key]: val }
    }));
  };

  return (
    <div className="screen toolbox-screen">
      <header className="topbar" style={{ background: '#fff' }}>
        <button
          type="button"
          className="icon"
          onClick={handleSave}
        >
          ‹
        </button>
        <h2 style={{ fontSize: 24, fontWeight: 800 }}>Toolbox</h2>
        <button
          type="button"
          className="icon"
          onClick={handleSave}
          title="Exit"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      <div className="toolbox-body">
        {/* Available rewards */}
        <div className="toolbox-card">
          <label className="toolbox-label">Available rewards</label>
          <input
            type="number"
            step="any"
            className="toolbox-input"
            value={localBalance}
            onChange={handleBalanceChange}
          />
        </div>

        {/* Upcoming rewards */}
        <div className="toolbox-card">
          <label className="toolbox-label">Upcoming rewards</label>
          <input
            type="number"
            step="any"
            className="toolbox-input"
            value={localUpcoming}
            onChange={handleUpcomingChange}
          />
        </div>

        {/* Wallet Mode */}
        <div className="toolbox-card">
          <div className="toolbox-label">Wallet Mode</div>
          <div className="toolbox-sub">Switch between transfer &amp; exchange panels</div>
          <div className="toolbox-btn-group">
            <button
              type="button"
              className={`tb-btn ${toolbox.walletMode === 'transfer' ? 'active' : ''}`}
              onClick={() => updateSetting('walletMode', 'transfer')}
            >
              Mode 1<br /><small>Transfer</small>
            </button>
            <button
              type="button"
              className={`tb-btn ${toolbox.walletMode === 'exchange' ? 'active' : ''}`}
              onClick={() => updateSetting('walletMode', 'exchange')}
            >
              Mode 2<br /><small>Exchange</small>
            </button>
            <button
              type="button"
              className={`tb-btn ${toolbox.walletMode === 'coins' ? 'active' : ''}`}
              onClick={() => updateSetting('walletMode', 'coins')}
            >
              Mode 3<br /><small>Coins</small>
            </button>
          </div>
        </div>

        {/* Mode 2 — Exchange Complete style */}
        <div className="toolbox-card">
          <div className="toolbox-label">Mode 2 — Exchange Complete style</div>
          <div className="toolbox-sub">Success screen shown after an exchange</div>
          <div className="toolbox-btn-group grid-2">
            <button
              type="button"
              className={`tb-btn ${toolbox.exchangeCompleteStyle === 'green' ? 'active' : ''}`}
              onClick={() => updateSetting('exchangeCompleteStyle', 'green')}
            >
              Green (details)
            </button>
            <button
              type="button"
              className={`tb-btn ${toolbox.exchangeCompleteStyle === 'red' ? 'active' : ''}`}
              onClick={() => updateSetting('exchangeCompleteStyle', 'red')}
            >
              Red (classic)
            </button>
          </div>
        </div>

        {/* Auto @ remove & Random profile for unknown ID */}
        <div className="toolbox-card">
          <div className="toolbox-toggle-row">
            <div>
              <div className="toolbox-label">Auto @ remove</div>
              <div className="toolbox-sub" style={{ marginBottom: 0 }}>
                Automatically remove @ from username input
              </div>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={toolbox.autoAtRemove}
                onChange={(e) => updateSetting('autoAtRemove', e.target.checked)}
              />
              <span className="ios-slider" />
            </label>
          </div>
          <div className="toolbox-divider" />
          <div className="toolbox-toggle-row">
            <div>
              <div className="toolbox-label">Random profile for unknown ID</div>
              <div className="toolbox-sub" style={{ marginBottom: 0 }}>
                When TikTok has no account for the ID, show a random picture and name instead of an error
              </div>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={toolbox.randomProfileForUnknown}
                onChange={(e) => updateSetting('randomProfileForUnknown', e.target.checked)}
              />
              <span className="ios-slider" />
            </label>
          </div>
        </div>

        {/* Titles and labels */}
        <div className="toolbox-card">
          <div className="toolbox-field-group">
            <label className="toolbox-label">Confirm withdrawal details name</label>
            <div className="toolbox-sub">Rename the withdrawal title shown on all pages</div>
            <input
              type="text"
              className="toolbox-input"
              value={withdrawalName}
              onChange={handleWithdrawalNameChange}
            />
          </div>
          <div className="toolbox-field-group">
            <label className="toolbox-label">Transfer details title</label>
            <div className="toolbox-sub">Rename "Transfer details" shown on transaction page</div>
            <input
              type="text"
              className="toolbox-input"
              value={transferTitle}
              onChange={handleTransferTitleChange}
            />
          </div>
          <div className="toolbox-field-group">
            <label className="toolbox-label">Transfer label</label>
            <div className="toolbox-sub">Rename "LIVE rewards transfer to TikTok"</div>
            <input
              type="text"
              className="toolbox-input"
              value={transferLabel}
              onChange={handleTransferLabelChange}
            />
          </div>
        </div>

        {/* ✨ Chat & Payment Theme Texture (Revolut Luxury Tiers) */}
        <div className="toolbox-card">
          <div className="toolbox-head-split">
            <div className="toolbox-label">✨ Chat &amp; Payment Theme Texture</div>
            <div className="toolbox-tier-badge">Revolut Luxury Tiers</div>
          </div>
          <div className="toolbox-sub">Select custom luxury gradient card &amp; payment texture</div>

          <div className="theme-grid-3x3">
            {LUXURY_THEMES.map((t) => {
              const isSelected = (toolbox.theme || 'glitter-shimmer') === t.id;
              return (
                <div
                  key={t.id}
                  className={`theme-card-item ${isSelected ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', t.id)}
                >
                  <div
                    className="theme-swatch-box"
                    style={{ background: t.gradient }}
                  >
                    {isSelected && (
                      <div className="theme-check-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="theme-card-name">{t.name}</div>
                  <div className="theme-card-sub">{t.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Currency */}
        <div className="toolbox-card">
          <div className="toolbox-label">Currency</div>
          <div className="toolbox-sub">Select display currency for amounts</div>
          <div className="toolbox-btn-group grid-5">
            {['USD', 'EUR', 'TRY', 'GBP', 'BRL'].map((cur) => {
              const syms = { USD: '$ USD', EUR: '€ EUR', TRY: '₺ TRY', GBP: '£ GBP', BRL: 'R$ BRL' };
              return (
                <button
                  key={cur}
                  type="button"
                  className={`tb-btn ${toolbox.currency === cur ? 'active' : ''}`}
                  onClick={() => updateSetting('currency', cur)}
                >
                  {syms[cur]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Follower text size */}
        <div className="toolbox-card">
          <div className="toolbox-label">Follower text size</div>
          <div className="toolbox-sub">Adjust follower count font size (1-6)</div>
          <div className="toolbox-btn-group grid-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                className={`tb-btn ${toolbox.followerTextSize === num ? 'active' : ''}`}
                onClick={() => updateSetting('followerTextSize', num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Loading */}
        <div className="toolbox-card">
          <div className="toolbox-toggle-row">
            <div>
              <div className="toolbox-label">Payment Loading</div>
              <div className="toolbox-sub" style={{ marginBottom: 0 }}>Animation after confirm</div>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={toolbox.paymentLoading.enabled}
                onChange={(e) => updatePayment('enabled', e.target.checked)}
              />
              <span className="ios-slider" />
            </label>
          </div>
          <div className="toolbox-btn-group grid-5" style={{ marginTop: 16 }}>
            {['Classic', 'Modern', 'Ring', 'Dots', 'Squares'].map((s) => (
              <button
                key={s}
                type="button"
                className={`tb-btn ${toolbox.paymentLoading.style.toLowerCase() === s.toLowerCase() ? 'active' : ''}`}
                onClick={() => updatePayment('style', s.toLowerCase())}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="toolbox-sub" style={{ marginTop: 14, marginBottom: 6 }}>Duration</div>
          <div className="toolbox-btn-group grid-5">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                type="button"
                className={`tb-btn ${toolbox.paymentLoading.duration === d ? 'active' : ''}`}
                onClick={() => updatePayment('duration', d)}
              >
                {d}s
              </button>
            ))}
          </div>
          <div
            className="tb-link"
            onClick={() => previewLoadingAnimation(toolbox.paymentLoading.style)}
          >
            Preview animation
          </div>
        </div>

        {/* Search Loading */}
        <div className="toolbox-card">
          <div className="toolbox-toggle-row">
            <div>
              <div className="toolbox-label">Search Loading</div>
              <div className="toolbox-sub" style={{ marginBottom: 0 }}>Animation when loading search results</div>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={toolbox.searchLoading.enabled}
                onChange={(e) => updateSearch('enabled', e.target.checked)}
              />
              <span className="ios-slider" />
            </label>
          </div>
          <div className="toolbox-btn-group grid-5" style={{ marginTop: 16 }}>
            {['Classic', 'Modern', 'Ring', 'Dots', 'Squares'].map((s) => (
              <button
                key={s}
                type="button"
                className={`tb-btn ${toolbox.searchLoading.style.toLowerCase() === s.toLowerCase() ? 'active' : ''}`}
                onClick={() => updateSearch('style', s.toLowerCase())}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="toolbox-sub" style={{ marginTop: 14, marginBottom: 6 }}>Duration</div>
          <div className="toolbox-btn-group grid-5">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                type="button"
                className={`tb-btn ${toolbox.searchLoading.duration === d ? 'active' : ''}`}
                onClick={() => updateSearch('duration', d)}
              >
                {d}s
              </button>
            ))}
          </div>
          <div
            className="tb-link"
            onClick={() => previewLoadingAnimation(toolbox.searchLoading.style)}
          >
            Preview animation
          </div>
        </div>

        {/* Push Notification Preview */}
        <div className="toolbox-card">
          <div className="toolbox-label">Push Notification</div>
          <div className="toolbox-sub">Preview the top "Successfully sent coins to recipient" banner</div>
          <button
            type="button"
            className="tb-btn"
            style={{ width: '100%', padding: 10, marginTop: 4 }}
            onClick={() => showTopNotification()}
          >
            Show Notification Banner
          </button>
        </div>

        {/* Save Button */}
        <div className="toolbox-save-wrap">
          <Button
            variant="primary"
            className="toolbox-save-btn"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
