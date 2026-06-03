import { Link } from 'react-router-dom';

type PageHeaderProps = {
  title: string;
  backTo?: string;
  actionLabel?: string;
  actionTo?: string;
};

export function PageHeader({
  title,
  backTo,
  actionLabel,
  actionTo,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__side">
        {backTo ? (
          <Link className="page-header__icon-button" to={backTo} aria-label="Go back">
            <span aria-hidden="true">←</span>
          </Link>
        ) : (
          <span className="page-header__spacer" aria-hidden="true" />
        )}
      </div>
      <div className="page-header__title-wrap">
        <h1 className="page-header__title">{title}</h1>
      </div>
      <div className="page-header__side page-header__side--end">
        {actionLabel && actionTo ? (
          <Link className="page-header__action-link" to={actionTo}>
            {actionLabel}
          </Link>
        ) : (
          <span className="page-header__spacer" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
