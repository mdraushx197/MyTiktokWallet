import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cleanHandle, coinFmt, dollars, moneyFmt, rate } from '../utils/formatters';
import { mapTikTokProfile } from '../utils/tiktokProfile';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [screen, setScreen] = useState('home'); // 'home' | 'exchange' | 'success' | 'toolbox'
  const [balance, setBalance] = useState(9690899.43);
  const [coins, setCoins] = useState(798525002);
  const [upcomingBalance, setUpcomingBalance] = useState(2000000);

  // Exchange state
  const [username, setUsername] = useState('');
  const [selectedCoins, setSelectedCoins] = useState(0);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  // Animation flag for home balance countdown
  const [lastDeduction, setLastDeduction] = useState(null);

  // Global UI notification & overlay
  const [notification, setNotification] = useState({
    visible: false,
    title: 'TikTok LIVE Rewards',
    message: 'Successfully sent coins to recipient',
    time: 'now'
  });
  const notifTimerRef = useRef(null);

  const [loadingOverlay, setLoadingOverlay] = useState({
    visible: false,
    text: '',
    style: 'dots'
  });

  // Toolbox settings
  const [toolbox, setToolbox] = useState({
    walletMode: 'coins',
    exchangeCompleteStyle: 'green',
    transactionDetailsStyle: 'receipt',
    successButtonPosition: 'up',
    autoAtRemove: true,
    confirmWithdrawalTitle: 'Transfer details',
    transferDetailsTitle: 'Transfer details',
    transferLabel: 'LIVE rewards transfer to TikTok',
    currency: 'USD',
    followerTextSize: 2,
    theme: 'glitter-shimmer',
    paymentLoading: {
      enabled: true,
      style: 'dots',
      duration: 1
    },
    searchLoading: {
      enabled: true,
      style: 'classic',
      duration: 1
    }
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'tx_init',
      name: 'BTS',
      handle: 'bts_official_bighit',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      coins: 350,
      amount: 4.24,
      time: 'Nov 21, 2026, 8:43 PM'
    }
  ]);

  // Cache for creator profiles
  const profileCache = useRef(new Map());
  const debounceTimerRef = useRef(null);
  const abortCtrlRef = useRef(null);

  // Top notification trigger
  const showTopNotification = (msg, title = 'LIVE rewards') => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    setNotification({
      visible: true,
      title: title || 'LIVE rewards',
      message: msg || 'Successfully sent coins to recipient',
      time: 'now'
    });
    notifTimerRef.current = setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  const hideTopNotification = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    setNotification(prev => ({ ...prev, visible: false }));
  };

  // Preview loader
  const previewLoadingAnimation = (style) => {
    setLoadingOverlay({
      visible: true,
      text: 'Previewing animation...',
      style: style || 'dots'
    });
    setTimeout(() => {
      setLoadingOverlay(prev => ({ ...prev, visible: false }));
    }, 2000);
  };

  // Only successful provider responses are shown as real profile data.
  const fetchProfile = async (rawInput) => {
    const clean = cleanHandle(rawInput);
    if (!clean) return;
    abortCtrlRef.current?.abort();
    const controller = new AbortController();
    abortCtrlRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(`/api/tiktok/profile/${encodeURIComponent(clean)}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Profile service is unavailable. Please try again.');
      const mapped = mapTikTokProfile(await res.json());
      if (controller !== abortCtrlRef.current || controller.signal.aborted) return;
      profileCache.current.set(clean.toLowerCase(), { profile: mapped, expires: Date.now() + 60000 });
      setProfile(mapped);
      setProfileError(null);
    } catch (err) {
      if (controller !== abortCtrlRef.current) return;
      setProfile(null);
      setProfileError(err.name === 'AbortError'
        ? 'Profile lookup timed out. Please try again.'
        : err.message);
    } finally {
      clearTimeout(timeout);
      if (controller === abortCtrlRef.current) setProfileLoading(false);
    }
  };

  useEffect(() => () => {
    clearTimeout(debounceTimerRef.current);
    abortCtrlRef.current?.abort();
    abortCtrlRef.current = null;
  }, []);

  const handleUsernameChange = (val) => {
    let processed = val;
    if (toolbox.autoAtRemove && processed.startsWith('@')) {
      processed = processed.replace(/^@+/, '');
    }
    setUsername(processed);
    const clean = cleanHandle(processed, toolbox.autoAtRemove);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (abortCtrlRef.current) {
      abortCtrlRef.current.abort();
      abortCtrlRef.current = null;
    }

    if (!clean) {
      setProfile(null);
      setProfileLoading(false);
      setProfileError(null);
      return;
    }

    const cacheKey = clean.toLowerCase();
    if (profileCache.current.get(cacheKey)?.expires > Date.now()) {
      const cached = profileCache.current.get(cacheKey);
      setProfile(cached.profile);
      setProfileError(null);
      setProfileLoading(false);
      return;
    }

    setProfile(null);
    setProfileLoading(true);
    setProfileError(null);

    const delay = toolbox.searchLoading.enabled
      ? Math.min(toolbox.searchLoading.duration * 400, 1000)
      : 400;

    debounceTimerRef.current = setTimeout(() => {
      fetchProfile(clean);
    }, delay);
  };

  const clearUsername = () => {
    setUsername('');
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (abortCtrlRef.current) abortCtrlRef.current.abort();
    abortCtrlRef.current = null;
  };

  const selectPack = (amount) => {
    setSelectedCoins(prev => (prev === amount ? 0 : amount));
  };

  // Execute exchange
  const executeExchange = () => {
    if (!profile || profileLoading || profileError) {
      showTopNotification('Look up a valid creator profile before confirming.');
      return;
    }
    setShowExchangeModal(false);
    const clean = cleanHandle(username, toolbox.autoAtRemove);
    const amount = dollars(selectedCoins);
    const startBalance = balance;
    const endBalance = startBalance - amount;
    const startCoins = coins;
    const endCoins = startCoins - selectedCoins;

    setLastDeduction({ startBalance, endBalance, startCoins, endCoins, amount });

    const recipient = profile;
    const now = new Date();
    const tx = {
      id: 'tx_' + Date.now(),
      name: recipient.nickname || clean,
      handle: recipient.username,
      avatar: recipient.avatar || '',
      coins: selectedCoins,
      amount,
      time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
        ', ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setLastTx(tx);
    setTransactions(prev => [tx, ...prev]);

    const notifMsg = `Successfully sent ${coinFmt(selectedCoins)} Coins to @${recipient.username || clean}`;

    if (toolbox.paymentLoading.enabled) {
      setLoadingOverlay({
        visible: true,
        text: 'Processing exchange...',
        style: toolbox.paymentLoading.style
      });
      setTimeout(() => {
        setLoadingOverlay(prev => ({ ...prev, visible: false }));
        setScreen('success');
        showTopNotification(notifMsg, 'LIVE rewards');
      }, toolbox.paymentLoading.duration * 1000);
    } else {
      setScreen('success');
      showTopNotification(notifMsg, 'LIVE rewards');
    }
  };

  const openExchange = () => {
    clearTimeout(debounceTimerRef.current);
    abortCtrlRef.current?.abort();
    abortCtrlRef.current = null;
    setUsername('');
    setSelectedCoins(350); // Pre-select popular 350 coins ($3.95)
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    setShowExchangeModal(false);
    setScreen('exchange');
  };

  return (
    <WalletContext.Provider
      value={{
        screen,
        setScreen,
        balance,
        setBalance,
        coins,
        setCoins,
        upcomingBalance,
        setUpcomingBalance,
        username,
        setUsername,
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
        lastTx,
        lastDeduction,
        setLastDeduction,
        notification,
        showTopNotification,
        hideTopNotification,
        loadingOverlay,
        previewLoadingAnimation,
        toolbox,
        setToolbox,
        transactions,
        openExchange,
        executeExchange
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
