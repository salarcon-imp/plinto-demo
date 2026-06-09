import { Link, useParams } from 'react-router-dom';
import { IdentityScreen } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { getRecordById } from '../../utils/plinto';

export function IdentityRecordPage() {
  const { recordId } = useParams();
  const record = getRecordById(recordId);

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

  return (
    <MockupScreen alt="Plinto identity screen" className="zip-identity" imageSrc={IdentityScreen}>
      <Link className="hotspot hotspot--identity-back" to="/marketplace">
        <span className="sr-only">Back to marketplace</span>
      </Link>
      <Link className="hotspot hotspot--identity-open-artpiece" to="/artpiece/yellow-tide">
        <span className="sr-only">Open artpiece profile</span>
      </Link>
    </MockupScreen>
  );
}
