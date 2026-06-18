import { createClient } from '@supabase/supabase-js'

// These come from environment variables (Vite exposes vars prefixed with VITE_).
// Locally: put them in a .env file. On GitHub Pages: they are injected at build
// time from repository secrets (see .github/workflows/deploy.yml).
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// When the keys are absent the site still works - it just falls back to the
// static projects in src/data/projects.json and the upload page shows a notice.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

// Storage bucket that holds uploaded project photos (created during setup).
export const PHOTO_BUCKET = 'project-photos'
