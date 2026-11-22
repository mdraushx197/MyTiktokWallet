import React from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import NotificationBanner from './components/common/NotificationBanner';
import LoadingOverlay from './components/common/LoadingOverlay';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import SuccessScreen from './screens/SuccessScreen';
import ToolboxScreen from './screens/ToolboxScreen';
import { getThemeById } from './data/themes';
import './index.css';

function MainRouter() {
  const { screen, notification, hideTopNotification, loadingOverlay, toolbox } = useWallet();
  const currentTheme = getThemeById(toolbox.theme || 'glitter-shimmer');

  return (
    <div
      className="app"
      style={{
        '--theme-accent': currentTheme.accentColor,
        '--theme-page-bg': currentTheme.pageBg,
        '--theme-card-grad': currentTheme.cardGradient,
        '--theme-card-shadow': currentTheme.cardShadow,
        background: currentTheme.pageBg,
        minHeight: '100vh',
        transition: 'background 0.4s ease'
      }}
    >
      <NotificationBanner
        visible={notification.visible}
        title={notification.title}
        message={notification.message}
        time={notification.time}
        onClick={hideTopNotification}
      />

      <LoadingOverlay
        visible={loadingOverlay.visible}
        text={loadingOverlay.text}
        style={loadingOverlay.style}
      />

      {screen === 'home' && <HomeScreen />}
      {screen === 'exchange' && <ExchangeScreen />}
      {screen === 'success' && <SuccessScreen />}
      {screen === 'toolbox' && <ToolboxScreen />}
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <MainRouter />
    </WalletProvider>
  );
}
