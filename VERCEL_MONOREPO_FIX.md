# Fix Vercel Monorepo Deployment

## The Problem
Vercel can't detect Next.js in the root because it's in `apps/web/`. We need to configure the root directory.

## Solution: Configure via Vercel Dashboard

1. **Go to Project Settings:**
   https://vercel.com/marwan-refaat/inbox-zero/settings

2. **Set Root Directory:**
   - Scroll to "General" section
   - Find "Root Directory"
   - Set to: `apps/web`
   - Click "Save"

3. **Update Build Command:**
   - In the same settings page, find "Build Command"
   - Change from: `turbo run build --filter=./apps/web`
   - Change to: `cd ../.. && corepack enable && pnpm install --no-frozen-lockfile && turbo run build --filter=./apps/web`
   - OR simpler: Go back to root: `cd ../.. && pnpm build`
   
   Actually, if root is `apps/web`, the build command should be just:
   ```
   pnpm build
   ```
   (Because we're already in apps/web, and the package.json there has the build script)

4. **Keep Install Command:**
   ```
   cd ../.. && corepack enable && pnpm install --no-frozen-lockfile
   ```
   (This installs from root since it's a monorepo)

5. **Save and Redeploy**

## Alternative: Keep Root as `.` and Add Root Directory Config

Or we can keep root as `.` but explicitly tell Vercel where to find Next.js by:
- Setting root directory to `.` (keep as is)
- Make sure build command uses turbo correctly

The easiest is Option 1 above - set root to `apps/web` and build from there.

