/* UNIT 16 · THE LANGUAGE OF POLITICS */
(function (K) {
  K.units['16'] = K.makeUnit('16', {
    module: 3, title: 'The language', titleEm: 'of politics',
    question: 'Can the same facts create completely different political stories?',
    knowLead: `Language is not a neutral mirror that reflects political facts; it is the primary instrument through which political reality is constructed. In his landmark 1946 essay "Politics and the English Language," George Orwell demonstrated how political speech often serves to make lies sound truthful and murder respectable. Decades later, cognitive linguist George Lakoff proved that political debate is organized around deep, subconscious metaphors and cognitive "frames." The words chosen to describe an event—whether an economic measure is called "tax relief" or "the defunding of schools"—pre-determine what conclusions an audience can reach. Keep the mechanics of framing, clefting, fronting, and rhetorical stance in mind as you read.`,
    terms: [
      ['Framing', `The psychological and linguistic process of selecting and highlighting certain aspects of a perceived reality to promote a particular problem definition, causal interpretation, and moral evaluation.`],
      ['Conceptual metaphor', `The cognitive mechanism of understanding one abstract domain in terms of another concrete domain (e.g. "politics is war," "the nation is a family").`],
      ['Euphemism', `A mild, vague, or indirect word or expression substituted for one considered too harsh, blunt, or politically damaging (e.g. "collateral damage" for civilian casualties).`],
      ['Cleft sentence', `A complex sentence structure that splits a single clause into two parts to place intense focus on a specific element (e.g. "It was the deregulation that caused the collapse").`],
      ['Hedging and boosting', `Linguistic strategies used to either soften the certainty of a claim (hedging: "seems to indicate," "arguably") or intensify its authority and conviction (boosting: "clearly," "undeniably").`]
    ],
    views: [
      'Two understandings of political language',
      'The instrumental transparency view',
      `Language is a communicative tool used to convey factual policies and ideological arguments. Voters evaluate political rhetoric based on empirical results and logical coherence.`,
      'The constitutive framing view',
      `Language actively constructs political reality. Whoever controls the dominant metaphors and frames determines what is considered common sense, rendering opposing views literally unthinkable.`,
      `The core question is whether democratic citizens can deconstruct political rhetoric to perceive underlying material facts, or if political perception is inescapably mediated by narrative framing.`
    ],
    knowPrompt: `Consider the phrases "tax relief" versus "public investment." What subconscious metaphors and moral assumptions does each phrase activate in a listener's mind?`,
    knowGuide: [
      `Notice that "relief" implies an affliction or pain, making the person who removes it a hero and the tax an unfair burden.`,
      `Notice that "investment" implies building shared capital, generating future returns, and collective responsibility.`
    ],
    read: {
      main: {
        format: 'Linguistic & political treatise', title: 'The Architecture of the Unspoken: How Rhetoric Constructs Political Reality',
        standfirst: `Political warfare is not fought with artillery; it is fought with metaphors, syntax, and the deliberate engineering of common sense.`,
        pull: { after: 7, text: `When a political frame becomes invisible, it ceases to be an argument and becomes the room in which everyone is forced to stand.` },
        notes: { 1: `<b>George Orwell</b> published <i>Politics and the English Language</i> in 1946, exposing political obfuscation.`, 4: `<b>George Lakoff</b> published <i>Don't Think of an Elephant!</i> in 2004, analyzing conservative and progressive framing in American politics.` },
        paras: [
          `In the spring of 1946, amidst the ruins of post-war Europe, George Orwell published what remains the most influential critique of political discourse in the modern era: "Politics and the English Language." Orwell observed that in an age of totalitarian propaganda, state terror, and imperial collapse, political speech and writing were largely the defense of the indefensible. Things like the continuance of British rule in India, the Russian purges and deportations, and the dropping of atom bombs on Japan could indeed be conducted, but only by using phrases that were so vague and bloodless that they numbed the moral imagination of the public. Political language had to consist largely of euphemism, question-begging, and sheer cloudy vagueness.`,
          `Orwell understood that political corruption begins with linguistic decay. When a government bombs a defenseless village, drives its inhabitants out into the countryside, and machine-guns its cattle, it does not describe its actions in concrete nouns and vivid verbs. It calls the operation "pacification." When millions of peasants are robbed of their land and forced to trek along roads with nothing more than they can carry, it is termed "transfer of population" or "rectification of frontiers." When people are imprisoned for years without trial, or shot in the back of the neck, it is labeled "elimination of unreliable elements." Such phraseology is needed because it names things without calling up mental pictures of them. The purpose of political language is to manufacture a sterile linguistic screen between human suffering and political power.`,
          `Nearly six decades after Orwell’s essay, cognitive linguist George Lakoff introduced a revolutionary framework that deepened our understanding of political language: the theory of cognitive framing. Lakoff demonstrated that human beings do not think in raw, unmediated facts or abstract mathematical logic. Rather, our brains think in "frames"—deep mental structures that shape how we perceive the world, define problems, and establish what counts as common sense. Every word we hear activates a frame in our neural circuitry. And crucially, when you repeat your opponent's words—even to deny or refute their claim—you inadvertently strengthen the neural frame they created.`,
          `Lakoff’s most famous illustration is the phrase "tax relief," introduced with ruthless discipline by American conservative strategists in the early 2000s. Consider the hidden conceptual architecture embedded within the single word "relief." To have relief, there must be an affliction. There must be an afflicted party—an innocent victim who is suffering. And there must be an affliction-bearer—the hero who steps in to alleviate the pain. The person who imposes the affliction is, by definition, a tormentor or a villain. When conservative politicians spoke of "tax relief," they were not merely proposing a policy; they were activating a subconscious moral drama. Taxes were framed as an unjust affliction, taxpayers as suffering victims, and the government as an extortionist thief.`,
          `What happened when progressive politicians opposed the policy? They went onto television broadcasts and declared: "We are against tax relief for the wealthy!" In doing so, they committed fatal cognitive self-sabotage. By using the phrase "tax relief," they accepted their opponent’s foundational metaphor. They reinforced the idea that taxation is an affliction, while simultaneously casting themselves in the role of villains who wished to preserve suffering. Had they understood cognitive framing, they would have refused the term entirely, substituting an alternative conceptual framework: "public investment," "the membership fee for a civilized democracy," or "shared national infrastructure."`,
          `This dynamic reveals the central law of political communication: political battles are won or lost at the level of vocabulary and syntax long before election day. The party that succeeds in establishing the dominant frame dictates the terms of the debate. When an economic proposal to limit carbon emissions is framed as a "job-killing energy tax," environmentalists are forced onto the defensive; when the exact same policy is framed as "clean energy innovation and modernization," fossil fuel lobbyists find themselves isolated. The underlying material facts remain completely identical in both scenarios; what changed was the conceptual room in which the facts were presented.`,
          `Beyond vocabulary and metaphor, political power operates through the subtle mechanics of grammar and syntax. Consider the deployment of grammatical voice and agency. When a corporation announces mass layoffs, it rarely uses the active voice: "The Chief Executive fired five thousand workers to increase shareholder dividends." Instead, the corporate press release employs the impersonal passive and nominalisation: "Five thousand positions were eliminated in a strategic restructuring." The human victims are erased, the corporate perpetrator vanishes from the sentence, and a brutal act of economic dispossession is transformed into a natural, inevitable meteorological event.`,
          `Syntax also offers powerful tools for focus and emphasis through cleft sentences and fronting. When an investigative journalist writes: "It was the deregulation of the banking sector that triggered the 2008 financial collapse," the cleft structure (*It was X that...*) performs an aggressive rhetorical act. It isolates a single causal culprit, pushes all alternative explanations into the background, and delivers an authoritative moral verdict. Similarly, when a politician fronts a prepositional phrase—"In the face of unprecedented foreign aggression, we had no choice but to suspend civil liberties"—they position external threat as the dominant grammatical reality, rendering the destruction of democratic rights appear as a passive, inescapable necessity.`,
          `Furthermore, political communicators are masters of hedging and boosting—the calibration of epistemic stance. When promoting their own untested ideological policies, political leaders boost their claims with unconditional certainty: "This reform will *undeniably* unleash explosive economic growth," or "The evidence is *categorically* clear." By eliminating all qualifying clauses, they project strength and resolve. Conversely, when forced to acknowledge uncomfortable structural failures—such as rising child poverty or corporate price-gouging—they retreat into extreme hedging: "The data *appears to suggest* that certain households *may be experiencing* temporary challenges." Hedging is deployed to minimize state responsibility, while boosting is used to manufacture manufactured consensus.`,
          `To exist as a truly autonomous democratic citizen in the twenty-first century requires developing ruthless rhetorical literacy. We must learn to read political language not merely for what it explicitly states, but for the metaphors it activates, the agents it conceals, the frames it presupposes, and the questions it makes impossible to ask. When we deconstruct political rhetoric, we do not become cynical nihilists who believe that all truth is fiction. On the contrary: we strip away the cloudy, manipulative screen of power so that we can finally confront the material, human reality that lies beneath.`
        ]
      },
      counter: {
        format: 'Philosophical rebuttal', title: 'The Limits of Linguistic Determinism',
        standfirst: `Believing that language entirely creates reality risks descending into a postmodern relativism that ignores material truth.`,
        paras: [
          `The linguistic analysis of political framing is an indispensable critical tool. However, carried to its extreme, it risks collapsing into a fashionable form of linguistic determinism that overstates the power of words while ignoring the stubborn reality of material conditions.` ,
          `A government can invent the most sophisticated, focus-grouped euphemisms in the world, but if citizens cannot afford bread, if hospitals lack basic antibiotics, or if bridges collapse into rivers, no amount of rhetorical framing will convince the public that the economy is thriving. Political reality is not merely a text to be deconstructed; it is a physical and economic environment that people experience through their bodies, their bank accounts, and their daily labor.` ,
          `Furthermore, treating political struggle as purely a battle of words breeds an elitist condescension toward ordinary voters. It implies that working-class citizens who vote for conservative or populist candidates have simply been "hypnotized" by clever metaphors and frames, rather than acting on legitimate, rational grievances regarding their communities and livelihoods.` ,
          `Language shapes how facts are interpreted, but it cannot permanently erase material facts. The ultimate test of political legitimacy is not whether a party can win a debate on television through clever syntax, but whether its policies actually improve the physical security, material prosperity, and democratic dignity of human beings in the real world.`
        ]
      }
    },
    sources: [
      { title: 'Politics and the English Language (George Orwell)', url: 'https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/', note: 'Foundational 1946 essay on euphemism, political obfuscation, and prose clarity.' },
      { title: 'Don’t Think of an Elephant! Know Your Values and Frame the Debate (George Lakoff)', url: 'https://www.chelseagreen.com/product/dont-think-of-an-elephant-2nd-edition/', note: 'Seminal work on cognitive framing and conceptual metaphors in political discourse.' },
      { title: 'Language and Power (Norman Fairclough)', url: 'https://www.routledge.com/Language-and-Power/Fairclough/p/book/9781138779655', note: 'Critical Discourse Analysis (CDA) methodology exploring how syntax reproduces institutional power.' }
    ],
    interpret: [
      { id: '16i1', type: 'mc', tag: 'Main idea', q: `What is the central thesis of the main treatise regarding political language?`, options: [`Political language is purely decorative and has no real impact on elections.`, `Political language actively constructs reality through cognitive frames, conceptual metaphors, and grammatical choices that pre-determine public perception.`, `George Orwell proved that English is the only language capable of telling lies.`, `Politicians should only speak using mathematical equations.`], answer: 1, explain: `The essay argues that framing, metaphor, and syntax construct political reality and define the boundaries of debate.` },
      { id: '16i2', type: 'mc', tag: 'Inference', q: `Why does George Lakoff argue that repeating your opponent's words (e.g. "We are against tax relief") is fatal to your own argument?`, options: [`Because it violates copyright laws.`, `Because uttering the opponent's phrase reinforces their underlying cognitive frame in the listener's brain.`, `Because politicians should never speak on television.`, `Because words lose their meaning if spoken more than three times.`], answer: 1, explain: `Repeating a phrase activates and strengthens the opponent’s conceptual metaphor (e.g. tax as an affliction).` },
      { id: '16i3', type: 'tf', tag: 'Detail', q: `According to the text, cleft sentences (e.g. "It was the bank deregulation that caused...") are used to spread responsibility equally across all possible actors.`, answer: false, explain: `Paragraph 8 explains that cleft sentences isolate a single culprit and push alternative explanations into the background.` },
      { id: '16i4', type: 'mc', tag: 'Counterpoint argument', q: `What primary limitation of linguistic framing does the counterpoint emphasize?`, options: [`Framing is too expensive for political parties.`, `Rhetorical framing cannot permanently override the stubborn reality of material conditions like poverty, hospital shortages, or inflation.`, `Voters prefer reading long books over listening to speeches.`, `Linguistics is not a real science.`], answer: 1, explain: `The counterpoint stresses that physical and economic reality ultimately constrains the power of words.` },
      { id: '16i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 2, what concrete historical examples of euphemisms does Orwell cite, and what moral interpretation does he derive from their use?`, rows: 4, guide: [`Examples: "pacification" (bombing villages), "transfer of population" (forced displacement), "elimination of unreliable elements" (executions).`, `Interpretation: euphemisms numb the moral imagination by preventing mental pictures of human suffering.`] },
      { id: '16i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the main essay’s analysis of "euphemisms and grammatical voice" (e.g. passive restructuring) explain how institutions conceal moral agency?`, rows: 5, guide: [`Shows how passive verbs and nominalisations remove human perpetrators from sentences, framing layoffs or violence as natural events.`] },
      { id: '16i7', type: 'open', tag: 'Application', q: `Choose one contemporary political or economic phrase used in Brazilian media (e.g. "rombo fiscal," "reforma da previdência," "pacote de bondades") and deconstruct its hidden frame and moral assumptions.`, rows: 5, guide: [`Identify the metaphor: e.g. "rombo" implies a violent hole/leak in a ship; "pacote de bondades" frames social spending as paternalistic gifts rather than rights.`] }
    ],
    notice: [
      {
        title: 'Cleft sentences and fronting for rhetorical focus',
        sub: 'Isolating causes, emphasizing culprits, and controlling sentence perspective',
        examples: [
          `<b>It was the deregulation of credit that</b> triggered the crisis.`,
          `<b>What voters are truly revolting against is</b> the indignity of being ignored.`,
          `<b>In the face of unprecedented economic collapse,</b> the government suspended spending floors.`,
          `<b>Never before has</b> a political party deployed digital bots with such discipline.`
        ],
        questions: [
          `How does an it-cleft (*It was X that Y*) differ in emphasis from a basic SVO sentence (*X triggered Y*)?`,
          `How does a wh-cleft (*What voters want is...*) create dramatic focus on the complement?`,
          `Why does negative fronting (*Never before has...*) require subject-auxiliary inversion?`
        ],
        explain: `<p>High-level argumentative essays use information packaging structures to control reader attention:</p><ul><li><b>It-clefts:</b> <i>It is the tax structure (not individual laziness) that perpetuates poverty.</i></li><li><b>Wh-clefts (pseudo-clefts):</b> <i>What the minister failed to acknowledge was the impact on small businesses.</i></li><li><b>Prepositional fronting:</b> <i>Under the pretext of security, basic freedoms were dismantled.</i></li><li><b>Negative fronting + inversion:</b> <i>Rarely have we witnessed such aggressive rhetoric.</i></li></ul>`,
        compare: { head: ['Standard sentence', 'Cleft / Fronted structure', 'Rhetorical impact'], rows: [['The corporate tax cuts caused the deficit.', 'It was the corporate tax cuts that caused the exploding deficit.', 'Aggressively isolates the single policy cause.'], ['We need institutional reform most.', 'What we need most is comprehensive institutional reform.', 'Positions the solution as a definitive focus.']] },
        practice: [
          [`Rewrite as an it-cleft focusing on "the lack of state regulation": <i>The lack of state regulation enabled predatory lending.</i>`, `It was the lack of state regulation that enabled predatory lending.`, `Uses it-cleft structure for emphasis.`],
          [`Rewrite as a wh-cleft: <i>The media ignored the plight of rural workers.</i>`, `What the media ignored was the plight of rural workers.`, `Uses wh-cleft structure.`],
          [`Front the negative adverb with inversion: <i>The president rarely addressed the nation directly.</i>`, `Rarely did the president address the nation directly.`, `Uses negative fronting with auxiliary inversion.`]
        ],
        radar: [
          { wrong: 'It was the minister which signed the contract.', right: 'It was the minister who signed the contract. / It was the contract that...', why: 'Use who for people and that for things/ideas in it-clefts.' },
          { wrong: 'Seldom the government apologized.', right: 'Seldom did the government apologize.', why: 'Negative fronted adverbs (seldom, rarely, never) require subject-auxiliary inversion.' }
        ],
        help: `<p><b>Em português:</b> Frases clivadas (<i>It was X that...</i> = Foi X que... / <i>What we need is...</i> = O que precisamos é...) e inversão enfática (<i>Rarely did they...</i> = Raramente eles...) direcionam o foco com precisão cirúrgica.</p>`
      },
      {
        title: 'Hedging and boosting: calibrating epistemic commitment',
        sub: 'Mastering the spectrum between authoritative certainty and scholarly caution',
        examples: [
          `The empirical data <b>clearly and undeniably demonstrates</b> a systemic failure. (Boosting)`,
          `The findings <b>appear to indicate</b> a potential correlation between the two policies. (Hedging)`,
          `This measure is <b>arguably</b> the most significant fiscal reform in a generation. (Hedging)`
        ],
        questions: [
          `When does boosting convey legitimate strength, and when does it sound like dogmatic overreach?`,
          `How do hedging adverbs (arguably, plausibly, tentatively) protect a scholar from overclaim?`
        ],
        explain: `<p>Calibrating your certainty is a hallmark of C1 writing:</p><ul><li><b>Boosting (conviction):</b> <i>undeniably, unequivocally, firmly establishes, leaves no doubt that</i>.</li><li><b>Hedging (caution):</b> <i>appears to suggest, arguably, is consistent with, points to a likely</i>.</li></ul>`,
        compare: { head: ['Uncalibrated claim', 'Hedged claim', 'Scholarly precision'], rows: [['This law will destroy the economy.', 'This legislation is widely expected to exert substantial downward pressure on economic growth.', 'Professional analytical stance.']] },
        practice: [
          [`Add appropriate hedging: <i>The new policy caused the drop in unemployment.</i>`, `The new policy appears to have contributed significantly to the drop in unemployment.`, `Uses hedged aspectual verb and adverb.`]
        ],
        radar: [
          { wrong: 'It is 100% proved without doubt that the policy failed.', right: 'The evidence strongly indicates that the policy failed.', why: 'Avoid unacademic conversational boosting like "100% proved".' }
        ],
        help: `<p><b>Em português:</b> <i>Hedging</i> (linguagem de atenuação, como <i>arguably</i>, <i>suggests</i>) e <i>boosting</i> (linguagem de reforço, como <i>undeniably</i>) calibram o nível de certeza em textos acadêmicos.</p>`
      }
    ],
    vocab: [
      ['euphemism', 'noun', 'A mild or indirect word or expression substituted for one considered too harsh or blunt.', 'Political rhetoric relies heavily on euphemism to conceal human suffering.', '“Restructuring” is a common corporate euphemism for layoffs.', ['blatant euphemism', 'rely on euphemism', 'use a euphemism'], ['polite term', 'sanitised word', 'understatement'], 'Rhetoric noun.', '/ˈjuː.fə.mɪ.zəm/', null],
      ['obfuscation', 'noun', 'The action of making something obscure, unclear, or unintelligible.', 'The spokesperson engaged in deliberate obfuscation to avoid answering the scandal.', 'Bureaucratic obfuscation conceals government spending.', ['deliberate obfuscation', 'linguistic obfuscation', 'act of obfuscation'], ['vagueness', 'cloudiness', 'confusion'], 'Critical analytical noun.', '/ˌɒb.fʌsˈkeɪ.ʃən/', 'clarity'],
      ['constitutive', 'adjective', 'Having the power to establish, create, or give organized existence to something.', 'Language is constitutive of political reality, not merely descriptive.', 'Freedom of assembly is a constitutive element of democracy.', ['constitutive of', 'constitutive power', 'constitutive element'], ['foundational', 'formative', 'essential'], 'Philosophical adjective.', '/kənˈstɪt.jʊ.tɪv/', null],
      ['sanitise', 'verb', 'Make something appear more palatable or acceptable by removing crude, offensive, or shocking features.', 'Official press releases sanitise the brutality of military conflict.', 'History textbooks often sanitise colonial violence.', ['sanitise history', 'sanitise violence', 'sanitise rhetoric'], ['cleanse', 'whitewash', 'bowdlerise'], 'Critical verb.', '/ˈsæn.ɪ.taɪz/', null],
      ['extortionist', 'noun', 'A person who obtains something, especially money, through force, threats, or abuse of authority.', 'Conservative framing cast the tax agency as a predatory extortionist.', 'The warlord acted as an extortionist.', ['act like an extortionist', 'extortionist demands'], ['blackmailer', 'racketeer'], 'Political vocabulary.', '/ɪkˈstɔː.ʃən.ɪst/', null],
      ['dogmatic', 'adjective', 'Inclined to lay down principles as undeniably true, without consideration of evidence or other opinions.', 'The debate was paralyzed by dogmatic ideological posturing.', 'He held dogmatic beliefs about the free market.', ['dogmatic assertion', 'dogmatic stance', 'rigidly dogmatic'], ['inflexible', 'doctrinaire', 'unyielding'], 'Critical adjective.', '/dɒɡˈmæt.ɪk/', 'flexible'],
      ['dispossession', 'noun', 'The action of depriving someone of land, property, or other assets.', 'The enclosure of public land resulted in mass dispossession.', 'They documented the economic dispossession of indigenous communities.', ['economic dispossession', 'land dispossession', 'threat of dispossession'], ['deprivation', 'expropriation', 'eviction'], 'Sociological and political noun.', '/ˌdɪs.pəˈzeʃ.ən/', null],
      ['predetermined', 'adjective', 'Established or decided in advance.', 'The rhetorical framing made the moral conclusion predetermined.', 'The outcome was not predetermined by historical laws.', ['predetermined outcome', 'predetermined conclusion', 'predetermined path'], ['fixed', 'prearranged', 'settled'], 'Analytical adjective.', '/ˌpriː.dɪˈtɜː.mɪnd/', 'open'],
      ['unambiguous', 'adjective', 'Not open to more than one interpretation; clear and precise.', 'The treaty requires unambiguous language regarding border security.', 'She gave an unambiguous commitment to public education.', ['unambiguous statement', 'unambiguous evidence', 'completely unambiguous'], ['clear', 'explicit', 'unequivocal'], 'High-frequency adjective.', '/ˌʌn.æmˈbɪɡ.ju.əs/', 'ambiguous'],
      ['mediator', 'noun', 'A person or agency that attempts to make people involved in a conflict come to an agreement; an intermediary.', 'Language acts as a mediator between objective reality and human perception.', 'The diplomat acted as a neutral mediator in the peace talks.', ['neutral mediator', 'act as a mediator', 'key mediator'], ['intermediary', 'arbiter', 'moderator'], 'Sociological and diplomatic noun.', '/ˈmiː.di.eɪ.tər/', null]
    ],
    chunks: [
      ['manufacture a sterile linguistic screen', 'Creating detached, vague language to disguise violence or suffering.', 'Exposing political propaganda', 'Essayistic · critical', 'Totalitarian regimes manufacture a sterile linguistic screen to hide human misery.', 'Critique military euphemisms.', `Corporate spokespeople manufacture a sterile linguistic screen to justify environmental devastation.`, 'Orwellian critical chunk.'],
      ['activate a subconscious moral drama', 'Triggering deep mental archetypes (heroes, villains, victims) through specific words.', 'Explaining cognitive framing', 'Academic · psychological', 'The phrase "tax relief" activates a subconscious moral drama of suffering and rescue.', 'Analyze political slogans.', `Calling a border a "warzone" activates a subconscious moral drama of national invasion.`, 'Lakoff framing chunk.'],
      ['the architecture of the unspoken', 'The implicit assumptions and hidden frames that structure debate without being said.', 'Uncovering deep assumptions', 'Philosophical · essayistic', 'Power operates most effectively through the architecture of the unspoken.', 'Explore unexamined dogmas.', `Every news broadcast is organized by the architecture of the unspoken.`, 'Evocative conceptual chunk.'],
      ['render opposing views unthinkable', 'Structuring language so thoroughly that alternative thoughts cannot even be expressed.', 'Diagnosing ideological hegemony', 'Critical · philosophical', 'A successful political frame renders opposing views literally unthinkable.', 'Describe linguistic hegemony.', `By defining value purely in monetary terms, neoliberalism renders alternative ethics unthinkable.`, 'Orwellian conceptual chunk.'],
      ['the defense of the indefensible', 'Using convoluted rhetoric to justify actions that are morally monstrous.', 'Denouncing political crimes', 'Historical · essayistic', 'Orwell observed that modern political speech is largely the defense of the indefensible.', 'Condemn state atrocities.', `Diplomatic double-talk is frequently the defense of the indefensible in international law.`, 'Classic Orwell quote chunk.'],
      ['ruthless rhetorical literacy', 'The active, critical capacity to deconstruct metaphors, syntax, and media framing.', 'Promoting civic education', 'Philosophical · democratic', 'Democratic survival depends on fostering ruthless rhetorical literacy among citizens.', 'Advocate media literacy.', `We must teach ruthless rhetorical literacy in schools to protect students from algorithmic manipulation.`, 'Actionable democratic chunk.'],
      ['erase human agency from the sentence', 'Using passive voice and nominalisation to hide who actually committed an action.', 'Deconstructing grammatical bias', 'Analytical · linguistic', 'Corporate press releases erase human agency from the sentence during mass terminations.', 'Analyze media headlines.', `Headlines about police shootings often erase human agency from the sentence through the passive voice.`, 'Linguistic analysis chunk.'],
      ['a natural, inevitable meteorological event', 'Framing intentional human policies as if they were uncontrollable acts of nature.', 'Unmasking policy fatalism', 'Essayistic · rhetorical', 'Economic inequality is falsely presented as a natural, inevitable meteorological event.', 'Critique austerity arguments.', `Poverty is a policy choice, not a natural, inevitable meteorological event.`, 'Sharp satirical chunk.'],
      ['epistemic calibration and stance', 'Adjusting the degree of certainty and authority in your writing.', 'Refining academic style', 'Formal · academic', 'Scholarly writing requires careful epistemic calibration and stance.', 'Advise student writers.', `Mastering hedging allows you to demonstrate precise epistemic calibration and stance.`, 'Academic writing chunk.'],
      ['strip away the manipulative screen of power', 'Deconstructing ideology to reveal concrete human and material conditions.', 'Affirming critical realism', 'Philosophical · concluding', 'Critical analysis exists to strip away the manipulative screen of power.', 'Conclude an essay on discourse.', `The goal of honest journalism is to strip away the manipulative screen of power and tell the truth.`, 'Philosophical closing chunk.']
    ],
    collocations: [
      [`Political speech frequently serves as the defense of the ______.`, [`indefensible`, `substantive`, `discretionary`, `remediable`], 0, `Defense of the indefensible is George Orwell's classic formulation.`],
      [`The term was designed to activate a subconscious ______ drama.`, [`moral`, `visceral`, `contingent`, `regressive`], 0, `Subconscious moral drama describes cognitive framing.`],
      [`Citizens must develop ruthless rhetorical ______ to detect propaganda.`, [`literacy`, `hubris`, `cleavage`, `straitjacket`], 0, `Rhetorical literacy is the standard critical term.`],
      [`Passive syntax can completely erase human ______ from the report.`, [`agency`, `desert`, `propensity`, `loophole`], 0, `Erase human agency is the established linguistic collocation.`]
    ],
    upgrades: [
      [`Politicians use nice words to lie about bad things.`, `Political language relies on sterile euphemisms and syntactic obfuscation to defend the indefensible.`],
      [`The phrase "tax relief" makes people think taxes are painful.`, `The metaphor of "tax relief" activates a cognitive frame that casts taxation as an affliction and government as an extortionist.`],
      [`The news wrote the story so that nobody knows who shot the gun.`, `The headline employed the passive voice to erase human agency from the description of state violence.`]
    ],
    think: {
      title: 'Framing Analysis, Missing Information and Source Evaluation',
      lead: 'Critical thinking requires evaluating not only what a text says, but what its framing deliberately omits, whose agency is erased, and what alternative frames were suppressed.',
      defs: [
        ['Presupposition', `An implicit assumption about the world or background belief relating to an utterance whose truth is taken for granted.`],
        ['Omission bias', `The systematic tendency to ignore relevant facts or perspectives that do not fit into the dominant narrative frame.`],
        ['Critical Discourse Analysis (CDA)', `An interdisciplinary approach that views language as a social practice and analyzes how power relations are enacted through discourse.`]
      ],
      items: [
        { id: '16t1', type: 'mc', tag: 'Presupposition check', q: `A headline reads: <i>"When will the government finally stop wasting taxpayer money on public transport?"</i> What does this sentence grammatically presuppose as an established fact?`, options: [`That public transport is well-funded.`, `That the government is currently wasting taxpayer money on public transport.`, `That all citizens own cars.`, `That buses are environmentally friendly.`], answer: 1, explain: `The wh-question presupposes that money is currently being wasted; the debate is restricted only to "when" it will stop.` },
        { id: '16t2', type: 'open', tag: 'Frame deconstruction', q: `Compare the frames activated by the phrases "climate crisis" versus "climate change." Which actors and actions does each frame highlight or obscure?`, rows: 5, guide: [`"Change" frames the process as slow, natural, and passive; "Crisis" frames it as an urgent, man-made emergency requiring immediate mobilization.`] },
        { id: '16t3', type: 'open', tag: 'Syntactic critique', q: `Analyze this headline: <i>"Three civilians died during military operation."</i> Rewrite it in the active voice and explain what the original passive/intransitive structure concealed.`, rows: 5, guide: [`Active: "Soldiers killed three civilians during a raid." The original concealed who pulled the triggers and framed death as an accidental byproduct.`] },
        { id: '16t4', type: 'open', tag: 'Core synthesis', q: `How does linguistic framing interact with material reality? Give one example of a situation where a powerful frame was completely shattered by stubborn physical facts.`, rows: 6, guide: [`Explain how propaganda about military victories or economic booms collapsed when faced with battlefield defeat or empty supermarket shelves.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing a Long-Form Analytical Essay on Political Discourse (800–1,200 words)',
        text: 'A long-form analytical essay develops a sustained, nuanced thesis. You must analyze the interplay between vocabulary (euphemism, framing), syntax (clefts, voice, fronting), and material reality, integrating close textual deconstruction with broad political philosophy.',
        weak: 'Politicians lie all the time using bad words, but George Orwell said we should speak simply.',
        strong: 'While political language inevitably mediates human perception through cognitive frames and syntactic choices, democratic resilience depends upon citizens cultivating the rhetorical literacy necessary to interrogate the architecture of the unspoken and hold power accountable.'
      },
      short: {
        kind: 'Rhetorical analysis', title: 'Deconstructing Corporate Crisis Communication',
        prompt: 'Analyze a hypothetical press release: "Due to macroeconomic headwinds, ten thousand positions will be separated across regional divisions." Deconstruct the metaphors, the passive nominalisations, and the erasure of agency.',
        min: 180, max: 280, support: 'light',
        guide: ['Use cleft sentences (It is X that...) and fronting.', 'Include the terms euphemism, erase human agency, and sanitize.']
      },
      main: {
        kind: 'Long-form analytical essay', title: 'The Politics of Framing: Language, Power and the Construction of Reality',
        prompt: 'To what extent does political language construct rather than merely describe reality? In a sustained essay of 800–1,200 words, examine how metaphors, euphemisms, and syntactic structures (such as clefts and passive voice) shape public perception. Address the limits of linguistic determinism by weighing rhetoric against material conditions.',
        min: 800, max: 1200, support: 'light',
        guide: [
          'Section 1 (Introduction): Orwell’s diagnosis of political language and the central question of constitutive framing.',
          'Section 2 (Cognitive Framing & Metaphor): Lakoff’s theory of frames, "tax relief," and the subconscious moral architecture of vocabulary.',
          'Section 3 (Grammar as Ideology): syntactic choices—passive voice, nominalisation, cleft sentences, and the erasure of moral agency.',
          'Section 4 (Epistemic Stance): hedging and boosting as tools for manufacturing certainty or evading responsibility.',
          'Section 5 (The Counterpoint & Material Reality): the limits of framing when confronted with stubborn physical and economic crises.',
          'Section 6 (Conclusion): cultivating ruthless rhetorical literacy as a civic obligation for democratic survival.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I sustain a cohesive, multi-layered argument across 800–1,200 words?',
        'Did I integrate Orwell’s concept of euphemism with Lakoff’s cognitive framing theory?',
        'Did I use cleft sentences (it-clefts, wh-clefts) and negative fronting with inversion accurately?',
        'Did I calibrate my epistemic stance using precise hedging (arguably, appears to suggest) and boosting?',
        'Did I address the counterpoint regarding material reality without undermining my linguistic analysis?'
      ],
      challenges: [
        'Include at least two it-cleft or wh-cleft sentences for dramatic focus.',
        'Include one sentence using fronting with subject-auxiliary inversion (e.g. "Rarely have...", "Never before has...").',
        'Use the chunks "architecture of the unspoken" and "erase human agency from the sentence".'
      ]
    },
    retrieve: {
      content: 'Explain George Lakoff’s concept of "cognitive framing" and why repeating an opponent’s phrase reinforces their frame.',
      contentGuide: ['Words activate deep neural frames and metaphors; repeating the phrase strengthens the opponent’s frame even in negation.'],
      grammar: 'Write one it-cleft sentence and one sentence with negative fronting and inversion.',
      grammarGuide: ['It was X that... / Rarely did the government...'],
      reasoning: 'Why is analyzing what a political text omits just as important as analyzing what it explicitly states?',
      reasoningGuide: ['Omission reveals presuppositions, hides alternative causes, and protects institutional perpetrators from scrutiny.'],
      cumulative: 'Connect Unit 16 to Units 11–15: how has Module 3 demonstrated that political power is a combination of institutional rules, economic interests, and linguistic framing?',
      summary: `<p><b>Main claim:</b> political language constructs reality through cognitive frames, conceptual metaphors, and syntactic choices that conceal agency, though material conditions set the ultimate boundaries of power.</p><p><b>Grammar:</b> cleft sentences (it-clefts, wh-clefts), fronting with inversion, and calibrated hedging/boosting enable masterful rhetorical control.</p><p><b>Reasoning:</b> deconstruct presuppositions, omissions, and framing architectures to evaluate political discourse critically.</p>`
    }
  });

  const u = K.units['16'];
  u.listening = [
    {
      id: 'l1', title: 'Don’t Think of an Elephant: The Mechanics of Framing', format: 'University guest lecture',
      file: '/audio/en/unit-16/u16-listening-01.mp3', duration: 140, level: 'B2+ → C1',
      audioReady: false,
      voice: 'One academic lecturer; dynamic, engaging, North American English',
      passes: ['First listen · understand why telling someone “Don’t think of an elephant” forces them to think of one', 'Second listen · track the analysis of the “tax relief” frame', 'Third listen · identify cleft sentences'],
      transcript: `Good morning, everyone. I want to begin today’s lecture with a simple cognitive experiment: whatever you do in the next five seconds, do not think of an elephant. Do not picture its grey skin, its trunk, or its large floppy ears.\n\nWhat happened? Every single person in this auditorium instantly pictured an elephant. Why? Because to process the negation of a concept, your brain must first activate the neural frame that defines that concept. Language is not a logical switch that you can turn on and off at will; language is physical neural circuitry.\n\nThis simple neurological reality is the foundation of political framing. In the early 2000s, conservative think tanks in Washington spent millions of dollars researching language. They realized that if you talk about taxes as "dues" or "investments," people think of clubs and building roads. But if you call them "relief," you change the entire game. Relief presupposes an affliction. It presupposes that the person imposing the tax is a thief or an oppressor, and the person cutting the tax is a savior.\n\nWhen progressives went on television and said, "We must oppose tax relief," they had already lost the debate. By uttering the word "relief," they activated the conservative frame in the minds of fifty million viewers. The secret of political victory is never to argue inside the room built by your opponent. The secret is to build your own room with your own conceptual architecture.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core principle', q: 'Why is saying "Do not think of an elephant" an effective demonstration of framing?', options: ['Because elephants are popular animals.', 'Because processing the negation of a word requires the brain to first activate the neural frame of that concept.', 'Because elephants have excellent memory.', 'Because words have no neurological basis.'], answer: 1, explain: 'Negating a concept requires activating its neural frame, demonstrating why repeating an opponent’s words is self-defeating.' },
        { id: 'q2', type: 'open', tag: 'Application', q: 'What advice does the lecturer give to politicians regarding their opponents’ frames?', rubric: ['Never accept or repeat the opponent’s frame even in negation', 'Build an alternative conceptual room with your own framing and vocabulary (e.g. investment rather than relief)'] }
      ]
    },
    {
      id: 'l2', title: 'Euphemisms in Corporate and State Warfare', format: 'Panel discussion',
      file: '/audio/en/unit-16/u16-listening-02.mp3', duration: 130, level: 'C1',
      audioReady: false,
      voice: 'Two journalists (David Kroll and Sarah Jenkins); sharp, fast-paced, investigative, British English',
      passes: ['First listen · note the contrast between military euphemisms and corporate PR language', 'Second listen · identify how grammatical voice erases human responsibility'],
      transcript: `David: Sarah, when George Orwell wrote about political euphemisms in 1946, he was analyzing totalitarian regimes and military imperialism. But if you open the financial pages of any major newspaper today, you see the exact same linguistic laundering.\n\nSarah: Absolutely. Look at what happens when a major technology company dismisses fifteen thousand employees. You will never see a press release that says: "The Board decided to fire fifteen thousand workers to boost quarterly operating margins." That is far too concrete; it calls up mental pictures of families losing their livelihoods.\n\nDavid: So what syntax do they use instead?\n\nSarah: They use nominalisation and the passive voice. They write: "A workforce rightsizing of fifteen thousand roles was implemented in response to macroeconomic headwinds." Notice what happened there: "firing people" became "workforce rightsizing." The workers became abstract "roles." And the human executives who made the decision vanished behind "macroeconomic headwinds." The firing is framed as if it were a hurricane or an earthquake—a force of nature for which no human being can be held morally responsible. That is the true power of political syntax: it erases the perpetrator and sanitises the crime.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'How does corporate PR syntax sanitize mass layoffs according to Sarah?', options: ['By paying workers in cash.', 'By using nominalisations and passive voice to erase human executives and frame layoffs as natural weather events.', 'By apologizing directly to every family.', 'By refusing to publish any press releases.'], answer: 1, explain: 'Corporate PR uses abstract nominals and passives to disguise human agency as inevitable natural forces.' },
        { id: 'q2', type: 'open', tag: 'Linguistic deconstruction', q: 'Deconstruct the phrase "workforce rightsizing in response to macroeconomic headwinds" as explained by Sarah.', rubric: ['"Rightsizing": euphemism for mass layoffs', '"Roles": turns human workers into abstract objects', '"Headwinds": frames executive greed/decisions as uncontrollable natural weather events'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'You are analyzing a political campaign speech that promises “sweeping deregulation to eliminate bureaucratic tape and unleash economic freedom.” Respond in 60–120 seconds. Deconstruct the hidden frames, euphemisms, and presuppositions behind “bureaucratic tape” and “economic freedom,” and evaluate who benefits and who is endangered by this framing.',
    prepare: 'Keywords only: framing · "red tape" as safety/labor regulations · "economic freedom" vs consumer protection · cleft sentence focus · calibrated conclusion. Do not script.',
    grammar: 'Cleft sentences (It is X that, What this phrase conceals is); negative fronting with inversion (Rarely does...); stance hedging/boosting',
    targets: ['the architecture of the unspoken', 'activate a subconscious moral drama', 'manufacture a sterile linguistic screen', 'ruthless rhetorical literacy'],
    rubric: [
      'Directly and brilliantly deconstructs the political campaign speech',
      'Exposes the hidden frames behind "red tape" (e.g. food safety, worker rights, environmental protections)',
      'Uses advanced rhetorical syntax (cleft sentence, fronting with inversion)',
      'Delivers a sophisticated conclusion on the necessity of rhetorical literacy'
    ]
  };
})(window.KLANG);
