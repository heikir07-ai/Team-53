import { useRef, useState, useEffect } from 'react';
import { AuthMode, Tweet } from '../types';

interface TweetCardProps {
  tweet: Tweet;
  index: number;
  authMode: AuthMode;
  onEdit: (id: string, text: string) => void;
  onRewrite: (index: number) => void;
  onPost: (text: string) => void;
  onConnectX: () => void;
}

export default function TweetCard({
  tweet,
  index,
  authMode,
  onEdit,
  onRewrite,
  onPost,
  onConnectX,
}: TweetCardProps) {
  const editRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [rewriting, setRewriting] = useState(false);

  const charCount = tweet.text.length;
  const isOver = charCount > 280;
  const isWarning = charCount >= 240 && !isOver;
  const pct = Math.min((charCount / 280) * 100, 100);
  const barColor = isOver ? 'var(--danger)' : isWarning ? 'var(--amber)' : 'var(--accent)';
  const charColor = isOver ? 'var(--danger)' : isWarning ? 'var(--amber)' : 'var(--muted)';

  useEffect(() => {
    if (editRef.current && editRef.current.textContent !== tweet.text) {
      editRef.current.textContent = tweet.text;
    }
  }, [tweet.text]);

  const handleInput = () => {
    if (editRef.current) {
      onEdit(tweet.id, editRef.current.textContent || '');
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tweet.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRewrite = () => {
    setRewriting(true);
    setTimeout(() => {
      onRewrite(index);
      setRewriting(false);
    }, 150);
  };

  const handleFocusEdit = () => {
    editRef.current?.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    if (editRef.current?.firstChild) {
      range.setStartAfter(editRef.current.lastChild!);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  return (
    <div
      className="tweet-card results-appear"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <span className="label-upper">Option {index + 1}</span>
        <span
          style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: '11px',
            color: charColor,
          }}
        >
          {charCount}/280{isOver && ' — Over limit'}
        </span>
      </div>

      <div
        ref={editRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder="Write your tweet..."
        style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '17px',
          fontWeight: 400,
          color: rewriting ? 'var(--muted)' : 'var(--text)',
          lineHeight: 1.5,
          minHeight: '60px',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          transition: 'color 150ms ease, opacity 150ms ease',
          opacity: rewriting ? 0.4 : 1,
        }}
      />

      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="char-bar" style={{ flex: 1 }}>
          <div
            className="char-bar-fill"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          borderTop: '1px solid var(--border)',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleFocusEdit}
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 150ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ✏ Edit
          </button>
          <button
            onClick={handleRewrite}
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 150ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ↺ Rewrite
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {authMode === 'connected' ? (
            <button
              onClick={() => onPost(tweet.text)}
              className="btn-primary"
              style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
            >
              Post this tweet →
            </button>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className="btn-accent-outline"
                style={{
                  height: '36px',
                  padding: '0 14px',
                  fontSize: '12px',
                  minWidth: '100px',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy tweet'}
              </button>
              <button
                onClick={onConnectX}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: 'var(--muted)',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'background 150ms ease, color 150ms ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(231,233,234,0.07)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                Connect X to post
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
