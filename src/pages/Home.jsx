import { Link } from 'react-router-dom'

const trustStats = [
  { value: '25+', label: 'Years experience' },
  { value: '480+', label: 'Projects delivered' },
  { value: '100%', label: 'Fully insured' },
  { value: '4.9/5', label: 'Client rating' },
]

const serviceHighlights = [
  'Residential builds and extensions',
  'Commercial fit-outs and construction',
  'Renovations, kitchens, bathrooms',
  'Project management from start to finish',
]

const steps = [
  {
    title: 'Site visit',
    text: 'We inspect the space, listen to your goals, and explain the practical options.',
  },
  {
    title: 'Clear quote',
    text: 'You get a straightforward scope, timeline, and price before work begins.',
  },
  {
    title: 'Managed build',
    text: 'Sunny Bhatti keeps trades, schedule, quality, and communication under control.',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
          alt="Construction site"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />

        <div className="container-px grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:min-h-[680px] lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-light">Pro Build Services</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Professional construction work, handled properly from day one.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
              Residential, commercial, renovation, and project management services led by
              Sunny Bhatti. Clear quotes, tidy sites, reliable workmanship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary w-full sm:w-auto">Get a Free Quote</Link>
              <Link
                to="/projects"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-ink sm:w-auto"
              >
                View Projects
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-white/15 bg-white/95 p-5 text-ink shadow-2xl backdrop-blur sm:p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">What we cover</p>
            <ul className="mt-4 space-y-3">
              {serviceHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-gray-800">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                    OK
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-md bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Speak directly with the owner</p>
              <a href="tel:07414042828" className="mt-1 block text-2xl font-extrabold text-ink">
                07414 042828
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="container-px grid grid-cols-2 gap-5 py-10 lg:grid-cols-4">
          {trustStats.map((s) => (
            <div key={s.label} className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-brand sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">How We Work</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Straightforward process, no guesswork.
              </h2>
              <p className="mt-4 text-gray-600">
                Clients want a builder who answers the phone, explains the work, and keeps
                the site moving. That is the standard here.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-md border border-gray-200 bg-gray-50 p-5">
                  <span className="text-sm font-extrabold text-brand">0{index + 1}</span>
                  <h3 className="mt-2 font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-md shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80"
              alt="Construction team reviewing plans"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built around reliability, safety, and clean finishes.
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Pro Build Services combines practical trade experience with careful project
              coordination. You get a professional finish without confusion, loose ends,
              or unnecessary delays.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Clear communication', 'Quality materials', 'Tidy work sites', 'Fully insured'].map((item) => (
                <div key={item} className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-bold">
                  {item}
                </div>
              ))}
            </div>
            <Link to="/services" className="btn-outline mt-7">Explore Services</Link>
          </div>
        </div>
      </section>

      <section className="bg-brand">
        <div className="container-px flex flex-col items-start justify-between gap-6 py-10 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to discuss your project?</h2>
            <p className="mt-2 text-white/90">Call Sunny Bhatti or send a quick enquiry today.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="tel:07414042828" className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-6 py-3 font-bold text-brand">
              Call Now
            </a>
            <Link to="/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-ink px-6 py-3 font-bold text-white">
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
