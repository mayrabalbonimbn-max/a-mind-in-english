/* UNIT 15 · WHO PAYS FOR THE STATE? */
(function (K) {
  K.units['15'] = K.makeUnit('15', {
    module: 3, title: 'Who pays', titleEm: 'for the state?',
    question: 'Who pays for the things everyone uses, and who decides?',
    knowLead: `Every modern society relies on the state for physical infrastructure, legal systems, national defense, healthcare, and education. Yet how a state collects its revenues determines not only its fiscal capacity, but also the distribution of wealth and social justice. Taxation is never a purely technical calculation; it is a profound ethical choice. In Brazil, heavy reliance on indirect consumption taxes means that lower-income families pay a significantly higher percentage of their earnings in tax than the wealthy. Keep the distinction between direct, indirect, progressive, and regressive taxation in mind as you read.`,
    terms: [
      ['Direct taxation', `Taxes levied directly on personal income, corporate profits, or accumulated wealth and property (e.g. income tax, inheritance tax).`],
      ['Indirect taxation', `Taxes embedded in the price of goods and services at the point of sale (e.g. VAT, sales tax, ICMS, PIS/Cofins), paid regardless of buyer income.`],
      ['Regressive tax system', `A fiscal structure where lower-income individuals pay a higher proportion of their total income in taxes than higher-income earners.`],
      ['Progressive tax system', `A system where the tax rate increases as the taxable amount increases, placing a proportionally higher burden on high earners.`],
      ['Fiscal citizenship', `The social contract where citizens willingly pay taxes in exchange for transparent, high-quality public services and accountable governance.`]
    ],
    views: [
      'Two philosophies of public finance',
      'The ability-to-pay principle',
      `Taxes should be levied according to a citizen’s capacity to contribute. Those with substantial wealth and high incomes should bear the primary burden to finance public goods and reduce inequality.`,
      'The benefit principle',
      `Taxes should function like prices: individuals should pay in proportion to the specific public services they consume, and low tax rates should incentivize investment and capital accumulation.`,
      `The core debate concerns whether the primary purpose of taxation is simply funding state operations or actively redistributing national wealth.`
    ],
    knowPrompt: `Why does a 20% sales tax on basic food items take a much larger share of a low-wage worker's monthly income than that of a high-earning corporate executive?`,
    knowGuide: [
      `Consider what percentage of a poor family’s income is spent immediately on essential consumption.`,
      `Reflect on how wealthy individuals can save and invest large portions of their income without paying consumption taxes on those savings.`
    ],
    read: {
      main: {
        format: 'Economic analysis', title: 'The Invisible Tollbooth: The Politics of Public Revenue',
        standfirst: `Taxes are the price we pay for a civilized society. But who pays that price determines whether that society is just or predatory.`,
        pull: { after: 5, text: `When a tax is hidden in the price of bread, citizens feel impoverished by the market rather than cheated by the state.` },
        notes: { 1: `<b>Oliver Wendell Holmes Jr.</b> famously stated in 1927 that "Taxes are what we pay for civilized society."`, 4: `<b>The Brazilian tax burden</b> averages around 33% of GDP, comparable to OECD nations, but with a drastically different internal composition.` },
        paras: [
          `In 1927, United States Supreme Court Justice Oliver Wendell Holmes Jr. penned a sentence that remains carved above the entrance of the Internal Revenue Service headquarters in Washington: "Taxes are what we pay for civilized society." It is an elegant formulation that captures the foundational premise of public finance. Without taxation, there are no paved roads, no clean running water, no enforceable property rights, no public universities, and no courts of law to protect the weak against the strong. To enjoy the collective benefits of an organized commonwealth requires an ongoing material contribution from its citizens.`,
          `Yet Holmes’s aphorism leaves the most contentious political question unanswered: how should that collective burden be distributed among the members of society? Taxation is never merely a neutral accounting mechanism designed to balance the state’s books. It is the most powerful instrument a government possesses to shape social behavior, allocate resources, and determine who prospers and who struggles. Every tax code is a moral blueprint of a nation’s priorities, revealing whose wealth is protected, whose labor is burdened, and whose basic survival is commodified.`,
          `In broad terms, modern fiscal systems collect revenue through two primary channels: direct taxes on income and wealth, and indirect taxes on consumption and transactions. Direct taxes—such as progressive income tax brackets, corporate profit levies, and inheritance taxes—are visible, transparent, and capable of being calibrated to an individual’s ability to pay. A wealthy investor earning ten million dollars a year can be taxed at a higher marginal rate than a nurse earning forty thousand dollars, thereby mitigating extreme market inequalities.`,
          `Indirect taxes, by contrast, are embedded silently within the prices of everyday goods and services. Every time a consumer purchases a loaf of bread, pays an electricity bill, or buys gasoline, a portion of the price consists of value-added taxes (such as VAT in Europe or ICMS, PIS, and Cofins in Brazil). To the untrained eye, consumption taxes appear egalitarian: a billionaire and an unemployed worker pay the exact same nominal tax on a carton of milk. But in economic reality, indirect taxation is intensely regressive.`,
          `The regressivity of consumption taxes stems from the basic economic reality of marginal propensity to consume. A low-income family must spend virtually one hundred percent of its monthly earnings on immediate essentials—food, utilities, transport, and medicine. Consequently, every single dollar they earn is exposed to consumption taxes. An affluent individual, by contrast, may spend only twenty percent of their earnings on living expenses, directing the remaining eighty percent into stocks, real estate, offshore accounts, or tax-exempt financial assets. As a result, the poor citizen pays a drastically higher percentage of their total income in taxes than the millionaire.`,
          `Brazil represents one of the most acute global examples of this structural distortion. The overall Brazilian tax burden is substantial, hovering around thirty-three percent of Gross Domestic Product—a level comparable to developed European welfare states. However, whereas European nations collect the majority of their revenue through progressive income and wealth taxes, Brazil derives nearly half of its total tax receipts from indirect consumption taxes. This upside-down fiscal structure exacerbates the country's already staggering income inequality, quietly transferring wealth from the working poor to subsidize state obligations and public debt service.`,
          `Moreover, hidden consumption taxes undermine democratic accountability and fiscal citizenship. When taxes are embedded invisibly inside supermarket receipts, citizens do not perceive the government as the entity taking their money; instead, they blame the shopkeeper, the farmer, or "inflation." Meanwhile, the wealthy lobby vigorously for specialized tax exemptions, subsidies, and capital gains loopholes, ensuring that their accumulated fortunes remain untouched. Reforming the fiscal architecture is therefore not merely a technical adjustment for economists. It is the fundamental democratic prerequisite for building a state that serves all its citizens rather than extracting from the vulnerable to protect the privileged.`
        ]
      },
      counter: {
        format: 'Market perspective', title: 'The Economic Case for Consumption Taxes and Broad Bases',
        standfirst: `Excessively progressive income and wealth taxes risk capital flight, economic stagnation, and fiscal fragility.`,
        paras: [
          `While the critique of regressive consumption taxes is morally compelling, advocates of high progressive taxation frequently ignore the complex economic trade-offs of public revenue collection.` ,
          `First, consumption taxes provide a remarkably stable, predictable, and broad tax base that is difficult to evade. In developing economies with large informal labor sectors, collecting income tax from millions of informal workers is administratively impossible. Consumption taxes ensure that every economic transaction contributes to public coffers, providing the stable revenues necessary to fund public hospitals, schools, and social assistance programs like Bolsa Família.` ,
          `Second, capital and high earners are highly mobile in the globalized economy. When a government imposes punitive tax rates on high incomes, corporate profits, and capital wealth, it frequently induces capital flight, aggressive offshore tax avoidance, and a reduction in private investment. If high taxation destroys the incentive for entrepreneurs to build businesses and take risks, the entire economy shrinks, leaving the state with fewer total resources to support the poor.` ,
          `The most effective model of public finance is not punitive taxation at the point of collection, but efficient redistribution at the point of expenditure. As Northern European nations demonstrate, a state can collect substantial revenue through broad-based consumption taxes, provided that those revenues are channeled into world-class universal public services that equalize health, education, and opportunity for all citizens.`
        ]
      }
    },
    sources: [
      { title: 'Capital in the Twenty-First Century (Thomas Piketty)', url: 'https://www.hup.harvard.edu/books/9780674430006', note: 'Comprehensive historical and economic analysis of wealth concentration and progressive taxation.' },
      { title: 'Taxation and Inequality in Brazil (IPEA / Rodrigo Orair)', url: 'https://www.ipea.gov.br/portal/publicacoes', note: 'Empirical study of the regressive nature of Brazil’s indirect tax system.' },
      { title: 'The Nordic Model: Pros and Cons (OECD Economic Surveys)', url: 'https://www.oecd.org/economy/surveys/', note: 'Analysis of high VAT combined with high social investment in Scandinavia.' }
    ],
    interpret: [
      { id: '15i1', type: 'mc', tag: 'Main idea', q: `What is the core argument of the main text regarding indirect taxation?`, options: [`Indirect taxation is the fairest possible method of public finance.`, `Heavy reliance on indirect consumption taxes is deeply regressive, placing a disproportionate financial burden on low-income citizens.`, `Taxes should be abolished entirely in modern democracies.`, `Only corporations should pay taxes.`], answer: 1, explain: `The essay demonstrates how indirect consumption taxes take a much larger percentage of income from poorer families.` },
      { id: '15i2', type: 'mc', tag: 'Inference', q: `Why does a flat 20% sales tax affect low-income earners much more severely than high-income earners?`, options: [`Because low-income earners buy more expensive luxury items.`, `Because low-income families spend almost 100% of their earnings on immediate consumption, while the wealthy save and invest large portions of their wealth.`, `Because high earners are legally exempt from sales tax.`, `Because supermarket prices are higher in poor neighborhoods.`], answer: 1, explain: `Poorer families must spend all income on essentials exposed to consumption tax, while wealthy individuals shield savings in assets.` },
      { id: '15i3', type: 'tf', tag: 'Detail', q: `The total tax burden in Brazil (as a percentage of GDP) is significantly lower than that of most European welfare states.`, answer: false, explain: `Paragraph 6 states that Brazil's tax burden (~33% of GDP) is comparable to OECD European nations, but structured regressively.` },
      { id: '15i4', type: 'mc', tag: 'Counterpoint argument', q: `What primary justification does the counterpoint offer for relying on broad-based consumption taxes in developing nations?`, options: [`Consumption taxes are beloved by all citizens.`, `They provide stable, broad revenue in economies with large informal sectors and are difficult to evade.`, `They eliminate all government debt within one year.`, `They encourage everyone to spend all their savings immediately.`], answer: 1, explain: `The counterpoint notes that consumption taxes offer administrative simplicity and capture revenue from the informal economy.` },
      { id: '15i5', type: 'open', tag: 'Evidence vs interpretation', q: `How does the author connect the invisibility of consumption taxes to the erosion of "fiscal citizenship" and democratic accountability?`, rows: 4, guide: [`Citizens blame merchants and inflation rather than state taxation for high prices.`, `Lacks transparency, preventing voters from holding the government accountable for how public revenue is spent.`] },
      { id: '15i6', type: 'open', tag: 'Synthesis & comparison', q: `Contrast the main essay’s demand for progressive tax reform with the counterpoint’s model of "redistribution at the point of expenditure" (the Nordic approach).`, rows: 5, guide: [`Main essay wants progressive collection (direct taxes on wealth/income) to reduce inequality at the source.`, `Counterpoint accepts broad consumption taxes if the state returns high-quality universal public services (healthcare, education).`] },
      { id: '15i7', type: 'open', tag: 'Application', q: `In recent debates over tax reform in Brazil (Reforma Tributária), what measures have been proposed to mitigate the regressivity of consumption taxes (e.g. cashback on basic foodstuffs)?`, rows: 5, guide: [`Mention specific mechanisms: tax exemptions on basic food basket (cesta básica), digital cashback for low-income families via CadÚnico.`] }
    ],
    notice: [
      {
        title: 'Causative structures: have, make, let, get',
        sub: 'Expressing agency, institutional coercion, enablement, and delegated power in governance',
        examples: [
          `The fiscal crisis <b>made the government raise</b> emergency consumption levies.`,
          `The tax code <b>lets wealthy investors shelter</b> capital in offshore funds.`,
          `The ministry <b>had the revenue service audit</b> large corporate entities.`,
          `Reformers hope to <b>get Congress to approve</b> the progressive wealth reform.`
        ],
        questions: [
          `How does "make + object + bare infinitive" express necessity or compulsion?`,
          `What is the difference in structure between "have someone do" and "get someone to do"?`,
          `Why does "let + bare infinitive" express institutional permission or loopholes?`
        ],
        explain: `<p>Causative verbs express how institutions and laws compel, permit, or organize actions:</p><ul><li><b>Make + object + base verb:</b> compulsion (<i>Tax laws make citizens report their earnings</i>).</li><li><b>Let + object + base verb:</b> permission/loopholes (<i>Loopholes let corporations avoid taxes</i>).</li><li><b>Have + object + base verb:</b> delegation/assignment (<i>The state had consultants evaluate the code</i>).</li><li><b>Get + object + to-infinitive:</b> persuasion/effort (<i>Activists got lawmakers to pass the reform</i>).</li></ul>`,
        compare: { head: ['Direct active', 'Causative construction', 'Nuance gain'], rows: [['The government forced banks to disclose accounts.', 'New regulations made banks disclose offshore accounts.', 'Emphasises legal framework rather than physical force.'], ['The law allows rich people to pay less.', 'The fiscal framework lets high earners shield capital through holding companies.', 'Professional institutional description.']] },
        practice: [
          [`Rewrite using "make": <i>Inflation compelled the central bank to intervene.</i>`, `Inflation made the central bank intervene.`, `Uses causative make with bare infinitive.`],
          [`Rewrite using "let": <i>Tax exemptions permit landowners to reduce their liabilities.</i>`, `Tax exemptions let landowners reduce their liabilities.`, `Uses causative let with bare infinitive.`],
          [`Correct the causative error: <i>The minister made the committee to review the proposal.</i>`, `The minister made the committee review the proposal.`, `Removes to after causative make.`]
        ],
        radar: [
          { wrong: 'The law made them to pay higher rates.', right: 'The law made them pay higher rates.', why: 'Make + object takes a bare infinitive without "to".' },
          { wrong: 'She got the parliament accept the amendment.', right: 'She got the parliament to accept the amendment.', why: 'Get + object takes a full infinitive with "to".' }
        ],
        help: `<p><b>Em português:</b> Verbos causativos como <i>make someone do</i> (fazer alguém fazer), <i>let someone do</i> (permitir que alguém faça) e <i>get someone to do</i> (conseguir que alguém faça) são essenciais para descrever dinâmicas de poder tributário.</p>`
      },
      {
        title: 'Concession markers: although, despite, in spite of, nonetheless',
        sub: 'Balancing economic trade-offs, fiscal constraints, and social imperatives',
        examples: [
          `<b>Despite having</b> a high overall tax burden, Brazil maintains an intensely regressive system.`,
          `<b>Although</b> progressive wealth taxes are morally fair, they risk capital flight if poorly designed.`,
          `The reform will broaden the tax base; <b>nonetheless</b>, targeted cashbacks remain essential.`
        ],
        questions: [
          `What is the grammatical difference between "although" (followed by a clause) and "despite" (followed by a noun phrase or gerund)?`,
          `How does "nonetheless" function as an adverbial transition between two independent sentences?`
        ],
        explain: `<p>Concession structures allow you to acknowledge a strong counterpoint before advancing your central thesis:</p><ul><li><b>Although / Even though + subject + verb:</b> <i>Although direct taxes are transparent...</i></li><li><b>Despite / In spite of + noun / -ing:</b> <i>Despite collecting substantial revenues...</i></li><li><b>Nonetheless / Nevertheless (sentence adverb):</b> <i>The rates are high; nonetheless, evasion persists.</i></li></ul>`,
        compare: { head: ['Simple conjunction', 'Sophisticated concession', 'Analytical gain'], rows: [['Brazil taxes a lot but the poor pay more.', 'Despite collecting a substantial share of GDP in taxes, Brazil imposes its heaviest burden on the working poor.', 'Clear, formal, and authoritative.']] },
        practice: [
          [`Combine using "Despite + -ing": <i>The country generated immense revenue. Yet it failed to reduce poverty.</i>`, `Despite generating immense revenue, the country failed to reduce poverty.`, `Uses despite with gerund.`]
        ],
        radar: [
          { wrong: 'Despite of the high tax rates, evasion continued.', right: 'Despite the high tax rates, evasion continued. / In spite of the high tax rates...', why: 'Do not put "of" after despite; use "in spite of" or "despite" alone.' }
        ],
        help: `<p><b>Em português:</b> <i>Despite</i> e <i>in spite of</i> significam "apesar de" e exigem substantivo ou verbo em <i>-ing</i>; <i>although</i> significa "embora" e introduz uma oração completa.</p>`
      }
    ],
    vocab: [
      ['regressive', 'adjective', 'Taking a proportionally greater amount from those on lower incomes.', 'A high reliance on consumption taxes creates an intensely regressive fiscal system.', 'The sales tax increase was condemned as regressive.', ['regressive tax', 'regressive system', 'regressive impact'], ['inequitable', 'disproportionate'], 'Core public finance adjective.', '/rɪˈɡres.ɪv/', 'progressive'],
      ['propensity', 'noun', 'An inclination or natural tendency to behave in a particular way.', 'Low-income households have a higher marginal propensity to consume.', 'He has a propensity to make risky financial investments.', ['propensity to consume', 'propensity to save', 'natural propensity'], ['tendency', 'inclination', 'predisposition'], 'Economics technical noun.', '/prəˈpen.sə.ti/', null],
      ['commodify', 'verb', 'Turn something into a commodity that can be bought and sold in a market.', 'Essential healthcare should not be completely commodified.', 'Water resources are increasingly commodified.', ['commodify essentials', 'commodify public goods', 'commodify healthcare'], ['commercialise', 'monetise'], 'Critical sociological verb.', '/kəˈmɒd.ɪ.faɪ/', null],
      ['exacerbate', 'verb', 'Make a problem, bad situation, or negative feeling worse.', 'Indirect taxes exacerbate economic inequality across the country.', 'Inflation exacerbated the cost-of-living crisis.', ['exacerbate inequality', 'exacerbate tensions', 'greatly exacerbate'], ['worsen', 'aggravate', 'intensify'], 'High-frequency academic verb.', '/ɪɡˈzæs.ə.beɪt/', 'alleviate'],
      ['loophole', 'noun', 'An ambiguity or inadequacy in the law that allows someone to evade a rule.', 'Corporate lawyers exploit tax loopholes to minimize liabilities.', 'The legislation closed several offshore tax loopholes.', ['tax loophole', 'legal loophole', 'close a loophole'], ['ambiguity', 'flaw', 'escape clause'], 'Legal and fiscal noun.', '/ˈluːp.həʊl/', null],
      ['subsidize', 'verb', 'Support financially; pay part of the cost of something with public money.', 'Public funds are used to subsidize basic transportation fares.', 'The government subsidized green energy research.', ['heavily subsidize', 'subsidize consumption', 'state subsidized'], ['fund', 'finance', 'underwrite'], 'Public finance verb.', '/ˈsʌb.sɪ.daɪz/', null],
      ['predatory', 'adjective', 'Seeking to exploit or oppress others for personal or institutional gain.', 'Without fair rules, the tax system can become predatory toward the vulnerable.', 'Predatory lending practices devastated low-income communities.', ['predatory system', 'predatory practices', 'predatory state'], ['exploitative', 'extractive', 'rapacious'], 'Critical adjective.', '/ˈpred.ə.tər.i/', 'protective'],
      ['evade', 'verb', 'Escape or avoid, especially by cleverness or deceit; avoid paying legal obligations.', 'High earners frequently use offshore accounts to evade taxes.', 'The company attempted to evade its regulatory obligations.', ['evade taxes', 'tax evasion', 'evade scrutiny'], ['dodge', 'bypass', 'sidestep'], 'Legal and economic verb.', '/ɪˈveɪd/', 'comply'],
      ['transparent', 'adjective', 'Easy to perceive, understand, or hold accountable; open and honest.', 'Direct income taxes are far more transparent than hidden consumption levies.', 'The procurement process must be completely transparent.', ['transparent system', 'transparent process', 'fully transparent'], ['clear', 'accountable', 'open'], 'Governance adjective.', '/trænˈspær.ənt/', 'opaque'],
      ['redistribution', 'noun', 'The distribution of something in a different way, especially of wealth through taxation.', 'Progressive taxation is the primary tool for economic redistribution.', 'The welfare state organizes the redistribution of national income.', ['wealth redistribution', 'income redistribution', 'fiscal redistribution'], ['reallocation', 'sharing', 'equalization'], 'Political economy noun.', '/ˌriː.dɪs.trɪˈbjuː.ʃən/', null]
    ],
    chunks: [
      ['the price we pay for civilized society', 'The foundational philosophical justification for taxation and state funding.', 'Affirming the necessity of the state', 'Philosophical · historical', 'As Holmes observed, taxes are the price we pay for civilized society.', 'Introduce the concept of public goods.', `Taxes are not theft; they are the price we pay for civilized society and collective order.`, 'Classic constitutional quote chunk.'],
      ['marginal propensity to consume', 'The proportion of an aggregate raise in pay that a consumer spends on goods rather than saving.', 'Deploying economic concepts', 'Academic · economic', 'Poorer families have a near-total marginal propensity to consume their earnings immediately.', 'Explain tax regressivity.', `Because low-income households have a higher marginal propensity to consume, sales taxes hit them hardest.`, 'Key economic mechanism chunk.'],
      ['the moral blueprint of a nation’s priorities', 'A document or system that reveals what a society truly values through its allocation of funds.', 'Evaluating state policy', 'Essayistic · critical', 'The national tax code is the moral blueprint of a nation’s priorities.', 'Critique budget allocations.', `A government budget is not just numbers; it is the moral blueprint of a nation’s priorities.`, 'Powerful rhetorical chunk.'],
      ['disproportionate financial burden', 'An unfair weight or cost placed on a group relative to its capacity.', 'Documenting economic unfairness', 'Formal · analytical', 'Indirect taxation places a disproportionate financial burden on the working class.', 'Analyze fiscal impact.', `Rising transport fares impose a disproportionate financial burden on peripheral commuters.`, 'Standard policy analysis chunk.'],
      ['redistribution at the point of expenditure', 'Collecting broad taxes and achieving equality through universal public services.', 'Explaining the Nordic model', 'Academic · fiscal', 'The Scandinavian model relies on redistribution at the point of expenditure rather than punitive collection.', 'Defend broad-based taxes.', `High VAT can be equitable if accompanied by aggressive redistribution at the point of expenditure.`, 'Public finance distinction chunk.'],
      ['the erosion of fiscal citizenship', 'The loss of civic trust and connection between paying taxes and receiving public benefits.', 'Diagnosing civic alienation', 'Sociological · political', 'Hidden consumption taxes and deteriorating public services cause the erosion of fiscal citizenship.', 'Explain tax evasion culture.', `Corruption scandals accelerate the erosion of fiscal citizenship among taxpayers.`, 'Governance diagnosis chunk.'],
      ['shelter capital in offshore accounts', 'Hiding financial assets in low-tax foreign jurisdictions to avoid domestic taxation.', 'Describing tax avoidance', 'Journalistic · financial', 'Ultra-wealthy individuals often shelter capital in offshore accounts to minimize tax liabilities.', 'Detail wealth evasion.', `Multinational corporations shelter capital in offshore accounts using complex transfer pricing.`, 'Financial investigative chunk.'],
      ['an upside-down fiscal structure', 'A tax system that taxes the poor more heavily than the rich, reversing progressive norms.', 'Critiquing tax inequality', 'Critical · analytical', 'Brazil maintains an upside-down fiscal structure where consumption is taxed far more than wealth.', 'Describe distorted systems.', `An upside-down fiscal structure deepens inequality while protecting inherited fortunes.`, 'Sharp diagnostic chunk.'],
      ['mitigate extreme market inequalities', 'Using state policies to soften the harsh disparities generated by capitalism.', 'Stating egalitarian goals', 'Formal · policy', 'Progressive income tax brackets are designed to mitigate extreme market inequalities.', 'State purpose of redistribution.', `Universal healthcare helps mitigate extreme market inequalities across society.`, 'Policy objective chunk.'],
      ['broaden the tax base', 'Increasing the range of economic activities, goods, or people subject to taxation.', 'Describing tax modernization', 'Economic · technocratic', 'The primary goal of the fiscal reform is to broaden the tax base and eliminate loopholes.', 'Discuss fiscal reform.', `Simplifying deductions allows the government to broaden the tax base while lowering marginal rates.`, 'Technocratic policy chunk.']
    ],
    collocations: [
      [`Heavy reliance on sales tax creates an intensely ______ fiscal structure.`, [`regressive`, `discretionary`, `contingent`, `visceral`], 0, `Regressive tax system is the standard economic collocation.`],
      [`Poor households have a much higher ______ to consume than wealthy families.`, [`propensity`, `hubris`, `cleavage`, `straitjacket`], 0, `Marginal propensity to consume is the established term.`],
      [`Wealthy individuals often exploit legal ______ to avoid capital gains taxes.`, [`loopholes`, `vacuums`, `deficits`, `dichotomies`], 0, `Exploit tax loopholes is a high-frequency collocation.`],
      [`The tax code represents the moral ______ of a country’s priorities.`, [`blueprint`, `straitjacket`, `leverage`, `arbiter`], 0, `Moral blueprint is a recognized metaphorical formulation.`]
    ],
    upgrades: [
      [`Sales taxes are not fair because poor people have to spend all their money on food.`, `Indirect consumption taxes are structurally regressive because low-income households possess a near-total marginal propensity to consume their earnings.`],
      [`Rich people hide their money in other countries so they don't pay anything.`, `Affluent individuals frequently shelter capital in offshore accounts and exploit regulatory loopholes to minimize effective tax liabilities.`],
      [`The government should tax wealth more to fix inequality.`, `A shift toward progressive direct taxation on income and wealth is essential to mitigate extreme socioeconomic disparities.`]
    ],
    think: {
      title: 'Fiscal Trade-offs and Incidence Analysis',
      lead: 'In public economics, the legal taxpayer (the person who writes the check) is often different from the economic taxpayer (the person who actually bears the final cost). Incidence analysis reveals who truly pays.',
      defs: [
        ['Tax incidence', `The ultimate distribution of the economic burden of a tax between producers, consumers, and workers.`],
        ['Deadweight loss', `The loss of total economic efficiency and welfare caused by market distortions from taxation.`],
        ['Laffer Curve hypothesis', `The theoretical proposition that beyond a certain optimal rate, higher tax rates reduce total revenue by discouraging work and investment.`]
      ],
      items: [
        { id: '15t1', type: 'mc', tag: 'Incidence analysis', q: `A government places a heavy 30% tax on corporate commercial profits. If companies respond by raising the prices of their products and reducing worker wages, who actually bears the tax incidence?`, options: [`The corporate board of directors exclusively.`, `Consumers and workers, who face higher prices and lower real wages.`, `Foreign investors exclusively.`, `The government treasury.`], answer: 1, explain: `Tax incidence analysis shows that corporate taxes can be shifted forward to consumers in prices or backward to workers in wages.` },
        { id: '15t2', type: 'open', tag: 'Steelmanning', q: `Steelman the argument for maintaining a relatively high consumption tax (VAT) in an emerging economy with widespread informality.`, rows: 5, guide: [`Focus on administrative feasibility, broad tax base, stable revenue during recessions, and difficulty of evasion by informal workers.`] },
        { id: '15t3', type: 'open', tag: 'Trade-off evaluation', q: `Evaluate the trade-off between high inheritance taxes (which reduce wealth concentration) and the risk of capital flight. How can a state mitigate capital flight?`, rows: 5, guide: [`Discuss international tax treaties, global asset registries, exit taxes, and balanced moderate rates with strong enforcement.`] },
        { id: '15t4', type: 'open', tag: 'Core synthesis', q: `Why does an "upside-down" indirect tax system erode fiscal citizenship and public trust in democratic institutions? State one psychological and one economic mechanism.`, rows: 6, guide: [`Psychological: hidden taxes make citizens blame inflation/merchants rather than understanding state revenue; Economic: poor citizens pay European-level rates but receive substandard public services.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing a Short Analytical Response on Public Finance',
        text: 'A strong fiscal analysis avoids moralistic slogans (e.g. "taxation is theft" or "tax the rich 100%") and instead examines the structural mechanisms of tax incidence, revenue stability, and economic redistribution with precision.',
        weak: 'Taxes in Brazil are the highest in the world and politicians steal everything while poor people suffer.',
        strong: 'Although Brazil collects over thirty percent of its GDP in revenue, its heavy reliance on indirect consumption taxes creates an intensely regressive burden, exacerbating inequality rather than mitigating it through progressive redistribution.'
      },
      short: {
        kind: 'Policy evaluation', title: 'Evaluating Consumption Tax Regressivity',
        prompt: 'Analyze why indirect consumption taxes are considered economically regressive. In your evaluation, compare how a 20% sales tax impacts a low-wage worker versus an affluent professional, using the concept of marginal propensity to consume.',
        min: 160, max: 260, support: 'light',
        guide: ['Use causative structures (make, let, get) and concession markers (despite, although).', 'Include the terms marginal propensity to consume, indirect taxation, and regressive.']
      },
      main: {
        kind: 'Analytical essay', title: 'Who Pays for the State? The Architecture of Fiscal Justice',
        prompt: 'To what extent should a modern state rely on direct progressive taxation on wealth and income versus broad-based indirect taxation on consumption? Write an essay analyzing the trade-offs between fiscal equity, administrative efficiency, and economic growth.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: establish Holmes’s premise on civilized society and state the central dilemma of tax distribution.',
          'Body 1: examine the structural regressivity of indirect consumption taxes (marginal propensity to consume, burden on working families).',
          'Body 2: analyze the progressive alternative (direct income/wealth taxes, transparency, reduction of market inequality).',
          'Body 3: address the counterpoint (the economic case for broad bases, informal economy capture, the Nordic model of expenditure redistribution).',
          'Conclusion: synthesize a balanced framework for progressive fiscal reform that protects both economic dynamism and social equity.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I clearly distinguish direct taxes (income/wealth) from indirect taxes (consumption/VAT)?',
        'Did I use causative structures (e.g. "make the government raise", "let corporations shelter") accurately without adding "to" after make/let?',
        'Did I use concession markers (despite, although, in spite of, nonetheless) with correct syntax?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my essay provide an incidence-based analysis rather than simplistic rhetoric?'
      ],
      challenges: [
        'Replace any incorrect "despite of" with "despite" or "in spite of".',
        'Use the chunk "marginal propensity to consume" or "an upside-down fiscal structure".',
        'Ensure that the distinction between tax collection and expenditure redistribution is clearly articulated.'
      ]
    },
    retrieve: {
      content: 'Explain why indirect consumption taxes are regressive using the concept of marginal propensity to consume.',
      contentGuide: ['Low-income families spend nearly 100% of income on immediate taxed essentials, while high earners save/invest large portions untaxed.'],
      grammar: 'Write two sentences using causative "make + base verb" and concession "Despite + noun/-ing".',
      grammarGuide: ['Verify that make takes a bare infinitive and despite has no "of".'],
      reasoning: 'What is the difference between legal tax liability and economic tax incidence?',
      reasoningGuide: ['Legal liability is who writes the check to the state; economic incidence is who ultimately loses purchasing power (e.g. passed to consumers).'],
      cumulative: 'Connect Unit 15 to Unit 12: how does mandatory spending constrain a government’s ability to reform its tax structure?',
      summary: `<p><b>Main claim:</b> taxation is an ethical blueprint; heavy reliance on indirect consumption taxes creates an upside-down, regressive system that deepens inequality despite high total revenue.</p><p><b>Grammar:</b> causative structures (make, let, have, get) and formal concession markers (despite, although, nonetheless) provide structural precision.</p><p><b>Reasoning:</b> evaluate tax incidence, marginal propensity to consume, and the distinction between tax collection and expenditure redistribution.</p>`
    }
  });

  const u = K.units['15'];
  u.listening = [
    {
      id: 'l1', title: 'The Anatomy of a Supermarket Receipt', format: 'Investigative audio story',
      file: '/audio/en/unit-15/u15-listening-01.mp3', duration: 130, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two speakers (Reporter Daniela Ortiz and Economist Fábio Mendes); documentary style, Brazilian and British English',
      passes: ['First listen · follow the reporter through the supermarket checkout', 'Second listen · note the percentage breakdown of taxes on basic food vs luxury services', 'Third listen · identify causative verbs'],
      transcript: `Daniela: I’m standing at the checkout of a supermarket on the outskirts of São Paulo with Dona Maria, who works as a school cleaner. Her cart contains rice, beans, milk, cooking oil, and soap. The total bill comes to one hundred and eighty reais. Fábio, how much of that total is actual food, and how much is going directly to the government?\n\nFábio: If you look closely at the breakdown mandated by tax transparency laws, roughly thirty-five to forty percent of that receipt consists of indirect taxes—ICMS, PIS, and Cofins. That means Dona Maria is paying nearly seventy reais in taxes on basic sustenance.\n\nDaniela: And why is that economically regressive?\n\nFábio: Because Dona Maria earns twelve hundred reais a month. That seventy reais represents almost six percent of her entire monthly income, paid on a single grocery trip. Meanwhile, a partner at a corporate law firm who buys the exact same carton of milk pays the exact same seventy reais in tax, but for him, that represents 0.05% of his monthly income. The tax code makes the poorest citizens pay the highest proportional rate on the essentials of life, while leaving financial dividends largely exempt.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core calculation', q: 'Why does the supermarket receipt demonstrate tax regressivity according to Fábio?', options: ['Because food in São Paulo is imported from Switzerland.', 'Because the flat nominal tax on food takes a vastly larger percentage of a low-wage worker’s income than of an affluent professional’s income.', 'Because the government charges no tax on milk.', 'Because supermarkets refuse to give receipts.'], answer: 1, explain: 'A flat nominal tax on essentials represents a much higher proportion of a low earner’s monthly budget.' },
        { id: 'q2', type: 'open', tag: 'Detail extraction', q: 'What specific taxes are embedded invisibly inside the Brazilian grocery receipt mentioned in the story?', rubric: ['ICMS (state value-added tax)', 'PIS and Cofins (federal social contribution taxes on revenue)'] }
      ]
    },
    {
      id: 'l2', title: 'The Nordic Tax Paradox', format: 'Economics discussion',
      file: '/audio/en/unit-15/u15-listening-02.mp3', duration: 120, level: 'C1',
      audioReady: false,
      voice: 'Two academic voices (Dr. Aris Thorne and Dr. Astrid Lindholm); calm, analytical, British and Scandinavian English',
      passes: ['First listen · understand why Scandinavia has high VAT rates yet achieves low inequality', 'Second listen · contrast revenue collection with social expenditure'],
      transcript: `Dr. Thorne: Astrid, American and British liberals often look at Sweden and Denmark as socialist paradises of progressive taxation. But when you look at the tax code in Stockholm, you discover a standard value-added tax of twenty-five percent on almost all goods and services. How does a country maintain such high consumption taxes without creating severe poverty?\n\nDr. Lindholm: That is what economists call the Nordic tax paradox. Scandinavia does not attempt to achieve equality primarily through punitive tax collection. Our value-added taxes are high and broad-based because we need massive, stable revenue to finance the state.\n\nDr. Thorne: So where does the equality come from?\n\nDr. Lindholm: The equality happens at the point of expenditure. The state takes that twenty-five percent VAT and uses it to provide completely free universal healthcare, free university education, heavily subsidized child care, and generous parental leave. If a low-income family pays high taxes on groceries, but receives world-class schooling, healthcare, and transit for free, their net social wage is positive. The problem in countries like Brazil is not high consumption tax per se; it is paying European-level taxes while receiving third-rate public services.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'How does the Nordic model reconcile high consumption taxes (25% VAT) with low social inequality?', options: ['By giving everyone gold coins.', 'By channeling broad tax revenues into universal, high-quality public services like free healthcare and education that equalize living standards.', 'By eliminating all income taxes.', 'By forcing private companies to pay for groceries.'], answer: 1, explain: 'Scandinavia achieves equality by returning broad tax revenues as high-quality universal public goods.' },
        { id: 'q2', type: 'open', tag: 'Critical contrast', q: 'How does Dr. Lindholm contrast the Nordic situation with that of Brazil?', rubric: ['Nordic: high consumption taxes are returned as free, world-class healthcare, education and childcare', 'Brazil: citizens pay high consumption taxes but receive substandard public services, worsening inequality'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A politician proposes eliminating income tax entirely and replacing it with a flat 25% national sales tax on everything, claiming: “This is the fairest system because everyone pays the exact same rate when they buy things.” Respond in 60–120 seconds. Explain why this proposal is economically regressive using the concept of marginal propensity to consume, and defend a progressive fiscal alternative.',
    prepare: 'Keywords only: regressive flat tax · marginal propensity to consume · essentials (food/utilities) vs capital assets · fiscal citizenship · progressive direct tax. Do not script.',
    grammar: 'Causative structures (make the poor pay, let high earners shelter); concession markers (despite the apparent simplicity, although); formal stance markers',
    targets: ['the price we pay for civilized society', 'marginal propensity to consume', 'disproportionate financial burden', 'an upside-down fiscal structure'],
    rubric: [
      'Directly and convincingly refutes the politician’s claim of fairness',
      'Explains the economic mechanism of marginal propensity to consume clearly',
      'Uses accurate causative grammar and formal concession connectors',
      'Advocates for a balanced, progressive alternative that protects fiscal capacity and equity'
    ]
  };
})(window.KLANG);
