import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';

export function HomePage() {
  return (
    <section className="intro-home">
      <div className="intro-home__content">
        <img alt="Plinto" className="intro-home__logo intro-home__logo--light" src={brandAssets.OfficialLogo} />
        <p className="intro-home__subtitle">Bienvenido de regreso</p>
      </div>

      <Link aria-label="Abrir login" className="intro-home__cta" to="/login">
        <ArrowUp size={24} strokeWidth={1.7} />
      </Link>
    </section>
  );
}
