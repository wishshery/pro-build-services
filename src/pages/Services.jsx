import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Residential Construction',
    text: 'Extensions, new builds, structural work, and full home improvements delivered with care and clean workmanship.',
    detail: 'Homes, extensions, structural work',
    icon: 'M3 12l9-9 9 9M5 10v10h14V10',
  },
  {
    title: 'Commercial Construction',
    text: 'Reliable construction and fit-out support for shops, offices, units, and business premises.',
    detail: 'Retail, offices, business premises',
    icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01',
  },
  {
    title: 'Renovation',
    text: 'Modern upgrades for kitchens, bathrooms, layouts, and full properties, with attention to finish and function.',
    detail: 'Kitchens, bathrooms, full refurbishments',
    icon: 'M14 7l-2-2-9 9v2h2l9-9zM14 7l3 3M16 5l3 3',
  },
  {
    title: 'Project Management',
    text: 'Coordination of trades, schedules, materials, and quality checks so your project stays organised.',
    detail: 'Planning, trades, site coordination',
    icon: 'M9 11l3 3 8-8M21 12a9 9 0 11-6.219-8.56',
  },
  {
    title: 'Interior Work',
    text: 'Plastering, flooring, painting, kitchens, bathrooms, joinery, and finishing details.',
    detail: 'Finishes, flooring, kitchens, bathrooms',
    icon: 'M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M9 21v-8h6v8',
  },
  {
    title: 'Exterior Work',
    text: 'Roofing, facades, paving, garden structures, drainage, and outside improvements.',
    detail: 'Roofing, paving, drainage, exteriors',
    icon: 'M12 3l9 4v5c0 5-3.5 8-9 9-5.5-1-9-4-9-9V7l9-4z',
  },
]

export default function Services() {
  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-px py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Services</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Construction services for homes, businesses, and renovations.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Choose a focused service or let us manage the full job from first visit
              to final handover.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group flex min-h-[260px] flex-col rounded-md border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                    Service
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{s.text}</p>
                <p className="mt-5 border-t border-gray-100 pt-4 text-sm font-bold text-ink">{s.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-md bg-ink p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold">Need help choosing the right service?</h2>
              <p className="mt-2 text-gray-300">Tell us what you want built or improved, and we will advise the best next step.</p>
            </div>
            <Link to="/contact" className="btn-primary mt-5 shrink-0 sm:mt-0">Request Advice</Link>
          </div>
        </div>
      </section>
    </>
  )
}
