import React from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import NotificationBanner from './components/common/NotificationBanner';
import LoadingOverlay from './components/common/LoadingOverlay';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import SuccessScreen from './screens/SuccessScreen';
import ToolboxScreen from './screens/ToolboxScreen';
import './index.css';

function MainRouter() {
  const { screen, notification, hideTopNotification, loadingOverlay } = useWallet();

  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <MainRouter />
    </WalletProvider>
  );
}
