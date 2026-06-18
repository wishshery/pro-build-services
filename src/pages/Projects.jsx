import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import { getAllProjects, CATEGORIES } from '../lib/projectsStore.js'

const FILTERS = ['All', ...CATEGORIES]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  // Read once on mount (includes seed + any locally uploaded projects).
  const allProjects = useMemo(() => getAllProjects(), [])

  const visible =
    filter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === filter)

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container-px py-16 text-center sm:py-20">
          <p className="eyebrow">Our Work</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Projects Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse a selection of our completed builds and renovations. Use the
            filters to explore work by category.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f
                    ? 'bg-brand text-white'
                    : 'border border-gray-300 text-gray-700 hover:border-brand hover:text-brand'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
              <p className="text-gray-500">No projects in this category yet.</p>
              <Link to="/upload" className="btn-primary mt-4">Upload a Project</Link>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
