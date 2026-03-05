import { useState } from 'react';

interface PostConfirmModalProps {
  tweetText: string;
  onPost: () => void;
  onClose: () => void;
}

export default function PostConfirmModal({ tweetText, onPost, onClose }: PostConfirmModalProps) {
  const [posting, setPosting] = useState(false);

  const handlePost = () => {
    setPosting(true);
    setTimeout(() => {
      onPost();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
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
          maxWidth: '480px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <span className="label-upper">Confirm Post</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
              transition: 'color 150ms ease',
              fontFamily: 'Geist Mono, monospace',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--success)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '8px' }}>●</span>
          Posting as @tweetpilot_demo
        </div>

        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '8px',
          }}
        >
          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 400,
              fontSize: '17px',
              color: 'var(--text)',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {tweetText}
          </p>
        </div>

        <p
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--muted)',
            marginBottom: '24px',
          }}
        >
          This will appear on your X feed immediately.
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePost}
            disabled={posting}
            className="btn-primary"
            style={{ flex: 1, height: '48px', fontSize: '15px', fontWeight: 700 }}
          >
            {posting ? 'Posting...' : 'Post Now'}
          </button>
          <button
            onClick={onClose}
            disabled={posting}
            className="btn-outline"
            style={{ flex: 1, height: '48px' }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
