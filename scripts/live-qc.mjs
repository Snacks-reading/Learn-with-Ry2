import playwright from '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
const { chromium } = playwright;

const browser = await chromium.launch({ headless: true });
const results = [];
for (const viewport of [{name:'desktop',width:1440,height:900},{name:'phone',width:390,height:844}]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/index.html', { waitUntil:'networkidle' });
  const modes = await page.locator('#modeNav button').allTextContents();
  const firstTitle = await page.locator('#homeView h3').first().textContent();
  await page.getByRole('button', {name:/Start my next step/}).click();
  const lessonTitle = await page.locator('#main h2').first().textContent();
  const readLesson = await page.getByRole('button', {name:/Read this lesson/}).count();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  const sourceLoaded = await page.evaluate(() => ({rebuild:globalThis.SOURCE_REBUILD_V19,guide:globalThis.SOCIAL_STUDIES_GUIDE_V20,weekly:globalThis.WEEKLY_UPDATE_V21,reconciliation:globalThis.SOURCE_RECONCILIATION_V22,memorization:globalThis.HIGHLIGHT_MEMORIZATION_V23,teacherAudit:globalThis.TEACHER_SOURCE_AUDIT_V24,testReadiness:globalThis.TEST_READINESS_V25,elaBinder:globalThis.ELA_BINDER_V26,counts:Object.fromEntries(Object.entries(D).map(([k,v])=>[k,v.lessons.length]))}));
  for (const [subject,id,dateLabel] of [['ELA','ela_v26_dialogue','BINDER'],['MATH','math_v23_big8_memory','MEMORIZE THE BIG 8'],['SCI','science_v22_vocab_core','CURRENT OCT. 17'],['SS','ss_v20_study_guide','24-TARGET']]) {
    await page.evaluate(({subject,id}) => window.__RY_ORGANIZER__.openLesson(subject,id), {subject,id});
    const shown = await page.locator('#main h2').first().textContent();
    if (!shown?.includes(dateLabel)) errors.push(`${subject} did not open current path: ${shown}`);
  }
  results.push({viewport:viewport.name,modes,firstTitle,lessonTitle,readLesson,overflow,sourceLoaded,errors});
  await page.close();
}
await browser.close();
const pass = results.every(r => r.modes.length===6 && /24-TARGET PATH/i.test(r.firstTitle||'') && /24-TARGET PATH/i.test(r.lessonTitle||'') && r.readLesson===1 && !r.overflow && r.errors.length===0 && r.sourceLoaded?.rebuild?.counts?.SS===8 && r.sourceLoaded?.guide?.officialTargets===24 && r.sourceLoaded?.guide?.finalQuestions===48 && r.sourceLoaded?.weekly?.counts?.SS===5 && r.sourceLoaded?.reconciliation?.counts?.SCI===6 && r.sourceLoaded?.memorization?.counts?.MATH===2 && r.sourceLoaded?.teacherAudit?.counts?.MATH===1 && r.sourceLoaded?.teacherAudit?.counts?.SCI===1 && r.sourceLoaded?.testReadiness?.counts?.ELA===2 && r.sourceLoaded?.testReadiness?.counts?.SS===1 && r.sourceLoaded?.elaBinder?.terms===42 && r.sourceLoaded?.elaBinder?.dialogueRules===7 && r.sourceLoaded?.elaBinder?.endingTypes===7 && r.sourceLoaded?.elaBinder?.finalQuestions===56 && r.sourceLoaded?.counts?.ELA===62 && r.sourceLoaded?.counts?.MATH===40 && r.sourceLoaded?.counts?.SCI===54 && r.sourceLoaded?.counts?.SS===57);
console.log(JSON.stringify({pass,results},null,2));
if(!pass) process.exitCode=1;
