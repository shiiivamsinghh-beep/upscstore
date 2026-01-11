import { createClient } from '@supabase/supabase-js';

// NOTE: These environment variables need to be set in your .env.local file
// For MVP development without keys, we will use mock data where possible
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl || 'https://mock.supabase.co', supabaseKey || 'mock-key');
