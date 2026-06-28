import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import SupportSearch from "@/components/admin/SupportSearch";

export const metadata: Metadata = { title: "Support | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};
const STATE_LABELS: Record<string, string> = {
  CA: "California", TX: "Texas", FL: "Florida", NY: "New York", PA: "Pennsylvania", IL: "Illinois",
};

export default async function AdminSupportPage() {
  const admin = createAdminClient();

  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profiles = [] } = await (admin as any).from("profiles").select("*") as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: subs = [] }     = await (admin as any).from("subscriptions").select("*") as { data: any[] };

  const profileMap: Record<string, any> = {};
  for (const p of profiles) profileMap[p.id] = p;

  const subMap: Record<string, any[]> = {};
  for (const s of subs) {
    if (!subMap[s.user_id]) subMap[s.user_id] = [];
    subMap[s.user_id].push(s);
  }

  const customers = authUsers.map((u) => {
    const p = profileMap[u.id] ?? {};
    const userSubs = subMap[u.id] ?? [];
    return {
      id:         u.id,
      email:      u.email ?? "—",
      name:       p.display_name ?? "—",
      phone:      p.phone ?? "—",
      state:      p.target_state ? (STATE_LABELS[p.target_state] ?? p.target_state) : "—",
      city:       p.city ?? "",
      joined:     u.created_at,
      lastSeen:   u.last_sign_in_at ?? null,
      plans:      userSubs.map((s: any) => ({ product: s.product, label: PRODUCT_LABELS[s.product] ?? s.product, status: s.status, id: s.id })),
      stripeCustomerId: p.stripe_customer_id ?? null,
    };
  }).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Support Center</h1>
        <p className="text-sm text-gray-400 mt-0.5">Look up any customer by email, name, phone, or city</p>
      </div>
      <SupportSearch customers={customers} />
    </div>
  );
}
