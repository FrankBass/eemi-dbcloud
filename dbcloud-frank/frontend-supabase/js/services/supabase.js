
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

const SUPABASE_URL = 'https://yfthbltjoylzcquavjki.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdGhibHRqb3lsemNxdWF2amtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNjczNjIsImV4cCI6MjAzNTk0MzM2Mn0.AKEXz2QaQlnbckDj5OgSC1Eh7Xo2rkH9-WwAxf1QLIc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
