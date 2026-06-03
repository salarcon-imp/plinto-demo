import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import WordMarkBlack from '../../assets/logos/WordMark-Black.svg';
import { PageHeader } from '../../components/navigation/PageHeader';
import { PrimaryButton } from '../../components/primitives/PrimaryButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type LoginState = 'idle' | 'loading' | 'error' | 'success';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LoginState>('idle');
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion || !cardRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.login-shell__brand, .login-card > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, cardRef);

    return () => context.revert();
  }, [reducedMotion]);

  const handleLogin = () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    window.setTimeout(() => {
      setStatus('success');

      window.setTimeout(() => {
        navigate('/marketplace');
      }, 450);
    }, 900);
  };

  const statusMessage =
    status === 'error'
      ? 'Please enter a valid email address to continue.'
      : status === 'loading'
        ? 'Preparing your access route...'
        : status === 'success'
          ? 'Access confirmed. Entering marketplace...'
          : 'Use any valid email to simulate entry.';

  return (
    <section className="login-shell" ref={cardRef}>
      <PageHeader backTo="/onboarding" title="Login" />

      <div className="login-shell__brand">
        <img alt="Plinto" className="login-shell__logo" src={WordMarkBlack} />
        <h1 className="login-shell__title">Welcome back.</h1>
        <p className="login-shell__description">
          Continue into the Plinto demo experience with a simulated access flow.
        </p>
      </div>

      <div className={`login-card login-card--${status}`.trim()}>
        <label className="login-card__field">
          <span className="login-card__label">Email address</span>
          <input
            autoComplete="email"
            className="login-card__input"
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== 'idle') {
                setStatus('idle');
              }
            }}
            placeholder="name@example.com"
            type="email"
            value={email}
          />
        </label>

        <p className={`login-card__status login-card__status--${status}`.trim()}>{statusMessage}</p>

        <PrimaryButton disabled={status === 'loading' || status === 'success'} onClick={handleLogin}>
          {status === 'loading' ? 'Logging in...' : status === 'success' ? 'Success' : 'Log in'}
        </PrimaryButton>
      </div>
    </section>
  );
}
