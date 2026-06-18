# Pro Build Services Website

Responsive React + Vite + Tailwind website for Pro Build Services, owned by Sunny Bhatti.

Live site:

https://wishshery.github.io/pro-build-services/

## Features

- Public pages: Home, Services, Projects, About, Contact
- Hidden owner upload page: `/#/upload`
- Private Supabase login for publishing project photos
- Public projects gallery with category filters
- Before/after project photo support
- GitHub Pages deployment through GitHub Actions

## Local setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Supabase setup

The site already contains the Supabase code. To connect it:

1. Create a free Supabase project.
2. In Supabase, open SQL Editor and run `supabase/setup.sql`.
3. In Supabase, go to Authentication -> Users and create the owner login user.
4. Copy these values from Supabase Project Settings -> API:
   - Project URL
   - anon public key
5. Add them as GitHub repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Re-run the GitHub Pages deployment.

After that, open:

```text
https://wishshery.github.io/pro-build-services/#/upload
```

Sign in with the owner email/password and publish projects. Uploaded photos are stored in the `project-photos` Supabase bucket and project details are stored in the `projects` table.

## Required Supabase schema

The setup script creates:

- `public.projects` table
- `project-photos` storage bucket
- public read access for gallery visitors
- authenticated write/delete access for the owner upload page

## GitHub Pages

The deployment workflow is in `.github/workflows/deploy.yml`.

It injects these Supabase secrets during build:

```yaml
VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## Contact details

- Owner: Sunny Bhatti
- Phone: 07414 042828
- Email: info@probuildservices.co.uk
