# Vercel Deployment Configuration Issue

## Current Problem
The deployment is failing on the install command. This is because Vercel needs to be configured properly for the monorepo setup.

## Solution: Update Vercel Dashboard Settings

Since you've already set Root Directory to `apps/web`, you need to also configure:

1. **Go to**: https://vercel.com/marwan-refaat/inbox-zero/settings

2. **In "General" section:**
   - **Package Manager**: Select `pnpm` (if available)
   - **Root Directory**: Should be `apps/web` ✓

3. **In "Build & Development Settings":**
   - **Install Command**: `cd ../.. && corepack enable && pnpm install --no-frozen-lockfile`
   - **Build Command**: `cd ../.. && pnpm build`
   - **Output Directory**: Leave empty

4. **Alternative if above doesn't work:**
   - Keep Root Directory as `.` (root)
   - Build Command: `turbo run build --filter=./apps/web`
   - Install Command: `corepack enable && pnpm install --no-frozen-lockfile`

## What's Working
✅ Database configured (Supabase)
✅ All environment variables added
✅ Root directory set in dashboard
✅ Anthropic API key updated

## What's Needed
- Fix install/build commands in dashboard
- Add Redis (optional - can add after deployment)
- Set NEXT_PUBLIC_BASE_URL after successful deployment

