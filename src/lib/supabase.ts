import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://fmniknisrfdcmwkdhtfg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_OyneDzs_3yhJ6hJOWUZKlg_uF4CYVDj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
