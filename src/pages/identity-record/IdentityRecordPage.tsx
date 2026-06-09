import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';
import VerifiedPlinto from '../../assets/ui/verified-plinto-latest.png';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { artworks } from '../../data';
import {
  formatArtworkDimensions,
  formatLongDate,
  formatTechnicalTimestamp,
  getArtworkById,
  getArtistById,
  getRecordById,
} from '../../utils/plinto';
import { getVisualStyle } from '../../utils/visuals';

export function IdentityRecordPage() {
  const { recordId } = useParams();
  const record = getRecordById(recordId);
  const [custodyOpen, setCustodyOpen] = useState(false);

  if (!record) {
    return (
      <NotFoundState
        description="The requested identity view is not available in this demo package."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Identity not found"
      />
    );
  }

  const artwork = getArtworkById(record.artworkId) ?? artworks[0];
  const artist = getArtistById(artwork.artistId);

  return (
    <section className="app-identity-v2">
      <div className="intro-home__status intro-home__status--light">
        <span>9:41</span>
        <span className="intro-home__status-icons intro-home__status-icons--light" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <header className="app-identity-v2__header">
        <Link className="app-identity-v2__icon" to="/marketplace">
          <ArrowLeft size={21} strokeWidth={1.8} />
        </Link>
        <div className="app-identity-v2__header-copy">
          <h1>The Identity</h1>
        </div>
        <Link className="app-identity-v2__brand" to={`/artpiece/${artwork.slug}`}>
          <img alt="Plinto" src={brandAssets.WordMarkBone} />
        </Link>
      </header>

      <div className="app-identity-v2__hero">
        <div className="app-identity-v2__visual" style={getVisualStyle(artwork.visual)} />
        <div className="app-identity-v2__hero-copy">
          <div>
            <h2>{artwork.title}</h2>
            <p className="app-identity-v2__meta">
              {artwork.originCountry}, {artwork.year}
            </p>
            <p className="app-identity-v2__spec">
              {artwork.medium} on {artwork.support.toLowerCase()} &nbsp;|&nbsp; {formatArtworkDimensions(
                artwork.dimensionsCm.width,
                artwork.dimensionsCm.height,
                artwork.dimensionsCm.depth,
              )} &nbsp;|&nbsp; {artwork.edition}
            </p>
          </div>
          <div className="app-artpiece__identified">
            <img alt="Verified Plinto" className="app-artpiece__verified" src={VerifiedPlinto} />
            <span>Identified</span>
          </div>
        </div>
      </div>

      <div className="app-identity-v2__stack">
        <section className="app-artpiece__panel app-artpiece__panel--identity">
          <button className="app-artpiece__panel-header" type="button">
            <span>THE RECORD</span>
            <span className="app-artpiece__panel-chevron">⌄</span>
          </button>
          <div className="app-identity-v2__record-body">
            <div className="app-identity-v2__facts">
              <div className="app-identity-v2__fact">
                <span>THE MAKER</span>
                <strong>{artist?.name ?? 'Unknown artist'}</strong>
              </div>
              <div className="app-identity-v2__fact">
                <span>CURRENT KEEPER</span>
                <strong>{record.currentKeeper}</strong>
              </div>
              <div className="app-identity-v2__fact">
                <span>PLINTED</span>
                <strong>{formatLongDate(record.mintedAt)}</strong>
              </div>
              <div className="app-identity-v2__fact">
                <span>WORK ID</span>
                <strong>#{record.certificateId.split('-').at(-1)}</strong>
              </div>
            </div>

            <div className="app-identity-v2__technical-card">
              <div className="app-identity-v2__technical-line">
                <span>RECORD ID</span>
                <strong>{record.recordId}</strong>
              </div>
              <div className="app-identity-v2__technical-line">
                <span>HASH</span>
                <strong>{record.hash}</strong>
              </div>
              <div className="app-identity-v2__technical-line">
                <span>BLOCK</span>
                <strong>#{record.blockNumber}</strong>
              </div>
              <div className="app-identity-v2__technical-line">
                <span>TIMESTAMP</span>
                <strong>{formatTechnicalTimestamp(record.mintedAt)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="app-artpiece__panel app-artpiece__panel--identity">
          <button className="app-artpiece__panel-header" onClick={() => setCustodyOpen((current) => !current)} type="button">
            <span>CHAIN OF CUSTODY</span>
            <span className="app-artpiece__panel-chevron">{custodyOpen ? '⌄' : '›'}</span>
          </button>
          {custodyOpen ? (
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
          ) : null}
        </section>

        <Link className="app-identity-v2__back-link" to={`/artpiece/${artwork.slug}`}>
          Back to artwork
        </Link>
      </div>
    </section>
  );
}
