export type FrenchVocab = {
  id: string;
  french: string;
  english: string;
  topic: string;
  section: number;
  spelling: boolean;
};

export type FrenchQuestion = {
  id: string;
  prompt: string;
  answer: string;
  accepted: string[];
  choices: string[];
  explain: string;
  topic: string;
};

export type FrenchWriting = {
  id: string;
  title: string;
  prompt: string;
  sentences: number;
  requirements: string[];
  model: string;
};

export const FRENCH_VOCAB: FrenchVocab[] = [
  { id: "fv1", french: "bonjour", english: "hello / good morning", topic: "Greetings", section: 1, spelling: true },
  { id: "fv2", french: "au revoir", english: "goodbye", topic: "Greetings", section: 1, spelling: true },
  { id: "fv3", french: "merci", english: "thank you", topic: "Greetings", section: 1, spelling: true },
  { id: "fv4", french: "s'il vous plaît", english: "please (formal)", topic: "Greetings", section: 1, spelling: true },
  { id: "fv5", french: "s'il te plaît", english: "please (informal)", topic: "Greetings", section: 1, spelling: true },
  { id: "fv6", french: "comment tu t'appelles ?", english: "what is your name?", topic: "Greetings", section: 1, spelling: false },
  { id: "fv7", french: "je m'appelle", english: "my name is", topic: "Greetings", section: 1, spelling: true },
  { id: "fv8", french: "la mère", english: "the mother", topic: "Family", section: 2, spelling: true },
  { id: "fv9", french: "le père", english: "the father", topic: "Family", section: 2, spelling: true },
  { id: "fv10", french: "le frère", english: "the brother", topic: "Family", section: 2, spelling: true },
  { id: "fv11", french: "la sœur", english: "the sister", topic: "Family", section: 2, spelling: true },
  { id: "fv12", french: "la famille", english: "the family", topic: "Family", section: 2, spelling: true },
  { id: "fv13", french: "l'école", english: "the school", topic: "School", section: 3, spelling: true },
  { id: "fv14", french: "le livre", english: "the book", topic: "School", section: 3, spelling: true },
  { id: "fv15", french: "le professeur", english: "the teacher", topic: "School", section: 3, spelling: true },
  { id: "fv16", french: "un cahier", english: "an exercise book", topic: "School", section: 3, spelling: true },
  { id: "fv17", french: "j'aime", english: "I like", topic: "Opinions", section: 4, spelling: true },
  { id: "fv18", french: "je n'aime pas", english: "I don't like", topic: "Opinions", section: 4, spelling: true },
  { id: "fv19", french: "parce que", english: "because", topic: "Opinions", section: 4, spelling: true },
  { id: "fv20", french: "intéressant", english: "interesting", topic: "Opinions", section: 4, spelling: true },
  { id: "fv21", french: "ennuyeux", english: "boring", topic: "Opinions", section: 4, spelling: true },
  { id: "fv22", french: "être", english: "to be", topic: "Verbs", section: 5, spelling: true },
  { id: "fv23", french: "avoir", english: "to have", topic: "Verbs", section: 5, spelling: true },
  { id: "fv24", french: "aller", english: "to go", topic: "Verbs", section: 5, spelling: true },
  { id: "fv25", french: "faire", english: "to do / to make", topic: "Verbs", section: 5, spelling: true },
  { id: "fv26", french: "je suis", english: "I am", topic: "Verbs", section: 5, spelling: true },
  { id: "fv27", french: "j'ai", english: "I have", topic: "Verbs", section: 5, spelling: true },
  { id: "fv28", french: "je vais", english: "I go / I am going", topic: "Verbs", section: 5, spelling: true },
  { id: "fv29", french: "lundi", english: "Monday", topic: "Time", section: 6, spelling: true },
  { id: "fv30", french: "aujourd'hui", english: "today", topic: "Time", section: 6, spelling: true },
  { id: "fv31", french: "demain", english: "tomorrow", topic: "Time", section: 6, spelling: true },
  { id: "fv32", french: "le week-end", english: "the weekend", topic: "Time", section: 6, spelling: true },
  { id: "fv33", french: "la ville", english: "the town / city", topic: "Town", section: 7, spelling: true },
  { id: "fv34", french: "j'habite", english: "I live", topic: "Town", section: 7, spelling: true },
  { id: "fv35", french: "il y a", english: "there is / there are", topic: "Town", section: 7, spelling: true },
  { id: "fv36", french: "un magasin", english: "a shop", topic: "Town", section: 7, spelling: true },
  { id: "fv37", french: "un café", english: "a café", topic: "Town", section: 7, spelling: true },
  { id: "fv38", french: "un parc", english: "a park", topic: "Town", section: 7, spelling: true },
  { id: "fv39", french: "une gare", english: "a station", topic: "Town", section: 7, spelling: true },
  { id: "fv40", french: "un musée", english: "a museum", topic: "Town", section: 7, spelling: true },
  { id: "fv41", french: "une église", english: "a church", topic: "Town", section: 7, spelling: true },
  { id: "fv42", french: "on peut", english: "you can / one can", topic: "Town", section: 7, spelling: true },
  { id: "fv43", french: "c'est", english: "it is", topic: "Town", section: 7, spelling: true },
  { id: "fv44", french: "les gens", english: "people", topic: "Town", section: 7, spelling: true },
  { id: "fv45", french: "le pain", english: "bread", topic: "Food", section: 8, spelling: true },
  { id: "fv46", french: "le fromage", english: "cheese", topic: "Food", section: 8, spelling: true },
  { id: "fv47", french: "l'eau", english: "water", topic: "Food", section: 8, spelling: true },
  { id: "fv48", french: "manger", english: "to eat", topic: "Food", section: 8, spelling: true },
  { id: "fv49", french: "boire", english: "to drink", topic: "Food", section: 8, spelling: true },
  { id: "fv50", french: "le sport", english: "sport", topic: "Hobbies", section: 9, spelling: true },
  { id: "fv51", french: "la musique", english: "music", topic: "Hobbies", section: 9, spelling: true },
  { id: "fv52", french: "jouer", english: "to play", topic: "Hobbies", section: 9, spelling: true },
  { id: "fv53", french: "regarder", english: "to watch", topic: "Hobbies", section: 9, spelling: true },
  { id: "fv54", french: "lire", english: "to read", topic: "Hobbies", section: 9, spelling: true },
  { id: "fv55", french: "et", english: "and", topic: "Connectives", section: 10, spelling: true },
  { id: "fv56", french: "mais", english: "but", topic: "Connectives", section: 10, spelling: true },
  { id: "fv57", french: "aussi", english: "also", topic: "Connectives", section: 10, spelling: true },
  { id: "fv58", french: "cependant", english: "however", topic: "Connectives", section: 10, spelling: true },
  { id: "fv59", french: "donc", english: "so / therefore", topic: "Connectives", section: 10, spelling: true },
  { id: "fv60", french: "grand(e)", english: "big / tall", topic: "Opinions", section: 4, spelling: true },
  { id: "fv61", french: "petit(e)", english: "small", topic: "Opinions", section: 4, spelling: true },
  { id: "fv62", french: "joli(e)", english: "pretty", topic: "Opinions", section: 4, spelling: true },
  { id: "fv63", french: "il fait beau", english: "the weather is fine", topic: "Time", section: 6, spelling: true },
  { id: "fv64", french: "il pleut", english: "it is raining", topic: "Time", section: 6, spelling: true },
  { id: "fv65", french: "hier", english: "yesterday", topic: "Time", section: 6, spelling: true },
  { id: "fv66", french: "je vais", english: "I am going", topic: "Verbs", section: 5, spelling: true },
  { id: "fv67", french: "j'ai visité", english: "I visited", topic: "Verbs", section: 5, spelling: true },
  { id: "fv68", french: "sympa", english: "nice / kind", topic: "Opinions", section: 4, spelling: true },
];

export const FRENCH_QUESTIONS: FrenchQuestion[] = [
  {
    id: "fq1",
    prompt: "What does bonjour mean?",
    answer: "hello",
    accepted: ["hello", "good morning", "good day", "hello / good morning"],
    choices: ["hello", "goodbye", "please", "thank you"],
    explain: "bonjour is the standard daytime greeting.",
    topic: "Greetings",
  },
  {
    id: "fq2",
    prompt: "How do you say ‘thank you’ in French?",
    answer: "merci",
    accepted: ["merci"],
    choices: ["merci", "bonjour", "au revoir", "salut"],
    explain: "merci = thank you. merci beaucoup = thank you very much.",
    topic: "Greetings",
  },
  {
    id: "fq3",
    prompt: "la sœur means:",
    answer: "the sister",
    accepted: ["the sister", "sister"],
    choices: ["the mother", "the sister", "the daughter", "the aunt"],
    explain: "Watch the œ in sœur — it is not soeur without the ligature in careful spelling, but soeur is also accepted in many exams.",
    topic: "Family",
  },
  {
    id: "fq4",
    prompt: "What is the French for ‘the father’?",
    answer: "le père",
    accepted: ["le père", "le pere", "père"],
    choices: ["le père", "la mère", "le frère", "le fils"],
    explain: "père takes a grave accent on the first e.",
    topic: "Family",
  },
  {
    id: "fq5",
    prompt: "je m'appelle is used to say:",
    answer: "my name is",
    accepted: ["my name is", "i am called", "i'm called"],
    choices: ["my name is", "I am", "I live", "I like"],
    explain: "s'appeler = to be called. je m'appelle Sam.",
    topic: "Greetings",
  },
  {
    id: "fq6",
    prompt: "Which verb means ‘to go’?",
    answer: "aller",
    accepted: ["aller"],
    choices: ["être", "avoir", "aller", "faire"],
    explain: "aller is irregular: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.",
    topic: "Verbs",
  },
  {
    id: "fq7",
    prompt: "je n'aime pas means:",
    answer: "I don't like",
    accepted: ["i don't like", "i do not like", "i dislike"],
    choices: ["I like", "I love", "I don't like", "I prefer"],
    explain: "ne … pas around the verb makes a negative. j'aime → je n'aime pas.",
    topic: "Opinions",
  },
  {
    id: "fq8",
    prompt: "parce que means:",
    answer: "because",
    accepted: ["because"],
    choices: ["but", "because", "and", "so"],
    explain: "Use parce que to justify an opinion: J'aime le français parce que c'est intéressant.",
    topic: "Opinions",
  },
  {
    id: "fq9",
    prompt: "Which is ‘I have’?",
    answer: "j'ai",
    accepted: ["j'ai", "j ai", "jai"],
    choices: ["je suis", "j'ai", "je vais", "je fais"],
    explain: "avoir: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
    topic: "Verbs",
  },
  {
    id: "fq10",
    prompt: "aujourd'hui means:",
    answer: "today",
    accepted: ["today"],
    choices: ["yesterday", "today", "tomorrow", "tonight"],
    explain: "aujourd'hui = today. demain = tomorrow. hier = yesterday.",
    topic: "Time",
  },
  {
    id: "fq11",
    prompt: "l'école means:",
    answer: "the school",
    accepted: ["the school", "school"],
    choices: ["the book", "the school", "the teacher", "the lesson"],
    explain: "école is feminine; elision gives l'école.",
    topic: "School",
  },
  {
    id: "fq12",
    prompt: "How do you say ‘I am’?",
    answer: "je suis",
    accepted: ["je suis"],
    choices: ["j'ai", "je suis", "je vais", "je fais"],
    explain: "être: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.",
    topic: "Verbs",
  },
  {
    id: "fq13",
    prompt: "Translate into French: I live in a small city.",
    answer: "J'habite dans une petite ville.",
    accepted: [
      "j'habite dans une petite ville",
      "j habite dans une petite ville",
      "jhabite dans une petite ville",
      "j'habite dans une petite ville.",
    ],
    choices: [
      "J'habite dans une petite ville.",
      "Je vis dans un grand pays.",
      "Il y a une petite ville.",
      "J'aime la petite ville.",
    ],
    explain: "j'habite = I live. dans une petite ville = in a small town/city. ville is feminine so petite agrees.",
    topic: "Town",
  },
  {
    id: "fq14",
    prompt: "il y a means:",
    answer: "there is / there are",
    accepted: ["there is", "there are", "there is / there are"],
    choices: ["there is / there are", "I have", "it is", "you can"],
    explain: "il y a introduces what exists in a place: Il y a un parc.",
    topic: "Town",
  },
  {
    id: "fq15",
    prompt: "How do you say ‘because’?",
    answer: "parce que",
    accepted: ["parce que", "parceque"],
    choices: ["mais", "parce que", "aussi", "donc"],
    explain: "Use parce que to give a reason after an opinion.",
    topic: "Connectives",
  },
];

export const FRENCH_WRITING: FrenchWriting[] = [
  {
    id: "w1",
    title: "Introduce yourself",
    prompt: "Write 3–4 sentences presenting yourself: name, age, family, and one thing you like.",
    sentences: 3,
    requirements: [
      "Use je m'appelle",
      "Give an age with j'ai … ans",
      "Mention family or a friend",
      "Include j'aime or je n'aime pas",
    ],
    model:
      "Je m'appelle Sam et j'ai treize ans. J'habite avec ma mère et mon frère. J'aime le français parce que c'est intéressant.",
  },
  {
    id: "w2",
    title: "A day at school",
    prompt: "Describe your school day in 3–4 sentences. Mention a subject, an opinion, and when.",
    sentences: 3,
    requirements: [
      "Name at least one school subject",
      "Give an opinion with parce que",
      "Use a time word (aujourd'hui, lundi, le week-end)",
    ],
    model:
      "Aujourd'hui j'ai français et sciences. J'aime le français parce que le professeur est sympa. Je n'aime pas les maths parce que c'est difficile.",
  },
  {
    id: "w3",
    title: "Weekend plans",
    prompt: "Say what you are going to do this weekend using aller + infinitive.",
    sentences: 3,
    requirements: [
      "Use je vais at least once",
      "Mention a place or activity",
      "Use le week-end or demain",
    ],
    model:
      "Le week-end, je vais au parc avec mon frère. Demain je vais faire mes devoirs. Ensuite je vais regarder un film.",
  },
  {
    id: "w4",
    title: "Décris ta ville",
    prompt: "Write 80–100 words in French about your town or city. Include what there is, what you like (don’t like), and what people do there. Try to give opinions and reasons.",
    sentences: 8,
    requirements: [
      "Write 80–100 words",
      "Include a variety of vocabulary",
      "Use at least one opinion + reason",
      "Use different tenses (present and at least one other)",
      "Use connectives",
      "Check agreements (adjectives)",
      "Use accurate spelling and punctuation",
    ],
    model:
      "J'habite dans une petite ville près de la mer. C'est un endroit calme et agréable avec beaucoup de magasins, un beau parc et une vieille église. J'aime ma ville parce qu'il y a une bonne ambiance et les gens sont sympathiques. Le week-end on peut aller au café ou visiter le musée. Cependant, je n'aime pas les embouteillages. Hier j'ai visité le parc avec ma sœur.",
  },
];

export const FRENCH_GAMES = [
  { id: "mot-match", name: "Mot Match", kicker: "Vocabulary", blurb: "Match French and English. Grow your word power.", levels: 6 },
  { id: "phrase-mosaic", name: "Phrase Mosaic", kicker: "Sentences", blurb: "Build a French sentence from tiles.", levels: 6 },
] as const;
