import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://fmniknisrfdcmwkdhtfg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_OyneDzs_3yhJ6hJOWUZKlg_uF4CYVDj';

const customFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  headers.delete('authorization');
  return fetch(input, { ...init, headers });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: customFetch },
  auth: { persistSession: false, autoRefreshToken: false },
});
