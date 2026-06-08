import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import WordMarkBone from '../../assets/logos/WordMark-Black.svg';
//import WhitePlinthMobile from '../../assets/ui/white-plinth-mobile.png';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ICONOS
import { Mail, ArrowRight, Loader2, MoveRight } from 'lucide-react';

type LoginState = 'idle' | 'loading' | 'error' | 'success';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LoginState>('idle');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.login-stage__brand, .login-stage__pedestal, .toggle-arrow', {
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
    if (!email.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setIsPanelOpen(false);

    window.setTimeout(() => {
      setStatus('success');

      window.setTimeout(() => {
        navigate('/marketplace');
      }, 420);
    }, 850);
  };

  return (
    <section className="login-stage" ref={pageRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Giro del spinner */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="login-stage__veil" />
      <div className="login-stage__beam" />

      <div className="login-stage__scene">
        <img alt="Plinto" className="login-stage__brand" src={WordMarkBone} />

        {/* Botón Flotante: Flecha hacia arriba o Spinner de carga */}
        {!isPanelOpen && (
          <button 
            className="toggle-arrow"
            onClick={() => {
              // Solo permite abrir el panel si no está en proceso de carga
              if (status !== 'loading' && status !== 'success') {
                setIsPanelOpen(true);
              }
            }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: (status === 'loading' || status === 'success') ? 'default' : 'pointer',
              zIndex: 10
            }}
          >
            {(status === 'loading' || status === 'success') ? (
              // Ícono de carga de Lucide con animación
              <Loader2 size={24} color="black" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              // Ícono de flecha hacia arriba
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            )}
          </button>
        )}

        {/* Panel Centrado Horizontalmente */}
        <div 
          style={{
            position: 'absolute',
            width: '361px',
            height: '281px',
            bottom: isPanelOpen ? '20px' : '-350px', 
            left: '50%', // Centrado 
            transform: 'translateX(-50%)', // Compensación del centrado
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            opacity: 1,
            borderRadius: '32px',
            padding: '24px 20px',
            backgroundColor: '#15161A',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
            transition: 'bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            zIndex: 20,
            boxSizing: 'border-box'
          }}
        >
          {/* Encabezado del panel */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 
              style={{ 
                margin: 0, 
                color: '#FFF', 
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 200,
                fontStyle: 'normal',
                fontSize: '24px',
                lineHeight: '100%',
                letterSpacing: '-0.04em'
              }}
            >
              Log in with the email address you registered with
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            
            {/* Contenedor del Campo de Email con Ícono */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '321px',
                height: '60px',
                gap: '10px',
                opacity: 1,
                borderRadius: '99px',
                padding: '20px 16px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: status === 'error' ? 'red' : '#e0e0e0',
                boxSizing: 'border-box',
                color: '#FFF' // Controla el color del ícono y del input
              }}
            >
              <Mail size={20} color="currentColor" />
              
              <input
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Email Address"
                type="email"
                value={email}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  lineHeight: '120%',
                  letterSpacing: '0',
                  textAlign: 'left',
                  color: 'inherit'
                }}
              />
            </div>

            {/* Botón de Entrar con nueva tipografía */}
            <button 
              onClick={handleLogin} 
              disabled={status === 'loading'}
              style={{
                width: '321px',
                height: '53px',
                opacity: 1,
                borderRadius: '99px',
                padding: '16px 14px',
                backgroundColor: '#f5f5f3',
                color: '#15161A',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0.04em',
                textAlign: 'center',
                boxSizing: 'border-box'
              }}
            >
              Log in
              <ArrowRight color="currentColor"/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}