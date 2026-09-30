/* Cumulative reviews for Modules 1 and 2. Reviews introduce no new target
   language: every task retrieves, interleaves or transfers Units 01–10. */
window.KLANG = window.KLANG || {};
window.KLANG.reviews = window.KLANG.reviews || {};

(function (K) {
  'use strict';
  const mc = (id, q, options, answer, explain, category, unit, area) => ({ id, type: 'mc', q, options, answer, explain, scoreCategory: category, unit, area });
  const tf = (id, q, answer, explain, category, unit, area) => ({ id, type: 'tf', q, answer, explain, scoreCategory: category, unit, area });
  const produce = (id, q, model, explain, unit, area) => ({ id, type: 'produce', q, model: Array.isArray(model) ? model : [model], explain, unit, area });
  const open = (id, q, guide, rows = 4, unit, area) => ({ id, type: 'open', q, guide, rows, unit, area });

  K.reviews['1'] = {
    id: '1', title: 'Language, Memory & Identity', units: ['01', '02', '03', '04', '05'],
    question: 'What can you still retrieve, connect and use from Units 01–05?',
    grammarTargets: 'Past Simple × Present Perfect; articles; Present Perfect Continuous; aspect; dependent prepositions; narrative tenses; Past Perfect; remember/remind/recall; Past Perfect Continuous; gerunds and infinitives; used to/would/be used to; future in the past',
    reasoningTargets: 'Claim, evidence, inference, assumption, fact × inference, confounds, alternative explanations, uncertainty, evidence × interpretation, narrative identity and counterfactual reasoning',
    retrieve: {
      lead: 'Do this section with Units 01–05 closed. Exact terminology matters less than reconstructing distinctions and usable language from memory.',
      items: [
        open('m1r1', 'Without examples from the book, explain the difference between a claim, evidence, an inference and an assumption. Then invent one four-sentence argument containing all four.', null, 6, '01', 'claim · evidence · inference · assumption'),
        open('m1r2', 'Write one sentence for each: an unfinished activity continuing to now; a completed event at a finished time; an event completed before another past event; and an activity in progress before a past turning point.', null, 5, '02–04', 'tense and aspect retrieval'),
        open('m1r3', 'Reconstruct six chunks or sentence frames from Units 01–05. For each, add the rhetorical job it performs.', null, 6, '01–05', 'chunks and rhetorical function'),
        open('m1r4', 'What is a confound? Give an example connected to language, memory, identity or migration, then name one plausible alternative explanation.', null, 5, '02–05', 'confounds · alternative explanations'),
        open('m1r5', 'Complete from memory with natural language: “I still remember …”; “That reminds me …”; “I can’t recall …”. Explain the grammatical pattern after each verb.', null, 4, '03', 'remember · remind · recall'),
        open('m1r6', 'Write four accurate formulations using used to, would, be used to and was/were going to. Make the contrast in meaning visible from context.', null, 5, '05', 'past habits · adaptation · future in the past'),
        open('m1r7', 'List eight words or collocations you genuinely remember from the module. Use four in a short paragraph about a topic outside the module.', null, 6, '01–05', 'productive vocabulary')
      ]
    },
    language: {
      lead: 'The targets are deliberately mixed. Decide from meaning and time frame; do not hunt for the name of a rule first.',
      items: [
        mc('m1l1', 'When I arrived in Lisbon, I realised that I ___ the wrong address in my diary.', ['wrote', 'have written', 'had written', 'had been writing'], 2, 'The writing happened before the later past realisation.', 'grammar', '03', 'Past Perfect'),
        mc('m1l2', 'She ___ Portuguese for three years, and she is still discovering how directness changes across languages.', ['studied', 'has been studying', 'had studied', 'would study'], 1, 'The activity began in the past, continues now and foregrounds duration.', 'grammar', '02', 'Present Perfect Continuous'),
        mc('m1l3', 'Choose the natural sentence.', ['Memory is not recording of past.', 'The memory is not a recording of the past.', 'Memory is not a recording of the past.', 'A memory is not the recording of a past.'], 2, 'Memory and the past are general abstractions here; recording is a singular countable complement.', 'grammar', '01', 'articles'),
        mc('m1l4', 'For months before she left, she ___ whether staying was still a choice.', ['wondered', 'has wondered', 'had been wondering', 'would have wondered'], 2, 'The sentence foregrounds an activity continuing up to a past event.', 'grammar', '04', 'Past Perfect Continuous'),
        mc('m1l5', 'I am interested ___ the way bilingual speakers describe emotional distance.', ['on', 'in', 'of', 'for'], 1, 'The fixed pattern is interested in.', 'grammar', '02', 'dependent preposition'),
        mc('m1l6', 'When we were children, my grandfather ___ us the same migration story every winter.', ['was used to tell', 'would tell', 'has told', 'had been told'], 1, 'Would can describe a repeated past action when the past frame is established.', 'grammar', '05', 'would for past habit'),
        mc('m1l7', 'After six months abroad, she was finally ___ hearing several languages on the same bus.', ['used to', 'use to', 'used for', 'would'], 0, 'Be used to + noun/-ing means be accustomed to.', 'grammar', '05', 'be used to'),
        mc('m1l8', 'The smell of that soap always ___ me of my first school.', ['remembers', 'recalls', 'reminds', 'recollects'], 2, 'Something reminds somebody of something.', 'grammar', '03', 'remind'),
        mc('m1l9', 'Which version keeps the intended aspect: the process, not simply the result?', ['I have read about bilingual identity all morning.', 'I have been reading about bilingual identity all morning.', 'I read about bilingual identity all morning.', 'I had read about bilingual identity all morning.'], 1, 'The continuous form foregrounds the ongoing activity and its duration.', 'grammar', '02', 'aspect'),
        mc('m1l10', 'She avoided ___ the story as if it proved more than it did.', ['to present', 'present', 'presenting', 'to presenting'], 2, 'Avoid is followed by an -ing form.', 'grammar', '04', 'gerund complement'),
        mc('m1l11', 'We ___ visit in July, but the visa arrived too late.', ['were going to', 'have been going to', 'used to', 'had to'], 0, 'Were going to expresses a past intention whose later outcome is now known.', 'grammar', '05', 'future in the past'),
        tf('m1l12', '“I have moved to São Paulo in 2018” is appropriate because the move remains relevant now.', false, 'A finished date closes the time frame: “I moved … in 2018.” Present relevance alone does not override an explicit finished time.', 'grammar', '01', 'Past Simple × Present Perfect'),
        produce('m1l13', 'Repair without changing the meaning: “By the time I remembered calling her, she left.”', ['By the time I remembered to call her, she had left.'], 'Remember to do refers to not forgetting a necessary action; the leaving came first.', '03', 'remember + infinitive · Past Perfect'),
        produce('m1l14', 'Rewrite so the activity, rather than its completion, is foregrounded: “I have written about identity since breakfast.”', ['I have been writing about identity since breakfast.'], 'The continuous aspect presents the activity as unfolding over a period.', '02', 'aspect')
      ]
    },
    steal: {
      lead: 'Recover formulations as tools for thinking. Choose or produce what fits the rhetorical situation.',
      items: [
        mc('m1s1', 'You want to qualify an attractive but overconfident conclusion. Which frame is most useful?', ['This proves once and for all that …', 'There is more at stake than …', 'The evidence points in this direction, but it does not establish that …', 'It goes without saying that …'], 2, 'The frame distinguishes what evidence supports from what it cannot establish.', 'vocabulary', '01–03', 'qualification'),
        mc('m1s2', 'Choose the natural collocation.', ['draw an inference', 'pull an inference', 'make an evidence', 'build a fact'], 0, 'We commonly draw an inference from evidence.', 'vocabulary', '01–03', 'reasoning collocation'),
        mc('m1s3', 'Which formulation introduces an alternative explanation without pretending it is proven?', ['This can only mean that …', 'One possibility is that …', 'The fact is necessarily caused by …', 'There can be no doubt that …'], 1, 'One possibility is that marks a hypothesis at an appropriate level of certainty.', 'vocabulary', '02–03', 'alternative explanation'),
        mc('m1s4', 'Which phrase most naturally describes an identity that changes with context?', ['a fixed conclusion', 'a context-dependent self', 'a finished personality', 'a recorded character'], 1, 'Context-dependent transfers the module’s language of shifting identity.', 'vocabulary', '02–04', 'identity'),
        mc('m1s5', 'Which sentence uses the collocation naturally?', ['The old neighbourhood exerted a residual pull on her.', 'The old neighbourhood made a residual pull in her.', 'The old neighbourhood did residual influence.', 'The old neighbourhood pulled a residual.'], 0, 'Exert a pull/influence and residual pull are natural combinations.', 'vocabulary', '01–05', 'collocation'),
        produce('m1s6', 'Write one sentence using “what remained was …” to separate loss from continuity.', ['What remained was not fluency but a residual sensitivity to the language’s rhythm.'], null, '01', 'contrastive frame'),
        produce('m1s7', 'Use “It is tempting to interpret X as Y; however, …” with a memory or identity claim.', ['It is tempting to interpret confidence as accuracy; however, a vivid memory may still be mistaken.'], null, '03–04', 'rhetorical qualification'),
        produce('m1s8', 'Use “had it not been for …” to make a counterfactual claim about leaving or staying.', ['Had it not been for the scholarship, she might never have discovered how strongly home still shaped her.'], null, '05', 'counterfactual frame'),
        produce('m1s9', 'Write a sentence that combines “over time” with a precise change—not a vague claim.', ['Over time, the effort of translating every response gave way to a more automatic sense of register.'], null, '02', 'change over time'),
        produce('m1s10', 'Use “does not amount to” to block an invalid inference.', ['Remembering the emotion does not amount to remembering every detail accurately.'], null, '01–04', 'limiting an inference')
      ]
    },
    reading: {
      label: 'Transfer reading', format: 'Reflective argument', title: 'The Box in the Hallway',
      standfirst: 'A family archive seems to promise access to the past. What it actually offers is a negotiation between evidence, memory and the stories a family needs.',
      paras: [
        `For eleven years, a cardboard box stood on the top shelf of my mother’s hallway cupboard. We called it the Argentina box, although it contained almost nothing from Argentina: three letters, a recipe with no title, two photographs, a train ticket from São Paulo and a small address book whose first pages had been torn out. My grandmother had packed it shortly before she died. Because she had rarely spoken about the five years she spent in Buenos Aires, the box acquired the authority of silence. We treated it as if it contained the explanation she had refused to give us.`,
        `I had been asking to see it since I was a teenager, but my mother always found a practical reason to postpone opening it. The cupboard was difficult to reach; the papers were fragile; there was never enough time. By the time she finally placed the box on the table, I had constructed a theory. My grandmother, I believed, had left Brazil after a family conflict, built an independent life abroad and returned only when illness made remaining impossible. I was not inventing at random. I had evidence: a photograph in which she stood alone outside a theatre, my aunt’s memory of an argument, and my grandmother’s habit of becoming quiet whenever anyone mentioned Buenos Aires. Yet I had arranged those fragments long before I had examined them.`,
        `The first letter appeared to confirm me. It began, “I cannot go back to being the person they expect.” I felt the peculiar satisfaction of seeing a private inference turn into a fact. Then my mother read the next sentence aloud: “Here, at least, I can work until I have enough to help them.” The “they” I had interpreted as controlling relatives were apparently people she intended to support. The refusal to “go back” might have expressed rebellion, duty, fear or all three. The line had not changed, but its meaning had.`,
        `Other details made the story less coherent. The theatre photograph had been taken during a group trip; four friends had simply been cut out of my copy. The famous argument had occurred after my grandmother returned, not before she left. The train ticket was dated two years later than my mother had remembered. None of this proved that my theory was false. It showed that the evidence on which I had built it was weaker and more ambiguous than I had assumed. A missing person in a photograph can look like solitude. A corrected date can turn a cause into a consequence.`,
        `My mother, however, was not merely checking my claims. She had been using the box to recover a voice. She read the recipe as a record of ordinary intimacy: quantities adjusted in the margin, a substitution explained to somebody who already knew the method. She recalled receiving parcels that smelled faintly of soap. These memories did not establish why my grandmother had left, but they revealed the cost of reducing five years to a single decisive event. A life may change through a departure without being explained by it.`,
        `We also discovered how language had shaped the archive. Two letters moved between Portuguese and Spanish, sometimes in the middle of a sentence. My mother said the Spanish lines sounded bolder. I was tempted to treat that difference as evidence of a second self, but the explanation was too neat. Perhaps Spanish had offered emotional distance; perhaps my grandmother was echoing the people around her; perhaps she simply possessed different expressions in each language. Language may change what is easy to say without changing the person who says it.`,
        `After several hours, we still did not know why she had gone. We knew instead that our question had been badly formed. It assumed one true motive waiting to be retrieved, intact, from the archive. But decisions made over months rarely have that shape. My grandmother may have wanted freedom and felt obligation; she may have been escaping one expectation while accepting another. Uncertainty was not evidence that the box had failed. It was evidence that a human decision had survived our attempt to make it simple.`,
        `Before closing the cupboard, my mother put the photograph back without the envelope that had hidden its damaged edge. The cut remained visible. “Keep the missing part,” she said. I think she meant that absence should be recorded rather than repaired by imagination. Since that afternoon, I have told the story differently. I no longer say that the box revealed why my grandmother left. I say that opening it changed the kind of explanation I was willing to accept.`
      ],
      items: [
        mc('m1q1', 'What is the central change in the narrator?', ['She proves that her grandmother left after a conflict.', 'She replaces her mother’s memories with documentary facts.', 'She moves from seeking one decisive explanation to accepting a complex, uncertain account.', 'She concludes that family archives are unreliable and useless.'], 2, 'The ending explicitly reframes what counts as an adequate explanation.', 'reading', '01–05', 'main claim'),
        tf('m1q2', 'The first letter conclusively supports the narrator’s original theory.', false, 'The next sentence complicates the referent of “they” and therefore the narrator’s interpretation.', 'reading', '03–04', 'evidence × interpretation'),
        mc('m1q3', 'The cropped photograph mainly illustrates that:', ['photographs are normally forged', 'omission can make evidence support a misleading narrative', 'the grandmother preferred solitude', 'the friends caused her departure'], 1, 'The missing context makes a group occasion appear solitary.', 'reading', '03–04', 'selection and interpretation'),
        mc('m1q4', 'Why does the writer list several explanations for the Spanish lines?', ['To show that bilingualism has no effect', 'To avoid confusing a plausible inference with an established fact', 'To prove the grandmother had two personalities', 'To criticise the mother’s Spanish'], 1, 'The alternatives discipline the inference without denying that language can matter.', 'reading', '02', 'alternative explanations'),
        mc('m1q5', 'In paragraph 7, “our question had been badly formed” means that the question:', ['contained a grammatical mistake', 'assumed a single intact motive that might never have existed', 'was asked too late', 'should have focused only on dates'], 1, 'The narrator challenges the assumption built into the search for one true motive.', 'reading', '04–05', 'hidden assumption'),
        open('m1q6', 'Identify one fact, one inference and one assumption in paragraphs 2–4. Explain how you classified each.', ['A strong answer distinguishes what the archive directly shows from what the narrator concludes and what her theory presupposes.'], 6, '01–04', 'classification'),
        open('m1q7', 'Find two places where tense or aspect helps organise time or duration. Explain what would be lost if both verbs were changed to the Past Simple.', ['Consider “had been asking”, “had constructed”, “had occurred” and “had been using”.'], 6, '02–04', 'language noticing'),
        open('m1q8', 'Does the ending defend uncertainty or merely surrender to it? Build an answer from at least two details.', ['Distinguish refusing false certainty from refusing to make any claim.'], 6, '03–05', 'argument analysis')
      ]
    },
    reasoning: {
      lead: 'Apply the module’s distinctions to new cases. Definitions alone are not enough.',
      items: [
        mc('m1t1', 'A study finds that migrants who use two languages report more flexible identities. Which is the strongest immediate caution?', ['Flexible identity is impossible to measure.', 'Using two languages must cause flexibility.', 'Self-selection or social context may influence both language use and reported flexibility.', 'All migrants have the same experience.'], 2, 'A third factor or selection process may be a confound.', 'reasoning', '02–05', 'confounds'),
        mc('m1t2', '“Her memory changed after she saw the photograph; therefore the photograph made it less accurate.” What is missing?', ['A dependent preposition', 'A comparison or evidence showing whether the change corrected or distorted the memory', 'A stronger adjective', 'Proof that photographs never influence memory'], 1, 'Change alone does not tell us whether accuracy increased or decreased.', 'reasoning', '03', 'alternative explanations'),
        mc('m1t3', 'Which statement is counterfactual reasoning?', ['She left in 2012.', 'She may have left because work was scarce.', 'Had the offer arrived earlier, she might have stayed.', 'She remembers wanting to leave.'], 2, 'It considers how the outcome might differ under a contrary condition.', 'reasoning', '05', 'counterfactual'),
        mc('m1t4', '“He tells the story consistently, so it must be factual.” Which distinction is being ignored?', ['Past and present', 'Narrative coherence and evidential accuracy', 'Gerund and infinitive', 'Home and migration'], 1, 'A coherent identity narrative can still select, interpret or misremember evidence.', 'reasoning', '03–04', 'narrative identity'),
        open('m1t5', 'A bilingual friend says, “I am kinder in English.” Give two interpretations and one piece of evidence that would help distinguish them.', ['Possible interpretations include language-specific norms, context/audience effects, emotional distance or selective memory.'], 6, '02', 'fact × inference'),
        open('m1t6', 'A family explains a migration entirely through courage. State the claim charitably, identify a hidden assumption and add one structural alternative explanation.', ['A strong answer need not deny courage; it shows what the single-story explanation leaves out.'], 6, '04–05', 'assumption · alternative explanation')
      ]
    },
    editing: {
      lead: 'The paragraph has plausible problems a B2+/C1 writer might produce while managing a complex timeline. Edit for meaning, not merely for visible forms.',
      text: `I have moved away from my hometown in 2016, after I had been living there since I was born. At first I wasn't used to hear three languages every day, although I would understand more than I admitted. By the time I have found a stable job, I had already started to think about identity as a story. A colleague remembered me to keep notes, and I avoided to describe every change as proof that I had become another person. I was going to returning after one year, but the plan slowly changed. Looking back, experience taught me that the belonging is not a fixed fact.`,
      items: [
        open('m1e1', 'Rewrite the paragraph accurately. Preserve its timeline and meaning; do not simplify everything into short Past Simple sentences.', null, 10, '01–05', 'integrated editing'),
        open('m1e2', 'Justify five corrections. For each, state the meaning or time relationship your correction protects.', ['Prioritise: finished time, duration before a past point, be used to + -ing, remember/remind, gerund complements, future in the past and articles.'], 8, '01–05', 'editing justification')
      ],
      model: `I moved away from my hometown in 2016, after I had been living there since I was born. At first I wasn't used to hearing three languages every day, although I understood more than I admitted. By the time I found a stable job, I had already started to think about identity as a story. A colleague reminded me to keep notes, and I avoided describing every change as proof that I had become another person. I was going to return after one year, but the plan slowly changed. Looking back, the experience taught me that belonging is not a fixed fact.`
    },
    synthesis: {
      id: 'm1w1', type: 'writing', kind: 'Module synthesis', title: 'What remains when a life changes?', min: 600, max: 900, main: true,
      prompt: `Write a 600–900-word reflective argument about this proposition: <b>“We do not preserve the past; we continually reconstruct a relationship with it.”</b> Connect language, memory, personal narrative and leaving. You may agree, disagree or qualify the proposition. Build a clear line of thought, use evidence or precise examples, consider at least one alternative explanation, and make uncertainty intellectually productive rather than vague.`,
      support: ['Draw on ideas from at least three of Units 01–05 without summarising them one by one.', 'Use tense and aspect to make chronology and duration precise.', 'Reuse several chunks or sentence frames from the module where they genuinely serve the argument.', 'End by showing what follows from your position—not by repeating the introduction.'],
      guide: ['A strong response has a governing claim, not five mini-unit summaries.', 'It distinguishes evidence, inference and interpretation.', 'Personal material is analysed rather than merely narrated.', 'Language from the module is integrated naturally.']
    },
    timed: {
      id: 'm1tc1', type: 'writing', kind: 'Timed essay', title: 'Is a later language only a tool?', min: 280, max: 380, minutes: 45, timed: true,
      prompt: `<b>“A first language is part of who you are; any language learned later is only a tool.”</b> Write an essay in which you discuss this claim. Use at least one distinction from Units 01–05 (for example recognition × retrieval, fact × inference, or a story × the evidence behind it), consider one serious objection, and reach a qualified conclusion.`,
      guide: ['A clear position stated early, then qualified rather than abandoned.', 'At least one distinction from the module doing real argumentative work.', 'One objection presented fairly before it is answered.', 'Control of tense and aspect when you use personal or historical examples.']
    },
    teacherLens: {
      lead: 'Stay a learner first: this is practice in explaining English clearly, not a teaching assessment. Choose the point you feel least able to explain simply.',
      points: [
        { id: 'ppps', label: 'Past Simple × Present Perfect', unit: '01', ccq: 'good', hint: 'Meaning-based point: a CCQ about finished time usually works well.' },
        { id: 'ppc', label: 'Present Perfect Continuous for duration up to now', unit: '02', ccq: 'good', hint: 'CCQs about “started in the past? still true now?” work well.' },
        { id: 'deppreps', label: 'Dependent prepositions (depend on, result in, consist of)', unit: '02', ccq: 'weak', hint: 'Mostly a form/collocation point: a CCQ adds little. Contrastive examples and noticing work better — the CCQ is optional here.' },
        { id: 'pastperf', label: 'Past Perfect: when it is needed and when it is not', unit: '03', ccq: 'good', hint: 'A CCQ about which event happened first can check the concept.' },
        { id: 'rrr', label: 'remember / remind / recall', unit: '03', ccq: 'good', hint: 'Meaning contrast: a CCQ about who does the remembering can help.' },
        { id: 'gerinf', label: 'Gerund or infinitive after verbs (avoid, stop, remember)', unit: '04', ccq: 'partial', hint: 'CCQs help where meaning changes (stop doing × stop to do); for fixed patterns (avoid + -ing) they add little.' },
        { id: 'usedto', label: 'used to / would / be used to', unit: '05', ccq: 'good', hint: 'Classic CCQ territory: “Does she do this now?”' },
        { id: 'futpast', label: 'Future in the past (was going to, would)', unit: '05', ccq: 'good', hint: 'A CCQ about whether the plan happened can check the concept.' }
      ]
    },
    areas: {
      grammar: ['Unit 01 · Past Simple × Present Perfect and articles', 'Unit 02 · Present Perfect Continuous, aspect and dependent prepositions', 'Unit 03 · narrative tenses, Past Perfect and remember/remind/recall', 'Unit 04 · Past Perfect Continuous and gerunds/infinitives', 'Unit 05 · used to/would/be used to and future in the past'],
      vocabulary: ['Units 01–05 · collocations, chunks and rhetorical frames'],
      reading: ['Units 01–05 · inference, evidence, chronology and interpretation'],
      reasoning: ['Units 01–05 · assumptions, confounds, alternative explanations and counterfactuals']
    },
    listening: [
      {
        id: 'r1l1', title: 'The Accented Self', format: 'Sociolinguistic dialogue',
        file: '/audio/en/reviews/r01-listening-01.mp3', duration: 86, level: 'B2+ → C1',
        audioReady: true,
        voice: 'Two adult speakers (Dr. Lin and Marcus); thoughtful, conversational, precise',
        passes: ['First listen · understand how an acquired accent mediates between belonging and alienation', 'Second listen · track narrative tenses, aspect, and memory formulations (remember, recall, remind)', 'Third listen · analyze the distinction between communicative competence and affective identity'],
        transcript: `Marcus: When I first moved to Edinburgh twelve years ago, I spent months trying to erase every trace of my Brazilian accent. I had been practicing vowel lengths in front of a mirror, convinced that perfect phonetic assimilation was the only route to social legitimacy. Looking back, that impulse was rooted in anxiety rather than linguistic necessity.\n\nDr. Lin: That experience is extraordinarily common among adult migrants. In our sociolinguistic fieldwork, we have been interviewing bilingual professionals across Scotland. Many report that their first accent feels like a homeland they carry with them, while their second accent feels like a uniform they put on for work. When you tried to erase your accent, what did you fear you were communicating?\n\nMarcus: Incompetence, primarily. I assumed that whenever someone asked me to repeat a word, they were doubting my professional intellect. It took me years to realize that a foreign accent does not impede clarity unless phonemic boundaries are blurred. What remained after I gave up that futile effort was a deeper realization: our speech patterns are not neutral phonetic instruments; they are living archives of where we have lived and who we have loved.\n\nDr. Lin: Precisely. Language reconstructs our relationship to the past. When bilinguals speak, they are not simply selecting vocabulary; they are negotiating between two distinct historical selves.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Gist', q: 'What fundamental shift did Marcus experience regarding his foreign accent?', options: ['He eventually achieved a flawless Scottish native accent after ten years.', 'He moved from viewing his accent as a shameful badge of incompetence to valuing it as an authentic narrative archive of his life.', 'He gave up learning English and returned to Brazil.', 'He concluded that clear pronunciation is completely unimportant in communication.'], answer: 1, explain: 'Marcus shifts from anxious assimilation to recognizing that an accent carries narrative history without impeding communicative clarity.' },
          { id: 'q2', type: 'tf', tag: 'Detail', q: 'Dr. Lin’s research shows that adult migrants rarely experience emotional friction between their native and acquired accents.', answer: false, explain: 'She explicitly confirms that this dual-accent friction is extraordinarily common among adult migrants.' },
          { id: 'q3', type: 'open', tag: 'Reasoning', q: 'How does the discussion link accent to the central module proposition: “We do not preserve the past; we continually reconstruct a relationship with it”?', rubric: ['Points out that an accent is not a static defect but a living archive of past places and relations', 'Explains that speaking an additional language requires negotiating between historical and contextual selves', 'Shows that giving up phonetic erasure reflects a conscious, mature reconstruction of narrative identity'] },
          { id: 'q4', type: 'fill', tag: 'Collocation', q: 'Complete Marcus’s realization: “Our speech patterns are not neutral phonetic instruments; they are living ______ of where we have lived.”', answers: ['archives|living archives'], explain: 'Living archives emphasizes speech as an active repository of lived history.' }
        ]
      },
      {
        id: 'r1l2', title: 'Preserving the Narrative Fabric', format: 'Archival documentary extract',
        file: '/audio/en/reviews/r01-listening-02.mp3', duration: 94, level: 'C1',
        audioReady: true,
        voice: 'Solo narrator (Historian of oral archives); resonant, contemplative, scholarly',
        passes: ['First listen · grasp why family oral histories systematically diverge from written bureaucratic records', 'Second listen · note narrative tenses and counterfactual structures (used to, would, had been)', 'Third listen · examine the boundary between evidential accuracy and narrative coherence'],
        transcript: `For three generations, my family would gather every Christmas Eve to hear my grand-uncle recount the voyage of the immigrant ship Saturnia in 1954. He used to tell the story with cinematic detail: the towering Atlantic waves, the midnight fire in the boiler room, and the heroic captain who steered the vessel into Santos harbour against impossible odds. We grew up treating his narrative as sacred family gospel.\n\nThirty years later, while cataloguing maritime transit logs in the state archives, I located the actual ship manifest and voyage journal for that crossing. The official log recorded mild seas, zero fires, and an uneventful arrival forty-eight hours ahead of schedule. At first, I felt a sharp pang of betrayal. Had my uncle fabricated the entire drama out of vanity?\n\nYet as I read deeper into his personal diaries, I began to understand what his storytelling was actually doing. The Saturnia had indeed crossed safely, but the family’s subsequent arrival in São Paulo had been devastating: poverty, illness, and bureaucratic humiliation. In his oral performance, my uncle had condensed five years of post-migration struggle into a single, heroic ocean crossing. The waves and the fire were evidentially false, but psychologically true. His story had given three generations of displaced relatives the dignity of survivors rather than the stigma of victims. An archive records what happened; a narrative records what it meant.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Epistemology', q: 'What did the archival maritime logs reveal about the uncle’s famous story?', options: ['The ship had actually sunk with all passengers lost.', 'The crossing had been routine and calm, contradicting the dramatic boiler fire and storms.', 'The uncle had never boarded the ship.', 'The manifest confirmed every detail of the midnight fire.'], answer: 1, explain: 'The transit logs showed mild seas and no fires, arriving ahead of schedule.' },
          { id: 'q2', type: 'open', tag: 'Narrative truth', q: 'Why does the narrator ultimately conclude that his uncle’s story was “psychologically true” despite being evidentially false?', rubric: ['Explains that the uncle condensed years of harsh post-migration struggle into the metaphor of a stormy crossing', 'Notes that the story gave displaced family members dignity as heroic survivors rather than helpless victims', 'Distinguishes between archival factual records and narrative meaning-making'] },
          { id: 'q3', type: 'fill', tag: 'Contrast', q: 'Complete the narrator’s final distinction: “An archive records what happened; a narrative records what it ______.”', answers: ['meant|what it meant'], explain: 'Contrasting what happened with what it meant captures the core distinction between data and narrative.' }
        ]
      }
    ],
    speaking: {
      id: 'm1s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Reflect on how learning an additional language or leaving a familiar culture reshapes a person’s autobiographical memory. In 75–135 seconds, draw on the core distinctions of Units 01–05: separate historical facts from narrative inferences, employ accurate narrative aspect (including Past Perfect or Past Perfect Continuous), incorporate “used to” or “would” for past habits, and argue whether personal memory is a preservation of the past or an ongoing reconstruction of our relationship with it.',
      prepare: 'Keywords only: memory vs record · narrative tenses & aspect · used to / would · fact vs inference · ongoing reconstruction.',
      grammar: 'Narrative tenses (Past Simple, Past Continuous, Past Perfect Continuous); used to / would; contrastive linkers (what remained was, it is tempting to interpret)',
      targets: ['memory is not a recording of the past', 'used to / would recount', 'draw an inference from evidence', 'context-dependent self', 'what remained was'],
      rubric: ['Synthesizes themes from across Units 01–05 without merely listing unit summaries', 'Deploys accurate narrative aspect and past habit formulations', 'Distinguishes evidential facts from subjective inferences', 'Maintains engaging, extended oral fluency at B2+/C1 level']
    }
  };

  K.reviews['2'] = {
    id: '2', title: 'Love, Intimacy & Human Connection', units: ['06', '07', '08', '09', '10'],
    question: 'Can you apply the language and reasoning of Units 06–10 to unfamiliar human situations?',
    grammarTargets: 'Modals and degrees of certainty; countability; modal perfects; speculation and deduction; relative clauses; participle clauses; conditionals 0–3 and mixed conditionals; wish/if only; reported speech; distancing; say/tell',
    reasoningTargets: 'Necessary × sufficient conditions, possibility × probability, ambiguity, overgeneralisation, historical evidence, sunk cost, alternative explanations, rationalisation, competing principles and facts × values',
    retrieve: {
      lead: 'Keep Units 06–10 closed. Retrieve distinctions and reusable formulations before recognition can help you.',
      items: [
        open('m2r1', 'Explain necessary and sufficient conditions through an original example about trust or intimacy. Do not use “love” as the condition being defined.', null, 5, '06', 'necessary × sufficient'),
        open('m2r2', 'Write four sentences that move from weak possibility to strong deduction. Then rewrite one as a modal-perfect claim about the past.', null, 5, '06–07', 'degrees of certainty · modal perfects'),
        open('m2r3', 'Reconstruct six chunks or sentence frames from Units 06–10 and state the argumentative or interpersonal job of each.', null, 6, '06–10', 'productive chunks'),
        open('m2r4', 'What is the difference between sunk cost and rationalisation? Invent one situation in which both could appear.', null, 5, '09', 'sunk cost · rationalisation'),
        open('m2r5', 'Write one defining relative clause, one non-defining relative clause and one participle clause about relationships or social expectations.', null, 5, '08', 'relative and participle clauses'),
        open('m2r6', 'Report three statements: one neutral, one distanced and one that makes clear the speaker is responsible for the claim. Use say/tell accurately.', null, 5, '10', 'reported speech · distancing'),
        open('m2r7', 'List eight words or collocations from the module. Use four to analyse a situation unrelated to romance.', null, 6, '06–10', 'lexical transfer')
      ]
    },
    language: {
      lead: 'Grammar targets are interleaved. Let the intended degree of certainty, time relationship and information structure determine the form.',
      items: [
        mc('m2l1', 'The lights are off and neither of them is answering. They ___ gone home, but we cannot be certain.', ['must have', 'might have', 'should', 'would'], 1, 'Might have marks a possible past explanation without strong deduction.', 'grammar', '07', 'modal perfect · possibility'),
        mc('m2l2', 'Trust may be necessary for intimacy, but it is not necessarily ___: people can trust each other without being intimate.', ['countable', 'sufficient', 'probable', 'reported'], 1, 'A sufficient condition would guarantee the result; trust alone does not.', 'grammar', '06', 'necessary × sufficient'),
        mc('m2l3', 'Choose the version that adds non-essential information.', ['People who conceal a relationship may experience additional stress.', 'People, who conceal a relationship, may experience additional stress.', 'My neighbours, who have been together for thirty years, still disagree about honesty.', 'My neighbours who have been together for thirty years still disagree about honesty.'], 2, 'The named group “my neighbours” is already identified; the clause adds parenthetical information.', 'grammar', '08', 'non-defining relative clause'),
        mc('m2l4', '___ by the fear of losing what she had invested, she treated another year as the safest choice.', ['Influencing', 'Influenced', 'Having influence', 'Was influenced'], 1, 'The reduced passive participle clause means “because she was influenced”.', 'grammar', '08–09', 'participle clause'),
        mc('m2l5', 'If he ___ the uncertainty earlier, the conversation might not be so difficult now.', ['acknowledged', 'had acknowledged', 'would acknowledge', 'has acknowledged'], 1, 'This mixed conditional links a contrary past condition to a present result.', 'grammar', '09', 'mixed conditional'),
        mc('m2l6', 'She said that honesty ___ always require immediate disclosure.', ['does not', 'did not', 'has not', 'must not'], 1, 'Backshift is natural in reported speech after “said”, while the negative claim is preserved.', 'grammar', '10', 'reported speech'),
        mc('m2l7', 'The article ___ relationships outside the traditional script often face institutional friction.', ['says that', 'tells that', 'tells', 'is said'], 0, 'Say can introduce a that-clause; tell normally requires a person object.', 'grammar', '10', 'say × tell'),
        mc('m2l8', 'Choose the most appropriately distanced formulation.', ['Everyone knows concealment destroys relationships.', 'Researchers have proved that all concealment is harmful.', 'The findings suggest that concealment may place pressure on some relationships.', 'Concealment obviously places pressure on relationships.'], 2, 'Suggest and may match the limited, non-universal claim.', 'grammar', '08–10', 'distancing · modality'),
        mc('m2l9', 'Which sentence treats “love” naturally as an abstract uncountable idea?', ['A love is sufficient for trust.', 'Love does not eliminate ambiguity.', 'The love always solves conflicts.', 'Many loves is necessary.'], 1, 'Love is uncountable when referring to the general concept.', 'grammar', '06', 'countability'),
        mc('m2l10', 'I wish I ___ the difference between loyalty and fear before I defended the decision.', ['recognised', 'had recognised', 'would recognise', 'have recognised'], 1, 'Wish + Past Perfect expresses regret about a past situation.', 'grammar', '09', 'wish · past regret'),
        mc('m2l11', 'If people repeatedly avoid difficult conversations, resentment often ___.', ['would accumulate', 'accumulated', 'accumulates', 'had accumulated'], 2, 'The zero conditional expresses a general pattern.', 'grammar', '09', 'zero conditional'),
        tf('m2l12', '“She must have misunderstood” expresses certainty about a directly observed fact.', false, 'Must have is a strong deduction from evidence, not direct observation or absolute certainty.', 'grammar', '07', 'deduction'),
        produce('m2l13', 'Combine without losing emphasis: “The policy excluded some couples. It was written as if every family followed one script.” Use a participle clause.', ['Written as if every family followed one script, the policy excluded some couples.'], null, '08', 'participle clause'),
        produce('m2l14', 'Report with appropriate distance: “The relationship failed because she was dishonest,” the columnist said.', ['The columnist claimed that the relationship had failed because she had been dishonest.'], 'Claimed signals that the causal interpretation belongs to the columnist.', '10', 'reported speech · distancing')
      ]
    },
    steal: {
      lead: 'Use the module’s language to make precise interpersonal and ethical moves—not to decorate sentences.',
      items: [
        mc('m2s1', 'Which frame separates possibility from probability?', ['It could have happened; that does not mean it probably did.', 'If it happened, it certainly happened.', 'Possibility is sufficient evidence.', 'There is no room for ambiguity.'], 0, 'The formulation blocks a common slide from could to probably.', 'vocabulary', '07', 'possibility × probability'),
        mc('m2s2', 'Choose the natural collocation.', ['meet a condition', 'do a condition', 'make sufficient', 'perform a necessity'], 0, 'Conditions are met, satisfied, necessary or sufficient.', 'vocabulary', '06', 'condition collocation'),
        mc('m2s3', 'Which frame best exposes sunk-cost reasoning?', ['The more we have invested, the more carefully we should ask what happens next.', 'The more we invested, the more the past obliges us to continue.', 'Stopping would erase the years.', 'Past effort guarantees future value.'], 0, 'It acknowledges investment while returning the decision to future consequences.', 'vocabulary', '09', 'sunk cost'),
        mc('m2s4', 'Which formulation introduces an ethical conflict fairly?', ['Honesty always wins.', 'The issue places truthfulness in tension with privacy and care.', 'Facts are more moral than values.', 'Only one principle matters.'], 1, 'In tension with names competing principles without deciding by slogan.', 'vocabulary', '10', 'competing principles'),
        mc('m2s5', 'Which phrase most naturally challenges a social norm presented as universal?', ['a historically specific script', 'a total history evidence', 'an eternal social proof', 'a sufficient tradition'], 0, 'Historically specific prevents a local script from masquerading as timeless necessity.', 'vocabulary', '08', 'historical evidence'),
        produce('m2s6', 'Use “is compatible with, but does not prove” to discipline an inference.', ['Silence is compatible with discomfort, but it does not prove that either person regrets the conversation.'], null, '07', 'limiting inference'),
        produce('m2s7', 'Use “what is at stake is not only … but also …” in an ethical claim.', ['What is at stake is not only the truth of the disclosure but also who has the right to control it.'], null, '08–10', 'broadening the issue'),
        produce('m2s8', 'Use “even if” to concede a fact without surrendering your conclusion.', ['Even if the explanation is sincere, it does not remove the harm caused by months of concealment.'], null, '09–10', 'concession'),
        produce('m2s9', 'Write a sentence with “in retrospect” and a modal perfect without pretending certainty.', ['In retrospect, they might have mistaken the absence of conflict for trust.'], null, '07–09', 'retrospective possibility'),
        produce('m2s10', 'Use “the fact that … does not settle whether …” to separate fact from value.', ['The fact that the message was accurate does not settle whether sending it was justified.'], null, '10', 'facts × values')
      ]
    },
    reading: {
      label: 'Transfer reading', format: 'Case-based argument', title: 'The Message That Arrived Late',
      standfirst: 'When an old message changes the apparent history of a relationship, what matters: the fact, the intention, the timing or the right to know?',
      paras: [
        `On the evening before Daniel and Rui signed the lease on a new flat, Daniel received a message from someone he had dated years earlier. The sender said she had found an old voice note in which Rui, then a close friend of Daniel’s, admitted that he hoped their relationship would fail. The recording was genuine. Its date was visible, the voice unmistakable, and Rui did not deny making it. Within an hour, a fact that had been irrelevant for four years seemed capable of changing the meaning of everything that followed.`,
        `Daniel’s first reaction was not anger but retrospective organisation. Moments that had once looked ambiguous now formed a pattern: Rui’s silence after the first date, his careful questions during the breakup, the ease with which friendship later became intimacy. Daniel thought Rui must have been waiting. Yet the message established only that Rui had wanted a particular outcome at one moment. It did not show what he had done, what he had believed later, or whether his hope had influenced Daniel’s previous relationship at all. A real piece of evidence can still carry an imaginary history.`,
        `Rui explained that he had never interfered. He might have been jealous, he said, but jealousy was not a plan. He had remained a friend because withdrawing without explanation would have punished Daniel for feelings he did not share. When the earlier relationship ended, Rui had waited several months before saying anything. “I told myself that if the friendship survived the truth, it might become something else,” he said. “If it didn’t, I would rather lose an imagined future than manipulate the present.”`,
        `That account was coherent, but coherence was not sufficient evidence of innocence. Rui had reasons to present his restraint as principled rather than fearful. He could have rewritten his motives in retrospect, just as Daniel was rewriting the friendship after hearing the recording. Nor did the absence of obvious interference prove that none had occurred. A suggestion can influence a decision without looking like pressure; selective availability can be strategic without being consciously planned.`,
        `The sender’s role created a different problem. She said Daniel had a right to know before making a major commitment. Her claim treated information as something owed whenever it might affect consent. But timing changes the ethics of disclosure. Information released before a decision can protect autonomy; the same information released without context can also destabilise a choice by making one dramatic fact seem more diagnostic than years of conduct. Accuracy is necessary for responsible disclosure, but it is not sufficient. Relevance, motive and foreseeable effect also matter.`,
        `Daniel considered postponing the lease. Part of him reasoned that four years together should count for more than one old sentence. Another part noticed the danger in that thought. Time invested in a relationship may provide evidence of its value, but it can also become a sunk cost: a reason to protect the past rather than evaluate the future. If they had met only six months earlier, would he interpret the recording differently? The counterfactual did not answer the question, but it exposed how investment was framing it.`,
        `They eventually delayed the signing by a week—not because Daniel had concluded that Rui was untrustworthy, but because neither wanted the deadline to force certainty. During that week they separated questions that the message had compressed. Had Rui wanted the old relationship to end? Yes. Had he caused it to end? They had no evidence that he had. Should he have disclosed his earlier hope? Perhaps, although disclosure at the beginning of a new relationship might itself have transformed a passing feeling into a permanent accusation. Could Daniel trust him now? That depended less on the purity of Rui’s past motives than on how both handled uncertainty in the present.`,
        `They signed the lease. This outcome does not prove that staying was wise; relationships are not experiments with control groups. The week of delay mattered because it changed the kind of decision they made. They neither dismissed the recording as ancient history nor treated it as a verdict. They allowed a fact to remain important without permitting it to become the whole explanation. Honesty, in this case, was not the sudden delivery of every true sentence. It was the slower practice of deciding together what the truth required of them now.`
      ],
      items: [
        mc('m2q1', 'What is the article’s central distinction?', ['True information always determines the right action.', 'A genuine fact can matter without settling its meaning or ethical consequences.', 'Past jealousy makes present trust impossible.', 'Long relationships should never be questioned.'], 1, 'The text repeatedly separates factual accuracy from interpretation and ethical verdict.', 'reading', '06–10', 'main claim'),
        tf('m2q2', 'The recording proves that Rui actively caused Daniel’s earlier relationship to end.', false, 'It establishes a past hope, not interference or causation.', 'reading', '07–10', 'evidence and inference'),
        mc('m2q3', 'Why does the writer question Rui’s coherent explanation?', ['Coherent accounts are always false.', 'Rui uses the wrong tense.', 'A person may rationalise motives in retrospect, so coherence is not sufficient evidence.', 'Jealous people cannot be principled.'], 2, 'The text preserves ambiguity by separating plausibility from proof.', 'reading', '06–09', 'rationalisation'),
        mc('m2q4', 'The sender’s principle is mainly that:', ['all old messages belong to the public', 'information relevant to consent may be owed before a commitment', 'timing never matters if a fact is true', 'privacy always defeats honesty'], 1, 'Her argument connects knowledge to autonomous choice.', 'reading', '10', 'competing principles'),
        mc('m2q5', 'What does the six-month counterfactual reveal?', ['What Daniel certainly would have done', 'That the recording was false', 'How past investment may be influencing present judgment', 'That long relationships are sunk costs'], 2, 'It tests whether accumulated investment is framing the decision; it does not itself dictate the answer.', 'reading', '09', 'counterfactual · sunk cost'),
        open('m2q6', 'Identify one strong deduction and one weaker possibility in the text. Explain what evidence makes their modal force different.', ['A strong answer distinguishes what the recording makes highly likely from explanations that remain merely compatible with the evidence.'], 6, '07', 'modality'),
        open('m2q7', 'Analyse the sentence “Accuracy is necessary for responsible disclosure, but it is not sufficient.” What additional conditions does the text propose?', ['Consider relevance, motive, timing and foreseeable effect.'], 6, '06–10', 'necessary × sufficient'),
        open('m2q8', 'Was delaying the lease an avoidance of commitment or an ethical response to uncertainty? Argue from at least two paragraphs.', ['A strong answer considers both interpretations and explains why one fits the evidence better.'], 6, '07–10', 'argument analysis')
      ]
    },
    reasoning: {
      lead: 'Each case is new. Apply distinctions rather than repeating slogans from the units.',
      items: [
        mc('m2t1', '“They never argue, so their relationship must be secure.” What is the best objection?', ['Security is impossible.', 'Absence of visible conflict is compatible with security, avoidance or unequal power.', 'All couples should argue.', 'The sentence needs a relative clause.'], 1, 'The observation permits several explanations; it does not justify one strong deduction.', 'reasoning', '06–07', 'ambiguity · alternatives'),
        mc('m2t2', 'A newspaper uses one 1950s marriage manual to claim that “people have always understood love this way.” The main flaw is:', ['too much modal language', 'overgeneralising from historically specific evidence', 'using a written source', 'distinguishing facts from values'], 1, 'One prescriptive source from one context cannot establish a universal or timeless social script.', 'reasoning', '08', 'historical evidence · overgeneralisation'),
        mc('m2t3', '“I cannot leave now; I have already spent seven years making this work.” Which question best resists sunk-cost reasoning?', ['How can the seven years be recovered?', 'What future costs and benefits would staying or leaving create from this point?', 'Was every year a mistake?', 'Who is to blame for the past?'], 1, 'Past investment may inform the story but should not mechanically determine future choice.', 'reasoning', '09', 'sunk cost'),
        mc('m2t4', 'A friend says, “Because the disclosure was true, it was morally right.” What has been collapsed?', ['Possibility and probability', 'A fact about accuracy and a value judgment about justification', 'Say and tell', 'Necessary and sufficient grammar'], 1, 'Truth is relevant, but ethical justification may also depend on privacy, motive, timing and harm.', 'reasoning', '10', 'facts × values'),
        open('m2t5', 'Someone says, “If she loved him, she would have told him everything.” Identify the necessary/sufficient confusion and propose two alternative explanations for concealment.', ['A strong answer does not treat concealment as harmless; it shows that one behaviour is not a simple test of love.'], 6, '06–10', 'conditions · alternatives'),
        open('m2t6', 'Two friends interpret the same silence as respect and rejection. Specify what each interpretation assumes and what new evidence could discriminate between them.', ['Use observable behaviour or direct testimony; do not merely restate the two interpretations.'], 6, '07', 'ambiguity · evidence')
      ]
    },
    editing: {
      lead: 'Edit a plausible argument whose problems affect certainty, attribution, information structure and conditional meaning.',
      text: `The columnist told that couples which avoid conflict must be unhappy. Based in one interview, she said readers that silence proved emotional distance. The couple might misunderstood each other, but they also must have agreed not to discuss private matters publicly. If they would disclose everything, perhaps the article had described them as honest; if only the journalist asked what privacy meant to them. Written after the controversy had begun, readers treated the interview as if it was a neutral record. The fact that the quotations were accurate settled whether publishing them was right.`,
      items: [
        open('m2e1', 'Rewrite the paragraph accurately while preserving legitimate uncertainty. Correct grammar and recalibrate any unjustified certainty.', null, 10, '06–10', 'integrated editing'),
        open('m2e2', 'Justify five corrections. Include at least one about modal force and one about the difference between fact and value.', ['Prioritise say/tell, relative clauses, dependent prepositions, modal perfects, conditionals, wish/if only, participle clauses and distancing.'], 8, '06–10', 'editing justification')
      ],
      model: `The columnist said that couples who avoid conflict must be unhappy. On the basis of one interview, she told readers that silence proved emotional distance. The couple might have misunderstood each other, but they may also have agreed not to discuss private matters publicly. If they had disclosed everything, perhaps the article would have described them as honest; if only the journalist had asked what privacy meant to them. Written after the controversy had begun, the interview was treated by readers as if it were a neutral record. The fact that the quotations were accurate did not settle whether publishing them was right.`
    },
    synthesis: {
      id: 'm2w1', type: 'writing', kind: 'Module synthesis', title: 'What do we owe one another?', min: 600, max: 900, main: true,
      prompt: `Write a 600–900-word deliberative essay responding to this claim: <b>“In close relationships, honesty matters less as a rule than as a shared practice of deciding what another person has a right to know.”</b> Develop a position that addresses love, friendship, social scripts, staying/leaving and the ethics of disclosure. You may reject the claim, but you must engage its strongest version.`,
      support: ['Use ideas from at least three of Units 06–10 without producing five separate summaries.', 'Distinguish possibility from probability and facts from value judgments.', 'Consider at least two competing principles or explanations.', 'Use modality, conditionals, relative/participle clauses or reporting structures where they naturally improve precision.', 'Reuse several module chunks as functional parts of the argument.'],
      guide: ['A strong response defines the principle it is defending.', 'It tests that principle against a difficult case rather than an easy example.', 'It avoids treating one behaviour as a sufficient test of love or honesty.', 'Its conclusion makes a reasoned decision while preserving relevant uncertainty.']
    },
    timed: {
      id: 'm2tc1', type: 'writing', kind: 'Timed essay', title: 'Why do people stay?', min: 280, max: 380, minutes: 45, timed: true,
      prompt: `<b>“People stay in relationships that make them unhappy mainly because they are afraid of change.”</b> Write an essay in which you discuss this claim. Use at least one distinction from Units 06–10 (for example necessary × sufficient conditions, possibility × probability, or sunk cost × switching cost), consider one alternative explanation, and reach a qualified conclusion.`,
      guide: ['A clear position that does not treat one cause as the whole explanation.', 'At least one distinction from the module doing real argumentative work.', 'One alternative explanation taken seriously.', 'Accurate conditionals or modal forms where you speculate about the past.']
    },
    teacherLens: {
      lead: 'Stay a learner first: this is practice in explaining English clearly, not a teaching assessment. Choose the point you feel least able to explain simply.',
      points: [
        { id: 'modcert', label: 'Modal verbs for degrees of certainty (must, may, might, can’t)', unit: '06', ccq: 'good', hint: 'CCQs about how sure the speaker is work well.' },
        { id: 'modperf', label: 'Modal perfects (must have, might have, can’t have, should have)', unit: '07', ccq: 'good', hint: 'CCQs about past time and certainty or regret work well.' },
        { id: 'relcl', label: 'Defining × non-defining relative clauses', unit: '08', ccq: 'good', hint: 'A CCQ such as “Did all the guests smile?” checks the concept.' },
        { id: 'partcl', label: 'Participle clauses (having decided…, being asked…)', unit: '08', ccq: 'partial', hint: 'A CCQ can check time order or who the subject is; much of the point is form.' },
        { id: 'cond3', label: 'Third and mixed conditionals', unit: '09', ccq: 'good', hint: 'CCQs about what really happened (“Did she leave early?”) work well.' },
        { id: 'wish', label: 'wish / if only', unit: '09', ccq: 'good', hint: 'CCQs about reality versus desire work well.' },
        { id: 'reported', label: 'Reported speech and backshift', unit: '10', ccq: 'partial', hint: 'Useful for “Is it still true now?” (optional backshift); mostly form otherwise.' },
        { id: 'saytell', label: 'say × tell', unit: '10', ccq: 'weak', hint: 'Mainly a form point (tell + person): a CCQ is usually not the right tool — the CCQ is optional here.' },
        { id: 'distancing', label: 'Distancing language (allege, it is claimed, appear to)', unit: '10', ccq: 'good', hint: 'A CCQ such as “Is the writer sure it is true?” checks the concept.' }
      ]
    },
    areas: {
      grammar: ['Unit 06 · modals, degrees of certainty and countability', 'Unit 07 · modal perfects, speculation and deduction', 'Unit 08 · relative and participle clauses', 'Unit 09 · conditionals, mixed conditionals and wish/if only', 'Unit 10 · reported speech, distancing and say/tell'],
      vocabulary: ['Units 06–10 · collocations, chunks and rhetorical frames'],
      reading: ['Units 06–10 · inference, modality, attribution and ethical interpretation'],
      reasoning: ['Units 06–10 · conditions, ambiguity, historical evidence, sunk cost and competing principles']
    },
    listening: [
      {
        id: 'r2l1', title: 'The Calculus of Commitment', format: 'Structured dialogue',
        file: '/audio/en/reviews/r02-listening-01.mp3', duration: 106, level: 'C1',
        audioReady: true,
        voice: 'Two adult speakers (Dr. Sophia Alvarez and Professor Julian Stern); rigorous, empathetic, analytical',
        passes: ['First listen · identify the tension between emotional investment as a sunk cost vs as a foundation of care', 'Second listen · track modal perfects (must have been, could have chosen) and mixed conditionals', 'Third listen · evaluate how competing principles (fidelity vs individual flourishing) are reconciled'],
        transcript: `Julian: Sophia, in your clinical practice with couples contemplating separation after decades together, how do you help clients separate legitimate devotion from the sunk-cost fallacy? Many insist: “If we dissolve this marriage now, twenty-five years will have been completely wasted.”\n\nSophia: That is the central cognitive knot. In financial decisions, unrecoverable past expenditure should never dictate forward-looking choices. But human relationships are not commercial ventures. Twenty-five years of shared care, mutual vulnerability, and domestic infrastructure create ongoing moral obligations that do not vanish simply because past time cannot be recovered. When clients describe past years as “wasted,” they are usually rationalizing their terror of the massive switching costs of divorce.\n\nJulian: That distinction between sunk costs and forward-looking switching costs is vital. If they had acknowledged their emotional estrangement ten years earlier, the logistical and financial transition might have been far less agonizing. But today, the switching costs include fractured family networks, divided pensions, and social dislocation. Those are real prospective costs, not illusions.\n\nSophia: Exactly. Our task is not to preach ruthless economic optimization. It is to clarify what each option makes impossible. Staying to protect past investment alone is a recipe for chronic resentment; but leaving without acknowledging the legitimate claims of shared history is an exercise in moral evasion. Mature ethical decision-making requires owning whatever residual harm follows your choice.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core distinction', q: 'How does Dr. Alvarez qualify the application of the sunk-cost fallacy to long-term relationships?', options: ['She argues that financial economics applies identically to marriage without exception.', 'She shows that while past time cannot be recovered, decades of care generate real moral obligations and massive prospective switching costs.', 'She claims that nobody should ever divorce after more than ten years of marriage.', 'She advises clients to ignore future costs and focus purely on romantic passion.'], answer: 1, explain: 'Dr. Alvarez distinguishes cold economic sunk costs from genuine ongoing moral ties and forward-looking switching costs.' },
          { id: 'q2', type: 'tf', tag: 'Detail', q: 'Professor Stern argues that the fear of divorce is always an irrational cognitive bias rather than a reflection of real switching costs.', answer: false, explain: 'Stern explicitly stresses that fractured networks and divided assets are real prospective switching costs, not illusions.' },
          { id: 'q3', type: 'open', tag: 'Ethical judgment', q: 'According to both speakers, what distinguishes mature ethical decision-making from both unreflective persistence and impulsive departure?', rubric: ['Rejects continuing purely to justify past sunk investment (which breeds resentment)', 'Rejects departing without owning the real obligations and switching impacts on shared history', 'Demands naming competing values and taking explicit responsibility for residual harm'] },
          { id: 'q4', type: 'fill', tag: 'Key concept', q: 'Complete Sophia’s concluding standard: “Mature ethical decision-making requires ______ whatever ______ harm follows your choice.”', answers: ['owning whatever residual harm|owning whatever residual'], explain: 'Owning residual harm is the hallmark of non-evasive ethical deliberation.' }
        ]
      },
      {
        id: 'r2l2', title: 'The Limits of Transparency', format: 'Symposium lecture',
        file: '/audio/en/reviews/r02-listening-02.mp3', duration: 92, level: 'C1',
        audioReady: true,
        voice: 'Solo lecturer (Professor of Applied Ethics); incisive, measured, intellectually challenging',
        passes: ['First listen · understand why total transparency is not a necessary or sufficient test of honesty', 'Second listen · track participle clauses and reported speech markers', 'Third listen · contrast facts, inferences, and moral principles in interpersonal candour'],
        transcript: `In contemporary relationship culture, transparency is frequently elevated to an unquestionable supreme virtue. Pop psychology tells us that if two people love each other, neither should possess private thoughts, unshared messages, or concealed doubts. This dogma collapses two distinct ethical categories: the absolute duty against deceit, and an alleged duty of total disclosure.\n\nDeceit involves actively manufacturing a false reality or deliberately withholding information that belongs to another person’s agency. If a partner conceals gambling debts while signing a joint mortgage, that omission is morally indefensible because it robs the other of informed consent. But having experienced an unexpressed moment of attraction toward an acquaintance, or harboring a private aesthetic critique of a partner’s creative work, does not belong to the other person’s agency.\n\nDemanding that every passing sentiment be voiced in the name of “radical honesty” confuses communication with emotional discharge. True disclosure requires standing, relevance, care, and responsible timing. Delivered without care, unfiltered candour is often nothing more than hostility disguised as integrity. Ethical intimacy does not require erasing the boundary between two autonomous minds; it requires knowing when speech serves the other person’s agency, and when silence protects their dignity.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Main thesis', q: 'What is the lecturer’s central philosophical distinction regarding transparency?', options: ['Lying and withholding are always identical in every context.', 'The duty not to deceive is fundamentally distinct from an alleged obligation of exhaustive disclosure.', 'Partners must share every single private thought to maintain trust.', 'Silence in relationships is always proof of emotional betrayal.'], answer: 1, explain: 'The lecturer separates the strict duty against deception from the mistaken demand for total, indiscriminate disclosure.' },
          { id: 'q2', type: 'open', tag: 'Reasoning', q: 'When does withholding information constitute an ethical breach, according to the lecture?', rubric: ['When the withheld information materially affects the other person’s agency or informed consent', 'When concealment actively manufactures a false reality for a joint decision (e.g. shared debt)', 'Distinguishes this from harmless private reflections or passing feelings that do not impact the other’s choices'] },
          { id: 'q3', type: 'fill', tag: 'Vocabulary', q: 'Complete the lecturer’s caution: “Delivered without care, unfiltered candour is often nothing more than ______ disguised as ______.”', answers: ['hostility disguised as integrity'], explain: 'Hostility disguised as integrity exposes weaponized transparency.' }
        ]
      }
    ],
    speaking: {
      id: 'm2s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Synthesize the ethical and relational themes of Units 06–10: Consider an intimate bond, partnership, or collaborative venture confronting a major crisis over disclosure, conflicting scripts, or whether to persist. In 75–135 seconds, analyze the dilemma: distinguish necessary from sufficient conditions for trust, employ at least one modal perfect (must have / could have) and one mixed or third conditional, incorporate reported or distancing language, and explain what residual harm must be owned under your proposed resolution.',
      prepare: 'Keywords only: dilemma · necessary vs sufficient conditions · modal perfect · conditional form · reported speech / distancing · owning residual harm.',
      grammar: 'Modal perfects (must have, might have); mixed conditionals; reported speech with backshift; participle clauses; contrastive frames',
      targets: ['necessary but not sufficient', 'might have foreseen', 'had we acknowledged earlier', 'it was maintained that', 'own the residual harm'],
      rubric: ['Synthesizes multiple Unit 06–10 targets (conditions, certainty, scripts, sunk costs, candour)', 'Accurately employs modal perfects, conditionals, and reported speech', 'Balances analytical rigor with ethical responsibility', 'Sustains uninterrupted, high-level spoken production']
    }
  };

  K.reviews['3'] = {
    id: '3', title: 'Society, Power & Politics', units: ['11', '12', '13', '14', '15', '16'],
    question: 'How do institutional rules, economic structures, and linguistic frames shape political power?',
    grammarTargets: 'Passive voice and impersonal reporting; nominalisation; complex prepositional passives; contrast connectors (whereas, while, as opposed to); wh-noun clauses; correlative comparatives (the more..., the less...); quantifiers; cause and result participials (thereby + -ing); causatives (make, let, get); concession (despite, although, nonetheless); cleft sentences (it-clefts, wh-clefts); fronting with inversion; hedging and boosting',
    reasoningTargets: 'Procedural vs substantive democracy, institutional veto players, attribution error, multi-dimensional political space, steelmanning, confounding variables in meritocracy, Great Gatsby Curve, cumulative advantage, tax incidence, cognitive framing, and linguistic deconstruction',
    retrieve: {
      lead: 'Do this section with Units 11–16 closed. Reconstruct principles, distinctions, and usable structures directly from memory.',
      items: [
        open('m3r1', 'Distinguish procedural democracy from substantive political participation. How can an attention economy silence citizens without using state censorship?', null, 6, '11', 'procedural vs substantive democracy · attentional flooding'),
        open('m3r2', 'Explain Sérgio Abranches’s concept of "coalition presidentialism" in Brazil. Why are presidents structurally compelled to distribute ministries to non-ideological parties?', null, 6, '12', 'coalition presidentialism · legislative fragmentation'),
        open('m3r3', 'What is steelmanning? Choose one political philosophy you strongly disagree with and formulate its most compelling core principle with intellectual charity.', null, 6, '13', 'steelmanning · multidimensional politics'),
        open('m3r4', 'Define the Great Gatsby Curve and explain why high income inequality mathematically undermines equality of opportunity across generations.', null, 6, '14', 'Great Gatsby Curve · cumulative advantage'),
        open('m3r5', 'Why is a high reliance on indirect consumption taxes (sales tax, ICMS, VAT) economically regressive? Use the concept of marginal propensity to consume.', null, 6, '15', 'tax incidence · marginal propensity to consume'),
        open('m3r6', 'Explain George Lakoff’s theory of cognitive framing. Why did progressive politicians commit cognitive self-sabotage when they campaigned against "tax relief"?', null, 6, '16', 'cognitive framing · conceptual metaphor'),
        open('m3r7', 'List eight high-level vocabulary items or collocations from Module 3 (e.g. substantive, meritocratic hubris, mandatory spending, euphemism) and use four in a single paragraph about institutional reform.', null, 6, '11–16', 'productive political vocabulary')
      ]
    },
    language: {
      lead: 'Targets from Units 11–16 are interleaved. Choose the accurate structure based on meaning, focus, and formal academic register.',
      items: [
        mc('m3l1', 'The reform ___ to have reduced administrative delays, although local courts dispute the data.', ['is reported', 'reports', 'is reporting', 'reported'], 0, 'Passive reporting structure with infinitive complement.', 'grammar', '12', 'passive reporting verbs'),
        mc('m3l2', '___ the economic left emphasizes collective redistribution, the libertarian right prioritizes individual market autonomy.', ['Whereas', 'Despite', 'As opposed to', 'In spite of'], 0, 'Whereas establishes balanced contrast between two independent clauses.', 'grammar', '13', 'contrast connectors'),
        mc('m3l3', 'The steeper the socioeconomic hierarchy, ___ the rate of intergenerational social mobility becomes.', ['the lowest', 'the lower', 'lower than', 'the more low'], 1, 'Correlative comparative structure: The + comparative..., the + comparative...', 'grammar', '14', 'correlative comparatives'),
        mc('m3l4', 'The new tax code ___ multinational corporations pay higher marginal rates on offshore revenue.', ['made', 'made to', 'got', 'let to'], 0, 'Causative make takes an object followed by a bare infinitive.', 'grammar', '15', 'causative verbs'),
        mc('m3l5', '___ was the deregulation of speculative finance that triggered the severe currency collapse.', ['What', 'It', 'There', 'Which'], 1, 'It-cleft sentence for focusing on a specific causal agent.', 'grammar', '16', 'cleft sentences'),
        mc('m3l6', 'Never before ___ witnessed such aggressive algorithmic manipulation of the public agenda.', ['the country has', 'has the country', 'the country did', 'had the country been'], 1, 'Negative fronting requires subject-auxiliary inversion.', 'grammar', '16', 'fronting with inversion'),
        mc('m3l7', '___ collecting nearly thirty-five percent of GDP in revenue, the state provides substandard public healthcare.', ['Although', 'Despite', 'Whereas', 'Even though'], 1, 'Despite is followed by a gerund (-ing) or noun phrase, not a finite clause.', 'grammar', '15', 'concession markers'),
        mc('m3l8', 'Over ninety percent of the federal budget is legally ___ for statutory pensions and public payroll.', ['hemmed in', 'earmarked', 'sanctified', 'subsidized'], 1, 'Funds are constitutionally earmarked for specific statutory expenditures.', 'grammar', '12', 'prepositional passives'),
        mc('m3l9', 'Students from impoverished zip codes possess significantly ___ opportunities to access elite private tutoring.', ['less', 'fewer', 'least', 'few'], 1, 'Fewer is used with countable plural nouns (opportunities).', 'grammar', '14', 'quantifiers'),
        mc('m3l10', 'The administration expanded federal subsidies, ___ reducing the cost of public transit for urban commuters.', ['thereby', 'thus it', 'which', 'nevertheless'], 0, 'Thereby is followed by a present participle (-ing) to form a result clause.', 'grammar', '14', 'result participials'),
        mc('m3l11', 'The central dispute rests on ___ the government should intervene in platform moderation.', ['if', 'whether', 'that', 'what'], 1, 'Use whether (not if) after prepositions in formal academic prose.', 'grammar', '13', 'noun clauses'),
        tf('m3l12', '“In contrast of traditional parties, the new movement refuses coalition bargaining” is grammatically standard English.', false, 'The correct fixed idiom is "in contrast to" or "in contrast with", never "in contrast of".', 'grammar', '13', 'contrast prepositions'),
        produce('m3l13', 'Rewrite using a cleft structure focusing on "the concentration of media ownership": <i>The concentration of media ownership distorts democratic debate.</i>', ['It is the concentration of media ownership that distorts democratic debate.'], 'It-cleft structure isolates and emphasizes the focused noun phrase.', '16', 'it-cleft focus'),
        produce('m3l14', 'Combine into a single sentence using "The more..., the more...": <i>When political rhetoric becomes polarised, voters feel alienated.</i>', ['The more polarised political rhetoric becomes, the more alienated voters feel.'], 'Correlative comparative links two escalating conditions.', '14', 'correlative comparatives')
      ]
    },
    steal: {
      lead: 'Deploy high-value political and analytical chunks from Units 11–16.',
      items: [
        mc('m3s1', 'Which formulation best describes a legal guarantee that exists on paper but is completely inaccessible in practice?', ['a necessary floor, not a ceiling', 'technically true and substantively vacuous', 'a contingent historical accident', 'the cold mathematics of the legislature'], 1, 'Technically true and substantively vacuous distinguishes formal rule from lived reality.', 'vocabulary', '11', 'rhetorical chunk'),
        mc('m3s2', 'Choose the natural institutional collocation.', ['hold the balance of power', 'make the balance of power', 'do the balance of power', 'grab the balance of leverage'], 0, 'Hold the balance of power describes a decisive centrist bloc.', 'vocabulary', '12', 'political collocation'),
        mc('m3s3', 'Which phrase captures the psychological arrogance of credentialed elites who believe they earned everything on their own?', ['procedural fallacy', 'affective polarisation', 'meritocratic hubris', 'marginal propensity'], 2, 'Meritocratic hubris is Michael Sandel’s term for winner arrogance.', 'vocabulary', '14', 'sociological concept'),
        mc('m3s4', 'Which phrase describes presenting an opponent’s argument in its strongest, most persuasive possible form?', ['framing the debate', 'steelmanning the opposing philosophy', 'laundering inherited privilege', 'erasing human agency'], 1, 'Steelmanning represents maximum intellectual charity and rigor.', 'vocabulary', '13', 'critical thinking chunk'),
        mc('m3s5', 'Which formulation describes disguising corporate layoffs as an unpreventable natural phenomenon?', ['a natural, inevitable meteorological event', 'the secular theology of modern capitalism', 'the architecture of the unspoken', 'an upside-down fiscal structure'], 0, 'A natural, inevitable meteorological event satirizes corporate euphemism.', 'vocabulary', '16', 'rhetorical chunk'),
        produce('m3s6', 'Write one sentence using “a necessary floor, not a decorative ceiling” about constitutional rights.', ['Universal voting rights are a necessary floor, not a decorative ceiling for democratic justice.'], null, '11', 'essayistic chunk'),
        produce('m3s7', 'Use “hemmed in by statutory constraints” to describe institutional limits on a new mayor.', ['Upon taking office, the new mayor found herself hemmed in by statutory constraints and inherited debt.'], null, '12', 'governance chunk'),
        produce('m3s8', 'Write a sentence with “laundering inherited privilege as individual merit” about elite admissions.', ['Standardized testing without affirmative action risks laundering inherited privilege as individual merit.'], null, '14', 'sociological critique'),
        produce('m3s9', 'Use “the price we pay for civilized society” in an argument defending tax compliance.', ['Taxes are not extortion; as Justice Holmes noted, they are the price we pay for civilized society.'], null, '15', 'philosophical chunk'),
        produce('m3s10', 'Use “erase human agency from the sentence” to critique a passive news headline.', ['By using the passive voice, the article managed to erase human agency from the description of state violence.'], null, '16', 'critical discourse analysis')
      ]
    },
    reading: {
      format: 'Interdisciplinary essay',
      title: 'The Architecture of Public Silence: Power, Taxes, and the New Public Commons',
      standfirst: 'When digital platforms commodify attention and tax codes shelter capital, democratic citizenship is reduced to a passive consumer spectacle.',
      paras: [
        `In the classical tradition of political philosophy, democracy was conceived as a self-governing commonwealth of equal citizens. The legitimacy of the polis rested upon two foundational pillars: first, a shared public sphere where arguments could be heard and tested on their merits; and second, an equitable fiscal contract where all members contributed to the commonwealth in accordance with their ability to pay. To participate in democratic life was not merely to cast a periodic ballot; it was to exercise collective self-determination over the shared conditions of social existence.` ,
        `In the contemporary digital era, however, both pillars have been profoundly hollowed out. What presents itself as an unprecedented expansion of human liberty is, upon closer inspection, an intricate architecture of structural enclosure. In the realm of communication, traditional public plazas and civic commons have been replaced by privately owned digital platforms. These platforms operate not as neutral public utilities, but as commercial arenas engineered to maximize engagement through algorithmic outrage. In this attention economy, freedom of speech is technically universal, but communicative power is intensely monopolized. Dissent is rarely censored through direct state coercion; rather, it is neutralized at the point of reception by waves of automated noise and manufactured distraction.` ,
        `This communicative distortion is mirrored and reinforced by the contemporary fiscal architecture. Across the globe, modern states have increasingly shifted their tax burdens away from mobile capital and corporate profits, loading them onto domestic consumption and labor. In emerging economies like Brazil, this upside-down fiscal structure forces low-income families—whose marginal propensity to consume essentials is near total—to surrender a staggering portion of their wages in hidden value-added taxes. Meanwhile, the transnational technological and financial elites who own the digital platforms shelter their profits in offshore jurisdictions, exploiting regulatory loopholes to evade meaningful contribution.` ,
        `The ideological justification for this staggering disparity is anchored in the secular theology of meritocracy. Society is told that the billionaires who monopolize digital platforms and accumulate untaxed capital possess exceptional individual merit. Their staggering fortunes are framed not as the product of public infrastructure, state-funded research, and monopoly pricing, but as the earned moral desert of visionary genius. This meritocratic hubris delivers a devastating double blow to democratic solidarity: it flatters the winners with the illusion of self-made omnipotence, while telling the working-class citizens whose data is harvested that their economic precarity is an individual defect.` ,
        `The political consequence of these combined forces is what political theorists term the erosion of fiscal and democratic citizenship. When citizens realize that their votes do not alter the cold mathematics of legislative bargaining, that their taxes do not return high-quality public services, and that their grievances are dismissed by credentialed technocrats as uncivil complaints, they retreat into cynical apathy or populist fury. They begin to experience the state not as a protective commonwealth, but as a predatory tollbooth operating on behalf of an insulated elite.` ,
        `To reclaim democratic legitimacy in the twenty-first century requires dismantling the artificial dichotomy between communicative freedom and material equality. A democracy cannot survive when freedom of speech is treated as a decorative promise while the physical and digital commons are enclosed by private monopolies. We must recognize that true democratic acoustics require progressive direct taxation, robust public investment in non-commercial communication commons, and a renewed commitment to the intrinsic dignity of every citizen.`
      ],
      items: [
        mc('m3rd1', 'What are the two foundational pillars of democracy identified in paragraph 1?', ['A strong military and a national currency', 'A shared deliberative public sphere and an equitable fiscal contract based on ability to pay', 'Universal private schooling and free international trade', 'A two-party legislature and mandatory voting'], 1, 'Paragraph 1 defines the classical pillars as a shared public sphere and equitable progressive taxation.', 'reading', '11/15', 'main thesis'),
        mc('m3rd2', 'Why does the author argue that modern digital censorship operates through "volume" and noise rather than state bans?', ['Because microphones are louder than in ancient Greece', 'Because commercial platforms flood the attention economy with outrage and distraction, drowning out legitimate critique', 'Because governments have abolished all police forces', 'Because citizens refuse to read books'], 1, 'Paragraph 2 explains that automated noise and distraction neutralize critique without requiring direct coercion.', 'reading', '11/16', 'inference'),
        tf('m3rd3', 'According to paragraph 3, transnational digital platforms pay the highest proportional tax rates in emerging economies like Brazil.', false, 'Paragraph 3 notes that platforms shelter profits offshore while the poor bear heavy consumption taxes.', 'reading', '15', 'detail'),
        mc('m3rd4', 'How does meritocratic ideology legitimize the tax privileges and monopoly profits of digital elites according to paragraph 4?', ['By proving that billionaires have superior genetic DNA', 'By framing market wealth as individual moral desert rather than the result of public infrastructure and monopoly capture', 'By requiring tech executives to teach in public schools', 'By distributing platform shares to all users'], 1, 'Paragraph 4 explains that meritocratic theology sanctifies wealth as earned personal virtue.', 'reading', '14', 'ideological analysis'),
        open('m3rd5', 'In paragraph 5, what three factors cause citizens to experience the erosion of fiscal and democratic citizenship?', ['Cold mathematics of legislative bargaining ignoring votes; high taxes failing to yield quality public services; technocratic contempt for working-class grievances.'], 4, '12/14/15', 'synthesis'),
        open('m3rd6', 'Deconstruct the metaphor in paragraph 5: "the state not as a protective commonwealth, but as a predatory tollbooth."', ['A commonwealth is a shared enterprise for mutual flourishing; a predatory tollbooth merely extracts money at every turn without delivering collective value or care.'], 4, '15/16', 'metaphor deconstruction'),
        mc('m3rd7', 'Which word in paragraph 2 is closest in meaning to "privatized enclosure" of shared spaces?', ['commensurate', 'monopolized', 'disenfranchised', 'sanctified'], 1, 'Monopolized captures private capture and enclosure of the commons.', 'reading', '11', 'vocabulary in context'),
        produce('m3rd8', 'Complete the author’s concluding imperative: "True democratic acoustics require ______ direct taxation, robust public investment in non-commercial communication commons, and a renewed commitment to the ______ of every citizen."', ['progressive direct taxation', 'intrinsic dignity'], 'Completes the concluding synthesis.', '11–16', 'synthesis recall')
      ]
    },
    reasoning: {
      lead: 'Integrate the critical reasoning frameworks of Module 3: procedural fallacies, attribution errors, multidimensional space, confounders, tax incidence, and framing.',
      defs: [
        ['Procedural Fallacy', 'Assuming that because a formal procedure was followed, the substantive outcome is just.'],
        ['Fundamental Attribution Error', 'Attributing systemic institutional failures purely to individual character or malice.'],
        ['Cognitive Framing', 'Activating subconscious mental frames that pre-determine what is considered common sense.']
      ],
      items: [
        {
          id: 'm3t1', type: 'label', q: 'Classify each analytical observation from Module 3.',
          labels: ['Procedural Fallacy', 'Attribution Error', 'Framing Manipulation', 'Confounding Variable'],
          rows: [
            { text: '“All citizens have the right to post online; therefore, everyone has equal political influence.”', answer: 'Procedural Fallacy', explain: 'Equates legal right to speak with equal substantive communicative power.' },
            { text: '“The president failed to fix the economy because he is personally lazy and corrupt, ignoring mandatory spending laws.”', answer: 'Attribution Error', explain: 'Ignores structural budgetary rigidities and institutional veto players.' },
            { text: '“Calling estate taxation the ‘death tax’ to make inheritance taxes sound like state cruelty.”', answer: 'Framing Manipulation', explain: 'Activates a negative cognitive frame of victimization.' },
            { text: '“Parental wealth inflating both private tutoring access and adult career salaries.”', answer: 'Confounding Variable', explain: 'A background variable driving both test performance and earnings.' }
          ]
        },
        mc('m3t2', 'A commentator asserts: "High sales taxes treat everyone equally because rich and poor pay the exact same 20% at the supermarket." What analytical flaw does this assertion commit?', ['It ignores that poor households spend 100% of their income on taxed essentials, making the effective rate deeply regressive.', 'It forgets that supermarkets are closed on Sundays.', 'It assumes that money does not exist.', 'It confuses inflation with interest rates.'], 0, 'It commits a procedural equality fallacy by ignoring marginal propensity to consume.', 'reasoning', '15', 'incidence fallacy'),
        open('m3t3', 'Steelman the argument for why a democratic country SHOULD maintain strict constitutional spending caps (mandatory spending rules), even if it limits a newly elected president’s reform agenda.', ['Focus on macroeconomic stability, preventing short-term electoral fiscal populism, controlling public debt, and protecting long-term social security solvency.'], 5, '12', 'steelmanning fiscal caps'),
        open('m3t4', 'Explain why treating political debate as a single horizontal line (left vs right) worsens affective polarisation compared to a multidimensional landscape.', ['A single line enforces binary in-group/out-group tribal sorting where compromise is seen as betrayal, whereas multiple dimensions reveal shared cross-cutting interests.'], 5, '13', 'polarisation analysis'),
        open('m3t5', 'Using John Rawls’s concept of the "genetic lottery," explain why high natural intelligence does not automatically establish moral desert for 100x higher economic earnings.', ['Genetic intelligence is an unearned biological accident, and market valuation of specific skills is historically contingent; one cannot claim moral desert for luck of birth.'], 5, '14', 'Rawlsian desert analysis'),
        open('m3t6', 'Analyze a headline: "Ten thousand workers separated due to structural optimization." Rewrite it in active voice and explain what the passive nominalisation concealed.', ['Active: "Executives fired ten thousand workers to increase corporate profits." The original concealed who made the decision and erased the human cost behind technical jargon.'], 5, '16', 'critical discourse analysis')
      ]
    },
    editing: {
      lead: 'Polish and elevate political and socioeconomic argumentation. Apply accurate syntax, tone, and rhetorical precision.',
      items: [
        produce('m3e1', 'Repair the syntactic and stylistic flaws: <i>Although Brazil taxes heavily its citizens, but it is by the constitution earmarked ninety percent of money.</i>', ['Although Brazil taxes its citizens heavily, ninety percent of its revenue is constitutionally earmarked.'], 'Eliminates redundant "but" after although and uses natural passive with "is constitutionally earmarked".', '12/15', 'syntax and cohesion'),
        produce('m3e2', 'Upgrade the colloquial sentence to formal academic prose: <i>Rich people think they did everything by themselves because they got good grades on tests, which makes them look down on poor people.</i>', ['Meritocratic hubris causes credentialed elites to mistake cumulative parental advantage for personal virtue, thereby fostering condescension toward the working class.'], 'Deploys precise vocabulary (meritocratic hubris, cumulative advantage, foster condescension).', '14', 'register upgrade')
      ]
    },
    synthesis: {
      id: 'm3w1', kind: 'Module synthesis', title: 'The Triad of Power: Institutions, Economics, and Discourse',
      min: 600, max: 900, main: true,
      prompt: 'Synthesize the central thesis of Module 3: How do institutional rules (coalition presidentialism, veto players), economic structures (regressive taxation, meritocracy), and linguistic framing jointly shape who wields power and who is heard in contemporary democracy? Write a comprehensive, well-hedged analytical essay defending a coherent framework for democratic renewal.',
      guide: [
        'Introduction: define the triad of power (institutional rules, fiscal/economic distribution, and linguistic framing) and state your thesis.',
        'Body 1 (Institutional Mechanics): analyze how fragmented legislatures and veto points constrain formal executive power (U11, U12).',
        'Body 2 (Economic & Class Structures): evaluate how regressive consumption taxes and meritocratic credentials entrench inequality (U14, U15).',
        'Body 3 (Discourse & Framing): examine how cognitive frames, euphemisms, and syntactic choices manufacture consent and erase agency (U13, U16).',
        'Conclusion: synthesize what substantive democratic renewal requires across all three dimensions (institutional acoustics, fiscal justice, rhetorical literacy).'
      ]
    },
    timed: {
      id: 'm3w2', kind: 'Timed writing', title: 'Democracy in the Age of Noise and Inequality',
      min: 300, max: 450, timed: true,
      prompt: 'Respond concisely to the claim: “True democracy only requires clean elections and free speech; economic inequality and media framing are irrelevant.” Deconstruct this claim using at least three core concepts from Module 3.',
      guide: [
        'Distinguish procedural from substantive democracy.',
        'Incorporate epistemic injustice, marginal propensity to consume, or cognitive framing.',
        'Conclude with a balanced, calibrated standard for democratic legitimacy.'
      ]
    },
    teach: {
      lead: 'Explain one of these key grammatical and structural mechanisms clearly to another learner.',
      points: [
        { id: 'passrep', label: 'Passive reporting structures (is reported to be, is believed to have)', unit: '12', ccq: 'good', hint: 'Check meaning: Does the speaker know it for sure, or are they attributing the claim?' },
        { id: 'contrastcon', label: 'Contrast connectors: whereas × as opposed to × while', unit: '13', ccq: 'good', hint: 'Check syntax: whereas + clause vs as opposed to + noun phrase.' },
        { id: 'whnoun', label: 'Wh-noun clauses as subjects (What voters demand is...)', unit: '13', ccq: 'good', hint: 'Check focus: What does the what-clause package?' },
        { id: 'correlcomp', label: 'Correlative comparatives (The higher..., the lower...)', unit: '14', ccq: 'good', hint: 'Check proportion: Do the two clauses escalate together?' },
        { id: 'quantcount', label: 'Quantifiers: fewer (countable) × less (uncountable)', unit: '14', ccq: 'good', hint: 'Check noun type: fewer resources vs less capital.' },
        { id: 'causatives', label: 'Causatives: make someone do × let someone do × get someone to do', unit: '15', ccq: 'good', hint: 'Check bare infinitive (make/let) vs full infinitive with to (get).' },
        { id: 'concessions', label: 'Concession: despite/in spite of (-ing/noun) × although (clause)', unit: '15', ccq: 'good', hint: 'Check syntax: despite has no "of"; although takes a subject + verb.' },
        { id: 'clefts', label: 'It-clefts and wh-clefts for rhetorical emphasis', unit: '16', ccq: 'good', hint: 'Check focus: What single element is isolated by "It was X that..."?' }
      ]
    },
    areas: {
      grammar: ['Unit 11 · passive voice and nominalisation', 'Unit 12 · passive reporting and prepositional passives', 'Unit 13 · contrast connectors and wh-noun clauses', 'Unit 14 · correlative comparatives and quantifiers', 'Unit 15 · causatives and concession markers', 'Unit 16 · cleft sentences and fronting with inversion'],
      vocabulary: ['Units 11–16 · collocations, chunks and political frames'],
      reading: ['Units 11–16 · inference, institutional analysis, ideological deconstruction and critical synthesis'],
      reasoning: ['Units 11–16 · procedural fallacies, attribution errors, steelmanning, Great Gatsby Curve, tax incidence, and framing analysis']
    },
    listening: [
      {
        id: 'r3l1', title: 'The Political Economy of Discontent', format: 'Academic panel debate',
        file: '/audio/en/reviews/r03-listening-01.mp3', duration: 110, level: 'C1',
        audioReady: false,
        voice: 'Two adult speakers (Dr. Teresa Aris and Professor Carlos Mello); intellectual, sharp, Brazilian and British English',
        passes: ['First listen · track how the speakers connect regressive taxation, coalition bargaining, and populist media framing', 'Second listen · note passive reporting and causative structures', 'Third listen · evaluate the proposed solutions for democratic renewal'],
        transcript: `Dr. Aris: Carlos, when we look at the rising voter apathy across Latin America, commentators often frame it as a cultural defect—a lack of democratic civic virtue. But if you analyze the institutional mechanics of coalition presidentialism alongside our regressive tax code, the apathy looks entirely rational.\n\nProf. Mello: Exactly. A citizen votes for sweeping reform, but upon entering office, the president is hemmed in by mandatory spending and forced to distribute cabinet portfolios to centrist patronage blocs. Meanwhile, that same voter pays forty percent of their grocery bill in hidden indirect taxes while public hospitals deteriorate. When democratic procedures repeatedly fail to deliver substantive material changes, citizens conclude that the game is rigged.\n\nDr. Aris: And that is where political framing enters the breach. Populist entrepreneurs step into the legislative vacuum and deploy simplistic binary frames. They tell the public that the problem is not complex institutional veto points or fiscal tax codes, but a corrupt moral elite that must be purged. By reducing structural problems to moral warfare, they manufacture visceral tribal polarization while leaving the underlying economic extraction completely intact.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Systemic synthesis', q: 'Why do the speakers argue that citizen apathy in Latin America is rational rather than a cultural defect?', options: ['Because citizens prefer watching television over voting.', 'Because voters see that coalition bargaining dilutes reform while regressive taxes take their income without providing quality public services.', 'Because voting has been abolished in most countries.', 'Because all politicians belong to the same political party.'], answer: 1, explain: 'The speakers show that systemic gridlock and regressive taxation make voter cynicism an understandable response.' },
          { id: 'q2', type: 'open', tag: 'Framing analysis', q: 'How do populist entrepreneurs exploit institutional gridlock through cognitive framing according to Dr. Aris?', rubric: ['Step into the vacuum created by legislative gridlock', 'Frame complex structural problems as simplistic moral warfare (virtuous people vs corrupt elite)', 'Manufacture visceral tribal polarization while leaving underlying economic extractions unchanged'] }
        ]
      },
      {
        id: 'r3l2', title: 'The Enclosure of the Public Sphere', format: 'Symposium keynote address',
        file: '/audio/en/reviews/r03-listening-02.mp3', duration: 98, level: 'C1',
        audioReady: false,
        voice: 'Solo speaker (Professor of Media Philosophy); authoritative, evocative, General American English',
        passes: ['First listen · grasp why digital platforms are compared to eighteenth-century land enclosures', 'Second listen · notice cleft sentences and rhetorical fronting', 'Third listen · examine the relationship between attention and democracy'],
        transcript: `In the eighteenth century, English landowners passed the Enclosure Acts, transforming common grazing pastures into privately owned commercial property. Today, we are living through the digital equivalent of that historical theft: the enclosure of the public sphere.\n\nIt was the promise of the internet that every citizen would possess a printing press and an equal voice. But what actually occurred was the rapid colonization of public communication by four or five advertising monopolies. In these privately owned digital arenas, attention is commodified, outrage is rewarded, and critical dissent is drowned out in automated noise. Rarely in human history have so few corporate actors exercised such decisive gatekeeping power over the cognitive architecture of an entire species.\n\nWe cannot preserve democratic self-governance while treating our public acoustics as a private market commodity. If we genuinely believe that democracy requires equal voice, we must treat the digital commons not as an advertising auction, but as an indispensable public infrastructure that belongs to all citizens.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core historical analogy', q: 'What historical event does the speaker compare to the rise of commercial digital platforms?', options: ['The Industrial Revolution steam engine', 'The 18th-century Enclosure Acts that privatized common grazing land', 'The construction of the Roman aqueducts', 'The invention of the telegraph'], answer: 1, explain: 'The speaker compares platform dominance to the historic privatization and enclosure of common land.' },
          { id: 'q2', type: 'open', tag: 'Rhetorical syntax', q: 'Identify one cleft sentence or fronted structure used by the speaker and explain its emphasis.', rubric: ['"It was the promise of the internet that..." (wh/it cleft focusing on original democratic hopes)', '"Rarely in human history have so few corporate actors..." (negative fronting with inversion highlighting extreme concentration of power)'] }
        ]
      }
    ],
    speaking: {
      id: 'm3s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Synthesize the core themes of Module 3 (Society, Power & Politics): In 75–135 seconds, analyze how political power is maintained and contested in modern democracy. Connect at least three dimensions: institutional constraints (coalition bargaining, veto players), socioeconomic inequality (meritocracy, regressive taxes), and linguistic framing (euphemisms, cleft focus). Employ at least one cleft sentence, one contrast connector (whereas / as opposed to), and deliver a balanced, well-hedged conclusion on democratic renewal.',
      prepare: 'Keywords only: triad of power · coalition veto players · Great Gatsby & tax incidence · cognitive framing & euphemisms · cleft structure · democratic renewal. Do not script.',
      grammar: 'Cleft sentences (It is X that, What matters is); contrast connectors (whereas, as opposed to); causative verbs; correlative comparatives; stance hedging',
      targets: ['technically true and substantively vacuous', 'the cold mathematics of the legislature', 'laundering inherited privilege as individual merit', 'the architecture of the unspoken', 'a necessary floor, not a ceiling'],
      rubric: [
        'Synthesizes multiple Module 3 themes (institutions, economics, language) with intellectual depth',
        'Accurately employs cleft sentences, contrast connectors, and formal stance markers',
        'Moves beyond simplistic slogans to provide a rigorous structural analysis',
        'Maintains uninterrupted, highly articulate spoken English at C1 standard'
      ]
    }
  };

  K.reviews['4'] = {
    id: '4', title: 'Technology & Modern Life', units: ['17', '18', '19', '20'],
    question: 'How do cognitive automation, algorithmic recommendation, surveillance, and convenience reshape human agency?',
    grammarTargets: 'Future forms (Future Continuous, Future Perfect, Future Perfect Continuous); cognitive verbs; complex noun phrases and subject nominalisation; cybernetic causal connectors (which in turn feeds back into); inverted conditionals (Had, Were, Should); mixed conditionals; restrictive and concessive markers (insofar as, notwithstanding, be that as it may); ellipsis and pro-form substitution (do so, that of, those of); advanced discourse markers (furthermore, conversely, by the same token, to put it another way)',
    reasoningTargets: 'Substitution fallacy, linear extrapolation vs constraints, dialectical tool use, Goodhart’s Law, proxy failure, algorithmic confounding, first-order impulses vs second-order volitions, risk asymmetry, chilling effect, panoptic asymmetry, second-order effects, Chesterton’s Fence, and focal practices vs device commodities',
    retrieve: {
      lead: 'Do this section with Units 17–20 closed. Reconstruct concepts, distinctions, and usable grammatical patterns directly from memory.',
      items: [
        open('m4r1', 'Explain why writing is not merely packaging pre-existing thoughts, but the cognitive friction through which thoughts are formed. How does AI drafting bypass this friction?', null, 6, '17', 'friction of thought · epistemic deskilling'),
        open('m4r2', 'How does Harry Frankfurt’s distinction between first-order impulses and second-order volitions explain why recommender systems do not reflect authentic human preference?', null, 6, '18', 'first vs second-order desires · revealed preference fallacy'),
        open('m4r3', 'What is the "privacy divide"? Give two concrete examples of how data protection is commodified as a luxury while the poor face mandatory surveillance.', null, 6, '19', 'privacy divide · structural coercion'),
        open('m4r4', 'Explain Albert Borgmann’s Device Paradigm. Distinguish a "thing" (focal practice) from a "device" (disembodied commodity) using the examples of cooking vs delivery apps.', null, 6, '20', 'Device Paradigm · focal practices vs commodities'),
        open('m4r5', 'How does Goodhart’s Law ("when a measure becomes a target, it ceases to be a good measure") explain why optimizing for engagement metrics leads to sensationalism?', null, 6, '18', 'Goodhart’s Law · proxy failure'),
        open('m4r6', 'What are second-order effects in technological adoption? Illustrate with the unintended social and labor consequences of 15-minute grocery delivery apps.', null, 6, '20', 'second-order effects · gig labor precarity'),
        open('m4r7', 'List eight high-level vocabulary items or collocations from Module 4 (e.g. epistemic deskilling, recursive feedback loop, panoptic asymmetry, focal practice) and write a single coherent paragraph about human autonomy.', null, 6, '17–20', 'productive technology vocabulary')
      ]
    },
    language: {
      lead: 'Interleaved grammar targets from Units 17–20. Choose or produce the accurate form based on time frame, focus, and formal cohesion.',
      items: [
        mc('m4l1', 'By 2035, automated systems ___ every sector of the knowledge economy.', ['will transform', 'will have transformed', 'will be transforming', 'will have been transformed'], 1, 'Future Perfect indicates a completed transformation before a future time boundary.', 'grammar', '17', 'Future Perfect'),
        mc('m4l2', 'Next year, millions of high school students ___ generative algorithms to compose introductory essays.', ['will be using', 'will have used', 'will use to', 'are used to using'], 0, 'Future Continuous expresses an ongoing activity in progress in the future.', 'grammar', '17', 'Future Continuous'),
        mc('m4l3', 'The continuous extraction of behavioral telemetry ___ by platforms to train predictive neural networks.', ['is utilized', 'utilizes', 'has utilized', 'utilizing'], 0, 'Passive verb agreeing with singular nominalised subject head (extraction).', 'grammar', '18', 'complex noun phrases'),
        mc('m4l4', 'The algorithm presents sensationalist content, ___ feeds back into the user model and reinforces future recommendations.', ['which in turn', 'thereby it', 'conversely that', 'insofar as'], 0, 'Which in turn connects multi-stage cybernetic feedback.', 'grammar', '18', 'cybernetic causal connectors'),
        mc('m4l5', '___ the government enacted strict data privacy laws a decade ago, personal telemetry would not be a commercial commodity today.', ['Had', 'Were', 'Should', 'If had'], 0, 'Inverted mixed conditional: Had + subject + participle (past condition / present result).', 'grammar', '19', 'conditional inversion'),
        mc('m4l6', '___ a commuter to refuse the mandatory facial recognition scan, they would be barred from public transit.', ['Had', 'Were', 'Should', 'Unless'], 1, 'Inverted second conditional: Were + subject + to-infinitive.', 'grammar', '19', 'conditional inversion'),
        mc('m4l7', 'Frictionless delivery saves forty minutes of cooking; ___, it eliminates an embodied focal practice.', ['by the same token', 'in contrast of', 'despite of', 'furthermore that'], 0, 'By the same token introduces a parallel consequence or truth.', 'grammar', '20', 'advanced discourse markers'),
        mc('m4l8', 'The carbon footprint of on-demand food delivery is significantly higher than ___ of home cooking.', ['that', 'those', 'it', 'one'], 0, 'Pro-form "that of" substitutes for singular uncountable noun (carbon footprint).', 'grammar', '20', 'substitution'),
        mc('m4l9', '___ data tracking optimizes urban transit, it provides a legitimate public benefit; beyond that point, it becomes invasive.', ['Insofar as', 'Notwithstanding that', 'Be that as it may', 'Regardless of'], 0, 'Insofar as defines the restricted scope within which an assertion holds true.', 'grammar', '19', 'restrictive markers'),
        mc('m4l10', 'Cooking from scratch is a meaning-rich focal practice, and maintaining an organic garden is equally ___.', ['so', 'such', 'one', 'do'], 0, 'Pro-form "so" substitutes for the preceding predicate adjective phrase.', 'grammar', '20', 'substitution'),
        tf('m4l11', '“Had we known about the surveillance, we would complain immediately” is grammatically standard English.', false, 'Inverted third conditional requires modal perfect in the main clause: "would have complained".', 'grammar', '19', 'conditional syntax'),
        produce('m4l12', 'Invert without using "if": <i>If platforms were to respect user autonomy, they would eliminate infinite scroll.</i>', ['Were platforms to respect user autonomy, they would eliminate infinite scroll.'], 'Inverted second conditional with Were + to-infinitive.', '19', 'conditional inversion'),
        produce('m4l13', 'Rewrite using substitution with "those of": <i>The privacy protections of wealthy citizens are stronger than the privacy protections of low-income workers.</i>', ['The privacy protections of wealthy citizens are stronger than those of low-income workers.'], 'Substitutes plural countable noun with "those of".', '20', 'pro-form substitution'),
        produce('m4l14', 'Combine into a single sentence using "By the time..., society will have been + -ing": <i>The year 2035 will arrive. Society will have adapted to AI for twenty years.</i>', ['By the time 2035 arrives, society will have been adapting to AI for twenty years.'], 'Future Perfect Continuous expresses duration leading up to a future point.', '17', 'Future Perfect Continuous')
      ]
    },
    steal: {
      lead: 'Deploy sophisticated technological, psychological, and sociological chunks from Units 17–20.',
      items: [
        mc('m4s1', 'Which formulation best describes the intellectual struggle through which understanding is discovered during writing?', ['the secular theology of modern capitalism', 'the friction of thought', 'the ratcheting irreversibility of convenience', 'the Device Paradigm of modern life'], 1, 'The friction of thought captures the necessary resistance of deep reasoning.', 'vocabulary', '17', 'cognitive chunk'),
        mc('m4s2', 'Which phrase captures the distinction between instinctual clicks and reflective human values?', ['first-order impulses versus second-order volitions', 'the privacy divide', 'panoptic asymmetry of power', 'the linguistic bell curve'], 0, 'Frankfurt’s first-order impulses vs second-order volitions explains algorithmic capture.', 'vocabulary', '18', 'philosophical distinction'),
        mc('m4s3', 'Which chunk describes how clicking "I agree" on terms of service is an illusion of free choice under infrastructural pressure?', ['the legal fiction of voluntary consent', 'mandatory biometric enclosure', 'external cognitive scaffolding', 'deliberate friction as a spiritual discipline'], 0, 'The legal fiction of voluntary consent unmasks coercive click-through contracts.', 'vocabulary', '19', 'legal critique'),
        mc('m4s4', 'Which phrase describes Albert Borgmann’s theory of how modern devices replace engaged craft with detached products?', ['the Great Gatsby Curve', 'the Device Paradigm of modern life', 'the doctrine of revealed preference', 'the architecture of the unspoken'], 1, 'The Device Paradigm contrasts focal practices with disembodied commodities.', 'vocabulary', '20', 'philosophy of technology'),
        mc('m4s5', 'Which formulation describes how instant app convenience is purchased through the brutal labor of couriers?', ['subsidized by the hyper-exploitative friction of gig labor', 'the spatial and social displacement of human sweat', 'an intellectual bicycle, not a crutch', 'priced out of basic human dignity'], 0, 'Subsidized by gig labor exposes the human underbelly of on-demand apps.', 'vocabulary', '20', 'investigative chunk'),
        produce('m4s6', 'Write one sentence using “an intellectual bicycle, not an intellectual crutch” about educational software.', ['Educational software should function as an intellectual bicycle that expands reasoning, not an intellectual crutch that induces cognitive atrophy.'], null, '17', 'pedagogical chunk'),
        produce('m4s7', 'Use “the recursive mirror of human desire” to critique personalized recommendation algorithms.', ['The feed is not a neutral window; it is the recursive mirror of human desire, amplifying our worst evolutionary impulses.'], null, '18', 'metaphorical chunk'),
        produce('m4s8', 'Write a sentence with “panoptic asymmetry of power” about digital surveillance brokers.', ['Democratic accountability collapses under the profound panoptic asymmetry of power between opaque data brokers and monitored citizens.'], null, '19', 'sociological chunk'),
        produce('m4s9', 'Use “focal practices versus disembodied commodities” to evaluate home cooking versus fast food apps.', ['We must distinguish between home cooking as an embodied focal practice and fast food delivery as a disembodied commodity.'], null, '20', 'Borgmannian critique'),
        produce('m4s10', 'Use “deliberate friction as a spiritual discipline” to conclude a personal reflection on screen time.', ['In an automated age of instant gratification, choosing to read long books represents deliberate friction as a spiritual discipline.'], null, '20', 'humanistic closing')
      ]
    },
    reading: {
      format: 'Critical interdisciplinary essay',
      title: 'The Cybernetic Enclosure: Cognition, Surveillance, and the Disappearance of Friction',
      standfirst: 'When algorithms automate thought, monetize attention, and eliminate daily resistance, human beings are transformed from autonomous creators into predictable behavioral commodities.',
      paras: [
        `For three centuries, the grand narrative of Western technological progress was framed around the expansion of human mastery. The steam engine, the electric dynamo, the telephone, and the automobile were celebrated as instruments that extended human bodily and communicative reach across geography. In the twenty-first century, however, a profound paradigm shift occurred: technology ceased to be merely an outward instrument of physical labor and turned inward, colonizing the cognitive, emotional, and behavioral architecture of human consciousness itself.` ,
        `This inward colonization operates through three interconnected vectors. The first is generative cognitive offloading. Large language models and predictive text generators do not simply assist in information retrieval; they substitute for the active semantic struggle through which understanding is forged. When a student or professional relies on automated agents to draft essays or synthesize research, they bypass the essential friction of thought. Over time, this uncritical delegation induces epistemic deskilling: the cognitive capacity for deep reading, sustained structural memory, and idiosyncratic original reasoning gradually atrophies, pulling public discourse toward the homogeneous center of the linguistic bell curve.` ,
        `The second vector is the cybernetic capture of human attention. Recommender systems operated by digital platforms do not passively mirror authentic human preferences under the economic doctrine of revealed preference. Rather, they extract granular behavioral telemetry to identify evolutionary cognitive tripwires—outrage, threat detection, and tribal anxiety—locking users in recursive feedback loops. By optimizing exclusively for engagement proxies, algorithms monetize first-order reflexive impulses while systematically subverting second-order reflective volitions. The citizen is trapped inside a personalized reality tunnel engineered for commercial extraction.` ,
        `The third vector is the totalizing ideology of frictionless convenience. As philosopher Albert Borgmann observed in his Device Paradigm, modern consumer technologies systematically replace embodied "focal practices"—cooking, manual navigation, physical craft, and face-to-face negotiation—with disembodied commodities delivered at the click of a button. In doing so, convenience produces an acute fragility of character, making delay feel intolerable while concealing the hyper-exploitative friction imposed upon an invisible gig-economy underclass. Furthermore, privacy is restructured from a universal constitutional right into an expensive luxury good, subjecting lower-income populations to mandatory biometric surveillance as the price of urban survival.` ,
        `What unites these three vectors is the systematic elimination of human friction. Yet friction—the resistance of physical materials, the struggle with recalcitrant syntax, the awkwardness of interpersonal dialogue, and the patience required for creative mastery—is the precise condition through which human character and agency are formed. When all friction is eliminated, we do not become free; we become frictionless components in a cybernetic apparatus designed to maximize corporate predictability.` ,
        `To reclaim human flourishing in an automated world requires practicing deliberate resistance. We must establish clear boundaries between tools that act as intellectual bicycles to expand human capability and systems that act as crutches to replace human thought. We must mandate algorithmic transparency, prohibit predatory behavioral monetization, and consciously cultivate focal practices that restore sensory depth, bodily presence, and authentic autonomy to our lives.`
      ],
      items: [
        mc('m4rd1', 'What is the fundamental paradigm shift in technology described in paragraph 1?', ['Technology became cheaper to manufacture in Asia.', 'Technology shifted from being an outward physical tool to an inward force colonizing human cognitive and emotional consciousness.', 'Computers replaced books in all libraries.', 'Steam engines were re-introduced in transportation.'], 1, 'Paragraph 1 explains the shift from outward physical tools to inward cognitive colonization.', 'reading', '17–20', 'main thesis'),
        mc('m4rd2', 'Why does generative cognitive offloading lead to intellectual homogenization according to paragraph 2?', ['Because all computers are made of the same plastic.', 'Because language models predict statistically probable token sequences, pulling prose toward the generic center of the bell curve and smoothing away idiosyncratic thought.', 'Because students refuse to learn foreign languages.', 'Because professors only grade short essays.'], 1, 'Paragraph 2 explains how statistical token prediction homogenizes prose toward the center of the bell curve.', 'reading', '17', 'cognitive inference'),
        tf('m4rd3', 'Paragraph 3 argues that engagement algorithms accurately satisfy second-order reflective volitions.', false, 'Paragraph 3 explicitly states that algorithms monetize first-order impulses while subverting second-order volitions.', 'reading', '18', 'detail'),
        mc('m4rd4', 'How does the Device Paradigm relate to the "privacy divide" in paragraph 4?', ['Both are mathematical equations in quantum physics.', 'Both reflect the transformation of vital human practices and rights into disembodied, commercialized commodities accessible primarily to the wealthy.', 'Both were invented by Albert Borgmann in 1890.', 'Neither has any relevance to modern technology.'], 1, 'Paragraph 4 links the Device Paradigm and the privacy divide as forms of commodification that displace human agency.', 'reading', '19/20', 'theoretical synthesis'),
        open('m4rd5', 'In paragraph 5, why does the author argue that "friction" is essential rather than a defect to be eliminated?', ['Friction (physical resistance, struggle with syntax, patience for craft) is the precise condition through which human character, skill, resilience, and agency are forged.'], 4, '17/20', 'philosophical explanation'),
        open('m4rd6', 'Deconstruct the author’s concluding distinction: "tools that act as intellectual bicycles versus systems that act as crutches."', ['Bicycles: amplify and expand human capability while requiring human energy and agency; Crutches: substitute for human capacity, leading to cognitive dependency and atrophy.'], 4, '17', 'metaphor deconstruction'),
        mc('m4rd7', 'Which word in paragraph 4 is closest in meaning to "vulnerability to breakdown or emotional weakness"?', ['precarity', 'fragility', 'asymmetry', 'homogenization'], 1, 'Fragility captures psychological vulnerability produced by the absence of friction.', 'reading', '20', 'vocabulary in context'),
        produce('m4rd8', 'Complete the author’s warning in paragraph 5: "When all friction is eliminated, we do not become free; we become ______ in a ______ apparatus designed to maximize corporate predictability."', ['frictionless components', 'cybernetic'], 'Recalls the central systemic warning.', '17–20', 'textual synthesis')
      ]
    },
    reasoning: {
      lead: 'Integrate the critical frameworks of Module 4: the substitution fallacy, Goodhart’s Law, proxy failures, first vs second-order desires, risk asymmetry, and second-order systemic effects.',
      defs: [
        ['Substitution Fallacy', 'Assuming that automating a task preserves the internal cognitive or cultural value of doing it by hand.'],
        ['Goodhart’s Law', 'When a measure becomes a target for optimization, it ceases to be a good measure.'],
        ['Second-Order Effect', 'The delayed, indirect systemic consequence produced as society adapts to a primary technological change.']
      ],
      items: [
        {
          id: 'm4t1', type: 'label', q: 'Classify each technological observation from Module 4.',
          labels: ['Substitution Fallacy', 'Goodhart’s Law', 'Chilling Effect', 'Second-Order Effect'],
          rows: [
            { text: '“Since AI can generate an essay in seconds, teaching students to write is as obsolete as teaching them to ride horses.”', answer: 'Substitution Fallacy', explain: 'Confuses producing text with the cognitive cultivation of learning how to think.' },
            { text: '“Optimizing YouTube exclusively for watch time caused the algorithm to promote conspiracy theories and outrage.”', answer: 'Goodhart’s Law', explain: 'Optimizing for a proxy metric (dwell time) corrupted the underlying quality.' },
            { text: '“Attendance at civil rights protests dropped after police deployed facial recognition turnstiles.”', answer: 'Chilling Effect', explain: 'Surveillance discourages citizens from exercising lawful democratic assembly.' },
            { text: '“Food delivery apps saved 40 minutes of cooking, but created urban traffic congestion and precarious courier labor.”', answer: 'Second-Order Effect', explain: 'An indirect systemic consequence following primary adoption.' }
          ]
        },
        mc('m4t2', 'A platform CEO claims: "Our data proves that users want more extreme political content because they stay on the screen 50% longer." What logical flaw explains why this claim is invalid?', ['The CEO is confusing involuntary threat/outrage reflexes with genuine second-order consumer preference.', 'Computers cannot calculate percentages accurately.', 'The CEO forgot to include mobile users.', 'Political videos are always educational.'], 0, 'It commits a revealed preference fallacy by confusing first-order reflexive freezing with authentic volition.', 'reasoning', '18', 'desire deconstruction'),
        open('m4t3', 'Apply Chesterton’s Fence to the "friction" of manual navigation using paper maps: what cognitive and social capacities were embedded in that friction before GPS eliminated it?', ['Spatial memory, mental mapping, orientation, observational awareness of surroundings, and social interaction when asking locals for directions.'], 5, '20', 'Chesterton’s fence analysis'),
        open('m4t4', 'Steelman the argument for why an aspiring writer SHOULD use an LLM during the creative process, without succumbing to epistemic deskilling.', ['Using the AI as a dialectical sparring partner: generating alternative plot branches, finding clichéd phrasing to avoid, stress-testing dialogue, and exploring historical research.'], 5, '17', 'steelmanning AI collaboration'),
        open('m4t5', 'Explain why privacy is a "collective public good" rather than merely an individual private consumer preference.', ['Surveillance of one person exposes the network data of friends/colleagues, and widespread tracking chills collective political organizing and labor dissent across society.'], 5, '19', 'public goods analysis'),
        open('m4t6', 'How does Albert Borgmann’s Device Paradigm explain why streaming music directly into earbuds feels existentially different from listening to a vinyl record with friends?', ['Streaming is a disembodied commodity requiring zero bodily engagement or ritual; vinyl is an embodied focal practice engaging tactile presence, album craft, and shared attention.'], 5, '20', 'Device Paradigm critique')
      ]
    },
    editing: {
      lead: 'Elevate technical and philosophical prose. Apply precise future forms, substitution, and discourse transitions.',
      items: [
        produce('m4e1', 'Repair the grammar and stylistic awkwardness: <i>By 2030, society will adapt to AI, and if we had regulated it earlier, our privacy was not a luxury today.</i>', ['By 2030, society will have adapted to AI, and had we regulated it earlier, our privacy would not be a luxury today.'], 'Corrects Future Perfect (will have adapted) and applies inverted mixed conditional (had we regulated..., would not be...).', '17/19', 'future aspect and conditional inversion'),
        produce('m4e2', 'Upgrade the repetitive phrasing using pro-form substitution: <i>The cognitive demands of writing by hand are deeper than the cognitive demands of editing machine text, and students who understand this understand something vital.</i>', ['The cognitive demands of writing by hand are substantially deeper than those of editing machine text, and students who do so understand something vital.'], 'Substitutes noun phrase with "those of" and predicate with "do so".', '20', 'cohesion and substitution')
      ]
    },
    synthesis: {
      id: 'm4w1', kind: 'Module synthesis', title: 'The Cost of the Frictionless: Cognition, Algorithms, and Autonomy',
      min: 600, max: 900, main: true,
      prompt: 'Synthesize the central thesis of Module 4: How do generative AI, recommender algorithms, surveillance capitalism, and the ideology of convenience jointly transform human agency and cognition? Write a comprehensive, well-hedged analytical essay defending the necessity of deliberate friction in an automated society.',
      guide: [
        'Introduction: define the technological trajectory from physical tool extension to inward cognitive colonization, and state your thesis.',
        'Body 1 (Cognitive Offloading & AI): analyze the friction of thought, epistemic deskilling, and the limits of statistical token prediction (U17).',
        'Body 2 (Algorithmic Capture & Cybernetics): evaluate recommender telemetry, first vs second-order desires, and Goodhart’s Law (U18).',
        'Body 3 (Surveillance & Convenience): examine the privacy divide, the Device Paradigm, and the hidden labor subsidizing frictionless apps (U19, U20).',
        'Conclusion: project the future (using Future Perfect forms) and propose a framework for human-centric agency based on deliberate friction.'
      ]
    },
    timed: {
      id: 'm4w2', kind: 'Timed writing', title: 'The Machine as Bicycle or Crutch',
      min: 300, max: 450, timed: true,
      prompt: 'Respond concisely to the claim: “Convenience and AI automation only make humans smarter and freer; there are no legitimate downsides.” Deconstruct this claim using at least three core concepts from Module 4.',
      guide: [
        'Contrast cognitive amplification (bicycle) with deskilling (crutch).',
        'Incorporate the Device Paradigm, revealed preference fallacy, or the privacy divide.',
        'Conclude with a calibrated standard for authentic technological empowerment.'
      ]
    },
    teach: {
      lead: 'Explain one of these key grammatical and structural mechanisms clearly to another learner.',
      points: [
        { id: 'futperf', label: 'Future Perfect (will have completed) vs Future Continuous (will be using)', unit: '17', ccq: 'good', hint: 'Check time frame: completed before a deadline vs in progress across a period.' },
        { id: 'compnoun', label: 'Complex noun phrases as grammatical subjects', unit: '18', ccq: 'good', hint: 'Check subject-verb agreement: Identify the true head noun among modifiers.' },
        { id: 'condinv', label: 'Inverted conditionals: Had we known × Were they to act × Should you see', unit: '19', ccq: 'good', hint: 'Check elimination of "if" and correct auxiliary inversion.' },
        { id: 'mixcond', label: 'Mixed conditionals: unfulfilled past condition leading to present state', unit: '19', ccq: 'good', hint: 'Check time bridge: If past had happened, present would be different.' },
        { id: 'ellipsis', label: 'Ellipsis and nominal substitution (that of / those of / such)', unit: '20', ccq: 'good', hint: 'Check pro-form: singular (that of) vs plural (those of).' },
        { id: 'doso', label: 'Verbal substitution with "do so"', unit: '20', ccq: 'good', hint: 'Check predicate replacement: do so replaces an action verb phrase.' },
        { id: 'bythesametoken', label: 'Discourse markers: by the same token × conversely × to put it another way', unit: '20', ccq: 'good', hint: 'Check logic: parallel consequence (by the same token) vs opposing dynamic (conversely).' },
        { id: 'restrictive', label: 'Restrictive markers: insofar as × notwithstanding', unit: '19', ccq: 'good', hint: 'Check scope: Insofar as defines the precise boundary of truth.' }
      ]
    },
    areas: {
      grammar: ['Unit 17 · Future Perfect, Future Continuous and cognitive verbs', 'Unit 18 · complex noun phrases and cybernetic causal markers', 'Unit 19 · conditional inversion and mixed conditionals', 'Unit 20 · ellipsis, substitution and advanced discourse markers'],
      vocabulary: ['Units 17–20 · collocations, chunks and sociotechnical concepts'],
      reading: ['Units 17–20 · inference, cognitive analysis, cybernetic modeling and philosophical critique'],
      reasoning: ['Units 17–20 · substitution fallacy, Goodhart’s Law, proxy failure, first/second-order desires, risk asymmetry, and second-order effects']
    },
    listening: [
      {
        id: 'r4l1', title: 'The Algorithmic Cage', format: 'Interdisciplinary symposium debate',
        file: '/audio/en/reviews/r04-listening-01.mp3', duration: 115, level: 'C1',
        audioReady: false,
        voice: 'Two adult scholars (Dr. Maya Lin and Professor Julian Stern); sharp, analytical, North American and British English',
        passes: ['First listen · track how the speakers connect algorithmic capture, epistemic deskilling, and the loss of privacy', 'Second listen · note Future Perfect aspects and inverted conditionals', 'Third listen · evaluate the proposed solutions for cognitive liberation'],
        transcript: `Dr. Lin: Julian, when we review the four technologies analyzed in this module—large language models, recommender engines, biometric surveillance, and on-demand delivery apps—they are usually treated as separate industries. But cybernetically, they represent a unified architecture of capture.\n\nProf. Stern: Exactly, Maya. Generative AI offloads the active formulation of thought; recommender systems monetize our involuntary evolutionary reflexes; surveillance infrastructure prices the poor out of privacy; and convenience platforms eliminate the physical friction of focal practices. In each case, human agency is traded for computational predictability.\n\nDr. Lin: And look at where this trajectory leads. By twenty thirty-five, an entire generation will have grown up having every essay drafted by an LLM, every cultural preference nudged by a feed, every movement tracked by biometric turnstiles, and every meal delivered by a gig courier. Had we recognized thirty years ago that friction is the prerequisite for human competence and character, we would never have permitted convenience to become the unquestioned secular gospel of modern civilization.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Synthesizing module themes', q: 'What unified architecture connects all four technologies according to the speakers?', options: ['They all run on lithium batteries.', 'They systematically replace human cognitive friction, agency, and privacy with computational predictability and commercial extraction.', 'They are all manufactured by the same company in Japan.', 'They have made human writing completely unnecessary.'], answer: 1, explain: 'The speakers show that AI, algorithms, surveillance, and convenience combine to erode human agency.' },
          { id: 'q2', type: 'open', tag: 'Grammar and time frame', q: 'Analyze Dr. Lin’s use of the Future Perfect ("will have grown up having every essay drafted...") and the inverted mixed conditional ("Had we recognized... we would never have permitted...").', rubric: ['Future Perfect: projects a completed milestone and cumulative habit looking back from 2035', 'Inverted mixed conditional: links an unfulfilled past realization (30 years ago) with a counterfactual present reality'] }
        ]
      },
      {
        id: 'r4l2', title: 'A Manifesto for Deliberate Friction', format: 'Concluding audio essay',
        file: '/audio/en/reviews/r04-listening-02.mp3', duration: 105, level: 'C1',
        audioReady: false,
        voice: 'Solo narrator (Cultural Philosopher); resonant, contemplative, measured International English',
        passes: ['First listen · understand why the speaker calls for "deliberate friction" in daily life', 'Second listen · note substitution and discourse markers', 'Third listen · reflect on what makes human life intrinsically meaningful'],
        transcript: `We live in a civilization that worships the effortless. We have engineered our machines to eliminate the hesitation of waiting, the awkwardness of speaking to strangers, the sweat of cooking, and the mental agony of writing on a blank page. And yet, surrounded by this magical ease, we find ourselves increasingly anxious, easily distracted, and existentially exhausted.\n\nThe paradox is easily explained: human meaning does not reside in the effortless consumption of finished products. It resides in the struggle of craft. When you cook a meal with your hands, you engage with nature; when you wrestle with a difficult thought in writing, you discover who you are; when you walk through a city without a screen, you encounter the unexpected texture of the world.\n\nTo choose friction in an automated age is not an act of technological denial. It is an act of spiritual and political defiance. It is the conscious decision to declare that our time, our attention, and our minds are not raw materials to be extracted by algorithms, but the sacred sanctuary of human life.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core thesis', q: 'Why does the speaker argue that effortless convenience produces existential exhaustion?', options: ['Because smartphones are too heavy to hold.', 'Because human meaning and self-discovery reside in the struggle of craft and physical presence, not in passive, frictionless consumption.', 'Because cooking burns too many calories.', 'Because computers will stop working in twenty years.'], answer: 1, explain: 'The speaker explains that meaning is generated through craft, presence, and friction rather than effortless consumption.' },
          { id: 'q2', type: 'open', tag: 'Humanistic reflection', q: 'How does the speaker redefine choosing "deliberate friction" in an automated age?', rubric: ['Not as technological denial or backward luddism', 'As an act of spiritual and political defiance to protect human attention, mind, and agency from algorithmic extraction'] }
        ]
      }
    ],
    speaking: {
      id: 'm4s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Synthesize the core themes of Module 4 (Technology & Modern Life): In 75–135 seconds, evaluate the impact of digital technology on human agency. Connect at least three dimensions: cognitive offloading (AI & epistemic deskilling), algorithmic capture (recommender loops & revealed preference), surveillance capitalism (privacy divide), or the Device Paradigm (the cost of convenience). Employ at least one Future Perfect form (will have + participle), one inverted conditional (Had / Were), and pro-form substitution (that of / those of / do so).',
      prepare: 'Keywords only: cognitive offloading vs friction of thought · recursive feedback loops · privacy divide · Device Paradigm & focal practices · Future Perfect · conditional inversion. Do not script.',
      grammar: 'Future Perfect (will have transformed); inverted conditionals (Were we to, Had society); substitution (those of, do so); advanced discourse markers (by the same token, conversely)',
      targets: ['the friction of thought', 'epistemic deskilling and cognitive atrophy', 'the recursive mirror of human desire', 'the legal fiction of voluntary consent', 'focal practices versus disembodied commodities'],
      rubric: [
        'Synthesizes multiple Module 4 themes (AI, algorithms, privacy, convenience) with intellectual rigor',
        'Accurately employs Future Perfect, conditional inversion, and pro-form substitution',
        'Demonstrates deep understanding of sociotechnical and philosophical mechanisms',
        'Delivers an articulate, highly engaging C1 spoken production'
      ]
    }
  };

  /* ==========================================================================
     MODULE 5 REVIEW · PHOTOGRAPHY, ART & THE ACT OF LOOKING (Units 21–24)
     ========================================================================== */
  K.reviews['5'] = {
    id: '5',
    title: 'Photography, Art & the Act of Looking',
    units: ['21', '22', '23', '24'],
    question: 'Can the act of looking ever be innocent, neutral, or free from ethical responsibility?',
    grammarTargets: 'Reduced relative clauses · participle clauses · advanced passive & distancing · cleft sentences · pseudo-clefts · sentence rhythm · advanced concession · diplomatic language',
    reasoningTargets: 'Selection and omission · the frame problem · competing ethical principles · intrinsic resonance vs institutional canonization · universal transparency vs cultural sovereignty · extractive documentation vs visual stewardship',
    retrieve: {
      lead: 'Retrieve and connect the core concepts and arguments developed across Units 21 through 24.',
      items: [
        { id: 'r5r1', unit: '21', q: 'Why is the claim that "the camera never lies" a fundamental epistemological fallacy?', guide: 'Explain indexicality vs narrative truth: while a sensor records physical light, framing, angle, timing, and omission constitute an active rhetorical argument.' },
        { id: 'r5r2', unit: '21', q: 'What is the "frame problem" in visual analysis?', guide: 'The cognitive challenge of recognizing that what is excluded from the frame often alters or dictates the meaning of what is included.' },
        { id: 'r5r3', unit: '22', q: 'How does Susan Sontag define the moral hazard of "compassion fatigue" and "moral voyeurism"?', guide: 'Chronic exposure to uncontextualized suffering numbs the moral imagination, turning trauma into passive aesthetic spectacle rather than mobilizing structural action.' },
        { id: 'r5r4', unit: '22', q: 'What power asymmetry defines conventional photojournalism in vulnerable communities?', guide: 'An affluent, mobile outsider captures trauma for external prestige/profit, leaving the vulnerable subject in squalor without agency or compensation.' },
        { id: 'r5r5', unit: '23', q: 'Distinguish between Roland Barthes\'s concepts of the *studium* and the *punctum*.', guide: 'Studium is polite, culturally mediated historical/informational interest; punctum is the unintended, piercing detail that creates an intense personal emotional wound.' },
        { id: 'r5r6', unit: '23', q: 'Why does Barthes describe every photograph as a *memento mori* characterized by "ça a été" (this has been)?', guide: 'A photograph freezes a fugitive instant of living existence that has irrevocably vanished into the past, confirming the inevitability of mortality.' },
        { id: 'r5r7', unit: '24', q: 'What is Édouard Glissant\'s "right to opacity," and how does it challenge the Western secular gaze?', guide: 'The right of non-dominant cultures to keep sacred and communal practices private and unmeasured by outsider scrutiny, rejecting the entitlement of total visual transparency.' },
        { id: 'r5r8', unit: '24', q: 'What distinguishes "extractive ethnography" from "collaborative visual stewardship"?', guide: 'Extractive documentation takes images for outside gain without consent; visual stewardship involves co-authorship, respect for sacred taboos, veto power, and reciprocity.' }
      ]
    },
    language: {
      lead: 'Transform, combine, and refine these sentences using the advanced grammatical structures from Module 5.',
      items: [
        { id: 'r5l-g1', unit: '21', label: 'Reduced relative & participle clause', orig: 'The photograph was taken from a low angle, and it made the political leader seem menacing.', task: 'Combine into a single sentence using an introductory participle clause.', target: 'Taken from a low angle, the photograph made the political leader appear menacing and authoritarian.' },
        { id: 'r5l-g2', unit: '21', label: 'Present participle clause of result', orig: 'The newspaper cropped out the surrounding peaceful crowd, so it created the illusion of a violent riot.', task: 'Combine using a comma followed by a present participle clause of result (thereby creating...).', target: 'The newspaper cropped out the surrounding peaceful crowd, thereby creating the false impression of an unprovoked riot.' },
        { id: 'r5l-g3', unit: '22', label: 'Advanced passive with impersonal distancing', orig: 'Critics say that war photographers exploit victims for prizes.', task: 'Rewrite using an impersonal passive reporting structure (It is widely contended that... / War photographers are frequently alleged to...).', target: 'War photographers are frequently alleged to exploit vulnerable victims for international prizes and commercial acclaim.' },
        { id: 'r5l-g4', unit: '22', label: 'Modal passive of obligation', orig: 'We must not treat human suffering as mere entertainment.', task: 'Rewrite in the passive voice using a modal verb.', target: 'Human suffering must not be treated as a mere aesthetic spectacle or entertainment commodity.' },
        { id: 'r5l-g5', unit: '23', label: 'It-cleft for emphatic focus', orig: 'The subtle expression of exhaustion makes the portrait unforgettable.', task: 'Rewrite as an It-cleft focusing on the expression of exhaustion.', target: 'It is the subtle expression of exhaustion that renders the portrait truly unforgettable.' },
        { id: 'r5l-g6', unit: '23', label: 'Wh-cleft / Pseudo-cleft', orig: 'The accidental detail in the corner pierces the viewer’s emotional defenses.', task: 'Rewrite as a Wh-cleft starting with "What".', target: 'What pierces the viewer’s emotional defenses is the accidental detail tucked into the corner of the frame.' },
        { id: 'r5l-g7', unit: '23', label: 'Balanced tripartite rhythm (tricolon)', orig: 'The image shows sadness, dignity, and fear.', task: 'Expand into a balanced rhythmic sentence with parallel noun phrases.', target: 'The photograph commands our attention through the gravity of its sorrow, the quiet resilience of its dignity, and the haunting immediacy of its terror.' },
        { id: 'r5l-g8', unit: '24', label: 'Complex concession with Notwithstanding', orig: 'Even though photojournalism can teach people about other cultures, photographers cannot violate sacred spaces.', task: 'Rewrite using "Notwithstanding the capacity of..." and formal diplomatic register.', target: 'Notwithstanding the proven capacity of photojournalism to foster intercultural empathy, photographers possess no automatic right to violate guarded sacred domains.' },
        { id: 'r5l-g9', unit: '24', label: 'Concessive formula: Granted that... it does not follow that...', orig: 'It is true that cameras record real light, but that does not mean a photo is neutral.', task: 'Rewrite using "Granted that... it does not follow that...".', target: 'Granted that cameras record the physical reflection of light, it does not follow that the resulting photograph constitutes an objective or neutral truth.' },
        { id: 'r5l-g10', unit: '24', label: 'Epistemic hedging & diplomatic modulation', orig: 'Western tourists always ruin native rituals because they are arrogant.', task: 'Rewrite using calibrated academic register and epistemic verbs (tends to, risks reproducing, frequently manifests as).', target: 'Uninitiated travelers frequently manifest a posture of entitled curiosity, which risks reproducing paternalistic asymmetries and compromising the integrity of sacred rites.' },
        { id: 'r5l-g11', unit: '21', label: 'Compound semiotic noun phrases', orig: 'The photo shows the physical trace of light and also makes a narrative claim.', task: 'Synthesize using "indexical fidelity" and "narrative rhetoric".', target: 'The image successfully marries indexical fidelity with deliberate narrative rhetoric.' },
        { id: 'r5l-g12', unit: '24', label: 'Fronted prepositional phrase for stylistic inversion', orig: 'The sacred knowledge of the community lies beyond the reach of the camera.', task: 'Rewrite using a fronted prepositional phrase and subject-verb inversion.', target: 'Beyond the legitimate reach of the secular camera lies the guarded sacred knowledge of the community.' }
      ]
    },
    steal: {
      lead: 'The ten essential C1 phrase chunks from Module 5 (Photography, Art & the Act of Looking).',
      items: [
        { id: 'r5s1', chunk: 'the fallacy of the innocent eye', meaning: 'The mistaken belief that human observation or cameras can view reality without interpretive bias.', unit: '21', tag: 'Visual epistemology' },
        { id: 'r5s2', chunk: 'indexical fidelity versus narrative truth', meaning: 'Distinguishing the physical recording of light from the truthfulness of the story constructed by the frame.', unit: '21', tag: 'Semiotic analysis' },
        { id: 'r5s3', chunk: 'the radical act of selection and omission', meaning: 'The deliberate choice of what to include in the frame and what to banish to the margins.', unit: '21', tag: 'Framing critique' },
        { id: 'r5s4', chunk: 'the aestheticization of human suffering', meaning: 'Transforming real pain, trauma, or poverty into beautiful visual commodities for detached spectators.', unit: '22', tag: 'Ethical critique' },
        { id: 'r5s5', chunk: 'a relational encounter between unequal actors', meaning: 'Viewing portraiture and documentary work as a power dynamic between privileged observers and vulnerable subjects.', unit: '22', tag: 'Sociological ethics' },
        { id: 'r5s6', chunk: 'an empirical anchor against historical denialism', meaning: 'Photographic evidence serving as undeniable proof of real atrocities and state crimes.', unit: '22', tag: 'Historical documentation' },
        { id: 'r5s7', chunk: 'an indelible psychological monument', meaning: 'An image that remains permanently etched into human memory and collective consciousness.', unit: '23', tag: 'Visual memory' },
        { id: 'r5s8', chunk: 'a melancholic memento mori', meaning: 'A poignant reminder of the transience of life and the inevitability of death.', unit: '23', tag: 'Philosophical aesthetics' },
        { id: 'r5s9', chunk: 'the secular gaze', meaning: 'The entitled assumption that all reality is material, public, and open to unrestricted visual consumption.', unit: '24', tag: 'Cultural critique' },
        { id: 'r5s10', chunk: 'collaborative visual stewardship', meaning: 'A partnership model where photographers and communities co-create and govern photographic representation.', unit: '24', tag: 'Ethical methodology' }
      ]
    },
    reading: {
      format: 'Interdisciplinary synthesis essay',
      title: 'The Ethics of the Gaze: From the Decisive Moment to the Sovereign Frame',
      standfirst: 'Across visual epistemology, war reporting, cognitive aesthetics, and anthropological documentation, the camera is never a neutral mirror—it is an instrument of power, memory, and moral choice.',
      paras: [
        'For more than a century, the cultural mythology of photography rested upon the doctrine of indexical innocence: the comforting belief that because a camera mechanically records the physical bounce of photons onto a chemical emulsion or digital sensor, the resulting print provides an unmediated window onto objective reality. Henri Cartier-Bresson famously celebrated "the decisive moment"—that fleeting millisecond where visual geometry, human action, and emotional truth coalesce into transcendent harmony. In this classical view, the photographer is a humble, neutral witness whose primary duty is to disappear, allowing reality to speak directly to the viewer.',
        'Yet this romantic ideal collapses the moment we subject the visual frame to rigorous philosophical scrutiny. As visual epistemologists and cultural theorists have demonstrated, every photograph involves a radical act of selection and omission. The camera does not record the world; it slices an arbitrary rectangle out of an infinite, chaotic continuum. By choosing what to include, what to banish to the margins, which focal length to deploy, and precisely when to release the shutter, the photographer executes a subjective rhetorical argument. An image may possess absolute indexical fidelity while constructing a profound narrative deception.',
        'When the lens turns toward human suffering, this epistemological complexity escalates into an urgent moral crisis. Photojournalism has long defended its incursions into war zones, famine camps, and crime scenes under the noble banner of bearing witness. And indeed, forensic images of liberated concentration camps, state-sponsored massacres, and police brutality have served as an indispensable empirical anchor against historical denialism. Yet, as Susan Sontag warned in *Regarding the Pain of Others*, the consumption of graphic trauma carries grave ethical hazards. Stripped of political context and structural analysis, photographs of distant agony risk inducing moral voyeurism, where viewers consume pain as aesthetic spectacle or emotional catharsis, while numbing the moral imagination through chronic compassion fatigue.',
        'This ethical tension is further deepened by the mysterious mechanics of visual memory. Roland Barthes recognized that what makes an image permanently haunt human consciousness is rarely its calculated political message (the *studium*), but rather the *punctum*—an unintended, unscripted detail that pierces the spectator\'s defenses and establishes an unmediated emotional rupture. Whether through facial ambiguity that traps the brain in an interpretive loop or through its ontological status as a melancholic *memento mori*, the enduring image derives its power from its refusal to be tamed by language or propaganda. However, we cannot ignore the sociological machinery of curation: institutional power, media gatekeepers, and textbook publishers decide which resonant images are canonized into collective historical memory.',
        'Finally, when documentary photography encounters sacred traditions and traditional communities, it confronts the ultimate limit of the secular gaze. The Enlightenment assumption that all reality belongs rightfully to the universal archive of human sight frequently degenerates into extractive ethnography—treating sacred rituals as exotic commodities for outsider consumption. In response, postcolonial philosophy and indigenous movements have asserted the "right to opacity" and visual sovereignty. Ethical photography at the threshold of the sacred demands epistemic humility: recognizing that the camera holds no automatic license of entry, and that the most profound act of artistic respect is sometimes the conscious decision to lower the lens and submit to collaborative visual stewardship.',
        'Ultimately, to master the art of looking is to realize that sight is never innocent. Every glance through a viewfinder, and every contemplation of a published print, is an active ethical encounter. We must learn to cross-examine the visual frame, interrogate the power asymmetries behind the lens, and honor the delicate boundary between the necessary light of public truth and the reverent shadows of human dignity.'
      ],
      items: [
        { id: 'r5q1', type: 'mc', tag: 'Synthesis of main thesis', q: 'What central realization unifies the four units of Module 5?', options: ['Digital cameras have completely replaced traditional film cameras.', 'Looking through a lens or at a photograph is never neutral or innocent; it is an active rhetorical, psychological, and ethical encounter involving selection, power, memory, and cultural sovereignty.', 'War photography should be completely outlawed under international law.', 'Only professional museum curators are qualified to look at art.'], answer: 1, explain: 'The synthesis demonstrates that photography is fundamentally rhetorical, ethical, and relational across all four units.' },
        { id: 'r5q2', type: 'quote', tag: 'Epistemology and framing', q: 'Find the sentence explaining how a photograph can be technically accurate while being narratively untruthful.', find: 'An image may possess absolute indexical fidelity while constructing a profound narrative deception.', quote: 'An image may possess absolute indexical fidelity while constructing a profound narrative deception.', explain: 'This highlights the distinction between physical trace (indexicality) and subjective framing (narrative truth).' },
        { id: 'r5q3', type: 'mc', tag: 'Sontag’s critique of witnessing', q: 'According to the text, what moral danger arises when graphic images of suffering are consumed without political context?', options: ['The photographs fade rapidly when exposed to sunlight.', 'They risk inducing moral voyeurism, aestheticized consumption of trauma, and compassion fatigue rather than structural solidarity.', 'Viewers immediately forget the language spoken in the country.', 'Newspapers go bankrupt due to printing costs.'], answer: 1, explain: 'Sontag warned that uncontextualized suffering becomes emotional entertainment (voyeurism) and causes desensitization (fatigue).' },
        { id: 'r5q4', type: 'mc', tag: 'Barthesian punctum', q: 'How does the essay explain why certain photographs achieve lasting psychological endurance?', options: ['Through extremely bright fluorescent colors.', 'Through the punctum—an unintended, piercing detail—combined with narrative ambiguity and its status as a melancholic memento mori.', 'Through government mandates requiring citizens to memorize specific photos.', 'Through the inclusion of extensive written captions.'], answer: 1, explain: 'Barthes’s punctum, cognitive ambiguity, and temporal transience combine to create indelible visual resonance.' },
        { id: 'r5q5', type: 'mc', tag: 'The sacred and visual stewardship', q: 'Why does the text argue that lowering the lens is sometimes the highest act of artistic respect?', options: ['Because cameras run out of battery power quickly in remote areas.', 'Because it subordinates entitled outsider curiosity to communal sovereignty, sacred taboos, and the human right to opacity.', 'Because blurry photos are rejected by photo agencies.', 'Because color film was not available until the late 20th century.'], answer: 1, explain: 'Restraint affirms that human dignity and sacred boundaries transcend aesthetic extraction.' },
        { id: 'r5q6', type: 'open', tag: 'Grammar in context · Clefts and Concession', q: 'Analyze how the author uses cleft structures ("It is the punctum that...") and concessive framing ("Notwithstanding...", "Granted that...") to build intellectual balance in the essay.', rubric: ['Cleft sentences highlight precise conceptual distinctions (punctum over studium, subjective argument over passive reflection)', 'Concessive clauses balance opposing truths (forensic value of war photography vs. risk of voyeurism; intercultural empathy vs. sacred sovereignty)'] },
        { id: 'r5q7', type: 'open', tag: 'Reasoning · The Frame Problem', q: 'Explain how the "Frame Problem" applies simultaneously to photojournalism (Unit 21), trauma reporting (Unit 22), and sacred rites (Unit 24).', rubric: ['Unit 21: Omission of surrounding physical context changes the factual meaning of an event', 'Unit 22: Omission of political/economic causes reduces systemic injustice to isolated victimhood', 'Unit 24: Omission of spiritual initiation protocols converts living sacred rites into profane commodities'] },
        { id: 'r5q8', type: 'open', tag: 'Synthesis · Visual Literacy', q: 'Formulate a comprehensive definition of "critical visual literacy" based on the synthesis essay.', rubric: ['Ability to deconstruct the mechanics of selection, angle, lighting, and omission', 'Awareness of power dynamics between photographer, subject, and spectator', 'Recognition of the limits of the secular gaze and respect for cultural sovereignty and sacred opacity'] }
      ]
    },
    reasoning: {
      lead: 'Deconstruct these complex scenarios using the visual epistemology and ethical models from Module 5.',
      defs: [
        ['Indexicality vs. Framing', 'The physical veracity of light on a sensor does not guarantee the truthfulness of the narrative constructed by the frame.'],
        ['Moral Voyeurism vs. Bearing Witness', 'Consuming trauma as emotional titillation vs. documenting injustice to mobilize structural accountability and historical memory.'],
        ['The Punctum Effect', 'An unintended, haunting detail that pierces rational defenses and establishes deep psychological resonance.'],
        ['The Right to Opacity', 'The principle that sovereign cultures have the right to keep sacred rites outside the totalizing gaze of the secular camera.']
      ],
      items: [
        {
          id: 'r5t1', unit: '21', tag: 'Epistemology',
          scenario: 'A viral photograph depicts a man with an aggressive, enraged facial expression shouting inches from a police officer’s face. The full, uncropped video shows the man was actually warning the officer that a falling piece of construction scaffolding was about to hit him.',
          task: 'Analyze this case using the concepts of "indexical fidelity," "the decisive tyranny of the frozen millisecond," and "the frame problem."',
          guide: 'Show how the image captured a real physical expression (indexical fidelity) but created a total narrative falsehood by freezing an ambiguous millisecond and omitting acoustic/temporal context.'
        },
        {
          id: 'r5t2', unit: '22', tag: 'Applied Ethics',
          scenario: 'A photojournalist documents a refugee boat sinking in the Mediterranean. A gallery in New York exhibits the large-format, beautifully lit prints of drowning individuals, selling them for $25,000 each to private collectors.',
          task: 'Evaluate this exhibition using Sontag’s critique of the "aestheticization of suffering," "poverty pornography," and "power asymmetry."',
          guide: 'Critique the extreme disconnect between the commodified aesthetic prestige of the art market and the unmitigated trauma and vulnerability of the depicted subjects.'
        },
        {
          id: 'r5t3', unit: '23', tag: 'Aesthetic Psychology',
          scenario: 'An advertising firm tries to engineer an "iconic" viral image by hiring supermodels, using golden-hour lighting, and placing dramatic text over the photo. The public finds it utterly forgettable. Meanwhile, a blurry, unscripted photo of an elderly grandfather fixing a child’s toy goes viral and is remembered for years.',
          task: 'Explain why deliberate aesthetic engineering failed while the unscripted photo succeeded, using Barthes’s *studium* and *punctum*.',
          guide: 'Contrast the transparent commercial calculation of the ad (over-engineered studium) with the authentic, poignant vulnerability of the accidental detail (the punctum).'
        },
        {
          id: 'r5t4', unit: '24', tag: 'Cultural Sovereignty',
          scenario: 'A travel blogger uses a high-zoom telephoto lens and a drone to film a secret indigenous funeral ceremony from outside the tribal reservation border, claiming: "I never set foot on their land, so my freedom of panorama and freedom of speech are legally protected."',
          task: 'Deconstruct the blogger’s defense using the concepts of "the secular gaze," "epistemic arrogance," and "visual sovereignty."',
          guide: 'Demonstrate that technological trespassing across borders to record secret rites violates the moral and cultural sovereignty of the community, regardless of narrow legal loopholes.'
        },
        {
          id: 'r5t5', unit: '21-24', tag: 'Synthesis',
          scenario: 'A historical archive contains photographs of colonial punishments taken by imperial officers to humiliate colonized subjects. Today, descendants of the colonized use those exact photographs in human rights lawsuits to demand reparations.',
          task: 'Analyze how the meaning and political function of a photograph can invert over time (from an instrument of subjugation to an empirical anchor of justice).',
          guide: 'Explain how reframing historical context transforms colonial trophies into undeniable forensic evidence against denialism.'
        },
        {
          id: 'r5t6', unit: '24', tag: 'Ethical Protocol',
          scenario: 'An international museum wants to digitize and put online its entire collection of 19th-century ethnographic photographs, including secret ritual masks that indigenous elders say should never be viewed by the uninitiated.',
          task: 'Formulate an institutional policy balancing public archival access with cultural sovereignty and the right to opacity.',
          guide: 'Recommend a protocol of collaborative curation, restricted digital access for secret-sacred materials, and repatriation of visual governance to source communities.'
        }
      ]
    },
    editing: {
      lead: 'Identify and fix structural, stylistic, and register weaknesses in these Module 5 paragraphs.',
      items: [
        {
          id: 'r5e1',
          title: 'Challenge 1 · Eliminating Passive Overuse & Strengthening Visual Rhythm',
          bad: `The photograph was taken by an unknown artist. It is seen that the lighting was used to make the subject look heroic. It can be said that the frame was selected carefully, and a sense of drama is produced in the viewer because of the shadows that were placed on the face.`,
          task: `Revise to eliminate clumsy passive constructions, deploying active verbs, a cleft sentence, and a balanced tripartite structure.`,
          good: `Through calculated chiaroscuro and tight framing, the anonymous photographer engineered a heroic portrait. What commands our attention is not mere technical competence, but the deliberate play of shadow across the subject’s brow, the electric tension of the posture, and the uncompromising directness of the gaze.`
        },
        {
          id: 'r5e2',
          title: 'Challenge 2 · Refining Diplomatic Concession & Epistemic Humility',
          bad: `Everyone knows photographers are selfish and steal rituals from native people. It is totally bad when they enter temples with cameras. They should be arrested immediately because art is not more important than religion.`,
          task: `Rewrite in a sophisticated C1 academic register using "Notwithstanding the legitimate desire...", "Granted that...", and precise ethical vocabulary (*extractive ethnography*, *cultural sovereignty*, *epistemic humility*).`,
          good: `Notwithstanding the legitimate artistic desire to document global cultural diversity, the non-consensual recording of guarded rituals represents an extractive enterprise rooted in epistemic arrogance. Granted that intercultural exchange is valuable, it does not follow that photographers possess an unrestricted license to trespass upon sovereign sacred traditions.`
        }
      ]
    },
    synthesis: {
      id: 'r5syn',
      kind: 'Module synthesis',
      title: 'The Architecture of Looking: Epistemology, Aesthetics, and Cultural Responsibility',
      min: 600,
      max: 900,
      main: true,
      prompt: `Synthesize the core inquiries of Module 5: Can the act of photographing and viewing human reality ever be neutral? In an expansive synthesis essay (600–900 words), evaluate how visual framing operates as rhetorical argument (Unit 21), the moral hazards of documenting trauma (Unit 22), the psychological architecture of lasting visual memory (Unit 23), and the boundaries of cultural sovereignty when encountering the sacred (Unit 24). Deploy reduced relative clauses, emphatic clefts, balanced sentence rhythms, and sophisticated concessive structures.`,
      guide: [
        'Introduction: Deconstruct the myth of the innocent camera; establish your central thesis on photography as an active ethical and rhetorical encounter.',
        'Body 1: Analyze visual epistemology—indexicality vs narrative framing, selection and omission, and the frame problem.',
        'Body 2: Address the ethics of witnessing—Sontag’s critique of moral voyeurism, compassion fatigue, and the power asymmetry of documentary practice.',
        'Body 3: Explore visual aesthetics and memory—the Barthesian punctum, cognitive ambiguity, and photography as a melancholic memento mori.',
        'Body 4: Examine the limits of the secular gaze—Glissant’s right to opacity, extractive ethnography, and collaborative visual stewardship.',
        'Conclusion: Synthesize the four dimensions; formulate a modern standard for critical visual literacy and ethical spectatorship.'
      ]
    },
    timed: {
      id: 'r5time',
      kind: 'Timed writing',
      title: 'The Ethics of the Unflinching Lens',
      min: 300,
      max: 450,
      timed: true,
      prompt: 'Respond concisely to the claim: “A photographer’s only responsibility is to capture reality honestly; ethical considerations about voyeurism, cultural taboos, or the subject’s dignity only censor artistic truth.” Deconstruct this claim using at least three core concepts from Module 5.',
      guide: [
        'Expose the fallacy that capturing reality is a passive, non-interpretive act (selection and omission).',
        'Incorporate the danger of moral voyeurism, the power asymmetry between observer and subject, or the violation of sacred opacity.',
        'Conclude with a clear standard balancing public documentation with human dignity and visual stewardship.'
      ]
    },
    teach: {
      lead: 'Explain one of these key grammatical and structural mechanisms clearly to another learner.',
      points: [
        { id: 'participle', label: 'Participle clauses of reason and result (Taken from a low angle... / thereby creating...)', unit: '21', ccq: 'good', hint: 'Check subject alignment: the subject of the participle clause must match the main clause subject.' },
        { id: 'reducedrel', label: 'Reduced relative clauses (The evidence presented by the defense...)', unit: '21', ccq: 'good', hint: 'Check deletion of relative pronoun + auxiliary: "The photo [which was] taken in 1948".' },
        { id: 'impersonalpass', label: 'Impersonal passive reporting (It is widely maintained that... / X is alleged to be...)', unit: '22', ccq: 'good', hint: 'Check distancing: shifts responsibility to an unnamed collective authority.' },
        { id: 'itcleft', label: 'It-clefts for emphatic focus (It is the accidental detail that wounds us)', unit: '23', ccq: 'good', hint: 'Check formula: It + be + emphasized element + that/who + rest of clause.' },
        { id: 'whcleft', label: 'Wh-clefts / Pseudo-clefts (What keeps this image alive is its ambiguity)', unit: '23', ccq: 'good', hint: 'Check agreement: What we need is (singular) vs What we need are (plural).' },
        { id: 'tricolon', label: 'Rhythmic tricolon and balanced antithesis', unit: '23', ccq: 'good', hint: 'Check grammatical parallelism across all three elements in the series.' },
        { id: 'notwithconcess', label: 'Advanced concession with "Notwithstanding [noun phrase]"', unit: '24', ccq: 'good', hint: 'Check noun phrase complement: Notwithstanding the legitimate concern...' },
        { id: 'grantedthat', label: 'Concessive rebuttal formula: Granted that X, it does not follow that Y', unit: '24', ccq: 'good', hint: 'Check logical pivot: concedes the premise X while rejecting the deduction Y.' }
      ]
    },
    areas: {
      grammar: ['Unit 21 · reduced relative & participle clauses', 'Unit 22 · advanced passive & impersonal distancing', 'Unit 23 · It-clefts, Wh-clefts, and tripartite sentence rhythm', 'Unit 24 · complex concession (Notwithstanding, Granted that) & diplomatic register'],
      vocabulary: ['Units 21–24 · visual epistemology, semiotics, photographic ethics, and postcolonial terminology'],
      reading: ['Units 21–24 · deconstructing visual framing, ethical critiques of witnessing, semiotics of the punctum, and sacred opacity'],
      reasoning: ['Units 21–24 · the frame problem, power asymmetries in portraiture, intrinsic resonance vs institutional canonization, and visual stewardship vs extractive ethnography']
    },
    listening: [
      {
        id: 'r5l1', title: 'The Unsettled Frame', format: 'Symposium dialogue between a war photojournalist and an indigenous cultural curator',
        file: '/audio/en/reviews/r05-listening-01.mp3', duration: 120, level: 'C1',
        audioReady: false,
        voice: 'Two adult speakers (David Vance, veteran conflict photographer, and Dr. Leilani Cruz, curator of indigenous arts); analytical, respectful, North American and Pacific accents',
        passes: ['First listen · follow how the speakers debate the boundary between bearing witness and respecting cultural opacity', 'Second listen · identify cleft sentences and concessive structures', 'Third listen · evaluate the proposed principles of collaborative visual stewardship'],
        transcript: `David: Leilani, after thirty years of photographing conflicts across five continents, I still operate on the foundational belief that light is the greatest disinfectant. When governments commit war crimes or corporations poison rivers, the photographer's camera is often the only empirical anchor against state denialism.\n\nDr. Cruz: David, no one denies the forensic necessity of exposing war crimes. Notwithstanding the nobility of bearing witness, we must recognize that the camera is not an innocent instrument. In traditional and indigenous communities, the secular assumption that everything in the world exists to be photographed has often functioned as an act of extractive colonialism.\n\nDavid: Granted that 19th-century salvage anthropology was paternalistic, it does not follow that modern photojournalism is inherently predatory. What we seek is to humanize suffering and build bridges of global solidarity.\n\nDr. Cruz: But true humanization requires respecting what Édouard Glissant called the 'right to opacity'. What wounds traditional communities is not malice, but the entitled gaze of outsiders who believe their curiosity overrides our ancestral taboos. When you photograph a sacred initiation without permission, you are not building a bridge; you are extracting a spiritual commodity.\n\nDavid: That is a fair challenge. It is through collaborative stewardship—granting communities editorial veto power and co-authorship—that photography can transcend extraction and become genuine solidarity.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core thematic synthesis', q: 'How do the speakers reconcile the imperative of bearing witness with cultural sovereignty?', options: ['By banning all digital cameras worldwide.', 'By distinguishing forensic documentation of human rights abuses from extractive recording of sacred rites, adopting collaborative stewardship and respect for opacity.', 'By allowing photographers to record anything as long as they pay a fee.', 'By replacing human photographers with automated drones.'], answer: 1, explain: 'The dialogue reconciles witness and sovereignty through collaborative stewardship, informed consent, and recognizing cultural boundaries.' },
          { id: 'q2', type: 'open', tag: 'Grammatical analysis', q: 'Identify and analyze the concessive structure used by Dr. Cruz ("Notwithstanding the nobility of...") and David Vance ("Granted that... it does not follow that...").', rubric: ['Dr. Cruz concedes the value of witness before highlighting the historical harm of extractive documentation', 'David concedes historical anthropological paternalism while defending modern photojournalistic integrity'] }
        ]
      },
      {
        id: 'r5l2', title: 'The Philosophy of the Shutter', format: 'Concluding reflective monologue',
        file: '/audio/en/reviews/r05-listening-02.mp3', duration: 110, level: 'C1',
        audioReady: false,
        voice: 'Solo philosopher of aesthetics; resonant, contemplative, measured International English',
        passes: ['First listen · reflect on why looking is defined as an active ethical choice', 'Second listen · track the use of clefts and balanced tripartite sentences', 'Third listen · consider how this philosophy applies to personal media consumption'],
        transcript: `To look through a lens is to make a philosophical claim about what matters. In pressing the shutter, the photographer declares: out of the infinite chaos of the universe, this particular rectangle of light, this fleeting micro-expression, this fragment of human sorrow or ecstasy deserves to be preserved against the oblivion of time.\n\nYet we must never forget that every image is defined as much by what it excludes as by what it embraces. Behind every frame lies a shadow: the context that was omitted, the power asymmetry that enabled the shot, the vulnerability that was exposed, and the sacred mystery that demanded silence.\n\nTo become truly visually literate in a culture of digital saturation is to cultivate the discipline of reverence. It is to know when to look with fierce, unflinching clarity at the injustices of the world, and when to lower our eyes in humble respect before the dignity of the sacred. For what makes us human is not merely our capacity to see, but our wisdom to know how to look.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core message', q: 'According to the speaker, what defines true visual literacy in the modern world?', options: ['The ability to buy the most expensive lenses.', 'Cultivating the wisdom to balance fierce documentation of injustice with humble reverence and restraint before human dignity and sacred mystery.', 'Memorizing the technical settings of every camera.', 'Taking hundreds of selfies every day.'], answer: 1, explain: 'Visual literacy is defined as the wisdom to balance uncompromising witness with reverence and ethical restraint.' },
          { id: 'q2', type: 'open', tag: 'Aesthetic reflection', q: 'How does the speaker characterize the relationship between the frame and what is excluded?', rubric: ['Every frame is defined by its exclusions: omitted context, power asymmetries, exposed vulnerability, and sacred mysteries that require silence.'] }
        ]
      }
    ],
    speaking: {
      id: 'm5s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Synthesize the core themes of Module 5 (Photography, Art & the Act of Looking): In 75–135 seconds, evaluate why the act of photographing and viewing reality is never neutral. Connect at least three dimensions: visual epistemology & framing (selection and omission), the ethics of witnessing trauma (voyeurism vs bearing witness), the psychology of memory (Barthes\'s punctum & memento mori), or the boundaries of the sacred (the secular gaze vs the right to opacity). Employ at least one cleft sentence (It is / What...), one concessive clause (Notwithstanding / Granted that), and balanced tripartite phrasing.',
      prepare: 'Keywords only: indexicality vs framing · selection & omission · moral voyeurism vs witness · punctum & memento mori · secular gaze & right to opacity · cleft structures · concession. Do not script.',
      grammar: 'Cleft sentences (It is the framing that, What wounds us is); advanced concession (Notwithstanding the imperative, Granted that); balanced tripartite structures; diplomatic hedging',
      targets: ['the fallacy of the innocent eye', 'the radical act of selection and omission', 'the aestheticization of suffering', 'an indelible psychological monument', 'collaborative visual stewardship and the right to opacity'],
      rubric: [
        'Synthesizes multiple Module 5 themes (epistemology, ethics, memory, sacredness) with intellectual depth',
        'Accurately employs cleft sentences, advanced concession, and balanced phrasing',
        'Demonstrates mastery of visual semiotics and cultural ethics vocabulary',
        'Delivers a fluent, authoritative, and engaging C1 spoken synthesis'
      ]
    }
  };

  /* ==========================================================================
     MODULE 6 REVIEW · REASONING, PERSUASION & ARGUMENT (Units 25–29)
     ========================================================================== */
  K.reviews['6'] = {
    id: '6',
    title: 'Reasoning, Persuasion & Argument',
    units: ['25', '26', '27', '28', '29'],
    question: 'How do we construct arguments that are intellectually honest, methodologically rigorous, and ethically persuasive?',
    grammarTargets: 'Epistemic modality & hedging · cause/effect connectors · counterfactual conditionals · concessive clauses (much as, however much) · adversative contrast · rhetorical parallelism & tricolon · negative and limiting inversion',
    reasoningTargets: 'Hierarchy of evidence · confounding variables & reverse causality · motivated numeracy & the smartness paradox · communicative rationality vs manipulation · steelmanning vs strawmanning · Rapoport\'s rules · the paradox of tolerance',
    retrieve: {
      lead: 'Retrieve and connect the core concepts and arguments developed across Units 25 through 29.',
      items: [
        { id: 'r6r1', unit: '25', q: 'What is David Hume’s foundational rule of belief calibration?', guide: 'A wise person proportions their belief to the evidence, matching certainty to the quality, independence, and replicability of empirical data.' },
        { id: 'r6r2', unit: '25', q: 'Why is anecdotal evidence placed at the base of the scientific hierarchy of evidence?', guide: 'Anecdotes cannot control for placebo effects, spontaneous recovery, selection bias, or regression to the mean.' },
        { id: 'r6r3', unit: '26', q: 'Distinguish between a spurious correlation and reverse causality.', guide: 'A spurious correlation is an accidental or third-variable link; reverse causality is mistaking the effect for the cause.' },
        { id: 'r6r4', unit: '26', q: 'What are the three rungs of Judea Pearl’s "Ladder of Causation"?', guide: 'Association (seeing/passive correlation), Intervention (doing/active alteration), and Counterfactuals (imagining "what would have happened if...").' },
        { id: 'r6r5', unit: '27', q: 'What is the "smartness paradox" discovered by cognitive scientists like Dan Kahan?', guide: 'Higher cognitive intelligence and numeracy do not eliminate bias; instead, they provide superior tools to rationalize ideological and tribal commitments.' },
        { id: 'r6r6', unit: '27', q: 'Why did human reason evolve according to Mercier and Sperber’s "argumentative theory"?', guide: 'Reason evolved as a social communicative tool to persuade others, defend the tribe, and justify actions, acting like an aggressive defense attorney rather than an impartial judge.' },
        { id: 'r6r7', unit: '28', q: 'What distinguishes Jürgen Habermas’s "communicative action" from "covert strategic action"?', guide: 'Communicative action seeks mutual understanding through the unforced force of the better argument; strategic action covertly manipulates or steers behavior.' },
        { id: 'r6r8', unit: '29', q: 'What are Anatol Rapoport’s four rules for constructive critical commentary?', guide: '1. Restate the opponent’s view with total fairness and clarity; 2. List points of agreement; 3. State what was learned; 4. Only then deliver a calibrated rebuttal.' }
      ]
    },
    language: {
      lead: 'Transform, combine, and refine these sentences using the advanced grammatical structures from Module 6.',
      items: [
        { id: 'r6l-g1', unit: '25', label: 'Epistemic hedging', orig: 'This experiment proves that smartphones destroy human focus.', task: 'Rewrite using calibrated academic hedging (suggests an association, warrants further longitudinal investigation).', target: 'The empirical data suggests a significant association between heavy smartphone use and attentional fragmentation, though establishing definitive causation warrants further longitudinal investigation.' },
        { id: 'r6l-g2', unit: '25', label: 'Evidentiary boosting', orig: 'Maybe smoking causes lung cancer in some people.', task: 'Rewrite using formal evidentiary boosting based on overwhelming consensus.', target: 'Decades of converging meta-analyses conclusively establish that tobacco smoking causes severe pulmonary carcinoma.' },
        { id: 'r6l-g3', unit: '26', label: 'Advanced causal verb phrase', orig: 'The inflation happened because the supply chain broke.', task: 'Rewrite using "was precipitated by" or "is attributable to".', target: 'The sudden inflationary surge was largely attributable to severe global supply-chain dislocations and concurrent energy price shocks.' },
        { id: 'r6l-g4', unit: '26', label: 'Inverted counterfactual conditional', orig: 'If the researchers had not controlled for patient income, the study would have found a fake cure.', task: 'Rewrite as an inverted counterfactual conditional starting with "Had".', target: 'Had the researchers not controlled for baseline patient income, the study would have produced a completely spurious conclusion.' },
        { id: 'r6l-g5', unit: '27', label: 'Advanced concession with Much as', orig: 'Although we want to believe humans are logical, our brains are very tribal.', task: 'Rewrite using "Much as we might..." and formal cognitive register.', target: 'Much as we might pride ourselves on our intellectual objectivity, the evolutionary architecture of human cognition remains deeply anchored in tribal belonging.' },
        { id: 'r6l-g6', unit: '27', label: 'Concession with However + adjective', orig: 'Even if an intellectual is very smart, they can still believe crazy conspiracy theories.', task: 'Rewrite using "However sophisticated one\'s analytical prowess may be...".', target: 'However sophisticated one’s analytical prowess may be, it cannot immunize the mind against motivated ideological rationalization.' },
        { id: 'r6l-g7', unit: '27', label: 'Adversative contrast with Far from [gerund]', orig: 'Intelligence does not cure bias. It gives people better tools to defend their opinions.', task: 'Rewrite using "Far from eliminating...", "on the contrary", or "rather than".', target: 'Far from eliminating cognitive bias, superior intelligence frequently serves as a formidable engine for motivated rationalization.' },
        { id: 'r6l-g8', unit: '28', label: 'Rhetorical parallelism & tricolon', orig: 'The speaker wanted to teach people, give them hope, and make them vote.', task: 'Rewrite into a balanced parallel tricolon using formal infinitives.', target: 'The orator sought to enlighten public understanding, to inspire moral courage, and to mobilize decisive democratic action.' },
        { id: 'r6l-g9', unit: '28', label: 'Antithetical parallel contrast', orig: 'Persuasion uses reason, but manipulation uses fear.', task: 'Rewrite using an antithetical parallel structure (appeals to X, whereas manipulation preys upon Y).', target: 'Ethical persuasion appeals to the listener’s conscious reason, whereas covert manipulation preys upon their subconscious fear.' },
        { id: 'r6l-g10', unit: '29', label: 'Negative inversion with Rarely', orig: 'People almost never change their minds when you insult them in a debate.', task: 'Rewrite starting with "Rarely do..." and formal vocabulary.', target: 'Rarely do individuals update their core convictions when subjected to vitriolic insults and intellectual contempt.' },
        { id: 'r6l-g11', unit: '29', label: 'Negative inversion with Not only', orig: 'Steelmanning stops anger and it also helps you see the flaws in your own ideas.', task: 'Rewrite using "Not only does steelmanning... but it also...".', target: 'Not only does steelmanning disarm emotional hostility, but it also exposes the subtle blind spots inherent in one’s own thesis.' },
        { id: 'r6l-g12', unit: '29', label: 'Multi-layered concession in debate', orig: 'Censoring bad speech might protect some people, but it is dangerous for democracy.', task: 'Rewrite using "To be sure... nevertheless..." and political philosophy vocabulary.', target: 'To be sure, suppressing harmful speech stems from a legitimate desire to protect vulnerable groups; nevertheless, granting state authorities the power of censorship creates an intolerable hazard for open democratic discourse.' }
      ]
    },
    steal: {
      lead: 'The ten essential C1 phrase chunks from Module 6 (Reasoning, Persuasion & Argument).',
      items: [
        { id: 'r6s1', chunk: 'proportion belief to the evidence', meaning: 'The rational principle of matching one\'s degree of certainty to the quality of supporting data.', unit: '25', tag: 'Epistemic calibration' },
        { id: 'r6s2', chunk: 'an unmeasured confounding variable', meaning: 'A hidden factor that distorts the observed statistical relationship between two variables.', unit: '25', tag: 'Statistical critique' },
        { id: 'r6s3', chunk: 'the ladder of causation', meaning: 'Judea Pearl’s three-tier model of causal reasoning (Association, Intervention, Counterfactuals).', unit: '26', tag: 'Causal modeling' },
        { id: 'r6s4', chunk: 'the illusion of monocausality', meaning: 'The mistaken belief that complex systemic outcomes stem from a single, isolated cause.', unit: '26', tag: 'Systems thinking' },
        { id: 'r6s5', chunk: 'identity-protective cognition', meaning: 'The subconscious tendency to evaluate information in ways that protect one\'s social status and tribe.', unit: '27', tag: 'Cognitive psychology' },
        { id: 'r6s6', chunk: 'the smartness paradox', meaning: 'The counter-intuitive reality that higher cognitive ability often leads to greater political polarization.', unit: '27', tag: 'Cognitive critique' },
        { id: 'r6s7', chunk: 'the unforced force of the better argument', meaning: 'Habermas’s principle that genuine rational consensus emerges through logic rather than coercion.', unit: '28', tag: 'Communicative ethics' },
        { id: 'r6s8', chunk: 'epistemic sovereignty', meaning: 'The individual’s fundamental right and capacity to evaluate evidence and form their own beliefs.', unit: '28', tag: 'Human autonomy' },
        { id: 'r6s9', chunk: 'the principle of charity', meaning: 'The philosophical rule that one should interpret an opponent’s statements in the most rational and strongest possible way.', unit: '29', tag: 'Debate ethics' },
        { id: 'r6s10', chunk: 'the paradox of tolerance', meaning: 'Karl Popper’s insight that unlimited tolerance must lead to the disappearance of tolerance by empowering the intolerant.', unit: '29', tag: 'Political philosophy' }
      ]
    },
    reading: {
      format: 'Interdisciplinary synthesis essay',
      title: 'The Architecture of Reason: From Epistemic Calibration to the Ethics of Dispute',
      standfirst: 'Across scientific methodology, cognitive psychology, rhetorical ethics, and philosophical debate, true intellectual strength is not measured by winning arguments, but by aligning belief with reality.',
      paras: [
        'To be an educated human being in the modern world is to live under a constant barrage of claims, data visualizations, political slogans, and rhetorical appeals. In this saturated information ecosystem, the fundamental intellectual challenge is not accumulating more data, but cultivating the cognitive and ethical discipline of reason. As David Hume established in the Scottish Enlightenment, rational inquiry begins with a foundational imperative: we must proportion our belief to the evidence. Yet putting this principle into practice requires understanding why human psychology is so vulnerable to error, and how the architecture of proof, persuasion, and dispute must be constructed.',
        'At the foundation of this discipline lies the hierarchy of evidence. We must learn to distinguish between the emotional vividness of an anecdotal testimonial and the rigorous statistical validity of a randomized controlled trial or systematic meta-analysis. We must recognize that observation is not causation: when two variables move together in statistical harmony, we must actively cross-examine the data for unmeasured confounding variables, reverse causality, and spurious correlation. To climb Judea Pearl’s "Ladder of Causation" is to move beyond passive pattern detection and ask counterfactual questions: What would have happened had the intervention not occurred? What is the verified biological or institutional mechanism?',
        'Yet mastering the rules of scientific evidence is useless if our conscious intellect is co-opted by tribal bias. As cognitive scientists have revealed through the "smartness paradox," high intelligence and quantitative numeracy do not immunize the human mind against irrational dogmatism. Because human rationality evolved primarily as a social communicative tool for winning arguments and defending allies—what Hugo Mercier and Dan Sperber termed the argumentative theory of reason—superior cognitive ability frequently acts as an aggressive defense attorney for identity-protective cognition. To overcome this trap, we must cultivate the courage of the scout mindset: decoupling our personal identity from our factual hypotheses and celebrating the revision of our beliefs.',
        'When we bring our conclusions into the public arena, we confront the moral boundaries of influence. Following Jürgen Habermas, we must distinguish between ethical communicative rationality and covert strategic manipulation. Persuasion is legitimate when it honors the epistemic sovereignty of the listener, submitting claims to the unforced force of the better argument. Manipulation, by contrast, exploits subconscious cognitive heuristics and loaded connotations to achieve instrumental control. While passionate rhetoric, emotional framing, and narrative urgency are essential tools for overcoming apathy in social justice struggles, they must remain transparent in their intent and grounded in moral truth.',
        'Finally, when we encounter profound disagreement, we reach the highest test of intellectual character: the discipline of steelmanning. Guided by Anatol Rapoport’s rules, we must resist the cheap gratification of demolishing strawman caricatures. By formulating the strongest, most charitable version of our opponent\'s argument before offering a rebuttal, we disarm existential hostility, uncover our own hidden assumptions, and elevate the quality of democratic deliberation. While Karl Popper’s Paradox of Tolerance reminds us that we must maintain firm boundaries against bad-faith totalitarianism, our default posture toward our fellow citizens must be one of profound intellectual charity.',
        'Ultimately, to cultivate a mind in English is to realize that reason is not a weapon for dominating others, but a sacred covenant with truth. By combining empirical rigor with epistemic modesty, ethical persuasion with critical empathy, we participate in the enduring human quest for a free, rational, and compassionate civilization.'
      ],
      items: [
        { id: 'r6q1', type: 'mc', tag: 'Synthesis of module thesis', q: 'What central realization connects all five units of Module 6?', options: ['Scientific calculators should be used to resolve all moral and political disputes.', 'Authentic critical reasoning requires integrating empirical evidence hierarchies, awareness of motivated cognitive biases, ethical communicative standards, and charitable steelmanning in disagreement.', 'Political debates should be completely banned from modern television.', 'People should only speak in mathematical equations.'], answer: 1, explain: 'The synthesis unifies evidence hierarchies (U25), causal inference (U26), motivated reasoning (U27), rhetorical ethics (U28), and steelmanning (U29).' },
        { id: 'r6q2', type: 'quote', tag: 'Cognitive psychology and bias', q: 'Find the sentence explaining the role of intelligence in motivated reasoning according to Mercier and Sperber.', find: 'superior cognitive ability frequently acts as an aggressive defense attorney for identity-protective cognition', quote: 'superior cognitive ability frequently acts as an aggressive defense attorney for identity-protective cognition.', explain: 'This highlights the smartness paradox and the argumentative theory of reason.' },
        { id: 'r6q3', type: 'mc', tag: 'Causal inference and Pearl', q: 'According to the text, what does climbing Judea Pearl’s "Ladder of Causation" require?', options: ['Buying a taller ladder for laboratory work.', 'Moving beyond passive correlation to ask counterfactual questions and isolate verified causal mechanisms.', 'Memorizing the names of all pharmaceutical companies.', 'Refusing to use computer algorithms.'], answer: 1, explain: 'Pearl’s ladder ascends to intervention and counterfactual reasoning.' },
        { id: 'r6q4', type: 'mc', tag: 'Communicative action and manipulation', q: 'How does Habermas define the ethical criterion for legitimate persuasion?', options: ['Speaking as loudly as possible without interruption.', 'Honoring the listener’s epistemic sovereignty and submitting claims to the unforced force of the better argument.', 'Paying listeners money to attend lectures.', 'Using subliminal digital marketing.'], answer: 1, explain: 'Habermas defines communicative rationality as reason-based consensus between autonomous equals.' },
        { id: 'r6q5', type: 'mc', tag: 'Steelmanning and Rapoport', q: 'Why does the text argue that steelmanning elevates democratic deliberation?', options: ['Because it is made of industrial metal.', 'Because it disarms emotional hostility, exposes our own blind spots, and ensures that arguments are tested against their strongest formulations.', 'Because it allows politicians to avoid answering questions.', 'Because it guarantees that nobody ever disagrees.'], answer: 1, explain: 'Steelmanning disarms defensiveness and tests arguments against their most formidable truths.' },
        { id: 'r6q6', type: 'open', tag: 'Grammar in context · Inversion and Concession', q: 'Analyze how the author uses negative inversion ("Rarely do...", "Not only does...") and advanced concession ("Much as...", "To be sure...") to balance argumentative authority with epistemic modesty.', rubric: ['Negative inversion provides dramatic emphasis at pivotal moments of ethical and cognitive insight', 'Concessive clauses balance opposing truths (empirical science vs lived experience; charity vs paradox of tolerance)'] },
        { id: 'r6q7', type: 'open', tag: 'Reasoning · The Smartness Paradox vs. The Scout Mindset', q: 'Explain how adopting Julia Galef’s "scout mindset" provides an antidote to the "smartness paradox" identified by Dan Kahan.', rubric: ['The smartness paradox shows that intelligence is used to rationalize tribal bias (soldier mindset)', 'The scout mindset decouples identity from belief, directing cognitive firepower toward accurate mapping of reality rather than territorial defense'] },
        { id: 'r6q8', type: 'open', tag: 'Synthesis · The Complete Argument', q: 'Formulate a comprehensive checklist of five criteria for an intellectually rigorous and ethically persuasive argument based on Module 6.', rubric: ['1. Proportion belief to evidence hierarchy; 2. Test causation counterfactually and rule out confounders; 3. Decouple identity from conclusion (scout mindset); 4. Respect listener epistemic sovereignty (communicative action); 5. Steelman opposing views (Rapoport’s rules)'] }
      ]
    },
    reasoning: {
      lead: 'Deconstruct these complex real-world dilemmas using the analytical models from Module 6.',
      defs: [
        ['The Evidentiary Pyramid', 'Anecdotes -> Observational Cohorts -> Randomized Controlled Trials -> Systematic Meta-Analyses.'],
        ['Counterfactual Testing', 'Evaluating what would have happened in the baseline alternative reality without the alleged causal factor.'],
        ['Motivated Numeracy', 'Selectively weaponizing quantitative skills to confirm ideologically preferred outcomes.'],
        ['The Steelman Protocol', 'Formulating the strongest, most charitable version of an opponent\'s position before attempting rebuttal.']
      ],
      items: [
        {
          id: 'r6t1', unit: '25', tag: 'Medical Epistemology',
          scenario: 'A wellness influencer with two million followers claims a daily celery juice cleanse cured their chronic fatigue syndrome, citing hundreds of testimonials in the comment section as "definitive scientific proof."',
          task: 'Deconstruct this claim using the hierarchy of evidence, placebo effects, regression to the mean, and selection bias.',
          guide: 'Explain why self-selected online testimonials are epistemically fragile and cannot substitute for randomized, blinded trials.'
        },
        {
          id: 'r6t2', unit: '26', tag: 'Causal Inference',
          scenario: 'A study finds that cities with more public parks have significantly lower rates of cardiovascular disease. The city council proposes spending $500 million building parks in industrial zones to reduce heart attacks.',
          task: 'Analyze the risk of confounding variables and reverse causality before approving the investment.',
          guide: 'Examine median household income, air pollution, walkability, and healthcare access as major confounding drivers of neighborhood health.'
        },
        {
          id: 'r6t3', unit: '27', tag: 'Cognitive Science',
          scenario: 'A brilliant economics professor with an Ivy League PhD defends an economic forecast made by their political party, even after four independent auditing agencies prove the mathematical model contained a catastrophic spreadsheet calculation error.',
          task: 'Explain the professor\'s behavior using Dan Kahan\'s "motivated numeracy," "identity-protective cognition," and the asymmetry of belief abandonment.',
          guide: 'Show how high intelligence was deployed to defend tribal status and professional standing against undeniable mathematical counter-evidence.'
        },
        {
          id: 'r6t4', unit: '28', tag: 'Rhetorical Ethics',
          scenario: 'A political campaign creates an advertisement using terrifying music, images of crying children, and the slogan: "If you vote for our opponent, your children will not have a future."',
          task: 'Evaluate this advertisement using Habermas\'s concept of "covert strategic action," dark patterns, and the classical triad (ethos, pathos, logos).',
          guide: 'Contrast predatory fear-mongering that bypasses rational agency with ethical persuasion that balances logos, ethos, and constructive pathos.'
        },
        {
          id: 'r6t5', unit: '29', tag: 'Debate Ethics',
          scenario: 'In a televised debate on carbon taxes, Candidate A says: "My opponent wants to bankrupt our families and force everyone to freeze in the dark during winter!"',
          task: 'Deconstruct Candidate A’s strawman fallacy and draft a 100-word steelman of the opponent\'s actual position using Rapoport’s rules.',
          guide: 'Replace the hyperbolic caricature with a charitable summary of economic transition costs and market-based decarbonization.'
        },
        {
          id: 'r6t6', unit: '25-29', tag: 'Synthesis',
          scenario: 'A university faces a crisis: a controversial speaker known for provocative claims regarding gender differences in cognition has been invited to campus. Student groups demand the event be cancelled, while faculty argue for academic freedom.',
          task: 'Formulate an institutional policy that balances academic free inquiry, Rapoport\'s rules, and Karl Popper’s Paradox of Tolerance.',
          guide: 'Establish a framework of structured debate (steelmanning, evidence presentation, adversarial collaboration) while maintaining strict boundaries against harassment and incitement.'
        }
      ]
    },
    editing: {
      lead: 'Identify and fix structural, stylistic, and register weaknesses in these Module 6 paragraphs.',
      items: [
        {
          id: 'r6e1',
          title: 'Challenge 1 · Calibrating Over-Claimed Assertions & Fixing Causal Fallacies',
          bad: `This study about organic food completely proves that chemicals cause cancer in everyone. People who eat normal food will definitely get sick because the chart shows the numbers going up together. It is 100% obvious.`,
          task: `Revise using academic epistemic hedging (*suggests a correlation, confounding variables, observational design*) and formal causal connectors (*is attributable to, warrants cautious interpretation*).`,
          good: `While the observational data suggests a positive correlation between non-organic food consumption and specific oncological markers, attributing this outcome directly to synthetic pesticides requires cautious interpretation. Unmeasured confounding variables—such as median income, lifestyle habits, and baseline healthcare access—preclude a definitive causal inference.`
        },
        {
          id: 'r6e2',
          title: 'Challenge 2 · Upgrading a Strawman into an Inverted Steelman',
          bad: `People who want to regulate the internet just hate free speech and want a communist dictatorship. They don't understand that people should say whatever they want online.`,
          task: `Rewrite into an eloquent, charitable steelman featuring negative inversion (*Not only do proponents...*, *Rarely do critics...*) and C1 political philosophy vocabulary.`,
          good: `To be sure, thoughtful advocates of digital platform regulation are not enemies of liberty; rather, they raise profound concerns regarding algorithmic radicalization, biometric surveillance, and the proliferation of coordinated disinformation. Not only does unchecked platform power distort democratic elections, but rarely can individual citizens protect their epistemic sovereignty against multi-billion-dollar behavioral engineering.`
        }
      ]
    },
    synthesis: {
      id: 'r6syn',
      kind: 'Module synthesis',
      title: 'The Architecture of Reason: Epistemic Rigor, Cognitive Humility, and the Ethics of Persuasion',
      min: 600,
      max: 900,
      main: true,
      prompt: `Synthesize the core inquiries of Module 6: How do we construct arguments that are intellectually honest, methodologically sound, and ethically persuasive? In an expansive synthesis essay (600–900 words), evaluate the hierarchy of scientific proof (Unit 25), the mechanics of causal inference (Unit 26), the psychology of motivated reasoning (Unit 27), the boundaries of ethical rhetoric (Unit 28), and the discipline of steelmanning in disagreement (Unit 29). Deploy epistemic hedging, counterfactual conditionals, advanced concessive clauses (*Much as...*), and negative inversion (*Rarely does...*).`,
      guide: [
        'Introduction: Establish Hume’s principle of belief calibration; frame the tension between narrative tribalism and rational inquiry.',
        'Body 1: Analyze evidentiary rigor—hierarchy of proof, replicability, and counterfactual causal inference (ruling out confounders and reverse causality).',
        'Body 2: Address cognitive psychology—the smartness paradox, identity-protective cognition, and cultivating the scout mindset.',
        'Body 3: Evaluate rhetorical ethics—Habermas’s communicative rationality vs covert manipulation, dark patterns, and the classical triad.',
        'Body 4: Examine the ethics of dispute—steelmanning, Rapoport’s rules, and navigating Popper’s Paradox of Tolerance.',
        'Conclusion: Synthesize the five pillars; deliver a definitive manifesto for intellectual independence and civil discourse.'
      ]
    },
    timed: {
      id: 'r6time',
      kind: 'Timed writing',
      title: 'The Ethics of Disagreement',
      min: 300,
      max: 450,
      timed: true,
      prompt: 'Respond concisely to the claim: “In political and moral debates, our only goal should be to win and defeat our opponents; treating their arguments with charity or nuance only makes us look weak.” Deconstruct this claim using at least three core concepts from Module 6.',
      guide: [
        'Expose the cognitive trap of the soldier mindset and motivated reasoning.',
        'Incorporate the power of steelmanning (Rapoport\'s rules) to disarm hostility and uncover true trade-offs.',
        'Conclude with a clear standard balancing fierce moral conviction with intellectual charity and communicative rationality.'
      ]
    },
    teach: {
      lead: 'Explain one of these key grammatical and structural mechanisms clearly to another learner.',
      points: [
        { id: 'epistemichedg', label: 'Epistemic hedging (would suggest, appears to corroborate, is likely to indicate)', unit: '25', ccq: 'good', hint: 'Check assertion strength: match verb certainty to empirical evidence quality.' },
        { id: 'invcounterfac', label: 'Inverted counterfactual conditionals (Had X not occurred, Y would not have transpired)', unit: '26', ccq: 'good', hint: 'Check syntax: Had + subject + past participle ... would have + past participle.' },
        { id: 'muchasconcess', label: 'Advanced concession with "Much as [subject + verb]"', unit: '27', ccq: 'good', hint: 'Check verb compatibility: Much as we might pride ourselves on / Much as they wish...' },
        { id: 'howeveradj', label: 'Concession with "However + adjective + subject + may be"', unit: '27', ccq: 'good', hint: 'Check word order: However rigorous the study may be, it cannot...' },
        { id: 'farfromgerund', label: 'Adversative contrast with "Far from [gerund]..."', unit: '27', ccq: 'good', hint: 'Check gerund complement: Far from eliminating bias, intelligence...' },
        { id: 'rhetoricaltriad', label: 'Rhetorical parallelism and balanced tricolon', unit: '28', ccq: 'good', hint: 'Check grammatical alignment: three parallel infinitives, gerunds, or noun phrases.' },
        { id: 'neginversion', label: 'Negative and limiting inversion (Rarely do..., Not only does..., Seldom has...)', unit: '29', ccq: 'good', hint: 'Check auxiliary inversion: Rarely does an opponent change their mind (auxiliary before subject).' },
        { id: 'tobesure', label: 'Multi-layered concession formula: To be sure... nevertheless...', unit: '29', ccq: 'good', hint: 'Check logical pivot: validates an opponent\'s concern before delivering a refined rebuttal.' }
      ]
    },
    areas: {
      grammar: ['Unit 25 · epistemic modality, hedging and boosting', 'Unit 26 · cause/effect connectors and counterfactual conditionals', 'Unit 27 · advanced concession (Much as, However much) and adversative contrast', 'Unit 28 · rhetorical parallelism and balanced tricolons', 'Unit 29 · negative and limiting inversion and multi-layered debate structures'],
      vocabulary: ['Units 25–29 · epistemology, causal inference, cognitive psychology, rhetorical theory, and debate terminology'],
      reading: ['Units 25–29 · deconstructing evidentiary claims, causal modeling, motivated reasoning, communicative action, and steelmanning'],
      reasoning: ['Units 25–29 · hierarchy of proof, confounding and reverse causality, the smartness paradox, communicative rationality vs manipulation, Rapoport’s rules, and the paradox of tolerance']
    },
    listening: [
      {
        id: 'r6l1', title: 'The Anatomy of a Rational Debate', format: 'Symposium debate between a cognitive scientist and a philosopher of science',
        file: '/audio/en/reviews/r06-listening-01.mp3', duration: 120, level: 'C1',
        audioReady: false,
        voice: 'Two adult scholars (Dr. Arthur Vance and Professor Elena Ward); sharp, articulate, British and North American accents',
        passes: ['First listen · follow how the speakers connect evidence hierarchies, motivated reasoning, and steelmanning', 'Second listen · identify negative inversions and counterfactual conditionals', 'Third listen · evaluate the proposed rules for constructive public deliberation'],
        transcript: `Dr. Vance: Elena, when we look at the breakdown of public discourse today, we see an alarming convergence of two crises: a methodology crisis and a psychology crisis. On one hand, the public confuses observational correlations with verified causal mechanisms; on the other hand, highly educated partisans weaponize their intelligence to rationalize tribal orthodoxies.\n\nProf. Ward: Exactly, Arthur. Much as we might wish that teaching more statistics would cure polarization, Dan Kahan’s research proves that without cognitive humility, quantitative numeracy merely supercharges motivated reasoning. The conscious intellect becomes an aggressive defense attorney for tribal belonging.\n\nDr. Vance: Which is why Judea Pearl’s ladder of causation and Daniel Dennett’s steelmanning protocol are so vital. Had public debate embraced Rapoport’s rules fifty years ago, we would not be trapped in this sterile arena of mutual contempt. Rarely do people change their minds when attacked with strawman caricatures.\n\nProf. Ward: Not only does steelmanning disarm existential defensiveness, but it also forces us to pass the Ideological Turing Test. When you can articulate your opponent’s concerns with total fidelity, you discover the legitimate philosophical trade-offs that make human governance so challenging.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Thematic synthesis', q: 'Why is statistical education alone insufficient to eliminate political polarization according to the speakers?', options: ['Because people do not have calculators.', 'Because without cognitive humility, high intelligence and numeracy are co-opted by identity-protective cognition to rationalize tribal bias.', 'Because statistics is an obsolete branch of mathematics.', 'Because political parties have banned the teaching of science.'], answer: 1, explain: 'The speakers note that quantitative skills without cognitive humility merely supercharge motivated reasoning.' },
          { id: 'q2', type: 'open', tag: 'Grammar and rhetoric in context', q: 'Identify and analyze the use of negative inversion by Dr. Vance ("Rarely do people...") and Professor Ward ("Not only does steelmanning...").', rubric: ['Dr. Vance emphasizes the psychological futility of aggressive strawmanning', 'Prof. Ward highlights the dual cognitive and empathetic power of steelmanning and passing the Ideological Turing Test'] }
        ]
      },
      {
        id: 'r6l2', title: 'The Covenant of Reason', format: 'Concluding reflective monologue',
        file: '/audio/en/reviews/r06-listening-02.mp3', duration: 110, level: 'C1',
        audioReady: false,
        voice: 'Solo philosopher of ethics; resonant, contemplative, measured International English',
        passes: ['First listen · reflect on why reason is defined as a moral covenant rather than a weapon of dominance', 'Second listen · track the use of tricolons and concessive framing', 'Third listen · consider how these principles apply to personal intellectual growth'],
        transcript: `To think critically is not to possess an invincible sword with which to cut down your intellectual enemies. It is to enter into a sacred covenant with reality.\n\nTo honor this covenant requires proportioning our belief to the evidence, admitting when our hypotheses have failed, and resisting the seductive pull of tribal conformity. It requires having the courage to look at an opponent—not as a caricature to be ridiculed—but as a fellow human consciousness navigating the immense complexity of existence.\n\nWhen we choose to persuade without manipulation, when we choose to steelman the arguments of those with whom we disagree, we do more than elevate an academic debate. We preserve the democratic soul of civilization. For the ultimate triumph of reason is not to prove that we were right; it is to discover, together, what is true.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core philosophical insight', q: 'How does the speaker define the ultimate triumph of human reason?', options: ['Winning every political election.', 'Accumulating personal wealth through stock market algorithms.', 'Not proving that we were right, but discovering together what is true through evidence, humility, and charity.', 'Writing books that nobody can understand.'], answer: 2, explain: 'Reason is defined as a collaborative covenant to discover truth rather than an instrument of egoistic dominance.' },
          { id: 'q2', type: 'open', tag: 'Ethical reflection', q: 'How does the speaker connect steelmanning and ethical persuasion to the preservation of democratic civilization?', rubric: ['Steelmanning and ethical persuasion honor human dignity, resist tribal caricatures, and preserve the shared space of reasoned democratic dialogue.'] }
        ]
      }
    ],
    speaking: {
      id: 'm6s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [75, 135],
      prompt: 'Synthesize the core themes of Module 6 (Reasoning, Persuasion & Argument): In 75–135 seconds, evaluate what is required to construct arguments that are methodologically rigorous and ethically persuasive. Connect at least three dimensions: evidence hierarchies & causal inference (confounding variables / counterfactuals), cognitive psychology (the smartness paradox / scout mindset), rhetorical ethics (communicative rationality vs manipulation), or the discipline of dispute (steelmanning / Rapoport\'s rules). Employ at least one negative inversion (Rarely / Not only / Seldom), one complex concessive clause (Much as / However much / To be sure), and a parallel tricolon.',
      prepare: 'Keywords only: hierarchy of evidence · counterfactuals · smartness paradox & scout mindset · communicative rationality vs dark patterns · steelmanning & Rapoport\'s rules · negative inversion · concession. Do not script.',
      grammar: 'Negative inversion (Rarely do individuals, Not only does steelmanning); advanced concession (Much as we might pride ourselves, To be sure); counterfactual conditionals; balanced tricolons',
      targets: ['proportion belief to the evidence', 'the ladder of causation and counterfactuals', 'the smartness paradox and scout mindset', 'communicative rationality versus covert manipulation', 'steelmanning and the principle of charity'],
      rubric: [
        'Synthesizes multiple Module 6 themes (epistemology, causation, motivated reasoning, rhetoric, debate) with intellectual depth',
        'Accurately employs negative inversion, advanced concession, and balanced tripartite phrasing',
        'Demonstrates mastery of critical thinking and philosophical vocabulary',
        'Delivers a fluent, commanding, and ethically generous C1 spoken production'
      ]
    }
  };

  /* ==========================================================================
     MODULE 7 REVIEW · WRITING & VOICE (Units 30–32)
     ========================================================================== */
  K.reviews['7'] = {
    id: '7',
    title: 'Writing & Voice',
    units: ['30', '31', '32'],
    question: 'How do sentence architecture, restraint, and intellectual sovereignty combine to create an authentic authorial voice in English?',
    grammarTargets: 'Syntactic modulation · colon, semicolon, and em-dash control · nominalization elimination · stylistic anaphora · radical restraint & qualifier deletion · complete C1 grammatical synthesis',
    reasoningTargets: 'Authorial voice vs false erudition · the thesaurus trap · the iceberg theory · minimalism vs maximalism · argument mapping & five-pillar essay architecture · the provisional mind & intellectual sovereignty',
    retrieve: {
      lead: 'Retrieve and connect the core concepts and arguments developed across Units 30 through 32.',
      items: [
        { id: 'r7r1', unit: '30', q: 'What is the "thesaurus trap," and why is it dangerous for advanced non-native writers?', guide: 'Replacing clear, precise words with obscure, multi-syllabic synonyms (e.g., "utilize" instead of "use") in a mistaken effort to sound intelligent, resulting in pretentious, suffocating jargon.' },
        { id: 'r7r2', unit: '30', q: 'How do colons, semicolons, and em-dashes function as cognitive pacing tools in prose?', guide: 'Colons announce core revelations; semicolons balance parallel autonomous claims in electric symmetry; em-dashes execute dramatic parenthetical interruptions.' },
        { id: 'r7r3', unit: '30', q: 'What is "syntactic modulation," and why is it the engine of authorial voice?', guide: 'The deliberate variation of sentence lengths and structures—mixing expansive periodic sentences with punchy short clauses—to create dynamic musical cadence and prevent monotony.' },
        { id: 'r7r4', unit: '31', q: 'Explain Ernest Hemingway’s "Iceberg Theory" of literary omission.', guide: 'Seven-eighths of an iceberg’s mass resides submerged beneath the surface; omitting known subtext creates immense emotional pressure in the silence between the words.' },
        { id: 'r7r5', unit: '31', q: 'Why are qualifying adverbs (*very, extremely, terribly, deeply*) termed "linguistic parasites"?', guide: 'They drain physical vitality from strong verbs and nouns, signaling authorial insecurity and telling the reader how to feel rather than letting reality carry its own weight.' },
        { id: 'r7r6', unit: '31', q: 'How does concrete sensory grounding differ from abstract emotional claims in prose?', guide: 'Concrete physical nouns and actions activate the reader’s mirror neurons and visceral empathy, whereas abstract labels leave the nervous system cold.' },
        { id: 'r7r7', unit: '32', q: 'What is the historical meaning of Montaigne’s concept of the "essay" (*exagium / essayer*)?', guide: 'An essay is a weighing, an attempt, a trial—a living laboratory of human consciousness where an individual mind interrogates reality and practices self-authorship.' },
        { id: 'r7r8', unit: '32', q: 'What defines "intellectual sovereignty" and the "provisional mind" at the culmination of *A Mind in English*?', guide: 'The autonomous capacity to evaluate evidence, deconstruct power, and speak truth with authentic voice, while holding conclusions with conviction and remaining perpetually open to revision.' }
      ]
    },
    language: {
      lead: 'Transform, combine, and refine these sentences using the advanced stylistic and grammatical disciplines from Module 7.',
      items: [
        { id: 'r7l-g1', unit: '30', label: 'Eliminating nominalizations', orig: 'The realization of the implementation of the strategy was a facilitation of our success.', task: 'Rewrite using lean, active verbs.', target: 'Implementing the strategy accelerated our success.' },
        { id: 'r7l-g2', unit: '30', label: 'Colon for dramatic announcement', orig: 'The real secret of great writing is that you have to delete your favorite words.', task: 'Rewrite using a colon to announce the revelation after a complete clause.', target: 'The secret of great writing is deceptively simple: you must possess the courage to delete your favorite words.' },
        { id: 'r7l-g3', unit: '30', label: 'Semicolon for balanced antithesis', orig: 'Jargon hides insecurity. Simplicity demonstrates mastery.', task: 'Combine using a semicolon without coordinating conjunctions.', target: 'Jargon conceals intellectual insecurity; simplicity demonstrates absolute mastery.' },
        { id: 'r7l-g4', unit: '30', label: 'Em-dash for parenthetical rupture', orig: 'When we write under anxiety because we want to sound smart, we ruin our voice.', task: 'Rewrite using paired em-dashes to enclose the parenthetical interruption.', target: 'When we write under anxiety—desperate to sound like an imaginary scholar—we strangle our authentic voice.' },
        { id: 'r7l-g5', unit: '30', label: 'Syntactic modulation (Periodic to punchy)', orig: 'I studied for many years and then I finally understood that writing is about rhythm and it felt good.', task: 'Rewrite into an expansive periodic sentence followed by a punchy four-word clause.', target: 'Having spent years trapped in the awkward friction of mental translation, I finally discovered the rhythm of thought. The words flowed freely.' },
        { id: 'r7l-g6', unit: '31', label: 'Deleting qualifiers & adjective stacking', orig: 'The deeply horrifying, extremely terrible, and very sad accident devastated everyone.', task: 'Rewrite in lean, restrained prose using concrete physical grounding.', target: 'The train derailed in the fog, scattering iron and luggage across the snow; nobody spoke.' },
        { id: 'r7l-g7', unit: '31', label: 'Stylistic anaphora for emotional gravity', orig: 'The war took our houses, our money, and all our friends away from us.', task: 'Rewrite as an austere, three-part anaphoric sequence.', target: 'The war took the city. The war took the money. The war took the future.' },
        { id: 'r7l-g8', unit: '31', label: 'The Iceberg Theory of understatement', orig: 'She was weeping hysterically and screaming because her husband died.', task: 'Rewrite using Joan Didion’s clinical, understated restraint.', target: 'She set his watch on the bedside table, closed the door, and turned off the light.' },
        { id: 'r7l-g9', unit: '32', label: 'Introductory participle clause of synthesis', orig: 'I finished all thirty-two units of this book, and now I am ready to write my final essay.', task: 'Rewrite using an introductory perfect participle clause (Having traversed...).', target: 'Having traversed the thirty-two units of this curriculum, I stand equipped to articulate a sovereign intellectual thesis in the English language.' },
        { id: 'r7l-g10', unit: '32', label: 'Negative inversion for authorial authority', orig: 'True freedom does not lie in the volume of our words, but in the clarity of our thought.', task: 'Rewrite starting with "Rarely does..." or "Not in the volume of words...".', target: 'Not in the volume of our words, but in the uncompromising clarity of our thought, does true intellectual sovereignty reside.' },
        { id: 'r7l-g11', unit: '32', label: 'Balanced tripartite capstone tricolon', orig: 'A mind in English knows how to check evidence, respect others in debates, and write clearly.', task: 'Rewrite as a commanding, parallel C1 tricolon with matching infinitives.', target: 'To possess a mind in English is to proportion belief to evidence, to steelman those with whom we disagree, and to write with the white-hot flame of restraint.' },
        { id: 'r7l-g12', unit: '32', label: 'Master synthesis sentence', orig: 'Grammar is not just rules, but it helps us express our true thoughts in English.', task: 'Synthesize using a semicolon, a colon, and high-register philosophical vocabulary.', target: 'Grammar is not a prison of punitive rules; it is an expressive keyboard: every structure exists to give physical architecture to human thought.' }
      ]
    },
    steal: {
      lead: 'The ten essential C1 phrase chunks from Module 7 (Writing & Voice).',
      items: [
        { id: 'r7s1', chunk: 'the fingerprint of the mind', meaning: 'The unique stylistic, rhythmic, and intellectual identity conveyed in an author\'s prose.', unit: '30', tag: 'Authorial voice' },
        { id: 'r7s2', chunk: 'the thesaurus trap', meaning: 'The error of replacing simple, clear words with obscure, multi-syllabic synonyms to sound smart.', unit: '30', tag: 'Stylistic critique' },
        { id: 'r7s3', chunk: 'syntactic modulation', meaning: 'The deliberate variation of sentence lengths and structures to create musical rhythm and pacing.', unit: '30', tag: 'Sentence craft' },
        { id: 'r7s4', chunk: 'the iceberg theory', meaning: 'Hemingway’s aesthetic principle that the visible words gain power from the vast omitted subtext beneath.', unit: '31', tag: 'Literary restraint' },
        { id: 'r7s5', chunk: 'the white-hot flame of restraint', meaning: 'The intense emotional energy generated by extreme linguistic compression and self-discipline.', unit: '31', tag: 'Stylistic mastery' },
        { id: 'r7s6', chunk: 'the humility of subtraction', meaning: 'The artistic discipline of removing words to let the essential truth shine with greater force.', unit: '31', tag: 'Editing philosophy' },
        { id: 'r7s7', chunk: 'intellectual sovereignty', meaning: 'The condition of possessing autonomous, critical, and uncoerced cognitive independence in thought and language.', unit: '32', tag: 'Course capstone' },
        { id: 'r7s8', chunk: 'the architecture of self-authorship', meaning: 'The deliberate craft of constructing one’s own identity, worldview, and voice through language.', unit: '32', tag: 'Personal empowerment' },
        { id: 'r7s9', chunk: 'the provisional mind', meaning: 'The intellectual disposition that holds conclusions with rigor while remaining open to revision.', unit: '32', tag: 'Epistemic virtue' },
        { id: 'r7s10', chunk: 'the covenant between language and reality', meaning: 'The moral and intellectual commitment to use words to illuminate truth rather than deceive.', unit: '32', tag: 'Linguistic ethics' }
      ]
    },
    reading: {
      format: 'Interdisciplinary synthesis essay',
      title: 'The Architecture of Self-Authorship: Voice, Restraint, and the Sovereign Mind',
      standfirst: 'From the elimination of pretension to the white-hot flame of restraint, mastering writing in English is the ultimate act of intellectual liberation.',
      paras: [
        'When an individual sets out to master a second language, the journey is almost invariably imagined as a technical accumulation of assets: acquiring five thousand new vocabulary words, internalizing ninety grammar rules, and mastering the phonetics of foreign vowels. Yet as you arrive at the culmination of *A Mind in English*, a far more profound realization takes hold: to truly learn a language is not to acquire an external tool; it is to inhabit an alternative dimension of consciousness. Language is not the wrapping paper of thought; it is the very forge in which the self is authored.',
        'The primary obstacle to this self-authorship is fear: the paralyzing anxiety of appearing unsophisticated. As George Orwell warned in *Politics and the English Language*, this anxiety drives writers into the "thesaurus trap"—stitching together prefabricated phrases, hiding behind passive nominalizations, and inflating their diction with multi-syllabic Latinate jargon. The result is prose that is technically correct yet spiritually dead. To find an authentic authorial voice is not an act of addition, but an act of subtraction: it is the courage to strip away performative erudition and write the unvarnished truth with crystalline clarity.',
        'The engine of this authentic voice is syntactic modulation. When a writer masters the architecture of the sentence, punctuation ceases to be a set of bureaucratic rules and becomes the musical notation of consciousness. The colon announces a revelation; the semicolon balances parallel claims in electric symmetry; the em-dash introduces the sudden, intimate parenthetical whisper; and the periodic sentence sweeps the reader across an expansive landscape of ideas before landing on a four-word punchline. Voice is the distinct, unmistakable fingerprint of a mind moving freely across this expressive keyboard.',
        'When writing approaches overwhelming human subjects—grief, moral crisis, beauty, or historical injustice—this voice achieves its highest power through the discipline of restraint. Following Ernest Hemingway’s Iceberg Theory, we discover that the dignified momentum of prose comes from the seven-eighths submerged beneath the surface. By ruthlessly pruning qualifying adverbs, avoiding purple melodrama, and anchoring abstract claims in concrete sensory reality, the writer lets the unadorned truth carry its own crushing weight. Restraint is not emotional coldness; it is the white-hot flame of compression that respects the reader’s intelligence.',
        'Finally, in the Capstone Masterpiece, all seven modules of this curriculum coalesce into a unified monument of intellectual sovereignty. You have learned that possessing a mind in English means holding conclusions with deep conviction while maintaining the provisional humility of a scout; it means proportioning belief to evidence, steelmanning your opponents with profound charity, and submitting all public discourse to the unforced force of the better argument.',
        'The journey through these thirty-two units has prepared you not merely to speak English, but to live, think, and create within it. You have built an autonomous intellectual architecture that belongs to no one else. Go forward. Take the page. The voice is yours.'
      ],
      items: [
        { id: 'r7q1', type: 'mc', tag: 'Synthesis of Module 7', q: 'What central insight unifies the final module on Writing & Voice?', options: ['Writing requires using as many adjectives as possible to impress readers.', 'Authentic authorial voice in English is achieved through the subtraction of pretension, syntactic modulation, the discipline of the Iceberg Theory, and the attainment of intellectual sovereignty.', 'Essays should always be translated directly from Portuguese.', 'Good writers never revise their first drafts.'], answer: 1, explain: 'Module 7 integrates voice discovery, restraint, and the capstone synthesis of intellectual sovereignty.' },
        { id: 'r7q2', type: 'quote', tag: 'Voice and subtraction', q: 'Find the sentence explaining that finding an authorial voice is about removing pretension rather than adding decoration.', find: 'To find an authentic authorial voice is not an act of addition, but an act of subtraction', quote: 'To find an authentic authorial voice is not an act of addition, but an act of subtraction: it is the courage to strip away performative erudition and write the unvarnished truth with crystalline clarity.', explain: 'This highlights the core stylistic philosophy of voice through subtraction.' },
        { id: 'r7q3', type: 'mc', tag: 'Punctuation as musical notation', q: 'How does the essay characterize advanced punctuation marks (colons, semicolons, em-dashes)?', options: ['As unnecessary relics of ancient Latin.', 'As the musical notation of human consciousness that controls cognitive pacing, tension, and balance.', 'As symbols used only in legal contracts.', 'As decorative graphics to fill empty margins.'], answer: 1, explain: 'Punctuation is characterized as the musical notation directing the tempo and cognitive pacing of thought.' },
        { id: 'r7q4', type: 'mc', tag: 'The Iceberg Theory of restraint', q: 'Why does the text argue that pruning qualifying adverbs generates greater emotional intensity?', options: ['Because adverbs make text files too large to send by email.', 'Because deleting qualifiers forces strong verbs and concrete nouns to deliver their own kinetic impact, leaving emotional mass in the pressurized silence between the lines.', 'Because adverbs are legally prohibited in academic journals.', 'Because readers do not understand words ending in "-ly".'], answer: 1, explain: 'Deleting qualifiers allows unadorned concrete reality to carry its own devastating emotional weight.' },
        { id: 'r7q5', type: 'mc', tag: 'Intellectual sovereignty and the provisional mind', q: 'What defines the graduating scholar who possesses "a mind in English"?', options: ['Someone who speaks with an aristocratic British accent.', 'Someone who possesses autonomous critical discernment: proportioning belief to evidence, steelmanning adversaries, and authoring their own thought with authentic voice.', 'Someone who has memorized every word in the dictionary.', 'Someone who refuses to speak Portuguese.'], answer: 1, explain: 'A mind in English represents intellectual sovereignty, critical discernment, and authentic self-authorship.' },
        { id: 'r7q6', type: 'open', tag: 'Grammar in context · Syntactic Modulation', q: 'Analyze the syntactic modulation in paragraph 3 of the reading: how does the author alternate sentence lengths and structures to create momentum?', rubric: ['Expansive periodic sentences establish architectural complexity', 'Punctuation marks (colon, semicolon, em-dash) modulate internal clause rhythm', 'Punchy concluding clauses deliver decisive intellectual impact'] },
        { id: 'r7q7', type: 'open', tag: 'Reasoning · The Journey Across 32 Units', q: 'Trace the thematic evolution of *A Mind in English* from Unit 01 (Dormant Language) through Unit 16 (Language of Politics), Unit 24 (The Sacred), Unit 29 (Steelmanning), to Unit 32 (The Final Essay).', rubric: ['Unit 01–05: Reawakening dormant memory and personal identity', 'Unit 06–10: Intimacy, ethics, and human connection', 'Unit 11–16: Society, power, and political framing', 'Unit 17–20: Technology, capture, and modern convenience', 'Unit 21–24: Visual epistemology, memory, and the sacred', 'Unit 25–29: Causal inference, motivated reasoning, and the art of disagreement', 'Unit 30–32: Voice, restraint, and the sovereign capstone'] },
        { id: 'r7q8', type: 'open', tag: 'Synthesis · Self-Authorship', q: 'Formulate your personal definition of what it means to possess "intellectual sovereignty" in your own life after completing this book.', rubric: ['Ability to think independently and resist tribal cognitive capture', 'Command of authorial voice and the craft of disciplined prose in English', 'Commitment to the provisional mind, lifelong curiosity, and the covenant with reality'] }
      ]
    },
    reasoning: {
      lead: 'Deconstruct these final stylistic, philosophical, and architectural dilemmas from Module 7.',
      defs: [
        ['The Thesaurus Trap', 'Using complex synonyms to compensate for intellectual insecurity, destroying voice.'],
        ['The Iceberg Metric', 'Testing whether the unstated subtext carries the emotional weight of the scene.'],
        ['Argument Architecture', 'Designing a five-pillar long-form structure that builds in escalating momentum.'],
        ['Intellectual Sovereignty', 'Autonomous cognitive and linguistic independence in a second language.']
      ],
      items: [
        {
          id: 'r7t1', unit: '30', tag: 'Stylistic Diagnosis',
          scenario: 'A student submits a draft containing the sentence: "The realization of the optimization of pedagogical methodologies facilitates the amelioration of cognitive acquisition." ',
          task: 'Diagnose the stylistic illness in this sentence, identify the nominalizations, and rewrite it in 8 words of lean, muscular C1 prose.',
          guide: 'Identify the five nominalizations (-tion) and rewrite with active verbs: "Better teaching methods help students learn more effectively."'
        },
        {
          id: 'r7t2', unit: '30', tag: 'Punctuation Architecture',
          scenario: 'A writer wants to convey the sudden, shocking realization that their political hero was corrupt. They write three flat simple sentences.',
          task: 'Orchestrate the three sentences into a single dynamic sentence using an introductory periodic clause, an em-dash, and a colon.',
          guide: 'Build suspense across the dependent clause, insert the parenthetical em-dash, and land on the colon for the decisive reveal.'
        },
        {
          id: 'r7t3', unit: '31', tag: 'The Iceberg Test',
          scenario: 'A memoir chapter describes the author finding an old photograph of their deceased grandfather. The draft is filled with adjectives: "I felt an unimaginably deep, intensely painful, and terribly heartbreaking grief."',
          task: 'Apply Hemingway’s Iceberg Theory and Joan Didion’s restraint: delete all abstract emotion labels and rewrite the moment using three concrete sensory physical details.',
          guide: 'Focus on the smell of the coat, the worn silver edge of the frame, and the silent ticking of the wall clock.'
        },
        {
          id: 'r7t4', unit: '31', tag: 'Aesthetic Debate',
          scenario: 'A writing student claims: "Hemingway is the only correct way to write; Faulkner’s long, baroque sentences are just bad writing."',
          task: 'Deconstruct this claim using the maximalist defense: explain what unique psychological and historical dimensions Faulkner’s torrential prose achieves that minimalism cannot.',
          guide: 'Show that Faulkner’s expansive syntax recreates the suffocating density of historical memory and psychological frenzy.'
        },
        {
          id: 'r7t5', unit: '32', tag: 'Thesis Stress-Testing',
          scenario: 'A scholar drafts a capstone thesis: "Social media has both positive and negative effects on democracy, and we need to use it wisely."',
          task: 'Upgrade this bland, obvious thesis into a bold, high-precision C1 thesis statement incorporating tension, mechanism, and counterfactual depth.',
          guide: 'Frame the tension between democratic mobilization and algorithmic behavioral capture, specifying the institutional mechanisms required.'
        },
        {
          id: 'r7t6', unit: '30-32', tag: 'Final Synthesis',
          scenario: 'Reflect on the entire journey from Unit 01 to Unit 32. How has your conceptual understanding of "grammar" transformed from a set of restrictive rules into a keyboard of expressive freedom?',
          task: 'Draft a 150-word synthesis articulating the relationship between grammatical precision, ethical clarity, and authorial sovereignty.',
          guide: 'Connect syntactic structures (clefts, conditionals, inversions, participles) to the living architecture of human thought.'
        }
      ]
    },
    editing: {
      lead: 'Perform the final master editing challenge of A Mind in English: transform these weak, cluttered drafts into crystalline C1 prose.',
      items: [
        {
          id: 'r7e1',
          title: 'Challenge 1 · Weeding Out Nominalizations & Fixing Monotonous Rhythm',
          bad: `The utilization of the new educational platform was a facilitation of the improvement of student performance. There was an expectation that there would be an acceleration of progress because the software was good.`,
          task: `Revise using lean active verbs, a colon, and deliberate syntactic modulation.`,
          good: `Deploying the educational platform transformed student performance: students mastered concepts faster, engaged more deeply, and took ownership of their learning.`
        },
        {
          id: 'r7e2',
          title: 'Challenge 2 · Transforming Melodrama into the White-Hot Flame of Restraint',
          bad: `When the devastating earthquake struck, it was an unimaginably horrifying and deeply heartbreaking tragedy that caused immense suffering to all the innocent victims who cried in the ruins.`,
          task: `Rewrite with ruthless austerity, concrete sensory grounding, zero qualifying adverbs, and an austere short sentence.`,
          good: `The ground fractured at midnight. Concrete collapsed into dust, crushing sixty homes in five seconds; in the morning light, survivors searched the rubble in silence.`
        }
      ]
    },
    synthesis: {
      id: 'r7syn',
      kind: 'Module synthesis',
      title: 'The Architecture of Self-Authorship: Voice, Restraint, and the Sovereign Mind',
      min: 600,
      max: 900,
      main: true,
      prompt: `Synthesize the core inquiries of Module 7 (Writing & Voice): How do sentence architecture, restraint, and intellectual sovereignty combine to create an authentic authorial voice in English? In an expansive synthesis essay (600–900 words), evaluate the escape from the "thesaurus trap" (Unit 30), the power of the Iceberg Theory and sensory grounding (Unit 31), and the culmination of the sovereign mind in the Capstone Essay (Unit 32). Deploy syntactic modulation, punctuation control (colons, semicolons, em-dashes), austere anaphora, and the full range of C1 grammatical assets.`,
      guide: [
        'Introduction: Deconstruct the myth of linguistic fluency as mere speed; define the attainment of a mind in English as intellectual sovereignty.',
        'Body 1: Analyze authorial voice—syntactic modulation, weeding out nominalizations, avoiding the thesaurus trap, and orchestrating punctuation.',
        'Body 2: Explore literary intensity—the Iceberg Theory, Joan Didion’s clinical austerity, sensory grounding, and the courage of subtraction.',
        'Body 3: Address the balance of craft—minimalism vs baroque maximalism (Faulkner/Melville) and the architecture of the five-pillar long-form essay.',
        'Body 4: Synthesize the full 32-unit journey—how grammar operates as a keyboard of consciousness and self-authorship.',
        'Conclusion: Deliver a definitive valedictory manifesto for lifelong inquiry, epistemic modesty, and authentic voice.'
      ]
    },
    timed: {
      id: 'r7time',
      kind: 'Timed writing',
      title: 'The Sovereign Mind',
      min: 300,
      max: 450,
      timed: true,
      prompt: 'Respond concisely to the claim: “Writing well in English is simply a matter of learning advanced grammar rules and large vocabulary words; personal voice and restraint are irrelevant.” Deconstruct this claim using at least three core concepts from Module 7.',
      guide: [
        'Expose the fallacy of the "thesaurus trap" and nominalized jargon.',
        'Incorporate the Iceberg Theory, concrete sensory grounding, or syntactic modulation.',
        'Conclude with a clear standard defining writing as an authentic architecture of self-authorship.'
      ]
    },
    teach: {
      lead: 'Explain one of these key grammatical and structural mechanisms clearly to another learner.',
      points: [
        { id: 'syntacticmod', label: 'Syntactic modulation (alternating periodic and punchy short sentences)', unit: '30', ccq: 'good', hint: 'Check cadence: long expansive build followed by decisive short clause.' },
        { id: 'colonannounce', label: 'Colon for dramatic announcement (complete clause : core revelation)', unit: '30', ccq: 'good', hint: 'Check syntax: the clause before the colon must be grammatically complete.' },
        { id: 'semicolonbalance', label: 'Semicolon for balanced coordinate antithesis (clause ; parallel clause)', unit: '30', ccq: 'good', hint: 'Check independence: both sides of the semicolon must stand as complete sentences.' },
        { id: 'emdashrupture', label: 'Em-dash for parenthetical rupture (thought—sudden whisper—continuation)', unit: '30', ccq: 'good', hint: 'Check enclosure: use paired dashes for internal insertions or a single dash for endings.' },
        { id: 'nominaldiet', label: 'Nominalization elimination (converting -tion nouns back into active verbs)', unit: '30', ccq: 'good', hint: 'Check energy: identify who is acting and make them perform a strong verb.' },
        { id: 'icebergomission', label: 'The Iceberg Theory of subtext and omission', unit: '31', ccq: 'good', hint: 'Check pressure: let the unstated subtext create emotional tension between the lines.' },
        { id: 'sensorytransduct', label: 'Concrete sensory grounding vs abstract emotion labels', unit: '31', ccq: 'good', hint: 'Check mirror neurons: replace emotion words with tangible physical objects and actions.' },
        { id: 'anaphorabuild', label: 'Deliberate rhythmic anaphora (repeating initial structural phrases)', unit: '31', ccq: 'good', hint: 'Check cadence: repeat simple foundational units to build cumulative gravity.' }
      ]
    },
    areas: {
      grammar: ['Unit 30 · syntactic modulation, colons, semicolons, em-dashes and nominalization elimination', 'Unit 31 · stylistic anaphora, qualifier pruning and sensory noun grounding', 'Unit 32 · complete master synthesis of the full C1 grammatical keyboard (clefts, inversions, conditionals, participles, concessives)'],
      vocabulary: ['Units 30–32 · stylistics, rhetoric, literary craft, and capstone philosophy'],
      reading: ['Units 30–32 · Orwellian clarity, Didion\'s austerity, Montaigne\'s essayistic inquiry, and self-authorship'],
      reasoning: ['Units 30–32 · the thesaurus trap, the iceberg theory, minimalism vs maximalism, argument mapping, and the provisional mind']
    },
    listening: [
      {
        id: 'r7l1', title: 'The Voice in the Stone', format: 'Dialogue between the Course Creator and an Advanced Non-Native Author',
        file: '/audio/en/reviews/r07-listening-01.mp3', duration: 125, level: 'C1',
        audioReady: false,
        voice: 'Two adult scholars (Dr. Arthur Vance and Author Sofia Alvarez); warm, contemplative, British and Latin American English',
        passes: ['First listen · follow the reflection on how non-native writers achieve authentic sovereignty in English', 'Second listen · note syntactic modulation, colons, and semicolons in speech', 'Third listen · evaluate the concept of language as a living covenant with reality'],
        transcript: `Dr. Vance: Sofia, as we look back across the thirty-two units of this book, many students ask: Is it truly possible for a non-native speaker to write with the same authentic power and nuance as a native author?\n\nSofia: Arthur, I believe non-native writers often possess a profound hidden advantage. Because English is not our mother tongue, we never take it for granted. We don't inherit its clichés unconsciously; we examine every word with conscious care. When we write, we bring the creative friction between our native conceptual world and the vast architecture of English.\n\nDr. Vance: You move beyond the thesaurus trap.\n\nSofia: Exactly. When you stop trying to impersonate an imaginary native speaker and start using the language to author your own sovereign mind, something extraordinary happens: the prose ceases to be an academic exercise; it becomes the authentic fingerprint of your consciousness.\n\nDr. Vance: And that is the true culmination of A Mind in English: not merely knowing the rules, but possessing the courage to speak your truth with crystalline restraint.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Core thematic insight', q: 'What hidden advantage does author Sofia Alvarez attribute to advanced non-native writers?', options: ['They can write faster on computers.', 'They examine words with conscious care and bring creative friction between their native conceptual world and English, avoiding unconscious clichés.', 'They never have to study punctuation.', 'They are exempt from university grammar exams.'], answer: 1, explain: 'Non-native writers bring conscious linguistic deliberation and fresh conceptual perspectives.' },
          { id: 'q2', type: 'open', tag: 'Linguistic reflection', q: 'How does Dr. Vance define the ultimate culmination of *A Mind in English*?', rubric: ['Not merely knowing grammar rules or accumulating vocabulary', 'Possessing the intellectual sovereignty and courage to author one\'s own mind and speak truth with crystalline restraint'] }
        ]
      },
      {
        id: 'r7l2', title: 'The Open Door', format: 'Concluding valedictory master monologue',
        file: '/audio/en/reviews/r07-listening-02.mp3', duration: 120, level: 'C1',
        audioReady: false,
        voice: 'Solo narrator; resonant, inspiring, measured International English',
        passes: ['First listen · reflect on the transformation across all seven modules of the curriculum', 'Second listen · track the use of the full C1 grammatical keyboard', 'Third listen · carry this sovereign mind forward into your life'],
        transcript: `You have reached the end of the book, but you have arrived at the beginning of your voice.\n\nThink back to where you started: a dormant language, the hesitation of translation, the fear of sounding basic. And look at where you stand today: you command the architecture of the sentence; you know how to cross-examine evidence; you know how to dismantle political propaganda; you know how to steelman those who disagree with you; and you know how to write with the white-hot flame of restraint.\n\nYou have built a mind in English. It is not an imitation of someone else; it is the living, breathing sovereign architecture of your own thought.\n\nAs you step through this open door, carry these three disciplines with you: proportion your belief to the evidence; honor the dignity of those with whom you disagree; and speak the truth with crystalline clarity. The road is yours. The voice is yours. The mind is yours.`,
        questions: [
          { id: 'q1', type: 'mc', tag: 'Final valedictory message', q: 'What three core disciplines does the speaker ask the graduating scholar to carry forward into the world?', options: ['1. Memorize more idioms; 2. Buy expensive books; 3. Win every argument.', '1. Proportion belief to evidence; 2. Honor the dignity of those who disagree (steelmanning); 3. Speak truth with crystalline clarity.', '1. Forget Portuguese completely; 2. Move to London; 3. Work in finance.', '1. Avoid writing long essays; 2. Only read social media; 3. Stop studying grammar.'], answer: 1, explain: 'The three core disciplines synthesize evidence calibration, intellectual charity, and authentic authorial truth.' },
          { id: 'q2', type: 'open', tag: 'Final capstone reflection', q: 'Write a two-sentence personal reflection on how your journey through *A Mind in English* has transformed your intellectual independence in the language.', rubric: ['Reflects on the shift from mechanical translation to autonomous intellectual sovereignty', 'Expresses personal voice with syntactic control and crystalline restraint'] }
        ]
      }
    ],
    speaking: {
      id: 'm7s1', label: 'SAY IT · REVIEW', level: 'B2+ → C1', seconds: [90, 150],
      prompt: 'Deliver your final valedictory synthesis on Module 7 (Writing & Voice) and the entire journey of A Mind in English: In 90–150 seconds, evaluate how your authorial voice and intellectual sovereignty have been constructed. Connect at least three dimensions: escaping the thesaurus trap & syntactic modulation (Unit 30), the Iceberg Theory & writing with restraint (Unit 31), and the provisional mind & capstone synthesis across all seven modules (Unit 32). Employ at least one cleft sentence, one negative inversion, one counterfactual conditional, and a balanced parallel tricolon.',
      prepare: 'Keywords only: thesaurus trap & syntactic modulation · Iceberg Theory & restraint · capstone synthesis & provisional mind · clefts · negative inversion · tricolon. Do not script.',
      grammar: 'Cleft sentences; negative inversion (Rarely, Not only); counterfactual conditionals (Had I not); balanced tripartite structures; advanced punctuation awareness in spoken cadence',
      targets: ['the fingerprint of the mind', 'the thesaurus trap and nominalization diet', 'the iceberg theory and the white-hot flame of restraint', 'intellectual sovereignty and self-authorship', 'the provisional mind and the covenant with reality'],
      rubric: [
        'Synthesizes Module 7 and the entire 32-unit curriculum with commanding intellectual depth and emotional maturity',
        'Effortlessly integrates cleft sentences, negative inversion, counterfactuals, and balanced tricolons',
        'Demonstrates complete mastery of authorial voice, stylistic craft, and philosophical vocabulary',
        'Delivers an inspiring, sovereign, and crystalline final C1 spoken masterpiece'
      ]
    }
  };
})(window.KLANG);
