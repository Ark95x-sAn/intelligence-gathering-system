# 📦 Installation Guide

> Complete setup instructions for the Intelligence Gathering System in Leland, Iowa

---

## 🎯 Prerequisites

Before you begin, ensure you have:

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Browserbase Account** - [Sign up](https://www.browserbase.com/)
- **Gemini API Key** - [Get here](https://ai.google.dev/)

---

## ⚡ Quick Install (5 Steps)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/Ark95x-sAn/intelligence-gathering-system.git

# Navigate to directory
cd intelligence-gathering-system

# Install all dependencies
npm install
```

**Expected output:**
```
added 247 packages in 45s
```

---

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your editor
nano .env  # or use: code .env, vim .env
```

**Required API Keys** (add to `.env`):

```bash
# Browserbase Configuration
BROWSERBASE_API_KEY=bb_your_actual_api_key_here
BROWSERBASE_PROJECT_ID=your_project_id_here

# AI Model (Stagehand uses Gemini by default)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Use different AI model
# OPENAI_API_KEY=sk-your_openai_key  # For GPT-4
# ANTHROPIC_API_KEY=your_claude_key  # For Claude
```

**How to get API keys:**

1. **Browserbase**: 
   - Go to [browserbase.com](https://www.browserbase.com/)
   - Sign up → Dashboard → API Keys
   - Copy `API Key` and `Project ID`

2. **Gemini**:
   - Go to [ai.google.dev](https://ai.google.dev/)
   - Get API Key → Create new key
   - Copy the key

---

### Step 3: Initialize Database

```bash
# Create SQLite database and tables
npm run db:init
```

**Expected output:**
```
✅ Database initialized at ~/intelligence-system/data/intel.db
✅ Created tables: items, user_behavior, sources, scores
✅ Encryption enabled (AES-256)
```

**Database location:** `~/intelligence-system/data/intel.db`

---

### Step 4: Start the System

**Option A: Development Mode** (with hot reload)
```bash
npm run dev
```

**Option B: Production Mode**
```bash
# Build first
npm run build

# Then start
npm start
```

**Expected output:**
```
🧠 Intelligence System Starting...
✅ Connected to Browserbase
✅ Stagehand v3 initialized (Gemini 2.0 Flash)
✅ Database loaded: 0 items
🔍 Starting intelligence gathering loop (every 60 minutes)

[12:00 PM] Fetching GitHub Trending...
[12:01 PM] Fetching Hacker News...
[12:02 PM] Fetching ArXiv papers...
[12:03 PM] Fetching Reddit...
[12:05 PM] Scored 47 items, 12 high-priority (>75)
✅ Cycle complete. Next run: 1:00 PM
```

---

### Step 5: Enable as 24/7 Service (Iowa Local)

**For Linux/Mac (systemd):**
```bash
npm run install:service
```

**For Windows (pm2):**
```bash
# Install PM2 globally
npm install -g pm2

# Start as service
pm2 start npm --name "intelligence-system" -- start

# Save configuration
pm2 save

# Enable auto-start on boot
pm2 startup
```

**Verify service is running:**
```bash
# Linux/Mac
systemctl status intelligence-system

# Windows
pm2 status
```

---

## 🔧 Advanced Configuration

### Custom Sync Interval

Edit `.env`:
```bash
# Run every 30 minutes (instead of 60)
SYNC_INTERVAL_MINUTES=30

# Adjust score threshold for actions
ACTION_SCORE_THRESHOLD=80  # Only auto-install items >80
```

### Enable Browserbase Proxies

Edit `config/browserbase-config.ts`:
```typescript
export const agentConfig = {
  browserbase: {
    proxies: true,           // ← Enable this
    advancedStealth: true,   // ← Enable this for Scale plan
    keepAlive: true
  }
};
```

### Custom Data Sources

Add to `config/sources.ts`:
```typescript
export const sources = [
  // Existing sources
  { name: 'github', url: 'https://api.github.com/...' },
  
  // Add your custom source
  { 
    name: 'producthunt',
    url: 'https://api.producthunt.com/v2/api/graphql',
    enabled: true
  }
];
```

---

## 📊 Verify Installation

### Check System Health

```bash
# View logs
npm run logs

# Check database
sqlite3 ~/intelligence-system/data/intel.db "SELECT COUNT(*) FROM items;"

# Test API connections
npm run test:connections
```

### Expected Data Flow (First Hour)

```
1. [12:00] System starts
2. [12:05] First scrape cycle completes
3. [12:05] Database: ~50 items collected
4. [12:05] Scored items: 12 high-priority
5. [12:06] Auto-actions: 2 repos cloned, 1 package installed
6. [1:00]  Second cycle begins
```

---

## 🛠️ Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Database permission denied

**Solution:**
```bash
# Create data directory
mkdir -p ~/intelligence-system/data

# Set permissions
chmod 755 ~/intelligence-system/data

# Re-run init
npm run db:init
```

### Issue: Browserbase connection error

**Solution:**
```bash
# Verify API key
echo $BROWSERBASE_API_KEY

# Test connection
curl -H "X-API-KEY: $BROWSERBASE_API_KEY" \
  https://api.browserbase.com/v1/sessions

# Check project ID
echo $BROWSERBASE_PROJECT_ID
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Rebuild TypeScript
npm run build

# Check tsconfig.json paths
cat tsconfig.json
```

---

## 🔐 Security Checklist

- [ ] `.env` file is NOT committed to git (in `.gitignore`)
- [ ] Database is encrypted (AES-256)
- [ ] Data directory has correct permissions (755)
- [ ] API keys are stored securely
- [ ] ICDPA compliance enabled (`IOWA_COMPLIANCE=true`)
- [ ] 90-day auto-purge configured (`DATA_RETENTION_DAYS=90`)

---

## 📍 Iowa-Specific Notes

### ICDPA Compliance

Your installation is automatically configured for Iowa Consumer Data Protection Act compliance:

✅ **Local storage only** - No cloud sync  
✅ **Encrypted at rest** - AES-256 encryption  
✅ **90-day retention** - Auto-purge old data  
✅ **NIST SP 800-88** - Secure deletion standard  
✅ **User-controlled** - Full data ownership  

### Data Location

```bash
# All data stored locally in:
~/intelligence-system/data/
  ├── intel.db           # Encrypted SQLite database
  ├── intel.db-wal       # Write-ahead log
  ├── intel.db-shm       # Shared memory
  └── logs/              # System logs
```

---

## 📚 Next Steps

After installation:

1. **Monitor the first cycle** - Watch logs to see data collection
2. **Review scored items** - Check what gets high scores
3. **Adjust weights** - Edit `config/scoring-weights.ts` if needed
4. **Let it learn** - System adapts to YOUR behavior over 2-4 weeks
5. **Check auto-actions** - See what gets installed automatically

---

## 🆘 Getting Help

- **Issues**: [GitHub Issues](https://github.com/Ark95x-sAn/intelligence-gathering-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ark95x-sAn/intelligence-gathering-system/discussions)
- **Browserbase Docs**: [docs.browserbase.com](https://docs.browserbase.com/)
- **Stagehand Docs**: [docs.stagehand.dev](https://docs.stagehand.dev/)

---

## ✅ Installation Complete!

Your intelligence gathering system is now running in **Leland, Iowa** 🌾

The system will:
- 🔍 Scrape sources every hour
- 🧮 Score items based on relevance
- 💾 Store data locally (encrypted)
- 🤖 Auto-install high-value tools
- 📚 Learn your preferences over time

**Monitor your system:**
```bash
# View real-time logs
npm run logs

# Check database stats
npm run stats

# View high-priority items
npm run priority
```

Enjoy your automated intelligence gathering! 🧠✨
