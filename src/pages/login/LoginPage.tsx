import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';

type LoginState = 'default' | 'loading';

export function LoginPage() {
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

  return (
    <section className={`intro-login intro-login--${state}`.trim()}>
      <div className="intro-home__status">
        <span>9:41</span>
        <span className="intro-home__status-icons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="intro-login__brand">
        <img alt="Plinto" className="intro-login__logo" src={brandAssets.WordMarkBlack} />
        <p className="intro-login__subtitle">Welcome back</p>
      </div>

      {state === 'loading' ? (
        <div className="intro-login__loading">
          <button className="intro-login__loading-button" type="button">
            <Loader2 className="intro-login__spinner" size={22} strokeWidth={1.75} />
          </button>
        </div>
      ) : (
        <div className="intro-login__card intro-login__card--simple">
          <p className="intro-login__message">Log in with the email address you registered with</p>

          <button className="intro-login__submit" onClick={() => setState('loading')} type="button">
            <span>Log in</span>
            <ArrowRight size={18} strokeWidth={1.7} />
          </button>
        </div>
      )}
    </section>
  );
}
