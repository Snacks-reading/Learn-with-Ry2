import fs from 'node:fs';
import assert from 'node:assert/strict';
import {personalizeLesson} from '../curriculum-2026-11/assessment-order.mjs';
const dir='curriculum-2026-11/',release=JSON.parse(fs.readFileSync(dir+'social-studies-release.json'));
assert.equal(release.held,true,'An incomplete source gate must keep student assessment held');
assert.equal(release.releaseApproved,false);
const gate=JSON.parse(fs.readFileSync('SOURCE_COMPLETENESS_GATE.json')).currentSocialStudiesReset;
assert.equal(gate.releaseApproved,false);assert.equal(gate.status,'blocked');
for(const subject of ['ELA','Math','Science','Social Studies','Theatre'])assert.ok(gate.subjects.some(s=>s.subject.toLowerCase()===subject.toLowerCase()));
const files=fs.readdirSync(dir),drafts=files.filter(f=>/^ss_verified_.*\.json$/.test(f)).map(f=>JSON.parse(fs.readFileSync(dir+f)));
assert.equal(drafts.length,6);const prompts=new Set(),ids=new Set();let total=0;
for(const l of drafts){
 assert.equal(l.draft,true);assert.match(l.releaseStatus,/Unreleased/);assert.deepEqual(l.delayed.map(q=>q.retrievalDay),[1,3,7,14,30]);
 for(const bank of ['practice','independentCheck','delayed'])for(const q of l[bank])for(const z of [q,q.repair]){
  total++;assert.ok(!prompts.has(z.prompt));prompts.add(z.prompt);assert.ok(!ids.has(z.id));ids.add(z.id);
  assert.equal(new Set(z.options).size,z.options.length);assert.ok(Number.isInteger(z.answer)&&z.options[z.answer]);
  const source=l.sources.find(s=>s.sourceId===z.sourceRef.sourceId);assert.ok(source);assert.ok(z.sourceRef.pages.every(p=>source.pages.includes(p)));
 }
 for(const user of ['qc-a','qc-b','qc-c']){const shuffled=personalizeLesson(l,user);for(const bank of ['practice','independentCheck','delayed'])for(const q of l[bank]){const z=shuffled[bank].find(x=>x.id===q.id);assert.equal(q.options[q.answer],z.options[z.answer]);assert.equal(q.repair.options[q.repair.answer],z.repair.options[z.repair.answer]);}}
}
for(const f of files.filter(f=>/^fresh_ss_.*\.json$/.test(f)))assert.equal(JSON.parse(fs.readFileSync(dir+f)).archived,true);
assert.ok(!files.some(f=>/private|\.pdf$/i.test(f)));
const audio=fs.readFileSync('rayna-audio.js','utf8');assert.ok(audio.includes("if(subject==='SS')"));assert.ok(audio.includes('not released lessons'));
assert.ok(!fs.readFileSync('rayna-audio.html','utf8').includes('ss-current-audio.js'));
console.log(`PASS supporting draft checks: ${drafts.length} unreleased chapters, ${total} unique MC/repair items and preserved shuffled keys. Source-completeness gate remains BLOCKED; this is not release approval.`);
