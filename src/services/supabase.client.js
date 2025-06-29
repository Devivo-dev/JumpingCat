import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
	import.meta.env.SUPABASE_URL,
	import.meta.SUPABASE_KEY
)
