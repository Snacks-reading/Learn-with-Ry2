import fs from 'node:fs';
import {loadCurriculum} from './curriculum.mjs';
const {D,BUILD}=loadCurriculum();
const subjects=Object.fromEntries(['ELA','MATH','SCI','SS'].map(key=>[key,{name:D[key].name,lessons:D[key].lessons.filter(l=>!l.test).map(l=>Object.fromEntries(['id','title','src','link','teach','model','connect','success','v','w','learningTools'].filter(k=>l[k]!=null).map(k=>[k,l[k]])))}]));
const data={build:BUILD,subjects};
const output='globalThis.RY_LESSON_LIBRARY='+JSON.stringify(data).replace(/</g,'\\u003c')+';\n';
fs.writeFileSync(new URL('../lesson-library.js',import.meta.url),output);
console.log(JSON.stringify({build:BUILD,teachingLessons:Object.fromEntries(Object.entries(subjects).map(([k,v])=>[k,v.lessons.length])),bytes:Buffer.byteLength(output)}));
