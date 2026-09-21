# SaaSHub Database Setup with Supabase

## Quick Setup (5 minutes)

### Step 1: Create a Free Supabase Account
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up (free tier is perfect for this)
4. Create a new organization and project

### Step 2: Get Your Connection Details
1. In your Supabase dashboard, go to **Settings → Database**
2. Copy your **Connection String** (Postgres)
3. You'll see something like:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```

### Step 3: Update Your Environment Variables
1. Open `/Users/mayanksharma/Download/AG Projects/Saashub/.env.local`
2. Replace the values with your Supabase connection details:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_ID].supabase.co:5432/postgres
   DB_HOST=db.[YOUR_PROJECT_ID].supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=[YOUR_PASSWORD]
   ```

### Step 4: Initialize Your Database
Open terminal and run:
```bash
cd '/Users/mayanksharma/Download/AG Projects/Saashub'
bash scripts/init-db.sh
```

The script will:
- ✅ Create all necessary tables (products, users, reviews)
- ✅ Create indexes for fast searching
- ✅ Seed sample data (6 popular SaaS products)
- ✅ Display database statistics

### Step 5: Your App is Ready!
Your Next.js app is already running on http://localhost:3000

**What you can do now:**
- 🔍 Search for products by name
- 📝 Submit new SaaS products
- 🎯 Click on products to view details
- 🔄 All data is saved to your Supabase database

---

## Free Tier Limits (Supabase)
- ✅ Unlimited databases
- ✅ 500 MB storage
- ✅ 2 GB bandwidth per month
- ✅ Perfect for development and small projects
- ✅ Upgrade anytime without losing data

## Troubleshooting

### "Connection refused" error
- Check your `.env.local` has correct Supabase credentials
- Make sure your Supabase project is running (check dashboard)

### "psql: command not found"
- You don't need PostgreSQL installed locally for Supabase
- The init script will fail gracefully, but Supabase dashboard has a SQL editor

### Use Supabase Dashboard Instead
If the script fails, use Supabase's built-in SQL editor:
1. Go to your Supabase project
2. Click **SQL Editor**
3. Copy-paste the SQL from `scripts/init-db.sh` (lines 26-65)
4. Click **Run**

---

## Next Steps
- Deploy to Vercel (Free tier available)
- Add user authentication
- Build out review system
- Add more SaaS products

Need help? Check the Supabase docs: https://supabase.com/docs
