# Quick Deploy to Vercel - Follow These Steps

## Step 1: Create Database (2 minutes)

**Option A: Vercel Postgres (Easiest)**
1. Go to: https://vercel.com/dashboard
2. Click **Storage** tab → **Create Database** → **Postgres**
3. Name: `inbox-zero-db`
4. Region: Choose closest to you
5. Plan: Hobby (free) or Pro
6. **Copy these connection strings**:
   - `POSTGRES_URL` (for Prisma)
   - `POSTGRES_URL_NON_POOLING` (for migrations)

**Option B: Neon (Free Alternative)**
1. Go to: https://neon.tech → Sign up
2. Create project → Copy connection string
3. Use for both `DATABASE_URL` and `DIRECT_URL`

## Step 2: Create Redis (2 minutes)

**Upstash (Recommended)**
1. Go to: https://upstash.com → Sign up (free)
2. **Create Redis Database**
3. Choose **Global** region
4. Copy:
   - `UPSTASH_REDIS_URL`
   - `UPSTASH_REDIS_TOKEN`

## Step 3: Deploy to Vercel (5 minutes)

1. **Go to**: https://vercel.com/new
2. **Click "Import"**
3. **Select GitHub** → Authorize if needed
4. **Select repository**: `MarwanRefaat/inbox-zero`
5. **Configure Project**:
   - Framework: Next.js (auto-detected) ✓
   - Root Directory: `.` (leave as is)
   - Build Command: `turbo run build --filter=./apps/web`
   - Install Command: `corepack enable && pnpm install --no-frozen-lockfile`
   - Output Directory: (leave empty)
6. **Click "Deploy"** (will fail initially - that's OK!)

## Step 4: Add Environment Variables (5 minutes)

**In Vercel Dashboard → Your Project → Settings → Environment Variables**

### Copy from your local .env file:
```
AUTH_SECRET=a09fab7a826941b19759f41ca97ac1a16d08a997c76a2cf87293fe8b64b0a8b0
EMAIL_ENCRYPT_SECRET=41114daab6d252d3018efe03bb0a8ce20cf4810fa1813f6fa531069bc4c81520
EMAIL_ENCRYPT_SALT=e7ad4aa6e9908eb336f2e6f4948a4193
INTERNAL_API_KEY=1c20e829065e3661fe3f9a8a6fdeacadd5ce1f0b7cc3f7bdd2dc1f0b8a4db237

GOOGLE_CLIENT_ID=1054716156757-da0v3lcbj4q5a6sijnfbk7qr7eh55uep.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

OPENAI_API_KEY=<your-openai-api-key>
ANTHROPIC_API_KEY=<your-anthropic-api-key>

GOOGLE_PUBSUB_TOPIC_NAME=local-dev-topic
GOOGLE_PUBSUB_VERIFICATION_TOKEN=local-dev-token

UPSTASH_REDIS_URL=<from-step-2>
UPSTASH_REDIS_TOKEN=<from-step-2>

DATABASE_URL=<from-step-1>
DIRECT_URL=<from-step-1>

ADMINS=marwan@marwanrefaat.com
NODE_ENV=production
```

### Then add:
```
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```
(Update this after you get your Vercel URL in step 5)

## Step 5: Get Your Vercel URL

After adding env vars, **redeploy**:
1. Go to **Deployments** tab
2. Click **...** on latest deployment → **Redeploy**
3. Copy your Vercel URL (e.g., `https://inbox-zero-abc123.vercel.app`)

## Step 6: Update Environment Variables

1. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL
2. **Redeploy again**

## Step 7: Update Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client
3. **Add redirect URIs**:
   - `https://your-project.vercel.app/api/auth/callback/google`
   - `https://your-project.vercel.app/api/google/linking/callback`
   - `https://your-project.vercel.app/api/google/calendar/callback`

## Step 8: Run Database Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project (from project root)
vercel link

# Run migrations
cd apps/web
pnpm prisma migrate deploy
```

## Step 9: Test Deployment

1. Visit your Vercel URL
2. Try Google OAuth login
3. Visit `/admin` (should work with marwan@marwanrefaat.com)
4. Test calendar integration

## Done! 🎉

Your app is now live on Vercel!

