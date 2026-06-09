import { Link, useParams } from 'react-router-dom';
import {
  ArtPiece1,
  ArtPiece2,
  ArtPiece3,
  ArtPiece4,
  ArtPiece5,
  ArtPiece6,
  ArtPiece7,
  ArtPiece8,
} from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';
import { NotFoundState } from '../../components/feedback/NotFoundState';

const ARTPIECE_SCREENS: Record<string, string> = {
  'warrior-2': ArtPiece1,
  smokey: ArtPiece2,
  'yellow-tide': ArtPiece3,
  'family-mundane': ArtPiece4,
  acb: ArtPiece5,
  edipo: ArtPiece6,
  'identidades-civic': ArtPiece7,
  'identidades-nocturne': ArtPiece8,
};

export function ArtworkProfilePage() {
  const { artworkId } = useParams();
  const screenImage = artworkId ? ARTPIECE_SCREENS[artworkId] : null;

  if (!screenImage) {
    return (
      <NotFoundState
        description="The requested artpiece profile is not available in the official ZIP variants."
        primaryLabel="Return to marketplace"
        primaryTo="/marketplace"
        title="Artpiece not found"
      />
    );
  }

  return (
    <MockupScreen alt="Plinto artpiece profile screen" className="zip-artpiece" imageSrc={screenImage}>
      <Link className="hotspot hotspot--artpiece-back" to="/marketplace">
        <span className="sr-only">Back to marketplace</span>
      </Link>
      <Link className="hotspot hotspot--artpiece-arrow" to="/identity/record-yellow-tide">
        <span className="sr-only">Open identity</span>
      </Link>
      <button className="hotspot hotspot--artpiece-favorite" type="button">
        <span className="sr-only">Favorite artwork</span>
      </button>
      <Link className="hotspot hotspot--artpiece-inquire" to="/artscan">
        <span className="sr-only">Open art scan</span>
      </Link>
    </MockupScreen>
  );
}
