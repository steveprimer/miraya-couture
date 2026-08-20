import { createClient } from "@supabase/supabase-js";

// WARNING: This client bypasses Row Level Security.
// ONLY use inside Server Actions, API routes, or server-side background handlers.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key);
}
