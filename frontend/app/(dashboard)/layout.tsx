import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-full">
        {/* Sidebar placeholder — will be built in Phase 4 */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
          <div className="p-4 font-heading text-lg font-bold text-navy dark:text-mint">
            Forge
          </div>
          <nav className="px-3 text-sm text-muted-foreground">
            <p className="px-3 py-2">Sidebar placeholder</p>
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          {/* Topbar placeholder */}
          <header className="flex h-14 items-center border-b border-border bg-card px-6">
            <span className="text-sm text-muted-foreground">Topbar placeholder</span>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
