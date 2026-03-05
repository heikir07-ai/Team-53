interface SuccessModalProps {
  tweetText: string;
  onWriteAnother: () => void;
}

export default function SuccessModal({ tweetText, onWriteAnother }: SuccessModalProps) {
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
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '12px',
            color: 'var(--success)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '8px' }}>●</span>
          POSTED
        </div>

        <h2
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 800,
            fontSize: '32px',
            color: 'var(--white)',
            marginBottom: '20px',
          }}
        >
          It's live.
        </h2>

        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#2A2A2E',
                flexShrink: 0,
              }}
            />
            <div>
              <span
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--text)',
                  display: 'block',
                }}
              >
                TweetPilot Demo
              </span>
              <span
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '12px',
                  color: 'var(--muted)',
                  display: 'block',
                }}
              >
                @tweetpilot_demo · just now
              </span>
            </div>
          </div>
          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 400,
              fontSize: '17px',
              color: 'var(--text)',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              marginBottom: '14px',
            }}
          >
            {tweetText}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              borderTop: '1px solid var(--border)',
              paddingTop: '12px',
            }}
          >
            {['💬', '🔁', '♡'].map((icon, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '13px',
                  color: 'var(--muted)',
                }}
              >
                {icon} 0
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent-outline"
            style={{ height: '44px', width: '100%', justifyContent: 'center' }}
          >
            View on X →
          </a>
          <button
            onClick={onWriteAnother}
            className="btn-primary"
            style={{ height: '44px', width: '100%' }}
          >
            Write another →
          </button>
        </div>

        <p
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '11px',
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          No auto-post. No surprises. Every tweet needs your approval.
        </p>
      </div>
    </div>
  );
}
