'use strict';

const NOVEMBER_WEEK = {
  id: '2026-11-16',
  dates: 'November 16–20',
  subjects: {
    ELA: { title: 'Explanatory writing', detail: 'Essay-parts quiz Friday', topics: ['essay'] },
    MATH: { title: 'Equivalent expressions', detail: 'Combine like terms and use properties', topics: ['expressions'] },
    SCI: { title: 'Ecology and biomes', detail: 'Ecology test Wednesday · Biomes begin Thursday', topics: ['ecology', 'biomes'] },
    SS: { title: 'Ancient India', detail: 'How geography helped early settlements grow', topics: ['india'] },
    THEATER: { title: 'Music for Mimes', detail: 'Rehearse gesture, timing and movement', topics: ['mime'] }
  },
  datesToKnow: [
    ['Mon, Nov. 16', 'Late start · homeroom at 8:35 a.m. Central'],
    ['Tue, Nov. 17', 'Math · Lesson 5-5 practice due at 11:59 p.m. Central'],
    ['Wed, Nov. 18', 'Science · Ecology test', '#study/SCI/ecology'],
    ['Thu, Nov. 19', 'Science · Biomes begin', '#study/SCI/biomes'],
    ['Fri, Nov. 20', 'ELA · Spiral closes at 8:00 a.m. Central'],
    ['Fri, Nov. 20', 'ELA · Explanatory essay parts quiz', '#study/ELA/essay'],
    ['Nov. 30 and Dec. 4', 'Grade 6 Math · Expressions practice test Nov. 30, unit test tentatively Dec. 4', '#study/MATH/expressions'],
    ['Wed, Dec. 2', 'Social Studies · Ancient Egypt project due']
  ]
};

const CURRENT_ECOLOGY = 'curriculum-2026-11/ecology/index.html?week=2026-11-16';
const CURRENT_ECOLOGY_KEY = 'learn-with-ry:2026-11-16:ecology';

const WEEK_TOPICS = {
  essay: {
    title: 'Build an explanatory essay',
    sourceScope: 'Explanatory writing notes packet, pp. 1–10, the elephant article, and the two posted exit tickets.',
    readings: [
      ["Explanatory writing notes",null,"An explanatory essay answers a question by making a clear claim about how something works or why it happens. Read the task for the topic, the action word and the evidence it asks for. Write a hook, introduce the source and put a one-sentence thesis at the end of the introduction. Give each thesis point its own body paragraph. Start with a topic sentence, introduce a concrete detail from the source and explain how the detail supports your point. Close by restating the thesis in fresh words and explaining why it matters."],
      ["Elephant study · reading in our own words",null,"Researchers watching captive Asian elephants observed how members of a group responded when another elephant showed distress. A bystander sometimes approached the distressed elephant and made gentle contact with its trunk, including near the mouth. Other responses included calls such as chirps or rumbles. The researchers could observe the gestures and sounds and relate them to what had just happened. Those observations help explain how the group responded to distress. When you write about this study, keep your claim specific to the elephants the researchers observed."],
      ["Thesis and introduction · quick check","#check/essay/G","Decide which sentence draws a reader in, which introduces the source, and which directly answers the prompt. Then write your own thesis about the two elephant behaviors."]
    ],
    sections: [
      ['purpose', 'Read the prompt and make a plan',
        'Explanatory writing teaches the reader about a topic or shows how something works. Watch for task words such as explain, inform, describe, and tell how. Reread the prompt, circle the task word, underline exactly what it asks, and turn the requirements into a checklist. If the task asks for more than one source, use relevant evidence from both. If you are explaining a process, put the steps in a useful order.',
        'For the elephant prompt, circle “describing.” Underline how elephants show empathy. Your checklist could say: answer how, name two ways, use evidence from the article, explain each detail, and write several paragraphs. Group your notes under physical contact and reassuring sounds before you draft.'],
      ['intro', 'Write the hook, background and thesis',
        'The hook draws the reader in with a relevant fact, image, statistic or quotation. Background information names the source and briefly situates its topic. Finish the introduction with one thesis sentence. It directly answers the prompt and previews the two points the body paragraphs will explain.',
        'A hook can begin with the idea that a comforting gesture can be as simple as a touch. The background can name “Surprise: Elephants Comfort Upset Friends” and mention that researchers observed Asian elephants. A thesis can say: Asian elephants responded to distressed herd mates with gentle contact and reassuring sounds.'],
      ['evidence', 'Choose concrete details',
        'A topic sentence explains one part of your thesis. A concrete detail is specific evidence you can find in a source. Name the source or its author when introducing the evidence. A paraphrase puts the idea in your own words. Quotation marks belong around the exact words you quote.',
        'A topic sentence might say that elephants used touch to respond to distress. A concrete detail from the study is that some bystanders touched a distressed elephant near or inside the mouth with their trunks. That detail is much more useful than saying elephants were kind.'],
      ['commentary', 'Explain why the evidence matters',
        'Commentary is your reasoning. After a detail, explain what the behavior suggests and why it supports the topic sentence. In the teacher’s color code, blue is the topic and wrap-up, red is the concrete detail, and green is the commentary. Close the paragraph by returning to that point of the thesis. Use the next paragraph for the second point.',
        'The trunk contact matters because a bystander approached an animal that was already upset and responded with gentle contact. That response gives researchers an observable example of reassurance. A closing line can connect the evidence back to how elephants comforted distressed herd mates.'],
      ['conclusion', 'Restate the thesis and explain the significance',
        'The conclusion wraps up the whole essay. Restate both thesis points in fresh words, then explain why the information matters or what it helps the reader understand. Keep new evidence in the body. Read the introduction and conclusion together to check that they answer the same prompt.',
        'A conclusion could connect contact and calls to the bigger idea: the observations help scientists learn how social animals respond to distress. Keep the claim specific to the captive Asian elephants that were studied.'],
      ['model', 'Read a complete model',
        [
          'A gentle touch can tell a friend that someone has noticed they are upset. In “Surprise: Elephants Comfort Upset Friends,” researchers watched captive Asian elephants react when a member of the herd was distressed. The elephants responded through gentle physical contact and reassuring sounds.',
          'First, the elephants used touch when a herd mate showed distress. The article describes bystanders reaching toward an upset elephant with their trunks, sometimes touching its mouth. The touch came from an animal that had seen the distress, which helps explain why researchers treated it as a response to the upset animal. Their actions give one example of how an elephant could offer reassurance.',
          'The elephants also used sounds. According to the article, bystanders sometimes chirped or rumbled after noticing an upset animal. The sounds give another clue about social behavior because bystanders used them while approaching or attending to the distressed animal. Reassuring calls were a second way they responded.',
          'Gentle gestures and vocal signals both helped researchers recognize how these elephants reacted to distress in their group. Paying attention to such responses can help us understand how social animals respond to one another, even when they communicate differently from humans.'
        ],
        'Find the thesis at the end of paragraph one. In each middle paragraph, point to the topic, evidence, explanation and wrap-up. Finally, name the larger idea in the last sentence.']
    ],
    practice: ['Explanatory essay practice forms', '#check/essay']
  },
  expressions: {
    title: 'Combine like terms and recognize equivalent expressions',
    sourceScope: 'Regular Grade 6 Math newsletter and completed Expressions Unit Notes, especially pp. 9–14.',
    readings: [
      ["Expressions notes · skills recap",null,"An exponent tells how often to multiply a base by itself. For example, 3³ means 3 × 3 × 3, or 27. When you substitute, write the value in parentheses and follow the order of operations. To simplify an expression, distribute across every term in parentheses and combine terms only when their variable parts match. To factor, divide each term by the greatest common factor and place that factor outside parentheses. Compare simplified expressions to decide if a pair is equivalent."],
      ["Equivalent expressions · worked practice",null,"Start with 3(2x + 4) − x. Multiply both terms in the group by 3 to get 6x + 12 − x. Combine the x terms to get 5x + 12. Check with x = 2. The original expression gives 3(8) − 2 = 22, and the simplified one gives 10 + 12 = 22. The rewriting shows equivalence for all values. The substitution checks the arithmetic at one value."],
      ["Equivalent expressions · guided problems","#check/expressions/G","Identify the property or operation before entering your answer."]
    ],
    sections: [
      ['parts', 'Read the parts of an expression',
        'An expression represents a value. A variable stands for a number, a coefficient multiplies a variable, and a constant is a number by itself. Terms are separated by addition or subtraction outside grouping symbols. Keep the sign with the term. A factor is a quantity being multiplied. In a power, the base is the factor and the exponent counts how many times to use it.',
        'In 5x² − x + 8, the terms are 5x², −x, and 8. The coefficient of −x is −1 and the constant is 8. In x², x is the base and 2 is the exponent.'],
      ['evaluate', 'Translate and substitute',
        'Find the operation and its order before writing an expression. “Less than” and “the difference between” require attention to which amount comes first. A factor on the outside of parentheses multiplies the whole group. To evaluate, substitute the given number and then use grouping, exponents, multiplication and division left to right, and addition and subtraction left to right.',
        'Twice the difference between n and 3 means 2(n − 3). When n = 8, the expression is 2(8 − 3) = 10. The phrase “three less than twice n” gives 2n − 3, which is 13 at n = 8.'],
      ['properties', 'Use the four properties',
        'The commutative property changes the order of addition or multiplication. The associative property changes the grouping of three or more addends or factors. The identity property adds zero or multiplies by one. The distributive property multiplies each term inside parentheses by the factor outside. Check the operation carefully when you decide which rule applies.',
        'In a + b = b + a, the order changes. In (a + b) + c = a + (b + c), the grouping changes. In 4x × 1 = 4x, one leaves the product unchanged. In 3(x + 2) = 3x + 6, the factor 3 multiplies both terms.'],
      ['distribute', 'Expand or factor',
        'To expand, multiply the outside factor by every term and keep the sign. To factor, reverse that step. Find the greatest common factor and divide each term by it to get the terms inside parentheses. You can use distribution for mental math, including decimals and fractions.',
        'Expand 4(2x − 3) to get 8x − 12. In reverse, the greatest common factor of 8 and 12 is 4, so 8x − 12 factors as 4(2x − 3). For mental math, 6 × 2½ becomes 6 × 2 plus 6 × ½, for a total of 15.'],
      ['combine', 'Combine only terms with the same variable part',
        'Like terms have exactly the same variables raised to the same powers. Add or subtract their coefficients and keep the variable part. Combine constants together. A variable with no written coefficient has coefficient one. Terms such as x and x² stay separate. Keep a minus sign attached to the term that follows it.',
        'For 2x² + 4x − x + 3 + x², the square terms make 3x², the x terms make 3x, and 3 stays a constant. The simplest form is 3x² + 3x + 3.'],
      ['prove', 'Show that expressions are equivalent',
        'Equivalent expressions have equal values for every allowed value of the variable. Use valid properties to rewrite the expressions, then compare. One input giving different values disproves equivalence. One matching input alone can be a coincidence.',
        'Compare 2(3x + 4) + x and 7x + 8. Distribution gives 6x + 8 + x. Combining the x terms gives 7x + 8, so the expressions are equivalent. The pair 2x + 3 and 3x + 2 match at x = 1 but differ at x = 0, so that pair is not equivalent.'],
      ['multi', 'Simplify expressions with several steps',
        'Expand the groups first, collect like terms and put each kind in simplest form. Use a common denominator when adding fractional coefficients. Include a property or a reason for each change when you show your work.',
        'Simplify 2(x² + 3x) + ½x² + 5. Expand to get 2x² + 6x + ½x² + 5. Combine the square terms to get 2½x² + 6x + 5. The 6x stays separate because its exponent is different.']
    ],
    practice: ['Equivalent expressions practice forms', '#check/expressions']
  },
  ecology: {
    title: 'Prepare for the Wednesday Ecology test',
    sourceScope: 'Nov. 13 newsletter, the 15-item Ecology guide, Ecology StudyMate, the classroom review games, and the Week 14 assignments.',
    readings: [
      ["15-item Ecology study guide","curriculum-2026-11/ecology/index.html?week=2026-11-16#classroom-review","Recall the answer to each item, then check your explanation against a worked example."],
      ["Ecology lessons, glossary and guided checks","curriculum-2026-11/ecology/index.html?week=2026-11-16#learn","Review levels of organization, population changes, energy flow and relationships."],
      ["Population changes · rabbit lab practice",null,"Imagine two trials begin with 20 rabbits and the same amount of food and water. At generation three, the trial with predators has 28 rabbits and the trial without predators has 44. These are example counts. Which trial had more growth? Both populations grew, but the predator trial gained 8 and the other gained 24. Keeping the starting conditions the same helps you test whether predation may explain the difference. Repeat the trials to check whether the pattern holds."],
      ["Ecology quiz board and vocabulary cards","curriculum-2026-11/classroom-practice.html#ecology","Explain each word in a new example as you review."]
    ],
    sections: [
      ['levels', 'Use the levels of organization',
        'An organism is one living thing. One species in the same area makes a population. Interacting populations form a community. Add nonliving conditions such as water, sunlight and temperature to describe an ecosystem. A biome contains many ecosystems with similar climate, and the biosphere includes all places on Earth where life exists.',
        'A single frog is an organism. All frogs of its species in a pond make a population. Add fish, plants and insects to describe a community. Include the pond water and available light to describe the ecosystem.'],
      ['limits', 'Explain a change in population',
        'Carrying capacity is the population size an area can support over time. Limiting factors include biotic things such as food or predators and abiotic things such as water or temperature. At or above a limit, birth rates can fall, death rates can rise, or some organisms may leave. Competition happens when organisms need the same limited resource.',
        'If a drought lowers the amount of drinking water, water becomes a stronger limiting factor. When two species depend on that same water, they may compete. In the rabbit practice, compare population counts at the same generation and use the difference as evidence.'],
      ['energy', 'Follow energy and matter',
        'A food chain traces one path and a food web follows several paths. The arrows point from the food to the organism getting its energy. Producers such as green plants use photosynthesis. Primary consumers eat producers, and secondary and tertiary consumers are higher feeding levels. Decomposers break down remains and help recycle matter. About 10 percent of energy passes to the next level in a classroom energy pyramid. The other energy is used in life processes, released as heat, or remains in waste and material that is not eaten.',
        'Start with 5,000 energy units in producers. About 500 reach primary consumers, 50 reach secondary consumers, and 5 reach tertiary consumers. In a leaf to caterpillar to bird chain, arrows point from leaf to caterpillar, then from caterpillar to bird.'],
      ['relationships', 'Track effects on both organisms',
        'Predation involves an organism capturing and eating prey. Competition happens when partners draw on a limited resource. In mutualism both species benefit. In commensalism one benefits and the other is largely unaffected. In parasitism a parasite benefits while its host is harmed. A keystone species has an unusually large effect on the ecosystem.',
        'A tick obtains food from a host and harms or irritates it, so the example is parasitism. In the Yellowstone example, losing wolves changed predation pressure and affected elk and vegetation. Follow the chain of effects before drawing a conclusion.'],
      ['invasion', 'Use evidence about Tennessee invasive species',
        'A native species occurs naturally in an area. A nonnative species comes from elsewhere. An invasive species is nonnative and causes or is likely to cause harm. Look for evidence of the effect and a way people can reduce its spread.',
        'Feral hogs in Tennessee can disturb soil and vegetation when they root for food. A field report that shows damaged plants or erosion gives evidence of harm. Bringing a plant or animal into a new area alone establishes that it was introduced.']
    ],
    practice: ['Open all three 42-question Ecology tests', CURRENT_ECOLOGY + '#practice']
  },
  biomes: {
    title: 'Start the Biomes unit',
    sourceScope: 'Land Biomes slides and the Week 14 class agenda. Marine, freshwater and vocabulary are also available for later review.',
    readings: [
      ["Biomes · reading and notebook practice",null,"A biome groups places with similar climate and typical life. Make three notebook columns for climate, plants and animals. Compare a tropical rainforest, a temperate deciduous forest and taiga. Start with temperature and precipitation. Then explain how a plant’s features fit those conditions. Broad leaves can collect light in a warm, wet forest. In a seasonal forest, many trees drop their leaves before winter. Needle-shaped leaves help many taiga trees conserve water when liquid water is harder to get."],
      ["Land and aquatic lessons, vocabulary cards and quiz board","curriculum-2026-11/classroom-practice.html#biomes","Compare forests, grasslands, deserts, tundra, saltwater and freshwater. Try recalling the definitions before you turn each card."],
      ["Read a climate pattern",null,"Place A stays warm year-round and gets heavy rain in most months. Place B has cold winters and warmer summers. It receives rain in summer and snow in winter. Which clue best separates A from B? Both get precipitation. The temperature pattern tells you that A is warm all year while B has strong seasons. Use temperature and precipitation together when choosing a biome."]
    ],
    sections: [
      ['climate', 'Read climate clues on a map or climograph',
        'A biome is a large region with typical climate and living things. Weather can change today, while climate describes patterns over many years. A climograph shows temperature and precipitation by month. Check the axes, units and seasons. Temperature, water, latitude and elevation can help explain why particular plants and animals live there.',
        'A graph that stays warm year-round but receives very little rain points to a desert. A graph with similar temperatures and frequent heavy rain supports a tropical rainforest. Use at least two clues before deciding.'],
      ['forests', 'Compare the classroom forest examples',
        'Temperate deciduous forests have seasons and many trees that shed their leaves. Coniferous forests have many cone-bearing trees. Taiga is a cold northern coniferous forest. Tropical rainforests are warm and wet and have high biodiversity. Temperate rainforests can be very wet and cooler. In a tropical rainforest, the canopy and forest floor get different amounts of light.',
        'A northern forest with long cold winters and cone-bearing spruce fits taiga. Warm temperatures, frequent rain and a dense canopy suggest a tropical rainforest. Look for the temperature pattern before choosing between tropical and temperate rainforest.'],
      ['open-land', 'Tell grasslands, deserts and tundra apart',
        'Temperate grasslands are dominated by grasses. Fire, drought and grazing can restrict tree growth. A savanna has scattered trees and clear wet and dry seasons. Deserts have very low precipitation, and can be hot or cold. Polar tundra occurs near the poles and often has permafrost. Alpine tundra occurs high above the tree line.',
        'Deep grass roots can reach water in a savanna dry season. A desert plant may collect brief rainfall with wide shallow roots and slow water loss with a waxy coat. A treeless mountaintop above the tree line can be alpine tundra even far from a pole.'],
      ['water', 'Preview marine and freshwater ecosystems',
        'Light, temperature, depth, water speed and salinity help explain water habitats. Marine water is salty. In an estuary, river water mixes with seawater. Photosynthetic plankton can support food webs in places with light. In fast freshwater some organisms attach to rocks. Marshes have mostly soft-stemmed plants and swamps have mostly woody plants. Wetlands can hold floodwater.',
        'If a river meets a coast and salinity changes with tides, the site is an estuary. If a freshwater stream moves quickly, rock-attaching algae can stay in place. Those different adaptations make sense only when you describe the local conditions.']
    ],
    practice: ['Biomes practice forms', '#check/biomes']
  },
  india: {
    title: 'How geography shaped Ancient India',
    sourceScope: 'The Nov. 13 newsletter introduces India. This lesson uses the WCS OER geography and early settlement sections, pp. 162–169.',
    readings: [
      ["Ancient India · geography reading",null,"Picture north at the top. The Himalayas sit above the northern plains. The Indus lies toward the northwest and flows toward the Arabian Sea. Farther east, the Ganges crosses the northern plains and its river system reaches the Bay of Bengal. The Indian Ocean lies south of the subcontinent. Rivers bring water for crops and floods can leave fertile silt. Summer monsoon winds bring moist air from the ocean and rain to many farming regions. Too much rain can flood fields and too little can reduce harvests."],
      ["Early cities · read the archaeological evidence",null,"Harappa and Mohenjo-Daro were major Indus civilization cities. Archaeologists found planned streets, wells, drains and baked bricks of regular sizes. These finds suggest people coordinated construction. Standard weights helped people measure goods. Seals and goods found far from the Indus give clues about contact with other regions. The writing on the seals remains undeciphered, so archaeologists use objects and buildings to build explanations they can check."],
      ["Ancient Egypt project deadline",null,"The class project is due Wednesday, Dec. 2. Use the teacher’s project directions for the required format and submission."]
    ],
    sections: [
      ['map', 'Locate the main land and water features',
        'A subcontinent is a large part of a continent separated in part by physical features. When you sketch the region, start with the Himalayas along the northern edge and the Indian Ocean to the south. Find the Indus River in the northwest of the subcontinent and the Ganges farther east across the northern plains. Follow the Indus toward the Arabian Sea and the Ganges system toward the Bay of Bengal.',
        'To check a map clue such as “a river system east of the Indus,” begin at the Himalayas, look across the northern plain to the east, then trace the Ganges toward the Bay of Bengal. India and Pakistan are modern countries and ancient cities can fall on either side of present-day borders.'],
      ['rivers', 'Connect a physical feature to farming and settlement',
        'A plain is a broad area of mostly flat land. A river system includes its main river and streams that flow into it. Snow and ice melt help feed major South Asian rivers. Floods can spread fine sediment called silt, helping make soil fertile. Extra food, or surplus, can support growing settlements, trade and specialized jobs.',
        'Early people farmed along the Indus and established large cities there. The Ganges watered another broad region of fertile farmland farther east. Pair one geographical feature with evidence for its effect on where people settled.'],
      ['monsoon', 'Explain the importance of seasonal winds',
        'A monsoon is a seasonal change in winds. Moist summer winds blowing from over the ocean bring much of the rain that farmers need. The winter pattern is typically drier. Rain can help crops grow, while too little rain can cause drought and unusually heavy rain can flood fields and settlements.',
        'A farmer can plan planting around the wetter season. A late monsoon may leave soil too dry to plant on time. Connect the wind direction to rainfall and then to farming to explain the entire chain.'],
      ['cities', 'Read the evidence from Harappa and Mohenjo-Daro',
        'Harappa and Mohenjo-Daro were major cities of the Indus, or Harappan, civilization in what is now Pakistan. Archaeologists found straight streets set out in grids, buildings made with uniform bricks, wells, drains and sewers. Wheat, barley and cotton are examples of crops. Standard weights and seals found through trade help explain how far goods moved.',
        'Brick drains and planned streets are evidence of shared construction and coordination. An Indus seal found in Mesopotamia supports trade or contact. The undeciphered Indus script leaves questions about rulers and beliefs open. Scholars study several explanations for decline and one object alone cannot settle them.']
    ],
    practice: ['Ancient India geography and early settlements practice forms', '#check/india']
  },
  mime: {
    title: 'Tell a story with movement and music',
    sourceScope: 'Music for Mimes classroom playlist and an original pantomime rehearsal.',
    readings: [
      ["Music for Mimes · rehearsal you can do here",null,"Tap four slow, even beats, then give two quick claps and pause. Repeat the pattern while a partner mimes lifting a heavy box. On the slow beats, they reach, grip and lift. The quick claps cue the box slipping. The pause gives them time to freeze and show surprise. Switch roles and change the cue. Ask your partner to tell you what happened before you explain the scene."],
      ["Movement, sound and expression",null,"Tempo is the speed of the beat. Dynamics describe how loud or soft a sound is. A cue is a signal to change what you do. Try the same scene with a softer clap and a faster beat. Keep the imaginary box the same size and show how the character reacts through posture, face and movement."]
    ],
    sections: [
      ['gesture', 'Give your invisible object a place and a size',
        'Pantomime communicates a situation through gesture, movement and facial expression. Decide where the object is in space, how big it is and what its weight feels like. Keep the grip and location consistent. The audience can infer what is happening from the same clues appearing again.',
        'Mime opening a drawer at waist height. Look at the handle, reach, shape your grip, pull, and push it closed at the same spot. Brace your feet and slow your movement if the drawer sticks.'],
      ['cue', 'Connect a movement change to a music cue',
        'Tempo is the pace of the music. Dynamics are changes in loudness. A cue is something you hear or see that tells you when to act. Listen for a clear change, then choose a deliberate movement change at that point. Make the reaction big enough to read from across the room.',
        'On a sharp repeated musical phrase, show two quick tugs at a stuck suitcase. When the phrase changes, pause, shift your weight and show surprise as it opens.'],
      ['sequence', 'Rehearse a beginning, middle and end',
        'Start by showing an object and a goal. Add one clear problem and reaction. End by showing what happened to the object. Ask a viewer what they saw before telling them your plan, then adjust the cue, expression or action they missed.',
        'Set an imaginary bag on a shelf, notice it slipping, then catch it and put it back in a steadier place. Keep the shelf the same height. Pause after the catch so the audience has time to see the result.']
    ],
    practice: ['Music for Mimes rehearsal checks', '#check/mime']
  }
};

const QUIZ_TOPICS = ['essay', 'expressions', 'biomes', 'india', 'mime'];

for (const [id, lesson] of Object.entries(WEEK_TOPICS)) {
  lesson.audio = 'rebuild/audio/nov16/' + id + '.mp3';
}
