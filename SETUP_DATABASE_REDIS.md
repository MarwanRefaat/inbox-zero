# Quick Database & Redis Setup

You need to set up these two services before deployment. Here's the fastest way:

## Database Setup (2 minutes)

### Option 1: Vercel Postgres (Recommended)
1. Open: https://vercel.com/dashboard/storage
2. Click **Create Database** → **Postgres**
3. Name: `inbox-zero-db`
4. Region: Your choice
5. **Copy these values**:
   - `POSTGRES_URL` → Use for `DATABASE_URL`
   - `POSTGRES_URL_NON_POOLING` → Use for `DIRECT_URL`

### Option 2: Neon (Free, 1 minute)
1. Go to: https://neon.tech → Sign up (free)
2. Click **New Project**
3. Copy the connection string
4. Use same string for both `DATABASE_URL` and `DIRECT_URL`

## Redis Setup (2 minutes)

### Upstash (Free)
1. Go to: https://upstash.com → Sign up (free)
2. Click **Create Database**
3. Name: `inbox-zero-redis`
4. Region: **Global** (best performance)
5. Type: **Regional**
6. **Copy**:
   - `UPSTASH_REDIS_URL`
   - `UPSTASH_REDIS_TOKEN`

## Add to Vercel

Once you have the values, run these commands:

```bash
cd /Users/marwanrefaat/Documents/GitHub/inbox-zero

# Add database
vercel env add DATABASE_URL production
# Paste your database URL when prompted

vercel env add DIRECT_URL production  
# Paste same URL (or non-pooling URL if using Vercel Postgres)

# Add Redis
vercel env add UPSTASH_REDIS_URL production
# Paste your Redis URL

vercel env add UPSTASH_REDIS_TOKEN production
# Paste your Redis token
```

## Then Deploy

After adding database and Redis:

```bash
# Deploy to production
vercel --prod
```

Or visit: https://vercel.com/dashboard → Your Project → Deployments → Redeploy

