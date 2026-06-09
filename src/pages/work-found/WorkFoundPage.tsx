import { Link } from 'react-router-dom';
import { WorkFoundScreen } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

export function WorkFoundPage() {
  return (
    <MockupScreen alt="Plinto work found screen" className="zip-workfound" imageSrc={WorkFoundScreen}>
      <Link className="hotspot hotspot--workfound-open-artpiece" to="/artpiece/yellow-tide">
        <span className="sr-only">Open artpiece profile</span>
      </Link>
      <Link className="hotspot hotspot--workfound-open-marketplace" to="/marketplace">
        <span className="sr-only">Return to marketplace</span>
      </Link>
      <Link className="hotspot hotspot--workfound-open-identity" to="/identity/record-yellow-tide">
        <span className="sr-only">Open identity record</span>
      </Link>
    </MockupScreen>
  );
}
