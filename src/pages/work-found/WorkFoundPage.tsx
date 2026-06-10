import { Link, useParams } from 'react-router-dom';
import VerifiedPlinto from '../../assets/ui/verified-plinto-latest.png';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { getArtworkBySlug } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

export function WorkFoundPage() {
  const { artworkId } = useParams();
  const artwork = getArtworkBySlug(artworkId);

  if (!artwork) {
    return (
      <NotFoundState
        description="The scanned work is not available in this demo."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Work not found"
      />
    );
  }
  const visualStyle = {
    ...getVisualStyle(artwork.visual),
    aspectRatio: `${artwork.dimensionsCm.width} / ${artwork.dimensionsCm.height}`,
  };

  return (
    <section className="app-workfound-v2">
      <div className="app-workfound-v2__card">
        <div className="app-workfound-v2__badge">
          <img alt="Verified Plinto" src={VerifiedPlinto} />
          <span>Identified</span>
        </div>

        <div className="app-workfound-v2__copy">
          <h1>This work is on the plinth.</h1>
          <p>Its record is permanent and cannot be altered.</p>
        </div>

        <div className="app-workfound-v2__visual" style={visualStyle} />

        <div className="app-workfound-v2__meta">
          <strong>{artwork.title}</strong>
          <span>{artwork.originCountry}, {artwork.year}</span>
        </div>

        <div className="app-workfound-v2__actions">
          <Link className="app-workfound-v2__primary" to={`/artpiece/${artwork.slug}`}>
            See work profile
          </Link>
          <Link className="app-workfound-v2__ghost" to="/marketplace">
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}
