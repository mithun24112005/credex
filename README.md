<p align="center">
  <br />
  <strong>StackPilot AI</strong>
  <br />
  <em>Optimize Your AI Stack in Minutes</em>
  <br />
  <br />
  <a href="https://stackpilot-ai.vercel.app" target="_blank">Live Demo</a> ·
  <a href="./ARCHITECTURE.md">Architecture</a> ·
  <a href="./USER_INTERVIEWS.md">User Research</a>
  <br />
  <br />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-22c55e" alt="Status" />
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue" alt="License" />
  <img src="https://img.shields.io/badge/CI-Passing-22c55e?logo=githubactions" alt="CI" />
</p>

---

## Overview

StackPilot AI helps startups and engineering teams understand what they're actually spending on AI tools. In under two minutes, you can inventory your team's subscriptions across ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and API providers — and get a conservative, actionable savings analysis.

The recommendations are intentionally restrained. No exaggerated savings targets, no forced tool cuts. Just clear visibility into plan fit, subscription overlap, and API spend patterns.

---

## Features

- **Multi-step audit wizard** — Guided onboarding that collects team context and tool subscriptions in under 2 minutes
- **Local calculation engine** — All audit logic runs client-side; no data leaves the browser unless you choose to save
- **Conservative recommendations** — Downgrade, consolidation, and API-optimization suggestions with capped savings estimates (max 38% of current spend)
- **Optimization score** — Weighted metric (42–98 range) based on savings rate and recommendation severity
- **Analytics dashboard** — Spend distribution, savings opportunities, and tool-level analysis with Recharts visualizations
- **AI-generated summaries** — Optional Groq-powered executive summary of your audit findings
- **Shareable reports** — Public, read-only URLs with zero lead data exposure; dynamic Open Graph metadata
- **Dark / light mode** — System-aware theme toggle with persistent preference
- **Demo mode** — Pre-populated sample data to explore the dashboard without running an audit
- **Error resilience** — Loading skeletons, retry actions, and graceful fallbacks throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| State | [Zustand](https://github.com/pmndrs/zustand) (localStorage persist) |
| Forms | react-hook-form + Zod |
| Charts | [Recharts](https://recharts.org/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Database | MongoDB + Mongoose |
| AI | Groq SDK (`openai/gpt-oss-120b`) |
| Testing | Vitest + React Testing Library |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/your-username/stackpilot-ai.git
cd stackpilot-ai
npm install
```

### Environment Variables

Copy the example file and fill in the values you need:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGODB_URI` | For persistence | MongoDB connection string for saving audits |
| `GROQ_API_KEY` | For AI summaries | API key from [console.groq.com](https://console.groq.com/keys) |
| `NEXT_PUBLIC_APP_URL` | For share links | Your production URL (e.g., `http://localhost:3000`) |

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The landing page loads immediately. Navigate to `/audit` to start the wizard.

### Run Tests

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:coverage  # With coverage report
```

### Lint & Typecheck

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

### Production Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── app/                    # Next.js routes and API endpoints
│   ├── page.tsx            # Landing page
│   ├── audit/page.tsx      # Audit wizard
│   ├── results/            # Demo and live results pages
│   ├── share/[publicId]/   # Public shareable reports
│   └── api/                # POST /api/audit, /lead, /summary; GET /api/share/[publicId]
│
├── features/audit-engine/  # Core business logic (pure TypeScript)
│   ├── calculators/        # Spend, score, and audit report calculators
│   ├── recommendations/    # Recommendation engine + summary generator
│   ├── rules/              # Per-tool analysis rules
│   └── pricing/            # Tool pricing configuration
│
├── services/               # Backend services (audit, AI, leads, email, share)
├── components/             # React components organized by domain
├── store/                  # Zustand stores (audit, UI)
├── lib/                    # Utilities, MongoDB connection, Groq client
├── models/                 # Mongoose schemas
├── validators/             # Zod schemas for API validation
├── config/                 # Tool definitions, site config
├── prompts/                # Groq prompt templates
├── types/                  # Shared TypeScript types
├── styles/                 # Tailwind base, CSS variables
└── tests/                  # Vitest test suites
```

---

## API Reference

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/audit` | Run audit engine, generate AI summary, save to MongoDB. Returns `publicId` and full report. |
| `POST` | `/api/lead` | Save contact details (email, company, role) linked to an audit. |
| `POST` | `/api/summary` | Generate AI summary for a report without persisting. |
| `GET` | `/api/share/[publicId]` | Retrieve a public report by its ID. |

---

## Testing

56+ tests across 6 files, organized by domain:

```
src/tests/
├── audit-engine/           # Report structure, recommendations, scores
│   ├── audit-engine.test.ts
│   ├── score-calculator.test.ts
│   └── recommendation-engine.test.ts
├── api/                    # Payload validation
│   └── validation.test.ts
└── utils/                  # Money helpers, spend calculations
    ├── money.test.ts
    └── spend-calculator.test.ts
```

---

## CI/CD

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request to `main`:

1. `npm ci` — clean install
2. `npm run lint` — ESLint
3. `npm run typecheck` — TypeScript
4. `npm run test` — Vitest
5. `npm run build` — Next.js production build

---

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Set the required environment variables in the Vercel dashboard
4. Deploy — zero configuration required

The `next.config.ts` already includes `serverExternalPackages: ["mongoose"]` for serverless compatibility.

### Environment Variables (production)

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/stackpilot` |
| `GROQ_API_KEY` | `gsk_xxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_APP_URL` | `https://stackpilot-ai.vercel.app` |

---

## Design Philosophy

The product is designed to feel like a premium AI-native SaaS tool — restrained colors, strong typography, spacious layouts, and subtle motion. Every recommendation is capped and conservative to maintain trust. The goal is operational clarity, not aggressive cost-cutting.

---

## License

This project is licensed under the Apache 2.0 License.

---

*Built with Next.js, MongoDB, and Groq.*
