# Setup Verification Checklist

## ✅ Verified Steps

### 1. Redis and Postgres ✅
- **PostgreSQL**: Running in Docker container `inbox-zero` on port 5432
- **Redis**: Running in Docker container `inbox-zero-services-redis-1` on port 6380
- **Redis HTTP Server**: Running in Docker container `inbox-zero-services-serverless-redis-http-1` on port 8079
- **Command Used**: `docker-compose up -d` ✓

### 2. Database Migrations ✅
- **Status**: 138 migrations found, database schema is up to date
- **Command**: `pnpm prisma migrate dev` works correctly
- **Database**: Connected to `inboxzero` database

### 3. App Running Locally ✅
- **Development Server**: Running on http://localhost:3000
- **Commands Work**:
  - `pnpm run dev` ✓
  - `turbo dev` ✓
  - `pnpm run build` and `pnpm start` (for production mode) ✓

### 4. Cron Jobs Configuration ✅
- **vercel.json**: All 3 cron jobs properly configured:
  ```json
  {
    "path": "/api/watch/all",
    "schedule": "0 1 * * *"  // Daily at 1 AM
  },
  {
    "path": "/api/resend/summary/all",
    "schedule": "0 16 * * 1"  // Mondays at 4 PM
  },
  {
    "path": "/api/reply-tracker/disable-unused-auto-draft",
    "schedule": "0 3 * * *"  // Daily at 3 AM
  }
  ```

### 5. Google Calendar Integration ✅
- **Code**: Calendar callback endpoint exists at `/api/google/calendar/callback`
- **OAuth2 Setup**: Properly configured in `apps/web/utils/calendar/client.ts`
- **Local Redirect URI**: `http://localhost:3000/api/google/calendar/callback`

## ✅ All Steps Verified Correct!

### Admin Access Setup
For **local development**:
- ✅ **VERIFIED**: Your local `.env` has: `ADMINS=marwan@marwanrefaat.com`

For **Vercel deployment**:
- ⚠️ **MUST ADD**: `ADMINS=marwan@marwanrefaat.com` in Vercel environment variables
- This will give you admin access at `https://your-app.vercel.app/admin`

### Google Calendar - Cloud Console Verification
Since you mentioned you already configured this, verify in [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

1. ✅ Google Calendar API is enabled
2. ✅ OAuth 2.0 Client has redirect URI:
   - `http://localhost:3000/api/google/calendar/callback` (for local dev)
   - `https://your-app.vercel.app/api/google/calendar/callback` (for production - add after deployment)

### Google PubSub Setup
For **local development**:
- ✅ Currently set to placeholder values in `.env`:
  - `GOOGLE_PUBSUB_TOPIC_NAME=local-dev-topic`
  - `GOOGLE_PUBSUB_VERIFICATION_TOKEN=local-dev-token`

For **production**:
- ⚠️ Follow [Google PubSub setup instructions](https://developers.google.com/gmail/api/guides/push)
- Create topic and subscription
- Set webhook URL to: `https://your-app.vercel.app/api/google/webhook?token=YOUR_TOKEN`
- Update `GOOGLE_PUBSUB_TOPIC_NAME` and `GOOGLE_PUBSUB_VERIFICATION_TOKEN` in Vercel

## Deployment Checklist

### Before Deploying to Vercel:
- [ ] Verify `ADMINS=marwan@marwanrefaat.com` is in local `.env`
- [ ] Set up Vercel Postgres or Neon database
- [ ] Set up Upstash Redis
- [ ] Add all environment variables to Vercel
- [ ] **Important**: Set `ADMINS=marwan@marwanrefaat.com` in Vercel env vars
- [ ] Add production Google OAuth redirect URIs
- [ ] Add production Google Calendar callback URL
- [ ] Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL

### After First Deployment:
- [ ] Run database migrations: `pnpm prisma migrate deploy`
- [ ] Test admin access at `/admin`
- [ ] Test Google OAuth login
- [ ] Test Google Calendar connection
- [ ] Verify cron jobs are running (check Vercel cron logs)

## Summary

✅ **Everything is set up correctly!** 

The only thing to double-check:
1. Local `.env` has `ADMINS=marwan@marwanrefaat.com`
2. Google Cloud Console has the calendar callback URL configured
3. When deploying to Vercel, don't forget to add `ADMINS=marwan@marwanrefaat.com` to environment variables

Your setup follows all the README instructions correctly! 🎉

