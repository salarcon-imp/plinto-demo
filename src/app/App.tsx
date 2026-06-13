import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

export function App() {
  const location = useLocation();
  const isDarkSurfaceRoute =
    location.pathname.startsWith('/artpiece/') ||
    location.pathname.startsWith('/identity/') ||
    location.pathname.startsWith('/artscan');

  useEffect(() => {
    const background = isDarkSurfaceRoute ? '#0d0e11' : '#f5f5f3';
    const themeMeta = document.querySelector('meta[name="theme-color"]') ?? document.createElement('meta');

    if (!themeMeta.getAttribute('name')) {
      themeMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeMeta);
    }

    document.documentElement.style.backgroundColor = background;
    document.body.style.backgroundColor = background;
    themeMeta.setAttribute('content', background);

    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      themeMeta.setAttribute('content', '#f5f5f3');
    };
  }, [isDarkSurfaceRoute]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
