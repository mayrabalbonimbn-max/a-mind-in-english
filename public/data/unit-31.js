/* UNIT 31 · WRITING WITH INTENSITY WITHOUT OVERWRITING */
(function (K) {
  K.units['31'] = K.makeUnit('31', {
    module: 7, title: 'Writing with intensity', titleEm: 'without overwriting',
    question: 'How do you write with force without saying too much?',
    knowLead: `When writers want to convey deep emotion, tragedy, or profound philosophical insight, their natural instinct is often to reach for more: more adjectives, more dramatic adverbs, more hyperbolic metaphors, and more exclamation points. They assume that intensity is manufactured through volume. Yet the result is almost invariably what literary critics call "purple prose"—exhausting, melodramatic writing that suffocates the reader and trivializes the very emotions it seeks to evoke. The true secret of literary force in the English language lies in the opposite direction: in radical restraint, compression, concrete nouns, and the power of what is left unsaid. How do you make prose burn with white-hot intensity while exercising supreme aesthetic economy? Consider the discipline of literary restraint as you read.`,
    terms: [
      ['The Iceberg Theory', `Ernest Hemingway\'s aesthetic principle that the dignified movement of an iceberg is due to only one-eighth of it being above water; the omitted seven-eighths provide the invisible underwater mass and emotional pressure.`],
      ['Purple prose', `Writing that is excessively ornate, florid, and melodramatic, weighed down by unnecessary adjectives, strained metaphors, and performative emotionalism.`],
      ['Radical compression', `The deliberate stylistic technique of condensing an expansive emotional or philosophical experience into a few precise, unadorned concrete words.`],
      ['Syntactic restraint', `The conscious avoidance of emotional hyperbole, relying instead on clean sentence structure and concrete sensory nouns to let the facts carry their own emotional weight.`],
      ['Stylistic anaphora', `The deliberate repetition of a word or phrase at the beginning of successive clauses to build emotional cadence and cumulative rhythmic pressure.`]
    ],
    views: [
      'Two perspectives on literary intensity',
      'The minimalist / restraint stance',
      `True emotional power resides in subtraction. When you strip away decorative adverbs and melodramatic adjectives, the unvarnished reality strikes the reader with devastating, unforgettable physical force.`,
      'The maximalist / baroque stance',
      `Restraint is not a universal virtue; expansive, ornate, and torrential prose (from Melville and Faulkner to García Márquez) captures the overwhelming, ecstatic, and chaotic complexity of human existence.`,
      `The core challenge is understanding how to generate intense emotional resonance without descending into hollow sentimentality or overwriting.`
    ],
    knowPrompt: `Why is a simple, austere statement like "The child died at dawn" often far more devastating to read than "The sweet, innocent, beautiful little child tragically perished in the painful, agonized darkness before morning"?`,
    knowGuide: [
      `Analyze how stacking adjectives and emotional adverbs tells the reader what to feel rather than letting the concrete tragedy speak for itself.`,
      `Reflect on how silence and restraint create emotional pressure in the reader\'s imagination.`
    ],
    read: {
      main: {
        format: 'Literary & stylistic essay', title: 'The White-Hot Flame: Compression, Restraint, and the Architecture of Force',
        standfirst: `To make a sentence burn with genuine intensity, you must starve it of unnecessary fuel.`,
        pull: { after: 5, text: `If a writer knows enough about what they are writing, they may omit things that they know and the reader will feel them as strongly as though the writer had stated them.` },
        notes: { 1: `<b>Ernest Hemingway</b> articulated the Iceberg Theory in <i>Death in the Afternoon</i> (1932).`, 3: `<b>Joan Didion</b> demonstrated the power of flat, clinical restraint when writing about grief in <i>The Year of Magical Thinking</i> (2005).` },
        paras: [
          `There is a widespread, almost universal delusion among writers that emotional intensity is a matter of volume. When confronted with an overwhelming subject—grief, terror, ecstasy, or historical catastrophe—the untrained writer instinctive reaches for an avalanche of modifiers. They pile adjective upon adjective, stack adverb upon adverb, and exhaust the thesaurus in a frantic attempt to convince the reader of the magnitude of the event. Yet the paradox of prose is absolute: the more loudly you tell the reader how to feel, the less they feel anything at all. Overwritten prose is like an actor who screams, weeps, and flails hysterically across the stage; instead of moving the audience to tears, it induces only embarrassment and detached amusement.`,
          `Great writing in the English tradition achieves its power through an entirely different dynamic: the discipline of restraint. When Ernest Hemingway formulated his famous "Iceberg Theory" in 1932, he was describing a profound physical principle of language. Seven-eighths of an iceberg’s mass resides beneath the surface of the sea, unseen by the human eye. It is this hidden, submerged mass that gives the iceberg its terrifying dignity and crushing momentum. In prose, the words on the page represent only the tip; the emotional weight, the historical subtext, and the unspoken grief must reside in the pressurized silence between the lines. When a writer possesses the courage to omit what is already understood, the reader’s imagination is forced to supply the missing mass, creating an active, co-creative emotional engagement.`,
          `Consider how Joan Didion opens her masterpiece on sudden bereavement, *The Year of Magical Thinking*. Confronted with the instantaneous death of her husband of forty years, Didion does not write about shattered souls, broken hearts, or torrential weeping. She writes four simple, declarative lines: "Life changes in the instant. The ordinary instant. You sit down to dinner and life as you know it ends. The question of self-pity." There are no dramatic adverbs, no florid metaphors, no self-indulgent theatricality. The prose is as flat, cold, and precise as an autopsy report. And it is precisely this clinical restraint that makes the passage almost unbearable in its devastating emotional power. Didion understands that when reality is already tragic, decorating it with adjectives is an act of aesthetic trivialization.`,
          `The mechanics of intensity without overwriting depend upon three strict stylistic disciplines. The first is the radical elimination of qualifying adverbs. Words like *very, extremely, terribly, incredibly, profoundly*, and *truly* are linguistic parasites; they drain vitality from verbs and nouns while signaling authorial insecurity. When you write "She was terribly devastated," the adverb *terribly* actually weakens the verb *devastated*. Strong prose pairs concrete nouns with vigorous, unadorned verbs, letting the raw event deliver its own kinetic impact.`,
          `The second discipline is the mastery of sensory grounding. Abstract emotional claims ("He experienced unbearable existential agony") leave the reader’s nervous system cold. Concrete sensory physical details ("He sat on the kitchen floor in the dark, staring at his unwashed hands") immediately activate the reader’s mirror neurons. Emotion is not communicated through philosophical abstraction; it is transmitted through the physical texture of the world.`,
          `The third discipline is the strategic use of rhythmic repetition (anaphora) and structural cadence. When a single word or phrase is repeated with deliberate, rhythmic restraint, it builds cumulative psychological pressure like a recurring heartbeat. The force does not come from new adjectives, but from the relentless, escalating gravity of the syntax.`,
          `Ultimately, writing with intensity requires the humility of subtraction. It requires recognizing that words are precious, volatile, and heavy. To write with supreme force is not to say everything that can possibly be said; it is to find the three exact words that cannot be broken, and then to possess the supreme artistic confidence to fall silent.`
        ]
      },
      counter: {
        format: 'Maximalist defense', title: 'The Glory of the Torrent: In Defense of Baroque Excess',
        standfirst: `Ascetic minimalism is not the only path to literary greatness; expansive, ornate excess captures dimensions of reality that restraint cannot reach.`,
        paras: [
          `While the discipline of Hemingwayesque minimalism has its place, elevating austerity into an absolute moral commandment severely impoverishes the English language.` ,
          `Human consciousness is not a cold, sparse iceberg; it is an overflowing, chaotic, and ecstatic torrent. From the oceanic sprawling sentences of Herman Melville and William Faulkner to the kaleidoscopic maximalism of Gabriel García Márquez, Salman Rushdie, and David Foster Wallace, the greatest triumphs of world literature frequently emerge not from restraint, but from breathtaking, symphonic excess.` ,
          `When Faulkner writes a two-page periodic sentence packed with cascading adjectives, archaic metaphors, and multiple dependent clauses, he is not "overwriting" out of laziness. He is constructing an immersive linguistic cathedral designed to recreate the suffocating weight of Southern history and human memory.` ,
          `To declare that all adjectives are evil and all sentences should be short is to turn prose into dry, militaristic rations. There are times when writing must be sparse; but there are also times when writing must roar, overflow its banks, and dazzle the imagination with uninhibited baroque splendor.`
        ]
      }
    },
    sources: [
      { title: 'Death in the Afternoon (Ernest Hemingway)', url: 'https://www.simonandschuster.com/books/Death-in-the-Afternoon/Ernest-Hemingway/9780684801452', note: 'Essential text articulating the Iceberg Theory and the craft of omission.' },
      { title: 'The Year of Magical Thinking (Joan Didion)', url: 'https://www.vintagebooks.com', note: 'Masterpiece of austere, clinical restraint applied to profound personal grief.' },
      { title: 'Absalom, Absalom! (William Faulkner)', url: 'https://www.penguinrandomhouse.com/books/49045/absalom-absalom-by-william-faulkner/', note: 'The pinnacle of Southern Gothic maximalism and torrential syntactic ambition.' }
    ],
    interpret: [
      { id: '31i1', type: 'mc', tag: 'Main idea', q: `What is the core aesthetic principle of writing with intensity without overwriting according to the main essay?`, options: [`Writers must use at least five adjectives before every noun to ensure strong emotion.`, `True emotional force is achieved through restraint, radical compression, concrete sensory nouns, unadorned verbs, and the power of what is left unsaid (the Iceberg Theory).`, `All literature should be written in Latin to increase historical weight.`, `Personal essays should always end with three exclamation points.`], answer: 1, explain: `The essay establishes that emotional intensity is generated through restraint, compression, concrete grounding, and omission rather than adjective-heavy melodrama.` },
      { id: '31i2', type: 'mc', tag: 'Detail', q: `What is Ernest Hemingway’s "Iceberg Theory" of prose?`, options: [`Writing should only be done in cold winter climates.`, `The visible words on the page represent only one-eighth of the story; the omitted seven-eighths provide the underwater mass and emotional pressure.`, `Essays should always melt into different literary genres.`, `Writers should store their notebooks inside a refrigerator.`], answer: 1, explain: `Hemingway posited that omitting known subtext creates immense emotional mass beneath the surface of the prose.` },
      { id: '31i3', type: 'mc', tag: 'Inference', q: `Why does Joan Didion’s clinical, flat opening to *The Year of Magical Thinking* achieve such devastating power?`, options: [`Because she included a complete financial spreadsheet.`, `Because by refusing melodramatic theatricality and stating the tragic facts with unadorned precision, she avoids trivializing the grief and forces the reader’s imagination to confront the abyss.`, `Because the book was published as a medical manual.`, `Because she used rhyming couplets throughout the chapter.`], answer: 1, explain: `Didion’s austere restraint matches the shock of bereavement, letting unvarnished reality carry its own crushing weight.` },
      { id: '31i4', type: 'quote', tag: 'Evidence', q: `Which phrase from the text describes qualifying adverbs (like *very, extremely, terribly*)?`, find: `linguistic parasites; they drain vitality from verbs`, quote: `Words like *very, extremely, terribly, incredibly, profoundly*, and *truly* are linguistic parasites; they drain vitality from verbs and nouns while signaling authorial insecurity.`, explain: `The text explicitly condemns lazy qualifying adverbs as linguistic parasites that weaken verbs.` },
      { id: '31i5', type: 'mc', tag: 'Synthesis', q: `How does the maximalist counter-perspective defend baroque, adjective-rich prose?`, options: [`By arguing that long words are cheaper to print than short words.`, `By demonstrating that sprawling, torrential syntax (as in Faulkner or Melville) captures the overwhelming, chaotic, and ecstatic complexity of human consciousness that minimalism cannot reach.`, `By claiming that punctuation marks should be outlawed.`, `By asserting that readers prefer reading dictionaries over novels.`], answer: 1, explain: `The counter-text explains that deliberate maximalism constructs immersive, cathedral-like linguistic worlds.` },
      { id: '31i6', type: 'mc', tag: 'Vocabulary in context', q: `What is meant by the literary term "purple prose"?`, options: [`Writing printed using purple ink ribbons.`, `Prose that is excessively ornate, melodramatic, and flowery, calling attention to its own overwritten theatricality.`, `A genre of political writing associated with royalty.`, `Poetry written during the Roman Empire.`], answer: 1, explain: `Purple prose refers to florid, overly ornate writing that suffocates meaning with excessive decoration.` },
      { id: '31i7', type: 'mc', tag: 'Critical thinking', q: `What is the fundamental difference between abstract emotional claim and concrete sensory grounding?`, options: [`Abstract claims are typed; sensory details are handwritten.`, `Abstract claims tell the reader how to feel ("He was sad"), whereas sensory details show the physical reality ("He sat in the dark staring at his hands"), activating the reader\'s mirror neurons.`, `Abstract claims only apply to science; sensory details only apply to cooking.`, `There is no difference between abstract and concrete language.`], answer: 1, explain: `Concrete sensory grounding allows the reader to experience the physical reality and generate their own authentic emotional response.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Stylistic repetition (Anaphora) vs purple overwriting',
        lead: `C1 prose generates rhythmic intensity by deploying disciplined anaphora—repeating a single foundational word or structural pattern at the beginning of successive clauses—to build cumulative momentum.`,
        examples: [
          `*Life changes in the instant.* *The ordinary instant.* (Didion’s rhythmic repetition)`,
          `*We write to remember.* *We write to understand.* *We write to survive.* (Parallel anaphoric build)`,
          `*No adjectives could soften the blow;* *no excuses could undo the damage;* *no words could fill the silence.* (Triadic anaphoric cadence)`
        ],
        questions: [
          `How does repeating a clean, simple structural unit create more emotional gravity than introducing three different complex metaphors?`,
          `Notice how anaphora mimics the physical heartbeat of intense human emotion—insistent, escalating, and unyielding.`
        ],
        explain: `Repetition in the hands of a novice is accidental clutter; in the hands of a master, it is the deliberate hammer of cadence. When you repeat a core motif, you deepen the groove of thought in the reader’s mind.`,
        compare: [
          [`Overwritten / Purple`, `The terribly agonizing, utterly horrifying, and deeply painful sadness tore through her shattered soul.`],
          [`Austere Anaphora`, `She lost the house. She lost the money. She lost the child. In the end, she kept only her name.`]
        ],
        practice: [
          { q: `Craft a three-part anaphoric sentence using "It is not..." to establish intellectual discipline:`, a: `It is not the volume of your words that persuades; it is not the decoration of your sentences that endures; it is the uncompromising precision of your truth.` },
          { q: `Condense this melodramatic sentence into an austere two-sentence anaphoric statement: "The catastrophic war destroyed everything we loved and burned all our beautiful dreams forever."`, a: `The war took the city. The war took the future. We walked away through the smoke.` }
        ],
        radar: [
          `Use anaphora deliberately and sparingly; overusing it in every paragraph creates artificial theatricality.`,
          `Ensure the repeated word is simple and foundational (e.g., *It was, We saw, There is*).`
        ],
        help: `Deploy anaphora in the climax of your essay to synthesize your core philosophical or emotional stakes.`
      },
      {
        title: 'Focus 2 · The architecture of restraint: eliminating qualifiers & relying on concrete nouns',
        lead: `Transform weak, melodramatic prose into steel-hard C1 prose by stripping away lazy qualifiers (*very, really, extremely, truly, deeply*) and anchoring abstract claims in visceral physical nouns.`,
        examples: [
          `Weak: *He was extremely angry and felt deeply betrayed by his very close friend.*`,
          `Restrained C1: *He set the letter on the table, locked the door, and never spoke his brother's name again.*`,
          `Weak: *The poverty was truly heartbreaking and incredibly terrible.* -> Restrained C1: *In the doorway, three children shared a single bowl of cold rice.*`
        ],
        questions: [
          `Why does showing the unwashed bowl of cold rice move the reader far more than labeling the poverty "truly heartbreaking"?`,
          `Observe how deleting "very" and "deeply" forces the verb or noun to bear its true weight.`
        ],
        explain: `Adverbs are often an apology for choosing the wrong verb. When you choose the exact verb and ground the scene in physical reality, the prose requires zero emotional coaching.`
        ,
        compare: [
          [`Qualified clutter`, `The economy collapsed in a very sudden and deeply catastrophic manner.`],
          [`Muscular restraint`, `Overnight, the currency vanished, banks shuttered their iron gates, and bread lines stretched across the square.`]
        ],
        practice: [
          { q: `Strip all qualifiers and rewrite with sensory grounding: "The soldier was extremely frightened during the very loud bombing."`, a: `The plaster rained down from the ceiling; the soldier pressed his forehead into the dirt and counted the seconds between concussions.` }
        ],
        radar: [
          `Search your drafts for "very", "extremely", "really", and "deeply". Delete 90% of them on sight.`
        ],
        help: `Ask yourself: "What physical object or action proves this emotion?" Replace the emotion label with the physical proof.`
      }
    ],
    vocab: [
      ['austerity', 'noun', 'Sternness or severity of manner or attitude; extreme simplicity and plainness in style, living, or appearance.', 'Didion’s prose is celebrated for its chilling emotional austerity.', 'The austerity of the landscape mirrored his internal state.', ['literary austerity', 'aesthetic austerity', 'chilling austerity'], ['severity', 'plainness', 'restraint'], 'Stylistic noun.', '/ɒˈster.ə.ti/', 'ornateness'],
      ['florid', 'adjective', 'Excessively intricate, ornate, and decorated; elaborately flowery in style.', 'His speech was bogged down by florid 19th-century metaphors.', 'She avoided florid descriptions in her journalism.', ['florid prose', 'florid style', 'florid rhetoric'], ['ornate', 'flowery', 'baroque'], 'Critical adjective.', '/ˈflɒr.ɪd/', 'austere'],
      ['visceral', 'adjective', 'Relating to deep inward feelings rather than intellect; physical and gut-level.', 'The concrete sensory details produced a visceral reaction in the reader.', 'He felt a visceral disgust at the deception.', ['visceral reaction', 'visceral impact', 'visceral force'], ['instinctive', 'gut', 'physical'], 'Formal adjective.', '/ˈvɪs.ər.əl/', 'cerebral'],
      ['anaphora', 'noun', 'The repetition of a word or phrase at the beginning of successive clauses or sentences for rhetorical effect.', 'Churchill used anaphora in his famous "We shall fight on the beaches" speech.', 'Anaphora lends prophetic cadence to prose.', ['rhetorical anaphora', 'stylistic anaphora', 'use of anaphora'], ['repetition', 'parallelism', 'cadence'], 'Rhetorical noun.', '/əˈnæf.ər.ə/', null],
      ['bereavement', 'noun', 'The state of suffering the loss of a loved one through death; grief and mourning.', 'Her memoir deconstructs the sudden shock of bereavement.', 'He offered condolences during their time of bereavement.', ['sudden bereavement', 'intense bereavement', 'time of bereavement'], ['grief', 'mourning', 'loss'], 'Formal noun.', '/bɪˈriːv.mənt/', null],
      ['baroque', 'adjective', 'Highly ornate, elaborate, and extravagant in style, architecture, or literature.', 'Faulkner created a baroque linguistic cathedral of Southern history.', 'The novel was criticized for its baroque complexity.', ['baroque style', 'baroque complexity', 'baroque excess'], ['ornate', 'extravagant', 'complex'], 'Aesthetic adjective.', '/bəˈrɒk/', 'minimalist'],
      ['unadorned', 'adjective', 'Not decorated with something added for embellishment; plain, direct, and bare.', 'The truth was presented in unadorned, muscular prose.', 'Her unadorned testimony moved the jury.', ['unadorned truth', 'unadorned prose', 'unadorned facts'], ['plain', 'simple', 'bare'], 'Stylistic adjective.', '/ˌʌn.əˈdɔːnd/', 'embellished'],
      ['melodrama', 'noun', 'A sensational narrative or performance with exaggerated characters, overwrought emotions, and theatrical effects.', 'Overwriting turns genuine tragedy into hollow melodrama.', 'The film descended into cheap melodrama.', ['hollow melodrama', 'cheap melodrama', 'pure melodrama'], ['theatricality', 'histrionics', 'sentimentality'], 'Dramatic noun.', '/ˈmel.əˌdrɑː.mə/', 'understatement'],
      ['modifier', 'noun', 'A word, phrase, or clause that qualifies the meaning of another element in the sentence (e.g., adjectives, adverbs).', 'Prune unnecessary modifiers from your second draft.', 'Adjective stacking is a sign of modifier abuse.', ['unnecessary modifier', 'dangling modifier', 'pile of modifiers'], ['qualifier', 'descriptor', 'attribute'], 'Grammatical noun.', '/ˈmɒd.ɪ.faɪ.ər/', null],
      ['concussion', 'noun', 'A violent shock as from a heavy blow or explosion; the physical blast wave.', 'The soldier counted the seconds between concussions.', 'The explosive concussion rattled windows across the city.', ['explosive concussion', 'blast concussion', 'physical concussion'], ['shockwave', 'impact', 'detonation'], 'Physical noun.', '/kənˈkʌʃ.ən/', null]
    ],
    chunks: [
      ['the iceberg theory', 'Hemingway’s aesthetic principle that the visible words gain power from the vast omitted subtext beneath.', 'Explaining literary restraint', 'Literary · aesthetic', 'Great writing relies on the iceberg theory of omission.', 'Teach advanced style.', `The power of the dialogue comes from the iceberg theory: what is left unsaid carries the weight.`, 'Foundational Hemingway chunk.'],
      ['the white-hot flame of restraint', 'The intense emotional energy generated by extreme linguistic compression and self-discipline.', 'Praising powerful writing', 'Stylistic · literary', 'Her prose burned with the white-hot flame of restraint.', 'Characterize masterwork.', `Didion achieves the white-hot flame of restraint by refusing all theatrical self-pity.`, 'High-register aesthetic chunk.'],
      ['purple prose and melodramatic exaggeration', 'Overwritten, flowery language that suffocates meaning with excessive decoration.', 'Critiquing bad style', 'Critical · stylistic', 'Avoid purple prose and melodramatic exaggeration.', 'Guide revision.', `Novices mistake purple prose and melodramatic exaggeration for authentic depth.`, 'Standard editorial chunk.'],
      ['strip away decorative adverbs', 'The editorial discipline of deleting qualifiers to let strong verbs carry their own weight.', 'Teaching editing technique', 'Editorial · practical', 'A mature writer learns to strip away decorative adverbs.', 'Improve sentence strength.', `When you strip away decorative adverbs, the raw noun delivers its full physical impact.`, 'Practical writing chunk.'],
      ['concrete sensory grounding', 'Anchoring abstract emotional or philosophical claims in physical, tangible physical details.', 'Creating vivid prose', 'Aesthetic · cognitive', 'Every scene needs concrete sensory grounding.', 'Teach vivid writing.', `Without concrete sensory grounding, an essay on grief dissolves into vague sentimentality.`, 'Craft theory chunk.'],
      ['the unvarnished reality', 'Direct, unembellished truth presented without theatrical spin or softening.', 'Advocating honesty', 'Idiomatic · formal', 'She described the war with unvarnished reality.', 'Praise journalistic courage.', `The documentary confronted the public with the unvarnished reality of child poverty.`, 'Honesty chunk.'],
      ['a linguistic cathedral', 'An expansive, highly ornate, and complex architectural construction of sentences (maximalism).', 'Characterizing baroque prose', 'Literary · metaphorical', 'Faulkner built a linguistic cathedral of memory.', 'Describe maximalist literature.', `Melville’s Moby Dick stands as a monumental linguistic cathedral of oceanic prose.`, 'Literary praise chunk.'],
      ['the humility of subtraction', 'The artistic discipline of removing words to let the essential truth shine with greater force.', 'Defining editing ethics', 'Philosophical · stylistic', 'Writing is an exercise in the humility of subtraction.', 'Guide final polish.', `True mastery is reached through the humility of subtraction: knowing what to delete.`, 'Deep writing chunk.'],
      ['deliberate rhythmic anaphora', 'The conscious repetition of a word or phrase to build cumulative emotional velocity.', 'Explaining rhetorical rhythm', 'Stylistic · analytical', 'The paragraph builds through deliberate rhythmic anaphora.', 'Analyze poetic prose.', `By deploying deliberate rhythmic anaphora, Baldwin turns the paragraph into a moral anthem.`, 'Rhetorical chunk.'],
      ['the pressurized silence between the lines', 'The intense unstated emotional tension generated by skillful omission.', 'Analyzing subtext', 'Literary · aesthetic', 'The tragedy lives in the pressurized silence between the lines.', 'Analyze profound fiction.', `In Carver’s stories, the real catastrophe occurs in the pressurized silence between the lines.`, 'Subtext analysis chunk.']
    ],
    collocations: [
      [`Her prose burned with the white-hot flame of ______.`, [`restraint`, `dissonance`, `syllogism`, `paternalism`], 0, `Flame of restraint is the literary metaphor for compression.`],
      [`Writers must resist the temptation of ______ prose.`, [`purple`, `innocent`, `visceral`, `panoptic`], 0, `Purple prose is the fixed term for flowery, overwritten style.`],
      [`Hemingway formulated the famous ______ theory of omission.`, [`iceberg`, `tableau`, `punctum`, `studium`], 0, `Iceberg theory is Hemingway's established aesthetic principle.`],
      [`Good writing requires the humility of ______.`, [`subtraction`, `nominalization`, `prefabrication`, `erudition`], 0, `Humility of subtraction describes the editing discipline.`]
    ],
    upgrades: [
      [`The fire was extremely hot and burned down the very old wooden house in a really terrifying way.`, `The fire struck in silence; within minutes, the century-old timber collapsed into a heap of glowing ash.`],
      [`She was very sad and wept terribly because her mother died.`, `She set her mother’s keys on the empty counter, turned off the hallway lamp, and sat alone in the dark.`],
      [`Good writing should have a lot of big words and metaphors so people feel amazed.`, `Masterful prose derives its force not from purple ornamentation, but from radical compression, concrete sensory grounding, and the pressurized silence of what is omitted.`]
    ],
    think: {
      title: 'The Economy of Force: Compression, Subtraction, and the Iceberg',
      lead: 'Deconstruct passages to evaluate how radical deletion, sensory grounding, and anaphora generate immense emotional intensity without overwriting.',
      defs: [
        ['The Principle of Omission', `Omitting details that the writer fully understands forces the reader to construct the emotional reality, generating far greater psychological immersion than explicit exposition.`],
        ['Sensory Transduction', `The process through which specific, concrete physical nouns (bread, ash, iron, blood, rain) bypass intellectual filtering and trigger immediate visceral recognition.`]
      ],
      items: [
        {
          id: '31t1',
          tag: 'Radical Pruning',
          title: 'The 50% Deletion Challenge',
          task: `Take a 70-word passage describing a scene of intense crisis or grief that is choked with qualifiers (*very, deeply, utterly, horrifyingly*). Cut exactly 50% of the words while increasing the emotional intensity of the scene.`,
          guide: `Delete all qualifying adverbs, remove adjective stacking, and let two concrete sensory nouns carry the scene.`
        },
        {
          id: '31t2',
          tag: 'Subtext Mechanics',
          title: 'Applying the Iceberg Theory',
          task: `Write a 50-word dialogue between two estranged siblings meeting after ten years. They must talk ONLY about the weather or parking, while the reader clearly understands their intense unresolved grief and resentment.`,
          guide: `Rely on subtext, hesitation, physical action, and the pressurized silence between the lines.`
        },
        {
          id: '31t3',
          tag: 'Comparative Aesthetics',
          title: 'Minimalism vs. Maximalism',
          task: `Compare the stylistic strategies of Ernest Hemingway (austere minimalism) and William Faulkner (baroque maximalism). In what specific emotional or historical contexts is each style superior?`,
          guide: `Show that minimalism excels at sudden trauma, shock, and stoic endurance, while maximalism excels at historical weight, psychological frenzy, and panoramic complexity.`
        },
        {
          id: '31t4',
          tag: 'Anaphora Lab',
          title: 'Building Cumulative Intensity',
          task: `Draft a four-part anaphoric sequence on the passage of time or the cost of silence. Ensure that the repeated initial phrase anchors an escalating crescendo of concrete images.`,
          guide: `Focus on rhythmic cadence, syllable balance, and ending with an unadorned, punchy clause.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Sustaining Intense, Austere Long-Form Prose (800–1,200 Words)',
        text: `Writing a long-form essay on style, memory, or human struggle without overwriting is the supreme test of a C1 writer. You must sustain intense forward momentum across 800–1,200 words through radical compression, concrete sensory grounding, deliberate syntactic variety, and ruthless clutter removal.`,
        weak: `War is very terrible and makes people feel extremely bad. People suffer a lot and it is horrifying to see children cry in the street.`,
        strong: `War strips civilization down to its bare iron bones. It leaves no room for rhetoric: only the shattered brick, the uncollected corpse, and the child holding an empty tin cup in the freezing rain. What moves us is not the volume of our outrage, but the unvarnished physical reality of the ruin.`
      },
      short: {
        kind: 'Austere narrative reflection',
        title: 'The Power of the Unsaid',
        min: 180,
        max: 260,
        prompt: `Write a short reflective narrative (180–260 words) about a moment of sudden personal realization, departure, or loss. You must practice radical restraint: (1) Zero qualifying adverbs (*very, really, deeply*), (2) At least three concrete sensory nouns, (3) One deliberate anaphoric repetition, and (4) An ending that relies on the Iceberg Theory.`,
        support: [
          `Focus on a specific physical moment (packing a bag, closing a door, receiving a message).`,
          `Avoid emotional coaching (do not tell the reader you were sad or terrified).`,
          `Deploy concrete sensory details to carry the physical reality.`,
          `End with an unadorned, understated image.`
        ],
        guide: [
          `Open with concrete physical action: "The train pulled away at four in the afternoon."`,
          `Let the objects carry the emotional mass.`
        ]
      },
      main: {
        kind: 'Long-form literary essay',
        title: 'Writing With Intensity Without Overwriting: The Craft of Restraint in an Age of Hyperbole',
        min: 800,
        max: 1200,
        main: true,
        prompt: `How do you write with force without saying too much? In an expansive, deeply structured long-form essay (800–1,200 words), critically evaluate the tension between literary restraint (Hemingway\'s Iceberg Theory, Didion\'s clinical austerity) and baroque maximalism (Faulkner, Melville). Analyze why the modern internet culture of hyperbole and clickbait degrades language into "purple prose," and demonstrate how radical compression, sensory grounding, deliberate anaphora, and the "humility of subtraction" create enduring aesthetic power. Deploy advanced stylistic grammar, crystalline vocabulary, and immaculate syntactic rhythm throughout.`,
        support: [
          `Introduction (120–160 words): Deconstruct the modern delusion that volume equals emotional intensity; contrast the noise of digital hyperbole with the devastating power of literary restraint.`,
          `Section 1 · The Iceberg and the Architecture of Omission (180–220 words): Analyze Hemingway\'s Iceberg Theory; explain how omitting subtext forces the reader into active emotional co-creation.`,
          `Section 2 · The Mechanics of Force: Deleting Qualifiers & Sensory Grounding (180–220 words): Deconstruct the stylistic disciplines—pruning linguistic parasites (*very, deeply*), replacing abstract claims with concrete physical nouns, and letting events carry their own kinetic weight (Didion’s example).`,
          `Section 3 · In Defense of the Torrent: The Maximalist Counter-Perspective (160–200 words): Address the legitimate power of baroque excess (Faulkner, Melville) through balanced concession (*To be sure... Granted that...*); distinguish purposeful complexity from lazy overwriting.`,
          `Section 4 · Cadence, Repetition, and the White-Hot Flame (180–220 words): Examine how deliberate rhythmic anaphora and syntactic pacing turn restrained prose into a memorable moral anthem.`,
          `Conclusion (100–140 words): Deliver a definitive manifesto on the ethics and craft of writing in English through the "humility of subtraction."`
        ],
        guide: [
          `Sustain profound, muscular prose across the full 800–1,200 word target.`,
          `Eliminate all lazy qualifiers (*very, extremely, truly, deeply*) throughout the entire essay.`,
          `Incorporate essential lexical assets: *iceberg theory*, *purple prose*, *radical compression*, *sensory grounding*, *humility of subtraction*, *pressurized silence between the lines*, *linguistic cathedral*.`,
          `Maintain an articulate, commanding, and aesthetically breathtaking essayistic voice.`
        ]
      }
    },
    edit: {
      checklist: [
        `Does the essay meet the full 800–1,200 word count requirement with deep, muscular prose?`,
        `Are lazy qualifying adverbs (*very, extremely, really, deeply*) ruthlessly pruned throughout?`,
        `Does the text ground abstract claims in visceral, concrete sensory physical details?`,
        `Is anaphora deployed with deliberate rhythmic discipline rather than accidental repetition?`,
        `Is the tone consistently formal, literary, and commanding?`
      ],
      challenges: [
        {
          id: '31e1',
          title: 'Pruning Melodrama and Adjective Stacking',
          bad: `The heartbreaking, deeply painful tragedy of the impoverished refugees was incredibly devastating to witness as they suffered horribly in the cold rain.`,
          task: `Rewrite in lean, muscular C1 prose using concrete sensory grounding and zero qualifying adverbs.`,
          good: `In the freezing downpour, families huddle beneath plastic sheeting, their wet blankets caked in mud, waiting for trucks that never arrive.`
        },
        {
          id: '31e2',
          title: 'Injecting Austere Anaphora and Subtext',
          bad: `I realized that my friendship with John was completely over and we could never ever be friends again because he lied to me so much.`,
          task: `Revise using austere anaphora and Hemingwayesque understatement.`,
          good: `He handed back the key. He took his coat from the hook. He closed the door behind him, and neither of us said a word.`
        }
      ]
    },
    retrieve: {
      content: `Why does Ernest Hemingway\'s "Iceberg Theory" argue that omitting known subtext increases the emotional intensity of a story?`,
      contentGuide: `Omitting known subtext creates immense invisible mass beneath the prose, forcing the reader\'s imagination to supply the unstated grief or meaning and creating deep psychological engagement.`,
      grammar: `Transform this qualified, adverb-heavy claim into a lean, muscular C1 sentence: "The famine was extremely terrible and killed very many innocent people."`,
      grammarGuide: `Expected: "The famine swept through the province, emptying villages and leaving thousands of unburied dead along the roads."`,
      reasoning: `How does William Faulkner\'s maximalism differ from lazy "purple prose"?`,
      reasoningGuide: `Faulkner\'s maximalism is an intentional, highly engineered linguistic cathedral designed to recreate the suffocating complexity of history and memory, whereas purple prose is lazy, decorative padding and hollow sentimentality.`,
      summary: `In Unit 31, you mastered the craft of writing with white-hot intensity through restraint. You learned the Iceberg Theory, concrete sensory grounding, disciplined anaphora, eliminating qualifiers, and long-form essay architecture.`
    }
  });

  K.units['31'].listening = K.pendingListening('31', [
    {
      id: '31l1',
      title: 'Dialogue: The Art of the Scalpel',
      format: 'Discussion between a Pulitzer-winning novelist and a literary critic',
      lead: 'Listen to a masterclass on how cutting words creates emotional pressure in prose.',
      audio: 'audio/unit-31-listening-1.mp3',
      transcript: `[Critic]: David, when readers open your novels, they are always struck by how quiet your sentences are. You write about murder, betrayal, and war, but you never use exclamation points or hyperbolic adjectives. Why do you choose such intense restraint?\n\n[Novelist]: Elena, early in my career, an editor gave me a piece of advice that changed my life: 'When an event is already tragic, decorating it with adjectives is an insult to the victim.' If a child is starving, you don't need to write that it is 'heartbreakingly terrible.' You simply describe the child's wrist, the empty pot, the dry dust on the floor.\n\n[Critic]: That's Hemingway's iceberg.\n\n[Novelist]: Precisely. When you scream at the reader, they cross their arms and step back. But when you whisper with absolute, clinical precision, the reader has to lean in. They have to supply the emotion from their own heart. The pressure comes from the silence between the words.\n\n[Critic]: So the scalpel is more powerful than the loudspeaker.\n\n[Novelist]: Always. In writing, power is an act of subtraction. You cut and cut until only the bone remains, and that bone will outlive all the flowery frosting in the world.`,
      questions: [
        {
          id: '31l1q1',
          type: 'mc',
          q: 'Why does the novelist avoid using emotional adjectives when describing tragic events?',
          options: [
            'Because the publisher charges money for every adjective.',
            'Because decorating real tragedy with emotional adjectives insults the reality and pushes readers away, whereas clinical restraint forces readers to supply authentic emotion.',
            'Because he writes exclusively for children.',
            'Because English grammar prohibits adjectives in novels.'
          ],
          answer: 1,
          explain: 'The novelist explains that restraint and concrete precision invite deep reader empathy, whereas adjective-heavy screaming repels readers.'
        },
        {
          id: '31l1q2',
          type: 'mc',
          q: 'What metaphor does the novelist use to define the editing process?',
          options: [
            'Building a skyscraper.',
            'The scalpel: an act of subtraction that cuts away clutter until only the enduring bone remains.',
            'Baking a multi-layered wedding cake.',
            'Painting a colorful wall.'
          ],
          answer: 1,
          explain: 'The novelist compares editing to a scalpel cutting down to the durable bone.'
        }
      ]
    },
    {
      id: '31l2',
      title: 'Monologue: Joan Didion and the Grammar of Grief',
      format: 'Academic lecture on contemporary American literature',
      lead: 'A lecture analyzing Joan Didion\'s masterwork *The Year of Magical Thinking* and the power of clinical prose.',
      audio: 'audio/unit-31-listening-2.mp3',
      transcript: `When Joan Didion sat down to write *The Year of Magical Thinking* following the sudden death of her husband, John Gregory Dunne, she was confronting the ultimate challenge of literary style. How do you write about grief without drowning in sentimentality?\n\nHer answer was radical austerity. Didion did not write an emotional diary; she wrote a forensic investigation of a broken mind. She documented the exact time the ambulance arrived; she recorded the medical terminology of the coronary occlusion; she repeated the phrase: 'Life changes in the instant. The ordinary instant.'\n\nBy treating grief not as a theatrical performance, but as a cognitive shock that dislocates time, Didion created a new grammar of bereavement. Her sentences are short, rhythmic, and stripped of all self-pity. They achieve what T.S. Eliot called the 'objective correlative'—a set of concrete objects, situations, and events that serve as the formula for a particular emotion.\n\nDidion proved that the highest tribute you can pay to human sorrow is not to dress it in purple prose, but to face it with the unblinking, crystalline courage of restraint.`,
      questions: [
        {
          id: '31l2q1',
          type: 'mc',
          q: 'How did Joan Didion approach writing about the death of her husband?',
          options: [
            'Through a theatrical diary filled with romantic poetry.',
            'Through radical austerity and clinical precision, treating grief as a forensic investigation of cognitive shock.',
            'By refusing to mention the hospital or doctors.',
            'By hiring a ghostwriter.'
          ],
          answer: 1,
          explain: 'Didion used forensic precision and clinical austerity to capture the reality of bereavement.'
        },
        {
          id: '31l2q2',
          type: 'mc',
          q: 'What literary concept from T.S. Eliot is applied to Didion\'s writing in the lecture?',
          options: [
            'The rhyme scheme.',
            'The "objective correlative"—using concrete objects and events as the precise formula for an emotion.',
            'The iambic pentameter.',
            'The comedic punchline.'
          ],
          answer: 1,
          explain: 'The lecturer notes that Didion uses concrete physical formulas (objective correlative) to evoke emotion.'
        }
      ]
    }
  ]);

  K.units['31'].speaking = K.canonicalSpeaking({
    part1: [
      { q: `When you read a sad story or watch a movie, do you prefer understated, realistic drama or big, emotional spectacles? Why?`, guide: `Compare the quiet power of understated realism with the emotional catharsis of epic spectacle.` },
      { q: `Why do you think novice writers and social media users love using excessive exclamation points and emotional emojis?`, guide: `Discuss insecurity, fear of being misunderstood, and the desire for instant emotional validation.` },
      { q: `Have you ever had to deliver difficult or sad news to someone? How did you choose your words?`, guide: `Reflect on the necessity of clarity, gentle restraint, avoiding euphemisms, and giving the person space to process.` }
    ],
    part2: {
      topic: `Describe a profound or intense experience in your life using simple, understated, and restrained language.`,
      prompts: [
        `What the experience was and when it took place`,
        `What concrete physical details or sensory memories stand out in your mind`,
        `How you responded at the time and what was left unsaid`,
        `And explain what makes this memory so enduring without needing dramatic exaggeration.`
      ],
      guide: `Structure your response with discipline: avoid qualifying adverbs (very, deeply), ground the story in physical sensory nouns, and let the quiet facts carry their own emotional weight.`
    },
    part3: [
      { q: `In an era of sensationalist media and clickbait headlines, is society losing the capacity to appreciate subtle, understated communication?`, guide: `Analyze digital attention spans, algorithmic rage-bait, and the cultural need for reflective nuance.` },
      { q: `Can a translation into another language preserve the delicate subtext and "iceberg" of an author\'s original prose?`, guide: `Discuss the challenge of translating tone, cultural context, pauses, and the unsaid across languages.` },
      { q: `Why do many famous political speeches (like Lincoln’s Gettysburg Address or Churchill’s wartime broadcasts) rely heavily on simple Anglo-Saxon words rather than complex Latinate vocabulary?`, guide: `Analyze physical directness, universal accessibility, moral gravity, and timeless musical cadence.` }
    ],
    followUp: `If an author deletes most adjectives from a text, does that make the story less vivid?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'aus·ter·i·ty', 'vis·cer·al', 'a·naph·o·ra', 'be·reave·ment', 'un·a·dorned'.`,
      grammar: `Natural deployment of syntactic restraint, parallel anaphora, and lean active verb structures without qualifying clutter.`,
      discourse: `Fluent, articulate reflections on literary craft, subtext, and the psychological power of linguistic restraint.`,
      vocabulary: `Effective use of terms such as 'the iceberg theory', 'purple prose', 'radical compression', 'concrete sensory grounding', and 'the humility of subtraction'.`
    }
  });
})(window.KLANG = window.KLANG || {});
