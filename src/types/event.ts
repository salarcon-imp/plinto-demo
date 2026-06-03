import type { VisualSurface } from './visual';

export type Event = {
  id: string;
  slug: string;
  title: string;
  host: string;
  startsAt: string;
  venue: string;
  city: string;
  summary: string;
  dressCode: string;
  capacity: number;
  visual: VisualSurface;
};
