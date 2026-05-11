<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (16.x) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project notes

- App Router, JS only (no TS). Path alias `@/*` → `src/*`.
- Tailwind v4 + DaisyUI 5. Use `bg-linear-to-*` (renamed from `bg-gradient-to-*`).
- Auth + DB are wired via Better Auth + MongoDB adapter. Server singleton in `src/lib/auth.js`, React client in `src/lib/auth-client.js`. Mongo db name is `RecipeVault`.
- Required env: `BETTER_AUTH_SECRET`, `MONGODB_URI`. Optional: `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. Without Google envs, social provider is silently dropped.
- `src/app/api/recipes/route.js` still serves `public/data.json` — recipes have not moved to the DB yet.
- Use `next/image` for thumbnails when possible. Configured remote hosts: `images.unsplash.com`, `i.postimg.cc`.
- Middleware lives at `src/middleware.js` (Next requires that exact filename — do not rename).
