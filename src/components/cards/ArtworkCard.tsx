import { Link } from 'react-router-dom';
import type { Artwork } from '../../types/artwork';
import { getVisualStyle } from '../../utils/visuals';

type ArtworkCardProps = {
  artwork: Artwork;
  artistName: string;
  to?: string;
  badgeLabel?: string;
};

function getMarketplaceState(artwork: Artwork) {
  if (artwork.availability === 'in-collection') {
    return 'In Collection';
  }

  return `${artwork.identityRecordId ? 'Verified' : 'Identified'}  |  ${
    artwork.availability === 'reserved' ? 'Reserved' : 'Available'
  }`;
}

export function ArtworkCard({ artwork, artistName, to }: ArtworkCardProps) {
  const content = (
    <article className="artwork-card">
      <div className="artwork-card__visual" style={getVisualStyle(artwork.visual)} />
      <div className="artwork-card__body">
        <span className="artwork-card__artist">{artistName}</span>
        <h3 className="artwork-card__title">{artwork.title}</h3>
        <p className="artwork-card__details">
          {artwork.medium} on {artwork.support.toLowerCase()}, {artwork.year}
        </p>
        <div className="artwork-card__footer">{getMarketplaceState(artwork)}</div>
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
