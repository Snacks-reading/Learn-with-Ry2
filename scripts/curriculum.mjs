import fs from 'node:fs';
import vm from 'node:vm';
export function loadCurriculum(){
  const root=new URL('../',import.meta.url),html=fs.readFileSync(new URL('index.html',root),'utf8');
  const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  const paths=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split('?')[0]).filter(p=>!['narrator.js','organizer.js'].includes(p));
  const storage=new Map();
  const sandbox={console,Date,Math,Blob,URL,setTimeout:()=>0,clearTimeout:()=>{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)}};
  vm.createContext(sandbox);
  vm.runInContext(inline[0]+'\n'+paths.map(p=>fs.readFileSync(new URL(p,root),'utf8')).join('\n')+'\n'+inline.slice(1).join('\n').replace(/\brender\(\);\s*$/,'')+'\n;globalThis.curriculum={D,BUILD};',sandbox);
  return JSON.parse(JSON.stringify(sandbox.curriculum));
}
