'use strict';

const publicPractice = {
  EXPR: { title: 'Expressions Quiz Review', file: 'expressions-quiz-review-nov9.json', subject: 'MATH' },
  MATH: { title: 'Spiral 12 · Problem-solving practice', file: 'fresh_math_spiral12.json' },
  SSEGYPTRVW: { title: 'Ancient Egypt · Classroom review', file: 'egypt-schoology-review-2026-11-11.json', subject: 'SS', teaching: 'egypt-teaching.html#egypt-unit-review', teachingLabel: 'Read the November 13 Egypt review' },
  SSBINDER: { title: 'Social Studies Binder Review · Three practice forms', file: 'social-studies-binder-questions.json', subject: 'SS', teaching: 'social-studies-binder.html' },
  SS: { title: 'Ancient Egypt · Three practice forms', file: 'ss-unit-tests.json' },
};
const curriculumPath = 'curriculum-2026-11/';
const practiceFiles = new Map();

function renderPublicPractice(main, subject, form, requestedIndex, routeKey) {
  const spec = publicPractice[subject];
  if (!spec) { add(main, 'h1', 'Choose a practice subject'); link(main, 'All practice', '#practice'); return; }
  add(main, 'h1', spec.title);
  const panel = add(main, 'section', undefined, 'panel');
  add(panel, 'p', 'Loading practice…');
  if (!practiceFiles.has(subject)) {
    const request = fetch(curriculumPath + spec.file, {signal: AbortSignal.timeout(12000)})
      .then(response => {
        if (!response.ok) throw Error('The practice file could not load.');
        return response.json();
      }).catch(error => { practiceFiles.delete(subject); throw error; });
    practiceFiles.set(subject, request);
  }
  practiceFiles.get(subject).then(unit => {
    if (location.hash !== routeKey || !panel.isConnected) return;
    panel.replaceChildren();
    add(panel, 'p', subject === 'SS' ? 'Practice on the Egypt material reviewed from class.' : unit.scope);
    add(panel, 'p', 'First answers and progress save in this browser. Use the private Studio if you need its saved scores.');
    link(panel, 'More teaching and public resources', '#bridge/' + (spec.subject ?? subject));
    if (unit.sourceUrl) link(add(panel, 'p'), 'Open the teacher’s review in Schoology', unit.sourceUrl);
    const base = '#unit/' + subject;
    const forms = unit.practice ? {
      A: unit.practice, B: unit.independentCheck, C: unit.masteryCheck
    } : Object.fromEntries(Object.entries(unit.forms).map(([name, ids]) => {
      const bank = new Map(unit.pool.map(item => [item.id, item]));
      return [name, ids.map(id => {
        const item = bank.get(id);
        const repair = unit.repairPool?.[item.objectiveIds?.[0]];
        return repair ? {...item, repair} : item;
      })];
    }));
    if (!Object.hasOwn(forms, form)) {
      if (unit.teach) {
        add(panel, 'h2', subject === 'EXPR' ? 'Learn and review' : 'Choose the method and prove it');
        unit.teach.forEach(paragraph => add(panel, 'p', paragraph));
        add(panel, 'h2', 'Worked example');
        [unit.model.prompt, unit.model.reasoning, unit.model.answer].forEach(paragraph => add(panel, 'p', paragraph));
      } else if (spec.teaching) {
        link(panel, spec.teachingLabel ?? 'Read the binder review lessons', curriculumPath + spec.teaching, 'button');
      } else {
        link(panel, 'Read all 13 Egypt teaching chapters', curriculumPath + 'egypt-teaching.html', 'button');
      }
      const links = add(panel, 'div', undefined, 'grid');
      Object.entries(forms).forEach(([name, items]) => link(links, 'Practice ' + name + ' · ' + items.length + ' questions', base + '/' + name, 'button'));
      readingText = main.innerText;
      return;
    }
    const original = forms[form];
    state.publicPractice ??= {};
    const key = unit.id + ':' + form;
    if (!state.publicPractice[key]) {
      const items = [...original];
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      state.publicPractice[key] = {ids:items.map(q => q.id), orders:RyChoiceLayout.orders(items), answers:{}, repairs:{}};
      save();
    }
    const attempt = state.publicPractice[key];
    attempt.repairs ??= {};
    const bank = new Map(original.map(item => [item.id, item]));
    const items = attempt.ids.map(id => {
        const item = bank.get(id);
        const repair = unit.repairPool?.[item.objectiveIds?.[0]];
        return repair ? {...item, repair} : item;
      }).filter(Boolean);
    const first = items.findIndex(item => !Object.hasOwn(attempt.answers, item.id));
    const slot = requestedIndex === undefined ? first : Number(requestedIndex);
    add(panel, 'h2', 'Practice ' + form);
    link(panel, 'All forms and teaching', base);
    if (first === -1 && requestedIndex === undefined) {
      const correct = items.filter(item => attempt.answers[item.id] === item.answer).length;
      add(panel, 'p', correct + ' of ' + items.length + ' first answers correct.');
      items.forEach((item, index) => link(add(panel, 'p'), (attempt.answers[item.id] === item.answer ? 'Correct' : 'Review') + ' · ' + item.prompt, base + '/' + form + '/' + index));
      readingText = main.innerText;
      return;
    }
    if (!Number.isInteger(slot) || slot < 0 || slot >= items.length || (first !== -1 && slot > first)) {
      link(panel, 'Resume at the next unanswered question', base + '/' + form, 'button');
      readingText = main.innerText;
      return;
    }
    const item = items[slot];
    add(panel, 'h3', 'Question ' + (slot + 1) + ' of ' + items.length);
    const question = (target, order, answers, name) => {
      add(panel, 'p', target.prompt, 'prompt');
      const field = add(panel, 'fieldset');
      add(field, 'legend', 'Choose one answer');
      const answered = Object.hasOwn(answers, target.id);
      order.forEach((i, position) => {
        const label = add(field, 'label');
        const radio = add(label, 'input');
        radio.type = 'radio'; radio.name = name; radio.value = i;
        radio.checked = answered && answers[target.id] === i; radio.disabled = answered;
        add(label, 'span', String.fromCharCode(65 + position) + '. ' + target.options[i]);
      });
      if (answered) {
        const feedback = add(panel, 'section', undefined, 'feedback');
        add(feedback, 'p', (answers[target.id] === target.answer ? 'Correct. ' : 'Review this idea. ') + target.rationale);
      } else {
        const submit = add(panel, 'button', 'Submit answer');
        submit.onclick = () => {
          const chosen = field.querySelector('input:checked');
          if (!chosen || Object.hasOwn(answers, target.id)) return;
          answers[target.id] = Number(chosen.value);
          if (requestedIndex === undefined) history.replaceState(null, '', base + '/' + form + '/' + slot);
          save(); render();
        };
      }
    };
    question(item, attempt.orders[item.id], attempt.answers, 'first-answer');
    if (Object.hasOwn(attempt.answers, item.id)) {
      if (attempt.answers[item.id] !== item.answer && item.repair?.options) {
        const repair = item.repair;
        add(panel, 'h3', 'Try a fresh question');
        if (repair.teach) add(panel, 'p', repair.teach);
        attempt.orders[repair.id] ??= RyChoiceLayout.orders([repair])[repair.id];
        save();
        question(repair, attempt.orders[repair.id], attempt.repairs, 'repair-answer');
      }
      link(panel, slot + 1 === items.length ? 'See results' : 'Next question',
        base + '/' + form + (slot + 1 === items.length ? '' : '/' + (slot + 1)), 'button');
    }
    // The Read button speaks only the active prompt and its choices.
    const readItem = Object.hasOwn(attempt.answers, item.id) && attempt.answers[item.id] !== item.answer && item.repair?.options ? item.repair : item;
    readingText = readItem.prompt + '. ' + attempt.orders[readItem.id].map((i, position) =>
      String.fromCharCode(65 + position) + '. ' + readItem.options[i]).join('. ');
  }).catch(() => {
    if (!panel.isConnected) return;
    panel.replaceChildren();
    add(panel, 'p', 'The practice could not load. Refresh this page to try again.', 'notice');
  });
}

const publicBridges = {
  ELA: {
    title: 'Jane Goodall · Observation and evidence',
    source: ['Jane Goodall Institute · Research at Gombe', 'https://janegoodall.org/news/gombe-stream-research-center-at-65-how-65-years-of-chimpanzee-research-changed-science-conservation-and-our-understanding-of-ourselves/'],
    extra: [['Japan Center for Asian Historical Records · Hachikō', 'https://www.jacar.go.jp/wp/ennews/others/2054/']],
    task: 'For Hachikō, find one detail the historical account and the classroom story share. Then find one detail in the classroom story that comes from the narrator’s perspective. Mark which source supports each detail.',
    learn: 'In 1960, Goodall observed chimpanzees using twigs to collect termites. An observation records what happened. An inference explains what the observation suggests. The institute’s account gives historical context. Use the assigned memoir for questions about its narrator, paragraph evidence and voice.',
    model: 'A chimpanzee strips leaves from a twig and inserts it in a termite mound. Those actions are observations. The claim that the chimpanzee changed the twig to make a useful tool is an inference supported by the actions.',
    recall: 'Why is “the chimpanzee was preparing a tool” an inference?',
    response: 'It explains a purpose. The visible evidence is what the chimpanzee did to the twig and how it used it.',
  },
  MATH: {
    title: 'Expressions · Substitute, then simplify',
    source: ['OpenStax Prealgebra · Evaluate expressions', 'https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions'],
    learn: 'Evaluate means find the value. Substitute the given number for the variable, then follow the order of operations. Multiplication and division share a level and go left to right. Addition and subtraction also share a level.',
    model: 'For n = 4, evaluate 3n + 2. Replace n with 4, multiply 3 × 4, then add 2. The value is 14.',
    recall: 'For n = 5, what is 2n + 3²?',
    response: '19. Substitute 5, evaluate 3² = 9, multiply 2 × 5 = 10, then add 10 + 9.',
  },
  SCI: {
    title: 'Ecology · Lichens, limiting factors and ocean food chains',
    source: ['OpenStax Biology · Ecology of fungi', 'https://openstax.org/books/biology/pages/24-3-ecology-of-fungi'],
    extra: [['National Geographic Education · Food Web, Grade 6', 'https://education.nationalgeographic.org/resource/food-web/6th-grade/'], ['National Geographic Education · Limiting Factors', 'https://education.nationalgeographic.org/resource/limiting-factors-collection/'], ['National Park Service · Kangaroo rats', 'https://www.nps.gov/whsa/learn/nature/kangaroo-rats.htm']],
    task: 'Read how kangaroo rats get water from their food. Explain how that adaptation helps when water is scarce. Then change one nonliving factor in a pond, such as light or water temperature, and predict how the change could affect a living population.',
    learn: 'A lichen includes a fungus and a partner that can photosynthesize. The photosynthetic partner makes sugars. The fungus gives it shelter and helps it obtain water and materials. Many phytoplankton make their own food. Many zooplankton get energy by eating other organisms.',
    model: 'Trace phytoplankton → small grazing zooplankton → fish. Energy moves from food to eater. In a pond, low light can limit how much food producers make. This model shows the feeding relationships described here.',
    recall: 'If a small fish eats the grazing zooplankton in this chain, what consumer level is the fish?',
    response: 'Secondary consumer. The zooplankton eat the producers and are primary consumers in this chain.',
  },
  SS: {
    title: 'Ancient Egypt · Use an artifact as evidence',
    source: ['The Metropolitan Museum of Art · Haremhab as a scribe', 'https://www.metmuseum.org/exhibitions/listings/2010/haremhab'],
    extra: [['Egypt Ministry of Tourism and Antiquities · Giza Plateau', 'https://egymonuments.gov.eg/archaeological-sites/giza-plateau/'], ['Egypt Ministry of Tourism and Antiquities · Valley of the Kings', 'https://egymonuments.gov.eg/archaeological-sites/valley-of-the-kings']],
    task: 'Compare the two site pages. Use the monuments to distinguish the Old Kingdom pyramids at Giza from the New Kingdom royal tombs in the Valley of the Kings. Close both pages and name the site and kingdom for each.',
    learn: 'Scribes were trained to read and write. Haremhab led Egypt’s army before becoming pharaoh and chose to be shown in a scribe’s pose. The statue connects literacy with status, and its subject held more than one role in his lifetime.',
    model: 'The statue can support the claim that literacy mattered to an Egyptian official. To place scribes on a specific social pyramid, use the labels on that assigned diagram.',
    recall: 'What detail makes Haremhab’s statue evidence that literacy mattered to him?',
    response: 'He chose a scribe’s pose even though he was an army leader. That pose associates him with the skill of writing.',
  },
  THEATER: {
    title: 'Pantomime · Make an invisible object clear',
    source: ['University of Hawaiʻi · Pantomime', 'https://coe.hawaii.edu/creative-arts-strategies/modules/pantomime/'],
    extra: [['BYU Theatre Education · Rules of pantomime', 'https://tedb-old.byu.edu/?page_id=923']],
    learn: 'Pantomime uses movement, gesture and expression to communicate without words. Keep an imaginary object at a consistent height and location. Show its weight through grip, posture and timing.',
    model: 'To show a heavy backpack, look at one spot, bend your knees, grip both straps, lift slowly and let the weight pull your shoulders down. Set it back in the same spot.',
    recall: 'How can you make a light backpack and a heavy backpack look different without speaking?',
    response: 'Keep the backpack’s position consistent. Change the lifting speed, amount of effort and posture to suggest the different weight.',
    checks: [
      {id:'mime-space', prompt:'You pick up an invisible cup from a table. What makes the cup easiest to imagine?', options:['Reach to a different height each time.', 'Keep the cup and tabletop at the same height each time.', 'Walk through the table after setting down the cup.'], answer:1, rationale:'Consistent location gives the audience a stable picture of the object.'},
      {id:'mime-weight', prompt:'What movement best suggests that an invisible suitcase is heavy?', options:['Pause, brace your body and lift it slowly.', 'Swing it above your head with one finger.', 'Lift it exactly like an empty suitcase.'], answer:0, rationale:'Bracing and slower movement show how much effort the lift takes.'},
      {id:'mime-tempo', prompt:'The music changes from slow and steady to quick and light. Which movement makes that contrast clearest?', options:['Keep the same speed and posture.', 'Explain the change out loud.', 'Switch from deliberate steps to quick, light steps.'], answer:2, rationale:'A change in timing and movement quality helps the audience notice the contrast.'},
    ],
  },
};

function renderPublicBridge(main, subject) {
  const lesson = publicBridges[subject];
  if (!lesson) { link(main, 'Choose a subject', '#home'); return; }
  intro(main, 'Supplemental practice', lesson.title, 'Use this alongside your classroom lesson.');
  add(main, 'h2', 'Learn the idea');
  add(main, 'p', lesson.learn);
  add(main, 'h2', 'See how it works');
  add(main, 'p', lesson.model);
  add(main, 'h2', 'Try it from memory');
  add(main, 'p', lesson.recall);
  const feedback = add(main, 'details');
  add(feedback, 'summary', 'Compare with a sample answer');
  add(feedback, 'p', lesson.response);
  if (lesson.checks) {
    add(main, 'h2', 'Check your choices');
    const layout = RyChoiceLayout.orders(lesson.checks);
    lesson.checks.forEach(item => {
      const field = add(main, 'fieldset');
      add(field, 'legend', item.prompt);
      layout[item.id].forEach(i => {
        const label = add(field, 'label');
        const input = add(label, 'input');
        input.type = 'radio'; input.name = item.id; input.value = i;
        add(label, 'span', item.options[i]);
      });
      const check = add(field, 'button', 'Check answer');
      const result = add(field, 'p');
      result.setAttribute('role', 'status');
      check.onclick = () => {
        const choice = field.querySelector('input:checked');
        if (choice) result.textContent = (Number(choice.value) === item.answer ? 'Correct. ' : 'Try the idea again. ') + item.rationale;
      };
    });
  }
  add(main, 'h2', 'Explore the source');
  if (lesson.task) add(main, 'p', lesson.task);
  [lesson.source, ...(lesson.extra ?? [])].forEach(([label, url]) => link(add(main, 'p'), label, url));
  link(main, 'Back to the subject', '#subject/' + subject, 'button');
  readingText = [lesson.title, lesson.learn, lesson.model, lesson.recall, lesson.task].filter(Boolean).join('. ');
}
