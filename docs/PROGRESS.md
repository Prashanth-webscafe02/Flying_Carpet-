# FCT changes progress (nothing pushed, docs/ uncommitted)

## Where the work is
- Branch prashant-dev (as you asked). It now holds all phases:
  231d516 merges fct-changes-v1 (phases 1 to 5, same code as origin/main's PR #2 merge) into prashant-dev,
  then phase 6 and the sweep on top. Local only: prashant-dev is 6 commits ahead of origin/prashant-dev.
- fct-changes-v1 stays at 3a83842 (phases 1 to 5).

## Done (commits)
- 4974a97 Phase 1: market detection, config placeholders, title, Lato, name.
- 5ad146f Phase 2: home copy H1 to H11, buttons, footer, floating Chat with us, signup route removed.
- 23c9eeb Phase 3: two step questions, results page, Appendix A lists.
- 1b73556 Phase 4: destination and listing pages, empty category state.
- 104dd55 / 3a83842 Phase 5: 79 destinations in nine regions, Appendix B lines for all 79 (for client review).
- 549d297 Phase 6a: H6 destination browser.
- da0e62f Phase 6b: L1 scratch card.
- c400fad Phase 6c: gold Lucid Line, hero lines, hero fit and scratch card fixes.
- dd5683b Final sweep: Appendix C on listing panels, no dashes in prose, travellers to clients.

## Left / open
- Client answers to the 13 questions in docs/fct-client-reply.md (defaults are in the code).
- G17 placeholders in src/config.ts (registration, login, WhatsApp, Freshdesk, terms, privacy, email).
- 65 destination photos (docs/destinations-needing-photos.md); hero photo (G15).
- Dashes left only in official names (Senso-ji, Notre-Dame, Jemaa el-Fna, Wi-Fi, Shangri-La), per rule 4.
- details.ts still has unused Rajasthan, Lisbon and Brasov blocks (harmless).
