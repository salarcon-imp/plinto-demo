import type { DemoRoute } from '../types/navigation';

export const demoRoutes: DemoRoute[] = [
  { title: 'Splash', path: '/splash', description: 'Brand entry point' },
  { title: 'Onboarding', path: '/onboarding', description: 'Introductory flow' },
  { title: 'Login', path: '/login', description: 'Email access shell' },
  { title: 'Invitation', path: '/invitation', description: 'Event reservation state' },
  { title: 'Marketplace', path: '/marketplace', description: 'Artwork discovery shell' },
  {
    title: 'Artwork Profile',
    path: '/marketplace/artwork/yellow-tide',
    description: 'Artwork detail shell',
  },
  {
    title: 'Identity Record',
    path: '/identity/record-yellow-tide',
    description: 'Technical identity shell',
  },
  { title: 'Scan Piece', path: '/scan', description: 'Scan interaction shell' },
  {
    title: 'Work Found',
    path: '/scan/found/yellow-tide',
    description: 'Scan confirmation shell',
  },
  {
    title: 'User Profile',
    path: '/profile/collector-01',
    description: 'Inferred user profile shell',
  },
];
