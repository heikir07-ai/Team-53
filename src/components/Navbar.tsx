import { AuthMode } from '../types';

interface NavbarProps {
  authMode: AuthMode | null;
  onSignIn: () => void;
  onGetStarted: () => void;
  onConnectX: () => void;
  onSignOut: () => void;
}

export default function Navbar({
  authMode,
  onSignIn,
  onGetStarted,
  onConnectX,
  onSignOut,
}: NavbarProps) {
  return (
    <nav
      style={{
        width: '100%',
        height: '56px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 800,
            fontSize: '20px',
            color: 'var(--white)',
            letterSpacing: '-0.02em',
          }}
        >
          TweetPilot
        </span>
        <span
          style={{
            color: 'var(--accent)',
            fontSize: '9px',
            marginBottom: '10px',
          }}
        >
          ●
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {authMode === 'connected' ? (
          <>
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '8px' }}>●</span>
              @tweetpilot_demo
            </span>
            <button
              onClick={onSignOut}
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Sign out
            </button>
          </>
        ) : authMode === 'guest' ? (
          <>
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '8px' }}>○</span>
              Guest mode
            </span>
            <button
              onClick={onConnectX}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '14px' }}
            >
              Connect X
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSignIn}
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Sign in with X
            </button>
            <button
              onClick={onGetStarted}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '14px' }}
            >
              Get started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
