import { AdminSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="hidden rounded-2xl border bg-white md:block">
          <AdminSidebar />
        </aside>
        <div className="overflow-hidden rounded-2xl border bg-white">
          <Topbar title="Money Management (Admin)" />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

