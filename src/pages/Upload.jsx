import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CATEGORIES,
  saveUploadedProject,
  getUploadedProjects,
  deleteUploadedProject,
  exportProjectsJson,
} from '../lib/projectsStore.js'

const emptyForm = {
  title: '',
  category: CATEGORIES[0],
  location: '',
  description: '',
  completionDate: '',
}

// Read an image File as a base64 data URL so it can be previewed/stored.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Upload() {
  const [form, setForm] = useState(emptyForm)
  const [mainImage, setMainImage] = useState('')
  const [beforeImage, setBeforeImage] = useState('')
  const [afterImage, setAfterImage] = useState('')
  const [uploaded, setUploaded] = useState(() => getUploadedProjects())
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleImage = (setter) => async (e) => {
    const file = e.target.files?.[0]
    if (file) setter(await fileToDataUrl(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !mainImage) return
    const next = saveUploadedProject({
      ...form,
      image: mainImage,
      beforeImage,
      afterImage,
    })
    setUploaded(next)
    setForm(emptyForm)
    setMainImage('')
    setBeforeImage('')
    setAfterImage('')
    setSaved(true)
    setTimeout(() => setSaved(false), 4000)
  }

  const handleDelete = (id) => setUploaded(deleteUploadedProject(id))

  const handleExport = async () => {
    try {
      await navigator.clipboard.writeText(exportProjectsJson())
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback: open the JSON in a new tab to copy manually.
      const w = window.open()
      if (w) w.document.write(`<pre>${exportProjectsJson()}</pre>`)
    }
  }

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container-px py-12 sm:py-16">
          <p className="eyebrow">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Upload a Project</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Add a completed project to the gallery. New projects appear immediately
            in <Link to="/projects" className="font-semibold text-brand">Projects</Link> on
            this browser. To publish permanently for all visitors, use “Export JSON”
            below and paste it into <code className="rounded bg-gray-200 px-1 text-sm">src/data/projects.json</code>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <Field label="Project Title *">
              <input required value={form.title} onChange={update('title')} className="input" placeholder="e.g. Riverside Family Residence" />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Category *">
                <select value={form.category} onChange={update('category')} className="input">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Location">
                <input value={form.location} onChange={update('location')} className="input" placeholder="e.g. Austin, TX" />
              </Field>
            </div>

            <Field label="Completion Date">
              <input type="date" value={form.completionDate} onChange={update('completionDate')} className="input" />
            </Field>

            <Field label="Description">
              <textarea value={form.description} onChange={update('description')} rows={4} className="input" placeholder="Short description of the project..." />
            </Field>

            <Field label="Main / After Photo *">
              <input type="file" accept="image/*" required onChange={handleImage(setMainImage)} className="file-input" />
              {mainImage && <img src={mainImage} alt="preview" className="mt-2 h-32 w-full rounded-md object-cover" />}
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Before Photo (optional)">
                <input type="file" accept="image/*" onChange={handleImage(setBeforeImage)} className="file-input" />
                {beforeImage && <img src={beforeImage} alt="before" className="mt-2 h-24 w-full rounded-md object-cover" />}
              </Field>
              <Field label="After Photo (optional)">
                <input type="file" accept="image/*" onChange={handleImage(setAfterImage)} className="file-input" />
                {afterImage && <img src={afterImage} alt="after" className="mt-2 h-24 w-full rounded-md object-cover" />}
              </Field>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button type="submit" className="btn-primary">Save Project</button>
              {saved && <span className="text-sm font-semibold text-green-600">✓ Saved — view it in Projects</span>}
            </div>
          </form>

          {/* Sidebar: uploaded list + export */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold">Publish to everyone</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Uploads are saved in this browser only. To make them public for all
                visitors, copy the full project list and paste it into
                <code className="mx-1 rounded bg-gray-100 px-1 text-xs">src/data/projects.json</code>,
                then commit and push.
              </p>
              <button onClick={handleExport} className="btn-outline mt-4 w-full py-2 text-sm">
                {copied ? '✓ Copied to clipboard' : 'Export JSON'}
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold">Your uploads ({uploaded.length})</h3>
              {uploaded.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">Nothing uploaded yet.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {uploaded.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-12 w-12 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{p.title}</p>
                        <p className="text-xs text-gray-500">{p.category}</p>
                      </div>
                      <button onClick={() => handleDelete(p.id)} className="text-xs font-semibold text-red-600 hover:underline">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-gray-800">{label}</span>
      {children}
    </label>
  )
}
