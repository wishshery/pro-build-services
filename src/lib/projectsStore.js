import seedProjects from '../data/projects.json'
import { supabase, isSupabaseConfigured, PHOTO_BUCKET } from './supabase.js'

export const CATEGORIES = ['Residential', 'Commercial', 'Renovation']

// ===========================================================================
// Static / localStorage layer (used before Supabase is connected)
// ===========================================================================
const STORAGE_KEY = 'probuild_uploaded_projects'

export function getUploadedProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUploadedProject(project) {
  const uploaded = getUploadedProjects()
  const withId = { ...project, id: project.id || `upload-${Date.now()}`, _source: 'uploaded' }
  const next = [withId, ...uploaded]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function deleteUploadedProject(id) {
  const next = getUploadedProjects().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

// Synchronous accessor: local drafts + committed seed projects.
export function getAllProjects() {
  return [...getUploadedProjects(), ...seedProjects]
}

export function exportProjectsJson() {
  const all = getAllProjects().map(({ _source, ...rest }) => rest)
  return JSON.stringify(all, null, 2)
}

// ===========================================================================
// Supabase layer (used once the backend is connected)
// ===========================================================================
function fromRow(r) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    location: r.location || '',
    description: r.description || '',
    completionDate: r.completion_date || '',
    image: r.image || '',
    beforeImage: r.before_image || '',
    afterImage: r.after_image || '',
  }
}

// Async loader for the public gallery. Live Supabase data when configured,
// otherwise the static seed + any local drafts.
export async function fetchProjects() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('completion_date', { ascending: false })
    if (error) {
      console.error('Supabase fetch failed, using static data:', error.message)
      return getAllProjects()
    }
    return (data || []).map(fromRow)
  }
  return getAllProjects()
}

// Upload an image File to storage and return its public URL (auth required).
export async function uploadImage(file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// Insert a new project row (auth required).
export async function createProject(project) {
  const { error } = await supabase.from('projects').insert({
    title: project.title,
    category: project.category,
    location: project.location || null,
    description: project.description || null,
    completion_date: project.completionDate || null,
    image: project.image,
    before_image: project.beforeImage || null,
    after_image: project.afterImage || null,
  })
  if (error) throw error
}

// Delete a project row (auth required).
export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}
