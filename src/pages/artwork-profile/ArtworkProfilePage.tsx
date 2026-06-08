import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DELAY_SM,
  MOTION_DURATION_MD,
  MOTION_DURATION_LG,
  MOTION_EASE,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { ArtistCard } from '../../components/cards/ArtistCard';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { RecordAccordion } from '../../components/identity/RecordAccordion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  formatArtworkDimensions,
  getArtistById,
  getArtworkBySlug,
  getRecordByArtworkId,
} from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';
import VerifiedPlinto from '../../assets/ui/verified-plinto.png';

export function ArtworkProfilePage() {
  const { artworkId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const artwork = getArtworkBySlug(artworkId);

  if (!artwork) {
    return (
      <NotFoundState
        description="The artwork you tried to open is not available in this demo route."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        secondaryLabel="Open scan flow"
        secondaryTo="/scan"
        title="Artwork not found"
      />
    );
  }

  const artist = getArtistById(artwork.artistId);
  const record = getRecordByArtworkId(artwork.id);
  const description = expanded ? artwork.summary : `${artwork.summary.slice(0, 104)}...`;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.artwork-profile-page__hero, .artwork-profile-page__panel > *, .artwork-profile-offer', {
        autoAlpha: 0,
        y: 20,
        duration: MOTION_DURATION_LG,
        stagger: MOTION_STAGGER,
        delay: MOTION_DELAY_SM,
        ease: MOTION_EASE,
      });

      gsap.from('.artwork-profile-page__maker, .artwork-profile-page__record', {
        autoAlpha: 0,
        y: 16,
        duration: MOTION_DURATION_MD,
        stagger: 0.08,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [artwork.id, reducedMotion]);

  return (
    <section className="artwork-profile-page artwork-profile-page--dark" ref={pageRef}>
      <div className="artwork-profile-page__hero-actions">
        <Link aria-label="Back to marketplace" className="artwork-profile-page__hero-button" to="/marketplace">
          ‹
        </Link>
        <div className="artwork-profile-page__hero-tools">
          <Link
            aria-label="Open identity record"
            className="artwork-profile-page__hero-button"
            to={record ? `/identity/${record.id}` : '/marketplace'}
          >
            ↗
          </Link>
          <button aria-label="Favorite artwork" className="artwork-profile-page__hero-button" type="button">
            ♡
          </button>
        </div>
      </div>

      <div className="artwork-profile-page__hero">
        <div className="artwork-profile-page__hero-visual" style={getVisualStyle(artwork.visual)} />
      </div>

      <div className="artwork-profile-page__panel">
        <div className="artwork-profile-page__title-row">
          <div>
            <p className="artwork-profile-page__artist">{artist?.name.toUpperCase()}</p>
            <h1 className="artwork-profile-page__title">{artwork.title}</h1>
            <p className="artwork-profile-page__location">
              {artwork.originCountry}, {artwork.year}
            </p>
            <p className="artwork-profile-page__spec">
              {artwork.medium} on {artwork.support.toLowerCase()} &nbsp;|&nbsp;{' '}
              {formatArtworkDimensions(
                artwork.dimensionsCm.width,
                artwork.dimensionsCm.height,
                artwork.dimensionsCm.depth,
              )}
            </p>
          </div>

          {record ? (
            <span className="artwork-profile-page__verified-mark">
              <img alt="Verified Plinto" src={VerifiedPlinto} />
            </span>
          ) : null}
        </div>

        <div className="artwork-profile-page__description">
          <p>{description}</p>
          <button onClick={() => setExpanded((current) => !current)} type="button">
            {expanded ? 'READ LESS →' : 'READ MORE →'}
          </button>
        </div>

        {artist ? (
          <div className="artwork-profile-page__maker">
            <p className="artwork-profile-page__section-label">ABOUT THE MAKER</p>
            <ArtistCard artist={artist} />
          </div>
        ) : null}

        {record ? (
          <div className="artwork-profile-page__record">
            <RecordAccordion record={record} />
          </div>
        ) : null}
      </div>

      <div className="artwork-profile-offer">
        <div>
          <p className="artwork-profile-offer__label">CURRENT OFFER</p>
          <p className="artwork-profile-offer__price">
            ${artwork.priceUsd?.toLocaleString() ?? '2,400'}
          </p>
        </div>
        <button className="artwork-profile-offer__button" type="button">
          INQUIRE
        </button>
      </div>
    </section>
  );
}
