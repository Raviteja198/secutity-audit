import { AdminSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-2 py-4 md:px-4 md:py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="app-shell hidden rounded-2xl md:block">
          <AdminSidebar />
        </aside>
        <div className="app-shell overflow-hidden rounded-2xl">
          <Topbar title="Money Management (Admin)" />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
