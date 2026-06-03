export type VisualSurface = {
  kind: 'gradient' | 'asset';
  alt: string;
  background: string;
  accent: string;
  src?: string;
  objectPosition?: string;
};
