/* UNIT 22 · THE ETHICS OF LOOKING */
(function (K) {
  K.units['22'] = K.makeUnit('22', {
    module: 5, title: 'The ethics', titleEm: 'of looking',
    question: 'Does being allowed to photograph something necessarily mean it should be photographed?',
    knowLead: `In a media-saturated culture, photographing human suffering has long been defended as an essential act of bearing witness. Images of war, famine, poverty, and state violence are published in the name of global awareness and humanitarian mobilization. Yet the act of turning pain into an image raises uncomfortable moral dilemmas: when does bearing witness cross into voyeurism? Does consuming photographs of suffering stimulate genuine political action, or does it merely induce compassion fatigue and aesthetic pleasure? Keep the distinction between witnessing and exploitation in mind as you read.`,
    terms: [
      ['Bearing witness', `The ethical and political practice of documenting suffering, injustice, or atrocity to prevent denialism, demand accountability, and preserve historical truth.`],
      ['Compassion fatigue', `The psychological state of emotional numbness and moral exhaustion resulting from prolonged, chronic exposure to graphic images of suffering.`],
      ['Moral voyeurism', `The act of consuming images of other people's trauma or degradation as a form of spectacle, emotional titillation, or performative empathy without taking material action.`],
      ['Poverty pornography', `Media production that exploits the deprivation of impoverished communities to elicit pity, charitable donations, or artistic prestige while stripping subjects of agency.`],
      ['Aestheticization of suffering', `The artistic practice of rendering human pain, violence, or ruin visually beautiful, which risks diverting attention from its political and systemic causes.`]
    ],
    views: [
      'Two perspectives on photographing trauma',
      'The imperative to expose',
      `The public has a moral right to know the truth. Documenting raw, uncensored suffering is indispensable for mobilizing humanitarian intervention, confronting state denialism, and achieving justice.`,
      'The critique of consumption',
      `Circulating graphic images of vulnerable bodies often exploits the powerless, desensitizes viewers, and reduces profound human agony to an aesthetic commodity for comfortable spectators.`,
      `The core question is how photojournalists and viewers can engage with images of suffering without degrading the dignity of those depicted.`
    ],
    knowPrompt: `When an iconic photograph of a dying child in a famine wins a prestigious international journalism award and prize money, what ethical tensions emerge between the photographer, the subject, and the spectator?`,
    knowGuide: [
      `Consider the power asymmetry between an internationally mobile photographer and a starving subject.`,
      `Reflect on whether winning awards for documenting suffering risks commodifying human agony.`
    ],
    read: {
      main: {
        format: 'Philosophical & ethical essay', title: 'Regarding the Pain of Others: The Fragile Border Between Witness and Voyeur',
        standfirst: `To look at human agony from a safe distance is one of the most perilous moral acts in the modern world.`,
        pull: { after: 5, text: `Compassion is an unstable emotion. It needs to be translated into action, or it withers into sentimentality.` },
        notes: { 1: `<b>Susan Sontag</b> published <i>Regarding the Pain of Others</i> in 2003, revising her earlier skepticism about war photography.`, 4: `<b>Kevin Carter</b> won the Pulitzer Prize in 1994 for his photograph of a starving Sudanese child stalked by a vulture, an image that sparked global ethical outrage.` },
        paras: [
          `In 2003, in her final major work *Regarding the Pain of Others*, philosopher and cultural critic Susan Sontag confronted a question that had haunted her for decades: what does it mean to look at images of human catastrophe from the safety of a comfortable armchair? For more than a century, photojournalists had operated under the heroic assumption that showing the brutal reality of war and famine would naturally shock humanity into peace. If only people could see the shattered limbs, the weeping mothers, and the skeletal children, it was believed, the moral conscience of the world would be ignited and the slaughter would cease.`,
          `Yet history has demonstrated that this faith in the automatic moral efficacy of images is deeply naive. Looking at graphic suffering does not guarantee compassion; nor does it inevitably inspire political action. As Sontag observed, photographs of distant agony can just as easily foster a detached, aestheticized fascination—a form of moral voyeurism where the spectator consumes trauma as emotional entertainment. The image is praised for its dramatic lighting, its classical composition, and its poignant melancholy, while the real, bleeding human being at its center is reduced to an anonymous symbol of generic victimhood.`,
          `This dynamic is compounded by what psychologists and sociologists call compassion fatigue. When audiences are subjected to an endless, uncurated barrage of graphic atrocities on television broadcasts and digital feeds, the human nervous system adapts. What was once shocking becomes banal. The viewer experiences a gradual numbing of the moral imagination, accompanied by a paralyzing sense of helplessness. Surrounded by suffering that appears infinite, distant, and unalterable, the spectator retreats into cynicism, concluding that poverty and war are the natural, inevitable condition of certain parts of the world.`,
          `The ethical problem is further intensified by the profound power asymmetry that governs documentary production. In the vast majority of cases, photojournalism involves an affluent, internationally mobile photographer with high-end camera equipment entering a space of extreme vulnerability—a refugee camp, a famine zone, or an inner-city slum. The photographer takes the image and departs, returning to an elite media market where the photograph is published, exhibited in galleries, and entered into competitive prize contests. The subject, by contrast, remains trapped in their material squalor, receiving neither financial compensation nor any guarantee that the image will alter their material destiny.`,
          `In its most predatory manifestations, this asymmetry degenerates into what critics term "poverty pornography." In poverty porn, complex structural injustices—colonial exploitation, international debt, corrupt governance, and resource extraction—are erased from view. The subject is stripped of historical agency, name, and dignity, presented only as a passive, weeping victim waiting for salvation from wealthy foreign donors. The image does not educate the viewer about the causes of injustice; it flatters the viewer’s moral vanity by offering a cheap, frictionless path to feeling compassionate.`,
          `And yet, despite these grave ethical hazards, we cannot simply abandon the documentation of human suffering. To turn away our gaze, to declare that trauma should never be photographed, is to grant a profound victory to the perpetrators of violence. When states commit mass atrocities, their first objective is always to eliminate the cameras and enforce total visual darkness. Without the photographic record of the Holocaust, the Vietnam War, the Rwandan genocide, or contemporary civilian massacres, the work of historical memory and legal accountability would be impossible. The photograph remains an indispensable weapon against silence and state denialism.`,
          `The ethical challenge, then, falls not only upon the photojournalist who points the lens, but upon the spectator who receives the image. We must refuse to consume photographs of suffering as mere aesthetic spectacle or emotional catharsis. To look ethically at the pain of others requires asking uncomfortable questions: What political, economic, and historical forces created the agony in this frame? What privileges do I enjoy that are connected to their suffering? And how can the shock of this image be translated from passive pity into sustained, structural solidarity?`
        ]
      },
      counter: {
        format: 'Photojournalistic defense', title: 'The Moral Duty of the Unflinching Lens',
        standfirst: `Over-theorizing the ethics of looking risks creating a paralyzing squeamishness that leaves atrocities hidden in darkness.`,
        paras: [
          `While academic critiques of voyeurism and compassion fatigue raise valid points, they frequently promote an intellectual squeamishness that paralyzes the vital work of war reporting.` ,
          `A photojournalist in a combat zone does not have the luxury of spending hours debating semiotic power dynamics. When artillery shells are falling and civilians are being murdered, the photographer’s primary, non-negotiable moral duty is to document the raw reality before them with uncompromising fidelity.` ,
          `History proves that despite the risk of voyeurism, iconic photographs possess an unparalleled capacity to pierce public apathy and alter the course of history. Nick Ut’s photograph of Kim Phúc, the images of famine in Biafra, and photographs of torture in Abu Ghraib were not consumed as mere entertainment; they ignited international political outrage, forced military investigations, and mobilized millions of citizens to demand an end to state violence.` ,
          `To demand that photojournalists only capture "dignified" or "uplifting" images of victims is to sanitize war. Real violence is not dignified; it is grotesque, humiliating, and horrific. Demanding that images be polite is often a disguised demand for our own comfort, allowing us to shield our eyes from the terrible human cost of our political decisions.`
        ]
      }
    },
    sources: [
      { title: 'Regarding the Pain of Others (Susan Sontag)', url: 'https://us.macmillan.com/books/9780312420093/regardingthepainofothers', note: 'Foundational philosophical text on the ethics and consumption of war imagery.' },
      { title: 'The Cruel Radiance: Photography and Political Violence (Susie Linfield)', url: 'https://press.uchicago.edu/ucp/books/book/chicago/C/bo10222384.html', note: 'A passionate defense of photojournalism against postmodern cynicism.' },
      { title: 'Humanitarianism and Media (Lilie Chouliaraki)', url: 'https://www.routledge.com/The-Ironic-Spectator-Solidarity-in-the-Age-of-Post-Humanitarianism/Chouliaraki/p/book/9780745642116', note: 'Analysis of how modern humanitarian campaigns commodify empathy.' }
    ],
    interpret: [
      { id: '22i1', type: 'mc', tag: 'Main idea', q: `What is the central ethical dilemma examined in the main essay?`, options: [`Digital cameras are too heavy for photojournalists.`, `Photographing and viewing human suffering is a precarious moral act that risks descending into voyeurism, compassion fatigue, and exploitation unless connected to structural solidarity.`, `All war photographs should be legally banned worldwide.`, `Newspapers should only publish pictures of sports.`], answer: 1, explain: `The essay explores the moral hazards of turning trauma into images without action, balanced against the necessity of bearing witness.` },
      { id: '22i2', type: 'mc', tag: 'Inference', q: `Why does Susan Sontag characterize compassion as an "unstable emotion"?`, options: [`Because compassion causes headaches.`, `Because unless compassion is translated into sustained political and material action, it quickly decays into passive, self-satisfied sentimentality.`, `Because only children feel compassion.`, `Because compassion is illegal in international law.`], answer: 1, explain: `Sontag argues that feeling pity without taking action leads to moral self-congratulation and cynicism.` },
      { id: '22i3', type: 'tf', tag: 'Detail', q: `According to paragraph 4, photojournalists and their subjects always share equal economic status and financial profits from published images.`, answer: false, explain: `Paragraph 4 emphasizes the profound power asymmetry between mobile, affluent photographers and trapped, uncompensated subjects.` },
      { id: '22i4', type: 'mc', tag: 'Counterpoint argument', q: `What danger does the counterpoint identify in demanding that war photographs always be "polite and dignified"?`, options: [`It makes cameras run out of battery faster.`, `It sanitizes the grotesque reality of violence, allowing comfortable citizens to shield their eyes from the human consequences of war.`, `It increases the cost of newspaper printing.`, `It violates copyright regulations.`], answer: 1, explain: `The counterpoint warns that demanding polite images sanitizes real violence and protects public apathy.` },
      { id: '22i5', type: 'open', tag: 'Evidence vs interpretation', q: `What is "poverty pornography" as defined in paragraph 5, and what structural context does it deliberately erase?`, rows: 4, guide: [`Poverty porn presents subjects purely as helpless, passive weeping victims to flatter donor vanity; it erases systemic causes like colonial debt, corrupt governance, and resource extraction.`] },
      { id: '22i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the author reconcile the grave risks of moral voyeurism with the absolute necessity of bearing witness against state violence?`, rows: 5, guide: [`Notes that while voyeurism is a real danger, total visual darkness allows perpetrators to commit atrocities with impunity; spectators must cultivate active, questioning solidarity rather than passive pity.`] },
      { id: '22i7', type: 'open', tag: 'Application', q: `Analyze how international fundraising campaigns for humanitarian disasters in the Global South often walk the fine line between mobilizing emergency aid and perpetuating poverty pornography.`, rows: 5, guide: [`Discuss the use of close-up images of weeping children to provoke quick emotional donations versus campaigns that respect subject dignity, names, and local community leadership.`] }
    ],
    notice: [
      {
        title: 'Advanced passive voice and impersonal analytical frames',
        sub: 'Establishing objective moral scrutiny, institutional critique, and ethical distancing',
        examples: [
          `Suffering <b>is frequently reduced to</b> an aesthetic commodity.`,
          `The image <b>was hailed as</b> a masterpiece of photojournalism, yet the subject <b>was left unassisted</b>.`,
          `It <b>must be questioned whether</b> displaying graphic wounds serves justice or voyeurism.`,
          `Human trauma <b>has long been commodified by</b> international media markets.`
        ],
        questions: [
          `How does the impersonal passive (*It must be questioned whether...*) frame an ethical debate with scholarly detachment?`,
          `Why is the passive voice effective when critiquing systemic media practices rather than individual journalists?`
        ],
        explain: `<p>In ethical essays, impersonal passives (<b>it is widely maintained that, it cannot be assumed that, it must be acknowledged that</b>) and systemic passive predications (<b>is subjected to, is commodified by, is reduced to</b>) allow writers to analyze structural injustice without descending into personalized polemics.</p>`,
        compare: { head: ['Active personal blame', 'Impersonal passive frame', 'Ethical rigor'], rows: [['People exploit the poor when they take photos.', 'The suffering of vulnerable populations is frequently exploited for commercial and aesthetic consumption.', 'Elevates to systemic sociological analysis.']] },
        practice: [
          [`Transform into an impersonal passive frame: <i>We must recognize that compassion without action decays into cynicism.</i>`, `It must be recognized that compassion without action decays into cynicism.`, `Uses impersonal passive with modal.`]
        ],
        radar: [
          { wrong: 'It is argued from many critics that the photo is unethical.', right: 'It is argued by many critics that the photo is unethical. / Many critics argue that...', why: 'The agent in passive structures takes "by", not "from".' }
        ],
        help: `<p><b>Em português:</b> Estruturas impessoais como <i>It must be questioned whether...</i> (Deve-se questionar se...) e <i>is reduced to an aesthetic commodity</i> (é reduzido a uma mercadoria estética) garantem sobriedade e precisão ética.</p>`
      },
      {
        title: 'Nominalisation of ethical and psychological processes',
        sub: 'Transforming emotional reactions into precise conceptual categories',
        examples: [
          `People get tired of seeing bad news → <b>The onset of compassion fatigue</b>.`,
          `Making pain look beautiful in pictures → <b>The aestheticization of human suffering</b>.`,
          `Feeling pity without doing anything → <b>Passive sentimental voyeurism</b>.`
        ],
        questions: [
          `How does nominalising complex emotional reactions into terms like "compassion fatigue" allow sharper critique?`
        ],
        explain: `<p>Turn verbs and adjectives into technical ethical nouns: <i>exploit → exploitation, voyeuristic → voyeurism, aestheticize → aestheticization, desensitize → desensitization</i>.</p>`,
        compare: { head: ['Descriptive clause', 'Nominalised concept', 'Conceptual power'], rows: [['Viewers stop caring because they see too much war.', 'Chronic exposure to graphic violence induces moral desensitization and compassion fatigue.', 'Precise psychological diagnosis.']] },
        practice: [
          [`Nominalise: <i>When photographers treat poor people as helpless victims to get donations, they insult their dignity.</i>`, `The deployment of poverty pornography to elicit donations compromises the intrinsic dignity of subjects.`, `Packs claim into formal ethical nominals.`]
        ],
        radar: [
          { wrong: 'The becoming of desensitized of the audience...', right: 'The desensitization of the audience...', why: 'Use standard Latinate nominal forms (-tion, -ment, -ism).' }
        ],
        help: `<p><b>Em português:</b> A nominalização ética (<i>moral desensitization, aestheticization of trauma</i>) condensa processos psicológicos em termos técnicos indispensáveis no nível C1.</p>`
      }
    ],
    vocab: [
      ['voyeurism', 'noun', 'The practice of taking pleasure or interest in observing the distress, intimate lives, or degradation of others.', 'Consuming war photos without political commitment is a form of moral voyeurism.', 'The media was accused of sensationalist voyeurism.', ['moral voyeurism', 'aesthetic voyeurism', 'spectacle of voyeurism'], ['peeping', 'intrusion', 'morbid curiosity'], 'Ethical aesthetic noun.', '/ˈvwɑː.jɜː.rɪ.zəm/', null],
      ['desensitization', 'noun', 'The process of making someone less likely to feel shock, distress, or sympathy through repeated exposure.', 'Constant exposure to graphic violence causes emotional desensitization.', 'The training aimed at the desensitization of soldiers to danger.', ['emotional desensitization', 'moral desensitization', 'gradual desensitization'], ['numbing', 'habituation', 'callousness'], 'Psychological noun.', '/diːˌsen.sɪ.taɪˈzeɪ.ʃən/', 'sensitization'],
      ['aestheticization', 'noun', 'The act of making something into an object of beauty or art, especially something painful or political.', 'The aestheticization of poverty turns real suffering into gallery decor.', 'Critics condemned the movie’s aestheticization of violence.', ['aestheticization of suffering', 'aestheticization of politics', 'aestheticization of war'], ['romanticization', 'glamorization', 'beautification'], 'Critical theory noun.', '/iːsˌθet.ɪ.saɪˈzeɪ.ʃən/', null],
      ['squeamishness', 'noun', 'The state of being easily disgusted, shocked, or made sick, especially by blood or unpleasant realities.', 'Intellectual squeamishness must not prevent journalists from documenting atrocities.', 'He felt a sudden squeamishness at the sight of the wound.', ['intellectual squeamishness', 'moral squeamishness', 'overcome squeamishness'], ['queasiness', 'reluctance', 'oversensitivity'], 'Descriptive noun.', '/ˈskwiː.mɪʃ.nəs/', 'resilience'],
      ['commodify', 'verb', 'Treat something as a mere commodity or product to be bought, sold, or consumed.', 'Photo agencies commodify the trauma of war victims for profit.', 'Culture is increasingly commodified.', ['commodify trauma', 'commodify suffering', 'commodify tragedy'], ['commercialise', 'monetise'], 'Critical verb.', '/kəˈmɒd.ɪ.faɪ/', null],
      ['unalloyed', 'adjective', 'Pure; complete and unqualified.', 'Bearing witness is rarely an unalloyed moral good.', 'She felt unalloyed relief upon arriving safely.', ['unalloyed good', 'unalloyed virtue', 'unalloyed triumph'], ['pure', 'unadulterated', 'absolute'], 'Literary adjective.', '/ˌʌn.əˈlɔɪd/', 'compromised'],
      ['sentimentality', 'noun', 'Exaggerated, self-indulgent, or superficial feelings of tenderness, sadness, or pity.', 'Pity without solidarity withers into empty sentimentality.', 'The film relied on cheap sentimentality to win awards.', ['cheap sentimentality', 'moral sentimentality', 'empty sentimentality'], ['maudlin emotion', 'shallow pathos'], 'Critical aesthetic noun.', '/ˌsen.tɪ.menˈtæl.ə.ti/', 'rigor'],
      ['sanctuary', 'noun', 'A place of safety, privacy, or immunity from arrest or harm.', 'The hospital should have been a sacred sanctuary from airstrikes.', 'The wild preserve acts as a sanctuary for endangered birds.', ['safe sanctuary', 'sacred sanctuary', 'violate a sanctuary'], ['refuge', 'haven', 'shelter'], 'High-frequency noun.', '/ˈsæŋk.tʃʊə.ri/', null],
      ['unflinching', 'adjective', 'Not showing fear, hesitation, or squeamishness in the face of danger or difficulty.', 'The documentary offered an unflinching portrait of life under occupation.', 'She gave an unflinching testimony in court.', ['unflinching gaze', 'unflinching portrait', 'unflinching witness'], ['resolute', 'steadfast', 'unwavering'], 'Adjective of commendation.', '/ʌnˈflɪn.tʃɪŋ/', 'flinching'],
      ['asymmetry', 'noun', 'Profound imbalance or inequality between two parties.', 'The power asymmetry between photographer and subject requires strict ethical scrutiny.', 'Information asymmetry undermines consumer choice.', ['power asymmetry', 'structural asymmetry', 'profound asymmetry'], ['imbalance', 'disparity'], 'Analytical noun.', '/eɪˈsɪm.ə.tri/', 'symmetry']
    ],
    chunks: [
      ['the fragile border between witness and voyeur', 'The delicate, easily crossed line between documenting injustice and consuming trauma.', 'Stating core ethical dilemma', 'Philosophical · essayistic', 'Photojournalism operates on the fragile border between witness and voyeur.', 'Analyze trauma photography.', `Every documentary filmmaker must navigate the fragile border between witness and voyeur.`, 'Core unit thesis chunk.'],
      ['the aestheticization of human suffering', 'Rendering pain visually beautiful in a way that obscures its moral and political horror.', 'Critiquing photographic style', 'Aesthetic · critical', 'Critics condemned the museum exhibit for the aestheticization of human suffering.', 'Critique glossy war photos.', `Dramatic lighting and high contrast risk the aestheticization of human suffering in the slums.`, 'Key critical theory chunk.'],
      ['an unstable emotion that withers into sentimentality', 'Susan Sontag’s definition of pity without political and material commitment.', 'Deconstructing shallow empathy', 'Philosophical · analytical', 'Compassion is an unstable emotion that withers into sentimentality unless linked to action.', 'Critique charity campaigns.', `Without institutional solidarity, pity remains an unstable emotion that withers into sentimentality.`, 'Classic Sontag quote chunk.'],
      ['the profound power asymmetry of documentary capture', 'The vast inequality between the mobile photographer and the trapped subject.', 'Analyzing sociological power', 'Sociological · critical', 'We cannot ignore the profound power asymmetry of documentary capture.', 'Critique ethnographic media.', `Ethics begins with acknowledging the profound power asymmetry of documentary capture in crisis zones.`, 'Sociological critique chunk.'],
      ['an indispensable weapon against state denialism', 'Photographs serving as vital historical evidence that disproves official cover-ups.', 'Defending photojournalism', 'Legal · historical', 'The camera remains an indispensable weapon against state denialism and censorship.', 'Defend war documentation.', `Forensic images of war crimes are an indispensable weapon against state denialism in international law.`, 'Strong counterpoint chunk.'],
      ['the onset of compassion fatigue', 'The emotional exhaustion that causes audiences to tune out chronic disaster imagery.', 'Psychological diagnosis', 'Psychological · media', 'Constant media bombardment accelerates the onset of compassion fatigue.', 'Explain public apathy.', `Charities struggle against the onset of compassion fatigue among exhausted television donors.`, 'Media studies chunk.'],
      ['poverty pornography that flatters moral vanity', 'Exploitative imagery that makes viewers feel morally superior without solving problems.', 'Exposing media manipulation', 'Critical · cultural', 'We must reject poverty pornography that flatters moral vanity while erasing structural causes.', 'Denounce sensationalism.', `Sensationalist fundraising often relies on poverty pornography that flatters moral vanity.`, 'Sharp polemical chunk.'],
      ['the moral duty of the unflinching lens', 'The non-negotiable obligation of the journalist to document horrors without polite censorship.', 'Defending raw reportage', 'Journalistic · ethical', 'War correspondents are bound by the moral duty of the unflinching lens.', 'Argue for raw imagery.', `To sanitize the brutality of war is to betray the moral duty of the unflinching lens.`, 'Journalistic integrity chunk.'],
      ['strip the subject of historical agency', 'Presenting people as passive, helpless victims without names, voices, or dignity.', 'Critiquing victim framing', 'Analytical · sociological', 'Poverty porn images systematically strip the subject of historical agency.', 'Analyze humanitarian ads.', `By showing only tears and dirt, the campaign stripped the subjects of historical agency and dignity.`, 'Agency analysis chunk.'],
      ['translate moral shock into structural solidarity', 'Moving from passive emotional distress to organized political and material reform.', 'Affirming active engagement', 'Philosophical · concluding', 'The ultimate test of ethical viewing is the capacity to translate moral shock into structural solidarity.', 'Conclude ethical essay.', `Images matter only if they help us translate moral shock into structural solidarity for justice.`, 'Humanistic closing chunk.']
    ],
    collocations: [
      [`Consuming disaster imagery without action risks moral ______.`, [`voyeurism`, `hubris`, `asymmetry`, `straitjacket`], 0, `Moral voyeurism describes passive consumption of trauma.`],
      [`Chronic exposure to graphic news accelerates compassion ______.`, [`fatigue`, `cleavage`, `deficit`, `propensity`], 0, `Compassion fatigue is the established psychological collocation.`],
      [`Critics warned against the ______ of human suffering in the photo exhibition.`, [`aestheticization`, `telemetry`, `monetization`, `sanctuary`], 0, `Aestheticization of suffering is the critical theory phrase.`],
      [`We must translate moral shock into structural ______.`, [`solidarity`, `precarity`, `obfuscation`, `dichotomy`], 0, `Structural solidarity describes active political alignment.`]
    ],
    upgrades: [
      [`Looking at sad photos on the internet doesn't help anyone.`, `Passive consumption of traumatic imagery frequently devolves into moral voyeurism, inducing compassion fatigue without generating structural solidarity.`],
      [`The photographer made the poor people look like art so he could win a prize.`, `The aestheticization of human suffering converts real deprivation into a gallery commodity, flattering the photographer’s prestige while stripping subjects of agency.`],
      [`We have to show real blood and corpses so people understand war.`, `Photojournalists are bound by the moral duty of the unflinching lens to pierce state denialism and confront the public with the human cost of violence.`]
    ],
    think: {
      title: 'Competing Ethical Principles, Consent and the Sontagian Critique',
      lead: 'In applied ethics, resolving moral dilemmas requires weighing competing, legitimate duties: the duty to bear witness and expose injustice versus the duty to respect human dignity and prevent voyeuristic exploitation.',
      defs: [
        ['Deontological duty', `An absolute moral obligation (such as telling the truth or respecting bodily dignity) that must be upheld regardless of the consequences.`],
        ['Utilitarian calculation', `An ethical framework that evaluates an action based on whether its overall consequences produce the greatest good for the greatest number (e.g. publishing a painful photo to mobilize millions in famine aid).`],
        ['Dignity threshold', `The moral boundary beyond which displaying a human being in extreme degradation violates their intrinsic worth as a person.`]
      ],
      items: [
        { id: '22t1', type: 'mc', tag: 'Ethical framework check', q: `A photographer takes a picture of a dying, unconscious accident victim without consent and publishes it, arguing: "This will frighten teenagers into driving safely." What ethical framework is the photographer using?`, options: [`Utilitarian calculation: justifying a violation of personal dignity by appealing to the positive social consequences for others.`, `The Great Gatsby Curve.`, `The substitution fallacy.`, `Goodhart’s Law.`], answer: 0, explain: `Utilitarianism evaluates actions by their consequences (saving other drivers) rather than deontological duties (respecting the dying person's dignity).` },
        { id: '22t2', type: 'open', tag: 'Steelmanning', q: `Steelman the deontological argument against publishing close-up, unblurred photographs of murdered civilian corpses in the news.`, rows: 5, guide: [`Focus on intrinsic human dignity, informed consent of the deceased and grieving families, protecting victims from becoming spectacle, and preventing public desensitization.`] },
        { id: '22t3', type: 'open', tag: 'Sontagian critique', q: `Apply Susan Sontag’s critique to modern viral "outrage videos" on social media: why does watching endless 30-second clips of police brutality or street violence often fail to produce genuine political reform?`, rows: 5, guide: [`Explain that short decontextualized clips induce emotional exhaustion and cynicism; viewers consume anger as a dopamine spectacle without engaging in sustained institutional organizing.`] },
        { id: '22t4', type: 'open', tag: 'Core synthesis', q: `Formulate an actionable ethical code for photojournalists working in humanitarian crisis zones that preserves both the duty to bear witness and the dignity of the subjects. State three concrete rules.`, rows: 6, guide: [`1. Name subjects and record their spoken testimony/agency; 2. Avoid aestheticizing extreme degradation or stripping clothes/privacy; 3. Ensure local communities and subjects benefit directly through advocacy and representation.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an Argumentative Essay on the Ethics of Photojournalism',
        text: 'A high-level essay on photojournalistic ethics weighs competing philosophical principles with rigorous nuance. You must deconstruct the voyeurism of the spectator and the power asymmetry of the lens, while fiercely defending the forensic necessity of bearing witness against state darkness.',
        weak: 'Taking pictures of poor people is bad because it exploits them, but war photographers are brave heroes who win prizes.',
        strong: 'While documentary photography remains an indispensable weapon against state denialism, turning human agony into an image carries the profound hazard of moral voyeurism, aestheticizing suffering and reducing vulnerable subjects to passive instruments for the spectator’s emotional catharsis.'
      },
      short: {
        kind: 'Ethical commentary', title: 'The Spectator’s Dilemma: Compassion Fatigue and Moral Voyeurism',
        prompt: 'Analyze Susan Sontag’s claim that compassion is an "unstable emotion that withers into sentimentality." How should citizens ethically engage with photographs of distant suffering? Use impersonal passive frames.',
        min: 160, max: 260, support: 'light',
        guide: ['Use impersonal passive structures (It must be recognized that..., Suffering is frequently reduced to...).', 'Include the terms moral voyeurism, compassion fatigue, and structural solidarity.']
      },
      main: {
        kind: 'Argumentative essay', title: 'The Fragile Border: Bearing Witness, Voyeurism and the Ethics of the Camera',
        prompt: 'Does being allowed to photograph human catastrophe necessarily mean it should be photographed? Write an essay evaluating the tension between the moral duty to bear witness against injustice and the ethical hazard of exploiting, aestheticizing, and commodifying the pain of others.',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: frame Sontag’s dilemma on regarding the pain of others, and state your balanced thesis.',
          'Body 1: examine the hazards of image consumption (moral voyeurism, compassion fatigue, aestheticization of trauma).',
          'Body 2: analyze the structural power asymmetry (mobile photographer vs trapped subject, poverty pornography).',
          'Body 3: address the counterpoint (the imperative of the unflinching lens, an empirical anchor against state denialism, forensic accountability).',
          'Conclusion: propose an ethical framework for spectatorship and photojournalism that translates moral shock into structural solidarity.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I balance the critique of voyeurism with the absolute necessity of bearing witness against atrocities?',
        'Did I use advanced impersonal passive structures (e.g. "It must be acknowledged that...", "Trauma is commodified by...") accurately?',
        'Did I employ precise ethical nominalisations (aestheticization, desensitization, voyeurism) with scholarly rigor?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my essay provide an actionable standard for ethical spectatorship?'
      ],
      challenges: [
        'Include at least one sentence using an impersonal passive frame with a modal verb ("It cannot be assumed that...", "It must be questioned whether...").',
        'Use the chunk "the fragile border between witness and voyeur" or "an unstable emotion that withers into sentimentality".',
        'Ensure that the counterpoint regarding the danger of sanitizing real violence is fairly articulated.'
      ]
    },
    retrieve: {
      content: 'Explain Susan Sontag’s critique of "regarding the pain of others" and what happens when pity is not translated into action.',
      contentGuide: ['Consuming images of distant trauma from safety turns pain into aesthetic spectacle; pity withers into passive, self-satisfied sentimentality and cynicism.'],
      grammar: 'Write two sentences using impersonal passive frames: one with "It must be recognized that..." and one with "Trauma is frequently reduced to...".',
      grammarGuide: ['Verify correct passive participle and academic register.'],
      reasoning: 'How does a utilitarian justification for publishing graphic photos conflict with a deontological dignity threshold?',
      reasoningGuide: ['Utilitarianism justifies publishing by pointing to overall good consequences (raising charity funds); deontology argues that degrading a dying person violates intrinsic human dignity regardless of results.'],
      cumulative: 'Connect Unit 22 to Unit 10: how does the ethics of looking in photography mirror the ethical limits of radical honesty and uninvited disclosure in human relationships?',
      summary: `<p><b>Main claim:</b> photographing human agony is an indispensable weapon against state denialism, but without active political commitment, it risks descending into moral voyeurism, compassion fatigue, and the aestheticization of suffering.</p><p><b>Grammar:</b> impersonal passive frames (it must be questioned whether) and precise ethical nominalisations enable rigorous, non-polemical moral philosophy.</p><p><b>Reasoning:</b> evaluate competing duties (bearing witness vs respecting dignity); deconstruct the limits of utilitarian calculation in human rights imagery.</p>`
    }
  });

  const u = K.units['22'];
  u.listening = [
    {
      id: 'l1', title: 'The Burden of the Pulitzer', format: 'Broadcast radio documentary',
      file: '/audio/en/unit-22/u22-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'Two journalists (David Kroll and Elena Rostova); reflective, serious, British and International English',
      passes: ['First listen · understand the tragic story of Kevin Carter’s 1993 Sudan famine photograph', 'Second listen · note impersonal passive structures', 'Third listen · examine the ethical debate over the photographer’s role'],
      transcript: `David: In nineteen ninety-three, South African photojournalist Kevin Carter traveled to southern Sudan to document a catastrophic famine. While walking near a feeding center, he photographed a tiny, emaciated toddler who had collapsed from exhaustion on the dry earth, while a hooded vulture landed quietly a few meters behind her.\n\nElena: The photograph was published on the front page of the *New York Times* and immediately provoked an international sensation. It won the Pulitzer Prize in nineteen ninety-four. But alongside the acclaim came a storm of ferocious moral criticism. Hundreds of readers wrote to the editors asking: “What happened to the child? Why did the photographer take the picture instead of carrying the girl to the clinic?”\n\nDavid: Carter had chased away the vulture and walked away, devastated. But the psychological toll of that moral asymmetry proved unbearable. Two months after receiving the Pulitzer Prize, Carter tragically took his own life. His story remains the most agonizing modern parable of the photojournalist’s dilemma: are you a human being whose first duty is to intervene and rescue, or are you a detached professional witness whose sole duty is to capture the image for the world to see?`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Ethical parable', q: 'What moral dilemma is symbolized by Kevin Carter’s famous Sudan photograph according to the documentary?', options: ['The difficulty of fixing analog cameras in the desert.', 'The irreconcilable tension between the human duty to intervene directly to rescue a suffering individual versus the professional duty to document the scene as an objective witness.', 'The dispute over photographic copyright between newspapers.', 'The danger of wild animals in Africa.'], answer: 1, explain: 'Carter’s story represents the tragic conflict between personal moral intervention and detached professional witnessing.' },
        { id: 'q2', type: 'open', tag: 'Synthesis', q: 'Why did the public react with moral fury despite the photograph raising millions of dollars in international famine relief?', rubric: ['Viewers were horrified by the perceived callousness of treating a dying child as a photographic composition', 'Exposed the unbearable power asymmetry between a celebrated photographer and an abandoned, dying subject'] }
      ]
    },
    {
      id: 'l2', title: 'Solidarity Beyond the Gaze', format: 'Human rights symposium lecture',
      file: '/audio/en/unit-22/u22-listening-02.mp3', duration: 125, level: 'C1',
      audioReady: false,
      voice: 'Solo speaker (Human Rights Scholar and Essayist); passionate, intellectually demanding, General American English',
      passes: ['First listen · understand why feeling pity is insufficient for human rights advocacy', 'Second listen · track the steps required to transform spectatorship into solidarity'],
      transcript: `We live in an era where empathy has been privatized and commodified. We are encouraged to believe that if we feel a pang of sadness while swiping past a photograph of a bombed hospital, we have performed our civic and moral duty. We confuse emotional stimulation with political commitment.\n\nSusan Sontag warned us that compassion is an unstable emotion. When you look at an image of horror and say, “How terrible, how tragic,” you position yourself as an innocent spectator looking at an unfortunate accident of fate. But poverty and war are not accidents of fate; they are the direct consequences of political choices, economic exploitation, and institutional violence.\n\nTo move beyond the voyeuristic gaze requires transforming pity into solidarity. Solidarity begins when you stop asking, “How can I feel sorry for these victims?” and begin asking, “How are my society’s policies, consumer habits, and financial institutions implicated in the catastrophe depicted in this frame?” True witnessing does not invite you to weep; it demands that you act.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Core critique', q: 'What fundamental mistake do modern spectators make regarding empathy according to the speaker?', options: ['They refuse to look at digital screens.', 'They confuse passive emotional stimulation (feeling pity) with authentic political commitment and structural solidarity.', 'They spend too much money on charity.', 'They only care about local news.'], answer: 1, explain: 'The speaker argues that feeling sad while swiping past trauma is passive emotional self-indulgence rather than true solidarity.' },
        { id: 'q2', type: 'open', tag: 'Transformational question', q: 'What question must an ethical spectator ask to transform pity into genuine solidarity according to the speaker?', rubric: ['Must ask how one’s own society, consumer habits, and political institutions are implicated in the catastrophe shown in the image', 'Demands moving from passive sympathy to active structural accountability'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A journalism awards jury debates whether to give first prize to a graphic, aestheticized photograph of a crying child in a refugee camp. Respond in 60–120 seconds. Analyze the tension between bearing witness and moral voyeurism, examine the risk of poverty pornography, and establish clear ethical criteria for judging documentary imagery.',
    prepare: 'Keywords only: bearing witness vs moral voyeurism · Sontag (compassion withering to sentimentality) · power asymmetry & poverty porn · aestheticization of trauma · structural solidarity. Do not script.',
    grammar: 'Impersonal passive frames (It must be questioned whether, Trauma is reduced to); ethical nominalisations (aestheticization, desensitization); stance hedging',
    targets: ['the fragile border between witness and voyeur', 'the aestheticization of human suffering', 'an unstable emotion that withers into sentimentality', 'poverty pornography that flatters moral vanity'],
    rubric: [
      'Directly and brilliantly addresses the awards jury dilemma',
      'Articulates Sontag’s critique of passive empathy and the aestheticization of suffering',
      'Uses accurate impersonal passive grammar and advanced nominalisations',
      'Delivers an uncompromising, mature standard for ethical visual solidarity'
    ]
  };
})(window.KLANG);
