# Vercel Deployment Guide for Inbox Zero

This guide will help you deploy Inbox Zero to Vercel with a production database.

## Prerequisites

- GitHub repository pushed to `marwanrefaat/inbox-zero`
- Vercel account (Pro plan recommended for better limits)
- Domain name (optional, Vercel provides free domain)

## Step 1: Set Up Database

### Option A: Vercel Postgres (Recommended - Easiest Integration)

1. Go to your Vercel dashboard → **Storage** tab
2. Click **Create Database** → Select **Postgres**
3. Choose a name (e.g., `inbox-zero-db`)
4. Select a region closest to your users
5. Choose plan (Hobby is free for development)
6. **Copy the connection strings** - you'll need:
   - `POSTGRES_URL` (main connection)
   - `POSTGRES_PRISMA_URL` (for Prisma)
   - `POSTGRES_URL_NON_POOLING` (for migrations)

### Option B: Neon (Serverless Postgres - Good Alternative)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Use the connection string for `DATABASE_URL` and `DIRECT_URL`

### Option C: Supabase (Full-Featured Option)

1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Settings → Database
3. Copy the connection string
4. Use it for `DATABASE_URL` and `DIRECT_URL`

## Step 2: Set Up Redis

### Option A: Upstash Redis (Recommended for Vercel)

1. Go to [upstash.com](https://upstash.com) and sign up
2. Create a Redis database
3. Choose **Global** region for better performance
4. Copy:
   - `UPSTASH_REDIS_URL`
   - `UPSTASH_REDIS_TOKEN`

### Option B: Vercel KV (Redis-compatible)

1. In Vercel dashboard → **Storage** → **KV**
2. Create a new KV database
3. Copy the connection details

## Step 3: Connect Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Project**
3. Select **GitHub** and authorize Vercel
4. Select your repository: `marwanrefaat/inbox-zero`
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: `cd ../.. && turbo run build --filter=./apps/web`
   - **Install Command**: `cd ../.. && corepack enable && pnpm install --no-frozen-lockfile`
   - **Output Directory**: Leave empty (auto-detected)

## Step 4: Configure Environment Variables

Go to **Settings** → **Environment Variables** in your Vercel project and add:

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
DIRECT_URL=postgresql://user:password@host:5432/dbname?sslmode=require

# Auth & Security
AUTH_SECRET=your-auth-secret-generate-with-openssl-rand-hex-32
EMAIL_ENCRYPT_SECRET=your-email-encrypt-secret-generate-with-openssl-rand-hex-32
EMAIL_ENCRYPT_SALT=your-email-encrypt-salt-generate-with-openssl-rand-hex-16
INTERNAL_API_KEY=your-internal-api-key-generate-with-openssl-rand-hex-32

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id-from-console
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-console

# Google PubSub (Required - can use placeholder for now)
GOOGLE_PUBSUB_TOPIC_NAME=your-topic-name
GOOGLE_PUBSUB_VERIFICATION_TOKEN=your-verification-token

# LLM Providers (Replace with your actual API keys)
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-api03-your-anthropic-api-key-here

# Redis
UPSTASH_REDIS_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_TOKEN=your-redis-token

# Base URL (Update after first deployment to get your Vercel URL)
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```

### Optional Variables (Recommended)

```bash
# Node Environment
NODE_ENV=production

# LLM Configuration
DEFAULT_LLM_PROVIDER=anthropic
ECONOMY_LLM_PROVIDER=openai

# Admin Access (Add your email)
ADMINS=marwan@marwanrefaat.com

# If using Fluid Compute is off, set max duration
MAX_DURATION=300
```

## Step 5: Update Google OAuth Settings

After first deployment, you'll get a Vercel URL. Update your Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client
3. Add to **Authorized redirect URIs**:
   - `https://your-project.vercel.app/api/auth/callback/google`
   - `https://your-project.vercel.app/api/google/linking/callback`
4. Save changes

## Step 6: Run Database Migrations

After first deployment, run migrations:

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
cd apps/web
pnpm prisma migrate deploy
```

### Option B: Using Vercel Postgres (if using Vercel Postgres)

1. Go to Vercel dashboard → Storage → Your Postgres database
2. Click **Query** tab
3. Run migrations manually or use Prisma Studio

### Option C: Local Migration

```bash
# Set DATABASE_URL to production database
export DATABASE_URL="your-production-database-url"

# Run migrations
cd apps/web
pnpm prisma migrate deploy
```

## Step 7: Configure Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_BASE_URL` environment variable
5. Update Google OAuth redirect URIs with your custom domain

## Step 8: Set Up Cron Jobs (Optional)

The app needs cron jobs for:
- Email watching
- Summary emails
- Cleanup tasks

### Using Vercel Cron

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/watch/all",
      "schedule": "0 1 * * *"
    },
    {
      "path": "/api/resend/summary/all",
      "schedule": "0 16 * * 1"
    },
    {
      "path": "/api/reply-tracker/disable-unused-auto-draft",
      "schedule": "0 3 * * *"
    }
  ]
}
```

### Alternative: Upstash QStash

1. Sign up at [upstash.com](https://upstash.com)
2. Create a QStash schedule
3. Add `QSTASH_TOKEN` to environment variables

## Step 9: Verify Deployment

1. Visit your Vercel deployment URL
2. Check that the app loads
3. Try signing in with Google OAuth
4. Check Vercel logs for any errors

## Troubleshooting

### Build Errors

- **"Module not found"**: Ensure all dependencies are in `package.json`
- **"Prisma errors"**: Check that `DATABASE_URL` is set correctly
- **"Environment variable missing"**: Verify all required env vars are set

### Runtime Errors

- **Database connection**: Check `DATABASE_URL` format and SSL mode
- **OAuth errors**: Verify redirect URIs match your Vercel URL
- **Redis errors**: Check `UPSTASH_REDIS_URL` and token

### Performance Issues

- Enable **Fluid Compute** in Vercel project settings for better performance
- Use **Edge Functions** where possible
- Consider upgrading Vercel plan for better limits

## Important Notes

1. **Security**: Never commit `.env` files to Git
2. **Database Backups**: Set up regular backups for your database
3. **Monitoring**: Consider adding Sentry or similar for error tracking
4. **SSL**: Vercel automatically provides SSL certificates
5. **Rate Limits**: Be aware of Vercel function execution time limits

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Inbox Zero GitHub Issues](https://github.com/marwanrefaat/inbox-zero/issues)

