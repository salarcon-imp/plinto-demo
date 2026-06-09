import { Link } from 'react-router-dom';
import { HomeScreen } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

export function HomePage() {
  return (
    <MockupScreen alt="Plinto home screen" className="zip-home" imageSrc={HomeScreen}>
      <Link className="hotspot hotspot--home-cta" to="/onboarding">
        <span className="sr-only">Open onboarding</span>
      </Link>
    </MockupScreen>
  );
}
