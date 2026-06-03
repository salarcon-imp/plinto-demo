import type { VisualSurface } from './visual';

export type UserRole =
  | 'collector'
  | 'gallery'
  | 'artist'
  | 'investor'
  | 'stakeholder';

export type User = {
  id: string;
  slug: string;
  name: string;
  role: UserRole;
  city: string;
  memberSince: string;
  headline: string;
  bioShort: string;
  savedArtworkIds: string[];
  attendingEventIds: string[];
  avatar: VisualSurface;
};
