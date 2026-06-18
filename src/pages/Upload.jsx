import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import {
  CATEGORIES,
  fetchProjects,
  uploadImage,
  createProject,
  deleteProject,
} from '../lib/projectsStore.js'

const emptyForm = {
  title: '',
  category: CATEGORIES[0],
  location: '',
  description: '',
  completionDate: '',
}

export default function Upload() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [form, setForm] = useState(emptyForm)
  const [mainFile, setMainFile] = useState(null)
  const [beforeFile, setBeforeFile] = useState(null)
  const [afterFile, setAfterFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchProjects().then(setProjects).catch(() => {})
  }, [session])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !mainFile) {
      setMessage('Title and a main photo are required.')
      return
    }
    setBusy(true)
    setMessage('')
    try {
      const image = await uploadImage(mainFile)
      const beforeImage = beforeFile ? await uploadImage(beforeFile) : ''
      const afterImage = afterFile ? await uploadImage(afterFile) : ''
      await createProject({ ...form, image, beforeImage, afterImage })
      setForm(emptyForm)
      setMainFile(null)
      setBeforeFile(null)
      setAfterFile(null)
      e.target.reset()
      setMessage('Published - it is now live in the public gallery.')
      fetchProjects().then(setProjects).catch(() => {})
    } catch (err) {
      setMessage('Upload failed: ' + (err.message || 'unknown error'))
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project permanently?')) return
    try {
      await deleteProject(id)
      setProjects((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      setMessage('Delete failed: ' + (err.message || 'unknown error'))
    }
  }

  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-px flex items-center justify-between py-12 sm:py-16">
          <div>
            <p className="eyebrow">Owner Tools</p>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Private Project Upload</h1>
            <p className="mt-3 max-w-2xl text-gray-600">
              Private admin page. Sign in to publish a project - it appears in the
              public gallery instantly. This page is not shown in the site navigation.
            </p>
          </div>
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="shrink-0 text-sm font-semibold text-gray-600 hover:text-brand"
            >
              Sign out
            </button>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          {!isSupabaseConfigured ? (
            <div className="mx-auto max-w-2xl rounded-md border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-lg font-bold text-amber-900">Backend not connected yet</h2>
              <p className="mt-2 text-sm leading-relaxed text-amber-800">
                This page goes live once the Supabase project URL and key are added to
                the site. Until then the public gallery shows the built-in sample
                projects. See the README for the one-time setup.
              </p>
            </div>
          ) : checking ? (
            <p className="text-gray-500">Loading...</p>
          ) : !session ? (
            <form
              onSubmit={handleLogin}
              className="mx-auto max-w-sm rounded-md border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold">Admin sign in</h2>
              <p className="mt-1 text-sm text-gray-500">Owner access only.</p>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-semibold">Email</span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-semibold">Password</span>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
              </label>
              {authError && <p className="mt-3 text-sm font-semibold text-red-600">{authError}</p>}
              <button type="submit" className="btn-primary mt-5 w-full">Sign In</button>
            </form>
          ) : (
            <div className="grid gap-8 lg:grid-cols-5">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-3"
              >
                <Field label="Project Title *">
                  <input required value={form.title} onChange={update('title')} className="input" placeholder="e.g. Rear extension and kitchen renovation" />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Category *">
                    <select value={form.category} onChange={update('category')} className="input">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Location">
                    <input value={form.location} onChange={update('location')} className="input" placeholder="e.g. Manchester" />
                  </Field>
                </div>

                <Field label="Completion Date">
                  <input type="date" value={form.completionDate} onChange={update('completionDate')} className="input" />
                </Field>

                <Field label="Description">
                  <textarea value={form.description} onChange={update('description')} rows={4} className="input" placeholder="Short description of the work completed..." />
                </Field>

                <Field label="Main Photo *">
                  <input type="file" accept="image/*" required onChange={(e) => setMainFile(e.target.files?.[0] || null)} className="file-input" />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Before Photo (optional)">
                    <input type="file" accept="image/*" onChange={(e) => setBeforeFile(e.target.files?.[0] || null)} className="file-input" />
                  </Field>
                  <Field label="After Photo (optional)">
                    <input type="file" accept="image/*" onChange={(e) => setAfterFile(e.target.files?.[0] || null)} className="file-input" />
                  </Field>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
                    {busy ? 'Publishing...' : 'Publish Project'}
                  </button>
                  {message && <span className="text-sm font-semibold text-gray-700">{message}</span>}
                </div>
              </form>

              <aside className="lg:col-span-2">
                <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold">Published projects ({projects.length})</h3>
                  {projects.length === 0 ? (
                    <p className="mt-2 text-sm text-gray-500">Nothing published yet.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {projects.map((p) => (
                        <li key={p.id} className="flex items-center gap-3">
                          <img src={p.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{p.title}</p>
                            <p className="text-xs text-gray-500">{p.category}</p>
                          </div>
                          <button onClick={() => handleDelete(p.id)} className="text-xs font-semibold text-red-600 hover:underline">
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          )}
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
