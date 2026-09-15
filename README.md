# InterMedia Marketing Site

Public marketing site for **InterMedia Advertising**, rebuilt from Unicorn Studios’ Phase 2 Concept #5 (Blended Video) with client refinements.

The homepage is a continuous navy opening: transparent navigation over a slightly brightened studio reel, Concept #4 card treatments on Our Approach and Campaign Results, a Concept #3 Creative & Attribution rail, and a compact Concept #6 “Find your starting point” card before AdGrowth Weekly and Let’s Talk.

Repository: [github.com/solfinnai/intermedia-site](https://github.com/solfinnai/intermedia-site)

## What’s in this build

- Home (Concept #5 hero + approach, results, Accutrak, creative/attribution rail, capabilities, compact starting point, AdGrowth Weekly, contact CTA)
- About, Measurement, Creative, Partnerships, Results, Contact
- Path pages: New to TV, Expanding into CTV, Converged TV
- Empty, loading, and not-found states
- Desktop and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43147](http://127.0.0.1:43147).

If `public/video/studio-preview.mp4` is missing (a fresh clone before assets are vendored):

```bash
npm run assets
```

Production build:

```bash
npm run build
npm start
```

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Team photos

Gallery Concept #5 used initials for **Kris Johnson** and **Tim Wright**. Those portraits were restored from InterMedia’s public [About](https://www.im.agency/about-us) page.

**Christina LaMair** and **Derek Shipp** are listed from public InterMedia materials (LinkedIn / appointment announcement) and remain clearly marked placeholders until official headshots are supplied.

## Copy and media

Copy is taken from the live concept gallery and InterMedia’s public site. The opening reel uses the gallery’s studio preview. The contact form stays in preview mode (email draft only).
