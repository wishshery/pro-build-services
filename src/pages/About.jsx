import { Link } from 'react-router-dom'

const values = [
  { title: 'Quality First', text: 'We never cut corners. Every material and every detail meets our high standard.' },
  { title: 'Safety Always', text: 'Rigorous site safety protocols protect our crews, clients, and communities.' },
  { title: 'Honest Communication', text: 'Clear pricing, realistic timelines, and regular updates from start to finish.' },
]

export default function About() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container-px py-16 text-center sm:py-20">
          <p className="eyebrow">Who We Are</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About Pro Build Services</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Building with integrity for over 25 years</h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              Pro Build Services was founded on a simple belief: that great building
              comes from great relationships. Led by owner Sunny Bhatti, we've grown
              into a trusted, full-service construction company known across the area
              for residential, commercial, and renovation work.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Our team brings decades of combined experience to every project. We
              handle the complexity — permits, scheduling, trades, and inspections —
              so our clients can stay focused on the result they're excited about.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              From the foundation to the final coat of paint, we treat every build as
              if it were our own.
            </p>
            <Link to="/contact" className="btn-primary mt-7">Work With Us</Link>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80"
              alt="Our construction team at work"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quality & Safety values */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Commitment</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Quality &amp; safety in everything</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-gray-200 bg-white p-7">
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
