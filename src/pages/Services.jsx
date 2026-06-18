import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Residential Construction',
    text: 'Custom homes and additions built to your vision — from foundation to finishing touches, with quality at every stage.',
    icon: 'M3 12l9-9 9 9M5 10v10h14V10',
  },
  {
    title: 'Commercial Construction',
    text: 'Offices, retail, and industrial buildings delivered on schedule, to code, and ready for business.',
    icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01',
  },
  {
    title: 'Renovation',
    text: 'Kitchens, bathrooms, and full-property remodels that modernize your space while protecting its character.',
    icon: 'M14 7l-2-2-9 9v2h2l9-9zM14 7l3 3M16 5l3 3',
  },
  {
    title: 'Project Management',
    text: 'End-to-end coordination of trades, schedules, permits, and budgets so your build runs smoothly start to finish.',
    icon: 'M9 11l3 3 8-8M21 12a9 9 0 11-6.219-8.56',
  },
  {
    title: 'Interior & Exterior Work',
    text: 'Drywall, flooring, painting, siding, roofing, and landscaping — the finishing work that makes a building complete.',
    icon: 'M12 3l9 4v5c0 5-3.5 8-9 9-5.5-1-9-4-9-9V7l9-4z',
  },
]

export default function Services() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container-px py-16 text-center sm:py-20">
          <p className="eyebrow">What We Do</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A full range of construction services under one roof. Whatever you're
            building, we have the team and experience to deliver it right.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-xl border border-gray-200 p-7 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{s.text}</p>
            </div>
          ))}

          {/* CTA card */}
          <div className="flex flex-col justify-center rounded-xl bg-ink p-7 text-white">
            <h3 className="text-xl font-bold">Not sure what you need?</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              Tell us about your project and we'll recommend the right approach.
            </p>
            <Link to="/contact" className="btn-primary mt-5 w-fit">Talk to Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
