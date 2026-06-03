import type { PropsWithChildren } from 'react';
import { MobileFrame } from './MobileFrame';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <MobileFrame>{children}</MobileFrame>
    </div>
  );
}
