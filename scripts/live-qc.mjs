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
  const sourceLoaded = await page.evaluate(() => ({rebuild:globalThis.SOURCE_REBUILD_V19,guide:globalThis.SOCIAL_STUDIES_GUIDE_V20,counts:Object.fromEntries(Object.entries(D).map(([k,v])=>[k,v.lessons.length]))}));
  for (const [subject,id] of [['MATH','math_v19_percent_meaning'],['SCI','science_v19_particles'],['SS','ss_v20_study_guide']]) {
    await page.evaluate(({subject,id}) => window.__RY_ORGANIZER__.openLesson(subject,id), {subject,id});
    const shown = await page.locator('#main h2').first().textContent();
    if (!(shown?.includes('CURRENT SOURCE')||shown?.includes('OFFICIAL ANCIENT ISRAEL STUDY GUIDE'))) errors.push(`${subject} did not open source path: ${shown}`);
  }
  results.push({viewport:viewport.name,modes,firstTitle,lessonTitle,readLesson,overflow,sourceLoaded,errors});
  await page.close();
}
await browser.close();
const pass = results.every(r => r.modes.length===6 && /CURRENT SOURCE/.test(r.firstTitle||'') && /CURRENT SOURCE/.test(r.lessonTitle||'') && r.readLesson===1 && !r.overflow && r.errors.length===0 && r.sourceLoaded?.rebuild?.counts?.SS===8 && r.sourceLoaded?.guide?.targets===24 && r.sourceLoaded?.counts?.SS===48);
console.log(JSON.stringify({pass,results},null,2));
if(!pass) process.exitCode=1;
