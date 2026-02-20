import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://lyjbhwdsmddintxlwkvm.supabase.co",
  "sb_publishable_0dQ7DHKirM6GhdS9M7q24g_DYv_wGlG"
);

export default supabase;