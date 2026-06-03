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
import { IdentityBadge } from '../../components/identity/IdentityBadge';
import { MonoDataBlock } from '../../components/identity/MonoDataBlock';
import { RecordAccordion } from '../../components/identity/RecordAccordion';
import { PageHeader } from '../../components/navigation/PageHeader';
import { PrimaryButton } from '../../components/primitives/PrimaryButton';
import { SecondaryButton } from '../../components/primitives/SecondaryButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  formatArtworkDimensions,
  formatLongDate,
  formatTechnicalTimestamp,
  getArtistById,
  getArtworkBySlug,
  getCategoriesByIds,
  getRecordByArtworkId,
} from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

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
  const categories = getCategoriesByIds(artwork.categoryIds);
  const previewCustody = record?.custody.slice(0, 3) ?? [];
  const description = expanded ? artwork.summary : `${artwork.summary.slice(0, 115)}...`;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.artwork-profile-hero > *', {
        autoAlpha: 0,
        y: 24,
        duration: MOTION_DURATION_LG,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });

      gsap.from('.artwork-profile-section', {
        autoAlpha: 0,
        y: 20,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        delay: MOTION_DELAY_SM,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [artwork.id, reducedMotion]);

  return (
    <section className="artwork-profile-page" ref={pageRef}>
      <PageHeader actionLabel="Record" actionTo={record ? `/identity/${record.id}` : '/marketplace'} backTo="/marketplace" title="Artwork Profile" />

      <div className="artwork-profile-hero">
        <div className="artwork-profile-hero__visual" style={getVisualStyle(artwork.visual)} />

        <div className="artwork-profile-hero__body">
          <div className="artwork-profile-hero__meta">
            <span className="artwork-profile-hero__artist">{artist?.name}</span>
            {record ? (
              <IdentityBadge
                label={record.authenticityStatus === 'verified' ? 'Verified' : 'Identified'}
              />
            ) : null}
          </div>

          <h1 className="artwork-profile-hero__title">{artwork.title}</h1>
          <p className="artwork-profile-hero__origin">
            {artwork.originCountry}, {artwork.year}
          </p>
          <p className="artwork-profile-hero__spec">
            {artwork.medium} on {artwork.support} |{' '}
            {formatArtworkDimensions(
              artwork.dimensionsCm.width,
              artwork.dimensionsCm.height,
              artwork.dimensionsCm.depth,
            )}{' '}
            | {artwork.edition}
          </p>

          <div className="artwork-profile-hero__tags">
            {categories.map((category) => (
              <span className="artwork-profile-hero__tag" key={category.id}>
                {category.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="artwork-profile-section artwork-profile-copy">
        <p className="artwork-profile-section__eyebrow">Overview</p>
        <p className="artwork-profile-copy__text">{description}</p>
        <button
          className="artwork-profile-copy__toggle"
          onClick={() => setExpanded((current) => !current)}
          type="button"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </section>

      {artist ? (
        <section className="artwork-profile-section">
          <div className="artwork-profile-section__head">
            <p className="artwork-profile-section__eyebrow">About the Maker</p>
          </div>
          <ArtistCard artist={artist} />
        </section>
      ) : null}

      {record ? (
        <>
          <section className="artwork-profile-section artwork-profile-record-preview">
            <div className="artwork-profile-section__head">
              <p className="artwork-profile-section__eyebrow">The Record</p>
              <Link className="artwork-profile-section__link" to={`/identity/${record.id}`}>
                Open full identity record
              </Link>
            </div>

            <MonoDataBlock
              title="Preview"
              rows={[
                { label: 'Maker', value: artist?.name ?? 'Unknown' },
                { label: 'Current Keeper', value: record.currentKeeper },
                { label: 'Plinted Date', value: formatLongDate(record.mintedAt) },
                { label: 'Timestamp', value: formatTechnicalTimestamp(record.mintedAt) },
              ]}
            />
          </section>

          <section className="artwork-profile-section">
            <RecordAccordion record={record} />
          </section>

          <section className="artwork-profile-section">
            <div className="artwork-profile-section__head">
              <p className="artwork-profile-section__eyebrow">Chain of Custody</p>
            </div>
            <div className="artwork-profile-custody">
              {previewCustody.map((entry) => (
                <article className="artwork-profile-custody__entry" key={entry.id}>
                  <div className="artwork-profile-custody__meta">
                    <span>{entry.date}</span>
                    <span>{entry.location}</span>
                  </div>
                  <p className="artwork-profile-custody__actor">
                    {entry.actor} · {entry.action}
                  </p>
                  <p className="artwork-profile-custody__note">{entry.note}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <div className="artwork-profile-actions">
        <PrimaryButton>Inquire</PrimaryButton>
        {record ? (
          <Link className="artwork-profile-actions__link" to={`/identity/${record.id}`}>
            <SecondaryButton>Open Identity Record</SecondaryButton>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
