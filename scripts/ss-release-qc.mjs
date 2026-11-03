import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {personalizeLesson} from '../curriculum-2026-11/assessment-order.mjs';
const files=fs.readdirSync('curriculum-2026-11').filter(f=>/^fresh_ss_.*\.json$/.test(f));
assert.equal(files.length,10);
const lessons=files.map(f=>JSON.parse(fs.readFileSync('curriculum-2026-11/'+f)));
let questions=0;
for(const l of lessons){
 assert.ok(l.teachingSections?.length&&l.readingLocation?.startPage);
 for(const s of l.teachingSections){assert.ok(s.teach.length&&s.example.prompt&&s.example.answer&&s.example.thinking&&s.example.why&&s.tryPrompt&&s.tryAnswer);}
 for(const bank of ['practice','independentCheck','delayed'])for(const q of l[bank]){questions++;for(const z of [q,q.repair]){assert.ok(Number.isInteger(z.answer)&&z.options[z.answer]);assert.equal(z.options.length,new Set(z.options).size);}}
 for(const user of ['qc-a','qc-b','qc-c']){const shuffled=personalizeLesson(l,user);for(const bank of ['practice','independentCheck','delayed'])for(const q of l[bank]){const z=shuffled[bank].find(x=>x.id===q.id);assert.equal(q.options[q.answer],z.options[z.answer]);assert.equal(q.repair.options[q.repair.answer],z.repair.options[z.repair.answer]);}}
}
const map=lessons.find(l=>l.id==='fresh_ss_egypt_map14_visual');for(const label of map.mapModel.labels)assert.ok(map.teachingSections.some(s=>s.title===label));
const sandbox={};vm.createContext(sandbox);for(const f of ['lesson-library.js','learning-paths.js'])vm.runInContext(fs.readFileSync(f,'utf8'),sandbox);
const old=sandbox.RY_LESSON_LIBRARY.subjects.SS.lessons.map(l=>l.id);vm.runInContext(fs.readFileSync('ss-current-audio.js','utf8'),sandbox);
const parent=sandbox.RY_LESSON_LIBRARY.subjects.SS.lessons;for(const l of lessons){const p=parent.find(p=>p.id===l.id);assert.ok(p);for(const s of l.teachingSections){assert.ok(p.teach.includes(s.title)&&p.model.includes(s.example.answer));}}
for(const id of old)assert.ok(parent.some(l=>l.id===id),'Earlier parent lesson removed');
const home=fs.readFileSync('index.html','utf8');for(const l of lessons)assert.ok(home.includes('?lesson='+l.id));assert.ok(home.includes('home.css')&&home.includes('rayna-audio.html'));
assert.ok(!fs.readdirSync('curriculum-2026-11').some(f=>f.includes('assigned-text.private')||f.includes('private-goodall')));
console.log(`PASS: 10 source-mapped lessons; ${questions} scored questions and repair keys; 3 shuffled forms; 14 map topics; parent teaching/models aligned; ${old.length} earlier parent lessons preserved; all chapter links present.`);
