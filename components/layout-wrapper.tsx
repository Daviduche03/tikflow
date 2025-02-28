'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';

const noSidebarRoutes = ['/privacy', '/terms'];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <div>
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "lg:pl-72" : ""}>
        {children}
      </main>
    </div>
  );
}
