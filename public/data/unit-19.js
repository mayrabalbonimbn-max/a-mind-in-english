/* UNIT 19 · IS PRIVACY BECOMING A LUXURY? */
(function (K) {
  K.units['19'] = K.makeUnit('19', {
    module: 4, title: 'Is privacy becoming', titleEm: 'a luxury?',
    question: 'How much privacy are people willing to exchange for convenience?',
    knowLead: `In the early days of the commercial internet, privacy was conceived as a universal civic right protected by constitutional guarantees and statutory law. Today, privacy has increasingly transformed into a luxury commodity. Wealthy individuals can afford privacy-preserving hardware, paid ad-free subscriptions, encrypted communication suites, and homes insulated from algorithmic surveillance. Lower-income citizens, by contrast, are compelled to surrender their biometric, financial, and behavioral data as the unavoidable price of accessing basic banking, public transportation, welfare benefits, and social connection. Keep the distinction between privacy as a commodity and privacy as a fundamental human right in mind as you read.`,
    terms: [
      ['Surveillance capitalism', `An economic system centered on the commodification of behavioral data extracted from users without explicit, meaningful consent.`],
      ['Privacy divide', `The growing socioeconomic disparity where data privacy is accessible only to those who can afford paid services, while the poor are subjected to mandatory surveillance.`],
      ['Informed consent', `A legal principle requiring that individuals fully understand how their data will be processed, stored, and monetized before agreeing to terms of service.`],
      ['Biometric enclosure', `The mandatory deployment of facial recognition, fingerprint scanning, and location tracking as prerequisites for accessing physical spaces and public services.`],
      ['Panoptic asymmetry', `A structural imbalance where large corporations and state agencies possess total visibility into citizen behavior while their own algorithms remain completely opaque.`]
    ],
    views: [
      'Two perspectives on the trade-off between privacy and technology',
      'The consumer trade-off view',
      `Privacy is a personal preference. Consumers freely choose to exchange their data for free, high-quality digital services, targeted recommendations, and streamlined modern conveniences.`,
      'The structural coercion view',
      `Surveillance is not a voluntary transaction; it is an unnegotiated extraction embedded in the modern infrastructure of daily survival. Framing privacy as a luxury good destroys democratic citizenship.`,
      `The core question is whether privacy can survive as a universal civic right in a society whose economic architecture is built on data extraction.`
    ],
    knowPrompt: `When a public transport system replaces physical tickets with mandatory facial recognition turnstiles, can a commuter truly "consent" to having their biometric data collected?`,
    knowGuide: [
      `Consider whether opting out is possible when transport is essential for employment and survival.`,
      `Reflect on how the illusion of choice disguises infrastructural coercion.`
    ],
    read: {
      main: {
        format: 'Sociological & legal essay', title: 'The Gated Mind: The Emergence of the Privacy Divide',
        standfirst: `In the twenty-first century, privacy is no longer a constitutional baseline. It is becoming an elite commodity available only to those who can pay to disappear.`,
        pull: { after: 5, text: `When privacy is monetized, the poor do not choose to be watched; they are priced out of their dignity.` },
        notes: { 2: `<b>Shoshana Zuboff</b> demonstrated in 2019 how behavioral surplus is extracted from unsuspecting users.`, 6: `<b>The GDPR (General Data Protection Regulation)</b> established European privacy benchmarks in 2018, followed by Brazil’s LGPD in 2020.` },
        paras: [
          `In 1890, future United States Supreme Court Justice Louis Brandeis and attorney Samuel Warren published a landmark essay in the *Harvard Law Review* titled "The Right to Privacy." Writing in response to the invention of instantaneous photography and sensationalist tabloid journalism, they argued that modern civilization required establishing an explicit legal protection for the individual's "right to be let alone." For over a century, democratic legal systems treated privacy not as a commercial product to be bought and sold, but as an indispensable constitutional threshold for human dignity, intellectual autonomy, and political freedom. Without a private sanctuary shielded from public scrutiny, genuine individuality is impossible.`,
          `Over the past two decades, this foundational democratic principle has been quietly overturned by the business model of digital platforms. What was once conceived as a universal human right has been restructured into an expensive luxury commodity. Today, if you possess sufficient financial capital, you can purchase an impressive degree of privacy. You can pay premium subscription fees for ad-free services that do not monetize your data; you can buy high-end hardware manufactured by companies that market data encryption as a luxury feature; you can live in private gated communities shielded from municipal surveillance cameras; and you can hire legal intermediaries to scrub your personal records from commercial data broker registries.`,
          `For the working class and marginalized populations, however, privacy is rapidly becoming an impossible luxury. If you rely on low-cost smartphones, your operating system is funded by pre-installed tracking telemetry that monitors your location and app usage around the clock. If you require social welfare benefits, you are subjected to invasive biometric scans, automated fraud-detection algorithms, and continuous algorithmic auditing. If you commute on urban public transit, you must pass through facial recognition turnstiles where opting out means losing the ability to travel to work. Under this asymmetrical architecture, the poor do not choose to surrender their privacy; they are structurally coerced into surrendering it as the entry fee for modern survival.`,
          `This dynamic produces what sociologists term the "privacy divide"—a sharp socioeconomic cleavage where data protection is stratified by income. In a predatory data market, those with the least economic leverage are forced to absorb the highest surveillance burden. When a gig-economy driver or a warehouse worker applies for employment, their every physical movement, heart rate, and bathroom pause is tracked by corporate management software. Were they to refuse this continuous digital panopticon, they would face immediate termination. The transaction is cloaked in the legal fiction of "voluntary consent," but consent is legally meaningless when the alternative is destitution.`,
          `Furthermore, the erosion of privacy as a universal right inflicts devastating damage on democratic society as a whole. Privacy is not merely an individual entitlement; it is a collective public good. When an entire population is subjected to pervasive behavioral tracking, the capacity for political dissent, labor organizing, and non-conformist thought begins to decay. In a panoptic society, citizens internalize the gaze of the corporate and state watcher, preemptively censoring their speech, modifying their reading habits, and avoiding controversial associations. Had historical civil rights leaders been tracked with contemporary digital telemetry, their movements would have been dismantled before they could organize a single demonstration.`,
          `The commodification of privacy also distorts the legal framework of data protection. Regulations such as the European GDPR and the Brazilian LGPD were enacted with the noble intention of giving users control over their data. Yet in practice, these laws have frequently devolved into a bureaucratic ritual of cookie pop-ups and thirty-page terms of service agreements that ordinary citizens click through without reading. This framework falsely individualizes a systemic problem. It treats surveillance as a series of personal consumer transactions rather than an extractive industrial infrastructure that requires structural prohibition.`,
          `If democratic societies wish to prevent the entrenchment of a permanent surveillance caste system, we must reaffirm that privacy is not a luxury product for the affluent, but an non-negotiable human right. We must ban predatory behavioral monetization, prohibit the mandatory biometric enclosure of public infrastructure, and design digital systems where privacy is the default, immutable architecture for every citizen regardless of their bank account.`
        ]
      },
      counter: {
        format: 'Technological defense', title: 'The Economic Logic of the Data-Supported Commons',
        standfirst: `Demonizing data-driven services ignores the unprecedented global access enabled by ad-supported business models.`,
        paras: [
          `Critics of the modern data economy frequently overlook the extraordinary democratizing achievement of the ad-supported internet. For the past thirty years, billions of people across the developing world have gained free access to world-class navigation, global search engines, educational platforms, translation tools, and real-time communication suites.` ,
          `Had these services been funded exclusively through paid subscriptions, they would have remained the exclusive preserve of wealthy Western elites. The ad-supported model allowed a student in a Brazilian favela to access the exact same search engine and information infrastructure as a professor at Harvard University. Data monetization acted as the economic engine that democratized global knowledge.` ,
          `Furthermore, the collection of aggregated data is essential for modern urban optimization, public security, and public health. Anonymized mobility telemetry allows cities to redesign bus routes, reduce traffic congestion, and track infectious disease outbreaks in real time. Facial recognition in public transit centers has repeatedly prevented violent crimes and located missing children.` ,
          `The sensible regulatory path is not to dismantle the data economy through draconian bans, but to enforce rigorous anonymization standards, transparent audit protocols, and strict firewalls against data abuse. We can preserve the immense social benefits of a data-rich world without sacrificing human safety.`
        ]
      }
    },
    sources: [
      { title: 'The Right to Privacy (Samuel Warren & Louis Brandeis)', url: 'https://daily.jstor.org/the-right-to-privacy/', note: 'The foundational 1890 Harvard Law Review essay establishing the right to be let alone.' },
      { title: 'Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor (Virginia Eubanks)', url: 'https://us.macmillan.com/books/9781250074317/automatinginequality', note: 'Investigative study of automated welfare surveillance on low-income populations.' },
      { title: 'Privacy as a Luxury Good (Kashmir Hill)', url: 'https://theintercept.com/2020/02/07/clearview-ai-facial-recognition-privacy-luxury/', note: 'Analysis of how facial recognition and data brokers stratify privacy by income.' }
    ],
    interpret: [
      { id: '19i1', type: 'mc', tag: 'Main idea', q: `What is the central argument of the main essay regarding data privacy?`, options: [`Privacy is completely dead and everyone should post everything online.`, `Privacy has been transformed from a universal constitutional right into an expensive luxury commodity, forcing lower-income citizens to accept surveillance as the price of survival.`, `Only criminals care about data privacy.`, `European data laws have completely solved all technological problems.`], answer: 1, explain: `The essay demonstrates how privacy has become an elite luxury while lower-income citizens face mandatory surveillance.` },
      { id: '19i2', type: 'mc', tag: 'Inference', q: `Why does the author argue that terms-of-service agreements and cookie pop-ups fail to protect user privacy?`, options: [`Because computer screens are too bright.`, `Because they falsely treat systemic infrastructure as individual consumer choices, forcing users into meaningless consent rituals to access basic services.`, `Because cookies are food, not data.`, `Because nobody has an email address.`], answer: 1, explain: `Individualized consent notices disguise structural coercion as voluntary consumer choices.` },
      { id: '19i3', type: 'tf', tag: 'Detail', q: `According to the author, privacy is purely an individual concern that has no broader impact on collective democratic dissent.`, answer: false, explain: `Paragraph 5 explicitly notes that privacy is a collective public good essential for labor organizing and non-conformist political dissent.` },
      { id: '19i4', type: 'mc', tag: 'Counterpoint argument', q: `What primary justification does the counterpoint offer for the ad-supported data monetization model?`, options: [`It pays higher dividends to bank shareholders.`, `It enabled billions of people worldwide to access free global information, communication, and search tools that would otherwise be restricted to wealthy subscribers.`, `It eliminates the need for computer programming.`, `It makes smartphones lighter in weight.`], answer: 1, explain: `The counterpoint emphasizes that data monetization democratized global access to tools without requiring upfront subscription fees.` },
      { id: '19i5', type: 'open', tag: 'Evidence vs interpretation', q: `What concrete examples does the author provide in paragraph 3 to prove that lower-income citizens face mandatory surveillance?`, rows: 4, guide: [`Examples: low-cost tracking smartphones, biometric welfare scans, fraud algorithms, and facial recognition turnstiles on public transit.`] },
      { id: '19i6', type: 'open', tag: 'Synthesis & comparison', q: `Compare the Warren & Brandeis definition of privacy ("the right to be let alone") with modern data reality. Why is "being let alone" impossible in an interconnected economy?`, rows: 5, guide: [`1890: protection against individual intrusions (photographs, tabloids).`, `Modern: structural surveillance embedded in banking, transit, utilities, and communication infrastructure.`] },
      { id: '19i7', type: 'open', tag: 'Application', q: `Analyze the deployment of facial recognition cameras in Brazilian public transit or street policing (e.g. Rio de Janeiro or São Paulo metro). Who benefits and who bears the risk of false positives?`, rows: 5, guide: [`Benefits: police departments claiming security efficiency.`, `Risks: disproportionate false identification and wrongful arrest of Black and peripheral citizens.`] }
    ],
    notice: [
      {
        title: 'Advanced conditional inversion and mixed conditionals',
        sub: 'Formulating formal counterfactuals and hypothetical policy trade-offs without “if”',
        examples: [
          `<b>Had historical civil rights leaders been tracked</b> with modern telemetry, their movements <b>would have been dismantled</b>. (Third conditional inversion)`,
          `<b>Were citizens to demand</b> strict data protections, platforms <b>would be forced</b> to redesign their business model. (Second conditional inversion)`,
          `<b>Should a commuter refuse</b> the biometric scan, they <b>lose</b> access to public transit. (First conditional inversion)`,
          `If the state <b>had invested</b> in public digital infrastructure ten years ago, privacy <b>would not be</b> a luxury commodity today. (Mixed conditional: past cause, present result)`
        ],
        questions: [
          `How does conditional inversion (*Had we known...*, *Were they to act...*, *Should you encounter...*) elevate formal essay style?`,
          `What is the difference in time frame between a third conditional (past/past) and a mixed conditional (past action/present state)?`
        ],
        explain: `<p>Advanced academic essays use inverted conditional clauses to eliminate colloquial "if" structures:</p><ul><li><b>Past hypothetical (Had + subject + past participle):</b> <i>Had the law prohibited data brokers, this crisis would not have occurred.</i></li><li><b>Present/future hypothetical (Were + subject + to-infinitive):</b> <i>Were platforms to respect privacy, subscription models would thrive.</i></li><li><b>Formal contingency (Should + subject + base verb):</b> <i>Should governments fail to act, the privacy divide will widen.</i></li><li><b>Mixed conditionals:</b> Link an unfulfilled past condition to an ongoing present consequence: <i>If regulations had been enacted in 2005, our data would be safe today.</i></li></ul>`,
        compare: { head: ['Everyday conditional', 'Inverted formal conditional', 'Stylistic gain'], rows: [['If they had banned facial recognition, people would be safer.', 'Had facial recognition been banned, citizens would have been protected from panoptic surveillance.', 'Authoritative legal and analytical tone.'], ['If the user refuses to consent, the app stops working.', 'Should the user refuse consent, the application ceases to function.', 'Professional contractual syntax.']] },
        practice: [
          [`Invert using "Had": <i>If the company had disclosed the data breach, users could have protected themselves.</i>`, `Had the company disclosed the data breach, users could have protected themselves.`, `Inverted third conditional.`],
          [`Invert using "Were": <i>If the parliament were to prohibit behavioral tracking, digital advertising would collapse.</i>`, `Were the parliament to prohibit behavioral tracking, digital advertising would collapse.`, `Inverted second conditional.`],
          [`Formulate a mixed conditional: <i>The state did not regulate algorithms in 2010. Today citizens are vulnerable.</i>`, `Had the state regulated algorithms in 2010, citizens would not be vulnerable today.`, `Mixed conditional (past unfulfilled / present state).`]
        ],
        radar: [
          { wrong: 'Had they know about the tracking, they would complain.', right: 'Had they known about the tracking, they would have complained.', why: 'Inverted third conditional requires past participle (known) and modal perfect (would have complained).' },
          { wrong: 'Were they went to court, they would win.', right: 'Were they to go to court, they would win.', why: 'Inverted second conditional with verbs other than "be" requires "Were + subject + to-infinitive".' }
        ],
        help: `<p><b>Em português:</b> A inversão condicional substitui o <i>if</i> por <i>Had we known...</i> (Se tivéssemos sabido...), <i>Were they to decide...</i> (Se eles decidissem...) e <i>Should you need...</i> (Caso precise...), conferindo elegância clássica ao texto.</p>`
      },
      {
        title: 'Concessive and restrictive discourse markers',
        sub: 'Nuancing rights versus convenience and balancing security against civil liberty',
        examples: [
          `<b>Insofar as</b> data tracking enables urban transit planning, it provides a legitimate public benefit.`,
          `<b>Notwithstanding</b> these security gains, universal biometric surveillance remains unconstitutional.`,
          `The convenience is undeniable; <b>be that as it may</b>, democratic rights cannot be sold.`
        ],
        questions: [
          `How does "insofar as" restrict the scope of an argument?`,
          `What is the formal register of "notwithstanding"?`
        ],
        explain: `<p>Formal analytical discourse uses restrictive connectors (<b>insofar as, to the extent that</b>) and concessive markers (<b>notwithstanding, be that as it may, granted that</b>) to define precise legal and ethical boundaries.</p>`,
        compare: { head: ['Basic linker', 'Formal discourse marker', 'Precision gain'], rows: [['As long as it helps traffic, data is okay.', 'Insofar as telemetry optimizes public transit, it serves a legitimate public interest.', 'Clear legal-philosophical scope.']] },
        practice: [
          [`Rewrite using "Notwithstanding": <i>Despite these economic benefits, the privacy risks are unacceptable.</i>`, `Notwithstanding these economic benefits, the privacy risks remain unacceptable.`, `Uses formal preposition notwithstanding.`]
        ],
        radar: [
          { wrong: 'Insofar that data is collected, it is dangerous.', right: 'Insofar as data is collected, it is dangerous.', why: 'The correct idiom is "insofar as", not "insofar that".' }
        ],
        help: `<p><b>Em português:</b> <i>Insofar as</i> (na medida em que) e <i>notwithstanding</i> (não obstante, a despeito de) definem o escopo de argumentos jurídicos e éticos.</p>`
      }
    ],
    vocab: [
      ['asymmetry', 'noun', 'Lack of equality or equivalence between parts or aspects of something; lack of symmetry.', 'Panoptic asymmetry allows corporations to observe citizens while concealing their own algorithms.', 'The trade agreement suffered from profound regulatory asymmetry.', ['information asymmetry', 'power asymmetry', 'structural asymmetry'], ['imbalance', 'disparity', 'inequality'], 'High-frequency analytical noun.', '/eɪˈsɪm.ə.tri/', 'symmetry'],
      ['commodify', 'verb', 'Turn something into an item of trade or a commercial service.', 'Surveillance capitalism commodifies the intimate details of human behavior.', 'We must not commodify basic human rights.', ['commodify privacy', 'commodify attention', 'commodify data'], ['commercialise', 'marketise', 'monetise'], 'Sociological verb.', '/kəˈmɒd.ɪ.faɪ/', null],
      ['panoptic', 'adjective', 'Permitting the viewing of all parts or elements; characteristic of all-seeing surveillance.', 'Facial recognition networks create a panoptic public space.', 'Workers operate under a panoptic managerial regime.', ['panoptic surveillance', 'panoptic gaze', 'panoptic architecture'], ['all-seeing', 'omnipresent', 'surveillant'], 'Philosophical (Foucault/Bentham) adjective.', '/pænˈɒp.tɪk/', null],
      ['coercion', 'noun', 'The practice of forcing someone to act by using threats, economic pressure, or lack of alternatives.', 'When public transit requires facial scans, consent becomes an act of structural coercion.', 'They signed the contract under financial coercion.', ['structural coercion', 'economic coercion', 'implicit coercion'], ['duress', 'compulsion', 'force'], 'Legal and political noun.', '/koʊˈɜːr.ʒən/', 'voluntariness'],
      ['anonymization', 'noun', 'The process of removing personally identifying information from data sets.', 'Rigorous anonymization is necessary to protect citizen health records.', 'The researchers performed automated data anonymization.', ['data anonymization', 'robust anonymization', 'flawed anonymization'], ['de-identification', 'privacy masking'], 'Data science noun.', '/əˌnɒn.ɪ.maɪˈzeɪ.ʃən/', null],
      ['draconian', 'adjective', 'Excessively harsh, severe, or strict (of laws or measures).', 'Authoritarian regimes impose draconian penalties on digital encryption.', 'Critics warned against draconian internet censorship laws.', ['draconian laws', 'draconian penalties', 'draconian measures'], ['severe', 'harsh', 'punitive'], 'Legal and political adjective.', '/drəˈkəʊ.ni.ən/', 'lenient'],
      ['sanctuary', 'noun', 'A place of refuge, safety, or privacy shielded from intrusion.', 'The private home was traditionally considered a sacred constitutional sanctuary.', 'The park serves as a quiet sanctuary from urban noise.', ['private sanctuary', 'safe sanctuary', 'preserve a sanctuary'], ['refuge', 'haven', 'shelter'], 'High-frequency noun.', '/ˈsæŋk.tʃʊə.ri/', null],
      ['extractive', 'adjective', 'Relating to the withdrawal or extraction of resources or value from a system or community.', 'Data brokers operate an extractive economic model that profits from behavioral surveillance.', 'Colonialism relied on extractive mining institutions.', ['extractive model', 'extractive industry', 'extractive capitalism'], ['exploitative', 'draining', 'extorting'], 'Economic and political adjective.', '/ɪkˈstræk.tɪv/', 'regenerative'],
      ['immutable', 'adjective', 'Unchanging over time or unable to be changed.', 'Privacy should be an immutable architectural default in digital systems.', 'Human rights are not immutable across all historical eras.', ['immutable right', 'immutable principle', 'immutable architecture'], ['unchangeable', 'fixed', 'permanent'], 'Philosophical adjective.', '/ɪˈmjuː.tə.bəl/', 'mutable'],
      ['unnegotiated', 'adjective', 'Not discussed or agreed upon through mutual negotiation; unilaterally imposed.', 'Terms of service represent unnegotiated contracts imposed on users.', 'The treaty contained unnegotiated territorial concessions.', ['unnegotiated contract', 'unnegotiated terms', 'unnegotiated extraction'], ['unilateral', 'non-consensual', 'imposed'], 'Legal and critical adjective.', '/ˌʌn.nɪˈɡəʊ.ʃi.eɪ.tɪd/', 'negotiated']
    ],
    chunks: [
      ['the right to be let alone', 'The classical foundational definition of personal privacy in constitutional law.', 'Invoking constitutional heritage', 'Legal · historical', 'Brandeis defined privacy as the fundamental right to be let alone.', 'Ground modern privacy debates.', `In a digital age of ubiquitous surveillance, the right to be let alone must be defended.`, 'Historic Warren & Brandeis chunk.'],
      ['the commodification of personal privacy', 'Transforming a universal human right into an elite commercial product.', 'Critiquing privacy inequality', 'Critical · analytical', 'We must resist the commodification of personal privacy as a paid luxury.', 'Analyze the privacy divide.', `The commodification of personal privacy leaves low-income citizens vulnerable to continuous surveillance.`, 'Core unit thesis chunk.'],
      ['the legal fiction of voluntary consent', 'Exposing how signing mandatory terms of service is not genuine free choice.', 'Deconstructing legal consent', 'Legal · critical', 'Click-through agreements rely on the legal fiction of voluntary consent.', 'Critique digital contracts.', `When an app is essential for school or work, terms of service operate as a legal fiction of voluntary consent.`, 'Key legal deconstruction chunk.'],
      ['panoptic asymmetry of power', 'The massive imbalance where tech giants monitor citizens while keeping algorithms secret.', 'Diagnosing surveillance imbalance', 'Academic · sociological', 'Surveillance capitalism thrives on a profound panoptic asymmetry of power.', 'Analyze state/corporate power.', `Democratic accountability is destroyed by the panoptic asymmetry of power between citizens and data brokers.`, 'Sociological theory chunk.'],
      ['mandatory biometric enclosure', 'Requiring facial scans or fingerprints as a non-negotiable condition for access.', 'Documenting surveillance expansion', 'Investigative · technological', 'Activists condemned the mandatory biometric enclosure of public transit turnstiles.', 'Critique smart city surveillance.', `The mandatory biometric enclosure of public schools violates student civil liberties.`, 'Modern surveillance terminology.'],
      ['infrastructural coercion', 'Pressure where an individual must surrender rights because the system is indispensable for survival.', 'Explaining unfree choice', 'Sociological · legal', 'Submitting to data tracking is an act of infrastructural coercion in the modern city.', 'Explain lack of alternatives.', `When banking requires biometric apps, citizens face inescapable infrastructural coercion.`, 'Structural analysis chunk.'],
      ['a collective public good, not a private preference', 'Viewing privacy as essential for democracy rather than individual taste.', 'Reframing privacy ethics', 'Philosophical · policy', 'Privacy is a collective public good, not a private preference for the wealthy.', 'Argue for broad regulation.', `We must regulate surveillance because privacy is a collective public good essential for democratic dissent.`, 'Ethical reframing chunk.'],
      ['internalize the gaze of the watcher', 'Modifying and self-censoring behavior due to the awareness of being monitored.', 'Explaining psychological surveillance', 'Psychological · philosophical', 'Under constant tracking, citizens internalize the gaze of the watcher and censor dissent.', 'Describe panoptic psychology.', `Surveillance capitalism forces employees to internalize the gaze of the watcher in the workplace.`, 'Foucaultian psychological chunk.'],
      ['priced out of basic human dignity', 'When essential protections become unaffordable for the working class.', 'Denouncing economic injustice', 'Essayistic · rhetorical', 'Poorer citizens should never be priced out of basic human dignity and privacy.', 'Advocate egalitarian policy.', `In a civilized commonwealth, no human being should be priced out of basic human dignity.`, 'Moral concluding chunk.'],
      ['privacy by default and by design', 'The engineering standard where data protection is built into systems automatically.', 'Proposing architectural reform', 'Technological · legal', 'Legislation must mandate privacy by default and by design across all consumer hardware.', 'Propose technical standards.', `The digital public infrastructure was engineered with privacy by default and by design.`, 'GDPR architectural principle chunk.']
    ],
    collocations: [
      [`Click-through agreements rely on the legal ______ of voluntary consent.`, [`fiction`, `straitjacket`, `cleavage`, `vacuum`], 0, `Legal fiction of consent is a standard legal critique.`],
      [`Digital surveillance creates a severe panoptic ______ of information.`, [`asymmetry`, `hubris`, `patronage`, `propensity`], 0, `Panoptic asymmetry describes the one-sided visibility.`],
      [`Activists opposed the mandatory ______ enclosure of public transport.`, [`biometric`, `substantive`, `discretionary`, `remediable`], 0, `Biometric enclosure refers to facial/fingerprint barriers.`],
      [`Democratic systems must ensure privacy by default and by ______.`, [`design`, `telemetry`, `loophole`, `dichotomy`], 0, `Privacy by design is the international technical standard.`]
    ],
    upgrades: [
      [`If you want privacy today, you have to pay a lot of money for it.`, `Personal privacy has been restructured from a universal constitutional baseline into an expensive luxury commodity.`],
      [`People don't really have a choice when they click 'I accept' on apps.`, `Click-through terms of service agreements perpetuate the legal fiction of voluntary consent under conditions of infrastructural coercion.`],
      [`Cameras everywhere make people afraid to speak their minds.`, `Pervasive biometric surveillance causes citizens to internalize the gaze of the watcher, chilling political dissent and non-conformist thought.`]
    ],
    think: {
      title: 'Weighing Competing Values, Risk Asymmetry and Unintended Consequences',
      lead: 'In technology ethics, evaluating policy requires weighing competing legitimate goods (e.g. public security vs personal privacy) and analyzing how surveillance burdens fall unequally on marginalized groups.',
      defs: [
        ['Chilling effect', `The discouragement or self-censorship of legitimate speech, association, or behavior caused by fear of surveillance or legal sanctions.`],
        ['Risk asymmetry', `A situation where the benefits of a technology accrue to one group (e.g. law enforcement) while the risks of error and harm fall on another (e.g. marginalized citizens).`],
        ['Panoptic internalization', `The psychological process whereby individuals regulate and censor their own behavior because they believe they might be under observation.`]
      ],
      items: [
        { id: '19t1', type: 'mc', tag: 'Chilling effect check', q: `A city installs 10,000 AI facial recognition cameras. Subsequently, attendance at peaceful political protests drops by 60%. What concept best explains this outcome?`, options: [`The chilling effect: citizens self-censor and avoid lawful civic assembly due to fear of state profiling.`, `The Great Gatsby Curve.`, `The substitution fallacy.`, `Goodhart’s Law of metrics.`], answer: 0, explain: `The chilling effect describes how pervasive surveillance discourages citizens from exercising lawful constitutional rights.` },
        { id: '19t2', type: 'open', tag: 'Steelmanning', q: `Steelman the defense of facial recognition cameras in high-crime public transportation hubs. What is the strongest case for their deployment?`, rows: 5, guide: [`Focus on rapid deterrence of violent crime, locating abducted children, identifying organized trafficking networks, and passenger physical safety.`] },
        { id: '19t3', type: 'open', tag: 'Risk asymmetry analysis', q: `Explain why algorithmic facial recognition has higher error rates for darker-skinned individuals, and how this produces risk asymmetry in criminal policing.`, rows: 5, guide: [`Training datasets underrepresent Black/Brown faces, leading to higher false-positive matches; the risk of wrongful detention falls on Black citizens while police claim statistical success.`] },
        { id: '19t4', type: 'open', tag: 'Core synthesis', q: `Why is treating privacy as an "individual consumer preference" fatal to collective democratic freedom? State one structural mechanism.`, rows: 6, guide: [`Surveillance data is network-based: when some people surrender data, it exposes friends, relatives, and colleagues; collective dissent requires unmonitored sanctuary spaces that cannot be bought individually.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an ENEM-Style / Argumentative Essay on Digital Privacy',
        text: 'A top-scoring essay on digital privacy balances the legitimate public benefits of data infrastructure with a profound constitutional defense of human rights. You must deconstruct the "free service" myth, demonstrate structural inequality, and propose concrete regulatory and architectural solutions.',
        weak: 'Companies are spying on us to make money, but nobody cares because TikTok is fun.',
        strong: 'While data telemetry enables valuable public transit and public health optimization, treating privacy as an individualized commodity creates an unjust privacy divide, subjecting lower-income citizens to mandatory surveillance and chilling democratic dissent.'
      },
      short: {
        kind: 'Legal-philosophical briefing', title: 'The Fallacy of Voluntary Consent in Data Extraction',
        prompt: 'Evaluate why standard click-through terms of service agreements represent a "legal fiction of voluntary consent." Use conditional inversion (Had we..., Were platforms...) in your analysis.',
        min: 160, max: 260, support: 'light',
        guide: ['Use inverted conditional syntax (Had, Were, Should).', 'Incorporate the terms infrastructural coercion, privacy divide, and unnegotiated contract.']
      },
      main: {
        kind: 'Argumentative essay (ENEM-style)', title: 'The Gated Sanctuary: Privacy, Inequality and Democratic Agency in the Digital Age',
        prompt: 'To what extent has digital privacy been transformed into a luxury commodity, and what are the consequences for democratic citizenship? Write an essay analyzing the privacy divide, the limits of individual consent, and the structural reforms necessary to ensure privacy by design for all citizens.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: contrast the historical Warren & Brandeis right to be let alone with modern surveillance capitalism, and state your thesis.',
          'Body 1: analyze the emergence of the privacy divide (paid ad-free tiers for the wealthy vs mandatory biometric tracking for the poor).',
          'Body 2: examine the civic and psychological consequences (chilling effect on dissent, internalization of the watcher, erosion of collective public goods).',
          'Body 3: address the counterpoint (ad-supported democratisation of tools, urban transit optimization, public security).',
          'Conclusion: propose concrete structural interventions (prohibition of behavioral advertising, mandatory privacy by design, banning biometric turnstiles).'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I use inverted conditional forms (e.g. "Had the law protected...", "Were citizens to demand...") accurately without "if"?',
        'Did I deploy formal restrictive and concessive markers (insofar as, notwithstanding, be that as it may)?',
        'Did I distinguish between individual consumer preference and privacy as a collective public good?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my essay balance the critique of surveillance capitalism with a realistic policy proposal?'
      ],
      challenges: [
        'Include at least one sentence with conditional inversion ("Had [subject] [participle]...", "Were [subject] to [verb]...").',
        'Use the chunk "the legal fiction of voluntary consent" or "panoptic asymmetry of power".',
        'Ensure that the distinction between ad-supported democratization and predatory surveillance is clearly articulated.'
      ]
    },
    retrieve: {
      content: 'Explain what sociologists mean by the "privacy divide" and give two concrete examples of how it affects low-income citizens.',
      contentGuide: ['Data privacy is commodified as a luxury for those who can pay; the poor face mandatory tracking on transit turnstiles, low-cost phones, and welfare audits.'],
      grammar: 'Write two sentences using conditional inversion: one with "Had + past participle" and one with "Were + to-infinitive".',
      grammarGuide: ['Verify inverted syntax without "if".'],
      reasoning: 'Why is privacy a "collective public good" rather than merely an individual private preference?',
      reasoningGuide: ['Surveillance of individuals exposes network data of others, and pervasive tracking chills collective political organizing and dissent for the whole society.'],
      cumulative: 'Connect Unit 19 to Unit 15: how does the commodification of privacy parallel the regressivity of indirect taxation in shifting burdens to the poor?',
      summary: `<p><b>Main claim:</b> privacy has been restructured from a constitutional right into an elite luxury commodity, trapping lower-income populations in mandatory surveillance and eroding democratic dissent.</p><p><b>Grammar:</b> inverted conditionals (Had we known, Were they to act, Should you encounter) and formal concessive markers (insofar as, notwithstanding) enable sophisticated legal-philosophical analysis.</p><p><b>Reasoning:</b> evaluate risk asymmetry, the chilling effect, and the distinction between individual consent and structural infrastructural coercion.</p>`
    }
  });

  const u = K.units['19'];
  u.listening = [
    {
      id: 'l1', title: 'The Price of Disappearing', format: 'Investigative audio report',
      file: '/audio/en/unit-19/u19-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two journalists (Liam Vance and Clara Santos); investigative, fast-paced, North American and Brazilian English',
      passes: ['First listen · understand how privacy has become a paid commodity', 'Second listen · identify the differences between low-income and luxury hardware ecosystems', 'Third listen · note inverted conditionals'],
      transcript: `Liam: Clara, when Silicon Valley executives talk about privacy on stage today, they don’t sound like civil libertarians defending human rights. They sound like luxury real estate agents selling gated communities.\n\nClara: Exactly, Liam. If you look at hardware marketing over the last three years, privacy has become the primary luxury feature of premium technology. If you can afford an eighteen-hundred-dollar smartphone and thirty dollars a month in encrypted cloud subscriptions, the company promises not to sell your data to third-party brokers. But what happens if you cannot afford those devices?\n\nLiam: You buy a sub-two-hundred-dollar handset where the business model is subsidized by pre-installed diagnostic trackers, data-harvesting keyboards, and continuous location telemetry. Were a low-wage worker to attempt to opt out, they would find that the basic operating system refuses to function without granting full device permissions.\n\nClara: And that is the essence of the privacy divide. Had privacy remained a strictly enforced constitutional right, everyone would receive baseline protection by law. Because we permitted it to become a market commodity, the wealthy purchase encryption and peace of mind, while the working class pays for access with the intimate telemetry of their daily lives.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core investigation', q: 'What marketing trend does Clara identify regarding modern tech hardware?', options: ['Hardware companies have stopped selling smartphones.', 'Privacy has been transformed into a premium luxury selling point for expensive devices, while cheap devices are subsidized by data tracking.', 'All smartphones are now completely free.', 'Encryption has been outlawed by governments.'], answer: 1, explain: 'Clara explains that expensive devices market privacy as a luxury, while cheap devices monetize user tracking.' },
        { id: 'q2', type: 'open', tag: 'Conditional analysis', q: 'Explain Clara’s inverted conditional conclusion: "Had privacy remained a strictly enforced constitutional right..."', rubric: ['Explains that constitutional enforcement would guarantee baseline data protection for every citizen by law', 'Contrasts this with the commodified reality where only the wealthy can afford privacy'] }
      ]
    },
    {
      id: 'l2', title: 'Surveillance in the Welfare State', format: 'Socio-legal lecture',
      file: '/audio/en/unit-19/u19-listening-02.mp3', duration: 120, level: 'C1',
      audioReady: false,
      voice: 'Solo academic lecturer (Professor of Sociology of Law); authoritative, empathetic, British English',
      passes: ['First listen · track how automated welfare algorithms target the poorest citizens', 'Second listen · connect automated auditing to the concept of the digital panopticon'],
      transcript: `When middle-class citizens imagine digital surveillance, they usually think of targeted advertisements for shoes or vacation packages. It feels trivial, mildly annoying, but ultimately harmless. But if you want to see the true, coercive face of surveillance capitalism, you must look at the bottom of the socioeconomic pyramid.\n\nOver the past decade, welfare agencies across North America and Latin America have automated the administration of social benefits. To receive emergency food assistance, unemployment insurance, or housing subsidies, applicants must submit to biometric facial scans, mandatory location tracking on mobile applications, and automated fraud-detection algorithms that cross-reference private bank transactions with utility records.\n\nA wealthy corporate executive who receives millions in state tax subsidies is never subjected to biometric scans or automated lifestyle audits. But a single mother applying for childcare assistance is treated as a permanent suspect. The digital welfare state creates a digital panopticon where the most vulnerable citizens are stripped of their privacy as the non-negotiable condition for biological survival. This is not a voluntary transaction; it is structural extortion.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Sociological critique', q: 'How does surveillance operate differently for wealthy executives versus welfare recipients according to the lecturer?', options: ['Welfare recipients receive more money than executives.', 'Executives receive subsidies without scrutiny, while welfare recipients are subjected to invasive biometric scans and automated fraud audits.', 'Executives are tracked with microchips.', 'Welfare systems use zero technology.'], answer: 1, explain: 'The lecturer exposes the double standard: poor citizens face intensive algorithmic scrutiny to access basic survival aid.' },
        { id: 'q2', type: 'open', tag: 'Ethical evaluation', q: 'Why does the lecturer characterize the digital welfare system as "structural extortion" rather than a voluntary transaction?', rubric: ['Explains that vulnerable citizens must surrender biometric and financial privacy as the non-negotiable price of survival', 'Shows that lack of viable alternatives renders formal consent meaningless'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A digital rights conference debate asks: “Is privacy an outdated nineteenth-century concept that we should abandon in exchange for algorithmic convenience?” Respond in 60–120 seconds. Deconstruct the privacy divide, explain why privacy is a collective public good essential for democratic dissent, and employ advanced conditional inversion (Had we..., Were we to...).',
    prepare: 'Keywords only: privacy as luxury commodity vs public good · privacy divide (wealthy encryption vs poor surveillance) · chilling effect on dissent · conditional inversion · privacy by design. Do not script.',
    grammar: 'Inverted conditionals (Had we abandoned, Were society to accept); restrictive markers (insofar as, notwithstanding); formal stance hedging',
    targets: ['the right to be let alone', 'the commodification of personal privacy', 'the legal fiction of voluntary consent', 'panoptic asymmetry of power'],
    rubric: [
      'Directly and powerfully refutes the claim that privacy is an obsolete concept',
      'Articulates why privacy is a collective public good necessary for democracy rather than an individualized preference',
      'Accurately deploys inverted conditional syntax (Had / Were / Should)',
      'Delivers a compelling, well-reasoned defense of privacy by default and by design'
    ]
  };
})(window.KLANG);
