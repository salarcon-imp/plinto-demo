import type { Event } from '../../types/event';
import type { Invitation } from '../../types/invitation';
import { getVisualStyle } from '../../utils/visuals';
import { PrimaryButton } from '../primitives/PrimaryButton';
import { SecondaryButton } from '../primitives/SecondaryButton';
import { StatusBadge } from '../feedback/StatusBadge';

type EventInvitationCardProps = {
  event: Event;
  invitation: Invitation;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export function EventInvitationCard({
  event,
  invitation,
  primaryLabel = 'Reserve my place',
  secondaryLabel = 'Review details',
  onPrimaryClick,
  onSecondaryClick,
}: EventInvitationCardProps) {
  return (
    <article className="event-invitation-card">
      <div className="event-invitation-card__visual" style={getVisualStyle(event.visual)}>
        <StatusBadge
          label={invitation.status}
          tone={invitation.status === 'confirmed' ? 'success' : 'default'}
        />
      </div>
      <div className="event-invitation-card__body">
        <p className="event-invitation-card__title">{event.title}</p>
        <p className="event-invitation-card__summary">{event.summary}</p>
        <div className="event-invitation-card__details">
          <div>
            <span className="event-invitation-card__label">Date</span>
            <span>{new Date(event.startsAt).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="event-invitation-card__label">Venue</span>
            <span>{event.venue}</span>
          </div>
          <div>
            <span className="event-invitation-card__label">Seats</span>
            <span>{invitation.seatsReserved}</span>
          </div>
        </div>
        <p className="event-invitation-card__note">{invitation.note}</p>
        <div className="event-invitation-card__actions">
          <PrimaryButton onClick={onPrimaryClick}>{primaryLabel}</PrimaryButton>
          <SecondaryButton onClick={onSecondaryClick}>{secondaryLabel}</SecondaryButton>
        </div>
      </div>
    </article>
  );
}
