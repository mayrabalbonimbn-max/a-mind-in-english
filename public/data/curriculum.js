/* A MIND IN ENGLISH · KLANG Personal Study Book
   Curriculum map. Each unit's full content lives in data/unit-XX.js.
   To add a unit: create data/unit-XX.js and add a <script> tag in index.html. */
window.KLANG = window.KLANG || {};
window.KLANG.units = window.KLANG.units || {};
window.KLANG.curriculum = {
  modules: [
    { id: 1, title: 'Language, Memory & Identity', units: [
      { id: '01', title: 'When a Language Goes Quiet', q: 'Can you really forget a language you once spoke well?', grammar: 'Present Perfect vs Past Simple · tense consistency · articles', think: 'Claim, evidence, assumption, inference', write: 'Short response + reflective essay' },
      { id: '02', title: 'The Self You Become in Another Language', q: 'Do we become slightly different people when we speak another language?', grammar: 'Present Perfect Continuous · aspect & duration · dependent prepositions', think: 'Fact vs inference', write: 'Personal essay · 300–500' },
      { id: '03', title: 'Memory Is Not a Recording', q: 'If memory constantly changes, what does it mean to remember something accurately?', grammar: 'Narrative tenses · Past Perfect', think: 'Evidence, uncertainty, alternative explanations', write: 'Analytical response' },
      { id: '04', title: 'The Stories We Tell Ourselves', q: 'How much of our identity is built from stories rather than facts?', grammar: 'Past Perfect Continuous · gerunds vs infinitives', think: 'Evidence vs interpretation', write: 'Long-form personal essay · 800–1,200', lf: true },
      { id: '05', title: 'Leaving Changes You', q: 'Can you leave a place without the place staying in you?', grammar: 'used to / would / be used to · future in the past', think: 'Hidden assumptions', write: 'Reflective essay · 450–600', star: true }
    ]},
    { id: 2, title: 'Love, Intimacy & Human Connection', units: [
      { id: '06', title: 'What Makes Love Feel Real?', q: 'How do we distinguish love from attachment, desire, habit and idealisation?', grammar: 'Modal verbs · degrees of certainty', think: 'Necessary vs sufficient conditions', write: 'Reflective essay' },
      { id: '07', title: 'When Friendship Stops Being Simple', q: 'What happens to a friendship when one of its unspoken rules changes?', grammar: 'Modal perfects · speculation & deduction', think: 'Possibility vs probability · ambiguity', write: 'Long-form reflective essay', star: true, lf: true },
      { id: '08', title: 'When Love Has to Be Explained', q: 'What happens when a relationship does not fit the social script people expect?', grammar: 'Relative clauses · participle clauses', think: 'Overgeneralisation · reading historical evidence', write: 'Cultural / argumentative essay' },
      { id: '09', title: 'Why We Stay After We Know', q: 'Why do people remain in situations they already know are making them unhappy?', grammar: 'Conditionals 0–3 · mixed conditionals · wish / if only', think: 'Sunk cost · alternative explanations', write: 'Argumentative essay (ENEM-style)' },
      { id: '10', title: 'The Ethics of Honesty', q: 'Do we always have the right to say what we believe is true?', grammar: 'Reported speech · distancing language', think: 'Competing principles · facts vs values', write: 'Long-form essay', lf: true }
    ]},
    { id: 3, title: 'Society, Power & Politics', units: [
      { id: '11', title: 'Who Gets Heard in a Democracy?', q: 'Is having the right to speak enough to guarantee meaningful political participation?', grammar: 'Passive voice · impersonal structures', think: 'False dichotomies · majority vs minority rights', write: 'Argumentative essay' },
      { id: '12', title: 'How Power Actually Works in Brazil', q: 'How much power does a Brazilian president actually have?', grammar: 'Reporting structures · advanced passive', think: 'Competence vs responsibility · causal chains', write: 'Explanatory / analytical essay' },
      { id: '13', title: 'Left, Right and Everything In Between', q: 'Can a single line from left to right describe what people actually believe?', grammar: 'Contrast (whereas, while, as opposed to) · noun clauses', think: 'Multi-dimensional positions · steelmanning', write: 'Analytical essay' },
      { id: '14', title: 'Inequality and the Story of Merit', q: 'To what extent can individual success be separated from social conditions?', grammar: 'Comparatives · quantifiers · cause & effect', think: 'Data, correlation, confounding variables', write: 'Argumentative essay (ENEM-style)', star: true },
      { id: '15', title: 'Who Pays for the State?', q: 'Who pays for the things everyone uses, and who decides?', grammar: 'Causatives · concession (although, despite)', think: 'Trade-offs', write: 'Short analytical response' },
      { id: '16', title: 'The Language of Politics', q: 'Can the same facts create completely different political stories?', grammar: 'Cleft sentences · fronting · hedging & boosting', think: 'Framing · missing information · source evaluation', write: 'Long-form analytical essay', star: true, lf: true }
    ]},
    { id: 4, title: 'Technology & Modern Life', units: [
      { id: '17', title: 'When AI Does the Thinking for Us', q: 'What happens when a tool becomes good enough to perform the thinking we once had to do ourselves?', grammar: 'Future forms · Future Continuous · Future Perfect', think: 'Predictions vs evidence', write: 'Argumentative essay' },
      { id: '18', title: 'The Algorithm Knows What Keeps You Looking', q: 'If an algorithm learns what captures our attention, who is shaping whom?', grammar: 'Complex noun phrases · nominalisation', think: 'Correlation vs causation · measurement', write: 'Analytical response' },
      { id: '19', title: 'Is Privacy Becoming a Luxury?', q: 'How much privacy are people willing to exchange for convenience?', grammar: 'Advanced conditionals · concession', think: 'Weighing competing values', write: 'Argumentative essay (ENEM-style)' },
      { id: '20', title: 'The Cost of Convenience', q: 'Does making life easier always make life better?', grammar: 'Ellipsis · substitution · discourse markers', think: 'Extended Thinking Lab', write: 'Long-form essay', lf: true }
    ]},
    { id: 5, title: 'Photography, Art & the Act of Looking', units: [
      { id: '21', title: 'Can a Photograph Ever Be Neutral?', q: 'Can a photograph document reality without also interpreting it?', grammar: 'Advanced & reduced relative clauses · participle clauses', think: 'Selection and omission', write: 'Analytical / argumentative essay' },
      { id: '22', title: 'The Ethics of Looking', q: 'Does being allowed to photograph something necessarily mean it should be photographed?', grammar: 'Advanced passive · impersonal language', think: 'Competing ethical principles', write: 'Argumentative essay' },
      { id: '23', title: 'Why Some Images Stay With Us', q: 'Why do some images remain vivid in memory while thousands of others disappear?', grammar: 'Clefts & pseudo-clefts · emphasis · sentence rhythm', think: 'Memory claims vs evidence', write: 'Personal / analytical essay · 500–700', star: true },
      { id: '24', title: 'Photographing What Is Sacred', q: 'What responsibilities come with documenting something that holds sacred meaning for other people?', grammar: 'Concession · register · diplomatic language', think: 'Whose perspective counts', write: 'Long-form cultural essay', lf: true }
    ]},
    { id: 6, title: 'Reasoning, Persuasion & Argument', units: [
      { id: '25', title: 'What Counts as Evidence?', q: 'When should we believe a claim?', grammar: 'Hedging · boosting · epistemic modality', think: 'Ranking evidence by strength', write: 'Argument analysis' },
      { id: '26', title: 'Correlation Is Not Causation — So What Is?', q: 'What would we actually need to know before claiming that X caused Y?', grammar: 'Cause/effect connectors · conditional reasoning', think: 'Confounding · reverse causality · controlled comparison', write: 'Data-informed analytical essay' },
      { id: '27', title: 'Why Smart People Believe Bad Arguments', q: 'Why do intelligent people defend arguments they would reject from someone else?', grammar: 'Concessive clauses (however much, much as)', think: 'Bias, identity and motivated reasoning · extended lab', write: 'Long-form analytical essay', star: true, lf: true },
      { id: '28', title: 'Persuasion Without Manipulation', q: 'Where does persuasion end and manipulation begin?', grammar: 'Rhetorical grammar (parallelism, tricolon) · connotation', think: 'Ethos, pathos, logos · framing', write: 'Argumentative essay' },
      { id: '29', title: 'The Art of Disagreement', q: 'Can we disagree strongly without simplifying the person we disagree with?', grammar: 'Advanced concession · inversion · contrast', think: 'Steelmanning · rebuttal', write: 'Debate essay: thesis, steelman, rebuttal, concession' }
    ]},
    { id: 7, title: 'Writing & Voice', units: [
      { id: '30', title: 'Writing That Sounds Like You', q: 'What makes a piece of writing recognisably yours?', grammar: 'Sentence variety · cohesion · register · punctuation', think: 'Comparing versions of the same idea', write: 'Personal essay' },
      { id: '31', title: 'Writing With Intensity Without Overwriting', q: 'How do you write with force without saying too much?', grammar: 'Repetition · restraint · imagery · stylistic grammar', think: 'What each sentence is doing', write: 'Long-form essay', lf: true },
      { id: '32', title: 'The Final Essay', q: 'One question from this book, and your answer to it.', grammar: 'Everything you have studied', think: 'Thesis workshop · argument map', write: 'Final project · 1,200–1,800', lf: true }
    ]}
  ]
};
