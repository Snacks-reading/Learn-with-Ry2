# Ordered learning paths — release review

The previous interface used full-library lesson numbers, fixed subject-entry lessons, and array-order Previous/Next controls. These could send a learner to different sequences.

A single shared unit map now controls student navigation and the parent chapter sequence. Home shows one next task in each subject. Every lesson has a compact task panel and ordered Learn → Practice → Repair → Write → Continue stages. Partial practice resumes at unanswered questions. Saved writing and review remain separate from mastery. Existing learning data and first-attempt scores are retained.

Current paths: ELA Animal Allies quiz preparation; Math rational numbers and coordinates; Science ecology; Social Studies Ancient Egypt. Prior units have a labeled selector, including the full official Ancient Israel 24-target guide and its supporting lessons. No new source-completeness claim is made for the Egypt or autobiography materials.

## Verification

- All 230 curriculum lesson objects, including questions and keys, match the previous release.
- All configured path IDs resolve; 49 adjacent Previous/Next pairs follow the shared order.
- All 230 lessons remain reachable, including library lessons outside a selected unit.
- Deep links, partial-practice resume, exact-count multi-select repair, and writing handoff pass interaction checks.
- Repair never overwrites a first-attempt score; saved writing is explicitly pending separate review.
- A 390-pixel simulated viewport checks the collapsed path menu and unit switching; desktop interaction checks also pass.
- All 198 parent teaching chapters are retained and ordered from the same unit map. Notes, listened markers, full narration chunks, and Stop behavior are preserved.
- The official 24-target recall sequence and all four interactive activities remain available.
- Full curriculum QC and whitespace checks pass before publication. Live deployment is verified separately after the Pages build.
