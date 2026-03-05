import { useEffect, useRef, useState } from 'react';
import { Angle } from '../types';

interface LoadingOverlayProps {
  topic: string;
  angle: Angle;
  onComplete: () => void;
}

const STEPS = [
  { label: 'scanning trending topics...', delay: 0 },
  { label: `matching your subject...`, delay: 700 },
  { label: `applying angle:`, delay: 1400 },
  { label: 'writing tweet variants...', delay: 1900 },
  { label: 'almost ready...', delay: 2600 },
];

const BAR_WIDTHS = ['100%', '100%', '100%', '55%', '100%'];

export default function LoadingOverlay({ topic, angle, onComplete }: LoadingOverlayProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [scanPos, setScanPos] = useState(0);
  const scanRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const SCAN_DURATION = 1800;
  const TOTAL_DURATION = 3000;

  useEffect(() => {
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, i]);
      }, step.delay);
    });

    setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);
  }, [onComplete]);

  useEffect(() => {
    startTimeRef.current = performance.now();
    let pass = 0;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const passDuration = SCAN_DURATION;
      const passElapsed = elapsed - pass * passDuration;
      const pct = Math.min(passElapsed / passDuration, 1);
      setScanPos(pct * 180);

      if (pct >= 1) {
        pass++;
        startTimeRef.current = now - (pass * passDuration);
        if (pass >= 2) return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const angleEmoji = angle === 'Spicy' ? '🔥' : angle === 'Funny' ? '😂' : angle === 'Direct' ? '🎯' : angle === 'Analytical' ? '📊' : angle === 'Left Take' ? '🔴' : angle === 'Conservative' ? '🔵' : angle === 'Woke' ? '💡' : '🤝';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12,12,12,0.97)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <span className="chip">{topic.slice(0, 40) || 'AI replacing devs'}</span>
          <span className="chip">{angleEmoji} {angle}</span>
        </div>

        <div
          ref={containerRef}
          className="scan-grid"
          style={{
            width: '100%',
            height: '180px',
            background: 'var(--surface)',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '28px',
          }}
        >
          <div
            ref={scanRef}
            className="scan-line-el"
            style={{
              top: `${scanPos}px`,
              opacity: scanPos >= 178 ? 0 : 0.8,
              transition: 'opacity 150ms ease',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {STEPS.map((step, i) => {
            const visible = visibleSteps.includes(i);
            const isDone = visibleSteps.includes(i + 1) || (i === STEPS.length - 1 && visibleSteps.includes(i));
            const isLast = i === STEPS.length - 1;

            return (
              <div
                key={i}
                className={visible ? 'fade-in-line' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: visible ? 1 : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    minWidth: '24px',
                  }}
                >
                  &gt;
                </span>
                <span
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    flex: 1,
                  }}
                >
                  {step.label}{i === 2 ? ` ${angleEmoji} ${angle}` : ''}
                </span>
                <div
                  style={{
                    width: '80px',
                    height: '8px',
                    background: 'var(--border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: isLast && !isDone ? 'var(--accent)' : 'var(--accent)',
                      width: visible ? (isLast && !isDone ? '55%' : BAR_WIDTHS[i]) : '0%',
                      transition: 'width 500ms ease',
                      borderRadius: '2px',
                      opacity: isDone || !isLast ? 1 : 0.6,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: '11px',
                    color: isDone ? 'var(--success)' : 'var(--muted)',
                    minWidth: '32px',
                    textAlign: 'right',
                  }}
                >
                  {isDone ? 'done' : visible ? '...' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
