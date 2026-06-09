import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginDefault,
  LoginError,
  LoginKeyboard,
  LoginLoading,
} from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

type LoginState = 'default' | 'focused' | 'loading' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<LoginState>('default');
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/marketplace');
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [navigate, state]);

  const screenImage =
    state === 'loading'
      ? LoginLoading
      : state === 'error'
        ? LoginError
        : state === 'focused'
          ? LoginKeyboard
          : LoginDefault;

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email.trim())) {
      setState('loading');
      return;
    }

    setState('error');
  };

  return (
    <MockupScreen alt="Plinto login screen" className="zip-login" imageSrc={screenImage}>
      {state !== 'loading' ? (
        <input
          aria-label="Email address"
          className="zip-login__input"
          onBlur={() => {
            if (state === 'focused' && email.trim().length === 0) {
              setState('default');
            }
          }}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === 'error') {
              setState('focused');
            }
          }}
          onFocus={() => setState('focused')}
          type="email"
          value={email}
        />
      ) : null}

      {state === 'error' ? (
        <button className="hotspot hotspot--login-retry" onClick={() => setState('default')} type="button">
          <span className="sr-only">Retry login</span>
        </button>
      ) : (
        <button className="hotspot hotspot--login-submit" onClick={handleSubmit} type="button">
          <span className="sr-only">Submit login</span>
        </button>
      )}
    </MockupScreen>
  );
}
