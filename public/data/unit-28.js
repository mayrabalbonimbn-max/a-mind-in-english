/* UNIT 28 · PERSUASION WITHOUT MANIPULATION */
(function (K) {
  K.units['28'] = K.makeUnit('28', {
    module: 6, title: 'Persuasion without', titleEm: 'manipulation',
    question: 'Where does persuasion end and manipulation begin?',
    knowLead: `Every day, we are subjected to thousands of attempts to alter our thoughts, desires, and behaviors. Advertisers, political campaigns, opinion columnists, and even our closest friends use language to influence our decisions. In classical antiquity, rhetoric was celebrated as the highest art of democratic citizenship—the ability to articulate truth with eloquence, reason, and moral force. Yet in the modern world, rhetoric is frequently viewed with intense cynicism, equated with deceitful spin, psychological gaslighting, and algorithmic manipulation. Where is the legitimate boundary between ethical persuasion that respects human autonomy and covert manipulation that exploits psychological vulnerabilities? Consider the ethics of rhetoric as you read.`,
    terms: [
      ['Communicative rationality', `Jürgen Habermas\'s concept of language oriented toward genuine mutual understanding, where participants test claims against reasons rather than seeking strategic dominance.`],
      ['Strategic action / Manipulation', `The covert or coercive use of language, psychological framing, or behavioral incentives to control another person\'s behavior without their informed consent.`],
      ['The Classical Triad (Ethos, Pathos, Logos)', `Aristotle\'s foundational rhetorical modes: Ethos (the speaker\'s moral character and credibility), Pathos (emotional resonance and empathy), and Logos (logical reasoning and empirical proof).`],
      ['Loaded connotation', `The deliberate selection of words carrying strong emotional, moral, or cultural baggage to bias an audience\'s perception without presenting factual argument.`],
      ['Epistemic paternalism', `The manipulative practice of withholding, distorting, or framing information "for the audience\'s own good," assuming they lack the capacity to handle the unvarnished truth.`]
    ],
    views: [
      'Two perspectives on rhetoric and power',
      'The Habermasian ethical stance',
      `Language is legitimate only when oriented toward mutual understanding and the unforced force of the better argument. Any rhetoric that exploits subconscious cognitive vulnerabilities or conceals its true motives constitutes impermissible manipulation.`,
      'The rhetorical realist stance',
      `Pure, frictionless rational discourse is a theoretical fantasy. In the real world of politics and social change, emotional arousal, vivid narrative framing, and rhetorical urgency are indispensable weapons for overcoming apathy and defeating oppression.`,
      `The core challenge is defining a clear ethical boundary that allows for passionate, evocative advocacy without degrading human autonomy.`
    ],
    knowPrompt: `When a political campaign uses scary music, rapid cuts, and loaded words in an advertisement to make voters terrified of an opponent, is that legitimate political persuasion or psychological manipulation?`,
    knowGuide: [
      `Distinguish between presenting reasons that address an audience\'s rational agency and triggering primitive emotional reflexes that bypass critical thinking.`,
      `Consider whether the campaign is transparent about its intent or covertly exploiting subconscious fear.`
    ],
    read: {
      main: {
        format: 'Philosophical & rhetorical essay', title: 'The Architecture of Influence: Eloquence, Autonomy, and the Boundaries of Rhetoric',
        standfirst: `To persuade is to invite another mind into reasoned dialogue; to manipulate is to turn that mind into an instrument of your will.`,
        pull: { after: 4, text: `The difference between ethical persuasion and manipulation lies not in the eloquence of the words, but in the respect accorded to the listener's freedom.` },
        notes: { 1: `<b>Aristotle</b> composed <i>Rhetoric</i> in the 4th century BCE, defining rhetoric as "the faculty of observing in any given case the available means of persuasion."`, 3: `German philosopher <b>Jürgen Habermas</b> published <i>The Theory of Communicative Action</i> in 1981.` },
        paras: [
          `In fourth-century BCE Athens, the philosopher Aristotle laid the intellectual foundations of public speech with a definition that remains timeless: rhetoric is the faculty of observing in any given case the available means of persuasion. For Aristotle and the democratic tradition that followed, rhetoric was not an inherently corrupt craft; it was the indispensable lifeblood of civic self-governance. To participate in a free society meant having the capacity to step into the public assembly, present arguments with clarity, balance the classical triad of *ethos* (moral credibility), *pathos* (affective connection), and *logos* (rational proof), and invite one’s fellow citizens to evaluate the wisdom of a proposed course of action.`,
          `Yet throughout history, rhetoric has cast a dark and perilous shadow. From the ancient Greek Sophists who bragged that they could make the weaker argument defeat the stronger, to modern corporate public relations consultants and authoritarian propagandists, language has frequently been weaponized to deceive rather than illuminate. In our digital era—where behavioral psychologists and algorithmic systems deploy "dark patterns," micro-targeted outrage, and predictive neuro-marketing—the line separating legitimate persuasion from covert manipulation has become dangerously blurred.`,
          `To establish a rigorous philosophical boundary between these two domains, twentieth-century German philosopher Jürgen Habermas formulated his monumental "Theory of Communicative Action." Habermas argued that human speech contains an inherent normative ideal: *communicative rationality*. In genuine communicative action, a speaker uses language to achieve mutual understanding with an autonomous equal. The speaker makes claims to truth, moral rightness, and sincerity, submitting those claims to the "unforced force of the better argument." The listener retains full epistemic sovereignty: they are presented with reasons and given the freedom to accept, question, or reject the premise based upon its merits.`,
          `Manipulation—what Habermas termed "covert strategic action"—operates on the diametrically opposed principle. In manipulative discourse, the speaker does not treat the listener as an autonomous partner in truth-seeking, but as an object to be steered, controlled, or exploited. The manipulator conceals their true intentions, exploits cognitive biases, and deploys loaded connotations designed to bypass the listener’s conscious critical faculties. Whether through manufactured fear, false dichotomies, guilt-tripping, or algorithmic dopamine loops, manipulation achieves compliance not by providing reasons, but by short-circuiting the human capacity for reflection.`,
          `Critically, ethical persuasion does not demand that a speaker strip their language of all passion, narrative, or aesthetic beauty. A dry recitation of statistical tables is not inherently more moral than a stirring speech delivered with righteous moral conviction. Martin Luther King Jr.’s "I Have a Dream" speech was a masterpiece of rhetorical artistry, saturated with biblical metaphors, prophetic cadence, and intense emotional resonance. Yet King’s rhetoric was profoundly ethical because it appealed to universal principles of justice, remained completely transparent in its intent, and sought to elevate the moral agency of its audience rather than exploit their subconscious fears.`,
          `The ultimate test of ethical persuasion is therefore structural: Does this communication empower the listener to think more clearly and act more freely, or does it diminish their capacity for independent judgment? When we persuade without manipulation, we honor the dignity of the other mind. We accept that our argument may be scrutinized, challenged, and even rejected; yet we choose to speak with truth, clarity, and restraint, trusting that the unforced force of reason remains the highest instrument of human connection.`
        ]
      },
      counter: {
        format: 'Realpolitik perspective', title: 'The Myth of Pure Discourse: Why Passion and Framing Are Necessary',
        standfirst: `In the real world of asymmetrical political power, relying exclusively on polite rational debate is a recipe for defeat.`,
        paras: [
          `While Habermas’s ideal of frictionless communicative rationality is philosophically elegant, treating it as a universal standard for real-world politics is profoundly naive.` ,
          `Throughout history, entrenched power structures—from slaveholders and colonial empires to authoritarian regimes and fossil fuel conglomerates—have never surrendered power simply because they were presented with a logically superior academic argument. Power responds to pressure, disruption, and mass mobilization.` ,
          `To mobilize millions of exhausted, distracted citizens to confront injustice requires visceral storytelling, emotional provocation, and aggressive rhetorical framing. If civil rights leaders, abolitionists, and suffragettes had restricted themselves to dispassionate logical syllogisms, their movements would have collapsed in obscurity.` ,
          `To condemn emotional framing and rhetorical pressure as "manipulation" often serves a reactionary agenda: it delegitimizes the righteous anger of the oppressed while protecting the comfortable status quo. When wielded transparently in the service of human liberation, passionate rhetoric is not manipulation; it is justice finding its voice.`
        ]
      }
    },
    sources: [
      { title: 'The Art of Rhetoric (Aristotle)', url: 'https://www.penguinrandomhouse.com/books/260907/the-art-of-rhetoric-by-aristotle/', note: 'Foundational classical treatise establishing ethos, pathos, and logos.' },
      { title: 'The Theory of Communicative Action (Jürgen Habermas)', url: 'https://www.beacon.org/The-Theory-of-Communicative-Action-Volume-1-P260.aspx', note: 'Magisterial philosophical framework contrasting communicative rationality with strategic action.' },
      { title: 'Don\'t Think of an Elephant! Know Your Values and Frame the Debate (George Lakoff)', url: 'https://www.chelseagreen.com/product/dont-think-of-an-elephant/', note: 'Cognitive linguistic analysis of political framing and conceptual metaphor.' }
    ],
    interpret: [
      { id: '28i1', type: 'mc', tag: 'Main idea', q: `What is the essential distinction between ethical persuasion and manipulation according to the main essay?`, options: [`Persuasion is done only in writing, while manipulation is done only on television.`, `Ethical persuasion respects the listener’s autonomy by offering transparent claims tested against reasons (communicative rationality), whereas manipulation covertly exploits cognitive biases to control behavior.`, `Persuasion is always illegal, while manipulation is legally protected.`, `Manipulative language contains no adjectives or emotional words.`], answer: 1, explain: `The essay defines ethical persuasion as transparent, reason-based appeal to autonomous equals, contrasted with covert control.` },
      { id: '28i2', type: 'mc', tag: 'Detail', q: `In Aristotle’s classical rhetoric, what are the three components of the persuasive triad?`, options: [`Grammar, spelling, and punctuation.`, `Ethos (moral character), Pathos (emotional resonance), and Logos (rational proof).`, `Speed, volume, and repetition.`, `Thesis, antithesis, and synthesis.`], answer: 1, explain: `Aristotle formulated ethos, pathos, and logos as the three foundational modes of persuasion.` },
      { id: '28i3', type: 'mc', tag: 'Inference', q: `Why was Martin Luther King Jr.’s emotional rhetoric considered ethically legitimate rather than manipulative?`, options: [`Because he only spoke in private living rooms.`, `Because his speeches appealed to transparent, universal moral principles of justice and elevated audience agency rather than covertly exploiting subconscious prejudice.`, `Because he never used metaphors or biblical cadence.`, `Because he was an elected government official.`], answer: 1, explain: `King’s rhetoric was transparent, principled, and oriented toward elevating moral agency and mutual understanding.` },
      { id: '28i4', type: 'quote', tag: 'Evidence', q: `Which phrase from Jürgen Habermas encapsulates how truth should prevail in communicative rationality?`, find: `unforced force of the better argument`, quote: `submitting those claims to the "unforced force of the better argument."`, explain: `Habermas’s famous phrase defines legitimate rational consensus.` },
      { id: '28i5', type: 'mc', tag: 'Synthesis', q: `What legitimate critique does the counter-perspective offer against Habermas’s communicative ideal?`, options: [`That books are too difficult to read in the 21st century.`, `That entrenched oppressive power structures do not yield to polite academic syllogisms alone; social mobilization requires emotional urgency, vivid narrative framing, and rhetorical power.`, `That all human beings are purely logical computers who never feel emotion.`, `That rhetoric should be completely eliminated from democratic politics.`], answer: 1, explain: `The counter-text emphasizes that overcoming oppression requires emotional resonance and narrative framing alongside logic.` },
      { id: '28i6', type: 'mc', tag: 'Vocabulary in context', q: `What is meant by the term "dark patterns" in modern digital communication?`, options: [`Painting computer monitors in black and grey colors.`, `User interface designs and algorithmic prompts deliberately engineered to trick or manipulate users into taking actions they might not otherwise choose.`, `Typing text in foreign languages without translation.`, `Programming software in the middle of the night.`], answer: 1, explain: `Dark patterns are deceptive UI and algorithmic mechanisms designed for behavioral manipulation.` },
      { id: '28i7', type: 'mc', tag: 'Critical thinking', q: `What is the defining characteristic of "epistemic paternalism"?`, options: [`Teaching children how to read historical documents.`, `Withholding, filtering, or distorting facts under the condescending assumption that the audience is too ignorant or fragile to handle the truth.`, `Translating scientific papers into simple cartoons.`, `Publishing encyclopedias with large font sizes.`], answer: 1, explain: `Epistemic paternalism treats audiences as inferior subjects who must be manipulated for their own supposed good.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Rhetorical parallelism, tricolon & anaphora',
        lead: `C1 persuasive essays achieve rhythmic authority and emotional resonance through balanced parallel syntax, triadic structures (tricolon), and structured repetition (anaphora).`,
        examples: [
          `To participate in a free society meant having the capacity *to step into the assembly*, *to present arguments with clarity*, and *to balance the classical triad*.`,
          `We must know *when to speak with conviction*, *when to listen with humility*, and *when to yield to the evidence*.`,
          `Language was used *to illuminate, not to obscure*; *to liberate, not to enslave*; *to unite, not to divide*.`
        ],
        questions: [
          `How does matching the grammatical form (infinitive + noun, or gerund + modifier) across three clauses enhance the musicality and memorability of a claim?`,
          `Notice how antithetical parallelism (*to illuminate, not to obscure*) sharpens moral and intellectual distinctions.`
        ],
        explain: `Rhetorical grammar is not mere ornamentation; it provides the cognitive scaffolding that helps the reader’s working memory process and retain complex philosophical claims.`,
        compare: [
          [`Clunky`, `The speaker wanted to teach people, give them hope, and also he wanted to make them vote.`],
          [`Parallel Tricolon`, `The orator sought to enlighten the intellect, to inspire the moral imagination, and to mobilize democratic action.`]
        ],
        practice: [
          { q: `Craft a balanced tricolon using parallel infinitives: (Goals: analyze facts, evaluate motives, choose justice)`, a: `The citizen is called upon to cross-examine the facts, to evaluate the underlying motives, and to choose the path of justice.` },
          { q: `Create an antithetical parallel sentence contrasting persuasion and manipulation:`, a: `Persuasion appeals to our conscious reason, whereas manipulation preys upon our subconscious fear.` }
        ],
        radar: [
          `Maintain strict grammatical parallelism across all elements of the triad (e.g., verb + object, verb + object, verb + object).`,
          `Avoid overusing tricolons in every sentence; reserve them for thesis statements, major transitions, and concluding paragraphs.`
        ],
        help: `Use parallel structures to conclude an argument: "In the final analysis, rhetoric remains an instrument of truth, a guardian of autonomy, and a catalyst for human freedom."`
      },
      {
        title: 'Focus 2 · Loaded connotation & evaluative framing',
        lead: `Sophisticated writing analyzes how lexical choices subtly frame reality through emotional connotation, distinguishing neutral denotation from manipulative spin.`,
        examples: [
          `Describing a policy as an *investment in human dignity* frames it as a moral imperative; describing it as an *irresponsible fiscal entitlement* frames it as economic recklessness.`,
          `Notice how replacing "statutory regulation" with "authoritarian red tape" manipulates audience sentiment without changing the underlying fact.`
        ],
        questions: [
          `How do evaluative adjectives and framing metaphors trigger subconscious ideological reactions?`,
          `What is the difference between highlighting genuine emotional stakes and weaponizing loaded terms to bypass rational scrutiny?`
        ],
        explain: `Critical thinkers must become connoisseurs of connotation—able to detect subtle framing techniques in others\' discourse while choosing words with conscious ethical precision in their own.`,
        compare: [
          [`Neutral`, `The government changed the tax rates for corporations.`],
          [`Loaded / Manipulative`, `The regime slashed vital revenues to line the pockets of corporate oligarchs.`]
        ],
        practice: [
          { q: `Identify the loaded connotation in this headline and rewrite it neutrally: "Reckless bureaucrat pushes radical tax scheme."`, a: `Neutral revision: "Ministry official introduces proposed tax reform legislation."` }
        ],
        radar: [
          `In your own writing, ensure your evaluative adjectives are earned by empirical evidence rather than inserted to bully the reader into agreement.`
        ],
        help: `Deconstruct manipulative framing by exposing the underlying metaphor: "The term 'tax relief' implicitly frames taxation as an affliction and the government as an oppressor."`
      }
    ],
    vocab: [
      ['eloquence', 'noun', 'Fluent, elegant, and persuasive speaking or writing that moves the audience.', 'Her eloquence moved the entire assembly to tears.', 'Cicero was celebrated for his forensic eloquence.', ['rhetorical eloquence', 'passionate eloquence', 'effortless eloquence'], ['articulateness', 'fluency', 'persuasiveness'], 'Classical noun.', '/ˈel.ə.kwəns/', 'inarticulacy'],
      ['sovereignty', 'noun', 'Supreme power or authority; the condition of autonomy and self-governance of a person or state.', 'Communicative rationality preserves the epistemic sovereignty of the listener.', 'Individual sovereignty must be protected against manipulation.', ['epistemic sovereignty', 'individual sovereignty', 'moral sovereignty'], ['autonomy', 'independence', 'freedom'], 'Philosophical noun.', '/ˈsɒv.rən.ti/', 'subjugation'],
      ['normative', 'adjective', 'Establishing, relating to, or deriving from a standard or norm, especially of behavior or morality.', 'Habermas identified the normative foundations of human speech.', 'The treaty establishes normative ethical standards.', ['normative ideal', 'normative framework', 'normative claim'], ['standardizing', 'prescriptive', 'moral'], 'Philosophical adjective.', '/ˈnɔː.mə.tɪv/', 'descriptive'],
      ['connotation', 'noun', 'An idea, feeling, or cultural meaning that a word invokes in addition to its literal or primary meaning.', 'The word "regime" carries strongly negative authoritarian connotations.', 'Writers must be conscious of subtle emotional connotations.', ['negative connotation', 'loaded connotation', 'cultural connotation'], ['undertone', 'implication', 'association'], 'Linguistic noun.', '/ˌkɒn.əˈteɪ.ʃən/', 'denotation'],
      ['covert', 'adjective', 'Not openly acknowledged, displayed, or revealed; secret and hidden.', 'The algorithm executed a covert manipulation of user feeds.', 'Covert strategic action undermines democratic trust.', ['covert manipulation', 'covert action', 'covert intention'], ['hidden', 'stealthy', 'underhanded'], 'Formal adjective.', '/ˈkoʊ.vɜːt/', 'overt'],
      ['paternalism', 'noun', 'The policy or practice of restricting the autonomy or freedom of individuals in their supposed best interest.', 'Epistemic paternalism assumes the public cannot handle raw facts.', 'Medical paternalism has been replaced by informed consent.', ['epistemic paternalism', 'state paternalism', 'condescending paternalism'], ['condescension', 'patronage', 'authoritarianism'], 'Ethical noun.', '/pəˈtɜː.nəl.ɪ.zəm/', null],
      ['syllogism', 'noun', 'A form of deductive reasoning in which a conclusion is drawn from two given or assumed premises.', 'Aristotle analyzed the formal structure of the logical syllogism.', 'His argument collapsed into a flawed syllogism.', ['logical syllogism', 'deductive syllogism', 'classic syllogism'], ['deduction', 'logical proof', 'argument'], 'Logical noun.', '/ˈsɪl.ə.dʒɪz.əm/', null],
      ['cadence', 'noun', 'A modulation or inflection of the voice; a rhythmic flow of a sequence of sounds or words in prose or poetry.', 'Martin Luther King Jr. spoke with the prophetic cadence of biblical literature.', 'The rhythmic cadence of the speech captivated the crowd.', ['rhythmic cadence', 'prophetic cadence', 'musical cadence'], ['rhythm', 'tempo', 'modulation'], 'Literary noun.', '/ˈkeɪ.dəns/', null],
      ['diametrically', 'adverb', 'Completely; directly; along the diameter, referring to polar opposition.', 'Manipulation is diametrically opposed to ethical communication.', 'Their political philosophies are diametrically opposed.', ['diametrically opposed', 'diametrically opposite', 'diametrically contrary'], ['completely', 'polar opposite', 'utterly'], 'Formal adverb.', '/ˌdaɪ.əˈmet.rɪ.kli/', null],
      ['recitation', 'noun', 'The action of repeating something aloud from memory; a mechanical or dry listing of facts.', 'A dry recitation of data often fails to persuade the public.', 'He delivered a flawless recitation of the poem.', ['dry recitation', 'mechanical recitation', 'verbatim recitation'], ['listing', 'rendition', 'enumeration'], 'Formal noun.', '/ˌres.ɪˈteɪ.ʃən/', null]
    ],
    chunks: [
      ['the unforced force of the better argument', 'Habermas’s principle that genuine rational agreement emerges through logic rather than coercion.', 'Defining communicative rationality', 'Philosophical · formal', 'Democratic consensus must rely on the unforced force of the better argument.', 'Establish democratic ideal.', `In communicative action, we submit our claims to the unforced force of the better argument.`, 'Core Habermasian chunk.'],
      ['covert strategic action', 'Habermas’s term for deceptive, manipulative communication designed to steer behavior.', 'Critiquing manipulation', 'Sociological · critical', 'Algorithmic nudges function as covert strategic action.', 'Deconstruct hidden influence.', `When a government deceives its citizens, it abandons dialogue for covert strategic action.`, 'Habermasian critique chunk.'],
      ['epistemic sovereignty', 'The individual’s fundamental right and capacity to evaluate evidence and form their own beliefs.', 'Defending cognitive autonomy', 'Philosophical · essayistic', 'Ethical persuasion preserves the epistemic sovereignty of the audience.', 'Promote critical agency.', `Manipulative rhetoric violates the epistemic sovereignty of the listener.`, 'High-register autonomy chunk.'],
      ['the classical triad', 'Aristotle’s tripartite model of rhetorical persuasion (Ethos, Pathos, Logos).', 'Analyzing persuasive technique', 'Rhetorical · academic', 'Great orators balance all three dimensions of the classical triad.', 'Analyze famous speeches.', `An enduring argument must harmonize the classical triad: credibility, emotion, and logic.`, 'Rhetorical theory chunk.'],
      ['dark patterns and algorithmic manipulation', 'Deceptive digital interfaces and code engineered to exploit subconscious vulnerabilities.', 'Critiquing modern tech', 'Technological · critical', 'Users are constantly subjected to dark patterns and algorithmic manipulation.', 'Evaluate modern media.', `Regulatory bodies must ban dark patterns and algorithmic manipulation on social platforms.`, 'Contemporary ethics chunk.'],
      ['epistemic paternalism', 'The arrogant practice of hiding or altering truth under the guise of protecting the public.', 'Condemning censorship', 'Ethical · philosophical', 'Withholding crisis data is an indefensible act of epistemic paternalism.', 'Critique institutional arrogance.', `We must reject epistemic paternalism and treat citizens as rational adults capable of facing hard facts.`, 'Epistemic ethics chunk.'],
      ['to illuminate not to obscure', 'A balanced parallel formula contrasting enlightenment with deceit.', 'Framing ethical purpose', 'Stylistic · essayistic', 'The role of the journalist is to illuminate, not to obscure.', 'State moral purpose.', `Rhetoric should be deployed to illuminate the truth, not to obscure systemic injustice.`, 'Antithetical parallel chunk.'],
      ['diametrically opposed to', 'Completely in conflict with another principle or position.', 'Emphasizing polar contrast', 'Formal · analytical', 'Covert manipulation is diametrically opposed to democratic transparency.', 'Contrast competing values.', `Their methods are diametrically opposed to the ethical guidelines of the university.`, 'Sharp contrast chunk.'],
      ['loaded connotations and evaluative framing', 'Biased vocabulary and metaphors chosen to trigger unexamined emotional reactions.', 'Exposing propaganda', 'Linguistic · critical', 'The editorial relied on loaded connotations and evaluative framing.', 'Deconstruct media bias.', `Critical reading requires identifying loaded connotations and evaluative framing in political news.`, 'Linguistic critique chunk.'],
      ['the unvarnished truth', 'The plain, direct reality presented without softening, spin, or deception.', 'Advocating honesty', 'Idiomatic · formal', 'Citizens have a fundamental right to the unvarnished truth.', 'Demand transparency.', `Ethical leaders possess the courage to deliver the unvarnished truth during times of national crisis.`, 'High-level idiom chunk.']
    ],
    collocations: [
      [`Consensus should emerge from the ______ force of the better argument.`, [`unforced`, `panoptic`, `spurious`, `monocausal`], 0, `Unforced force is Jürgen Habermas's famous formulation.`],
      [`Manipulative rhetoric violates the epistemic ______ of the listener.`, [`sovereignty`, `prowess`, `cadence`, `syllogism`], 0, `Epistemic sovereignty describes cognitive autonomy.`],
      [`Manipulation is ______ opposed to communicative rationality.`, [`diametrically`, `epistemically`, `provisionally`, `anecdotally`], 0, `Diametrically opposed is the standard adverbial pairing.`],
      [`The speech drew power from its prophetic ______ and moral gravity.`, [`cadence`, `dissonance`, `tableau`, `pariah`], 0, `Prophetic cadence describes rhythmic, moving speech.`]
    ],
    upgrades: [
      [`Advertisements use tricks to make us buy stuff we don't need.`, `Digital marketing platforms deploy dark patterns and algorithmic manipulation to bypass conscious reflection and engineer compulsive consumer compliance.`],
      [`The politician used fancy words to lie to the voters.`, `The candidate relied on loaded connotations and covert strategic action, exploiting subconscious cultural anxieties rather than submitting policy claims to reasoned evaluation.`],
      [`Good writing should make people think and feel and act.`, `Masterful rhetoric harmonizes the classical triad—deploying rational proof (logos), moral authority (ethos), and authentic emotional resonance (pathos) to enlighten the intellect and mobilize human agency.`]
    ],
    think: {
      title: 'Communicative Action, Dark Nudges, and the Rhetoric of Power',
      lead: 'Analyze the boundary between ethical influence and coercive manipulation across political, commercial, and philosophical communication.',
      defs: [
        ['The Habermasian Validity Claims', `In communicative action, every statement implicitly claims: (1) truth of facts, (2) moral rightness of context, and (3) subjective sincerity of the speaker.`],
        ['Behavioral Nudge vs. Dark Pattern', `A legitimate nudge alters the choice architecture transparently for human welfare; a dark pattern covertly exploits cognitive heuristics for external extraction.`]
      ],
      items: [
        {
          id: '28t1',
          tag: 'Philosophical Demarcation',
          title: 'The Habermas Test',
          task: `Explain how Jürgen Habermas\'s three validity claims (truth, moral rightness, sincerity) provide an objective test to distinguish between ethical persuasion and manipulation.`,
          guide: `Show that manipulation always involves the covert violation of at least one claim (false facts, concealed motives, or insincere emotional posturing).`
        },
        {
          id: '28t2',
          tag: 'Linguistic Framing',
          title: 'The Architecture of Metaphor',
          task: `Analyze how George Lakoff\'s concept of "framing" operates in political language. Compare the phrases "undocumented immigrants" vs. "illegal aliens." How do these lexical choices trigger divergent moral worlds?`,
          guide: `Deconstruct the metaphorical entailments of criminality/foreignness vs. administrative status and shared humanity.`
        },
        {
          id: '28t3',
          tag: 'Realpolitik Critique',
          title: 'The Necessity of Rhetorical Fire',
          task: `Evaluate the counter-argument: why does social change often require emotional urgency, moral confrontation, and provocative framing rather than dry logical syllogisms?`,
          guide: `Examine the civil rights movement, abolitionism, and labor strikes; demonstrate that passion and framing overcome systemic apathy without necessarily being manipulative.`
        },
        {
          id: '28t4',
          tag: 'Applied Rhetoric Lab',
          title: 'Drafting Ethical Influence',
          task: `Select an urgent public issue (such as climate action, public health, or mental healthcare funding). Draft two contrasting appeals: one relying on manipulative fear-mongering and dark patterns, and one demonstrating ethical persuasion through the classical triad.`,
          guide: `Contrast covert panic exploitation with transparent reasons, authentic pathos, and respect for listener agency.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Mastering Rhetorical Parallelism, Tricolon, and Connotative Precision',
        text: `In argumentative essays exploring politics, ethics, and persuasion, an authoritative writer marries rigorous analytical distinctions with rhythmic rhetorical power. Deploying parallel tripartite structures (*tricolon*) and antithetical framing elevates prose from ordinary commentary into memorable literature.`,
        weak: `We should not trick people when we talk to them. We should be honest. We should respect them.`,
        strong: `Ethical persuasion demands that we speak to enlighten rather than to deceive, to engage the listener’s conscious reason rather than their subconscious fear, and to respect the unforced force of the better argument.`
      },
      short: {
        kind: 'Rhetorical analysis',
        title: 'Deconstructing a Persuasive Message',
        min: 180,
        max: 260,
        prompt: `Select a famous political speech, corporate advertising campaign, or social movement slogan. In a concise rhetorical analysis (180–260 words), evaluate whether it operates through ethical persuasion or covert manipulation. Employ at least one parallel tricolon and terms from the classical triad (*ethos, pathos, logos*).`,
        support: [
          `Identify the speech, ad, or campaign and state its central objective.`,
          `Analyze its balance of ethos, pathos, and logos.`,
          `Deploy a balanced tricolon to characterize its persuasive technique.`,
          `Conclude with a verdict on whether it respects or violates the audience’s epistemic sovereignty.`
        ],
        guide: [
          `Deploy high-level rhetorical vocabulary: *communicative rationality*, *the classical triad*, *loaded connotation*, *epistemic sovereignty*.`,
          `Ensure flawless parallel syntax in your tricolon.`
        ]
      },
      main: {
        kind: 'Argumentative essay',
        title: 'Persuasion Without Manipulation: The Ethics of Rhetoric in an Age of Influence',
        min: 500,
        max: 750,
        main: true,
        prompt: `Where does legitimate persuasion end and covert manipulation begin? In a structured argumentative essay (500–750 words), evaluate the moral boundaries of rhetoric in modern politics, digital media, and civil discourse. Contrast Aristotle’s classical triad and Jürgen Habermas’s communicative action with the reality of algorithmic dark patterns and political framing. Address the counter-argument regarding the necessity of emotional passion in social justice movements. Deploy sophisticated rhetorical parallelism, tricolons, antithetical contrast, and precise philosophical vocabulary throughout.`,
        support: [
          `Introduction: Contrast the democratic ideal of eloquence with modern cynicism regarding manipulation; state your central thesis on communicative rationality and human autonomy.`,
          `Body Paragraph 1: Analyze classical rhetoric and Habermas\'s framework—ethos, pathos, logos, validity claims, and the unforced force of the better argument.`,
          `Body Paragraph 2: Deconstruct manipulation and strategic action—covert motives, dark patterns, loaded connotations, and the violation of epistemic sovereignty.`,
          `Body Paragraph 3: Confront the counter-perspective—the legitimate and necessary role of passionate framing, emotional urgency, and narrative power in overcoming apathy and defeating oppression.`,
          `Conclusion: Synthesize the criteria; formulate a definitive standard for practicing persuasion that honors the dignity of the human mind.`
        ],
        guide: [
          `Incorporate at least two distinct tricolons or parallel structures (*to enlighten, to inspire, to mobilize*).`,
          `Deploy essential vocabulary: *communicative rationality*, *covert strategic action*, *the classical triad*, *epistemic sovereignty*, *loaded connotation*, *unforced force of the better argument*.`,
          `Maintain an articulate, authoritative, and philosophically rigorous essayistic register.`
        ]
      }
    },
    edit: {
      checklist: [
        `Are parallel structures and tricolons grammatically aligned across all series elements?`,
        `Does the essay distinguish clearly between ethical persuasion, communicative rationality, and covert manipulation?`,
        `Are Aristotle’s triad (ethos, pathos, logos) and Habermas’s communicative theory applied accurately?`,
        `Does the analysis acknowledge the legitimate power of emotional framing in social movements?`,
        `Is the tone consistently formal, articulate, and rhetorically commanding?`
      ],
      challenges: [
        {
          id: '28e1',
          title: 'Polishing Rhetorical Parallelism and Tricolon',
          bad: `The speaker wanted to make people understand the law, inspire them to do good, and he wanted them to vote on Tuesday.`,
          task: `Revise into a balanced C1 tricolon with parallel infinitives and high-register vocabulary.`,
          good: `The orator sought to clarify the complex legislation, to inspire civic solidarity, and to mobilize decisive democratic participation.`
        },
        {
          id: '28e2',
          title: 'Refining Ethical Distinction in High Register',
          bad: `Manipulation is bad because it tricks people into doing things they don't want to do with ads.`,
          task: `Rewrite using formal philosophical concepts (*covert strategic action, epistemic sovereignty, cognitive heuristics, instrumental control*).`,
          good: `Manipulation constitutes an impermissible form of covert strategic action, exploiting subconscious cognitive heuristics to establish instrumental control over an audience while stripping them of epistemic sovereignty.`
        }
      ]
    },
    retrieve: {
      content: `What is the fundamental difference between "communicative action" and "strategic action" in Jürgen Habermas\'s philosophy of language?`,
      contentGuide: `Communicative action uses language to achieve mutual understanding through reasoned arguments with autonomous equals; strategic action uses language as an instrumental tool to steer, manipulate, or control others.`,
      grammar: `Construct a balanced tripartite sentence (tricolon) using parallel gerund phrases: (Actions: respecting autonomy, presenting evidence, welcoming scrutiny)`,
      grammarGuide: `Expected: "Ethical persuasion is achieved by respecting the listener\'s autonomy, presenting robust empirical evidence, and welcoming rigorous critical scrutiny."`,
      reasoning: `Why does passionate, emotionally resonant rhetoric (such as Martin Luther King Jr.\'s speeches) NOT automatically constitute manipulative discourse?`,
      reasoningGuide: `Emotion is ethically legitimate when it is transparent, grounded in universal moral principles, and aimed at elevating the moral agency and rational reflection of the audience rather than covertly exploiting fear or prejudice.`,
      summary: `In Unit 28, you explored the ethical boundaries of rhetoric, eloquence, and influence. You mastered rhetorical parallelism, tricolons, loaded connotations, Aristotle\'s triad, and Habermasian communicative rationality.`
    }
  });

  K.units['28'].listening = [
    {
      id: '28l1',
      title: 'Dialogue: The Rhetoric of the Climate Campaign',
      format: 'Debate between a political strategist and an environmental ethicist',
      lead: 'Listen to a debate on whether climate advocates should use catastrophic fear framing or constructive rational persuasion.',
      audio: 'audio/unit-28-listening-1.mp3',
      transcript: `[Strategist]: Marcus, we have spent thirty years publishing polite scientific charts and IPCC reports, and global emissions are still rising. If we want people to care, we need to stop being polite. We need terrifying apocalyptic imagery, moral outrage, and high-intensity emotional framing that shocks voters out of their apathy.\n\n[Ethicist]: Clara, no one denies the urgency of the climate crisis. But when you rely purely on existential terror and hyperbolic catastrophe, you cross the line from persuasion into emotional manipulation. Studies in behavioral psychology prove that inducing acute panic without clear, actionable agency produces despair and fatalism—people simply shut down.\n\n[Strategist]: But dispassionate logic doesn't win elections! Martin Luther King didn't just read spreadsheets; he spoke with volcanic moral emotion. Look at Aristotle’s triad: without Pathos, Logos is dead in the water.\n\n[Ethicist]: King used Pathos to awaken human conscience, not to paralyze critical thinking. His rhetoric was grounded in transparent moral truth and offered a concrete vision of hope. When persuasion respects the audience's epistemic sovereignty, it builds durable, democratic commitment. When it relies on covert emotional coercion, it generates cynical backlash the moment the panic subsides.`,
      questions: [
        {
          id: '28l1q1',
          type: 'mc',
          q: 'Why does the ethicist argue against using pure apocalyptic panic in climate campaigning?',
          options: [
            'Because climate change does not exist.',
            'Because inducing acute terror without actionable agency causes emotional shutdown, despair, and eventual cynical backlash.',
            'Because television advertisements are too expensive.',
            'Because scientists are not allowed to speak in public.'
          ],
          answer: 1,
          explain: 'The ethicist explains that fear-based manipulation induces fatalism and paralysis rather than sustained democratic commitment.'
        },
        {
          id: '28l1q2',
          type: 'mc',
          q: 'How does the ethicist differentiate Martin Luther King Jr.’s use of emotion from manipulative fear framing?',
          options: [
            'King never used emotion in any speech.',
            'King used emotion (Pathos) to awaken moral conscience and offer hope, respecting audience agency rather than coercing through panic.',
            'King was only addressing university professors.',
            'King used algorithmic social media marketing.'
          ],
          answer: 1,
          explain: 'King’s emotional resonance was transparent, hope-filled, and oriented toward awakening moral conscience and human agency.'
        }
      ]
    },
    {
      id: '28l2',
      title: 'Monologue: Habermas and the Democratic Ideal',
      format: 'Academic lecture on political philosophy and ethics',
      lead: 'A lecture examining Jürgen Habermas\'s concept of the public sphere and communicative action.',
      audio: 'audio/unit-28-listening-2.mp3',
      transcript: `In his 1981 masterwork *The Theory of Communicative Action*, Jürgen Habermas offered what remains the most profound philosophical defense of human dialogue ever written. In an era haunted by totalitarian propaganda and commercial advertising, Habermas asked: What makes human speech fundamentally human?\n\nHis answer was communicative rationality. Whenever two human beings engage in genuine dialogue, they implicitly step into an ideal speech situation. In this space, power, wealth, and status are neutralized. The billionaire and the worker, the professor and the student stand as epistemic equals. No weapon is permitted except the 'unforced force of the better argument'—*der zwanglose Zwang des besseren Arguments*.\n\nTo manipulate another person is to commit a form of spiritual vandalism against this ideal. It is to reduce a conscious human subject, capable of reason and moral choice, to an object to be programmed. When we choose to persuade with truth, clarity, and respect, we do more than win a debate; we preserve the democratic soul of civilization itself.`,
      questions: [
        {
          id: '28l2q1',
          type: 'mc',
          q: 'What defines the "ideal speech situation" in Habermas\'s philosophy?',
          options: [
            'A room with perfect soundproofing and microphones.',
            'A discursive space where power, wealth, and status are neutralized, allowing consensus to emerge solely through the unforced force of the better argument.',
            'A political parliament where only lawyers are allowed to speak.',
            'A digital forum where everyone uses anonymous usernames.'
          ],
          answer: 1,
          explain: 'Habermas’s ideal speech situation neutralizes social power asymmetries, allowing reason alone to determine consensus.'
        },
        {
          id: '28l2q2',
          type: 'mc',
          q: 'Why does the lecturer characterize manipulation as "spiritual vandalism"?',
          options: [
            'Because it damages physical religious buildings.',
            'Because it degrades a conscious human being capable of moral agency into an object to be programmed and controlled.',
            'Because it violates international copyright law.',
            'Because it makes television broadcasts too loud.'
          ],
          answer: 1,
          explain: 'Manipulation reduces autonomous human subjects into passive instrumental objects.'
        }
      ]
    }
  ];

  K.units['28'].speaking = {
    part1: [
      { q: `Have you ever felt manipulated by an advertisement or a pushy salesperson? What specific tactics did they use?`, guide: `Describe the situation, the pressure tactics (artificial scarcity, guilt, flattery), and how you felt afterward.` },
      { q: `When trying to convince a friend or family member to make a positive life change, what approach do you find most effective?`, guide: `Discuss balancing empathy, offering clear reasons, avoiding nagging, and respecting their personal timeline.` },
      { q: `Why do you think political speeches in election years rely so heavily on simple slogans and emotional storytelling?`, guide: `Analyze the cognitive limits of mass audiences, media soundbites, and the power of emotional resonance.` }
    ],
    part2: {
      topic: `Describe an inspiring speech, presentation, or piece of persuasive writing that made a lasting impression on you.`,
      prompts: [
        `Who delivered or wrote it and what the topic was`,
        `What specific arguments, stories, or rhetorical techniques were used`,
        `How it made you feel and whether it changed your perspective`,
        `And explain why you consider this an example of ethical persuasion rather than manipulation.`
      ],
      guide: `Structure your response clearly: context, rhetorical analysis of ethos/pathos/logos, emotional impact, and ethical reflection on audience agency.`
    },
    part3: [
      { q: `In an era of targeted social media advertising, should governments legally ban 'dark patterns' and predictive behavioral nudges?`, guide: `Debate consumer protection, algorithmic transparency, and individual liberty versus commercial freedom.` },
      { q: `Can a political campaign be successful in a modern democracy if it relies entirely on factual data and completely avoids emotional rhetoric?`, guide: `Evaluate the realpolitik critique versus Habermas's communicative ideal; analyze why emotional narrative is indispensable.` },
      { q: `How can schools teach young people to identify loaded language and rhetorical manipulation without making them cynical about all public speech?`, guide: `Advocate for teaching critical visual and linguistic literacy, Aristotle's triad, cognitive biases, and constructive civic debate.` }
    ],
    followUp: `If an argument uses strong emotion, does that automatically mean it is trying to manipulate the audience?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'el·o·quence', 'sov·er·eign·ty', 'nor·ma·tive', 'con·no·ta·tion', 'di·a·met·ri·cal·ly'.`,
      grammar: `Natural deployment of rhetorical parallelism, triadic structures (tricolon), and antithetical contrast ('to illuminate, not to obscure').`,
      discourse: `Coherent, articulate argumentation distinguishing ethical communicative rationality from covert strategic manipulation.`,
      vocabulary: `Effective use of terms such as 'the classical triad', 'communicative rationality', 'dark patterns', 'epistemic sovereignty', and 'the unforced force of the better argument'.`
    }
  };
})(window.KLANG = window.KLANG || {});
