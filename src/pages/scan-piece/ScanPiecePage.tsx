import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { ScanOverlay } from '../../components/feedback/ScanOverlay';
import { PageHeader } from '../../components/navigation/PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScanPiecePage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.scan-piece-page > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!scanning) {
      return;
    }

    const timeout = window.setTimeout(() => {
      navigate('/scan/found/yellow-tide');
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [navigate, scanning]);

  return (
    <section className="scan-piece-page" ref={pageRef}>
      <PageHeader backTo="/marketplace" title="Scan Piece" />

      <div className="scan-piece-page__viewport">
        <div className="scan-piece-page__ambient" />
        <ScanOverlay
          className="scan-piece-page__overlay"
          hint={scanning ? 'Analyzing the visible surface' : 'Hold still please'}
          statusText={scanning ? 'Scanning...' : 'Ready to simulate recognition'}
          title="Scan Piece"
        />
      </div>

      <button
        className={`scan-piece-page__trigger ${scanning ? 'scan-piece-page__trigger--active' : ''}`.trim()}
        disabled={scanning}
        onClick={() => setScanning(true)}
        type="button"
      >
        <span className="scan-piece-page__trigger-core" />
      </button>
    </section>
  );
}
