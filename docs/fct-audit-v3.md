# Audit v3: FCT Agent Microsite Changes (v1, 1 Oct 2026)

Audit of the client document `FCT_Agent_Microsite_Changes_v1_2026-10-01.docx` against the code on branch `prashant-dev` (with comparisons to local `main`). No code was changed. Line references were re-opened on 5 Oct 2026. Audit scripts are in `docs/audit-scripts/`.

## Changes since the last version

**Latest pass (5 Oct):**
- **New conflict 14: testimonials** (cards mention destinations outside Appendix A; quotes edited for dashes). Client reply question 13; H8 is now "todo + question" and points to it. New totals: 23 todo, 21 todo + question, 9 todo, placeholder, 1 blocked, 1 question.
- **New conflict 13: destination photos** (who supplies them, and who pays for licensing). G15 is now "todo + question" and X2 depends on conflict 13. New totals: 24 todo, 20 todo + question, 9 todo, placeholder, 1 blocked, 1 question.
- **Client reply:** new question 11 on photos (now also asking who covers licensing), question 4 and 10 wording, and a line saying which questions gate the most work.
- **G1 and H9 are now "todo + question".** G1's US page description depends on conflict 6. H9's ported point "White-label site with your own branding" has a hyphen (conflict 4); its WhatsApp line still uses a placeholder.
- **New status totals:** 25 todo, 19 todo + question, 9 todo, placeholder, 1 blocked, 1 question (computed from the table).
- **F3 checked.** `main`'s "Your picks" recap (`/get-started/done`) isn't linked from anywhere and adds no step; `prashant-dev` doesn't have it. So Q5 is unaffected and there's no client question. The returning-agent behaviour became X7.
- **Every "Not compared" row is now compared** against `main` (G2, G7, G9, F4, R1–R5, D6, L1, L3–L6). Real differences:
  - Register button labels ("Get Agency Access" on `main`, "Sign Up" on `prashant-dev`).
  - The results card's Explore link (Hotels tab vs overview).
  - `main`'s old flights list with "Agent rates".
  - Links opening in a new tab on `prashant-dev`.
  - The rest is styling or class differences (Tailwind v4 shorthands for the same values) or line breaks.
- **New section 14, "Work not numbered by the client"** (X1–X8).
- **Removed `docs/fct-audit-v3-part2.md`**, after confirming it was identical to sections 10–13 here.
- **New client reply sheet:** `docs/fct-client-reply.md`. It now also has a "Small notes" line on X7 (returning agents start at step 1 with their earlier choices selected), and question 4 has a suggested answer for names.
- **Branch note label renamed** from "Formatting differences only" to "Styling or class differences only". Each such row now says what differs (class shorthands, button labels, links opening in a new tab). Every renamed class was checked to give the same value in Tailwind v4, and the build in `dist/` still carries the `-webkit-backdrop-filter` prefixes that `prashant-dev` removed from `index.css`. Totals are unchanged.

**Earlier in v3:**
1. **The earlier "saved" file was only a placeholder.** The file mentioned in v3 (`…\scratchpad\FCT_audit_v3.md`) held 2 lines, not the audit. This file is the first complete saved copy.
2. **H5 "customers" fix.** The H5 cards that say "customers" are **Card 5** ("Give your customers a branded experience…") and **Card 9** ("Save your customers' details…"), not Card 7. Conflict 3 is corrected.
3. **Appendix C "customers" count.** It's **15 occurrences**: 13 × "customers" and 2 × "customers'" (counted in the doc text).
4. **Hyphen scope changed.** The first count was "at least 288 strings (66 names and 222 prose), counted over the data files only". It left out JSX text in `.tsx` files and spaced hyphens. The extended script covers both: **344 strings** (67 names and 277 prose; 81 and 336 hyphens or dashes). There are no spaced hyphens in any copy.
5. **Scripts moved into the project.** `hyphens.py` and `hyphens2.py` are now in `docs/audit-scripts/`, were re-run from there, and gave the same counts. The audit text points to these paths instead of the scratch folder.
6. **New conflicts 10–12:** airline names on category cards (low priority), D2 airline data source, and how long the Appendix B review will take.
7. **Conflict 2 (R6) expanded.** The header already carries Register free but hides while scrolling down (`Header.tsx:22–26`). New question: must Register free stay visible while scrolling? If yes, pin the header or keep a floating Register free. Bottom left stays the fallback.
8. **Tailwind note (repo, not client).** The project uses Tailwind v4.3.3. The working-copy edit in `src/get-started/GetStarted.tsx` (`bg-gradient-to-r` → `bg-linear-to-r`, `bg-white/[0.05]` → `bg-white/5`), made at 12:46 on 5 Oct and not by this audit, is visually identical and safe. The file was not touched.
9. **Status model changed.** Statuses are now todo / todo + question / todo, placeholder (item) / blocked (item) / question. All 55 rows were re-assigned (27 changed; see section 13): **26 todo, 17 todo + question, 10 todo, placeholder, 1 blocked, 1 question.**
10. **Line ranges corrected:**
    - Q1 `steps.ts:48–84`, Q2 `85–154`, Q3 `155–192`, Q4 `193–241`.
    - D2 `144–157`, D4 `Overview` `496–648`, D5 `621–637`, shared help card `344–371`.
    - R2 `108–128`, R5 `279–297`.
    - G7 `content.ts:165`, G17 `data.ts:50`.
11. **G3 correction.** 300,000+ hotels and 400,000+ experiences are already in the code (`content.ts:29, 35`, shown on the H3 cards). They are not new additions.

---

## 1. The big picture
- Every page leads to **Register free** or **Chat with us** (WhatsApp).
- "For everything last minute." is the hero headline and the sign-off above every footer.
- All copy speaks to the agent ("you", "your client").
- The questions go from 4 steps to 2 (regions, then categories). The market comes from the site address.
- Destinations go from 17 to **79**. Each market has its own default list: **za 25, in 36, us 62**. These sums were checked against Appendix A.
- The doc has **55 numbered changes**: 51 launch, 3 polish (H10, R4, L2) and 1 info (G17).

---

## 2. The branch question

**What the git history shows**
- `git log --oneline --graph --all` shows two separate trees:
  - **Local `main`:** 38 commits, ending at `1f66967 new22` (30 Sep). It was never pushed to GitHub. A stash on it ("Flying Carpet changes before moving to prashant-dev") holds uncommitted edits to `Offers.tsx`, `content.ts`, `DestinationDetail.tsx` and `tabs.ts`, plus some untracked files.
  - **`prashant-dev`:** built on `origin/main` (`fe0ffae`, 24 Sep). Its history runs `d8ab4b9` → `a7d3f7f new10` (1 Oct 15:04 IST) → merged with `4a2f9c3` (`main`'s code, pushed 1 Oct 13:32 IST) in `f5cebbe` → later commits → `615cc5d`.
  - After `git fetch`, `origin/main` is `9280554` and `origin/prashant-dev` is `e18699e`. Both new commits only change README.md.
- `git merge-base main prashant-dev` returns nothing (exit code 1), so there is no shared history. But **commit `4a2f9c3` on `prashant-dev` differs from local `main` by only 2 lines**, so `prashant-dev` does carry `main`'s code forward.
- `git diff --stat prashant-dev main`: 28 files, 925 insertions, 1,519 deletions. Most of it is styling or class changes (Tailwind v4 shorthands) and line breaks. `Signup.tsx`, `FlightsInfo.tsx` and `LogoMarquee.tsx` exist only on `prashant-dev`.

**What the 1 Oct merge did (`f5cebbe`).** For `Agents.tsx`, `Platform.tsx`, `Header.tsx` and `ChatFab.tsx`, the merged result is byte-for-byte the "new10" version, not `main`'s. That's why the H7 and H9 copy the client calls "keep" is missing on `prashant-dev`. *Can't tell whether this was on purpose.* Ask whoever made the merge.

**Which branch Vercel builds from: not verified.**
- There's no `.vercel` folder, the Vercel CLI isn't installed, and `vercel.json` has only rewrites.
- `origin/main` has no destination pages and no Lucid Line, so it can't have produced the client's screenshots.
- The screenshots match `4a2f9c3` / local `main`. The reviewed build was either a deploy of `prashant-dev` at `4a2f9c3` or a CLI deploy from local `main`.
- To confirm: Vercel → project → Settings → Git (production branch) and the Deployments list (commit for each deployment), or `vercel inspect flyingcarpet-ashen.vercel.app` once the CLI is installed.
- The local `dist/` folder was built on 2 Oct from `prashant-dev` code.

**Client "keep" instructions that point to copy existing only on `main`**

| No. | Client says | `main` copy (exact) | `prashant-dev` today |
|---|---|---|---|
| H7 headline | "[keep]" | "Flights, hotels, experiences, transfers and car rentals" (`main` Platform.tsx:19). The doc also prints this text. | "Flights, hotels, experiences, and transfers" (`Platform.tsx:19`) |
| H7 text | "[keep]" | "Five categories on one login, each with clear prices and terms, so you can answer your client fast, even at the last minute." (`main` Platform.tsx:24). The doc also prints this text. | "One catalogue for agents and travelers. Magic at the top — clarity in every booking detail." (`Platform.tsx:24`) |
| H9 headline | "Keep the headline" | "Register free. Earn on every booking." (`main` Agents.tsx:45) | "Where agents access more value" (`Agents.tsx:34`) |
| H9 text | "Keep the text" | "Be ready before the next urgent request comes in. Register once and sell flights, hotels, transfers, car rentals and experiences, whenever your client needs them." (`main` Agents.tsx:50) | "Flying Carpet Travel is a destination-led catalogue — …" (`Agents.tsx:39`) |
| H9 points | "Keep the five points" | `main` Agents.tsx:12–16: "Free to register: no fees, no minimum" · "Your own markup on every category" · "A login for every consultant, so anyone can take the urgent call" · "White-label site with your own branding" · "24/7 help, on weekends and public holidays too" | None |

The H9 headline, text and points appear in the doc only in the "Now" line and in screenshot `83ce69f6…jpg`, which matches `main`. "White-label" has a hyphen (conflict 4). Other "keep" instructions are met on both branches: the H2 layout and glass card, the H4 two numbers, the H5 card layout and wallet panel, and D5 "View on map" (`DestinationDetail.tsx:637`).

**What each branch has, measured against the doc**
- **Only `prashant-dev`:** all five destination tabs on (`tabs.ts:26–30`; `main` greys out three), a Flights tab page (`FlightsInfo.tsx`), and "Partners" removed from the menu.
- **Both:** testimonials open on tap (`Testimonials.tsx:67`), "Load more destinations" in 8s (`DestinationsPage.tsx:37`), and the header on the question screens.
- **Only `main`:**
  - The H7 and H9 copy and the H9 points list.
  - "Car rentals" and "USA" in the moving strip.
  - H3 cards that link to `#products` with an arrow.
  - The heading "Featured for you in {city}".
  - A floating register button (`ChatFab`).
  - `REGISTER_URL` set to `/get-started/market`.
- **Only `prashant-dev`, and not in the doc:** the `/partner-with-us` sign-up page (conflict 7) and `LogoMarquee.tsx`.

**Recommendation: use `prashant-dev` as the base.**
- It's on GitHub and is where the team works.
- It already includes `main`'s code through `4a2f9c3`, plus later work the doc wants.
- Hand-port the `main`-only pieces: H7 headline and text, H9 headline, text and points, the H3 card link, and Car rentals in the strip.
- Don't merge local `main` (no shared history means conflicts in about 28 files). Check the stash on `main` before deleting anything.

---

## 3. Site-wide rules (G1–G17)

| No. | What changes | Where (`prashant-dev`) |
|---|---|---|
| G1 | Tab title "Flying Carpet \| For everything last minute", new description (US version differs), footer sign-off | `index.html:16`, `:12`. Inner page titles use "— Flying Carpet": `DestinationDetail.tsx:60`, `DestinationsPage.tsx:75`, `HotelDetail.tsx:301`, `ExperienceDetail.tsx:78`, `Signup.tsx:275`. No sign-off yet |
| G2 | Speak to the agent | See "travellers" in the G9 table |
| G3 | Only the five listed figures | Table below |
| G4 | All five categories, fixed order, never "Coming soon" | Destination cards show only that destination's products (`DestinationDetail.tsx:510`). Maldives has no car rentals (`data.ts:28`). Questions step 2 lacks Car rentals (`steps.ts:155–192`) |
| G5 | 4 CTA buttons (Register free, Login, Explore destinations, Chat with us) plus the question flow controls: Next, Show me everything, Back to home, Back, Show my destinations | G9 table |
| G6 | Floating "Chat with us" on every page, prefilled "Hi Flying Carpet, I have a question about [page or destination name]." | `ChatFab.tsx` has no link (comment at line 2). Used only at `DestinationDetail.tsx:291` and `DestinationsPage.tsx:468`. Today's prefill: `DestinationDetail.tsx:87`, `AgentRates.tsx:24` |
| G7 | "Zero booking fee. T&Cs apply." for car rentals only | `content.ts:165` says "no booking fee"; `DestinationDetail.tsx:155` "Self-drive car rentals" |
| G8 | Name is "Flying Carpet" | `Header.tsx:42`, `Footer.tsx:42, 81, 98`, `Agents.tsx:39` |
| G9 | Banned words | Table below |
| G10 | No hyphens or dashes | Section 11, conflict 4 |
| G11 | Remove Canada and Zambia | `steps.ts:78`, `details.ts:54`, `content.ts:184`, `About.tsx:52` |
| G12 | US says "advisors" | Section 10. Needs country detection (conflict 6) |
| G13 | Lucid Line rework | `effects/LucidLine.tsx`. Used at `App.tsx:51, 56`, `About.tsx:28`, `Agents.tsx:28`, `Destinations.tsx:49`, `Platform.tsx:14`, `Testimonials.tsx:16`, `Footer.tsx`, `GetStarted.tsx:208`, `DestinationDetail.tsx:107, 355`, `DestinationsPage.tsx:147, 439`, `HotelDetail.tsx:671`, `ExperienceDetail.tsx:300`, `FlightsInfo.tsx:154` |
| G14 | Lato font | `index.html:15`, `index.css:8` |
| G15 | Real destination photos, no brand names | Hero is two cut-out layers (`Hero.tsx:89`, `:121`). Hotels card image `content.ts:31` (Hilton sign, screenshot `e261607c…jpg`) |
| G16 | Free scrolling; hover also opens on tap | Sticky stacked cards `Destinations.tsx:19`. Question tile descriptions are hover-only (`ChoiceTile.tsx:49`). Testimonials already work |
| G17 | Waiting on the client | Dummy number at `Footer.tsx:65` and `data.ts:50` |

**G3: every figure found**

| Figure | Where | Status |
|---|---|---|
| 350+ airlines | `content.ts:17` (unused `proofLine`), `:23`, `:141`, `Signup.tsx:39` | Change to **400+ (new)** |
| 300,000+ hotels | `content.ts:17, 29, 147`, `Signup.tsx:40` | Allowed; already present |
| 400,000+ experiences | `content.ts:17, 35` | Allowed; already present |
| 11 "Global brands" | `content.ts:47–48` | Figure allowed; H3 card becomes "Zero / booking fee"; the phrase "11 global car rental brands" is new |
| 24/7 | `About.tsx:52`, `WhyUs.tsx:22`, `Signup.tsx:38` | Allowed |
| 100+ countries, 1,400+ agents | `content.ts:98–99` | In the doc's H4 copy, not on the G3 list (conflict 5) |
| Save up to 3.5% | `WhyUs.tsx:57, 59` | In the doc's H5 copy, not on the list (conflict 5) |
| 4.9/5, 1400+ onboard, 98% | `content.ts:239–241` | Not in the doc. Ask |
| "[n] airlines into [code]" | `DestinationDetail.tsx:147` | Allowed "from our data" (conflict 11) |

**G9: banned terms, file and line**

| Term | Use instead | Where |
|---|---|---|
| Get Agency Access | Register free | `Hero.tsx:144`, `Destinations.tsx:30`, `DestinationDetail.tsx:367` (shared help card), `DestinationsPage.tsx:405` (empty-region message), `:446`, `:454`, `MobilityViews.tsx:117` |
| Learn More | Explore destinations | `Hero.tsx:154` |
| Unlock / Exclusive inventory… | H2 copy | `Hero.tsx:102`, `:142`, `Destinations.tsx:58` |
| Global procurement power, elite technology | H4 copy | `About.tsx:52` |
| All Curated | H6 copy | `Destinations.tsx:55` |
| Incredible places. Greater opportunities. | R1 copy | `DestinationsPage.tsx:164, 167` |
| Coming soon | Category description | `DestinationDetail.tsx:187, 580` (can't be reached while all tabs are on) |
| Exclusive deals | Remove | `DestinationDetail.tsx:883` |
| Bestseller | Remove | `details.ts:70, 93, 114, 134, 154, 174, 193, 213, 233, 254, 272, 291, 311, 330, 349, 388` |
| Popular | Remove | `DestinationsPage.tsx:48, 51, 92, 510` |
| Explore packages | Remove | `DestinationDetail.tsx:907` |
| Partner With Us / Partners / Contacts | H1 menu | `content.ts:5, 9`, `Offers.tsx:9`, `Footer.tsx:51, 54, 60` |
| Travellers as audience | Your clients | `Testimonials.tsx:22`, `Platform.tsx:24`, `Destinations.tsx:58`, `DestinationsPage.tsx:173`, `steps.ts` (hotel step), `AgentRates.tsx:41` |
| Sign up | Register | `Header.tsx:78, 121`, `DestinationDetail.tsx:231`, `HotelDetail.tsx:690`, `ExperienceDetail.tsx:319`, `FlightsInfo.tsx:173`, `Signup.tsx:275, 337` |
| *(covered by G5)* View hotel, Become a partner, Special agent rates | Scratch card / Register free | `DestinationDetail.tsx:858, 866`, `HotelDetail.tsx:675, 758`, `ExperienceDetail.tsx:304`, `Agents.tsx:43` |

---

## 4. How agents move through the site (F1–F4)
- **F1:** `REGISTER_URL` is `content.ts:13`. Swap in the platform link when it arrives.
- **F2:** The WhatsApp button and all help boxes open the same chat.
- **F3:** The flow diagram (`a44a7395…png`, from screenshot) adds two things: "Show me everything" skips straight to results from every step, and WhatsApp is visible on every screen of the flow.
- **F4:** Login is `href="#"` (`Header.tsx:74`), and in the header bar it only shows at `xl` width. The diagram styles Login as an outline button (from screenshot).

---

## 5. Home page (H1–H11)

| No. | What to do | Where |
|---|---|---|
| H1 | Menu: What you can book · Why Flying Carpet · Destinations · About us · Contact. **What you can book → H3** (`Offers.tsx:7`, `id="journeys"`). **Contact → footer** (`Footer.tsx:18`, `id="contact"`). Login and Register free on the right | `content.ts:4–10`, `Header.tsx` |
| H2 | New small line, headline, card text, buttons, line under the buttons; new image | `Hero.tsx:102, 142, 144, 154` |
| H3 | New label, headline, text and card figures. **Each card opens its own H7 panel.** The open panel is internal state in `Platform.tsx`, so a way to open a chosen panel is needed. `main` only linked the cards to the section | `Offers.tsx:9, 11, 16, 33`, `content.ts:20–50`, `Platform.tsx:12` |
| H4 | New headline and text. **Keeps "teams in South Africa, India and North America".** Zambia and the old wording go | `About.tsx:47, 52`, `content.ts:98–99` |
| H5 | Label "Why Flying Carpet", headline "Everything your travel business needs, in one platform.", 11 cards word for word (add "Stay up to date"), new wallet text | `WhyUs.tsx:14, 17, 22, 57–59`, `content.ts` `whyUs` |
| H6 | Rebuild. Default **za 25 / in 36 / us 62**. Tabs "**All**" + that market's regions. "See all destinations" toggle (79). Search. **About 8 cards with "Show more"**. Intro line names the market. Card: photo, 2 lines, 5 icons, "Explore". **"Explore destinations" button under the section** | `Destinations.tsx`, `content.ts` `destinations`, `data.ts` |
| H7 | Panels show Appendix C (opening line + 3 points) and "See all features". Headline and text per the "keep" table | `Platform.tsx:19, 24`, `content.ts` `platform` |
| H8 | "From agents" / "What travel agents tell us" / new text. Tap already works | `Testimonials.tsx:20, 22, 28` |
| H9 | Port `main`'s copy, "For agents" label, Register free button, WhatsApp line, Lucid Line ending at the button | `Agents.tsx:32, 34, 39, 43` |
| H10 *(polish)* | New strip text | `Agents.tsx:7` |
| H11 | New footer copy; remove the gap above the footer on inner pages (`mt-24` at `Footer.tsx:18` plus the card's top padding) | `Footer.tsx:42–98` |

---

## 6. Questions (Q1–Q5)

| No. | What to do | Where |
|---|---|---|
| Q1 | Delete the market screen | `steps.ts:48–84`. Code that reads the market: `DestinationDetail.tsx:89`, `DestinationsPage.tsx:110–112` |
| Q2 | "Step 1 of 2", new headline and text, Appendix A regions with counts, no descriptions. Buttons **Next · Show me everything · Back to home**. Bottom line "Free to register. No fees, no minimum." | `steps.ts:85–154`, `GetStarted.tsx:162` |
| Q3 | "Step 2 of 2", new headline and text, five options with the doc's text (**add Car rentals**). Buttons **Show my destinations · Show me everything · Back**. Bottom line **"Free to register. No fees, no minimum."** (replaces `steps.ts:162`). **Behaviour: picks come first on every destination** (D4, conflict 1) | `steps.ts:155–192` |
| Q4 | Delete the hotels screen | `steps.ts:193–241`. Readers of hotel picks: `DestinationDetail.tsx:260`, `DestinationsPage.tsx:126` |
| Q5 | Progress bar "Regions · Categories". "Show me everything" on both steps (today "Continue without choosing" shows only when nothing is picked, `GetStarted.tsx:377–380`). WhatsApp button needed | `Stepper.tsx`, `GetStarted.tsx` |

**Saved picks in the browser** (`answers.ts`, key `fct-get-started`, fields `market`, `destinations`, `specialise`, `hotels`, `visited`)
- `loadAnswers()` only reads steps that still exist and drops ids that aren't current choices. So once Q1 and Q4 are gone, old `market` and `hotels` values are ignored and vanish at the next save.
- **Risks:**
  - Region ids that survive (e.g. `me`, `eu`, `af`) keep their old picks, even though Appendix A regions differ.
  - The `visited` list can drop a returning agent into the middle of the flow (`GetStarted.tsx:73`).
  - The code at `DestinationDetail.tsx:89, 260` and `DestinationsPage.tsx:110–127` must go, or the build breaks once `StepId` (`steps.ts:31`) changes.
- Each subdomain has its own browser storage, so picks don't leak between za, in and us in production. On the preview with `?market=` they would.
- **Proposal:** rename the key to `fct-get-started-v2` and delete the old key on load. On the preview, include the market in the key (`fct-get-started-v2:in`).

---

## 7. Results page (R1–R6), `DestinationsPage.tsx`

| No. | What to do | Line |
|---|---|---|
| R1 | "Picked for you" / "Destinations your clients ask for" / new text | 161–173 |
| R2 | Regions [Edit] · Categories [Edit] · Clear filters | 108–128, 216 |
| R3 | Your destinations · See all destinations · regions. Sort: Our ranking · A to Z | 48–51, 234 |
| R4 *(polish)* | Remove Popular, keep Your region | 508–515 |
| R5 | Side card "Ready when your client calls?" + Register free (today it links to `/#partners`). Help box with Chat with us | 279–297, 443–456 |
| R6 | Floating "Register free", clear of the cards | Not on this branch (`main` ChatFab). See conflict 2 |

---

## 8. Destination pages (D1–D6), `DestinationDetail.tsx`

| No. | What to do | Where |
|---|---|---|
| D1 | The two Appendix B lines | Today the text comes from `info.subtitle` / `info.intro` in `details.ts` (lines 131–135) |
| D2 | `[n] airlines into [code]` + four plain labels | 144–157. Transfers and car labels are conditional |
| D3 | All five tabs work. With no listings: Appendix C text + Register free + **"Questions about [category] in [destination]? Chat with us on WhatsApp."** | `tabs.ts:26–30` (already on), 187, 580 |
| D4 | "What you can book in [destination]" + "Your categories come first…" / "All five categories, on one login." | `Overview` 496–648. Ordering logic below |
| D5 | "Why book [destination] with Flying Carpet" + 4 points; keep View on map | 621–637 (`WhyCard` 373–400) |
| D6 | New help card + Chat with us · Register free | 641, shared `HelpCard` 344–371 |

**How ordering works today (D4/Q3).** Picks are read at line 53 and passed in as `mySpecialise` (line 249). The comment at **lines 508–509** says: *"Always the site-wide order (flights, hotels, experiences, transfers, car rentals); the agent's own products are marked 'You sell this' rather than moved."* Line 510 builds the list with `productsOf(d)` and line 544 shows the badge. Tab order is fixed in `tabs.ts`.

**D2: airline data that exists.** `details.ts` has hand-written airline lists for the 17 current destinations: Dubai 6, Maldives 6, Singapore 6, Bangkok 5, Bali 5, Istanbul 5, London 5, New York 5, Rajasthan 5, Rome 5, Tokyo 5, Sydney 5, Paris 4, Lisbon 4, Cape Town 4, Brașov 4, Marrakech 3. Some are connections ("via Doha"). Nothing exists for the 65 new destinations (conflict 11).

---

## 9. Listings (L1–L6)

| No. | What to do | Where |
|---|---|---|
| L1 | Scratch card on every listing; no prices | `DestinationDetail.tsx:858, 866`, `HotelDetail.tsx:675, 758`, `ExperienceDetail.tsx:304`, `AgentRates.tsx:28, 135` |
| L2 *(polish)* | Remove Bestseller | `details.ts` (G9 list); shown at `DestinationDetail.tsx:809`, `HotelDetail.tsx:433, 733` |
| L3 | Appendix C Hotels points (Experiences points on experience pages) | `DestinationDetail.tsx:881–883` |
| L4 | "Complete the trip" + Transfers · Experiences | `DestinationDetail.tsx:899–907` |
| L5 | New hotel help box | `DestinationDetail.tsx:912` |
| L6 | "Hotels in [destination]" + new text; remove "Curated for agents…" | `DestinationDetail.tsx:748, 780` |

---

## 10. US wording

**What the doc gives**

| No. | Item | US wording |
|---|---|---|
| G1 | Page description | The booking platform for travel advisors. Flights, hotels, experiences, transfers and car rentals on one login, with 24/7 help. Register free. |
| H2 | Small line | THE BOOKING PLATFORM FOR TRAVEL ADVISORS |
| H4 | Headline | Built for travel advisors, with real people behind every booking. |
| H4 | Text | Flying Carpet is a booking platform for every kind of travel business: ARC and non ARC agencies, host agency advisors, leisure and corporate. You get global reach on one login, and teams in South Africa, India and North America with 24/7 help, so your agency keeps moving in every time zone. |
| H4 | Numbers | 100+ / countries · 1,400+ / travel advisors |
| H6 | Intro line | An instruction only: "Say … the United States on those sites" |
| H8 | Label | From advisors |
| H8 | Headline | What travel advisors tell us |
| H8 | Text | Advisors use Flying Carpet when a client needs an answer fast. Tap a card to read their story. |
| H9 | Label | For advisors |

**Every visible "agent/agents/agency" string in the code today, and what happens to it**

| Where | Text | Fate |
|---|---|---|
| `index.html:12` | "…for travel agents…" | Replaced by G1 (US given) |
| `About.tsx:52`, `content.ts:99` | About text, "Total travel agents" | Replaced by H4 (US given) |
| `Agents.tsx:32` | "For agents" | H9 (US given) |
| `Agents.tsx:34, 39` | "Where agents access…", "…built so travel agents…" | Replaced by `main`'s H9 copy, which has no "agent" |
| `Platform.tsx:24` | "…for agents and travelers…" | Replaced by the H7 keep copy (no "agent") |
| `Testimonials.tsx:22` | "Loved by agents…" | H8 (US given) |
| `WhyUs.tsx:17`, `content.ts:57` | "Built for travel agents…", "…built for agents." | Replaced by H5 copy (no "agent") |
| `Destinations.tsx:58` | "…elevate your agency…" | Removed in H6 |
| Get Agency Access (7 places, G9 list) | | Removed by G5 |
| `DestinationDetail.tsx:627` | "Dedicated agent support" | Replaced by D5 points |
| `DestinationDetail.tsx:780–781` | "Curated for agents…" | Removed in L6 |
| `DestinationsPage.tsx:295` | "See how agents grow…" | Replaced by R5 |
| `AgentRates.tsx:28, 135`, `DestinationDetail.tsx:858`, `HotelDetail.tsx:675`, `ExperienceDetail.tsx:304` | "Special agent rates" / "Agent rates" | Replaced by L1. **The new copy "your agent rate" has no US version** |
| `FlightsInfo.tsx:158, 161` | "Special agent fares", "Want agency fares for your clients?" | **No numbered change covers this, and no US wording is given** |
| `ProductInfoPanel.tsx:12–13` | "Agency commissions…" | Appendix C Flights point, word for word. **No US wording.** The client's own US H4 text uses "agency", so it's probably fine |
| `content.ts:205` | Testimonial role "Travel Agent" | **No US wording** |
| `content.ts:239–240` | "Average agent rating", "Travel agents onboard" | **No US wording** (and see conflict 5) |
| `Signup.tsx:253, 330, 344, 374, 379, 380, 619` | Agency form copy | Page isn't in the doc (conflict 7) |

**New doc copy with no US version:** L1 "Scratch to see your **agent** rate" and "Register free to see your **agent** rate…", and L5 "…register free to see **agent** rates." G12 suggests "advisor rate(s)", but ask before using it.

---

## 11. Conflicts to ask the client

1. **G4 vs Q3/D4: category order.** G4 says always Flights, Hotels, Experiences, Transfers, Car rentals. Q3 ("We'll put them first on every destination") and D4 say the agent's picks come first. The code deliberately keeps the fixed order (`DestinationDetail.tsx:508–509`). Suggestion: picks first on destination pages only, fixed order everywhere else.

2. **G6 vs R6: two floating buttons.** G6 puts "Chat with us" at the **bottom right of every page**. R6 wants a floating "Register free" on results that is **clear of the cards**. Both can't sit bottom right. Screenshots `8f159d05…jpg` and `769c5ed4…jpg` (from screenshot) show the floating button at the **right edge, over the D5 box and top right on the listing page**, so it's on destination and listing pages too, not just results.
   - **Ask first:** G5 already puts a Register free button in the header on every page, and the header is fixed (`Header.tsx:32`, `fixed inset-x-0 top-0`). Does that header button satisfy R6? If so, there is only one floating button, WhatsApp (G6).
   - **But the header hides while scrolling down** (`Header.tsx:22–26`: it hides once the page is scrolled past 200px in the down direction, and comes back on scroll up). So during a scroll down the results, the header's Register free is out of view. **Ask:** must Register free stay visible while scrolling?
     - **If yes:** either keep the header pinned (stop it hiding), or keep a separate floating Register free.
     - **If no:** the header button is enough, and the only floating button is WhatsApp.
   - **Fallback** (if a floating Register free is kept): WhatsApp bottom right, floating Register free bottom left.

3. **G2 vs the word-for-word copy.** G2 says "your client", but two pieces of word-for-word copy say "customers":
   - **Appendix C: 15 times** (13 × "customers", 2 × "customers'").
   - **H5 Card 5** ("Give your customers a branded experience…") and **H5 Card 9** ("Save your customers' details once…").
   Which one wins?

4. **G10 vs names in the data.**

   **Data files only (first count, `hyphens.py`):** at least 288 strings (66 names and 222 prose), counted over the data files only (`src/destinations/*.ts`, `src/destinations/itineraries/*.ts`, `content.ts`, `steps.ts`). That count leaves out:
   1. JSX text inside `.tsx` files.
   2. Spaced hyphens (" - ").

   **Extended count (`hyphens2.py`, script below), which covers both:**

   | Scope | Names | Prose |
   |---|---|---|
   | Data files only (unchanged: no spaced hyphens found in copy) | 66 strings / 80 dashes | 222 strings / 270 dashes |
   | Visible text in `src/**/*.tsx` | 1 string / 1 dash | 55 strings / 66 dashes |
   | **Total** | **67 strings / 81 dashes** | **277 strings / 336 dashes** |

   - **344 strings in all.**
   - The single `.tsx` "name" is a page title (`Signup.tsx`, "Registration received — Flying Carpet"). It isn't a proper name.
   - **Spaced hyphens:** none in any copy. The only " - " in `src` is subtraction in code (e.g. `Hero.tsx:38`, `FluidBackground.tsx:31`).
   - **`.tsx` hits by file (56):** About 2, Agents 1, Footer 1, Header 1, Offers 1, Platform 1, AgentRates 3, DestinationDetail 6, DestinationsPage 1, ExperienceDetail 2, HotelDetail 13, MobilityViews 4, ProductInfoPanel 16, GetStarted 1, Signup 3.
   - Examples:
     - "Self-drive car rentals" and "Self-drive cars to explore…" (`DestinationDetail.tsx`).
     - "From world-renowned luxury to stylish, great-value stays…".
     - The "— Flying Carpet" page titles in `DestinationDetail.tsx`, `DestinationsPage.tsx`, `ExperienceDetail.tsx`, `HotelDetail.tsx`, `GetStarted.tsx` and `Signup.tsx`.
     - "Flying Carpet Travel — For magical experiences" (logo alt text).
     - "Age 2–11".
     - "Last-minute…" (×5 in `ProductInfoPanel.tsx`).
   - "garden-filled" is data, not `.tsx`. It's at `details.ts:109` and already in the data count.
   - **Limits:** the filters are rules of thumb (they skip class lists, URLs, ids and CSS or shader code), so treat these as close counts, not exact.

   **Names in the data files: 48 distinct values.**
     - **23 are proper names or terms:** Shangri-La Rasa Sentosa, Shangri-La Sydney, Asakusa & Senso-ji Tour, Senso-ji, Senso-ji Temple, Nakamise-dori, Nakamise-dori shopping street, Jemaa el-Fna, Souks and Jemaa el-Fna, Canal Saint-Martin, Île de la Cité and Notre-Dame, Leonardo da Vinci–Fiumicino, Warner Bros. Studio Tour – Harry Potter, Tuk-Tuk Street Food Tour, Sci-Fi City, Nippon Rent-A-Car, Orix Rent-A-Car, 4 Japanese and Paris addresses (1-19-1 Kabukicho, 1-8-1 Yurakucho, 3-7-1-2 Nishi-Shinjuku, 9–11 Place du Colonel Fabien), and the term Free Wi-Fi.
     - **25 are ordinary words in headings:** e.g. Last-minute bookings, Skip-the-line entry, Check-in at…, Fast-track boarding, Round-trip ferry, 4-5 Door. These can be rewritten.
   - **Question for the client:** are proper names (hotels, places, brands, addresses) exempt? The H9 "keep" point "White-label site…" also has a hyphen.

   Data-only per file (name / prose): content.ts 6/16, data.ts 0/1, details.ts 8/56, experienceDetails.ts 16/27, hotelFacts.ts 6/9, itineraries/additional.ts 1/11, asia.ts 6/36, south.ts 5/26, west.ts 7/27, mobility.ts 11/6, steps.ts 0/7.

   Both scripts are in the project at `docs/audit-scripts/`:
   - `hyphens.py` (data files; 72 lines). Its code isn't reprinted here; read it at `docs/audit-scripts/hyphens.py`.
   - `hyphens2.py` (extension; 80 lines, printed below). It loads `hyphens.py` from the same folder.

   Run from the repo root: `python docs/audit-scripts/hyphens.py .` and `python docs/audit-scripts/hyphens2.py .` (on Windows, set `PYTHONIOENCODING=utf8` first). Both were re-run from these paths on 5 Oct and gave the counts above. `hyphens2.py`:

   ```python
   # hyphens2.py: extends hyphens.py.
   #  * DASH now also matches a spaced hyphen (" - ").
   #  * Also scans every src/**/*.tsx: JSX text between tags, and visible string literals
   #    (attribute values like title=, alt=, placeholder=, text=, label=, template literals such as
   #    `${d.city} — Flying Carpet`). className values and Tailwind class lists are skipped.
   import re, sys, glob, os, collections, runpy, contextlib, io

   ROOT = sys.argv[1]
   with contextlib.redirect_stdout(io.StringIO()):          # hyphens.py prints its own report; silence it
       base = runpy.run_path(os.path.join(os.path.dirname(__file__), "hyphens.py"), run_name="lib")
   classify, STR = base["classify"], base["STR"]            # reuse name/prose/skip rules
   DATA_FILES = base["FILES"]

   DASH = re.compile(r"(?<=[A-Za-z0-9])-(?=[A-Za-z0-9])|[–—]|(?<= )-(?= )")
   CLASSY = re.compile(r"^[a-z0-9:!\[\]/.%#_()&>*,=-]+$")
   CLASS_WORDS = {"flex", "grid", "hidden", "block", "inline", "absolute", "relative", "fixed", "sticky", "group",
                  "sheen", "glass", "glass-strong", "glass-solid", "glass-orange", "uppercase", "italic", "truncate",
                  "underline", "outline-none", "transition", "shrink-0", "grow", "contents", "isolate", "peer", "sr-only"}
   CODEISH = re.compile(r"calc\(|gradient\(|rgb\(|prefers-|max-width|min-width|orientation:|#ifdef|precision "
                        r"|^[a-z]{2}-[A-Z]{2}$|\$$|^`|&\]")

   def looks_like_classes(s):
       toks = s.split()
       return bool(toks) and not re.search(r"[A-Z]", s) and all(
           t in CLASS_WORDS or (CLASSY.match(t) and re.search(r"[-:/\[]", t)) for t in toks)

   def strip_comments(src):
       src = re.sub(r"\{/\*.*?\*/\}", "", src, flags=re.S)
       src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
       return re.sub(r"(^|[^:])//[^\n]*", r"\1", src)

   def tsx_hits(src):
       # 1. JSX text: runs between '>' and '<' or '{' that contain a letter
       for m in re.finditer(r">([^<>{}]*[A-Za-z][^<>{}]*)(?=[<{])", src):
           t = m.group(1).strip()
           if t and not re.search(r"[;=()`$]|=>|&&", t) and not CODEISH.search(t):
               yield "prose", t
       # 2. string literals that are not class lists, imports, ids or URLs
       for m in STR.finditer(src):
           s = m.group(0)[1:-1]
           before = src[max(0, m.start() - 40):m.start()]
           if re.search(r"(className|class|import|from|href|src|key|id|type|name|autoComplete|rel|target"
                        r"|viewBox|d|fill|stroke)\s*=?\s*\{?\s*$", before) or re.search(r"\bfrom\s*$|\bimport\s*$", before):
               continue
           if looks_like_classes(s) or re.fullmatch(r"[a-z0-9-]+|https?:.*|/.*|#.*", s):
               continue
           if "${" in s:                                     # template literal: drop the expressions
               s = re.sub(r"\$\{[^}]*\}", " ", s)
               if looks_like_classes(s): continue
           if not re.search(r"[A-Za-z]{2}", s) or CODEISH.search(s): continue
           kind = classify(src, m)
           if kind != "skip": yield kind, s

   def count(pairs):
       c = collections.Counter()
       for kind, s in pairs:
           n = len(DASH.findall(s))
           if n: c[(kind, "strings")] += 1; c[(kind, "dashes")] += n
       return c

   data_pairs = []
   for f in DATA_FILES:
       src = re.sub(r"^\s*//.*$", "", open(f, encoding="utf8").read(), flags=re.M)
       for m in STR.finditer(src):
           k = classify(src, m)
           if k != "skip": data_pairs.append((k, m.group(0)[1:-1]))

   tsx_pairs, examples = [], collections.defaultdict(list)
   for f in sorted(glob.glob(f"{ROOT}/src/**/*.tsx", recursive=True)):
       rel = os.path.relpath(f, ROOT).replace("\\", "/")
       for kind, s in tsx_hits(strip_comments(open(f, encoding="utf8").read())):
           tsx_pairs.append((kind, s))
           if DASH.search(s): examples[rel].append(f"[{kind}] {s}")

   d, t = count(data_pairs), count(tsx_pairs)
   for label, c in (("data files", d), (".tsx visible text", t), ("TOTAL", d + t)):
       print(f"{label}: names {c[('name','strings')]} strings / {c[('name','dashes')]} dashes; "
             f"prose {c[('prose','strings')]} strings / {c[('prose','dashes')]} dashes")
   for f in sorted(examples):
       print(f"  {f} ({len(examples[f])})"); [print(f"      {s[:100]}") for s in examples[f]]
   ```

   Output: `data files: names 66 strings / 80 dashes; prose 222 strings / 270 dashes` · `.tsx visible text: names 1 strings / 1 dashes; prose 55 strings / 66 dashes` · `TOTAL: names 67 strings / 81 dashes; prose 277 strings / 336 dashes`.

5. **G3 vs the doc's own numbers.** G3 says use only 400+ / 300,000+ / 400,000+ / 24/7 / 11. But H4 uses **100+ countries** and **1,400+ travel agents**, and H5 and Appendix C use **"up to 3.5%"**. The code also shows **4.9/5, 98% and "1400+ onboard"** (`content.ts:239–241`), which the doc never mentions. Which are allowed?

6. **Country detection.** `flyingcarpet-ashen.vercel.app` has no za, in or us subdomain, and no detection exists in the code.
   - **Proposal:**
     1. In production, read the hostname prefix (`za.`, `in.`, `us.`).
     2. Otherwise, use a `?market=za|in|us` override, remembered in the browser (e.g. `fct-market`), for the preview and testing.
     3. Otherwise, use a default market. Ask the client which; the doc's H6 example names India.
   - **DNS and Vercel work:**
     - Add `za.`, `in.` and `us.flyingcarpet.travel` as domains on the Vercel project (Settings → Domains).
     - At the DNS host for flyingcarpet.travel, add a CNAME for each to the target Vercel shows.
     - Leave the apex and `www`, which serve the current site, alone.
   - **SEO note:** the page description (G1 US) lives in a static `index.html`, so a per-host version needs a host-based rewrite in `vercel.json` (a `has` host condition pointing to a US HTML file) or a separate build.
   - **Confirm:** the doc only names `us.flyingcarpet.travel`, so confirm the za and in addresses.

7. **Signup page (`/partner-with-us`).**
   - Not in the doc.
   - Still reachable by typing the address (`App.tsx:24`, `vercel.json` rewrite), but **nothing on the site links to it**. `REGISTER_URL` (`content.ts:13`) points to the *old site's* page on www.flyingcarpet.travel.
   - **Its form sends nothing:** `Signup.tsx:306` says "TODO: send the form to the registration API… Nothing is submitted yet", yet it shows "Registration received" (`:275`). That's misleading to anyone who finds it.
   - Register free going to the platform makes this page redundant. Recommend removing it or blocking the route before launch.

8. **G7 vs "No fees".** G7 says always "zero", never "no", yet the doc's own line is "Free to register. No fees, no minimum." Probably fine (G7 is about car rentals), but confirm.

9. **Branch (ours, not the client's).** See section 2.

10. **Airline names on category cards (low priority).** The Flights card on destination pages lists airline names as tags. Screenshot `8f159d05…jpg` (from screenshot) shows "Singapore Airlines, Scoot, Air India +3"; the code is `DestinationDetail.tsx:461` (`chips: info.airlines.map((a) => a.name)`). Appendix B bans airline names in the destination lines, and G15 bans visible brand names in images. Neither rule covers card tags directly. **Ask:** are airline names fine on category cards?

11. **D2 airline data source.** D2 shows the airline count "only where it comes from our data". Today the counts come from hand-written lists in `details.ts`, covering the 17 current destinations only. **Ask:** do these lists count as "our data", and where will counts for the 65 new destinations come from? If there's no source, drop the airline chip for those destinations.

12. **Appendix B lines (D1, H6).** The client wrote 6 of the 79 destinations' two lines and asks us to write the rest and "send us the full set to review before it goes live". **Ask:** how long will their review take, so we can plan around it? D1 and H6 can't be finished until it's done.

13. **Destination photos (G15, H6, D1).** Destination photos: who supplies them (client, or a licensed stock library) and who pays for licensing. G15 asks for a real photo of each destination with no visible brand names, and there will be 79 destinations (X2). Today most photos are Unsplash links in `data.ts` plus a few local files, which only cover the 17 current destinations. **Ask:** will the client supply photos, or may we use a licensed stock library, and who covers the licensing cost? Suggested: a licensed stock library, with the client approving the final set.

14. **Testimonials (H8).** The five testimonial cards (`src/content.ts`) mention Italy, Bali, Portugal, India and Romania; Portugal, India and Romania are not in the Appendix A destination list. In phase 2 we removed the Canada card (G11) and replaced the dashes in four quotes with commas, colons or full stops (G10). We can't confirm where the quotes come from. **Ask:** keep them, replace them with quotes from the client's agents, or change which destinations they mention? Suggested: replace them with quotes the client can confirm. Client reply question 13.

**Repo note (not for the client): the Tailwind edit in `GetStarted.tsx`.** The project uses **Tailwind CSS v4**: `package.json:26` (`"tailwindcss": "^4.3.3"`), `node_modules/tailwindcss` 4.3.3, and `src/index.css:1` `@import "tailwindcss"` with `@theme`.
- `bg-linear-to-r` is the v4 name.
- In v4.3.3, `bg-gradient-to-r` is still registered as a legacy name and maps to the same gradient (checked in `node_modules/tailwindcss/dist/lib.js`).
- `bg-white/5` and `bg-white/[0.05]` give the same 5% white.
- So the working-copy edit (made at 12:46 on 5 Oct, not by me) changes nothing visually and is safe. It also matches the rest of `prashant-dev`, where no `bg-gradient-to-*` class remains. The file was not reverted or edited.

---

## 12. Screenshot findings (all from screenshot, by file name)

- **`a44a7395…png` (flows):**
  - Login is drawn as an outline button.
  - "Show me everything" skips to results from every step.
  - WhatsApp shows on every step.
  - Results box text: "Your destinations / Clear filters, See all".
- **`bc57ebcb…jpg` (H1/H2):** the header shows Partners and "Get Agency Access", which matches `main`. G15 is marked on the yurts. The hero card is the glass card to keep.
- **`e261607c…jpg` (H3):** the Hilton sign is boxed as G15. Each card has a ↗ arrow, matching `main`'s link to `#products`.
- **`5767e87b…jpg` (H4):** stat labels "Total countries presence" and "Total travel agents".
- **`83e6d720…jpg` (H5):** 10 cards plus the wallet panel. The headline matches both branches.
- **`f47f778d…jpg` (H6):** "All Curated" plus Romania card "01 / 06" with Get Agency Access.
- **`209377f5…jpg` (H7):** **G13 is marked on the line cutting across the top of the section.** The headline and text match `main`.
- **`73555858…jpg` (H8):** "Testimonials" label, hover hint text.
- **`83ce69f6…jpg` (H9/H10):** the `main` H9 copy and 5 points. The strip reads India, South Africa, USA, Flights, Hotels, Experiences, Transfers (no Car rentals).
- **`ba7fa867…jpg` (H11):** dummy number, "+ Partners / + Contacts", the watermark.
- **`434b2a44…jpg` (Q1):** "Step 1 of 4" and "Back to home".
- **`16e88803…jpg` (Q2/Q5):** **G13 is marked where the line crosses the region cards**; that's what "stays behind the option cards" means. A "2 selected" counter. Descriptions show on picked tiles.
- **`1ee6c29d…jpg` (Q3):** only 4 options, "Next" button.
- **`a45b0a0e…jpg` (Q4):** the last step's button is "Show my destinations".
- **`9f86ffc4…jpg` (results):**
  - Extra heading "Top destinations for you / 17 destinations · ranked by your picks" (not in the doc; it needs wording that fits "Our ranking").
  - Grid/list toggle.
  - Region list with counts and dots.
  - Floating button over the top-right card.
- **`8f159d05…jpg` (destination):**
  - "YOU SELL THIS" badges (the doc says nothing; ask whether to keep them once picks move first).
  - Tab bar button "Get Agency access".
  - Floating button covering D5.
  - "Coming soon" on Flights, Transfers and Car rentals (that's `main`'s state).
- **`769c5ed4…jpg` (listings):**
  - Hotel chips "All hotels 4 / Luxury •2 / Upscale 1 / Midscale 1"; the dot comes from Q4 picks.
  - "4 hotels found / Curated for agents selling India to world".
  - Category tag on each card (kept by L2).
  - Floating button at the top right.
- **Appendix D ads (`7e97ca80…jpg`, `0d01fffb…jpg`, `1d22e64e…jpg`):**
  - **Only 1 of 3 uses a gold line with orange dots** (the escalator ad). Two use a thin white line with white dots.
  - Each line crosses edge to edge in one or two soft curves, passes behind the people, and carries 2–3 dots.
  - Each ad has a quarter-circle arc with one dot in the bottom-left corner (the site's `LucidCorner` already does this).
  - The ads say "350+" and "Register-free", which is why the doc says to copy their motion, not their text.

**Could not verify:** the Vercel production branch, what the live URL serves today, the WhatsApp and Freshdesk setup, and whether `details.ts` airline lists count as "our data". Hyphens inside `.tsx` JSX text were not counted.

---

## 13. Per-number checklist

No item is fully done on either branch. Every file and line below was re-opened on `prashant-dev` on 5 Oct.

**Status values:**
- **todo:** clear work, nothing outside needed.
- **todo + question:** clear work plus an open client question (the conflict is named).
- **todo, placeholder (item):** can be built now with a placeholder until the named G17 item arrives. The Register free and Login links are tracked once, under F1 and F4, not on every row with a button. "Placeholder" is used where the item's own copy includes a WhatsApp, Freshdesk, footer email or legal link.
- **blocked (item):** can't start until the client sends something.
- **question:** can't build until the client answers.

How to read the columns:
- **Waiting on / question** names the placeholder item (G17 inputs: registration link, login link, WhatsApp number, Freshdesk details, legal links, contact email) or the numbered conflict in section 11.
- **Branch note** compares with local `main`. "Same file on both" means the file is byte-identical on the two branches (`git diff --stat main prashant-dev` lists no change). "Styling or class differences only" means `git diff -w main prashant-dev` shows only class names, line breaks or quote style for the cited code. Class names can change styling, so each such row says what differs. Every renamed class listed was checked to be a Tailwind v4 shorthand for the same value (for example `bg-linear-to-r` for `bg-gradient-to-r`, `bg-white/6` for `bg-white/[0.06]`, `rounded-3xl` for `rounded-[1.5rem]`, `scrollbar-none` for `[scrollbar-width:none]`). None of these changes the Lucid Line (G13) or scrolling and tap behaviour (G16). The only non-equivalent item is `will-change-transform` dropped from the footer photo (G8 row), which is a rendering hint that can affect how smooth its parallax feels, not what it shows. Not checked in a browser. Every row has now been compared.

| No. | Status | File | Waiting on / question | Branch note |
|---|---|---|---|---|
| G1 | todo + question | `index.html:12, 16`; titles `DestinationDetail.tsx:60`, `DestinationsPage.tsx:75`, `HotelDetail.tsx:301`, `ExperienceDetail.tsx:78`; `Footer.tsx` (sign-off) | Conflict 6 (the US page description needs per-host HTML) | `index.html` same file on both |
| G2 | todo + question | Many; see "travellers" row of the G9 table | Conflict 3 ("client" vs "customers"). Rewriting traveller-facing lines is clear work | Styling or class differences only: `Testimonials.tsx` gradient class renamed (`bg-gradient-to-t` → `bg-linear-to-t`); `Destinations.tsx` class shorthands (`h-svh`, `z-1`, `z-3`, `rounded-4xl`, `bg-linear-to-r`) and `decoding="async"` dropped from the card image; `DestinationsPage.tsx` and `AgentRates.tsx` class shorthands (see R1–R5, L1). All same values in Tailwind v4. `steps.ts` same file on both. `Platform.tsx` differs in copy: `main` has the H7 keep copy, with no "travelers" (see H7) |
| G3 | todo + question | `content.ts:17, 23, 141`; `Signup.tsx:39` | 350+ → 400+ is clear work; the other figures are conflict 5 | `Signup.tsx` exists only on `prashant-dev` |
| G4 | todo + question | `DestinationDetail.tsx:510`; `data.ts:28`; `steps.ts:155–192` | Showing all five everywhere (incl. Maldives car rentals) is clear work; the order is conflict 1 | `prashant-dev` has all five tabs on (`tabs.ts:26–30`); `main` greys out three |
| G5 | todo | About 12 files; see the G9 table | — (button links are tracked under F1 and F4) | `main` header says "Get Agency Access"; `prashant-dev` says "Sign Up" |
| G6 | todo, placeholder (WhatsApp number, Freshdesk details) | `ChatFab.tsx:2`; used at `DestinationDetail.tsx:291`, `DestinationsPage.tsx:468` | Placement is conflict 2 | `prashant-dev` ChatFab is a WhatsApp icon with no link; `main`'s is a register button |
| G7 | todo | `content.ts:165`; `DestinationDetail.tsx:155` | — | Same strings on both ("no booking fee" in `content.ts`, "Self-drive car rentals" in `DestinationDetail.tsx`); the files differ elsewhere |
| G8 | todo | `Header.tsx:42`; `Footer.tsx:42, 81, 98`; `Agents.tsx:39` | — | Footer copy same on both. Styling or class differences only: line breaks, gradient class renamed, `max-w-88`/`max-w-104` for `max-w-[22rem]`/`[26rem]` (same sizes), and `will-change-transform` and `decoding="async"` dropped from the footer photo (rendering hints, no visual change) |
| G9 | todo | See the G9 table | — | Same banned terms on both, except: `main` says "Get Agency Access" (15 places) where `prashant-dev` says "Sign Up" (10 places: header, tab bar, hotel, experience and flights pages), and `main` has one more "Coming soon" (its greyed tabs) |
| G10 | todo + question | Data files + `.tsx` (conflict 4 counts) | Ordinary hyphenated words can be fixed now; proper names are conflict 4 | Data files same file on both |
| G11 | todo + question | `steps.ts:78`; `details.ts:54`; `content.ts:184`; `About.tsx:52` | Removing Canada and Zambia is clear work; per-market lists need conflict 6 | `steps.ts`, `details.ts`, `About.tsx` same file on both |
| G12 | todo + question | — (no detection code exists) | Apply the US copy the doc gives; detection is conflict 6; missing US lines in section 10 | — |
| G13 | todo | `effects/LucidLine.tsx` + uses (section 3) | — | `LucidLine.tsx` same file on both |
| G14 | todo | `index.html:15`; `index.css:8` | — | `index.html` same; the `index.css` diff doesn't touch the font |
| G15 | todo + question | `Hero.tsx:89, 121`; `content.ts:31` | Conflict 13 (who supplies the destination photos and who pays for licensing). Removing brand names from current images is clear work | No copy or image difference found in `Hero.tsx` |
| G16 | todo | `Destinations.tsx:19`; `ChoiceTile.tsx:49` | — | Testimonial tap (`Testimonials.tsx:67`) on both; `ChoiceTile.tsx` same file on both |
| G17 | blocked (all G17 inputs) | `Footer.tsx:65`; `data.ts:50` | Registration link, login link, WhatsApp number, Freshdesk details, legal links, contact email. Removing the dummy number can be done now | Dummy number on both |
| F1 | todo, placeholder (registration link) | `content.ts:13` | — | `main` points to `/get-started/market`; `prashant-dev` to the old site's `/partner-with-us` |
| F2 | todo, placeholder (WhatsApp number, Freshdesk details) | `ChatFab.tsx`; `HelpCard` `DestinationDetail.tsx:344–371` | — | As G6 |
| F3 | todo | `src/get-started/`, `src/destinations/` | — | `steps.ts` same file on both. `main`'s "Your picks" recap is at `/get-started/done` (`main` `GetStarted.tsx:25, 34, 147`; `Recap` at 362), but nothing links to it: the last step goes straight to the destinations (`main` `GetStarted.tsx:97`) and the progress bar is hidden on it (line 113). `prashant-dev` has no recap. It adds no step, so Q5 is unaffected and there's no client question. See X7 |
| F4 | todo, placeholder (login link) | `Header.tsx:74` | — | Login is the same dead `#` link on both; only the register button label differs (`main` "Get Agency Access", `prashant-dev` "Sign Up") |
| H1 | todo | `content.ts:4–10`; `Header.tsx` | — | `prashant-dev` already dropped "Partners" (`main` still has it) |
| H2 | todo | `Hero.tsx:102, 142, 144, 154` | — | No copy difference found |
| H3 | todo | `Offers.tsx:33`; `Platform.tsx:12` | — | **Hand-port from `main`:** cards there link to `#products` with an arrow (a start; opening the specific panel is still new) |
| H4 | todo | `About.tsx:47, 52`; `content.ts:98–99` | — | `About.tsx` same file on both |
| H5 | todo + question | `WhyUs.tsx:14, 17, 22, 57–59`; `content.ts` `whyUs` | Conflict 3 (Cards 5 and 9 say "customers") | Headline same on both |
| H6 | todo + question | `Destinations.tsx`; `data.ts` | Conflict 6 (default market) + conflict 12 (Appendix B review) | `data.ts` same file on both |
| H7 | todo | `Platform.tsx:19, 24` | — | **Hand-port from `main`:** headline and text (section 2 "keep" table) |
| H8 | todo + question | `Testimonials.tsx:20, 22, 28` | Conflict 14 (the testimonial cards themselves). The heading and text are clear work | Tap already works on both |
| H9 | todo + question | `Agents.tsx:32, 34, 39, 43` | Conflict 4 (the ported point "White-label site with your own branding" has a hyphen); the WhatsApp line under the button uses a placeholder until the WhatsApp number arrives | **Hand-port from `main`:** headline, text and five points (section 2 "keep" table) |
| H10 | todo | `Agents.tsx:7` | — (polish) | `main` strip has "Car rentals" and "USA"; `prashant-dev` lacks Car rentals |
| H11 | todo, placeholder (contact email, legal links, WhatsApp number) | `Footer.tsx:42–98` | — | Same content on both |
| Q1 | todo + question | `steps.ts:48–84` | Conflict 6 (where the market comes from); storage plan in section 6 | `steps.ts`, `answers.ts` same file on both |
| Q2 | todo + question | `steps.ts:85–154` | Conflict 6 (regions come from the market) | Same file on both |
| Q3 | todo + question | `steps.ts:155–192` | Conflict 1 | Same file on both |
| Q4 | todo | `steps.ts:193–241`; readers `DestinationDetail.tsx:260`, `DestinationsPage.tsx:126` | — | `steps.ts` same file on both |
| Q5 | todo | `Stepper.tsx`; `GetStarted.tsx:377–380` | — | `Stepper.tsx` same file on both |
| R1 | todo | `DestinationsPage.tsx:161–173` | — | Styling or class differences only: gradient classes renamed (`bg-gradient-to-*` → `bg-linear-to-*`) on the hero overlay and the heading; same values in Tailwind v4 |
| R2 | todo | `DestinationsPage.tsx:108–128, 216` | — | Styling or class differences only: opacity shorthand on the pick chips (`bg-white/[0.06]` → `bg-white/6`); same values in Tailwind v4 |
| R3 | todo + question | `DestinationsPage.tsx:48–51, 234` | Conflict 6 (market list) | Styling or class differences only: region list `[scrollbar-width:none]` → `scrollbar-none` and hover `bg-white/[0.06]` → `bg-white/6`; same values in Tailwind v4 |
| R4 | todo | `DestinationsPage.tsx:508–515` | — (polish) | Cited lines identical. On the card around them: class shorthands (`aspect-4/3`, `bg-linear-to-t`; same values in Tailwind v4) plus one real difference: the Explore link opens the Hotels tab on `prashant-dev` but the destination overview on `main` |
| R5 | todo, placeholder (WhatsApp number) | `DestinationsPage.tsx:279–297` (side card), `443–456` (help box) | — | Copy same on both. Styling or class differences only (gradient classes renamed, same values in Tailwind v4), plus a behaviour change: `prashant-dev` opens the register links in a new tab (`target="_blank"`) |
| R6 | question | `ChatFab.tsx`; `Header.tsx:32` | Conflict 2 (must Register free stay visible while scrolling?) | Floating register button exists only on `main` |
| D1 | todo + question | `DestinationDetail.tsx:131–135`; `details.ts` | Conflict 12 (Appendix B review) | `details.ts` same file on both |
| D2 | todo + question | `DestinationDetail.tsx:144–157` | Conflict 11 (airline data source) | `details.ts` same file on both |
| D3 | todo, placeholder (WhatsApp number) | `tabs.ts:26–30`; `DestinationDetail.tsx:187, 580` | The "Questions about … Chat with us on WhatsApp" line | `prashant-dev` already has all five tabs on; the empty-category state is still missing |
| D4 | todo + question | `Overview` `DestinationDetail.tsx:496–648` (comment 508–509) | Conflict 1 | `main` has a "Featured for you in {city}" heading (to be replaced anyway) |
| D5 | todo | `DestinationDetail.tsx:621–637` (`WhyCard` 373–400) | — | View on map on both |
| D6 | todo, placeholder (WhatsApp number) | `DestinationDetail.tsx:641`; `HelpCard` 344–371 | — | Copy same on both (both still say "Get Agency Access"); `prashant-dev` opens the link in a new tab |
| L1 | todo + question | `DestinationDetail.tsx:858, 866`; `HotelDetail.tsx:675, 758`; `ExperienceDetail.tsx:304`; `AgentRates.tsx:28, 135` | Section 10: US wording for "your agent rate" | `HotelDetail.tsx` and `ExperienceDetail.tsx`: button labels differ ("Get Agency Access" on `main`, "Sign Up" on `prashant-dev`). `AgentRates.tsx`: styling or class differences only (`tracking-widest`, `rounded-t-3xl`, `scrollbar-none`, `scheme-dark`; same values in Tailwind v4). `DestinationDetail.tsx`: `main` also has a flights list with "Agent rates"; `prashant-dev` replaced it with `FlightsInfo.tsx`, which doesn't exist on `main` |
| L2 | todo | `details.ts` (16 Bestseller lines) | — (polish) | Same file on both |
| L3 | todo + question | `DestinationDetail.tsx:881–883` | Conflict 3 (Appendix C says "customers") | Same code on both: no diff in the cited lines or in the why box |
| L4 | todo | `DestinationDetail.tsx:899–907` | — | Same code on both: no diff in the cited lines |
| L5 | todo, placeholder (WhatsApp number) | `DestinationDetail.tsx:912` | — | Styling or class differences only on the shared help card (gradient class renamed, same values in Tailwind v4), plus a behaviour change: `prashant-dev` opens the link in a new tab |
| L6 | todo | `DestinationDetail.tsx:748, 780` | — | Cited lines identical. The hotel list around them has styling or class differences only (`scrollbar-none`, `rounded-3xl`, `aspect-16/10`; same values in Tailwind v4) |

**Count (computed from the table above):** 55 rows: 23 todo, 21 todo + question, 9 todo, placeholder, 1 blocked, 1 question.

**Status changes from the previous checklist (27 rows):**
- **blocked → todo, placeholder (8):** G6, F1, F2, F4, H11, R5, D6 and L5. They can be built now with a placeholder link or number, which gets swapped in when the G17 item arrives. Only G17 itself stays **blocked**, as the list of inputs. Removing the dummy number can still be done now.
- **todo → todo, placeholder (2):** H9 (its copy includes "Chat with us on WhatsApp") and D3 (the "Questions about [category] in [destination]? Chat with us on WhatsApp." line).
- **question → todo + question (17):** G2, G3, G4, G10, G11, G12, H5, H6, Q1, Q2, Q3, R3, D1, D2, D4, L1 and L3. Each has clear work that can start now, plus an open question that affects only part of it (named in the row).
- **Changed after review (4):** H8 (todo → todo + question, because the testimonial cards depend on conflict 14). G15 (todo → todo + question, because the destination photos depend on conflict 13).
  Also G1 (todo → todo + question, because the US page description depends on conflict 6) and H9 (todo, placeholder → todo + question, because the ported point "White-label site…" hits conflict 4; its WhatsApp line still uses a placeholder).
- **Unchanged:** R6 stays **question**. Whether a floating Register free exists at all depends on the answer to conflict 2. All other todo rows stay **todo**.

**Range fixes in this version:**
- Q1 is `steps.ts:48–84`, Q2 is `85–154`, Q3 is `155–192` and Q4 is `193–241` (the step objects end one line later than v3 said).
- D2 starts at `144`. D4 is the whole `Overview` (`496–648`).
- R5's side card starts at `279`. R2 ends at `128`.
- G7's car rentals text is `content.ts:165`. G17's number is `data.ts:50`.
- The shared help card is `344–371`, and the D5 why box is `621–637`.

**Could not verify:** whether the header button, hidden while scrolling down, is enough for R6. That needs a browser check and the client's answer to conflict 2.

---

## 14. Work not numbered by the client

Work the audit implies that no single client number covers. The owner column is left blank on purpose.

| ID | Work | Depends on | Blocks | Owner | Notes |
|---|---|---|---|---|---|
| X1 | Country detection: hostname (`za.`, `in.`, `us.`), a `?market=` override for the preview, a default market, and the browser storage reset (`fct-get-started-v2`, delete the old `fct-get-started` key) | Conflict 6 answers (default market; the za and in addresses); DNS and Vercel domain setup | Q1, Q2, H6, R3, G11, G12 (and the US description in G1) | | The US page description also needs per-host HTML (a host-based rewrite in `vercel.json` or a separate build). Storage plan in section 6 |
| X2 | The 65 new destinations: photo, details, region, airline data if any | X1 (region model); conflict 12 (Appendix B review); conflict 11 (airline data); conflict 13 (photo source and licensing) | H6, D1, D2, R3 | | 14 current destinations stay; Rajasthan, Lisbon and Brașov go. Regions are remapped to the 9 in Appendix A |
| X3 | The 73 Appendix B destination lines (two per destination), written for the client to review | Appendix B rules and the 6 examples | D1, H6, X2 (client review, conflict 12) | | Same lines go on the card (H6) and the page top (D1) |
| X4 | The Signup route `/partner-with-us`: remove or block it | Conflict 7 | — | | Not linked from the site; its form submits nothing (`Signup.tsx:306`) but shows "Registration received" |
| X5 | Hyphen sweep across the data files and `.tsx` | Conflict 4 (are proper names exempt?) | G10 | | Use `docs/audit-scripts/hyphens2.py`; 344 strings today (67 names, 277 prose) |
| X6 | Port `main`-only copy into `prashant-dev`: H7 headline and text, H9 headline, text and five points, the H3 card link, Car rentals in the moving strip | X8 (the 1 Oct merge question); conflict 4 (the "White-label" point) | H3, H7, H9, H10 | | Exact `main` copy is in the section 2 "keep" table. Hand-port; don't merge local `main` |
| X7 | Decide how a returning agent enters the questions | X1 (the storage reset sends everyone back to step 1 once) | F3 | | On `prashant-dev`, an agent who has finished every step is sent straight to the results when they press Explore destinations (`GetStarted.tsx:70–96`), so they don't see the two questions F3 describes. Options: keep this, or always start at step 1 with their earlier picks already selected |
| X8 | Confirm the deploy source and the merge intent: check the Vercel production branch, ask whoever made the 1 Oct merge (`f5cebbe`) whether dropping `main`'s copy was intended, and review the stash on local `main` before deleting anything | Vercel project access | X6 | | See section 2 |
