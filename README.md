# 🧠 Intelligence Gathering System

> Autonomous intelligence system using **Browserbase + Stagehand v3** for scraping GitHub Trending, Hacker News, ArXiv, Reddit with AI-powered scoring, ICDPA-compliant local Iowa storage, and automated deployment engine.

## 🎯 System Overview

This system implements a complete intelligence gathering pipeline that:
- **Discovers** trending tools, papers, and discussions across multiple platforms
- **Scores** content based on YOUR behavior and preferences (self-learning)
- **Stores** everything locally in Leland, Iowa (encrypted, ICDPA compliant)
- **Automates** installation, integration, and deployment of high-value discoveries

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│   SOURCES   │────▶│ BROWSER AGENT│────▶│   SCORING     │
│  GitHub/HN  │     │ Browserbase  │     │ AI-Powered    │
│  ArXiv/Reddit│     │ + Stagehand  │     │ Relevance     │
└─────────────┘     └──────────────┘     └───────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│   ACTIONS   │◀────│  SYNC LAYER  │◀────│    STORAGE    │
│ Auto-install│     │  Learning    │     │  Local Iowa   │
│  Workflows  │     │  Adaptive    │     │  Encrypted    │
└─────────────┘     └──────────────┘     └───────────────┘
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- Browserbase account ([get API key](https://browserbase.com))
- Gemini API key ([get here](https://ai.google.dev))

### Installation

```bash
# Clone the repository
git clone https://github.com/Ark95x-sAn/intelligence-gathering-system.git
cd intelligence-gathering-system

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Initialize database
npm run db:init

# Start the system
npm run dev
```

### Run as 24/7 Service (Iowa Local)

```bash
npm run install:service
# System now runs continuously, gathering intelligence hourly
```

---

## 📁 Project Structure

```
intelligence-gathering-system/
├── config/
│   ├── browserbase-config.ts    # Stagehand v3 + stealth settings
│   ├── sources.ts               # API endpoints for all sources
│   └── scoring-weights.ts       # ML weights (auto-tuned)
├── src/
│   ├── agents/
│   │   ├── github-scraper.ts    # GitHub Trending API
│   │   ├── hn-collector.ts      # Hacker News Firebase API
│   │   ├── arxiv-fetcher.ts     # ArXiv paper search
│   │   └── reddit-parser.ts     # Reddit RSS + JSON feeds
│   ├── scoring/
│   │   ├── relevance-engine.ts  # Keyword + semantic matching
│   │   ├── velocity-calculator.ts # Growth rate analysis
│   │   └── behavior-learner.ts   # Your interaction patterns
│   ├── storage/
│   │   ├── db-schema.sql        # SQLite schema
│   │   ├── sync-manager.ts      # ICDPA-compliant storage
│   │   └── encryption.ts        # AES-256 encryption
│   ├── actions/
│   │   ├── auto-installer.ts    # npm/git auto-install
│   │   ├── workflow-generator.ts # Boilerplate generation
│   │   └── deployment-engine.ts  # Integration automation
│   └── main.ts                  # Core intelligence loop
├── scripts/
│   ├── init-db.js               # Database initialization
│   └── install-service.js       # Systemd/PM2 service setup
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔍 Data Sources

### 1. GitHub Trending
**API**: `huchenme/github-trending-api` or `maulikshetty/GiTrends`
- Daily/weekly/monthly trending repositories
- Language filtering
- Star velocity tracking

### 2. Hacker News
**API**: `https://hacker-news.firebaseio.com/v0/`
- Top stories, best stories, new stories
- Real-time updates
- Comment analysis

### 3. ArXiv
**API**: `http://export.arxiv.org/api/query`
- Computer Science papers (cs.AI, cs.LG, cs.SE)
- Search by keywords, categories
- Citation tracking

### 4. Reddit
**Method**: RSS + JSON endpoints
- Subreddit feeds with upvote filtering
- `/r/programming`, `/r/MachineLearning`, `/r/webdev`
- Comment sentiment analysis

---

## 🧮 Intelligence Scoring

### Scoring Algorithm

```typescript
finalScore = (
  relevance * 0.35 +      // Keyword match + semantic similarity
  velocity * 0.25 +       // Growth rate (stars/day, upvotes/hr)
  authority * 0.20 +      // Source credibility (karma, repo stars)
  recency * 0.15 +        // Time decay factor
  engagement * 0.05       // Comments, forks, discussions
) * behaviorMultiplier    // YOUR interaction patterns
```

### Self-Learning Behavior
The system tracks:
- What you click on
- How long you spend on topics
- What you install/star/bookmark
- Your search patterns

**Result**: Weights auto-adjust over 2-4 weeks to match YOUR preferences

---

## 💾 Local Storage (Iowa ICDPA Compliant)

### Privacy Features
- ✅ **Local-only**: All data stored in `~/intelligence-system/data/`
- ✅ **AES-256 encryption** at rest
- ✅ **No cloud sync**: ICDPA compliant
- ✅ **90-day auto-purge**: NIST SP 800-88 secure deletion
- ✅ **User-controlled**: Full data ownership

### Database Schema

```sql
CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT UNIQUE,
  score INTEGER,
  created_at TIMESTAMP,
  metadata JSON
);

CREATE TABLE user_behavior (
  action TEXT,
  item_id INTEGER,
  timestamp TIMESTAMP,
  duration INTEGER
);
```

---

## 🤖 Browser Agent (Stagehand v3)

### Anti-Detection Features
- **Browserbase Proxies**: Rotating residential IPs
- **Advanced Stealth Mode**: Evade fingerprinting
- **User-Agent Rotation**: Mimic real browsers
- **Random Delays**: 2-8 second humanlike pauses
- **Honeypot Avoidance**: Skip hidden elements

### Stagehand v3 Performance
- ⚡ **20-40% faster** than v2 (automatic caching)
- 🎯 **Enhanced extraction** across iframes/shadow DOM
- 🔍 **CSS selectors** for precise targeting
- 🧠 **Gemini 2.0 Flash** (best-performing model)

---

## 🚀 Action Engine

### Automated Actions (when score > 75)

1. **Auto-Install Tools**
   ```bash
   npm install <package>
   git clone <repo>
   ```

2. **Generate Workflows**
   - Create boilerplate code
   - Setup configuration
   - Add to dev environment

3. **Deploy Improvements**
   - Update dependencies
   - Integrate new APIs
   - Optimize existing code

4. **Monitoring**
   - Track usage
   - Report errors
   - Suggest alternatives

### Safety Mechanisms
- ⚠️ **Require confirmation**: System-level changes
- 🔄 **Rollback capable**: Git version control
- 🧪 **Test before deploy**: Automated testing
- 📝 **Audit logs**: All actions tracked

---

## ⚙️ Configuration

### Environment Variables

```bash
# Required
BROWSERBASE_API_KEY=your_key
BROWSERBASE_PROJECT_ID=your_project
GEMINI_API_KEY=your_gemini_key

# Optional
OPENAI_API_KEY=your_openai_key  # For custom models
DB_PATH=~/intelligence-system/data/intel.db
SYNC_INTERVAL_MINUTES=60
ACTION_SCORE_THRESHOLD=75
```

### Browserbase Flags

```bash
--proxies              # Enable residential proxies
--advancedStealth      # Advanced anti-detection
--keepAlive            # Persist browser sessions
--browserWidth 1920    # Viewport width
--browserHeight 1080   # Viewport height
--experimental         # Enable Stagehand v3 features
```

---

## 📊 Expected Results

| Metric | Value |
|--------|-------|
| Items discovered/day | 20-50 high-quality |
| Auto-installed tools/week | 5-10 |
| Workflow optimizations/month | 2-3 |
| Learning period | 2-4 weeks |
| Time saved | ~10 hours/week |

---

## 🛡️ Security & Compliance

### Iowa Consumer Data Protection Act (ICDPA)
- ✅ Local storage only (no cloud)
- ✅ Encrypted at rest (AES-256)
- ✅ 90-day retention with secure deletion
- ✅ User-controlled data
- ✅ No third-party sharing

### NIST SP 800-88 Compliance
- Secure data sanitization on purge
- Chain of custody logs
- Audit trail for all deletions

---

## 🔧 Development

### Scripts

```bash
npm run dev          # Development mode with hot reload
npm run build        # Compile TypeScript to dist/
npm start            # Production mode
npm run db:init      # Initialize SQLite database
npm test             # Run test suite
```

### Adding New Sources

```typescript
// src/agents/new-source.ts
export async function fetchNewSource() {
  const items = await fetch('API_ENDPOINT');
  return items.map(item => ({
    title: item.title,
    url: item.url,
    score: calculateScore(item)
  }));
}
```

---

## 📚 References

- [Browserbase MCP Server](https://github.com/browserbase/mcp-server-browserbase)
- [Stagehand v3 Docs](https://docs.stagehand.dev/)
- [Open Operator Template](https://github.com/browserbase/open-operator)
- [Mastra Browsing Agent](https://github.com/mastra-ai/template-browsing-agent)
- [GitHub Trending API](https://github.com/huchenme/github-trending-api)
- [Hacker News API](https://github.com/HackerNews/API)
- [ArXiv API](https://info.arxiv.org/help/api/)
- [Iowa ICDPA Compliance](https://datadestruction.com/secure-digital-data-destruction-compliance-in-iowa-2025-enterprise-guide/)

---

## 📝 License

Apache 2.0 License - see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

Built with:
- **Browserbase** - Cloud browser infrastructure
- **Stagehand v3** - AI-powered web automation
- **Gemini 2.0 Flash** - LLM for intelligent extraction
- **SQLite** - Embedded database
- **TypeScript** - Type-safe development

---

## 🚧 Roadmap

- [ ] Add Product Hunt integration
- [ ] Implement sentiment analysis on comments
- [ ] Create web dashboard for monitoring
- [ ] Add Slack/Discord notifications
- [ ] Support for custom data sources
- [ ] ML-based trend prediction
- [ ] Export reports (PDF/CSV)

---

**Made with ❤️ in Leland, Iowa** 🌾
