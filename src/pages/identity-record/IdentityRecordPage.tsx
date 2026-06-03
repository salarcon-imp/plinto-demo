import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DELAY_SM,
  MOTION_DURATION_MD,
  MOTION_DURATION_LG,
  MOTION_EASE,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { IdentityBadge } from '../../components/identity/IdentityBadge';
import { MonoDataBlock } from '../../components/identity/MonoDataBlock';
import { RecordAccordion } from '../../components/identity/RecordAccordion';
import { PageHeader } from '../../components/navigation/PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { artists } from '../../data';
import {
  formatLongDate,
  formatTechnicalTimestamp,
  getArtistById,
  getArtworkById,
  getCategoriesByIds,
  getRecordById,
} from '../../utils/plinto';

export function IdentityRecordPage() {
  const { recordId } = useParams();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const record = getRecordById(recordId);

  if (!record) {
    return (
      <NotFoundState
        description="The identity record you requested is not part of the current demo package."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        secondaryLabel="Open artwork"
        secondaryTo="/marketplace/artwork/yellow-tide"
        title="Identity record not found"
      />
    );
  }

  const artwork = getArtworkById(record.artworkId) ?? null;
  const artist = artwork ? getArtistById(artwork.artistId) : artists.find((item) => item.name === record.custody[0]?.actor);
  const categories = artwork ? getCategoriesByIds(artwork.categoryIds) : [];

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.identity-record-overview > *', {
        autoAlpha: 0,
        y: 20,
        duration: MOTION_DURATION_MD,
        stagger: 0.07,
        ease: MOTION_EASE,
      });

      gsap.from('.identity-record-stack > *', {
        autoAlpha: 0,
        y: 24,
        duration: MOTION_DURATION_LG,
        stagger: MOTION_STAGGER,
        delay: MOTION_DELAY_SM,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [record.id, reducedMotion]);

  return (
    <section className="identity-record-page" ref={pageRef}>
      <PageHeader
        actionLabel="Artwork"
        actionTo={artwork ? `/marketplace/artwork/${artwork.slug}` : '/marketplace'}
        backTo={artwork ? `/marketplace/artwork/${artwork.slug}` : '/marketplace'}
        title="Identity Record"
      />

      <div className="identity-record-overview">
        <span className="identity-record-overview__eyebrow">Permanent registry entry</span>
        <div className="identity-record-overview__headline">
          <h1 className="identity-record-overview__title">{artwork?.title ?? 'Recorded work'}</h1>
          <IdentityBadge
            label={record.authenticityStatus === 'verified' ? 'Verified' : 'Identified'}
            tone="technical"
          />
        </div>
        <p className="identity-record-overview__description">{record.provenanceSummary}</p>
        {categories.length > 0 ? (
          <div className="identity-record-overview__tags">
            {categories.map((category) => (
              <span className="identity-record-overview__tag" key={category.id}>
                {category.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="identity-record-stack">
        <section className="identity-record-card identity-record-card--technical">
          <div className="identity-record-card__head">
            <p className="identity-record-card__eyebrow">Overview</p>
            {artwork ? (
              <Link className="identity-record-card__link" to={`/marketplace/artwork/${artwork.slug}`}>
                Open artwork profile
              </Link>
            ) : null}
          </div>
          <MonoDataBlock
            title="Identity"
            rows={[
              { label: 'The Maker', value: artist?.name ?? 'Unknown' },
              { label: 'Current Keeper', value: record.currentKeeper },
              { label: 'Plinted Date', value: formatLongDate(record.mintedAt) },
              { label: 'Work ID', value: record.artworkId },
              { label: 'Record ID', value: record.recordId },
              { label: 'Hash', value: record.hash },
              { label: 'Block', value: `#${record.blockNumber}` },
              { label: 'Timestamp', value: formatTechnicalTimestamp(record.mintedAt) },
            ]}
          />
        </section>

        <section className="identity-record-card identity-record-card--technical">
          <div className="identity-record-card__head">
            <p className="identity-record-card__eyebrow">Technical metadata</p>
          </div>
          <MonoDataBlock
            rows={[
              { label: 'Certificate', value: record.certificateId },
              { label: 'Registry Version', value: record.metadata.registryVersion },
              { label: 'Capture Method', value: record.metadata.captureMethod },
              { label: 'Condition', value: record.metadata.condition },
              { label: 'Surface', value: record.metadata.surface },
              { label: 'Geo', value: record.metadata.geostamp },
            ]}
          />
        </section>

        <section className="identity-record-card">
          <div className="identity-record-card__head">
            <p className="identity-record-card__eyebrow">Current keeper note</p>
          </div>
          <p className="identity-record-card__body-copy">
            This work carries a permanent record attached to its identity. The current custody chain
            and registry fields are visible for demo purposes and remain local to this experience.
          </p>
        </section>

        <RecordAccordion record={record} />
      </div>
    </section>
  );
}
