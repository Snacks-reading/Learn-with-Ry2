'use strict';

const WEEK_RECORDS_KEY = 'learn-with-ry:' + NOVEMBER_WEEK.id;
const RECALL_DAYS = [1, 3, 7, 14, 30];
const FORM_NAMES = {
  G: 'Guided check', A: 'Practice A', B: 'Practice B', C: 'Practice C',
  R1: 'Day 1 recall', R3: 'Day 3 recall', R7: 'Day 7 recall', R14: 'Day 14 recall', R30: 'Day 30 recall'
};
const weekAttempts = {attempts: {}, writing: {}};
let weekStorageOK = true;

function readWeekRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(WEEK_RECORDS_KEY));
    if (saved?.attempts && saved?.writing) Object.assign(weekAttempts, saved);
    weekStorageOK = true;
  } catch {
    weekStorageOK = false;
  }
  return weekAttempts;
}

function persistWeekRecords(records) {
  try {
    localStorage.setItem(WEEK_RECORDS_KEY, JSON.stringify(records));
    weekStorageOK = true;
  } catch {
    weekStorageOK = false;
  }
}

function toWeeklyItem(skill, id, [prompt, choices, rationale]) {
  return {id, skill, prompt, options: choices.split('|').map(choice => choice.trim()), answer: 0, rationale};
}

function itemsFor(topicId, form) {
  if (form === 'G') {
    const [skillId, ...variant] = WEEK_GUIDED[topicId];
    const skill = WEEK_SKILLS[topicId].find(skill => skill.id === skillId);
    return [toWeeklyItem(skill, topicId + '-guided', variant)];
  }
  if (form.startsWith('R')) {
    const index = RECALL_DAYS.indexOf(Number(form.slice(1)));
    const [skillId, ...variant] = WEEK_RECALL[topicId][index];
    const skill = WEEK_SKILLS[topicId].find(skill => skill.id === skillId);
    return [toWeeklyItem(skill, topicId + '-' + form, variant)];
  }
  const index = ['A', 'B', 'C'].indexOf(form);
  return WEEK_SKILLS[topicId].map(skill => toWeeklyItem(skill, topicId + '-' + form + '-' + skill.id, skill.variants[index]));
}

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function recallOpens(records, topicId, day) {
  const completed = ['A', 'B', 'C'].map(form => records.attempts[topicId + ':' + form])
    .filter(attempt => attempt?.finishedAt && attempt.independent)
    .map(attempt => Date.parse(attempt.finishedAt));
  return completed.length ? Math.min(...completed) + day * 86400000 : null;
}

function calendarTime(time) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  }).format(time) + ' Central';
}

function practiceRecord(attempt, items) {
  const answered = items.filter(item => Object.hasOwn(attempt.answers, item.id));
  return {
    answered: answered.length,
    correct: answered.filter(item => attempt.answers[item.id] === item.answer).length
  };
}

function renderWeekPractice(main, topicId, form, requestedIndex, routeKey) {
  if (!QUIZ_TOPICS.includes(topicId)) {
    add(main, 'h1', 'Choose a practice topic');
    link(main, 'All practice', '#practice');
    return;
  }
  const topic = WEEK_TOPICS[topicId];
  const subject = Object.keys(NOVEMBER_WEEK.subjects).find(id => NOVEMBER_WEEK.subjects[id].topics.includes(topicId));
  const studyLink = '#study/' + subject + '/' + topicId;
  const home = '#check/' + topicId;
  const records = readWeekRecords();
  link(main, '← All practice', '#practice', 'back-link');
  intro(main, SUBJECTS[subject].name, topic.title, topic.sourceScope);

  const wrap = add(main, 'section', undefined, 'panel');
  const updateStatus = message => {
    status.textContent = weekStorageOK ? message : 'This browser could not save the response. Leave this page open to keep working.';
  };
  const status = add(main, 'p', '', 'muted');
  status.setAttribute('role', 'status');

  if (!Object.hasOwn(FORM_NAMES, form)) {
    add(wrap, 'h2', 'Choose a form');
    add(wrap, 'p', 'First answers save on this device. Read-aloud can be used during independent practice.');
    link(wrap, 'Read the lesson and examples', studyLink, 'button secondary');
    const forms = add(wrap, 'ul', undefined, 'practice-list');
    for (const key of ['G', 'A', 'B', 'C']) {
      const total = itemsFor(topicId, key).length;
      const run = records.attempts[topicId + ':' + key];
      const label = run?.finishedAt ? 'Review ' : run ? 'Resume ' : 'Start ';
      const name = key === 'G' ? 'guided check' : FORM_NAMES[key].toLowerCase();
      link(add(forms, 'li'), label + name + ' · ' + total + (total === 1 ? ' question' : ' questions'), home + '/' + key);
    }
    const recall = add(main, 'section', undefined, 'panel');
    add(recall, 'h2', 'Remember it later');
    add(recall, 'p', 'Each new question opens on a different day after your first completed independent form.');
    for (const day of RECALL_DAYS) {
      const row = add(recall, 'p');
      const key = 'R' + day;
      const opens = recallOpens(records, topicId, day);
      if (records.attempts[topicId + ':' + key]?.finishedAt) link(row, 'Review ' + FORM_NAMES[key].toLowerCase(), home + '/' + key);
      else if (opens && Date.now() >= opens) link(row, 'Open ' + FORM_NAMES[key].toLowerCase(), home + '/' + key);
      else row.textContent = FORM_NAMES[key] + ' · ' + (opens ? 'Opens ' + calendarTime(opens) : 'Finish an independent form first');
    }
    if (WEEK_WRITING[topicId]) renderWeeklyWriting(main, topicId, records);
    return;
  }

  const base = home + '/' + form;
  const key = topicId + ':' + form;
  const catalogItems = itemsFor(topicId, form);
  const attempt = records.attempts[key];
  add(wrap, 'h2', FORM_NAMES[form]);
  link(wrap, 'All forms for this topic', home);
  if (!attempt && form.startsWith('R')) {
    const opens = recallOpens(records, topicId, Number(form.slice(1)));
    if (!opens || Date.now() < opens) {
      add(wrap, 'p', opens ? 'This recall question opens ' + calendarTime(opens) + '.' : 'Finish an independent practice form to open delayed recall.');
      return;
    }
  }
  if (!attempt) {
    const independent = add(wrap, 'label', undefined, 'practice-choice');
    const isIndependent = add(independent, 'input');
    isIndependent.type = 'checkbox';
    isIndependent.checked = true;
    add(independent, 'span', ' I’m answering independently.');
    if (form === 'G') independent.hidden = true;
    const start = add(wrap, 'button', 'Begin ' + FORM_NAMES[form].toLowerCase());
    start.onclick = () => {
      const latest = readWeekRecords();
      if (!latest.attempts[key]) {
        const items = shuffled(catalogItems);
        latest.attempts[key] = {
          ids: items.map(item => item.id), orders: RyChoiceLayout.orders(items), answers: {},
          repairs: {}, independent: form !== 'G' && isIndependent.checked, finishedAt: null
        };
        persistWeekRecords(latest);
      }
      render();
    };
    return;
  }

  const map = new Map(catalogItems.map(item => [item.id, item]));
  const items = attempt.ids.map(id => map.get(id)).filter(Boolean);
  const data = practiceRecord(attempt, items);
  const nextIndex = items.findIndex(item => !Object.hasOwn(attempt.answers, item.id));
  const index = requestedIndex === undefined ? nextIndex : Number(requestedIndex);
  add(wrap, 'p', data.answered + ' of ' + items.length + ' answered · ' + (attempt.independent ? 'Independent' : 'Guided or supported'), 'muted');
  if (!weekStorageOK) updateStatus('');

  if (nextIndex === -1 && requestedIndex === undefined) {
    add(wrap, 'h3', data.correct + ' of ' + items.length + ' correct on the first try');
    const details = add(wrap, 'ol', undefined, 'practice-list');
    for (const [position, item] of items.entries()) {
      const correct = attempt.answers[item.id] === item.answer;
      link(add(details, 'li'), (correct ? 'Correct · ' : 'Review · ') + item.skill.label, base + '/' + position);
    }
    if (WEEK_WRITING[topicId]) renderWeeklyWriting(main, topicId, records);
    link(main, 'Choose another form or check recall dates', home, 'button secondary');
    return;
  }

  if (!Number.isInteger(index) || !items[index] || (nextIndex >= 0 && index > nextIndex)) {
    link(wrap, 'Resume at your next question', base, 'button');
    return;
  }

  const item = items[index];
  add(wrap, 'h3', 'Question ' + (index + 1) + ' of ' + items.length);
  const selected = attempt.answers[item.id];
  function lockResponse(response, chosen, repair = false) {
    const latest = readWeekRecords();
    const run = latest.attempts[key];
    const stored = repair ? run.repairs : run.answers;
    if (Object.hasOwn(stored, response.id)) return;
    stored[response.id] = chosen;
    if (!run.finishedAt && run.ids.every(id => Object.hasOwn(run.answers, id))) {
      run.finishedAt = new Date().toISOString();
    }
    persistWeekRecords(latest);
    if (location.hash !== routeKey) return;
    history.replaceState(null, '', base + '/' + index);
    render();
  }

  function showQuestion(question, order, value, repair = false) {
    add(wrap, 'p', question.prompt, 'prompt');
    const group = add(wrap, 'fieldset');
    add(group, 'legend', 'Choose one answer');
    for (const [letter, number] of order.entries()) {
      const label = add(group, 'label');
      const radio = add(label, 'input');
      radio.type = 'radio';
      radio.name = repair ? 'repair-answer' : 'first-answer';
      radio.value = number;
      radio.checked = value === number;
      radio.disabled = value !== undefined;
      add(label, 'span', String.fromCharCode(65 + letter) + '. ' + question.options[number]);
    }
    if (value === undefined) {
      const submit = add(wrap, 'button', repair ? 'Check repair question' : 'Submit answer');
      submit.onclick = () => {
        const choice = group.querySelector('input:checked');
        if (!choice) {
          updateStatus('Choose an answer first.');
          return;
        }
        lockResponse(question, Number(choice.value), repair);
      };
    } else {
      const feedback = add(wrap, 'section', undefined, 'feedback');
      const correct = value === question.answer;
      const waitingForRepair = !repair && !correct;
      const message = waitingForRepair
        ? 'Not yet. Try the fresh second question below before opening the explanation.'
        : (correct ? 'Correct. ' : 'The second try is complete. ') + question.rationale;
      add(feedback, 'p', message);
      const read = add(feedback, 'button', waitingForRepair ? 'Read next step' : 'Read feedback', 'secondary');
      read.onclick = () => speak(message);
    }
  }

  const order = attempt.orders[item.id];
  showQuestion(item, order, selected);
  let toRead = item;
  let toReadOrder = order;
  if (selected !== undefined) {
    let secondTryComplete = true;
    if (selected !== item.answer) {
      const repair = toWeeklyItem(item.skill, item.id + '-repair', item.skill.variants[3]);
      const repairOrder = attempt.orders[repair.id] ??= RyChoiceLayout.orders([repair])[repair.id];
      const repairValue = attempt.repairs[repair.id];
      secondTryComplete = repairValue !== undefined;
      persistWeekRecords(records);
      add(wrap, 'h3', 'Try a fresh second question');
      showQuestion(repair, repairOrder, repairValue, true);
      toRead = repair;
      toReadOrder = repairOrder;
      if (secondTryComplete) {
        link(add(wrap, 'p'), 'Review the worked example', studyLink + '/' + item.skill.section);
      }
    }
    if (secondTryComplete) {
      const next = nextIndex === -1 || index + 1 >= items.length ? base : base + '/' + (index + 1);
      link(wrap, nextIndex === -1 ? 'See results' : 'Next question', next, 'button');
    }
  }
  link(wrap, 'Save and leave practice', home, 'button secondary');
  document.getElementById('read').textContent = 'Read question and choices';
  readingText = toRead.prompt + '. ' + toReadOrder.map((i, j) => 'Choice ' + String.fromCharCode(65 + j) + '. ' + toRead.options[i]).join('. ');
}

function renderWeeklyWriting(main, id, records) {
  const task = WEEK_WRITING[id];
  const box = add(main, 'section', undefined, 'panel');
  add(box, 'h2', id === 'essay' ? 'Written essay practice' : 'Show your reasoning');
  add(box, 'p', task.prompt);
  const read = add(box, 'button', 'Read writing prompt', 'secondary');
  read.onclick = () => speak(task.prompt);
  const draft = add(box, 'textarea');
  draft.setAttribute('aria-label', 'Your written response');
  draft.value = records.writing[id]?.text ?? '';
  const status = add(box, 'p', records.writing[id]?.savedAt ? 'Saved on this device · awaiting review' : '', 'muted');
  status.setAttribute('role', 'status');
  const save = add(box, 'button', 'Save for review');
  draft.oninput = () => {
    const latest = readWeekRecords();
    latest.writing[id] = {text: draft.value, savedAt: null};
    persistWeekRecords(latest);
    status.textContent = weekStorageOK ? 'Draft saved on this device' : 'This browser could not save the draft.';
  };
  save.onclick = () => {
    if (!draft.value.trim()) { status.textContent = 'Write your response first.'; return; }
    const latest = readWeekRecords();
    latest.writing[id] = {text: draft.value, savedAt: new Date().toISOString()};
    persistWeekRecords(latest);
    status.textContent = weekStorageOK ? 'Saved on this device · awaiting review' : 'This browser could not save this response.';
  };
}

function renderWeekProgress(main) {
  add(main, 'h1', 'Your progress');
  add(main, 'p', NOVEMBER_WEEK.dates + ' · Records are stored in the browser you used for practice.');
  const records = readWeekRecords();
  let ecologyRuns = [];
  try { ecologyRuns = JSON.parse(localStorage.getItem(CURRENT_ECOLOGY_KEY))?.runs ?? []; } catch {}
  const activeAttempts = Object.values(records.attempts).some(run => Object.keys(run.answers).length);
  if (!activeAttempts && !ecologyRuns.some(run => run.answers.length)) {
    add(main, 'p', 'Unmeasured · no scored responses this week.', 'notice');
  }
  if (!weekStorageOK) add(main, 'p', 'This browser did not allow access to the saved records.', 'notice');
  for (const id of QUIZ_TOPICS) {
    const panel = add(main, 'section', undefined, 'panel');
    add(panel, 'h2', WEEK_TOPICS[id].title);
    const keys = Object.keys(FORM_NAMES).filter(form => Object.hasOwn(records.attempts, id + ':' + form));
    for (const form of keys) {
      const run = records.attempts[id + ':' + form];
      const items = itemsFor(id, form);
      const score = practiceRecord(run, items);
      add(panel, 'p', FORM_NAMES[form] + ' · ' + score.answered + ' of ' + items.length + ' answered · ' +
        score.correct + ' first answers correct · ' + (run.independent ? 'Independent' : 'Guided or supported'));
      const misses = items.filter(item => Object.hasOwn(run.answers, item.id) && run.answers[item.id] !== item.answer);
      if (misses.length) {
        const review = add(panel, 'details');
        add(review, 'summary', 'Focus cards · ' + FORM_NAMES[form]);
        for (const item of misses) {
          add(review, 'h3', item.skill.label);
          add(review, 'p', item.prompt);
          add(review, 'p', 'Answer · ' + item.options[item.answer] + '. ' + item.rationale);
        }
      }
    }
    if (!keys.length) add(panel, 'p', 'No current attempts.');
    const writing = records.writing[id];
    if (writing?.text) {
      const response = add(panel, 'details');
      add(response, 'summary', writing.savedAt ? 'Written response awaiting review' : 'Writing draft');
      add(response, 'p', writing.text, 'prompt-context');
      add(response, 'p', WEEK_WRITING[id].review);
    }
    const day = RECALL_DAYS.find(day => !records.attempts[id + ':R' + day]?.finishedAt);
    const recall = recallOpens(records, id, day);
    if (day && recall) add(panel, 'p', 'Next recall · day ' + day + ' · ' + (recall <= Date.now() ? 'Ready' : calendarTime(recall)));
    link(panel, 'Open practice and recall', '#check/' + id);
  }
  const science = add(main, 'section', undefined, 'panel');
  add(science, 'h2', 'Ecology test practice');
  add(science, 'p', ecologyRuns.length ? ecologyRuns.filter(run => run.finishedAt).length + ' completed rounds this week' : 'No current attempts.');
  link(science, 'Open Ecology scores and focus skills', CURRENT_ECOLOGY + '#progress');
}
