export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-ink text-gray-300">
      <div className="container-px grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand font-extrabold text-white">PB</span>
            <span className="text-lg font-extrabold text-white">Pro Build Services</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Building trust, one project at a time. Quality craftsmanship led by owner
            Sunny Bhatti.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#/services" className="hover:text-brand">Services</a></li>
            <li><a href="#/projects" className="hover:text-brand">Projects</a></li>
            <li><a href="#/about" className="hover:text-brand">About</a></li>
            <li><a href="#/contact" className="hover:text-brand">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Owner: Sunny Bhatti</li>
            <li><a href="tel:07414042828" className="hover:text-brand">Phone: 07414 042828</a></li>
            <li><a href="mailto:info@probuildservices.co.uk" className="hover:text-brand">info@probuildservices.co.uk</a></li>
            <li>Service Area: Local and surrounding areas</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Hours</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Mon-Fri: 7:00 AM - 6:00 PM</li>
            <li>Saturday: 8:00 AM - 2:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px safe-bottom py-5 text-center text-xs text-gray-500">
          <span>Copyright {new Date().getFullYear()} Pro Build Services. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
