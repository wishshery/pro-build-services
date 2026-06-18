import { useState } from 'react'

const FALLBACK = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80'

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date)) return d
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export default function ProjectCard({ project }) {
  const hasBeforeAfter = project.beforeImage && project.afterImage
  const [showAfter, setShowAfter] = useState(true)

  const mainImage = hasBeforeAfter
    ? showAfter
      ? project.afterImage
      : project.beforeImage
    : project.image || FALLBACK

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={project.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
          {project.category}
        </span>
        {hasBeforeAfter && (
          <div className="absolute bottom-3 left-3 flex overflow-hidden rounded-md border border-white/70 text-xs font-bold">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-3 py-1 ${!showAfter ? 'bg-white text-ink' : 'bg-black/50 text-white'}`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-3 py-1 ${showAfter ? 'bg-white text-ink' : 'bg-black/50 text-white'}`}
            >
              After
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
            <circle cx="12" cy="11" r="2" />
          </svg>
          {project.location}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{project.description}</p>
        {project.completionDate && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Completed {formatDate(project.completionDate)}
          </p>
        )}
      </div>
    </article>
  )
}
