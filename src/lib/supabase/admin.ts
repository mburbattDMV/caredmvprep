import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Service-role client — bypasses RLS. Only use in server-side code (webhook, admin ops).
// NEVER expose SUPABASE_SERVICE_ROLE_KEY to the client.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. Required for webhook and admin operations.'
    );
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
