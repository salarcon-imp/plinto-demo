import { useEffect, useState } from 'react';
import { ArrowLeft, ScanLine, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { artworks } from '../../data';
import { getVisualStyle } from '../../utils/visuals';

export function ScanPiecePage() {
  const navigate = useNavigate();
  const artwork = artworks.find((item) => item.slug === 'yellow-tide') ?? artworks[0];
  const [state, setState] = useState<'idle' | 'scanning'>('idle');

  useEffect(() => {
    if (state !== 'scanning') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate(`/workfound/${artwork.slug}`);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [artwork.slug, navigate, state]);

  return (
    <section className="app-artscan-v2">
      <div className="app-artscan-v2__backdrop" />

      <header className="app-artscan-v2__top">
        <button className="app-artscan-v2__icon" onClick={() => navigate('/marketplace')} type="button">
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>
        <div className="app-artscan-v2__title">
          <p>Plinto camera</p>
          <h1>Scan Piece</h1>
        </div>
        <button className="app-artscan-v2__icon" type="button">
          <Sparkles size={18} strokeWidth={1.8} />
        </button>
      </header>

      <div className="app-artscan-v2__viewport">
        <div className="app-artscan-v2__surface" style={getVisualStyle(artwork.visual)} />
        <div className={`app-artscan-v2__scanner ${state === 'scanning' ? 'app-artscan-v2__scanner--active' : ''}`} />
        <div className="app-artscan-v2__corners" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="app-artscan-v2__bottom">
        <p>{state === 'scanning' ? 'Scanning artwork identity...' : 'Center the piece and begin scan.'}</p>
        <button
          className={`app-artscan-v2__trigger ${state === 'scanning' ? 'app-artscan-v2__trigger--active' : ''}`.trim()}
          onClick={() => setState('scanning')}
          type="button"
        >
          <ScanLine size={24} strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
