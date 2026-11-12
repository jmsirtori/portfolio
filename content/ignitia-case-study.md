# Ignitia SEO Auditor · Case study draft v2

> Working notes (not published): English only. No invented metrics, no client names.
> `[CONFIRM]` = Juan verifies. `[FILL]` = only Juan can write it.
> Plan and word budget per section: `content/case-study-plan.md`.

---

<!-- publish:start -->

# An AI audit tool, and the QA process that keeps it honest

**Role:** Solo. Discovery, design, build and testing, with Claude as coding partner and tutor
**Timeline:** March 2026 to now · 12 versions
**Tools:** React, Supabase (Postgres), Claude API with web search, Google PageSpeed Insights
**Summary:** I turned my manual diagnosis of a business's online presence into a repeatable AI-assisted audit. Then I tested it on real proposals and logged every defect I found.

## 01 · Problem

I run Ignitia, a one-person digital performance consultancy. Every proposal I send starts with a diagnosis of the prospect's online presence: website speed, SEO basics, Google reviews, social media and competitors.

**Current state.** I checked each source by hand and separately. I read Google reviews, searched for the business, ran speed tests, and wrote notes in whatever order came up. Then I rewrote everything into something a client could follow. No two diagnoses had the same structure, so I couldn't compare one business with another, or the same business over time.

**Future state.** I enter a URL and a business type. The tool runs the research, adds real performance data, and returns a report with a fixed structure. I review it before anything goes into a proposal.

| Current state | Future state |
|---|---|
| Google reviews read by hand | Web research run by the tool |
| Speed tests run separately | PageSpeed data pulled automatically |
| Notes in a different order every time | Same four sections every time |
| Rewritten by hand for the client | Client section already written; I review and edit |
| No way to compare diagnoses | One score and five quick wins per audit, stored per client |

## 02 · Who It's For

The tool is internal, and I'm its main user. I've used it to prepare real proposals for prospective clients. It gives me the raw technical material, and I edit it into each proposal.

The prospect never opens the app, but part of every report is written for them. They're usually business owners or marketing leads without a technical background, at places like a hotel or a retail shop.

So every audit has two readers. I need depth and sources. The client needs to know what's wrong and what to fix first.

## 03 · Key Design Decisions

**1. Every report goes through me before it reaches a client.**
I could have exported reports straight into a client presentation. I chose not to. The model sometimes states things it can't support (see Testing), so a person has to check every report. To make that review easier, website performance comes from Google PageSpeed Insights, a real measurement, and the model only interprets it.

**2. The same four sections, every time.**
My first idea was one report for both readers. Then someone else used the tool and gave me feedback: separate the technical findings from the qualitative ones, and explain the technical parts to the client more simply. That changed the structure. Each report now has internal notes for me, a report for the client, a benchmark against two competitors, and a glossary for the technical terms. I can be thorough in my notes without burying the client in jargon. Fixed sections also make two audits comparable, which was the problem I started with.

**3. One score from 1 to 10.**
Each audit produces a Digital Presence Score, where 1 is very weak and 10 is excellent. I didn't compare scales. I picked 1 to 10 because people already rate things that way in everyday life. The public audit on getignitia.com shows the same score, so a prospect sees the same number on the website and later in the full diagnosis. Whether clients read the number the way I intend is still untested (see What's Next).

**4. Exactly five quick wins.**
The model has to return five quick wins in tagged lines (`QW1` to `QW5`). The app parses and stores each one per client. I chose five because it's enough to make a visible difference and short enough to finish quickly. I wanted owners to see that improving their online presence is achievable, without a long list that stresses them out. A fixed count also means the lists can be compared from one audit to the next.

**5. The audit changes with the type of business.**
There are five business types: physical, digital, social-first, hybrid and personal brand. Some checks only apply to some types. For example, the Google Business Profile analysis only runs for physical and hybrid businesses. With one checklist for everyone, an online-only brand would get a section about its storefront listing.

## 04 · Building It

**Method.** The audit method comes from Flow Company's video [How to Get Found Everywhere Online | Traffic & Visibility in 2026](https://www.youtube.com/watch?v=RmeaWtL1-FE), which covers a business's whole online presence. I already had a method I trusted. What I didn't have was the experience to build a tool around it.

**Working with Claude.** I told Claude I had little coding experience and asked for two things: help building a tool that gathers everything the method calls for, and an explanation of what each part of the code did as we wrote it. I decided what the tool should do and how the report should be structured, and I tested every version. Claude wrote most of the code and explained it as we went. Each version taught me a bit more about the next one.

**Timeline**
- **v0, March 2026.** A clickable prototype in Google AI Studio with fake data: a dashboard, audit history and a client chart. I went through several versions there and wasn't happy with any of them, so I moved to a real stack.
- **v1 to v12.** The working app.
  - Interface: React.
  - Serverless functions on Vercel: one runs the audit through the Claude API with web search, the other calls PageSpeed.
  - Data and login: Supabase (Postgres), with row-level security so each record belongs to its user.
  - Every push to the main branch deploys.

**Getting structure out of a language model.** The model writes tagged lines (`IGNITIA_SCORE:`, `IGNITIA_SECTOR:`, `QW1` to `QW5`). The app reads those tags, with fallbacks for when the model drifts from the format.

**Cost as data.** Each audit can take up to 12 rounds of web research, and each round resends the whole conversation, so input tokens drive the cost. I cache the system prompt to lower that. Every audit records its tokens, web searches, model and cost in a separate table, which survives even if the audit is deleted. A Costs view and a model picker let me trade depth for price on each job.

[FILL: 2 to 3 screenshots: Overview, a report, the Costs view. No real business data.]

## 05 · Testing: self-testing and iteration in production

I'm the main user, so testing meant running real audits for real proposals and checking every claim by hand before using it. One other person also used the tool, and their feedback changed how the report is structured (see Decision 2). When something was wrong, I logged it, fixed it, and checked it again.

| # | Defect | How I found it | Type | Fix | Status |
|---|---|---|---|---|---|
| 1 | Reports gave Google review counts and opening hours that belonged to other businesses | Manual review of each report | Data quality | Prompt rules against unverified data; a "Google data" block I confirm by hand; a "Not verified" label when data is missing | Fix designed, next release |
| 2 | Audits on the cheapest model were logged at a pricier model's rates, about 3× too high | The Costs view didn't match what I expected | Data quality | Rates set per model | Fixed for new audits; older records still show the inflated cost |
| 3 | Regenerating the whole app file broke features that already worked | Features stopped working after updates | Process | Small, targeted edits, plus a build check before every deploy | Rule in place |
| 4 | The interface showed outdated data after edits and deletes | Normal use | Data consistency | Reload from the database after every change | Rule in place |

None of these broke the experience or reached a client, because I review every report by hand before delivering anything. What they did limit was the tool's scope and the quality of its data, and that's where I've focused.

**Defect 1 in detail.** Google Maps loads reviews with JavaScript, and the model's web search can't read them. When the model didn't find the data, it sometimes filled the gap with numbers from other businesses. The fix gives the model an honest option: if it can't confirm something, the report says "Not verified." For real review data, the next step is Google's official Places API. I decided not to scrape Google.

**Limits.** One main user and one outside reviewer, no formal usability study, and no outcome metrics yet.

## 06 · What I Learned

- **Plan for the AI being wrong.** Fixed sections, required tags, a "Not verified" state and a human review step are what make the output usable.
- **A report should say what it doesn't know.** A gap marked "Not verified" is more useful to me than a confident guess I have to catch.
- **Record data from the first version.** Logging the cost of every audit is how I found the pricing defect.
- **Learn the material before building with it.** I started with little coding experience, so when AI-written code broke, finding the cause took me much longer than it should have. Next time I'd learn the basics of the stack first.

**Standards I adopted after each defect**
1. Data the tool can't confirm gets labeled "Not verified."
2. Changes are small and verified with a build before deploying.
3. The interface reloads from the database after every change.
4. Every audit records its cost.

## 07 · What's Next

1. **Test the client side.** Show the client report to 3 to 5 business owners. Can they tell what to fix first without me there? Do they read the 1 to 10 score the way I intend?
2. **Ship the data-quality fix** for defect 1, then get real reviews through the Places API.
3. **Lower the cost per audit.** Cap web searches at 6 to 8 per audit, and cache the whole conversation instead of only the system prompt.
4. **Redesign the interface** with what I'm learning in my UX design program. This is in progress.

## 08 · Reflection

The model was powerful, but the reports only got good when I gave it clear structure and checked everything it sent back. Most of the real work was iteration: reading a report, finding what was wrong, and changing the tool so it couldn't happen the same way again. Every business is different, and a good evaluation makes what's strong about each one easy to see. Making that evaluation consistent and trustworthy is the part of this project I enjoyed most, and it's the kind of work I want to keep doing.

<!-- publish:end -->

---

### Assets to produce
- [ ] Demo video, 60 to 90 seconds with captions: Ignitia auditing its own site
- [ ] Screenshots (no real business data)
- [ ] Current state → future state diagram (from the table in 01)
