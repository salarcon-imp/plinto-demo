import type { VisualSurface } from './visual';

export type Artist = {
  id: string;
  slug: string;
  name: string;
  nationality: string;
  city: string;
  birthYear?: number;
  bioShort: string;
  bioLong: string;
  specialties: string[];
  avatar: VisualSurface;
  featuredArtworkIds: string[];
};
