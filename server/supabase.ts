import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("[Supabase] Missing SUPABASE_URL or SUPABASE_KEY");
}

// Cliente público
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Cliente com permissões de admin (apenas no servidor)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export { supabaseUrl, supabaseKey, supabaseServiceKey };
