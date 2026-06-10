import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  LOOP_EASE,
  MOTION_DURATION_LG,
  MOTION_DURATION_SM,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { brandAssets } from '../../assets/logos';
import { PrimaryButton } from '../../components/primitives/PrimaryButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function SplashPage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const navigateNext = () => {
      if (hasNavigatedRef.current) {
        return;
      }

      hasNavigatedRef.current = true;
      navigate('/onboarding');
    };

    if (reducedMotion) {
      const timeout = window.setTimeout(navigateNext, 2200);

      return () => window.clearTimeout(timeout);
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: MOTION_EASE },
        onComplete: navigateNext,
      });

      timeline
        .from('.splash-screen__mark', {
          autoAlpha: 0,
          y: MOTION_OFFSET_Y + 10,
          duration: MOTION_DURATION_LG,
        })
        .from(
          '.splash-screen__copy > *',
          {
            autoAlpha: 0,
            y: MOTION_OFFSET_Y - 2,
            duration: MOTION_DURATION_SM,
            stagger: MOTION_STAGGER,
          },
          '-=0.42',
        )
        .to('.splash-screen__glow', {
          scale: 1.08,
          autoAlpha: 0.92,
          duration: MOTION_DURATION_LG + 0.38,
          yoyo: true,
          repeat: 1,
          ease: LOOP_EASE,
        })
        .to(
          '.splash-screen__mark, .splash-screen__copy',
          {
            autoAlpha: 0,
            y: -12,
            duration: MOTION_DURATION_SM,
          },
          '+=0.32',
        );
    }, root);

    return () => context.revert();
  }, [navigate, reducedMotion]);

  return (
    <section className="splash-screen" ref={rootRef}>
      <div className="splash-screen__glow" />

      <div className="splash-screen__mark">
        <img alt="Plinto" className="splash-screen__logo splash-screen__logo--light" src={brandAssets.OfficialLogo} />
      </div>

      <div className="splash-screen__copy">
        <span className="splash-screen__eyebrow">Verified art marketplace</span>
        <p className="splash-screen__tagline">A premium record for physical works.</p>
      </div>

      <div className="splash-screen__actions">
        <Link to="/onboarding">
          <PrimaryButton>Enter</PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
