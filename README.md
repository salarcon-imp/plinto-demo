# Plinto Demo Experience V1

Frontend demo for Plinto, a verified art marketplace experience prepared for internal presentations and stakeholder review.

## Stack

- React
- Vite
- TypeScript
- SCSS
- GSAP
- React Router

## Commands

```bash
npm install
npm run dev
npm run build
```

## Project Structure

```text
src/
├── app/
├── animations/
├── assets/
├── components/
├── data/
├── hooks/
├── pages/
├── router/
├── styles/
├── types/
├── utils/
├── main.tsx
└── vite-env.d.ts
```

## Suggested Demo Flow

Recommended presentation route:

1. Splash
2. Onboarding
3. Login
4. Marketplace
5. Artwork Profile
6. Identity Record
7. Scan Piece
8. Work Found
9. User Profile

## Routes

- `/splash`
- `/onboarding`
- `/login`
- `/marketplace`
- `/marketplace/artwork/:artworkId`
- `/identity/:recordId`
- `/invitation`
- `/scan`
- `/scan/found/:artworkId`
- `/profile/:userId`

## Notes

- All content is local and powered by mocked data in `src/data`.
- No backend, API, database or Docker is used.
- The experience is Light Mode only.
- Dark cards are intentionally reserved for identity and technical registry modules.

## Vercel Deploy Notes

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

If this repo contains other projects, set the Vercel project root to:

```text
plinto
```
