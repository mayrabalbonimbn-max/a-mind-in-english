/* UNIT 13 · LEFT, RIGHT AND EVERYTHING IN BETWEEN */
(function (K) {
  K.units['13'] = K.makeUnit('13', {
    module: 3, title: 'Left, right', titleEm: 'and everything in between',
    question: 'Can a single line from left to right describe what people actually believe?',
    knowLead: `The spatial metaphor of "left" and "right" originated during the French Revolution of 1789, when members of the National Assembly divided themselves by seating arrangement: supporters of the King sat on the right, while advocates of revolution sat on the left. Over two centuries later, this one-dimensional axis remains the dominant shorthand for political identity. However, modern political scientists argue that reducing complex multidimensional worldviews to a single spectrum distorts political reality. Keep the distinction between economic redistribution, cultural values, and institutional authority in mind as you read.`,
    terms: [
      ['One-dimensional spectrum', `A political model that arranges all beliefs along a single horizontal axis from radical left to reactionary right.`],
      ['Multidimensional space', `A framework that separates economic views (state intervention vs free market) from cultural views (libertarian/progressive vs authoritarian/traditional).`],
      ['Steelmanning', `The practice of constructing the strongest, most persuasive possible version of an opponent’s argument before attempting to refute it.`],
      ['Cross-cutting cleavage', `A social or political division that cuts across existing party lines, such as religious identity conflicting with economic class.`],
      ['Affective polarisation', `The tendency of partisans to distrust, dislike, and attribute bad motives to members of the opposing political camp, regardless of policy details.`]
    ],
    views: [
      'Two perspectives on the political spectrum',
      'The unified ideological continuum',
      `Political attitudes naturally cluster into coherent worldviews: progressivism links economic solidarity with cultural tolerance, while conservatism links market order with cultural tradition.`,
      'The fragmented multidimensional reality',
      `Most individuals hold idiosyncratic combinations of beliefs—such as cultural conservatism combined with strong support for state welfare—that defy linear categorization.`,
      `The question is whether political labels clarify shared principles or merely enforce tribal sorting.`
    ],
    knowPrompt: `Can a person strongly favor universal state healthcare while simultaneously holding traditionalist religious views on the family? How does a single "left-right" label handle this person?`,
    knowGuide: [
      `Distinguish economic policy preferences from cultural and moral values.`,
      `Consider which political party this individual would feel alienated by in a polarised two-camp system.`
    ],
    read: {
      main: {
        format: 'Philosophical essay', title: 'The Tyranny of the Single Axis',
        standfirst: `We inherited a seating arrangement from eighteenth-century Paris and turned it into the cognitive map of the modern mind.`,
        pull: { after: 5, text: `The single axis does not describe human beliefs; it disciplines them into partisan armies.` },
        notes: { 1: `<b>The French National Assembly (1789)</b> established the spatial tradition of political seating.`, 4: `<b>The Nolan Chart</b> and the <b>Political Compass</b> are popular two-axis models that separate economic freedom from personal freedom.` },
        paras: [
          `In the summer of 1789, delegates to the French National Assembly gathered to decide how much veto power King Louis XVI should retain over new legislation. In the charged atmosphere of the chamber, those who wished to preserve monarchical authority naturally gravitated toward the seats on the president's right. Those who demanded radical democratic limits on the crown seated themselves on the left. It was a contingent spatial compromise designed to prevent physical brawls in a crowded hall. Yet two hundred and thirty-five years later, that incidental seating arrangement remains the primary cognitive grid through which modern democracies interpret political reality.`,
          `We use "left" and "right" as if they designated fundamental laws of physics or universal categories of human psychology. Political commentators speak of a candidate "moving to the center" or an electorate "drifting to the right" as though these were measurable coordinates on a physical cartography. But this one-dimensional axis conceals far more than it reveals. By forcing every moral, economic, environmental, and diplomatic question onto a single line, the left-right dichotomy performs a massive, violent simplification of human thought.`,
          `Consider what the traditional spectrum bundles together. On the conventional "left," a citizen is expected to support progressive taxation, robust environmental regulation, expansive immigration policies, secular governance, and progressive social norms. On the conventional "right," one is expected to champion free-market deregulation, low corporate taxes, strict border controls, national sovereignty, and traditional religious heritage. Whereas these positions are treated by party machines as indivisible packages, there is no inherent logical necessity that binds them together.`,
          `Why, for instance, should an individual who believes that the state should nationalise electrical utilities also be required to hold avant-garde views on art or gender? Why should someone who values neighborhood safety, religious continuity, and traditional family structures be forced to endorse the deregulation of speculative finance? In real life, millions of working-class citizens hold economically interventionist and culturally conservative views, while many urban professionals hold socially liberal and economically neoliberal positions. The single axis cannot accommodate these citizens; it renders them politically homeless.`,
          `Political scientists have repeatedly attempted to rectify this distortion by proposing multidimensional models. The most famous of these separates economic governance (state intervention versus market allocation) from socio-cultural authority (libertarian individual autonomy versus authoritarian social cohesion). Adding a vertical axis instantly clarifies anomalies that baffle one-dimensional commentators. It explains why a populist candidate can combine generous welfare promises with aggressive nationalist rhetoric, winning over voters who were previously categorized as left-wing unionists.`,
          `Yet despite its analytical poverty, the single axis persists because it serves an indispensable tribal function. A one-dimensional line makes it remarkably easy to identify the enemy. In an era of affective polarisation, political identity is driven less by nuanced policy preferences than by negative partisanship—the visceral dislike of the opposing team. The left-right spectrum converts complex philosophical disagreements into a binary sporting match: you are either with us or against us. Nuance is treated as betrayal, and cross-cutting synthesis is dismissed as cowardice.`,
          `If we wish to rescue public deliberation from ideological exhaustion, we must abandon the tyranny of the single axis. Genuine intellectual maturity begins when we recognize that human values are inherently plural and frequently in tension. Steelmanning opposing philosophies—understanding why rational, ethical individuals might prioritize stability over experimentation, or equality over individual liberty—is not an act of political surrender. It is the prerequisite for living together in a pluralistic society.`
        ]
      },
      counter: {
        format: 'Strategic defense', title: 'In Defense of the Ideological Compass',
        standfirst: `Critiques of the left-right axis are intellectually seductive, but they ignore the practical necessity of political aggregation.`,
        paras: [
          `It is easy for academics to dismiss the left-right spectrum as simplistic. However, the persistence of the single axis across diverse cultures and centuries suggests that it captures a real, enduring philosophical fault line: the foundational dispute over hierarchy versus equality.` ,
          `In the classic formulation of political philosopher Norberto Bobbio, the core distinction between left and right rests on their respective attitudes toward social equality. The left regards social inequalities as artificial, unjust, and remediable through collective action, whereas the right views inequality as natural, inevitable, or functional for social order. This basic divide provides a coherent underlying logic for most contemporary policy debates.` ,
          `Furthermore, mass democracies require simplifying heuristics. Ordinary citizens do not have hundreds of hours to analyze the technical details of pension algorithms or energy tariffs. The left-right spectrum serves as an efficient cognitive shorthand, signaling the broad values, social interests, and coalitions represented by a political party.` ,
          `Without ideological labels to aggregate disparate interests, politics would devolve into chaotic, unprincipled interest-group bargaining. The left-right axis may be a blunt instrument, but in the noisy arena of mass democracy, blunt instruments are often the only ones that work.`
        ]
      }
    },
    sources: [
      { title: 'Left and Right: The Significance of a Political Distinction (Norberto Bobbio)', url: 'https://www.politybooks.com/bookdetail?book_slug=left-and-right--9780745615615', note: 'Classic treatise defining the fundamental distinction around equality and hierarchy.' },
      { title: 'The Political Compass Project (Pace & Blamires)', url: 'https://www.politicalcompass.org/', note: 'Influential two-axis model separating economic from social dimensions.' },
      { title: 'Affective Polarization in American Politics (Iyengar et al.)', url: 'https://www.annualreviews.org/doi/abs/10.1146/annurev-polisci-051117-073034', note: 'Empirical study on emotional partisan animus versus policy divergence.' }
    ],
    interpret: [
      { id: '13i1', type: 'mc', tag: 'Main idea', q: `What is the primary critique of the left-right political spectrum presented in the main text?`, options: [`The spectrum is accurate but voters are too lazy to understand it.`, `A single horizontal axis oversimplifies complex, multidimensional human beliefs and enforces artificial partisan tribalism.`, `All citizens in modern democracies are secretly centrist.`, `The French Revolution should have chosen top and bottom instead of left and right.`], answer: 1, explain: `The essay argues that reducing multidimensional values to a single axis creates false bundles and drives affective polarisation.` },
      { id: '13i2', type: 'mc', tag: 'Inference', q: `According to the main text, why do political machines and media systems preserve the single axis despite its analytical flaws?`, options: [`Because computer software cannot draw two-dimensional graphs.`, `Because a binary line makes it easy to manufacture tribal identity and mobilize voters through negative partisanship.`, `Because the law requires parties to register as left or right.`, `Because citizens vote by sitting on chairs in parliaments.`], answer: 1, explain: `Paragraph 6 explains that binary sorting fuels affective polarisation and easy enemy identification.` },
      { id: '13i3', type: 'tf', tag: 'Detail', q: `The author claims there is an inescapable biological law that connects economic state intervention with progressive social views.`, answer: false, explain: `Paragraph 3 and 4 explicitly show that economic interventionism and social conservatism are frequently combined in real voters.` },
      { id: '13i4', type: 'mc', tag: 'Counterpoint argument', q: `What foundational philosophical criterion does Norberto Bobbio propose to defend the validity of the left-right divide?`, options: [`The level of tax rates on international trade.`, `The fundamental attitude toward social equality versus natural hierarchy.`, `Whether a politician supports nuclear power.`, `The age of the political candidates.`], answer: 1, explain: `Bobbio argues that the essential divide between left and right is their stance on whether inequalities are unjust or natural.` },
      { id: '13i5', type: 'open', tag: 'Evidence vs interpretation', q: `How does the author use the example of working-class voters who combine welfare support with cultural conservatism to challenge the traditional one-dimensional line?`, rows: 4, guide: [`Shows that real voters hold cross-cutting preferences that cross traditional party platforms.`, `Demonstrates that the single axis leaves these voters politically homeless or misunderstood.`] },
      { id: '13i6', type: 'open', tag: 'Synthesis & comparison', q: `Weigh the main essay’s demand for multidimensional nuance against the counterpoint’s defense of the spectrum as an indispensable cognitive heuristic for mass elections.`, rows: 5, guide: [`Nuance allows precise policy analysis and reduces tribal hatred.`, `Heuristics allow busy citizens to quickly identify party values without reading technical legislation.`] },
      { id: '13i7', type: 'open', tag: 'Application', q: `Describe a contemporary policy proposal in Brazil that creates an unexpected alliance between groups typically considered "left" and "right."`, rows: 5, guide: [`Examples: data privacy regulations, protection of local industry vs foreign tech, agrarian subsidies, or religious welfare programs.`] }
    ],
    notice: [
      {
        title: 'Contrast clauses and subordinating connectors',
        sub: 'Mastering whereas, while, as opposed to, and in contrast to for complex ideological balance',
        examples: [
          `<b>Whereas</b> the economic left prioritises redistribution, the cultural left champions individual autonomy.`,
          `Conservatives emphasize institutional order, <b>as opposed to</b> rapid social experimentation.`,
          `<b>While</b> heuristics simplify voter choice, they frequently distort nuanced policy debate.`,
          `<b>In contrast to</b> one-dimensional models, a two-axis framework separates economic and social values.`
        ],
        questions: [
          `How does “whereas” establish balanced contrast between two independent claims?`,
          `What is the difference in register between “but” and “as opposed to”?`,
          `Why are contrast clauses essential when steelmanning an opposing view?`
        ],
        explain: `<p>High-level analytical essays use precise subordinating contrast connectors (<b>whereas, while, in contrast to, as opposed to</b>) to weigh competing positions without collapsing into simplistic binaries.</p><p>Use <b>whereas</b> to contrast two parallel facts or principles; use <b>while</b> when conceding a partial point before stating your main thesis; use <b>as opposed to</b> followed by a noun phrase or gerund.</p>`,
        compare: { head: ['Basic contrast', 'Sophisticated connector', 'Rhetorical nuance'], rows: [['The left likes equality but the right likes hierarchy.', 'Whereas the left views social inequality as remediable, the right regards hierarchy as inevitable.', 'Elevates to formal philosophical analysis.'], ['They chose welfare instead of tax cuts.', 'The party prioritised universal public transfers as opposed to targeted market subsidies.', 'Exact institutional and policy vocabulary.']] },
        practice: [
          [`Combine using “whereas”: <i>Urban voters focus on climate policy. Rural communities worry about agricultural regulations.</i>`, `Whereas urban voters focus on climate policy, rural communities are primarily concerned with agricultural regulations.`, `Uses whereas for balanced contrast.`],
          [`Rewrite using “as opposed to”: <i>The candidate emphasized collective solidarity rather than individual competition.</i>`, `The candidate emphasized collective solidarity as opposed to individual competition.`, `Uses as opposed to with noun phrase.`],
          [`Correct the connector error: <i>Whereas he was exhausted, but he finished the speech.</i>`, `Whereas he was exhausted, he finished the speech. / Although he was exhausted, he finished the speech.`, `Eliminates redundant coordinating conjunction.`]
        ],
        radar: [
          { wrong: 'In contrast of the traditional view, this model adds a second axis.', right: 'In contrast to the traditional view, this model adds a second axis.', why: 'The correct preposition is in contrast to (or in contrast with).' },
          { wrong: 'As opposed of cutting taxes, they increased spending.', right: 'As opposed to cutting taxes, they increased spending.', why: 'Fixed idiom: as opposed to + gerund/noun.' }
        ],
        help: `<p><b>Em português:</b> Conectores de contraste como <i>whereas</i> (ao passo que, enquanto que) e <i>as opposed to</i> (em oposição a) estruturam comparações sofisticadas entre correntes ideológicas.</p>`
      },
      {
        title: 'Noun clauses as subjects and complements',
        sub: 'Packaging abstract propositions into robust syntactic units',
        examples: [
          `<b>What the single axis conceals</b> is the multi-dimensional nature of human beliefs.`,
          `The core dispute rests on <b>whether inequality is natural or artificial</b>.`,
          `<b>Why voters reject technocratic advice</b> remains a central question for political theorists.`
        ],
        questions: [
          `How does a wh-noun clause (What the axis conceals...) create focus and weight at the start of a sentence?`,
          `Why are whether-clauses preferred over if-clauses in formal academic complements?`
        ],
        explain: `<p>Noun clauses (introduced by <i>what, whether, how, why, that</i>) act as subjects, objects, or prepositional complements. They allow you to turn an entire philosophical problem into a single grammatical subject: <i>What motivates populist voting is...</i></p>`,
        compare: { head: ['Two sentences', 'Noun clause subject', 'Density gain'], rows: [['The model is too simple. This causes errors.', 'What makes the model prone to error is its excessive simplicity.', 'Creates an authoritative topic-sentence frame.']] },
        practice: [
          [`Turn into a noun clause subject: <i>Voters distrust political institutions. This drives affective polarisation.</i>`, `What drives affective polarisation is the profound distrust voters feel toward political institutions.`, `Transforms claim into what-clause subject.`]
        ],
        radar: [
          { wrong: 'The question is if the state should intervene.', right: 'The question is whether the state should intervene.', why: 'Use whether (not if) after linking verbs and prepositions in formal academic style.' }
        ],
        help: `<p><b>Em português:</b> Orações substantivas como <i>What is at stake is...</i> (O que está em jogo é...) ou <i>whether the state should intervene</i> (se o estado deve ou não intervir) conferem elegância e foco argumentativo.</p>`
      }
    ],
    vocab: [
      ['dichotomy', 'noun', 'A division or contrast between two things that are represented as being entirely different.', 'The traditional left-right dichotomy oversimplifies modern political life.', 'We must resist the false dichotomy between liberty and security.', ['false dichotomy', 'rigid dichotomy', 'left-right dichotomy'], ['division', 'split', 'bipolarity'], 'High-frequency analytical noun.', '/daɪˈkɒt.ə.mi/', 'synthesis'],
      ['cleavage', 'noun', 'A sharp division or split within a group, society, or electorate.', 'Religious values create a cross-cutting cleavage in contemporary politics.', 'The economic cleavage between north and south remains deep.', ['social cleavage', 'political cleavage', 'cross-cutting cleavage'], ['division', 'fracture', 'schism'], 'Sociology and political science term.', '/ˈkliː.vɪdʒ/', 'unity'],
      ['heuristic', 'noun', 'A practical method or mental shortcut that is not guaranteed to be perfect but is sufficient for immediate decisions.', 'The left-right spectrum serves as a cognitive heuristic for voters.', 'Party labels are useful heuristics in complex referendums.', ['cognitive heuristic', 'simple heuristic', 'efficient heuristic'], ['rule of thumb', 'shortcut', 'framework'], 'Epistemology and psychology term.', '/hjʊəˈrɪs.tɪk/', null],
      ['visceral', 'adjective', 'Relating to deep inward feelings rather than intellect or logic.', 'Negative partisanship generates a visceral dislike of the opposition.', 'The speech provoked a visceral reaction across the country.', ['visceral reaction', 'visceral hostility', 'visceral dislike'], ['instinctive', 'emotional', 'gut-level'], 'Descriptive adjective for intense feelings.', '/ˈvɪs.ər.əl/', 'rational'],
      ['contingent', 'adjective', 'Subject to chance; dependent on specific historical circumstances rather than necessity.', 'The left-right seating arrangement was a contingent historical accident.', 'Political alliances are always contingent on electoral results.', ['contingent on', 'historically contingent', 'contingent outcome'], ['conditional', 'dependent', 'accidental'], 'Core philosophical and historical adjective.', '/kənˈtɪn.dʒənt/', 'inevitable'],
      ['remediable', 'adjective', 'Capable of being remedied, corrected, or cured.', 'The left regards structural poverty as remediable through state action.', 'These administrative defects are easily remediable.', ['remediable injustice', 'remediable defect', 'readily remediable'], ['curable', 'correctable', 'fixable'], 'Formal philosophical term.', '/rɪˈmiː.di.ə.bəl/', 'irremediable'],
      ['polarisation', 'noun', 'The sharp division of a group into two contrasting or conflicting sets of opinions or beliefs.', 'Affective polarisation threatens the stability of democratic institutions.', 'Social media algorithms accelerate political polarisation.', ['affective polarisation', 'political polarisation', 'growing polarisation'], ['division', 'fragmentation', 'factionalism'], 'High-frequency social science term.', '/ˌpəʊ.lə.raɪˈzeɪ.ʃən/', 'consensus'],
      ['unprincipled', 'adjective', 'Not acting in accordance with moral principles or rules of conduct.', 'Critics condemned the coalition as an unprincipled trade of votes for money.', 'They engaged in unprincipled opportunism.', ['unprincipled opportunism', 'unprincipled behavior', 'unprincipled alliance'], ['unscrupulous', 'dishonest', 'opportunistic'], 'Moral and political evaluation.', '/ʌnˈprɪn.sə.pəld/', 'principled'],
      ['aggregate', 'verb', 'Form or group into a whole or cluster; combine disparate interests.', 'Mass parties aggregate the competing demands of different social classes.', 'The platform aggregates data from thousands of voters.', ['aggregate interests', 'aggregate preferences', 'aggregate votes'], ['combine', 'unite', 'collect'], 'Formal political and economic verb.', '/ˈæɡ.rɪ.ɡeɪt/', 'disperse'],
      ['idiosyncratic', 'adjective', 'Peculiar to an individual; unique and unconventional.', 'Voters often hold idiosyncratic combinations of moral and economic beliefs.', 'His writing style is highly idiosyncratic.', ['idiosyncratic mix', 'idiosyncratic belief', 'idiosyncratic view'], ['distinctive', 'unique', 'eccentric'], 'Academic descriptive adjective.', '/ˌɪd.i.ə.sɪŋˈkræt.ɪk/', 'standard']
    ],
    chunks: [
      ['the cognitive map of the modern mind', 'Describing the fundamental mental framework people use to understand reality.', 'Evaluating dominant mental models', 'Essayistic · philosophical', 'The left-right spectrum has become the cognitive map of the modern mind.', 'Critique an overused intellectual model.', `Economic growth remains the unquestioned cognitive map of the modern mind.`, 'Evocative conceptual chunk.'],
      ['contingent historical accident', 'An event that happened by chance rather than inevitable historical law.', 'Deconstructing timeless myths', 'Academic · historical', 'The parliamentary seating order was a contingent historical accident, not a psychological law.', 'Explain an arbitrary custom.', `Many national borders reflect contingent historical accidents rather than natural geography.`, 'Essential critical-thinking phrase.'],
      ['steelmanning the opposing philosophy', 'Presenting an opposing argument in its strongest, most plausible form.', 'Promoting intellectual charity', 'Analytical · debate', 'Steelmanning the opposing philosophy is the prerequisite for honest intellectual debate.', 'Advise fair disagreement.', `Before writing your rebuttal, practice steelmanning the opposing philosophy.`, 'Standard rationalist chunk.'],
      ['politically homeless', 'Describing citizens whose beliefs do not fit any available party platform.', 'Naming ideological alienation', 'Journalistic · analytical', 'Voters who are culturally conservative and economically left-wing find themselves politically homeless.', 'Describe alienated voter blocs.', `The rise of radical parties often reflects millions of voters who felt politically homeless.`, 'Sociological chunk.'],
      ['affective polarisation and tribal sorting', 'The process where politics becomes emotional group hostility rather than policy debate.', 'Diagnosing democratic dysfunction', 'Academic · sociological', 'Modern media environments accelerate affective polarisation and tribal sorting.', 'Analyze media effects.', `Algorithms reward outrage, intensifying affective polarisation and tribal sorting among citizens.`, 'Political science diagnosis.'],
      ['a blunt instrument, but an effective one', 'Conceding that a tool is crude while defending its practical utility.', 'Weighing trade-offs', 'Essayistic · debating', 'Party labels may be a blunt instrument, but an effective one for mass democratic coordination.', 'Defend a simplified policy.', `Standardized testing is a blunt instrument, but an effective one for national benchmarks.`, 'Balanced evaluation chunk.'],
      ['cross-cutting cleavages', 'Social divisions that intersect and prevent society from splitting into two clean camps.', 'Explaining social complexity', 'Formal · sociological', 'A healthy democracy relies on cross-cutting cleavages that encourage shifting coalitions.', 'Analyze demographic stability.', `Religious and regional differences create cross-cutting cleavages within the working class.`, 'Sociological concept chunk.'],
      ['bundle disparate positions together', 'Forcing unrelated policies into a single mandatory partisan platform.', 'Critiquing party platforms', 'Analytical · critical', 'Electoral systems artificially bundle disparate positions together into binary manifestos.', 'Deconstruct party platforms.', `Parties bundle disparate positions together, forcing voters to accept compromises they reject.`, 'Structural analysis chunk.'],
      ['visceral dislike of the out-group', 'An instinctive, emotional hostility toward members of opposing factions.', 'Describing tribal prejudice', 'Academic · psychological', 'Negative partisanship is anchored in a visceral dislike of the out-group rather than ideological conviction.', 'Explain partisan hostility.', `Echo chambers amplify the visceral dislike of the out-group among loyal partisans.`, 'Psychological chunk.'],
      ['reconcile competing human values', 'Finding a workable balance between conflicting legitimate principles.', 'Defining the purpose of politics', 'Philosophical · formal', 'The true purpose of democratic deliberation is to reconcile competing human values in peace.', 'Conclude an essay on governance.', `Constitutional laws exist to reconcile competing human values without resort to violence.`, 'Philosophical concluding chunk.']
    ],
    collocations: [
      [`We must resist the false ______ between economic freedom and social justice.`, [`dichotomy`, `cleavage`, `heuristic`, `friction`], 0, `False dichotomy is the standard philosophical collocation.`],
      [`The two-camp system accelerates ______ polarisation among the electorate.`, [`affective`, `visceral`, `contingent`, `remediable`], 0, `Affective polarisation is the established term for emotional partisan animus.`],
      [`The left-right axis acts as a simple cognitive ______ for busy citizens.`, [`heuristic`, `dichotomy`, `cleavage`, `straitjacket`], 0, `Cognitive heuristic describes a mental shortcut.`],
      [`Working-class voters with traditional values often find themselves politically ______.`, [`homeless`, `vacuous`, `unprincipled`, `contingent`], 0, `Politically homeless describes citizens without party representation.`]
    ],
    upgrades: [
      [`The left and right don't make sense anymore because people believe different things.`, `The conventional one-dimensional spectrum fails to capture the multidimensional and idiosyncratic nature of modern political attitudes.`],
      [`People hate each other just because they support different parties.`, `Partisan conflict is increasingly driven by affective polarisation and a visceral dislike of the out-group rather than substantive policy disputes.`],
      [`We should understand what the other side thinks before saying they are wrong.`, `Intellectual integrity requires steelmanning the opposing philosophy before constructing a critical rebuttal.`]
    ],
    think: {
      title: 'Multidimensional Positioning and Steelmanning',
      lead: 'A rigorous thinker never reduces an intellectual opponent to a cartoon. Steelmanning requires demonstrating why a reasonable, morally motivated person would hold the position you oppose.',
      defs: [
        ['Strawman fallacy', `The error of misrepresenting an opponent’s argument to make it easier to attack.`],
        ['Steelman argument', `The strongest, most plausible version of an opposing argument, formulated with maximum charity.`],
        ['Orthogonal dimension', `An independent axis of variation that cannot be predicted by or reduced to another dimension.`]
      ],
      items: [
        { id: '13t1', type: 'mc', tag: 'Steelmanning check', q: `Which of the following is a genuine steelman of the conservative argument against rapid social change?`, options: [`Conservatives hate freedom and want everyone to be miserable.`, `Traditions and established institutions embody centuries of accumulated, implicit social wisdom that cannot be recreated overnight by theoretical design.`, `Conservatives are simply uneducated people who fear technology.`, `Conservatives only care about preserving wealth for their families.`], answer: 1, explain: `A steelman articulates the core Burkean philosophical foundation of conservatism—accumulated institutional wisdom—with charity and depth.` },
        { id: '13t2', type: 'open', tag: 'Steelmanning practice', q: `Construct the strongest possible steelman for the left-wing claim that extreme wealth inequality is fundamentally incompatible with genuine democracy.`, rows: 5, guide: [`Focus on how wealth translates directly into unequal political influence, media ownership, lobbying access, and unequal legal defense.`] },
        { id: '13t3', type: 'open', tag: 'Dimensional deconstruction', q: `Take the issue of environmental protection. Show how a person with "market-right" economic views could support conservation, whereas a "socialist-left" worker might oppose carbon taxes.`, rows: 5, guide: [`Market-right: property rights, market pricing for externalities, green innovation.`, `Socialist-left: carbon taxes as regressive costs that penalize industrial workers and commuters.`] },
        { id: '13t4', type: 'open', tag: 'Core synthesis', q: `Why does affective polarisation worsen when politics is treated as a one-dimensional spectrum rather than a multidimensional landscape? State one psychological mechanism.`, rows: 6, guide: [`Explain how a binary line activates in-group/out-group tribalism and moral sorting, whereas multiple dimensions create cross-cutting friendships and issue-specific alliances.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Constructing Balanced Analytical Essays with Steelmanning',
        text: 'A C1 analytical essay moves beyond taking sides. It explores the competing values that animate each political philosophy, identifies the legitimate concerns of both camps, and offers a nuanced synthesis.',
        weak: 'Right-wing people only care about rich businesses while left-wing people just want to give free money to lazy people.',
        strong: 'Whereas the political left grounds its legitimacy in the moral imperative to eradicate remediable inequalities, the conservative tradition prioritizes the preservation of social cohesion and accumulated institutional stability.'
      },
      short: {
        kind: 'Philosophical analysis', title: 'The Multi-Axis Citizen',
        prompt: 'Analyze why a voter might combine economically interventionist policies (such as state-funded pensions and industry protection) with culturally traditionalist values. How does a binary left-right system fail to serve this voter?',
        min: 160, max: 260, support: 'light',
        guide: ['Use contrast structures (whereas, while, as opposed to).', 'Incorporate the concepts of multidimensional space and political homelessness.']
      },
      main: {
        kind: 'Analytical essay', title: 'Beyond Left and Right: Reconstructing Democratic Discourse',
        prompt: 'To what extent is the traditional left-right political spectrum an obsolete relic of eighteenth-century history, and to what extent does it remain an indispensable heuristic for mass democracy? Write an essay weighing its analytical flaws against its practical utility.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: trace the historical origins in 1789 and define the central question.',
          'Body 1: examine the structural limitations of the single axis (false bundling, political homelessness, multidimensional realities).',
          'Body 2: analyze the psychological danger (affective polarisation, tribal sorting, visceral out-group hostility).',
          'Body 3: steelman the defense of the spectrum (Bobbio’s equality vs hierarchy divide, necessary cognitive heuristic for mass voting).',
          'Conclusion: synthesize how democratic citizens can utilize broad heuristics without falling into binary tribalism.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I avoid caricature and strawman descriptions of both political left and right?',
        'Did I use subordinating contrast connectors (whereas, while, in contrast to, as opposed to) accurately?',
        'Did I incorporate at least one wh-noun clause or whether-clause as a grammatical subject or complement?',
        'Did I integrate at least three STEAL chunks naturally?',
        'Does my conclusion provide a balanced synthesis of cognitive heuristics vs multidimensional complexity?'
      ],
      challenges: [
        'Replace any generic contrast word ("but", "however") with "whereas" or "as opposed to".',
        'Use the chunk "contingent historical accident" or "steelmanning the opposing philosophy".',
        'Ensure that both left and right philosophies are formulated with philosophical depth.'
      ]
    },
    retrieve: {
      content: 'Explain Norberto Bobbio’s criterion for distinguishing between political left and right.',
      contentGuide: ['Their fundamental stance toward social equality: the left sees inequality as artificial and remediable; the right sees it as natural or functional.'],
      grammar: 'Write two sentences contrasting political positions using “whereas” and “as opposed to”.',
      grammarGuide: ['Ensure correct punctuation for whereas and correct prepositional pattern for as opposed to.'],
      reasoning: 'Why is steelmanning an opposing argument more intellectually productive than constructing a strawman?',
      reasoningGuide: ['It tests your own thesis against the strongest counterarguments and prevents lazy confirmation bias.'],
      cumulative: 'Connect Unit 13 to Unit 11: how does affective polarisation undermine the conditions for substantive deliberative democracy?',
      summary: `<p><b>Main claim:</b> the one-dimensional left-right spectrum is a contingent historical heuristic that bundles unrelated values and fuels affective polarisation, though it retains utility as a mass democratic shorthand.</p><p><b>Grammar:</b> subordinating contrast connectors (whereas, as opposed to) and wh-noun clauses enable sophisticated ideological analysis.</p><p><b>Reasoning:</b> steelmanning and multidimensional mapping prevent tribal sorting and intellectual caricature.</p>`
    }
  });

  const u = K.units['13'];
  u.listening = [
    {
      id: 'l1', title: 'The Problem With the Compass', format: 'Academic seminar debate',
      file: '/audio/en/unit-13/u13-listening-01.mp3', duration: 130, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two academic speakers (Professor Julian Ward and Dr. Elena Rostova); brisk, collegial, British and North American accents',
      passes: ['First listen · identify why Dr. Rostova thinks two axes are better than one, but still incomplete', 'Second listen · track the four quadrants described by Professor Ward', 'Third listen · note contrast connectors'],
      transcript: `Prof. Ward: If you look at standard political science surveys today, Elena, almost no serious researcher uses a single left-right line. We map voters onto a two-dimensional plane: the horizontal axis measures economic distribution, from laissez-faire market capitalism to socialist planning; the vertical axis measures social authority, from libertarian personal autonomy to authoritarian social conservatism.\n\nDr. Rostova: That is certainly a major upgrade over the French Assembly model, Julian. It finally explains the populist quadrant—voters who want higher pensions and public hospitals, but who also want strict border control and national cultural preservation. On a single line, those voters look like a contradiction; on a two-dimensional grid, they form a coherent, powerful constituency.\n\nProf. Ward: Exactly. But what happens when we introduce a third dimension, such as environmental urgency versus industrial growth? Or globalist multilateralism versus local sovereignty?\n\nDr. Rostova: That’s the catch. Every time you add an axis, you gain descriptive accuracy, but you lose communicative simplicity. The media and political parties always collapse our models back onto a single horizontal line because elections are ultimately binary competitions between two coalitions. The math of power always flattens the multidimensional space of human thought.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core concept', q: 'What does the two-dimensional model clarify about populist voters according to Dr. Rostova?', options: ['They do not know how to vote.', 'They occupy a distinct quadrant combining economic interventionism (welfare) with social conservatism (borders, tradition).', 'They only exist in developing countries.', 'They always vote for environmentalist parties.'], answer: 1, explain: 'The two-axis compass explains voters who combine left-wing economics with conservative social values.' },
        { id: 'q2', type: 'open', tag: 'Trade-off analysis', q: 'According to Dr. Rostova, why does the media constantly flatten multidimensional models back into a single left-right line?', rubric: ['Explains that adding dimensions increases accuracy but loses simplicity', 'Notes that elections are binary competitions requiring aggregated coalitions'] }
      ]
    },
    {
      id: 'l2', title: 'Steelmanning as an Epistemic Habit', format: 'Short audio essay',
      file: '/audio/en/unit-13/u13-listening-02.mp3', duration: 115, level: 'C1',
      audioReady: false,
      voice: 'One reflective voice; calm, measured, deliberate pace; Australian English',
      passes: ['First listen · understand the psychological temptation of the strawman', 'Second listen · notice the definition and benefits of the steelman method'],
      transcript: `In contemporary political debate, the most common rhetorical move is the strawman. You take your opponent's complex, nuanced worldview, strip away its qualifying clauses, replace its best evidence with its most embarrassing supporters, and present a grotesque caricature that any child could knock down. It feels satisfying. It generates clicks, retweets, and cheering from your own ideological tribe. But epistemically, it leaves you completely blind.\n\nThe antidote to this tribal decay is steelmanning. To steelman an argument is to formulate the strongest possible case for the position you disagree with. It means asking yourself: If an exceptionally intelligent, well-informed, and morally decent person held this view, what would their reasons be?\n\nWhen you steelman an opponent, two things happen. First, you discover whether your own thesis is genuinely robust or merely surviving on the ignorance of your rivals. Second, you strip away the visceral animus that turns political differences into moral warfare. You realise that most political disputes are not battles between good and evil, but tragic conflicts between competing legitimate goods—between freedom and equality, between tradition and innovation, between justice and mercy.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What is the primary intellectual benefit of steelmanning according to the speaker?', options: ['It guarantees that you will win every televised debate.', 'It tests whether your own thesis is truly robust and transforms moral warfare into an understanding of competing legitimate values.', 'It converts your opponents to your point of view immediately.', 'It proves that all political opinions are equally true.'], answer: 1, explain: 'Steelmanning rigorously tests your own arguments and uncovers the legitimate philosophical tensions between values.' },
        { id: 'q2', type: 'open', tag: 'Application', q: 'How does the speaker distinguish between a "grotesque caricature" and a "tragic conflict between competing legitimate goods"?', rubric: ['Grotesque caricature: strawman that paints opponents as evil or stupid', 'Tragic conflict: steelmanned view recognizing tensions between real values like freedom vs equality or tradition vs innovation'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'You hear a colleague claim: “Anyone who votes for the other political party is either completely uneducated or morally corrupt.” Respond in 60–120 seconds. Deconstruct this one-dimensional partisan claim, introduce the concept of multidimensional value trade-offs, and demonstrate the practice of steelmanning.',
    prepare: 'Keywords only: affective polarisation · false dichotomy · Bobbio’s equality vs hierarchy · steelmanning legitimate values · multi-dimensional trade-offs. Do not script.',
    grammar: 'Subordinating contrast connectors (whereas, while, in contrast to); wh-noun clauses (What this claim ignores is...); epistemic hedging',
    targets: ['the cognitive map of the modern mind', 'steelmanning the opposing philosophy', 'affective polarisation and tribal sorting', 'reconcile competing human values'],
    rubric: [
      'Directly and calmly refutes the colleague’s simplistic tribal dismissal',
      'Explains political disagreement as a conflict between legitimate values rather than good vs evil',
      'Uses accurate contrast structures (whereas, as opposed to) and noun clause subjects',
      'Provides a compelling example of steelmanning an opposing worldview'
    ]
  };
})(window.KLANG);
