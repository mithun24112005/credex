# StackPilot AI — Architecture

## Overview

StackPilot AI is a Next.js 15 SaaS application that audits AI tooling spend and generates optimization recommendations. It uses a multi-step wizard to collect team context and tool subscriptions, runs a local audit engine, and optionally persists results to MongoDB with AI-generated summaries via Groq.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (client-side, localStorage persist) |
| Forms | react-hook-form + zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Database | MongoDB + Mongoose |
| AI | Groq SDK (openai/gpt-oss-120b) |
| Testing | Vitest + React Testing Library |

---

## Project Structure

```
src/
├── app/                     # Next.js App Router pages & API routes
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout (navbar, footer, theme)
│   ├── audit/page.tsx       # Multi-step audit wizard
│   ├── results/
│   │   ├── demo/page.tsx    # Demo results with sample data
│   │   └── live/page.tsx    # Live results from store or remote
│   ├── share/[publicId]/page.tsx  # Public shareable report
│   └── api/
│       ├── audit/route.ts   # POST — create audit (engine + AI + persist)
│       ├── lead/route.ts    # POST — save lead contact details
│       ├── summary/route.ts # POST — generate AI summary standalone
│       └── share/[publicId]/route.ts  # GET — fetch public report
│
├── components/
│   ├── audit/               # Multi-step wizard components
│   ├── charts/              # Recharts wrapper components (memoized)
│   ├── dashboard/           # Recommendation & stat cards
│   ├── landing/             # Landing page sections
│   ├── layout/              # Navbar, footer
│   ├── results/             # Results dashboard, loading, error, summary
│   ├── shared/              # Logo, theme toggle, skeleton, error-card
│   └── ui/                  # Button, Card (shadcn-style primitives)
│
├── features/audit-engine/   # Core business logic (no React dependency)
│   ├── calculators/         # Spend, score, and audit report calculators
│   ├── pricing/             # Tool pricing configuration
│   ├── recommendations/     # Recommendation engine + summary generator
│   ├── rules/               # Per-tool analysis rules
│   ├── types/               # Audit engine type definitions
│   └── utils/               # Money helpers, demo input data
│
├── services/
│   ├── ai/summary-service.ts    # Groq-powered AI summary generation
│   ├── audit/audit-service.ts   # Audit creation + database persistence
│   ├── email/email-service.ts   # Email notifications
│   ├── leads/lead-service.ts    # Lead capture logic
│   └── share/                   # Public report service + types
│
├── store/
│   ├── audit-store.ts       # Zustand store for audit wizard state
│   └── ui-store.ts          # UI state (mobile nav, etc.)
│
├── lib/
│   ├── audit-validation.ts  # Zod schemas for wizard steps
│   ├── groq.ts              # Groq client singleton
│   ├── mongodb.ts           # Cached MongoDB connection
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│
├── models/
│   ├── Audit.ts             # Mongoose schema + model
│   └── Lead.ts              # Mongoose schema + model
│
├── validators/
│   ├── audit.ts             # API request validation (Zod)
│   └── lead.ts              # Lead payload validation
│
├── config/
│   ├── audit.ts             # Tool names, plans, company stages, icons
│   └── site.ts              # Site name, nav items, tagline
│
├── hooks/
│   └── use-mounted.ts       # Hydration-safe mount detection
│
├── prompts/
│   └── audit-summary.ts     # Groq prompt template
│
├── types/
│   └── index.ts             # Shared TypeScript types
│
├── styles/
│   └── globals.css          # Tailwind base, CSS variables, utilities
│
└── tests/
    ├── audit-engine/        # Engine, score, recommendation tests
    ├── api/                 # Validation tests
    ├── utils/               # Money, spend calculator tests
    └── setup.ts             # Test environment setup
```

---

## Data Flow

### Audit Flow (wizard → results → share)

```
User → Landing → Wizard (3 steps)
                       │
                  Zustand store
                  (localStorage persist)
                       │
                  Results page
                  (local calculation)
                       │
                  ┌────┴────┐
                  │         │
            Save Audit   View Results
                  │         │
            POST /api/audit  │
                  │          │
          ┌───────┴──────┐   │
          │              │   │
    Audit Engine    Groq AI  │
    (local calc)   Summary   │
          │              │   │
          └───────┬──────┘   │
                  │          │
            MongoDB Store    │
             (if API key)    │
                  │          │
            publicId ────────┘
                  │
          /share/[publicId]
          (public, read-only)
```

### API Routes

| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| POST | `/api/audit` | Run audit engine + Groq summary + save to MongoDB | None |
| POST | `/api/lead` | Save user contact details linked to an audit | None |
| POST | `/api/summary` | Generate Groq summary for a report (standalone) | None |
| GET | `/api/share/[publicId]` | Fetch public audit report | None |

---

## Audit Engine

The audit engine is a pure TypeScript module in `src/features/audit-engine/`. It has no React or database dependencies.

### Pipeline

```
Tool Input → analyzeTool() → per-tool savings estimate
                               │
                    generateRecommendations()
                    (downgrade, consolidation, API-optimization, healthy-spend)
                               │
                    calculateOptimizationScore()
                    (savings rate + severity penalty, clamped 42-98)
                               │
                    calculateSpendBreakdown()
                               │
                    generateAuditSummary()
                    (frontend-generated fallback text)
                               │
                    AuditReport
```

### Key Design Decisions

- **Conservative savings**: All savings are capped at 38% of current spend maximum. Per-tool savings have their own caps (28-32% depending on scenario).
- **Score bounds**: Optimization score is clamped to 42-98 (never perfect, never catastrophically low).
- **Healthy-spend fallback**: If no recommendation exceeds a threshold, a "healthy-spend" placeholder is added to avoid empty states.
- **No hard tool cuts**: The engine recommends downgrades and consolidations, never outright tool removal.

---

## State Management

**Zustand** with `persist` middleware (localStorage key: `stackpilot-audit`).

Persisted fields:
- `currentStep`, `teamSize`, `companyStage`, `useCase`
- `tools` array with id, name, plan, monthlySpend, seats
- `totalMonthlySpend`, `estimatedYearlySpend`

Not persisted (ephemeral):
- Results dashboard state (recalculated on render)
- UI state (mobile nav, etc.)

---

## AI Summary Service

The AI summary uses Groq's API with the `openai/gpt-oss-120b` model.

```
generateAiSummary(report)
  ├── runGroqSummary() → Groq API
  │     ├── success → return AI-generated summary
  │     └── failure → log error, fall through
  └── createFallbackSummary() → local template
```

The fallback summary is always available even without a Groq API key, ensuring the feature never breaks.

---

## Testing

| Layer | Tool | Location |
|-------|------|----------|
| Unit tests | Vitest | `src/tests/` |
| Audit engine | Vitest | `src/tests/audit-engine/` |
| Validation | Vitest | `src/tests/api/` |
| Utilities | Vitest | `src/tests/utils/` |

Run tests: `npm run test` (56+ tests across 6 files)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | For persistence | MongoDB connection string |
| `GROQ_API_KEY` | For AI summaries | Groq API key |
| `NEXT_PUBLIC_APP_URL` | For share links | Production URL (e.g., `https://stackpilot.vercel.app`) |

---

## Deployment

The app is designed for Vercel deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions.

Build command: `npm run build`
Output directory: `.next` (default for Next.js)
Node.js version: 20.x
