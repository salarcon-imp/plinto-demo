import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import WordMarkBone from '../../assets/logos/WordMark-Bone.svg';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type LoginState = 'idle' | 'loading' | 'error' | 'success';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginState>('idle');
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.login-stage__brand, .login-stage__pedestal, .login-panel > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    window.setTimeout(() => {
      setStatus('success');

      window.setTimeout(() => {
        navigate('/marketplace');
      }, 420);
    }, 850);
  };

  const helperText =
    status === 'error'
      ? 'Enter both username and password to continue.'
      : status === 'loading'
        ? 'Preparing your access route...'
        : status === 'success'
          ? 'Access confirmed. Entering marketplace...'
          : 'Use any credentials to simulate the experience.';

  return (
    <section className="login-stage" ref={pageRef}>
      <div className="login-stage__veil" />
      <div className="login-stage__beam" />

      <div className="login-stage__scene">
        <img alt="Plinto" className="login-stage__brand" src={WordMarkBone} />
        <div className="login-stage__pedestal" aria-hidden="true" />

        <div className={`login-panel login-panel--${status}`.trim()}>
          <div className="login-panel__copy">
            <h1 className="login-panel__title">Welcome Back</h1>
            <p className="login-panel__description">
              Enter your username and password to log into your account
            </p>
          </div>

          <label className="login-panel__field">
            <span className="login-panel__field-icon" aria-hidden="true">
              ○
            </span>
            <input
              autoComplete="username"
              className="login-panel__input"
              onChange={(event) => {
                setUsername(event.target.value);
                if (status !== 'idle') {
                  setStatus('idle');
                }
              }}
              placeholder="Username"
              type="text"
              value={username}
            />
          </label>

          <label className="login-panel__field">
            <span className="login-panel__field-icon" aria-hidden="true">
              □
            </span>
            <input
              autoComplete="current-password"
              className="login-panel__input"
              onChange={(event) => {
                setPassword(event.target.value);
                if (status !== 'idle') {
                  setStatus('idle');
                }
              }}
              placeholder="Pasword"
              type="password"
              value={password}
            />
          </label>

          <button className="login-panel__forgot" type="button">
            Forgot password?
          </button>

          <button className="login-panel__submit" onClick={handleLogin} type="button">
            {status === 'loading' ? 'Logging In...' : 'Log In'}
          </button>

          <p className={`login-panel__status login-panel__status--${status}`.trim()}>{helperText}</p>

          <p className="login-panel__signup">
            Don&apos;t have an account? <button type="button">Sign Up</button>
          </p>

          <div className="login-panel__legal">
            <button type="button">Terms of Service</button>
            <span>|</span>
            <button type="button">Privacy Policy</button>
          </div>
        </div>
      </div>
    </section>
  );
}
