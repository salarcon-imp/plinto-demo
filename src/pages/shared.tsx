import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArtistCard } from '../components/cards/ArtistCard';
import { ArtworkCard } from '../components/cards/ArtworkCard';
import { EventInvitationCard } from '../components/cards/EventInvitationCard';
import { BottomActionBar } from '../components/navigation/BottomActionBar';
import { PageHeader } from '../components/navigation/PageHeader';
import { ScanOverlay } from '../components/feedback/ScanOverlay';
import { RecordAccordion } from '../components/identity/RecordAccordion';
import { CategoryChip } from '../components/primitives/CategoryChip';
import { PrimaryButton } from '../components/primitives/PrimaryButton';
import { SecondaryButton } from '../components/primitives/SecondaryButton';
import { StatusBadge } from '../components/feedback/StatusBadge';
import { artists, artworks, events, identityRecords, invitations } from '../data';
import { demoRoutes } from '../utils/routes';

type PlaceholderPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  backTo?: string;
  technical?: boolean;
  children?: ReactNode;
};

export function PlaceholderPage({
  title,
  eyebrow,
  description,
  backTo,
  technical = false,
  children,
}: PlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <PageHeader title={title} backTo={backTo} actionLabel="Map" actionTo="/marketplace" />

      <div className={`placeholder-card ${technical ? 'placeholder-card--technical' : ''}`}>
        <div className="placeholder-card__meta">
          <span className="placeholder-card__eyebrow">{eyebrow}</span>
          <StatusBadge label={technical ? 'IDENTITY' : 'PLINTO'} tone={technical ? 'technical' : 'default'} />
        </div>

        <h2 className="placeholder-card__title">{title}</h2>
        <p className="placeholder-card__description">{description}</p>

        <div className="placeholder-card__chips">
          <CategoryChip label="Minimalism" active />
          <CategoryChip label="Verified" />
          <CategoryChip label="Demo" />
        </div>

        {children}

        <div className="placeholder-card__actions">
          <PrimaryButton>Primary Action</PrimaryButton>
          <SecondaryButton>Secondary Action</SecondaryButton>
        </div>
      </div>

      <div className="component-preview">
        <h3 className="route-map__title">Reusable components</h3>
        <div className="component-preview__grid">
          <ArtworkCard
            artwork={artworks[0]}
            artistName={artists.find((artist) => artist.id === artworks[0].artistId)?.name ?? 'Unknown artist'}
            to="/marketplace/artwork/yellow-tide"
          />
          <ArtistCard artist={artists[4]} />
          <EventInvitationCard event={events[0]} invitation={invitations[0]} />
          {technical ? (
            <RecordAccordion record={identityRecords[0]} />
          ) : (
            <ScanOverlay />
          )}
        </div>
      </div>

      <div className="route-map">
        <h3 className="route-map__title">Available routes</h3>
        <div className="route-map__list">
          {demoRoutes.map((route) => (
            <Link className="route-map__item" key={route.path} to={route.path}>
              <span className="route-map__item-title">{route.title}</span>
              <span className="route-map__item-description">{route.description}</span>
            </Link>
          ))}
        </div>
      </div>

      <BottomActionBar
        items={[
          { label: 'Login', to: '/login' },
          { label: 'Market', to: '/marketplace' },
          { label: 'Scan', to: '/scan' },
          { label: 'Profile', to: '/profile/collector-01' },
        ]}
      />
    </section>
  );
}
