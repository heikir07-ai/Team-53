import { useRef, useState } from 'react';
import { Angle, AuthMode, HookType, Tweet } from '../types';
import { ANGLE_OPTIONS, HOOK_OPTIONS, getMockTweets, getRewrittenTweets, getRewrittenSingle } from '../data/mock';
import LoadingOverlay from '../components/LoadingOverlay';
import TweetCard from '../components/TweetCard';
import PostConfirmModal from '../components/PostConfirmModal';
import SuccessModal from '../components/SuccessModal';

interface AppPageProps {
  authMode: AuthMode;
  onConnectX: () => void;
}

export default function AppPage({ authMode, onConnectX }: AppPageProps) {
  const [topic, setTopic] = useState('AI is replacing junior developers');
  const [angle, setAngle] = useState<Angle>('Spicy');
  const [hooks, setHooks] = useState<Set<HookType>>(new Set(['Start with controversy', 'Build to a punchline']));
  const [customHook, setCustomHook] = useState('');

  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [confirmTweet, setConfirmTweet] = useState<string | null>(null);
  const [postedTweet, setPostedTweet] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    setShowResults(false);
    setLoading(true);
  };

  const handleLoadingComplete = () => {
    const generated = getMockTweets(topic, angle);
    setTweets(generated);
    setLoading(false);
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleToggleHook = (hook: HookType) => {
    setHooks(prev => {
      const next = new Set(prev);
      next.has(hook) ? next.delete(hook) : next.add(hook);
      return next;
    });
  };

  const handleEditTweet = (id: string, text: string) => {
    setTweets(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  const handleRewriteOne = (index: number) => {
    const newText = getRewrittenSingle(topic, angle, index);
    setTweets(prev => prev.map((t, i) => i === index ? { ...t, text: newText } : t));
  };

  const handleRewriteAll = () => {
    setTweets(getRewrittenTweets(topic, angle));
  };

  const handlePost = (text: string) => {
    setConfirmTweet(text);
  };

  const handleConfirmPost = () => {
    const text = confirmTweet!;
    setConfirmTweet(null);
    setPostedTweet(text);
  };

  const handleWriteAnother = () => {
    setPostedTweet(null);
    setShowResults(false);
    setTweets([]);
    setTopic('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SF = { fontFamily: 'Instrument Sans, sans-serif' };

  return (
    <div className="page-fade-in" style={{ minHeight: '100vh' }}>
      {loading && (
        <LoadingOverlay
          topic={topic}
          angle={angle}
          onComplete={handleLoadingComplete}
        />
      )}

      {confirmTweet && (
        <PostConfirmModal
          tweetText={confirmTweet}
          onPost={handleConfirmPost}
          onClose={() => setConfirmTweet(null)}
        />
      )}

      {postedTweet && (
        <SuccessModal
          tweetText={postedTweet}
          onWriteAnother={handleWriteAnother}
        />
      )}

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Topic */}
        <div style={{ marginBottom: '28px' }}>
          <span className="label-upper" style={{ marginBottom: '10px' }}>
            What's your topic
          </span>
          <textarea
            className="input-field"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder={"The housing market is broken...\nAI is replacing junior devs...\nWhy nobody reads long-form anymore..."}
            rows={3}
            style={{ minHeight: '96px', maxHeight: '180px', borderRadius: '12px' }}
          />
        </div>

        {/* Angle */}
        <div style={{ marginBottom: '28px' }}>
          <span className="label-upper" style={{ marginBottom: '12px' }}>
            Choose your angle
          </span>
          <div
            className="angle-grid-mobile"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
            }}
          >
            {ANGLE_OPTIONS.map(opt => {
              const isSelected = angle === opt.id;
              const selClass = isSelected ? opt.selectedClass : '';
              return (
                <div key={opt.id} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setAngle(opt.id)}
                    className={`angle-btn ${selClass}`}
                    style={{ width: '100%', fontSize: '13px' }}
                    title={opt.tooltip}
                  >
                    {opt.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hook */}
        <div style={{ marginBottom: '32px' }}>
          <span className="label-upper" style={{ marginBottom: '6px' }}>
            Add a hook (optional)
          </span>
          <p
            style={{
              ...SF,
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '12px',
            }}
          >
            Guide the AI with a specific angle or opening style.
          </p>
          <div
            className="hook-grid-mobile"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            {HOOK_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleToggleHook(opt.id)}
                className={`hook-btn ${hooks.has(opt.id) ? 'selected' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="input-field"
            value={customHook}
            onChange={e => setCustomHook(e.target.value)}
            placeholder="or type your own hook idea..."
            style={{ height: '44px', borderRadius: '9999px', fontSize: '15px', padding: '0 20px' }}
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          className="btn-primary"
          style={{
            width: '100%',
            height: '52px',
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            marginBottom: '12px',
          }}
        >
          Research + Write My Tweets →
        </button>
        <p
          style={{
            ...SF,
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--muted)',
            textAlign: 'center',
          }}
        >
          Scans X trends · Writes 3 options · You pick and post or copy
        </p>

        {/* Results */}
        {showResults && tweets.length > 0 && (
          <div ref={resultsRef} style={{ marginTop: '48px' }}>
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '32px' }} />

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '24px',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2
                  style={{
                    ...SF,
                    fontWeight: 800,
                    fontSize: '24px',
                    color: 'var(--white)',
                    marginBottom: '10px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  3 Options Ready
                </h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="chip">{topic.slice(0, 40)}{topic.length > 40 ? '...' : ''}</span>
                  <span className="chip">
                    {ANGLE_OPTIONS.find(a => a.id === angle)?.label ?? angle}
                  </span>
                </div>
              </div>
              <button
                onClick={handleRewriteAll}
                style={{
                  ...SF,
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 150ms ease',
                  flexShrink: 0,
                  paddingTop: '4px',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                ↺ Write new ones
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {tweets.map((tweet, i) => (
                <TweetCard
                  key={tweet.id}
                  tweet={tweet}
                  index={i}
                  authMode={authMode}
                  onEdit={handleEditTweet}
                  onRewrite={handleRewriteOne}
                  onPost={handlePost}
                  onConnectX={onConnectX}
                />
              ))}
            </div>

            <button
              onClick={handleRewriteAll}
              className="btn-outline"
              style={{
                width: '100%',
                height: '44px',
                marginTop: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--muted)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)';
              }}
            >
              ↺ Rewrite all 3 tweets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
