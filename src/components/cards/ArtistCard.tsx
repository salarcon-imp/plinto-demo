import type { Artist } from '../../types/artist';
import { getVisualStyle } from '../../utils/visuals';

type ArtistCardProps = {
  artist: Artist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <article className="artist-card">
      <div className="artist-card__avatar" style={getVisualStyle(artist.avatar)} />
      <div className="artist-card__body">
        <p className="artist-card__name">{artist.name}</p>
        <p className="artist-card__location">
          {artist.city}, {artist.nationality}
        </p>
        <p className="artist-card__bio">{artist.bioShort}</p>
        <div className="artist-card__specialties">
          {artist.specialties.slice(0, 3).map((specialty) => (
            <span className="artist-card__specialty" key={specialty}>
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
