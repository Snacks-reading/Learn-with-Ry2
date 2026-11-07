# Classroom ecology release — November 7, 2026

Science now has a single private workspace for teaching, parent narration, practice tests, missed-skill rounds, progress and later recall. The public homepage's Science card and Assessments & Practice link lead there. The private Studio and its parent-audio page expose the same workspace.

## Verified teaching scope

- All 33 teacher Ecology StudyMate entries, read in full.
- Recovered Environments and Populations guided notes: 14 uploaded photos, including one overlap.
- Matter and Energy in Food Webs: full teacher DOCX and 11 uploaded photos.
- Teacher Ecology Study Guide Answer Key and 16 symbiosis slides.

The source-to-objective matrix is rebuild/SCIENCE_COVERAGE.json. The public curriculum contains original explanations and questions; raw classroom files, student handwriting, learner records and credentials remain private.

There are 14 lessons, 42 assessed objectives, three 42-question practice forms and a separate 42-question independent transfer check D, with 168 disjoint full-test items and a 471-item bank including retrieval and missed-skill items. Every test covers all 33 terms and nine additional packet objectives. These are aligned practice questions, not claimed copies or predictions of the teacher's actual exam. ORISE's published invasive-species sets were reviewed as supplemental evidence; their defective absolute claims were not imported.

## Learning and results

Each lesson teaches concepts and vocabulary, shows a worked example, and provides an answer-first guided check. Full tests are accessible without a lesson-completion lock. Different tests and missed-skill rounds can be paused and resumed independently. Answers and choices are randomized and their order is retained for resumption.

The private API scores from the approved bank, preserves the original first answer, rejects stale-tab writes, and separates accounts. Existing learner records are not deleted or imported. The new Science edition starts unmeasured in its own namespace. Scores, missed items, lesson reading, guided-check completion and current rounds are visible under Scores & progress on signed-in devices.

After misses, explanations and teaching links are available. New missed-skill questions come from unused items; old answers never become fresh evidence. The bank is finite. If no unused item remains, the interface reports that new authoring is required rather than recycling a question and claiming freshness.

Separate recall rounds unlock after 1, 3, 7, 14 and 30 days from the first completed full test. Their objective groups collectively cover all 42 objectives. Mastery requires practice tests A, B and C completed, latest independent full-test accuracy at least 90%, at least four independent answers per objective at 90% in its latest ten answers, correct delayed evidence per objective, and all five recall rounds correct. First-attempt history remains visible. Supported work does not count toward mastery. Form D opens after A, B and C and its items are reserved from repair and recall.

Rayna's Audio reads the same lesson content and examples. Narration has pause, resume, stop, three rates and voice selection; navigation cancels narration. Question narration contains only the prompt and visible choices. Feedback is available only after answering.

## QC actually performed

- Reviewed all 33 term definitions and all three forms' term keys; reconciled symbiosis, tertiary levels, biotic/abiotic and producers against the recovered notes.
- Excluded the packet's zebra/browser claim and diagram/prose conflicts from keys. Used explicit feeding pathways for consumer-level questions.
- Checked all 471 bank entries for valid unique IDs, four distinct choices, valid keys, rationale and a teaching chapter. Confirmed each practice form and the transfer check covers every objective with disjoint item IDs.
- Exercised immutable first answers, invalid answers, pause/resume, separate concurrent rounds, supported-versus-independent evidence, scheduled date gates, all five recall rounds, conservative mastery and unused missed-skill selection in automated tests.
- Verified that a 37/42 result on C with supported work on B can progress to 90% on the affected skills through fresh questions, an independent D and all five recall rounds. The original C result stayed saved and no items were reused.
- Exercised private database save/load, reload from another session, account isolation, stale-write rejection and immutable incorrect answers using synthetic records in an isolated database. No learner account received test answers.
- TypeScript and production-build checks run for the private Studio; release results recorded at publication.

The preview service reported running but its browser URL refused connections. Browser layout, audible playback and iPhone behavior are unverified. Automated checks do not substitute for those checks.

## Remaining source boundaries

Exact publisher-only STEMscopedia pages, a complete district-edition match and the full five-course census remain uncertified. The recovered classroom materials permit this bounded ecology teaching release; they do not establish complete coverage of every Science assignment or standard. The other subjects' source gates are unchanged.
