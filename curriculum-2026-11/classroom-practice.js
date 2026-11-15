'use strict';

const practiceSets = {
  egypt: {
    title: 'Ancient Egypt review',
    lesson: [
      'The Nile supplied water, fertile soil and a route for transport. A farming surplus helped support people with specialized jobs. Scribes recorded information, artisans made goods, and officials helped administer the kingdom.',
      'Egyptians worshipped many deities. Ra was associated with the sun, Ma’at with truth and order, Anubis with embalming, and Osiris with the afterlife. Mummification preserved the body. Tomb goods reflected beliefs about the next life.',
      'A cartouche enclosed a royal name. Khufu’s Great Pyramid is at Giza. Tutankhamun’s tomb is in the Valley of the Kings. These sites tell us about different periods and burial practices.'
    ],
    // Categories follow the classroom Egypt Jeopardy. Prompts and explanations are original.
    categories: {
      Geography: [
        ['Which river supported Egyptian farming?', 'The Nile', 'The Tigris', 'The Jordan', 'The Nile supplied water and left fertile silt after flooding.'],
        ['Why was Upper Egypt south of Lower Egypt?', 'It was upstream', 'It bordered the Mediterranean', 'It was farther downstream', 'The Nile flows north, so Upper Egypt was upriver.'],
        ['What helped farmers use river water beyond the riverbank?', 'Irrigation canals', 'Cartouches', 'Stone coffins', 'Canals directed river water to fields.']
      ],
      'Politics and economics': [
        ['Who ruled ancient Egypt as king?', 'The pharaoh', 'A scribe', 'An artisan', 'The pharaoh held political and religious authority.'],
        ['What lets a community support more full-time specialists?', 'A food surplus', 'Fewer harvests', 'Less irrigation', 'Extra food can feed people whose jobs are outside farming.'],
        ['A shipment brings gold from Nubia to Egypt. Which theme best fits?', 'Trade', 'Mummification', 'Hieroglyphic writing', 'Goods moving between regions are evidence of trade.']
      ],
      Religion: [
        ['Which word describes worshipping many gods?', 'Polytheism', 'Monotheism', 'Bureaucracy', 'Polytheism means belief in or worship of multiple gods.'],
        ['Which deity was associated with embalming?', 'Anubis', 'Ra', 'Thoth', 'Anubis was associated with embalming and care for the dead.'],
        ['Why might a tomb contain food and useful objects?', 'People expected the dead to need them in the afterlife', 'Scribes used them to measure the Nile', 'The objects were tools for digging canals', 'Tomb goods tell us what people thought the dead might need.']
      ],
      'Social classes': [
        ['Who kept written records?', 'Scribes', 'Embalmers', 'Farmers', 'Scribes were trained to write and record information.'],
        ['Which job best fits a person who makes pottery?', 'Artisan', 'Vizier', 'Scribe', 'An artisan makes goods using a specialized craft.'],
        ['What does a social pyramid represent?', 'How groups were ranked in society', 'The steps for constructing a tomb', 'The order of the Nile’s seasons', 'The tiers show different roles and levels of power.']
      ],
      'Inventions and arts': [
        ['What material made from a Nile plant served as a writing surface?', 'Papyrus', 'Granite', 'Linen', 'Papyrus sheets were made from the plant’s stalk.'],
        ['What does a cartouche identify?', 'A royal name', 'A boat route', 'The harvest season', 'The oval frame surrounds the royal name.'],
        ['Which site contains Tutankhamun’s tomb?', 'Valley of the Kings', 'Giza', 'Alexandria', 'Tutankhamun was buried in the Valley of the Kings. Khufu’s Great Pyramid is at Giza.']
      ]
    }
  },
  india: {
    title: 'Ancient India: rivers, mountains and climate',
    // WCS Ancient History OER, sections 7.1 and 7.2.
    lesson: [
      'The Himalayas form a major barrier north of the Indian subcontinent. The Indus and Ganges river systems cross broad plains. Early cities such as Harappa and Mohenjo-daro grew in the Indus region, where river water and fertile soil supported farming.',
      'A monsoon is a seasonal change in wind direction. Summer monsoon winds carry moist air inland. The rain helps crops grow, and unusually heavy rains can cause floods. Water supply helps explain where people settled and how they used the land.'
    ],
    categories: {
      'Geography and settlement': [
        ['What mountain range lies north of the Indian subcontinent?', 'Himalayas', 'Atlas Mountains', 'Zagros Mountains', 'The Himalayas form a natural barrier across the north.'],
        ['Why did the Indus floodplain support farming?', 'River floods deposited fertile silt', 'Mountain peaks blocked every flood', 'Dense forests covered all the farmland', 'Silt renewed the soil and river water supported crops.'],
        ['How did summer monsoons help farmers?', 'They brought rain for crops', 'They prevented all flooding', 'They brought dry air inland', 'Monsoon winds brought moist air, supporting agriculture.']
      ]
    }
  },
  biomes: {
    title: 'Land biomes and climate clues',
    lesson: [
      'A biome is a large region recognized by its climate and typical living things. One biome can contain many ecosystems. For example, a rainforest canopy and its forest floor receive different amounts of light.',
      'Compare both temperature and precipitation before naming a biome. Temperate deciduous trees drop their leaves seasonally. Many conifers have waxy needles and bear cones. Tropical rainforests stay warm and wet. Temperate rainforests can also be very wet, with cooler temperatures.',
      'High biodiversity means many kinds of organisms. In a tropical rainforest, many species live in the canopy. Plants can grow densely even where soil is poor because nutrients cycle rapidly through living and decaying material.'
    ],
    categories: {
      'Climate clues': [
        ['Which measurements should you compare first to identify a biome?', 'Temperature and precipitation', 'Longitude and elevation alone', 'Wind direction and moon phase', 'Temperature and precipitation describe the climate patterns that help distinguish biomes.'],
        ['A forest is very wet, cool, and has a short, drier summer. Which biome fits best?', 'Temperate rainforest', 'Tropical rainforest', 'Tropical desert', 'Cool temperatures plus heavy precipitation support a temperate rainforest.']
      ],
      'Plants and habitats': [
        ['Which forest has many trees that drop their broad leaves each fall?', 'Temperate deciduous forest', 'Tropical rainforest', 'Coniferous forest', 'Deciduous trees lose their leaves seasonally.'],
        ['Which leaf feature helps many conifers limit water loss?', 'A waxy coating on needles', 'Broad, thin leaves', 'Flowers that stay open all winter', 'Waxy needles help reduce water loss.'],
        ['What is the treetop layer of a rainforest called?', 'Canopy', 'Forest floor', 'Root zone', 'The canopy is the leafy upper layer formed by the crowns of trees.']
      ]
    }
  },
  expressions: {
    title: 'Expressions vocabulary and properties',
    lesson: [
      'A term is a part of an expression separated by addition or subtraction at the outer level. In 5x + 3 − 2x, the terms are 5x, 3 and −2x. The variable is x, the constant is 3, and 5 and −2 are coefficients. Like terms have the same variables raised to the same powers, so 5x − 2x simplifies to 3x.',
      'Commutative means switching order. Associative means changing grouping. Identity means adding 0 or multiplying by 1 leaves the value unchanged. Distributive means multiplying each term inside a group, as in 3(x + 2) = 3x + 6. Equivalent expressions have the same value for every allowed input.'
    ],
    categories: {
      Vocabulary: [
        ['In 7n − 4, what is the coefficient of n?', '7', '−4', 'n', 'The coefficient is the number multiplying the variable.'],
        ['Which expression simplifies to 6x + 2?', '4x + 2 + 2x', '4x + 2 + 2x²', '4x + 2x + 4', 'Add the coefficients of 4x and 2x and keep the constant 2.']
      ],
      Properties: [
        ['What property is shown by 3(x + 4) = 3x + 12?', 'Distributive', 'Commutative', 'Identity', 'The 3 multiplies both x and 4.'],
        ['Which expression illustrates the additive identity?', 'y + 0 = y', 'y + 2 = 2 + y', '(y + 1) + 2 = y + (1 + 2)', 'Adding zero leaves a value unchanged.']
      ]
    }
  },
  writing: {
    title: 'Parts of an explanatory essay',
    lesson: [
      'An introduction draws the reader in, gives enough background to understand the topic, and ends with a thesis that answers the prompt. A body paragraph makes a point, gives a concrete detail from the reading, and explains how that detail supports the point. That explanation is commentary. A conclusion restates the main idea in fresh words and explains why it matters.',
      'Thesis example: A school garden helps students learn how food grows and gives them a way to practice teamwork. A body paragraph could use a detail about teams measuring plant growth. Commentary would explain how measuring the same plants each week makes changes visible.'
    ],
    categories: {
      'Essay structure': [
        ['Which part of the introduction directly answers the writing prompt?', 'Thesis', 'Hook', 'Background sentence', 'A thesis tells the reader what the essay will explain.'],
        ['Which sentence provides commentary after a detail about measuring plants weekly?', 'Comparing the measurements helps students see growth over time.', 'Students measured the plants each Friday.', 'The garden has six beds.', 'Commentary explains how the evidence supports the point.'],
        ['What belongs in the conclusion?', 'A restatement of the main idea and why it matters', 'A new topic requiring several more paragraphs', 'A copy of the opening sentence', 'A conclusion brings the explanation together.']
      ]
    }
  }
};

const set = practiceSets[location.hash.slice(1)] || practiceSets.egypt;
const main = document.querySelector('main');
const add = (parent, tag, text) => {
  const node = document.createElement(tag);
  node.textContent = text;
  parent.append(node);
  return node;
};
const button = (parent, text, action) => {
  const control = add(parent, 'button', text);
  control.type = 'button';
  control.addEventListener('click', action);
  return control;
};
document.title = set.title + ' | Learn With Ry';
add(main, 'h1', set.title);
const lesson = add(main, 'section', '');
add(lesson, 'h2', 'Read the lesson');
set.lesson.forEach(paragraph => add(lesson, 'p', paragraph));
const cards = add(main, 'section', '');
add(cards, 'h2', 'Flash cards');
const questions = Object.values(set.categories).flat();
let card = 0;
const count = add(cards, 'p', '');
const prompt = add(cards, 'p', '');
const answer = add(cards, 'p', '');
answer.hidden = true;
const flip = button(cards, 'Show answer', () => {
  answer.hidden = !answer.hidden;
  flip.textContent = answer.hidden ? 'Show answer' : 'Hide answer';
});
const updateCard = () => {
  count.textContent = 'Card ' + (card + 1) + ' of ' + questions.length;
  prompt.textContent = questions[card][0];
  answer.textContent = questions[card][1] + '. ' + questions[card][4];
  answer.hidden = true;
  flip.textContent = 'Show answer';
};
button(cards, 'Previous card', () => { card = (card + questions.length - 1) % questions.length; updateCard(); });
button(cards, 'Next card', () => { card = (card + 1) % questions.length; updateCard(); });
updateCard();

const game = add(main, 'section', '');
add(game, 'h2', 'Quiz board');
let points = 0;
const score = add(game, 'p', 'Score: 0');
score.setAttribute('aria-live', 'polite');
const board = add(game, 'div', '');
board.className = 'board';
const dialog = add(game, 'dialog', '');
dialog.setAttribute('aria-label', 'Quiz question');
const tiles = [];
for (const [category, clues] of Object.entries(set.categories)) {
  const group = add(board, 'section', '');
  add(group, 'h3', category);
  clues.forEach(([question, correct, ...rest], index) => {
    const value = (index + 1) * 100;
    const tile = button(group, String(value), () => {
      dialog.replaceChildren();
      add(dialog, 'h3', question);
      const options = [correct, ...rest.slice(0, 2)];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const choices = add(dialog, 'div', '');
      const feedback = add(dialog, 'p', '');
      feedback.setAttribute('aria-live', 'polite');
      options.forEach(option => button(choices, option, () => {
        for (const choice of choices.children) choice.disabled = true;
        if (option === correct) points += value;
        score.textContent = 'Score: ' + points;
        feedback.textContent = (option === correct ? 'Correct. ' : 'Answer: ' + correct + '. ') + rest[2];
        tile.disabled = true;
        close.focus();
      }));
      const close = button(dialog, 'Back to board', () => dialog.close());
      dialog.showModal();
    });
    tile.setAttribute('aria-label', category + ', ' + value + ' points');
    tiles.push(tile);
  });
}
button(game, 'Reset board', () => {
  points = 0;
  score.textContent = 'Score: 0';
  tiles.forEach(tile => { tile.disabled = false; });
});
addEventListener('hashchange', () => location.reload());
