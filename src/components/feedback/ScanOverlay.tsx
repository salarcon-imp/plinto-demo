import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { LOOP_EASE, MOTION_DURATION_LG } from '../../animations/presets/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type ScanOverlayProps = {
  title?: string;
  statusText?: string;
  hint?: string;
  className?: string;
};

export function ScanOverlay({
  title = 'Scan Piece',
  statusText = 'Scanning for registered identity',
  hint = 'Hold still please',
  className = '',
}: ScanOverlayProps) {
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !pulseRef.current || !lineRef.current) {
      return;
    }

    const pulseTween = gsap.to(pulseRef.current, {
      scale: 1.08,
      opacity: 0.65,
      duration: MOTION_DURATION_LG + 0.38,
      repeat: -1,
      yoyo: true,
      ease: LOOP_EASE,
    });

    const lineTween = gsap.fromTo(
      lineRef.current,
      { yPercent: -80 },
      {
        yPercent: 80,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: LOOP_EASE,
      },
    );

    return () => {
      pulseTween.kill();
      lineTween.kill();
    };
  }, [reducedMotion]);

  return (
    <section className={`scan-overlay ${className}`.trim()}>
      <div className="scan-overlay__header">
        <p className="scan-overlay__title">{title}</p>
        <p className="scan-overlay__status">{statusText}</p>
      </div>
      <div className="scan-overlay__viewport">
        <div className="scan-overlay__frame">
          <div className="scan-overlay__line" ref={lineRef} />
        </div>
      </div>
      <div className="scan-overlay__footer">
        <span className="scan-overlay__hint">{hint}</span>
        <div className="scan-overlay__pulse" ref={pulseRef} />
      </div>
    </section>
  );
}
