import { useMemo } from 'react';
import { UserCircle2 } from 'lucide-react';
import { brandAssets } from '../../assets/logos';
import { artworks } from '../../data';
import { getArtistById } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

// Clean — no badge props, no badge logic, never touched again
export function MarketplaceBackground() {
  const items = useMemo(() => [...artworks].sort((a, b) => a.year - b.year), []);

  return (
    <section className="app-marketplace-v2" aria-hidden="true" style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <div className="app-marketplace-v2__top">
        <header className="app-marketplace-v2__header">
          <img alt="Plinto" className="app-marketplace-v2__wordmark app-marketplace-v2__wordmark--light" src={brandAssets.OfficialLogo} />
          <div className="app-marketplace-v2__header-right">
            <button className="app-marketplace-v2__profile" type="button" tabIndex={-1}>
              <UserCircle2 size={24} strokeWidth={1.9} />
            </button>
          </div>
        </header>
        <div className="app-marketplace-v2__filters" role="presentation">
          {['Abstracto', 'Figurativo', 'Geométrico', 'Coleccionable'].map((f) => (
            <span key={f} className="app-marketplace-v2__filter">{f}</span>
          ))}
        </div>
      </div>
      <div className="app-marketplace-v2__grid">
        {items.map((artwork) => {
          const artist = getArtistById(artwork.artistId);
          return (
            <div className="app-marketplace-v2__card" key={artwork.id}>
              <div className="app-marketplace-v2__visual" style={getVisualStyle(artwork.visual)} />
              <div className="app-marketplace-v2__card-copy">
                <p className="app-marketplace-v2__artist">{artist?.name ?? ''}</p>
                <h2>{artwork.title}</h2>
                <p className="app-marketplace-v2__meta">{artwork.medium}, {artwork.year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
