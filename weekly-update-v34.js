(function(){
  const D=globalThis.LEARN_WITH_RY;
  if(!D||!D.ELA||!D.MATH||!D.SCI||!D.SS)return;
  const q=(p,o,a,w)=>[p,o,a,w];
  const lesson=(id,title,src,teach,model,v,qs,w,connect,success,extra={})=>({id,title,src,teach,model,v,q:qs,w,connect,success,...extra});
  const source='Sunset Middle School 6th grade newsletter dated October 23, 2026';

  const ela=[
    lesson('ela_v34_chimp_structure','CURRENT WEEK • My Life with the Chimpanzees: Meaning, Viewpoint & Structure',source,
      'Continue the assigned Jane Goodall autobiography excerpt by separating five reading jobs. Main idea states the central point developed across the section. Author point of view describes Goodall’s perspective as narrator. Author purpose explains why she includes a detail. Evidence is the precise detail supporting a claim. Section function explains how one part contributes to the whole. A life event may introduce an interest, an observation may develop it, and a reflection may explain its significance. The newsletter announces a test on this text Monday, November 2, and a study guide posted in Schoology Monday, October 26; that private guide is not represented as recovered here.',
      'MODEL: A section describes careful observation, and a later section explains what the observation taught the narrator. Main idea: sustained observation can deepen understanding. Point of view: curious and reflective. Purpose of the observation detail: show how knowledge developed. Function of the later reflection: explain the event’s importance. Evidence must quote or accurately paraphrase the assigned excerpt after Riley returns to it.',
      [['main idea','the most important point a section develops'],['point of view','the narrator’s perspective or attitude'],['author’s purpose','why the author includes information'],['section function','how one section contributes to the whole text'],['evidence','a precise detail that supports a claim']],
      [
        q('Which answer states a section function?',['It explains why the earlier observation mattered','The narrator is Jane Goodall','Chimpanzees are animals','The page has three paragraphs'],0,'Function explains the job a section performs in the whole text.'),
        q('Which question best identifies point of view?',['Why did the author publish the book?','What attitude toward observation does the narrator reveal?','What happens first?','How many sentences are present?'],1,'Point of view focuses on perspective or attitude.'),
        q('SELECT TWO: Strong evidence for a claim about curiosity should include',['a precise action or thought from the excerpt','an explanation connecting the detail to curiosity','an unrelated fact about Tanzania','a personal opinion with no text detail'],[0,1],'Evidence and reasoning work together.'),
        q('A paragraph shifts from describing an event to explaining its importance. What is its likely function?',['Introduce a new setting only','Provide a list with no connection','Reflect on the event’s significance','Change the autobiography into fiction'],2,'Reflection explains meaning or significance.'),
        q('Which is an objective main-idea statement?',['Goodall is obviously the coolest scientist','The section develops how careful observation shaped understanding','I would enjoy visiting Gombe','The paragraph is long'],1,'A main idea is text-based and unbiased.'),
        q('What must Riley do before citing the assigned excerpt?',['Use a remembered detail from another book','Invent a quotation','Choose the longest sentence','Return to the exact passage and verify the wording'],3,'Source-return protects accuracy.'),
        q('Which response distinguishes purpose from main idea?',['Purpose is why the author includes material; main idea is what the material develops','They are always the same','Purpose is a setting; main idea is punctuation','Main idea describes only the narrator’s age'],0,'They answer different questions.'),
        q('A claim says the narrator is persistent. Which support is strongest?',['A verified detail showing repeated effort despite difficulty','The title contains six words','The reader likes science','A photograph has trees'],0,'Repeated effort directly supports persistence.')
      ],
      'After reading the assigned excerpt, write one paragraph stating the main idea, one point-of-view word, the function of one named section, and two verified details with reasoning. Label each part.',
      'The same claim-evidence-reasoning chain is used in Science food-web predictions and Social Studies geography explanations.',
      'I can distinguish main idea, point of view, purpose, evidence, and section function and prove each answer from the assigned text.'),

    lesson('ela_v34_compound_complex','CURRENT WEEK • Compound & Complex Sentences + Spiral Writing',source,
      'A compound sentence joins two independent clauses. It can use a comma plus a coordinating conjunction such as for, and, nor, but, or, yet, or so. A complex sentence contains one independent clause and at least one dependent clause. When a dependent clause comes first, use a comma before the independent clause. Riley’s sentence-type quiz and IXL GG.9 are due Friday, October 30. The weekly spiral is also due Friday and now includes a written component.',
      'MODEL: Compound—“Jane waited quietly, and the chimpanzee returned.” Both sides can stand alone. Complex—“Because Jane waited quietly, the chimpanzee returned.” The opening clause has a subject and verb but cannot stand alone. Do not classify a sentence by length; identify the clauses and their relationship.',
      [['compound sentence','two independent clauses joined correctly'],['complex sentence','one independent clause plus at least one dependent clause'],['coordinating conjunction','for, and, nor, but, or, yet, so'],['subordinating conjunction','a word such as because, although, when, if, or while that makes a clause dependent']],
      [
        q('Which sentence is compound?',['Although the rain stopped, the trail stayed muddy.','Jane took notes, and she checked them later.','Walking through the forest quietly.','Because the group waited.'],1,'Both clauses are independent and are joined by comma + and.'),
        q('Which sentence is complex?',['The class read, and the teacher listened.','The class read the article.','When the class finished, students compared evidence.','Reading the article carefully.'],2,'It combines a dependent opening with an independent clause.'),
        q('SELECT TWO: Which are independent clauses?',['Jane recorded the behavior','because Jane recorded the behavior','the animals moved away','although the animals moved away'],[0,2],'Each selected clause expresses a complete thought.'),
        q('Which punctuation is correct?',['Although the habitat changed the population adapted.','Although the habitat changed, the population adapted.','Although, the habitat changed the population adapted.','Although the habitat, changed the population adapted.'],1,'A fronted dependent clause is followed by a comma.'),
        q('Which revision correctly makes a compound sentence?',['The river flooded because.','The river flooded, and farmers repaired the canals.','Because the river flooded.','Flooding the river and farms.'],1,'It joins two complete thoughts.'),
        q('Which word most clearly begins a dependent clause?',['therefore','because','also','meanwhile'],1,'Because creates an unfinished relationship.'),
        q('What is the best test for an independent clause?',['It is long','It contains a comma','It begins with a capital','It has a subject and verb and expresses a complete thought'],3,'Completeness, not length, is decisive.'),
        q('A spiral response asks for evidence. What should the written component include?',['A claim, a precise detail, and reasoning','Only an answer letter','A copied question with no response','A personal preference only'],0,'The written component should show the thinking.')
      ],
      'Write four source-related sentences: one simple, one compound, and two complex. Label every independent and dependent clause. Then write a short spiral response using claim, evidence, and reasoning.',
      'Sentence structure supports clear explanations in every subject.',
      'I can build, punctuate, and explain compound and complex sentences and use them in a written response.')
  ];

  const math=[
    lesson('math_v34_big8_test','CURRENT WEEK • Big 8 Application + Integers & Coordinate Test',source,
      'The Big 8 must be recalled automatically and applied, not merely recognized: 1/2, 1/3, 1/4, 1/5, 1/8, 1/9, 1/10, and 2/3 with their decimal and percent forms. Pop quizzes may occur at any point during the second quarter. The newsletter’s application example asks for the decimal value of 5/8: use 1/8 = 0.125, then multiply by 5 to get 0.625. Riley’s integers and coordinate graphing test is Friday, October 30; the practice test is Monday, October 26. The private practice-test items are not recovered, so this lesson uses fresh parallel problems.',
      'MODEL: 5/8 = 5 × 0.125 = 0.625 = 62.5%. Coordinate model: reflecting (-3, 4) across the x-axis gives (-3, -4); only y changes sign. Distance model: between (-6, 2) and (5, 2), the horizontal distance is |5 - (-6)| = 11.',
      [['Big 8','eight benchmark fraction-decimal-percent equivalence families'],['integer','a positive or negative whole number or zero'],['reflection','a flip across an axis'],['absolute value','distance from zero'],['coordinate distance','absolute difference of x-values or y-values when the other coordinate matches']],
      [
        q('What is 5/8 as a decimal?',['0.525','0.625','0.58','0.875'],1,'Five times 0.125 equals 0.625.'),
        q('What is 3/8 as a percent?',['30%','33.3%','37.5%','38%'],2,'Three times 12.5% equals 37.5%.'),
        q('Which number is greatest?',['-0.6','-5/8','-0.58','-2/3'],2,'-0.58 is farthest right.'),
        q('Reflect (4,-7) across the x-axis.',['(-4,-7)','(-4,7)','(4,-7)','(4,7)'],3,'Across x, y changes sign.'),
        q('Reflect (-2,5) across the y-axis.',['(2,5)','(-2,-5)','(5,-2)','(2,-5)'],0,'Across y, x changes sign.'),
        q('What is the distance between (-4,3) and (6,3)?',['2','9','10','13'],2,'The y-values match, so use |6 - (-4)|.'),
        q('Which statement is true?',['-9 > -4','|-9| = -9','-4 > -9','Zero is positive'],2,'-4 lies farther right.'),
        q('What is 2/3 as an exact percent?',['66 2/3%','66%','67% exactly','0.23%'],0,'Two-thirds is 66 2/3 percent exactly.'),
        q('SELECT TWO: Which points lie on an axis?',['(0,5)','(-3,0)','(2,4)','(-1,-6)'],[0,1],'One coordinate is zero.'),
        q('Which method finds vertical distance?',['Subtract x-values when y matches','Add both coordinates','Use the absolute difference of y-values when x matches','Multiply the coordinates'],2,'Vertical movement changes y.')
      ],
      'Rebuild all 24 Big 8 entries from memory. Then graph four points, reflect each across a named axis, and calculate one horizontal and one vertical distance. Correct every miss and repeat later without notes.',
      'Big 8 reasoning supports percent work; coordinate evidence supports map and data interpretation.',
      'I can produce the Big 8, compare integers, graph and reflect points, and calculate coordinate distance independently.',{test:true,mix:true})
  ];

  const sci=[
    lesson('science_v34_levels_quiz','CURRENT WEEK • Five Levels + Living and Nonliving Quiz',source,
      'The Tuesday, October 27 Science quiz focuses on eight terms: ecology, biotic, abiotic, organism, population, community, ecosystem, and biosphere. The five nested levels are organism → population → community → ecosystem → biosphere. Biotic means living or once-living. Abiotic means nonliving. An ecosystem includes a community and its abiotic environment.',
      'MODEL: One frog is an organism. All frogs of the same species in one pond form a population. Frogs, fish, insects, plants, and microbes form a community. Add water, light, temperature, rocks, and oxygen to describe the ecosystem. The biosphere includes all places on Earth where life exists.',
      [['ecology','study of relationships among organisms and their environments'],['biotic','living or once-living'],['abiotic','nonliving'],['organism','one individual living thing'],['population','members of one species in one area'],['community','all interacting populations in an area'],['ecosystem','a community plus abiotic factors'],['biosphere','all regions of Earth where life exists']],
      [
        q('One oak tree is a(n)',['population','organism','community','ecosystem'],1,'One individual is an organism.'),
        q('All oak trees of one species in a park form a',['biosphere','community','ecosystem','population'],3,'Same species plus same area equals population.'),
        q('Trees, birds, insects, and fungi in the park form a',['community','organism','abiotic factor','population'],0,'Different populations together form a community.'),
        q('SELECT TWO: Which are abiotic?',['sunlight','fungus','temperature','grass'],[0,2],'Light and temperature are nonliving.'),
        q('Which level adds nonliving conditions to living populations?',['population','community','ecosystem','organism'],2,'An ecosystem includes biotic and abiotic factors.'),
        q('What is ecology?',['A single habitat','The study of organism-environment relationships','Every organism on Earth','A type of population'],1,'Ecology studies relationships.'),
        q('Which order moves from smallest to largest?',['organism, population, community, ecosystem, biosphere','population, organism, ecosystem, community, biosphere','organism, community, population, biosphere, ecosystem','biosphere, ecosystem, community, population, organism'],0,'Each level expands the previous one.'),
        q('Dead leaves are best classified as',['never part of an ecosystem','abiotic only because they no longer live','once-living biotic material','a population'],2,'Biotic includes living or once-living material.')
      ],
      'Draw five nested circles and label the organization levels. Add one accurate example to each. Then sort twelve local examples as biotic or abiotic and explain two choices.',
      'The nested-level structure resembles ELA section structure: each larger level contains and adds to earlier information.',
      'I can define all eight terms, order the five levels, and classify unfamiliar examples.'),

    lesson('science_v34_food_web_energy','CURRENT WEEK • Matter & Energy in Food Webs Guided-Notes Support',source,
      'The STEMscopedia guided-notes packet on Matter and Energy in Food Webs is homework due Friday, October 30. This week introduces food chains, food webs, and energy pyramids. A food chain shows one pathway of energy transfer. A food web connects many feeding pathways. Arrows point from the food or energy source toward the consumer. Producers capture energy, consumers obtain energy by eating, and decomposers break down dead material and waste. An energy pyramid shows that less usable energy is available at higher levels. The exact private packet pages are not recovered, so this lesson does not claim to reproduce its questions.',
      'MODEL: Sun → grass → grasshopper → frog → hawk. The arrow from grass to grasshopper means energy in the grass moves to the grasshopper when it is eaten. If grass declines, several consumers may be affected, but the strength of each effect depends on alternate food sources shown in the full web.',
      [['food chain','one pathway of energy transfer'],['food web','connected feeding pathways'],['producer','organism that makes food using an energy source'],['consumer','organism that eats other organisms for energy'],['decomposer','organism that breaks down dead material and waste'],['energy pyramid','model showing decreasing usable energy at higher feeding levels']],
      [
        q('In grass → rabbit → fox, what does the first arrow mean?',['The rabbit gives energy to grass','Energy moves from grass to rabbit','Grass hunts the rabbit','The fox eats grass'],1,'Arrows show energy transfer from source to consumer.'),
        q('Why is a food web more realistic than one chain?',['It contains no producers','It shows only one meal','It connects multiple feeding relationships','It proves every population stays constant'],2,'Organisms often have multiple food relationships.'),
        q('Which organism begins most land food chains?',['producer','carnivore','decomposer','scavenger'],0,'Producers capture solar energy.'),
        q('SELECT TWO: Which statements are supported by an energy pyramid?',['Less usable energy reaches higher levels','Producers form the broad energy base','Top consumers create all energy','Every level has equal energy'],[0,1],'Energy availability decreases upward.'),
        q('What role do decomposers play?',['They return nutrients by breaking down dead matter and waste','They create sunlight','They are always top predators','They stop all population change'],0,'Decomposition recycles matter.'),
        q('If one prey population declines, what should a scientific explanation do?',['Predict one guaranteed result without the web','Trace possible effects and check alternate pathways','Ignore consumers','Assume producers increase'],1,'A food web supports conditional, evidence-based predictions.'),
        q('Which is a consumer?',['grass making sugar','algae using sunlight','mushroom breaking down litter','deer eating leaves'],3,'The deer obtains energy by eating.'),
        q('Matter and energy differ because',['both disappear completely','energy flows while matter is recycled through ecosystems','matter flows one way and energy cycles perfectly','neither moves'],1,'Energy flows; matter can be recycled.')
      ],
      'Complete the assigned guided-notes packet from the actual STEMscopedia pages. Separately, draw one five-organism food web with arrows, label each role, and explain two possible effects of removing one organism.',
      'Use ELA evidence language—claim, diagram detail, reasoning—when explaining a food-web change.',
      'I can read arrows, distinguish chains from webs, interpret an energy pyramid, and explain a change without claiming certainty.')
  ];

  const ss=[
    lesson('ss_v34_egypt_quiz','CURRENT WEEK • Ancient Egypt Geography, Irrigation, Architecture & Pharaohs',source,
      'The Thursday Ancient Egyptian Geography quiz asks Riley to connect place to life in antiquity. The Nile flows north toward the Mediterranean. Upper Egypt is south and upstream; Lower Egypt is north near the delta. Seasonal water and deposited silt supported farming, while irrigation helped people direct water. Deserts affected travel and offered some protection; the river supported transportation and exchange. Pharaohs held political and religious authority. Architecture required resources, skilled workers, planning, and organized labor. Geography influenced choices, but people and institutions shaped the results.',
      'MODEL: Condition—the Nile valley provided water and fertile floodplain soil. Human response—farmers used irrigation and communities coordinated labor. Consequence—more dependable food production could support specialists, administrators, builders, and larger settlements. Limitation—the river did not automatically create monuments or government; people made decisions and performed the work.',
      [['Nile Delta','fertile branching river region in northern Egypt'],['Upper Egypt','southern, upstream Nile region'],['Lower Egypt','northern, downstream region near the delta'],['irrigation','directing water to crops'],['pharaoh','Egyptian ruler with political and religious authority'],['architecture','design and construction of buildings and monuments']],
      [
        q('Why is Upper Egypt south of Lower Egypt?',['It is upstream at higher elevation','Maps were printed upside down','It is closer to Mesopotamia','The Nile flows south'],0,'Upper and lower refer to elevation and river flow.'),
        q('Which best explains irrigation?',['Writing laws','Directing water to fields','Building tombs','Trading across deserts'],1,'Irrigation manages water for farming.'),
        q('SELECT TWO: Nile benefits included',['fertile silt','transportation','elimination of drought','automatic political unity'],[0,1],'The river supported soil fertility and movement.'),
        q('Which claim avoids geographic determinism?',['The Nile forced every Egyptian belief','Geography had no influence','The Nile shaped opportunities, while people made choices and built institutions','Deserts guaranteed peace'],2,'Geography influences rather than mechanically determines.'),
        q('A pharaoh was',['a farmer only','a Babylonian law code','a river branch','an Egyptian ruler with political and religious authority'],3,'Pharaohs combined political and religious roles.'),
        q('What does monumental architecture reveal most directly?',['Only the ruler mattered','Large projects required planning, labor, skills, and resources','Every worker had equal power','The Nile built structures by itself'],1,'Architecture reflects coordinated human work.'),
        q('What is the strongest cause-and-effect chain?',['Nile water and silt → farming and irrigation → surplus → specialization','Pyramids → Nile flows north → farming','Desert → unlimited crops → no trade','Pharaoh → river disappears'],0,'The sequence links condition, response, and consequence.'),
        q('Which comparison with Mesopotamia is accurate?',['Both developed around rivers, but their environmental patterns and political histories differed','Only Egypt used irrigation','Mesopotamia had no cities','The Nile is the Euphrates'],0,'A strong comparison includes similarity and difference.')
      ],
      'Draw and label the Nile, delta, Upper Egypt, Lower Egypt, Mediterranean Sea, Red Sea, Sahara, and Nubia. Then write a condition → response → consequence explanation using irrigation, surplus, specialization, pharaoh, and architecture.',
      'Compare Nile geography with the Tigris-Euphrates system, and connect irrigation to Science systems thinking.',
      'I can use a map and evidence to explain how geography and human choices shaped ancient Egyptian life.')
  ];

  D.ELA.lessons.unshift(...ela);
  D.MATH.lessons.unshift(...math);
  D.SCI.lessons.unshift(...sci);
  D.SS.lessons.unshift(...ss);
  globalThis.WEEKLY_UPDATE_V34={version:'2026-10-23-newsletter-v34',counts:{ELA:ela.length,MATH:math.length,SCI:sci.length,SS:ss.length}};
})();
