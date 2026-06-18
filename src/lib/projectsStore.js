import seedProjects from '../data/projects.json'

// ---------------------------------------------------------------------------
// Static JSON + localStorage project store.
//
// - The permanent, public projects live in src/data/projects.json (committed
//   to the repo). These are visible to everyone who loads the site.
// - The Upload page lets you add projects in your browser. Those are saved to
//   localStorage so YOU can preview them immediately. To make an uploaded
//   project permanent/public for all visitors, use the "Export JSON" button on
//   the Upload page and paste the result into src/data/projects.json, then
//   commit + push.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'buildright_uploaded_projects'

export const CATEGORIES = ['Residential', 'Commercial', 'Renovation']

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
  const withId = {
    ...project,
    id: project.id || `upload-${Date.now()}`,
    _source: 'uploaded',
  }
  const next = [withId, ...uploaded]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function deleteUploadedProject(id) {
  const next = getUploadedProjects().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

// Merge committed seed projects with any locally uploaded ones (uploads first).
export function getAllProjects() {
  return [...getUploadedProjects(), ...seedProjects]
}

// Build the full JSON array (seed + uploaded) for pasting into projects.json.
export function exportProjectsJson() {
  const all = getAllProjects().map(({ _source, ...rest }) => rest)
  return JSON.stringify(all, null, 2)
}
