import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { brandAssets } from '../../assets/logos';
import { EventInvitationCard } from '../../components/cards/EventInvitationCard';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { PageHeader } from '../../components/navigation/PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { invitations } from '../../data';
import { formatLongDate, getEventById, getUserById } from '../../utils/plinto';

export function InvitationPage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const invitation = invitations[0];
  const event = invitation ? getEventById(invitation.eventId) : undefined;
  const user = invitation ? getUserById(invitation.userId) : undefined;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.invitation-page > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  if (!invitation || !event || !user) {
    return (
      <NotFoundState
        description="There is no active invitation available in the current demo package."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Invitation not found"
      />
    );
  }

  return (
    <section className="invitation-page" ref={pageRef}>
      <PageHeader backTo="/marketplace" title="Invitation" />

      <div className="invitation-page__hero">
        <img alt="Plinto" className="invitation-page__logo invitation-page__logo--light" src={brandAssets.OfficialLogo} />
        <span className="invitation-page__eyebrow">Exclusive access</span>
        <h1 className="invitation-page__title">You have a place on the plinth.</h1>
        <p className="invitation-page__description">
          A private invitation prepared for {user.name}, designed to preview verified works and the
          live identity experience.
        </p>
      </div>

      <button
        className={`invitation-summary ${expanded ? 'invitation-summary--expanded' : ''}`.trim()}
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <div className="invitation-summary__content">
          <span className="invitation-summary__label">
            {expanded ? 'Invitation open' : 'Selected invitation'}
          </span>
          <p className="invitation-summary__title">{event.title}</p>
          <p className="invitation-summary__meta">
            {formatLongDate(event.startsAt)} · {event.venue} · {event.city}
          </p>
        </div>
        <span className="invitation-summary__toggle" aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded ? (
        <EventInvitationCard
          event={event}
          invitation={invitation}
          onPrimaryClick={() => navigate('/marketplace')}
          onSecondaryClick={() => setExpanded(false)}
          primaryLabel="Reserve My Spot"
          secondaryLabel="Collapse"
        />
      ) : (
        <div className="invitation-collapsed-card">
          <span className="invitation-collapsed-card__eyebrow">Event details</span>
          <div className="invitation-collapsed-card__grid">
            <div>
              <span className="invitation-collapsed-card__label">Date</span>
              <span>{formatLongDate(event.startsAt)}</span>
            </div>
            <div>
              <span className="invitation-collapsed-card__label">Time</span>
              <span>
                {new Date(event.startsAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div>
              <span className="invitation-collapsed-card__label">Place</span>
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
