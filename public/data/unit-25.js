/* UNIT 25 · WHAT COUNTS AS EVIDENCE? */
(function (K) {
  K.units['25'] = K.makeUnit('25', {
    module: 6, title: 'What counts', titleEm: 'as evidence?',
    question: 'When should we believe a claim?',
    knowLead: `In an information ecosystem saturated with confident assertions, viral hot takes, and cherry-picked data, the central challenge of intellectual life is not finding information, but evaluating its evidential weight. We are constantly presented with personal anecdotes, expert pronouncements, statistical correlations, and peer-reviewed studies—all claiming to represent objective truth. Yet not all evidence is created equal. How do we distinguish between an alluring narrative and genuine epistemic proof? How should we calibrate our degree of belief according to the strength and reproducibility of the supporting data? Consider the hierarchy of evidence as you read.`,
    terms: [
      ['Epistemic justification', `The philosophical property of a belief being supported by adequate, reliable, and rational grounds rather than luck, bias, or dogma.`],
      ['Hierarchy of evidence', `A structured heuristic ranking research designs (from anecdotes and expert opinion up through randomized controlled trials and meta-analyses) by their vulnerability to bias.`],
      ['Anecdotal evidence', `Evidence based on isolated personal accounts or individual experiences rather than systematic, controlled empirical investigation.`],
      ['Epistemic modesty / Hedging', `The deliberate linguistic practice of qualifying one\'s claims to accurately reflect the degree of empirical uncertainty or evidentiary limitation.`],
      ['Replicability crisis', `A methodological crisis in science where the results of numerous published studies fail to be reproduced when independent researchers repeat the experiment.`]
    ],
    views: [
      'Two perspectives on evidence and belief',
      'The strict empiricist stance',
      `Only systematic, replicable, and falsifiable empirical data (such as randomized trials and meta-analyses) justify belief. Personal intuition, qualitative testimony, and unverified authority must be treated with skepticism.`,
      'The contextual / pluralist stance',
      `Quantitative metrics and randomized trials cannot capture all dimensions of human experience, history, or ethical value. Qualitative testimony, lived experience, and contextual judgment constitute indispensable forms of evidence.`,
      `The core challenge is constructing a rigorous evidential standard that rejects gullibility without blinding us to valid non-statistical truths.`
    ],
    knowPrompt: `When someone shares an intense personal story to support a broad health or political claim ("This supplement cured my illness, so everyone should take it"), why is that story emotionally persuasive yet scientifically weak as evidence?`,
    knowGuide: [
      `Distinguish between emotional vividness and statistical reliability.`,
      `Consider confounding factors, placebo effects, regression to the mean, and sample size.`
    ],
    read: {
      main: {
        format: 'Epistemological essay', title: 'The Architecture of Proof: Calibrating Belief in an Uncertain World',
        standfirst: `To think critically is not to doubt everything; it is to demand evidence proportional to the extraordinary nature of the claim.`,
        pull: { after: 4, text: `A single vivid story can hijack human empathy, but only systematic data can reveal the structural truth.` },
        notes: { 1: `<b>David Hume</b> famously asserted in 1748: "A wise man proportions his belief to the evidence."`, 3: `The <b>Oxford Centre for Evidence-Based Medicine</b> established the formal pyramid of clinical evidence in the 1990s.` },
        paras: [
          `In his 1748 philosophical masterpiece *An Enquiry Concerning Human Understanding*, Scottish Enlightenment thinker David Hume laid down what remains the foundational maxim of rational inquiry: "A wise man proportions his belief to the evidence." While this principle appears deceptively self-evident, putting it into practice in the modern world is an exceptionally demanding intellectual discipline. Human psychology is hardwired for narrative, pattern recognition, and social conformity. We are naturally seduced by vivid personal testimonials, authoritative pronouncements from charismatic figures, and intuitive explanations that confirm our pre-existing worldviews.`,
          `To resist these cognitive vulnerabilities, modern epistemologists and scientists developed the "hierarchy of evidence"—a methodological framework that ranks forms of information according to their susceptibility to systematic bias and confounding variables. At the base of this hierarchy sit personal anecdotes, individual case reports, and unsubstantiated expert opinions. While an anecdote may possess immense emotional resonance and offer valuable qualitative hypotheses, it is epistemically fragile: it cannot control for the placebo effect, spontaneous recovery, selection bias, or the statistical phenomenon of regression to the mean.`,
          `Moving up the hierarchy, observational cohort studies and case-control studies provide broader statistical correlations across large populations. Yet even robust observational data cannot definitively establish causation, as unmeasured confounding variables and healthy-user biases frequently distort the observed relationships. The gold standard for causal inference remains the randomized controlled trial (RCT) and, above all, the systematic review and meta-analysis of multiple independent RCTs. By randomly allocating participants and aggregating data across disparate laboratories, meta-analyses minimize individual experimental noise and expose systemic publication biases.`,
          `However, the contemporary intellectual landscape has been profoundly complicated by the "replicability crisis." Over the past fifteen years, large-scale replication projects across psychology, oncology, and behavioral economics have revealed that a staggering proportion of peer-reviewed, statistically significant findings fail to hold up when independent teams re-run the experiments. This crisis has demonstrated that even published academic literature can be distorted by p-hacking, file-drawer effects, institutional publication pressure, and perverse academic incentives. As a result, a single peer-reviewed paper can no longer be accepted as definitive proof of a phenomenon.`,
          `True intellectual maturity at the C1 level requires mastering the linguistic and cognitive art of calibration. Rather than falling into binary dogmatism (either accepting a claim as absolute gospel or rejecting it as complete fraud), a sophisticated thinker operates probabilistically. Every claim is assigned a provisional degree of confidence based upon the quality, independence, and convergence of the available evidentiary streams. When the evidence is sparse or contradictory, we must deploy epistemic hedging, explicitly marking the boundaries of what is known and what remains speculative.`,
          `Ultimately, demanding rigorous evidence is not an act of cynical cynicism; it is the ultimate expression of intellectual respect for truth. By refusing to let emotional affinity, political tribalism, or charismatic authority substitute for methodological rigor, we protect ourselves from manipulation and participate in the collective, self-correcting human quest for genuine knowledge.`
        ]
      },
      counter: {
        format: 'Humanistic critique', title: 'The Limits of the Empirical Pyramid: Why Lived Experience Matters',
        standfirst: `Reducing all legitimate knowledge to randomized trials and statistical metrics risks creating an arid scientism that ignores vital qualitative truths.`,
        paras: [
          `While the hierarchy of evidence is indispensable for clinical medicine and pharmacological testing, dogmatically applying it to all domains of human life produces severe intellectual distortion.` ,
          `Complex social phenomena—such as structural racism, artistic expression, philosophical ethics, and historical trauma—cannot be neatly placed inside a double-blind randomized controlled trial. To declare that qualitative testimony, historical narrative, and lived experience have no evidential value because they are not quantitative is to confuse measurement with meaning.` ,
          `Furthermore, the institutional structures that fund and approve randomized trials are themselves shaped by corporate and political interests. Pharmaceutical companies routinely fund trials designed to maximize profit while ignoring unpatentable interventions or marginalized diseases. When marginalized communities testify to harms that scientific institutions have not yet bothered to fund or study, treating their accounts as "mere anecdote" can reinforce institutional gaslighting.` ,
          `A mature epistemology must be pluralistic: honoring quantitative rigor where applicable, while recognizing that human wisdom, moral insight, and narrative testimony constitute legitimate, indispensable ways of knowing.`
        ]
      }
    },
    sources: [
      { title: 'An Enquiry Concerning Human Understanding (David Hume)', url: 'https://www.gutenberg.org/ebooks/9662', note: 'Classic Enlightenment philosophy on evidence, miracles, and belief calibration.' },
      { title: 'Calling Bullshit: The Art of Skepticism in a Data-Driven World (Carl Bergstrom & Jevin West)', url: 'https://www.penguinrandomhouse.com/books/565701/calling-bullshit-by-carl-t-bergstrom-and-jevin-west/', note: 'Comprehensive guide to evaluating quantitative claims, data graphics, and scientific studies.' },
      { title: 'The Replicability Crisis in Science (Stanford Encyclopedia of Philosophy)', url: 'https://plato.stanford.edu/entries/scientific-reproducibility/', note: 'Detailed philosophical overview of reproducibility, p-hacking, and epistemic reliability.' }
    ],
    interpret: [
      { id: '25i1', type: 'mc', tag: 'Main idea', q: `What is the primary thesis of the main essay regarding evaluating evidence?`, options: [`All scientific studies are completely fraudulent and should be dismissed.`, `Rational belief requires proportioning our confidence to the methodological rigor, convergence, and replicability of the evidence rather than relying on emotional anecdotes or binary certainty.`, `Anecdotal evidence from personal friends is always superior to laboratory data.`, `Randomized controlled trials should be used to evaluate poetry and visual art.`], answer: 1, explain: `The essay argues for probabilistic belief calibration based on the methodological strength and reproducibility of evidence.` },
      { id: '25i2', type: 'mc', tag: 'Detail', q: `Why is anecdotal evidence placed at the base of the scientific hierarchy of evidence?`, options: [`Because anecdotes are too long to read.`, `Because isolated personal accounts cannot control for placebo effects, selection bias, spontaneous recovery, or regression to the mean.`, `Because stories are always written by dishonest individuals.`, `Because anecdotes cannot be translated into other languages.`], answer: 1, explain: `Anecdotes lack controls for confounding variables and cognitive biases, making causal inference unreliable.` },
      { id: '25i3', type: 'mc', tag: 'Inference', q: `How has the "replicability crisis" altered how critical thinkers evaluate a single peer-reviewed study?`, options: [`It proves that science has completely failed and should be abandoned.`, `It demonstrates that a single published study cannot be treated as definitive proof due to risks of p-hacking, publication bias, and experimental noise; independent replication is essential.`, `It requires that all scientific papers be written in Latin.`, `It shows that smaller sample sizes are more reliable than larger sample sizes.`], answer: 1, explain: `The crisis revealed that single positive findings often fail replication, demanding systemic evidence synthesis.` },
      { id: '25i4', type: 'quote', tag: 'Evidence', q: `Which sentence encapsulates David Hume’s golden rule of rational belief?`, find: `A wise man proportions his belief to the evidence`, quote: `"A wise man proportions his belief to the evidence."`, explain: `Hume's maxim forms the core foundation of evidentiary calibration.` },
      { id: '25i5', type: 'mc', tag: 'Synthesis', q: `What valid warning does the counter-perspective offer against dogmatic empiricism?`, options: [`That statistical software is too difficult to operate.`, `That applying clinical trial hierarchies to ethics, history, and social justice risks dismissing lived experience and marginalizing non-quantitative wisdom.`, `That numbers do not exist in the natural world.`, `That all qualitative researchers should be dismissed from universities.`], answer: 1, explain: `The counter-text warns against scientism that devalues legitimate qualitative and humanistic insights.` },
      { id: '25i6', type: 'mc', tag: 'Vocabulary in context', q: `In scientific methodology, what does the term "p-hacking" refer to?`, options: [`Stealing passwords from university computers.`, `Manipulating data analysis or testing multiple variables until a statistically significant result appears by chance.`, `Publishing articles in open-access journals.`, `Translating medical papers into multiple languages.`], answer: 1, explain: `P-hacking involves data dredging to produce artificial statistical significance.` },
      { id: '25i7', type: 'mc', tag: 'Critical thinking', q: `What is the hallmark of "epistemic modesty" in argumentative writing?`, options: [`Claiming that one knows absolutely nothing about any topic.`, `Linguistically qualifying assertions to match the limitations, uncertainties, and provisional nature of the supporting data.`, `Refusing to express any opinion in an essay.`, `Agreeing with every opposing viewpoint simultaneously.`], answer: 1, explain: `Epistemic modesty matches linguistic assertion strength to empirical evidence strength.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Epistemic modality & hedging vs boosting',
        lead: `C1 writers calibrate the exact degree of certainty in their claims by balancing epistemic hedging (*suggests, indicates, is likely to, tentatively*) with authoritative boosting (*substantiates, establishes, conclusively demonstrates*).`,
        examples: [
          `The preliminary data *would suggest that* the intervention *may* reduce symptoms. (Hedging)`,
          `Multiple independent meta-analyses *conclusively demonstrate* that the drug reduces mortality. (Boosting)`,
          `While these findings *appear to corroborate* the initial hypothesis, further replication *is arguably necessary*. (Calibrated balance)`
        ],
        questions: [
          `How does over-boosting (e.g., "This clearly proves beyond all doubt that...") weaken an analytical argument when the data is limited?`,
          `Notice how modal auxiliaries (*may, might, could*), adverbs (*plausibly, ostensibly, arguably*), and cognitive verbs (*indicate, point to, imply*) establish academic rigor.`
        ],
        explain: `Academic and professional authority is earned through precision. Unhedged over-generalizations invite immediate rebuttal; calibrated claims demonstrate that you understand the boundaries of evidence.`,
        compare: [
          [`Over-boosted / Crude`, `This graph proves that social media destroys mental health completely.`],
          [`Epistemically calibrated`, `The observational data strongly indicates a correlation between excessive social media consumption and elevated anxiety, though confounding lifestyle variables preclude a definitive causal claim.`]
        ],
        practice: [
          { q: `Calibrate this dogmatic claim using appropriate hedging: "Eating organic vegetables guarantees you will never get cancer."`, a: `Epidemiological studies suggest that a diet rich in organic vegetables may be associated with reduced cancer risks, although definitive causation remains unestablished.` },
          { q: `Strengthen this overly hesitant sentence using legitimate evidentiary boosting based on multiple meta-analyses: "Maybe smoking is possibly somewhat bad for lungs."`, a: `Decades of converging empirical research conclusively establish that tobacco smoking causes severe pulmonary disease.` }
        ],
        radar: [
          `Do not strip your writing of all conviction; use boosting when the evidentiary consensus is overwhelming (e.g., anthropogenic climate change, tobacco harm).`,
          `Avoid vacuous hedging ("It is sort of possible that maybe..."); ensure your hedges specify the exact dimension of uncertainty.`
        ],
        help: `Use epistemic verbs to introduce evidence: *The findings suggest / The evidence indicates / The data lends support to the hypothesis that...*`
      },
      {
        title: 'Focus 2 · Evaluating and framing evidentiary hierarchies',
        lead: `Sophisticated discourse integrates methodological vocabulary to classify claims by their structural validity (*observational correlation, randomized intervention, anecdotal testimonial, systematic synthesis*).`,
        examples: [
          `While the testimonial provides compelling qualitative nuance, it cannot substitute for a controlled clinical trial.`,
          `The authors conflate an observational correlation with a verified causal mechanism.`,
          `Aggregating nineteen independent trials into a meta-analysis substantially reduces experimental noise.`
        ],
        questions: [
          `How does identifying the *methodological tier* of an argument elevate a debate above simple personal disagreement?`,
          `Notice the precision of terms: *sample size, confounding variables, selection bias, replicability, statistical significance*.`
        ],
        explain: `When critiquing an argument, attack the evidential foundation rather than the author\'s character. Showing that a conclusion exceeds its evidentiary license is the most devastating form of rational rebuttal.`,
        compare: [
          [`Informal critique`, `I don't believe this article because the author is biased.`],
          [`Methodological critique`, `The study’s reliance on a non-randomized, self-selected sample introduces severe selection bias, rendering its broad generalizations unsupportable.`]
        ],
        practice: [
          { q: `Deconstruct a claim based on an online survey of 50 volunteers: "Our survey proves that 90% of citizens support the new tax."`, a: `The survey’s reliance on a self-selected sample of fifty voluntary participants introduces severe selection bias, precluding any statistically valid inference about the broader electorate.` }
        ],
        radar: [
          `Ensure technical research terms are used accurately; do not confuse "sample size" with "population" or "correlation" with "causation."`
        ],
        help: `Frame evidentiary limits cleanly: "While the qualitative testimony is illuminating, its evidentiary weight is limited by the absence of a control group."`
      }
    ],
    vocab: [
      ['epistemic', 'adjective', 'Relating to knowledge, the degree of its validation, and the cognitive justification for belief.', 'We must evaluate the epistemic justification behind the policy.', 'The claim lacks sufficient epistemic grounding.', ['epistemic modesty', 'epistemic justification', 'epistemic validity'], ['cognitive', 'intellectual', 'theoretical'], 'Philosophical adjective.', '/ˌep.ɪˈstiː.mɪk/', null],
      ['conflate', 'verb', 'To combine or blend two or more distinct concepts, ideas, or pieces of data into one, often causing confusion.', 'Commentators routinely conflate correlation with causation.', 'The article conflated public opinion with empirical fact.', ['conflate concepts', 'conflate correlation with causation', 'conflate issues'], ['confuse', 'blend', 'merge'], 'Analytical verb.', '/kənˈfleɪt/', 'distinguish'],
      ['replicability', 'noun', 'The quality of being able to be repeated or reproduced with consistent results in independent scientific trials.', 'Replicability is the bedrock of scientific credibility.', 'The study failed basic tests of replicability.', ['study replicability', 'replicability crisis', 'empirical replicability'], ['reproducibility', 'repeatability', 'consistency'], 'Scientific noun.', '/ˌrep.lɪ.kəˈbɪl.ə.ti/', 'unrepeatability'],
      ['anecdotal', 'adjective', 'Based on personal accounts, individual stories, or casual observation rather than systematic investigation.', 'Anecdotal evidence cannot establish epidemiological safety.', 'Her claim relied entirely on anecdotal reports.', ['anecdotal evidence', 'anecdotal account', 'purely anecdotal'], ['unscientific', 'informal', 'unsubstantiated'], 'Methodological adjective.', '/ˌæn.ɪkˈdoʊ.təl/', 'empirical'],
      ['confounding', 'adjective', 'Causing confusion or distorting results by introducing an unmeasured external variable.', 'Socioeconomic status acted as a major confounding variable.', 'The researchers controlled for confounding factors.', ['confounding variable', 'confounding factor', 'confounding effect'], ['distorting', 'interfering', 'obscuring'], 'Statistical adjective.', '/kənˈfaʊn.dɪŋ/', null],
      ['falsifiable', 'adjective', 'Capable of being proven false, refuted, or tested against empirical observation.', 'Karl Popper argued that scientific theories must be falsifiable.', 'A conspiracy theory is rarely falsifiable.', ['falsifiable hypothesis', 'falsifiable claim', 'empirically falsifiable'], ['testable', 'refutable', 'verifiable'], 'Epistemological adjective.', '/ˈfɔːl.sɪ.faɪ.ə.bəl/', 'unfalsifiable'],
      ['provisional', 'adjective', 'Arranged or established for the present, but subject to revision, modification, or correction later.', 'Scientific conclusions are always provisional pending new data.', 'We adopted a provisional hypothesis.', ['provisional conclusion', 'provisional degree of belief', 'provisional consensus'], ['tentative', 'temporary', 'conditional'], 'Formal adjective.', '/prəˈvɪʒ.ən.əl/', 'permanent'],
      ['corroborate', 'verb', 'To confirm, support, or give additional weight to a statement, theory, or finding with evidence.', 'Independent laboratory tests corroborated the initial discovery.', 'Archaeological findings corroborated the historical text.', ['corroborate findings', 'corroborate evidence', 'corroborate the claim'], ['confirm', 'substantiate', 'validate'], 'Formal verb.', '/kəˈrɒb.ə.reɪt/', 'contradict'],
      ['substantiate', 'verb', 'To provide evidence to support or prove the truth of a claim or assertion.', 'The plaintiff failed to substantiate the allegations of fraud.', 'The hypothesis was substantiated by clinical trials.', ['substantiate a claim', 'substantiate allegations', 'substantiate hypotheses'], ['prove', 'support', 'verify'], 'Formal verb.', '/səbˈstæn.ʃi.eɪt/', 'disprove'],
      ['heuristic', 'noun', 'A practical mental shortcut or rule of thumb that facilitates problem-solving and decision-making.', 'The pyramid of evidence is a useful heuristic for evaluating medical claims.', 'Cognitive heuristics can lead to systematic errors in judgment.', ['cognitive heuristic', 'useful heuristic', 'evaluative heuristic'], ['rule of thumb', 'mental shortcut', 'framework'], 'Cognitive noun.', '/hjʊəˈrɪs.tɪk/', null]
    ],
    chunks: [
      ['proportion belief to the evidence', 'The rational principle of matching one\'s degree of certainty to the quality of supporting data.', 'Stating core epistemic principle', 'Philosophical · formal', 'Rational thinkers must proportion belief to the evidence.', 'Introduce critical thinking standard.', `In accordance with Humean philosophy, we should proportion our belief to the available empirical evidence.`, 'Classic Humean chunk.'],
      ['the hierarchy of evidence', 'The structured ranking of research methodologies based on resistance to bias.', 'Evaluating methodology', 'Academic · scientific', 'Case studies occupy the lowest tier in the hierarchy of evidence.', 'Categorize research claims.', `When evaluated against the hierarchy of evidence, randomized trials outweigh anecdotal testimony.`, 'Methodological chunk.'],
      ['epistemic modesty', 'The practice of qualifying claims and recognizing the limits of one\'s knowledge.', 'Demonstrating intellectual maturity', 'Essayistic · scholarly', 'Good scholarship is characterized by epistemic modesty and clear hedging.', 'Praise rigorous writing.', `Epistemic modesty prevents researchers from overstating their preliminary findings.`, 'High-register style chunk.'],
      ['the replicability crisis', 'The widespread methodological failure to reproduce published experimental findings.', 'Critiquing scientific literature', 'Scientific · critical', 'The replicability crisis exposed widespread publication bias in psychology.', 'Evaluate published studies.', `We cannot accept a single study uncritically in light of the ongoing replicability crisis.`, 'Contemporary science chunk.'],
      ['an unmeasured confounding variable', 'A hidden factor that distorts the observed statistical relationship between two variables.', 'Deconstructing correlations', 'Statistical · analytical', 'Dietary habits may act as an unmeasured confounding variable.', 'Critique observational studies.', `The observed link between coffee and longevity was distorted by an unmeasured confounding variable: exercise.`, 'Analytical rigor chunk.'],
      ['epistemically fragile', 'Lacking robust, reliable, or verifiable grounds of proof.', 'Dismissing weak claims', 'Philosophical · critical', 'Anecdotal testimonials are epistemically fragile and vulnerable to bias.', 'Deconstruct viral claims.', `Relying on personal memory makes historical claims epistemically fragile.`, 'Precise critique chunk.'],
      ['provisional degree of confidence', 'A tentative level of belief subject to revision as new evidence emerges.', 'Explaining Bayesian thinking', 'Epistemological · formal', 'We assign a provisional degree of confidence to the hypothesis.', 'Explain rational belief.', `A critical thinker holds conclusions with a provisional degree of confidence rather than dogmatic certainty.`, 'Nuanced reasoning chunk.'],
      ['regression to the mean', 'The statistical tendency for extreme scores or events to return toward average levels over time.', 'Explaining medical illusions', 'Statistical · psychological', 'Patients often confuse regression to the mean with the effectiveness of an unproven cure.', 'Deconstruct alternative medicine claims.', `The patient’s recovery was driven by natural regression to the mean rather than the miracle pill.`, 'Statistical reasoning chunk.'],
      ['conflate correlation with causation', 'Mistakenly assuming that because two events occur together, one caused the other.', 'Highlighting logical fallacy', 'Logical · critical', 'The media constantly conflates correlation with causation in nutrition headlines.', 'Identify reasoning errors.', `To assume that ice cream sales cause shark attacks is to conflate correlation with causation.`, 'Essential critical chunk.'],
      ['converging lines of independent evidence', 'Multiple distinct sources of proof pointing to the same objective conclusion.', 'Defending robust consensus', 'Scientific · formal', 'The theory is corroborated by converging lines of independent evidence.', 'Establish scientific consensus.', `Climate change is established not by one computer model, but by converging lines of independent evidence.`, 'Consensus building chunk.']
    ],
    collocations: [
      [`A rational thinker must ______ belief to the evidence.`, [`proportion`, `conflate`, `substantiate`, `corroborate`], 0, `Proportion belief is the established philosophical collocation.`],
      [`Anecdotal accounts are ______ fragile and easily distorted by bias.`, [`epistemically`, `discretionarily`, `coercively`, `rudimentarily`], 0, `Epistemically fragile describes weak justification.`],
      [`The researchers controlled for unmeasured ______ variables.`, [`confounding`, `panoptic`, `innocent`, `visceral`], 0, `Confounding variables is the standard statistical term.`],
      [`The consensus is supported by ______ lines of independent evidence.`, [`converging`, `ephemeral`, `profane`, `salvage`], 0, `Converging lines describes multiple proofs agreeing.`]
    ],
    upgrades: [
      [`My uncle took this medicine and got better, so it works for everyone.`, `While this anecdotal recovery is personally compelling, individual case reports cannot control for placebo effects or regression to the mean, rendering the general efficacy claim epistemically ungrounded.`],
      [`This study definitely proves that coffee makes you live longer.`, `The observational data suggests a positive correlation between coffee consumption and longevity, though unmeasured confounding lifestyle variables preclude a definitive causal claim.`],
      [`Science changes its mind all the time so you can't trust anything.`, `Scientific consensus operates probabilistically, assigning a provisional degree of confidence to claims based upon converging lines of independent empirical evidence.`]
    ],
    think: {
      title: 'The Epistemic Pyramid and the Mechanics of Proof',
      lead: 'Deconstruct claims across the hierarchy of evidence to calibrate degree of belief and expose methodological vulnerabilities.',
      defs: [
        ['Bayesian Belief Updating', `The epistemic practice of adjusting one\'s probability estimate for a hypothesis as new, independent evidence becomes available.`],
        ['Publication Bias (The File-Drawer Problem)', `The tendency of scientific journals to publish positive, exciting results while leaving studies with null or negative findings unpublished.`]
      ],
      items: [
        {
          id: '25t1',
          tag: 'Evidentiary Hierarchy',
          title: 'Anecdote vs. Meta-Analysis',
          task: `Explain why an emotional testimonial from a patient who recovered from illness holds less evidential weight than a meta-analysis of ten randomized trials, even when the testimonial is 100% sincere.`,
          guide: `Differentiate between emotional sincerity and epistemic validity. Address the placebo effect, spontaneous remission, and regression to the mean.`
        },
        {
          id: '25t2',
          tag: 'Causal Inference',
          title: 'The Observational Trap',
          task: `A study of 100,000 people finds that individuals who consume expensive wine have lower rates of cardiovascular disease. Identify at least three confounding variables that prevent drawing a direct causal conclusion.`,
          guide: `Analyze wealth, access to superior healthcare, balanced diet, leisure time, and stress levels as confounding socio-economic drivers.`
        },
        {
          id: '25t3',
          tag: 'Critical Epistemology',
          title: 'The Limits of Scientism',
          task: `Evaluate the counter-argument: what forms of legitimate human knowledge (e.g., historical analysis, moral philosophy, qualitative human rights research) cannot be evaluated using the clinical trial pyramid?`,
          guide: `Show that ethical values, subjective meaning, and historical uniqueness require qualitative, contextual, and hermeneutic forms of evidence.`
        },
        {
          id: '25t4',
          tag: 'Linguistic Calibration Lab',
          title: 'Calibrating the Claim',
          task: `Read three claims of varying strength (preliminary lab study, large cohort correlation, replicated meta-analysis) and draft three corresponding sentences demonstrating precise epistemic hedging and boosting.`,
          guide: `Demonstrate mastery of 'indicates a provisional link', 'is associated with', and 'conclusively substantiates the causal mechanism'.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Mastering Epistemic Hedging, Boosting, and Evidentiary Precision',
        text: `In analytical essays on science, policy, and philosophy, intellectual credibility depends entirely upon matching the strength of your grammatical assertions to the strength of the underlying evidence. Over-claiming destroys authority; precise calibration builds trust.`,
        weak: `This study proves that video games make children violent. It is 100% true and nobody can deny it.`,
        strong: `While preliminary laboratory experiments indicate a modest short-term increase in physiological arousal, extensive longitudinal meta-analyses fail to corroborate a direct causal link between video game consumption and real-world violent behavior.`
      },
      short: {
        kind: 'Methodological critique',
        title: 'Evaluating an Evidentiary Claim',
        min: 180,
        max: 260,
        prompt: `Select a popular health, dietary, or sociological claim that relies primarily on anecdotal evidence or observational correlation. In a concise critique (180–260 words), deconstruct its methodological vulnerabilities using precise epistemic hedging and terms from the hierarchy of evidence (*confounding variable, selection bias, regression to the mean*).`,
        support: [
          `State the popular claim clearly.`,
          `Identify the tier of evidence it relies upon (anecdote, self-reported survey, unadjusted correlation).`,
          `Explain at least two confounding factors or methodological biases that undermine its causal validity.`,
          `Conclude with a calibrated provisional assessment of the claim.`
        ],
        guide: [
          `Use disciplined C1 hedging: "The data indicates an association rather than a verified causal mechanism."`,
          `Incorporate key chunks: *epistemically fragile*, *conflate correlation with causation*, *unmeasured confounding variable*.`
        ]
      },
      main: {
        kind: 'Argument analysis essay',
        title: 'What Counts as Evidence? The Architecture of Proof and the Calibration of Belief',
        min: 500,
        max: 750,
        main: true,
        prompt: `When should we believe a claim? In an analytical essay (500–750 words), evaluate the criteria required for rational epistemic justification in the modern world. Contrast the hierarchy of scientific evidence (anecdotes vs randomized meta-analyses) with humanistic/qualitative ways of knowing. Address the challenges posed by the replicability crisis and confounding variables. Deploy sophisticated epistemic hedging and boosting, precise methodological vocabulary, and balanced argument architecture.`,
        support: [
          `Introduction: Introduce Hume’s maxim on proportioning belief to evidence; frame the tension between narrative intuition and empirical rigor.`,
          `Body Paragraph 1: Analyze the hierarchy of evidence—why anecdotes and observational correlations are epistemically fragile compared to randomized trials and meta-analyses.`,
          `Body Paragraph 2: Address the complexities of modern science—the replicability crisis, publication bias, and why single studies cannot provide definitive proof.`,
          `Body Paragraph 3: Confront the counter-perspective—the limits of pure scientism and the legitimate epistemic value of qualitative testimony, historical analysis, and lived experience.`,
          `Conclusion: Formulate a synthesis on probabilistic belief calibration and epistemic modesty as core intellectual virtues.`
        ],
        guide: [
          `Demonstrate mastery of epistemic modals: *would suggest*, *plausibly indicates*, *conclusively demonstrates*, *is arguably the case*.`,
          `Deploy essential vocabulary: *epistemic justification*, *confounding variables*, *replicability crisis*, *meta-analysis*, *provisional confidence*.`,
          `Maintain an objective, scholarly, and epistemically calibrated register throughout.`
        ]
      }
    },
    edit: {
      checklist: [
        `Are claims properly calibrated using epistemic hedging (*suggests, is associated with*) vs legitimate boosting (*conclusively establishes*)?`,
        `Does the text distinguish clearly between correlation, causation, and confounding variables?`,
        `Are terms from the hierarchy of evidence (*meta-analysis, randomized controlled trial, anecdotal account*) used accurately?`,
        `Does the argument avoid the extremes of naive credulity and unconstructive cynicism?`,
        `Is the tone consistently formal, objective, and analytical?`
      ],
      challenges: [
        {
          id: '25e1',
          title: 'Calibrating Over-Claimed Assertions',
          bad: `This one experiment in Norway totally proved that homework is useless and destroys children's brains completely.`,
          task: `Revise using academic register, epistemic hedging, and methodological precision (*preliminary finding, observational scope, unmeasured variables*).`,
          good: `While the Norwegian study provides valuable observational data regarding academic stress, its limited sample size and geographical specificity preclude the sweeping conclusion that homework is universally counterproductive.`
        },
        {
          id: '25e2',
          title: 'Upgrading Methodological Critique',
          bad: `The survey is bad because they only asked people who love gym, so of course they said working out is good.`,
          task: `Rewrite using formal statistical concepts (*selection bias, non-representative sample, external validity*).`,
          good: `By sampling exclusively from active fitness enthusiasts, the survey introduced severe selection bias, fundamentally compromising its external validity and statistical generalizability.`
        }
      ]
    },
    retrieve: {
      content: `Why is an observational study showing a strong correlation between two variables insufficient to prove a direct causal relationship?`,
      contentGuide: `Observational studies cannot rule out unmeasured confounding variables, reverse causality, or healthy-user biases that may generate the statistical link.`
      ,
      grammar: `Rewrite this unhedged assertion into a calibrated C1 scientific claim: "Smartphones cause depression in teenagers."`,
      grammarGuide: `Expected: "Extensive cross-sectional data suggests an association between heavy smartphone use and elevated depressive symptoms, though establishing direct causality requires further longitudinal controls."`,
      reasoning: `What is David Hume\'s core maxim regarding evidence, and how does it protect thinkers from both gullibility and dogmatic cynicism?`,
      reasoningGuide: `Hume asserted that "A wise man proportions his belief to the evidence," promoting a probabilistic approach where confidence scales with the quality, independence, and replicability of empirical data.`,
      summary: `In Unit 25, you launched Module 6 by investigating what constitutes valid evidence. You mastered epistemic hedging, evidentiary boosting, the hierarchy of proof, and methodological vocabulary.`
    }
  });

  K.units['25'].listening = [
    {
      id: '25l1',
      title: 'Dialogue: The Anatomy of a Medical Headline',
      format: 'Discussion between a science journalist and an epidemiologist',
      lead: 'Listen to an analysis of why media headlines frequently exaggerate observational studies and mislead the public.',
      audio: 'audio/unit-25-listening-1.mp3',
      transcript: `[Journalist]: Dr. Aris, this morning three major news outlets ran the headline: 'Eating Dark Chocolate Halves the Risk of Heart Attacks.' When our readers see that, they assume it's an established medical fact. How should a critical reader approach a headline like this?\n\n[Epidemiologist]: The first step is always to look past the sensational headline and locate the primary source. In this case, the claim originated from a self-reported dietary survey of four hundred people over six months. That places it squarely in the observational category.\n\n[Journalist]: Which means it cannot control for confounding lifestyle variables.\n\n[Epidemiologist]: Precisely. People who can afford high-quality dark chocolate in that cohort also happened to have higher incomes, better healthcare access, and lower smoking rates. The chocolate consumption was likely a marker of socio-economic advantage rather than the biological cause of cardiac protection.\n\n[Journalist]: So the journalists conflated an observational correlation with a causal mechanism.\n\n[Epidemiologist]: Exactly. To make a causal claim, we would need a multi-center randomized controlled trial with blinded controls and hard clinical endpoints. Until then, the appropriate epistemic stance is modesty: chocolate is delicious, but it is not a proven cardiac therapeutic.`,
      questions: [
        {
          id: '25l1q1',
          type: 'mc',
          q: 'Why was the headline regarding dark chocolate misleading according to the epidemiologist?',
          options: [
            'Because chocolate is poisonous to humans.',
            'Because the study was merely an observational survey that failed to control for confounding socio-economic variables.',
            'Because the researchers refused to publish their findings in English.',
            'Because the chocolate used was milk chocolate rather than dark chocolate.'
          ],
          answer: 1,
          explain: 'The epidemiologist points out that observational surveys cannot isolate chocolate from confounding factors like income and healthcare access.'
        },
        {
          id: '25l1q2',
          type: 'mc',
          q: 'What type of study would be required to prove a genuine causal relationship?',
          options: [
            'Another online poll with 1,000 respondents.',
            'A multi-center randomized controlled trial with blinded controls and clinical endpoints.',
            'A television documentary featuring celebrity interviews.',
            'A survey of chocolate factory workers.'
          ],
          answer: 1,
          explain: 'A randomized controlled trial (RCT) is required to establish causal efficacy.'
        }
      ]
    },
    {
      id: '25l2',
      title: 'Monologue: The Replicability Crisis and the Nature of Truth',
      format: 'Academic lecture on scientific epistemology',
      lead: 'A lecture examining the systemic causes of the replicability crisis and why science operates probabilistically.',
      audio: 'audio/unit-25-listening-2.mp3',
      transcript: `When we teach the scientific method in secondary school, we present an idealized model: a researcher forms a hypothesis, designs an experiment, gathers data, and discovers a definitive truth. In the real world of professional academia, however, the process is far more vulnerable to human frailty.\n\nThe past two decades have witnessed what is now universally recognized as the 'replicability crisis.' When independent research consortia attempted to replicate hundreds of landmark studies in psychology, medicine, and social science, over half of the findings failed to produce statistically significant results a second time.\n\nWhy did this occur? The causes are systemic: publication bias favors novel and shocking results over null findings; researchers engage in subconscious p-hacking to push data over the threshold of significance; and academic careers depend upon high-volume publishing rather than painstaking replication.\n\nThis crisis does not mean that science is invalid; rather, it reminds us that science is not an encyclopedia of permanent dogmas, but a provisional and self-correcting process. A single peer-reviewed paper is not proof. Real confidence emerges only when multiple independent laboratories, using distinct methodologies, converge upon the same conclusion over time.`,
      questions: [
        {
          id: '25l2q1',
          type: 'mc',
          q: 'What primary systemic factors caused the replicability crisis according to the lecturer?',
          options: [
            'A shortage of electricity in research universities.',
            'Publication bias favoring novel shocking results, p-hacking, and career pressures to publish rapidly.',
            'The invention of the internet.',
            'A decline in the number of university students.'
          ],
          answer: 1,
          explain: 'The lecturer identifies structural incentives: publication bias, p-hacking, and academic output pressures.'
        },
        {
          id: '25l2q2',
          type: 'mc',
          q: 'How should thinkers view the relationship between science and truth in light of the crisis?',
          options: [
            'As an encyclopedia of unalterable facts.',
            'As a provisional, probabilistic, and self-correcting process where confidence requires independent convergence over time.',
            'As an entirely untrustworthy political ideology.',
            'As a discipline that only applies to chemistry.'
          ],
          answer: 1,
          explain: 'Science is characterized as a self-correcting, provisional process that builds confidence through independent convergence.'
        }
      ]
    }
  ];

  K.units['25'].speaking = {
    part1: [
      { q: `When you read a surprising scientific or health claim online, how do you usually check whether it is reliable?`, guide: `Discuss checking primary sources, looking for institutional consensus, evaluating author credentials, and checking sample sizes.` },
      { q: `Have you ever tried a product or diet because a friend gave it a glowing personal recommendation? Did it work?`, guide: `Reflect on the power of personal testimony versus individual variance and placebo effects.` },
      { q: `Why do you think sensational headlines about miracle cures are so popular on social media?`, guide: `Discuss emotional desire for quick solutions, narrative simplicity, and algorithmic amplification of novelty.` }
    ],
    part2: {
      topic: `Describe a controversial claim or widely believed myth that you initially accepted but later questioned after examining the evidence.`,
      prompts: [
        `What the claim or belief was and where you first encountered it`,
        `Why it initially seemed convincing or plausible to you`,
        `What evidence or methodological flaw caused you to change your mind`,
        `And explain what this experience taught you about evaluating evidence.`
      ],
      guide: `Structure your response logically: context, initial perception, evidentiary turning point (confounding variables, lack of replication), and philosophical reflection on belief calibration.`
    },
    part3: [
      { q: `In an era where anyone can publish data online, how can ordinary citizens distinguish between authentic scientific consensus and corporate propaganda?`, guide: `Discuss peer review, funding transparency, institutional reputations, and independent meta-analyses.` },
      { q: `Can qualitative lived experience ever be more valuable or true than statistical data in solving social problems?`, guide: `Weigh the statistical power of large datasets against the nuanced, contextual truth of human narrative and lived reality.` },
      { q: `How should educational systems teach critical thinking to help students avoid both extreme gullibility and complete cynicism?`, guide: `Advocate for teaching the hierarchy of evidence, cognitive biases, probabilistic reasoning, and epistemic modesty.` }
    ],
    followUp: `If a scientific study has a very small sample size, should the media be prohibited from reporting on it?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'ep·i·ste·mic', 're·pli·ca·bil·i·ty', 'con·found·ing', 'pro·vi·sion·al', 'fal·si·fi·a·ble'.`,
      grammar: `Natural deployment of epistemic hedging ('The data would suggest...', 'This may plausibly indicate...') and evidentiary boosting when appropriate.`,
      discourse: `Coherent, structured argumentation deconstructing methodological claims with precision and academic nuance.`,
      vocabulary: `Effective use of terms such as 'hierarchy of evidence', 'confounding variables', 'selection bias', 'meta-analysis', and 'probabilistic calibration'.`
    }
  };
})(window.KLANG = window.KLANG || {});
