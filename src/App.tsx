import { useState } from 'react';
import { AppScreen, AuthMode } from './types';
import Navbar from './components/Navbar';
import LandingPage from './screens/LandingPage';
import AppPage from './screens/AppPage';
import OAuthModal from './components/OAuthModal';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [showOAuth, setShowOAuth] = useState(false);

  const handleConnectX = () => {
    setShowOAuth(true);
  };

  const handleAuthorize = () => {
    setShowOAuth(false);
    setAuthMode('connected');
    setScreen('app');
  };

  const handleStartWriting = () => {
    setAuthMode('guest');
    setScreen('app');
  };

  const handleSignOut = () => {
    setAuthMode(null);
    setScreen('landing');
  };

  const handleNavGetStarted = () => {
    if (authMode === 'connected') {
      setScreen('app');
    } else {
      setAuthMode('guest');
      setScreen('app');
    }
  };

  const handleNavSignIn = () => {
    setShowOAuth(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="grain-overlay" />

      {showOAuth && (
        <OAuthModal
          onAuthorize={handleAuthorize}
          onClose={() => setShowOAuth(false)}
        />
      )}

      <Navbar
        authMode={authMode}
        onSignIn={handleNavSignIn}
        onGetStarted={handleNavGetStarted}
        onConnectX={handleConnectX}
        onSignOut={handleSignOut}
      />

      {screen === 'landing' && (
        <LandingPage
          onConnectX={handleConnectX}
          onStartWriting={handleStartWriting}
        />
      )}

      {screen === 'app' && authMode && (
        <AppPage
          authMode={authMode}
          onConnectX={handleConnectX}
        />
      )}
    </div>
  );
}
