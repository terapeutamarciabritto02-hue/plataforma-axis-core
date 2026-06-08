import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = https://oikylekfpmjpvqibigfw.supabase.co import.meta.env.VITE_SUPABASE_ANON_KEY=sb_publishable_1lwUe6IrfqTGGWginSiWdg_UBg5eKKT

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)