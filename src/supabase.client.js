// import { createClient } from '@supabase/supabase-js';
// const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const VITE_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
// export const supabaseClient = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uarwpysaogctajpbqxuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcndweXNhb2djdGFqcGJxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Njk3NzYsImV4cCI6MjA2NDI0NTc3Nn0.ADQh7TzFKYawmcfVP-PbpFaewLYpQdPTLBvvIKwb3p4'

export const supabase = createClient(supabaseUrl, supabaseKey)