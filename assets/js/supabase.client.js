import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

const  SUPABASE_URL = 'https://uzqvjphtctzmcrfvkbrq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cXZqcGh0Y3R6bWNyZnZrYnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDcyMDMsImV4cCI6MjA2NDYyMzIwM30.3yUJoR39HcTvaY8qTkbb3KUEfAw0nt7iGq3MCcZGWsc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

