import type { Event } from '../types/event';
import { createGradientVisual } from '../utils/mockVisuals';

export const events: Event[] = [
  {
    id: 'event-plinth-room-guatemala',
    slug: 'plinth-room-guatemala',
    title: 'Plinto Private Preview',
    host: 'Plinto',
    startsAt: '2026-06-21T18:00:00-06:00',
    venue: 'Rosas Botran',
    city: 'Guatemala City',
    summary: 'An invitation-only walkthrough of verified works, provenance layers and the scan demonstration.',
    dressCode: 'Smart minimal',
    capacity: 40,
    visual: createGradientVisual(
      'Private preview event placeholder',
      'linear-gradient(160deg, #f5f5f3 0%, #d9d5ce 38%, #20242b 100%)',
      '#324b64',
    ),
  },
  {
    id: 'event-collector-salon-miami',
    slug: 'collector-salon-miami',
    title: 'Collector Salon',
    host: 'Plinto x Gallery Circle',
    startsAt: '2026-07-08T19:30:00-04:00',
    venue: 'Design District Residence',
    city: 'Miami',
    summary: 'A small-format evening focused on acquisition narratives, private custody and market confidence.',
    dressCode: 'Evening contemporary',
    capacity: 24,
    visual: createGradientVisual(
      'Collector salon event placeholder',
      'linear-gradient(145deg, #f8f5ef 0%, #6ea3c7 32%, #1a2230 72%, #f8f5ef 100%)',
      '#6ea3c7',
    ),
  },
  {
    id: 'event-artist-table-madrid',
    slug: 'artist-table-madrid',
    title: 'Artist Table',
    host: 'Plinto Studio Sessions',
    startsAt: '2026-09-12T13:00:00+02:00',
    venue: 'Casa de Oficios',
    city: 'Madrid',
    summary: 'A lunch-format conversation with artists on permanence, authorship and the long arc of cultural records.',
    dressCode: 'Day formal',
    capacity: 18,
    visual: createGradientVisual(
      'Artist table event placeholder',
      'linear-gradient(160deg, #efe9e1 0%, #b9926d 30%, #5b4454 64%, #26272d 100%)',
      '#b9926d',
    ),
  },
];
