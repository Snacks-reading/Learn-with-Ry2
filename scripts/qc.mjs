import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const narrator = fs.readFileSync(new URL('../narrator.js', import.meta.url), 'utf8');
const practiceHtml = fs.readFileSync(new URL('../ela-unit1-practice.html', import.meta.url), 'utf8');
const practiceJs = fs.readFileSync(new URL('../ela-unit1-test.js', import.meta.url), 'utf8');
const organizer = fs.readFileSync(new URL('../organizer.js', import.meta.url), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
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
const requiredScienceOrder = ['s_vocab_rescue_heat', 's_vocab_rescue_transfer', 's_vocab_rescue_resources', 's_vocab_rescue_systems'];
const scienceOrderActual = D.SCI.lessons.slice(0, 4).map(l => l.id);
const scienceVocabularyFirst = requiredScienceOrder.every((id, i) => scienceOrderActual[i] === id);
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
  scienceVocabularyFirst,
  scienceOrderActual,
  multiIssues
};
const voiceStorage = new Map();
let spokenUtterance = null;
class TestUtterance { constructor(text){ this.text = text; } }
const testVoices = [
  { name: 'Microsoft Mark - English (United States)', lang: 'en-US', default: true },
  { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US', default: false }
];
const voiceWindow = {
  SpeechSynthesisUtterance: TestUtterance,
  speechSynthesis: { getVoices: () => [...testVoices], cancel(){}, speak(u){ spokenUtterance = u; }, addEventListener(){} },
  addEventListener(){}
};
const voiceSandbox = {
  window: voiceWindow,
  SpeechSynthesisUtterance: TestUtterance,
  localStorage: { getItem:k=>voiceStorage.get(k)||null, setItem:(k,v)=>voiceStorage.set(k,String(v)), removeItem:k=>voiceStorage.delete(k) }
};
vm.createContext(voiceSandbox);
vm.runInContext(narrator, voiceSandbox, { filename: 'narrator.js' });
voiceWindow.RyNarrator.speak('Voice quality check', { querySelector: () => null });

report.narration = {
  sharedEngineLoaded: html.includes('narrator.js?v=20261003-2') && practiceHtml.includes('narrator.js?v=20261003-2'),
  lessonControls: html.includes("'Read this lesson'") && html.includes("'Read question and choices'") && html.includes("'Read writing prompt'"),
  reviewControls: html.includes("'Read review prompt'") && html.includes("'Read retention prompt'"),
  practiceControls: practiceJs.includes("'Read question and choices'") && practiceJs.includes("'Read review question'"),
  transportControls: ['data-ry-read','data-ry-pause','data-ry-stop','data-ry-rate'].every(token => narrator.includes(token)),
  voiceControls: ['data-ry-voice','data-ry-preview','Natural female (recommended)'].every(token => narrator.includes(token)),
  femaleVoicePreferred: spokenUtterance?.voice?.name.includes('Aria Online (Natural)'),
  voiceChoicePersists: narrator.includes("VOICE_KEY='learnwithry_narration_voice_v1'") && narrator.includes('localStorage.setItem(VOICE_KEY'),
  learningPaceDefault: narrator.includes("localStorage.getItem(RATE_KEY)||.85"),
  answerSafeBeforeSubmission: /function assessmentNarration\(q\)[\s\S]*?return`\$\{passage\}\$\{q\.prompt\}/.test(practiceJs) && !/function assessmentNarration\(q\)[\s\S]*?q\.(?:answer|why|model)/.test(practiceJs.match(/function assessmentNarration\(q\)[^\n]*/)?.[0] || ''),
  feedbackRequiresOptIn: narrator.includes('if(engaged)speak(text,root)')
};
const learnerShell = html.slice(0, html.indexOf('<script src="narrator.js'));
report.organization = {
  organizerLoaded: html.includes('organizer.js?v=20261003-2'),
  sixModes: ['HOME','LEARN','PRACTICE','REVIEW','WRITING','PARENT'].every(mode => organizer.includes(mode)),
  nextActionFirst: organizer.includes('START HERE') && organizer.includes('Start my next step'),
  weeklyPriorities: organizer.includes('Five clear priorities') && organizer.includes('weeklyItems()'),
  priorityChoiceCap: organizer.includes('.slice(0,8)'),
  fullLibraryPreserved: organizer.includes("'Browse all '+lessons.length+' lessons'"),
  parentToolsSeparated: organizer.includes("PARENT TOOLS") && organizer.includes("simplifyLessonTools"),
  noAdminHero: !/(Complete Cumulative Rebuild|CLEAN START|No old history is used|Teacher priorities now)/i.test(learnerShell),
  compactHeader: learnerShell.includes('class="studentHeader"') && !learnerShell.includes('class="hero"')
};
report.pass = duplicateIds.length === 0 && duplicateObjectiveIds.length === 0 && duplicateQuestionIds.length === 0 && badLessons.length === 0 && incompleteCurrent.length === 0 && testLeak.length === 0 && transferMissing.length === 0 && connectionMissing.length === 0 && connectionChecksMissing.length === 0 && insufficientIndependentChecks.length === 0 && scienceVocabularyFirst && multiIssues.length === 0 && report.storage.oldKeyIgnored && max - min <= Math.ceil(questionIds.length * 0.03) && Object.values(report.narration).every(Boolean) && Object.values(report.organization).every(Boolean);

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
