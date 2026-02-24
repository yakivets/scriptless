# Scriptless

Root of the Scriptless monorepo.

## Web app (Vercel)

The Next.js app is in **`npc-ai/`**.

**If you deploy this repo to Vercel:** set **Root Directory** to `npc-ai` in the project:

1. Vercel Dashboard → your project → **Settings** → **General**
2. **Root Directory** → **Edit** → enter `npc-ai` → **Save**
3. **Redeploy** the latest deployment

Otherwise you will get **404 NOT_FOUND** on all routes.

See [npc-ai/README.md](npc-ai/README.md) for full setup and deployment details.
