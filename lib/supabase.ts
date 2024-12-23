import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtdhxdepkrlqamywuoia.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZGh4ZGVwa3JscWFteXd1b2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY0NTAsImV4cCI6MjA1MDUyMjQ1MH0.q0m_q556EXUI2WLiPcEPU_m5Cs5iA2NBR0bJjfgym90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);