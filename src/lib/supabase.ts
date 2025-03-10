import { createClient } from '@supabase/supabase-js';

// Using the provided Supabase URL and anon key
const supabaseUrl = 'https://wfkxmuxcjmiphmjssjni.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma3htdXhjam1pcGhtanNzam5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDYxNTksImV4cCI6MjA1NDMyMjE1OX0.GHXqnWnilmay1USNwH55zy_ROPwniFxtLVqComV12hY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
