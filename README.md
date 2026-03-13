# CodedAI

CodedAI is a production-ready Next.js app for AI-assisted website generation and editing.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + glass UI system
- Firebase (Auth, Firestore, Storage)
- OpenAI via secure server route (`/api/ai`)
- Zustand + Zod + Sandpack

## Features

- Landing + login + protected builder app
- AI chat that generates structured file operations
- Version snapshots + rollback controls
- Live preview in Sandpack (mobile/tablet/desktop toggles)
- Firebase setup wizard (`/app/firebase`)
- OpenAI setup status + test (`/app/settings`)
- Export project as zip (`/api/export`)
- Deploy guide endpoint (`/api/deploy-guide`)

## Setup

1. Install dependencies

```bash
npm install
```

2. Copy env template

```bash
cp .env.example .env.local
```

3. Fill required values in `.env.local`

- Required for AI:
  - `OPENAI_API_KEY`
- Required for Firebase client auth/storage/db:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- Optional advanced server verification:
  - `FIREBASE_ADMIN_PROJECT_ID`
  - `FIREBASE_ADMIN_CLIENT_EMAIL`
  - `FIREBASE_ADMIN_PRIVATE_KEY`

4. Start dev server

```bash
npm run dev
```

5. Open routes

- `/`
- `/login`
- `/app`
- `/app/projects`
- `/app/firebase`
- `/app/settings`

## Firebase Wizard

Use `/app/firebase` to:

1. Configure optional custom Firebase for generated sites
2. Paste web config fields
3. Validate and save config
4. Copy `.env.local` snippet and Firestore rules examples

Note: CodedAI platform login/auth uses the shared `NEXT_PUBLIC_FIREBASE_*` env vars configured once by the app owner.

## Security Notes

- OpenAI key is server-only (`OPENAI_API_KEY`), never stored in Firestore by default.
- `/api/ai` executes all AI calls server-side.
- Session cookie is set server-side. If Firebase Admin credentials are provided, ID token verification is enforced.

## Export and Deploy

- Use Export button in builder to download a zip project.
- Deploy button can generate a one-click Vercel URL from your Git repository URL.

## GitHub Pages

This repo now includes a GitHub Pages workflow that publishes a static export of the UI.

- GitHub Pages can host the landing page, login flow, Firebase-backed client features, preview, and local export.
- GitHub Pages cannot run server routes, so AI requests and server-only OpenAI checks remain unavailable there.
- For the full app, including `/api/ai`, deploy to Vercel or another Node-capable host.
