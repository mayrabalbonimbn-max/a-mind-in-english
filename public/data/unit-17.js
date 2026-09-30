/* UNIT 17 · WHEN AI DOES THE THINKING FOR US */
(function (K) {
  K.units['17'] = K.makeUnit('17', {
    module: 4, title: 'When AI does the thinking', titleEm: 'for us',
    question: 'What happens when a tool becomes good enough to perform the thinking we once had to do ourselves?',
    knowLead: `Throughout history, technological tools have amplified human physical capacity—the plow amplified muscle, the steam engine amplified transport, and the calculator amplified arithmetic. In the twenty-first century, artificial intelligence and large language models represent a profound qualitative shift: they amplify and substitute for cognitive labor. As AI systems draft essays, generate code, summarize evidence, and compose arguments, they raise fundamental questions about cognitive offloading, intellectual deskilling, and human agency. Keep the distinction between cognitive automation and intellectual cultivation in mind as you read.`,
    terms: [
      ['Cognitive offloading', `The practice of using physical or digital tools (such as search engines, calculators, or AI assistants) to reduce the mental demand required to complete a task.`],
      ['Epistemic deskilling', `The gradual loss of human critical faculties, analytical stamina, or domain expertise resulting from prolonged reliance on automated cognitive systems.`],
      ['Large language model (LLM)', `A deep learning model trained on massive text corpora that predicts and generates statistically probable sequences of words in response to prompts.`],
      ['Generative agency', `The capacity of human beings to originate thoughts, synthesize novel ideas, and formulate authentic intellectual intentions without algorithmic pre-filtering.`],
      ['Heuristic reliance', `The psychological tendency to trust automated algorithmic outputs uncritically due to the illusion of machine objectivity.`]
    ],
    views: [
      'Two perspectives on cognitive automation',
      'The cognitive liberation view',
      `AI liberates human minds from routine semantic drudgery, allowing thinkers to operate at higher levels of abstraction, creativity, strategic synthesis, and interdisciplinary problem-solving.`,
      'The cognitive atrophy view',
      `Deep understanding is forged through the very friction of struggling with language, memory, and syntax. Offloading cognitive labor leads to intellectual decay, superficial thinking, and passive consumption.`,
      `The question is whether AI functions as an intellectual bicycle that expands human agency or as an intellectual crutch that induces cognitive atrophy.`
    ],
    knowPrompt: `When a student uses an AI to generate a first draft of an essay and then edits it, what cognitive steps did they bypass, and what skills did they actually practice?`,
    knowGuide: [
      `Distinguish the effort of formulating a thesis from scratch from the task of editing machine output.`,
      `Consider what happens to structural memory and analytical stamina when wrestling with blank pages is eliminated.`
    ],
    read: {
      main: {
        format: 'Philosophical & technological essay', title: 'The Friction of Thought: On AI and the Struggle for Understanding',
        standfirst: `When we outsource the struggle with sentences, we do not simply save time. We risk losing the very friction through which thoughts are formed.`,
        pull: { after: 6, text: `You do not write because you already know what you think; you write in order to discover what you are capable of thinking.` },
        notes: { 2: `<b>Plato's Phaedrus</b> records Socrates’ warning that the invention of writing would destroy human memory and implant forgetfulness.`, 5: `<b>Andy Clark and David Chalmers</b> proposed the <i>Extended Mind Thesis</i> in 1998, arguing that cognitive tools become physical extensions of human thought.` },
        paras: [
          `In the fourth century BCE, in the dialogue *Phaedrus*, Plato recorded Socrates’ famous warning regarding the latest technological disruption of his day: the written word. Socrates argued that the invention of writing would implant forgetfulness in the souls of learners, because they would cease to exercise their memory. Relying on external marks rather than internal recollection, people would possess the appearance of wisdom without its reality; they would become tiresome companions who knew nothing, yet believed they knew everything. For two millennia, intellectual historians treated Socrates’ anxiety as a cautionary tale about conservative technophobia. Writing did not destroy human thought; it preserved, democratized, and expanded it across civilizations.`,
          `Yet as generative artificial intelligence systems begin to perform complex analytical tasks—drafting legal briefs, synthesizing medical research, writing software code, and composing prose—the ancient Socratic question returns with unprecedented urgency. For the first time in human history, we are not merely offloading memory or physical labor to an external medium; we are offloading the active process of semantic formulation itself. To understand what this means for human intellect requires examining the relationship between language, cognitive struggle, and understanding.`,
          `The dominant technological narrative presents artificial intelligence as the ultimate cognitive amplifier. Proponents argue that by the time current learners reach professional maturity, AI assistants will have eliminated the tedious mechanical drudgery of drafting and information retrieval. In this optimistic vision, humans will no longer need to spend hours struggling with introductory paragraphs or wrestling with recalcitrant syntax. Instead, we will operate as high-level directors, orchestrating machine outputs, prompting algorithms with strategic vision, and curating vast syntheses of knowledge. The machine handles the cognitive heavy lifting; the human supplies the taste, the values, and the executive judgment.`,
          `This vision rests on a flawed, instrumentalist theory of human cognition. It assumes that thoughts exist fully formed in the mind like finished statues, and that writing is merely the mechanical packaging of those thoughts into linguistic containers. But anyone who has ever wrestled with a complex essay knows that this is a psychological illusion. You do not write because you already know what you think; you write in order to discover what you are capable of thinking. The very struggle to find the right word, to eliminate a contradiction, or to construct a valid paragraph is the process through which vague intuitions are transformed into precise knowledge.`,
          `When you offload that struggle to a machine, you bypass the cognitive friction that creates neural synthesis. If an AI generates a structured four-hundred-word argument in three seconds, you may read it and agree with its logic. But reading a polished argument is an entirely different cognitive act from originating one. When you merely evaluate and edit machine text, you exercise passive recognition rather than active generation. Over time, reliance on automated formulation induces epistemic deskilling: the analytical muscles required to sustain long-form reasoning, tolerate ambiguity, and hold complex architectures in working memory gradually atrophy.`,
          `Consider what happens to the act of reading and synthesis. In the coming decade, millions of knowledge workers will be using AI to summarize books, analyze reports, and digest correspondence. By 2030, professionals will have been offloading reading to automated agents for nearly a generation. But a summary delivers only the explicit conclusion of a text; it strips away the subtle rhetorical qualifications, the counterintuitive evidence, and the stylistic texture that taught the reader how to think along the author's path. When we consume only machine-generated summaries, we consume pre-digested conclusions without experiencing the intellectual journey that made those conclusions credible.`,
          `Furthermore, language models are fundamentally conservative in an epistemological sense. They do not reason from first principles or experience physical reality; they predict the most statistically probable sequence of tokens based on vast historical datasets. Consequently, automated text naturally gravitates toward the center of the linguistic bell curve—toward the polished, the unoffensive, the clichéd, and the consensus view. If an entire generation of students and professionals relies on these systems to generate their first drafts, public discourse will suffer a catastrophic homogenization. Genuine originality—the jagged, idiosyncratic insight that challenges prevailing dogmas—will be systematically smoothed away by algorithms optimized for statistical plausibility.`,
          `The challenge before us is not to retreat into a futile, luddite rejection of computational tools. AI will inevitably transform every intellectual discipline, and those who master its affordances will accomplish tasks at speeds unimaginable to previous generations. But we must establish clear boundaries between tools that extend human agency and systems that replace it. True cognitive mastery will belong not to those who blindly outsource their thinking to algorithms, but to those who cultivate the disciplined, independent intellect required to cross-examine the machine, challenge its statistical biases, and preserve the irreplaceable friction of human thought.`
        ]
      },
      counter: {
        format: 'Technological defense', title: 'The Extended Mind and the New Cognitive Leverage',
        standfirst: `Viewing AI as cognitive decay repeats the historic error of confusing tool use with mental decline.`,
        paras: [
          `Critics of cognitive offloading have warned against every major information technology since the printing press, the calculator, and the internet search engine. In each instance, prophets of intellectual doom predicted that human memory and mental discipline would be destroyed. In each instance, human cognition adapted, offloading lower-level mechanical tasks to create space for higher-order creativity and systemic complexity.` ,
          `In their foundational 1998 paper on the Extended Mind Thesis, philosophers Andy Clark and David Chalmers demonstrated that human thought has never been trapped inside the biological skull. Human intelligence is inherently hybrid: it functions by coupling biological brains with external cognitive scaffolding—notebooks, mathematical notation, physical instruments, and digital databases. Large language models represent the next evolutionary step in this cognitive symbiosis.` ,
          `Far from inducing mental laziness, collaborating with an advanced AI partner can dramatically elevate human reasoning. A researcher working with an LLM can simulate multi-perspective debate, stress-test hypotheses against opposing frameworks, rapidly generate counterexamples, and explore vast interdisciplinary connections that would take decades to compile manually.` ,
          `The danger is not the technology itself, but the lack of pedagogical training in critical AI interaction. When individuals learn to treat the machine as a dialectical partner rather than an oracle, artificial intelligence does not diminish human intellect—it unlocks unprecedented cognitive leverage.`
        ]
      }
    },
    sources: [
      { title: 'The Extended Mind (Andy Clark & David Chalmers)', url: 'https://doi.org/10.1093/0199262615.003.0002', note: 'Foundational paper in cognitive science arguing that external tools form part of the mind.' },
      { title: 'Phaedrus (Plato)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0174', note: 'Classic philosophical dialogue on memory, rhetoric, and the invention of writing.' },
      { title: 'The Shallows: What the Internet Is Doing to Our Brains (Nicholas Carr)', url: 'https://wwnorton.com/books/9780393339758', note: 'Influential study on cognitive offloading, neural plasticity, and deep attention.' }
    ],
    interpret: [
      { id: '17i1', type: 'mc', tag: 'Main idea', q: `What is the central thesis of the main essay regarding generative AI and human thought?`, options: [`AI is evil and should be completely banned in schools.`, `Offloading the struggle of writing and formulation to AI risks epistemic deskilling because thinking is forged through the very friction of linguistic struggle.`, `Plato was completely right and writing should never have been invented.`, `AI will replace human doctors by the end of this year.`], answer: 1, explain: `The essay argues that writing is not packaging pre-existing thoughts, but the active friction through which deep understanding is created.` },
      { id: '17i2', type: 'mc', tag: 'Inference', q: `Why does the author argue that large language models naturally promote intellectual homogenization?`, options: [`Because they are programmed by a single person in California.`, `Because they predict the most statistically probable token sequences from historical datasets, smoothing away idiosyncratic, non-conformist insights.`, `Because computers cannot generate English sentences.`, `Because language models only read poetry.`], answer: 1, explain: `Paragraph 7 explains that statistical token prediction pulls language toward historical consensus and unoffensive averages.` },
      { id: '17i3', type: 'tf', tag: 'Detail', q: `According to the main text, reading an AI-generated summary provides the exact same cognitive benefits as reading the original complete text.`, answer: false, explain: `Paragraph 6 explicitly states that summaries strip away the rhetorical texture, qualifications, and intellectual struggle that teach readers how to think.` },
      { id: '17i4', type: 'mc', tag: 'Counterpoint argument', q: `What is the core argument of Clark and Chalmers's Extended Mind Thesis cited in the counterpoint?`, options: [`Human thinking has always relied on coupling the biological brain with external cognitive tools and scaffolding.`, `Computers will develop human consciousness within five years.`, `The human skull is impenetrable to all technology.`, `Nobody should use calculators in school.`], answer: 0, explain: `The Extended Mind Thesis argues that human intelligence is inherently hybrid, using external artifacts as cognitive extensions.` },
      { id: '17i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 4, what psychological illusion does the author deconstruct regarding how human thoughts are formed?`, rows: 4, guide: [`Deconstructs the illusion that thoughts exist fully formed in the mind before writing.`, `Explains that writing is discovery and synthesis, not merely packaging finished ideas.`] },
      { id: '17i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the distinction between "passive recognition" and "active generation" explain the risk of epistemic deskilling when using AI?`, rows: 5, guide: [`Active generation builds working memory, syntax control, and analytical stamina.`, `Passive recognition (reading machine drafts) only tests surface plausibility without exercising deep reasoning muscles.`] },
      { id: '17i7', type: 'open', tag: 'Application', q: `Describe a specific academic or professional workflow where AI is used as an "intellectual bicycle" (amplifying human thought) versus an "intellectual crutch" (replacing human thought).`, rows: 5, guide: [`Bicycle: simulating counterarguments, finding edge cases, generating testing code for human-designed architectures.`, `Crutch: asking AI to write the essay or thesis from scratch without original human synthesis.`] }
    ],
    notice: [
      {
        title: 'Future forms, Future Continuous, and Future Perfect',
        sub: 'Projecting technological trajectories, ongoing processes, and completed milestones with temporal precision',
        examples: [
          `By 2030, professionals <b>will have been offloading</b> cognitive tasks for a decade. (Future Perfect Continuous)`,
          `By the end of the century, AI systems <b>will have reshaped</b> the knowledge economy. (Future Perfect)`,
          `In the coming years, millions of workers <b>will be collaborating</b> with autonomous agents. (Future Continuous)`,
          `The technology <b>is going to redefine</b> how we conceptualize human intelligence. (Predictive intentional future)`
        ],
        questions: [
          `How does the Future Perfect (*will have completed*) establish a completed milestone before a specific future date?`,
          `Why is the Future Continuous (*will be working*) used for ongoing background processes in the future?`,
          `What is the difference between *will transform* (simple prediction) and *will have transformed* (retrospective look from a future point)?`
        ],
        explain: `<p>High-level technological and predictive writing uses advanced future aspects to model complex timelines:</p><ul><li><b>Future Continuous (will be + -ing):</b> An ongoing activity unfolding across a future period (<i>By next year, students will be using these tools daily</i>).</li><li><b>Future Perfect (will have + past participle):</b> An action that will be completed prior to a designated future time boundary (<i>By 2035, automation will have altered every white-collar profession</i>).</li><li><b>Future Perfect Continuous (will have been + -ing):</b> Duration leading up to a specific future point (<i>By 2040, society will have been adapting to AI for two decades</i>).</li></ul>`,
        compare: { head: ['Basic future', 'Advanced future aspect', 'Temporal precision'], rows: [['AI will change the legal field in five years.', 'Within five years, automated systems will have fundamentally transformed legal research.', 'Establishes a completed transformation by the deadline.'], ['People will use algorithms next decade.', 'Throughout the next decade, citizens will be navigating increasingly algorithmic environments.', 'Frames the future as an unfolding, lived reality.']] },
        practice: [
          [`Combine into Future Perfect: <i>AI will advance. The year 2030 will arrive before that.</i>`, `By 2030, AI will have advanced beyond current benchmarks.`, `Uses Future Perfect with time marker.`],
          [`Transform into Future Continuous: <i>Next year, millions of students are going to write essays with LLMs.</i>`, `Next year, millions of students will be writing essays with LLMs.`, `Uses Future Continuous for ongoing future trend.`],
          [`Correct the future aspect error: <i>By the time she graduates, she will study computer science for four years.</i>`, `By the time she graduates, she will have been studying computer science for four years.`, `Uses Future Perfect Continuous for duration leading to future point.`]
        ],
        radar: [
          { wrong: 'By 2030, they will finish the transition.', right: 'By 2030, they will have finished the transition.', why: 'Use Future Perfect (will have + participle) with "by [future date]".' },
          { wrong: 'In the next years, we will be adapt to new machines.', right: 'In the coming years, we will be adapting to new machines.', why: 'Future Continuous requires will be + verb-ing.' }
        ],
        help: `<p><b>Em português:</b> O <i>Future Perfect</i> (<i>will have transformed</i> = terá transformado) e o <i>Future Continuous</i> (<i>will be using</i> = estará usando) são fundamentais para projeções tecnológicas e ensaios preditivos.</p>`
      },
      {
        title: 'Verbs of cognition, friction, and intellectual transformation',
        sub: 'Describing mental processes with academic precision',
        examples: [
          `Automated systems <b>bypass the cognitive friction</b> essential for deep learning.`,
          `Relying on pre-digested summaries <b>induces epistemic deskilling</b>.`,
          `The struggle with syntax <b>forges conceptual clarity</b>.`
        ],
        questions: [
          `How do verbs like "forge", "bypass", "atrophy", and "induce" elevate cognitive analysis?`,
          `Why is "struggling with syntax" a more precise description of writing than "doing homework"?`
        ],
        explain: `<p>Master specialized verbs of cognitive psychology (<b>induce, bypass, forge, atrophy, offload, cultivate, scaffold</b>) to articulate how tools interact with human thought.</p>`,
        compare: { head: ['Everyday description', 'Cognitive analysis', 'Conceptual gain'], rows: [['Using AI makes you forget how to think.', 'Uncritical cognitive offloading induces epistemic deskilling and analytical atrophy.', 'Scholarly psychological diagnosis.']] },
        practice: [
          [`Upgrade using "forge" and "friction": <i>Writing hard sentences helps you think clearly.</i>`, `Deep conceptual understanding is forged through the friction of wrestling with complex sentences.`, `Academic conceptual upgrade.`]
        ],
        radar: [
          { wrong: 'The tool offloads the human of thinking.', right: 'The tool offloads cognitive demand from the human.', why: 'Offload takes [task/demand] from [person], or offload [task] to [tool].' }
        ],
        help: `<p><b>Em português:</b> Expressões como <i>cognitive offloading</i> (descarga cognitiva), <i>epistemic deskilling</i> (desqualificação epistêmica) e <i>bypass the friction</i> (burlar o atrito intelectual) estruturam o debate contemporâneo sobre IA.</p>`
      }
    ],
    vocab: [
      ['offloading', 'noun', 'The practice of transferring cognitive or physical tasks to external tools.', 'Cognitive offloading reduces short-term mental effort but may weaken long-term memory.', 'The app facilitates the offloading of daily scheduling.', ['cognitive offloading', 'mental offloading', 'offload tasks'], ['delegation', 'externalization', 'outsourcing'], 'Cognitive science noun.', '/ˈɒfˌləʊ.dɪŋ/', null],
      ['deskilling', 'noun', 'The reduction in the skill, proficiency, or expertise required to perform a job or intellectual task.', 'Automated legal software risks the deskilling of junior associates.', 'Epistemic deskilling threatens critical humanities research.', ['epistemic deskilling', 'intellectual deskilling', 'technological deskilling'], ['de-skilling', 'devaluation', 'erosion of skill'], 'Sociological and cognitive noun.', '/diːˈskɪl.ɪŋ/', 'upskilling'],
      ['atrophy', 'verb', 'Gradually decline in effectiveness, vigor, or capacity due to underuse or neglect.', 'Analytical faculties atrophy when citizens rely entirely on pre-digested summaries.', 'Without practice, musical ability will atrophy.', ['intellectual atrophy', 'gradually atrophy', 'atrophy over time'], ['wither', 'decay', 'deteriorate'], 'Biological metaphor in cognitive science.', '/ˈæt.rə.fi/', 'flourish'],
      ['scaffolding', 'noun', 'Temporary support structures that enable learning, construction, or complex cognitive performance.', 'External notes act as cognitive scaffolding for complex mathematical reasoning.', 'Educational software provides scaffolding for young readers.', ['cognitive scaffolding', 'pedagogical scaffolding', 'intellectual scaffolding'], ['framework', 'support', 'structure'], 'Education and psychology noun.', '/ˈskæf.əl.dɪŋ/', null],
      ['homogenization', 'noun', 'The process of making things uniform, similar, or identical.', 'Algorithmic text generation leads to the homogenization of public discourse.', 'Global media accelerates cultural homogenization.', ['cultural homogenization', 'linguistic homogenization', 'intellectual homogenization'], ['standardization', 'uniformity', 'assimilation'], 'Sociological noun.', '/həˌmɒdʒ.ə.naɪˈzeɪ.ʃən/', 'diversification'],
      ['plausibility', 'noun', 'The quality of seeming reasonable, probable, or believable.', 'Language models generate text optimized for statistical plausibility rather than truth.', 'The detective questioned the plausibility of the alibi.', ['statistical plausibility', 'superficial plausibility', 'apparent plausibility'], ['credibility', 'likelihood', 'believability'], 'Epistemology noun.', '/ˌplɔː.zəˈbɪl.ə.ti/', 'implausibility'],
      ['symbiosis', 'noun', 'A mutually beneficial interaction or relationship between different entities or organisms.', 'The goal of human-computer interaction is cognitive symbiosis.', 'Fungi and tree roots live in a biological symbiosis.', ['cognitive symbiosis', 'mutually beneficial symbiosis', 'close symbiosis'], ['partnership', 'cooperation', 'interdependence'], 'Scientific metaphor.', '/ˌsɪm.baɪˈəʊ.sɪs/', 'parasitism'],
      ['idiosyncratic', 'adjective', 'Relating to idiosyncratic, unique, or peculiar individual characteristics.', 'Genuine artistic voice is deeply idiosyncratic and non-linear.', 'She possessed an idiosyncratic approach to theoretical physics.', ['idiosyncratic style', 'idiosyncratic insight', 'idiosyncratic voice'], ['distinctive', 'unique', 'individual'], 'High-frequency adjective.', '/ˌɪd.i.ə.sɪŋˈkræt.ɪk/', 'generic'],
      ['recalcitrant', 'adjective', 'Stubbornly resistant to control, authority, or easy formulation.', 'Writing involves wrestling with recalcitrant syntax and messy thoughts.', 'The committee dealt with a recalcitrant minority.', ['recalcitrant syntax', 'recalcitrant material', 'recalcitrant problem'], ['unyielding', 'stubborn', 'intractable'], 'Literary descriptive adjective.', '/rɪˈkæl.sɪ.trənt/', 'amenable'],
      ['instrumental', 'adjective', 'Serving as an instrument or means in pursuing an aim or policy; pragmatic.', 'Viewing writing as a purely instrumental container misses its discovery function.', 'She played an instrumental role in securing the funding.', ['instrumental view', 'instrumental reason', 'instrumental value'], ['pragmatic', 'functional', 'utilitarian'], 'Philosophical adjective.', '/ˌɪn.strəˈmen.təl/', 'intrinsic']
    ],
    chunks: [
      ['the friction of thought', 'The necessary intellectual resistance experienced when formulating ideas.', 'Affirming deep intellectual struggle', 'Philosophical · essayistic', 'Deep understanding is forged through the friction of thought.', 'Defend the effort of writing.', `We must preserve the friction of thought against the allure of effortless automation.`, 'Core unit thesis chunk.'],
      ['an intellectual bicycle, not a crutch', 'Using technology to expand human agency rather than substitute for human capacity.', 'Setting criteria for tool use', 'Metaphorical · analytical', 'AI should function as an intellectual bicycle, not an intellectual crutch.', 'Evaluate educational software.', `Good tools act as an intellectual bicycle that expands the reach of human reasoning.`, 'Classic Steve Jobs/Illich metaphor.'],
      ['epistemic deskilling and cognitive atrophy', 'The loss of critical thinking and working memory caused by technological over-reliance.', 'Diagnosing cognitive decline', 'Academic · psychological', 'Over-reliance on automated agents leads to epistemic deskilling and cognitive atrophy.', 'Warn against passive tool use.', `Students risk epistemic deskilling and cognitive atrophy if they never draft essays from scratch.`, 'Psychological diagnosis chunk.'],
      ['the linguistic bell curve', 'The statistical middle ground of generic, probable, inoffensive language.', 'Critiquing algorithmic blandness', 'Critical · analytical', 'LLM prose naturally gravitates toward the center of the linguistic bell curve.', 'Analyze machine style.', `Generative AI produces clean text that sits comfortably in the middle of the linguistic bell curve.`, 'Technological critique chunk.'],
      ['passive recognition versus active generation', 'The vital cognitive distinction between evaluating existing text and originating ideas.', 'Making pedagogical distinctions', 'Academic · cognitive', 'Learning requires active generation rather than mere passive recognition.', 'Explain cognitive learning.', `Editing machine output exercises passive recognition, leaving active generation unpracticed.`, 'Key cognitive science distinction.'],
      ['external cognitive scaffolding', 'Physical or digital tools that support and expand mental processing.', 'Explaining the Extended Mind', 'Formal · philosophical', 'Notebooks and mathematical symbols serve as external cognitive scaffolding.', 'Defend tool integration.', `AI can provide powerful external cognitive scaffolding for interdisciplinary researchers.`, 'Clark & Chalmers concept chunk.'],
      ['wrestle with recalcitrant syntax', 'Engaging in the demanding, creative struggle to structure sentences precisely.', 'Describing the writing craft', 'Literary · reflective', 'To develop an authentic voice, one must wrestle with recalcitrant syntax.', 'Describe authorial discipline.', `A writer learns to think by learning to wrestle with recalcitrant syntax on the page.`, 'Evocative stylistic chunk.'],
      ['pre-digested conclusions', 'Information that has been stripped of its nuance, evidence, and intellectual journey.', 'Critiquing shallow summaries', 'Essayistic · critical', 'Consuming pre-digested conclusions does not give a learner genuine expertise.', 'Warn against shortcuts.', `Executives who rely on pre-digested conclusions become vulnerable to strategic blind spots.`, 'Critical reading chunk.'],
      ['the Extended Mind Thesis', 'The philosophical theory that external tools form part of our cognitive system.', 'Deploying philosophy of mind', 'Academic · philosophical', 'Under the Extended Mind Thesis, a notebook is as much part of memory as a synapse.', 'Cite cognitive philosophy.', `Proponents of AI collaboration ground their defense in the Extended Mind Thesis.`, 'Standard philosophical citation.'],
      ['the secular theology of effortless convenience', 'The modern unquestioned dogma that eliminating all human friction is always progress.', 'Critiquing technological utopianism', 'Philosophical · cultural', 'We have succumbed to the secular theology of effortless convenience in education.', 'Challenge tech dogmas.', `The secular theology of effortless convenience forgets that human mastery requires resistance.`, 'Cultural critique chunk.']
    ],
    collocations: [
      [`Uncritical reliance on automated algorithms induces epistemic ______.`, [`deskilling`, `hubris`, `cleavage`, `straitjacket`], 0, `Epistemic deskilling is the established sociological term.`],
      [`Deep understanding is forged through the ______ of thought.`, [`friction`, `vacuum`, `propensity`, `loophole`], 0, `Friction of thought describes necessary intellectual struggle.`],
      [`AI generated text naturally gravitates toward the center of the linguistic ______ curve.`, [`bell`, `gatsby`, `trade`, `price`], 0, `Bell curve refers to normal statistical distribution.`],
      [`External artifacts provide cognitive ______ for human reasoning.`, [`scaffolding`, `straitjackets`, `patronage`, `euphemisms`], 0, `Cognitive scaffolding is the standard psychological term.`]
    ],
    upgrades: [
      [`If you use AI to write your essays, you will become lazy and stupid.`, `Outsourcing the semantic formulation of ideas to generative systems induces epistemic deskilling and cognitive atrophy.`],
      [`AI text is boring and sounds like everything else.`, `Language models predict statistically probable tokens, pulling prose toward the generic center of the linguistic bell curve.`],
      [`Using computers is normal because humans always used tools to think.`, `Human intelligence has always operated through cognitive symbiosis, coupling biological brains with external cognitive scaffolding.`]
    ],
    think: {
      title: 'Predictions, Extrapolations and Epistemic Risk in Technology',
      lead: 'Technological forecasting is notoriously prone to two complementary errors: linear extrapolation (assuming current trends continue infinitely without friction) and the substitution fallacy (assuming a new tool replaces an old capacity without altering the nature of the task).',
      defs: [
        ['Substitution fallacy', `The mistaken belief that replacing human labor with automated systems leaves the underlying meaning and value of the activity unchanged.`],
        ['Linear extrapolation', `The erroneous projection that a technological capability will continue to grow at its initial exponential rate without encountering physical, legal, or epistemic limits.`],
        ['Dialectical tool use', `Engaging with an instrument as an active sparring partner that challenges assumptions, rather than as an oracle that supplies authoritative answers.`]
      ],
      items: [
        { id: '17t1', type: 'mc', tag: 'Fallacy check', q: `An educational consultant claims: <i>"Since AI can write an essay in five seconds, teaching students to write essays is as obsolete as teaching them to ride horses."</i> What core fallacy does this claim commit?`, options: [`The substitution fallacy, by assuming that writing an essay is merely producing text rather than the cognitive process of learning how to think.`, `The post hoc ergo propter hoc fallacy.`, `The ad hominem fallacy against horse riders.`, `The appeal to ancient tradition.`], answer: 0, explain: `It commits the substitution fallacy by confusing the end product (text) with the internal cognitive cultivation produced by the act of writing.` },
        { id: '17t2', type: 'open', tag: 'Steelmanning', q: `Steelman the Extended Mind argument: how can collaborating with an LLM actually INCREASE an intellectual’s cognitive reach rather than diminish it?`, rows: 5, guide: [`Focus on rapid cross-disciplinary synthesis, simulating multi-perspective counterarguments, discovering obscure domain connections, and automated verification.`] },
        { id: '17t3', type: 'open', tag: 'Risk analysis', q: `Explain why a medical diagnostic system trained on historical healthcare data might perpetuate racial and gender diagnostic biases through statistical plausibility.`, rows: 5, guide: [`Explain that LLMs reflect historical data distributions; underdiagnosed conditions in marginalized groups will be statistically predicted as unlikely.`] },
        { id: '17t4', type: 'open', tag: 'Core synthesis', q: `What is the difference between "cognitive offloading" that empowers (e.g. using a map or calendar) and offloading that disempowers (e.g. using AI to write your personal reflections)? State one clear dividing principle.`, rows: 6, guide: [`Empowering offloading handles mechanical memory/coordination so the brain can focus on deep reasoning; disempowering offloading outsources the very act of synthesis, judgment, and meaning-making.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an Argumentative Essay on Cognitive Technology',
        text: 'A C1 essay on technology avoids both naive techno-utopianism and reactionary luddism. You must evaluate the genuine affordances of AI tools while providing a rigorous philosophical analysis of what human cognitive friction makes possible.',
        weak: 'AI is going to take all our jobs and destroy our brains, so students should never touch computers.',
        strong: 'While artificial intelligence provides unprecedented cognitive scaffolding for information retrieval and synthesis, uncritical reliance upon automated formulation threatens to induce epistemic deskilling by bypassing the essential friction through which human understanding is forged.'
      },
      short: {
        kind: 'Philosophical critique', title: 'The Fallacy of the Effortless Essay',
        prompt: 'Critique the argument that using AI to generate student essays is no different from using a calculator in a mathematics class. Highlight the difference between algorithmic arithmetic and semantic formulation.',
        min: 160, max: 260, support: 'light',
        guide: ['Use Future Continuous and Future Perfect structures.', 'Incorporate the terms cognitive offloading, substitution fallacy, and friction of thought.']
      },
      main: {
        kind: 'Argumentative essay', title: 'The Friction of the Mind: Human Agency in the Era of Generative AI',
        prompt: 'To what extent does generative artificial intelligence enhance human intellectual agency, and to what extent does it induce cognitive deskilling and homogenization? Write a sustained, well-hedged argumentative essay establishing the boundaries of authentic intellectual cultivation.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: trace the Socratic anxiety over writing to modern AI, and state your balanced thesis.',
          'Body 1: examine the cognitive risks of automated formulation (epistemic deskilling, atrophy of working memory, passive recognition vs active generation).',
          'Body 2: analyze the cultural and epistemological impact (homogenization of discourse, the linguistic bell curve, loss of idiosyncratic insight).',
          'Body 3: address the counterpoint (Clark & Chalmers’s Extended Mind Thesis, AI as cognitive scaffolding, dialectical sparring partner).',
          'Conclusion: project the future (using Future Perfect aspects) and define the criteria for maintaining intellectual agency alongside machines.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I balance the risks of deskilling with the affordances of cognitive scaffolding?',
        'Did I use advanced future forms (Future Perfect: "will have transformed", Future Continuous: "will be using") accurately?',
        'Did I deploy precise cognitive vocabulary (offloading, deskilling, atrophy, scaffolding) without jargon overload?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my conclusion provide a principled framework for human-AI symbiosis?'
      ],
      challenges: [
        'Include at least one sentence using the Future Perfect ("By 2035, society will have...") to mark a future technological threshold.',
        'Use the chunk "the friction of thought" or "intellectual bicycle, not a crutch".',
        'Ensure that the distinction between active generation and passive recognition is clearly articulated.'
      ]
    },
    retrieve: {
      content: 'Explain why the author argues that writing is not merely packaging pre-existing thoughts, but the active friction through which thoughts are formed.',
      contentGuide: ['Thoughts do not exist fully formed; the struggle with words, syntax and contradictions is the process of discovery and synthesis.'],
      grammar: 'Write two sentences using the Future Perfect ("By 2030, we will have...") and Future Continuous ("In the coming years, students will be...").',
      grammarGuide: ['Verify will have + past participle and will be + verb-ing.'],
      reasoning: 'What is the "substitution fallacy" in the context of technological education?',
      reasoningGuide: ['Assuming that substituting human labor with an algorithm leaves the internal learning value of the task unchanged.'],
      cumulative: 'Connect Unit 17 to Unit 01: how does linguistic attrition/offloading in AI mirror what happens when a human language goes quiet from lack of retrieval?',
      summary: `<p><b>Main claim:</b> AI offers immense cognitive scaffolding, but outsourcing semantic formulation threatens to induce epistemic deskilling by eliminating the necessary friction through which deep thought is forged.</p><p><b>Grammar:</b> Future Perfect (will have transformed) and Future Continuous (will be navigating) allow precise projections of technological thresholds and ongoing trajectories.</p><p><b>Reasoning:</b> distinguish cognitive amplification from substitution; identify the limits of statistical token prediction vs first-principles reasoning.</p>`
    }
  });

  const u = K.units['17'];
  u.listening = [
    {
      id: 'l1', title: 'The Socratic Machine', format: 'Podcast interview',
      file: '/audio/en/unit-17/u17-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two speakers (Interviewer Maya Lin and Cognitive Scientist Dr. Julian Vance); crisp, reflective, British and American English',
      passes: ['First listen · grasp why Dr. Vance compares modern AI debates to Plato’s Phaedrus', 'Second listen · identify the distinction between calculators and language models', 'Third listen · note Future Perfect forms'],
      transcript: `Maya: Dr. Vance, tech evangelists love to tell us that fearing AI is just like fearing the pocket calculator in the nineteen-seventies. They say math teachers panicked, but society adapted and mathematicians became more productive. Is that comparison valid?\n\nDr. Vance: It is an attractive analogy, Maya, but it collapses under scrutiny. A calculator automates arithmetic—a closed, deterministic, algorithmic operation where two plus two always equals four. It offloads mechanical calculation so that the human mind can focus on higher-level mathematical modeling, theorem proving, and problem architecture.\n\nMaya: And generative AI is fundamentally different?\n\nDr. Vance: Completely. Language is not arithmetic. Language is the very medium in which human thinking, values, and conceptual categories are constructed. When you offload the generation of sentences to an algorithm, you are not offloading arithmetic; you are offloading the struggle to define meaning. By the time this decade ends, millions of students will have spent their entire academic careers submitting essays generated by machines. If you never learn to wrestle with a difficult thought on the blank page, you never develop the internal cognitive architecture necessary to recognize when a machine is feeding you articulate nonsense.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core distinction', q: 'Why does Dr. Vance reject the comparison between AI and pocket calculators?', options: ['Calculators are much cheaper than computers.', 'Calculators automate closed arithmetic, whereas language is the foundational medium of human thought, meaning-making, and values.', 'Calculators do not use electricity.', 'Math teachers were never worried about calculators.'], answer: 1, explain: 'Dr. Vance shows that arithmetic is a mechanical calculation, while language is the constitutive medium of conceptual thought.' },
        { id: 'q2', type: 'open', tag: 'Future projection', q: 'According to Dr. Vance, what dangerous consequence will occur if students never practice wrestling with difficult thoughts on the blank page?', rubric: ['They will fail to develop internal cognitive architecture', 'They will be unable to recognize when a machine is feeding them articulate nonsense or hallucinated logic'] }
      ]
    },
    {
      id: 'l2', title: 'The Extended Mind in Practice', format: 'Philosophy symposium monologue',
      file: '/audio/en/unit-17/u17-listening-02.mp3', duration: 120, level: 'C1',
      audioReady: false,
      voice: 'Solo philosopher (Dr. Elena Rostova); energetic, intellectually rigorous, International English',
      passes: ['First listen · understand how Clark and Chalmers redefine the boundary of the human mind', 'Second listen · track the criteria for treating AI as a dialectical partner'],
      transcript: `Twenty-five years ago, Andy Clark and David Chalmers asked a deceptively simple question: Where does the mind stop and the rest of the world begin? Their answer was revolutionary. They argued that if an external artifact—whether it is a notebook, an abacus, or a smartphone—is coupled to a human brain in a reliable, accessible way, that artifact is not an external tool; it is a literal component of the cognitive system.\n\nWhen we apply this extended mind framework to artificial intelligence, the moral panic around "cheating" begins to look archaic. Human beings have never been unassisted biological processors. We are tool-using cyborgs whose cognitive power has always depended on external scaffolding.\n\nThe real epistemic challenge of the next twenty years will not be stopping people from using AI. By 2040, every professional in the world will have been collaborating with cognitive agents for over a decade. The real challenge is designing pedagogical frameworks that turn the AI from an oracle into a dialectical sparring partner. If you ask an AI to write your answer, you are abdicating your agency. But if you use the AI to stress-test your thesis, find your blind spots, and challenge your implicit assumptions, you are exercising cognitive extension at its highest potential.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Gist', q: 'What is the core argument of the Extended Mind framework applied to modern AI?', options: ['Human brains will physically fuse with silicon chips by 2040.', 'Human intelligence has always relied on external cognitive scaffolding, so AI should be integrated as a dialectical partner that extends human reach.', 'Students should be forbidden from using smartphones in universities.', 'Calculators should be destroyed.'], answer: 1, explain: 'The Extended Mind view sees AI as the latest external cognitive scaffolding to expand human thinking.' },
        { id: 'q2', type: 'open', tag: 'Distinction', q: 'How does Dr. Rostova distinguish between "abdicating agency" and "exercising cognitive extension"?', rubric: ['Abdicating agency: asking the AI to write your answer passively', 'Cognitive extension: using the AI actively as a dialectical sparring partner to stress-test hypotheses and challenge blind spots'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A university dean announces: “Starting next semester, all student essays may be generated entirely by AI, since writing is an obsolete mechanical skill.” Respond in 60–120 seconds. Deconstruct the dean’s substitution fallacy, explain why writing is the friction through which thoughts are discovered, and use future aspect forms to project the long-term cognitive consequences.',
    prepare: 'Keywords only: substitution fallacy · friction of thought · epistemic deskilling · Future Perfect projections · intellectual bicycle vs crutch. Do not script.',
    grammar: 'Future Perfect (By 2030, students will have lost...); Future Continuous (will be graduating without); cognitive verbs (atrophy, forge, induce)',
    targets: ['the friction of thought', 'epistemic deskilling and cognitive atrophy', 'an intellectual bicycle, not a crutch', 'the linguistic bell curve'],
    rubric: [
      'Directly and convincingly challenges the dean’s announcement with intellectual depth',
      'Explains why writing is the constitutive process of thinking rather than mechanical packaging',
      'Accurately deploys Future Perfect and Future Continuous aspect forms',
      'Delivers a compelling, balanced framework for AI as an intellectual bicycle'
    ]
  };
})(window.KLANG);
