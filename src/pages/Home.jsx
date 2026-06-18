import { Link } from 'react-router-dom'

const trustStats = [
  { value: '25+', label: 'Years of Experience' },
  { value: '480+', label: 'Projects Completed' },
  { value: '100%', label: 'Licensed & Insured' },
  { value: '4.9★', label: 'Average Client Rating' },
]

const trustPoints = [
  {
    title: 'Licensed & Insured',
    text: 'Fully licensed, bonded, and insured for your complete peace of mind on every job.',
    icon: 'M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z',
  },
  {
    title: 'On Time, On Budget',
    text: 'Transparent timelines and pricing with no surprises. We deliver what we promise.',
    icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Quality Craftsmanship',
    text: 'Skilled trades and rigorous quality checks on every project, big or small.',
    icon: 'M14 7l-2-2-9 9v2h2l9-9zM14 7l3 3M14 7l3-3 3 3-3 3-3-3z',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
          alt="Construction site"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="container-px py-20 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-light">Quality You Can Build On</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Pro Build Services
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-200 sm:text-xl">
              Residential, commercial, and renovation builders delivering quality
              craftsmanship — on time and on budget, every time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects" className="btn-primary w-full sm:w-auto">View Projects</Link>
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-ink sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="container-px grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
          {trustStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Pro Build Services</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              A builder you can rely on
            </h2>
            <p className="mt-4 text-gray-600">
              From the first consultation to the final walkthrough, we make the
              construction process clear, honest, and stress-free.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trustPoints.map((p) => (
              <div key={p.title} className="rounded-xl border border-gray-200 p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand">
        <div className="container-px flex flex-col items-center justify-between gap-6 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to start your project?
            </h2>
            <p className="mt-2 text-white/90">Get a free, no-obligation quote today.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 font-bold text-brand transition-colors hover:bg-gray-100"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}
