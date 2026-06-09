import { Link, useParams } from 'react-router-dom';
import VerifiedPlinto from '../../assets/ui/verified-plinto-latest.png';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { getArtworkBySlug, getRecordByArtworkId } from '../../utils/plinto';
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

  const record = getRecordByArtworkId(artwork.id);

  return (
    <section className="app-workfound-v2">
      <div className="intro-home__status">
        <span>9:41</span>
        <span className="intro-home__status-icons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="app-workfound-v2__card">
        <div className="app-workfound-v2__badge">
          <img alt="Verified Plinto" src={VerifiedPlinto} />
          <span>Identified</span>
        </div>

        <div className="app-workfound-v2__copy">
          <p>Work found</p>
          <h1>This work is on the plinth.</h1>
          <p>Its record is permanent and cannot be altered.</p>
        </div>

        <div className="app-workfound-v2__visual" style={getVisualStyle(artwork.visual)} />

        <div className="app-workfound-v2__meta">
          <strong>{artwork.title}</strong>
          <span>{artwork.originCountry}, {artwork.year}</span>
        </div>

        <div className="app-workfound-v2__actions">
          {record ? (
            <Link className="app-workfound-v2__secondary" to={`/identity/${record.id}`}>
              Open Identity
            </Link>
          ) : null}
          <Link className="app-workfound-v2__primary" to={`/artpiece/${artwork.slug}`}>
            Open ArtPiece
          </Link>
          <Link className="app-workfound-v2__ghost" to="/marketplace">
            Back to Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}
