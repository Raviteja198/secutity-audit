import { MembersTable } from "@/components/members/MembersTable";

export default function UserMembersPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Members</h1>
        <p className="text-sm text-zinc-600">Read-only member list.</p>
      </div>
      <MembersTable mode="user" />
    </div>
  );
}

