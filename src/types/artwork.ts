import type { VisualSurface } from './visual';

export type ArtworkAvailability =
  | 'available'
  | 'in-collection'
  | 'reserved'
  | 'on-view';

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  year: number;
  originCountry: string;
  medium: string;
  support: string;
  dimensionsCm: {
    width: number;
    height: number;
    depth?: number;
  };
  edition: string;
  categoryIds: string[];
  summary: string;
  availability: ArtworkAvailability;
  identityRecordId?: string;
  inquiryEnabled: boolean;
  featured: boolean;
  visual: VisualSurface;
  priceUsd?: number;
};
