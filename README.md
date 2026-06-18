# Pro Build Services Website

A modern, clean, responsive marketing site for Pro Build Services (owner: Sunny Bhatti). Built with **React + Vite + Tailwind CSS**. Showcases services and completed projects, with a simple admin-style upload page and a public projects gallery. Deploys free to **GitHub Pages** (or Vercel) with no backend required.

## Features

- **Home** — hero, tagline, CTA buttons, trust stats, and "why choose us" section
- **Services** — Residential, Commercial, Renovation, Project Management, Interior & Exterior
- **Projects Gallery** — large images, category filtering (Residential / Commercial / Renovation), before/after toggle, location, description, completion date
- **Upload** — admin-style page to add a project (title, description, location, category, photos) that appears instantly in the gallery, plus an **Export JSON** button to publish permanently
- **About** — company story, experience, quality & safety commitment
- **Contact** — contact form, phone, email, service area, Google Maps embed
- Fully responsive (desktop, tablet, mobile), white background, orange accent, fast loading

## Tech stack

| | |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Routing | React Router (HashRouter — works on GitHub Pages with no extra config) |
| Data | Static JSON (`src/data/projects.json`) + browser `localStorage` for uploads |
| Hosting | GitHub Pages (free) or Vercel |

## Project structure

```
.
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages on push
├── public/                        # Static assets (optional)
├── src/
│   ├── components/                # Navbar, Footer, ProjectCard, ScrollToTop
│   ├── data/projects.json         # Public, permanent project list (edit this)
│   ├── lib/projectsStore.js       # Data layer (seed JSON + localStorage merge)
│   ├── pages/                     # Home, Services, Projects, Upload, About, Contact
│   ├── App.jsx                    # Routes
│   ├── main.jsx                   # Entry
│   └── index.css                  # Tailwind + helpers
├── index.html
├── tailwind.config.js
├── vite.config.js
├── .env.example                   # Only needed if you add a real backend
└── package.json
```

## Run locally

Requires Node.js 18+.

```bash
npm install      # install dependencies
npm run dev      # start dev server -> http://localhost:5173
```

Build and preview the production bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built site locally
```

## How project uploads work (important)

This is a **static site with no backend**, so it's 100% free to host. The Upload page works in two stages:

1. **Instant preview (this browser):** When you fill in the form and click *Save Project*, the project is stored in your browser's `localStorage` and appears immediately in the Projects gallery — but only on **your** device.
2. **Publish to everyone (permanent):** Click **Export JSON** on the Upload page. It copies the full project list to your clipboard. Paste it into `src/data/projects.json`, then commit and push. The GitHub Action rebuilds and everyone sees the new projects.

> Want true live uploads (no code commit) for non-technical staff? Upgrade the data layer to **Supabase** (free tier — Postgres database + image storage). See `.env.example` for the variables, then replace the read/write functions in `src/lib/projectsStore.js` with Supabase client calls. This is the simplest real-backend option.

## Deploy to GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `buildright-website`).
2. Push this project:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: BuildRight construction site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. In your repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.
5. Your live URL will be:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   (The workflow also prints the URL under the Actions tab after the first run.)

## Deploy to Vercel (alternative, also free)

1. Push the repo to GitHub (steps above).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`. Click **Deploy**.
4. If you later add Supabase/Firebase, add the `VITE_*` env vars in Vercel → Project → Settings → Environment Variables.

## Customizing

- **Company name / colors:** name lives in `Navbar.jsx`, `Footer.jsx`, and page text; accent color is `brand` in `tailwind.config.js` (currently safety orange `#EA580C`).
- **Contact details:** edit `Footer.jsx` and `Contact.jsx`.
- **Projects:** edit `src/data/projects.json`.

## License

MIT — free to use and adapt.
