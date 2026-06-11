import { UserCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';
import { artworks } from '../../data';
import { getArtistById } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

const MARKET_FILTERS = [
  { id: 'minimalism', label: 'Minimalism' },
  { id: 'geometric', label: 'Cubism' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'figurative', label: 'Pop Art' },
] as const;

function formatAvailability(value: string) {
  switch (value) {
    case 'available':
      return 'Available';
    case 'in-collection':
      return 'In collection';
    case 'on-view':
      return 'On view';
    case 'reserved':
      return 'Reserved';
    default:
      return value;
  }
}

export function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  const items = useMemo(() => {
    const sortedArtworks = [...artworks].sort((left, right) => left.year - right.year);

    if (!activeFilter) {
      return sortedArtworks;
    }

    return sortedArtworks.filter((artwork) => artwork.categoryIds.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="app-marketplace-v2">
      <div className="app-marketplace-v2__top">
        <header className="app-marketplace-v2__header">
          <img alt="Plinto" className="app-marketplace-v2__wordmark app-marketplace-v2__wordmark--light" src={brandAssets.OfficialLogo} />
          <button aria-label="Open profile" className="app-marketplace-v2__profile" type="button">
            <UserCircle2 size={24} strokeWidth={1.9} />
          </button>
        </header>

        <div className="app-marketplace-v2__filters" role="tablist" aria-label="Marketplace filters">
          {MARKET_FILTERS.map((filter) => (
            <button
              className={`app-marketplace-v2__filter ${
                activeFilter === filter.id ? 'app-marketplace-v2__filter--active' : ''
              }`.trim()}
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="app-marketplace-v2__grid">
        {items.map((artwork) => {
          const artist = getArtistById(artwork.artistId);
          return (
            <Link className="app-marketplace-v2__card" key={artwork.id} to={`/artpiece/${artwork.slug}`}>
              <div className="app-marketplace-v2__visual" style={getVisualStyle(artwork.visual)} />
              <div className="app-marketplace-v2__card-copy">
                <p className="app-marketplace-v2__artist">{artist?.name ?? 'Unknown artist'}</p>
                <h2>{artwork.title}</h2>
                <p className="app-marketplace-v2__meta">
                  {artwork.medium} on {artwork.support.toLowerCase()}, {artwork.year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="app-marketplace-v2__floating">
        <Link aria-label="Open art scan" className="app-marketplace-v2__scan" to="/artscan">
          <img alt="Identificar obra" src={brandAssets.PlintoIcon} />
        </Link>
      </div>
    </section>
  );
}
