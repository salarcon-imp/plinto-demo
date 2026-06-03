import { Link } from 'react-router-dom';
import { PrimaryButton } from '../primitives/PrimaryButton';
import { SecondaryButton } from '../primitives/SecondaryButton';

type NotFoundStateProps = {
  title: string;
  description: string;
  primaryTo: string;
  primaryLabel: string;
  secondaryTo?: string;
  secondaryLabel?: string;
};

export function NotFoundState({
  title,
  description,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
}: NotFoundStateProps) {
  return (
    <section className="not-found-state">
      <div className="not-found-state__panel">
        <span className="not-found-state__eyebrow">Not found</span>
        <h1 className="not-found-state__title">{title}</h1>
        <p className="not-found-state__description">{description}</p>
        <div className="not-found-state__actions">
          <Link to={primaryTo}>
            <PrimaryButton>{primaryLabel}</PrimaryButton>
          </Link>
          {secondaryTo && secondaryLabel ? (
            <Link to={secondaryTo}>
              <SecondaryButton>{secondaryLabel}</SecondaryButton>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
