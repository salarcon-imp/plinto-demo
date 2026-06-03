import { Link } from 'react-router-dom';
import type { Artwork } from '../../types/artwork';
import { getVisualStyle } from '../../utils/visuals';
import { IdentityBadge } from '../identity/IdentityBadge';
import { StatusBadge } from '../feedback/StatusBadge';

type ArtworkCardProps = {
  artwork: Artwork;
  artistName: string;
  to?: string;
  badgeLabel?: string;
};

export function ArtworkCard({
  artwork,
  artistName,
  to,
  badgeLabel = 'Identified',
}: ArtworkCardProps) {
  const content = (
    <article className="artwork-card">
      <div className="artwork-card__visual" style={getVisualStyle(artwork.visual)}>
        <div className="artwork-card__visual-glow" />
      </div>
      <div className="artwork-card__body">
        <div className="artwork-card__meta">
          <span className="artwork-card__artist">{artistName}</span>
          {artwork.identityRecordId ? <IdentityBadge label={badgeLabel} compact /> : null}
        </div>
        <h3 className="artwork-card__title">{artwork.title}</h3>
        <p className="artwork-card__details">
          {artwork.medium} on {artwork.support}, {artwork.year}
        </p>
        <div className="artwork-card__footer">
          <StatusBadge
            label={artwork.availability.replace('-', ' ')}
            tone={artwork.availability === 'available' ? 'success' : 'default'}
          />
          {artwork.priceUsd ? (
            <span className="artwork-card__price">${artwork.priceUsd.toLocaleString()}</span>
          ) : null}
        </div>
      </div>
    </article>
  );

  if (to) {
    return (
      <Link className="artwork-card__link" to={to}>
        {content}
      </Link>
    );
  }

  return content;
}
