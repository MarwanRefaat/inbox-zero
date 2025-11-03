# Quick Deployment Checklist

Use this checklist to deploy Inbox Zero to Vercel with a database.

## Pre-Deployment

- [ ] Code is pushed to GitHub (`marwanrefaat/inbox-zero`)
- [ ] All local changes committed and pushed

## Database Setup

- [ ] **Choose database provider:**
  - [ ] Vercel Postgres (recommended)
  - [ ] Neon (alternative)
  - [ ] Supabase (alternative)
- [ ] Database created and connection strings copied
- [ ] Database connection tested

## Redis Setup

- [ ] **Choose Redis provider:**
  - [ ] Upstash Redis (recommended)
  - [ ] Vercel KV (alternative)
- [ ] Redis instance created
- [ ] Redis URL and token copied

## Vercel Setup

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import GitHub repository: `marwanrefaat/inbox-zero`
- [ ] Configure project settings:
  - Framework: Next.js
  - Root Directory: `.` (root)
  - Build Command: `corepack enable && pnpm install --no-frozen-lockfile && turbo run build --filter=./apps/web`
  - Install Command: `corepack enable && pnpm install --no-frozen-lockfile`

## Environment Variables

- [ ] Add all required environment variables (see VERCEL_DEPLOYMENT.md)
- [ ] **Database:**
  - [ ] `DATABASE_URL`
  - [ ] `DIRECT_URL`
- [ ] **Auth:**
  - [ ] `AUTH_SECRET`
  - [ ] `EMAIL_ENCRYPT_SECRET`
  - [ ] `EMAIL_ENCRYPT_SALT`
  - [ ] `INTERNAL_API_KEY`
- [ ] **Google OAuth:**
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `GOOGLE_PUBSUB_TOPIC_NAME`
  - [ ] `GOOGLE_PUBSUB_VERIFICATION_TOKEN`
- [ ] **LLM Providers:**
  - [ ] `OPENAI_API_KEY`
  - [ ] `ANTHROPIC_API_KEY`
- [ ] **Redis:**
  - [ ] `UPSTASH_REDIS_URL`
  - [ ] `UPSTASH_REDIS_TOKEN`
- [ ] **Base URL:**
  - [ ] `NEXT_PUBLIC_BASE_URL` (set to Vercel URL initially)

## First Deployment

- [ ] Deploy project (click "Deploy" in Vercel)
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors
- [ ] Copy production URL (e.g., `https://inbox-zero.vercel.app`)

## Post-Deployment

- [ ] **Update Base URL:**
  - [ ] Set `NEXT_PUBLIC_BASE_URL` to your Vercel URL
  - [ ] Redeploy if needed
- [ ] **Run Database Migrations:**
  ```bash
  # Install Vercel CLI
  npm i -g vercel
  
  # Link project
  vercel link
  
  # Run migrations
  cd apps/web
  pnpm prisma migrate deploy
  ```
- [ ] **Update Google OAuth:**
  - [ ] Add redirect URIs to Google Cloud Console:
    - `https://your-project.vercel.app/api/auth/callback/google`
    - `https://your-project.vercel.app/api/google/linking/callback`
- [ ] **Test Deployment:**
  - [ ] Visit your Vercel URL
  - [ ] Test Google OAuth login
  - [ ] Check for errors in Vercel logs

## Optional Setup

- [ ] **Custom Domain:**
  - [ ] Add domain in Vercel settings
  - [ ] Update DNS records
  - [ ] Update `NEXT_PUBLIC_BASE_URL`
  - [ ] Update Google OAuth redirect URIs
- [ ] **Cron Jobs:**
  - [ ] Verify cron jobs are configured in `vercel.json`
  - [ ] Test cron endpoints manually
- [ ] **Monitoring:**
  - [ ] Set up error tracking (Sentry, etc.)
  - [ ] Configure alerts
- [ ] **Admin Access:**
  - [ ] Set `ADMINS=marwan@marwanrefaat.com`
  - [ ] Test admin features at `/admin`

## Troubleshooting

- [ ] **Build Fails:**
  - Check environment variables are set
  - Verify build commands are correct
  - Check Vercel build logs
- [ ] **App Crashes:**
  - Check runtime logs in Vercel
  - Verify database connection
  - Check Redis connection
- [ ] **OAuth Not Working:**
  - Verify redirect URIs match Vercel URL
  - Check OAuth credentials
  - Review OAuth callback logs

## Done! 🎉

Your app should now be live at: `https://your-project.vercel.app`

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

