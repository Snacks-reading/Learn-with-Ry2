'use strict';

function weekTabs(parent, selected) {
  const nav = add(parent, 'nav', undefined, 'week-tabs');
  nav.setAttribute('aria-label', 'School weeks');
  const entries = [
    [NOVEMBER_WEEK.dates, '#week', 'current'],
    ['November 9–13', '#week/2026-11-09', 'previous'],
    ['Earlier weeks', '#archive', 'archive']
  ];
  for (const [label, href, value] of entries) {
    const tab = link(nav, label, href);
    if (value === selected) tab.setAttribute('aria-current', 'page');
  }
}

function renderStudyHome(main) {
  const hero = add(main, 'section', undefined, 'week-hero');
  const copy = add(hero, 'div', undefined, 'hero-copy');
  add(copy, 'p', NOVEMBER_WEEK.dates, 'eyebrow');
  add(copy, 'h1', 'Ready for this week, Ry?');
  link(copy, 'Start this week', '#week', 'button hero-action');
  const links = add(copy, 'div', undefined, 'hero-links');
  link(links, 'Past weeks', '#archive');
  link(links, 'Table of contents', '#contents');
}

function renderCurrentWeek(main) {
  add(main, 'h1', NOVEMBER_WEEK.dates);
  weekTabs(main, 'current');
  const list = add(main, 'div', undefined, 'subject-list');
  for (const [id, subject] of Object.entries(NOVEMBER_WEEK.subjects)) {
    const row = add(list, 'article', undefined, 'subject-row');
    const access = link(row, '', '#study/' + id, 'subject-link');
    const body = add(access, 'div');
    add(body, 'p', SUBJECTS[id].name, 'eyebrow');
    add(body, 'h2', subject.title);
    add(body, 'p', subject.detail, 'muted');
    const arrow = add(access, 'span', '→', 'subject-arrow');
    arrow.setAttribute('aria-hidden', 'true');
  }
  const calendar = add(main, 'details', undefined, 'panel');
  add(calendar, 'summary', 'School dates and deadlines');
  const dates = add(calendar, 'dl', undefined, 'school-dates');
  for (const [date, title, url] of NOVEMBER_WEEK.datesToKnow) {
    add(dates, 'dt', date);
    const event = add(dates, 'dd');
    if (url) link(event, title, url);
    else event.textContent = title;
  }
}

function renderWeekLesson(main, subjectId, topicId) {
  const subject = NOVEMBER_WEEK.subjects[subjectId];
  if (!subject) {
    add(main, 'h1', 'Choose a subject');
    link(main, 'This week', '#week');
    return;
  }
  link(main, '← ' + NOVEMBER_WEEK.dates, '#week', 'back-link');
  const id = topicId ?? (subject.topics.length === 1 ? subject.topics[0] : '');
  if (!subject.topics.includes(id)) {
    intro(main, SUBJECTS[subjectId].name, subject.title, subject.detail);
    subject.topics.forEach(topic => link(main, WEEK_TOPICS[topic].title, '#study/' + subjectId + '/' + topic, 'button'));
    return;
  }
  const topic = WEEK_TOPICS[id];
  intro(main, SUBJECTS[subjectId].name, topic.title);
  if (subject.topics.length > 1) {
    const nav = add(main, 'nav', undefined, 'lesson-nav');
    nav.setAttribute('aria-label', 'Science topics');
    for (const key of subject.topics) {
      const a = link(nav, WEEK_TOPICS[key].title, '#study/' + subjectId + '/' + key);
      if (id === key) a.setAttribute('aria-current', 'page');
    }
  }
  const jump = add(main, 'div', undefined, 'lesson-actions');
  for (const [label, target] of [['Readings', 'lesson-readings'], ['Examples', 'lesson-examples'], ['Practice', 'lesson-practice']]) {
    const button = add(jump, 'button', label, 'secondary');
    button.type = 'button';
    button.onclick = () => {
      const targetHeading = document.getElementById(target);
      targetHeading.scrollIntoView({block: 'start'});
      targetHeading.focus({preventScroll: true});
    };
  }
  const learn = add(main, 'section', undefined, 'readings-panel panel');
  const heading = add(learn, 'h2', 'Readings and classroom materials');
  heading.id = 'lesson-readings';
  heading.tabIndex = -1;
  const readings = add(learn, 'ul', undefined, 'reading-list');
  for (const [label, url, instruction] of topic.readings) {
    const item = add(readings, 'li');
    link(item, label, url);
    add(item, 'p', instruction);
  }
  const examples = add(main, 'section');
  const examplesTitle = add(examples, 'h2', 'Learn with worked examples');
  examplesTitle.id = 'lesson-examples';
  examplesTitle.tabIndex = -1;
  for (const [sectionId, title, text, example] of topic.sections) {
    const section = add(examples, 'article', undefined, 'panel lesson-section');
    section.id = 'topic-' + sectionId;
    const sectionTitle = add(section, 'h3', title);
    sectionTitle.tabIndex = -1;
    (Array.isArray(text) ? text : [text]).forEach(part => add(section, 'p', part));
    add(section, 'h4', Array.isArray(text) ? 'Find the parts' : 'Worked example');
    add(section, 'p', example, 'worked-example');
    const listen = add(section, 'button', 'Read this section', 'secondary');
    listen.type = 'button';
    listen.onclick = () => {
      speak([title, ...(Array.isArray(text) ? text : [text]), example].join('. '));
    };
  }
  const practice = add(main, 'section', undefined, 'panel');
  const practiceHeading = add(practice, 'h2', 'Practice');
  practiceHeading.id = 'lesson-practice';
  practiceHeading.tabIndex = -1;
  if (QUIZ_TOPICS.includes(id)) link(practice, 'Try guided practice', '#check/' + id + '/G', 'button secondary');
  link(practice, topic.practice[0], topic.practice[1], 'button');
  if (id === 'ecology') link(practice, 'Open all Ecology lessons and guided checks', CURRENT_ECOLOGY + '#learn', 'button secondary');
  document.getElementById('read').textContent = 'Read this lesson';
  readingText = weekLessonScript(id);
  if (topic.audio) main.dataset.recording = topic.audio;
}

function weekLessonScript(id) {
  const topic = WEEK_TOPICS[id];
  return [topic.title + '.', ...topic.sections.flatMap(([, title, teaching, example]) =>
    [title + '.', ...(Array.isArray(teaching) ? teaching : [teaching]), 'Worked example.', example])].join('\n');
}

function renderContents(main) {
  add(main, 'h1', 'Table of contents');
  const label = add(main, 'label', 'Find a lesson or topic', 'contents-search');
  const field = add(label, 'input');
  field.type = 'search';
  field.placeholder = 'Try “commentary” or “monsoon”';
  const status = add(main, 'p', '', 'muted');
  status.setAttribute('role', 'status');
  const current = add(main, 'section', undefined, 'panel');
  add(current, 'h2', NOVEMBER_WEEK.dates);
  const entries = [];
  for (const [subjectId, subject] of Object.entries(NOVEMBER_WEEK.subjects)) {
    const group = add(current, 'section', undefined, 'contents-group');
    add(group, 'h3', SUBJECTS[subjectId].name);
    const grouped = [];
    for (const id of subject.topics) {
      const topic = WEEK_TOPICS[id];
      const base = '#study/' + subjectId + '/' + id;
      const block = add(group, 'div', undefined, 'contents-topic');
      link(block, topic.title, base);
      const list = add(block, 'ul');
      const subRows = [];
      for (const [key, title, teaching] of topic.sections) {
        const row = add(list, 'li');
        link(row, title, base + '/' + key);
        subRows.push([row, (title + ' ' + teaching).toLowerCase()]);
      }
      const search = (SUBJECTS[subjectId].name + ' ' + topic.title + ' ' + subject.detail).toLowerCase();
      grouped.push({block, search, subRows});
    }
    entries.push({group, grouped});
  }
  const prior = add(main, 'section', undefined, 'panel');
  add(prior, 'h2', 'November 9–13');
  for (const [id, topic] of Object.entries(weeklyLessons)) {
    link(add(prior, 'p'), SUBJECTS[id].name + ' · ' + topic.title, '#week/2026-11-09/' + id);
  }
  link(prior, 'Earlier weeks', '#archive');
  field.oninput = () => {
    const query = field.value.trim().toLowerCase();
    let count = 0;
    for (const {group, grouped} of entries) {
      for (const {block, search, subRows} of grouped) {
        const match = search.includes(query);
        subRows.forEach(([row, text]) => { row.hidden = !match && !text.includes(query); });
        block.hidden = !match && subRows.every(([row]) => row.hidden);
        if (!block.hidden) count++;
      }
      group.hidden = grouped.every(({block}) => block.hidden);
    }
    current.hidden = count === 0;
    prior.hidden = query !== '';
    status.textContent = query ? (count ? count + ' matching topic(s) this week.' : 'No matching topics this week.') : '';
  };
}

function renderCurrentPractice(main) {
  add(main, 'h1', 'Practice');
  add(main, 'p', NOVEMBER_WEEK.dates, 'muted');
  const list = add(main, 'div', undefined, 'subject-list');
  for (const [subjectId, subject] of Object.entries(NOVEMBER_WEEK.subjects)) {
    const card = add(list, 'section', undefined, 'panel current-practice');
    add(card, 'h2', SUBJECTS[subjectId].name);
    subject.topics.forEach(id => link(card, ...WEEK_TOPICS[id].practice));
  }
  link(main, 'Scores and saved responses', '#progress', 'button secondary');
  link(main, 'Previous weeks’ practice', '#archive', 'button secondary');
}

function appendCurrentSourceReview(main) {
  const section = add(main, 'section', undefined, 'panel');
  add(section, 'h2', 'November 16–20 classroom review');
  const details = [
    ['ELA', 'Read the ten-page notes, elephant article and both exit tickets. The spiral closes Friday at 8:00 a.m. Central. Schoology currently allows one attempt, while the newsletter says two. The spiral questions require starting the student attempt. The new modeled essay and quiz questions were unavailable.'],
    ['Math', 'Reviewed the regular Grade 6 section of the newsletter and the completed Expressions notes. Lesson 5-5 is due Tuesday at 11:59 p.m. Central. The publisher activity and videos did not expose their content in this review. Week 14 and the new bonus test review were not visible in the course materials.'],
    ['Science', 'The newsletter confirms the Nov. 18 test and Nov. 19 Biomes start. Reused the 15-item guide and the verified slide and game reviews. Old dates inside copied Week 14 assignments conflict with the newsletter. Exact digital notebook content, some class media, and provider STEMscopedia pages remain unverified.'],
    ['Social Studies', 'Reviewed the WCS OER geography and early settlement sections. The signed-in course showed Egypt and earlier folders. A week-specific India packet, map assignment and teacher quiz were unavailable. The Egypt project event shows Dec. 2.'],
    ['Theatre', 'Opened the 18-slide Music for Mimes collection. Twelve slides exposed track labels. Audio playback and a class performance rubric remain unverified.']
  ];
  const items = add(section, 'dl', undefined, 'source-status-list');
  for (const [subject, value] of details) {
    add(items, 'dt', subject);
    add(items, 'dd', value);
  }
  link(section, 'View source-to-lesson coverage', 'rebuild/NOVEMBER-16-SOURCES.md');
}
