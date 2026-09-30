/* UNIT 11 · WHO GETS HEARD IN A DEMOCRACY? */
(function (K) {
  K.units['11'] = K.makeUnit('11', {
    module: 3, title: 'Who gets heard', titleEm: 'in a democracy?',
    question: 'Is having the right to speak enough to guarantee meaningful political participation?',
    knowLead: `Democracy is often defined as the universal right to vote and speak freely. However, political scientists distinguish between formal rights and substantive participation. When the capacity to capture attention is unequal, having the right to speak does not mean being heard. Keep the distinction between procedural access and communicative power in mind as you read.`,
    terms: [
      ['Procedural democracy', `A system defined by formal rules, regular elections and universal voting rights, regardless of actual inequality in political influence.`],
      ['Substantive participation', `The real, effective capacity of citizens to shape collective decisions, deliberate together and influence public policy.`],
      ['Epistemic injustice', `A wrong done to someone specifically in their capacity as a knower, such as dismissing their testimony because of prejudice or lacking the shared concepts to make their experience intelligible.`],
      ['Deliberative democracy', `A model of democracy where legitimate political decisions emerge from public discussion, reasoned argument and mutual justification, not merely counting votes.`],
      ['Attentional inequality', `The severe disparity in who can command public attention and frame the political agenda in a media-saturated environment.`]
    ],
    views: [
      'Two visions of democratic participation',
      'The aggregative view',
      `Democracy is a mechanism for registering and counting preferences. The central goal is universal procedural access: one person, one vote, and freedom of expression.`,
      'The deliberative view',
      `Democracy requires equal capacity to be heard, deliberate and challenge power. Without conditions for meaningful public reasoning, voting merely formalises existing inequality.`,
      `The question is whether equal procedural rights are sufficient when economic and communicative power remain deeply unequal.`
    ],
    knowPrompt: `Can a citizen possess full freedom of speech and yet suffer meaningful political silencing? Describe one real-world mechanism that produces this outcome.`,
    knowGuide: [
      `Distinguish legal censorship from structural inattention or dismissal.`,
      `Consider whose testimony is treated as authoritative in public debates.`
    ],
    read: {
      main: {
        format: 'Reflective essay', title: 'The Architecture of Voice',
        standfirst: `The law guarantees your right to speak. It says nothing about who builds the room, who controls the acoustics, or who decides which voices sound like noise.`,
        pull: { after: 6, text: `In a crowded public sphere, the most effective form of censorship is not silence. It is volume.` },
        notes: { 3: `<b>Epistemic credibility</b> is the default trust granted to a speaker based on status and perceived authority.`, 7: `<b>Agenda-setting</b> refers to the power to decide which topics are discussed rather than what people think about them.` },
        paras: [
          `Every modern constitution protects the freedom to speak. It is an indispensable threshold, won through centuries of resistance against monarchies and dictatorships. Yet in the daily life of contemporary democracies, freedom of speech is frequently confused with communicative power. A citizen standing on a street corner has the same constitutional protection as a media conglomerate with a million-dollar broadcast budget. To say that both possess equal freedom of speech is technically true and substantively vacuous. The law protects the utterance; society distributes the audience.`,
          `Political theorists often speak of the public sphere as if it were a clean, well-lit plaza where arguments meet on their merits. But the public sphere is an architecture, built with materials that are neither neutral nor randomly distributed. The microphones are expensive, the room is deafeningly loud, and the rules of evidence are written by those who have spent generations in universities. A person who speaks without the required credentials, the accepted register, or the financial resources to amplify their voice is not forbidden from speaking. They are simply drowned out.`,
          `Philosopher Miranda Fricker introduced the term “epistemic injustice” to describe what happens when a speaker is unfairly dismissed. When an impoverished worker reports systemic wage theft, their testimony is frequently treated as biased, emotional or unreliable, while an employer's denial is granted the dignity of an objective audit. The worker has not been censored by the state; they have suffered a credibility deficit. Their words were permitted, but their meaning was neutralized at the point of reception.`,
          `This problem has intensified in the digital age. Early internet optimists predicted that social media platforms would democratize voice by eliminating gatekeepers. Anyone with a smartphone could publish their thoughts to the world. What actually occurred was a dramatic expansion of noise. When speech becomes infinite and costless, attention becomes the rarest commodity. The platforms did not create equal voices; they created algorithms that reward outrage, spectacle and well-funded coordination.`,
          `In this attention economy, the most effective form of censorship is no longer silencing an opponent through state force. It is flooding the public space with contradictory claims, inflammatory falsehoods, and manufactured controversies until genuine critique becomes impossible to track. Authoritarian regimes and cynical political actors have learned that you do not need to imprison a dissenter if you can ensure that their voice is buried under ten thousand automated bot posts.`,
          `There is also a register trap. Democratic debate frequently demands that citizens express their grievances in the calm, detached vocabulary of policy analysis. Those who speak with anger, grief or moral urgency are dismissed as irrational or uncivil. Yet this requirement for emotional restraint serves a conservative function: it privileges those whose material lives are secure enough to treat structural injustice as an intellectual puzzle. Civility becomes a barrier to hearing rather than an invitation to dialogue.`,
          `A genuine democracy cannot rest on the passive guarantee that the police will not arrest you for your opinions. It requires an active commitment to building institutional acoustics where all citizens have the material and educational resources to participate in collective self-determination. Until we treat listening as a public responsibility rather than an accidental market outcome, the right to speak will remain a decorative promise.`
        ]
      },
      counter: {
        format: 'Methodological critique', title: 'The Limits of Deliberative Idealism',
        standfirst: `Demanding that democracy equalise communicative influence before making decisions risks replacing elections with intellectual elitism.`,
        paras: [
          `Critics of procedural democracy are right to observe that economic power distorts public debate. However, their proposed alternative—deliberative democracy—carries its own hidden paternalism. In practice, deliberation rewards those who have mastered abstract reasoning, specialized vocabulary and the rhetoric of committee meetings.`,
          `When political legitimacy is made conditional on the quality of public discussion rather than the counting of votes, power tends to migrate toward educated professionals and policy experts. The ballot box, for all its limitations, remains the only truly egalitarian mechanism ever invented: the vote of a billionaire and the vote of an illiterate farmworker count exactly the same.`,
          `Furthermore, measuring whether a citizen has been “genuinely heard” is epistemically impossible. If a majority votes against a policy after listening to its proponents, have they failed to listen, or have they simply disagreed? Conflating disagreement with exclusion is a common temptation of intellectuals who believe that their arguments are self-evidently correct.`,
          `The defense of procedural democracy is not that it achieves perfect justice, but that it prevents tyranny. Clear rules, competitive elections and formal free speech protections provide a robust floor. We should work to reduce economic inequality, but we must not weaken the authority of simple majority voting in the name of an idealized, unattainable consensus.`
        ]
      }
    },
    sources: [
      { title: 'Epistemic Injustice: Power and the Ethics of Knowing (Miranda Fricker)', url: 'https://academic.oup.com/book/26917', note: 'Foundational text on testimonial injustice and credibility deficits.' },
      { title: 'The Structural Transformation of the Public Sphere (Jürgen Habermas)', url: 'https://mitpress.mit.edu/9780262581080/', note: 'Classic analysis of public deliberation and media commercialisation.' },
      { title: 'The Problem of Free Speech in an Age of Disinformation (Zeynep Tufekci)', url: 'https://www.wired.com/story/free-speech-issue-tech-censorship-disinformation/', note: 'Censorship via attentional flooding in digital spaces.' }
    ],
    interpret: [
      { id: '11i1', type: 'mc', tag: 'Main idea', q: `What is the central argument of the main essay?`, options: [`Freedom of speech is harmful and should be replaced by state censorship.`, `Formal legal protections for speech are insufficient without structural conditions that allow all voices to be heard and taken seriously.`, `Social media has successfully democratized political deliberation across all demographics.`, `Voting should be restricted to citizens who can pass a deliberative reasoning test.`], answer: 1, explain: `The essay argues that legal protection of speech is a necessary floor, but communicative power and epistemic credibility remain deeply unequal.` },
      { id: '11i2', type: 'mc', tag: 'Inference', q: `Why does the writer argue that censorship in the digital era operates through “volume” rather than silence?`, options: [`Because microphones are louder than they used to be.`, `Because flooding the media ecosystem with noise and bots buries legitimate critique without requiring formal bans.`, `Because governments have stopped censoring all forms of speech.`, `Because citizens prefer louder speakers.`], answer: 1, explain: `Paragraph 5 explains that attentional flooding neutralizes speech by rendering critique invisible amidst manufactured noise.` },
      { id: '11i3', type: 'tf', tag: 'Detail', q: `The writer considers demands for polite and calm civility to be completely politically neutral in all contexts.`, answer: false, explain: `Paragraph 6 argues that civility requirements often serve a conservative gatekeeping function against marginalized groups.` },
      { id: '11i4', type: 'mc', tag: 'Counterpoint argument', q: `What is the primary danger of deliberative democracy identified in the counterpoint?`, options: [`It eliminates elections entirely.`, `It risks empowering educated intellectual elites who dominate verbal argumentation over ordinary voters.`, `It requires too much money to fund podcasts.`, `It causes economic recessions.`], answer: 1, explain: `The counterpoint notes that deliberation inherently privileges those with specialized vocabularies and elite academic training.` },
      { id: '11i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 3, what observable fact does the author present, and what structural interpretation does she derive from it?`, rows: 4, guide: [`Fact: wage theft complaints from workers are often met with skepticism, while official audits are trusted by default.`, `Interpretation: this reflects epistemic injustice and an institutional credibility deficit rather than individual malice.`] },
      { id: '11i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the counterpoint defend the traditional ballot box against the main essay’s critique of procedural democracy?`, rows: 5, guide: [`Notes that one-person-one-vote treats all citizens identically regardless of verbal eloquence or academic credentials.`, `Argues that procedures protect against authoritarianism and intellectual paternalism.`] },
      { id: '11i7', type: 'open', tag: 'Application', q: `Give one concrete example of how attentional inequality operates in Brazilian political debate.`, rows: 5, guide: [`Consider campaign financing, media dominance, bot farms, or indigenous/peripheral community representation.`, `Focus on the mechanism of attention rather than just opinions.`] }
    ],
    notice: [
      {
        title: 'Passive voice and impersonal structures in academic argument',
        sub: 'Defocusing the agent to highlight systems, mechanisms and institutional patterns',
        examples: [
          `Freedom of speech <b>is frequently confused with</b> communicative power.`,
          `Their testimony <b>is treated as</b> biased.`,
          `It <b>is widely maintained that</b> formal rights guarantee equity.`,
          `Power <b>has been shown to migrate</b> toward credentialed groups.`
        ],
        questions: [
          `Why does the writer say “Their testimony is treated as biased” instead of “Officials treat their testimony as biased”?`,
          `How does impersonal passive like “It is argued that...” differ from “I argue that...”?`,
          `When does agent omission hide responsibility instead of clarifying a systemic process?`
        ],
        explain: `<p>In formal analysis, the passive voice allows a writer to foreground the <b>receiver, process or system</b> rather than individual agents: <i>The public sphere is built with unequal materials</i>.</p><p>Impersonal passive reporting frames (<b>it is argued that, it is assumed that, it has been observed that</b>) create objective, analytical distance. However, careful writers ensure that omitting the agent does not disguise institutional responsibility when naming the perpetrator matters.</p>`,
        compare: { head: ['Active', 'Impersonal / Passive', 'Rhetorical effect'], rows: [['People often confuse rights with power.', 'Rights are often confused with power.', 'Focuses on the conceptual error as a systemic phenomenon.'], ['Companies ignore worker complaints.', 'Worker complaints are systematically deprioritised.', 'Emphasises structural pattern rather than single company.']] },
        practice: [
          [`Rewrite using an impersonal passive frame: <i>Many analysts believe that digital algorithms distort democratic debate.</i>`, `It is widely believed that digital algorithms distort democratic debate.`, `Impersonal passive with “it is believed that”.`],
          [`Rewrite in the passive to foreground the affected group: <i>The media ignored indigenous representatives during the summit.</i>`, `Indigenous representatives were ignored by the media during the summit.`, `Foregrounds the affected representatives.`],
          [`Correct the stylistic flaw: <i>It was by the government decided to silence critics.</i>`, `It was decided by the government to silence critics.`, `Correct word order for passive reporting verb.`]
        ],
        radar: [
          { wrong: 'It is argued by many people that voting is obsolete.', right: 'It is argued that voting is obsolete.', why: 'Avoid clumsy “by many people” in impersonal passive constructions.' },
          { wrong: 'The speech was spoke in public.', right: 'The speech was delivered in public.', why: 'Choose formal collocation: deliver a speech.' }
        ],
        help: `<p><b>Em português:</b> Estruturas impessoais como <i>it is argued that</i> (argumenta-se que) ou a voz passiva analítica conferem rigor e sobriedade ao texto argumentativo em inglês, evitando generalizações informais como <i>people think</i> ou <i>they say</i>.</p>`
      },
      {
        title: 'Nominalisation and abstract stance',
        sub: 'Turning actions into concepts to build analytical density',
        examples: [
          `They drowned out voices → <b>The expansion of attentional noise</b>.`,
          `People dismiss workers → <b>A credibility deficit</b>.`
        ],
        questions: [
          `What happens to sentence rhythm when verbs become abstract nouns?`,
          `How does nominalisation allow a writer to package complex concepts into sentence subjects?`
        ],
        explain: `<p>Nominalisation transforms verbs and adjectives into nouns: <i>participate → participation, exclude → exclusion, credulous → credibility</i>. It allows writers to treat complex human processes as stable objects of inquiry and link them in causal arguments.</p>`,
        compare: { head: ['Action clause', 'Nominalised structure', 'Analytical advantage'], rows: [['Because platforms flood the space with noise, people cannot think.', 'The expansion of attentional noise impedes critical evaluation.', 'Creates a compact, academic causal claim.']] },
        practice: [
          [`Nominalise: <i>When platforms flood the public space with noise, citizens become disoriented.</i>`, `The flooding of the public space with attentional noise leads to citizen disorientation.`, `Combines nominalised processes into a concise causal sentence.`]
        ],
        radar: [
          { wrong: 'The utilization of the implementation of the policy...', right: 'Implementing the policy...', why: 'Do not stack excessive nominalisations that create bureaucratic opacity.' }
        ],
        help: `<p><b>Em português:</b> A nominalização transforma orações ativas em substantivos abstratos (<i>exclude → exclusion</i>), permitindo encadear teses com densidade acadêmica.</p>`
      }
    ],
    vocab: [
      ['substantive', 'adjective', 'Having genuine importance, reality or value; not merely formal or illusory.', 'To say that both possess equal freedom of speech is technically true and substantively vacuous.', 'The reform produced substantive gains in civic participation.', ['substantive equality', 'substantive democracy', 'substantive reform', 'substantive progress'], ['real', 'meaningful', 'tangible'], 'Formal academic vocabulary.', '/səbˈstæn.tɪv/', 'nominal'],
      ['deficit', 'noun', 'A lack or deficiency in an expected amount or quality.', 'Their testimony suffers from an unfair credibility deficit.', 'The institution faces a severe democratic deficit.', ['credibility deficit', 'democratic deficit', 'attentional deficit', 'trust deficit'], ['shortfall', 'deficiency', 'lack'], 'Common in political and economic commentary.', '/ˈdef.ɪ.sɪt/', 'surplus'],
      ['vacuous', 'adjective', 'Lacking substance, thought or meaningful content.', 'Formal equality without material resources is substantively vacuous.', 'His speech was full of vacuous platitudes.', ['vacuous promise', 'vacuous claim', 'vacuous slogan', 'vacuous debate'], ['empty', 'meaningless', 'shallow'], 'Academic evaluation of weak rhetoric.', '/ˈvæk.ju.əs/', 'meaningful'],
      ['paternalism', 'noun', 'The policy or practice of restricting autonomy in perceived best interest.', 'Deliberative models risk falling into intellectual paternalism.', 'She rejected the paternalism of state welfare managers.', ['state paternalism', 'benevolent paternalism', 'intellectual paternalism'], ['condescension', 'overprotection'], 'Political philosophy term.', '/pəˈtɜː.nəl.ɪ.zəm/', 'autonomy'],
      ['disenfranchise', 'verb', 'Deprive someone of the right to vote or of genuine political agency.', 'Attentional inequality effectively disenfranchises poorer citizens.', 'Voter ID laws disenfranchise vulnerable communities.', ['disenfranchise voters', 'systematically disenfranchise', 'politically disenfranchised'], ['marginalise', 'disempower'], 'Used both literally and metaphorically.', '/ˌdɪs.ɪnˈfræn.tʃaɪz/', 'enfranchise'],
      ['deliberation', 'noun', 'Long and careful consideration or discussion before reaching a decision.', 'Democratic legitimacy depends on substantive public deliberation.', 'The jury concluded its deliberation after three days.', ['public deliberation', 'deliberative process', 'collective deliberation'], ['discussion', 'consultation', 'debate'], 'Central concept in modern political theory.', '/dɪˌlɪb.əˈreɪ.ʃən/', 'impulsiveness'],
      ['coercion', 'noun', 'The practice of persuading someone to do something using force or threats.', 'The state relies on structural incentives rather than overt coercion.', 'Consent obtained through economic coercion is illegitimate.', ['overt coercion', 'state coercion', 'economic coercion'], ['compulsion', 'force', 'intimidation'], 'Core legal and political term.', '/koʊˈɜːr.ʒən/', 'persuasion'],
      ['gatekeeper', 'noun', 'A person or institution that controls access to something, such as media coverage.', 'Traditional editorial gatekeepers have been replaced by engagement algorithms.', 'Publishers once acted as cultural gatekeepers.', ['institutional gatekeeper', 'media gatekeeper', 'algorithmic gatekeeper'], ['filter', 'arbiter', 'controller'], 'Sociology and media studies term.', '/ˈɡeɪtˌkiː.pər/', null],
      ['neutralise', 'verb', 'Render something ineffective or harmless by applying an opposite force.', 'Their criticism was neutralised at the point of reception.', 'The policy was designed to neutralise opposition.', ['neutralise criticism', 'neutralise resistance', 'effectively neutralise'], ['counteract', 'negate', 'nullify'], 'Analytical verb for power dynamics.', '/ˈnjuː.trə.laɪz/', 'amplify'],
      ['indispensable', 'adjective', 'Absolutely necessary; impossible to be without.', 'Procedural safeguards are an indispensable foundation for freedom.', 'Trust is indispensable to democratic governance.', ['indispensable condition', 'indispensable component', 'prove indispensable'], ['essential', 'vital', 'crucial'], 'High-frequency academic adjective.', '/ˌɪn.dɪˈspen.sə.bəl/', 'dispensable']
    ],
    chunks: [
      ['technically true and substantively vacuous', 'Describing a claim that is formally accurate but meaningless in reality.', 'Distinguishing formal letter from lived substance', 'Formal · analytical', 'The guarantee is technically true and substantively vacuous when access is priced out.', 'Evaluate a formal policy that fails in practice.', `A formal right to appeal is technically true and substantively vacuous when court fees exceed a worker's monthly wage.`, 'Highlights the gap between procedure and reality.'],
      ['neutralised at the point of reception', 'Describing a message that is heard but immediately stripped of authority.', 'Explaining epistemic dismissal', 'Formal · academic', 'The warning was neutralised at the point of reception because of social stigma.', 'Describe how an expert testimony was ignored.', `Her empirical findings were neutralised at the point of reception by political partisans who dismissed her data as ideological.`, 'Shows how prejudice prevents understanding.'],
      ['a necessary floor, not a decorative ceiling', 'Clarifying that a minimum condition is essential but not sufficient.', 'Setting baseline versus optimal conditions', 'Essayistic · rhetorical', 'Procedural free speech is a necessary floor, not a decorative ceiling for justice.', 'Discuss legal guarantees versus actual reform.', `Clean elections are a necessary floor, not the final realization of democratic equity.`, 'Powerful metaphor for constitutional analysis.'],
      ['the public sphere is an architecture, not a plaza', 'Emphasising that debate environments are intentionally structured by power.', 'Deconstructing neutral space myths', 'Analytical · critical', 'The public sphere is an architecture shaped by commercial priorities.', 'Critique digital platforms.', `Social media is an architecture optimized for engagement rather than civic deliberation.`, 'Reframes debate platforms as engineered spaces.'],
      ['migrate toward credentialed groups', 'Describing how power or influence concentrates among educated elites.', 'Tracking institutional power shift', 'Academic · sociological', 'Deliberative authority tends to migrate toward credentialed groups with time to argue.', 'Describe professional dominance.', `Influence in policy forums inevitably migrates toward credentialed groups who master bureaucratic terminology.`, 'Analyzes technocratic consolidation.'],
      ['suffers from a credibility deficit', 'Experiencing structural skepticism or lack of trust based on social identity.', 'Naming epistemic bias', 'Formal · analytical', 'Witnesses from informal settlements frequently suffer from a credibility deficit in court.', 'Analyze testimony reception.', `Whistleblowers without corporate credentials often suffer from an acute credibility deficit.`, 'Miranda Fricker’s core concept.'],
      ['privileges those whose material lives are secure', 'Showing how certain debate norms secretly favor the wealthy.', 'Unmasking hidden bias', 'Critical · analytical', 'The demand for emotional detachment privileges those whose material lives are secure from immediate harm.', 'Critique civility politics.', `Demanding endless patience privileges those whose material lives are secure enough to wait decades for reform.`, 'Exposes unequal stakes.'],
      ['conflate disagreement with exclusion', 'Confusing an honest difference of opinion with systemic denial of voice.', 'Clarifying argumentative boundaries', 'Analytical · debating', 'We must not conflate disagreement with exclusion whenever a vote goes against us.', 'Warn against conceptual blurring.', `Political commentators often conflate disagreement with exclusion when voters reject technocratic advice.`, 'Key distinction for democratic debate.'],
      ['drown out critical voices', 'Overwhelming dissent through massive volume or algorithmic distraction.', 'Explaining attentional flooding', 'Essayistic · analytical', 'The state relied on bot networks to drown out critical voices before the election.', 'Describe information warfare.', `Coordinated disinformation campaigns drown out critical voices without requiring direct state censorship.`, 'Attentional mechanism.'],
      ['collective self-determination', 'The capacity of a community to govern itself through shared democratic institutions.', 'Affirming democratic ideals', 'Formal · political philosophy', 'Genuine democracy requires conditions for meaningful collective self-determination.', 'State democratic purpose.', `Universal suffrage is designed to secure the conditions for collective self-determination.`, 'Philosophical anchor term.']
    ],
    collocations: [
      [`The law provides a formal right, but citizens lack ______ participation.`, [`substantive`, `decorative`, `nominal`, `passive`], 0, `Substantive participation is the established philosophical term for meaningful engagement.`],
      [`Marginalised witnesses often suffer an unfair credibility ______.`, [`deficit`, `gap`, `leak`, `debt`], 0, `Credibility deficit is Miranda Fricker’s precise formulation.`],
      [`The proposed bill offers only a ______ promise of equality.`, [`vacuous`, `dense`, `fragile`, `stout`], 0, `Vacuous promise describes something without real content.`],
      [`Procedural voting rules are an ______ condition for democratic legitimacy.`, [`indispensable`, `optional`, `accidental`, `ephemeral`], 0, `Indispensable condition is a standard philosophical collocation.`]
    ],
    upgrades: [
      [`Poor people have free speech, but nobody listens to them.`, `While freedom of speech is formally guaranteed to all, marginalized groups face severe attentional and epistemic deficits.`],
      [`The debate is not fair because platforms want clicks.`, `Public deliberation is structurally distorted by platform architectures engineered to maximise outrage and engagement.`],
      [`People argue that voting is the only thing that matters.`, `It is widely maintained that procedural ballot access exhausts the requirements of democratic participation.`]
    ],
    think: {
      title: 'Premise, Conclusion and Procedural Fallacies',
      lead: 'In political philosophy, an argument is valid only if its premises genuinely support its conclusion without relying on unexamined assumptions.',
      defs: [
        ['Procedural fallacy', `The error of assuming that because a procedure was followed formally, the outcome is automatically just.`],
        ['Epistemic exclusion', `The systematic practice of excluding certain knowers or perspectives from agenda-setting and validation.`]
      ],
      items: [
        { id: '11t1', type: 'mc', tag: 'Validity check', q: `<i>"Premise 1: All citizens have the legal right to publish their opinions online.<br>Conclusion: Therefore, all citizens have equal influence over the political agenda."</i><br>What is the fatal flaw in this argument?`, options: [`It assumes that the legal right to publish equates to equal capacity to command attention and influence listeners.`, `It ignores the cost of computers.`, `It assumes that all citizens know how to spell.`, `It forgets that newspapers still exist.`], answer: 0, explain: `The argument commits a classic procedural fallacy by equating legal entitlement with effective communicative power.` },
        { id: '11t2', type: 'open', tag: 'Steelmanning', q: `Reconstruct the strongest possible argument in favor of the counterpoint’s view that the simple ballot box is safer than deliberative forums.`, rows: 5, guide: [`Emphasise that voting prevents intellectual elitism, avoids subjective qualification tests, and gives every person exactly one identical lever of power.`] },
        { id: '11t3', type: 'open', tag: 'Distinction', q: `Distinguish between “active censorship” by a state and “structural marginalisation” by an attention economy.`, rows: 4, guide: [`Active censorship uses coercion, bans or prison; structural marginalisation uses algorithmic amplification, financial barriers and credibility deficits.`] },
        { id: '11t4', type: 'open', tag: 'Core synthesis', q: `When does a procedural democratic safeguard become an obstacle to substantive equality? State one clear principle and illustrate it with an example.`, rows: 6, guide: [`Explain how rigid adherence to formal neutrality can preserve pre-existing inequalities by ignoring unequal starting positions.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Balancing Structural Critique with Democratic Pragmatism',
        text: 'A C1 analytical essay should neither naively celebrate formal democratic rights nor dismiss them as meaningless illusions. You must acknowledge the indispensability of procedural protections while critiquing the structural inequalities that hollow them out.',
        weak: 'Freedom of speech is a lie because big corporations control the internet and politicians only care about rich people.',
        strong: 'While constitutional free speech guarantees establish an indispensable barrier against overt state coercion, they remain substantively incomplete in the absence of institutional mechanisms that mitigate severe attentional and economic inequalities.'
      },
      short: {
        kind: 'Policy evaluation', title: 'Epistemic justice in public consultations',
        prompt: 'Evaluate a municipal proposal to hold town hall meetings exclusively on weekday afternoons in a downtown government building. Who is formally included, who is substantively excluded, and how should the procedure be redesigned?',
        min: 150, max: 250, support: 'light',
        guide: ['Identify formal equality vs practical barriers (work hours, transport, childcare).', 'Use at least two terms from KNOW (substantive participation, credibility, procedural).']
      },
      main: {
        kind: 'Argumentative essay', title: 'Democratic Voice in the Attention Economy',
        prompt: 'To what extent does the digital public sphere expand democratic participation, and to what extent does it merely replace state censorship with algorithmic noise and attentional inequality? Write a sustained, well-hedged analytical essay defending a clear thesis.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Opening: define the tension between universal publishing rights and commodified attention.',
          'Body Paragraph 1: acknowledge the genuine democratising affordances (lowered publishing costs, grassroots organizing).',
          'Body Paragraph 2: examine the structural mechanisms of distortion (epistemic injustice, algorithmic flooding, outrage incentives).',
          'Body Paragraph 3: address the counterpoint (the risks of elite paternalism in curated deliberation).',
          'Conclusion: propose what substantive democratic acoustics require beyond formal free speech.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I distinguish formal legal freedom from substantive communicative power?',
        'Did I avoid treating all online speech as either purely liberating or purely toxic?',
        'Are my passive and impersonal structures grammatically accurate and rhetorically purposeful?',
        'Did I integrate at least three STEAL structures without awkwardness?',
        'Is my thesis clearly stated in the opening and deepened in the conclusion?'
      ],
      challenges: [
        'Replace any generic phrase like “people think” with an impersonal passive reporting structure.',
        'Include one sentence using “technically true and substantively vacuous”.',
        'Ensure that every claim of institutional distortion is backed by a specific mechanism (e.g., algorithmic amplification, credibility deficits).'
      ]
    },
    retrieve: {
      content: 'Reconstruct Miranda Fricker’s concept of epistemic injustice and explain how it differs from traditional state censorship.',
      contentGuide: ['Focus on testimonial credibility deficits, prejudicial reception, and structural dismissal rather than direct coercive bans.'],
      grammar: 'Write two sentences using impersonal passive reporting structures (e.g., “It is argued that...”, “Power is reported to...”) about democratic debate.',
      grammarGuide: ['Check agreement, passive participle and formal register.'],
      reasoning: 'Explain why equating formal legal entitlement with substantive capability commits a procedural fallacy.',
      reasoningGuide: ['Show how equal formal permission does not guarantee equal material capacity to act or be heard.'],
      cumulative: 'Connect Unit 11 to Unit 07: how does agenda-setting in the media interact with epistemic credibility in political discourse?',
      summary: `<p><b>Main claim:</b> freedom of speech is a necessary procedural floor, but substantive democracy requires acoustic equality, epistemic credibility, and safeguards against attentional flooding.</p><p><b>Grammar:</b> impersonal passive structures and nominalisation allow rigorous systemic analysis without imprecise active generalizations.</p><p><b>Reasoning:</b> distinguish formal entitlement from substantive agency; avoid procedural fallacies.</p>`
    }
  });

  const u = K.units['11'];
  u.listening = [
    {
      id: 'l1', title: 'Deliberation in the Noise', format: 'Mini-lecture / podcast',
      file: '/audio/en/unit-11/u11-listening-01.mp3', duration: 140, level: 'B2+ → C1',
      audioReady: false,
      voice: 'One academic voice; analytical, measured pace, General American English',
      passes: ['First listen · identify why the speaker rejects the “town square” metaphor for social media', 'Second listen · track the three mechanisms of attentional flooding', 'Third listen · notice passive and impersonal verb frames'],
      transcript: `When we evaluate digital democracy, we tend to borrow metaphors from eighteenth-century plazas and town halls. We imagine a space where anyone can step onto a soapbox and present an argument to their fellow citizens. But modern digital platforms bear no architectural resemblance to a town square. A town square is a physical commons with shared acoustic space and human-scale limits on volume. A social media platform is a privately owned commercial arena engineered to maximize user engagement for advertising revenue.\n\nIn this environment, speech is not scarce; attention is. When authoritarian regimes or well-funded political groups wish to suppress a damaging fact, they no longer need to send police to seize printing presses. They deploy automated accounts and coordinated influencers to flood the information ecosystem with sensationalist distractions, conspiracy theories, and contradictory narratives. The goal is not to convince the public of an alternative truth, but to induce cognitive exhaustion. When citizens feel that everything is contested and nothing is verifiable, they retreat into apathy. Censorship by noise is far more insidious than censorship by silence, because it preserves the formal appearance of liberty while destroying its epistemic conditions.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What is the speaker’s core argument regarding modern censorship?', options: ['Governments are arresting more journalists than ever before.', 'Censorship now operates primarily by overwhelming public attention with noise and confusion rather than enforcing physical silence.', 'Town halls are the only effective way to govern a city.', 'Social media platforms should be closed down immediately.'], answer: 1, explain: 'The speaker emphasizes that digital censorship works through attentional flooding and cognitive exhaustion rather than overt state coercion.' },
        { id: 'q2', type: 'open', tag: 'Mechanism', q: 'Why does the speaker argue that censorship by noise is more insidious than censorship by silence?', rubric: ['Explains that it preserves the formal illusion of free speech while gutting its effectiveness', 'Notes that it produces citizen apathy and cognitive exhaustion', 'Contrasts coercive physical suppression with algorithmic distraction'] }
      ]
    },
    {
      id: 'l2', title: 'Representation Beyond the Ballot', format: 'Two-speaker discussion',
      file: '/audio/en/unit-11/u11-listening-02.mp3', duration: 125, level: 'C1',
      audioReady: false,
      voice: 'Two adult voices (Dr. Aris Thorne and Maya Lin); lively, collegiate discussion, British & International English',
      passes: ['First listen · identify where the two speakers agree and where their core dispute lies', 'Second listen · note Maya’s distinction between voting equality and deliberative access'],
      transcript: `Dr. Thorne: We have to be very careful before we declare elections insufficient. Look at historical democracies that attempted to replace voting with citizen assemblies or expert committees. They almost inevitably devolved into oligarchies where the articulate and wealthy dictated policy to the working majority.\n\nMaya Lin: I’m not proposing we abandon elections, Aris. Voting is non-negotiable. But pretend for a moment that voting every four years is the entirety of democratic life. Between elections, who writes the legislation? Who testifies at regulatory hearings? Who funds the think tanks that define which economic policies are considered respectable? The people in those rooms are overwhelmingly drawn from a narrow socioeconomic tier.\n\nDr. Thorne: True, but the ballot box remains the ultimate disciplinary check. If representatives pass unpopular laws, they can be voted out.\n\nMaya Lin: Only if the electorate is aware of the alternative and has not had their attention systematically diverted. When the agenda is set by corporate media and political financiers, the choices presented on the ballot are already severely pre-filtered. Procedural voting without substantive voice gives citizens a choice between two pre-selected outcomes.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Main dispute', q: 'What is Maya Lin’s response to Dr. Thorne’s defense of the ballot box?', options: ['She thinks voting should be abolished.', 'She argues that while voting is essential, the political agenda is heavily pre-filtered by wealthy actors between election cycles.', 'She believes elections are always rigged by foreign powers.', 'She claims that ordinary citizens do not care about democracy.'], answer: 1, explain: 'Maya Lin accepts voting as non-negotiable but points out that agenda-setting and legislative drafting occur outside elections among elite groups.' },
        { id: 'q2', type: 'open', tag: 'Critical inference', q: 'How does Maya Lin define the limitation of “pre-filtered” electoral choices?', rubric: ['Explains that policy options on the ballot are shaped by lobbying, think tanks and media financing long before voting day', 'Shows how this limits genuine democratic agency to pre-approved alternatives'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A commentator asserts: “If you have the right to vote and the right to tweet, you live in a perfect democracy; complaining about being ignored is just sour grapes.” Respond in 60–120 seconds. Disentangle procedural rights from substantive communicative power, identify at least one mechanism of epistemic or attentional inequality, and offer a qualified analytical conclusion.',
    prepare: 'Keywords only: procedural rights vs substantive power · epistemic credibility · attentional flooding · qualified conclusion. Do not script full sentences.',
    grammar: 'Impersonal passive structures (it is asserted that, can be observed); contrastive markers (while, whereas, technically true but); hedging verbs (seems to, indicates)',
    targets: ['technically true and substantively vacuous', 'credibility deficit', 'attentional inequality', 'a necessary floor, not a ceiling'],
    rubric: [
      'Directly addresses the commentator’s assertion with intellectual rigor',
      'Distinguishes formal legal entitlements from effective communicative capacity',
      'Explains at least one concrete structural mechanism (e.g., credibility deficits, attentional inequality)',
      'Uses accurate B2+/C1 passive/impersonal grammar and appropriate stance hedging',
      'Reaches a balanced, well-reasoned conclusion'
    ]
  };
})(window.KLANG);
