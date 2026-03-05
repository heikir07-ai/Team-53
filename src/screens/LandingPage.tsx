import { LANDING_ANGLE_PILLS } from '../data/mock';

interface LandingPageProps {
  onConnectX: () => void;
  onStartWriting: () => void;
}

export default function LandingPage({ onConnectX, onStartWriting }: LandingPageProps) {
  return (
    <div className="page-fade-in" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <div style={{ paddingTop: '80px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid var(--border-lit)',
              borderRadius: '9999px',
              padding: '6px 16px',
              marginBottom: '28px',
            }}
          >
            <span
              className="pulse-dot"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                color: 'var(--accent)',
                letterSpacing: '0.02em',
              }}
            >
              Scanning live trends
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 800,
              fontSize: '52px',
              lineHeight: 1.05,
              color: 'var(--white)',
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            Drop a topic.
            <br />
            <span style={{ color: 'var(--accent)' }}>Go viral.</span>
          </h1>

          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.4,
              maxWidth: '400px',
              margin: '0 auto 12px',
              letterSpacing: '-0.01em',
            }}
          >
            AI researches the web.
            <br />
            <span style={{ color: 'var(--white)', fontWeight: 700 }}>You take the credit.</span>
          </p>

          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              maxWidth: '360px',
              margin: '0 auto',
            }}
          >
            Pick your topic, choose your angle, and get&nbsp;3&nbsp;tweet options in seconds.
          </p>
        </div>

        {/* Two paths */}
        <div
          className="path-cards"
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          {/* Card A: Connect */}
          <div
            style={{
              flex: 1,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Recommended
            </span>
            <h3
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--white)',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              Full power
            </h3>
            <p
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Connect once. AI writes, you approve, we post. No copy-paste. Ever.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {[
                'One-click posting',
                'Thread history saved',
                'Faster workflow',
              ].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 700 }}>✓</span>
                  <span
                    style={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: 'var(--text)',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={onConnectX}
              className="btn-primary"
              style={{ width: '100%', height: '48px', fontSize: '15px', marginBottom: '10px' }}
            >
              Connect X Account
            </button>
            <p
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                color: 'var(--muted)',
                textAlign: 'center',
              }}
            >
              You approve every tweet before it posts.
            </p>
          </div>

          {/* Card B: Guest */}
          <div
            style={{
              flex: 1,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <div style={{ height: '27px', marginBottom: '12px' }} />
            <h3
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--white)',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              No signup needed
            </h3>
            <p
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Drop your topic, pick an angle, get tweet options. Copy and paste yourself.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {[
                { icon: '✓', text: 'Instant access', accent: true },
                { icon: '✓', text: 'No account required', accent: true },
                { icon: '○', text: 'Manual copy-paste posting', accent: false },
              ].map(({ icon, text, accent }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: accent ? 'var(--accent)' : 'var(--muted)', fontSize: '14px', fontWeight: 700 }}>{icon}</span>
                  <span
                    style={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: accent ? 'var(--text)' : 'var(--muted)',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={onStartWriting}
              className="btn-outline"
              style={{ width: '100%', height: '48px', fontSize: '15px' }}
            >
              Start Writing →
            </button>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: '80px' }}>
          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '36px',
            }}
          >
            How it works
          </p>

          <div
            className="steps-row"
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            {[
              {
                num: '1',
                title: 'Topic + Angle',
                desc: 'Tell us what you want to post about and how to frame it.',
              },
              {
                num: '2',
                title: 'AI Writes 3',
                desc: 'We scan trends and write 3 tweet options in your chosen angle.',
              },
              {
                num: '3',
                title: 'Post or Copy',
                desc: 'Pick your tweet. One-click post or copy to clipboard.',
              },
            ].map((step, i) => (
              <>
                <div
                  key={step.num}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '12px',
                    padding: '0 12px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(29, 155, 240, 0.12)',
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontWeight: 800,
                      fontSize: '15px',
                      color: 'var(--accent)',
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Instrument Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '15px',
                        color: 'var(--text)',
                        marginBottom: '6px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Instrument Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
                {i < 2 && (
                  <div
                    key={`connector-${i}`}
                    className="step-connector"
                    style={{
                      width: '1px',
                      height: '36px',
                      background: 'none',
                      borderLeft: '1px dashed var(--border)',
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                    }}
                  />
                )}
              </>
            ))}
          </div>
        </div>

        {/* Angle preview */}
        <div style={{ marginTop: '64px' }}>
          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            Available Angles
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {LANDING_ANGLE_PILLS.map((pill) => (
              <span key={pill} className="angle-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '72px',
            paddingBottom: '40px',
            borderTop: '1px solid var(--border)',
            paddingTop: '32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 800,
                fontSize: '15px',
                color: 'var(--white)',
                letterSpacing: '-0.02em',
              }}
            >
              TweetPilot
            </span>
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: 'var(--muted)',
              }}
            >
              · Built at Outskill Hackathon
            </span>
          </div>
          <p
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              color: 'var(--muted)',
            }}
          >
            We never post without your approval. No spam. No surprises.
          </p>
        </div>
      </div>
    </div>
  );
}
