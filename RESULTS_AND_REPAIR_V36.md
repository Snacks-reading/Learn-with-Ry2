# Practice results and required repair — October 27, 2026

## Delivered behavior

Open **Scores & missed questions** from the student header or Parent Tools. Results cover existing lesson practices, the focused extra-practice sets, the four Egypt map forms separately, and saved earlier ELA form attempts. Only practices with saved work appear by default; a filter exposes unstarted practices.

Each practice displays its original objective points and percentage, answered/total and unfinished status, original incorrect items, explicitly independent evidence, supported/unknown-independence work, pending writing, and parent-reviewed writing separately. Each saved response shows the prompt, Ry’s original answer, the correct answer or writing review reference, and explanation. An unattempted set has no score, not 0%. A percentage on an unfinished set is explicitly labeled as based on answered work.

Big 8 decimal/percent pairs have deterministic exact-number checks: one point per decimal and one per percent. Fractions, mixed-number percentages and supported repeating-decimal notation are compared as exact rational values. A rounded decimal is not silently treated as an exact repeating value. Unsupported or ambiguous response formats remain pending review rather than being guessed correct or incorrect. Explanations, graphs, constructed transfers and other writing need review. Numerical checks on old stored responses are derived from the saved answer; the original stored response is not rewritten.

## Incorrect-response cycle

A wrong current selected or objectively graded response automatically provides the relevant explanation, worked teaching and a new parallel check. The original Next button stays disabled until additional practice has been submitted and its review acknowledged. A failed parallel check leads to more teaching and another example. Where a trustworthy automatic check is inappropriate, a new constructed example is saved for review, without claiming mastery. Written work and written repair work marked needs work automatically reopen teaching and practice.

The earlier ELA review and the main lesson review queue use the same repair teaching. Results retain historical misses even after supported practice succeeds. Repair answers have a separate history; they never replace original answers, correctness, or scores. Later checks wait at least 24 hours, compare question/context/choice signatures to prior repair work, and require an explicit independent flag. Supported work or repeated prompts do not become independent delayed evidence.

## Existing records and another device

Existing score, writing and practice storage keys are unchanged. Previously saved responses remain readable, including records whose independence was not recorded. No missing independence flag is invented.

The app still saves on the device/browser used for practice. Use **Export all results** on that device and **Bring scores from another device → Import results** on the other device. Imports create clearly labeled snapshots and preserve local first answers. Compatible existing progress backups, focused-practice exports and earlier ELA exports are accepted. A file with an invalid structure is rejected. This update does not claim automatic cross-device synchronization.

Parent writing review is distinct from automatic scoring. Original writing remains saved, and parent feedback is a separate record. Readiness is not inferred from publishing reports or finishing repairs.

## Validation

- Every existing lesson, question, key, ordering and stable question index compared unchanged against the prior published build.
- Cumulative curriculum checks pass; parent teaching data stays synchronized.
- Synthetic nonzero records exercise a mixture of correct, incorrect, supported, unknown-independence, unattempted and pending-written work. These test records are not Riley’s actual scores and are not published as student data.
- Exact numeric tests include finite values, repeating notation, equivalent mixed percentages, wrong percentages, partial credit and formats left for review.
- Phone (390 pixels) and desktop (1440 pixels): per-practice scores, original-answer detail, four map forms, earlier ELA attempts, automatic repair gates, failed-repair retry, parent-marked written misses, unchanged first responses and results import are interaction-tested.
- Fresh repair key indices and distinct choices are checked against the generated cases. Such checks support interface/item integrity; they do not establish Riley’s mastery.

Machine-readable checks: `v36-content-qc.json`, `v36-browser-qc.json`, `qc-report.json`.
