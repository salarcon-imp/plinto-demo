import type { PropsWithChildren } from 'react';
import { MobileFrame } from './MobileFrame';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <div className="app-shell__device">
        {children}
      </div>
    </div>
  );
}
