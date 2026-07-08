# Kindling — Project Documentation

A minimal, human-curated job board for AI/ML and maker-focused roles. Live at **https://find-my-ai-role.vercel.app/**.

## Overview

Kindling lists a small, hand-picked set of open roles so candidates can browse without noise and employers can post directly. The current build ships with 8 seeded roles and simple browse / detail / post flows.

## Tech Stack

- **Framework:** TanStack Start v1 (React 19, SSR-ready)
- **Bundler:** Vite 7
- **Routing:** TanStack Router (file-based, in `src/routes/`)
- **Data:** TanStack Query
- **Styling:** Tailwind CSS v4 (via `src/styles.css`)
- **UI primitives:** shadcn/ui + Radix
- **Forms & validation:** react-hook-form + Zod
- **Icons:** lucide-react
- **Hosting:** Vercel (deployed via GitHub Actions from `main`)

## Routes

| Path            | File                       | Purpose                          |
| --------------- | -------------------------- | -------------------------------- |
| `/`             | `src/routes/index.tsx`     | Home — browse curated roles     |
| `/jobs/:id`     | `src/routes/jobs.$id.tsx`  | Job detail page                  |
| `/post`         | `src/routes/post.tsx`      | Employer "Post a job" form      |
| `/about`        | `src/routes/about.tsx`     | About the project                |
| `/sitemap.xml`  | `src/routes/sitemap[.]xml.ts` | Auto-generated sitemap       |

Root layout: `src/routes/__root.tsx` (metadata, `<Outlet />`, providers).

## Project Structure

```
src/
  routes/          # File-based routes (TanStack Router)
  components/      # Reusable UI + shadcn primitives
  hooks/           # Custom React hooks
  lib/             # Utilities, job data, helpers
  styles.css       # Tailwind v4 entry + theme tokens
  router.tsx       # Router bootstrap
```

## Local Development

```bash
bun install
bun run dev        # http://localhost:8080
bun run build      # production build
bun run preview    # preview built output
bun run lint       # eslint
```

Requires **Bun** (or Node 20+ with npm/pnpm as fallback).

## Deployment

Deployed to Vercel from the `main` branch of the connected GitHub repo:

1. Push to `main` → GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers.
2. Workflow uses `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets.
3. Vercel builds with `bun install` and serves the TanStack Start output.

**Production URL:** https://find-my-ai-role.vercel.app/

## Adding a New Job (current build)

Jobs are seeded in-code. To add a role, edit the jobs array in `src/lib/` (or wherever the seed lives) and push. A persistent backend (Lovable Cloud) can be enabled later to make `/post` write to a database.

## Adding a New Route

1. Create `src/routes/<name>.tsx` using `createFileRoute`.
2. Add a `head()` with unique `title`, `description`, and `og:*` tags.
3. Link to it with `<Link to="/<name>">` — the plugin regenerates `routeTree.gen.ts` automatically.

## Design System

All colors, gradients, and radii are semantic tokens defined in `src/styles.css` under `@theme`. Do not hardcode Tailwind color utilities (`bg-black`, `text-white`) in components — use the semantic tokens so theming stays consistent.

## Roadmap Ideas

- Enable Lovable Cloud for real job submissions + moderation
- Auth for employers (post/manage their own listings)
- Search + tag filters
- Email alerts for new roles

## License

Private / unlicensed unless stated otherwise in the repo.