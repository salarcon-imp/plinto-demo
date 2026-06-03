import type { VisualSurface } from '../types/visual';

export function createGradientVisual(
  alt: string,
  background: string,
  accent: string,
): VisualSurface {
  return {
    kind: 'gradient',
    alt,
    background,
    accent,
  };
}
