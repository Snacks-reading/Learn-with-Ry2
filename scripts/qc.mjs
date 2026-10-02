import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<script>([\s\S]*)<\/script>/);
if (!match) throw new Error('No application script found');

const storage = new Map([['learnwithry_source_first_index_v1', JSON.stringify({ first: { old: { correct: true } }, lessonDone: { old: true } })]]);
const sandbox = {
  console, Date, Math, Blob, URL,
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key),
    clear: () => storage.clear()
  },
  setTimeout: () => 0,
  clearTimeout: () => {}
};
vm.createContext(sandbox);
const source = match[1].replace(/\brender\(\);\s*$/, '') + '\n;globalThis.__APP={D,BUILD,KEY,ARCH,SCORE_RESET,balancedShuffle,qid,modelText,transferPrompt};';
vm.runInContext(source, sandbox, { filename: 'index.html' });

const { D, BUILD, KEY, ARCH, SCORE_RESET, balancedShuffle, qid, modelText, transferPrompt } = sandbox.__APP;
const subjects = Object.entries(D).map(([key, value]) => ({ key, name: value.name, lessons: value.lessons.length }));
const lessons = Object.entries(D).flatMap(([subject, value]) => value.lessons.map(l => ({ subject, ...l })));
const ids = lessons.map(l => l.id);
const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
const objectiveIds = lessons.map(l => l.objectiveId);
const duplicateObjectiveIds = [...new Set(objectiveIds.filter((id, i) => objectiveIds.indexOf(id) !== i))];
const badLessons = lessons.filter(l => !l.id || !l.title || !l.src || !l.teach || !Array.isArray(l.q) || l.q.length < 2).map(l => l.id);
const current = lessons.filter(l => /^(ela|math|science|ss)_oct2_/.test(l.id));
const incompleteCurrent = current.filter(l => !l.model || !l.connect || !l.success || !l.w || (!l.test && !l.v?.length)).map(l => l.id);
const testLeak = lessons.filter(l => l.test && modelText(l).includes(l.q?.[0]?.[0] || '__none__')).map(l => l.id);
const transferMissing = lessons.filter(l => !transferPrompt(l)).map(l => l.id);
const connectionMissing = lessons.filter(l => !l.connectionBridge || !l.connectionPrompt || !l.connect || !String(l.w).includes('CONNECTION:')).map(l => l.id);
const connectionChecksMissing = lessons.filter(l => !l.test && l.connectionChecks < 2).map(l => l.id);
const insufficientIndependentChecks = lessons.filter(l => {
  if (l.test) return false;
  const modeledItems = !l.model && l.q?.length > 1 ? 1 : 0;
  return l.q.length - modeledItems < 4;
}).map(l => l.id);
const multiIssues = [];
const questionIds = [];
const positions = [0, 0, 0, 0];

for (const l of lessons) for (let i = 0; i < l.q.length; i++) {
  const [prompt, opts, ans] = l.q[i];
  const id = qid(l, i);
  questionIds.push(id);
  if (!Array.isArray(opts) || opts.length < 2) multiIssues.push(`${id}: options`);
  if (Array.isArray(ans)) {
    const label = String(prompt).match(/(?:SELECT|Choose)\s+(?:exactly\s+)?(TWO|THREE|FOUR|\d+)/i);
    const words = { TWO: 2, THREE: 3, FOUR: 4 };
    const shown = label ? (words[label[1].toUpperCase()] || Number(label[1])) : ans.length;
    if (shown !== ans.length || new Set(ans).size !== ans.length || ans.some(x => x < 0 || x >= opts.length)) multiIssues.push(`${id}: multi-key`);
  } else {
    if (!Number.isInteger(ans) || ans < 0 || ans >= opts.length) multiIssues.push(`${id}: answer-key`);
    const order = balancedShuffle(opts, ans, id, 0);
    const p = order.findIndex(x => x.i === ans);
    if (p >= 0 && p < 4) positions[p]++;
  }
}

const duplicateQuestionIds = [...new Set(questionIds.filter((id, i) => questionIds.indexOf(id) !== i))];
const max = Math.max(...positions), min = Math.min(...positions);
const report = {
  build: BUILD,
  scoreReset: SCORE_RESET,
  storage: { key: KEY, archive: ARCH, oldKeyIgnored: KEY !== 'learnwithry_source_first_index_v1' && !storage.has(KEY) },
  subjects,
  totals: {
    lessons: lessons.length,
    questions: questionIds.length,
    explicitWrittenPrompts: lessons.filter(l => l.w).length,
    generatedOrExplicitTransferPrompts: lessons.filter(l => transferPrompt(l)).length
  },
  answerPositions: { A: positions[0], B: positions[1], C: positions[2], D: positions[3], spread: max - min },
  duplicateIds,
  duplicateObjectiveIds,
  duplicateQuestionIds,
  badLessons,
  incompleteCurrent,
  testLeak,
  transferMissing,
  connectionMissing,
  connectionChecksMissing,
  insufficientIndependentChecks,
  multiIssues
};
report.pass = duplicateIds.length === 0 && duplicateObjectiveIds.length === 0 && duplicateQuestionIds.length === 0 && badLessons.length === 0 && incompleteCurrent.length === 0 && testLeak.length === 0 && transferMissing.length === 0 && connectionMissing.length === 0 && connectionChecksMissing.length === 0 && insufficientIndependentChecks.length === 0 && multiIssues.length === 0 && report.storage.oldKeyIgnored && max - min <= Math.ceil(questionIds.length * 0.03);

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
