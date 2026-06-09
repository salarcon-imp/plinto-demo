import { Link } from 'react-router-dom';
import { MarketplaceScreen } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

const CARD_ROUTES = [
  { id: 'warrior-2', className: 'hotspot--market-card-1' },
  { id: 'smokey', className: 'hotspot--market-card-2' },
  { id: 'acb', className: 'hotspot--market-card-3' },
  { id: 'family-mundane', className: 'hotspot--market-card-4' },
  { id: 'identidades-civic', className: 'hotspot--market-card-5' },
  { id: 'edipo', className: 'hotspot--market-card-6' },
];

export function MarketplacePage() {
  return (
    <MockupScreen alt="Plinto marketplace screen" className="zip-marketplace" imageSrc={MarketplaceScreen}>
      {CARD_ROUTES.map((item) => (
        <Link className={`hotspot ${item.className}`} key={item.id} to={`/artpiece/${item.id}`}>
          <span className="sr-only">Open artwork {item.id}</span>
        </Link>
      ))}

      <Link className="hotspot hotspot--market-center" to="/identity/record-yellow-tide">
        <span className="sr-only">Open Plinto identity</span>
      </Link>
    </MockupScreen>
  );
}
