/* UNIT 18 · THE ALGORITHM KNOWS WHAT KEEPS YOU LOOKING */
(function (K) {
  K.units['18'] = K.makeUnit('18', {
    module: 4, title: 'The algorithm knows', titleEm: 'what keeps you looking',
    question: 'If an algorithm learns what captures our attention, who is shaping whom?',
    knowLead: `Modern digital platforms do not simply deliver content that users deliberately request; they operate complex recommender systems that observe micro-behaviors—dwell time, scroll velocity, pause duration, and click patterns. These behavioral signals train predictive models designed to optimize user engagement and advertising inventory. However, what begins as an effort to reflect user preferences frequently becomes a recursive feedback loop that shapes, narrows, and radicalizes human desire. Keep the distinction between revealed preference, algorithmic optimization, and psychological capture in mind as you read.`,
    terms: [
      ['Recommender system', `An algorithmic architecture that filters, ranks, and serves content to users based on predictive models of their past behavior and demographic similarities.`],
      ['Algorithmic capture', `The phenomenon where an individual’s attention, reading habits, and worldview become progressively channeled and constrained by predictive recommendation loops.`],
      ['Revealed preference', `The economic concept that a person's true desires are revealed by their observable actions (e.g. clicking or watching) rather than their stated intentions.`],
      ['Recursive feedback loop', `A cybernetic process where the output of a system (user engagement) is fed back as an input, reinforcing and amplifying the initial behavioral pattern.`],
      ['Variable reward schedule', `A behavioral conditioning mechanism (analogous to a slot machine) where rewards are delivered at unpredictable intervals, maximizing dopamine-driven compulsion.`]
    ],
    views: [
      'Two understandings of algorithmic recommendation',
      'The consumer preference reflection view',
      `Algorithms are neutral mirrors that democratically provide users with exactly what they want to see, eliminating traditional editorial gatekeeping and personalizing culture.`,
      'The behavioral conditioning view',
      `Algorithms do not mirror pre-existing human desires; they exploit evolutionary vulnerabilities (such as threat reactivity and tribal outrage) to engineer addictive consumption patterns.`,
      `The core question is whether algorithmic feeds serve human agency by satisfying preferences, or subvert human autonomy through behavioral conditioning.`
    ],
    knowPrompt: `When you spend two hours late at night watching short viral videos that you did not plan to watch, did the algorithm fulfill your desire or hijack your attention? Explain the difference.`,
    knowGuide: [
      `Distinguish second-order desires (what you consciously wish to value) from first-order impulses (instant gratification).`,
      `Consider how micro-metrics like scroll velocity measure reflex rather than deliberate choice.`
    ],
    read: {
      main: {
        format: 'Investigative & psychological essay', title: 'The Recursive Mirror: How Recommender Systems Shape the Self',
        standfirst: `We designed machines to predict what we want to look at. In the process, the machines learned how to change who we are.`,
        pull: { after: 5, text: `An algorithm does not give you what you love; it gives you what you are incapable of turning away from.` },
        notes: { 2: `<b>Shoshana Zuboff</b> coined the term <i>Surveillance Capitalism</i> in 2019 to describe the unilateral monetization of behavioral data.`, 6: `<b>Harry Frankfurt</b> introduced the philosophical distinction between first-order desires (impulses) and second-order desires (volitions).` },
        paras: [
          `Every second of every day, billions of digital devices register the minutiae of human behavior. When you scroll through a social media feed, the platform does not merely record which posts you actively like or share. It records the precise milliseconds you pause over an image, the speed at which your thumb glides across the screen, the exact moment you zoom in on a face, and the subtle hesitations that precede a decision to click. These granular micro-signals are ingested by multi-layered neural networks whose singular optimization objective is engagement maximization. The system does not ask whether a piece of content is true, educational, or spiritually enriching; it asks only one mathematical question: *Will this keep the user looking?*`,
          `Tech executives have long defended this architecture using the classical economic doctrine of revealed preference. In standard market theory, what people say they want is irrelevant; their true preferences are revealed by what they actually choose to consume. If millions of citizens spend hours watching sensationalist political confrontations, conspiracy theories, and celebrity gossip, platform engineers argue that the algorithm is simply acting as a neutral, democratic mirror reflecting the authentic desires of the public. To criticize the algorithm, they insist, is to criticize human nature itself.`,
          `This defense rests on a profound psychological and philosophical evasion. As philosopher Harry Frankfurt observed, human beings are defined by a complex hierarchy of desires. We possess first-order desires—immediate, instinctual impulses for sugar, novelty, outrage, and distraction. But we also possess second-order desires—the capacity to reflect upon our impulses and decide which ones we actually wish to endorse. A person may possess an instinctual first-order urge to watch a sensationalist brawl on the street; yet their second-order desire is to spend the evening reading a book or sleeping. Recommender systems are explicitly engineered to bypass second-order reflection and prey upon first-order evolutionary vulnerabilities.`,
          `Human perceptual systems evolved in environments where threat detection, social hierarchy, and in-group tribal conflict were matters of biological survival. Consequently, our visual attention is hardwired to lock onto scenes of danger, moral outrage, sexual novelty, and social betrayal. When an algorithm optimizes for watch time, it discovers these evolutionary tripwires with inhuman speed and statistical precision. It learns that presenting an outraged political conflict will hold a gaze three times longer than a measured historical essay. In doing so, the algorithm does not give you what you love; it gives you what you are neurologically incapable of looking away from.`,
          `The consequence of this dynamic is not merely passive time-wasting; it is algorithmic capture. When an individual repeatedly interacts with content that triggers outrage, the recommender system does not treat this as an isolated event. It updates its high-dimensional user model, predicting that this user is most reliably monetized through heightened emotional arousal. The feed gradually narrows, filtering out ambiguity and serving progressively more extreme versions of the initial stimulus. A citizen who casually clicks on a fitness video is subtly nudged toward radical body dysmorphia or hyper-masculine political grievance, as the algorithm chases higher engagement metrics.`,
          `What makes this process terrifying is its recursive cybernetic nature. We begin with the assumption that the user is an autonomous agent and the algorithm is an obedient tool. But over months and years of constant interaction, the feedback loop closes. As the algorithm presents narrower, more sensationalized reality tunnels, the user’s cognitive habits, emotional baselines, and political worldviews adapt to match the feed. The user becomes the kind of person who is easily predicted by the algorithm. The mirror is no longer passive; it is an active mold that reshapes the contours of human consciousness.`,
          `To resist algorithmic capture requires moving beyond individualistic moralizing about "digital detox" and screen time limits. While personal discipline is necessary, it is hopelessly outmatched by billions of dollars of computational infrastructure engineered by behavioral neuroscientists. We must treat algorithmic recommendation as an urgent public health and democratic crisis. Reclaiming human autonomy demands regulating behavioral optimization, mandating algorithmic transparency, and designing digital commons that serve the flourishing of human agency rather than the relentless extraction of human attention.`
        ]
      },
      counter: {
        format: 'Technological defense', title: 'The Democratic Affordances of Algorithmic Discovery',
        standfirst: `Blaming algorithms for human behavior ignores the vast cultural democratisation enabled by personalized curation.`,
        paras: [
          `Critiques of recommender systems frequently succumb to a romantic nostalgia for the era of centralized media gatekeeping. In the pre-algorithmic era, cultural discovery was controlled by a tiny, insulated cartel of television executives, newspaper editors, and corporate publishers who decided what the public was permitted to see.` ,
          `Algorithmic personalization dismantled this elitist bottleneck. Today, an independent musician in Salvador, an investigative blogger in rural India, or a specialized educator teaching quantum physics can instantly find their niche global audience without begging for corporate patronage. The algorithm identifies relevance with unprecedented efficiency, matching esoteric human interests across geographical and social boundaries.` ,
          `Furthermore, users are not passive, helpless victims of machine conditioning. Empirical studies show that people actively navigate, train, and curate their own feeds. Users deliberately subscribe to educational channels, block toxic creators, and use recommendation engines to master complex professional skills, learn languages, and discover life-changing communities.` ,
          `The problem is not algorithmic curation itself, but the specific business model of advertising monetization. By shifting toward subscription-based platforms, user-controlled recommendation knobs, and open-source ranking algorithms, society can preserve the incredible benefits of personalized discovery while eliminating predatory optimization.`
        ]
      }
    },
    sources: [
      { title: 'The Age of Surveillance Capitalism (Shoshana Zuboff)', url: 'https://www.publicaffairsbooks.com/titles/shoshana-zuboff/the-age-of-surveillance-capitalism/9781610395694/', note: 'Monumental analysis of behavioral data extraction and prediction products.' },
      { title: 'Freedom of the Will and the Concept of a Person (Harry G. Frankfurt)', url: 'https://www.jstor.org/stable/2024717', note: 'Philosophical treatise defining first-order and second-order desires.' },
      { title: 'The Attention Merchants (Tim Wu)', url: 'https://www.penguinrandomhouse.com/books/240210/the-attention-merchants-by-tim-wu/', note: 'Historical account of how commercial enterprises capture and monetize human attention.' }
    ],
    interpret: [
      { id: '18i1', type: 'mc', tag: 'Main idea', q: `What is the core philosophical critique of recommender systems presented in the main text?`, options: [`Recommender systems are broken and deliver random, broken videos.`, `Algorithms do not merely reflect pre-existing user desires; they exploit evolutionary vulnerabilities to engineer behavioral compulsion, narrowing human agency into recursive feedback loops.`, `Algorithms are completely harmless and only help people find cooking recipes.`, `Smartphones should be permanently banned by international law.`], answer: 1, explain: `The essay argues that engagement algorithms exploit threat/outrage instincts, altering human consciousness through recursive loops.` },
      { id: '18i2', type: 'mc', tag: 'Inference', q: `Why does the author reject the "revealed preference" defense used by tech executives?`, options: [`Because economics is not a real subject.`, `Because clicks and dwell time reflect first-order instinctual reflexes rather than second-order reflective human values.`, `Because users always lie on surveys.`, `Because algorithms cannot count milliseconds.`], answer: 1, explain: `Revealed preference treats involuntary first-order impulses as genuine authentic desires.` },
      { id: '18i3', type: 'tf', tag: 'Detail', q: `According to paragraph 1, recommender systems evaluate whether a video is true and educational before serving it to users.`, answer: false, explain: `Paragraph 1 states that algorithms ignore truth and education, optimizing solely for engagement maximization.` },
      { id: '18i4', type: 'mc', tag: 'Counterpoint argument', q: `What positive democratic function of algorithmic curation does the counterpoint emphasize?`, options: [`It makes computers run faster.`, `It dismantled traditional corporate gatekeepers, allowing niche creators and marginalized voices to find global audiences directly.`, `It eliminates the need for electricity.`, `It guarantees that nobody ever gets bored.`], answer: 1, explain: `The counterpoint notes that algorithms enable decentralized discovery for independent creators and specialized communities.` },
      { id: '18i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 3, explain Harry Frankfurt’s distinction between first-order and second-order desires in the context of digital scrolling.`, rows: 4, guide: [`First-order: immediate instinctual impulse (clicking on outrage/scandal).`, `Second-order: reflective volition (wishing to be someone who reads or sleeps instead).`] },
      { id: '18i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the concept of a "recursive feedback loop" challenge the view that human users are independent from the machines they use?`, rows: 5, guide: [`Shows that as algorithms serve narrower reality tunnels, users adapt their habits and worldviews to match the feed, becoming predictable products of the machine.`] },
      { id: '18i7', type: 'open', tag: 'Application', q: `Give one concrete example of how algorithmic recommendation in Brazil has contributed to political polarization or public health misinformation.`, rows: 5, guide: [`Mention specific mechanisms: recommendation of conspiracy channels, vaccine skepticism loops, or electoral disinformation amplification.`] }
    ],
    notice: [
      {
        title: 'Complex noun phrases and heavy subject nominalisation',
        sub: 'Packing multi-layered technological and behavioral mechanisms into dense, authoritative subjects',
        examples: [
          `<b>The relentless optimization of algorithmic engagement metrics</b> bypasses conscious reflection.`,
          `<b>The recursive cybernetic conditioning of human attention</b> threatens democratic autonomy.`,
          `<b>Granular micro-behavioral data extraction</b> enables predictive behavioral modification.`
        ],
        questions: [
          `How do compound pre-modifiers and nominal heads (The relentless optimization of X) build academic authority?`,
          `Why are complex noun phrase subjects preferred over series of short active sentences in technical prose?`
        ],
        explain: `<p>C1 writing achieves density and conceptual weight through expanded noun phrases. Combine adjectives, classifier nouns, and post-modifying prepositional phrases:</p><p><i>[Determiner] + [Evaluative Adjective] + [Classifier Noun] + [Head Noun] + [Prepositional Post-modifier]</i></p><p>Example: <i>The [unprecedented] [algorithmic] [monopolization] [of public communication channels]</i>.</p>`,
        compare: { head: ['Loose clause chain', 'Complex noun phrase', 'Academic impact'], rows: [['Algorithms watch how we behave and this lets them change what we do.', 'Granular behavioral telemetry enables predictive algorithmic modification of human habit.', 'Transforms casual observation into formal sociotechnical diagnosis.']] },
        practice: [
          [`Nominalise into a single complex noun subject: <i>Platforms constantly extract behavioral data from users. This creates massive corporate wealth.</i>`, `The continuous extraction of granular behavioral data from users generates massive corporate wealth.`, `Packs process into subject noun phrase.`]
        ],
        radar: [
          { wrong: 'The making of optimization of algorithms for clicks...', right: 'The relentless algorithmic optimization for user engagement...', why: 'Avoid awkward "of-stacking"; use concise adjective and noun modifiers.' }
        ],
        help: `<p><b>Em português:</b> Sintagmas nominais complexos (<i>The algorithmic extraction of behavioral data</i>) empacotam processos complexos no sujeito da oração com máxima densidade acadêmica.</p>`
      },
      {
        title: 'Correlative and cybernetic causal markers',
        sub: 'Describing circular feedback, mutual reinforcement, and systemic entrainment',
        examples: [
          `User interaction <b>reinforces the model, which in turn</b> narrows future recommendations.`,
          `The algorithm and the human mind <b>are locked in a mutually reinforcing</b> feedback loop.`,
          `Behavioral signals <b>serve as the direct catalyst for</b> narrative radicalization.`
        ],
        questions: [
          `How does "which in turn" model non-linear, multi-stage causation?`,
          `What is the difference between simple linear causation (A causes B) and cybernetic feedback (A reinforces B which amplifies A)?`
        ],
        explain: `<p>Cybernetic systems operate through reciprocal causation. Use markers like <b>recursively amplifies, is inextricably linked to, mutually reinforces, feeds back into</b>.</p>`,
        compare: { head: ['Linear cause', 'Cybernetic cause', 'Systemic accuracy'], rows: [['The video makes the user angry.', 'Outrage-inducing stimuli trigger engagement metrics, which feed back into the algorithmic model, recursively amplifying future outrage delivery.', 'Captures the true cyclical architecture.']] },
        practice: [
          [`Combine using "which in turn feeds back into": <i>The user clicks on sensationalism. The platform serves more extreme content. The model becomes more entrenched.</i>`, `The user’s clicks prompt the platform to serve more extreme content, which in turn feeds back into the predictive model.`, `Models cybernetic feedback.`]
        ],
        radar: [
          { wrong: 'The algorithm causes the user to be predictable, and vice versa in a loop.', right: 'The algorithm and the user are locked in a mutually reinforcing recursive feedback loop.', why: 'Use precise systems terminology.' }
        ],
        help: `<p><b>Em português:</b> Expressões como <i>recursive feedback loop</i> (circuito de retroalimentação recursiva) e <i>which in turn feeds back into</i> (o que, por sua vez, realimenta) descrevem dinâmicas cibernéticas com rigor.</p>`
      }
    ],
    vocab: [
      ['telemetry', 'noun', 'The automatic recording and transmission of data from remote or inaccessible sources.', 'Granular behavioral telemetry allows platforms to track sub-second screen pauses.', 'The spacecraft transmitted flight telemetry to Earth.', ['behavioral telemetry', 'real-time telemetry', 'user telemetry'], ['data collection', 'monitoring', 'surveillance'], 'Technological noun.', '/təˈlem.ə.tri/', null],
      ['recursive', 'adjective', 'Characterized by recurrence or repetition, where the output of a process feeds back as its own input.', 'Recommender systems create a recursive feedback loop that shapes user preferences.', 'The program uses a recursive algorithm to sort data.', ['recursive loop', 'recursive process', 'recursive feedback'], ['cyclical', 'self-referential', 'repetitive'], 'Cybernetics adjective.', '/rɪˈkɜː.sɪv/', 'linear'],
      ['monetization', 'noun', 'The process of converting something into money or extracting economic value from it.', 'The monetization of human attention drives predatory algorithmic design.', 'The game relies on the monetization of digital cosmetic items.', ['monetization of attention', 'data monetization', 'commercial monetization'], ['capitalization', 'commercialization'], 'Digital economy noun.', '/ˌmʌn.ɪ.taɪˈzeɪ.ʃən/', null],
      ['conditioning', 'noun', 'A process of training or accustoming a person or animal to behave in a certain way.', 'Variable reward schedules produce subconscious psychological conditioning.', 'Operant conditioning explains compulsive slot machine play.', ['behavioral conditioning', 'operant conditioning', 'psychological conditioning'], ['training', 'habituation', 'adaptation'], 'Behavioral psychology noun.', '/kənˈdɪʃ.ən.ɪŋ/', null],
      ['volition', 'noun', 'The faculty or power of using one’s will to make deliberate choices.', 'Algorithmic nudges subvert conscious human volition.', 'She left the organization of her own volition.', ['human volition', 'conscious volition', 'act of volition'], ['will', 'free will', 'agency', 'determination'], 'Philosophy of mind noun.', '/vəˈlɪʃ.ən/', 'compulsion'],
      ['dopamine', 'noun', 'A neurotransmitter associated with pleasure, motivation, reward-seeking, and motor control.', 'Social media notifications trigger micro-bursts of dopamine.', 'Dopamine pathways mediate addictive behavior.', ['dopamine hit', 'dopamine loop', 'dopamine surge'], ['neurotransmitter', 'reward chemical'], 'Neuroscience noun.', '/ˈdəʊ.pə.miːn/', null],
      ['minutiae', 'noun (plural)', 'The small, precise, or trivial details of something.', 'Platforms track the minutiae of everyday finger movements.', 'He was lost in the legal minutiae of the contract.', ['behavioral minutiae', 'technical minutiae', 'endless minutiae'], ['details', 'trivia', 'finer points'], 'High-frequency formal noun.', '/mɪˈnjuː.ʃi.aɪ/', 'generality'],
      ['predatory', 'adjective', 'Seeking to exploit or oppress others for commercial or institutional advantage.', 'Optimization for watch time is inherently predatory toward human attention.', 'Predatory algorithms exploit adolescent insecurities.', ['predatory design', 'predatory optimization', 'predatory algorithm'], ['exploitative', 'extractive', 'manipulative'], 'Ethical critique adjective.', '/ˈpred.ə.tər.i/', 'protective'],
      ['esoteric', 'adjective', 'Intended for or likely to be understood by only a small number of people with specialized knowledge.', 'Algorithmic curation allows creators of esoteric content to find global niches.', 'He wrote a treatise on esoteric medieval philosophy.', ['esoteric topic', 'esoteric niche', 'esoteric interest'], ['obscure', 'specialized', 'arcane'], 'Academic adjective.', '/ˌiː.səˈter.ɪk/', 'commonplace'],
      ['entrainment', 'noun', 'The process of synchronizing or aligning a biological or cognitive rhythm with an external stimulus.', 'Prolonged exposure causes cognitive entrainment to algorithmic pacing.', 'Music induces neural entrainment across the brain.', ['neural entrainment', 'cognitive entrainment', 'behavioral entrainment'], ['synchronization', 'alignment', 'attunement'], 'Cognitive science noun.', '/ɪnˈtreɪn.mənt/', null]
    ],
    chunks: [
      ['the recursive mirror of human desire', 'Describing how algorithms reflect and amplify human impulses back onto the user.', 'Deconstructing recommendation loops', 'Philosophical · essayistic', 'The algorithmic feed is not a neutral tool; it is the recursive mirror of human desire.', 'Describe personalized media.', `Social media acts as the recursive mirror of human desire, magnifying our deepest anxieties.`, 'Evocative metaphorical chunk.'],
      ['first-order impulses versus second-order volitions', 'The vital philosophical gap between what we reflexively do and what we truly value.', 'Deploying philosophy of action', 'Academic · philosophical', 'Recommender systems monetize first-order impulses while subverting second-order volitions.', 'Analyze digital addiction.', `Human agency requires the capacity to align first-order impulses with second-order volitions.`, 'Frankfurtian philosophical chunk.'],
      ['evolutionary tripwires of attention', 'Hardwired biological reflexes (outrage, threat, sex) that bypass conscious thought.', 'Explaining algorithmic capture', 'Neuroscience · analytical', 'Recommender systems are engineered to exploit the evolutionary tripwires of attention.', 'Explain viral outrage.', `Sensationalist headlines trigger the evolutionary tripwires of attention without delivering insight.`, 'Cognitive mechanism chunk.'],
      ['the doctrine of revealed preference', 'The economic assertion that observable behavior represents authentic human desire.', 'Critiquing economic dogma', 'Academic · economic', 'Tech firms hide behind the doctrine of revealed preference to justify predatory algorithms.', 'Deconstruct market arguments.', `The doctrine of revealed preference breaks down when consumer choice is manipulated by addiction.`, 'Economic critique chunk.'],
      ['monetize human cognitive vulnerability', 'Building commercial profits by exploiting psychological and neurological weaknesses.', 'Ethical denunciation', 'Critical · legal', 'Surveillance capitalism operates by learning to monetize human cognitive vulnerability.', 'Critique big tech.', `Regulators must prohibit business models designed to monetize human cognitive vulnerability.`, 'Policy indictment chunk.'],
      ['decentralized cultural discovery', 'The positive capacity of algorithms to connect niche creators directly with global audiences.', 'Acknowledging tech affordances', 'Analytical · positive', 'Algorithms enable unprecedented decentralized cultural discovery across global niches.', 'Defend recommendation tech.', `Independent artists rely on algorithms for decentralized cultural discovery without corporate gatekeepers.`, 'Balanced counterpoint chunk.'],
      ['granular micro-behavioral telemetry', 'The tracking of tiny, sub-conscious user actions (scroll speed, gaze pause, zoom).', 'Detailing surveillance depth', 'Technological · investigative', 'Platforms rely on granular micro-behavioral telemetry to train their predictive models.', 'Explain data extraction.', `The app extracts granular micro-behavioral telemetry to predict emotional vulnerability.`, 'Technical investigative chunk.'],
      ['reality tunnels and epistemic capture', 'Enclosing an individual within an algorithmically curated, self-reinforcing worldview.', 'Diagnosing radicalization', 'Sociological · critical', 'Recommendation loops lock citizens inside narrow reality tunnels and epistemic capture.', 'Analyze political echo chambers.', `Conspiracy theories flourish when algorithms trap vulnerable users in isolated reality tunnels.`, 'Sociological diagnosis chunk.'],
      ['variable reward schedule conditioning', 'Using unpredictable reward timing to induce compulsive, slot-machine-like behavior.', 'Explaining platform addiction', 'Psychological · scientific', 'Infinite scrolling employs variable reward schedule conditioning to maximize time-on-screen.', 'Explain interface design.', `Pull-to-refresh feeds operate on variable reward schedule conditioning to trigger dopamine spikes.`, 'Behavioral psychology chunk.'],
      ['reclaim human cognitive autonomy', 'Restoring the individual and collective capacity for deliberate, unmanipulated thought.', 'Affirming humanistic goals', 'Philosophical · concluding', 'The urgent task of democratic society is to reclaim human cognitive autonomy from algorithmic capture.', 'Conclude an essay on tech.', `We must redesign our digital architecture to reclaim human cognitive autonomy and civic sanity.`, 'Humanistic closing chunk.']
    ],
    collocations: [
      [`The feed acts as a ______ feedback loop that narrows user interests.`, [`recursive`, `substantive`, `discretionary`, `remediable`], 0, `Recursive feedback loop is the standard systems term.`],
      [`Infinite scroll interfaces utilize variable reward ______ conditioning.`, [`schedule`, `straitjacket`, `cleavage`, `bell`], 0, `Variable reward schedule is the established behavioral psychology term.`],
      [`Tech apologists defend engagement algorithms using the doctrine of ______ preference.`, [`revealed`, `sanctified`, `offloaded`, `earmarked`], 0, `Revealed preference is the core economic doctrine.`],
      [`Platforms extract granular behavioral ______ to predict user decisions.`, [`telemetry`, `hubris`, `patronage`, `euphemism`], 0, `Behavioral telemetry describes micro-data tracking.`]
    ],
    upgrades: [
      [`The algorithm gives people what they want because they click on it.`, `Tech platforms invoke the doctrine of revealed preference to justify algorithms that systematically monetize first-order impulses.`],
      [`Social media makes people angry so they stay on the app longer.`, `Recommender systems exploit the evolutionary tripwires of attention, prioritizing outrage-inducing content to maximize engagement metrics.`],
      [`You think you are choosing what to watch, but the computer is training you.`, `Users become locked in a recursive feedback loop where predictive modeling gradually reshapes human cognitive autonomy.`]
    ],
    think: {
      title: 'Correlation, Causation and Metric Gaming in Cybernetic Systems',
      lead: 'In complex algorithmic systems, confusing correlation with causation leads to the "proxy failure" described by Goodhart’s Law: when a measure becomes a target, it ceases to be a good measure.',
      defs: [
        ['Goodhart’s Law', `The principle that when a measure (e.g. click count or dwell time) is turned into a target for optimization, it ceases to be a reliable measure of the underlying quality (user satisfaction).`],
        ['Proxy failure', `The breakdown that occurs when an easily measurable indicator is mistaken for the complex human value it was intended to represent.`],
        ['Algorithmic confounding', `A feedback loop where the algorithm’s previous interventions distort the data it subsequently observes, confusing its own influence with organic user demand.`]
      ],
      items: [
        { id: '18t1', type: 'mc', tag: 'Goodhart’s Law check', q: `A news platform starts optimizing its algorithm purely for "clicks per article." Within six months, journalistic quality collapses into sensationalist clickbait. What law explains this outcome?`, options: [`Goodhart’s Law: when a proxy metric becomes a target, it gets gamed and ceases to reflect genuine quality.`, `The Law of Diminishing Marginal Utility.`, `Moore’s Law of computing power.`, `The Great Gatsby Curve.`], answer: 0, explain: `Goodhart’s Law models how optimizing for a proxy metric (clicks) destroys the underlying quality (journalistic truth).` },
        { id: '18t2', type: 'open', tag: 'Steelmanning', q: `Steelman the defense of recommender algorithms: explain why a purely chronological, uncurated feed is technically and practically unviable for a platform with 500 million daily posts.`, rows: 5, guide: [`Focus on information overload, signal-to-noise ratio, the impossibility of human browsing through millions of unranked posts, and spam prevention.`] },
        { id: '18t3', type: 'open', tag: 'Confounder deconstruction', q: `A tech company claims: "Data proves that users love extreme political content because they watch it 40% longer." Deconstruct the algorithmic confounding behind this claim.`, rows: 5, guide: [`Explain that threat/outrage reflexes involuntarily prolong dwell time; the algorithm caused the metric by serving high-arousal content, not by satisfying authentic preference.`] },
        { id: '18t4', type: 'open', tag: 'Core synthesis', q: `How does the exploitation of first-order impulses undermine democratic deliberative capacity? State one psychological and one political mechanism.`, rows: 6, guide: [`Psychological: continuous dopamine-driven outrage degrades reflective cognitive stamina; Political: algorithmic capture silos citizens into mutually hostile reality tunnels, preventing shared factual baselines.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an Analytical Essay on Algorithmic Power',
        text: 'A high-level analytical essay examines the sociotechnical mechanisms of digital platforms. You must analyze the engineering logic (telemetry, proxies, optimization) alongside deep philosophy of mind (first vs second-order desires, agency, capture).',
        weak: 'Social media algorithms are evil machines made by greedy billionaires to brainwash kids into buying things.',
        strong: 'While recommender systems facilitate decentralized cultural discovery, optimizing exclusively for behavioral engagement metrics exploits evolutionary cognitive tripwires, entrenching users in recursive feedback loops that undermine human autonomy.'
      },
      short: {
        kind: 'Sociotechnical critique', title: 'The Fallacy of Revealed Preference in Interface Design',
        prompt: 'Critique the claim that high engagement metrics prove that an algorithm is serving authentic human desires. Contrast first-order reflexive impulses with second-order reflective volitions.',
        min: 160, max: 260, support: 'light',
        guide: ['Use complex noun phrase nominalisation and cybernetic causal markers.', 'Include the terms revealed preference, first-order impulse, and recursive loop.']
      },
      main: {
        kind: 'Analytical essay', title: 'The Architecture of Capture: Algorithmic Recommendation and Human Autonomy',
        prompt: 'To what extent do personalized recommender systems democratize cultural discovery, and to what extent do they subvert human agency through behavioral conditioning and algorithmic capture? Write an essay analyzing the mechanisms of data telemetry, proxy optimization, and cognitive feedback loops.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: describe the depth of behavioral telemetry and state the central dilemma of algorithmic capture.',
          'Body 1: examine the psychological mechanism (first vs second-order desires, evolutionary tripwires of outrage, variable reward conditioning).',
          'Body 2: analyze the systemic cybernetics (Goodhart’s Law, proxy failure, reality tunnels, recursive feedback loops).',
          'Body 3: address the counterpoint (democratized discovery for niche creators, bypassing elite gatekeepers, user curation).',
          'Conclusion: propose concrete frameworks for human-centric algorithmic governance and the restoration of cognitive autonomy.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I use complex noun phrases to create authoritative, academic topic sentences?',
        'Did I model recursive, cybernetic causation accurately (e.g. "which in turn feeds back into")?',
        'Did I distinguish first-order impulses from second-order reflective volitions?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my essay balance the critique of engagement optimization with the affordances of discovery?'
      ],
      challenges: [
        'Replace any generic active clause chain with a dense, nominalised noun phrase subject.',
        'Include one sentence using "first-order impulses versus second-order volitions".',
        'Use the chunk "evolutionary tripwires of attention" or "reality tunnels and epistemic capture".'
      ]
    },
    retrieve: {
      content: 'Explain Harry Frankfurt’s distinction between first-order desires and second-order volitions, and how algorithms exploit this gap.',
      contentGuide: ['First-order are instinctual impulses (outrage/clicks); second-order are reflective desires about who we want to be; algorithms optimize for first-order.'],
      grammar: 'Write one sentence using a heavy nominalised subject (e.g. "The relentless optimization of...") and one using "which in turn feeds back into".',
      grammarGuide: ['Check subject-verb agreement with complex noun phrases.'],
      reasoning: 'How does Goodhart’s Law explain why optimizing for "dwell time" or "clicks" inevitably degrades content quality?',
      reasoningGuide: ['When a proxy metric becomes a target, algorithms game human involuntary reflexes rather than measuring genuine human flourishing.'],
      cumulative: 'Connect Unit 18 to Unit 11: how does algorithmic capture accelerate attentional inequality and cognitive flooding in the democratic public sphere?',
      summary: `<p><b>Main claim:</b> recommender systems do not neutrally reflect human desires; by optimizing for engagement proxies, they exploit evolutionary vulnerabilities and lock users in recursive feedback loops that undermine human autonomy.</p><p><b>Grammar:</b> complex noun phrases and cybernetic causal markers (which in turn feeds back into) allow precise sociotechnical modeling.</p><p><b>Reasoning:</b> distinguish first-order impulses from second-order volitions; apply Goodhart’s Law to algorithmic proxy metrics.</p>`
    }
  });

  const u = K.units['18'];
  u.listening = [
    {
      id: 'l1', title: 'Inside the Recommendation Engine', format: 'Tech insider interview',
      file: '/audio/en/unit-18/u18-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two speakers (Interviewer Marcus Vance and former Algorithm Engineer Liam Chen); candid, analytical, Silicon Valley / International English',
      passes: ['First listen · understand how sub-second telemetry trains predictive neural networks', 'Second listen · note the engineer’s critique of the “revealed preference” defense'],
      transcript: `Marcus: Liam, when non-engineers think about algorithms, they picture a computer that checks whether I clicked “like” on a post. Is that how modern recommendation models actually work?\n\nLiam: Not even close, Marcus. The “like” button is virtually obsolete as a training signal. It’s too slow, too conscious, and too rare. Modern recommendation engines train on sub-second behavioral telemetry. We track scroll velocity, dwell time to the millisecond, how many times you replay a three-second loop, and whether your thumb hesitated before continuing.\n\nMarcus: And what does that telemetry reveal?\n\nLiam: It reveals your subconscious biological reflexes. If you see an image that triggers disgust, fear, or outrage, your visual processing system freezes for an extra four hundred milliseconds before your conscious brain can intervene. The algorithm registers that delay as a positive engagement signal. It doesn’t know you were horrified; it only knows your attention was captured. When leadership claims that the algorithm gives users what they want under the doctrine of revealed preference, they know it’s a fiction. We aren’t measuring what users want; we are measuring what their ancient mammalian brains cannot look away from.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Engineering reality', q: 'Why is the "like" button considered obsolete as a training signal according to Liam?', options: ['Because nobody uses computers anymore.', 'Because it is too conscious, slow, and rare compared to sub-second micro-telemetry like dwell time and scroll pauses.', 'Because likes are legally protected by copyright.', 'Because algorithms cannot read icons.'], answer: 1, explain: 'Micro-telemetry tracks involuntary biological reflexes at sub-second speeds, making conscious likes irrelevant.' },
        { id: 'q2', type: 'open', tag: 'Critical extraction', q: 'How does Liam deconstruct the claim that engagement metrics reflect "revealed preference"?', rubric: ['Explains that algorithms measure instinctual involuntary pauses triggered by fear or disgust', 'Shows that freezing in horror is registered as positive engagement rather than genuine preference'] }
      ]
    },
    {
      id: 'l2', title: 'The Philosophy of the Feed', format: 'Short audio essay',
      file: '/audio/en/unit-18/u18-listening-02.mp3', duration: 120, level: 'C1',
      audioReady: false,
      voice: 'One academic voice; thoughtful, evocative, General American English',
      passes: ['First listen · trace the feedback loop from tool to mold', 'Second listen · connect Frankfurt’s second-order volitions to platform design'],
      transcript: `We began the digital revolution believing that we were the masters of the machine. The smartphone was an extension of our hand; the search engine was an extension of our memory. But when the machine was equipped with predictive neural networks optimized for commercial engagement, the relationship inverted.\n\nA mirror is a passive surface: it reflects whatever stands before it without judgment or alteration. But an algorithmic feed is a recursive mirror. It observes your reflection, identifies your most vulnerable insecurities and volatile passions, and projects a customized reality that amplifies those exact traits. Over time, you do not simply look into the mirror; you conform to it.\n\nTrue human freedom is not the ability to click on whatever impulse flashes across a screen. True freedom, as philosopher Harry Frankfurt reminded us, is the capacity for second-order volition—the reflective autonomy to decide who we wish to become. When our digital architecture bypasses second-order reflection and traps us in automated dopamine loops, it is not expanding human choice. It is dismantling the very psychological conditions that make genuine choice possible.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core metaphor', q: 'Why does the speaker describe an algorithmic feed as a "recursive mirror" rather than a passive one?', options: ['Because screens are made of glass.', 'Because it observes vulnerabilities and projects an amplified reality that gradually molds user consciousness to match the machine’s predictions.', 'Because it reverses text backwards.', 'Because it only functions in the dark.'], answer: 1, explain: 'A recursive mirror actively reshapes the user by amplifying vulnerabilities and closing the feedback loop.' },
        { id: 'q2', type: 'open', tag: 'Philosophical synthesis', q: 'How does the speaker define true human freedom using Harry Frankfurt’s concept of second-order volition?', rubric: ['Freedom is not impulsive clicking on first-order stimuli', 'Freedom is reflective second-order volition—the autonomy to decide what values and traits to cultivate'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A tech lobbyist claims: “Our recommendation algorithm is completely neutral; if users spend hours watching outrage videos, that is their democratic choice, and regulating the feed is censorship.” Respond in 60–120 seconds. Deconstruct the revealed preference defense, explain the difference between first-order impulses and second-order volitions, and describe the recursive feedback loop.',
    prepare: 'Keywords only: revealed preference fallacy · sub-second telemetry · evolutionary tripwires (outrage/threat) · Frankfurt first vs second-order desires · recursive loop. Do not script.',
    grammar: 'Complex noun phrases (The relentless optimization of...); cybernetic causal markers (which in turn reinforces); formal stance hedging',
    targets: ['the recursive mirror of human desire', 'first-order impulses versus second-order volitions', 'evolutionary tripwires of attention', 'the doctrine of revealed preference'],
    rubric: [
      'Directly and rigorously refutes the lobbyist’s neutrality claim',
      'Articulates the distinction between instinctual first-order reflexes and conscious second-order values',
      'Uses heavy noun phrase nominalisation and sophisticated cybernetic connectors',
      'Delivers a powerful concluding standard for human cognitive autonomy'
    ]
  };
})(window.KLANG);
