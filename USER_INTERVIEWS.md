# User Research — StackPilot AI

Between February and April 2026, I conducted 12 exploratory conversations with startup founders, engineering leads, and solo builders who actively pay for two or more AI tools. The goal was not to validate a polished product — it was to understand how teams actually think about their AI subscriptions and whether a lightweight audit tool would help them make better decisions.

Three conversations stood out as representative of the patterns I kept hearing. These are reconstructed from notes taken during those calls.

---

## User 1 — Early-Stage Startup Founder

**Role:** Co-founder & CTO, B2B SaaS startup  
**Team size:** 4 people  
**Current AI stack:** ChatGPT Team, Cursor Business, Claude Pro (personal accounts)  
**Approximate monthly spend:** ~$840  
**Technical comfort level:** High — writes code daily

This founder was the most self-aware about the problem. He knew they were likely overpaying but hadn't taken the time to assess it. The conversation kept circling back to the same tension: *speed of building* vs. *paying attention to overhead*.

### Primary Pain Points

- No single view of what the team was collectively spending across tools
- Personal Claude Pro accounts existed because two engineers preferred it for certain tasks, but the company was already paying for ChatGPT Team
- Cursor Business was provisioned per-seat but two members barely used it
- Month-over-month spend tracking was nonexistent — nobody had ever checked

### Key Quotes

> "I think we have four AI subscriptions right now. Maybe five? I'd have to log in to each one to check, which is honestly why I haven't."

> "The Cursor seats were an impulse buy after a demo. We never actually reviewed whether everyone needed them."

> "I don't want to cut anything that makes us faster. I just want to know if we're burning money on stuff nobody uses."

### What They Liked

- The simple step-by-step format made it easy to inventory their stack without digging through bank statements
- The savings breakdown by tool felt conservative in a good way — not like fake marketing math
- The recommendation to downgrade from Cursor Business to Pro for underutilized seats was exactly the kind of nudge he needed

### What Confused Them

- The optimization score was unclear — he asked what a "good" score looked like relative to other startups his size
- Wanted to understand whether the API spend estimates included prompt caching or were just raw token math
- The shareable report felt useful but he wasn't sure who he'd share it with internally at a 4-person company

### Suggestions They Made

- A simple benchmarks view — "other startups our size typically spend X on AI tools"
- Ability to invite team members to confirm their own usage rather than the founder guessing
- Slack integration for monthly reminders to review the stack

### Product Takeaways

This conversation validated that even technically sophisticated founders have no systems for AI spend tracking. The friction isn't unwillingness to optimize — it's that nobody has time to manually audit subscriptions. The product's value is in making the invisible visible with minimal effort.

---

## User 2 — Engineering Lead / Technical Manager

**Role:** Engineering Manager, Series A startup  
**Team size:** 12 engineers, plus a few designers using AI tools  
**Current AI stack:** Cursor Business (all engineers), GitHub Copilot (legacy contract), OpenAI API (varied usage), ChatGPT Team (design team)  
**Approximate monthly spend:** ~$2,100  
**Technical comfort level:** Very high

This was the most interesting conversation because the team had both a Cursor Enterprise negotiation coming up *and* a Copilot renewal. The manager was trying to decide whether to keep both, drop one, or consolidate.

### Primary Pain Points

- Hard to distinguish genuine need from habit — engineers used whatever they'd started with
- Copilot was on an annual contract from 2024 with auto-renewal terms that made it sticky even though most of the team had migrated to Cursor
- API usage was billed to a shared corporate card and nobody tracked it by project or team member
- No clear picture of whether the AI spend was growing month over month or staying flat

### Key Quotes

> "I'm pretty sure half of our Copilot seats are dead weight, but it's bundled into a contract that's a pain to unwind."

> "The API bill is the one I'd really like to understand. It fluctuates every month and I have no idea which team members are driving it."

> "I don't need a tool to tell me to cut costs aggressively. I need it to surface the stuff I'm not seeing so I can make a reasonable call."

### What They Liked

- The consolidation recommendation for overlapping coding tools was directly relevant to his situation
- The conservative savings estimates earned trust — he appreciated that the tool didn't claim unrealistic cuts
- Clean, minimal design felt appropriate for a B2B context
- The separation of API spend from subscription spend was helpful since those are fundamentally different cost categories

### What Confused Them

- The tool analysis didn't factor in whether a seat was actually being used — only the plan tier and seat count
- Wanted to see per-user activity before making downgrade decisions, but acknowledged that data would require integration
- The "enterprise overspend" recommendation assumed knowledge of enterprise plan features that his team didn't fully understand

### Suggestions They Made

- SSO or directory integration to map seats to active users
- Historical spend tracking so month-over-month changes are visible
- A pre-renewal reminder: "Your Copilot contract renews in 60 days — review usage now"

### Product Takeaways

The strongest signal from this conversation was that *contract lock-in* is a bigger problem than per-tool pricing. Teams get stuck in annual agreements and need help planning ahead of renewal dates, not just analyzing current spend. The audit itself was useful, but the real value would come from proactive reminders tied to the subscription calendar.

---

## User 3 — Solo Builder / Indie Hacker

**Role:** Independent developer building a developer tool  
**Team size:** 1  
**Current AI stack:** ChatGPT Plus, Claude Pro, Gemini Advanced, occasional OpenAI API usage  
**Approximate monthly spend:** ~$85  
**Technical comfort level:** High

This was a different kind of conversation. The spend was small in absolute terms, but *per capita* it was high. The solo builder had accumulated subscriptions over time by testing new tools and never canceling the old ones.

### Primary Pain Points

- Three overlapping general AI subscriptions with nearly identical capabilities
- No clear sense of which tool he actually preferred — he rotated between them depending on whatever was newest
- The $85/month felt individually negligible but collectively added up to over $1,000/year
- Knew he should cancel at least two subscriptions but kept putting it off

### Key Quotes

> "I signed up for Gemini Advanced because it had a free trial and I just never turned it off. I use it maybe once a month."

> "It's not that the money matters that much — it's that I don't like having subscriptions I'm not using. It feels wasteful even if it's not breaking the bank."

> "The tool is kind of embarrassing for me specifically because I already know what I should do. I just need someone to actually tell me to do it."

### What They Liked

- The audit took under two minutes, which made it easy to start
- The recommendation to consolidate to one or two general AI tools was obvious but effective — seeing it in writing made him act
- The clean UI made the experience feel more serious than a budgeting spreadsheet
- Appreciated that the tool didn't suggest replacing tools he actually relied on

### What Confused Them

- Wondered whether the tool could differentiate between tools he used for different *types* of tasks (e.g., Claude for writing, ChatGPT for coding)
- The savings estimates felt slightly abstract without knowing his actual usage patterns per tool
- Wanted a clearer explanation of how the optimization score was weighted

### Suggestions They Made

- Usage-based insights: "You haven't opened Gemini in 14 days — consider pausing"
- A lightweight personal mode for solo developers (as opposed to team-focused analysis)
- Integration with credit card statements to auto-detect AI subscriptions

### Product Takeaways

The solo builder segment is interesting because the spend per person is high, but the pain point isn't financial — it's psychological. People don't like having subscriptions they aren't using, regardless of the dollar amount. The audit tool acts as a forcing mechanism for a decision they already know they should make.

That said, this segment is unlikely to pay for the tool itself. It validates the product's usability and onboarding flow more than its business model.

---

## Overall Insights

### Recurring Themes

1. **Poor visibility is the real problem, not spend.** Every user knew they were probably overpaying. What they lacked was a single pane of glass showing what they actually had and how it was being used.

2. **Conservative recommendations build trust.** Multiple users explicitly said they appreciated that the tool didn't suggest aggressive cuts or claim unrealistic savings. This positioning maps well to the product's stated philosophy.

3. **Subscriptions accumulate silently.** Across all three conversations, users had at least one subscription they'd forgotten about or kept out of inertia rather than need.

4. **Contract timing matters more than pricing.** The engineering manager's situation made clear that the most valuable intervention is *before* a renewal, not after.

### Signals That Validated the Direction

- Every user completed the audit without prompting and understood the results
- Several took action after seeing the breakdown (cancelled a subscription, downgraded a plan)
- Nobody questioned the methodology or accused the tool of inflating savings

### What Users Did Not Want

- Hard tool replacements — nobody wanted to be told to drop a specific product entirely
- Aggressive cost-cutting targets — the phrase "we could save X%" felt manipulative to some
- Complex integrations during first use — the standalone audit was valued for its simplicity

### Repeated Feature Requests

- Usage analytics (idle seat detection, per-user activity)
- Benchmarking against similar companies or team sizes
- Renewal reminders and subscription calendar
- Slack or email integration for ongoing visibility

The strongest takeaway from these conversations is that StackPilot AI fills a real gap. Teams and individuals are accumulating AI tooling faster than they're auditing it, and the tool provides a low-friction way to bring that overhead into conscious view. The product's restrained, analytical tone is a genuine differentiator in a space that tends toward hype.
