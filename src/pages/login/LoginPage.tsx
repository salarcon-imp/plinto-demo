import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Mail, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';

type LoginState = 'default' | 'loading' | 'error';
type LoginView = LoginState;

const VALID_LOGIN_EMAIL = 'admin@improgress.net';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<LoginState>('default');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const previewView = (() => {
    if (location.pathname.endsWith('/loading')) {
      return 'loading' as const;
    }
    return null;
  })();

  const currentView: LoginView = previewView ?? state;
  const showLoading = currentView === 'loading';
  const showError = currentView === 'error';
  const isInteractive = previewView === null;
  const isSubmitDisabled = !email.trim();

  useEffect(() => {
    if (!isInteractive || state !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/login/loading');
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [isInteractive, navigate, state]);

  useEffect(() => {
    if (previewView !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/onboarding');
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, [navigate, previewView]);

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      return;
    }

    if (email.trim().toLowerCase() === VALID_LOGIN_EMAIL) {
      setState('loading');
      return;
    }

    setState('error');
  };

  const handleRetry = () => {
    setState('default');
    setEmail('');
  };

  return (
    <section className={`intro-login intro-login--${showLoading ? 'loading' : showError ? 'error' : 'default'} ${isFocused ? 'intro-login--focused' : ''}`.trim()}>
      <div className="intro-login__brand">
        <img alt="Plinto" className="intro-login__logo intro-login__logo--light" src={brandAssets.OfficialLogo} />
        <p className="intro-login__subtitle">Bienvenido de regreso</p>
      </div>

      {showLoading ? (
        <div className="intro-login__loading">
          <button className="intro-login__loading-button" type="button">
            <Loader2 className="intro-login__spinner" size={22} strokeWidth={1.75} />
          </button>
        </div>
      ) : (
        <>
          {showError ? (
            <div className="intro-login__card intro-login__card--error">
              <p className="intro-login__message intro-login__message--error">
                No encontramos ese correo. ¿Usaste otro al registrarte?
              </p>

              <div className="intro-login__error-icon" aria-hidden="true">
                <X size={34} strokeWidth={1.8} />
              </div>

              <button className="intro-login__submit" onClick={handleRetry} type="button">
                <span>Reintentar</span>
              </button>
            </div>
          ) : (
            <div className="intro-login__card">
              <p className="intro-login__message">Ingresa con el correo con el que te registraste</p>

              <label className="intro-login__field">
                <Mail aria-hidden="true" size={18} strokeWidth={1.7} />
                <span className="sr-only">Correo electrónico</span>
                <input
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="intro-login__input"
                  onBlur={() => isInteractive && setIsFocused(false)}
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => isInteractive && setIsFocused(true)}
                  placeholder="Correo electrónico"
                  type="email"
                  value={email}
                />
              </label>

              <button className="intro-login__submit" disabled={isSubmitDisabled} onClick={handleSubmit} type="button">
                <span>Entrar</span>
                <ArrowRight size={18} strokeWidth={1.7} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
