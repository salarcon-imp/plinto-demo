import { NavLink } from 'react-router-dom';

type BottomActionBarItem = {
  label: string;
  to: string;
};

type BottomActionBarProps = {
  items: BottomActionBarItem[];
};

export function BottomActionBar({ items }: BottomActionBarProps) {
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
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
