import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { ArtworkCard } from '../../components/cards/ArtworkCard';
import { EventInvitationCard } from '../../components/cards/EventInvitationCard';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { PageHeader } from '../../components/navigation/PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getVisualStyle } from '../../utils/visuals';
import {
  getArtistById,
  getArtworksByIds,
  getEventById,
  getInvitationsByUserId,
  getUserById,
} from '../../utils/plinto';

export function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const user = getUserById(userId);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.user-profile-page > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: 0.07,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  if (!user) {
    return (
      <NotFoundState
        description="The selected user is not included in the current demo profile set."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="User profile not found"
      />
    );
  }

  const savedArtworks = getArtworksByIds(user.savedArtworkIds);
  const profileInvitations = getInvitationsByUserId(user.id);
  const invitationEvents = profileInvitations.reduce<
    Array<{ invitation: (typeof profileInvitations)[number]; event: NonNullable<ReturnType<typeof getEventById>> }>
  >((accumulator, invitation) => {
    const event = getEventById(invitation.eventId);

    if (event) {
      accumulator.push({ invitation, event });
    }

    return accumulator;
  }, []);

  return (
    <section className="user-profile-page" ref={pageRef}>
      <PageHeader backTo="/marketplace" title="User Profile" />

      <div className="user-profile-hero">
        <div className="user-profile-hero__avatar" style={getVisualStyle(user.avatar)} />
        <div className="user-profile-hero__content">
          <span className="user-profile-hero__role">{user.role}</span>
          <h1 className="user-profile-hero__name">{user.name}</h1>
          <p className="user-profile-hero__headline">{user.headline}</p>
          <p className="user-profile-hero__meta">
            {user.city} · Member since {new Date(user.memberSince).getFullYear()}
          </p>
        </div>
      </div>

      <section className="user-profile-section">
        <div className="user-profile-stats">
          <article className="user-profile-stats__card">
            <span className="user-profile-stats__label">Collection</span>
            <strong>{savedArtworks.length}</strong>
          </article>
          <article className="user-profile-stats__card">
            <span className="user-profile-stats__label">Invitations</span>
            <strong>{profileInvitations.length}</strong>
          </article>
          <article className="user-profile-stats__card">
            <span className="user-profile-stats__label">Activity</span>
            <strong>{user.attendingEventIds.length}</strong>
          </article>
        </div>
      </section>

      <section className="user-profile-section">
        <div className="user-profile-section__head">
          <span className="user-profile-section__eyebrow">Favorites</span>
        </div>
        <div className="user-profile-grid">
          {savedArtworks.map((artwork) => {
            const artist = getArtistById(artwork.artistId);

            return (
              <ArtworkCard
                artistName={artist?.name ?? 'Unknown artist'}
                artwork={artwork}
                badgeLabel={artwork.identityRecordId ? 'Identified' : 'On view'}
                key={artwork.id}
                to={`/marketplace/artwork/${artwork.slug}`}
              />
            );
          })}
        </div>
      </section>

      <section className="user-profile-section">
        <div className="user-profile-section__head">
          <span className="user-profile-section__eyebrow">Invitations</span>
        </div>
        <div className="user-profile-invitations">
          {invitationEvents.map(({ invitation, event }) => (
            <EventInvitationCard
              event={event}
              invitation={invitation}
              key={invitation.id}
              onPrimaryClick={() => navigate('/marketplace')}
              primaryLabel="Open marketplace"
              secondaryLabel="Keep browsing"
            />
          ))}
        </div>
      </section>
    </section>
  );
}
