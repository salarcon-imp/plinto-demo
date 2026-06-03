import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_SM,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { IdentityBadge } from '../../components/identity/IdentityBadge';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { PrimaryButton } from '../../components/primitives/PrimaryButton';
import { SecondaryButton } from '../../components/primitives/SecondaryButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getArtworkBySlug } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

export function WorkFoundPage() {
  const { artworkId } = useParams();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const artwork = getArtworkBySlug(artworkId);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.work-found-page__panel > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_SM,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  if (!artwork) {
    return (
      <NotFoundState
        description="The scanned piece could not be matched against the current local demo collection."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        secondaryLabel="Retry scan"
        secondaryTo="/scan"
        title="Work not found"
      />
    );
  }

  return (
    <section className="work-found-page" ref={pageRef}>
      <div className="work-found-page__panel">
        <IdentityBadge label="Identified" />
        <div className="work-found-page__copy">
          <h1 className="work-found-page__title">This work is on the plinth.</h1>
          <p className="work-found-page__description">
            Its record is permanent and cannot be altered.
          </p>
        </div>

        <div className="work-found-page__visual" style={getVisualStyle(artwork.visual)} />

        <div className="work-found-page__actions">
          <Link to={`/marketplace/artwork/${artwork.slug}`}>
            <PrimaryButton>See Work Profile</PrimaryButton>
          </Link>
          <Link to="/marketplace">
            <SecondaryButton>Cancel</SecondaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
