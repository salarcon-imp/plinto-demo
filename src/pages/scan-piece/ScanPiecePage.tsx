import { useEffect, useState } from 'react';
import { LoaderCircle, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { artworks } from '../../data';
import { getVisualStyle } from '../../utils/visuals';

export function ScanPiecePage() {
  const navigate = useNavigate();
  const artwork = artworks.find((item) => item.slug === 'yellow-tide') ?? artworks[0];
  const [state] = useState<'scanning'>('scanning');
  const aspectRatio = artwork.dimensionsCm.width / artwork.dimensionsCm.height;
  const isLandscape = aspectRatio >= 1;
  const artworkFrameStyle = {
    aspectRatio: `${artwork.dimensionsCm.width} / ${artwork.dimensionsCm.height}`,
    width: isLandscape ? 'min(calc(100% - 40px), 330px)' : 'min(72vw, 286px)',
    maxWidth: '100%',
  };

  useEffect(() => {
    if (state !== 'scanning') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate(`/workfound/${artwork.slug}`);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [artwork.slug, navigate, state]);

  return (
    <section className="app-artscan-v2">
      <div className="app-artscan-v2__backdrop" />

      <header className="app-artscan-v2__top">
        <button className="app-artscan-v2__icon" onClick={() => navigate('/marketplace')} type="button">
          <X size={22} strokeWidth={1.7} />
        </button>
        <h1 className="app-artscan-v2__heading">Scan Piece</h1>
        <button className="app-artscan-v2__icon" type="button">
          <Zap size={18} strokeWidth={1.8} />
        </button>
      </header>

      <div className="app-artscan-v2__status">
        <p>Scanning...</p>
        <LoaderCircle className="app-artscan-v2__status-spinner" size={44} strokeWidth={1.8} />
      </div>

      <div className="app-artscan-v2__viewport">
        <div className="app-artscan-v2__gallery" aria-hidden="true" />
        <div className="app-artscan-v2__artwork-shell" style={artworkFrameStyle}>
          <div className="app-artscan-v2__surface" style={getVisualStyle(artwork.visual)} />
          <div className={`app-artscan-v2__scanner ${state === 'scanning' ? 'app-artscan-v2__scanner--active' : ''}`} />
          <div className="app-artscan-v2__corners" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="app-artscan-v2__bottom">
        <p>Hold still please</p>
        <button className="app-artscan-v2__trigger app-artscan-v2__trigger--active" type="button">
          <span className="app-artscan-v2__trigger-core" />
        </button>
      </div>
    </section>
  );
}
