# Deployment Status

## ✅ Completed

1. **Vercel Project Linked**: `marwan-refaat/inbox-zero`
2. **Environment Variables Added** (12 variables):
   - AUTH_SECRET
   - EMAIL_ENCRYPT_SECRET
   - EMAIL_ENCRYPT_SALT
   - INTERNAL_API_KEY
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GOOGLE_PUBSUB_TOPIC_NAME (from your setup)
   - GOOGLE_PUBSUB_VERIFICATION_TOKEN (from your setup)
   - OPENAI_API_KEY
   - ANTHROPIC_API_KEY
   - ADMINS=marwan@marwanrefaat.com
   - NODE_ENV, DEFAULT_LLM_PROVIDER, ECONOMY_LLM_PROVIDER

## ⚠️ Required Actions

### 1. Configure Root Directory (1 minute)

**Go to:** https://vercel.com/marwan-refaat/inbox-zero/settings

In "General" section:
- **Root Directory**: Set to `apps/web`
- **Build Command**: Change to `cd ../.. && pnpm build`
- **Install Command**: Keep as `cd ../.. && corepack enable && pnpm install --no-frozen-lockfile`

Click **Save**

### 2. Add Database & Redis (5 minutes)

**Database:**
- Go to: https://vercel.com/dashboard/storage → Create Postgres
- OR: https://neon.tech (free)
- Add to Vercel:
  ```bash
  vercel env add DATABASE_URL production
  vercel env add DIRECT_URL production
  ```

**Redis:**
- Go to: https://upstash.com → Create Redis
- Add to Vercel:
  ```bash
  vercel env add UPSTASH_REDIS_URL production
  vercel env add UPSTASH_REDIS_TOKEN production
  ```

### 3. Deploy

After step 1 & 2:
- Go to: https://vercel.com/marwan-refaat/inbox-zero
- Click **Redeploy** on latest deployment
- OR: `vercel --prod` from CLI

### 4. Update Base URL

After deployment succeeds:
```bash
vercel env add NEXT_PUBLIC_BASE_URL production
# Enter your Vercel URL when prompted
```

### 5. Update Google OAuth Redirect URIs

Go to: https://console.cloud.google.com/apis/credentials
- Edit OAuth client
- Add redirect URIs:
  - `https://your-vercel-url.vercel.app/api/auth/callback/google`
  - `https://your-vercel-url.vercel.app/api/google/linking/callback`
  - `https://your-vercel-url.vercel.app/api/google/calendar/callback`

## Current Deployment URL

https://inbox-zero-marwan-refaat.vercel.app

(Will work after configuring root directory and adding database/Redis)

