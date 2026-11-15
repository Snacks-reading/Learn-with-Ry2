'use strict';

function practiceSkill(id, label, section, variants) {
  return {id, label, section, variants};
}

const ESSAY_SKILLS = [
  practiceSkill('purpose', 'Follow the writing prompt', 'purpose', [
    ['A prompt says, “Explain how two design choices help a shelter stay warm.” What belongs on the checklist?', 'Identify two choices and explain how each helps|Tell the story of a cold night|Argue that all shelters should look alike|List two choices without explaining them', 'The task word explain asks for the connection between each design choice and warmth.'],
    ['A prompt asks how a wetland protects a town using two articles. What is the best plan?', 'Choose useful evidence from both articles and explain how it supports the answer|Summarize only the shorter article|List facts from both texts with no link to the town|Tell a story about visiting a wetland', 'Use evidence from both sources and connect it to the specific topic.'],
    ['A prompt asks you to explain how to train a dog to wait at a door. How should you organize the explanation?', 'Put the steps in an order a reader can follow|Start with the last step and omit the first|Repeat the most impressive step in every paragraph|Organize by the length of each instruction', 'The order matters in an explanation of a process.'],
    ['A prompt says, “Describe two ways crows solve problems.” Which plan answers the whole prompt?', 'Give one example and explanation for each of two ways|Describe two kinds of crows without their behavior|Report everything you know about feathers|Choose one solution and give its name twice', 'The checklist needs two different ways and a description of how each works.']
  ]),
  practiceSkill('introduction', 'Distinguish hook and background', 'intro', [
    ['An essay opens with an interesting fact, names the article and what it studied, then gives its main answer. Which part provides background?', 'Naming the article and its subject|Giving the interesting fact alone|Giving the main answer|Explaining a concrete detail near the end', 'Background connects the hook to the thesis and tells the reader what source is being used.'],
    ['Which line gives useful background for an essay on a robot fish?', 'In “A Robot Beneath the Waves,” engineers describe a fish-shaped robot for observing ocean life.|Imagine slipping through the ocean as quietly as a fish.|The robot’s tail and camera help it observe wildlife.|A flexible tail pushes the robot through the water.', 'This sentence names the article and briefly explains what it covers.'],
    ['Which first line would work as a hook for an essay about how footbridges protect a stream?', 'A few steps above the water can make a big difference to the life below.|“Crossing Willow Creek” is the source for this essay.|Raised paths prevent trampling and reduce erosion.|One test found less loose soil downstream.', 'The first sentence invites curiosity while staying on the subject.'],
    ['You already have a hook and a thesis. What belongs between them?', 'A brief bridge that names the source and summarizes relevant information|A later paragraph’s final conclusion|A list of every word in the reading|An unrelated story about your morning', 'The background gives readers enough context to follow the thesis.']
  ]),
  practiceSkill('thesis', 'Write a one-sentence thesis', 'intro', [
    ['Which thesis answers “How do sea otters stay warm?” and gives two body paragraph topics?', 'Sea otters stay warm with dense fur and frequent grooming.|Sea otters live near rocky coasts.|In this essay I will tell you about otters.|Sea otters have dense fur, but other mammals are interesting too.', 'The thesis directly answers how and previews fur and grooming.'],
    ['The prompt asks how a garden helps pollinators. Which line works best as its thesis?', 'A garden helps pollinators by offering flowers for food and sheltered places to rest.|Gardens are great, and I have a garden.|A garden has soil and paths.|Have you ever seen a bee?', 'The thesis gives one answer and two specific points to develop.'],
    ['Where should the one-sentence thesis go in this classroom essay structure?', 'At the end of the introduction|In place of the hook|At the start of the second body paragraph|Only after the conclusion', 'The introduction builds from hook and background to the essay’s main answer.'],
    ['Which thesis sets up two body paragraphs for a prompt about how more library hours help students?', 'Longer hours give students more time to read and a quiet place to finish assignments.|The library is open longer, which is nice.|Today I will discuss school.|Books and due dates are common at libraries.', 'The sentence answers how and gives two focused points to explain.']
  ]),
  practiceSkill('evidence', 'Choose concrete details and cite the source', 'evidence', [
    ['Which line is a concrete detail supporting the point that elephants comforted others through touch?', 'The article reports that bystanders sometimes touched an upset elephant near the mouth with their trunks.|The elephants seem kind.|The behavior tells us something important.|All animals must comfort others in the same way.', 'This detail names an action the researchers actually observed.'],
    ['A paragraph explains how a footbridge protects streambanks. Which detail is most relevant?', 'The park report counted fewer crushed plants after the bridge opened.|The bridge was painted gray.|The path has a popular picnic spot.|People like outdoor activities.', 'Fewer crushed plants is specific evidence of less damage along the banks.'],
    ['A class article describes a robot’s flexible tail. Which is a useful way to include that evidence?', 'According to the article, the tail bends from side to side to move the robot forward.|Everyone believes the robot has the best tail.|The tail is cool and does a lot.|That robot seems exactly the same as a real fish.', 'The sentence names the source and paraphrases a specific detail.'],
    ['Which detail supports a paragraph about elephants using sound to reassure herd mates?', 'The study describes nearby elephants chirping or rumbling after another elephant showed distress.|Asian elephants live in herds.|The report was published in a journal.|An elephant can be quite large.', 'Relevant evidence has to support the point about vocal reassurance.']
  ]),
  practiceSkill('body', 'Give a body paragraph one clear job', 'commentary', [
    ['What is the strongest topic sentence for a paragraph about one way elephants comforted herd mates?', 'The elephants used gentle touch to respond to a herd mate’s distress.|My paragraph is about elephants.|Researchers saw one elephant touch another near the mouth.|Have you ever heard an elephant rumble?', 'A topic sentence states the paragraph’s main point without jumping straight to a detail.'],
    ['Which order follows the body paragraph structure in the notes?', 'Topic sentence, concrete detail, commentary, wrap-up|Concrete detail, hook, thesis, commentary|Commentary, background, hook, title|Wrap-up, new source, hook, thesis', 'State the point, provide evidence, explain it and connect back to the thesis.'],
    ['In the classroom color code, what do the red and green sentences do?', 'Red gives evidence and green explains its significance|Red repeats the thesis and green names the article|Red gives commentary and green supplies a hook|Red ends the essay and green starts an unrelated point', 'Red marks the concrete detail. Green marks what the writer thinks it shows.'],
    ['Which ending best wraps up a body paragraph about restoring shade beside a creek?', 'Together, these shade effects explain how planting trees can protect the creek’s habitat.|A second city also has three public pools.|My essay will now start.|A beaver builds a lodge from sticks.', 'A wrap-up returns to this paragraph’s claim and connects it to the thesis.']
  ]),
  practiceSkill('reasoning', 'Explain what the evidence shows', 'commentary', [
    ['Evidence: A bystander reached out with its trunk after another elephant showed distress. Which line is commentary?', 'The timing and gentle touch suggest the bystander was responding to the other elephant’s distress.|The elephant reached out with its trunk.|The article describes trunk contact.|In the next paragraph, I will talk about chirps.', 'Commentary explains the link between the behavior and the paragraph’s point.'],
    ['Evidence: Water under shaded banks was cooler in the park’s study. Which sentence explains why it matters?', 'The comparison suggests shade helps keep stream water cooler for animals that depend on it.|The park studied some water.|The water was cooler under the trees.|A study was done in a park.', 'The reasoning connects a measured difference to the claim.'],
    ['Which line keeps an explanation within the evidence?', 'The observations suggest the captive Asian elephants in the study sometimes responded to distressed herd mates.|The study proves every elephant knows how every other one feels.|All large mammals show empathy in the same way.|Every reassuring touch always ends distress.', 'Measured language fits a study of a specific group and the behavior researchers observed.'],
    ['An article says a bystander chirped just after another elephant trumpeted in distress. What commentary fits?', 'The order of the calls suggests the chirp was a response to the distress signal.|The elephant chirped and another trumpeted.|Chirps are sounds.|The article has a second page.', 'Reasoning explains what the sequence of actions suggests.']
  ]),
  practiceSkill('conclusion', 'Restate both points and explain significance', 'conclusion', [
    ['An essay explains how elephants use gentle contact and sounds to reassure others. Which conclusion fits?', 'Touch and vocal signals both gave researchers clues about how elephants respond to distress. These clues help us understand social animals.|The next step is to add a new example about crocodiles.|This essay had an intro and two middle paragraphs.|Elephants are good, and that is all.', 'A conclusion returns to both points in new words and explains their larger significance.'],
    ['What needs revision in a conclusion that repeats the thesis word for word and adds a new statistic?', 'Restate both points in fresh words, move evidence to the body, and explain why the topic matters|Replace it with a new hook and leave both points out|Keep the new statistic and double its number|Rewrite the conclusion as a question with no answer', 'The conclusion completes the existing explanation. The evidence belongs in the body.'],
    ['A thesis says native plants help birds with food and shelter. Which line belongs at the end of the essay?', 'By feeding birds and offering places to hide, native plants help make a neighborhood livable for wildlife.|One more example uses a bird I have never mentioned.|Do native plants provide food and shelter?|The article starts with a description of grass.', 'A good ending pulls both points together and explains why they matter.'],
    ['Which edit makes a conclusion about a garden that saves water and cools a yard stronger?', 'Summarize both benefits in fresh language and explain why they matter to the people using the yard|Add a new body paragraph’s evidence to the last sentence|Keep only the water example and ignore cooling|Begin a story that takes place years later', 'The conclusion should reflect both thesis points and tie them to a larger purpose.']
  ])
];

const MATH_SKILLS = [
  practiceSkill('terms', 'Find terms, coefficients, constants, base and exponent', 'parts', [
    ['In 6x² − x + 9, which list gives the three terms?', '6x², −x, and 9|6, x², and x|6x², x, and −9|6x, x², and 9', 'The minus sign belongs to −x. The coefficient 6 is part of 6x².'],
    ['In 8k + 3k² − 10, which pair is the coefficient of k² and the constant?', '3 and −10|8 and 10|2 and −10|3 and 10', 'The coefficient of k² is 3. The sign stays with the constant −10.'],
    ['In 4 × y³, what are the base and exponent of y³?', 'Base y, exponent 3|Base 3, exponent y|Base 4, exponent 3|Base 4y, exponent 1', 'The power shows y as the repeated factor. The outside 4 is a multiplier.'],
    ['In 7a² + a − 6, what is the coefficient of a and the constant?', '1 and −6|0 and 6|7 and −6|2 and 6', 'An unwritten coefficient is 1, and the constant includes its minus sign.']
  ]),
  practiceSkill('translate', 'Translate and evaluate expressions', 'evaluate', [
    ['Which expression means five less than triple p?', '3p − 5|5 − 3p|3(p − 5)|5p − 3', 'Triple p is 3p. Five less than that starts with 3p and subtracts 5.'],
    ['What is 3(2 + a²) − 4 when a = 3?', '29|23|41|15', '3² is 9. Then 3(2 + 9) − 4 = 33 − 4 = 29.'],
    ['A club pays 4 dollars to rent a room and 2 dollars per member. What is the cost for 6 members?', '16 dollars|36 dollars|12 dollars|10 dollars', 'Use 4 + 2m and substitute m = 6.'],
    ['What is 24 ÷ 3 × 2 + 1?', '17|5|9|12', 'Division and multiplication go left to right. 24 ÷ 3 = 8, then 8 × 2 + 1 = 17.']
  ]),
  practiceSkill('order', 'Use commutative, associative and identity properties', 'properties', [
    ['Which property changes 6 + x to x + 6?', 'Commutative property of addition|Associative property of addition|Identity property of addition|Distributive property', 'The order of the same two terms changes.'],
    ['Which property changes (2 × 7) × x into 2 × (7 × x)?', 'Associative property of multiplication|Commutative property of multiplication|Identity property of multiplication|Distributive property', 'The three factors stay in order. Only the grouping changes.'],
    ['Which pair shows the multiplicative identity?', '5n × 1 and 5n|5n × 0 and 5n|5n × 2 and 5n|5n + 1 and 5n', 'Multiplying by 1 keeps the value of any number.'],
    ['Which pair shows the additive identity?', 'x + 0 and x|x × 0 and x|x + 1 and x|0 − x and x', 'Adding 0 keeps the value of x.']
  ]),
  practiceSkill('expand', 'Distribute across every term', 'distribute', [
    ['Expand 5(2x + 3).', '10x + 15|10x + 3|7x + 15|10x + 8', 'Multiply 5 by both 2x and 3.'],
    ['Which expression is equivalent to 4(3y − 2)?', '12y − 8|12y − 2|7y − 8|12y + 8', 'Distribute 4 to 3y and to the negative term −2.'],
    ['Use the distributive property to calculate 8 × 2.5.', '20|16.5|24|18', 'Split 2.5 as 2 + 0.5. Then 8 × 2 + 8 × 0.5 = 16 + 4.'],
    ['Expand 6(x − 4).', '6x − 24|6x − 4|6x + 24|x − 24', 'The factor 6 multiplies x and −4.']
  ]),
  practiceSkill('factor', 'Factor using the greatest common factor', 'distribute', [
    ['Factor 12x + 18 using the greatest common factor.', '6(2x + 3)|3(4x + 6)|6(12x + 18)|2(6x + 18)', 'The GCF is 6. Divide the two terms by 6 to find 2x and 3.'],
    ['Which factors 24 + 36 using the greatest common factor?', '12(2 + 3)|6(4 + 6)|4(6 + 9)|12(1 + 3)', 'Twelve is the greatest whole number that divides both 24 and 36.'],
    ['Factor 21a − 14b using the greatest common factor.', '7(3a − 2b)|7(3a + 2b)|3(7a − 7b)|7(21a − 14b)', 'Seven divides both coefficients. Keep the sign before 2b.'],
    ['Which equals 15m + 25 and displays the greatest common factor?', '5(3m + 5)|3(5m + 5)|5(3m + 25)|5(15m + 5)', 'Five divides 15 and 25, leaving 3m and 5.']
  ]),
  practiceSkill('like', 'Combine like terms with signs and powers', 'combine', [
    ['Simplify 3x² + 4x + 2x² − x + 6.', '5x² + 3x + 6|8x² + 6|5x² + 5x + 6|5x² + 3x', 'Add the x² coefficients, subtract one x from four x, and keep the constant.'],
    ['Simplify 7a + 2b − 3a + b − 4.', '4a + 3b − 4|4a + 2b − 4|7a + 3b − 4|7ab − 4', 'The a terms combine to 4a. The b terms combine to 3b.'],
    ['Simplify ½x + ¼x + 6 − 2.', '¾x + 4|½x + 4|⅔x + 4|¾x + 8', 'One half is two fourths. Add another fourth to get ¾x and combine 6 − 2.'],
    ['Which terms can combine with −2m² in 4m + 7m² − 2m² + 5?', 'Only 7m²|Only 4m|7m² and 4m|Only 5', 'The part m² must match exactly. m has a different power.']
  ]),
  practiceSkill('equivalence', 'Prove or disprove equivalence', 'prove', [
    ['Which expression is equivalent to 2(3x + 5) + x for every x?', '7x + 10|6x + 6|7x + 5|6x + 10', 'Distribution gives 6x + 10 + x, which combines to 7x + 10.'],
    ['At x = 1, 4x + 1 and 2x + 3 both equal 5. Which choice correctly tests equivalence?', 'At x = 0, they give 1 and 3, so they are not equivalent.|They match once, so they are equivalent.|Both use x, so they are equivalent.|They cannot be compared without choosing a negative value.', 'One different result disproves equivalence. One matching result alone does not prove it.'],
    ['Which property shows that 0.4n + 0 and 0.4n are equivalent?', 'Identity property of addition|Commutative property of multiplication|Distributive property| Associative property of multiplication', 'Adding zero leaves the same value for every n.'],
    ['Which pair is equivalent for every x?', '3x + 6 and 3(x + 2)|3x + 2 and 3(x + 2)|3x + 6 and 6x + 3|3x + 6 and 3x × 6', 'Distribute 3 to both x and 2 to get 3x + 6.']
  ]),
  practiceSkill('several', 'Apply properties and combine across multiple groups', 'multi', [
    ['Simplify 2(x² + 3x) + 4x² + x + 5.', '6x² + 7x + 5|6x² + 4x + 5|2x² + 7x + 5|13x² + 5', 'Expand to 2x² + 6x, then combine the matching square and x terms.'],
    ['Simplify 5(2a + 1) + 3(a + 2) − a.', '12a + 11|13a + 11|12a + 3|8a + 11', 'Expansion gives 10a + 5 + 3a + 6 − a. Collect each type.'],
    ['Simplify ½(4x² + 6x) + ½x² + 1.', '2½x² + 3x + 1|2x² + 3½x + 1|4½x² + 3x + 1|2½x² + 6x + 1', 'The outside half gives 2x² + 3x, then add another half of x².'],
    ['Simplify 3(2m + 1) + 2(4m − 2).', '14m − 1|14m + 7|10m − 1|14m + 1', 'The expansions are 6m + 3 and 8m − 4. Their sum is 14m − 1.']
  ])
];

const INDIA_SKILLS = [
  practiceSkill('map', 'Locate the Himalayas, subcontinent and Indian Ocean', 'map', [
    ['On the WCS OER map, which feature forms a high barrier across the northern edge of the Indian subcontinent?', 'Himalayan Mountains|Indian Ocean|Ganges Plain|Arabian Sea', 'The Himalayas mark a northern boundary of the subcontinent.'],
    ['A map clue asks for the ocean south of the Indian subcontinent. Which label fits?', 'Indian Ocean|Arctic Ocean|Atlantic Ocean|Pacific Ocean', 'The Indian Ocean borders the region to the south.'],
    ['What makes the Indian subcontinent a subcontinent?', 'It is a large part of Asia partly separated by mountains and other features.|It is a small island far from Asia.|It is a name for one river.|It is a separate continent the size of Africa.', 'The mountains help distinguish a large region within the larger continent.'],
    ['Which pair correctly orients the classroom map from north to south?', 'Himalayas, then Indian Ocean|Indian Ocean, then Himalayas|Ganges delta, then Mount Everest|Arabian Sea, then Himalayas', 'The mountains are to the north and the Indian Ocean is to the south.']
  ]),
  practiceSkill('rivers', 'Locate the Indus and Ganges river systems', 'map', [
    ['Which river runs in the northwest of the Indian subcontinent toward the Arabian Sea?', 'Indus|Ganges|Nile|Euphrates', 'The Indus is the main river in the northwestern part of this region.'],
    ['Which river crosses the northern plains farther east than the Indus?', 'Ganges|Tigris|Nile|Indus', 'The Ganges system lies east of the Indus and drains toward the Bay of Bengal.'],
    ['What does a river system include?', 'A main river and the smaller waters that drain into it|Only the ocean where a river ends|Only the widest part of a river|Two rivers on different continents that never connect', 'A river system includes connected streams and tributaries as well as the main river.'],
    ['A map shows the Harappan cities in modern Pakistan. Which nearby river system helps explain their location?', 'Indus River system|Ganges River system|Nile River system|Yellow River system', 'The cities grew near the Indus or its tributaries.']
  ]),
  practiceSkill('farming', 'Connect the river environment to settlement', 'rivers', [
    ['How could river floods help farmers along the Indus?', 'Floods could leave nutrient-rich silt on the plain.|Floods could turn all farmland into mountains.|Floods could stop the flow of every tributary.|Floods could remove the need for water.', 'Deposited silt can help make the soil fertile.'],
    ['Which chain best explains how geography can support specialized jobs?', 'River water and fertile soil help grow surplus food, which can support nonfarm jobs.|Trade creates a mountain range, which stops all farming.|A decrease in food always creates more farming surplus.|Rich soil means every person must farm the same crop.', 'More food than a community immediately needs can support craftspeople and other specialists.'],
    ['Why could the broad Ganges Plain support agriculture?', 'It had river water and broad areas of fertile land.|It was covered by Himalayan glaciers year-round.|It had the driest ground in Asia.|It was surrounded by ocean on all sides.', 'A watered plain offers both space and water for crops.'],
    ['Which clue offers the strongest reason an early village grew near a river?', 'Its fields had water and fertile sediment that helped produce extra grain.|Its streets had no route to the river.|Its crops survived with no water at all.|Its people had never planted crops nearby.', 'Water and useful soil support farming and a dependable food supply.']
  ]),
  practiceSkill('monsoon', 'Use the monsoon pattern to explain farming', 'monsoon', [
    ['Why do summer monsoon winds matter to farmers?', 'They bring moisture from over the ocean to water crops.|They keep each river dry through the summer.|They push all farmers up into the Himalayas.|They block spring planting by freezing every field.', 'Moist winds produce the seasonal rain on which many farms depend.'],
    ['A summer monsoon arrives weeks late. What farm problem is most directly connected?', 'Soil can stay dry past the usual planting time.|The Himalayas drop in elevation.|The Indian Ocean stops receiving rivers.|Farms suddenly get more rain that month.', 'A delayed wet season can delay crop planting or reduce growth.'],
    ['A wet season brings much more rain than usual. Which prediction recognizes both benefits and risks?', 'Rain can water crops but too much can flood fields.|Rain prevents flooding in every location.|Rain always destroys every crop.|Rain makes other geographical features irrelevant.', 'Rainfall helps crops within limits, and excessive rainfall may cause floods.'],
    ['Which definition fits a monsoon?', 'A seasonal shift in winds associated with wetter and drier periods|A river that flows underground year-round|A single thunderstorm with no seasonal pattern|A mountain permanently covered by sand', 'Monsoon refers to the seasonal wind pattern and its related rainfall.']
  ]),
  practiceSkill('cities', 'Read evidence of Harappan city planning', 'cities', [
    ['Which evidence most directly supports the claim that Mohenjo-Daro had planned streets?', 'Many streets meet at right angles in a grid.|Archaeologists found one seed.|A river flowed nearby.|All ancient city names use the same language.', 'A repeated grid is evidence of coordinated layout.'],
    ['Which feature would most directly improve sanitation in Harappa?', 'Brick drains carrying wastewater away|A tall mountain far north of the city|A cotton field next to the river|A stone seal showing a symbol', 'Removing wastewater helps keep living areas cleaner.'],
    ['What do roads in a grid, uniform bricks and sewers together suggest?', 'Builders coordinated their work according to shared plans.|Each house used an entirely different plan and no one shared a route.|Farming was impossible near the cities.|The cities were built after modern cars arrived.', 'The shared patterns point to organization across many parts of the cities.'],
    ['Uniform bricks were found at more than one Indus city. What can researchers reasonably infer?', 'Builders used a shared or standardized brick size.|Researchers can now read every Indus inscription.|The bricks prove who governed both cities.|Farms in both cities grew only rice.', 'The bricks show standardization. They do not identify the rulers or explain the script.']
  ]),
  practiceSkill('trade', 'Use trade evidence and recognize its limits', 'cities', [
    ['An Indus-style seal was found in Mesopotamia. Which conclusion is best supported?', 'People or goods connected the regions through trade or contact.|The same ruler certainly controlled both places.|The seal alone explains why the Indus cities declined.|No merchants used the Indus River.', 'A traveling object is evidence of contact. It cannot establish the political or historical details alone.'],
    ['Why do historians use buildings, tools and seals to study the Indus cities?', 'The script remains undeciphered, so material evidence helps answer questions.|Historians have a complete written account from every merchant.|Drains always contain written laws.|Only oral stories can be examined by archaeologists.', 'Material evidence supports some conclusions while written meanings remain uncertain.'],
    ['Which claim is best supported by standardized weights from Indus sites?', 'People had a shared way to measure goods.|All goods were the same size.|The weights prove that every person did the same job.|People could trade only inside one city.', 'Standard weights can make it easier to compare and exchange amounts.'],
    ['Some finds point to floods, while other evidence suggests environmental changes. What should historians conclude about the decline?', 'Investigate several explanations and look for more evidence.|A single brick proves the exact cause.|Lack of a decoded text proves nothing happened.|Every city must have declined for one identical reason.', 'Several explanations are possible. The evidence has limits.']
  ])
];

const BIOME_SKILLS = [
  practiceSkill('climate', 'Use climate, weather and climographs', 'climate', [
    ['Which two measurements are most useful for comparing biomes on a climograph?', 'Temperature and precipitation|Wind direction and sunrise time|Soil color and star brightness|Ocean depth and latitude only', 'Monthly temperature and precipitation describe a region’s climate pattern.'],
    ['A town has one cold day in a generally warm place. Which statement is accurate?', 'The cold day describes weather. Long-term patterns describe climate.|One cold day changes the town’s biome immediately.|Climate means the coldest temperature on any single day.|Weather and climate always describe the same time span.', 'Climate measures patterns over years. Weather is what happens over shorter periods.'],
    ['Two regions are warm all year. One has frequent heavy rain. The other gets almost no rain. Which clue separates their likely biomes?', 'The amount of precipitation|The fact that both are warm|The month labels alone|A single afternoon temperature', 'Both are warm, so the rainfall pattern helps separate a rainforest from a desert.'],
    ['A climograph shows cool wet winters and mild summers. What should you check before naming the biome?', 'The graph’s units and monthly patterns, plus the usual vegetation|Only the largest number on either axis|Only the first and last letters of the title|The graph color used for January', 'Use temperature and water patterns plus an organism clue to narrow the biome.']
  ]),
  practiceSkill('three-forests', 'Compare deciduous, coniferous and tropical forest', 'forests', [
    ['A site has cold winters and many cone-bearing spruce trees. Which biome best fits?', 'Taiga or cold coniferous forest|Tropical rainforest|Hot desert|Savanna', 'Long cold winters and cone-bearing trees support taiga.'],
    ['Maples and oaks at a site drop their leaves each fall. The area has distinct seasons. Which biome is most likely?', 'Temperate deciduous forest|Polar tundra|Tropical rainforest|Marine biome', 'Deciduous trees shed their leaves seasonally.'],
    ['A warm wet forest has a dense canopy and many plant and animal species. Which biome fits best?', 'Tropical rainforest|Temperate grassland|Alpine tundra|Taiga', 'Warmth, rainfall, dense canopy and high biodiversity point to tropical rainforest.'],
    ['Both a tropical and a temperate rainforest get a lot of precipitation. What other evidence helps distinguish them?', 'The temperature pattern across the year|Whether one named animal is brown|Whether both places receive any rain|The length of the word rainforest', 'Tropical rainforests tend to stay warm. Temperate rainforests can be much cooler.']
  ]),
  practiceSkill('grassland', 'Compare temperate grassland and savanna', 'open-land', [
    ['Which description best fits a savanna?', 'Grasses, scattered trees and a distinct wet and dry season|A treeless polar region with permafrost|A saltwater habitat with tides|A forest with dense canopy at all levels', 'A savanna is a tropical grassland with scattered trees and seasonal rainfall.'],
    ['Which combination can help limit tree growth in a temperate grassland?', 'Drought, grazing and fire|Deep seawater and tides|A thick forest canopy and coral|Year-round permafrost in every soil layer', 'These pressures can favor grasses that regrow after dry or disturbed periods.'],
    ['How can deeper roots help some savanna grasses in a dry season?', 'They can reach moisture farther below the surface.|They make the weather rain every day.|They make the soil freeze permanently.|They stop every grazing animal from eating.', 'Roots can reach soil moisture that persists deeper underground.'],
    ['A warm grassy plain has a few trees and gets nearly all its rain in a specific season. What is the best choice?', 'Savanna|Temperate rainforest|Coniferous forest|Polar tundra', 'The combination of grasses, scattered trees and seasonal rain fits a savanna.']
  ]),
  practiceSkill('tundra-desert', 'Identify deserts and both types of tundra', 'open-land', [
    ['Which fact is shared by hot and cold deserts?', 'Very low precipitation|Year-round heat|A forest canopy that blocks sunlight|A normal summer with daily heavy rainfall', 'Dryness defines deserts. Some deserts are cold.'],
    ['A treeless area sits high on a mountain above the tree line and far from the poles. Which kind of tundra is it?', 'Alpine tundra|Polar tundra|Tropical grassland|Freshwater wetland', 'Elevation can create alpine tundra conditions.'],
    ['Permafrost lies beneath a thin layer that thaws in summer at a very high latitude. What biome clue does this provide?', 'Polar tundra|Temperate deciduous forest|Hot desert|Marine reef', 'Permafrost is common beneath the seasonally thawed layer in polar tundra.'],
    ['Why can a waxy coat help plants survive in a dry desert?', 'It slows water loss.|It raises the average rainfall.|It attracts ocean plankton.|It creates permafrost beneath the stem.', 'Water conservation is useful when precipitation is scarce.']
  ]),
  practiceSkill('water', 'Classify freshwater, marine and estuary habitats', 'water', [
    ['Rain-swollen river water mixes with seawater at its mouth. Which term fits?', 'Estuary|Polar tundra|Taiga|Desert spring', 'An estuary is a coastal place where freshwater and saltwater mix.'],
    ['How can some algae stay in a swift freshwater stream?', 'Attach to rocks|Depend on the tide to hold them|Grow only in salty water|Avoid all contact with rock surfaces', 'Attachment helps resist the moving water.'],
    ['Which clue identifies a swamp rather than a marsh?', 'Mostly trees and other woody plants|Only shallow salt water|Mostly soft grasses and sedges|No standing moisture at any time', 'Swamps tend to be woody, while marshes tend to have soft-stemmed plants.'],
    ['Which factor helps explain why photosynthetic plankton are often abundant near the surface?', 'More sunlight reaches that layer.|No water is present there.|Only that layer contains minerals.|All organisms avoid every surface layer.', 'Photosynthesis uses light, which usually decreases with depth.']
  ])
];

const MIME_SKILLS = [
  practiceSkill('gesture', 'Keep an imaginary object consistent', 'gesture', [
    ['In a mime scene, a drawer’s handle starts at waist height. What makes the drawer clear when you close it?', 'Return your hand to the same waist-height position|Close it from above your shoulder with no change in the scene|Look away and wave both hands|Move your hand through the front of the drawer', 'Consistent position lets viewers infer the same object is there.'],
    ['Which choice makes an imaginary wide box look wide?', 'Hold your hands the same wide distance apart while carrying it.|Let your hands drift together during the lift.|Point at the empty floor and stop.|Change the box’s size on every step.', 'Spacing communicates size when you maintain it.'],
    ['Which action gives the audience evidence that an imaginary case is heavy?', 'Brace your feet and lift with slow, deliberate effort.|Lift with one light finger and no change in posture.|Move through it as if it were air.|Speak the word heavy without moving.', 'Posture and speed can show weight through movement.'],
    ['You set a large invisible book on a high shelf. What helps the audience see you take the same book back?', 'Reach to the same height with the same spacing between your hands.|Reach near your knee with fingers close together.|Face away and touch a lower shelf.|Change the hand placement without a story reason.', 'Consistent size and shelf height identify the book as the same object.']
  ]),
  practiceSkill('cue', 'Respond to a musical cue with movement', 'cue', [
    ['The music becomes faster as your character notices a problem. Which action makes the cue visible?', 'Switch from measured steps to quick, focused steps at the change.|Continue the same pace and expression throughout.|Stop before the music starts and remain still.|Ignore the music and turn around at a random point.', 'Changing pace with tempo makes the cue visible.'],
    ['What musical word means the pace of a piece?', 'Tempo|Dynamics|Gesture|Blocking', 'Tempo tells how fast or slowly music moves.'],
    ['When the music suddenly gets quieter, which response could make the change clear?', 'Shrink the gesture and lean in on the quiet cue.|Repeat the large sweeping move at the same intensity.|Stop paying attention to the sound.|Add dialogue at the same volume.', 'Changing movement size or energy can show a change in musical dynamics.'],
    ['The same loud beat repeats twice. Which plan can connect it to a stuck zipper?', 'Make two visible tugs, one with each beat.|Show both tugs after the end without connecting to the beats.|Walk away before the first beat.|Change the zipper’s height each time.', 'Matching repeated movement to the beat makes the cue easy to follow.']
  ]),
  practiceSkill('story', 'Build a beginning, complication and ending', 'sequence', [
    ['Which mime sequence has the clearest beginning, middle and end?', 'Lift a box, struggle with its stuck lid, and react when it finally opens.|Act surprised three times without introducing an object or problem.|Show a lid open, change objects and stop mid-gesture.|Start with the ending face and hold it throughout.', 'The sequence shows an object, a problem and a result.'],
    ['A viewer missed the moment the bag slipped. What revision makes that story beat easier to see?', 'Pause as the bag tilts, track it with your eyes, and then make a clear catch.|Delete the bag and keep the same ending.|Look away and move twice as fast.|Explain the slip to the audience before performing.', 'A pause, eye focus and a clear catch make the action readable without words.'],
    ['When should you ask a rehearsal viewer what they saw?', 'Before explaining your intended story|Only after telling them the correct answer|Before they watch any of the mime|Only after skipping the ending', 'An unprompted response shows whether the action communicated the intended story.'],
    ['How can a mime show a clear ending after rescuing an imaginary pet from under a chair?', 'Lift it carefully, settle it in your arms and visibly relax.|Continue reaching under the chair with no reaction.|Look in a different place and start another story.|Announce that the scene is finished while standing still.', 'A final action and reaction show what happened and that the problem is resolved.']
  ])
];

const WEEK_SKILLS = {
  essay: ESSAY_SKILLS,
  expressions: MATH_SKILLS,
  biomes: BIOME_SKILLS,
  india: INDIA_SKILLS,
  mime: MIME_SKILLS
};

const WEEK_WRITING = {
  essay: {
    prompt: 'Using the elephant article, write an explanatory essay about two ways the elephants responded to distress. Organize an introduction, two body paragraphs and a conclusion.',
    review: 'Check for a hook, named source and one-sentence two-point thesis. In both body paragraphs, look for a topic sentence, a concrete detail, reasoning and a wrap-up. Check that the conclusion restates both points and explains why the observations matter.'
  },
  expressions: {
    prompt: 'Show why 4(2m + 3) − m and 7m + 12 are equivalent. Then give one value of m that disproves equivalence between 7m + 12 and 8m + 11.',
    review: 'Explain distribution to both terms and show 8m + 12 − m = 7m + 12. For the second pair, m = 0 gives 12 and 11. One counterexample is enough. Other correct counterexamples also work.'
  }
};

const WEEK_RECALL = {
  essay: [
    ['purpose', 'A prompt says “Explain how a weather alert helps people prepare.” Which checklist fits?', 'Describe how the information leads to actions people take|Tell a story about your first rainy day|List weather words with definitions only|Choose a side in a debate about weather', 'Explain is a cue to show how the cause leads to a result.'],
    ['introduction', 'Which introduction part names the source and gives the reader context?', 'Background information|Topic sentence in body two|Concluding significance|Evidence commentary', 'Background links the hook to the one-sentence thesis.'],
    ['evidence', 'Which detail supports the claim that students used the new reading space after school?', 'The school counted 40 after-school visits in the first week.|The door was painted blue.|The space has a name on the map.|Some students ride a bus.', 'The count directly supports the claim of use after school.'],
    ['reasoning', 'Evidence shows people began carrying refill bottles after a fountain opened. Which line explains what the evidence suggests?', 'A convenient refill spot may have made reusable bottles easier to use.|The fountain opened and people had bottles.|One person had a silver bottle.|Fountains need pipes.', 'Reasoning shows the connection between the change and the behavior.'],
    ['conclusion', 'An essay explains how a community garden supplies fresh food and brings neighbors together. Which ending fits?', 'By providing produce and a place to work together, gardens can strengthen the local community.|Gardens require a fence that the essay never discussed.|The writer has a favorite gardening tool.|Some places have no gardens at all.', 'The ending returns to both ideas and explains their significance.']
  ],
  expressions: [
    ['like', 'Simplify 7x² + 4x − 3x² + x.', '4x² + 5x|9x²|10x² + 3x|4x² + 3x', 'Add square terms together and add the separate linear terms.'],
    ['factor', 'Factor 28x − 12 with the greatest common factor.', '4(7x − 3)|2(14x − 6)|4(28x − 3)|4(7x + 3)', 'The greatest factor shared by 28 and 12 is 4.'],
    ['order', 'What property lets you rewrite a + (7 + 2) as (a + 7) + 2?', 'Associative property|Commutative property|Identity property|Distributive property', 'The terms stay in the same order and their grouping changes.'],
    ['equivalence', 'Which input shows 5x + 4 and 4x + 5 are different?', 'x = 0|x = 1|Neither because both use x|No input can show a difference', 'At zero the first expression is 4 and the second is 5.'],
    ['several', 'Simplify 2(5p − 2) + ½(4p + 6).', '12p − 1|12p + 7|10p − 1|14p − 4', 'The expansions are 10p − 4 and 2p + 3.']
  ],
  india: [
    ['map', 'What major mountain range lies to the north of the Indian subcontinent?', 'Himalayas|Andes|Rockies|Alps', 'The Himalayas run along the northern edge of the subcontinent.'],
    ['rivers', 'Which river system drains the eastern part of the northern Indian plains toward the Bay of Bengal?', 'Ganges|Indus|Nile|Tigris', 'The Ganges is east of the Indus.'],
    ['monsoon', 'Crops need water as summer approaches. What happens when moisture-bearing monsoon winds arrive?', 'Rainfall usually increases.|Mountains become plains.|The Ganges becomes part of the Nile.|Winter starts in the middle of the region.', 'Moist winds bring much of the seasonal rain.'],
    ['cities', 'Which evidence makes it most reasonable to conclude that Harappan builders planned for wastewater?', 'Covered brick drains connected to houses|One broken clay seal|An empty field near a river|A straight wall with no channel', 'Connected drains can carry wastewater away from places where people live.'],
    ['trade', 'A scale and uniform weights appear in a market site. What can this find help explain?', 'How traders measured goods consistently|Which ruler built every city|The exact meaning of Indus writing|Why all rivers changed direction', 'Standardized weights support consistent measures for exchange.']
  ],
  biomes: [
    ['climate', 'What climate evidence helps distinguish a hot desert from a tropical rainforest?', 'Much less precipitation in the desert|Warm temperatures in both places|The month named on the graph|The possibility of sunny days in both', 'The amount of precipitation distinguishes the environments when both are warm.'],
    ['three-forests', 'Which trait supports identifying a forest as temperate deciduous?', 'Many trees lose leaves during a regular season.|All trees keep cone-shaped leaves permanently.|The trees always grow underwater.|The ground has year-round warmth and no seasons.', 'Seasonal leaf loss is characteristic of many temperate deciduous trees.'],
    ['grassland', 'In which land biome would scattered trees and tropical wet and dry seasons make sense together?', 'Savanna|Taiga|Polar tundra|Temperate rainforest', 'A savanna has grasses, scattered trees and seasonal rainfall.'],
    ['tundra-desert', 'Which evidence supports alpine tundra?', 'A cold high-elevation area above the tree line|Lowland warm forest with heavy rain|A tropical plain with tall grasses|A coast where river and ocean meet', 'High elevation can keep trees from growing.'],
    ['water', 'Which name fits a wetland dominated by soft-stemmed plants?', 'Marsh|Swamp|Coral reef|Taiga', 'A marsh is dominated by grasses and other soft-stemmed plants.']
  ],
  mime: [
    ['gesture', 'What change makes lifting an invisible rock look convincing?', 'Show a steady grip and a slow, effortful lift.|Lift it rapidly without touching it.|Keep the body relaxed and look away.|Hold hands at different object widths.', 'Grip, effort and pace can show weight without a real prop.'],
    ['cue', 'When a musical passage gets suddenly loud, which feature of the music changed?', 'Dynamics|Stage position|Object size|Plot order', 'Dynamics describe changes in loudness.'],
    ['story', 'The viewer understood the catch but missed what caused it. What should you change first?', 'Make the bag’s slip clearer before the catch.|Remove the catch and end immediately.|Begin by explaining the catch in words.|Make all movements smaller and faster.', 'Clarifying the problem makes the later reaction easier to follow.'],
    ['gesture', 'What makes an imaginary door believable from one action to the next?', 'The same handle location and a consistent swing|A new location every time you reach|Holding two different handle shapes for no reason|Looking at the floor the entire time', 'Keeping the spatial clues consistent supports the illusion.'],
    ['cue', 'How do you make a soft-to-loud musical change visible?', 'Change from a small careful gesture to a bold movement on the cue.|Change the pace only before any sound starts.|Keep your expression and movement the same.|Leave the space before the change.', 'Changing the movement quality on the cue links the scene to the sound.']
  ]
};

const WEEK_GUIDED = {
  essay: ['body', 'Your topic sentence explains one benefit of shade. Next, which move makes the paragraph stronger?', 'Give a source detail about shade and explain what the detail shows|Start a different paragraph on an unrelated benefit|Copy the hook again|Write the essay’s title as your only evidence', 'Build from your point to evidence to commentary.'],
  expressions: ['expand', 'What is the first step in simplifying 2(x + 4) + 3x?', 'Multiply both terms in parentheses by 2|Add 4 to 3x first|Change x to x²|Multiply only x by 2', 'Distribution expands the group before you combine the x terms.'],
  india: ['farming', 'A river leaves fine, fertile sediment on a plain. Which step connects the physical feature to settlement?', 'Farmers can grow more food and support additional occupations.|The plain becomes a mountain.|The presence of the river rules out trade.|Settlers stop growing crops.', 'Fertile soil can produce a surplus that supports larger settlements.'],
  biomes: ['climate', 'Two climates both have warm temperatures. One has very little rain. Which clue helps you name its biome?', 'Low precipitation suggests a desert.|Warmth alone proves rainforest.|The word climate means all places are identical.|A single rainy day proves freshwater.', 'Use temperature together with precipitation to distinguish biomes.'],
  mime: ['story', 'You want a viewer to recognize that a drawer is stuck. Which action shows the problem?', 'Keep the drawer’s location steady and show a visible tug or change in effort.|Pull an imaginary handle at different heights quickly.|Stand still after touching the handle.|Say “This is a drawer” and leave.', 'Constant position and visible effort communicate resistance.']
};
