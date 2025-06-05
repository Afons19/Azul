import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://uzqvjphtctzmcrfvkbrq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cXZqcGh0Y3R6bWNyZnZrYnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDcyMDMsImV4cCI6MjA2NDYyMzIwM30.3yUJoR39HcTvaY8qTkbb3KUEfAw0nt7iGq3MCcZGWsc'
);
