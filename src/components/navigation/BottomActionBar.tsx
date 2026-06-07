import { NavLink } from 'react-router-dom';

type BottomActionBarItem = {
  label: string;
  to: string;
};

type BottomActionBarProps = {
  items: BottomActionBarItem[];
};

export function BottomActionBar({ items }: BottomActionBarProps) {
  const renderIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
      case 'market':
        return (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.8v-6.2H9.8V21H5a1 1 0 0 1-1-1z" />
          </svg>
        );
      case 'search':
      case 'scan':
        return (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        );
      case 'notifications':
      case 'invite':
        return (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 4.5a4.5 4.5 0 0 0-4.5 4.5v2.2c0 1-.28 1.97-.81 2.82L5.6 15.9A1 1 0 0 0 6.45 17h11.1a1 1 0 0 0 .85-1.52l-1.09-1.79a5.4 5.4 0 0 1-.81-2.82V9A4.5 4.5 0 0 0 12 4.5Z" />
            <path d="M9.8 18.2a2.4 2.4 0 0 0 4.4 0" />
          </svg>
        );
      case 'profile':
      default:
        return (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.8" />
            <path d="M5 19.2a7.2 7.2 0 0 1 14 0" />
          </svg>
        );
    }
  };

  return (
    <nav className="bottom-action-bar" aria-label="Primary">
      {items.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `bottom-action-bar__item ${isActive ? 'bottom-action-bar__item--active' : ''}`.trim()
          }
          end={item.to === '/marketplace'}
          key={item.to}
          to={item.to}
        >
          <span className="bottom-action-bar__icon">{renderIcon(item.label)}</span>
          <span className="bottom-action-bar__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
