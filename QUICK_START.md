# Quick Start: Deploy to Vercel

Your code is now on GitHub! Follow these quick steps to deploy:

## 1. Create Database (5 minutes)

**Option A: Vercel Postgres (Easiest)**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database** → **Postgres**
3. Name it `inbox-zero-db`
4. Copy the connection strings (you'll need them in step 3)

**Option B: Neon (Free Alternative)**
1. Go to [neon.tech](https://neon.tech) → Sign up
2. Create project → Copy connection string

## 2. Create Redis (5 minutes)

**Upstash (Recommended)**
1. Go to [upstash.com](https://upstash.com) → Sign up
2. Create Redis Database → Global region
3. Copy `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN`

## 3. Deploy to Vercel (10 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** → Select `marwanrefaat/inbox-zero`
3. **Project Settings:**
   - Framework: Next.js (auto)
   - Root: `.`
   - Build: `turbo run build --filter=./apps/web`
   - Install: `corepack enable && pnpm install --no-frozen-lockfile`
4. Click **Deploy** (it will fail - that's OK, we need to add env vars)

## 4. Add Environment Variables

In Vercel → Your Project → **Settings** → **Environment Variables**, add:

### Required (Copy from your local .env file):
- `DATABASE_URL` - from your database provider
- `DIRECT_URL` - same as DATABASE_URL
- `AUTH_SECRET` - your existing secret
- `EMAIL_ENCRYPT_SECRET` - your existing secret
- `EMAIL_ENCRYPT_SALT` - your existing secret
- `INTERNAL_API_KEY` - your existing secret
- `GOOGLE_CLIENT_ID` - your existing ID
- `GOOGLE_CLIENT_SECRET` - your existing secret
- `GOOGLE_PUBSUB_TOPIC_NAME` - use: `inbox-zero-topic`
- `GOOGLE_PUBSUB_VERIFICATION_TOKEN` - use: `inbox-zero-token`
- `OPENAI_API_KEY` - your existing key
- `ANTHROPIC_API_KEY` - your existing key
- `UPSTASH_REDIS_URL` - from Upstash
- `UPSTASH_REDIS_TOKEN` - from Upstash
- `NEXT_PUBLIC_BASE_URL` - set after first deployment

### Important for Admin Access:
- `ADMINS` = `marwan@marwanrefaat.com`

## 5. Get Your Vercel URL

After deployment, copy your Vercel URL (e.g., `https://inbox-zero-abc123.vercel.app`)

## 6. Update Environment Variables

1. Set `NEXT_PUBLIC_BASE_URL` to your Vercel URL
2. Update Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Edit OAuth client
   - Add redirect URI: `https://your-project.vercel.app/api/auth/callback/google`
   - Add redirect URI: `https://your-project.vercel.app/api/google/linking/callback`

## 7. Run Database Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link
vercel login
vercel link

# Run migrations
cd apps/web
pnpm prisma migrate deploy
```

## 8. Test Deployment

1. Visit your Vercel URL
2. Try Google OAuth login
3. Visit `/admin` to test admin access
4. Check Vercel logs if there are errors

## Done! 🎉

Your app is live! For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

