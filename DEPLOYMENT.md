# Deployment Guide - Palette Generator

## 🚀 Quick Deploy to Railway (Recommended - FREE)

### Step 1: Prepare Your Repository
1. Make sure your code is pushed to GitHub
2. Ensure you have a `.env` file with your Hugging Face token:
   ```
   HUGGING_FACE_TOKEN=your_token_here
   PORT=3000
   ```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your palette generator repository
5. Railway will automatically detect it's a Node.js app

### Step 3: Configure Environment Variables
1. In Railway dashboard, go to your project
2. Click on your service
3. Go to "Variables" tab
4. Add: `HUGGING_FACE_TOKEN` = your actual token
5. Railway will automatically set `PORT`

### Step 4: Deploy
- Railway will automatically build and deploy
- Your app will be available at: `https://your-app-name.railway.app`

## 💰 Alternative Free Options

### Render.com
1. Go to [render.com](https://render.com)
2. Connect GitHub account
3. Create new "Web Service"
4. Select your repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variable: `HUGGING_FACE_TOKEN`

### Fly.io
1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch`
3. Follow prompts to configure
4. Deploy: `fly deploy`

## 🔧 Production Optimizations

### For Railway (Free Tier)
- App sleeps after 30 minutes of inactivity
- Cold starts take ~10-15 seconds
- Perfect for personal projects and demos

### For Paid Tiers ($5/month)
- No sleep, always-on
- Better performance
- Custom domains
- More resources

## 📊 Cost Breakdown

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| Railway | ✅ 500 hours/month | $5/month | Easy deployment |
| Render | ✅ 750 hours/month | $7/month | Reliability |
| Fly.io | ✅ 3 VMs | $1.94/month | Performance |
| Vercel | ❌ No Node.js backend | $20/month | Frontend only |

## 🎯 Recommendation

**Start with Railway free tier** - it's the easiest to set up and perfect for getting your app live quickly. You can always upgrade later if you need more resources or better performance.

## 🔐 Security Notes

- Never commit your `.env` file to Git
- Use Railway's environment variables for secrets
- Consider adding rate limiting for production use
- Monitor your Hugging Face API usage to avoid unexpected costs
