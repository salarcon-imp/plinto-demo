import type { Invitation } from '../types/invitation';

export const invitations: Invitation[] = [
  {
    id: 'invitation-sofia-preview',
    userId: 'user-collector-01',
    eventId: 'event-plinth-room-guatemala',
    status: 'confirmed',
    seatsReserved: 1,
    note: 'Your seat is secured. Arrival window opens 20 minutes before the walkthrough.',
  },
  {
    id: 'invitation-galeria-preview',
    userId: 'user-gallery-01',
    eventId: 'event-plinth-room-guatemala',
    status: 'completed',
    seatsReserved: 2,
    note: 'Gallery delegation already confirmed for the preview route and collection handoff rehearsal.',
  },
  {
    id: 'invitation-daniel-salon',
    userId: 'user-investor-01',
    eventId: 'event-collector-salon-miami',
    status: 'reserved',
    seatsReserved: 1,
    note: 'Seat reserved pending final guest list approval from the host circle.',
  },
  {
    id: 'invitation-camila-table',
    userId: 'user-stakeholder-01',
    eventId: 'event-artist-table-madrid',
    status: 'pending',
    seatsReserved: 1,
    note: 'Please confirm dietary preferences and preferred seating cluster.',
  },
  {
    id: 'invitation-felipe-table',
    userId: 'user-artist-01',
    eventId: 'event-artist-table-madrid',
    status: 'confirmed',
    seatsReserved: 1,
    note: 'Speaker slot confirmed. Arrival requested 45 minutes before guests.',
  },
];
