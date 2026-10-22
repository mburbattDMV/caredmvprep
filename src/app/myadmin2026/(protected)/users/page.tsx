import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import UsersTable from "@/components/admin/UsersTable";

export const metadata: Metadata = { title: "Users | Admin", robots: { index: false, follow: false } };

export default async function AdminUsersPage() {
  const admin = createAdminClient();
  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profiles = [] } = await (admin as any).from("profiles").select("*") as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: subs = [] } = await (admin as any).from("subscriptions").select("*").eq("status", "active") as { data: any[] };

  const profileMap: Record<string, any> = {};
  for (const p of profiles) profileMap[p.id] = p;

  const subMap: Record<string, any[]> = {};
  for (const s of subs) {
    if (!subMap[s.user_id]) subMap[s.user_id] = [];
    subMap[s.user_id].push(s);
  }

  const rows = authUsers
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((u) => ({
      id:            u.id,
      email:         u.email ?? "—",
      name:          profileMap[u.id]?.display_name ?? "—",
      phone:         profileMap[u.id]?.phone ?? "—",
      state:         profileMap[u.id]?.target_state ?? null,
      license:       profileMap[u.id]?.target_license ?? null,
      city:          profileMap[u.id]?.city ?? null,
      address_state: profileMap[u.id]?.address_state ?? null,
      plans:         (subMap[u.id] ?? []).map((s: any) => s.product),
      joined:        u.created_at,
      lastSeen:      u.last_sign_in_at,
    }));

  const totalUsers = rows.length;
  const proUsers   = rows.filter((r) => r.plans.length > 0).length;
  const freeUsers  = totalUsers - proUsers;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-400 mt-0.5">All registered accounts</p>
      </div>
      <UsersTable rows={rows} totalUsers={totalUsers} proUsers={proUsers} freeUsers={freeUsers} />
    </div>
  );
}
