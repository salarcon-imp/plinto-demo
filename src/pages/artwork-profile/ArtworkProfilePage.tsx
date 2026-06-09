import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ArrowUpIcon from '../../assets/icons/artpiece-arrow-up.svg';
import ChevronLeftIcon from '../../assets/icons/artpiece-chevron-left.svg';
import HeartIcon from '../../assets/icons/artpiece-heart.svg';
import VerifiedPlinto from '../../assets/ui/verified-plinto-latest.png';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { artworks } from '../../data';
import { formatArtworkDimensions, formatLongDate, getArtistById, getArtworkBySlug, getRecordByArtworkId } from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

function formatCategoryLabel(value?: string) {
  if (!value) {
    return 'Abstract';
  }

  switch (value) {
    case 'geometric':
      return 'Cubism';
    case 'figurative':
      return 'Figurative';
    case 'identity':
      return 'Identity';
    case 'minimalism':
      return 'Minimalism';
    default:
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export function ArtworkProfilePage() {
  const { artworkId } = useParams();
  const artwork = getArtworkBySlug(artworkId) ?? artworks.find((item) => item.slug === artworkId);

  if (!artwork) {
    return (
      <NotFoundState
        description="The requested artpiece profile is not available."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Artpiece not found"
      />
    );
  }

  const artist = getArtistById(artwork.artistId);
  const record = getRecordByArtworkId(artwork.id);
  const hasInquiryCta = artwork.slug !== 'yellow-tide' && artwork.inquiryEnabled;

  return (
    <section className="app-artpiece">
      <div className="intro-home__status intro-home__status--light">
        <span>9:41</span>
        <span className="intro-home__status-icons intro-home__status-icons--light" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <header className="app-artpiece__header">
        <Link className="app-artpiece__icon app-artpiece__icon--back" to="/marketplace">
          <img alt="Back" src={ChevronLeftIcon} />
        </Link>
        <div />
        <div className="app-artpiece__header-actions">
          <Link className="app-artpiece__icon app-artpiece__icon--arrow" to={record ? `/identity/${record.id}` : '/marketplace'}>
            <img alt="Open identity" src={ArrowUpIcon} />
          </Link>
          <button className="app-artpiece__icon app-artpiece__icon--heart" type="button">
            <img alt="Favorite" src={HeartIcon} />
          </button>
        </div>
      </header>

      <div className="app-artpiece__visual" style={getVisualStyle(artwork.visual)} />

      <div className="app-artpiece__body">
        <div className="app-artpiece__title-row">
          <div>
            <h1>{artwork.title}</h1>
            <p className="app-artpiece__location">{artwork.originCountry}, {artwork.year}</p>
            <p className="app-artpiece__spec">
              {artwork.medium} on {artwork.support.toLowerCase()} &nbsp;|&nbsp; {formatArtworkDimensions(
                artwork.dimensionsCm.width,
                artwork.dimensionsCm.height,
                artwork.dimensionsCm.depth,
              )} &nbsp;|&nbsp; {formatCategoryLabel(artwork.categoryIds[0])} &nbsp;|&nbsp; {artwork.edition}
            </p>
          </div>
          <div className="app-artpiece__identified">
            <img alt="Verified Plinto" className="app-artpiece__verified" src={VerifiedPlinto} />
            <span>Identified</span>
          </div>
        </div>

        <div className="app-artpiece__description-block">
          <p className="app-artpiece__description">{artwork.summary}</p>
          <button className="app-artpiece__readmore" type="button">READ MORE →</button>
        </div>

        {artist ? (
          <div className="app-artpiece__maker">
            <div className="app-artpiece__maker-card">
              <div className="app-artpiece__maker-content">
                <div className="app-artpiece__maker-avatar" style={getVisualStyle(artist.avatar)} />
                <div className="app-artpiece__maker-copy">
                  <p className="app-artpiece__section">ABOUT THE MAKER</p>
                  <p className="app-artpiece__maker-name">{artist.name}</p>
                </div>
              </div>
              <ArrowRight className="app-artpiece__maker-arrow" size={24} strokeWidth={1.8} />
            </div>
          </div>
        ) : null}

        {record ? (
          <>
            <section className="app-artpiece__panel">
              <button className="app-artpiece__panel-header" type="button">
                <span>THE RECORD</span>
                <span className="app-artpiece__panel-chevron">⌄</span>
              </button>
              <div className="app-artpiece__panel-body">
                <div className="app-artpiece__record-row">
                  <span>HASH</span>
                  <strong>{record.hash}</strong>
                </div>
                <div className="app-artpiece__record-row">
                  <span>PLINTED</span>
                  <strong>{formatLongDate(record.mintedAt)}</strong>
                </div>
              </div>
            </section>

            <section className="app-artpiece__panel">
              <button className="app-artpiece__panel-header" type="button">
                <span>CHAIN OF CUSTODY</span>
                <span className="app-artpiece__panel-chevron">⌄</span>
              </button>
              <div className="app-artpiece__custody-list">
                {record.custody.map((entry) => (
                  <div className="app-artpiece__custody-item" key={entry.id}>
                    <span className="app-artpiece__custody-dot" />
                    <span className="app-artpiece__custody-year">{new Date(entry.date).getFullYear()}</span>
                    <span className="app-artpiece__custody-text">
                      {entry.action === 'created'
                        ? 'Created by Maker'
                        : entry.action === 'verified'
                          ? 'Acquired by first Keeper'
                          : entry.action === 'exhibited'
                            ? 'Exhibited at SMO Gallery'
                            : entry.action === 'transferred'
                              ? 'Transferred to current Keeper'
                              : `${entry.action.charAt(0).toUpperCase()}${entry.action.slice(1)} by ${entry.actor}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

      </div>

      {hasInquiryCta ? (
        <div className="app-artpiece__offer">
          <Link className="app-artpiece__offer-button" to="/artscan">
            Inquire
          </Link>
        </div>
      ) : null}
    </section>
  );
}
