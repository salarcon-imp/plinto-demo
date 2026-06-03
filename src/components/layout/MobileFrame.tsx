import type { PropsWithChildren } from 'react';

export function MobileFrame({ children }: PropsWithChildren) {
  return (
    <div className="mobile-frame">
      <div className="mobile-frame__screen">{children}</div>
    </div>
  );
}
