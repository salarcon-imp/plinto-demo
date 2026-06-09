import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';

export function HomePage() {
  return (
    <section className="intro-home">
      <div className="intro-home__status">
        <span>9:41</span>
        <span className="intro-home__status-icons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="intro-home__content">
        <img alt="Plinto" className="intro-home__logo" src={brandAssets.WordMarkBlack} />
        <p className="intro-home__subtitle">Welcome back</p>
      </div>

      <Link aria-label="Open onboarding" className="intro-home__cta" to="/onboarding">
        <ArrowUp size={24} strokeWidth={1.7} />
      </Link>
    </section>
  );
}
