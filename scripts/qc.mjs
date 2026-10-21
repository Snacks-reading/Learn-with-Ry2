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
const weeklyUpdate = fs.readFileSync(new URL('../weekly-update-v21.js', import.meta.url), 'utf8');
const sourceReconciliation = fs.readFileSync(new URL('../source-reconciliation-v22.js', import.meta.url), 'utf8');
const highlightMemorization = fs.readFileSync(new URL('../highlight-memorization-v23.js', import.meta.url), 'utf8');
const teacherSourceAudit = fs.readFileSync(new URL('../teacher-source-audit-v24.js', import.meta.url), 'utf8');
const testReadiness = fs.readFileSync(new URL('../test-readiness-v25.js', import.meta.url), 'utf8');
const elaBinder = fs.readFileSync(new URL('../ela-binder-reconciliation-v26.js', import.meta.url), 'utf8');
const mathBinder = fs.readFileSync(new URL('../math-binder-reconciliation-v28.js', import.meta.url), 'utf8');
const mediaEnrichment = fs.readFileSync(new URL('../media-enrichment-v29.js', import.meta.url), 'utf8');
let teachingResources = fs.readFileSync(new URL('../learning-resources-v30.js', import.meta.url), 'utf8');
const classroomPractice = fs.readFileSync(new URL('../classroom-practice-v31.js', import.meta.url), 'utf8');
teachingResources += '\n' + classroomPractice;
teachingResources += '\n' + fs.readFileSync(new URL('../ela-learner-copy-v32.js', import.meta.url), 'utf8');
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
const source = inlineScripts[0] + '\n' + rebuild + '\n' + ancientIsraelGuide + '\n' + weeklyUpdate + '\n' + sourceReconciliation + '\n' + highlightMemorization + '\n' + teacherSourceAudit + '\n' + testReadiness + '\n' + elaBinder + '\n' + mathBinder + '\n' + mediaEnrichment + '\n' + teachingResources + '\n' + inlineScripts.slice(1).join('\n').replace(/\brender\(\);\s*$/, '') + '\n;globalThis.__APP={D,BUILD,KEY,ARCH,SCORE_RESET,balancedShuffle,qid,modelText,transferPrompt,SOURCE_REBUILD_V19,SOCIAL_STUDIES_GUIDE_V20,WEEKLY_UPDATE_V21,SOURCE_RECONCILIATION_V22,HIGHLIGHT_MEMORIZATION_V23,TEACHER_SOURCE_AUDIT_V24,TEST_READINESS_V25,ELA_BINDER_V26,MATH_BINDER_V28,MEDIA_ENRICHMENT_V29};';
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
const requiredScienceOrder = ['science_v22_vocab_core','science_v22_organization','science_v24_textbook_review','science_v22_energy_roles','science_v22_relationships','science_v22_limits','science_v22_mastery'];
const scienceOrderActual = D.SCI.lessons.slice(0, 7).map(l => l.id);
const scienceVocabularyFirst = requiredScienceOrder.every((id, i) => scienceOrderActual[i] === id);
const requiredGuideOrder = ['ss_v20_study_guide','ss_v20_israelites_song','ss_v20_test_eve','ss_v20_maps','ss_v20_people_texts','ss_v20_migrations','ss_v20_kings','ss_v20_kingdom_cyrus','ss_v20_mastery_test'];
const guideOrderActual = D.SS.lessons.map(l=>l.id).filter(id=>requiredGuideOrder.includes(id));
const guideFirst = requiredGuideOrder.every((id,i)=>guideOrderActual[i]===id);
const guideTest = D.SS.lessons.find(l=>l.id==='ss_v20_mastery_test');
const guidePath = D.SS.lessons.find(l=>l.id==='ss_v20_study_guide');
const testEve = D.SS.lessons.find(l=>l.id==='ss_v20_test_eve');
const missingTestEveTargets = Array.from({length:24},(_,i)=>`Target ${i+1}:`).filter(n=>!testEve?.q?.some(item=>String(item[0]).startsWith(n)));
const guideAnswerPositionCounts=[0,1,2,3].map(position=>guideTest?.q?.filter(item=>!Array.isArray(item[2])&&item[2]===position).length||0);
const guideAnswerPositionsBalanced=Math.min(...guideAnswerPositionCounts)>=10;
const missingGuideTargets = Array.from({length:24},(_,i)=>`${i+1}.`).filter(n=>!guidePath?.teach?.includes(n));
const requiredRepairSequence = ['israel—assyria—722 bce','judah/jerusalem—babylon—captivity','babylon—persia/cyrus—539 bce—return permitted'];
const guideRepairText = JSON.stringify(D.SS.lessons.filter(l=>['ss_v20_kingdom_cyrus','ss_v20_mastery_test'].includes(l.id))).toLowerCase();
const missingRepairSequence = requiredRepairSequence.filter(term=>!guideRepairText.includes(term));
const currentSocialLessons = D.SS.lessons.filter(l=>l.id.startsWith('ss_v20_'));
const learnerAdminNotes = currentSocialLessons.filter(l=>/(source-first|clean start|governance|publication note|build v\d|version \d|internal qc)/i.test([l.title,l.teach,l.model,l.connect,l.w].join(' '))).map(l=>l.id);
const requiredMediaIds=['ela_v29_main_idea_song','ela_v29_clause_video','math_v29_coordinate_song','science_v29_ecology_song','ss_v20_israelites_song'];
const mediaMissing=requiredMediaIds.filter(id=>!lessons.some(l=>l.id===id));
const mediaBoundaryIssues=lessons.filter(l=>requiredMediaIds.includes(l.id)&&(!l.link||!(l.mediaRole==='supplemental'||/does not replace|not replace|not the study guide|does not adequately/i.test(l.teach))||!/turn (?:the video|it) off|without replaying|video off|close it/i.test(`${l.teach} ${l.success} ${l.w}`)||l.q.length<8)).map(l=>l.id);
const requiredV21Ids = {
  ELA:['ela_v21_unit2_map','ela_v21_reading_buddies','ela_v21_chimpanzees','ela_v21_clauses','ela_v21_mastery'],
  MATH:['math_v21_integers','math_v21_coordinates','math_v21_big8','math_v21_rational_apply','math_v21_mastery'],
  SCI:['science_v21_ecosystem_vocab','science_v21_population_variables','science_v21_interactions','science_v21_health_invasive','science_v21_mastery'],
  SS:['ss_v21_israel_final','ss_v21_egypt_geography','ss_v21_egypt_rule','ss_v21_egypt_nile','ss_v21_mastery']
};
const v21Missing = Object.entries(requiredV21Ids).flatMap(([subject,required])=>required.filter(id=>!D[subject].lessons.some(l=>l.id===id)));
const v21LessonIds = Object.values(requiredV21Ids).flat();
const v21Lessons = lessons.filter(l=>v21LessonIds.includes(l.id));
const v21Thin = v21Lessons.filter(l=>!l.teach||!l.src||!l.w||!l.connect||!l.success||l.q.length<8).map(l=>l.id);
const v21Tests = ['ela_v21_mastery','math_v21_mastery','science_v21_mastery','ss_v21_mastery'].map(id=>lessons.find(l=>l.id===id));
const v21TestIssues = v21Tests.flatMap(l=>!l?[`missing-test`]:(!l.test||l.q.length<20?[`${l.id}:test-floor`]:[]));
const requiredV22Ids = {
  ELA:['ela_v22_fluency'],
  MATH:['math_v22_compare','math_v22_mental','math_v22_fluency_check'],
  SCI:['science_v22_vocab_core','science_v22_organization','science_v22_energy_roles','science_v22_relationships','science_v22_limits','science_v22_mastery']
};
const v22LessonIds = Object.values(requiredV22Ids).flat();
const v22Lessons = lessons.filter(l=>v22LessonIds.includes(l.id));
const v22Missing = Object.entries(requiredV22Ids).flatMap(([subject,required])=>required.filter(id=>!D[subject].lessons.some(l=>l.id===id)));
const v22Thin = v22Lessons.filter(l=>!l.teach||!l.src||!l.w||!l.connect||!l.success||l.q.length<8).map(l=>l.id);
const requiredV23Ids = ['math_v23_big8_memory','math_v23_big8_mastery'];
const v23Lessons = lessons.filter(l=>requiredV23Ids.includes(l.id));
const v23Missing = requiredV23Ids.filter(id=>!D.MATH.lessons.some(l=>l.id===id));
const v23Thin = v23Lessons.filter(l=>!l.teach||!l.src||!l.w||!l.connect||!l.success||l.q.length<16).map(l=>l.id);
const big8PriorityActual = D.MATH.lessons.slice(0,8).map(l=>l.id);
const big8MemorizationFirst = big8PriorityActual[0]==='math_v28_big8_source' && requiredV23Ids.every(id=>big8PriorityActual.includes(id));
const big8MemoryText = JSON.stringify(v23Lessons).toLowerCase();
const big8MemoryContract = ['cover–recall–check','no-peek production from memory','24/24','two checks separated by at least one day'].every(term=>big8MemoryText.includes(term));
const requiredV24Ids = {MATH:['math_v24_reveal_module4_vocab'],SCI:['science_v24_textbook_review']};
const v24LessonIds = Object.values(requiredV24Ids).flat();
const v24Lessons = lessons.filter(l=>v24LessonIds.includes(l.id));
const v24Missing = Object.entries(requiredV24Ids).flatMap(([subject,required])=>required.filter(id=>!D[subject].lessons.some(l=>l.id===id)));
const v24Thin = v24Lessons.filter(l=>!l.teach||!l.model||!l.src||!l.w||!l.connect||!l.success||!l.v?.length||l.q.length<12).map(l=>l.id);
const revealModule4Terms=['absolute value','integer','negative integer','opposite','positive integer','quadrants','rational number','reflection'];
const v24MathText=JSON.stringify(D.MATH.lessons.find(l=>l.id==='math_v24_reveal_module4_vocab')||{}).toLowerCase();
const missingRevealModule4Terms=revealModule4Terms.filter(term=>!v24MathText.includes(term));
const scienceExactReviewTerms=['alligator','gar','cordgrass','ecosystem boundary','9 km','19 km','28 km','graphic organizer'];
const v24ScienceText=JSON.stringify(D.SCI.lessons.find(l=>l.id==='science_v24_textbook_review')||{}).toLowerCase();
const missingScienceExactReviewTerms=scienceExactReviewTerms.filter(term=>!v24ScienceText.includes(term));
const requiredV25Ids = {ELA:['ela_v25_quiz_review','ela_v25_quiz_simulation'],SS:['ss_v25_final_simulation']};
const v25LessonIds = Object.values(requiredV25Ids).flat();
const v25Lessons = lessons.filter(l=>v25LessonIds.includes(l.id));
const v25Missing = Object.entries(requiredV25Ids).flatMap(([subject,required])=>required.filter(id=>!D[subject].lessons.some(l=>l.id===id)));
const v25Review = D.ELA.lessons.find(l=>l.id==='ela_v25_quiz_review');
const v25ElaTest = D.ELA.lessons.find(l=>l.id==='ela_v25_quiz_simulation');
const v25SsTest = D.SS.lessons.find(l=>l.id==='ss_v25_final_simulation');
const v25Thin = v25Lessons.filter(l=>!l.teach||!l.src||!l.w||!l.connect||!l.success||(!l.test&&(!l.model||!l.v?.length||l.q.length<16))||(l.test&&l.q.length<(l.id.startsWith('ela_')?28:36))).map(l=>l.id);
const elaQuizTerms=['central idea','author’s purpose','objective summary','paragraph function','text-media comparison','independent clause','dependent clause','reading buddies','my life with the chimpanzees'];
const elaReadinessText=JSON.stringify([v25Review,v25ElaTest]).toLowerCase();
const missingElaQuizTerms=elaQuizTerms.filter(term=>!elaReadinessText.includes(term));
const ssReadinessTerms=['jerusalem','abraham','moses','tanakh','torah','covenant','scripture','exodus','ten commandments','saul','david','solomon','monotheism','diaspora','babylonian captivity','cyrus the great','mesopotamia','paleolithic','neolithic'];
const ssReadinessText=JSON.stringify(v25SsTest||{}).toLowerCase();
const missingSsReadinessTerms=ssReadinessTerms.filter(term=>!ssReadinessText.includes(term));
const requiredV26Ids=['ela_v26_terms_craft','ela_v26_terms_tasks_a','ela_v26_terms_tasks_b','ela_v26_dialogue','ela_v26_prompt_plan','ela_v26_plot_conflict','ela_v26_endings','ela_v26_all_summer_end','ela_v26_rubric','ela_v26_binder_final'];
const v26Lessons=lessons.filter(l=>requiredV26Ids.includes(l.id));
const v26Missing=requiredV26Ids.filter(id=>!D.ELA.lessons.some(l=>l.id===id));
const v26Thin=v26Lessons.filter(l=>!l.teach||!l.src||!l.w||!l.connect||!l.success||(!l.test&&(!l.model||!l.v?.length||l.q.length<16))||(l.test&&l.q.length<56)).map(l=>l.id);
const v26Text=JSON.stringify(v26Lessons).toLowerCase();
const binderTerms=['main idea / central idea','theme','point of view','simile','metaphor','personification','hyperbole','alliteration','repetition','onomatopoeia','tone','mood','author’s purpose','convey','analyze','compare','contrast','infer','summarize','evaluate','justify','evidence','significant','consequence','factor','impact','method','process','perspective','conclude','determine','distinguish','identify','contribute','illustrate','clarify','emphasize','formulate','develop','relevant','essential','emerge'];
const binderStructures=['seven dialogue rules','read circle arrow number prompt routine','narrative scratch-paper plan','exposition','rising action','climax','falling action','resolution','character versus character','character versus nature','character versus self','character versus technology','explicit ending','implicit ending','lesson learned ending','twist ending','tie back ending','unresolved ending','long view ending','focus and organization rubric domain','development rubric domain','language rubric domain','conventions rubric domain','all summer in a day unresolved ending evidence'];
const missingBinderTerms=binderTerms.filter(term=>!v26Text.includes(term));
const missingBinderStructures=binderStructures.filter(term=>!v26Text.includes(term));
const v26Final=D.ELA.lessons.find(l=>l.id==='ela_v26_binder_final');
const v26Dialogue=D.ELA.lessons.find(l=>l.id==='ela_v26_dialogue');
const v26Endings=D.ELA.lessons.find(l=>l.id==='ela_v26_endings');
const teacherEcologyTerms=['abiotic','adaptation','biome','biosphere','biotic','carnivore','carrying capacity','commensalism','community','consumer','decomposer','ecosystem','energy pyramid','food chain','food web','herbivore','host','invasive species','limiting factor','mutualism','native species','niche','omnivore','organism','parasitism','population','predator','prey','producer','scavenger','symbiosis','symbiotic','tertiary'];
const v22ScienceText=JSON.stringify(D.SCI.lessons.filter(l=>l.id.startsWith('science_v22_'))).toLowerCase();
const missingTeacherEcologyTerms=teacherEcologyTerms.filter(term=>!v22ScienceText.includes(term));
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
    const complete = lesson.test
      ? lesson.teach && lesson.w && lesson.q?.length >= 4 && transferPrompt(lesson)
      : lesson.teach && lesson.model && lesson.w && lesson.q?.length >= 4 && lesson.connectionChecks >= 2 && transferPrompt(lesson);
    return complete ? [] : [`${subject}:${route.lessonId}:incomplete-evidence-route`];
  });
  return [...missingRoutes, ...extraRoutes, ...duplicateRoutes, ...badLessonRoutes];
});
const sourceGateReadinessIssues = ['ELA','SS'].flatMap(subject => {
  const evidence = sourceGate.subjects?.[subject]?.readinessEvidence;
  if (!evidence) return [`${subject}:missing-readiness-evidence`];
  const ids = [evidence.reviewLessonId,evidence.officialGuideLessonId,...(evidence.independentFormIds||[]),evidence.independentFormId].filter(Boolean);
  return ids.filter(id=>!D[subject]?.lessons.some(l=>l.id===id)).map(id=>`${subject}:${id}:missing-readiness-lesson`);
});
const parentLibrary=JSON.parse(fs.readFileSync(new URL('../lesson-library.js',import.meta.url),'utf8').replace(/^globalThis\.RY_LESSON_LIBRARY=/,'').replace(/;\s*$/,''));
const parentSyncIssues=sourceGateSubjects.flatMap(subject=>{
 const expected=D[subject].lessons.filter(l=>!l.test),actual=parentLibrary.subjects?.[subject]?.lessons||[];
 if(expected.length!==actual.length)return[subject+':chapter-count'];
 return expected.flatMap((l,i)=>['id','title','src','teach','model','v','connect','w','learningTools'].filter(k=>JSON.stringify(l[k])!==JSON.stringify(actual[i]?.[k])).map(k=>subject+':'+l.id+':'+k));
});
if(parentLibrary.build!==BUILD)parentSyncIssues.push('build');
const resourceManifest=JSON.parse(fs.readFileSync(new URL('../TEACHING_RESOURCES.json',import.meta.url),'utf8'));
const nonVideoSubjectGaps=sourceGateSubjects.filter(subject=>!resourceManifest.resources.some(r=>r.subject===subject&&!/song|video/.test(r.kind)));
const resourceRouteGaps=sourceGateSubjects.filter(subject=>!D[subject].lessons.some(l=>l.learningTools?.task&&l.learningTools?.apply&&l.learningTools?.delayed));
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
  parentAudioSync: {parentSyncIssues,matched:parentSyncIssues.length===0},
  teachingResources: {nonVideoSubjectGaps,resourceRouteGaps},
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
  officialAncientIsraelGuide: {guideFirst,guideOrderActual,testEveQuestions:testEve?.q?.length||0,missingTestEveTargets,masteryQuestions:guideTest?.q?.length||0,guideAnswerPositionCounts,guideAnswerPositionsBalanced,missingGuideTargets,missingRepairSequence,learnerAdminNotes,all24TargetsRepresented:guideFirst&&missingGuideTargets.length===0&&missingTestEveTargets.length===0&&(guideTest?.q?.length||0)>=48},
  instructionalMedia: {required:requiredMediaIds.length,mediaMissing,mediaBoundaryIssues,allFourSubjects:mediaMissing.length===0},
  october9Update: {required:v21LessonIds.length,found:v21Lessons.length,v21Missing,v21Thin,v21TestIssues},
  october17Reconciliation: {required:v22LessonIds.length,found:v22Lessons.length,v22Missing,v22Thin,missingTeacherEcologyTerms},
  highlightedBig8Memorization: {required:requiredV23Ids.length,found:v23Lessons.length,v23Missing,v23Thin,big8PriorityActual,big8MemorizationFirst,big8MemoryContract},
  teacherSourceAuditV24: {required:v24LessonIds.length,found:v24Lessons.length,v24Missing,v24Thin,missingRevealModule4Terms,missingScienceExactReviewTerms},
  testReadinessV25: {required:v25LessonIds.length,found:v25Lessons.length,v25Missing,v25Thin,elaQuestions:v25ElaTest?.q?.length||0,ssQuestions:v25SsTest?.q?.length||0,missingElaQuizTerms,missingSsReadinessTerms},
  elaBinderV26: {required:requiredV26Ids.length,found:v26Lessons.length,v26Missing,v26Thin,missingBinderTerms,missingBinderStructures,dialogueQuestions:v26Dialogue?.q?.length||0,endingQuestions:v26Endings?.q?.length||0,finalQuestions:v26Final?.q?.length||0},
  sourceRebuild: { required: rebuildLessonIds.length, found: rebuildLessons.length, rebuildIdMissing, rebuildThin, atomicTermMissing },
  sourceCompletenessGate: {
    buildMatches: sourceGate.build === BUILD,
    sourceSideRedTeamComplete: sourceGate.sourceSideRedTeamComplete === true,
    allSubjectsPresent: sourceGateMissingSubjects.length === 0,
    sourceGateMissingSubjects,
    duplicateRequirements: sourceGateDuplicateRequirements,
    incompleteRecords: sourceGateIncompleteRecords,
    routeIssues: sourceGateRouteIssues,
    readinessIssues: sourceGateReadinessIssues,
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
  sharedEngineLoaded: html.includes('narrator.js?v=20261021-30') && practiceHtml.includes('narrator.js?v=20261021-30'),
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
  organizerLoaded: /<script src="organizer\.js\?v=[^"]+"><\/script>/.test(html),
  officialGuideAndTestPrioritized: organizer.includes("'ss_v20_mastery_test'") && organizer.includes("'ss_v20_study_guide'") && organizer.includes("'ss_v21_israel_final'"),
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
report.governance.instructionalMediaDiscoveryMandatory = governance.includes('Mandatory instructional-media discovery') && governance.includes('Audit all four subjects during each weekly cycle');
report.governance.failClosedSourceGate = governance.includes('Fail-closed source-completeness gate') && governance.includes('SOURCE_COMPLETENESS_GATE.json');
report.governance.officialStudyGuideOrderRequired = governance.includes('teacher-issued numbered study guide remains the controlling learner path in its exact order');
report.governance.noLearnerFacingAdminNotes = learnerAdminNotes.length===0;
report.pass = parentSyncIssues.length===0 && nonVideoSubjectGaps.length===0 && resourceRouteGaps.length===0 && duplicateIds.length === 0 && duplicateObjectiveIds.length === 0 && duplicateQuestionIds.length === 0 && badLessons.length === 0 && incompleteCurrent.length === 0 && testLeak.length === 0 && transferMissing.length === 0 && connectionMissing.length === 0 && connectionChecksMissing.length === 0 && insufficientIndependentChecks.length === 0 && scienceVocabularyFirst && big8MemorizationFirst && big8MemoryContract && mediaMissing.length===0 && mediaBoundaryIssues.length===0 && v23Missing.length===0 && v23Thin.length===0 && v24Missing.length===0 && v24Thin.length===0 && missingRevealModule4Terms.length===0 && missingScienceExactReviewTerms.length===0 && v25Missing.length===0 && v25Thin.length===0 && missingElaQuizTerms.length===0 && missingSsReadinessTerms.length===0 && v26Missing.length===0 && v26Thin.length===0 && missingBinderTerms.length===0 && missingBinderStructures.length===0 && (v26Final?.q?.length||0)>=56 && guideFirst && (testEve?.q?.length||0)>=24 && missingTestEveTargets.length===0 && guideAnswerPositionsBalanced && missingGuideTargets.length===0 && missingRepairSequence.length===0 && learnerAdminNotes.length===0 && (guideTest?.q?.length||0)>=48 && rebuildIdMissing.length === 0 && rebuildThin.length === 0 && v21Missing.length===0 && v21Thin.length===0 && v21TestIssues.length===0 && v22Missing.length===0 && v22Thin.length===0 && missingTeacherEcologyTerms.length===0 && atomicTermMissing.length === 0 && multiIssues.length === 0 && report.storage.oldKeyIgnored && max - min <= Math.ceil(questionIds.length * 0.03) && Object.values(report.narration).every(Boolean) && Object.values(report.organization).every(Boolean) && Object.values(report.governance).every(Boolean) && report.sourceCompletenessGate.buildMatches && report.sourceCompletenessGate.sourceSideRedTeamComplete && report.sourceCompletenessGate.allSubjectsPresent && sourceGateDuplicateRequirements.length === 0 && sourceGateIncompleteRecords.length === 0 && sourceGateRouteIssues.length === 0 && sourceGateReadinessIssues.length === 0;

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
