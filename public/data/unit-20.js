/* UNIT 20 · THE COST OF CONVENIENCE */
(function (K) {
  K.units['20'] = K.makeUnit('20', {
    module: 4, title: 'The cost', titleEm: 'of convenience',
    question: 'Does making life easier always make life better?',
    knowLead: `Convenience is the defining promise of modern consumer technology. From one-click purchasing and food delivery applications to automated navigation and smart home devices, technological innovation continuously eliminates physical friction, waiting time, and domestic effort from human life. For over a century, this progression was celebrated as unadulterated human progress. Yet contemporary philosophers and sociologists argue that convenience comes with profound hidden costs: the atrophy of practical competence, the erosion of local community networks, the exploitation of invisible precarious labor, and the flattening of human experience. Keep the distinction between freeing time and hollowing out meaning in mind as you read.`,
    terms: [
      ['The Device Paradigm', `Philosopher Albert Borgmann's concept that modern technologies hide their mechanical and social workings to deliver effortless commodities, dissolving the "focal practices" that once gave life shared meaning.`],
      ['Focal practice', `An activity (such as cooking a meal from scratch, playing an instrument, or repairing a tool) that requires physical engagement, skill, patience, and bodily presence, connecting individuals to their environment and community.`],
      ['Second-order effect', `The indirect, unintended consequence that follows a primary action or technological adoption over time (e.g. food apps freeing cooking time, but atomizing family meals and creating precarious courier labor).`],
      ['Atrophy of competence', `The progressive decay of basic human self-reliance, physical skills, and geographical orientation resulting from outsourcing daily tasks to automated services.`],
      ['The Convenience Monopoly', `Columbia Law professor Tim Wu’s thesis that convenience acts as an irresistible monopoly force, systematically driving out richer, more demanding human experiences by making friction feel intolerable.`]
    ],
    views: [
      'Two philosophies of technological convenience',
      'The liberation and efficiency view',
      `Eliminating physical drudgery, manual maintenance, and logistical friction liberates human time and energy, allowing individuals to dedicate their lives to intellectual flourishing, creative pursuits, and family care.`,
      'The existential hollowing view',
      `Human meaning, character, and authentic agency are forged through the very resistance of physical reality and shared social obligations. Eliminating all friction produces fragile, isolated, and deskilled consumers.`,
      `The central question is whether convenience expands human life or merely homogenizes and hollows it out.`
    ],
    knowPrompt: `Think of a daily task that was once demanding but has now been made instantaneous by a smartphone app (such as cooking, navigating a city, or buying books). What did you gain in efficiency, and what subtle experience or competence did you lose?`,
    knowGuide: [
      `Identify the exact time saved versus the sensory, social, or navigational skills bypassed.`,
      `Consider whose invisible labor made the instant convenience possible.`
    ],
    read: {
      main: {
        format: 'Philosophical & cultural essay', title: 'The Tyranny of the Effortless: How Convenience Encloses the Human Soul',
        standfirst: `Convenience promised to liberate us from drudgery. Instead, it made friction feel like a personal insult, and in doing so, hollowed out the texture of living.`,
        pull: { after: 6, text: `When an activity becomes completely frictionless, it ceases to be an experience and becomes merely a transaction.` },
        notes: { 2: `<b>Albert Borgmann</b> published <i>Technology and the Character of Contemporary Life</i> in 1984, establishing the Device Paradigm.`, 5: `<b>Tim Wu</b> published "The Tyranny of Convenience" in the <i>New York Times</i> in 2018.` },
        paras: [
          `In late nineteenth-century industrial societies, the invention of household appliances—the washing machine, the gas stove, and the electric refrigerator—was hailed as an unprecedented moral triumph. For the first time in human history, ordinary families were liberated from hours of backbreaking domestic toil. Fetching firewood, hauling buckets of water from public wells, and scrubbing laundry by hand on washboards were physically exhausting tasks that consumed the vast majority of female labor. Eliminating that brutal drudgery was an unalloyed egalitarian gain: it preserved physical health, lengthened human lifespans, and created the domestic time required for universal literacy and civic participation.`,
          `Over the course of the late twentieth and early twenty-first centuries, however, the cultural meaning of convenience underwent a profound, insidious mutation. What began as the rational alleviation of physical exhaustion transformed into a totalizing ideology: the demand that all friction, all delay, all physical resistance, and all social awkwardness be systematically excised from daily existence. Today, convenience is not merely an engineering goal; it is the secular gospel of modern consumer capitalism. If an activity requires patience, physical presence, or interpersonal negotiation, it is treated as a design defect to be optimized out of existence by a smartphone application.`,
          `In his foundational work *Technology and the Character of Contemporary Life*, philosopher Albert Borgmann diagnosed this transformation through what he termed the "Device Paradigm." Borgmann contrasted a traditional wood-burning hearth with a modern central heating thermostat. A hearth is a "thing": it is physically demanding, requiring the chopping of wood, the cleaning of ashes, and the careful tending of embers. But in doing so, the hearth becomes the physical center of the household—a "focal practice" around which family members gather, share labor, and cultivate bodily awareness of the seasons. A thermostat, by contrast, is a "device": it hides its machinery inside walls, requiring only the turn of a dial to deliver warmth as a detached, disembodied commodity.`,
          `Borgmann’s insight was not that central heating is evil, but that the device paradigm carries a hidden existential cost. When every aspect of life is converted from a focal practice into a disembodied commodity, human beings become passive consumers alienated from the physical world. Consider the preparation of food. Cooking a meal from raw ingredients is demanding: it involves tactile engagement with vegetables and meat, sensory calibration of heat and seasoning, the patience of simmering, and the shared ritual of dining. When we replace cooking with a food delivery app, we do not simply save forty minutes; we eliminate a focal practice that anchored our connection to nature, craft, and domestic solidarity. The meal ceases to be a cultural achievement; it becomes an extracted commodity delivered to the door by an anonymous courier.`,
          `As Columbia Law professor Tim Wu observes, the ultimate danger of convenience is its tyrannical, ratcheting irreversibility. Once an effortless technological alternative becomes available, the older, more demanding practice begins to feel not merely inconvenient, but intolerable. Waiting three days for a letter to arrive by post was once normal; today, a text message that takes four seconds to load feels like an agonizing failure of infrastructure. Navigating an unfamiliar city using paper maps and asking local strangers for directions once cultivated spatial memory, navigational intuition, and unexpected human encounters; today, following the blue dot on a GPS screen ensures that we reach our destination without ever looking at the street or speaking to a resident. The friction is eliminated, but so is the world.`,
          `Furthermore, the ideology of convenience obscures a profound socio-economic deception: frictionless convenience for the affluent is almost always subsidized by the hyper-exploitative friction imposed upon an invisible underclass. When an urban professional taps a screen to have groceries, hot meals, or manufactured goods delivered in fifteen minutes, the physical effort did not vanish into thin air. Rather, it was outsourced to precarious gig-economy couriers, warehouse pickers working under algorithmic surveillance, and delivery drivers navigating traffic without health insurance or labor protections. The user experiences magic; the worker experiences neo-Taylorist degradation. Convenience is an optical illusion created by the spatial and social displacement of human sweat.`,
          `On a psychological level, the systematic elimination of friction produces an acute fragility of character. Human resilience, emotional regulation, and creative stamina are not innate genetic constants; they are capacities forged through repeated encounters with resistance, boredom, and delay. When we live in an environment where every desire is satisfied instantaneously with a swipe, our tolerance for ambiguity and difficulty atrophies. In politics, in relationships, and in creative work, the most valuable achievements cannot be optimized or automated. A deep marriage, a complex philosophical argument, and a just political community cannot be delivered in fifteen minutes with free shipping. They require the slow, unglamorous, and irreplaceable friction of human commitment.`,
          `To live an authentic, flourishing life in the twenty-first century requires practicing deliberate friction. We do not need to smash our refrigerators or abandon our navigational tools. But we must consciously defend those focal practices that give life depth, craft, and communal resonance. We must relearn how to cook with our hands, walk through cities without screens, read long books that demand patience, and engage in conversations that cannot be accelerated. By reclaiming the dignity of effort, we rescue ourselves from the sterile tyranny of the effortless and restore richness to the human experience.`
        ]
      },
      counter: {
        format: 'Economic & accessibility defense', title: 'The Democratic Gift of Frictionless Tools',
        standfirst: `Critiquing convenience is an elite aesthetic luxury that ignores how technology empowers the disabled, the elderly, and the overworked.`,
        paras: [
          `Romantic elegies for physical friction and traditional manual labor are almost invariably composed by comfortable academics and affluent essayists who have never had to scrub a floor for ten hours or haul coal in the winter.` ,
          `For working-class single parents balancing multiple jobs, for elderly citizens with limited mobility, and for disabled individuals who cannot navigate inaccessible urban environments, digital convenience is not a spiritual crisis. It is an indispensable lifeline. An online grocery delivery app is not "existential alienation" to an arthritic pensioner; it is the difference between eating fresh food and starving in isolation. Voice-to-text software and algorithmic navigation are not "deskilling" to a blind citizen; they are the keys to autonomous urban participation.` ,
          `Furthermore, eliminating mundane domestic friction is precisely what enabled the historic entry of women into higher education, professional careers, and public leadership. The romanticized "focal practice" of cooking from scratch every night was historically sustained by the unpaid, forced domestic servitude of women.` ,
          `We must not confuse the legitimate need to regulate predatory gig-economy labor platforms with an elitist disdain for convenience itself. True technological progress consists of automating routine survival tasks so that every human being, regardless of physical ability or socioeconomic status, has the freedom to pursue higher aspirations.`
        ]
      }
    },
    sources: [
      { title: 'Technology and the Character of Contemporary Life (Albert Borgmann)', url: 'https://press.uchicago.edu/ucp/books/book/chicago/T/bo5963725.html', note: 'Foundational philosophical work establishing the Device Paradigm and focal practices.' },
      { title: 'The Tyranny of Convenience (Tim Wu)', url: 'https://www.nytimes.com/2018/02/16/opinion/sunday/tyranny-convenience.html', note: 'Seminal New York Times essay exploring how convenience homogenizes human experience.' },
      { title: 'Hustle and Gig: Struggling and Surviving in the Sharing Economy (Alexandrea J. Ravenelle)', url: 'https://www.ucpress.edu/book/9780520300569/hustle-and-gig', note: 'Sociological investigation into the precarious labor that subsidizes on-demand digital convenience.' }
    ],
    interpret: [
      { id: '20i1', type: 'mc', tag: 'Main idea', q: `What is the central philosophical critique of modern convenience presented in the main essay?`, options: [`All modern appliances should be destroyed immediately.`, `The systematic elimination of all friction transforms rich focal practices into shallow transactional commodities, creating psychological fragility and obscuring precarious labor.`, `Convenience only exists in North America.`, `People should stop eating food.`], answer: 1, explain: `The essay argues that total frictionlessness hollows out existential meaning, deskills human capacities, and relies on exploited gig labor.` },
      { id: '20i2', type: 'mc', tag: 'Inference', q: `How does Albert Borgmann distinguish a "thing" (such as a wood hearth) from a "device" (such as a thermostat)?`, options: [`Things are made of wood; devices are made of plastic.`, `A thing engages human skill, bodily presence, and communal ritual as a focal practice; a device hides its machinery and delivers a detached commodity without engagement.`, `Devices are always cheaper than things.`, `Things require internet connections.`], answer: 1, explain: `Borgmann’s distinction centers on engagement and focal practice versus disembodied commodity delivery.` },
      { id: '20i3', type: 'tf', tag: 'Detail', q: `According to paragraph 6, the physical effort required for 15-minute grocery deliveries is completely performed by automated robots.`, answer: false, explain: `Paragraph 6 shows that the effort is outsourced to precarious human couriers and warehouse pickers under algorithmic surveillance.` },
      { id: '20i4', type: 'mc', tag: 'Counterpoint argument', q: `What crucial historical and social reality does the counterpoint raise regarding the traditional "focal practice" of domestic cooking and chores?`, options: [`Men did all the cooking in the 19th century.`, `Traditional domestic friction was historically sustained by the unpaid, forced domestic labor of women, and convenience enabled their professional liberation.`, `Cooking was outlawed in Europe.`, `Appliances have made human lifespan shorter.`], answer: 1, explain: `The counterpoint notes that romanticizing manual domestic friction ignores that women bore the burden of unpaid domestic servitude.` },
      { id: '20i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 5, how does Tim Wu explain the "ratcheting irreversibility" of convenience? Give one example from the text.`, rows: 4, guide: [`Once an effortless tool appears, the older practice feels intolerable rather than merely slow.`, `Examples: waiting days for a letter vs panicking over a 4-second text delay; using paper maps vs following GPS blue dot.`] },
      { id: '20i6', type: 'open', tag: 'Synthesis & comparison', q: `Reconcile the main essay’s call for "deliberate friction" with the counterpoint’s defense of accessibility for disabled and elderly citizens.`, rows: 5, guide: [`Distinguish essential accessibility tools (which restore baseline autonomy to disabled/elderly people) from consumerist over-optimization that strips meaning from capable adults.`] },
      { id: '20i7', type: 'open', tag: 'Application', q: `Analyze the socioeconomic reality of delivery app couriers (e.g. iFood, Rappi) in Brazilian metropolitan areas. How does the user’s convenience directly interact with the courier’s physical risk?`, rows: 5, guide: [`Discuss the contrast between instant user gratification and couriers navigating dangerous traffic in rain on bicycles without accident insurance or resting points.`] }
    ],
    notice: [
      {
        title: 'Ellipsis and substitution for cohesion and economy',
        sub: 'Avoiding repetitive phrasing and maintaining crisp, rhythmic sentence progression',
        examples: [
          `A hearth is a physical craft; a thermostat <b>is not [a physical craft]</b>. (Verbal ellipsis)`,
          `Some citizens prefer automated convenience, while others reject <b>such shortcuts</b>. (Nominal substitution with *such*)`,
          `If we wish to preserve focal practices, we must do <b>so</b> through conscious discipline. (Verbal substitution with *do so*)`,
          `The first appliance liberated women from drudgery; the second <b>[appliance]</b> merely created isolation. (Noun ellipsis)`
        ],
        questions: [
          `How does ellipsis (omitting understood words) improve the elegance and flow of analytical prose?`,
          `When is substitution (*do so*, *one*, *such*, *the former / the latter*) preferable to repeating a noun or verb phrase?`
        ],
        explain: `<p>Cohesive C1 writing eliminates unnecessary lexical repetition through ellipsis (deliberate omission of predictable words) and substitution (replacing phrases with pro-forms like <i>so, one, ones, such, that of, those of</i>):</p><ul><li><b>Noun ellipsis:</b> <i>The rich choose paid privacy; the poor [choose] mandatory surveillance.</i></li><li><b>Verbal substitution:</b> <i>They promised to eliminate drudgery, but failed to do so.</i></li><li><b>Comparative substitution:</b> <i>The challenges of our era are more complex than those of our ancestors.</i></li></ul>`,
        compare: { head: ['Repetitive phrasing', 'Ellipsis / Substitution', 'Rhetorical flow'], rows: [['Cooking is a focal practice. Cleaning the house is also a focal practice.', 'Cooking is a focal practice, and cleaning the home equally so.', 'Concise and stylistically mature.'], ['The wages of gig workers are lower than the wages of employees.', 'The wages of gig workers are significantly lower than those of formal employees.', 'Uses demonstrative pronoun substitution (*those of*).']] },
        practice: [
          [`Use substitution with "do so": <i>If platforms decide to respect user privacy, they should respect user privacy immediately.</i>`, `If platforms decide to respect user privacy, they should do so immediately.`, `Substitutes verb phrase with do so.`],
          [`Use comparative substitution with "that of": <i>The carbon footprint of food delivery is higher than the carbon footprint of home cooking.</i>`, `The carbon footprint of food delivery is higher than that of home cooking.`, `Substitutes singular noun with that of.`],
          [`Apply ellipsis: <i>The first proposal was rejected by the council and the second proposal was accepted by the council.</i>`, `The first proposal was rejected by the council and the second accepted.`, `Ellipses subject noun and auxiliary.`]
        ],
        radar: [
          { wrong: 'The lifestyle in cities is faster than the lifestyle in villages.', right: 'The lifestyle in cities is faster than that in villages.', why: 'Use "that in / that of" to substitute for singular uncountable nouns.' },
          { wrong: 'If you want to leave, you can do.', right: 'If you want to leave, you can do so.', why: 'Use "do so" (not "do" alone) to substitute for a predicate.' }
        ],
        help: `<p><b>Em português:</b> Elipse (omissão de termos subentendidos) e substituição (<i>do so</i> = fazer isso; <i>that of / those of</i> = o de / os de) conferem concisão e elegância nativa ao texto.</p>`
      },
      {
        title: 'Advanced discourse markers: furthermore, conversely, by the same token',
        sub: 'Guiding the reader through multi-stage philosophical dialectics with explicit signposting',
        examples: [
          `Frictionless delivery saves time; <b>by the same token</b>, it dissolves communal culinary craft.`,
          `<b>To put it another way</b>, convenience optimizes the transaction while destroying the experience.`,
          `Wealthy consumers gain effortless comfort; <b>conversely</b>, gig couriers absorb intense physical precarity.`
        ],
        questions: [
          `How does "by the same token" establish a parallel logical consequence?`,
          `What is the difference between "conversely" (opposing dynamic) and "furthermore" (additive point)?`
        ],
        explain: `<p>Master formal transitions to orchestrate long-form arguments: <b>by the same token</b> (for parallel truths), <b>conversely</b> (for inverse relationships), <b>to put it another way</b> (for clarifying reformulation), <b>that is to say</b> (for precision), <b>in like manner</b> (for analogies).</p>`,
        compare: { head: ['Basic transition', 'Advanced discourse marker', 'Dialectical gain'], rows: [['Also, the couriers suffer.', 'By the same token, the hyper-convenience of the consumer is subsidized by the physical precarity of the courier.', 'Deepens the dialectical connection between consumer and worker.']] },
        practice: [
          [`Insert "by the same token": <i>If we value speed, we must accept superficiality; if we desire depth, we must cultivate patience.</i>`, `If we value speed, we must accept superficiality; by the same token, if we desire depth, we must cultivate patience.`, `Connects parallel propositions.`]
        ],
        radar: [
          { wrong: 'On the other token, the app is useful.', right: 'By the same token, the app is useful. / On the other hand...', why: 'The idiom is "by the same token", not "on the other token".' }
        ],
        help: `<p><b>Em português:</b> Marcadores discursivos avançados como <i>by the same token</i> (pela mesma razão / da mesma forma), <i>conversely</i> (em contrapartida) e <i>to put it another way</i> (dito de outro modo) estruturam ensaios longos com clareza.</p>`
      }
    ],
    vocab: [
      ['focal', 'adjective', 'Relating to the center or most important part; in Borgmann’s philosophy, engaging and meaning-generative.', 'Cooking dinner from scratch is a focal practice that brings families together.', 'The hearth served as the focal point of the home.', ['focal practice', 'focal activity', 'focal point'], ['central', 'meaningful', 'unifying'], 'Philosophy of technology adjective.', '/ˈfəʊ.kəl/', 'peripheral'],
      ['ratchet', 'verb / noun', 'To increase or advance by stages in a way that feels irreversible; a mechanism that moves in only one direction.', 'The standard of convenience ratchets upward with every new app.', 'Expectations of instant delivery act as a cultural ratchet.', ['ratchet upward', 'ratchet effect', 'irreversible ratchet'], ['escalate', 'lock in', 'advance'], 'Sociological and economic metaphor.', '/ˈrætʃ.ɪt/', null],
      ['frictionless', 'adjective', 'Achieved with extreme ease; lacking all physical, social, or procedural resistance.', 'Frictionless digital payments encourage impulsive consumer spending.', 'The app promises a frictionless shopping experience.', ['frictionless commerce', 'frictionless interface', 'frictionless delivery'], ['effortless', 'seamless', 'smooth'], 'High-frequency tech adjective.', '/ˈfrɪk.ʃən.ləs/', 'resistant'],
      ['insidious', 'adjective', 'Proceeding in a gradual, subtle way, but with harmful effects.', 'The loss of navigational memory through GPS reliance is an insidious process.', 'Digital addiction spreads in an insidious manner.', ['insidious process', 'insidious effect', 'insidious mutation'], ['stealthy', 'subtle', 'pernicious'], 'Critical descriptive adjective.', '/ɪnˈsɪd.i.əs/', 'straightforward'],
      ['alleviation', 'noun', 'The action of making pain, suffering, or a problem less severe.', 'The washing machine provided the genuine alleviation of domestic exhaustion.', 'Emergency aid contributed to the alleviation of poverty.', ['alleviation of suffering', 'alleviation of drudgery', 'poverty alleviation'], ['relief', 'mitigation', 'easing'], 'Formal noun.', '/əˌliː.viˈeɪ.ʃən/', 'aggravation'],
      ['disembodied', 'adjective', 'Separated from or existing without the physical body or physical reality.', 'Ordering food through a screen is a disembodied economic transaction.', 'She heard a disembodied voice over the intercom.', ['disembodied commodity', 'disembodied experience', 'disembodied presence'], ['intangible', 'incorporeal', 'detached'], 'Philosophical adjective.', '/ˌdɪs.ɪmˈbɒd.id/', 'embodied'],
      ['unalloyed', 'adjective', 'Complete and unreserved; pure; not mixed with any other element.', 'The early elimination of household toil was an unalloyed social good.', 'He felt unalloyed joy upon winning the prize.', ['unalloyed good', 'unalloyed triumph', 'unalloyed pleasure'], ['pure', 'complete', 'unqualified'], 'Formal literary adjective.', '/ˌʌn.əˈlɔɪd/', 'compromised'],
      ['precarity', 'noun', 'The state of having a precarious and insecure existence, especially regarding employment and income.', 'On-demand delivery apps transfer corporate risk into worker precarity.', 'Gig workers face extreme financial precarity.', ['worker precarity', 'economic precarity', 'structural precarity'], ['insecurity', 'vulnerability', 'instability'], 'Sociological noun.', '/prɪˈkeə.rə.ti/', 'security'],
      ['excise', 'verb', 'Cut out or remove completely from something.', 'Tech interfaces aim to excise all delay from the purchasing process.', 'The editor excised three redundant paragraphs.', ['excise friction', 'excise delay', 'cleanly excise'], ['remove', 'cut out', 'eliminate'], 'Formal verb.', '/ɪkˈsaɪz/', 'insert'],
      ['resilience', 'noun', 'The capacity to recover quickly from difficulties; toughness; ability to withstand pressure.', 'Character resilience is developed by enduring friction and delay.', 'The urban ecosystem displayed remarkable ecological resilience.', ['psychological resilience', 'build resilience', 'emotional resilience'], ['toughness', 'tenacity', 'adaptability'], 'High-frequency noun.', '/rɪˈzɪl.jəns/', 'fragility']
    ],
    chunks: [
      ['the Device Paradigm of modern life', 'Albert Borgmann’s theory that technology converts engaged practices into detached commodities.', 'Deploying philosophy of technology', 'Academic · philosophical', 'Borgmann introduced the Device Paradigm of modern life to explain technological alienation.', 'Cite philosophy of tech.', `Under the Device Paradigm of modern life, the hearth is replaced by the central heating thermostat.`, 'Foundational philosophy chunk.'],
      ['focal practices versus disembodied commodities', 'Distinguishing activities that engage skill and body from instant products that require none.', 'Making existential distinctions', 'Philosophical · analytical', 'We must separate meaning-rich focal practices from disembodied commodities.', 'Evaluate digital conveniences.', `Cooking is an embodied focal practice; fast food delivery is a disembodied commodity.`, 'Core Borgmannian distinction.'],
      ['the ratcheting irreversibility of convenience', 'How making a task easier permanently destroys our tolerance for the older, harder method.', 'Diagnosing behavioral change', 'Sociological · critical', 'Tim Wu warns against the ratcheting irreversibility of convenience.', 'Explain habit change.', `The ratcheting irreversibility of convenience makes waiting for a bus feel like an intolerable delay.`, 'Tim Wu concept chunk.'],
      ['subsidized by the hyper-exploitative friction of gig labor', 'Exposing how instant customer ease is purchased through the brutal toil of delivery workers.', 'Unmasking economic exploitation', 'Sociological · investigative', 'Frictionless consumer delivery is subsidized by the hyper-exploitative friction of gig labor.', 'Critique delivery platforms.', `Your fifteen-minute grocery order is subsidized by the hyper-exploitative friction of gig labor in the rain.`, 'Sharp investigative chunk.'],
      ['the acute fragility of character', 'The psychological weakness that results from never encountering delay, boredom, or resistance.', 'Psychological critique', 'Essayistic · psychological', 'Over-optimization produces an acute fragility of character in young consumers.', 'Analyze mental resilience.', `Shielding children from all physical friction fosters an acute fragility of character.`, 'Psychological diagnosis chunk.'],
      ['deliberate friction as a spiritual discipline', 'The conscious choice to do things the slow, engaged way to preserve skill and presence.', 'Proposing mindful resistance', 'Philosophical · personal', 'We must practice deliberate friction as a spiritual discipline against technological passivity.', 'Conclude an essay on technology.', `Relearning how to cook, garden, and walk represents deliberate friction as a spiritual discipline.`, 'Humanistic closing chunk.'],
      ['the spatial and social displacement of human sweat', 'Hiding the manual labor of workers behind a clean digital screen.', 'Deconstructing clean interfaces', 'Critical · rhetorical', 'Convenience is an illusion created by the spatial and social displacement of human sweat.', 'Expose platform myths.', `App interfaces celebrate magic while organizing the spatial and social displacement of human sweat.`, 'Vivid critical metaphor.'],
      ['an unalloyed egalitarian gain', 'A historical technological improvement that was completely beneficial without hidden harms.', 'Acknowledging historical progress', 'Historical · formal', 'Eliminating 19th-century domestic drudgery was an unalloyed egalitarian gain for women.', 'Contrast past and present tech.', `Access to clean municipal water was an unalloyed egalitarian gain for public health.`, 'Nuanced historical assessment.'],
      ['the secular gospel of modern consumer capitalism', 'The unquestioned cultural worship of ease, speed, and frictionless transactions.', 'Cultural critique', 'Essayistic · cultural', 'Convenience has become the secular gospel of modern consumer capitalism.', 'Critique modern habits.', `Under the secular gospel of modern consumer capitalism, any delay is treated as an intolerable failure.`, 'Cultural analysis chunk.'],
      ['restore richness to the human experience', 'Reclaiming engagement, craft, and embodiment to overcome sterile convenience.', 'Affirming existential flourishing', 'Philosophical · concluding', 'Practicing focal activities helps restore richness to the human experience.', 'Conclude on humanistic values.', `By choosing effort over passivity, we restore richness to the human experience in an automated age.`, 'Philosophical closing chunk.']
    ],
    collocations: [
      [`Albert Borgmann introduced the ______ Paradigm of technology.`, [`Device`, `Curve`, `Axis`, `Straitjacket`], 0, `The Device Paradigm is Albert Borgmann’s core concept.`],
      [`Cooking from scratch is an embodied ______ practice that builds community.`, [`focal`, `substantive`, `discretionary`, `regressive`], 0, `Focal practice is Borgmann’s term for meaning-generating engagement.`],
      [`App convenience ratchets ______ with every new software update.`, [`upward`, `backward`, `across`, `aside`], 0, `Ratchet upward describes one-way escalating expectations.`],
      [`Frictionless delivery is ______ by the hyper-exploitative labor of couriers.`, [`subsidized`, `earmarked`, `sanctified`, `offloaded`], 0, `Subsidized by labor describes hidden economic extraction.`]
    ],
    upgrades: [
      [`Apps make life easy, but they make people lazy and lonely.`, `The totalizing ideology of convenience converts meaning-rich focal practices into disembodied commodities, producing psychological fragility and social atomization.`],
      [`Delivery apps are bad because poor couriers have to ride bikes in the rain.`, `Frictionless consumer convenience for affluent urbanites is directly subsidized by the hyper-exploitative friction imposed upon an invisible gig-economy underclass.`],
      [`We should do hard things by hand to feel better.`, `Cultivating deliberate friction through embodied focal practices restores sensory richness, character resilience, and authentic human agency.`]
    ],
    think: {
      title: 'Second-Order Effects, Friction Analysis and the Extended Thinking Lab',
      lead: 'In systems thinking, a first-order effect is immediate and obvious (e.g. food delivery saves 40 minutes); a second-order effect is systemic, delayed, and often perverse (e.g. loss of domestic cooking skills, growth of precarious urban gig labor, family atomization).',
      defs: [
        ['First-order effect', `The immediate, direct, and intended result of an action or technological adoption.`],
        ['Second-order effect', `The indirect, systemic, and delayed consequence produced as the system adapts to the first-order change.`],
        ['Chesterton’s Fence', `The philosophical principle that you should never remove a fence, rule, or friction until you fully understand why it was put there in the first place.`]
      ],
      items: [
        { id: '20t1', type: 'mc', tag: 'Second-order effect check', q: `A city adopts widespread automated GPS navigation for all drivers. First-order effect: drivers reach destinations without looking at maps. What is a major second-order effect?`, options: [`The price of cars becomes zero.`, `The atrophy of human spatial memory and the funneling of massive traffic through quiet residential side-streets by routing algorithms.`, `All traffic lights stop functioning.`, `Gasoline becomes unnecessary.`], answer: 1, explain: `Second-order effects include cognitive spatial deskilling and algorithmic disruption of residential neighborhoods.` },
        { id: '20t2', type: 'open', tag: 'Chesterton’s Fence analysis', q: `Apply Chesterton’s Fence to the "friction" of having to go to a physical library and browse bookshelves: what unmeasured human benefits existed in that physical friction that digital search engines eliminate?`, rows: 5, guide: [`Serendipitous discovery of unexpected books, physical community co-presence, sensory engagement with print, sustained deep focus without pop-up notifications.`] },
        { id: '20t3', type: 'open', tag: 'Steelmanning', q: `Steelman the feminist defense of domestic convenience: explain why romanticizing "focal cooking and washing" can inadvertently disguise the historical subjugation of women.`, rows: 5, guide: [`Acknowledge that manual domestic chores were overwhelmingly unpaid female labor; appliances liberated women to pursue higher education, careers, and financial autonomy.`] },
        { id: '20t4', type: 'open', tag: 'Core synthesis', q: `Formulate a clear diagnostic test for distinguishing between a "healthy convenience" that eliminates pointless drudgery and an "insidious convenience" that destroys a vital focal practice. Illustrate with two examples.`, rows: 6, guide: [`Healthy: eliminates mechanical bodily toil without eliminating meaning (e.g. washing machine); Insidious: eliminates the very craft, skill, and relational presence that gave the activity its intrinsic value (e.g. having AI write love letters or generate personal reflections).`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing a Long-Form Philosophical Essay on Technology (800–1,200 words)',
        text: 'A long-form philosophical essay weaves cultural critique, sociological evidence, and philosophy of technology. You must balance the genuine historical achievements of domestic automation with a profound critique of the Device Paradigm, utilizing ellipsis, substitution, and advanced discourse markers.',
        weak: 'Convenience is bad because people use apps too much and couriers have hard lives.',
        strong: 'While historical appliances achieved an unalloyed egalitarian gain by liberating human beings from backbreaking domestic drudgery, contemporary consumer convenience has mutated into a totalizing ideology that converts meaning-rich focal practices into disembodied commodities, subsidized by the invisible precarity of gig-economy labor.'
      },
      short: {
        kind: 'Philosophical commentary', title: 'The Thermostat versus the Hearth: Borgmann’s Device Paradigm',
        prompt: 'Analyze Albert Borgmann’s distinction between a thing (a hearth) and a device (a thermostat). How does converting an engaged craft into an instant commodity change the character of human life? Use ellipsis and substitution.',
        min: 180, max: 280, support: 'light',
        guide: ['Use ellipsis and pro-form substitution (do so, that of, those of).', 'Incorporate the terms Device Paradigm, focal practice, and disembodied commodity.']
      },
      main: {
        kind: 'Long-form essay', title: 'The Tyranny of the Effortless: Convenience, Labor and the Human Condition',
        prompt: 'Does making life easier always make life better? In an extensive analytical essay of 800–1,200 words, evaluate the existential, psychological, and socioeconomic costs of modern convenience. Contrast the historic liberation from physical drudgery with the modern Device Paradigm, analyze the hidden labor that subsidizes digital platforms, and propose a defense of deliberate friction in contemporary life.',
        min: 800, max: 1200, support: 'light',
        guide: [
          'Section 1 (Introduction): the historic promise of convenience (19th-century appliances) versus its contemporary mutation into the secular gospel of effortlessness.',
          'Section 2 (The Philosophy of Technology): Albert Borgmann’s Device Paradigm, focal practices versus disembodied commodities, and the loss of physical craft.',
          'Section 3 (The Psychology of Frictionlessness): Tim Wu’s ratcheting irreversibility, the atrophy of competence, and the acute fragility of character.',
          'Section 4 (The Socioeconomic Underbelly): the spatial and social displacement of human sweat—how consumer magic is subsidized by gig-worker precarity.',
          'Section 5 (The Counterpoint & Accessibility): defending convenience as an essential lifeline for the disabled, the elderly, and historically overburdened women.',
          'Section 6 (Conclusion): practicing deliberate friction as a discipline to restore sensory depth, craft, and democratic solidarity to human existence.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I sustain an extensive, cohesive argument across 800–1,200 words?',
        'Did I integrate Borgmann’s Device Paradigm and Tim Wu’s analysis of convenience?',
        'Did I use ellipsis and substitution (do so, that of, those of, such) to avoid clumsy repetition?',
        'Did I use advanced discourse markers (furthermore, conversely, by the same token, to put it another way) for fluid transitions?',
        'Did I address the counterpoint on accessibility and gender liberation with historical nuance?'
      ],
      challenges: [
        'Include at least two instances of nominal or comparative substitution using "that of" or "those of".',
        'Include one sentence using the transition "by the same token".',
        'Use the chunks "the Device Paradigm of modern life" and "subsidized by the hyper-exploitative friction of gig labor".'
      ]
    },
    retrieve: {
      content: 'Explain Albert Borgmann’s distinction between a "focal practice" and a "disembodied commodity" in the Device Paradigm.',
      contentGuide: ['Focal practice: engaged bodily/communal craft requiring skill and presence (hearth, cooking); Disembodied commodity: detached instant product hiding machinery (thermostat, food app).'],
      grammar: 'Write two sentences using substitution: one with "do so" and one with "those of".',
      grammarGuide: ['Verify correct pro-form replacement.'],
      reasoning: 'How does the principle of "second-order effects" reveal the hidden costs of food delivery apps?',
      reasoningGuide: ['First-order: saves 40 minutes of cooking; Second-order: loss of culinary craft, family atomization, urban traffic congestion, and gig courier precarity.'],
      cumulative: 'Connect Unit 20 to Units 17–19: how has Module 4 demonstrated that cognitive offloading, algorithmic capture, privacy loss, and convenience are interconnected aspects of digital surveillance capitalism?',
      summary: `<p><b>Main claim:</b> while early technology liberated humans from physical toil, the modern ideology of effortless convenience converts focal practices into disembodied commodities, breeds character fragility, and is subsidized by precarious gig labor.</p><p><b>Grammar:</b> ellipsis, pro-form substitution (do so, that of, those of), and advanced discourse markers (by the same token, conversely) enable seamless long-form argumentative coherence.</p><p><b>Reasoning:</b> evaluate second-order systemic effects, Chesterton’s Fence, and the distinction between liberating accessibility and insidious deskilling.</p>`
    }
  });

  const u = K.units['20'];
  u.listening = [
    {
      id: 'l1', title: 'The Device Paradigm in the Twenty-First Century', format: 'Philosophy seminar discussion',
      file: '/audio/en/unit-20/u19-listening-01.mp3', duration: 140, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two academic speakers (Professor Julian Vance and Dr. Claire Moreau); articulate, philosophical, British and French-influenced English',
      passes: ['First listen · understand how Albert Borgmann’s 1984 book anticipated modern smartphone apps', 'Second listen · contrast focal practices with modern device commodification', 'Third listen · note substitution structures'],
      transcript: `Prof. Vance: Claire, when Albert Borgmann published his Device Paradigm in nineteen eighty-four, he was looking at microwave ovens and central heating. But his framework feels almost prophetic when applied to contemporary on-demand platforms.\n\nDr. Moreau: It is uncanny, Julian. Borgmann’s central thesis was that every technology involves a choice between a “thing” and a “device.” A thing—like a musical instrument or a wood stove—is inseparable from its context. It demands skill, engagement, and patience, and in doing so, it creates a focal practice that enriches human life.\n\nProf. Vance: Whereas a device strips away the practice and delivers only the commodity.\n\nDr. Moreau: Exactly. Look at how we listen to music today. For decades, listening to an album was a focal practice: you traveled to a record store, browsed the vinyl, held the physical sleeve, placed the needle into the groove, and sat with friends listening to forty minutes of cohesive music. Today, streaming algorithms deliver music as a disembodied utility piped into wireless earbuds while we jog. The friction was eliminated, but so was the shared cultural ritual. The music of our lives became identical to running tap water—infinitely available, and by the same token, entirely taken for granted.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core philosophical concept', q: 'How does Dr. Moreau contrast listening to vinyl records with modern streaming under Borgmann’s framework?', options: ['Streaming sounds physically louder than vinyl.', 'Vinyl was an embodied focal practice involving intentionality, physical artifacts, and shared attention, whereas streaming treats music as a disembodied utility.', 'Vinyl was invented by Albert Borgmann.', 'Streaming is legally prohibited in France.'], answer: 1, explain: 'Dr. Moreau shows that vinyl was an engaging focal practice, while streaming reduces music to an unexamined utility.' },
        { id: 'q2', type: 'open', tag: 'Syntactic analysis', q: 'Identify the speaker’s use of "by the same token" and explain what two parallel consequences it connects.', rubric: ['Connects: music becoming infinitely available with music becoming completely taken for granted and devalued'] }
      ]
    },
    {
      id: 'l2', title: 'The Human Cost of Frictionless Delivery', format: 'Investigative documentary interview',
      file: '/audio/en/unit-20/u20-listening-02.mp3', duration: 130, level: 'C1',
      audioReady: false,
      voice: 'Two voices (Interviewer Sarah Jenkins and Gig Worker Advocate Tiago Rocha); urgent, investigative, Brazilian and International English',
      passes: ['First listen · uncover the labor reality behind 15-minute grocery deliveries', 'Second listen · track the contrast between consumer illusion and courier reality'],
      transcript: `Sarah: Tiago, when an urban consumer in São Paulo or London opens an app and orders hot coffee and a pastry to their door in twelve minutes, the marketing promises pure digital magic. What does that twelve-minute window look like from the courier’s perspective?\n\nTiago: It looks like pure physiological and psychological terror, Sarah. That "frictionless" experience for the customer is purchased through extreme physical friction on the street. The algorithm assigns the delivery with an aggressive countdown clock. If the courier is delayed by traffic lights or a broken elevator, the platform penalizes their rating, reducing their future shift allocations.\n\nSarah: So the courier must absorb all the real-world risk?\n\nTiago: Completely. Couriers run red lights, ride through heavy rain on bicycles without brakes, and navigate dangerous intersections at high speed because the algorithm optimizes for the customer’s instant gratification. When a customer pays three reais for delivery, they aren’t paying the real cost of transport; the platform is externalizing the cost onto the courier’s physical body and public safety. Convenience is not the absence of effort; it is the outsourcing of danger to people who have no economic power to say no.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What is Tiago Rocha’s core revelation about 12-minute delivery apps?', options: ['The apps are run entirely by automated drones.', 'Customer frictionlessness is subsidized by algorithmic terror, extreme physical risk, and low pay for couriers on the street.', 'Couriers earn higher wages than airline pilots.', 'Delivery apps will close within one week.'], answer: 1, explain: 'Tiago shows that consumer ease is subsidized by physical danger and algorithmic pressure on couriers.' },
        { id: 'q2', type: 'open', tag: 'Aphorism analysis', q: 'Explain Tiago’s concluding definition: "Convenience is not the absence of effort; it is the outsourcing of danger..."', rubric: ['Explains that physical friction and risk do not vanish', 'Shows that convenience is created by transferring risk, speed pressure, and bodily danger onto vulnerable workers'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'An entrepreneur asserts: “Any company that makes life easier and faster is automatically doing good for humanity; complaining about convenience is just snobbery.” Respond in 60–120 seconds. Deconstruct this claim using Borgmann’s Device Paradigm, explain how customer convenience is subsidized by precarious gig labor, and advocate for the preservation of meaningful focal practices.',
    prepare: 'Keywords only: Device Paradigm (thing vs device) · focal practice vs disembodied commodity · second-order effects · gig labor precarity · deliberate friction. Do not script.',
    grammar: 'Ellipsis and substitution (do so, that of, those of); advanced discourse markers (conversely, by the same token, to put it another way); formal stance hedging',
    targets: ['the Device Paradigm of modern life', 'focal practices versus disembodied commodities', 'subsidized by the hyper-exploitative friction of gig labor', 'deliberate friction as a spiritual discipline'],
    rubric: [
      'Directly and eloquently refutes the entrepreneur’s simplistic equation of speed with human good',
      'Articulates Borgmann’s distinction between focal practices and disembodied commodities',
      'Exposes the hidden labor precarity that subsidizes on-demand consumer apps',
      'Uses accurate substitution and discourse markers to deliver a sophisticated C1 conclusion'
    ]
  };
})(window.KLANG);
