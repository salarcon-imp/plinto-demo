import { artists, artworks, events, identityRecords, invitations, marketplaceCategories, users } from '../data';

export function getArtworkBySlug(slug?: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworkById(id?: string) {
  return artworks.find((artwork) => artwork.id === id);
}

export function getArtistById(id?: string) {
  return artists.find((artist) => artist.id === id);
}

export function getRecordById(id?: string) {
  return identityRecords.find((record) => record.id === id);
}

export function getRecordByArtworkId(artworkId?: string) {
  return identityRecords.find((record) => record.artworkId === artworkId);
}

export function getEventById(id?: string) {
  return events.find((event) => event.id === id);
}

export function getInvitationByUserId(userId?: string) {
  return invitations.find((invitation) => invitation.userId === userId);
}

export function getInvitationsByUserId(userId?: string) {
  return invitations.filter((invitation) => invitation.userId === userId);
}

export function getUserById(id?: string) {
  return users.find((user) => user.id === id);
}

export function getArtworksByIds(ids: string[]) {
  return artworks.filter((artwork) => ids.includes(artwork.id));
}

export function getEventsByIds(ids: string[]) {
  return events.filter((event) => ids.includes(event.id));
}

export function getCategoriesByIds(ids: string[]) {
  return marketplaceCategories.filter((category) => ids.includes(category.id));
}

export function formatArtworkDimensions(
  width: number,
  height: number,
  depth?: number,
) {
  return depth ? `${width} x ${height} x ${depth} cm` : `${width} x ${height} cm`;
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatTechnicalTimestamp(date: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .replace(',', '');
}
