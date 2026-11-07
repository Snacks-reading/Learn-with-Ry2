import assert from 'node:assert/strict';
import unit from '../curriculum-2026-11/ss-unit-tests.json' with { type: 'json' };
import release from '../curriculum-2026-11/social-studies-release.json' with { type: 'json' };
import gate from '../SOURCE_COMPLETENESS_GATE.json' with { type: 'json' };
import { newPlan, objectives, questionFor, safeQuestion } from '../curriculum-2026-11/ss-tests.mjs';

assert.equal(gate.subjects.SS.assessmentEnabled, false);
assert.match(gate.subjects.SS.privatePractice, /\?ssTests=1$/);
assert.equal(release.held, false);

const bank = [...unit.pool, ...unit.repairPool];
assert.equal(new Set(bank.map(item => item.id)).size, bank.length);
for (const item of bank) {
 assert.ok(item.prompt && item.rationale && item.options[item.answer], item.id);
 assert.equal(new Set(item.options).size, item.options.length, item.id);
 assert.ok(unit.sources[item.sourceRef.sourceId], item.id);
}

const used = new Set();
for (const form of ['A', 'B', 'C']) {
 const plan = newPlan(form, [], [], Date.now(), 'synthetic-form-order');
 assert.equal(plan.items.length, 50);
 assert.deepEqual(new Set(plan.items), new Set(unit.forms[form]));
 const coverage = new Set();
 const positions = plan.items.map((id, index) => {
  assert.ok(!used.has(id), id);
  used.add(id);
  const item = questionFor(plan, index, 'synthetic-choice-order', 2);
  const canonical = bank.find(entry => entry.id === id);
  assert.equal(item.options[item.answer], canonical.options[canonical.answer]);
  assert.equal(safeQuestion(item).answer, undefined);
  item.objectiveIds.forEach(objective => coverage.add(objective));
  return item.answer;
 });
 assert.equal(coverage.size, objectives.length);
 assert.ok(positions.every((_, index) => !RyChoiceLayout.hasPattern(positions.slice(0, index + 1))));
}
console.log('Egypt QC passed: all three disjoint 50-question forms, 47 objectives, valid source keys and varied displayed positions.');
