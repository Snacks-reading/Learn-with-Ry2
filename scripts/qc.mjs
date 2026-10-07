import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const narrator = fs.readFileSync(new URL('../narrator.js', import.meta.url), 'utf8');
const practiceHtml = fs.readFileSync(new URL('../ela-unit1-practice.html', import.meta.url), 'utf8');
const practiceJs = fs.readFileSync(new URL('../ela-unit1-test.js', import.meta.url), 'utf8');
const organizer = fs.readFileSync(new URL('../organizer.js', import.meta.url), 'utf8');
const governance = fs.readFileSync(new URL('../GOVERNANCE.md', import.meta.url), 'utf8');
const sourceGate = JSON.parse(fs.readFileSync(new URL('../SOURCE_COMPLETENESS_GATE.json', import.meta.url), 'utf8'));
const rebuild = fs.readFileSync(new URL('../subject-rebuild-v19.js', import.meta.url), 'utf8');
const ancientIsraelGuide = fs.readFileSync(new URL('../social-studies-study-guide-v20.js', import.meta.url), 'utf8');
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
if (inlineScripts.length < 2) throw new Error('Expected application scripts around source rebuild');

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
const source = inlineScripts[0] + '\n' + rebuild + '\n' + ancientIsraelGuide + '\n' + inlineScripts.slice(1).join('\n').replace(/\brender\(\);\s*$/, '') + '\n;globalThis.__APP={D,BUILD,KEY,ARCH,SCORE_RESET,balancedShuffle,qid,modelText,transferPrompt,SOURCE_REBUILD_V19,SOCIAL_STUDIES_GUIDE_V20};';
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
const requiredScienceOrder = ['science_v19_particles', 'science_v19_transfer', 'science_v19_resources', 'science_v19_tradeoffs'];
const scienceOrderActual = D.SCI.lessons.slice(0, 4).map(l => l.id);
const scienceVocabularyFirst = requiredScienceOrder.every((id, i) => scienceOrderActual[i] === id);
const requiredGuideOrder = ['ss_v20_study_guide','ss_v20_migrations','ss_v20_kingdom_cyrus','ss_v20_mastery_test'];
const guideOrderActual = D.SS.lessons.slice(0,4).map(l=>l.id);
const guideFirst = requiredGuideOrder.every((id,i)=>guideOrderActual[i]===id);
const guideTest = D.SS.lessons.find(l=>l.id==='ss_v20_mastery_test');
const requiredRebuildIds = {
  ELA: ['ela_v19_unit_map','ela_v19_analysis','ela_v19_language','ela_v19_narrative'],
  MATH: ['math_v19_percent_meaning','math_v19_three_unknowns','math_v19_applications','math_v19_next_unit'],
  SCI: ['science_v19_particles','science_v19_transfer','science_v19_resources','science_v19_tradeoffs'],
  SS: ['ss_v19_map','ss_v19_vocab','ss_v19_patriarchs','ss_v19_saul','ss_v19_david','ss_v19_solomon','ss_v19_conquest','ss_v19_practice']
};
const rebuildIdMissing = Object.entries(requiredRebuildIds).flatMap(([subject, required]) => required.filter(id => !D[subject].lessons.some(l => l.id === id)));
const rebuildLessonIds = Object.values(requiredRebuildIds).flat();
const rebuildLessons = lessons.filter(l => rebuildLessonIds.includes(l.id));
const rebuildThin = rebuildLessons.filter(l => !l.model || !l.success || !l.v?.length || l.q.length < 8 || !l.w).map(l => l.id);
const subjectText = Object.fromEntries(Object.entries(D).map(([subject,group]) => [subject, JSON.stringify(group.lessons).toLowerCase()]));
const atomicTerms = Object.fromEntries(Object.entries(sourceGate.subjects || {}).map(([subject, record]) => [subject, record.requirements || []]));
const atomicTermMissing = Object.entries(atomicTerms).flatMap(([subject,terms]) => terms.filter(term => !subjectText[subject].includes(term)).map(term => `${subject}:${term}`));
const sourceGateSubjects = ['ELA','MATH','SCI','SS'];
const sourceGateMissingSubjects = sourceGateSubjects.filter(subject => !sourceGate.subjects?.[subject]);
const sourceGateRequirementIds = Object.entries(atomicTerms).flatMap(([subject, terms]) => terms.map(term => `${subject}:${term}`));
const sourceGateDuplicateRequirements = [...new Set(sourceGateRequirementIds.filter((id, i) => sourceGateRequirementIds.indexOf(id) !== i))];
const sourceGateIncompleteRecords = Object.entries(sourceGate.subjects || {}).flatMap(([subject, record]) => {
  const errors = [];
  if (!Array.isArray(record.controllingSources) || !record.controllingSources.length) errors.push(`${subject}:sources`);
  if (!Array.isArray(record.requirements) || !record.requirements.length) errors.push(`${subject}:requirements`);
  return errors;
});
const sourceGateRouteIssues = Object.entries(sourceGate.subjects || {}).flatMap(([subject, record]) => {
  const routed = (record.coverageRoutes || []).flatMap(route => (route.requirements || []).map(term => `${subject}:${term}`));
  const required = (record.requirements || []).map(term => `${subject}:${term}`);
  const missingRoutes = required.filter(id => !routed.includes(id)).map(id => `${id}:unrouted`);
  const extraRoutes = routed.filter(id => !required.includes(id)).map(id => `${id}:not-required`);
  const duplicateRoutes = [...new Set(routed.filter((id, i) => routed.indexOf(id) !== i))].map(id => `${id}:duplicate-route`);
  const badLessonRoutes = (record.coverageRoutes || []).flatMap(route => {
    const lesson = D[subject]?.lessons.find(item => item.id === route.lessonId);
    if (!lesson) return [`${subject}:${route.lessonId}:missing-lesson`];
    const complete = lesson.teach && lesson.model && lesson.w && lesson.q?.length >= 4 && lesson.connectionChecks >= 2 && transferPrompt(lesson);
    return complete ? [] : [`${subject}:${route.lessonId}:incomplete-evidence-route`];
  });
  return [...missingRoutes, ...extraRoutes, ...duplicateRoutes, ...badLessonRoutes];
});
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
  officialAncientIsraelGuide: {guideFirst,guideOrderActual,masteryQuestions:guideTest?.q?.length||0,all24TargetsRepresented:guideFirst&&(guideTest?.q?.length||0)>=24},
  sourceRebuild: { required: rebuildLessonIds.length, found: rebuildLessons.length, rebuildIdMissing, rebuildThin, atomicTermMissing },
  sourceCompletenessGate: {
    buildMatches: sourceGate.build === BUILD,
    sourceSideRedTeamComplete: sourceGate.sourceSideRedTeamComplete === true,
    allSubjectsPresent: sourceGateMissingSubjects.length === 0,
    sourceGateMissingSubjects,
    duplicateRequirements: sourceGateDuplicateRequirements,
    incompleteRecords: sourceGateIncompleteRecords,
    routeIssues: sourceGateRouteIssues,
    requirementCount: sourceGateRequirementIds.length
  },
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
  organizerLoaded: html.includes('organizer.js?v=20261007-2'),
  officialGuideAndTestPrioritized: organizer.includes("'ss_v20_mastery_test'") && organizer.includes("'ss_v20_study_guide'"),
  sixModes: ['HOME','LEARN','PRACTICE','REVIEW','WRITING','PARENT'].every(mode => organizer.includes(mode)),
  nextActionFirst: organizer.includes('START HERE') && organizer.includes('Start my next step'),
  weeklyPriorities: organizer.includes('Five clear priorities') && organizer.includes('weeklyItems()'),
  priorityChoiceCap: organizer.includes('.slice(0,8)'),
  fullLibraryPreserved: organizer.includes("'Browse all '+lessons.length+' lessons'"),
  parentToolsSeparated: organizer.includes("PARENT TOOLS") && organizer.includes("simplifyLessonTools"),
  noAdminHero: !/(Complete Cumulative Rebuild|CLEAN START|No old history is used|Teacher priorities now)/i.test(learnerShell),
  compactHeader: learnerShell.includes('class="studentHeader"') && !learnerShell.includes('class="hero"')
};
report.governance = {
  independentSourceRecoveryMandatory: governance.includes('Mandatory independent source recovery and gap closure'),
  appliesToEveryFutureRequest: governance.includes('every future request, weekly update, correction, rebuild, and subject'),
  sourceStatusLedgerRequired: ['complete','partial','referenced-only','unavailable'].every(status => governance.includes(`**${status}**`)),
  parentBurdenProhibited: governance.includes('Never shift source recovery, curriculum organization, gap identification, research, comparison, or quality-control work back to the parent.'),
  exactSourceExhaustionRequired: governance.includes('exact-title searches') && governance.includes('one specific inaccessible item'),
  sourceCoverageOverCounts: governance.includes('Question totals, lesson totals, structural completeness, or standards alignment cannot substitute for line-by-line source coverage.'),
  parentDiscoveredGapFails: governance.includes('A build fails governance if the parent must discover a source gap')
};
report.governance.failClosedSourceGate = governance.includes('Fail-closed source-completeness gate') && governance.includes('SOURCE_COMPLETENESS_GATE.json');
report.pass = duplicateIds.length === 0 && duplicateObjectiveIds.length === 0 && duplicateQuestionIds.length === 0 && badLessons.length === 0 && incompleteCurrent.length === 0 && testLeak.length === 0 && transferMissing.length === 0 && connectionMissing.length === 0 && connectionChecksMissing.length === 0 && insufficientIndependentChecks.length === 0 && scienceVocabularyFirst && guideFirst && (guideTest?.q?.length||0)>=30 && rebuildIdMissing.length === 0 && rebuildThin.length === 0 && atomicTermMissing.length === 0 && multiIssues.length === 0 && report.storage.oldKeyIgnored && max - min <= Math.ceil(questionIds.length * 0.03) && Object.values(report.narration).every(Boolean) && Object.values(report.organization).every(Boolean) && Object.values(report.governance).every(Boolean) && report.sourceCompletenessGate.buildMatches && report.sourceCompletenessGate.sourceSideRedTeamComplete && report.sourceCompletenessGate.allSubjectsPresent && sourceGateDuplicateRequirements.length === 0 && sourceGateIncompleteRecords.length === 0 && sourceGateRouteIssues.length === 0;

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
