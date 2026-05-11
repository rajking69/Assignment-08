# Recipe Vault

A recipe discovery platform built with Next.js 16, React 19, Tailwind v4 and DaisyUI 5. Green-amber theme. Auth + MongoDB wired via Better Auth.

## Stack

- **Framework**: Next.js 16.2.4 (App Router) + React 19.2.4
- **Auth**: Better Auth 1.6.9 (email/password + optional Google OAuth)
- **Database**: MongoDB (`RecipeVault` db)
- **Styling**: Tailwind v4 + DaisyUI 5 + Geist fonts
- **UI bits**: Swiper, react-fast-marquee, react-icons, framer-motion / motion
- **Forms / toasts**: react-hook-form, sonner
- **Lang**: JavaScript (no TypeScript)

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill in BETTER_AUTH_SECRET and MONGODB_URI (and optionally Google OAuth)
npm run dev
# http://localhost:3000
```

### Required env vars

| Var | Required | Notes |
|---|---|---|
| `BETTER_AUTH_SECRET` | yes | `openssl rand -base64 32` |
| `MONGODB_URI` | yes | Atlas or local mongod |
| `BETTER_AUTH_URL` | dev: no | Set in prod to deployed origin |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Both must be set to enable Google sign-in |

## Scripts

```bash
npm run dev       # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

```
src/
├─ middleware.js                     protects /Profile (real auth check)
├─ lib/
│  ├─ auth.js                        Better Auth server singleton
│  └─ auth-client.js                 Better Auth React client
└─ app/
   ├─ layout.js                      root: fonts, AppToaster, Footer
   ├─ globals.css                    tailwind + daisyui
   ├─ not-found.jsx
   ├─ api/
   │  ├─ auth/[...all]/route.js      Better Auth handler
   │  └─ recipes/route.js            GET /api/recipes (reads data.json)
   ├─ Components/                    Navbar, Footer, Banner, MarqueeData,
   │                                 HomeHighlights, TopRecipes, TopChefs,
   │                                 CookingTips, RecipesHero, RecipesCatalog,
   │                                 AppToaster
   ├─ (auth)/
   │  ├─ layout.js
   │  ├─ loading.jsx
   │  ├─ Login/page.jsx              honors ?callbackURL=
   │  └─ Registration/page.jsx       validates picture URL
   └─ (main)/
      ├─ layout.js                   Navbar wrapper
      ├─ loading.jsx
      ├─ page.jsx                    Banner + Marquee + HomeHighlights + Tips
      ├─ Recipes/page.jsx            full catalog with search + category filter
      ├─ RecipeDetails/[id]/page.jsx detail page (local data import)
      └─ Profile/page.jsx            session-guarded, redirects on logout
public/
└─ data.json                         20 seed recipes
```

## Notes

- `middleware.js` has the correct filename (Next requires exactly `middleware.js`). Matcher protects `/Profile`.
- `RecipeDetails` and `HomeHighlights` import `public/data.json` directly — no production-URL fetch loops in dev.
- `next.config.mjs` lists `mongodb` in `serverExternalPackages` so `next build` doesn't try to bundle the native driver.
- Auth fail with `MONGODB_URI is not set`? You forgot `.env.local`.
