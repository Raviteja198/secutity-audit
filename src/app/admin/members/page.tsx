import { MembersTable } from "@/components/members/MembersTable";

export default function AdminMembersPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Members</h1>
        <p className="text-sm text-zinc-500">Add, edit, or deactivate members.</p>
      </div>
      <MembersTable mode="admin" />
    </div>
  );
}

