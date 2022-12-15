import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbivbayburdtzbrfiojm.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiaXZiYXlidXJkdHpicmZpb2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMDEwNjgsImV4cCI6MTk4NjU3NzA2OH0._kMwC-RGnogVCwWfUiaX8RxItAPEbkVqRN_uRFeSptA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
