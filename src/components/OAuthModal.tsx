import { useState } from 'react';

interface OAuthModalProps {
  onAuthorize: () => void;
  onClose: () => void;
}

export default function OAuthModal({ onAuthorize, onClose }: OAuthModalProps) {
  const [loading, setLoading] = useState(false);

  const handleAuthorize = () => {
    setLoading(true);
    setTimeout(() => {
      onAuthorize();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '24px',
      }}
    >
      <div
        className="modal-in"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '32px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--text)',
            marginBottom: '12px',
          }}
        >
          Connecting to X
        </h2>
        <p
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 400,
            fontSize: '15px',
            color: 'var(--muted)',
            lineHeight: 1.5,
            marginBottom: '24px',
          }}
        >
          Authorize TweetPilot to post on your behalf. You approve every tweet before it goes live.
        </p>

        <button
          onClick={handleAuthorize}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', height: '44px', fontSize: '14px' }}
        >
          {loading ? 'Connecting...' : 'Authorize →'}
        </button>

        {!loading && (
          <button
            onClick={onClose}
            style={{
              width: '100%',
              marginTop: '10px',
              height: '36px',
              background: 'none',
              border: 'none',
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--muted)',
              cursor: 'pointer',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
