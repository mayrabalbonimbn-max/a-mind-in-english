/* UNIT 26 · CORRELATION IS NOT CAUSATION — SO WHAT IS? */
(function (K) {
  K.units['26'] = K.makeUnit('26', {
    module: 6, title: 'Correlation is not', titleEm: 'causation',
    question: 'What would we actually need to know before claiming that X caused Y?',
    knowLead: `Every day, the human brain searches for patterns in the chaos of experience. If we take a cold remedy and feel better forty-eight hours later, we instinctively credit the medicine. If a new mayor is elected and violent crime drops, voters credit the administration. Yet observing two events occurring in sequence or moving together in statistical synchronization proves nothing about cause and effect. How do we move from observing a correlation to proving a definitive causal mechanism? What analytical tools allow us to rule out confounding variables, reverse causality, and pure coincidence? Consider the mechanics of causal inference as you read.`,
    terms: [
      ['Spurious correlation', `A mathematical relationship in which two or more variables are statistically associated but have no direct causal connection, usually due to coincidence or an unseen confounding third factor.`],
      ['Reverse causality', `A direction-of-effect error where an observer assumes X caused Y, when in reality Y caused X (e.g., assuming wealth causes happiness when greater subjective well-being enables higher productivity).`],
      ['Counterfactual thinking', `The cognitive and philosophical process of evaluating what would have happened to the outcome if the alleged cause had not occurred (the "what if" condition).`],
      ['Bradford Hill criteria', `A set of nine epidemiological principles (including temporality, biological gradient, plausibility, and coherence) used to establish causal relationships in public health.`],
      ['Confounding variable', `An external, unmeasured factor that influences both the supposed cause and the supposed effect, creating a misleading appearance of direct causality.`]
    ],
    views: [
      'Two perspectives on causal modeling',
      'The mechanistic reductionist stance',
      `True causation can only be claimed when an unambiguous physical, biological, or behavioral mechanism is isolated and verified through counterfactual experimentation and controlled intervention.`,
      'The complex systems stance',
      `In real-world economics, ecology, and human psychology, events are rarely driven by single, isolated linear causes. Causality operates through non-linear feedback loops, emergent dynamics, and multi-factorial networks.`,
      `The core challenge is developing rigorous causal criteria without oversimplifying the complex multi-causality of living systems.`
    ],
    knowPrompt: `During the summer, ice cream sales and drowning incidents both increase dramatically at the exact same rate. Why would it be absurd to ban ice cream to prevent drowning, and what is the true underlying cause?`,
    knowGuide: [
      `Identify the confounding variable (warm summer weather) that drives both independent behaviors.`,
      `Explain why statistical correlation alone cannot reveal the underlying mechanism.`
    ],
    read: {
      main: {
        format: 'Analytical & philosophical essay', title: 'The Ladder of Causation: From Coincidence to Mechanism',
        standfirst: `To understand the world, we must learn to climb beyond passive observation and master the rigorous architecture of causal proof.`,
        pull: { after: 4, text: `The human mind is a pattern-seeking engine that turns coincidences into causal myths.` },
        notes: { 1: `<b>Sir Austin Bradford Hill</b> articulated his famous nine criteria for causal inference in 1965 during the historic investigation into tobacco smoking and lung cancer.`, 4: `Computer scientist <b>Judea Pearl</b> formulated the \'Ladder of Causation\' and causal Bayesian networks in <i>The Book of Why</i> (2018).` },
        paras: [
          `The statement "correlation does not imply causation" is perhaps the most widely recited intellectual mantra in modern education. Yet despite its universal familiarity, human beings—including seasoned politicians, corporate executives, and scientific researchers—fall into causal traps with astonishing regularity. The human mind is not an impartial statistical computer; it is an insatiable pattern-seeking engine evolved to extract instant causal explanations from noisy environments. In our evolutionary past, assuming that a rustling in the bushes was caused by a stalking predator carried zero survival cost if false, but failing to make the connection proved fatal if true. As a result, we are biologically predisposed to see causal intent where there is only statistical coincidence.`,
          `The simplest causal distortion is the spurious correlation, where two entirely unrelated variables move in lockstep due to sheer mathematical coincidence or an unmeasured third factor. Classic examples abound: rates of divorce in Maine correlate almost perfectly with the per capita consumption of margarine; spending on science and space technology correlates with suicides by hanging. While these comical examples are easily dismissed, real-world spurious correlations are far more insidious. For decades, hormone replacement therapy was believed to protect postmenopausal women from coronary disease because women taking the therapy had significantly lower heart attack rates. Only when randomized trials were conducted did researchers discover that the correlation was driven by a powerful confounding variable: women taking hormone therapy were wealthier, had better diets, exercised more frequently, and had superior healthcare access.`,
          `A second pervasive error is reverse causality. When two variables are correlated, we instinctively assume that the first variable acted as the driver of the second. Consider the well-documented association between depression and physical inactivity. While it is plausible that a sedentary lifestyle contributes to depressive neurochemistry, it is equally plausible—and empirically established—that depressive episodes induce severe lethargy and anhedonia, causing physical withdrawal. Assuming a one-way causal arrow without temporal tracking or intervention leads to flawed therapeutic and policy prescriptions.`,
          `To establish genuine causation, public health and epidemiological science rely on the foundational framework formulated by Sir Austin Bradford Hill in 1965. Hill established nine rigorous benchmarks for assessing causality, chief among them: temporality (the cause must strictly precede the effect in time), biological gradient (a dose-response relationship, where greater exposure produces greater effect), biological plausibility (a coherent mechanistic explanation compatible with known biology), and experimental reversibility (removing the intervention decreases the incidence of the effect). When researchers demonstrated that heavy smokers suffered lung cancer at twenty times the rate of non-smokers, that risk scaled linearly with pack-years, and that smoking preceded tumor development, tobacco\'s causal guilt became undeniable.`,
          `In modern computational and cognitive philosophy, Turing Award winner Judea Pearl advanced causal reasoning to its highest tier through his "Ladder of Causation." Pearl distinguishes between three distinct cognitive levels: *Association* (seeing: observing passive correlations), *Intervention* (doing: actively altering a variable through controlled action to observe what changes), and *Counterfactuals* (imagining: asking "what would have happened to the outcome had we acted differently?"). While modern machine learning and large language models operate predominantly on Level One—detecting complex statistical associations across vast datasets—true scientific and human intelligence resides on Level Three, where counterfactual mental models allow us to isolate the precise causal gears of reality.`,
          `Mastering the art of causal inference transforms how we navigate modern debates. When confronted with a confident claim that a new tax policy wrecked an economy, a smartphone app improved mental focus, or a superfood cured an illness, the disciplined thinker does not ask merely "did these two things happen together?" They ask: "What was the mechanism? What was the counterfactual baseline? And what unmeasured confounding variables are lurking beneath the surface of the graph?"`
        ]
      },
      counter: {
        format: 'Complex systems perspective', title: 'The Illusion of the Single Cause: Why Reductionism Fails',
        standfirst: `In interconnected natural, social, and economic systems, hunting for a single linear cause is often a fundamental mistake.`,
        paras: [
          `While Bradford Hill’s criteria and randomized trials work brilliantly in linear, closed systems like pharmacology, dogmatically applying reductionist causal models to complex adaptive systems produces severe blind spots.` ,
          `In an economy, an ecological food web, or a human psyche, events are not driven by single billiard balls striking one another in linear sequence. They are governed by multi-causal networks, emergent properties, non-linear tipping points, and recursive feedback loops where effects constantly loop back to amplify or dampen their original causes.` ,
          `Why did the 2008 global financial crisis occur? Was it subprime mortgages? Deregulation? Central bank interest rate policies? Algorithmic trading? Rating agency corruption? To claim that any single factor "caused" the collapse is to misunderstand systemic fragility. The crisis was the emergent outcome of thousands of interdependent vulnerabilities interacting simultaneously.` ,
          `We must resist the intellectual comfort of monocausality. In complex human systems, the goal is not to find the single smoking gun, but to map the dynamic resilience, vulnerabilities, and feedback loops of the entire system.`
        ]
      }
    },
    sources: [
      { title: 'The Book of Why: The New Science of Cause and Effect (Judea Pearl & Dana Mackenzie)', url: 'https://www.basicbooks.com/titles/judea-pearl/the-book-of-why/9780465097609/', note: 'Foundational text on causal calculus, counterfactuals, and Bayesian networks.' },
      { title: 'The Environment and Disease: Association or Causation? (Austin Bradford Hill)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1898525/', note: 'Classic 1965 paper outlining the nine criteria for epidemiological causation.' },
      { title: 'Thinking in Systems: A Primer (Donella H. Meadows)', url: 'https://www.chelseagreen.com/product/thinking-in-systems/', note: 'Classic introduction to feedback loops, non-linearity, and complex system dynamics.' }
    ],
    interpret: [
      { id: '26i1', type: 'mc', tag: 'Main idea', q: `What is the central inquiry of the main essay regarding causal inference?`, options: [`How to calculate margarine sales in the state of Maine.`, `How to move from observing passive statistical correlations to establishing genuine, verified causal relationships through mechanisms, interventions, and counterfactual reasoning.`, `Why all randomized controlled trials are completely inaccurate.`, `Why computers will never be able to calculate statistics.`], answer: 1, explain: `The text explores the progression from passive correlation to rigorous causal inference via mechanisms, Bradford Hill criteria, and counterfactuals.` },
      { id: '26i2', type: 'mc', tag: 'Detail', q: `Why did observational studies mistakenly conclude that hormone replacement therapy protected women from heart attacks?`, options: [`Because the pharmaceutical companies forged the patient files.`, `Because women taking the therapy were wealthier, exercised more, and had better healthcare, which acted as powerful confounding variables.`, `Because heart attacks do not occur in women.`, `Because the researchers used faulty mathematical calculators.`], answer: 1, explain: `The observational correlation was driven by confounding socio-economic and lifestyle advantages of the patient group.` },
      { id: '26i3', type: 'mc', tag: 'Inference', q: `According to Judea Pearl’s "Ladder of Causation," what cognitive capability distinguishes Level 3 (Counterfactuals) from Level 1 (Association)?`, options: [`Level 3 requires a supercomputer, while Level 1 can be done on a smartphone.`, `Level 1 observes statistical patterns in data, while Level 3 imagines counterfactual alternatives ("what would have happened if X had not occurred?") to isolate causal gears.`, `Level 3 only applies to astronomy, while Level 1 applies to biology.`, `Level 1 is always false, while Level 3 is always 100% certain.`], answer: 1, explain: `Pearl defines counterfactual thinking (imagining retrospective alternatives) as the highest cognitive tier of causal reasoning.` },
      { id: '26i4', type: 'quote', tag: 'Evidence', q: `Which sentence from the text identifies the four primary Bradford Hill benchmarks highlighted in the essay?`, find: `temporality (the cause must strictly precede the effect in time)`, quote: `Hill established nine rigorous benchmarks for assessing causality, chief among them: temporality (the cause must strictly precede the effect in time), biological gradient (a dose-response relationship, where greater exposure produces greater effect), biological plausibility (a coherent mechanistic explanation compatible with known biology), and experimental reversibility (removing the intervention decreases the incidence of the effect).`, explain: `The text explicitly enumerates temporality, biological gradient, plausibility, and reversibility.` },
      { id: '26i5', type: 'mc', tag: 'Synthesis', q: `How does the complex systems counter-perspective critique linear reductionism?`, options: [`By claiming that causes do not exist in physics.`, `By arguing that in interconnected economic and ecological systems, events emerge from non-linear feedback loops and multi-causal networks rather than single isolated drivers.`, `By demonstrating that math cannot be used in finance.`, `By proving that all financial crises are caused by a single person.`], answer: 1, explain: `Complex systems theory shows that emergent outcomes in interconnected networks cannot be reduced to single linear causes.` },
      { id: '26i6', type: 'mc', tag: 'Vocabulary in context', q: `What is the meaning of "dose-response relationship" (biological gradient)?`, options: [`Giving patients large pills instead of small pills.`, `An empirical pattern where increasing the intensity or duration of exposure to a cause produces a proportionally greater effect.`, `A chemical reaction between two prescription medications.`, `An equation used to calculate hospital budgets.`], answer: 1, explain: `Biological gradient means the magnitude of the effect scales with the magnitude of exposure.` },
      { id: '26i7', type: 'mc', tag: 'Critical thinking', q: `How does the concept of "reverse causality" apply to the correlation between police presence and neighborhood crime rates?`, options: [`Police officers commit all the crimes in the city.`, `Assuming police cause crime is a mistake; higher crime rates cause city governments to deploy more police officers to those specific areas.`, `Police cars are correlated with traffic jams.`, `Crime rates cannot be measured statistically.`], answer: 1, explain: `High crime causes police deployment, not the reverse; mistaking the direction of causality creates a false conclusion.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Advanced cause/effect connectors & causal verbs',
        lead: `C1 analytical writing replaces simplistic linking words (*because, so, leads to*) with sophisticated causal verbs and noun structures (*stems from, is attributable to, predicates upon, acts as a precipitating factor, precipitates*).`,
        examples: [
          `The observed economic growth is largely *attributable to* capital investment rather than deregulation.`,
          `The crisis *stemmed from* a toxic convergence of regulatory failure and asset overvaluation.`,
          `A sedentary lifestyle *acts as a precipitating factor* in cardiovascular disease.`
        ],
        questions: [
          `How does saying "X is attributable to Y" clarify the directional accountability compared to "X happened because of Y"?`,
          `Notice how causal verbs distinguish between necessary conditions (*predicates upon*), direct triggers (*precipitates*), and underlying sources (*stems from*).`
        ],
        explain: `Precision in causal argumentation requires matching the grammatical connector to the exact nature of the causal relationship (catalyst, necessary condition, root cause, or contributing factor).`,
        compare: [
          [`Basic`, `The inflation happened because the government printed money.`],
          [`C1 Causal Architecture`, `The inflationary surge was precipitated by aggressive monetary expansion, though systemic supply-chain disruptions acted as powerful compounding catalysts.`]
        ],
        practice: [
          { q: `Rewrite this sentence using "attributable to": "The company's failure was caused by bad management."`, a: `The firm's collapse was primarily attributable to gross managerial negligence and flawed strategic foresight.` },
          { q: `Rewrite using "precipitated by": "The strike started when wages were cut."`, a: `The nationwide industrial strike was precipitated by an unannounced reduction in real wages.` }
        ],
        radar: [
          `Ensure proper prepositions with causal verbs: *attribute to*, *stem from*, *predicate on/upon*, *result in (effect)* vs *result from (cause)*.`,
          `Avoid claiming monocausality when multiple drivers are involved; use qualifiers like *partially attributable to* or *a primary contributing catalyst*.`
        ],
        help: `Use causal verbs to structure topic sentences: "The phenomenon under review stems not from individual pathology, but from systemic institutional incentives."`
      },
      {
        title: 'Focus 2 · Counterfactual conditionals & causal hypotheticals',
        lead: `Demonstrating causal necessity requires constructing counterfactual conditionals (*Had X not occurred, Y would not have transpired*), testing whether the outcome depends strictly upon the isolated variable.`,
        examples: [
          `*Had the central bank not intervened* aggressively, the banking sector *would almost certainly have collapsed*.`,
          `*Were we to eliminate* the confounding variable of household income, the correlation *would likely dissipate*.`,
          `The causal claim hinges upon whether, *in the absence of* the policy, the same trajectory *would have unfolded*.`
        ],
        questions: [
          `How does inverted counterfactual conditional framing (*Had X not happened...*) elevate the analytical rigor of an argument?`,
          `Observe how testing the "counterfactual baseline" separates genuine causes from coincidental bystanders.`
        ],
        explain: `In epistemology and law, causation is defined counterfactually (the "but-for" test). If Y would have happened anyway without X, then X cannot be claimed as the true cause.`,
        compare: [
          [`Standard conditional`, `If the government didn't step in, the banks would have failed.`],
          [`Inverted counterfactual`, `Had the regulatory authorities not executed an immediate liquidity intervention, the entire financial apparatus would have succumbed to systemic insolvency.`]
        ],
        practice: [
          { q: `Construct an inverted counterfactual conditional: (Condition: Team did not hire the new coach; Outcome: Team did not win championship)`, a: `Had the management not appointed the new head coach, the team would almost certainly not have secured the national championship.` }
        ],
        radar: [
          `Ensure tense consistency in past counterfactuals: *Had + subject + past participle ... would have + past participle*.`,
          `Avoid overconfident counterfactual assertions about history; use calibrated modals (*would likely have, would plausibly have*).`
        ],
        help: `Deploy counterfactuals when deconstructing spurious correlations: "Had researchers controlled for baseline health, the apparent protective effect of the supplement would have vanished."`
      }
    ],
    vocab: [
      ['spurious', 'adjective', 'Not being what it purports to be; false, fake, or mathematically coincidental.', 'The graph showed a spurious correlation between cheese consumption and engineering degrees.', 'We must separate spurious patterns from genuine causal links.', ['spurious correlation', 'spurious relationship', 'entirely spurious'], ['false', 'bogus', 'coincidental'], 'Statistical & logical adjective.', '/ˈspjʊə.ri.əs/', 'genuine'],
      ['precipitate', 'verb', 'To cause an event or situation (typically an undesirable one) to happen suddenly, unexpectedly, or prematurely.', 'The unexpected bankruptcy precipitated a market panic.', 'The incident precipitated an international diplomatic crisis.', ['precipitate a crisis', 'precipitate a collapse', 'precipitate action'], ['trigger', 'catalyze', 'spark'], 'Formal verb.', '/prɪˈsɪp.ɪ.teɪt/', null],
      ['counterfactual', 'adjective', 'Relating to or expressing what has not happened but could, would, or might have occurred under different conditions.', 'The historian conducted a counterfactual analysis of the battle.', 'Counterfactual reasoning is essential for causal proof.', ['counterfactual thinking', 'counterfactual scenario', 'counterfactual baseline'], ['hypothetical', 'alternative', 'conditional'], 'Philosophical adjective.', '/ˌkaʊn.təˈfæk.tʃu.əl/', 'actual'],
      ['temporality', 'noun', 'The state of existing within or having a specific relationship to time; the chronological sequence of events.', 'Bradford Hill established temporality as a non-negotiable criterion for causation.', 'The study established the temporality of the symptoms.', ['strict temporality', 'linear temporality', 'temporal sequence'], ['chronology', 'timing', 'time-order'], 'Methodological noun.', '/ˌtem.pəˈræl.ə.ti/', null],
      ['attributable', 'adjective', 'Caused by or resulting from a specified person, action, or thing.', 'The drop in infant mortality was attributable to clean water infrastructure.', 'Her success is largely attributable to disciplined work.', ['attributable to', 'largely attributable', 'directly attributable'], ['ascribable', 'traceable', 'due to'], 'Formal adjective.', '/əˈtrɪb.jə.tə.bəl/', null],
      ['monocausal', 'adjective', 'Attributing a complex outcome, phenomenon, or historical event to a single, isolated cause.', 'Monocausal explanations of war are almost invariably flawed.', 'Economists rejected the monocausal theory of the recession.', ['monocausal explanation', 'monocausal theory', 'monocausal fallacy'], ['single-cause', 'reductionist', 'simplistic'], 'Analytical adjective.', '/ˌmɒn.oʊˈkɔː.zəl/', 'multi-causal'],
      ['anhedonia', 'noun', 'The inability to feel pleasure in normally pleasurable activities, frequently a core symptom of depression.', 'Anhedonia causes severe social withdrawal.', 'The patient exhibited pronounced lethargy and anhedonia.', ['severe anhedonia', 'clinical anhedonia', 'symptom of anhedonia'], ['loss of pleasure', 'emotional numbness', 'apathy'], 'Psychological noun.', '/ˌæn.hɪˈdoʊ.ni.ə/', null],
      ['reversibility', 'noun', 'The capability of a process, condition, or disease to be undone, cured, or returned to its original state by removing the cause.', 'Experimental reversibility strengthens a causal hypothesis.', 'The reversibility of the lung damage was documented.', ['experimental reversibility', 'biological reversibility', 'full reversibility'], ['undoability', 'curability', 'recoverability'], 'Scientific noun.', '/rɪˌvɜː.səˈbɪl.ə.ti/', 'irreversibility'],
      ['emergent', 'adjective', 'Arising as an unexpected or complex collective property from the interaction of simpler components.', 'Consciousness is an emergent property of neural networks.', 'Traffic jams are emergent social phenomena.', ['emergent property', 'emergent outcome', 'emergent dynamic'], ['resultant', 'developing', 'collective'], 'Systems science adjective.', '/ɪˈmɜː.dʒənt/', null],
      ['predicate', 'verb', 'To base, ground, or establish an argument, theory, or action upon a specific premise or condition.', 'His entire economic model is predicated upon rational consumer behavior.', 'The reform was predicated upon the assumption of budget surpluses.', ['predicated upon', 'predicated on the assumption', 'firmly predicated'], ['based on', 'grounded in', 'founded on'], 'Formal verb.', '/ˈpred.ɪ.keɪt/', null]
    ],
    chunks: [
      ['spurious correlation', 'A mathematical association between two variables that is purely coincidental or driven by a third factor.', 'Identifying false patterns', 'Statistical · analytical', 'The reported link was nothing more than a spurious correlation.', 'Deconstruct viral statistics.', `Always verify whether a viral trend is an authentic causal link or a spurious correlation.`, 'Core statistical chunk.'],
      ['the ladder of causation', 'Judea Pearl’s three-tier model of causal reasoning (Association, Intervention, Counterfactuals).', 'Framing causal complexity', 'Epistemological · technical', 'AI systems struggle to climb Judea Pearl’s ladder of causation.', 'Explain AI limitations.', `To understand true causation, we must ascend the ladder of causation to counterfactual models.`, 'Pearl cognitive chunk.'],
      ['reverse causality', 'The logical fallacy of confusing the cause with the effect in a correlation.', 'Exposing directional errors', 'Methodological · critical', 'The study was undermined by the possibility of reverse causality.', 'Identify causal errors.', `Assuming that wealth creates good health ignores the reality of reverse causality.`, 'Crucial critique chunk.'],
      ['a dose-response relationship', 'An empirical pattern where increasing exposure produces proportionally greater effect.', 'Proving biological causation', 'Scientific · formal', 'The data clearly demonstrates a dose-response relationship.', 'Establish causal strength.', `Establishing a clear dose-response relationship is one of Bradford Hill’s vital causal criteria.`, 'Epidemiological chunk.'],
      ['the counterfactual baseline', 'What would have happened in the alternative reality where the cause was absent.', 'Testing causal necessity', 'Philosophical · analytical', 'We must establish the counterfactual baseline before evaluating the reform.', 'Evaluate policy outcomes.', `Without comparing the outcome against a counterfactual baseline, we cannot prove the law worked.`, 'High-register policy chunk.'],
      ['largely attributable to', 'Caused predominantly by a specific underlying factor or policy.', 'Assigning causal weight', 'Formal · essayistic', 'The reduction in inflation was largely attributable to supply-chain stabilization.', 'Explain macroeconomic trends.', `The patient’s improved cognition was largely attributable to improved sleep quality.`, 'Formal causal chunk.'],
      ['predicated upon the assumption that', 'Founded or dependent upon a specific underlying premise being true.', 'Interrogating assumptions', 'Formal · critical', 'The entire theory is predicated upon the assumption that markets are efficient.', 'Deconstruct faulty models.', `His argument is predicated upon the unproven assumption that correlation proves causation.`, 'Rhetorical critique chunk.'],
      ['precipitated by an unannounced', 'Triggered suddenly and unexpectedly by a specific catalyst.', 'Describing sudden events', 'Historical · analytical', 'The financial run was precipitated by an unannounced liquidity freeze.', 'Describe sudden crises.', `The political uprising was precipitated by an unannounced increase in public transit fares.`, 'Dynamic causal chunk.'],
      ['the illusion of monocausality', 'The mistaken belief that complex historical or systemic outcomes stem from a single cause.', 'Critiquing reductionism', 'Systems thinking · essayistic', 'Historians must resist the simplistic illusion of monocausality.', 'Analyze complex events.', `Attributing the fall of Rome to a single barbarian invasion embraces the illusion of monocausality.`, 'Systems critique chunk.'],
      ['a non-linear feedback loop', 'A dynamic system where an effect loops back to amplify or dampen its original cause unpredictably.', 'Explaining complex systems', 'Scientific · economic', 'Climate tipping points are driven by non-linear feedback loops.', 'Explain ecological crises.', `Housing markets are prone to bubbles because buyer speculation creates a non-linear feedback loop.`, 'Systems science chunk.']
    ],
    collocations: [
      [`The researchers uncovered a ______ correlation between the two variables.`, [`spurious`, `panoptic`, `profane`, `salvage`], 0, `Spurious correlation is the standard statistical pairing.`],
      [`The policy success was largely ______ to community involvement.`, [`attributable`, `confounded`, `falsified`, `conflated`], 0, `Attributable to describes proper causal credit.`],
      [`The model is ______ upon the assumption of perfect information.`, [`predicated`, `precipitated`, `corroborated`, `substantiated`], 0, `Predicated upon means grounded on a premise.`],
      [`The epidemiologist established a clear ______-response relationship.`, [`dose`, `punctum`, `studium`, `tableau`], 0, `Dose-response is the fixed medical and statistical collocation.`]
    ],
    upgrades: [
      [`Ice cream makes people drown because the graphs go up together.`, `The statistical synchronization between ice cream consumption and drowning incidents constitutes a classic spurious correlation driven by the confounding variable of warm summer weather.`],
      [`The company went bankrupt because the CEO was bad.`, `While managerial incompetence acted as a contributing factor, the firm’s collapse was precipitated by systemic cash-flow insolvency and macroeconomic headwinds.`],
      [`If the government didn't step in, the banks would have collapsed.`, `Had regulatory authorities not executed an immediate liquidity intervention, the entire banking apparatus would almost certainly have succumbed to systemic insolvency.`]
    ],
    think: {
      title: 'Causal Inference, Counterfactuals, and Systemic Complexity',
      lead: 'Deconstruct complex statistical claims to determine whether they meet the rigorous criteria for causal inference or fall victim to confounding, reverse causality, or spuriousness.',
      defs: [
        ['The "But-For" Causal Standard', `The counterfactual test in law and science asking: "Would the effect have occurred but for the occurrence of the cause?"`],
        ['Confounding by Indication', `A medical confounding bias where the severity of a patient\'s underlying illness dictates the aggressive treatment they receive, making the treatment appear harmful in observational data.`]
      ],
      items: [
        {
          id: '26t1',
          tag: 'Directionality',
          title: 'The Reverse Causality Paradox',
          task: `A cross-sectional study finds that people who sleep more than nine hours per day have significantly higher mortality rates than those who sleep seven hours. Deconstruct why assuming that "sleeping too much kills people" is likely a victim of reverse causality.`,
          guide: `Explain that severe underlying systemic illnesses (cancer, autoimmune disease, organ failure) cause extreme fatigue, leading sick individuals to sleep longer before death.`
        },
        {
          id: '26t2',
          tag: 'Confounding Mechanics',
          title: 'The Healthy User Bias',
          task: `Explain how the "healthy user bias" operates as a confounding variable in nutritional studies (e.g., people who choose to eat kale smoothies also happen to exercise, avoid smoking, and have higher incomes).`,
          guide: `Demonstrate that the health outcome is driven by the cluster of lifestyle privileges rather than the single food item in isolation.`
        },
        {
          id: '26t3',
          tag: 'Counterfactual Modeling',
          title: 'Constructing the Counterfactual',
          task: `A city mayor claims: "Our new policing policy reduced crime by 15% this year." What specific counterfactual evidence would you need to investigate before accepting the mayor\'s causal claim?`,
          guide: `Analyze regional crime trends in neighboring cities without the policy, economic conditions, demographic changes, and historical seasonality.`
        },
        {
          id: '26t4',
          tag: 'Systems Thinking Lab',
          title: 'Monocausality vs. Dynamic Feedback',
          task: `Analyze a complex social outcome (such as the rise in adolescent anxiety over the past decade). Contrast a simplistic monocausal explanation ("smartphones caused it") with a multi-causal systems model.`,
          guide: `Incorporate social media algorithms, academic pressure, economic precarity, parenting styles, and loss of unstructured play into an interdependent network.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Constructing Rigorous Causal Architecture in Analytical Essays',
        text: `In high-level analytical and scientific writing, establishing causation requires moving beyond simple correlation. You must explicitly identify the mechanism, eliminate confounding variables, evaluate the counterfactual baseline, and deploy advanced causal verbs and inverted conditionals.`,
        weak: `The new law caused crime to drop because crime went down after the law was signed.`,
        strong: `While crime rates declined following the enactment of the legislation, attributing this outcome entirely to the policy ignores broader macroeconomic trends. Had the regional economy not experienced robust wage growth, the observed decline in criminality would plausibly have been far more modest.`
      },
      short: {
        kind: 'Causal deconstruction',
        title: 'Deconstructing a Spurious Association',
        min: 180,
        max: 260,
        prompt: `Select a widely cited correlation (e.g., coffee and longevity, exercise and academic grades, social media and loneliness). In a concise critique (180–260 words), deconstruct why the correlation cannot be assumed to be causal. Incorporate at least one causal verb (*attributable to, precipitated by*) and one counterfactual conditional (*Had X not...*).`,
        support: [
          `State the correlation and the popular causal assumption.`,
          `Identify potential confounding variables or the risk of reverse causality.`,
          `Deploy an inverted counterfactual conditional to test the "but-for" relationship.`,
          `Conclude with a calibrated evaluation of what additional experimental evidence is required.`
        ],
        guide: [
          `Use advanced causal terminology: *spurious correlation*, *confounding variable*, *reverse causality*, *counterfactual baseline*.`,
          `Ensure proper inverted syntax: "Had researchers controlled for baseline socio-economic status..."`
        ]
      },
      main: {
        kind: 'Data-informed analytical essay',
        title: 'Correlation Is Not Causation: The Architecture of Causal Inference in Complex Systems',
        min: 500,
        max: 750,
        main: true,
        prompt: `What would we actually need to know before claiming that X caused Y? In a structured analytical essay (500–750 words), evaluate the cognitive, epidemiological, and mathematical frameworks required to prove causation. Contrast simplistic observational correlations with Bradford Hill\'s criteria and Judea Pearl\'s counterfactual ladder. Address the limitations of reductionist linear causality when analyzing complex social and economic systems. Deploy advanced causal connectors, counterfactual conditionals, and rigorous analytical vocabulary throughout.`,
        support: [
          `Introduction: Deconstruct the human tendency toward pattern recognition and spurious correlation; establish your central thesis on the rigorous conditions for causal inference.`,
          `Body Paragraph 1: Analyze the primary distortions—spurious correlations, confounding variables (healthy user bias), and reverse causality.`,
          `Body Paragraph 2: Examine the classical frameworks of proof—Bradford Hill’s criteria (temporality, dose-response, biological plausibility) and Judea Pearl’s counterfactual ladder of causation.`,
          `Body Paragraph 3: Confront the counter-perspective—the limits of linear monocausality in complex adaptive systems (feedback loops, emergent phenomena).`,
          `Conclusion: Synthesize the criteria; formulate a disciplined framework for evaluating causal claims in public policy and daily life.`
        ],
        guide: [
          `Deploy essential C1 vocabulary: *spurious correlation*, *reverse causality*, *counterfactual baseline*, *attributable to*, *precipitated by*, *monocausal fallacy*.`,
          `Incorporate at least two inverted counterfactual conditionals (*Had X not intervened...*, *Were we to control for...*).`,
          `Maintain an authoritative, objective, and intellectually rigorous essayistic register.`
        ]
      }
    },
    edit: {
      checklist: [
        `Are causal claims framed with precise verbs (*attributable to, stems from, precipitated by*) rather than vague links?`,
        `Are counterfactual conditionals (*Had X not occurred...*) formed with accurate past perfect and modal auxiliary syntax?`,
        `Does the essay distinguish clearly between spurious correlation, confounding, and reverse causality?`,
        `Are Bradford Hill criteria and Pearl\'s counterfactual framework explained accurately?`,
        `Is the tone consistently formal, analytical, and objective?`
      ],
      challenges: [
        {
          id: '26e1',
          title: 'Refining Causal Direction and Confounders',
          bad: `People who drink red wine live longer, which proves that alcohol is good for your heart and cures sickness.`,
          task: `Revise using academic register, epistemic hedging, and causal vocabulary (*observational association, confounding socio-economic variables, reverse causality*).`,
          good: `The observed association between moderate red wine consumption and longevity cannot be interpreted as direct causation; it is largely confounded by higher median income, superior nutritional habits, and greater healthcare access among wine consumers.`
        },
        {
          id: '26e2',
          title: 'Polishing Counterfactual Conditional Syntax',
          bad: `If the hospital didn't buy the new ventilators, more people would die for sure.`,
          task: `Upgrade into an inverted counterfactual conditional displaying formal register and calibrated modal certainty.`,
          good: `Had the intensive care facility not procured the advanced mechanical ventilators, patient mortality during the viral peak would plausibly have been substantially higher.`
        }
      ]
    },
    retrieve: {
      content: `What are four of the primary criteria established by Sir Austin Bradford Hill to evaluate whether an observed association is genuinely causal?`,
      contentGuide: `Mention temporality (cause precedes effect), biological gradient (dose-response relationship), biological plausibility (coherent mechanism), and experimental reversibility (intervention removes effect).`,
      grammar: `Rewrite this sentence using an inverted counterfactual conditional: "If researchers had not controlled for patient income, the study would have produced a completely spurious conclusion."`,
      grammarGuide: `Expected: "Had researchers not controlled for patient income, the study would have produced a completely spurious conclusion."`,
      reasoning: `Why is the "illusion of monocausality" particularly dangerous when analyzing complex economic or ecological crises?`,
      reasoningGuide: `Complex systems are driven by non-linear feedback loops, emergent properties, and multi-causal networks; reducing them to a single cause leads to ineffective, simplistic interventions that overlook systemic vulnerabilities.`,
      summary: `In Unit 26, you explored the rigorous discipline of causal inference. You mastered advanced cause/effect connectors, counterfactual conditional structures, Bradford Hill criteria, and systems thinking.`
    }
  });

  K.units['26'].listening = K.pendingListening('26', [
    {
      id: '26l1',
      title: 'Dialogue: The Coffee Longevity Paradox',
      format: 'Conversation between a biostatistician and a science podcaster',
      lead: 'Listen to a discussion breaking down how confounding variables and reverse causality distort nutritional science.',
      audio: 'audio/unit-26-listening-1.mp3',
      transcript: `[Podcaster]: Liam, last month a massive study came out claiming that drinking four cups of coffee a day reduces the risk of all-cause mortality by sixteen percent. My listeners are asking: should everyone immediately start drinking coffee to live longer?\n\n[Biostatistician]: Sarah, this is a textbook case of confusing association with a validated causal mechanism. In large-scale cohort studies, researchers track dietary habits and mortality over twenty years. But coffee drinkers differ systematically from non-drinkers in dozens of ways that are exceedingly difficult to control.\n\n[Podcaster]: What kind of confounding variables are we talking about?\n\n[Biostatistician]: For instance, non-coffee drinkers in certain populations include individuals who had to quit caffeine due to pre-existing gastrointestinal ulcers, severe hypertension, or cardiovascular arrhythmias. That introduces reverse causality: poor health caused them to avoid coffee, making the non-drinking group appear sicker by comparison.\n\n[Podcaster]: That's called the 'sick quitter' effect.\n\n[Biostatistician]: Exactly. Furthermore, had the researchers not controlled for concurrent cigarette smoking—since coffee and cigarettes are frequently paired—coffee would have falsely appeared to cause lung cancer! When you look at Bradford Hill's criteria, we lack a clear, unique biological mechanism that proves coffee alone extends biological lifespan. It's a plausible association, but it's not a verified causal panacea.`,
      questions: [
        {
          id: '26l1q1',
          type: 'mc',
          q: 'What confounding phenomenon explains why non-coffee drinkers had higher mortality in the study?',
          options: [
            'Non-coffee drinkers were poisoned by herbal tea.',
            'The "sick quitter" effect: individuals with pre-existing severe illnesses had quit coffee due to health complications, skewing the non-drinker baseline.',
            'Coffee drinkers exercise ten hours every day.',
            'The coffee beans were genetically modified.'
          ],
          answer: 1,
          explain: 'The biostatistician explains that pre-existing illness caused people to stop drinking coffee (reverse causality/sick quitter effect).'
        },
        {
          id: '26l1q2',
          type: 'mc',
          q: 'Why would coffee have falsely appeared to cause lung cancer without statistical controls?',
          options: [
            'Because coffee beans produce toxic radioactive smoke.',
            'Because coffee drinking was heavily correlated with cigarette smoking in that demographic.',
            'Because the coffee cups were made of asbestos.',
            'Because doctors misdiagnosed heart disease as lung cancer.'
          ],
          answer: 1,
          explain: 'Cigarette smoking acted as a severe confounding variable that was correlated with coffee consumption.'
        }
      ]
    },
    {
      id: '26l2',
      title: 'Monologue: Judea Pearl and the Science of "What If"',
      format: 'Academic lecture on artificial intelligence and causal calculus',
      lead: 'A lecture analyzing Judea Pearl\'s \'Ladder of Causation\' and why machine learning struggles with counterfactual reasoning.',
      audio: 'audio/unit-26-listening-2.mp3',
      transcript: `In 2018, computer scientist Judea Pearl published *The Book of Why*, issuing a profound challenge to modern artificial intelligence. Today’s deep learning systems and large language models possess unprecedented power to detect statistical associations across petabytes of text and imagery. Yet Pearl argues that all of deep learning remains trapped on the first, lowest rung of the 'Ladder of Causation': the rung of Association.\n\nTo move from mere prediction to genuine causal understanding, an intelligent agent must climb to Rung Two: *Intervention*. This is the realm of action—asking: 'If I intervene and change variable X, what will happen to Y?' An algorithm that merely observes that rooster crows correlate with sunrise cannot tell you what happens if you silence the rooster.\n\nFinally, at the pinnacle of intelligence lies Rung Three: *Counterfactuals*. This is the realm of imagination, regret, and scientific hypothesis. It asks: 'Given that event Y occurred after I took action X, what would have happened had I acted differently?' Counterfactual reasoning requires an internal mental model of how the gears of the world operate. Until artificial systems can reason counterfactually about what did *not* happen, true artificial general intelligence and genuine scientific discovery will remain exclusively human domains.`,
      questions: [
        {
          id: '26l2q1',
          type: 'mc',
          q: 'According to Judea Pearl, why are current deep learning models trapped on Rung 1 of the causal ladder?',
          options: [
            'Because computers do not have enough memory storage.',
            'Because they only detect statistical associations and correlations in existing data without possessing causal models of intervention and counterfactuals.',
            'Because computer programming languages are too old.',
            'Because deep learning only works on numerical spreadsheets.'
          ],
          answer: 1,
          explain: 'Deep learning operates on passive correlation (Rung 1) rather than active intervention or counterfactual modeling.'
        },
        {
          id: '26l2q2',
          type: 'mc',
          q: 'What defines Rung 3 (Counterfactuals) in Pearl’s hierarchy?',
          options: [
            'Calculating the price of consumer goods.',
            'The cognitive capacity to evaluate hypothetical retrospective alternatives: "What would have happened had X not occurred?"',
            'Translating code from Python into C++.',
            'Running automated physical experiments in robotics.'
          ],
          answer: 1,
          explain: 'Rung 3 involves counterfactual reasoning about alternative realities and unobserved outcomes.'
        }
      ]
    }
  ]);

  K.units['26'].speaking = K.canonicalSpeaking({
    part1: [
      { q: `When you get sick with a common cold, what remedies do you usually take? How do you know whether the remedy cured you or if your body simply recovered naturally?`, guide: `Discuss spontaneous recovery, placebo effects, and the difficulty of isolating a single remedy's causal impact.` },
      { q: `Have you ever noticed a funny superstition that people believe brings good luck (e.g., wearing lucky socks for a football match)? Why do people believe it works?`, guide: `Explain how confirmation bias and accidental correlation reinforce superstitious causal beliefs.` },
      { q: `Why do you think news websites love publishing articles claiming that simple daily habits will make people rich or healthy?`, guide: `Discuss the human desire for simple linear explanations and quick solutions to complex life challenges.` }
    ],
    part2: {
      topic: `Describe a time when you or someone you know mistakenly assumed that one event caused another, only to realize later that it was a coincidence or caused by a third factor.`,
      prompts: [
        `What the two events were and what causal connection was assumed`,
        `Why this causal assumption initially seemed obvious or logical`,
        `How the true underlying cause or confounding variable was discovered`,
        `And explain what you learned from this experience about jumping to conclusions.`
      ],
      guide: `Structure your response with clear narrative progression, detailed analysis of the confounding variable or reverse causality, and a reflective conclusion on critical thinking.`
    },
    part3: [
      { q: `In public health policy, why is it dangerous for governments to make major decisions based strictly on observational correlations rather than randomized trials?`, guide: `Discuss the risk of wasting billions on ineffective interventions, harming patients, or reinforcing misleading socio-economic biases.` },
      { q: `Do you think artificial intelligence will ever be able to understand cause and effect in the way human beings do?`, guide: `Evaluate Judea Pearl's theory of counterfactual reasoning versus pure deep learning pattern recognition.` },
      { q: `How can societies learn to embrace systems thinking instead of looking for a single person or event to blame whenever an economic or political crisis occurs?`, guide: `Contrast the illusion of monocausality with multi-causal networks, feedback loops, and systemic resilience.` }
    ],
    followUp: `If two events happen together 99% of the time, is it safe to assume that one causes the other?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'spu·ri·ous', 'coun·ter·fac·tu·al', 'tem·po·ral·i·ty', 'mon·o·cau·sal', 'pre·cip·i·tate'.`,
      grammar: `Natural deployment of advanced causal connectors ('is attributable to', 'precipitated by') and counterfactual conditionals ('Had the researchers not...').`,
      discourse: `Cohesive, disciplined argumentation separating correlation, confounding, reverse causality, and mechanistic proof.`,
      vocabulary: `Effective use of terms such as 'spurious correlation', 'Bradford Hill criteria', 'Ladder of Causation', 'dose-response relationship', and 'systems thinking'.`
    }
  });
})(window.KLANG = window.KLANG || {});
