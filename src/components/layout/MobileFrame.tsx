import type { PropsWithChildren } from 'react';

export function MobileFrame({ children }: PropsWithChildren) {
  return (
    <div className="mobile-frame">
      <main className="mobile-frame__screen">{children}</main>
    </div>
  );
}
