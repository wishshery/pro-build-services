import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend on the static build. This opens the visitor's email client
    // with the message pre-filled. Swap for Formspree/Netlify Forms if desired.
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    )
    window.location.href = `mailto:info@probuildservices.co.uk?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container-px py-16 text-center sm:py-20">
          <p className="eyebrow">Get In Touch</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Tell us about your project and we'll get back to you within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Name</span>
              <input required value={form.name} onChange={update('name')} className="input" placeholder="Your name" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Email</span>
                <input required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Phone</span>
                <input value={form.phone} onChange={update('phone')} className="input" placeholder="(555) 000-0000" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Message</span>
              <textarea required rows={5} value={form.message} onChange={update('message')} className="input" placeholder="Tell us about your project..." />
            </label>
            <button type="submit" className="btn-primary">Send Message</button>
            {sent && <p className="text-sm font-semibold text-green-600">✓ Opening your email app…</p>}
          </form>

          {/* Details + map */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Owner" value="Sunny Bhatti" />
              <InfoCard label="Phone" value="07414 042828" />
              <InfoCard label="Email" value="info@probuildservices.co.uk" />
              <InfoCard label="Service Area" value="Local & surrounding areas" />
            </div>

            {/* Google Maps placeholder */}
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <iframe
                title="Service area map"
                src="https://www.google.com/maps?q=London,UK&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}
