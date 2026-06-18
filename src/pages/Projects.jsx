import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import { fetchProjects, CATEGORIES } from '../lib/projectsStore.js'

const FILTERS = ['All', ...CATEGORIES]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchProjects()
      .then((p) => { if (active) setAllProjects(p) })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const visible =
    filter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === filter)

  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-px grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Completed Work</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Project gallery
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-gray-600">
            A selection of recent construction and renovation work. Filter by project
            type to see the jobs most relevant to your plans.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="mb-8 flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-ink">Browse by category</p>
              <p className="text-sm text-gray-500">{visible.length} project{visible.length === 1 ? '' : 's'} shown</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                    filter === f
                      ? 'bg-brand text-white shadow-sm'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="py-10 text-center text-gray-500">Loading projects...</p>
          ) : visible.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
              <h2 className="text-xl font-extrabold">No public projects in this category yet.</h2>
              <p className="mx-auto mt-2 max-w-xl text-gray-600">
                Please check another category or contact us for examples related to your project.
              </p>
              <Link to="/contact" className="btn-primary mt-5">Contact Us</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
