import type { CSSProperties } from 'react';
import type { VisualSurface } from '../types/visual';

export function getVisualStyle(visual: VisualSurface): CSSProperties {
  if (visual.kind === 'asset' && visual.src) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(21, 22, 26, 0.04), rgba(21, 22, 26, 0.18)), url(${visual.src})`,
      backgroundSize: 'cover',
      backgroundPosition: visual.objectPosition ?? 'center',
    };
  }

  return {
    backgroundImage: visual.background,
    backgroundSize: 'cover',
    backgroundPosition: visual.objectPosition ?? 'center',
  };
}
