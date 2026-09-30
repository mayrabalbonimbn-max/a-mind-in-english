/* UNIT 14 · INEQUALITY AND THE STORY OF MERIT */
(function (K) {
  K.units['14'] = K.makeUnit('14', {
    module: 3, title: 'Inequality and the story', titleEm: 'of merit',
    question: 'To what extent can individual success be separated from social conditions?',
    knowLead: `In contemporary meritocratic societies, success is widely celebrated as the earned reward for talent and hard work. The promise of meritocracy is seductive: in a truly fair competition, socioeconomic outcomes reflect individual virtue rather than aristocratic birth. However, philosophers and sociologists have increasingly questioned this narrative. When starting lines are radically unequal, the ideal of merit can easily transform into a mechanism for legitimizing inherited privilege and humiliating those who fall behind. Keep the distinction between individual agency and structural inheritance in mind as you read.`,
    terms: [
      ['Meritocracy', `A social system in which individuals advance, gain power, and receive rewards purely on the basis of their demonstrated ability and effort, rather than wealth or family background.`],
      ['The Tyranny of Merit', `Philosopher Michael Sandel's concept that meritocratic hubris leads the successful to believe they earned their advantages entirely on their own, while inducing demoralising self-blame in the unsuccessful.`],
      ['Intergenerational mobility', `The degree to which the socioeconomic status of children differs from that of their parents; high mobility indicates that social background does not dictate adult outcomes.`],
      ['The Great Gatsby Curve', `An empirical economic relationship showing that countries with higher levels of income inequality consistently exhibit lower rates of intergenerational economic mobility.`],
      ['Cumulative advantage', `The systemic process (often called the Matthew Effect) where early advantages, resources, or credentials compound over time, generating exponentially wider gaps in opportunity.`]
    ],
    views: [
      'Two narratives of inequality and achievement',
      'The meritocratic ideal',
      `Inequality of outcome is both fair and socially beneficial provided that everyone enjoys equal formal access to education and competitive markets. Unequal rewards incentivize excellence and innovation.`,
      'The structural critique',
      `Merit itself is largely an inherited product of genetic fortune, parental investment, and zip code. Celebrating meritocracy disguises structural reproduction as moral desert and breeds contempt for manual labor.`,
      `The core question is whether meritocracy is an unfulfilled ideal that needs fairer rules, or an inherently toxic framework that corrupts democratic solidarity.`
    ],
    knowPrompt: `When an individual from an affluent family scores higher on a standardized university entrance exam than a student from a chronically underfunded public school, does this test score reflect superior "merit"? Explain your reasoning.`,
    knowGuide: [
      `Distinguish measured achievement from natural effort and talent.`,
      `Consider how private tutoring, childhood nutrition, emotional stability, and socioeconomic capital compound over eighteen years.`
    ],
    read: {
      main: {
        format: 'Philosophical & economic treatise', title: 'The Seductive Trap of Meritocracy',
        standfirst: `Meritocracy promised to dismantle the tyranny of aristocratic birth. Instead, it created a new aristocracy that believes its privilege is morally deserved.`,
        pull: { after: 7, text: `The dark side of believing you earned your success is the cruel conviction that those who struggle have earned their failure.` },
        notes: { 3: `<b>Michael Sandel</b> published <i>The Tyranny of Merit</i> in 2020, critiquing the moral and civic consequences of meritocratic hubris.`, 8: `<b>The Great Gatsby Curve</b> was introduced by economist Alan Krueger in 2012 using data compiled by Miles Corak.` },
        paras: [
          `For the past half-century, modern liberal democracies have organized their moral justification of inequality around a single, intoxicating concept: meritocracy. The premise was revolutionary when it was first championed against the stagnant hierarchies of feudal and aristocratic Europe. In an aristocratic order, your destiny was decided before you took your first breath; whether you ruled as a duke or labored as a peasant was fixed by the accident of lineage. Against this hereditary tyranny, the ideal of merit offered an egalitarian promise of breathtaking simplicity: let every individual rise as far as their natural talent and relentless effort will take them. In a fair race, outcomes would reflect virtue rather than bloodlines.`,
          `This narrative has become the undisputed secular theology of modern capitalist societies. Presidents, corporate chief executives, and educational reformers across the political spectrum repeat the meritocratic mantra with liturgical devotion: "You can make it if you try." Higher education is celebrated as the ultimate engine of opportunity, the great neutral sorting machine that identifies raw ability in every corner of society and elevates it to leadership. Inequality itself is not denied; rather, it is sanctified. If everyone had an equal chance to compete, then whatever disparities emerge at the finish line are not only economically efficient, but morally just. The rich deserve their wealth, and the poor, by inescapable implication, deserve their poverty.`,
          `Yet beneath this flattering moral architecture lies a profound structural deception. Over the past two decades, a growing chorus of philosophers, economists, and sociologists—most notably Michael Sandel and Daniel Markovits—have dismantled the core assumptions of the meritocratic myth. The first and most obvious flaw in the meritocratic promise is empirical: the race is not fair, and the starting lines are never equal. In highly unequal societies such as Brazil, the United States, and South Africa, the resources invested in a child during their first eighteen years of life are overwhelmingly determined by parental wealth.`,
          `Consider what is required to produce high scores on standardized university entrance examinations, such as the Brazilian ENEM or the American SAT. It is not raw genetic brilliance operating in a vacuum. It is the cumulative product of stable home environments, elite private schooling, intensive individualized tutoring, international travel, expansive cultural vocabulary, and the psychological security that comes from knowing that financial failure will not result in destitution. Affluent parents do not merely pass down liquid capital to their offspring; they convert their wealth into human capital through relentless educational investment. What we celebrate as individual "merit" is, in the vast majority of cases, the concentrated accumulation of parental advantage.`,
          `This dynamic produces what sociologists call the reproduction of class through educational credentials. When admissions officers select students based on test scores and competitive extracurricular resumes, they are not bypassing the class structure; they are laundering it. A degree from an elite university becomes the modern equivalent of an aristocratic title—a legally recognized badge of superiority that grants access to the most lucrative sectors of the global economy. But unlike feudal aristocrats, who at least recognized that their status was an accident of birth, the modern credentialed elite genuinely believes that its privileges were won through personal virtue and intellectual labor.`,
          `This brings us to the second, deeper moral critique of meritocracy: its corrosive effect on democratic solidarity. When people believe that success is the direct reward for talent and hard work, they inevitably develop what Sandel terms "meritocratic hubris." The winners look down upon the non-credentialed working class not simply as poorer, but as less intelligent, less disciplined, and morally deficient. Conversely, those who are left behind in a meritocracy suffer a psychological injury far more devastating than anything experienced under traditional feudalism. Under a hereditary aristocracy, a peasant could console themselves with the knowledge that their subjugation was caused by an arbitrary social system. In a meritocracy, if you find yourself working a low-paid, precarious job, the system whispers a cruel verdict: you are where you are because you lacked the talent or the grit to rise.`,
          `This dynamic explains much of the populist fury that has destabilized democracies across the globe. Working-class citizens are not merely angry about stagnant real wages and industrial decline; they are revolting against the indignity of being held in contempt by a credentialed technocratic elite that lectures them on personal responsibility. When political leaders tell displaced industrial workers that their only hope is to "retrain and get a college degree," they are not offering compassion; they are delivering an insult. They are telling them that their failure to flourish in the knowledge economy is an individual defect for which they have only themselves to blame.`,
          `Economists have provided robust quantitative confirmation of this sociological reality through the concept of the Great Gatsby Curve. Across dozens of countries, empirical research demonstrates that the higher the level of income inequality in a society, the lower the rate of intergenerational economic mobility. In countries with high inequality and weak public safety nets, the children of the wealthy almost invariably remain wealthy, while the children of the poor remain trapped at the bottom. The myth of the self-made individual who rises from poverty to boundless wealth through sheer determination is an exceptional statistical anomaly, weaponized by elites to justify systemic inertia.`,
          `Furthermore, there is a fundamental philosophical flaw at the heart of the concept of desert. Even if we could miraculously achieve absolute equality of opportunity—giving every child identical schools, identical healthcare, and identical nutrition—outcomes would still be determined by natural distributions of genetic talent and cognitive dispositions. But why should an individual be entitled to vast economic rewards simply because they were born with the particular mathematical or communicative talents that a high-tech market happens to value at this specific historical moment? A person can claim credit for their effort, but they cannot claim moral credit for the genetic lottery that gave them their brain, nor for the historical accident that made their specific abilities commercially lucrative.`,
          `To build a more humane and cohesive society, democracies must abandon the toxic illusion of meritocracy and reconstruct the dignity of work. True equality cannot mean giving everyone an equal chance to scramble up a steep, narrow ladder while leaving the vast majority at the bottom to suffer in neglect. It requires compressing the distance between the rungs of the ladder, ensuring that every citizen—regardless of their academic credentials or commercial market value—enjoys the material security, public respect, and democratic agency essential for a flourishing life.`
        ]
      },
      counter: {
        format: 'Economic defense', title: 'The Practical Necessity of Merit-Based Allocation',
        standfirst: `Discarding meritocratic selection risks replacing competence with political favoritism, cronyism, and systemic decline.`,
        paras: [
          `Critics of meritocracy are undeniably correct when they point out that equality of opportunity remains an unfulfilled ideal in deeply unequal societies. However, their philosophical assault on the principle of merit itself is dangerously misguided.` ,
          `The alternative to allocating complex social and technical roles based on demonstrated competence is not a socialist paradise of universal brotherhood. The historical alternatives to meritocracy are nepotism, political patronage, hereditary privilege, and ideological loyalty. When you board a commercial airplane, undergo complex neurosurgery, or cross a suspension bridge, you do not want an egalitarian distribution of credentials; you want the cockpit, the operating theater, and the engineering firm staffed by individuals who demonstrated superior competence through rigorous, competitive examinations.` ,
          `Furthermore, merit-based selection creates indispensable incentives for human flourishing. Developing expertise requires thousands of hours of disciplined sacrifice, delayed gratification, and rigorous intellectual training. If a society eliminates the differential rewards and social recognition attached to high achievement, it destroys the motivation for individuals to cultivate their talents to the highest possible level, leading to social and technological stagnation.` ,
          `The solution to the pathologies of contemporary meritocracy is not to abandon the ideal of merit, but to purify it. We must aggressively expand early childhood education, fund public schools equitably, eliminate inherited tax loopholes, and build robust public healthcare systems so that every child genuinely possesses the capacity to compete on equal terms. Meritocracy is not a false god; it is an unfinished revolution.`
        ]
      }
    },
    sources: [
      { title: 'The Tyranny of Merit: What’s Become of the Common Good? (Michael J. Sandel)', url: 'https://us.macmillan.com/books/9780374289980/thetyrannyofmerit', note: 'Philosophical deconstruction of meritocracy, hubris, and democratic solidarity.' },
      { title: 'The Meritocracy Trap (Daniel Markovits)', url: 'https://www.penguinrandomhouse.com/books/536151/the-meritocracy-trap-by-daniel-markovits/', note: 'Sociological analysis of how elite education consolidates inherited privilege.' },
      { title: 'Inequality from Generation to Generation: The United States in Comparison (Miles Corak)', url: 'https://milescorak.com/the-great-gatsby-curve/', note: 'Empirical data establishing the Great Gatsby Curve between inequality and mobility.' }
    ],
    interpret: [
      { id: '14i1', type: 'mc', tag: 'Main idea', q: `What is the central philosophical critique of meritocracy presented in the main text?`, options: [`Meritocracy is flawless and has completely abolished the class system.`, `Meritocracy falsely frames socially constructed advantages as individual moral virtue, legitimizing inequality and undermining social solidarity.`, `Meritocracy only exists in agrarian societies.`, `Universities should abolish all examinations and grades.`], answer: 1, explain: `The essay argues that meritocracy acts as a moral justification for inequality by framing inherited privilege as individual virtue.` },
      { id: '14i2', type: 'mc', tag: 'Inference', q: `Why does Michael Sandel argue that failing in a meritocracy is psychologically more damaging than failing under a feudal aristocracy?`, options: [`Because peasants had more money than modern workers.`, `Because in a meritocracy, failure is internalized as personal incompetence rather than blamed on an arbitrary caste system.`, `Because feudal lords were more generous than modern corporate managers.`, `Because standardized tests are physically painful.`], answer: 1, explain: `Under meritocracy, the unsuccessful internalize failure as evidence of personal inadequacy and lack of talent.` },
      { id: '14i3', type: 'tf', tag: 'Detail', q: `According to the Great Gatsby Curve, countries with high income inequality generally enjoy the highest rates of social mobility.`, answer: false, explain: `Paragraph 8 explains that higher inequality directly correlates with lower intergenerational mobility.` },
      { id: '14i4', type: 'mc', tag: 'Counterpoint argument', q: `What primary danger does the counterpoint identify if society abandons merit-based selection for specialized professions?`, options: [`It would increase the cost of paper.`, `It risks replacing demonstrated competence with nepotism, political patronage, and declining technical standards.`, `It would force all universities to close permanently.`, `It would eliminate all taxation.`], answer: 1, explain: `The counterpoint warns that without merit-based criteria, roles like surgery and engineering would be allocated through patronage or nepotism.` },
      { id: '14i5', type: 'open', tag: 'Evidence vs interpretation', q: `How does the author explain the conversion of parental wealth into "human capital"? Name two specific mechanisms mentioned in paragraph 4.`, rows: 4, guide: [`Mechanisms: elite private schooling, intensive tutoring, international travel, expansive cultural vocabulary, and psychological security.`] },
      { id: '14i6', type: 'open', tag: 'Synthesis & comparison', q: `Compare the main essay’s conclusion (compress the ladder) with the counterpoint’s conclusion (purify the competition). How do their visions of social justice differ?`, rows: 5, guide: [`Main essay wants to compress inequality of outcome and elevate the dignity of all work regardless of credentials.`, `Counterpoint wants to equalize starting conditions while preserving unequal rewards for demonstrated competence.`] },
      { id: '14i7', type: 'open', tag: 'Application', q: `In the context of Brazilian education, analyze how the quota system (Lei de Cotas) in federal universities addresses the tension between raw standardized test scores and cumulative socioeconomic background.`, rows: 5, guide: [`Discuss affirmative action as a corrective to structural inequalities in public vs private schooling.`, `Evaluate how quotas recalibrate merit to account for unequal starting lines.`] }
    ],
    notice: [
      {
        title: 'Advanced comparatives, correlative proportions, and quantifiers',
        sub: 'Expressing structural ratios, compounding effects, and escalating inequalities',
        examples: [
          `<b>The higher</b> the level of income inequality, <b>the lower</b> the rate of social mobility.`,
          `Meritocratic privilege is <b>far more entrenched than</b> traditional aristocratic status.`,
          `They invested <b>significantly fewer</b> resources in public infrastructure, resulting in <b>exponentially wider</b> gaps.`,
          `Success depends <b>not so much on</b> raw genetic intellect <b>as on</b> cumulative parental investment.`
        ],
        questions: [
          `How does the correlative structure "the [comparative]..., the [comparative]..." establish a direct mathematical or causal relationship?`,
          `Why is "fewer resources" used with countable plural nouns, while "less wealth" is used with uncountable nouns?`,
          `How do modifier adverbs like "significantly", "marginally", and "exponentially" calibrate comparative claims?`
        ],
        explain: `<p>Correlative comparative constructions (<b>The + comparative..., the + comparative...</b>) are indispensable in socioeconomic analysis for modeling interconnected trends: <i>The steeper the social hierarchy, the more destructive the meritocratic hubris becomes.</i></p><p>Master the distinction between countable quantifiers (<b>fewer opportunities, fewer resources</b>) and uncountable quantifiers (<b>less mobility, less capital</b>). Use escalating adverbs (<b>exponentially, substantially, marginally</b>) to specify magnitude.</p>`,
        compare: { head: ['Basic comparative', 'Correlative comparative', 'Analytical gain'], rows: [['When inequality grows, mobility drops.', 'The higher the income inequality, the lower the intergenerational mobility.', 'States an established empirical economic law.'], ['Private school students have more advantage.', 'Affluent students enjoy exponentially greater access to elite credentials.', 'Quantifies magnitude and institutional mechanism.']] },
        practice: [
          [`Combine using "The + comparative..., the + comparative...": <i>When educational credentials become more expensive, the class divide deepens.</i>`, `The more expensive educational credentials become, the deeper the class divide grows.`, `Uses proportional comparative structure.`],
          [`Correct the quantifier error: <i>Students from poor neighborhoods have less chances of entering law school.</i>`, `Students from poor neighborhoods have fewer chances of entering law school.`, `Corrects countable noun quantifier.`],
          [`Add an intensifying adverb: <i>The second proposal is fairer than the current system.</i>`, `The second proposal is substantially fairer than the current system.`, `Uses formal comparative modifier.`]
        ],
        radar: [
          { wrong: 'The more high the score, the more good the university.', right: 'The higher the score, the better the university.', why: 'Use standard irregular comparative forms (higher, better).' },
          { wrong: 'There are less people applying for manual jobs.', right: 'There are fewer people applying for manual jobs.', why: 'Use fewer with countable plural nouns (people, jobs, candidates).' }
        ],
        help: `<p><b>Em português:</b> A estrutura correlativa <i>The more..., the less...</i> equivale a "Quanto mais..., menos...", essencial para descrever relações socioeconômicas como a curva de Great Gatsby.</p>`
      },
      {
        title: 'Cause, consequence, and compounding connectors',
        sub: 'Tracing multi-stage institutional feedback loops across generations',
        examples: [
          `Early advantages compound over time, <b>thereby cementing</b> intergenerational privilege.`,
          `The sorting mechanism launder class advantages, <b>with the consequence that</b> social mobility stagnates.`,
          `Educational credentials grant access to elite networks, <b>which in turn reinforces</b> economic concentration.`
        ],
        questions: [
          `How does "thereby + -ing" create a concise, logical result clause?`,
          `What is the function of "which in turn" in multi-stage causal chains?`
        ],
        explain: `<p>Complex argumentative writing traces causal chains using participial result clauses (<b>thereby producing, thus reinforcing</b>) and compounding connectors (<b>which in turn, with the consequence that, as a direct result of</b>).</p>`,
        compare: { head: ['Choppy clauses', 'Participial result clause', 'Elegance gain'], rows: [['Wealthy parents buy tutoring. This helps children get degrees. This cements their status.', 'Wealthy parents invest in private tutoring, thereby securing elite credentials that in turn cement their children’s socioeconomic status.', 'Flows as a single, sophisticated causal explanation.']] },
        practice: [
          [`Combine using "thereby + -ing": <i>The university expanded quota admissions. It reduced historic racial disparities.</i>`, `The university expanded quota admissions, thereby reducing historic racial disparities.`, `Uses participial result clause.`]
        ],
        radar: [
          { wrong: 'He studied hard, thereby he passed the exam.', right: 'He studied hard, thereby passing the exam.', why: 'Thereby is followed by a present participle (-ing), not a finite clause.' }
        ],
        help: `<p><b>Em português:</b> <i>thereby + particípio presente</i> equivale a "consequentemente fazendo...", "garantindo assim...", conectando ação e efeito de forma fluida.</p>`
      }
    ],
    vocab: [
      ['meritocracy', 'noun', 'A system where advancement is based on individual ability and effort rather than birth.', 'Meritocracy was designed to replace inherited aristocracy.', 'The book offers a profound critique of modern meritocracy.', ['flawed meritocracy', 'educational meritocracy', 'ideal of meritocracy'], ['rule by talent', 'competitive hierarchy'], 'Sociological concept.', '/ˌmer.ɪˈtɒk.rə.si/', 'aristocracy'],
      ['hubris', 'noun', 'Excessive pride, self-confidence or arrogance, often leading to downfall.', 'Meritocratic hubris causes the successful to look down upon working-class citizens.', 'The financial sector was undone by its own hubris.', ['meritocratic hubris', 'intellectual hubris', 'fatal hubris'], ['arrogance', 'conceit', 'overconfidence'], 'High-frequency philosophical noun.', '/ˈhjuː.brɪs/', 'humility'],
      ['desert', 'noun', 'The condition of being deserving of reward or punishment (what one deserves).', 'Meritocracy equates market success with moral desert.', 'He received his just deserts.', ['moral desert', 'just deserts', 'notion of desert'], ['worthiness', 'merit', 'entitlement'], 'Moral philosophy technical term.', '/dɪˈzɜːt/', null],
      ['intergenerational', 'adjective', 'Relating to, involving, or affecting several generations.', 'High inequality prevents intergenerational mobility.', 'They analyzed patterns of intergenerational wealth transfer.', ['intergenerational mobility', 'intergenerational wealth', 'intergenerational poverty'], ['cross-generational', 'family-wide'], 'Sociological adjective.', '/ˌɪn.təˌdʒen.əˈreɪ.ʃən.əl/', null],
      ['laundering', 'noun', 'The process of making something illegitimate appear legal, moral, or natural.', 'Credentialism acts as a mechanism for the laundering of inherited class privilege.', 'The policy was criticized as the laundering of state corruption.', ['class laundering', 'reputational laundering', 'moral laundering'], ['sanctification', 'legitimation', 'whitewashing'], 'Critical metaphorical noun.', '/ˈlɔːn.dər.ɪŋ/', null],
      ['corrosive', 'adjective', 'Tending to cause gradual damage or destruction to a relationship or community.', 'Meritocratic contempt has a corrosive effect on democratic solidarity.', 'Cynicism is corrosive to civic trust.', ['corrosive effect', 'corrosive influence', 'highly corrosive'], ['destructive', 'damaging', 'toxic'], 'Essayistic adjective.', '/kəˈrəʊ.sɪv/', 'restorative'],
      ['credential', 'noun', 'A qualification, achievement, or document confirming a person’s competence.', 'Elite university credentials have become the currency of the knowledge economy.', 'Applicants must present relevant academic credentials.', ['academic credentials', 'elite credentials', 'professional credential'], ['qualification', 'degree', 'certificate'], 'High-frequency education noun.', '/krɪˈden.ʃəl/', null],
      ['stagnation', 'noun', 'A state of not flowing, moving, developing, or progressing.', 'Without competitive incentives, societies risk technological stagnation.', 'The region experienced prolonged wage stagnation.', ['economic stagnation', 'wage stagnation', 'social stagnation'], ['sluggishness', 'inertia', 'inactivity'], 'Economic noun.', '/stæɡˈneɪ.ʃən/', 'growth'],
      ['sanctify', 'verb', 'Declare something holy or make it appear morally legitimate.', 'Market outcomes are often sanctified as fair rewards for virtue.', 'Tradition was used to sanctify social hierarchy.', ['sanctify inequality', 'sanctify privilege', 'morally sanctify'], ['legitimize', 'consecrate', 'bless'], 'Critical essayistic verb.', '/ˈsæŋk.tɪ.faɪ/', 'condemn'],
      ['cumulative', 'adjective', 'Increasing or growing by successive additions.', 'Success is the cumulative product of eighteen years of parental investment.', 'The cumulative impact of small disadvantages is devastating.', ['cumulative advantage', 'cumulative effect', 'cumulative impact'], ['compounding', 'accumulative', 'aggregate'], 'Core analytical adjective.', '/ˈkjuː.mjə.lə.tɪv/', 'isolated']
    ],
    chunks: [
      ['the secular theology of modern capitalism', 'A deeply held, unquestioned belief system that justifies economic order.', 'Critiquing dominant ideologies', 'Essayistic · philosophical', 'Meritocracy has become the secular theology of modern capitalism.', 'Critique an economic dogma.', `Endless consumer growth is treated as the secular theology of modern capitalism.`, 'Rich metaphorical chunk.'],
      ['the lottery of birth and genetic fortune', 'The unearned distribution of biological talents and socioeconomic starting points.', 'Deconstructing personal pride', 'Philosophical · analytical', 'Our achievements depend heavily on the lottery of birth and genetic fortune.', 'Argue against arrogance.', `Humility begins with acknowledging how much we owe to the lottery of birth and genetic fortune.`, 'Rawlsian philosophical chunk.'],
      ['laundering inherited privilege as individual merit', 'Disguising family wealth as personal virtue through elite educational credentials.', 'Unmasking elite credentialism', 'Critical · sociological', 'Elite university admissions often function by laundering inherited privilege as individual merit.', 'Critique unequal education.', `Standardized testing risks laundering inherited privilege as individual merit.`, 'Core Sandel/Markovits critique.'],
      ['meritocratic hubris and working-class resentment', 'The arrogance of credentialed elites and the resulting anger of non-graduates.', 'Diagnosing populist polarisation', 'Sociological · political', 'The populist revolt is fueled by meritocratic hubris and working-class resentment.', 'Explain political division.', `Democratic stability is fractured by meritocratic hubris and working-class resentment.`, 'Key political diagnosis.'],
      ['the Great Gatsby Curve', 'The proven statistical link between high economic inequality and low social mobility.', 'Deploying empirical evidence', 'Academic · economic', 'Cross-national data on the Great Gatsby Curve proves that unequal nations have the lowest mobility.', 'Cite economic data.', `The Great Gatsby Curve demonstrates that market inequality traps families across generations.`, 'Empirical economic concept.'],
      ['compress the distance between the rungs of the ladder', 'Reducing the extreme gap between high and low socioeconomic outcomes.', 'Proposing egalitarian reform', 'Essayistic · metaphorical', 'Justice requires us to compress the distance between the rungs of the ladder rather than just help a few climb.', 'Advocate social equality.', `Instead of promising everyone an escape from poverty, we should compress the distance between the rungs of the ladder.`, 'Powerful policy metaphor.'],
      ['compounding advantages over time', 'The process where early resources multiply and create escalating future benefits.', 'Explaining systemic inequality', 'Analytical · economic', 'Early childhood nutrition and elite tutoring generate compounding advantages over time.', 'Describe educational disparities.', `Generational wealth operates through compounding advantages over time across housing and finance.`, 'Sociological mechanism chunk.'],
      ['moral desert versus market value', 'The philosophical gap between what a person deserves morally and what the market pays.', 'Making philosophical distinctions', 'Academic · philosophical', 'We must separate moral desert from market value; a teacher’s worth is not defined by their salary.', 'Distinguish worth from price.', `High executive compensation reflects market leverage rather than moral desert.`, 'Essential ethical distinction.'],
      ['an unfulfilled ideal rather than an inherent failure', 'Arguing that a principle is sound but poorly implemented in practice.', 'Defending a reformist stance', 'Analytical · debate', 'Supporters maintain that meritocracy is an unfulfilled ideal rather than an inherent failure.', 'Defend a democratic institution.', `Electoral democracy remains an unfulfilled ideal rather than an inherent failure.`, 'Nuanced defensive frame.'],
      ['the dignity of work and civic contribution', 'Valuing all forms of labor and participation regardless of academic credentials.', 'Affirming humanistic values', 'Philosophical · political', 'Democratic renewal requires rebuilding the dignity of work and civic contribution.', 'Conclude an essay on labor.', `A civilized economy honors the dignity of work and civic contribution of every citizen.`, 'Humanistic closing chunk.']
    ],
    collocations: [
      [`The winners in a meritocracy often succumb to meritocratic ______.`, [`hubris`, `cleavage`, `straitjacket`, `vacuum`], 0, `Meritocratic hubris is Michael Sandel's core concept.`],
      [`Standardized exams risk ______ inherited class privileges as individual talent.`, [`laundering`, `earmarking`, `neutralising`, `aggregating`], 0, `Laundering privilege describes disguised class transmission.`],
      [`Data confirms the validity of the Great Gatsby ______.`, [`Curve`, `Axis`, `Line`, `Grid`], 0, `The Great Gatsby Curve is the established economic term.`],
      [`Contempt for non-graduates has a ______ effect on national solidarity.`, [`corrosive`, `substantive`, `discretionary`, `visceral`], 0, `Corrosive effect is the standard collocation for institutional erosion.`]
    ],
    upgrades: [
      [`Rich kids do better on tests because their parents pay for everything.`, `Socioeconomic advantages compound across childhood, converting financial capital into measured academic merit.`],
      [`When poor people fail, the system makes them feel stupid.`, `Meritocratic ideology induces painful self-blame, framing structural exclusion as personal inadequacy.`],
      [`We should make everyone have the same chance to become rich.`, `Rather than merely facilitating mobility up a steep hierarchy, policy should compress the distance between the rungs of the ladder.`]
    ],
    think: {
      title: 'Confounders, Background Conditions and the Great Gatsby Curve',
      lead: 'A rigorous thinker never treats an outcome as a pure measure of individual agency without controlling for compounding background variables and structural confounders.',
      defs: [
        ['Confounding variable', `An unmeasured variable that influences both the supposed cause and effect, producing a spurious or distorted correlation.`],
        ['Matthew Effect', `The phenomenon of cumulative advantage where those who begin with more resources systematically accumulate even more over time.`],
        ['Rawlsian veil of ignorance', `A philosophical thought experiment where justice is defined by designing rules without knowing what genetic or social position you will occupy.`]
      ],
      items: [
        { id: '14t1', type: 'mc', tag: 'Confounder check', q: `A study finds a strong correlation between high scores on standardized university entrance tests and high career earnings 20 years later. What is the most significant confounding variable?`, options: [`The color of the applicant's test pencil.`, `Parental wealth and social network capital, which drive both test preparation access and later employment connections.`, `The weather on the day of the examination.`, `Whether the applicant owns a bicycle.`], answer: 1, explain: `Parental socioeconomic capital is the major confounder driving both early test preparation and later professional recruitment.` },
        { id: '14t2', type: 'open', tag: 'Steelmanning', q: `Steelman the meritocratic argument: explain why replacing competitive examinations with random lotteries for medical school admissions could harm public welfare.`, rows: 5, guide: [`Focus on competence, rigorous knowledge filtering, patient safety, diagnostic skill, and the incentive to master demanding scientific disciplines.`] },
        { id: '14t3', type: 'open', tag: 'Rawlsian analysis', q: `Apply John Rawls's "genetic lottery" argument: if an individual did not earn their high natural IQ, why is an economic system that gives 100x higher rewards to high IQ morally arbitrary?`, rows: 5, guide: [`Explain that genetic endowment is an unearned biological accident, and market demand for specific cognitive skills is a historical contingency.`] },
        { id: '14t4', type: 'open', tag: 'Core synthesis', q: `Why does high income inequality mathematically undermine equal opportunity, as shown by the Great Gatsby Curve? State one clear mechanism.`, rows: 6, guide: [`Explain how vast wealth disparities allow affluent families to outspend poorer families on early childhood development, elite schools, and social networks, cementing advantages.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an ENEM-Style / Analytical Argumentative Essay on Social Mobility',
        text: 'A top-tier argumentative essay balances philosophical critique with empirical evidence. You must deconstruct the narrative of individual merit, demonstrate structural barriers with precision, and propose structural solutions without falling into defeatism.',
        weak: 'Meritocracy is completely fake and rich people just steal everything while poor people suffer.',
        strong: 'While competitive selection mechanisms remain indispensable for allocating specialized technical roles, the uncritical celebration of meritocracy disguises cumulative parental advantages as moral desert, eroding democratic solidarity and deepening inequality.'
      },
      short: {
        kind: 'Philosophical briefing', title: 'The Limits of Educational Merit',
        prompt: 'Analyze how standardized university entrance exams can function simultaneously as objective measures of knowledge and as mechanisms for intergenerational class reproduction.',
        min: 160, max: 260, support: 'light',
        guide: ['Use correlative comparative structures (The higher..., the more...).', 'Incorporate the concepts of cumulative advantage and laundering privilege.']
      },
      main: {
        kind: 'Argumentative essay (ENEM-style)', title: 'The Illusion of Equal Opportunity: Rethinking Merit and Social Justice',
        prompt: 'To what extent is meritocracy a genuine vehicle for democratic social mobility, and to what extent does it function as an ideological justification for inherited inequality? Write a comprehensive analytical essay proposing how society should reconcile competence with democratic equity.',
        min: 500, max: 700, support: 'light',
        guide: [
          'Introduction: trace the seductive appeal of meritocracy and state your central thesis.',
          'Body 1: analyze how early socioeconomic advantages compound into measured academic "merit" (tutoring, private schooling, cultural capital).',
          'Body 2: examine the moral and civic consequences (meritocratic hubris, working-class resentment, erosion of solidarity).',
          'Body 3: address the counterpoint (the practical necessity of competence-based selection in specialized fields like medicine and engineering).',
          'Conclusion: propose concrete structural measures (e.g. compressing inequality, investing in universal public education, restoring the dignity of non-academic work).'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I distinguish between individual effort and structural background conditions?',
        'Did I use advanced comparative and quantifier structures (e.g. "The higher..., the lower...", "fewer resources", "substantially greater") correctly?',
        'Did I trace causal chains using participial result clauses (e.g. "thereby cementing", "which in turn")?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my essay provide a constructive synthesis rather than pure despair?'
      ],
      challenges: [
        'Include one sentence using the correlative comparative structure "The + comparative..., the + comparative...".',
        'Use the chunk "meritocratic hubris and working-class resentment" or "laundering inherited privilege".',
        'Ensure that the counterargument on competence-based selection is fairly addressed.'
      ]
    },
    retrieve: {
      content: 'Explain Michael Sandel’s concept of "meritocratic hubris" and its impact on working-class citizens.',
      contentGuide: ['The successful believe they earned everything by themselves and look down on the unsuccessful, while the unsuccessful internalize self-blame.'],
      grammar: 'Write two sentences using "The + comparative..., the + comparative..." and "thereby + -ing".',
      grammarGuide: ['Check comma placement and parallel comparative adjectives.'],
      reasoning: 'Why is the correlation between parental wealth and child test scores a confounding variable for claims about innate intelligence?',
      reasoningGuide: ['Parental wealth purchases tutoring, nutrition, stable housing, and elite schools that directly inflate test performance.'],
      cumulative: 'Connect Unit 14 to Unit 11: how does educational credentialism create an epistemic credibility deficit for working-class citizens in public debates?',
      summary: `<p><b>Main claim:</b> meritocracy promises fair mobility but in practice launders inherited parental advantages as moral desert, generating meritocratic hubris and lowering intergenerational mobility.</p><p><b>Grammar:</b> correlative comparatives (the higher..., the lower...) and participial result clauses (thereby producing) enable precise socioeconomic modeling.</p><p><b>Reasoning:</b> distinguish moral desert from market value; identify structural confounders in standardized achievement.</p>`
    }
  });

  const u = K.units['14'];
  u.listening = [
    {
      id: 'l1', title: 'The Great Gatsby Curve Explained', format: 'Economics radio feature',
      file: '/audio/en/unit-14/u14-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two speakers (Presenter Marcus Vance and Labor Economist Dr. Clara Hughes); polished, engaging, BBC World Service style',
      passes: ['First listen · understand what the horizontal and vertical axes of the Great Gatsby Curve represent', 'Second listen · identify why Scandinavian countries cluster at one end while the US and Brazil cluster at the other'],
      transcript: `Marcus: Dr. Hughes, the name sounds like a literary novel, but the Great Gatsby Curve is one of the most sobering graphs in modern economics. What exactly does it plot?\n\nDr. Hughes: It was named by economist Alan Krueger in 2012. On the horizontal axis, you plot a country’s level of income inequality—measured by the Gini coefficient. On the vertical axis, you plot intergenerational economic elasticity—which is a measure of how much a child’s adult income is determined by their parents' income. In plain English: the higher the number on the vertical axis, the less social mobility you have.\n\nMarcus: And what does the data reveal when you plot different countries?\n\nDr. Hughes: The correlation is striking. Countries with low inequality and strong social investments—like Denmark, Norway, and Finland—cluster in the bottom-left corner. They have high mobility: if you are born poor in Copenhagen, your chances of rising to the middle class are remarkably high. But as you move toward highly unequal countries—like the United States, the United Kingdom, and at the extreme end, Brazil and South Africa—mobility collapses. The greater the inequality between families, the harder it is for talent alone to overcome the compounding advantages of inherited wealth.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What fundamental economic reality does the Great Gatsby Curve demonstrate?', options: ['High inequality is necessary to motivate poor citizens to work.', 'Countries with high income inequality consistently suffer from lower intergenerational social mobility.', 'All countries have identical rates of social mobility.', 'Scandinavian countries have no public schools.'], answer: 1, explain: 'The curve proves that higher inequality directly reduces social mobility across generations.' },
        { id: 'q2', type: 'open', tag: 'Mechanism analysis', q: 'Why does mobility collapse in countries with extreme inequality according to Dr. Hughes?', rubric: ['Explains that large resource gaps between families allow wealthy parents to compound educational and financial advantages', 'Shows that individual talent cannot easily overcome massive disparities in early childhood investment'] }
      ]
    },
    {
      id: 'l2', title: 'The Moral Cost of Winning', format: 'Mini-lecture by a philosopher',
      file: '/audio/en/unit-14/u14-listening-02.mp3', duration: 125, level: 'C1',
      audioReady: false,
      voice: 'One academic voice; deep, resonant, thoughtful; General American English',
      passes: ['First listen · track the psychological shift from gratitude to hubris', 'Second listen · notice how meritocratic judgment harms both the winners and the losers'],
      transcript: `We often discuss inequality in terms of dollars, tax brackets, and Gini coefficients. But the deepest injury inflicted by meritocracy is moral and psychological.\n\nWhen an elite class believes that its position was bestowed by God or noble blood, it is undoubtedly oppressive, but it does not claim intellectual or moral superiority. An aristocrat might say: "I am a lord because my father was a lord; it is an accident of history." But when a graduate of an elite university looks in the mirror, they say: "I am here because I scored in the ninety-ninth percentile. I worked eighty hours a week. I earned this."\n\nThis conviction destroys the capacity for gratitude and civic humility. If the winners believe their success is entirely their own doing, they owe nothing to the society that created the conditions for their flourishing. And worse, they look at the sanitation worker, the bus driver, or the factory hand with unspoken condescension. They assume that if those workers had simply worked harder or possessed more talent, they too would be sitting in the boardroom. Meritocracy transforms economic inequality into a moral judgment on human worth. And a democracy cannot survive when its citizens view each other with mutual contempt.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core argument', q: 'What makes meritocratic privilege uniquely corrosive to civic humility according to the speaker?', options: ['It requires students to wear uniforms.', 'It convinces the successful that their advantages are earned purely through their own virtues, eliminating gratitude and fostering contempt for others.', 'It pays lower salaries than aristocracy.', 'It encourages citizens to give away all their money.'], answer: 1, explain: 'Meritocratic hubris destroys gratitude by framing success as personal moral desert.' },
        { id: 'q2', type: 'open', tag: 'Synthesis', q: 'How does the speaker contrast the self-justification of a feudal aristocrat with that of a modern credentialed graduate?', rubric: ['Aristocrat: acknowledges status as an accident of birth/lineage', 'Modern graduate: claims status as personal intellectual and moral achievement based on test scores and effort'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A business executive argues: “Anyone who complains about inequality in our country is just looking for excuses; if you study hard and have grit, you will reach the top.” Respond in 60–120 seconds. Deconstruct this meritocratic claim using the concept of cumulative advantage and the Great Gatsby Curve, and advocate for structural equality.',
    prepare: 'Keywords only: meritocratic hubris · Great Gatsby Curve · cumulative advantage (tutoring, nutrition, zip code) · moral desert vs market value · compress the ladder. Do not script.',
    grammar: 'Correlative comparatives (The higher the inequality, the lower...); result participials (thereby compounding); formal stance hedging',
    targets: ['the secular theology of modern capitalism', 'laundering inherited privilege as individual merit', 'the Great Gatsby Curve', 'compress the distance between the rungs of the ladder'],
    rubric: [
      'Directly and rigorously challenges the executive’s simplistic individualist assertion',
      'Explains at least two concrete structural mechanisms (cumulative advantage, Great Gatsby Curve)',
      'Uses accurate comparative and causal grammar (the more..., thereby + -ing)',
      'Offers a compelling concluding vision for structural equity and the dignity of all work'
    ]
  };
})(window.KLANG);
