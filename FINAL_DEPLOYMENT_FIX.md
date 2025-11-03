# Final Deployment Fix - Exact Steps

## The Problem
Vercel can't detect Next.js because it's looking in the root directory, but Next.js is in `apps/web/`.

## The Solution

Go to: **https://vercel.com/marwan-refaat/inbox-zero/settings**

### Step 1: Set Root Directory
1. Scroll to **"General"** section
2. Find **"Root Directory"**
3. Click the edit/pencil icon
4. Enter: `apps/web`
5. Click **Save**

### Step 2: Update Build Settings
1. Scroll to **"Build & Development Settings"**
2. Set **Install Command** to:
   ```
   cd ../.. && corepack enable && pnpm install --no-frozen-lockfile
   ```
3. Set **Build Command** to:
   ```
   pnpm build
   ```
4. Make sure **Framework Preset** is set to **Next.js** (should auto-detect after setting root directory)
5. Click **Save**

### Step 3: Deploy
After saving, go to **Deployments** tab and click **Redeploy**, or wait for automatic redeploy.

## Why This Works
- **Root Directory = apps/web**: Vercel will look for `package.json` in `apps/web/` where Next.js is installed
- **Install Command with `cd ../..`**: Goes to monorepo root to install all workspace dependencies
- **Build Command = pnpm build**: Runs the build script in `apps/web/package.json` which includes `next build`

## Current Status
✅ All environment variables configured (Database, Redis, API keys)
✅ Cron jobs configured in vercel.json
✅ Code pushed to GitHub
⏳ Waiting for root directory configuration in dashboard

