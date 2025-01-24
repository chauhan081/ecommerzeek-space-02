import { createClient } from '@supabase/supabase-js';

// Check if environment variables are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if not connected to show a better error message
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient(
      'https://placeholder.supabase.co',
      'placeholder',
      {
        auth: {
          persistSession: false
        }
      }
    );

// Add an initialization check function
export const isSupabaseConnected = () => {
  return !!supabaseUrl && !!supabaseKey;
};