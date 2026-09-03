import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export default function PortalLayout({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface">
      <Topbar />

      <div className="flex">
        <Sidebar />

        <div className="flex min-h-[calc(100vh-var(--shell-header))] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-6 py-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
