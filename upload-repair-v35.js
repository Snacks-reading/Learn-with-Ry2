/* Draft upload repairs. Not loaded in the live app until source and coverage gates pass. */
(function(){
const additions={
  "SS": [
    {
      "id": "ss_v35_egypt_map14",
      "title": "Ancient Egypt: all 14 teacher map locations",
      "src": "Uploaded teacher Find and Label On Ancient Egypt Map checklist; Evan-Moor EMC 3706 Pocket 1 map; geographic placements require final visual reference check",
      "teach": "The Nile flows north: Upper Egypt is southern and upstream; Lower Egypt is northern and downstream. Reconstruct a map by locating the Mediterranean to the north, Red Sea to the east, Sinai between its northern gulfs, and Nubia to the south. Locate cities and burial sites relative to the Nile and one another. The Western Sahara wording on the teacher sheet means the desert west of the Nile here.",
      "model": "Begin at the Nile Delta. Move south to Memphis, then farther upstream to Thebes. Giza lies west of the Nile near modern Cairo, while the Valley of the Kings is on the west bank opposite Thebes. Alexandria is on the Mediterranean coast.",
      "v": [
        [
          "Upper Egypt",
          "The southern, upstream Nile region; Thebes is in Upper Egypt."
        ],
        [
          "Lower Egypt",
          "The northern, downstream region around the Nile Delta."
        ],
        [
          "Nile Delta",
          "The branching river-mouth region at the Mediterranean Sea."
        ],
        [
          "Sinai Peninsula",
          "The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba."
        ],
        [
          "Western Sahara Desert",
          "On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa."
        ],
        [
          "Nubia",
          "The region south of Egypt along the Nile, with its own societies and political traditions."
        ],
        [
          "Mediterranean Sea",
          "The sea north of Egypt into which the Nile flows."
        ],
        [
          "Nile River",
          "The river flowing north through Egypt to the Mediterranean Sea."
        ],
        [
          "Red Sea",
          "The sea east of Egypt, south of the Sinai Peninsula."
        ],
        [
          "Memphis",
          "An ancient capital near the southern edge of the Nile Delta, south of modern Cairo."
        ],
        [
          "Thebes",
          "An ancient city in Upper Egypt, around modern Luxor."
        ],
        [
          "Alexandria",
          "A city on Egypt's Mediterranean coast at the western side of the delta."
        ],
        [
          "Pyramids at Giza",
          "A pyramid complex west of the Nile, near modern Cairo and north of Memphis."
        ],
        [
          "Valley of the Kings",
          "A royal burial area on the west bank of the Nile opposite ancient Thebes."
        ]
      ],
      "q": [
        [
          "Which description accurately explains Upper Egypt?",
          [
            "The southern, upstream Nile region; Thebes is in Upper Egypt.",
            "The northern, downstream region around the Nile Delta.",
            "The branching river-mouth region at the Mediterranean Sea.",
            "The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba."
          ],
          0,
          "Upper Egypt: The southern, upstream Nile region; Thebes is in Upper Egypt."
        ],
        [
          "Which description accurately explains Lower Egypt?",
          [
            "The branching river-mouth region at the Mediterranean Sea.",
            "The northern, downstream region around the Nile Delta.",
            "The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba.",
            "On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa."
          ],
          1,
          "Lower Egypt: The northern, downstream region around the Nile Delta."
        ],
        [
          "Which description accurately explains Nile Delta?",
          [
            "On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa.",
            "The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba.",
            "The branching river-mouth region at the Mediterranean Sea.",
            "The region south of Egypt along the Nile, with its own societies and political traditions."
          ],
          2,
          "Nile Delta: The branching river-mouth region at the Mediterranean Sea."
        ],
        [
          "Which description accurately explains Sinai Peninsula?",
          [
            "The sea north of Egypt into which the Nile flows.",
            "On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa.",
            "The region south of Egypt along the Nile, with its own societies and political traditions.",
            "The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba."
          ],
          3,
          "Sinai Peninsula: The triangular land east of the Nile Delta, between the Gulf of Suez and Gulf of Aqaba."
        ],
        [
          "Which description accurately explains Western Sahara Desert?",
          [
            "On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa.",
            "The region south of Egypt along the Nile, with its own societies and political traditions.",
            "The sea north of Egypt into which the Nile flows.",
            "The river flowing north through Egypt to the Mediterranean Sea."
          ],
          0,
          "Western Sahara Desert: On this teacher map: the desert west of the Nile. Do not confuse it with the modern Western Sahara territory in northwestern Africa."
        ],
        [
          "Which description accurately explains Nubia?",
          [
            "The sea north of Egypt into which the Nile flows.",
            "The region south of Egypt along the Nile, with its own societies and political traditions.",
            "The river flowing north through Egypt to the Mediterranean Sea.",
            "The sea east of Egypt, south of the Sinai Peninsula."
          ],
          1,
          "Nubia: The region south of Egypt along the Nile, with its own societies and political traditions."
        ],
        [
          "Which description accurately explains Mediterranean Sea?",
          [
            "The sea east of Egypt, south of the Sinai Peninsula.",
            "The river flowing north through Egypt to the Mediterranean Sea.",
            "The sea north of Egypt into which the Nile flows.",
            "An ancient capital near the southern edge of the Nile Delta, south of modern Cairo."
          ],
          2,
          "Mediterranean Sea: The sea north of Egypt into which the Nile flows."
        ],
        [
          "Which description accurately explains Nile River?",
          [
            "An ancient city in Upper Egypt, around modern Luxor.",
            "The sea east of Egypt, south of the Sinai Peninsula.",
            "An ancient capital near the southern edge of the Nile Delta, south of modern Cairo.",
            "The river flowing north through Egypt to the Mediterranean Sea."
          ],
          3,
          "Nile River: The river flowing north through Egypt to the Mediterranean Sea."
        ],
        [
          "Which description accurately explains Red Sea?",
          [
            "The sea east of Egypt, south of the Sinai Peninsula.",
            "An ancient capital near the southern edge of the Nile Delta, south of modern Cairo.",
            "An ancient city in Upper Egypt, around modern Luxor.",
            "A city on Egypt's Mediterranean coast at the western side of the delta."
          ],
          0,
          "Red Sea: The sea east of Egypt, south of the Sinai Peninsula."
        ],
        [
          "Which description accurately explains Memphis?",
          [
            "An ancient city in Upper Egypt, around modern Luxor.",
            "An ancient capital near the southern edge of the Nile Delta, south of modern Cairo.",
            "A city on Egypt's Mediterranean coast at the western side of the delta.",
            "A pyramid complex west of the Nile, near modern Cairo and north of Memphis."
          ],
          1,
          "Memphis: An ancient capital near the southern edge of the Nile Delta, south of modern Cairo."
        ],
        [
          "Which description accurately explains Thebes?",
          [
            "A pyramid complex west of the Nile, near modern Cairo and north of Memphis.",
            "A city on Egypt's Mediterranean coast at the western side of the delta.",
            "An ancient city in Upper Egypt, around modern Luxor.",
            "A royal burial area on the west bank of the Nile opposite ancient Thebes."
          ],
          2,
          "Thebes: An ancient city in Upper Egypt, around modern Luxor."
        ],
        [
          "Which description accurately explains Alexandria?",
          [
            "The southern, upstream Nile region; Thebes is in Upper Egypt.",
            "A pyramid complex west of the Nile, near modern Cairo and north of Memphis.",
            "A royal burial area on the west bank of the Nile opposite ancient Thebes.",
            "A city on Egypt's Mediterranean coast at the western side of the delta."
          ],
          3,
          "Alexandria: A city on Egypt's Mediterranean coast at the western side of the delta."
        ],
        [
          "Which description accurately explains Pyramids at Giza?",
          [
            "A pyramid complex west of the Nile, near modern Cairo and north of Memphis.",
            "A royal burial area on the west bank of the Nile opposite ancient Thebes.",
            "The southern, upstream Nile region; Thebes is in Upper Egypt.",
            "The northern, downstream region around the Nile Delta."
          ],
          0,
          "Pyramids at Giza: A pyramid complex west of the Nile, near modern Cairo and north of Memphis."
        ],
        [
          "Which description accurately explains Valley of the Kings?",
          [
            "The southern, upstream Nile region; Thebes is in Upper Egypt.",
            "A royal burial area on the west bank of the Nile opposite ancient Thebes.",
            "The northern, downstream region around the Nile Delta.",
            "The branching river-mouth region at the Mediterranean Sea."
          ],
          1,
          "Valley of the Kings: A royal burial area on the west bank of the Nile opposite ancient Thebes."
        ]
      ],
      "w": "On a blank outline label all 14 named features, use dots for cities and triangles for Giza and Valley of the Kings, add north and a Nile flow arrow. Explain why Upper Egypt is south. Repeat later with shuffled location prompts.",
      "connect": "Connect river direction to elevation rather than page position. Compare Egypt and Mesopotamia by locating river-supported farming while explaining that human irrigation work is still necessary.",
      "success": "Explain each idea, apply it to an unfamiliar example, and retrieve it later without notes. Practice completion alone does not establish readiness.",
      "delayedPrompt": "In a later session, close this lesson and reconstruct the key ideas with new examples. Preserve first attempts."
    },
    {
      "id": "ss_v35_egypt_vocab23",
      "title": "Ancient Egypt vocabulary: meanings and boundaries",
      "src": "Uploaded Egypt Vocabulary and Journals Through Time-Egypt vocabulary sheets; checked institutional definitions with unresolved source-specific wording flagged",
      "teach": "Build accurate meanings before recall. Distinguish a pharaoh from a dynasty, a mummy from mummification, a scribe from a writing system, and a papyrus plant from writing material. Menes and Narmer need a historical boundary: the traditional name and archaeological king should not be treated as certainly identical. Hatshepsut was a major female pharaoh, not the first female leader.",
      "model": "A pharaoh is an individual ruler; a dynasty is a succession of rulers from a family. A preserved body is a mummy; preserving it is mummification. An artifact supplies evidence but does not interpret itself.",
      "v": [
        [
          "delta",
          "Land formed by sediment deposited near a river's mouth."
        ],
        [
          "pharaoh",
          "An ancient Egyptian ruler with political and religious authority."
        ],
        [
          "dynasty",
          "A sequence of rulers belonging to the same family."
        ],
        [
          "mummy",
          "A body preserved after death."
        ],
        [
          "cataracts",
          "Rocky river rapids that can hinder navigation."
        ],
        [
          "social class",
          "A grouping associated with social position, status, or economic circumstances."
        ],
        [
          "occupation",
          "A person's work or job; it is not necessarily hereditary."
        ],
        [
          "bureaucracy",
          "A system of officials and offices that administer government."
        ],
        [
          "afterlife",
          "An existence believed to follow death."
        ],
        [
          "mummification",
          "The process of preserving a body after death."
        ],
        [
          "pyramids",
          "Monumental structures with sloping triangular faces; several served as royal tombs in Egypt."
        ],
        [
          "artifacts",
          "Objects made or modified by humans that provide evidence about the past."
        ],
        [
          "hieroglyphics",
          "An Egyptian writing system whose signs can represent sounds and meanings."
        ],
        [
          "papyrus",
          "A wetland plant, also the writing material made from its stems."
        ],
        [
          "Sphinx",
          "An Egyptian composite figure, commonly with a lion's body and a human head."
        ],
        [
          "cultural diffusion",
          "The spread of cultural ideas, practices, or technologies between groups."
        ],
        [
          "commerce",
          "The buying, selling, and exchange of goods and services."
        ],
        [
          "Menes",
          "A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain."
        ],
        [
          "Khufu",
          "An Old Kingdom pharaoh associated with the Great Pyramid at Giza."
        ],
        [
          "Hyksos",
          "Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period."
        ],
        [
          "Queen Hatshepsut",
          "An important female pharaoh known for major building projects and trade; not Egypt's first female leader."
        ],
        [
          "Tutankhamun",
          "A New Kingdom pharaoh whose largely intact tomb became famous after its discovery."
        ],
        [
          "Ramses the Great",
          "Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns."
        ]
      ],
      "q": [
        [
          "Which description accurately explains delta?",
          [
            "Land formed by sediment deposited near a river's mouth.",
            "An ancient Egyptian ruler with political and religious authority.",
            "A sequence of rulers belonging to the same family.",
            "A body preserved after death."
          ],
          0,
          "delta: Land formed by sediment deposited near a river's mouth."
        ],
        [
          "Which description accurately explains pharaoh?",
          [
            "A sequence of rulers belonging to the same family.",
            "An ancient Egyptian ruler with political and religious authority.",
            "A body preserved after death.",
            "Rocky river rapids that can hinder navigation."
          ],
          1,
          "pharaoh: An ancient Egyptian ruler with political and religious authority."
        ],
        [
          "Which description accurately explains dynasty?",
          [
            "Rocky river rapids that can hinder navigation.",
            "A body preserved after death.",
            "A sequence of rulers belonging to the same family.",
            "A grouping associated with social position, status, or economic circumstances."
          ],
          2,
          "dynasty: A sequence of rulers belonging to the same family."
        ],
        [
          "Which description accurately explains mummy?",
          [
            "A person's work or job; it is not necessarily hereditary.",
            "Rocky river rapids that can hinder navigation.",
            "A grouping associated with social position, status, or economic circumstances.",
            "A body preserved after death."
          ],
          3,
          "mummy: A body preserved after death."
        ],
        [
          "Which description accurately explains cataracts?",
          [
            "Rocky river rapids that can hinder navigation.",
            "A grouping associated with social position, status, or economic circumstances.",
            "A person's work or job; it is not necessarily hereditary.",
            "A system of officials and offices that administer government."
          ],
          0,
          "cataracts: Rocky river rapids that can hinder navigation."
        ],
        [
          "Which description accurately explains social class?",
          [
            "A person's work or job; it is not necessarily hereditary.",
            "A grouping associated with social position, status, or economic circumstances.",
            "A system of officials and offices that administer government.",
            "An existence believed to follow death."
          ],
          1,
          "social class: A grouping associated with social position, status, or economic circumstances."
        ],
        [
          "Which description accurately explains occupation?",
          [
            "An existence believed to follow death.",
            "A system of officials and offices that administer government.",
            "A person's work or job; it is not necessarily hereditary.",
            "The process of preserving a body after death."
          ],
          2,
          "occupation: A person's work or job; it is not necessarily hereditary."
        ],
        [
          "Which description accurately explains bureaucracy?",
          [
            "Monumental structures with sloping triangular faces; several served as royal tombs in Egypt.",
            "An existence believed to follow death.",
            "The process of preserving a body after death.",
            "A system of officials and offices that administer government."
          ],
          3,
          "bureaucracy: A system of officials and offices that administer government."
        ],
        [
          "Which description accurately explains afterlife?",
          [
            "An existence believed to follow death.",
            "The process of preserving a body after death.",
            "Monumental structures with sloping triangular faces; several served as royal tombs in Egypt.",
            "Objects made or modified by humans that provide evidence about the past."
          ],
          0,
          "afterlife: An existence believed to follow death."
        ],
        [
          "Which description accurately explains mummification?",
          [
            "Monumental structures with sloping triangular faces; several served as royal tombs in Egypt.",
            "The process of preserving a body after death.",
            "Objects made or modified by humans that provide evidence about the past.",
            "An Egyptian writing system whose signs can represent sounds and meanings."
          ],
          1,
          "mummification: The process of preserving a body after death."
        ],
        [
          "Which description accurately explains pyramids?",
          [
            "An Egyptian writing system whose signs can represent sounds and meanings.",
            "Objects made or modified by humans that provide evidence about the past.",
            "Monumental structures with sloping triangular faces; several served as royal tombs in Egypt.",
            "A wetland plant, also the writing material made from its stems."
          ],
          2,
          "pyramids: Monumental structures with sloping triangular faces; several served as royal tombs in Egypt."
        ],
        [
          "Which description accurately explains artifacts?",
          [
            "An Egyptian composite figure, commonly with a lion's body and a human head.",
            "An Egyptian writing system whose signs can represent sounds and meanings.",
            "A wetland plant, also the writing material made from its stems.",
            "Objects made or modified by humans that provide evidence about the past."
          ],
          3,
          "artifacts: Objects made or modified by humans that provide evidence about the past."
        ],
        [
          "Which description accurately explains hieroglyphics?",
          [
            "An Egyptian writing system whose signs can represent sounds and meanings.",
            "A wetland plant, also the writing material made from its stems.",
            "An Egyptian composite figure, commonly with a lion's body and a human head.",
            "The spread of cultural ideas, practices, or technologies between groups."
          ],
          0,
          "hieroglyphics: An Egyptian writing system whose signs can represent sounds and meanings."
        ],
        [
          "Which description accurately explains papyrus?",
          [
            "An Egyptian composite figure, commonly with a lion's body and a human head.",
            "A wetland plant, also the writing material made from its stems.",
            "The spread of cultural ideas, practices, or technologies between groups.",
            "The buying, selling, and exchange of goods and services."
          ],
          1,
          "papyrus: A wetland plant, also the writing material made from its stems."
        ],
        [
          "Which description accurately explains Sphinx?",
          [
            "The buying, selling, and exchange of goods and services.",
            "The spread of cultural ideas, practices, or technologies between groups.",
            "An Egyptian composite figure, commonly with a lion's body and a human head.",
            "A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain."
          ],
          2,
          "Sphinx: An Egyptian composite figure, commonly with a lion's body and a human head."
        ],
        [
          "Which description accurately explains cultural diffusion?",
          [
            "An Old Kingdom pharaoh associated with the Great Pyramid at Giza.",
            "The buying, selling, and exchange of goods and services.",
            "A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain.",
            "The spread of cultural ideas, practices, or technologies between groups."
          ],
          3,
          "cultural diffusion: The spread of cultural ideas, practices, or technologies between groups."
        ],
        [
          "Which description accurately explains commerce?",
          [
            "The buying, selling, and exchange of goods and services.",
            "A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain.",
            "An Old Kingdom pharaoh associated with the Great Pyramid at Giza.",
            "Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period."
          ],
          0,
          "commerce: The buying, selling, and exchange of goods and services."
        ],
        [
          "Which description accurately explains Menes?",
          [
            "An Old Kingdom pharaoh associated with the Great Pyramid at Giza.",
            "A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain.",
            "Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period.",
            "An important female pharaoh known for major building projects and trade; not Egypt's first female leader."
          ],
          1,
          "Menes: A traditional name for Egypt's first king; identification with Narmer or Aha is uncertain."
        ],
        [
          "Which description accurately explains Khufu?",
          [
            "An important female pharaoh known for major building projects and trade; not Egypt's first female leader.",
            "Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period.",
            "An Old Kingdom pharaoh associated with the Great Pyramid at Giza.",
            "A New Kingdom pharaoh whose largely intact tomb became famous after its discovery."
          ],
          2,
          "Khufu: An Old Kingdom pharaoh associated with the Great Pyramid at Giza."
        ],
        [
          "Which description accurately explains Hyksos?",
          [
            "Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns.",
            "An important female pharaoh known for major building projects and trade; not Egypt's first female leader.",
            "A New Kingdom pharaoh whose largely intact tomb became famous after its discovery.",
            "Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period."
          ],
          3,
          "Hyksos: Rulers of West Asian origin who controlled part of Egypt during the Second Intermediate Period."
        ],
        [
          "Which description accurately explains Queen Hatshepsut?",
          [
            "An important female pharaoh known for major building projects and trade; not Egypt's first female leader.",
            "A New Kingdom pharaoh whose largely intact tomb became famous after its discovery.",
            "Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns.",
            "Land formed by sediment deposited near a river's mouth."
          ],
          0,
          "Queen Hatshepsut: An important female pharaoh known for major building projects and trade; not Egypt's first female leader."
        ],
        [
          "Which description accurately explains Tutankhamun?",
          [
            "Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns.",
            "A New Kingdom pharaoh whose largely intact tomb became famous after its discovery.",
            "Land formed by sediment deposited near a river's mouth.",
            "An ancient Egyptian ruler with political and religious authority."
          ],
          1,
          "Tutankhamun: A New Kingdom pharaoh whose largely intact tomb became famous after its discovery."
        ],
        [
          "Which description accurately explains Ramses the Great?",
          [
            "An ancient Egyptian ruler with political and religious authority.",
            "Land formed by sediment deposited near a river's mouth.",
            "Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns.",
            "A sequence of rulers belonging to the same family."
          ],
          2,
          "Ramses the Great: Ramesses II, a long-reigning New Kingdom pharaoh known for monuments and military campaigns."
        ]
      ],
      "w": "Create six paired contrasts from this vocabulary. Use two terms to explain an original evidence-based Egypt scenario. Then retrieve all meanings without the list in a later session.",
      "connect": "Connect bureaucracy and commerce to prior civilization traits, identifying both the shared idea and Egypt-specific evidence.",
      "success": "Explain each idea, apply it to an unfamiliar example, and retrieve it later without notes. Practice completion alone does not establish readiness.",
      "delayedPrompt": "In a later session, close this lesson and reconstruct the key ideas with new examples. Preserve first attempts."
    }
  ],
  "SCI": [
    {
      "id": "science_v35_notes_environment",
      "title": "Environments and populations: repair the guided notes",
      "src": "Uploaded Environments and Populations Guided Notes, visible pages; handwritten answers independently checked; printed zebra and niche wording corrected",
      "teach": "An ecosystem includes biotic and abiotic components. Water and sunlight are abiotic. Soil contains minerals, water and air, but also organisms and dead organic matter: distinguish soil conditions from its biological contents. Photosynthesis uses light energy to make sugars; plants do not manufacture water. Different species have different resource needs. A niche is a role, not just a place. Competition depends on limited resources, not merely sharing a location. Zebras mainly graze; the worksheet's description of them as browsers is inaccurate.",
      "model": "In a dry garden, low water availability is an abiotic limiting factor. Two plants competing for the remaining water have a biotic interaction over an abiotic resource. In a one-square-kilometre habitat with 24 deer, density is 24 deer per square kilometre. Capacity may fall if sustained drought reduces available food.",
      "v": [
        [
          "ecosystem",
          "Interacting organisms and their nonliving surroundings."
        ],
        [
          "population",
          "Members of the same species in a particular area."
        ],
        [
          "photosynthesis",
          "Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis."
        ],
        [
          "irrigation",
          "Supplying water to soil or crops through a managed system."
        ],
        [
          "food web",
          "A model of connected feeding relationships."
        ],
        [
          "browser",
          "An animal that eats leaves and shoots of woody plants; giraffes are browsers."
        ],
        [
          "population density",
          "The number of individuals per unit area or volume."
        ],
        [
          "carrying capacity",
          "The population of a particular species an environment can sustain under specified resource conditions; it can change."
        ],
        [
          "marine",
          "Related to saltwater environments."
        ],
        [
          "freshwater",
          "Water environments with low salt concentration."
        ],
        [
          "terrestrial",
          "Related to land environments."
        ],
        [
          "abiotic factors",
          "Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition."
        ],
        [
          "biotic factors",
          "Organisms and their biological interactions; living and once-living material in the classroom classification."
        ],
        [
          "limiting factor",
          "A condition or resource that restricts population growth or survival."
        ],
        [
          "adaptation",
          "An inherited characteristic that can improve survival or reproduction in a particular environment."
        ],
        [
          "predator",
          "An organism that hunts and eats another organism."
        ],
        [
          "prey",
          "An organism hunted and eaten by a predator."
        ],
        [
          "competition",
          "Organisms using the same limited resource."
        ],
        [
          "niche",
          "An organism's ecological role, resource use, and relationships."
        ],
        [
          "interspecific competition",
          "Competition between members of different species."
        ],
        [
          "intraspecific competition",
          "Competition between members of the same species."
        ]
      ],
      "q": [
        [
          "Which description accurately explains ecosystem?",
          [
            "Interacting organisms and their nonliving surroundings.",
            "Members of the same species in a particular area.",
            "Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis.",
            "Supplying water to soil or crops through a managed system."
          ],
          0,
          "ecosystem: Interacting organisms and their nonliving surroundings."
        ],
        [
          "Which description accurately explains population?",
          [
            "Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis.",
            "Members of the same species in a particular area.",
            "Supplying water to soil or crops through a managed system.",
            "A model of connected feeding relationships."
          ],
          1,
          "population: Members of the same species in a particular area."
        ],
        [
          "Which description accurately explains photosynthesis?",
          [
            "A model of connected feeding relationships.",
            "Supplying water to soil or crops through a managed system.",
            "Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis.",
            "An animal that eats leaves and shoots of woody plants; giraffes are browsers."
          ],
          2,
          "photosynthesis: Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis."
        ],
        [
          "Which description accurately explains irrigation?",
          [
            "The number of individuals per unit area or volume.",
            "A model of connected feeding relationships.",
            "An animal that eats leaves and shoots of woody plants; giraffes are browsers.",
            "Supplying water to soil or crops through a managed system."
          ],
          3,
          "irrigation: Supplying water to soil or crops through a managed system."
        ],
        [
          "Which description accurately explains food web?",
          [
            "A model of connected feeding relationships.",
            "An animal that eats leaves and shoots of woody plants; giraffes are browsers.",
            "The number of individuals per unit area or volume.",
            "The population of a particular species an environment can sustain under specified resource conditions; it can change."
          ],
          0,
          "food web: A model of connected feeding relationships."
        ],
        [
          "Which description accurately explains browser?",
          [
            "The number of individuals per unit area or volume.",
            "An animal that eats leaves and shoots of woody plants; giraffes are browsers.",
            "The population of a particular species an environment can sustain under specified resource conditions; it can change.",
            "Related to saltwater environments."
          ],
          1,
          "browser: An animal that eats leaves and shoots of woody plants; giraffes are browsers."
        ],
        [
          "Which description accurately explains population density?",
          [
            "Related to saltwater environments.",
            "The population of a particular species an environment can sustain under specified resource conditions; it can change.",
            "The number of individuals per unit area or volume.",
            "Water environments with low salt concentration."
          ],
          2,
          "population density: The number of individuals per unit area or volume."
        ],
        [
          "Which description accurately explains carrying capacity?",
          [
            "Related to land environments.",
            "Related to saltwater environments.",
            "Water environments with low salt concentration.",
            "The population of a particular species an environment can sustain under specified resource conditions; it can change."
          ],
          3,
          "carrying capacity: The population of a particular species an environment can sustain under specified resource conditions; it can change."
        ],
        [
          "Which description accurately explains marine?",
          [
            "Related to saltwater environments.",
            "Water environments with low salt concentration.",
            "Related to land environments.",
            "Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition."
          ],
          0,
          "marine: Related to saltwater environments."
        ],
        [
          "Which description accurately explains freshwater?",
          [
            "Related to land environments.",
            "Water environments with low salt concentration.",
            "Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition.",
            "Organisms and their biological interactions; living and once-living material in the classroom classification."
          ],
          1,
          "freshwater: Water environments with low salt concentration."
        ],
        [
          "Which description accurately explains terrestrial?",
          [
            "Organisms and their biological interactions; living and once-living material in the classroom classification.",
            "Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition.",
            "Related to land environments.",
            "A condition or resource that restricts population growth or survival."
          ],
          2,
          "terrestrial: Related to land environments."
        ],
        [
          "Which description accurately explains abiotic factors?",
          [
            "An inherited characteristic that can improve survival or reproduction in a particular environment.",
            "Organisms and their biological interactions; living and once-living material in the classroom classification.",
            "A condition or resource that restricts population growth or survival.",
            "Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition."
          ],
          3,
          "abiotic factors: Nonliving physical and chemical conditions such as light, water, temperature, and mineral composition."
        ],
        [
          "Which description accurately explains biotic factors?",
          [
            "Organisms and their biological interactions; living and once-living material in the classroom classification.",
            "A condition or resource that restricts population growth or survival.",
            "An inherited characteristic that can improve survival or reproduction in a particular environment.",
            "An organism that hunts and eats another organism."
          ],
          0,
          "biotic factors: Organisms and their biological interactions; living and once-living material in the classroom classification."
        ],
        [
          "Which description accurately explains limiting factor?",
          [
            "An inherited characteristic that can improve survival or reproduction in a particular environment.",
            "A condition or resource that restricts population growth or survival.",
            "An organism that hunts and eats another organism.",
            "An organism hunted and eaten by a predator."
          ],
          1,
          "limiting factor: A condition or resource that restricts population growth or survival."
        ],
        [
          "Which description accurately explains adaptation?",
          [
            "An organism hunted and eaten by a predator.",
            "An organism that hunts and eats another organism.",
            "An inherited characteristic that can improve survival or reproduction in a particular environment.",
            "Organisms using the same limited resource."
          ],
          2,
          "adaptation: An inherited characteristic that can improve survival or reproduction in a particular environment."
        ],
        [
          "Which description accurately explains predator?",
          [
            "An organism's ecological role, resource use, and relationships.",
            "An organism hunted and eaten by a predator.",
            "Organisms using the same limited resource.",
            "An organism that hunts and eats another organism."
          ],
          3,
          "predator: An organism that hunts and eats another organism."
        ],
        [
          "Which description accurately explains prey?",
          [
            "An organism hunted and eaten by a predator.",
            "Organisms using the same limited resource.",
            "An organism's ecological role, resource use, and relationships.",
            "Competition between members of different species."
          ],
          0,
          "prey: An organism hunted and eaten by a predator."
        ],
        [
          "Which description accurately explains competition?",
          [
            "An organism's ecological role, resource use, and relationships.",
            "Organisms using the same limited resource.",
            "Competition between members of different species.",
            "Competition between members of the same species."
          ],
          1,
          "competition: Organisms using the same limited resource."
        ],
        [
          "Which description accurately explains niche?",
          [
            "Competition between members of the same species.",
            "Competition between members of different species.",
            "An organism's ecological role, resource use, and relationships.",
            "Interacting organisms and their nonliving surroundings."
          ],
          2,
          "niche: An organism's ecological role, resource use, and relationships."
        ],
        [
          "Which description accurately explains interspecific competition?",
          [
            "Members of the same species in a particular area.",
            "Competition between members of the same species.",
            "Interacting organisms and their nonliving surroundings.",
            "Competition between members of different species."
          ],
          3,
          "interspecific competition: Competition between members of different species."
        ],
        [
          "Which description accurately explains intraspecific competition?",
          [
            "Competition between members of the same species.",
            "Interacting organisms and their nonliving surroundings.",
            "Members of the same species in a particular area.",
            "Using light energy to make sugars from carbon dioxide and water, releasing oxygen in oxygenic photosynthesis."
          ],
          0,
          "intraspecific competition: Competition between members of the same species."
        ]
      ],
      "w": "Sort water, light, mineral particles, grass, fungi, and deer into abiotic components or biotic components. Explain the mixed nature of whole soil. Compare same-species and different-species competition; calculate density for 18 animals in 3 square kilometres. Predict how declining resources may change carrying capacity and explain the mechanism. Repeat with fresh examples in a later session.",
      "connect": "Connect irrigation in Egypt with water as an abiotic resource. Explain what stays the same (water limits growth) and what changes (people manage delivery).",
      "success": "Explain each idea, apply it to an unfamiliar example, and retrieve it later without notes. Practice completion alone does not establish readiness.",
      "delayedPrompt": "In a later session, close this lesson and reconstruct the key ideas with new examples. Preserve first attempts."
    },
    {
      "id": "science_v35_notes_foodweb",
      "title": "Matter and energy in food webs: roles and change",
      "src": "Uploaded Matter and Energy in Food Webs and Relationships within Ecosystems pages; packet has a missing producer/consumer continuation and ambiguous printed food-web arrows, so full packet coverage remains partial",
      "teach": "Energy flows through feeding pathways, while matter is recycled. Producers transform an energy source into chemical energy stored in food; they do not create energy. Food-web arrows point from food to consumer. Consumer level depends on the pathway. In grass -> grasshopper -> mouse -> snake, the mouse is secondary and snake tertiary; if the mouse eats grass directly, those levels change. Decomposers act on remains from multiple levels. Removing one species may affect others, but alternate food sources matter; do not guarantee total collapse. Competition, predation and symbiosis are different relationships; mutualism benefits both partners, parasitism harms the host.",
      "model": "Trace algae -> plant-eating zooplankton -> small fish -> large fish. The same fish may occupy another level if it eats different prey. A frog decline may reduce food for a snake, but a prediction must check other prey in the actual web. Gut bacteria gaining food while providing vitamins illustrate mutualism.",
      "v": [
        [
          "producer",
          "An organism that builds organic food from inorganic materials using an energy source."
        ],
        [
          "consumer",
          "An organism that obtains energy by eating other organisms or organic material."
        ],
        [
          "primary consumer",
          "A consumer feeding directly on a producer in the specified pathway."
        ],
        [
          "secondary consumer",
          "A consumer feeding on a primary consumer in the specified pathway."
        ],
        [
          "tertiary consumer",
          "A consumer feeding on a secondary consumer in the specified pathway."
        ],
        [
          "quaternary consumer",
          "A consumer feeding on a tertiary consumer in the specified pathway."
        ],
        [
          "decomposer",
          "An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients."
        ],
        [
          "phytoplankton",
          "Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants."
        ],
        [
          "zooplankton",
          "Drifting aquatic consumers; many eat phytoplankton, but their diets vary."
        ],
        [
          "predation",
          "A feeding interaction in which a predator eats prey."
        ],
        [
          "symbiosis",
          "A close, long-term relationship between different species."
        ],
        [
          "mutualism",
          "A relationship in which both species benefit."
        ],
        [
          "parasitism",
          "A relationship in which a parasite benefits while harming its host."
        ],
        [
          "parasite",
          "An organism that obtains resources from a host and harms it."
        ],
        [
          "host",
          "An organism on or in which a parasite lives or feeds."
        ]
      ],
      "q": [
        [
          "Which description accurately explains producer?",
          [
            "An organism that builds organic food from inorganic materials using an energy source.",
            "An organism that obtains energy by eating other organisms or organic material.",
            "A consumer feeding directly on a producer in the specified pathway.",
            "A consumer feeding on a primary consumer in the specified pathway."
          ],
          0,
          "producer: An organism that builds organic food from inorganic materials using an energy source."
        ],
        [
          "Which description accurately explains consumer?",
          [
            "A consumer feeding directly on a producer in the specified pathway.",
            "An organism that obtains energy by eating other organisms or organic material.",
            "A consumer feeding on a primary consumer in the specified pathway.",
            "A consumer feeding on a secondary consumer in the specified pathway."
          ],
          1,
          "consumer: An organism that obtains energy by eating other organisms or organic material."
        ],
        [
          "Which description accurately explains primary consumer?",
          [
            "A consumer feeding on a secondary consumer in the specified pathway.",
            "A consumer feeding on a primary consumer in the specified pathway.",
            "A consumer feeding directly on a producer in the specified pathway.",
            "A consumer feeding on a tertiary consumer in the specified pathway."
          ],
          2,
          "primary consumer: A consumer feeding directly on a producer in the specified pathway."
        ],
        [
          "Which description accurately explains secondary consumer?",
          [
            "An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients.",
            "A consumer feeding on a secondary consumer in the specified pathway.",
            "A consumer feeding on a tertiary consumer in the specified pathway.",
            "A consumer feeding on a primary consumer in the specified pathway."
          ],
          3,
          "secondary consumer: A consumer feeding on a primary consumer in the specified pathway."
        ],
        [
          "Which description accurately explains tertiary consumer?",
          [
            "A consumer feeding on a secondary consumer in the specified pathway.",
            "A consumer feeding on a tertiary consumer in the specified pathway.",
            "An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients.",
            "Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants."
          ],
          0,
          "tertiary consumer: A consumer feeding on a secondary consumer in the specified pathway."
        ],
        [
          "Which description accurately explains quaternary consumer?",
          [
            "An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients.",
            "A consumer feeding on a tertiary consumer in the specified pathway.",
            "Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants.",
            "Drifting aquatic consumers; many eat phytoplankton, but their diets vary."
          ],
          1,
          "quaternary consumer: A consumer feeding on a tertiary consumer in the specified pathway."
        ],
        [
          "Which description accurately explains decomposer?",
          [
            "Drifting aquatic consumers; many eat phytoplankton, but their diets vary.",
            "Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants.",
            "An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients.",
            "A feeding interaction in which a predator eats prey."
          ],
          2,
          "decomposer: An organism such as certain fungi or bacteria that breaks down dead material or waste and recycles nutrients."
        ],
        [
          "Which description accurately explains phytoplankton?",
          [
            "A close, long-term relationship between different species.",
            "Drifting aquatic consumers; many eat phytoplankton, but their diets vary.",
            "A feeding interaction in which a predator eats prey.",
            "Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants."
          ],
          3,
          "phytoplankton: Microscopic photosynthetic organisms that form an important aquatic producer base; not all are plants."
        ],
        [
          "Which description accurately explains zooplankton?",
          [
            "Drifting aquatic consumers; many eat phytoplankton, but their diets vary.",
            "A feeding interaction in which a predator eats prey.",
            "A close, long-term relationship between different species.",
            "A relationship in which both species benefit."
          ],
          0,
          "zooplankton: Drifting aquatic consumers; many eat phytoplankton, but their diets vary."
        ],
        [
          "Which description accurately explains predation?",
          [
            "A close, long-term relationship between different species.",
            "A feeding interaction in which a predator eats prey.",
            "A relationship in which both species benefit.",
            "A relationship in which a parasite benefits while harming its host."
          ],
          1,
          "predation: A feeding interaction in which a predator eats prey."
        ],
        [
          "Which description accurately explains symbiosis?",
          [
            "A relationship in which a parasite benefits while harming its host.",
            "A relationship in which both species benefit.",
            "A close, long-term relationship between different species.",
            "An organism that obtains resources from a host and harms it."
          ],
          2,
          "symbiosis: A close, long-term relationship between different species."
        ],
        [
          "Which description accurately explains mutualism?",
          [
            "An organism on or in which a parasite lives or feeds.",
            "A relationship in which a parasite benefits while harming its host.",
            "An organism that obtains resources from a host and harms it.",
            "A relationship in which both species benefit."
          ],
          3,
          "mutualism: A relationship in which both species benefit."
        ],
        [
          "Which description accurately explains parasitism?",
          [
            "A relationship in which a parasite benefits while harming its host.",
            "An organism that obtains resources from a host and harms it.",
            "An organism on or in which a parasite lives or feeds.",
            "An organism that builds organic food from inorganic materials using an energy source."
          ],
          0,
          "parasitism: A relationship in which a parasite benefits while harming its host."
        ],
        [
          "Which description accurately explains parasite?",
          [
            "An organism on or in which a parasite lives or feeds.",
            "An organism that obtains resources from a host and harms it.",
            "An organism that builds organic food from inorganic materials using an energy source.",
            "An organism that obtains energy by eating other organisms or organic material."
          ],
          1,
          "parasite: An organism that obtains resources from a host and harms it."
        ],
        [
          "Which description accurately explains host?",
          [
            "An organism that obtains energy by eating other organisms or organic material.",
            "An organism that builds organic food from inorganic materials using an energy source.",
            "An organism on or in which a parasite lives or feeds.",
            "A consumer feeding directly on a producer in the specified pathway."
          ],
          2,
          "host: An organism on or in which a parasite lives or feeds."
        ]
      ],
      "w": "Draw two food chains sharing a consumer, mark energy arrows, and label each feeding level. Explain a role that changes between pathways. Compare mutualism and parasitism using benefits and harms. Predict one direct and one indirect consequence of a frog decline while stating the assumptions. Repeat later with a new aquatic chain.",
      "connect": "Connect energy transfer to the earlier energy-conservation unit and use claim, diagram evidence, and reasoning from ELA when predicting change.",
      "success": "Explain each idea, apply it to an unfamiliar example, and retrieve it later without notes. Practice completion alone does not establish readiness.",
      "delayedPrompt": "In a later session, close this lesson and reconstruct the key ideas with new examples. Preserve first attempts."
    }
  ]
};
globalThis.RY_UPLOAD_REPAIR_V35=additions;
})();
