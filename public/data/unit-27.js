/* UNIT 27 · WHY SMART PEOPLE BELIEVE BAD ARGUMENTS */
(function (K) {
  K.units['27'] = K.makeUnit('27', {
    module: 6, title: 'Why smart people', titleEm: 'believe bad arguments',
    question: 'Why do intelligent people defend arguments they would reject from someone else?',
    knowLead: `We tend to believe that cognitive intelligence, formal education, and scientific literacy protect people from irrational beliefs and fallacious reasoning. We assume that when presented with clear, undeniable facts, an intelligent mind will naturally discard flawed theories and converge upon the objective truth. Yet empirical reality constantly shatters this comforting assumption. In political debates, cultural controversies, and institutional crises, highly educated and articulate individuals frequently defend the most absurd, logically tortured, and factually bankrupt positions. Why doesn't intelligence immunize us against bad arguments? Could it be that higher cognitive ability actually makes people *better* at rationalizing irrational biases? Consider the mechanics of motivated reasoning as you read.`,
    terms: [
      ['Identity-protective cognition', `The subconscious tendency of individuals to selectively process, interpret, and defend information in a manner that protects their status, belonging, and connection to their social or political tribe.`],
      ['Motivated numeracy', `The psychological phenomenon where individuals with high quantitative ability use their mathematical skills to rationalize ideologically preferred outcomes while miscalculating identical data that contradicts their worldview.`],
      ['The argumentative theory of reason', `Hugo Mercier and Dan Sperber’s evolutionary theory that human reason evolved not to enable solitary pursuit of abstract truth, but to persuade others, win social debates, and justify actions within a group.`],
      ['Cognitive dissonance', `The acute psychological discomfort experienced by an individual who holds two contradictory beliefs, values, or ideas, or who is confronted with evidence that directly contradicts their core identity.`],
      ['The smartness paradox', `The counter-intuitive finding that higher intelligence and analytical skill often increase polarization, as smarter individuals possess superior cognitive tools to construct elaborate rationalizations for their biases.`]
    ],
    views: [
      'Two perspectives on intellectual bias',
      'The motivated reasoning critique',
      `Human intelligence is largely an evolutionary lawyer hired to defend our emotional and tribal commitments. Without deliberate epistemic self-awareness, intelligence merely supercharges our ability to rationalize delusion.`,
      'The social rationality defense',
      `Conforming to group consensus is not intellectual failure; it is an evolutionarily optimized strategy for social survival. In an interdependent world, losing connection to one\'s community carries far higher personal costs than holding an inaccurate factual belief.`,
      `The core challenge is understanding how high cognitive capacity can be liberated from tribal servitude to serve authentic intellectual independence.`
    ],
    knowPrompt: `Have you ever witnessed a brilliant doctor, lawyer, or professor passionately defend an obvious political falsehood or bizarre conspiracy theory? What explains their ability to dismiss facts that an ordinary person would accept?`,
    knowGuide: [
      `Reflect on whether their intelligence helped them find the truth or helped them invent sophisticated justifications for their bias.`,
      `Consider how their social status and professional identity would be affected if they admitted they were wrong.`
    ],
    read: {
      main: {
        format: 'Cognitive & evolutionary psychology essay', title: 'The Lawyer in the Brain: Intelligence, Tribalism, and the Mechanics of Rationalization',
        standfirst: `Intelligence is not an objective search engine; it is a sophisticated defense attorney engineered to protect our tribal identity.`,
        pull: { after: 5, text: `Smarter people do not hold fewer biases; they are simply far better at inventing brilliant excuses for them.` },
        notes: { 1: `<b>Dan Kahan</b> and the Cultural Cognition Project at Yale Law School demonstrated the phenomenon of 'motivated numeracy' in landmark empirical studies (2013).`, 3: `<b>Hugo Mercier and Dan Sperber</b> published <i>The Enigma of Reason</i> in 2017, introducing the evolutionary argumentative theory of reason.` },
        paras: [
          `In our modern meritocratic culture, we are raised on the foundational dogma of Enlightenment rationalism: the belief that ignorance is the primary source of irrationality, and that education is its universal cure. Under this "information-deficit model," when people believe conspiracy theories, reject established scientific consensus, or defend logically bankrupt political claims, it is assumed that they simply lack cognitive ability, quantitative literacy, or access to accurate facts. The prescribed remedy is straightforward: provide more data, teach statistical literacy, and encourage analytical thinking. Once enlightened by evidence, the rational human mind will naturally adjust its beliefs.`,
          `Yet decades of rigorous research in cognitive psychology, behavioral economics, and neuroscience have dealt a devastating blow to this optimistic hypothesis. When researchers examine contemporary political polarization and ideological dogmatism, they discover a profound and disturbing anomaly: the individuals holding the most extreme, unyielding, and factually contorted beliefs are often not the least educated or least intelligent members of society. On the contrary, they are frequently the most articulate, well-read, and quantitatively sophisticated. High intelligence, advanced degrees, and elite cognitive capacity do not immunize the human mind against bad arguments; in many instances, they actively exacerbate intellectual blindness.`,
          `This unsettling phenomenon is known in cognitive science as "the smartness paradox." In a landmark 2013 study conducted by Professor Dan Kahan at Yale University, participants were tested on their mathematical competence and then presented with a complex statistical table. When the data was framed around a neutral topic—such as whether a skin rash cream was effective—participants with high numeracy accurately calculated the correct statistical outcome. However, when the exact same numerical data was framed around a fiercely politicized issue—such as whether a gun control law increased or decreased violent crime—a bizarre cognitive rupture occurred. Highly numerate individuals did not use their mathematical prowess to discover the objective truth; instead, they deployed their quantitative skills to torture the data until it supported their pre-existing political ideology. Less mathematically skilled participants made standard calculation errors, but the smartest participants engaged in sophisticated, motivated manipulation of the numbers.`,
          `To understand why this occurs, we must abandon the naive view of the human brain as a solitary, truth-seeking supercomputer. As cognitive scientists Hugo Mercier and Dan Sperber demonstrated in their seminal evolutionary work *The Enigma of Reason*, human rationality did not evolve to solve abstract logic puzzles or discover universal cosmological truths in solitary contemplation. In the ancestral environment of Pleistocene hunter-gatherers, survival depended entirely upon belonging to a cohesive, cooperative social group. An individual expelled from the band faced swift, inevitable death. Consequently, human reason evolved primarily as a social communicative tool: an argumentative mechanism designed to persuade others, win social status, defend allies, and justify actions within the tribe.`,
          `In cognitive terms, reason functions not as an impartial judge, but as an aggressive, highly paid defense attorney. The emotional and tribal center of the brain—what psychologists term "identity-protective cognition"—subconsciously decides what it wants to believe based on belonging, fear, and pride. Only then does it hire the conscious intellect to draft the legal brief. When a person with an average IQ encounters challenging evidence, they possess only modest intellectual tools with which to defend their bias, making their rationalizations clumsy and fragile. But when an individual with an exceptionally high IQ, a vast vocabulary, and advanced analytical training encounters contradictory evidence, they possess a formidable arsenal of cognitive weapons. They can effortlessly deploy obscure terminology, construct elaborate counter-hypotheses, find subtle flaws in opposing studies, and build breathtakingly intricate intellectual fortresses to protect their cherished delusions.`,
          `Furthermore, the social stakes of belief abandonment are profoundly asymmetric. If an elite academic, corporate executive, or political activist publicly admits that their tribe’s central dogma is factually incorrect, the personal cost is catastrophic: they face professional ostracization, reputational destruction, the loss of friendships, and expulsion from their socio-cultural network. Conversely, the personal cost of believing an elaborate, comforting falsehood that maintains their status within their tribe is virtually zero. From an evolutionary perspective, holding a factually incorrect belief that preserves your social standing is far more adaptive than holding an inconvenient truth that renders you a lonely pariah.`,
          `Overcoming the smartness paradox requires recognizing that intellectual independence is not a function of raw processing power, but a moral and emotional virtue. True critical thinking requires cultivating what psychologist Julia Galef terms the "scout mindset"—the drive to see reality as accurately as possible, even when it is uncomfortable or inconvenient—in contrast to the "soldier mindset," which is programmed only to defend territory and attack enemies. Until we learn to decouple our intellectual conclusions from our social identity and tribal belonging, our intelligence will remain what it has always been: a brilliant, articulate slave to our deepest emotional insecurities.`
        ]
      },
      counter: {
        format: 'Social epistemology perspective', title: 'The Rationality of Belonging: Why Trusting the Tribe Makes Sense',
        standfirst: `What looks like irrational tribalism from the outside is often an optimized, rational adaptation to the demands of human social interdependence.`,
        paras: [
          `While cognitive scientists rightly critique motivated reasoning, dismissing group-based belief as mere intellectual cowardice ignores the profound epistemology of human social coordination.` ,
          `No individual human being, regardless of their genius, possesses the time, expertise, or cognitive bandwidth to independently verify the millions of empirical facts required to navigate the modern world. We do not personally test the engineering of bridges before we cross them, nor do we sequence the viral genome before taking a vaccine. All human knowledge is fundamentally distributed, communal, and grounded in social trust.` ,
          `When individuals adopt the beliefs of their social, professional, or cultural group, they are not acting irrationally; they are participating in a necessary division of epistemic labor. Trusting the consensus of one's peers and epistemic authorities is an efficient, indispensable cognitive shortcut that allows complex civilizations to function.` ,
          `Moreover, the psychological desire to protect group cohesion is what enables large-scale collective action. A society composed entirely of hyper-individualistic skeptics who refuse to trust communal narratives would instantly disintegrate into paralyzing factionalism. We must therefore recognize that identity-protective cognition is not simply a defect in the human software; it is the social glue that makes collective human culture possible.`
        ]
      }
    },
    sources: [
      { title: 'The Enigma of Reason (Hugo Mercier & Dan Sperber)', url: 'https://www.hup.harvard.edu/books/9780674237827', note: 'Groundbreaking evolutionary analysis of why human reason evolved for social argumentation.' },
      { title: 'Motivated Numeracy and Enlightened Self-Government (Dan M. Kahan et al.)', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2319992', note: 'Landmark empirical paper proving that high numeracy exacerbates political polarization.' },
      { title: 'The Scout Mindset: Why Some People See Things Clearly and Others Don\'t (Julia Galef)', url: 'https://www.penguinrandomhouse.com/books/554868/the-scout-mindset-by-julia-galef/', note: 'Practical cognitive framework for overcoming identity-protective soldier thinking.' }
    ],
    interpret: [
      { id: '27i1', type: 'mc', tag: 'Main idea', q: `What is the central paradox examined in the main essay regarding human intelligence and irrational belief?`, options: [`People with low IQ scores are always better scientists than university professors.`, `Higher cognitive intelligence and numeracy do not immunize individuals against false beliefs; instead, they provide superior intellectual tools for rationalizing tribal biases (the smartness paradox).`, `Scientific education has completely eliminated political disagreements worldwide.`, `Human beings are biologically incapable of learning mathematics.`], answer: 1, explain: `The essay explores the 'smartness paradox'—how intelligence serves as an argumentative weapon for defending identity rather than finding neutral truth.` },
      { id: '27i2', type: 'mc', tag: 'Detail', q: `What did Dan Kahan\'s 2013 Yale study on "motivated numeracy" demonstrate?`, options: [`Numerate people cannot calculate the effectiveness of skin creams.`, `When mathematical data touched upon politicized issues (gun control), highly numerate individuals used their skills to manipulate and rationalize ideologically preferred outcomes.`, `Men are significantly better at mathematics than women.`, `Gun control laws automatically reduce crime in every state.`], answer: 1, explain: `Kahan demonstrated that high quantitative ability was weaponized to defend political ideology rather than seek objective truth.` },
      { id: '27i3', type: 'mc', tag: 'Inference', q: `According to Hugo Mercier and Dan Sperber\'s "argumentative theory of reason," why did human rationality evolve?`, options: [`To allow solitary philosophers to calculate the age of the universe.`, `As a social communicative mechanism designed to persuade others, win status, defend the tribe, and justify actions within a group.`, `To design computers and algorithms.`, `To eliminate all emotional feelings from human consciousness.`], answer: 1, explain: `Reason evolved for social argumentation, persuasion, and tribal cohesion rather than solitary abstract truth discovery.` },
      { id: '27i4', type: 'quote', tag: 'Evidence', q: `Which sentence from the text compares the conscious intellect to a legal professional hired by the emotions?`, find: `reason functions not as an impartial judge, but as an aggressive, highly paid defense attorney`, quote: `In cognitive terms, reason functions not as an impartial judge, but as an aggressive, highly paid defense attorney. The emotional and tribal center of the brain—what psychologists term "identity-protective cognition"—subconsciously decides what it wants to believe based on belonging, fear, and pride.`, explain: `The text explicitly develops the metaphor of reason acting as a defense attorney for tribal identity.` },
      { id: '27i5', type: 'mc', tag: 'Synthesis', q: `How does the counter-perspective defend group-based belief formation?`, options: [`By arguing that individual humans can independently verify every scientific fact in existence.`, `By demonstrating that trusting communal consensus is a rational and necessary division of epistemic labor that enables social coordination and prevents paralysis.`, `By claiming that political parties never make mistakes.`, `By stating that reading books is harmful to human health.`], answer: 1, explain: `The counter-text explains that social trust and distributed epistemic labor are rational adaptations for collective survival.` },
      { id: '27i6', type: 'mc', tag: 'Vocabulary in context', q: `What does Julia Galef mean by the distinction between the "soldier mindset" and the "scout mindset"?`, options: [`The soldier uses physical weapons, while the scout walks in the woods.`, `The soldier mindset seeks to defend ideological territory and defeat opposing ideas, while the scout mindset seeks to map reality as accurately as possible.`, `The soldier is a military rank, while the scout is an athletic scout.`, `The soldier reads fiction, while the scout reads non-fiction.`], answer: 1, explain: `The soldier mindset defends identity, whereas the scout mindset seeks objective accuracy regardless of tribal costs.` },
      { id: '27i7', type: 'mc', tag: 'Critical thinking', q: `Why is the personal cost of abandoning tribal beliefs considered "asymmetric" for elite professionals?`, options: [`Because elite professionals have to pay high membership fees to political clubs.`, `Because admitting one\'s tribe is wrong can trigger social ostracization, loss of status, and career ruin, whereas holding a comforting communal falsehood carries minimal personal penalty.`, `Because professors are legally prohibited from changing their minds.`, `Because intelligence tests become invalid after age forty.`], answer: 1, explain: `The social penalties of ostracization far outweigh the private cost of holding a communal illusion.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Advanced concessive structures: Much as & However much',
        lead: `C1 essays construct sophisticated concessive openings using fronted clauses with *Much as* and *However + adjective/adverb* to acknowledge powerful counter-tendencies before pivoting to core claims.`,
        examples: [
          `*Much as we might pride ourselves on* our scientific objectivity, our brains remain deeply tribal.`,
          `*However rigorous one\'s analytical training may be*, identity-protective cognition continues to exert a powerful pull.`,
          `*Much as Enlightenment rationalists hoped* that education would eradicate bias, empirical evidence proves otherwise.`
        ],
        questions: [
          `How does "Much as we pride ourselves on X..." elevate the tone compared to a simple "Although we are proud of X..."?`,
          `Notice the structure of "However + adjective + subject + may be": it establishes a maximum concession of degree before introducing a decisive limit.`
        ],
        explain: `Deploying *Much as* and *However + adjective* demonstrates stylistic mastery. It signals to the reader that you are fully aware of an appealing ideal, but disciplined enough to confront reality.`,
        compare: [
          [`Basic concession`, `Although we are smart, we still have biases.`],
          [`Advanced C1 concession`, `Much as we might flatter ourselves that high intelligence guarantees rationality, cognitive ability frequently serves only to construct more intricate defenses for pre-existing prejudices.`]
        ],
        practice: [
          { q: `Rewrite this sentence using "Much as": "Although I admire his intellectual brilliance, I cannot accept his conspiratorial conclusions."`, a: `Much as I admire his intellectual brilliance, I cannot accept his conspiratorial conclusions.` },
          { q: `Rewrite using "However sophisticated... may be": "Even if an economic model is very sophisticated, it cannot predict human panic."`, a: `However sophisticated an economic model may be, it cannot reliably forecast the volatile dynamics of human panic.` }
        ],
        radar: [
          `Ensure proper word order: *However + adjective/adverb + subject + verb (may be)* (e.g., "However brilliant the scholar is", NOT "However is the scholar brilliant").`,
          `Use *Much as* with verbs of feeling, hoping, desiring, or striving (*Much as we wish, Much as they strive*).`
        ],
        help: `Use *Much as* to open major thematic turns: "Much as we might desire a world governed purely by data, human psychology is inextricably anchored in narrative and belonging."`
      },
      {
        title: 'Focus 2 · Adversative discourse & analytical contrast',
        lead: `Sustaining complex psychological arguments requires dynamic contrastive markers (*far from being, rather than functioning as, on the contrary, by contrast*) that systematically dismantle intuitive assumptions.`,
        examples: [
          `Reason, *far from being an impartial judge*, operates as an aggressive defense attorney.`,
          `*Rather than functioning as a truth-seeking search engine*, human intelligence acts as a social survival mechanism.`,
          `We do not reason to discover what is real; *on the contrary*, we reason to justify what we already feel.`
        ],
        questions: [
          `Observe how "far from being X, Y is actually Z" creates dramatic intellectual inversion.`,
          `How does replacing simple "but" with structured adversative phrasing strengthen the logical momentum of your paragraphs?`
        ],
        explain: `In essays deconstructing common cognitive fallacies, clear contrastive signposting allows the reader to follow the exact fault line between the naive assumption and the empirical reality.`,
        compare: [
          [`Flat`, `Smart people don't find the truth. They make excuses for their beliefs.`],
          [`Dynamic contrast`, `Far from acting as a neutral arbiter of objective reality, high intelligence frequently serves as a formidable engine for motivated rationalization.`]
        ],
        practice: [
          { q: `Rewrite using "Far from [gerund]...": "Education does not eliminate bias; it gives people better tools to defend their bias."`, a: `Far from eliminating cognitive bias, higher education frequently equips individuals with more sophisticated tools to rationalize their ideological commitments.` }
        ],
        radar: [
          `Ensure grammatical alignment after "Far from": follow with a gerund phrase (*Far from eliminating...*) or a noun phrase (*Far from an asset...*).`
        ],
        help: `Pair adversative structures with core thesis statements to produce memorable, punchy analytical conclusions.`
      }
    ],
    vocab: [
      ['rationalize', 'verb', 'To attempt to explain or justify a behavior or belief with logical-sounding reasons, even if these are not the true motives.', 'He rationalized his political bias with cherry-picked statistics.', 'Smart people are exceptionally skilled at rationalizing their instincts.', ['rationalize behavior', 'rationalize bias', 'effortlessly rationalize'], ['justify', 'explain away', 'defend'], 'Psychological verb.', '/ˈræʃ.ən.əl.aɪz/', null],
      ['pariah', 'noun', 'An outcast; a person who is rejected and ostracized by their social group or community.', 'Whistleblowers often become social pariahs within their institutions.', 'He feared becoming a pariah if he questioned the party line.', ['social pariah', 'political pariah', 'cultural pariah'], ['outcast', 'exile', 'untouchable'], 'Sociological noun.', '/pəˈraɪ.ə/', 'insider'],
      ['dissonance', 'noun', 'A state of mental tension or conflict resulting from holding two contradictory beliefs or values simultaneously.', 'Cognitive dissonance forces people to either change their beliefs or invent excuses.', 'The scandal generated acute moral dissonance among voters.', ['cognitive dissonance', 'acute dissonance', 'moral dissonance'], ['incongruity', 'conflict', 'discord'], 'Psychological noun.', '/ˈdɪs.ə.nəns/', 'harmony'],
      ['numerate', 'adjective', 'Having a good basic knowledge of arithmetic and mathematics; able to understand and work with numbers.', 'Highly numerate citizens were tested on complex statistical tables.', 'The policy demands a numerate and scientifically literate public.', ['highly numerate', 'quantitatively numerate', 'scientifically numerate'], ['mathematical', 'statistically literate', 'calculating'], 'Academic adjective.', '/ˈnjuː.mər.ət/', 'innumerate'],
      ['ostracize', 'verb', 'To exclude, banish, or expel someone from a society, group, or professional community.', 'The academic was ostracized by her colleagues for publishing dissident data.', 'Dissidents were socially and economically ostracized.', ['socially ostracized', 'professionally ostracize', 'completely ostracized'], ['exclude', 'shun', 'boycott'], 'Sociological verb.', '/ˈɒs.trə.saɪz/', 'embrace'],
      ['dogmatism', 'noun', 'The tendency to lay down principles as incontrovertibly true, without consideration of evidence or the opinions of others.', 'Ideological dogmatism blinds intellectuals to empirical reality.', 'Religious and political dogmatism resists all counter-evidence.', ['ideological dogmatism', 'rigid dogmatism', 'intellectual dogmatism'], ['fanaticism', 'inflexibility', 'intolerance'], 'Philosophical noun.', '/ˈdɒɡ.mə.tɪ.zəm/', 'open-mindedness'],
      ['decouple', 'verb', 'To separate, disengage, or sever the connection between two linked concepts, systems, or entities.', 'Thinkers must decouple their factual beliefs from their social identity.', 'The reform decoupled healthcare from employment.', ['decouple identity from belief', 'decouple systems', 'completely decouple'], ['separate', 'disengage', 'isolate'], 'Analytical verb.', '/diːˈkʌp.əl/', 'entangle'],
      ['polarization', 'noun', 'The division of a population, group, or political body into sharply contrasting, mutually hostile factions.', 'Social media algorithms accelerate political polarization.', 'The debate caused severe cultural polarization.', ['political polarization', 'ideological polarization', 'affective polarization'], ['division', 'fracture', 'schism'], 'Political noun.', '/ˌpoʊ.lər.əˈzeɪ.ʃən/', 'unification'],
      ['incongruous', 'adjective', 'Not in harmony or keeping with the surroundings or other aspects of something; contradictory or inappropriate.', 'His defense of the dictator was incongruous with his human rights record.', 'The lavish banquet seemed incongruous in a famine zone.', ['glaringly incongruous', 'incongruous behavior', 'incongruous claim'], ['incompatible', 'conflicting', 'discordant'], 'Formal adjective.', '/ɪnˈkɒŋ.ɡru.əs/', 'harmonious'],
      ['prowess', 'noun', 'Distinguished bravery, skill, or extraordinary expertise in a particular activity or field.', 'Her analytical prowess allowed her to deconstruct the flawed study.', 'He was renowned for his mathematical prowess.', ['analytical prowess', 'intellectual prowess', 'technical prowess'], ['expertise', 'mastery', 'competence'], 'Formal noun.', '/ˈpraʊ.əs/', 'incompetence']
    ],
    chunks: [
      ['identity-protective cognition', 'The subconscious tendency to evaluate information in ways that protect one\'s social status and tribe.', 'Explaining ideological bias', 'Psychological · academic', 'Identity-protective cognition prevents voters from accepting inconvenient facts.', 'Explain political tribalism.', `When political loyalty is at stake, identity-protective cognition overrides objective truth.`, 'Core Kahan chunk.'],
      ['the smartness paradox', 'The counter-intuitive reality that higher cognitive ability often leads to greater polarization.', 'Formulating central dilemma', 'Cognitive · essayistic', 'The smartness paradox reveals that intelligence does not cure bias.', 'Introduce cognitive critique.', `Understanding the smartness paradox is essential for anyone analyzing modern culture wars.`, 'Conceptual headline chunk.'],
      ['an aggressive defense attorney', 'Viewing human rationality as a tool for defending emotional commitments rather than finding truth.', 'Metaphorizing cognitive bias', 'Psychological · rhetorical', 'The conscious mind acts as an aggressive defense attorney for our tribal feelings.', 'Deconstruct rationalizations.', `Reason is not an impartial judge; it is an aggressive defense attorney hired by our identity.`, 'Memorable analytical chunk.'],
      ['the scout mindset', 'The psychological drive to see reality as accurately as possible, regardless of tribal discomfort.', 'Advocating epistemic virtue', 'Philosophical · cognitive', 'Cultivating the scout mindset requires courage and epistemic modesty.', 'Propose intellectual solution.', `To overcome polarization, we must replace the soldier mindset with the scout mindset.`, 'Galefian mindset chunk.'],
      ['much as we might pride ourselves on', 'Conceding a cherished self-image before delivering a sobering psychological reality.', 'Opening high-register concession', 'Formal · rhetorical', 'Much as we might pride ourselves on our logic, we remain emotional creatures.', 'Introduce nuanced essay.', `Much as we might pride ourselves on rational independence, social belonging dictates our beliefs.`, 'C1 concessive chunk.'],
      ['the information-deficit model', 'The flawed assumption that people hold irrational views simply because they lack facts or education.', 'Critiquing naive pedagogical assumptions', 'Sociological · educational', 'Public health campaigns must move beyond the naive information-deficit model.', 'Deconstruct failed communication.', `Assuming that climate skeptics simply need more graphs is an error of the information-deficit model.`, 'High-register critique chunk.'],
      ['decouple identity from belief', 'The deliberate practice of separating who one is from what specific claims one currently holds.', 'Promoting cognitive freedom', 'Epistemological · personal', 'Maturing intellectually requires learning to decouple identity from belief.', 'Advise critical thinking.', `If you cannot decouple identity from belief, every counter-argument will feel like an existential assault.`, 'Actionable cognitive chunk.'],
      ['a division of epistemic labor', 'The necessary societal reliance on specialized experts and institutions to verify complex facts.', 'Defending social trust', 'Philosophical · sociological', 'Modern civilization depends upon a division of epistemic labor.', 'Explain institutional trust.', `Trusting medical researchers is a rational participation in the societal division of epistemic labor.`, 'Social epistemology chunk.'],
      ['far from being an impartial judge', 'Highlighting the sharp contrast between idealized rationality and actual human bias.', 'Emphasizing cognitive reality', 'Analytical · stylistic', 'Reason, far from being an impartial judge, is a partisan tool.', 'Deconstruct intellectual arrogance.', `Far from being an impartial judge of evidence, the human mind is an engine of motivated rationalization.`, 'Adversative contrast chunk.'],
      ['reputational destruction and social ostracization', 'The severe social penalties that prevent individuals from breaking with tribal orthodoxy.', 'Analyzing social costs', 'Sociological · dramatic', 'Questioning the dogma risks reputational destruction and social ostracization.', 'Explain intellectual conformity.', `Fear of reputational destruction and social ostracization keeps smart professionals in line.`, 'High-stakes sociological chunk.']
    ],
    collocations: [
      [`The research exposed the counter-intuitive ______ paradox in political debates.`, [`smartness`, `innocent`, `visceral`, `panoptic`], 0, `The smartness paradox is the key cognitive term.`],
      [`Voters engaged in identity-______ cognition to defend their party.`, [`protective`, `conflating`, `falsifying`, `spurious`], 0, `Identity-protective cognition is Dan Kahan's established term.`],
      [`Public health campaigns rely on the outdated information-______ model.`, [`deficit`, `gradient`, `tableau`, `punctum`], 0, `Information-deficit model describes the flawed educational assumption.`],
      [`Critical thinkers must ______ their personal identity from their beliefs.`, [`decouple`, `precipitate`, `ostracize`, `rationalize`], 0, `Decouple identity is the fixed philosophical phrase.`]
    ],
    upgrades: [
      [`Smart people believe weird things because they are crazy.`, `Highly educated individuals frequently defend irrational doctrines because superior cognitive capacity provides a formidable arsenal of tools for motivated rationalization.`],
      [`If you give people more facts, they will stop believing fake news.`, `Relying on the naive information-deficit model ignores the reality that identity-protective cognition leads partisans to reject contradictory data regardless of factual clarity.`],
      [`Even though we want to be logical, we are very tribal.`, `Much as we might pride ourselves on our intellectual objectivity, the evolutionary architecture of human reason functions primarily as a defense attorney for tribal belonging.`]
    ],
    think: {
      title: 'Extended Thinking Lab: Motivated Reasoning, Cognitive Dissonance, and the Smartness Paradox',
      lead: 'Deconstruct the psychological and evolutionary mechanics that allow high intelligence to serve ideological delusion rather than objective truth.',
      defs: [
        ['Motivated Numeracy Thesis', `The empirical finding that individuals with superior quantitative reasoning skills use those skills selectively to confirm ideologically congenial data while distorting identical contradictory data.`],
        ['The Social Epistemic Dilemma', `The structural conflict between the individual desire for empirical truth and the social imperative of maintaining status, belonging, and trust within one\'s community.`]
      ],
      items: [
        {
          id: '27t1',
          tag: 'Empirical Deconstruction',
          title: 'The Mechanics of Motivated Numeracy',
          task: `Explain why Dan Kahan\'s experiments revealed that highly numerate participants made MORE ideologically biased mathematical errors than less numerate participants when evaluating politically charged data.`,
          guide: `Show that high quantitative skill gave participants the cognitive firepower to spot subtle mathematical manipulations that supported their tribe while ignoring identical errors on the other side.`
        },
        {
          id: '27t2',
          tag: 'Evolutionary Psychology',
          title: 'The Argumentative Brain',
          task: `How does Mercier and Sperber\'s "argumentative theory of reason" explain why we are exceptionally good at spotting flaws in OTHER people\'s arguments while remaining completely blind to the flaws in our OWN?`,
          guide: `Explain that reason evolved as a competitive tool for social persuasion and group evaluation, making asymmetric critical scrutiny evolutionarily advantageous.`
        },
        {
          id: '27t3',
          tag: 'Social Cost Analysis',
          title: 'The Asymmetry of Belief Abandonment',
          task: `Analyze the structural incentives of an elite intellectual. Why is the personal and professional cost of publicly admitting a fundamental error in their tribe\'s orthodoxy far higher than the cost of maintaining a brilliant rationalization?`,
          guide: `Examine reputational capital, peer networks, institutional funding, and the psychological terror of social ostracization.`
        },
        {
          id: '27t4',
          tag: 'Cognitive Liberation Lab',
          title: 'Designing the Scout Mindset',
          task: `Formulate a four-step psychological protocol that an individual can practice to decouple their factual conclusions from their social identity when evaluating controversial evidence.`,
          guide: `Incorporate ideological Turing tests, self-distancing techniques, actively seeking out the strongest counter-arguments (steelmanning), and celebrating belief updates.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Sustaining Expansive, Deep Analytical Argumentation Across 800–1,200 Words',
        text: `In long-form essays analyzing human psychology and epistemology, a master writer avoids superficial bullet points. You must sustain multi-layered analytical momentum: setting up the historical Enlightenment ideal, deconstructing it with modern empirical data, analyzing evolutionary mechanisms, confronting counter-arguments, and outlining practical epistemic virtues.`,
        weak: `Smart people have biases too. They use their brains to make excuses. We need to be more open-minded.`,
        strong: `Much as we might flatter ourselves that high intelligence guarantees rational independence, cognitive science demonstrates that raw intellectual firepower frequently acts as a sophisticated defense attorney for tribal belonging. Far from immunizing the mind against error, superior analytical prowess merely equips the thinker with a formidable arsenal of rationalizations to protect identity from uncomfortable empirical reality.`
      },
      short: {
        kind: 'Psychological critique',
        title: 'The Anatomy of a Rationalization',
        min: 180,
        max: 260,
        prompt: `Analyze a historical or contemporary controversy where highly educated professionals defended an indefensible position. In a concise analytical critique (180–260 words), explain how "identity-protective cognition" and the "smartness paradox" operated. Incorporate a concessive clause starting with *Much as* or *However much*.`,
        support: [
          `Identify the specific controversy and the educated group involved.`,
          `Deploy an opening concession using *Much as* (*Much as these experts claimed objective neutrality...*).`,
          `Explain how intellectual ability was weaponized to rationalize ideological bias.`,
          `Conclude on the personal cost of breaking with group consensus.`
        ],
        guide: [
          `Use precise terminology: *identity-protective cognition*, *the smartness paradox*, *motivated rationalization*, *epistemic tribalism*.`,
          `Maintain an objective, analytical tone.`
        ]
      },
      main: {
        kind: 'Long-form analytical essay',
        title: 'The Lawyer in the Brain: Why Smart People Defend Bad Arguments',
        min: 800,
        max: 1200,
        main: true,
        prompt: `Why do intelligent, highly educated, and articulate individuals frequently defend arguments and doctrines that they would immediately reject from someone else? In an expansive, deeply structured long-form essay (800–1,200 words), evaluate the cognitive, evolutionary, and sociological forces that decouple intelligence from objective rationality. Analyze Dan Kahan’s research on motivated numeracy, Mercier and Sperber’s argumentative theory of reason, the social rationality of tribal conformity, and Julia Galef’s concept of the scout mindset. Deploy sophisticated concessive clauses (*Much as...*, *However much...*), dynamic adversative contrast (*far from being...*), and rigorous C1 academic vocabulary throughout.`,
        support: [
          `Introduction (120–160 words): Deconstruct the naive "information-deficit model"; establish the thesis that intelligence often functions as an evolutionary tool for tribal defense rather than solitary truth-seeking.`,
          `Section 1 · The Smartness Paradox & Motivated Numeracy (180–220 words): Analyze Dan Kahan’s Yale empirical findings; demonstrate how high cognitive capacity supercharges motivated data distortion.`,
          `Section 2 · The Evolutionary Architecture of Reason (180–220 words): Deconstruct Mercier & Sperber’s argumentative theory of reason; explain why the brain operates as a defense attorney rather than an impartial judge.`,
          `Section 3 · The Social Rationality of Belonging (160–200 words): Address the counter-perspective using advanced concession (*Much as...*, *Granted that...*); explain why tribal conformity is a rational evolutionary adaptation to social interdependence.`,
          `Section 4 · The Scout Mindset and Decoupling Identity (180–220 words): Outline the psychological discipline required to overcome identity-protective cognition; explain how to decouple identity from belief.`,
          `Conclusion (100–140 words): Synthesize the cognitive dilemma; deliver a definitive verdict on critical thinking as an emotional and moral virtue rather than a pure IQ metric.`
        ],
        guide: [
          `Sustain deep, rigorous argumentation across the full 800–1,200 word target.`,
          `Ensure flawless deployment of *Much as*, *However + adjective*, and *far from [gerund]*.`,
          `Incorporate essential lexical assets: *motivated numeracy*, *the smartness paradox*, *the information-deficit model*, *identity-protective cognition*, *social ostracization*, *scout mindset*.`,
          `Maintain an authoritative, scholarly, and penetrating essayistic register throughout.`
        ]
      }
    },
    edit: {
      checklist: [
        `Does the essay meet the full 800–1,200 word count requirement with deep, substantive argumentation?`,
        `Are concessive structures (*Much as*, *However much*) constructed with accurate syntax and high register?`,
        `Are dynamic contrastive structures (*far from being*, *rather than functioning as*) deployed effectively?`,
        `Does the analysis treat the counter-argument regarding social coordination with intellectual empathy?`,
        `Is the tone consistently formal, analytical, and penetrating?`
      ],
      challenges: [
        {
          id: '27e1',
          title: 'Upgrading Concession and Contrast',
          bad: `Although smart people know a lot of math, they still lie to themselves when politics comes up because they want to fit in.`,
          task: `Revise using "Much as we might assume..." and sophisticated cognitive terminology (*quantitative prowess, motivated numeracy, identity-protective cognition*).`,
          good: `Much as we might assume that advanced quantitative prowess guarantees objective analysis, empirical evidence demonstrates that when political identity is threatened, highly numerate individuals effortlessly deploy their skills in the service of motivated rationalization.`
        },
        {
          id: '27e2',
          title: 'Polishing Adversative Inversion',
          bad: `The human brain is not a computer for truth. It is just a lawyer for our feelings.`,
          task: `Rewrite using "Far from functioning as...", "rather than", and C1 psychological register.`,
          good: `Far from functioning as an impartial truth-seeking computer, the human intellect operates predominantly as a partisan defense attorney, engineered to justify emotional commitments rather than discover objective reality.`
        }
      ]
    },
    retrieve: {
      content: `What is the "smartness paradox," and why does higher education sometimes increase political polarization rather than reducing it?`,
      contentGuide: `Higher intelligence and analytical training provide individuals with more sophisticated cognitive tools to rationalize ideologically preferred outcomes and defend tribal orthodoxies against contradictory evidence.`,
      grammar: `Rewrite this sentence using "Much as" to establish a high-register concession: "Although we wish reason were pure logic, it is deeply bound to social identity."`,
      grammarGuide: `Expected: "Much as we might wish reason were pure logic, it is deeply bound to social identity."`,
      reasoning: `Why does Hugo Mercier and Dan Sperber\'s "argumentative theory of reason" challenge the classical view of human rationality?`,
      reasoningGuide: `It posits that reason evolved not for solitary discovery of abstract truth, but as a social communicative tool to persuade others, win arguments, and justify actions within the tribe.`,
      summary: `In Unit 27, you examined the psychological, evolutionary, and sociological forces behind motivated reasoning. You mastered advanced concessive clauses (*Much as*, *However much*), adversative contrast, and long-form essay architecture.`
    }
  });

  K.units['27'].listening = [
    {
      id: '27l1',
      title: 'Dialogue: The Motivated Numeracy Experiment',
      format: 'Discussion between a behavioral economist and a science broadcaster',
      lead: 'Listen to a breakdown of Dan Kahan\'s famous Yale experiment on why math skills fail to protect people from political bias.',
      audio: 'audio/unit-27-listening-1.mp3',
      transcript: `[Broadcaster]: Dr. Vance, most people assume that political polarization is caused by a lack of education. If we just taught everyone more statistics and science, they argue, voters would look at data rationally and agree on the facts. Why is that assumption fundamentally flawed?\n\n[Economist]: Because it relies on the naive 'information-deficit model.' In twenty thirteen, Dan Kahan at Yale tested over a thousand Americans on their raw mathematical capability. He gave them a complex contingency table with numbers about whether a medical skin cream worked. High-math participants solved it with ease, while low-math participants struggled.\n\n[Broadcaster]: That seems completely normal.\n\n[Economist]: But then came the crucial twist. He gave them the exact same numbers, but changed the labels from 'skin cream' to 'a ban on concealed handguns.' When the correct mathematical answer contradicted their political ideology, the highly numerate participants suddenly miscalculated the math!\n\n[Broadcaster]: The smart people failed the math?\n\n[Economist]: They didn't just fail accidentally; they used their mathematical prowess selectively to confirm what they wanted to believe. If the data showed their preferred policy worked, they calculated it in seconds. If the data showed their policy failed, they engaged in elaborate motivated reasoning to find non-existent mathematical flaws. Intelligence became an instrument of rationalization rather than truth-seeking.`,
      questions: [
        {
          id: '27l1q1',
          type: 'mc',
          q: 'What happened when highly numerate participants were presented with politicized data that contradicted their ideology?',
          options: [
            'They immediately changed their political party affiliation.',
            'They selectively miscalculated or manipulated the math to defend their pre-existing political worldview.',
            'They refused to look at the numbers and walked out of the room.',
            'They performed significantly better than on the neutral skin cream test.'
          ],
          answer: 1,
          explain: 'Kahan’s study proved that high numeracy was weaponized to rationalize political bias rather than calculate objective truth.'
        },
        {
          id: '27l1q2',
          type: 'mc',
          q: 'What does this experiment reveal about the "information-deficit model"?',
          options: [
            'That people are incapable of learning mathematics.',
            'That simply providing more data and scientific education is insufficient to eliminate polarization, because intelligence is co-opted by identity-protective cognition.',
            'That all medical skin creams are ineffective.',
            'That political parties should be banned from running election campaigns.'
          ],
          answer: 1,
          explain: 'The experiment proves that information deficit is not the root cause of polarization; identity-protective cognition co-opts intelligence.'
        }
      ]
    },
    {
      id: '27l2',
      title: 'Monologue: The Soldier and the Scout',
      format: 'Philosophical & psychological lecture',
      lead: 'A lecture contrasting the soldier mindset of ideological warfare with the scout mindset of objective truth-seeking.',
      audio: 'audio/unit-27-listening-2.mp3',
      transcript: `In cognitive psychology, we frequently categorize how the mind approaches belief through two vivid metaphors: the Soldier and the Scout.\n\nThe Soldier mindset is rooted in defensive and offensive warfare. For the soldier, ideas are either allies or enemies. When an argument agrees with our tribe, we greet it as a friendly soldier, asking only: 'Can I believe this?' When an argument challenges our dogma, we treat it as an enemy assault, demanding: 'Must I believe this?'—searching frantically for any tiny flaw to shoot it down.\n\nThe Scout mindset, by contrast, operates on an entirely different philosophy. The scout is not interested in attacking or defending; the scout’s sole duty is to go out into the terrain and map reality as accurately as possible. The scout wants to know where the bridges are, where the rivers run, and where the traps lie, regardless of whether that reality is pleasant or terrifying.\n\nTo move from the soldier to the scout requires something far rarer than high IQ: it requires emotional courage. It requires being proud when you realize you were wrong, because discovering an error means you are now less wrong than you were five minutes ago. Genuine intellectual greatness is not about having a brilliant brain; it is about having the humility to let reality change your mind.`,
      questions: [
        {
          id: '27l2q1',
          type: 'mc',
          q: 'How does the "Soldier mindset" evaluate opposing arguments according to the lecturer?',
          options: [
            'With calm, objective mathematical calculation.',
            'As an enemy assault, demanding "Must I believe this?" and frantically searching for any excuse to dismiss it.',
            'By translating the argument into foreign languages.',
            'By consulting historical encyclopedias.'
          ],
          answer: 1,
          explain: 'The soldier mindset treats opposing arguments as threats to be shot down rather than evaluated objectively.'
        },
        {
          id: '27l2q2',
          type: 'mc',
          q: 'What emotional quality distinguishes the "Scout mindset"?',
          options: [
            'Extreme aggression in debates.',
            'The emotional courage and humility to map reality accurately and take pride in updating beliefs when proven wrong.',
            'A total lack of interest in science or politics.',
            'An absolute refusal to speak to other people.'
          ],
          answer: 1,
          explain: 'The scout mindset is driven by curiosity, humility, and the desire to see reality accurately regardless of personal comfort.'
        }
      ]
    }
  ];

  K.units['27'].speaking = {
    part1: [
      { q: `When someone presents evidence that proves you were wrong about a factual issue, how do you usually react emotionally?`, guide: `Discuss the initial prick of defensiveness versus the conscious discipline of updating your perspective.` },
      { q: `Why do you think political arguments on social media so rarely result in anyone changing their mind?`, guide: `Discuss performative identity, audience pressure, the soldier mindset, and identity-protective cognition.` },
      { q: `Do you have friends or family members whose political beliefs are completely different from yours? How do you maintain a positive relationship?`, guide: `Reflect on separating human empathy from ideological disagreement and focusing on shared values.` }
    ],
    part2: {
      topic: `Describe a time when you realized that an opinion or belief you strongly held was actually based on bias or incomplete information.`,
      prompts: [
        `What the belief was and why you originally held it with confidence`,
        `What new information, experience, or argument forced you to reconsider`,
        `How difficult it was emotionally or socially to change your mind`,
        `And explain what this experience taught you about the difference between intelligence and open-mindedness.`
      ],
      guide: `Structure your response with clear narrative tension: initial conviction, cognitive dissonance, the turning point of evidence, and a mature philosophical reflection on the scout mindset.`
    },
    part3: [
      { q: `In an era of hyper-polarization, can public universities still function as neutral spaces for open intellectual inquiry?`, guide: `Discuss ideological conformity, peer pressure, institutional incentives, and the protection of academic freedom.` },
      { q: `Why do highly educated societies often experience greater political division than societies with lower average levels of formal education?`, guide: `Analyze the smartness paradox, the professionalization of politics, and the weaponization of motivated reasoning.` },
      { q: `How can parents and educators train children to cultivate a 'scout mindset' from an early age?`, guide: `Advocate for rewarding intellectual curiosity, celebrating belief updating, teaching cognitive biases, and modeling emotional humility.` }
    ],
    followUp: `If an intelligent person is very good at debating, does that make them more likely to find the truth?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'ra·tion·al·ize', 'pa·ri·ah', 'dis·so·nance', 'nu·mer·ate', 'po·lar·i·za·tion'.`,
      grammar: `Natural deployment of complex concessive clauses ('Much as we might pride ourselves on...', 'However much...') and dynamic adversative contrast ('far from being...').`,
      discourse: `Coherent, sophisticated argumentation distinguishing raw cognitive intelligence from emotional open-mindedness and epistemic virtue.`,
      vocabulary: `Effective use of terms such as 'identity-protective cognition', 'the smartness paradox', 'the scout mindset', 'motivated numeracy', and 'the information-deficit model'.`
    }
  };
})(window.KLANG = window.KLANG || {});
