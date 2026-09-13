export type BioQuestion = {
  id: string;
  topic: string;
  prompt: string;
  answer: string;
  accepted: string[];
  choices: string[];
  explain: string;
};

export const BIO_TOPICS = [
  { id: "cells", name: "Cells", blurb: "Animal and plant cells, organelles, specialised cells." },
  { id: "photo", name: "Photosynthesis", blurb: "Word equation, leaf adaptations, factors." },
  { id: "digest", name: "Digestion", blurb: "The digestive system, enzymes, absorption." },
  { id: "respire", name: "Respiration", blurb: "Aerobic and anaerobic respiration." },
  { id: "eco", name: "Ecosystems", blurb: "Food chains, interdependence, sampling." },
] as const;

export const BIO_QUESTIONS: BioQuestion[] = [
  {
    id: "b1",
    topic: "cells",
    prompt: "Which organelle controls the cell and contains DNA?",
    answer: "nucleus",
    accepted: ["nucleus", "the nucleus"],
    choices: ["nucleus", "mitochondrion", "ribosome", "vacuole"],
    explain: "The nucleus holds genetic material and controls cell activities.",
  },
  {
    id: "b2",
    topic: "cells",
    prompt: "Which organelle is the site of aerobic respiration?",
    answer: "mitochondria",
    accepted: ["mitochondria", "mitochondrion", "the mitochondria"],
    choices: ["chloroplast", "nucleus", "mitochondria", "cell wall"],
    explain: "Mitochondria release energy from glucose by aerobic respiration.",
  },
  {
    id: "b3",
    topic: "cells",
    prompt: "Which feature is found in plant cells but not animal cells?",
    answer: "cell wall",
    accepted: ["cell wall", "a cell wall", "cellulose cell wall", "chloroplast", "chloroplasts", "permanent vacuole"],
    choices: ["nucleus", "cell membrane", "mitochondria", "cell wall"],
    explain: "Plant cells have a cellulose cell wall, chloroplasts, and a permanent vacuole.",
  },
  {
    id: "b4",
    topic: "cells",
    prompt: "What is the function of the cell membrane?",
    answer: "controls what enters and leaves the cell",
    accepted: [
      "controls what enters and leaves the cell",
      "controls what goes in and out",
      "partially permeable barrier",
      "controls entry and exit of substances",
    ],
    choices: [
      "controls what enters and leaves the cell",
      "makes glucose",
      "stores DNA",
      "gives the cell its rigid shape",
    ],
    explain: "The membrane is partially permeable and controls transport of substances.",
  },
  {
    id: "b5",
    topic: "photo",
    prompt: "What is the word equation for photosynthesis?",
    answer: "carbon dioxide + water → glucose + oxygen",
    accepted: [
      "carbon dioxide + water → glucose + oxygen",
      "carbon dioxide + water -> glucose + oxygen",
      "co2 + h2o → glucose + oxygen",
    ],
    choices: [
      "carbon dioxide + water → glucose + oxygen",
      "glucose + oxygen → carbon dioxide + water",
      "oxygen + water → glucose + carbon dioxide",
      "nitrogen + water → protein + oxygen",
    ],
    explain: "Photosynthesis uses light energy to convert CO₂ and water into glucose and oxygen.",
  },
  {
    id: "b6",
    topic: "photo",
    prompt: "Where in a plant cell does photosynthesis happen?",
    answer: "chloroplasts",
    accepted: ["chloroplasts", "chloroplast", "in the chloroplasts"],
    choices: ["mitochondria", "nucleus", "chloroplasts", "ribosomes"],
    explain: "Chloroplasts contain chlorophyll, which absorbs light.",
  },
  {
    id: "b7",
    topic: "photo",
    prompt: "Which factor does not limit the rate of photosynthesis?",
    answer: "soil colour",
    accepted: ["soil colour", "soil color"],
    choices: ["light intensity", "carbon dioxide concentration", "temperature", "soil colour"],
    explain: "Light, CO₂ and temperature are the classic limiting factors.",
  },
  {
    id: "b8",
    topic: "digest",
    prompt: "Which enzyme breaks down starch into sugars?",
    answer: "amylase",
    accepted: ["amylase", "carbohydrase", "carbohydrases"],
    choices: ["amylase", "protease", "lipase", "catalase"],
    explain: "Amylase (a carbohydrase) is in saliva and pancreatic juice.",
  },
  {
    id: "b9",
    topic: "digest",
    prompt: "Where is digested food absorbed into the blood?",
    answer: "small intestine",
    accepted: ["small intestine", "the small intestine", "ileum"],
    choices: ["stomach", "large intestine", "small intestine", "oesophagus"],
    explain: "Villi in the small intestine give a large surface area for absorption.",
  },
  {
    id: "b10",
    topic: "digest",
    prompt: "What is the role of bile in digestion?",
    answer: "emulsifies fats",
    accepted: ["emulsifies fats", "emulsify fats", "breaks fats into droplets", "neutralises stomach acid"],
    choices: ["digests protein", "emulsifies fats", "absorbs water", "kills bacteria only"],
    explain: "Bile emulsifies fats (larger surface area) and helps neutralise stomach acid.",
  },
  {
    id: "b11",
    topic: "respire",
    prompt: "What is the word equation for aerobic respiration?",
    answer: "glucose + oxygen → carbon dioxide + water",
    accepted: [
      "glucose + oxygen → carbon dioxide + water",
      "glucose + oxygen -> carbon dioxide + water",
    ],
    choices: [
      "glucose + oxygen → carbon dioxide + water",
      "carbon dioxide + water → glucose + oxygen",
      "glucose → lactic acid",
      "protein + oxygen → urea",
    ],
    explain: "Aerobic respiration releases energy from glucose using oxygen.",
  },
  {
    id: "b12",
    topic: "respire",
    prompt: "Anaerobic respiration in human muscle produces:",
    answer: "lactic acid",
    accepted: ["lactic acid", "lactate"],
    choices: ["alcohol", "lactic acid", "oxygen", "starch"],
    explain: "In mammals: glucose → lactic acid. Yeast instead makes ethanol + CO₂.",
  },
  {
    id: "b13",
    topic: "eco",
    prompt: "In a food chain, arrows show:",
    answer: "the direction of energy flow",
    accepted: ["the direction of energy flow", "energy flow", "where energy goes", "transfer of energy"],
    choices: [
      "the direction of energy flow",
      "which animal is larger",
      "who lives longest",
      "the direction animals walk",
    ],
    explain: "Arrows point from food to feeder: grass → rabbit → fox.",
  },
  {
    id: "b14",
    topic: "eco",
    prompt: "A producer in a food chain is usually:",
    answer: "a green plant",
    accepted: ["a green plant", "plant", "plants", "producer", "a plant"],
    choices: ["a green plant", "a fox", "a fungus only", "a decomposing fox"],
    explain: "Producers make their own food by photosynthesis.",
  },
  {
    id: "b15",
    topic: "eco",
    prompt: "Why are food chains usually short?",
    answer: "energy is lost at each trophic level",
    accepted: [
      "energy is lost at each trophic level",
      "energy is lost",
      "not enough energy is passed on",
      "energy decreases along the chain",
    ],
    choices: [
      "energy is lost at each trophic level",
      "animals refuse to eat each other",
      "there are not enough plants",
      "predators cannot run",
    ],
    explain: "Only about 10% of energy is passed on; the rest is lost as heat, waste and movement.",
  },
];
