import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    )
    window.location.href = `mailto:info@probuildservices.co.uk?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-px grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Tell us about your project.
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-gray-600">
            For a faster response, call Sunny Bhatti directly. You can also send a
            project enquiry using the form below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-5">
            <div className="rounded-md bg-ink p-6 text-white shadow-lg">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-light">Call the owner</p>
              <h2 className="mt-2 text-3xl font-extrabold">Sunny Bhatti</h2>
              <a href="tel:07414042828" className="mt-4 block text-3xl font-extrabold text-white">
                07414 042828
              </a>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                Discuss your job, arrange a site visit, or ask what information is needed
                for a quote.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard label="Email" value="info@probuildservices.co.uk" />
              <InfoCard label="Service Area" value="Local and surrounding areas" />
              <InfoCard label="Typical Response" value="Within one business day" />
            </div>

            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <iframe
                title="Service area map"
                src="https://www.google.com/maps?q=London,UK&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-bold">Name</span>
                <input required value={form.name} onChange={update('name')} className="input" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Email</span>
                <input required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Phone</span>
                <input value={form.phone} onChange={update('phone')} className="input" placeholder="07414 000000" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-bold">Project details</span>
                <textarea
                  required
                  rows={7}
                  value={form.message}
                  onChange={update('message')}
                  className="input"
                  placeholder="Tell us what you want built, renovated, repaired, or managed..."
                />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Send Enquiry</button>
            {sent && <p className="mt-4 text-sm font-semibold text-green-700">Opening your email app...</p>}
          </form>
        </div>
      </section>
    </>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}
