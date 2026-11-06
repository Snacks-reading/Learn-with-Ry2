# Learn With Ry reconciliation · November 6, 2026

This is a reconciliation of the current GitHub release, source evidence and runtime behavior. It is not certification that the all-subject rebuild is finished.

## Current release

| Subject | Ready focused lessons | Whole-course tests | Main remaining work |
| --- | ---: | --- | --- |
| ELA | 4 | Not released | Dog video, new spiral, remaining assigned text, standards/rubrics and coverage gaps |
| Math | 1 | Not released | Wider expressions quiz, Big 8, textbook examples and standards |
| Science | 0 | Not released | Exact 33–34 vocabulary terms and all three STEMscopes readings |
| Social Studies | 0 | Not released | Remaining OER, maps, language handout, slides/media and new whole-unit MC forms |
| Theater | 0 | Not released | Actual teacher slides, directions and assigned scope |

The five focused lessons have 74 selected-response items, seven ungraded opinion ratings and 20 writing prompts. Their checks are not complete course exams. Existing current-namespace first answers remain unchanged; earlier namespace scores are not imported.

## Source reconciliation

- The complete November 6 newsletter was already reviewed. It is removed from the generic missing-source claim. Later assignment changes remain open.
- The source gate now names four ELA lessons, rather than incorrectly saying three. The lesson allowlist is enforced by the runtime as well as recorded in JSON.
- Reviewed Hachiko and SoFi source records now point to their actual lessons. Every ready-lesson instructional source has a register identity. Each current selected-response item has a stable ID and an adaptation/source record. These are original source-aligned questions, not a recovered teacher test.
- The exact teacher Egypt vocabulary list was recovered: Cataracts, Delta, Classes, Occupation, Pharaohs, Bureaucracy, Afterlife, Mummy, Mummification, Pyramids, Artifacts, hieroglyphics, papyrus, Sphinx, cultural diffusion, commerce, Menes, Khufu, Mentuhotep II, Hyksos, Ahmose, Queen Hatshepsut, Tutankhamun, Ramses the Great. The handout gives terms, not definitions. Earlier generated vocabulary lists cannot replace it.
- Uploaded Who Done It? (six pages), Two Lands (two pages) and Hieroglyphics & Hieratic Script (one page) were OCR-read and visually inspected. They no longer depend on another Schoology download. No licensed PDF or full worksheet question bank is republished.
- The 51-page WCS Egypt OER is recovered. Pages 1 and 15–17 were read during this reconciliation, and the page 15 social pyramid was visually checked. Soldiers and scribes occupy the same third tier. The remaining pages are not marked read.
- Simplifications in Two Lands and the writing handout require explicit factual reconciliation before testing. The society mystery's invented events are not historical evidence. Its separate ranking questions do not change the OER diagram's five tiers.

## Actual coverage gaps

The matrix in `rebuild/COVERAGE_MATRIX.json` maps 22 objective groups to actual teaching and question positions. Seventeen groups lack at least one selected-response stage. For example, Hachiko's five sidebar words are checked in guided practice but do not all have independent, assessment and retention items. The math lesson teaches modeling and evaluation, but those demands do not yet have a complete independent MC assessment/retention path. One shared worked example per lesson does not prove adequate modeling of every objective.

Fresh questions after misses, three whole-subject forms per course, later-day retrieval sets, evidence-based writing review and private cross-device synchronization are still missing. No mastery certification is supported by this release. These gaps are recorded rather than hidden by the question total.

## Student and parent alignment

For the five ready lessons, Learn With Rayna reads the exact same teaching paragraphs and worked model as Ry's lesson. Both routes use the same catalog entry, so there is no separate parent script to drift. Parent notes, current source limitations and this report remain outside the teaching narration.

This does not establish that the separate private Learning Studio has the same deployed release. Its publication and learner records were not changed by this GitHub reconciliation. The GitHub path saves in the same browser only. A parent can now inspect stage results, missed items and saved writing through Assessments & Practice → Parent review on Ry's device. This is not cross-device synchronization.

## Functional corrections and QC

The outer page renderer previously replaced the lesson player's carefully selected narration with the entire rendered page. It now preserves the player's teaching or question-and-choice narration. Hidden recall answers, navigation controls and answer explanations are excluded from that question narration. Lesson navigation still cancels speech. Bookmark links now return to the active lesson instead of a source-preview route.

The runtime reads the release gate and catalog together, checks matching reset IDs, and permits only explicitly allowlisted focused lessons. It does not release a course exam merely because a lesson has a local enabled flag. Parent results clearly distinguish unanswered, partial and completed question counts. Writing remains awaiting review.

Automated DOM simulations completed the guided → independent → assessment → writing gate → day-one recall journey for all five lessons, with the first assessment saved once. These are simulated browser elements, not a phone playback or real learner trial. Automated checks also cover source identity and reciprocal mappings, gate/catalog agreement, every option/key, 22 matrix-reference ranges, JavaScript syntax, current/legacy storage separation, all five ready-lesson routes, blank/correct/wrong submissions, immutable first answers, disabled pre-answer feedback, question-only narration, parent review and rejection of a removed gate entry. Live phone audio quality, mobile layout and cross-device synchronization are not certified. No current student answer was fabricated for browser testing.
