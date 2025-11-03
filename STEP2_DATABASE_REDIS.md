# Step 2: Set Up Database and Redis

## ✅ Status
- Root Directory configured in Vercel ✅
- Anthropic API key updated in Vercel ✅
- Exposed keys removed from repository ✅

## Now: Create Database and Redis

I can't create these via CLI - you need to do this in the dashboards, then I'll add the connection strings to Vercel.

### Database Setup (2 minutes)

**Option A: Vercel Postgres (Recommended)**
1. Go to: https://vercel.com/dashboard/storage
2. Click **Create Database** → **Postgres**
3. Name: `inbox-zero-db`
4. Region: Choose closest to you
5. Plan: Hobby (free) or Pro
6. **Copy these connection strings**:
   - `POSTGRES_URL` or `POSTGRES_PRISMA_URL` → Use for `DATABASE_URL`
   - `POSTGRES_URL_NON_POOLING` → Use for `DIRECT_URL`

**Option B: Neon (Free Alternative)**
1. Go to: https://neon.tech → Sign up (free)
2. Click **New Project**
3. Copy the connection string
4. Use same string for both `DATABASE_URL` and `DIRECT_URL`

### Redis Setup (2 minutes)

**Upstash (Recommended - Free)**
1. Go to: https://upstash.com → Sign up (free)
2. Click **Create Database**
3. Name: `inbox-zero-redis`
4. Region: **Global** (best performance)
5. Type: **Regional**
6. **Copy**:
   - `UPSTASH_REDIS_URL` (starts with `https://`)
   - `UPSTASH_REDIS_TOKEN` (long alphanumeric string)

## Once You Have the Connection Strings

**Message me with:**
- `DATABASE_URL=...`
- `DIRECT_URL=...` (if different from DATABASE_URL)
- `UPSTASH_REDIS_URL=...`
- `UPSTASH_REDIS_TOKEN=...`

**Then I'll add them to Vercel via CLI and deploy!** 🚀

