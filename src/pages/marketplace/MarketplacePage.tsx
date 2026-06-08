import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DELAY_SM,
  MOTION_DURATION_MD,
  MOTION_DURATION_SM,
  MOTION_EASE,
} from '../../animations/presets/motion';
import Frame553 from '../../assets/ui/frame-553.png';
import { ArtworkCard } from '../../components/cards/ArtworkCard';
import { BottomActionBar } from '../../components/navigation/BottomActionBar';
import { CategoryChip } from '../../components/primitives/CategoryChip';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { artworks } from '../../data';

const MARKET_FILTERS = [
  { id: 'minimalism', label: 'Minimalism', matcher: (ids: string[]) => ids.includes('minimalism') },
  { id: 'cubism', label: 'Cubism', matcher: (ids: string[]) => ids.includes('geometric') },
  { id: 'abstract', label: 'Abstract', matcher: (ids: string[]) => ids.includes('abstract') },
  { id: 'pop-art', label: 'Pop Art', matcher: (ids: string[]) => ids.includes('figurative') },
] as const;

const ARTIST_LABELS: Record<string, string> = {
  'artist-felipe-galvez': 'FELIPE GALVEZ',
  'artist-marisa-oliveira': 'MARISA OLIVEIRA',
  'artist-idris-khalil': 'IDRIS KHALIL',
  'artist-lena-vogel': 'LENA VOGEL',
  'artist-elina-araja': 'ELINA ARAJA',
  'artist-sebastian-morel': 'SEBASTIAN MOREL',
};

const PRIORITY_ORDER = [
  'artwork-identidades-civic',
  'artwork-family-mundane',
  'artwork-warrior-2',
  'artwork-acb',
  'artwork-edipo',
  'artwork-smokey',
];

export function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState('abstract');
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredArtworks = useMemo(() => {
    const ordered = [...artworks].sort((left, right) => {
      const leftPriority = PRIORITY_ORDER.indexOf(left.id);
      const rightPriority = PRIORITY_ORDER.indexOf(right.id);

      if (leftPriority === -1 && rightPriority === -1) {
        return 0;
      }

      if (leftPriority === -1) {
        return 1;
      }

      if (rightPriority === -1) {
        return -1;
      }

      return leftPriority - rightPriority;
    });

    const filter = MARKET_FILTERS.find((item) => item.id === activeFilter);

    return filter ? ordered.filter((artwork) => filter.matcher(artwork.categoryIds)) : ordered;
  }, [activeFilter]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.marketplace-page__head > *, .marketplace-page__filters .category-chip', {
        autoAlpha: 0,
        y: 14,
        duration: MOTION_DURATION_SM,
        stagger: 0.05,
        delay: MOTION_DELAY_SM,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !gridRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.marketplace-masonry__item', {
        autoAlpha: 0,
        y: 18,
        duration: MOTION_DURATION_MD,
        stagger: 0.05,
        ease: MOTION_EASE,
        clearProps: 'all',
      });
    }, gridRef);

    return () => context.revert();
  }, [filteredArtworks, reducedMotion]);

  return (
    <section className="marketplace-page marketplace-page--dark" ref={pageRef}>
      <header className="marketplace-page__head">
        <h1 className="marketplace-page__title">Marketplace</h1>
        <Link aria-label="Open scan experience" className="marketplace-page__utility" to="/scan">
          <img alt="" src={Frame553} />
        </Link>
      </header>

      <div className="marketplace-page__filters">
        {MARKET_FILTERS.map((filter) => (
          <button
            className="marketplace-page__filter-button"
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            <CategoryChip active={activeFilter === filter.id} label={filter.label} />
          </button>
        ))}
      </div>

      <div className="marketplace-masonry" ref={gridRef}>
        {filteredArtworks.map((artwork) => (
          <div className="marketplace-masonry__item" key={artwork.id}>
            <ArtworkCard
              artistName={ARTIST_LABELS[artwork.artistId] ?? artwork.artistId}
              artwork={artwork}
              to={`/marketplace/artwork/${artwork.slug}`}
            />
          </div>
        ))}
      </div>

      <BottomActionBar
        items={[
          { label: 'Home', to: '/marketplace' },
          { label: 'Search', to: '/scan' },
          { label: 'Notifications', to: '/invitation' },
          { label: 'Profile', to: '/profile/user-collector-01' },
        ]}
      />
    </section>
  );
}
