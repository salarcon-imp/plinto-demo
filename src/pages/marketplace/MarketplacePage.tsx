import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DELAY_SM,
  MOTION_DURATION_MD,
  MOTION_DURATION_SM,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import WordMarkBlack from '../../assets/logos/WordMark-Black.svg';
import { ArtworkCard } from '../../components/cards/ArtworkCard';
import { BottomActionBar } from '../../components/navigation/BottomActionBar';
import { CategoryChip } from '../../components/primitives/CategoryChip';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { artworks, artists, marketplaceCategories } from '../../data';
import { getArtistById } from '../../utils/plinto';

export function MarketplacePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredArtworks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return artworks.filter((artwork) => {
      const artist = getArtistById(artwork.artistId);
      const matchesCategory =
        activeCategory === 'all' || artwork.categoryIds.includes(activeCategory);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        artwork.title.toLowerCase().includes(normalizedQuery) ||
        artist?.name.toLowerCase().includes(normalizedQuery) ||
        artwork.originCountry.toLowerCase().includes(normalizedQuery) ||
        artwork.medium.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.marketplace-hero__content > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });

      gsap.from('.marketplace-filters .category-chip', {
        autoAlpha: 0,
        y: 12,
        duration: MOTION_DURATION_SM,
        stagger: 0.04,
        delay: MOTION_DELAY_SM,
        ease: MOTION_EASE,
      });
    }, heroRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!gridRef.current || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.marketplace-grid > *', {
        autoAlpha: 0,
        y: 24,
        duration: MOTION_DURATION_MD,
        stagger: 0.05,
        ease: MOTION_EASE,
        clearProps: 'all',
      });
    }, gridRef);

    return () => context.revert();
  }, [filteredArtworks, reducedMotion]);

  return (
    <section className="marketplace-page">
      <div className="marketplace-hero" ref={heroRef}>
        <div className="marketplace-hero__content">
          <header className="marketplace-brand">
            <img alt="Plinto" className="marketplace-brand__logo" src={WordMarkBlack} />
            <Link className="marketplace-brand__utility" to="/scan">
              Scan
            </Link>
          </header>

          <div className="marketplace-copy">
            <span className="marketplace-copy__eyebrow">Verified art marketplace</span>
            <h1 className="marketplace-copy__title">Discover works with a permanent identity.</h1>
            <p className="marketplace-copy__description">
              A curated selection of verified pieces, artistic voices and collectible records built
              for clients, galleries and stakeholders.
            </p>
          </div>

          <label className="marketplace-search">
            <span className="marketplace-search__label">Search the collection</span>
            <input
              className="marketplace-search__input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, artist, medium or country"
              type="search"
              value={query}
            />
          </label>
        </div>
      </div>

      <div className="marketplace-filters">
        <button
          className="marketplace-filters__chip-button"
          onClick={() => setActiveCategory('all')}
          type="button"
        >
          <CategoryChip active={activeCategory === 'all'} label="All" />
        </button>
        {marketplaceCategories.map((category) => (
          <button
            className="marketplace-filters__chip-button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            <CategoryChip active={activeCategory === category.id} label={category.label} />
          </button>
        ))}
      </div>

      <div className="marketplace-results">
        <div className="marketplace-results__summary">
          <span>{filteredArtworks.length} works</span>
          <span>{artists.length} artists</span>
        </div>

        <div className="marketplace-grid" ref={gridRef}>
          {filteredArtworks.map((artwork, index) => {
            const artist = getArtistById(artwork.artistId);
            const badgeLabel =
              artwork.availability === 'reserved' || artwork.availability === 'on-view'
                ? 'Verified'
                : 'Identified';

            return (
              <div
                className={`marketplace-grid__item ${
                  index % 4 === 0 || artwork.featured ? 'marketplace-grid__item--featured' : ''
                }`.trim()}
                key={artwork.id}
              >
                <ArtworkCard
                  artistName={artist?.name ?? 'Unknown artist'}
                  artwork={artwork}
                  badgeLabel={badgeLabel}
                  to={`/marketplace/artwork/${artwork.slug}`}
                />
              </div>
            );
          })}
        </div>

        {filteredArtworks.length === 0 ? (
          <div className="marketplace-empty">
            <span className="marketplace-empty__eyebrow">No results</span>
            <p className="marketplace-empty__title">Try another combination of artist, title or category.</p>
          </div>
        ) : null}
      </div>

      <BottomActionBar
        items={[
          { label: 'Market', to: '/marketplace' },
          { label: 'Scan', to: '/scan' },
          { label: 'Invite', to: '/invitation' },
          { label: 'Profile', to: '/profile/user-collector-01' },
        ]}
      />

      <Link className="scan-fab" to="/scan">
        Scan Piece
      </Link>
    </section>
  );
}
