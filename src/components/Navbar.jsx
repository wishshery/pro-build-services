import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-brand/10 text-brand' : 'text-gray-700 hover:bg-gray-100 hover:text-ink'
    }`

  return (
    <header className="safe-top sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="hidden border-b border-gray-100 bg-ink text-xs font-semibold text-white lg:block">
        <div className="container-px flex h-9 items-center justify-between">
          <span>Trusted local construction by owner Sunny Bhatti</span>
          <div className="flex items-center gap-5 text-gray-200">
            <a href="tel:07414042828" className="hover:text-brand-light">07414 042828</a>
            <a href="mailto:info@probuildservices.co.uk" className="hover:text-brand-light">
              info@probuildservices.co.uk
            </a>
          </div>
        </div>
      </div>

      <nav className="container-px flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand font-extrabold text-white shadow-sm">
            PB
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight sm:text-lg">Pro Build Services</span>
            <span className="hidden text-xs font-semibold uppercase tracking-wide text-gray-500 sm:block">
              Construction & Renovation
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary px-4 py-2 text-sm">Get a Quote</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white shadow-lg md:hidden">
          <div className="container-px flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-base font-semibold ${isActive ? 'bg-brand/10 text-brand' : 'text-ink'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href="tel:07414042828" className="mt-2 rounded-md bg-ink px-3 py-3 text-center font-bold text-white">
              Call 07414 042828
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
