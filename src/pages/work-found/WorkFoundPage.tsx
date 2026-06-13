import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BrandMark from '../../assets/ui/brand-mark.svg';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { getArtworkBySlug } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';
import { MarketplaceBackground } from '../marketplace/MarketplaceBackground';

type VerifyState = 'found' | 'verifying' | 'badge' | 'badge-open' | 'done';

export function WorkFoundPage() {
  const { artworkId } = useParams();
  const artwork = getArtworkBySlug(artworkId);
  const navigate = useNavigate();
  const [verifyState, setVerifyState] = useState<VerifyState>('found');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (verifyState === 'badge' || verifyState === 'badge-open') {
      timerRef.current = window.setTimeout(() => setVerifyState('done'), 52000);
      return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
    }
  }, [verifyState]);

  if (!artwork) {
    return (
      <NotFoundState
        description="The scanned work is not available in this demo."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Work not found"
      />
    );
  }

  const visualStyle = {
    ...getVisualStyle(artwork.visual),
    aspectRatio: `${artwork.dimensionsCm.width} / ${artwork.dimensionsCm.height}`,
  };

  const handleVerify = () => {
    setVerifyState('verifying');
    timerRef.current = window.setTimeout(() => setVerifyState('badge'), 8000);
  };

  // ── "Found" ──────────────────────────────────────────────────────────────
  if (verifyState === 'found') {
    return (
      <div className="vf-scene">
        <div className="vf-scene__bg" aria-hidden="true"><MarketplaceBackground /></div>
        <div className="vf-scene__blur" aria-hidden="true" />
        <div className="vf-frame">
          <div className="vf-sheet">
            <button className="vf-sheet__close" onClick={() => navigate('/marketplace')} type="button" aria-label="Cerrar">
              <X size={18} strokeWidth={1.8} />
            </button>
            <h2 className="vf-sheet__title">Conocemos esta obra.</h2>
            <p className="vf-sheet__body">Está registrada en nuestro sistema. ¿Qué deseas hacer?</p>
            <div className="vf-sheet__visual" style={visualStyle} />
            <div className="vf-sheet__actions">
              <button className="vf-sheet__btn vf-sheet__btn--primary" onClick={handleVerify} type="button">
                Verificar con Plinto
              </button>
              <Link className="vf-sheet__btn vf-sheet__btn--ghost" to={`/artpiece/${artwork.slug}`}>
                Ver perfil de la obra
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── "Verifying" — scan icon + X above toast ───────────────────────────────
  if (verifyState === 'verifying') {
    return (
      <div className="vf-scene vf-scene--live">
        <div className="vf-scene__bg" aria-hidden="true"><MarketplaceBackground /></div>
        <div className="vf-frame">
          <div className="vf-bottom-group">
            <div className="vf-topbar">
              <div className="vf-scan-pill">
                <img alt="Plinto" src={BrandMark} className="vf-scan-pill__img" />
              </div>
              <button className="vf-market-dismiss" onClick={() => setVerifyState('badge')} type="button" aria-label="Cerrar">
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            <div className="vf-toast">
              <div className="vf-toast__row">
                <p className="vf-toast__title">Plinto está verificando esta obra…</p>
                <Loader2 className="vf-toast__spinner" size={22} strokeWidth={1.6} />
              </div>
              <p className="vf-toast__sub">Esto puede tomar unos minutos. Te avisaremos cuando esté listo.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── "Badge" — floating pill overlay top-right, independent of marketplace ─
  if (verifyState === 'badge' || verifyState === 'badge-open') {
    const isOpen = verifyState === 'badge-open';
    return (
      <div className="vf-scene vf-scene--live">
        <div className="vf-scene__bg" aria-hidden="true"><MarketplaceBackground /></div>
        <div className="vf-frame">

          {/* Floating badge — completely independent, top-right corner */}
          <button
            className="vf-floating-badge"
            onClick={() => setVerifyState(isOpen ? 'badge' : 'badge-open')}
            type="button"
          >
            <img src={BrandMark} alt="" className="vf-floating-badge__icon" />
            <span>Verificando</span>
            <span className="vf-floating-badge__spinner" />
          </button>

          {/* Toast + icons when badge is tapped */}
          {isOpen && (
            <div className="vf-bottom-group">
              <div className="vf-topbar">
                <div className="vf-scan-pill">
                  <img alt="Plinto" src={BrandMark} className="vf-scan-pill__img" />
                </div>
                <button className="vf-market-dismiss" onClick={() => setVerifyState('badge')} type="button" aria-label="Cerrar">
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>
              <div className="vf-toast">
                <div className="vf-toast__row">
                  <p className="vf-toast__title">Seguimos en eso.</p>
                  <Loader2 className="vf-toast__spinner" size={22} strokeWidth={1.6} />
                </div>
                <p className="vf-toast__sub">Ya casi. Puede tardar un momento más.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── "Done" — IDENTIFICADA ─────────────────────────────────────────────────
  return (
    <div className="vf-scene">
      <div className="vf-scene__bg" aria-hidden="true"><MarketplaceBackground /></div>
      <div className="vf-scene__blur" aria-hidden="true" />
      <div className="vf-frame">
        <div className="vf-sheet vf-sheet--identified">
          <div className="vf-sheet__badge">
            <img alt="Verified Plinto" src={BrandMark} className="vf-sheet__badge-img" />
            <span>IDENTIFICADA</span>
          </div>
          <h2 className="vf-sheet__title vf-sheet__title--lg">Esta obra está en el plinto.</h2>
          <p className="vf-sheet__body">
            Plinto ha confirmado su identidad. Su registro es permanente y no puede alterarse
          </p>
          <div className="vf-sheet__visual" style={visualStyle} />
          <div className="vf-sheet__actions">
            <Link className="vf-sheet__btn vf-sheet__btn--primary" to={`/identity/${artwork.identityRecordId ?? ''}`}>
              Ver Plinto Identity
            </Link>
            <Link className="vf-sheet__btn vf-sheet__btn--ghost" to="/marketplace">
              Cerrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
