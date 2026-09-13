export type LatinVocab = {
  id: string;
  latin: string;
  english: string;
  topic: string;
  extra?: string[];
};

export type LatinQuestion = {
  id: string;
  category: "Vocabulary" | "Grammar" | "Translation" | "Roman World";
  prompt: string;
  answer: string;
  accepted: string[];
  choices: string[];
  explain: string;
  topic: string;
};

export const LATIN_VOCAB: LatinVocab[] = [
  { id: "v-amo", latin: "amō", english: "I love", topic: "Verbs", extra: ["i love", "love"] },
  { id: "v-porto", latin: "portō", english: "I carry", topic: "Verbs", extra: ["i carry", "carry"] },
  { id: "v-laudo", latin: "laudō", english: "I praise", topic: "Verbs", extra: ["i praise", "praise"] },
  { id: "v-specto", latin: "spectō", english: "I watch", topic: "Verbs", extra: ["i watch", "watch", "i look at"] },
  { id: "v-do", latin: "dō", english: "I give", topic: "Verbs", extra: ["i give", "give"] },
  { id: "v-video", latin: "videō", english: "I see", topic: "Verbs", extra: ["i see", "see"] },
  { id: "v-duco", latin: "dūcō", english: "I lead", topic: "Verbs", extra: ["i lead", "lead"] },
  { id: "v-scribo", latin: "scrībō", english: "I write", topic: "Verbs", extra: ["i write", "write"] },
  { id: "v-lego", latin: "legō", english: "I read", topic: "Verbs", extra: ["i read", "read", "i choose"] },
  { id: "v-sum", latin: "sum", english: "I am", topic: "Verbs", extra: ["i am", "am"] },
  { id: "v-est", latin: "est", english: "he/she/it is", topic: "Verbs", extra: ["is", "he is", "she is", "it is"] },
  { id: "v-sunt", latin: "sunt", english: "they are", topic: "Verbs", extra: ["they are", "are"] },
  { id: "n-puella", latin: "puella", english: "girl", topic: "Nouns" },
  { id: "n-puer", latin: "puer", english: "boy", topic: "Nouns" },
  { id: "n-hortus", latin: "hortus", english: "garden", topic: "Nouns" },
  { id: "n-liber", latin: "liber", english: "book", topic: "Nouns" },
  { id: "n-canis", latin: "canis", english: "dog", topic: "Nouns" },
  { id: "n-mater", latin: "māter", english: "mother", topic: "Nouns" },
  { id: "n-pater", latin: "pater", english: "father", topic: "Nouns" },
  { id: "n-domus", latin: "domus", english: "house", topic: "Nouns", extra: ["home", "house"] },
  { id: "n-amicus", latin: "amīcus", english: "friend", topic: "Nouns" },
  { id: "n-epistula", latin: "epistula", english: "letter", topic: "Nouns" },
  { id: "n-cibus", latin: "cibus", english: "food", topic: "Nouns" },
  { id: "n-via", latin: "via", english: "road", topic: "Nouns", extra: ["street", "way", "road"] },
  { id: "n-villa", latin: "vīlla", english: "house / country estate", topic: "Nouns", extra: ["house", "villa", "country house"] },
  { id: "n-servus", latin: "servus", english: "slave", topic: "Nouns" },
  { id: "n-filius", latin: "fīlius", english: "son", topic: "Nouns" },
  { id: "n-filia", latin: "fīlia", english: "daughter", topic: "Nouns" },
  { id: "n-aqua", latin: "aqua", english: "water", topic: "Nouns" },
  { id: "n-urbs", latin: "urbs", english: "city", topic: "Nouns" },
  { id: "p-in", latin: "in", english: "in / on / into", topic: "Prepositions", extra: ["in", "on", "into"] },
  { id: "p-ad", latin: "ad", english: "to / towards", topic: "Prepositions", extra: ["to", "towards"] },
  { id: "p-cum", latin: "cum", english: "with", topic: "Prepositions" },
  { id: "p-e", latin: "ē / ex", english: "out of / from", topic: "Prepositions", extra: ["out of", "from", "e", "ex"] },
  { id: "n-vir", latin: "vir", english: "man", topic: "Nouns" },
  { id: "n-femina", latin: "fēmina", english: "woman", topic: "Nouns", extra: ["woman"] },
  { id: "n-dominus", latin: "dominus", english: "master", topic: "Nouns" },
  { id: "n-miles", latin: "mīles", english: "soldier", topic: "Nouns" },
  { id: "n-rex", latin: "rēx", english: "king", topic: "Nouns" },
  { id: "n-regina", latin: "rēgīna", english: "queen", topic: "Nouns" },
  { id: "n-deus", latin: "deus", english: "god", topic: "Nouns" },
  { id: "n-dea", latin: "dea", english: "goddess", topic: "Nouns" },
  { id: "n-templum", latin: "templum", english: "temple", topic: "Nouns" },
  { id: "n-forum", latin: "forum", english: "forum / marketplace", topic: "Nouns", extra: ["forum", "marketplace"] },
  { id: "n-atrium", latin: "ātrium", english: "atrium / hall", topic: "Nouns", extra: ["atrium", "hall"] },
  { id: "n-gladius", latin: "gladius", english: "sword", topic: "Nouns" },
  { id: "n-navis", latin: "nāvis", english: "ship", topic: "Nouns" },
  { id: "n-silva", latin: "silva", english: "wood / forest", topic: "Nouns", extra: ["wood", "forest"] },
  { id: "n-mons", latin: "mōns", english: "mountain", topic: "Nouns" },
  { id: "n-mare", latin: "mare", english: "sea", topic: "Nouns" },
  { id: "n-nox", latin: "nox", english: "night", topic: "Nouns" },
  { id: "n-dies", latin: "diēs", english: "day", topic: "Nouns" },
  { id: "n-annus", latin: "annus", english: "year", topic: "Nouns" },
  { id: "n-bellum", latin: "bellum", english: "war", topic: "Nouns" },
  { id: "n-pax", latin: "pāx", english: "peace", topic: "Nouns" },
  { id: "n-nomen", latin: "nōmen", english: "name", topic: "Nouns" },
  { id: "n-populus", latin: "populus", english: "people", topic: "Nouns" },
  { id: "n-civis", latin: "cīvis", english: "citizen", topic: "Nouns" },
  { id: "n-senatus", latin: "senātus", english: "senate", topic: "Nouns" },
  { id: "n-pes", latin: "pēs", english: "foot", topic: "Nouns" },
  { id: "n-manus", latin: "manus", english: "hand", topic: "Nouns" },
  { id: "n-vox", latin: "vōx", english: "voice", topic: "Nouns" },
  { id: "v-ambulo", latin: "ambulō", english: "I walk", topic: "Verbs", extra: ["i walk", "walk"] },
  { id: "v-habito", latin: "habitō", english: "I live / I dwell", topic: "Verbs", extra: ["i live", "i dwell", "live"] },
  { id: "v-laboro", latin: "labōrō", english: "I work", topic: "Verbs", extra: ["i work", "work"] },
  { id: "v-teneo", latin: "teneō", english: "I hold", topic: "Verbs", extra: ["i hold", "hold"] },
  { id: "v-timeo", latin: "timeō", english: "I fear", topic: "Verbs", extra: ["i fear", "i am afraid", "fear"] },
  { id: "v-mitto", latin: "mittō", english: "I send", topic: "Verbs", extra: ["i send", "send"] },
  { id: "v-capio", latin: "capiō", english: "I take / I capture", topic: "Verbs", extra: ["i take", "i capture", "take"] },
  { id: "v-facio", latin: "faciō", english: "I make / I do", topic: "Verbs", extra: ["i make", "i do", "make", "do"] },
  { id: "v-venio", latin: "veniō", english: "I come", topic: "Verbs", extra: ["i come", "come"] },
  { id: "v-audio", latin: "audiō", english: "I hear", topic: "Verbs", extra: ["i hear", "hear"] },
  { id: "v-dormio", latin: "dormiō", english: "I sleep", topic: "Verbs", extra: ["i sleep", "sleep"] },
  { id: "v-possum", latin: "possum", english: "I am able / I can", topic: "Verbs", extra: ["i can", "i am able", "can"] },
  { id: "v-ludo", latin: "lūdō", english: "I play", topic: "Verbs", extra: ["i play", "play"] },
  { id: "v-iubeo", latin: "iubeō", english: "I order", topic: "Verbs", extra: ["i order", "order"] },
  { id: "a-bonus", latin: "bonus", english: "good", topic: "Adjectives" },
  { id: "a-malus", latin: "malus", english: "bad", topic: "Adjectives" },
  { id: "a-magnus", latin: "magnus", english: "big / great", topic: "Adjectives", extra: ["big", "great", "large"] },
  { id: "a-parvus", latin: "parvus", english: "small", topic: "Adjectives" },
  { id: "a-multus", latin: "multus", english: "much / many", topic: "Adjectives", extra: ["much", "many"] },
  { id: "a-pulcher", latin: "pulcher", english: "beautiful", topic: "Adjectives" },
  { id: "a-laetus", latin: "laetus", english: "happy", topic: "Adjectives" },
  { id: "a-iratus", latin: "īrātus", english: "angry", topic: "Adjectives" },
  { id: "a-fortis", latin: "fortis", english: "brave / strong", topic: "Adjectives", extra: ["brave", "strong"] },
  { id: "p-per", latin: "per", english: "through", topic: "Prepositions" },
  { id: "p-trans", latin: "trāns", english: "across", topic: "Prepositions" },
  { id: "p-pro", latin: "prō", english: "in front of / for", topic: "Prepositions", extra: ["for", "in front of"] },
  { id: "p-de", latin: "dē", english: "about / down from", topic: "Prepositions", extra: ["about", "down from"] },
  { id: "p-sine", latin: "sine", english: "without", topic: "Prepositions" },
  { id: "pr-ego", latin: "ego", english: "I", topic: "Pronouns" },
  { id: "pr-tu", latin: "tū", english: "you (s.)", topic: "Pronouns", extra: ["you"] },
  { id: "pr-nos", latin: "nōs", english: "we / us", topic: "Pronouns", extra: ["we", "us"] },
  { id: "pr-vos", latin: "vōs", english: "you (pl.)", topic: "Pronouns", extra: ["you"] },
];

export const LATIN_QUESTIONS: LatinQuestion[] = [
  {
    id: "q-amo",
    category: "Vocabulary",
    prompt: "What does amō mean?",
    answer: "I love",
    accepted: ["i love", "love", "i am loving"],
    choices: ["I love", "I carry", "I lead", "I write"],
    explain: "amō is a first-conjugation verb: I love.",
    topic: "Present tense",
  },
  {
    id: "q-puella",
    category: "Vocabulary",
    prompt: "What does puella mean?",
    answer: "girl",
    accepted: ["girl", "a girl", "the girl"],
    choices: ["girl", "boy", "garden", "mother"],
    explain: "puella, puellae (f.) — girl. First declension.",
    topic: "Nouns",
  },
  {
    id: "q-hortus",
    category: "Vocabulary",
    prompt: "What does hortus mean?",
    answer: "garden",
    accepted: ["garden", "a garden", "the garden"],
    choices: ["house", "garden", "book", "road"],
    explain: "hortus, hortī (m.) — garden. Second declension.",
    topic: "Nouns",
  },
  {
    id: "q-est",
    category: "Grammar",
    prompt: "Which person and number is est?",
    answer: "3rd singular",
    accepted: ["3rd singular", "third singular", "3s", "he she it is"],
    choices: ["1st singular", "2nd singular", "3rd singular", "3rd plural"],
    explain: "sum, es, est — est is 3rd person singular: he/she/it is.",
    topic: "sum",
  },
  {
    id: "q-amat",
    category: "Grammar",
    prompt: "Which form of amō means ‘he/she loves’?",
    answer: "amat",
    accepted: ["amat"],
    choices: ["amō", "amās", "amat", "amant"],
    explain: "1st conjugation present: amō, amās, amat, amāmus, amātis, amant.",
    topic: "Present tense",
  },
  {
    id: "q-amant",
    category: "Grammar",
    prompt: "What does amant mean?",
    answer: "they love",
    accepted: ["they love", "they are loving"],
    choices: ["I love", "we love", "they love", "you love"],
    explain: "The -nt ending marks 3rd person plural in the present tense.",
    topic: "Present tense",
  },
  {
    id: "q-acc",
    category: "Grammar",
    prompt: "In Puella hortum amat, why is hortum not hortus?",
    answer: "It is the object (accusative)",
    accepted: [
      "accusative",
      "it is the object",
      "object",
      "it is the object (accusative)",
      "direct object",
    ],
    choices: [
      "It is the subject (nominative)",
      "It is the object (accusative)",
      "It is possession (genitive)",
      "It is the verb",
    ],
    explain: "hortum is accusative singular of hortus — the thing being loved.",
    topic: "Cases",
  },
  {
    id: "q-nom",
    category: "Grammar",
    prompt: "Which case is used for the subject of a Latin sentence?",
    answer: "nominative",
    accepted: ["nominative", "nom"],
    choices: ["nominative", "accusative", "ablative", "dative"],
    explain: "The nominative marks the person or thing doing the verb.",
    topic: "Cases",
  },
  {
    id: "q-dat",
    category: "Grammar",
    prompt: "Which case often marks the person to whom something is given?",
    answer: "dative",
    accepted: ["dative", "dat"],
    choices: ["nominative", "genitive", "dative", "ablative"],
    explain: "dō + dative: Māter fīliō cibum dat — Mother gives food to her son.",
    topic: "Cases",
  },
  {
    id: "q-in-abl",
    category: "Grammar",
    prompt: "in hortō (with a long ō) most often means:",
    answer: "in the garden",
    accepted: ["in the garden", "in garden", "on the garden"],
    choices: ["into the garden", "in the garden", "from the garden", "of the garden"],
    explain: "in + ablative = in/on a place. in + accusative = into/onto.",
    topic: "Prepositions",
  },
  {
    id: "q-tr1",
    category: "Translation",
    prompt: "Translate: Puella in hortō lūdit.",
    answer: "The girl plays in the garden.",
    accepted: [
      "the girl plays in the garden",
      "a girl plays in the garden",
      "the girl is playing in the garden",
    ],
    choices: [
      "The girl plays in the garden.",
      "The girl loves the garden.",
      "The boy plays in the garden.",
      "The girl walks to the garden.",
    ],
    explain: "puella = girl (subject). lūdit = plays. in hortō = in the garden.",
    topic: "Simple sentences",
  },
  {
    id: "q-tr2",
    category: "Translation",
    prompt: "Translate: Canis in viā lātrat.",
    answer: "The dog barks in the street.",
    accepted: [
      "the dog barks in the street",
      "a dog barks in the road",
      "the dog is barking in the street",
      "the dog barks on the road",
    ],
    choices: [
      "The dog barks in the street.",
      "The dog runs in the garden.",
      "The boy shouts in the street.",
      "The dog sits in the house.",
    ],
    explain: "canis = dog. lātrat = barks. in viā = in/on the road.",
    topic: "Simple sentences",
  },
  {
    id: "q-tr3",
    category: "Translation",
    prompt: "Translate: Māter fīliō cibum dat.",
    answer: "The mother gives food to her son.",
    accepted: [
      "the mother gives food to her son",
      "mother gives food to the son",
      "the mother gives the son food",
      "a mother gives food to her son",
    ],
    choices: [
      "The mother gives food to her son.",
      "The son gives food to his mother.",
      "The mother carries food to the house.",
      "The father gives a book to his son.",
    ],
    explain: "dat = gives. cibum (acc.) = food. fīliō (dat.) = to the son.",
    topic: "Simple sentences",
  },
  {
    id: "q-tr-libros",
    category: "Translation",
    prompt: "Translate: Puella librōs legit.",
    answer: "The girl reads books.",
    accepted: ["the girl reads books", "a girl reads books", "the girl is reading books"],
    choices: [
      "The girl reads books.",
      "The girl loves books.",
      "The boy reads a letter.",
      "The girl writes books.",
    ],
    explain: "Puella is nominative singular feminine — girl. librōs is accusative plural of liber — books. legit is 3rd person singular present of legō — she reads.",
    topic: "Nouns",
  },
  {
    id: "q-tr-spectavit",
    category: "Translation",
    prompt: "Translate into Latin: She watched the game.",
    answer: "lūdum spectāvit",
    accepted: ["ludum spectavit", "lūdum spectāvit", "spectāvit lūdum", "ea lūdum spectāvit"],
    choices: ["lūdum spectāvit", "lūdum spectat", "lūdōs amāvit", "lūdum scrībit"],
    explain: "Perfect tense spectāvit = she watched. lūdum (acc.) = the game.",
    topic: "Perfect tense",
  },
  {
    id: "q-tr4",
    category: "Translation",
    prompt: "Translate: Pater ad villam redit.",
    answer: "The father returns to the house.",
    accepted: [
      "the father returns to the house",
      "father returns to the villa",
      "the father goes back to the house",
      "the father returns to the country house",
    ],
    choices: [
      "The father returns to the house.",
      "The father leaves the house.",
      "The son returns to the garden.",
      "The father lives in the house.",
    ],
    explain: "redit = returns. ad + accusative = to/towards.",
    topic: "Simple sentences",
  },
  {
    id: "q-tr5",
    category: "Translation",
    prompt: "Translate: Soror librum legit.",
    answer: "The sister reads a book.",
    accepted: [
      "the sister reads a book",
      "the sister is reading a book",
      "sister reads the book",
      "the sister reads the book",
    ],
    choices: [
      "The sister reads a book.",
      "The sister writes a letter.",
      "The brother reads a book.",
      "The sister carries a book.",
    ],
    explain: "legit from legō = reads. librum is the accusative object.",
    topic: "Simple sentences",
  },
  {
    id: "q-rome",
    category: "Roman World",
    prompt: "What was a Roman atrium?",
    answer: "The main hall of a town house",
    accepted: [
      "the main hall of a town house",
      "main hall",
      "the central hall of a house",
      "hall of a house",
    ],
    choices: [
      "The main hall of a town house",
      "A covered market",
      "A public bath",
      "A country farm",
    ],
    explain: "The atrium was the central reception hall of a Roman domus, often with an impluvium.",
    topic: "Houses",
  },
  {
    id: "q-forum",
    category: "Roman World",
    prompt: "The Roman forum was primarily:",
    answer: "A civic and market centre",
    accepted: [
      "a civic and market centre",
      "marketplace",
      "civic centre",
      "public square",
    ],
    choices: [
      "A civic and market centre",
      "A private dining room",
      "A military barracks",
      "A temple to one god only",
    ],
    explain: "The forum was the public heart of a Roman town: law, trade, speeches, temples.",
    topic: "Towns",
  },
  {
    id: "q-insula",
    category: "Roman World",
    prompt: "An īnsula in a Roman town was:",
    answer: "A block of flats",
    accepted: ["a block of flats", "apartment block", "block of flats", "tenement"],
    choices: [
      "A block of flats",
      "A country villa",
      "A warship",
      "A public fountain",
    ],
    explain: "īnsulae were multi-storey apartment buildings where poorer city-dwellers lived.",
    topic: "Houses",
  },
  {
    id: "q-slaves",
    category: "Roman World",
    prompt: "In a typical Roman town house, enslaved people often:",
    answer: "Lived and worked within the household",
    accepted: [
      "lived and worked within the household",
      "worked in the house",
      "were part of the household",
    ],
    choices: [
      "Lived and worked within the household",
      "Were never present in the city",
      "Only worked on farms",
      "Held elected office",
    ],
    explain: "Enslaved labour was built into Roman domestic life; many servī lived in the household.",
    topic: "Society",
  },
  {
    id: "q-via",
    category: "Vocabulary",
    prompt: "Give the Latin for ‘road’ or ‘street’.",
    answer: "via",
    accepted: ["via", "viae"],
    choices: ["via", "villa", "hortus", "aqua"],
    explain: "via, viae (f.) — road, street, way.",
    topic: "Nouns",
  },
  {
    id: "q-sumus",
    category: "Grammar",
    prompt: "What does sumus mean?",
    answer: "we are",
    accepted: ["we are"],
    choices: ["I am", "you are", "we are", "they are"],
    explain: "sum, es, est, sumus, estis, sunt.",
    topic: "sum",
  },
  {
    id: "q-ducit",
    category: "Vocabulary",
    prompt: "What does dūcit mean?",
    answer: "he/she leads",
    accepted: ["he leads", "she leads", "he/she leads", "it leads", "leads"],
    choices: ["he/she leads", "I lead", "they carry", "we write"],
    explain: "dūcō, dūcis, dūcit — 3rd conjugation, he/she/it leads.",
    topic: "Present tense",
  },
  {
    id: "q-scribit",
    category: "Translation",
    prompt: "Translate: Amīcus epistulam scrībit.",
    answer: "The friend writes a letter.",
    accepted: [
      "the friend writes a letter",
      "a friend writes a letter",
      "the friend is writing a letter",
    ],
    choices: [
      "The friend writes a letter.",
      "The friend reads a letter.",
      "The girl writes a book.",
      "The friend carries a letter.",
    ],
    explain: "scrībit = writes. epistulam is accusative of epistula.",
    topic: "Simple sentences",
  },
  {
    id: "q-abl-prep",
    category: "Grammar",
    prompt: "Which case does cum (‘with’) take?",
    answer: "ablative",
    accepted: ["ablative", "abl"],
    choices: ["nominative", "accusative", "genitive", "ablative"],
    explain: "cum + ablative: cum amīcō — with a friend.",
    topic: "Prepositions",
  },
];

export const LATIN_NOTES = [
  {
    id: "n1",
    title: "Present tense, first conjugation",
    body: "amō, amās, amat, amāmus, amātis, amant. Stem amā- + person endings -ō, -s, -t, -mus, -tis, -nt. First conjugation verbs have an -ā- in the present stem.",
  },
  {
    id: "n2",
    title: "Nominative and accusative",
    body: "The nominative is the subject. The accusative is usually the direct object. In Puella hortum amat, puella does the loving; hortum is what is loved.",
  },
  {
    id: "n3",
    title: "sum — the verb ‘to be’",
    body: "sum, es, est, sumus, estis, sunt. It does not take an accusative object. What follows is usually nominative: Puella est laeta — the girl is happy.",
  },
  {
    id: "n4",
    title: "in + ablative / in + accusative",
    body: "in hortō = in the garden (place where). in hortum = into the garden (place to which). The case after in changes the meaning.",
  },
];

export type FormaItem = {
  id: string;
  target: string;
  stem: string;
  ending: string;
  person: string;
  meaning: string;
  conjugation: string;
};

export const FORMA_ITEMS: FormaItem[] = [
  { id: "f1", target: "amō", stem: "am", ending: "ō", person: "1st singular", meaning: "I love", conjugation: "1st" },
  { id: "f2", target: "amās", stem: "amā", ending: "s", person: "2nd singular", meaning: "you love", conjugation: "1st" },
  { id: "f3", target: "amat", stem: "ama", ending: "t", person: "3rd singular", meaning: "he/she loves", conjugation: "1st" },
  { id: "f4", target: "amāmus", stem: "amā", ending: "mus", person: "1st plural", meaning: "we love", conjugation: "1st" },
  { id: "f5", target: "amant", stem: "ama", ending: "nt", person: "3rd plural", meaning: "they love", conjugation: "1st" },
  { id: "f6", target: "portō", stem: "port", ending: "ō", person: "1st singular", meaning: "I carry", conjugation: "1st" },
  { id: "f7", target: "portat", stem: "porta", ending: "t", person: "3rd singular", meaning: "he/she carries", conjugation: "1st" },
  { id: "f8", target: "portant", stem: "porta", ending: "nt", person: "3rd plural", meaning: "they carry", conjugation: "1st" },
  { id: "f9", target: "laudat", stem: "lauda", ending: "t", person: "3rd singular", meaning: "he/she praises", conjugation: "1st" },
  { id: "f10", target: "spectāmus", stem: "spectā", ending: "mus", person: "1st plural", meaning: "we watch", conjugation: "1st" },
  { id: "f11", target: "videō", stem: "vid", ending: "eō", person: "1st singular", meaning: "I see", conjugation: "2nd" },
  { id: "f12", target: "videt", stem: "vide", ending: "t", person: "3rd singular", meaning: "he/she sees", conjugation: "2nd" },
  { id: "f13", target: "vident", stem: "vide", ending: "nt", person: "3rd plural", meaning: "they see", conjugation: "2nd" },
  { id: "f14", target: "dūcō", stem: "dūc", ending: "ō", person: "1st singular", meaning: "I lead", conjugation: "3rd" },
  { id: "f15", target: "dūcit", stem: "dūci", ending: "t", person: "3rd singular", meaning: "he/she leads", conjugation: "3rd" },
  { id: "f16", target: "dūcunt", stem: "dūcu", ending: "nt", person: "3rd plural", meaning: "they lead", conjugation: "3rd" },
  { id: "f17", target: "scrībit", stem: "scrībi", ending: "t", person: "3rd singular", meaning: "he/she writes", conjugation: "3rd" },
  { id: "f18", target: "legunt", stem: "legu", ending: "nt", person: "3rd plural", meaning: "they read", conjugation: "3rd" },
  { id: "f19", target: "dat", stem: "da", ending: "t", person: "3rd singular", meaning: "he/she gives", conjugation: "1st" },
  { id: "f20", target: "sunt", stem: "su", ending: "nt", person: "3rd plural", meaning: "they are", conjugation: "irregular" },
];

export const FORMA_DISTRACTORS = ["ō", "s", "t", "mus", "tis", "nt", "eō", "unt", "ī"];

export type MosaicItem = {
  id: string;
  words: string[];
  english: string;
  hint: string;
};

export const MOSAIC_ITEMS: MosaicItem[] = [
  { id: "m1", words: ["Puella", "in", "hortō", "lūdit"], english: "The girl plays in the garden.", hint: "Start with the subject." },
  { id: "m2", words: ["Canis", "in", "viā", "lātrat"], english: "The dog barks in the street.", hint: "in + ablative for place where." },
  { id: "m3", words: ["Māter", "fīliō", "cibum", "dat"], english: "Mother gives food to her son.", hint: "dative person, accusative thing." },
  { id: "m4", words: ["Pater", "ad", "villam", "redit"], english: "Father returns to the house.", hint: "ad takes the accusative." },
  { id: "m5", words: ["Soror", "librum", "legit"], english: "The sister reads a book.", hint: "Object in the accusative." },
  { id: "m6", words: ["Amīcus", "epistulam", "scrībit"], english: "The friend writes a letter.", hint: "Subject — object — verb is common." },
  { id: "m7", words: ["Puer", "cum", "cane", "ambulat"], english: "The boy walks with the dog.", hint: "cum + ablative." },
  { id: "m8", words: ["Servus", "aquam", "portat"], english: "The slave carries water.", hint: "portat = carries." },
  { id: "m9", words: ["Fīlia", "in", "ātriō", "sedet"], english: "The daughter sits in the atrium.", hint: "Place where uses the ablative." },
  { id: "m10", words: ["Dominus", "servōs", "laudat"], english: "The master praises the slaves.", hint: "Plural object: servōs." },
];

export type MatchPair = {
  id: string;
  left: string;
  right: string;
  kind: "meaning" | "form" | "class";
};

export const MATCH_PAIRS: MatchPair[] = [
  { id: "p1", left: "amō", right: "I love", kind: "meaning" },
  { id: "p2", left: "portō", right: "I carry", kind: "meaning" },
  { id: "p3", left: "dūcō", right: "I lead", kind: "meaning" },
  { id: "p4", left: "scrībō", right: "I write", kind: "meaning" },
  { id: "p5", left: "hortus", right: "garden", kind: "meaning" },
  { id: "p6", left: "puella", right: "girl", kind: "meaning" },
  { id: "p7", left: "canis", right: "dog", kind: "meaning" },
  { id: "p8", left: "via", right: "road", kind: "meaning" },
  { id: "p9", left: "amō", right: "amāvī", kind: "form" },
  { id: "p10", left: "portō", right: "portāvī", kind: "form" },
  { id: "p11", left: "dūcō", right: "dūxī", kind: "form" },
  { id: "p12", left: "videō", right: "vīdī", kind: "form" },
  { id: "p13", left: "canis", right: "noun", kind: "class" },
  { id: "p14", left: "amat", right: "verb", kind: "class" },
  { id: "p15", left: "in", right: "preposition", kind: "class" },
  { id: "p16", left: "et", right: "conjunction", kind: "class" },
];

export type ManuscriptCase = {
  id: string;
  title: string;
  passage: string;
  blanks: { id: string; answer: string; choices: string[] }[];
  inspect: { word: string; question: string; answer: string; choices: string[] };
  english: string;
};

export const MANUSCRIPT_CASES: ManuscriptCase[] = [
  {
    id: "c1",
    title: "Case File I — In the garden",
    passage: "Puella in ___ lūdit. Canis quoque adest.",
    blanks: [
      { id: "b1", answer: "hortō", choices: ["hortō", "hortum", "hortus", "via"] },
    ],
    inspect: {
      word: "lūdit",
      question: "lūdit is:",
      answer: "3rd singular present",
      choices: ["1st singular present", "3rd singular present", "3rd plural present", "infinitive"],
    },
    english: "The girl plays in the garden. A dog is also present.",
  },
  {
    id: "c2",
    title: "Case File II — A gift of food",
    passage: "Māter fīliō ___ dat. Puer laetus est.",
    blanks: [
      { id: "b1", answer: "cibum", choices: ["cibum", "cibus", "cibō", "aquam"] },
    ],
    inspect: {
      word: "fīliō",
      question: "Why is fīliō in this form?",
      answer: "dative — to her son",
      choices: ["nominative — subject", "accusative — object", "dative — to her son", "ablative — by her son"],
    },
    english: "Mother gives food to her son. The boy is happy.",
  },
  {
    id: "c3",
    title: "Case File III — A letter home",
    passage: "Amīcus ___ scrībit et ad villam mittit.",
    blanks: [
      { id: "b1", answer: "epistulam", choices: ["epistulam", "epistula", "librum", "villam"] },
    ],
    inspect: {
      word: "mittit",
      question: "mittit means:",
      answer: "he/she sends",
      choices: ["he/she writes", "he/she sends", "he/she reads", "he/she carries"],
    },
    english: "The friend writes a letter and sends it to the house.",
  },
  {
    id: "c4",
    title: "Case File IV — On the road",
    passage: "Pater ___ viā ambulat. Servus aquam portat.",
    blanks: [
      { id: "b1", answer: "in", choices: ["in", "ad", "ē", "cum"] },
    ],
    inspect: {
      word: "portat",
      question: "portat is from which verb?",
      answer: "portō — I carry",
      choices: ["portō — I carry", "amō — I love", "dūcō — I lead", "sum — I am"],
    },
    english: "Father walks on the road. The slave carries water.",
  },
  {
    id: "c5",
    title: "Case File V — Praise in the atrium",
    passage: "Dominus servōs in ___ laudat.",
    blanks: [
      { id: "b1", answer: "ātriō", choices: ["ātriō", "ātrium", "hortō", "viā"] },
    ],
    inspect: {
      word: "servōs",
      question: "servōs is:",
      answer: "accusative plural",
      choices: ["nominative singular", "nominative plural", "accusative singular", "accusative plural"],
    },
    english: "The master praises the slaves in the atrium.",
  },
  {
    id: "c6",
    title: "Case File VI — They are in the city",
    passage: "Puella et māter in urbe ___. Forum spectant.",
    blanks: [
      { id: "b1", answer: "sunt", choices: ["est", "sunt", "sum", "erat"] },
    ],
    inspect: {
      word: "spectant",
      question: "spectant means:",
      answer: "they watch",
      choices: ["I watch", "he watches", "they watch", "we watch"],
    },
    english: "The girl and her mother are in the city. They look at the forum.",
  },
];

export const LATIN_GAMES = [
  {
    id: "forma-forge",
    name: "Forma Forge",
    kicker: "Forms",
    blurb: "Repair forms, endings and patterns.",
    levels: 6,
  },
  {
    id: "sentence-mosaic",
    name: "Sentence Mosaic",
    kicker: "Sentences",
    blurb: "Build valid Latin sentences.",
    levels: 6,
  },
  {
    id: "verbum-match",
    name: "Verbum Match",
    kicker: "Connections",
    blurb: "Meanings, forms and grammar links.",
    levels: 6,
  },
  {
    id: "manuscript",
    name: "Manuscript Mystery",
    kicker: "Investigate",
    blurb: "Restore, inspect and interpret.",
    levels: 6,
  },
] as const;
