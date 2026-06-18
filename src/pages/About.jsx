import { Link } from 'react-router-dom'

const values = [
  { title: 'Quality First', text: 'Every detail is checked properly, from structure through to final finish.' },
  { title: 'Safety Always', text: 'Clean, controlled sites help protect clients, visitors, neighbours, and trades.' },
  { title: 'Honest Communication', text: 'Clear pricing, realistic timelines, and straightforward updates throughout the job.' },
]

export default function About() {
  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-px py-14 sm:py-16">
          <p className="eyebrow">About</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Practical construction experience with owner-led service.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Pro Build Services is led by Sunny Bhatti and built around clear
            communication, safe work, and dependable finishes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Approach</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Built with integrity from first visit to final handover.</h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              Pro Build Services was founded on a simple belief: good building
              comes from good communication, proper planning, and pride in the work.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              The team handles the moving parts - planning, scheduling, trades,
              materials, and inspections - so clients get a smoother experience and a
              finish they can trust.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Whether it is a home improvement, full renovation, commercial fit-out,
              or managed build, the standard stays the same: clear advice, tidy work,
              and dependable delivery.
            </p>
            <Link to="/contact" className="btn-primary mt-7">Work With Us</Link>
          </div>
          <div className="overflow-hidden rounded-md shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80"
              alt="Construction team at work"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Commitment</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Quality and safety in every job</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-md border border-gray-200 bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-brand">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
