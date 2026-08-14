# Claims SmartApp — Demo Guide

A walkthrough for presenting the claims-handling dashboard demo. It covers what each
screen shows, how to drive the reserve-setting workflow, and a few scenarios worth
demoing live.

> **Persona:** You are signed in as **Priya Kaur**, a **Claims Handler** with a delegated
> reserve authority of **£250,000**. Reserves above that route to a Senior Underwriter.

---

## 1. Running the demo

**Live (Vercel):** open your deployment's `*.vercel.app` URL.

**Locally:**

```bash
cd Claims_SmartApp_LM
npm install      # first time only
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

> The demo holds all state in memory — **refreshing the page resets everything** back to
> the starting claim. That's handy for re-running the demo cleanly between audiences.

---

## 2. The dashboard at a glance

When the app loads you see the Claims Handler's home screen:

| Area | What it shows |
| --- | --- |
| **Left sidebar** | The claims module navigation (FNOL Intake, Triage, Analysis, Reserve Setting, etc.). *Illustrative — only "Dashboard" is active in this demo.* |
| **Top bar** | The signed-in handler (Priya Kaur, Claims Handler). |
| **Stat cards** | Headline KPIs: active claims, items in triage/red flags, reserves pending approval, and SLA compliance. |
| **Claims by Stage** | Distribution of claims across the lifecycle (FNOL → Triage → Analysis → Reserve Approved → Closed). |
| **Triage Consistency** | Share of claims auto-routed vs. manually re-routed, against a &lt;10% re-routing target. |
| **Recent Claims** | The working queue. Each claim number is clickable. |

---

## 3. Opening a claim

In **Recent Claims**, click the claim number **`CLM0032187`** (Blackfriars Logistics Ltd).

The **Claim Decision Card** opens with five tabs:

- **Overview** — the FNOL headline: policy number, initial loss estimate (£650,000),
  loss dates, broker reference, location, and the severity/routing decision.
- **Triage** — severity score, assigned team, red-flag checks, and the FNOL→ack / triage
  SLAs.
- **Analysis** — coverage confirmation, exclusions, liability apportionment, subrogation
  assessment, and claims history.
- **Reserve** — benchmarking context: the class/peril average (£480,000) and *your*
  delegated authority (£250,000).
- **Attachments** — documents extracted from the FNOL submission (adjuster report, fire
  investigation, site photos, policy schedule).

Close the card with **CLOSE**, the **✕**, or by clicking the dark area outside it.

---

## 4. The reserve-setting workflow (the main demo)

This is the core story: a handler recommends a case reserve, the system benchmarks it and
checks it against their authority, and routes it for approval — with a full audit trail.

**Step 1 — Start.** In the claim card (Overview or Reserve tab), click **RECOMMEND
RESERVE**. The **Reserve Setting & Approval** form opens, pre-filled with the £650,000
initial estimate.

**Step 2 — Enter the reserve.** The form has:

- **Reserve Basis** — Best Estimate / Worst Case
- **Case Reserve Amount**, **Gross Incurred**, **Net Incurred**
- **IBNR** checkbox — mark if further development is expected
- **Benchmarking** — live deviation from the £480,000 class average (green ≤ 20%, red
  otherwise)
- **Authority check** — live confirmation of whether the amount is within your £250,000
  authority or will escalate
- **Rationale / Reason Code** — appears automatically when a justification is required

**Step 3 — Submit.** Click **SUBMIT RESERVE RECOMMENDATION**. The demo validates the entry
(see rules below) and opens the **Summary**.

**Step 4 — Review the summary.** Shows the basis, case reserve, gross/net, deviation, the
approval routing decision, your rationale, and an expected approval turnaround (pick 4 / 24
/ 48 hours — the deadline recalculates).

**Step 5 — Confirm.** Click **CONFIRM & LOG RESERVE**. A toast confirms it's logged, and
the **Recent Claims** row updates its stage and case-reserve amount. Use **BACK** to return
to the form instead.

---

## 5. The business rules (so you can narrate them)

Two independent checks drive the workflow. Both use the seeded figures for this claim:

- **Class/peril average:** £480,000
- **Your delegated authority:** £250,000

**Deviation check** — how far the reserve sits from the benchmark:
- Within **±20%** of £480,000 (i.e. £384k–£576k) → shown **green**.
- Outside that band → shown **red**.

**Authority check** — who can approve it:
- **≤ £250,000** → within your authority, **auto-approves**.
- **> £250,000** → **escalates to a Senior Underwriter**.

**Rationale requirement** — a written reason becomes **mandatory** when the deviation
exceeds 20% **or** the amount exceeds your £250,000 authority. Submitting without it (or
with no amount) is blocked with a prompt.

> **Note for presenters:** because this claim's authority limit (£250k) sits well below the
> class average (£480k), realistic fire-loss reserves will almost always either exceed
> authority or deviate sharply from the benchmark — so a rationale is nearly always
> required here. That's intentional: it shows the guardrails doing their job on a
> high-severity claim.

---

## 6. Suggested demo scenarios

Run these by changing the **Case Reserve Amount** and watching the benchmark and authority
indicators react in real time.

| Enter | Deviation | Authority | Story to tell |
| --- | --- | --- | --- |
| **£650,000** *(default)* | +35.4% (red) | Exceeds → **escalate** | "A high-severity fire loss above my authority — the system forces a rationale and routes it to a Senior Underwriter." |
| **£500,000** | +4.2% (green) | Exceeds → **escalate** | "Right on the benchmark, but still above *my* limit — good benchmarking doesn't remove the approval control." |
| **£240,000** | −50% (red) | Within → **auto-approve** | "A smaller reserve I can approve myself — but it's far below the class average, so I still have to justify it." |

For each: fill the rationale, click through **Submit → Summary → Confirm**, and point out
the **Recent Claims** row updating to *Reserve Approved* or *Pending UW Approval* with the
new amount.

**Also worth showing:**
- Clear the amount and click Submit → blocked with a prompt.
- Change the approval turnaround (4/24/48 hrs) on the summary → the deadline recalculates.
- The audit-trail note on the summary — every action is logged with timestamp, identity,
  and rationale.

---

## 7. Resetting

Refresh the browser to return to the starting state (claim back to *In Analysis*, reserve
back to *Pending*). No sign-out needed.

---

## 8. What's real vs. illustrative

- **Fully interactive:** opening the claim, all five tabs, the reserve form with live
  benchmarking/authority checks, validation, the summary, confirming, and the row update.
- **Illustrative only:** sidebar navigation links, the top-bar gear/queue controls,
  attachment download icons, and the "View all" link — these are visual and not wired to
  actions in this demo.
- **No backend:** all data is seeded in the app and state is in-memory; nothing is sent to
  a server.
