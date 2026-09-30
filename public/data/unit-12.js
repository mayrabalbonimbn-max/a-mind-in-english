/* UNIT 12 · HOW POWER ACTUALLY WORKS IN BRAZIL */
(function (K) {
  K.units['12'] = K.makeUnit('12', {
    module: 3, title: 'How power actually works', titleEm: 'in Brazil',
    question: 'How much power does a Brazilian president actually have?',
    knowLead: `Foreign observers and domestic voters often assume that electing a president settles the direction of Brazilian policy. In reality, Brazil operates under what political scientist Sérgio Abranches coined “coalition presidentialism.” A fragmented congress, an assertive judiciary, and powerful budgetary locks mean that governance is an ongoing negotiation rather than an executive command. Distinguish presidential rhetoric from structural governance as you read.`,
    terms: [
      ['Coalition presidentialism', `A political system combining a directly elected president with a highly fragmented legislature, requiring multiparty coalitions to pass laws.`],
      ['Legislative fragmentation', `The distribution of seats across dozens of political parties, preventing any single party from securing an automatic majority.`],
      ['The Centrao', `A fluid, non-ideological bloc of congressional parties that trades legislative support for ministerial appointments, budget control, and local patronage.`],
      ['Mandatory spending', `Budgetary obligations fixed by the constitution (such as pensions and salaries), leaving only a tiny fraction of public funds for discretionary executive policy.`],
      ['Judicial review', `The power of the Supreme Federal Court (STF) to invalidate executive actions or legislative statutes that violate constitutional principles.`]
    ],
    views: [
      'Two models of presidential authority',
      'The imperial presidency view',
      `The president commands vast media attention, appointments, provisional decrees, and symbolic leadership, acting as the ultimate arbiter of the nation's political agenda.`,
      'The constrained executive view',
      `The executive is structurally hemmed in by constitutional budget rigidities, congressional bargaining, federalist state governors, and judicial oversight.`,
      `The debate centers on whether presidential leadership drives Brazilian politics or merely navigates institutional veto points.`
    ],
    knowPrompt: `Why do Brazilian presidents frequently appoint cabinet ministers whose parties campaigned against them during the election?`,
    knowGuide: [
      `Consider the necessity of building legislative majorities in a fragmented Congress.`,
      `Reflect on how ministerial portfolios are traded for votes on constitutional amendments.`
    ],
    read: {
      main: {
        format: 'Political analysis', title: 'The Anatomy of Coalition Presidentialism',
        standfirst: `To govern Brazil is not to command an army; it is to manage a permanent, precarious negotiation among dozens of competing veto players.`,
        pull: { after: 5, text: `In Brasilia, a president without a congressional majority is not a ruler; they are a hostage.` },
        notes: { 2: `<b>Sérgio Abranches</b> introduced the term <i>presidencialismo de coalizão</i> in 1988 to explain the institutional architecture of post-authoritarian Brazil.`, 6: `<b>Veto player</b> is a political actor whose consent is required to alter the legislative status quo.` },
        paras: [
          `Every four years, presidential campaigns in Brazil present voters with sweeping visions of national transformation. Candidates promise radical economic overhauls, comprehensive educational reforms, and sweeping infrastructure investments. The rhetoric is presidential and heroic: the nation is invited to place its destiny in the hands of a single leader. Yet upon entering the Palácio do Planalto, every newly inaugurated president encounters the cold mathematics of the National Congress. The heroic executive immediately collides with the reality of coalition presidentialism.`,
          `The structural dilemma of the Brazilian state was diagnosed by political scientist Sérgio Abranches in 1988. Brazil combined two institutional mechanisms rarely paired elsewhere: a strong, directly elected president with a proportional representation electoral system that generates extreme legislative fragmentation. In most legislatures worldwide, two or three major parties dominate. In Brazil, seats in the Chamber of Deputies are routinely scattered among twenty or more political parties. No president's party ever approaches a legislative majority on its own. To pass a single bill—let alone a constitutional amendment requiring a three-fifths supermajority—the president must construct and continually maintain a broad multiparty coalition.`,
          `Building such a coalition is neither cheap nor ideological. It requires distributing cabinet ministries, high-level administrative posts, and regional infrastructure funds to parties that may have opposed the president during the electoral campaign. At the center of this dynamic sits the political formation colloquially known as the <i>Centrão</i>. Characterised by pragmatism and local patronage rather than coherent ideology, this bloc holds the balance of power in Congress. Presidents who refuse to bargain with the Centrão find their legislative agendas paralyzed, their budgets frozen, and their vulnerability to impeachment dramatically increased. Presidents who cooperate with them are accused of betraying their reformist promises.`,
          `The constraints on executive power extend far beyond the legislative branch. Brazil's 1988 Constitution—drafted in the shadow of military dictatorship—intentionally dispersed authority to prevent executive overreach. It created a powerful, independent public prosecutor's office (Ministério Público) and established an expansive mandate for the Supreme Federal Court (STF). Over the past two decades, the Supreme Court has transformed from a traditional judicial arbiter into an active policy actor, frequently stepping in to resolve disputes that the legislative branch failed to settle, or blocking executive decrees deemed unconstitutional.`,
          `Fiscal architecture imposes an even tighter straitjacket. Over ninety percent of the federal budget is legally classified as mandatory spending, earmarked by constitutional formulas for pensions, public sector salaries, and statutory transfers to states and municipalities. When an incoming administration enters office, discretionary spending—the money actually available for new policies, emergency relief, and strategic investments—often amounts to less than five percent of total revenue. A president may have grand ideological ambitions, but their fiscal reality is governed by rigid statutory equations.`,
          `Furthermore, Brazil is a continental federation where twenty-seven state governors and over five thousand mayors command substantial administrative autonomy. During national crises, such as public health emergencies or economic recessions, governors frequently defy presidential directives, implementing their own health protocols, taxation regimes, and regional security policies. The president cannot simply overrule a governor by decree; the federalist pact guarantees subnational independence.`,
          `Understanding how power actually functions in Brazil requires abandoning the illusion of executive omnipotence. A Brazilian president is not an imperial monarch capable of reshaping society by decree. Rather, the president is the chief negotiator in an intricate system of institutional checks, fiscal formulas, and transactional alliances. Leadership in Brasilia is not measured by the eloquence of presidential speeches, but by the subtle, exhausting craft of holding a heterogeneous coalition together without letting the state unravel.`
        ]
      },
      counter: {
        format: 'Institutional critique', title: 'The Persistence of Executive Leverage',
        standfirst: `Emphasising institutional constraints risks understating the enormous formal and informal levers still monopolised by the Planalto.`,
        paras: [
          `While coalition presidentialism certainly restricts unilateral executive action, one must not conclude that Brazilian presidents are powerless figureheads. The 1988 Constitution granted the Brazilian executive some of the most potent legislative instruments of any democracy in the world.` ,
          `First among these is the provisional measure (<i>medida provisória</i>), which allows the president to enact immediate legislation with the force of law in cases of urgency and relevance. Although Congress must eventually vote to confirm or reject the measure, the president can instantly alter policy reality, set the legislative agenda, and force lawmakers to react to executive initiatives.` ,
          `Second, the president exercises near-monopoly control over the execution of the federal budget and the appointment of thousands of leadership positions across federal agencies, regulatory bodies, and state-owned enterprises. Even when Congress negotiates budget amendments, the executive branch retains discretion over the timing and disbursement of funds, giving the Planalto formidable leverage during critical floor votes.` ,
          `Finally, the president commands the ultimate political platform: the ability to frame national debate through the presidential bully pulpit. An effective communicator can mobilize public opinion directly against recalcitrant congressional leaders, shifting the political cost of opposition. Institutional constraints are real, but they establish the rules of engagement rather than an insurmountable barrier to transformative power.`
        ]
      }
    },
    sources: [
      { title: 'Presidencialismo de Coalizão: O Dilema Institucional Brasileiro (Sérgio Abranches)', url: 'https://www.scielo.br/j/dados/a/8X9Jz7XvX7Y/', note: 'Foundational 1988 article introducing the concept of coalition presidentialism.' },
      { title: 'Presidents, Parties, and Coalitions in Brazil (Timothy J. Power)', url: 'https://academic.oup.com/book/26918', note: 'Empirical analysis of legislative bargaining and cabinet formation in Brasilia.' },
      { title: 'Judicialization of Politics and the Brazilian Supreme Court (Oscar Vilhena Vieira)', url: 'https://direitosp.fgv.br/publicacoes', note: 'Analysis of STF activism and executive-judicial tensions.' }
    ],
    interpret: [
      { id: '12i1', type: 'mc', tag: 'Main idea', q: `What is the core argument of the main essay regarding presidential power in Brazil?`, options: [`Brazilian presidents hold absolute, imperial power over the legislative branch.`, `Presidential authority is severely constrained by legislative fragmentation, constitutional budget rigidities, federalism, and judicial oversight.`, `The Brazilian president has no influence whatsoever on economic policy.`, `The military continues to make all major budgetary decisions.`], answer: 1, explain: `The essay demonstrates how coalition presidentialism, mandatory spending, and institutional veto points constrain executive freedom.` },
      { id: '12i2', type: 'mc', tag: 'Inference', q: `Why does extreme legislative fragmentation necessitate transactions with the Centrão?`, options: [`Because the Centrão holds ideological control over all media outlets.`, `Because no single party ever wins a majority, making the non-ideological Centrão the indispensable partner for legislative votes.`, `Because the Constitution requires all cabinet ministers to belong to the Centrão.`, `Because state governors are not allowed to vote in presidential elections.`], answer: 1, explain: `With seats divided among 20+ parties, the president must build majorities by bargaining with pragmatic legislative blocs.` },
      { id: '12i3', type: 'tf', tag: 'Detail', q: `According to the text, more than 90% of the Brazilian federal budget is available for discretionary executive projects.`, answer: false, explain: `Paragraph 5 notes that over 90% is mandatory spending, leaving under 10% for discretionary initiatives.` },
      { id: '12i4', type: 'mc', tag: 'Counterpoint argument', q: `What primary institutional mechanism does the counterpoint cite to prove that the executive still possesses strong legislative power?`, options: [`The veto of state police forces.`, `Provisional measures (medidas provisórias) that take immediate legal effect.`, `The power to dissolve the Supreme Court.`, `The right to cancel regional elections.`], answer: 1, explain: `Provisional measures give the president immediate lawmaking capability in cases of urgency.` },
      { id: '12i5', type: 'open', tag: 'Evidence vs interpretation', q: `What factual evidence does the author provide to support the claim that Brazil is an active federation rather than a centralised unitary state?`, rows: 4, guide: [`Points to 27 state governors and 5,000+ mayors possessing constitutional autonomy.`, `Cites governors implementing independent health protocols, tax policies and security measures during crises.`] },
      { id: '12i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the concept of “veto players” reconcile the apparent contradiction between presidential rhetoric during campaigns and practical governance in Brasilia?`, rows: 5, guide: [`Campaigns promote an individualized, heroic vision of executive leadership.`, `Governance requires securing agreement from multiple independent institutional actors who can block reform.`] },
      { id: '12i7', type: 'open', tag: 'Application', q: `Choose one recent national policy debate in Brazil and identify which institutional veto points shaped its final outcome.`, rows: 5, guide: [`Mention specific actors: congressional committees, party leaders, Supreme Court injunctions, or state fiscal constraints.`] }
    ],
    notice: [
      {
        title: 'Reporting structures with passive and distancing verbs',
        sub: 'Attributing claims, analysis and public perceptions with academic rigor',
        examples: [
          `The president <b>is widely reported to be negotiating</b> with congressional leaders.`,
          `Coalition presidentialism <b>has long been diagnosed as</b> an institutional dilemma.`,
          `The budget <b>is estimated to leave</b> less than five percent for investment.`,
          `The measure <b>was perceived as</b> an executive overreach.`
        ],
        questions: [
          `How does “The reform is reported to cost billions” differ from “The reform costs billions”?`,
          `What is the difference in stance between “X is claimed to be” and “X is established to be”?`,
          `Why do political analysts prefer distancing structures when discussing sensitive negotiations?`
        ],
        explain: `<p>In political science and journalism, reporting structures with passive infinitives (<b>is reported to be, is believed to have, is thought to result in</b>) allow you to state facts about claims and perceptions without committing yourself to their absolute truth.</p><p>Use <b>is acknowledged to</b> when there is broad consensus, and <b>is alleged/claimed to</b> when the assertion is contested.</p>`,
        compare: { head: ['Direct assertion', 'Distanced reporting frame', 'Analytical function'], rows: [['The president bribed lawmakers.', 'The administration was reported to have offered appointments in exchange for votes.', 'Documents allegations without making unsubstantiated legal claims.'], ['The STF controls politics.', 'The STF is increasingly seen as an active political arbiter.', 'Analyzes institutional perception rather than subjective complaint.']] },
        practice: [
          [`Rewrite using a passive reporting frame: <i>Analysts believe that the fiscal framework limits infrastructure spending.</i>`, `The fiscal framework is believed by analysts to limit infrastructure spending.`, `Uses passive reporting with infinitive.`],
          [`Transform into a distanced claim: <i>The party demands three ministries before approving the tax reform.</i>`, `The party is reported to be demanding three ministries before approving the tax reform.`, `Adds continuous passive reporting structure.`],
          [`Correct the structural error: <i>It is said the president to have signed the decree.</i>`, `The president is said to have signed the decree.`, `Subject-to-subject passive raising.`]
        ],
        radar: [
          { wrong: 'The minister is said that he resigned.', right: 'The minister is said to have resigned.', why: 'After passive reporting verbs (said, thought, believed), use the infinitive structure, not a that-clause with a pronoun.' },
          { wrong: 'It was known to be a mistake by everyone.', right: 'It was widely recognised as a mistake.', why: 'Choose natural academic collocation: recognised as.' }
        ],
        help: `<p><b>Em português:</b> Estruturas como <i>the president is said to have agreed</i> equivalem a "diz-se que o presidente concordou" ou "o presidente teria concordado", fundamentais para análise política precisa.</p>`
      },
      {
        title: 'Advanced passive with complex prepositional phrases',
        sub: 'Packaging institutional mechanisms into formal grammatical subjects',
        examples: [
          `Authority <b>is dispersed across</b> subnational jurisdictions.`,
          `The executive <b>is hemmed in by</b> statutory spending floors.`,
          `Policy initiatives <b>are routinely subjected to</b> judicial review.`
        ],
        questions: [
          `How do prepositional passive verbs (hemmed in by, subjected to, dispersed across) capture systemic friction?`,
          `Why is the passive voice well suited for describing institutional checks and balances?`
        ],
        explain: `<p>Complex passive constructions with fixed prepositions (<i>be hemmed in by, be subjected to, be subordinated to, be earmarked for</i>) express structural constraints clearly and concisely.</p>`,
        compare: { head: ['Active phrasing', 'Prepositional passive', 'Stylistic gain'], rows: [['Budget laws tie the hands of the president.', 'The executive is hemmed in by mandatory spending rules.', 'Professional institutional vocabulary.']] },
        practice: [
          [`Rewrite using “be earmarked for”: <i>The constitution dedicates ninety percent of tax receipts to specific expenditures.</i>`, `Ninety percent of tax receipts are earmarked for specific expenditures by the constitution.`, `Uses formal passive with earmarked for.`]
        ],
        radar: [
          { wrong: 'The money was earmarked to education.', right: 'The money was earmarked for education.', why: 'Earmarked takes the preposition for, not to.' }
        ],
        help: `<p><b>Em português:</b> Verbos como <i>be earmarked for</i> (estar vinculado a/destinado a) ou <i>be hemmed in by</i> (estar cercado/limitado por) são comuns em debates orçamentários.</p>`
      }
    ],
    vocab: [
      ['fragmentation', 'noun', 'The process or state of breaking into separate, small parts.', 'Extreme legislative fragmentation requires fragile governing coalitions.', 'Party fragmentation complicates policymaking.', ['legislative fragmentation', 'political fragmentation', 'party fragmentation'], ['division', 'dispersion', 'splintering'], 'Core political science concept.', '/ˌfræɡ.mənˈteɪ.ʃən/', 'consolidation'],
      ['discretionary', 'adjective', 'Available to be used at the discretion of the decision-maker; not fixed by mandatory law.', 'Discretionary spending represents only a fraction of the federal budget.', 'The minister has discretionary authority over regional grants.', ['discretionary spending', 'discretionary budget', 'discretionary power'], ['optional', 'flexible', 'non-mandatory'], 'Key public finance term.', '/dɪˈskreʃ.ən.ər.i/', 'mandatory'],
      ['patronage', 'noun', 'The power to control appointments to office or the distribution of government privileges.', 'Pragmatic parties exchange legislative support for state patronage.', 'The reform aimed to eliminate bureaucratic patronage.', ['political patronage', 'patronage network', 'system of patronage'], ['clientelism', 'favoritism', 'spoils'], 'Analytical term for political transactions.', '/ˈpæt.rə.nɪdʒ/', null],
      ['straitjacket', 'noun', 'Something that severely restricts freedom of action or development.', 'Constitutional budget earmarks act as a fiscal straitjacket.', 'The treaty placed the economy in a policy straitjacket.', ['fiscal straitjacket', 'policy straitjacket', 'bureaucratic straitjacket'], ['restriction', 'constraint', 'shackle'], 'Common analytical metaphor.', '/ˈstreɪtˌdʒæk.ɪt/', 'freedom'],
      ['leverage', 'noun', 'The power or ability to influence people, events or decisions.', 'The Planalto uses budget disbursements to gain leverage over Congress.', 'The coalition holds decisive leverage in the Senate.', ['political leverage', 'gain leverage', 'exercise leverage'], ['influence', 'clout', 'bargaining power'], 'High-frequency analytical noun.', '/ˈlev.ər.ɪdʒ/', 'weakness'],
      ['arbiter', 'noun', 'A person or institution that has the authority to settle a dispute or decide an outcome.', 'The Supreme Court acts as the final constitutional arbiter.', 'Voters are the ultimate arbiters of political legitimacy.', ['constitutional arbiter', 'final arbiter', 'impartial arbiter'], ['judge', 'referee', 'adjudicator'], 'Formal political vocabulary.', '/ˈɑː.bɪ.tər/', null],
      ['heterogeneous', 'adjective', 'Consisting of parts or aspects that are very different from each other.', 'Governing a heterogeneous coalition requires constant compromise.', 'The country possesses a heterogeneous electorate.', ['heterogeneous coalition', 'heterogeneous group', 'heterogeneous structure'], ['diverse', 'varied', 'mixed'], 'Academic descriptive adjective.', '/ˌhet.ər.əˈdʒiː.ni.əs/', 'homogeneous'],
      ['subnational', 'adjective', 'Existing or occurring below the national level, such as states or municipalities.', 'Subnational governments command significant health and education budgets.', 'Federalism grants autonomy to subnational leaders.', ['subnational government', 'subnational entity', 'subnational politics'], ['regional', 'provincial', 'state-level'], 'Political science technical term.', '/sʌbˈnæʃ.ən.əl/', 'national'],
      ['unilateral', 'adjective', 'Performed by or affecting only one person, group, or party without agreement of others.', 'The president avoided unilateral decrees on controversial issues.', 'Unilateral executive action risks judicial invalidation.', ['unilateral action', 'unilateral decree', 'unilateral decision'], ['one-sided', 'independent'], 'Legal and political term.', '/ˌjuː.nɪˈlæt.ər.əl/', 'multilateral'],
      ['earmark', 'verb', 'Designate or reserve funds or resources for a specific purpose.', 'Tax revenues are constitutionally earmarked for public healthcare.', 'The grant was earmarked for infrastructure.', ['earmark funds', 'constitutionally earmarked', 'earmarked for'], ['allocate', 'reserve', 'designate'], 'Budgetary verb.', '/ˈɪə.mɑːk/', null]
    ],
    chunks: [
      ['the cold mathematics of the legislature', 'Describing the unyielding requirement for floor votes over rhetoric.', 'Highlighting congressional reality', 'Analytical · journalistic', 'Every ideological president eventually confronts the cold mathematics of the legislature.', 'Contrast campaign speeches with voting realities.', `Campaign promises quickly collapse before the cold mathematics of the legislature.`, 'Vivid analytical metaphor.'],
      ['hold the balance of power', 'Possessing the decisive votes that determine which side wins.', 'Explaining centrist leverage', 'Formal · political', 'By commanding eighty seats, the centrist bloc holds the balance of power in the Chamber.', 'Describe a pivotal party in a coalition.', `Regional parties hold the balance of power whenever the major coalitions are evenly split.`, 'Standard parliamentary terminology.'],
      ['hemmed in by statutory constraints', 'Severely restricted by pre-existing legal formulas and mandates.', 'Explaining institutional limits', 'Formal · analytical', 'The executive is hemmed in by statutory constraints that prevent rapid policy shifts.', 'Analyze fiscal policy limits.', `The newly elected governor found herself hemmed in by statutory constraints and inherited debt.`, 'Precise description of structural limits.'],
      ['distribute cabinet portfolios in exchange for support', 'Trading government ministries to assemble a working majority.', 'Describing coalition bargaining', 'Formal · descriptive', 'Coalition presidentialism forces presidents to distribute cabinet portfolios in exchange for support.', 'Explain coalition formation.', `The administration had to distribute cabinet portfolios in exchange for support on the fiscal overhaul.`, 'Core mechanism of coalition politics.'],
      ['step into the legislative vacuum', 'When courts or regulators decide issues because politicians failed to act.', 'Analyzing judicial activism', 'Academic · critical', 'The Supreme Court frequently steps into the legislative vacuum when Congress avoids controversial votes.', 'Discuss institutional overreach.', `Judicial review expands whenever the judiciary steps into the legislative vacuum left by gridlock.`, 'Explains judicial expansion.'],
      ['a necessary compromise rather than a moral failure', 'Reframing political bargaining as an institutional requirement.', 'Nuancing political critique', 'Essayistic · analytical', 'Bargaining with ideological opponents in Brasilia is a necessary compromise rather than a moral failure.', 'Evaluate political pragmatism.', `Accepting coalition demands is often a necessary compromise rather than a moral failure.`, 'Elevates political commentary.'],
      ['exercise discretion over the timing and disbursement', 'Controlling when and how approved public funds are actually paid.', 'Explaining executive leverage', 'Formal · budgetary', 'The Planalto exercises discretion over the timing and disbursement of parliamentary amendments.', 'Detail presidential leverage.', `Ministers exercise discretion over the timing and disbursement of municipal infrastructure grants.`, 'Key institutional power.'],
      ['the illusion of executive omnipotence', 'The mistaken belief that a single leader can govern without institutional checks.', 'Deconstructing populist narratives', 'Essayistic · critical', 'Voters must shed the illusion of executive omnipotence if they wish to understand governance.', 'Critique savior-style political rhetoric.', `Democracy suffers when the public clings to the illusion of executive omnipotence.`, 'Philosophical stance chunk.'],
      ['navigate multiple veto points', 'Successfully passing a reform through several independent blocking authorities.', 'Describing institutional strategy', 'Academic · analytical', 'To pass pension reform, the government had to navigate multiple veto points across two legislative houses.', 'Trace reform paths.', `Major tax overhauls must navigate multiple veto points in the Senate and Supreme Court.`, 'Institutional theory formulation.'],
      ['set the terms of the national debate', 'Controlling which issues receive public attention and political priority.', 'Describing agenda-setting power', 'Analytical · rhetorical', 'Even when blocked in Congress, the president uses the pulpit to set the terms of the national debate.', 'Describe presidential influence.', `A compelling executive can set the terms of the national debate through strategic media interventions.`, 'Agenda-setting chunk.']
    ],
    collocations: [
      [`The president found himself ______ in by constitutional budget floors.`, [`hemmed`, `locked`, `shackled`, `barred`], 0, `Hemmed in is the established idiom for structural enclosure.`],
      [`Centrist parties hold the ______ of power in the Chamber of Deputies.`, [`balance`, `weight`, `scale`, `lever`], 0, `Hold the balance of power is the standard political collocation.`],
      [`Over ninety percent of public revenue is ______ for mandatory expenses.`, [`earmarked`, `stamped`, `targeted`, `pinned`], 0, `Funds are earmarked for specific purposes.`],
      [`The Supreme Court stepped into the legislative ______ to regulate digital platforms.`, [`vacuum`, `void`, `abyss`, `gap`], 0, `Step into the vacuum describes institutional intervention.`]
    ],
    upgrades: [
      [`The president cannot do what he wants because Congress is divided.`, `Executive authority is structurally constrained by extreme legislative fragmentation and coalition bargaining.`],
      [`The government gave jobs to politicians so they would vote for the bill.`, `The administration distributed administrative appointments and budget amendments to secure a working legislative majority.`],
      [`Judges are making political decisions now.`, `The Supreme Court has increasingly stepped into the legislative vacuum to arbitrate major constitutional questions.`]
    ],
    think: {
      title: 'Competence, Responsibility and Institutional Attribution',
      lead: 'In political analysis, attributing an outcome to a single individual when it is produced by a complex institutional system commits the fundamental attribution error.',
      defs: [
        ['Attribution error', `The tendency to attribute outcomes to individual character or intention while ignoring structural and systemic constraints.`],
        ['Institutional veto player', `An individual or collective actor whose agreement is constitutionally required for a policy change.`],
        ['Principal-agent problem', `A conflict in priorities when a principal (the electorate) delegates authority to an agent (a representative) who has private incentives.`]
      ],
      items: [
        { id: '12t1', type: 'mc', tag: 'Causal attribution', q: `A newly elected president fails to build 500 planned hospitals within two years. Which explanation demonstrates awareness of structural constraints rather than personal attribution?`, options: [`The president lacks moral character and lied to the voters.`, `Mandatory spending obligations and judicial injunctions on procurement contracts severely restricted discretionary capital outlays.`, `The president did not read enough books on management.`, `The doctors in Brazil refused to work.`], answer: 1, explain: `Structural explanations focus on budget earmarks, procurement laws and institutional veto players.` },
        { id: '12t2', type: 'open', tag: 'Steelmanning', q: `Reconstruct the strongest possible argument for why a president SHOULD use provisional decrees aggressively, despite criticisms of authoritarian overreach.`, rows: 5, guide: [`Emphasise urgent crises (e.g. natural disasters, market collapse), congressional sluggishness, and the necessity of immediate state response.`] },
        { id: '12t3', type: 'open', tag: 'Institutional analysis', q: `How does the existence of the Centrão protect Brazilian democracy from radical unilateral swings, even while generating clientelist politics?`, rows: 5, guide: [`Explain how non-ideological centrist bargaining forces extreme administrations to moderate their policies toward the status quo.`] },
        { id: '12t4', type: 'open', tag: 'Core synthesis', q: `Distinguish between a president's formal constitutional power and their effective governance capacity. State one institutional lever that bridges or widens this gap.`, rows: 6, guide: [`Explain how provisional decrees grant formal power, but without budget execution and congressional alignment, effective implementation stalls.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Explaining Systemic Complexity Without Cynicism',
        text: 'A high-level political essay avoids simplistic moral indignation (e.g., “all politicians are corrupt”) and instead explains the institutional incentives that compel rational actors to behave in specific ways within the rules of the game.',
        weak: 'Brazilian politics is completely rotten because the Centrão only cares about money and the president has to bribe everyone.',
        strong: 'While coalition negotiations are frequently condemned as transactional patronage, they represent the inevitable systemic response to extreme legislative fragmentation under constitutional rules that deny any single party an executive majority.'
      },
      short: {
        kind: 'Institutional briefing', title: 'The Mechanics of Cabinet Formation',
        prompt: 'Explain why a newly elected Brazilian president is compelled to offer ministerial portfolios to parties with opposing ideological platforms. Structure your briefing around legislative fragmentation and veto players.',
        min: 160, max: 260, support: 'light',
        guide: ['Define coalition presidentialism concisely.', 'Use at least two reporting/distancing structures and two terms from KNOW.']
      },
      main: {
        kind: 'Explanatory essay', title: 'The Limits and Levers of the Planalto',
        prompt: 'Assess the extent to which the Brazilian presidency is an “imperial executive” versus a “constrained negotiator.” In your essay, weigh constitutional powers (such as provisional measures) against structural barriers (such as mandatory spending and legislative fragmentation).',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: establish the tension between presidential rhetoric and coalition reality.',
          'Body 1: examine the formal powers that empower the Planalto (provisional decrees, agenda control, bully pulpit).',
          'Body 2: analyze the structural constraints that restrain unilateral power (fragmented Congress, Centrão bargaining, budget rigidities).',
          'Body 3: evaluate the role of subnational governors and Supreme Court judicial review.',
          'Conclusion: synthesize the dual nature of the office—powerful in agenda-setting, yet thoroughly dependent on coalition management.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I avoid treating coalition bargaining as purely a personal moral flaw?',
        'Are my passive reporting structures (e.g. “is reported to be”, “is acknowledged as”) grammatically accurate?',
        'Did I clearly contrast mandatory spending with discretionary budget authority?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my conclusion provide a balanced synthesis of executive levers versus institutional limits?'
      ],
      challenges: [
        'Replace any simplistic causal statement with a nuanced institutional explanation.',
        'Use the chunk “cold mathematics of the legislature” or “hemmed in by statutory constraints”.',
        'Ensure that the distinction between formal power and effective governance capacity is explicitly articulated.'
      ]
    },
    retrieve: {
      content: 'Explain Sérgio Abranches’s thesis of “coalition presidentialism” and state its two main institutional components.',
      contentGuide: ['Directly elected strong presidency combined with extreme proportional representation and legislative fragmentation.'],
      grammar: 'Write two sentences using passive reporting structures with infinitives (e.g. “The president is reported to have...”, “The reform is expected to...”).',
      grammarGuide: ['Check subject-verb agreement and perfect/simple infinitive aspect.'],
      reasoning: 'Why is attributing policy gridlock exclusively to the president’s personality an example of the fundamental attribution error?',
      reasoningGuide: ['Explain how institutional veto players, budget earmarks and congressional majorities determine outcomes regardless of personality.'],
      cumulative: 'Connect Unit 12 to Unit 11: how does legislative fragmentation in Brazil influence which social groups get heard in policy formulation?',
      summary: `<p><b>Main claim:</b> the Brazilian presidency combines vast formal agenda-setting tools with severe structural constraints—coalition bargaining, mandatory budgets, federalism, and judicial review.</p><p><b>Grammar:</b> passive reporting frames and complex prepositional passives provide analytical detachment and precision.</p><p><b>Reasoning:</b> distinguish systemic institutional incentives from individual moral attribution.</p>`
    }
  });

  const u = K.units['12'];
  u.listening = [
    {
      id: 'l1', title: 'The Realities of Cabinet Formation', format: 'Expert interview',
      file: '/audio/en/unit-12/u12-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two speakers (Interviewer and Political Scientist Dr. Celso Ramos); articulate, analytical, Brazilian & British English accents',
      passes: ['First listen · grasp why cabinet formation takes weeks after an election', 'Second listen · identify the three currencies traded in coalition bargaining', 'Third listen · note passive reporting structures'],
      transcript: `Interviewer: Dr. Ramos, foreign observers often look at the Brazilian cabinet and express bewilderment. Why does a president from a left-wing or right-wing party hand over critical ministries like Agriculture, Transport, or Mining to centrist politicians who spent the campaign attacking them?\n\nDr. Ramos: Because in Brasilia, ideological purity is a luxury that no governing party can afford. Look at the numbers: following any general election, the president’s party rarely holds more than fifteen or twenty percent of the seats in the Chamber of Deputies. To pass any ordinary bill, you need two hundred and fifty-seven votes; for a constitutional amendment, three hundred and eight. Where do those votes come from?\n\nInterviewer: They come from the non-ideological center.\n\nDr. Ramos: Precisely. And those centrist parties do not vote out of ideological affinity. They operate under a transactional logic. The currencies of governance in Brazil are three: ministerial portfolios with large administrative budgets, appointments to regional federal agencies, and the timely disbursement of parliamentary amendments for infrastructure projects in lawmakers' home municipalities. Without trading these currencies, the Planalto cannot guarantee a quorum, let alone win a roll-call vote.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core mechanism', q: 'What makes cross-ideological cabinet appointments unavoidable in Brazil according to Dr. Ramos?', options: ['The Constitution forbids presidents from appointing members of their own party.', 'The president’s party rarely holds more than 15–20% of congressional seats, requiring transactions for floor majorities.', 'The Supreme Court chooses all cabinet ministers.', 'Foreign investors demand centrist control.'], answer: 1, explain: 'Extreme legislative fragmentation means the president must assemble majorities by distributing executive power.' },
        { id: 'q2', type: 'open', tag: 'Synthesis', q: 'What are the three currencies of governance mentioned by Dr. Ramos, and how do they function?', rubric: ['Ministerial portfolios with large budgets', 'Appointments to regional federal agencies', 'Disbursement of parliamentary budget amendments for local municipal projects'] }
      ]
    },
    {
      id: 'l2', title: 'The Fiscal Straitjacket', format: 'Economics podcast monologue',
      file: '/audio/en/unit-12/u12-listening-02.mp3', duration: 120, level: 'C1',
      audioReady: false,
      voice: 'One economist voice; authoritative, pedagogical, clear General American English',
      passes: ['First listen · distinguish between mandatory and discretionary spending', 'Second listen · track how constitutional formulas restrict annual budget decisions'],
      transcript: `When a new president delivers an inaugural address, they promise to build new universities, modernize highways, and overhaul public security. But when the Minister of Planning sits down with the national budget, they encounter a reality that has very little to do with political rhetoric.\n\nBrazil’s federal budget is among the most legally rigid on the planet. Roughly ninety-three percent of all federal revenue is pre-allocated by constitutional mandates and statutory formulas. Social security pensions, public payroll, court-mandated debts known as precatórios, and minimum funding floors for healthcare and basic education cannot be altered by executive decision. They are legally mandatory.\n\nThat leaves roughly seven percent for discretionary spending. Out of that tiny slice, the government must pay the electric bills of federal agencies, maintain army barracks, fund diplomatic missions, and finance all new infrastructure investments. When economic growth slows and revenue drops, mandatory expenses do not shrink. Consequently, the entire burden of fiscal adjustment falls on that microscopic discretionary sliver. The president is not steering a speedboat that can turn on a dime; they are captaining a supertanker whose rudder was welded in place by the 1988 Constitution.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What is the primary consequence of having over 90% of the budget locked in mandatory spending?', options: ['The government can easily cut taxes whenever it wishes.', 'Any fiscal adjustment or reduction in spending falls disproportionately on the small discretionary portion that funds investment and operations.', 'The president can cancel pension payments by executive decree.', 'Municipalities receive no federal funding.'], answer: 1, explain: 'Because mandatory spending is legally protected, cuts in lean years fall exclusively on the small discretionary budget.' },
        { id: 'q2', type: 'open', tag: 'Metaphor analysis', q: 'Explain the speaker’s metaphor of the “supertanker whose rudder was welded in place by the 1988 Constitution.”', rubric: ['Explains that constitutional formulas lock budget priorities in advance', 'Contrasts the illusion of agile presidential leadership with the structural rigidity of statutory mandates'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'An international investor asks you: “If Brazil elects a new reform-minded president, will the economy change overnight?” Respond in 60–120 seconds. Explain the institutional dynamics of coalition presidentialism, mandatory spending rigidities, and congressional bargaining, and deliver a nuanced, realistic assessment.',
    prepare: 'Keywords only: coalition presidentialism · legislative fragmentation · mandatory spending (90%+) · Centrão bargaining · realistic reform timeline. Do not script.',
    grammar: 'Passive reporting verbs (is reported to, is constrained by); concession markers (while, although, despite); modal hedging (may, might, tends to)',
    targets: ['cold mathematics of the legislature', 'hemmed in by statutory constraints', 'coalition presidentialism', 'balance of power'],
    rubric: [
      'Directly addresses the investor’s question with analytical precision',
      'Explains at least two concrete structural constraints (legislative fragmentation, budget rigidity)',
      'Uses accurate passive and reporting grammar with appropriate hedging',
      'Avoids simplistic cynicism while providing a realistic institutional timeline'
    ]
  };
})(window.KLANG);
