export type InvitationStatus = 'pending' | 'confirmed' | 'reserved' | 'completed';

export type Invitation = {
  id: string;
  userId: string;
  eventId: string;
  status: InvitationStatus;
  seatsReserved: number;
  note: string;
};
