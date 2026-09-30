/* UNIT 29 · THE ART OF DISAGREEMENT */
(function (K) {
  K.units['29'] = K.makeUnit('29', {
    module: 6, title: 'The art of', titleEm: 'disagreement',
    question: 'Can we disagree strongly without simplifying the person we disagree with?',
    knowLead: `In our polarized public culture, disagreement has become synonymous with warfare. When confronted with an opposing viewpoint, the instinctive modern reaction is not to listen, but to attack: to reduce the opponent’s argument to a ridiculous caricature, attribute the worst possible motives to their character, and declare total victory in an echo chamber of like-minded partisans. This practice—known in logic as the "strawman fallacy"—may provide cheap dopamine and social media applause, but it destroys the possibility of genuine intellectual progress. Is it possible to disagree with fierce, uncompromising clarity while simultaneously treating your opponent’s position with maximum intellectual charity? Consider the discipline of steelmanning as you read.`,
    terms: [
      ['Steelmanning', `The intellectual practice of formulating the strongest, most persuasive, and most charitable possible version of an opponent\'s argument before attempting to refute it.`],
      ['Strawmanning', `The logical fallacy of misrepresenting, exaggerating, or oversimplifying an opponent\'s position to make it easier to attack and defeat.`],
      ['Rapoport\'s Rules', `A set of four conversational principles formulated by game theorist Anatol Rapoport (and popularized by Daniel Dennett) for delivering successful critical commentary in disagreements.`],
      ['Ideological Turing test', `Bryan Caplan\'s test of intellectual empathy: the ability to articulate an opposing ideology so accurately that external observers cannot distinguish your summary from a genuine believer\'s words.`],
      ['Adversarial collaboration', `A scientific methodology (pioneered by Daniel Kahneman) where two researchers holding opposing hypotheses jointly design an experiment to empirically test their disagreement.`]
    ],
    views: [
      'Two perspectives on constructive disagreement',
      'The steelmanning / charitable stance',
      `True intellectual strength is demonstrated by defeating an opponent\'s best arguments, not their weakest caricatures. Expressing cognitive empathy and steelmanning the other side elevates truth and dismantles tribal hostility.`,
      'The boundaries of tolerance stance',
      `Charitable engagement assumes good faith. When dealing with bad-faith propaganda, conspiracy theories, or dehumanizing hate speech, granting intellectual dignity to toxic ideas risks normalizing fascism and eroding democratic norms.`,
      `The core challenge is practicing maximum intellectual charity with good-faith interlocutors while maintaining firm boundaries against bad-faith manipulation.`
    ],
    knowPrompt: `When someone passionately disagrees with you about politics or ethics, is your immediate instinct to find the flaw in their argument or to understand what fundamental value or fear motivates their perspective?`,
    knowGuide: [
      `Distinguish between understanding an opponent\'s cognitive framework and agreeing with their ultimate conclusion.`,
      `Reflect on why attacking an oversimplified caricature fails to persuade the other person.`
    ],
    read: {
      main: {
        format: 'Philosophical & rhetorical essay', title: 'The Discipline of the Steelman: Reason, Charity, and the Ethics of Dispute',
        standfirst: `To defeat an opponent\'s weakest caricature is a hollow victory; genuine intellectual triumph requires confronting their strongest truth.`,
        pull: { after: 4, text: `You have no right to an opinion until you can state the opposing view better than the person holding it.` },
        notes: { 1: `<b>Daniel Dennett</b> codified Anatol Rapoport’s rules for critical commentary in his 2013 book <i>Intuition Pumps and Other Tools for Thinking</i>.`, 3: `Nobel laureate <b>Daniel Kahneman</b> championed \'adversarial collaboration\' to resolve bitter scientific feuds.` },
        paras: [
          `In his 2013 philosophical guide *Intuition Pumps and Other Tools for Thinking*, American philosopher Daniel Dennett lamented the degraded state of contemporary intellectual debate. In an era dominated by television punditry and digital flame wars, public argument had degenerated into a predictable gladiatorial circus. When two interlocutors clash, each immediately seizes upon the opponent’s most clumsy phrasing, highlights their most extreme partisans, and constructs a grotesque, hollow caricature—a "strawman"—which they proceed to demolish with righteous theatrical fury. The audience cheers, the partisan base is energized, and not a single microgram of genuine insight is generated.`,
          `To rescue public discourse from this sterile arena of mutual contempt, Dennett resurrected a set of conversational rules originally formulated by mathematical game theorist Anatol Rapoport. Rapoport’s Rules establish a rigorous, four-step moral and intellectual protocol for engaging in critical commentary. First: you must attempt to re-express your target’s position so clearly, vividly, and fairly that your target says, "Thank you, I wish I’d thought of putting it that way." Second: you must list any points of agreement (especially if they are not matters of general consensus). Third: you must mention anything you have learned from your target. Only when you have satisfied these three demands, Dennett argued, are you permitted to utter so much as a single syllable of rebuttal.`,
          `This radical protocol forms the operational foundation of what modern philosophers term "steelmanning." Steelmanning is the diametrical opposite of strawmanning: it is the deliberate practice of constructing the strongest, most eloquent, and most defensible version of your opponent’s argument before you attempt to challenge it. If your opponent’s argument contains a factual error or an ambiguous phrasing, you do not exploit it for a cheap debater’s point; instead, you fix the flaw, strengthen the premise, and present the case with maximum intellectual charity. Only when you have dismantled the fortress at its absolute strongest point can you claim a genuine intellectual victory.`,
          `The benefits of steelmanning are profound, both epistemologically and psychologically. Epistemically, steelmanning protects you from intellectual complacency. When you only engage with the foolish caricatures of your opponents, you deceive yourself into believing your own worldview is flawless. By forcing yourself to pass what economist Bryan Caplan calls the "Ideological Turing Test"—the ability to explain your opponent\'s philosophy so convincingly that outside listeners cannot tell you disagree—you uncover the hidden assumptions, blind spots, and legitimate trade-offs inherent in your own position.`,
          `Psychologically, steelmanning dismantles the existential defensiveness that paralyzes human dialogue. Rarely does an individual surrender their core convictions when they feel insulted, patronized, or misunderstood. When an opponent realizes that you have listened deeply, comprehended their core values, and articulated their concerns with dignity, their subconscious "soldier mindset" disarms. The encounter ceases to be a territorial war of identity; it transforms into a shared, collaborative quest for truth.`,
          `Ultimately, mastering the art of disagreement is not about achieving timid, spineless compromise, nor does it require abandoning your moral convictions. It is about recognizing that truth is rarely the private monopoly of a single faction. By cultivating the courage of intellectual charity, we elevate the quality of public debate, build democratic resilience, and honor the shared human capacity for reason.`
        ]
      },
      counter: {
        format: 'Critical political perspective', title: 'The Paradox of Good Faith: The Limits of Intellectual Charity',
        standfirst: `Steelmanning assumes an interlocutor who respects the truth; when applied to bad-faith propaganda, it becomes a weapon of self-destruction.`,
        paras: [
          `While Rapoport’s Rules and steelmanning are noble ideals within academic seminars and scientific peer review, extending them unconditionally to modern political warfare is a perilous category error.` ,
          `Steelmanning operates on a foundational premise: that both parties are participating in good faith, committed to evidence, and willing to be persuaded by reason. Yet in the real world of contemporary politics, many influential actors are bad-faith propagandists, climate denialists, and political demagogues whose explicit objective is not dialogue, but the destruction of democratic norms, the dissemination of hate speech, and the destabilization of truth.` ,
          `When a responsible intellectual attempts to "steelman" a fascist conspiracy theory or a white supremacist doctrine, they commit a profound moral error: they lend intellectual respectability, coherence, and oxygen to ideas that deserve unyielding public condemnation. As Karl Popper warned in his famous "Paradox of Tolerance," a tolerant society that extends unconditional tolerance to the intolerant will inevitably be destroyed by the intolerant.` ,
          `We must therefore distinguish between genuine intellectual disagreement—which demands maximum charity—and bad-faith political sabotage, which demands uncompromising exposure and moral resistance.`
        ]
      }
    },
    sources: [
      { title: 'Intuition Pumps and Other Tools for Thinking (Daniel C. Dennett)', url: 'https://wwnorton.com/books/Intuition-Pumps-And-Other-Tools-for-Thinking/', note: 'Classic philosophical guide codifying Rapoport\'s rules for critical commentary.' },
      { title: 'The Open Society and Its Enemies (Karl Popper)', url: 'https://www.routledge.com/The-Open-Society-and-Its-Enemies/Popper/p/book/9780415610215', note: 'Essential text formulating the Paradox of Tolerance in democratic societies.' },
      { title: 'Thinking, Fast and Slow (Daniel Kahneman)', url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow', note: 'Includes Kahneman\'s groundbreaking methodology of adversarial collaboration.' }
    ],
    interpret: [
      { id: '29i1', type: 'mc', tag: 'Main idea', q: `What is the core philosophical discipline of "steelmanning" as defined in the main essay?`, options: [`Making weapons out of industrial steel for political protests.`, `Constructing the strongest, most charitable, and most defensible version of an opponent’s argument before attempting to refute it.`, `Refusing to speak to anyone who holds a different political opinion.`, `Winning debates by shouting louder than the other person.`], answer: 1, explain: `Steelmanning involves building the strongest possible version of an opponent's case prior to critique.` },
      { id: '29i2', type: 'mc', tag: 'Detail', q: `According to Anatol Rapoport’s Rules, what must a thinker do BEFORE uttering a single word of rebuttal?`, options: [`Pay the opponent a monetary fee.`, `Restate the opponent\'s position so well that they thank you, list points of agreement, and acknowledge what you learned from them.`, `Consult a government official.`, `Write an essay in Latin.`], answer: 1, explain: `Rapoport's rules demand fair re-statement, listing agreement, and acknowledging learning before rebutting.` },
      { id: '29i3', type: 'mc', tag: 'Inference', q: `What is the psychological consequence when you articulate an opponent\'s concerns with genuine charity and accuracy?`, options: [`The opponent immediately starts crying.`, `Their subconscious defensive "soldier mindset" disarms, transforming a territorial war into a collaborative truth-seeking dialogue.`, `They immediately vote for your preferred political candidate.`, `They lose the ability to speak English.`], answer: 1, explain: `Deep listening and charitable articulation disarm emotional defensiveness, enabling productive dialogue.` },
      { id: '29i4', type: 'quote', tag: 'Evidence', q: `Which sentence from the text defines the "Ideological Turing Test"?`, find: `ability to explain your opponent's philosophy so convincingly that outside listeners cannot tell you disagree`, quote: `the "Ideological Turing Test"—the ability to explain your opponent\'s philosophy so convincingly that outside listeners cannot tell you disagree—you uncover the hidden assumptions, blind spots, and legitimate trade-offs inherent in your own position.`, explain: `The text explicitly defines Caplan’s Ideological Turing Test.` },
      { id: '29i5', type: 'mc', tag: 'Synthesis', q: `What vital limitation does the counter-perspective raise against unconditional steelmanning?`, options: [`That steel is too expensive to use in philosophy departments.`, `That extending steelmanning to bad-faith demagogues and hate speech risks legitimizing toxic ideologies (Popper\'s Paradox of Tolerance) that seek to destroy democratic dialogue.`, `That people with high IQs never disagree with one another.`, `That all political debates should be decided by rolling dice.`], answer: 1, explain: `The counter-text warns against granting intellectual dignity to bad-faith actors and intolerant ideologies.` },
      { id: '29i6', type: 'mc', tag: 'Vocabulary in context', q: `In scientific research, what is meant by "adversarial collaboration"?`, options: [`Two scientists fighting physically in a laboratory.`, `A methodology where two researchers with opposing hypotheses jointly design an experiment to test their dispute empirically.`, `Filing lawsuits against rival academic journals.`, `Hiring private investigators to spy on opposing researchers.`], answer: 1, explain: `Adversarial collaboration brings opposing researchers together to co-design decisive empirical tests.` },
      { id: '29i7', type: 'mc', tag: 'Critical thinking', q: `Why does defeating a "strawman" caricature weaken the victor\'s own intellect over time?`, options: [`Because attacking weak arguments deceives the thinker into believing their own worldview is flawless, blinding them to their own trade-offs and assumptions.`, `Because straw damages computer screens.`, `Because writing rebuttals takes too much time.`, `Because caricatures are legally protected by copyright law.`], answer: 1, explain: `Fighting weak caricatures breeds intellectual complacency and conceals one's own blind spots.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Negative and limiting inversion for dramatic emphasis',
        lead: `C1 argumentative prose creates authoritative emphasis and stylistic drama by fronting negative or limiting adverbials (*Rarely, Seldom, Never, Not only, Little, Scarcely*), triggering subject-auxiliary inversion.`,
        examples: [
          `*Rarely does* an opponent surrender their convictions when insulted.`,
          `*Not only does* steelmanning disarm hostility, *but it also* reveals the blind spots of your own thesis.`,
          `*Seldom has* public discourse been so desperately in need of intellectual charity.`,
          `*Little did* the debaters realize that their mutual strawmanning was eroding public trust.`
        ],
        questions: [
          `Observe the auxiliary shift: "Rarely *an opponent surrenders*" (incorrect) vs "Rarely *does an opponent surrender*" (correct inversion).`,
          `How does opening a sentence with "Not only does X do Y, but it also..." heighten the rhetorical stakes of your claim?`
        ],
        explain: `Inversion disrupts predictable syntactic cadence. It functions as an intellectual spotlight, signaling to the reader that the inverted claim represents a core principle of your argument.`,
        compare: [
          [`Standard`, `People almost never change their minds during shouting matches.`],
          [`Inverted C1`, `Rarely do individuals update their factual beliefs amid the adrenaline of a vitriolic shouting match.`]
        ],
        practice: [
          { q: `Rewrite using negative inversion with "Seldom": "We seldom encounter someone who can accurately state the opposing argument."`, a: `Seldom do we encounter someone capable of articulating an opposing argument with genuine fidelity.` },
          { q: `Combine using "Not only... but also..." with inversion: (Fact 1: Steelmanning elevates debate; Fact 2: It forces us to examine our assumptions)`, a: `Not only does steelmanning elevate the caliber of public debate, but it also compels us to cross-examine our most cherished assumptions.` }
        ],
        radar: [
          `Ensure the auxiliary verb matches the tense and subject: *Rarely does he (present)* vs *Rarely did they (past)*.`,
          `Do not use inversion in every paragraph; reserve it for climactic moments of analysis or concluding judgments.`
        ],
        help: `Use inversion to frame pivotal insights: "Only when we have confronted an argument at its strongest point can we claim a meaningful intellectual victory."`
      },
      {
        title: 'Focus 2 · Multi-layered concession & ideological Turing tests',
        lead: `Sophisticated debate essays demonstrate intellectual maturity by embedding substantial concessions (*To be sure, Admitted, Of course, It is undeniable that*) before delivering nuanced, non-reductive rebuttals.`,
        examples: [
          `*To be sure*, bad-faith actors exist who exploit democratic norms. *Nevertheless*, treating all disagreement as malice destroys civic life.`,
          `*It is undeniable that* passionate rhetoric is necessary in politics; *yet*, passion severed from truth degenerates into demagoguery.`
        ],
        questions: [
          `Notice how starting with "To be sure..." validates a legitimate concern before introducing your primary counterpoint with "Nevertheless...".`,
          `How does demonstrating mastery of the opponent\'s strongest points make your eventual rebuttal far more devastating?`
        ],
        explain: `Weak writers fear conceding anything, worrying it will weaken their case. Elite C1 writers actively search for valid concessions because incorporating the opponent’s truth makes their own final synthesis bulletproof.`,
        compare: [
          [`Defensive`, `My opponent is completely wrong about taxes and knows nothing about economics.`],
          [`Multi-layered concession`, `To be sure, proponents of corporate tax cuts raise a valid point regarding capital mobility; nevertheless, the empirical evidence demonstrates that infrastructure investment yields far greater long-term productivity.`]
        ],
        practice: [
          { q: `Draft a concessive rebuttal using "To be sure... nevertheless...": (Opponent: Censoring hate speech stops violence; Your view: Censorship is weaponized by tyrants)`, a: `To be sure, suppressing hate speech stems from a noble desire to protect vulnerable groups; nevertheless, granting state authorities the power to define acceptable speech invariably creates an engine for authoritarian censorship.` }
        ],
        radar: [
          `Ensure the concession is substantive, not superficial; engage directly with the opponent's core moral anxiety.`
        ],
        help: `When structuring a debate essay, place your steelmanned concession immediately before your decisive rebuttal.`
      }
    ],
    vocab: [
      ['caricature', 'noun', 'A representation of a person or idea that exaggerates certain characteristics to make it appear ridiculous or weak.', 'He reduced the complex environmental proposal to a laughable caricature.', 'The debate descended into mutual caricatures.', ['grotesque caricature', 'simplistic caricature', 'unfair caricature'], ['distortion', 'parody', 'strawman'], 'Rhetorical noun.', '/ˈkær.ɪ.kə.tʃʊər/', 'accurate portrait'],
      ['charity', 'noun', 'The practice of judging others and their arguments with kindness, generosity, and the most favorable interpretation possible.', 'The principle of charity requires assuming your opponent is rational and sincere.', 'He evaluated the text with profound intellectual charity.', ['intellectual charity', 'principle of charity', 'interpretive charity'], ['generosity', 'magnanimity', 'benevolence'], 'Philosophical noun.', '/ˈtʃær.ə.ti/', 'hostility'],
      ['complacency', 'noun', 'A feeling of smug or uncritical satisfaction with oneself or one\'s achievements, accompanied by unawareness of deficiencies.', 'Attacking weak opponents breeds intellectual complacency.', 'We must guard against ideological complacency.', ['intellectual complacency', 'moral complacency', 'dangerous complacency'], ['smugness', 'self-satisfaction', 'indifference'], 'Psychological noun.', '/kəmˈpleɪ.sən.si/', 'vigilance'],
      ['adversarial', 'adjective', 'Involving or characterized by conflict, opposition, or hostility between opposing parties.', 'Adversarial collaboration turns rivalry into constructive science.', 'The legal system is fundamentally adversarial.', ['adversarial collaboration', 'adversarial relationship', 'adversarial politics'], ['hostile', 'opposing', 'antagonistic'], 'Formal adjective.', '/ˌæd.vəˈseə.ri.əl/', 'collaborative'],
      ['demolish', 'verb', 'To completely destroy, dismantle, or defeat an argument, theory, or structure.', 'The philosopher effortlessly demolished the flawed syllogism.', 'The evidence demolished the defense’s claims.', ['demolish an argument', 'demolish a theory', 'completely demolish'], ['dismantle', 'refute', 'shatter'], 'Formal verb.', '/dɪˈmɒl.ɪʃ/', 'construct'],
      ['interlocutor', 'noun', 'A person who takes part in a dialogue, conversation, or formal negotiation.', 'She listened carefully before responding to her interlocutor.', 'He treated his political interlocutors with deep dignity.', ['political interlocutor', 'intellectual interlocutor', 'respectful interlocutor'], ['conversational partner', 'dialogue partner', 'speaker'], 'Formal noun.', '/ˌɪn.təˈlɒk.jə.tər/', null],
      ['demagogue', 'noun', 'A political leader who seeks support by appealing to the desires and prejudices of ordinary people rather than using rational argument.', 'The demagogue exploited racial resentments to win the election.', 'Demagogues thrive in environments of economic despair.', ['dangerous demagogue', 'political demagogue', 'populist demagogue'], ['agitator', 'rabble-rouser', 'firebrand'], 'Political noun.', '/ˈdem.ə.ɡɒɡ/', null],
      ['resilience', 'noun', 'The capacity to recover quickly from difficulties, crisis, or polarization; toughness and adaptability.', 'Steelmanning builds democratic resilience in civil society.', 'The psychological resilience of the community was inspiring.', ['democratic resilience', 'institutional resilience', 'psychological resilience'], ['toughness', 'adaptability', 'fortitude'], 'Sociological noun.', '/rɪˈzɪl.jəns/', 'fragility'],
      ['vitriolic', 'adjective', 'Filled with bitter criticism, malicious hostility, or caustic malice.', 'The online debate degenerated into a vitriolic screaming match.', 'She was targeted with vitriolic attacks in the press.', ['vitriolic attack', 'vitriolic rhetoric', 'vitriolic abuse'], ['caustic', 'venomous', 'spiteful'], 'Formal adjective.', '/ˌvɪt.riˈɒl.ɪk/', 'conciliatory'],
      ['spineless', 'adjective', 'Lacking resolution, moral courage, or backbone; cowardly and indecisive.', 'Constructive dialogue is not about spineless compromise.', 'He was criticized for his spineless capitulation to the mob.', ['spineless compromise', 'spineless leader', 'spineless capitulation'], ['cowardly', 'irresolute', 'timid'], 'Evaluative adjective.', '/ˈspaɪn.ləs/', 'courageous']
    ],
    chunks: [
      ['the principle of charity', 'The philosophical rule that one should interpret an opponent’s statements in the most rational and strongest possible way.', 'Establishing critical framework', 'Philosophical · formal', 'Good philosophy is grounded in the principle of charity.', 'Guide respectful debate.', `Applying the principle of charity requires looking for truth before searching for errors.`, 'Core philosophical chunk.'],
      ['Rapoport\'s rules', 'The four-stage protocol for constructive disagreement and critical commentary.', 'Structuring respectful rebuttal', 'Methodological · academic', 'Dennett popularized Rapoport’s rules for intellectual debate.', 'Teach constructive argument.', `Following Rapoport’s rules transforms destructive conflict into illuminating dialogue.`, 'Dennett-Rapoport chunk.'],
      ['the ideological Turing test', 'The ability to articulate an opposing ideology so accurately that believers cannot distinguish you from an insider.', 'Testing cognitive empathy', 'Epistemological · critical', 'Can you pass the ideological Turing test for your political rivals?', 'Evaluate intellectual honesty.', `Passing the ideological Turing test is the ultimate proof of intellectual empathy.`, 'High-register testing chunk.'],
      ['adversarial collaboration', 'A research partnership where opposing thinkers jointly design empirical tests to resolve disputes.', 'Resolving scientific feuds', 'Methodological · formal', 'Kahneman pioneered adversarial collaboration to resolve bitter psychology debates.', 'Propose constructive science.', `Instead of trading insults, the researchers engaged in adversarial collaboration.`, 'Kahnemanian science chunk.'],
      ['rarely does an opponent surrender', 'Inverted formula highlighting the futility of aggressive insults in debate.', 'Emphasizing psychological reality', 'Stylistic · rhetorical', 'Rarely does an opponent surrender their convictions under direct insult.', 'Advise against aggression.', `Rarely does an ideological adversary change their mind when treated with contempt.`, 'Inverted C1 chunk.'],
      ['not only does it disarm hostility', 'Inverted structure highlighting the dual cognitive and emotional benefits of steelmanning.', 'Elevating rhetorical stakes', 'Stylistic · analytical', 'Not only does it disarm hostility, but it also reveals truth.', 'Praise steelmanning.', `Not only does steelmanning disarm hostility, but it also deepens our own comprehension.`, 'Emphatic inversion chunk.'],
      ['to be sure... nevertheless', 'Classic multi-layered concessive formula for balanced debate.', 'Structuring nuanced rebuttal', 'Formal · essayistic', 'To be sure, the cost is high; nevertheless, the investment is essential.', 'Introduce balanced contrast.', `To be sure, risks exist; nevertheless, inaction carries far greater perils.`, 'Standard C1 essay connector.'],
      ['the paradox of tolerance', 'Karl Popper’s insight that unlimited tolerance must lead to the disappearance of tolerance.', 'Analyzing limits of debate', 'Philosophical · political', 'Popper formulated the paradox of tolerance to defend open societies.', 'Discuss extremist speech.', `The paradox of tolerance reminds us that democracies cannot tolerate those who seek to destroy dialogue.`, 'Popperian political chunk.'],
      ['a sterile arena of mutual contempt', 'A polarized environment where opposing factions only trade insults without learning.', 'Critiquing modern discourse', 'Cultural · essayistic', 'Social media has degenerated into a sterile arena of mutual contempt.', 'Condemn toxic politics.', `We must escape the sterile arena of mutual contempt and recover genuine civil discourse.`, 'Expressive critique chunk.'],
      ['an unyielding public condemnation', 'Firm, uncompromising moral rejection of bad-faith or dehumanizing ideologies.', 'Setting moral boundaries', 'Ethical · political', 'Fascist doctrines deserve unyielding public condemnation.', 'Establish ethical limits.', `Certain hateful doctrines do not deserve intellectual steelmanning; they warrant unyielding public condemnation.`, 'Ethical boundary chunk.']
    ],
    collocations: [
      [`Philosophers apply the principle of ______ to evaluate arguments.`, [`charity`, `paternalism`, `dissonance`, `tableau`], 0, `Principle of charity is the standard philosophical term.`],
      [`Rarely ______ an opponent change their mind when attacked with insults.`, [`does`, `is`, `has`, `would`], 0, `Rarely does an opponent... is the correct inverted auxiliary syntax.`],
      [`The researchers engaged in ______ collaboration to resolve their dispute.`, [`adversarial`, `spurious`, `profane`, `salvage`], 0, `Adversarial collaboration is Daniel Kahneman's established methodology.`],
      [`Karl Popper formulated the famous paradox of ______.`, [`tolerance`, `studium`, `numerate`, `cadence`], 0, `Paradox of tolerance is Popper's classic political concept.`]
    ],
    upgrades: [
      [`I easily beat my opponent because his ideas are totally stupid.`, `Rather than attacking a flimsy strawman caricature, genuine intellectual rigor requires steelmanning the opponent\'s thesis to dismantle it at its most formidable point.`],
      [`People never agree with you if you call them names.`, `Rarely do individuals update their convictions when subjected to vitriolic insults and intellectual contempt.`],
      [`Even though bad people exist, we should still try to be fair in debates.`, `To be sure, bad-faith actors and demagogues test the limits of civil discourse; nevertheless, abandoning the principle of charity with legitimate interlocutors degrades public debate into a sterile arena of mutual contempt.`]
    ],
    think: {
      title: 'Steelmanning, Adversarial Collaboration, and the Ethics of Dispute',
      lead: 'Deconstruct controversial debates using the four steps of Rapoport\'s Rules and evaluate the boundaries of intellectual charity.',
      defs: [
        ['The Steelman Heuristic', `The deliberate cognitive practice of identifying the strongest core truth in an opposing view and arguing against that elevated version rather than its flawed expressions.`],
        ['The Good-Faith Criterion', `The baseline ethical requirement that both participants in a debate value empirical reality, practice intellectual honesty, and remain open to being persuaded.`]
      ],
      items: [
        {
          id: '29t1',
          tag: 'Applied Steelmanning',
          title: 'The Ideological Turing Test in Action',
          task: `Select a controversial topic you care deeply about (e.g., universal basic income, nuclear energy, or speech regulation). Formulate a 150-word summary of the OPPOSING view that satisfies the Ideological Turing Test.`,
          guide: `Ensure that an actual adherent of that view would read your summary and say: "Yes, that accurately and fairly expresses my core concern."`
        },
        {
          id: '29t2',
          tag: 'Methodological Application',
          title: 'Designing an Adversarial Collaboration',
          task: `Two economists disagree fiercely: Economist A believes raising the minimum wage increases unemployment, while Economist B believes it stimulates aggregate demand without job loss. Design an empirical experiment they could jointly run to test the disagreement.`,
          guide: `Identify pre-registered metrics, regional controls, wage thresholds, and a mutual agreement on what data outcome would falsify each position.`
        },
        {
          id: '29t3',
          tag: 'Ethical Demarcation',
          title: 'The Limits of Charity',
          task: `Deconstruct Karl Popper\'s "Paradox of Tolerance." How can a democratic society distinguish between legitimate, uncomfortable intellectual dissent (which must be protected) and bad-faith totalitarian propaganda (which must be resisted)?`,
          guide: `Examine the commitment to peaceful reason, adherence to empirical truth, and the refusal to use violence or dehumanization against fellow citizens.`
        },
        {
          id: '29t4',
          tag: 'Debate Architecture Lab',
          title: 'Executing Rapoport’s Four Steps',
          task: `Structure a four-part response to a difficult claim: (1) Charitable re-statement, (2) List of agreements, (3) What was learned, and (4) Calibrated rebuttal.`,
          guide: `Follow Dennett\'s sequence strictly, ensuring that the rebuttal emerges only after deep empathy and common ground have been established.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Constructing a Complete Debate Essay: Thesis, Steelman, Rebuttal, and Concession',
        text: `The debate essay represents the pinnacle of intellectual argumentation. Instead of engaging in one-sided propaganda, a master essayist begins with a bold thesis, builds a formidable steelman of the opposing view, acknowledges shared common ground through multi-layered concession, and delivers a decisive, non-reductive rebuttal using negative inversion and C1 precision.`,
        weak: `Nuclear energy is great and anyone who opposes it is stupid and afraid of science. Solar and wind are not enough.`,
        strong: `To be sure, critics of nuclear power raise legitimate concerns regarding high capital costs, catastrophic tail-risk, and the unresolved politics of long-term radioactive waste. Rarely does an energy technology carry such immense generational responsibility. Nevertheless, when evaluated against the existential threat of planetary decarbonization, advanced nuclear reactors offer an indispensable, high-density baseload power source that renewable grids cannot reliably match.`
      },
      short: {
        kind: 'Steelman response',
        title: 'Steelmanning an Opposing Viewpoint',
        min: 180,
        max: 260,
        prompt: `Select a contentious public policy or ethical debate where you hold a strong personal opinion. In a concise response (180–260 words), apply Rapoport\'s first two rules: articulate the strongest possible version of the opposing argument (steelman) and list at least two points of legitimate common ground. Deploy at least one negative inversion (*Rarely, Seldom, Not only*).`,
        support: [
          `State the debate clearly.`,
          `Articulate the opponent\'s strongest values, concerns, and evidence with deep intellectual charity.`,
          `Deploy negative inversion to emphasize a core insight (*Not only do proponents highlight...*).`,
          `List explicit points of shared common ground.`
        ],
        guide: [
          `Pass the Ideological Turing Test: write with genuine respect and cognitive empathy.`,
          `Use advanced discourse vocabulary: *principle of charity*, *steelmanning*, *legitimate trade-offs*, *common ground*.`
        ]
      },
      main: {
        kind: 'Debate essay',
        title: 'The Art of Disagreement: Thesis, Steelman, Rebuttal, and the Ethics of Dispute',
        min: 500,
        max: 750,
        main: true,
        prompt: `Can we disagree strongly without simplifying the person we disagree with? In a fully structured debate essay (500–750 words), take a definitive position on a controversial philosophical or social issue. Rather than attacking a strawman, build a formidable steelman of the opposing case following Rapoport’s rules, incorporate multi-layered concession (*To be sure... nevertheless*), and deliver a rigorous rebuttal. Deploy negative and limiting inversion, contrastive discourse markers, and sophisticated C1 academic vocabulary throughout.`,
        support: [
          `Introduction (80–120 words): Introduce the controversy and state your bold, clear thesis; establish your commitment to intellectual charity.`,
          `Section 1 · The Steelman (140–180 words): Articulate the opposing perspective at its most formidable, coherent, and evidence-backed strength (pass the Ideological Turing Test).`,
          `Section 2 · Concession and Common Ground (120–150 words): Deploy multi-layered concession (*To be sure... It is undeniable that...*); identify points of genuine shared values and what has been learned from the opponent.`,
          `Section 3 · The Decisive Rebuttal (140–180 words): Deliver your core rebuttal, deploying negative inversion (*Rarely does...*, *Not only does...*); expose the critical trade-off or empirical vulnerability in the opposing case.`,
          `Conclusion (80–120 words): Synthesize the debate; deliver a final verdict that affirms your thesis while preserving mutual human dignity.`
        ],
        guide: [
          `Ensure flawless structure: Thesis -> Steelman -> Concession -> Rebuttal -> Synthesis.`,
          `Incorporate at least two instances of negative inversion (*Rarely does...*, *Seldom has...*, *Not only does...*).`,
          `Deploy essential vocabulary: *steelmanning*, *strawman fallacy*, *principle of charity*, *Rapoport\'s rules*, *ideological Turing test*, *the paradox of tolerance*.`,
          `Maintain an articulate, commanding, and ethically generous essayistic voice.`
        ]
      }
    },
    edit: {
      checklist: [
        `Does the essay follow the complete five-stage debate structure (Thesis, Steelman, Concession, Rebuttal, Synthesis)?`,
        `Are negative and limiting inversions (*Rarely does...*, *Not only does...*) formed with accurate auxiliary and tense agreement?`,
        `Is the steelman genuinely charitable and formidable rather than a disguised caricature?`,
        `Are concessive markers (*To be sure... nevertheless*) deployed with high-register nuance?`,
        `Is the tone consistently formal, intellectually generous, and logically uncompromising?`
      ],
      challenges: [
        {
          id: '29e1',
          title: 'Transforming a Strawman into a Formidable Steelman',
          bad: `People who hate AI just want to live in caves and destroy technology because they are lazy and afraid of change.`,
          task: `Rewrite into a charitable, high-register steelman articulating the legitimate risks of AI (*epistemic deskilling, labor dislocation, alignment problem, existential risk*).`,
          good: `To be sure, thoughtful critics of unconstrained AI development are not luddites; rather, they raise vital concerns regarding widespread cognitive deskilling, economic labor dislocation, and the unresolved technical challenge of existential alignment.`
        },
        {
          id: '29e2',
          title: 'Polishing Negative Inversion in Rebuttal',
          bad: `The opposition doesn't understand that solar energy is bad when it is cloudy, and they also ignore the cost of batteries.`,
          task: `Revise using negative inversion (*Not only do critics fail to...*, *Seldom do they consider...*) and formal energy policy vocabulary.`,
          good: `Not only do proponents of immediate grid transition understate the intermittency crisis during winter troughs, but seldom do they account for the staggering capital expenditure required for grid-scale battery storage.`
        }
      ]
    },
    retrieve: {
      content: `What are Anatol Rapoport\'s four rules for delivering constructive critical commentary in a disagreement?`,
      contentGuide: `1. Re-express the target's position with total fairness and clarity; 2. List points of agreement; 3. Mention what you have learned; 4. Deliver your calibrated rebuttal.`,
      grammar: `Rewrite this sentence using negative inversion with "Not only": "Steelmanning disarms an opponent's defensiveness and it also forces you to examine your own biases."`,
      grammarGuide: `Expected: "Not only does steelmanning disarm an opponent's defensiveness, but it also forces you to examine your own biases."`,
      reasoning: `How does Karl Popper\'s "Paradox of Tolerance" define the legitimate ethical boundary where the principle of charity must yield to moral resistance?`,
      reasoningGuide: `Popper argued that a tolerant society must not extend unconditional tolerance to those who reject reason, practice bad-faith deception, and use violence or totalitarian intolerance to destroy the democratic framework of dialogue.`,
      summary: `In Unit 29, you completed Module 6 by mastering the highest art of intellectual dispute: steelmanning. You learned negative inversion, Rapoport\'s rules, the Ideological Turing Test, and the architecture of the complete debate essay.`
    }
  });

  K.units['29'].listening = [
    {
      id: '29l1',
      title: 'Dialogue: The Art of the Steelman',
      format: 'Discussion between two philosophy professors and debate coaches',
      lead: 'Listen to a coaching session on how to transform toxic ideological arguments into productive intellectual debates.',
      audio: 'audio/unit-29-listening-1.mp3',
      transcript: `[Professor Vance]: Maya, when our university debate team prepares for national tournaments, their natural instinct is to find the most ridiculous quote from the other side and mock it. Why is that habit so intellectually corrosive?\n\n[Professor Cruz]: Julian, strawmanning is the fast food of debating: it gives you an instant emotional dopamine rush, but leaves your intellect completely malnourished. When you demolish a weak caricature, you learn nothing, and you leave your opponent feeling insulted and resentful.\n\n[Professor Vance]: Which is why we now enforce Rapoport’s rules in every practice round.\n\n[Professor Cruz]: Exactly. Before our students are permitted to offer a single point of rebuttal, they must articulate their opponent’s thesis so eloquently that the opponent nods in agreement. Not only does this practice force our debaters to pass the Ideological Turing Test, but it also uncovers the profound philosophical trade-offs that make the issue genuinely difficult in the first place.\n\n[Professor Vance]: And rarely does an opponent remain hostile when they realize they have been understood with complete fairness. The moment defensiveness drops, real intellectual progress begins.`,
      questions: [
        {
          id: '29l1q1',
          type: 'mc',
          q: 'Why does Professor Cruz compare "strawmanning" to fast food?',
          options: [
            'Because it is cheap to buy in university cafeterias.',
            'Because it provides an instant emotional rush but leaves the intellect malnourished and creates resentment.',
            'Because it was invented in the United States in the 1950s.',
            'Because it makes students tired after lunch.'
          ],
          answer: 1,
          explain: 'Strawmanning provides cheap gratification while degrading intellectual depth and mutual respect.'
        },
        {
          id: '29l1q2',
          type: 'mc',
          q: 'What must students do before offering a rebuttal under Rapoport’s rules?',
          options: [
            'Pay a penalty fee to the judge.',
            'Articulate the opponent’s case so fairly and accurately that the opponent nods in agreement.',
            'Memorize fifty vocabulary words in French.',
            'Flip a coin to decide who speaks first.'
          ],
          answer: 1,
          explain: 'Students must demonstrate mastery of the opponent\'s case before offering any rebuttal.'
        }
      ]
    },
    {
      id: '29l2',
      title: 'Monologue: Daniel Kahneman and Adversarial Collaboration',
      format: 'Academic lecture on behavioral economics and science',
      lead: 'A lecture examining Daniel Kahneman\'s revolutionary method of adversarial collaboration to resolve scientific disputes.',
      audio: 'audio/unit-29-listening-2.mp3',
      transcript: `Throughout his long and distinguished career, Nobel laureate Daniel Kahneman observed that conventional scientific debates followed a depressing pattern: Professor A publishes a paper attacking Professor B; Professor B publishes a blistering reply defending their original claim; and thirty years later, both die without either having yielded a single millimeter of territory.\n\nTo break this cycle of egotistical entrenchment, Kahneman pioneered a brilliant methodology: *Adversarial Collaboration*. When Kahneman found himself in a fierce intellectual dispute with a rival scholar—such as British psychologist Ralph Hertwig—he did not write hostile replies in academic journals. Instead, he invited his rival to jointly design an empirical experiment together.\n\nThey agreed in advance on the exact laboratory protocols, the precise data analysis methods, and what specific findings would prove each person right or wrong. By turning a hostile rivalry into a shared scientific voyage, adversarial collaboration replaced ego with evidence. It proved that true greatness in thought is not about defending your reputation; it is about loving the truth more than you love your own opinion.`,
      questions: [
        {
          id: '29l2q1',
          type: 'mc',
          q: 'What depressing pattern in scientific debates motivated Daniel Kahneman to invent adversarial collaboration?',
          options: [
            'Scientific journals charged too much money for subscriptions.',
            'Scholars spent decades publishing hostile replies to defend their egos without ever updating their views or yielding ground.',
            'Laboratory equipment was frequently broken.',
            'Students refused to enroll in psychology courses.'
          ],
          answer: 1,
          explain: 'Kahneman recognized that conventional academic debates were entrenched ego battles that failed to resolve disputes.'
        },
        {
          id: '29l2q2',
          type: 'mc',
          q: 'How does adversarial collaboration resolve an intellectual dispute?',
          options: [
            'By having a committee of politicians vote on the winner.',
            'By having rivals co-design an empirical experiment with pre-agreed protocols and falsification criteria.',
            'By flipping a coin in public.',
            'By forcing one scholar to resign from their university.'
          ],
          answer: 1,
          explain: 'Rivals agree on shared experimental protocols and pre-committed criteria for truth.'
        }
      ]
    }
  ];

  K.units['29'].speaking = {
    part1: [
      { q: `When someone passionately disagrees with you about an important topic, how do you keep the conversation calm and constructive?`, guide: `Discuss deep listening, asking clarifying questions, acknowledging valid points, and avoiding personal insults.` },
      { q: `Have you ever changed your mind about a major issue because someone explained their perspective with kindness and clarity?`, guide: `Describe the issue, the turning point of evidence or empathy, and how your thinking evolved.` },
      { q: `Why do you think television news debates so often feature people shouting over one another rather than having thoughtful dialogues?`, guide: `Discuss television ratings, commercial incentives for conflict, short soundbites, and performative outrage.` }
    ],
    part2: {
      topic: `Describe a controversial debate or disagreement where you were able to understand and appreciate both sides of the issue.`,
      prompts: [
        `What the controversial issue was and why people hold intense opinions about it`,
        `What the strongest argument for the first perspective is`,
        `What the strongest argument for the opposing perspective is`,
        `And explain how understanding both sides changed your view of the controversy.`
      ],
      guide: `Structure your response with balanced neutrality: introduction of the debate, steelman of Side A, steelman of Side B, and a sophisticated synthesis of the core underlying values.`
    },
    part3: [
      { q: `In an era of intense political polarization, is it possible for democratic societies to maintain open dialogue without descending into civil conflict?`, guide: `Analyze institutional resilience, civic education, Rapoport\'s rules, and the defense of democratic norms.` },
      { q: `How should society handle Karl Popper's "Paradox of Tolerance"? When does speech cross the line from protected dissent into dangerous intolerance?`, guide: `Evaluate incitement to violence, dehumanization, bad-faith disinformation, and the preservation of free inquiry.` },
      { q: `Could the concept of "adversarial collaboration" be applied to politics to help rival political parties solve national crises?`, guide: `Explore pre-agreed empirical metrics, bipartisan pilot programs, and transparent policy evaluation.` }
    ],
    followUp: `If an argument is offensive to some people, should it be banned from public debate?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'car·i·ca·ture', 'ad·ver·sar·i·al', 'com·pla·cen·cy', 'in·ter·loc·u·tor', 'vi·tri·ol·ic'.`,
      grammar: `Natural deployment of negative and limiting inversion ('Rarely do individuals...', 'Not only does steelmanning...') and multi-layered concession ('To be sure... nevertheless').`,
      discourse: `Coherent, highly articulate debate architecture demonstrating profound cognitive empathy and principled rebuttal.`,
      vocabulary: `Effective use of terms such as 'steelmanning', 'strawman fallacy', 'Rapoport\'s rules', 'ideological Turing test', 'adversarial collaboration', and 'the paradox of tolerance'.`
    }
  };
})(window.KLANG = window.KLANG || {});
