/* UNIT 21 · CAN A PHOTOGRAPH EVER BE NEUTRAL? */
(function (K) {
  K.units['21'] = K.makeUnit('21', {
    module: 5, title: 'Can a photograph', titleEm: 'ever be neutral?',
    question: 'Can a photograph document reality without also interpreting it?',
    knowLead: `Since the invention of the daguerreotype in 1839, photography has occupied an ambiguous position between mechanical reproduction and creative art. Because a camera relies on optical physics and chemical or digital sensors to record reflected photons, we intuitively treat photographs as direct, objective evidence of what was really there. Yet every photograph involves an inescapable sequence of subjective decisions: where to point the lens, what to include in the frame, what to crop out, when to press the shutter, and how to grade the exposure. Keep the distinction between mechanical recording and visual interpretation in mind as you read.`,
    terms: [
      ['Indexicality', `The semiotic property of a sign having a direct physical connection to the object it represents (as a footprint in sand or photons striking a sensor).`],
      ['The Frame', `The physical boundary chosen by the photographer that selects a specific slice of the visual world while excluding the surrounding context.`],
      ['Decisive moment', `Henri Cartier-Bresson’s concept of the simultaneous recognition of the significance of an event and the precise visual organization of forms that gives it expression.`],
      ['Selection and omission', `The deliberate or unconscious decision to highlight specific subjects or details while banishing others outside the visible border of the image.`],
      ['Visual grammar', `The arrangement of focal length, depth of field, perspective angle, lighting, and shutter speed that structures how a viewer interprets an image.`]
    ],
    views: [
      'Two philosophies of photographic truth',
      'The objective document view',
      `Photographs are physical traces of real events. Unlike painting or literature, which pass through the artist's imagination, a camera captures an indexical record that functions as objective empirical evidence.`,
      'The interpretive construction view',
      `A photograph is an interpretation disguised as a fact. Framing, angle, lighting, shutter speed, and cropping encode the photographer’s ideological perspective while omitting the broader context.`,
      `The core question is whether a photograph captures reality or merely constructs a persuasive visual argument.`
    ],
    knowPrompt: `Look at any famous documentary photograph. What crucial historical, economic, or physical context is located just five inches outside the borders of the frame?`,
    knowGuide: [
      `Consider how changing the angle or zooming out would alter the emotional narrative.`,
      `Reflect on what the presence of the photographer did to the behavior of the subjects.`
    ],
    read: {
      main: {
        format: 'Aesthetic & philosophical treatise', title: 'The Fallacy of the Innocent Eye: Photography as Silent Interpretation',
        standfirst: `We look at a photograph and believe we are looking at the world. We forget that the camera is not an eye, but an argument.`,
        pull: { after: 5, text: `The camera does not record what is there; it records what the frame permits to exist.` },
        notes: { 1: `<b>Roland Barthes</b> introduced the distinction between <i>studium</i> (cultural interest) and <i>punctum</i> (the poignant detail) in <i>Camera Lucida</i> (1980).`, 4: `<b>John Berger</b> published <i>Ways of Seeing</i> in 1972, demonstrating how visual images reproduce ideological power.` },
        paras: [
          `In 1839, when Louis Daguerre presented his photographic process to the French Academy of Sciences, the physicist François Arago hailed the invention as a triumph of nature reproducing itself. Unlike the painter, whose hand was fallible and whose mind was burdened by artistic conventions, the camera appeared to eliminate human subjectivity entirely. Sunlight and chemistry combined to create a mechanical image untainted by human bias. For nearly two centuries, this myth of mechanical neutrality has anchored our legal systems, our historical archives, and our daily news broadcasts. We demand photographs as evidence in courtrooms because we assume that while human witnesses may lie, the lens merely registers what was undeniably present.`,
          `This assumption rests on what semioticians call indexicality—the direct physical link between the photographic image and the light reflected from an object. A painting of an apple is an artist’s conceptual interpretation; a photograph of an apple is the physical trace of light striking a digital sensor or silver halide emulsion. But in our eagerness to celebrate this indexical link, we commit a profound category error. We confuse the physical fidelity of the sensor with the neutrality of the image. The camera records photons objectively; the photographer constructs meaning subjectively.`,
          `Consider the elementary act of framing. The visible world is infinite, continuous, and multi-sensory. A photograph, by contrast, is finite, discontinuous, and silent. In the very instant a photographer raises the viewfinder, they perform a radical act of selection and omission. By choosing to place a starving child in the center of the frame, the photojournalist creates a powerful visual plea for humanitarian aid. Yet by tilting the camera five degrees to the left, cropping out the luxurious resort hotel fifty meters away, the photographer transforms a complex structural crisis of economic inequality into an isolated tragedy of nature. The camera does not record what is there; it records what the frame permits to exist.`,
          `Beyond the physical boundary of the frame lies the subtle vocabulary of visual grammar. A portrait captured with a wide-angle lens close to a subject’s face distorts proportions, making them appear aggressive, grotesque, or unhinged; the exact same person photographed from a distance with a telephoto lens appears calm, noble, and vulnerable. An image captured from a low angle looking upward elevates a political leader into an imposing hero, whereas a high angle looking downward diminishes them into a powerless subordinate. These technical parameters—focal length, depth of field, shutter speed, and color saturation—are not neutral engineering choices. They are ideological lenses that guide the viewer’s emotional and moral judgment without uttering a single word.`,
          `There is also the decisive tyranny of time. Real life is an uninterrupted temporal flow, an evolving process where causes precede effects and consequences follow actions. A photograph severs a single fraction of a second from that continuum, freezing an ambiguous micro-expression into an eternal character trait. A politician who sneezes or closes their eyes in momentary exhaustion is frozen in an image that portrays them as deranged or incompetent. The snapshot possesses total indexical accuracy—light did indeed reflect off that face in that millisecond—yet it delivers total narrative falsehood. Indexical precision is not identical to historical truth.`,
          `Furthermore, the act of photographing is never socially passive. The presence of a camera instantly alters the reality it seeks to document. When a photojournalist enters an impoverished community or a war zone, human subjects react: they perform, they hide, they express rage, or they pose to appeal for international sympathy. The photographer is not an invisible, disembodied spectator looking through a transparent window; they are an active, powerful participant whose social status, nationality, race, and financial backing structure the entire interaction. An image is not a passive mirror; it is a relational encounter between two human beings possessing vastly unequal power.`,
          `To look at photography with critical maturity requires abandoning the naive fantasy of the innocent eye. A photograph is never a neutral document. It is a highly curated, visually argued artifact that reflects the choices, assumptions, and institutional incentives of the person behind the lens. When we recognize that every photograph is a silent interpretation, we do not discard images as useless fabrications. Rather, we learn to cross-examine them with the same rigorous skepticism we apply to written essays—asking who built the frame, what was banished to the margins, and whose voice the image was engineered to serve.`
        ]
      },
      counter: {
        format: 'Documentary defense', title: 'The Indispensable Witness: Photography as Evidentiary Anchor',
        standfirst: `Hyper-skepticism about photographic neutrality risks destroying the evidentiary foundation of historical memory and human rights investigations.`,
        paras: [
          `It is fashionable in contemporary cultural studies to dismiss all photography as subjective construction. However, carried to its extreme, this deconstructive cynicism dangerously erodes the indispensable evidentiary function of the photographic medium.` ,
          `While framing and perspective certainly introduce subjective choices, a photograph retains a stubborn physical relationship to historical reality that no painting, essay, or deepfake can replicate. When photojournalists documented the liberation of Nazi concentration camps in 1945, when Nick Ut captured Phan Thị Kim Phúc fleeing a napalm strike in Vietnam in 1972, or when forensic investigators photograph mass graves today, the images do not function as mere "interpretations." They function as incontrovertible physical evidence that specific atrocities occurred at specific moments in time.` ,
          `To reduce photography to pure subjective rhetoric is to surrender to historical denialism. An authoritarian regime can manufacture endless written justifications, but a satellite photograph showing a destroyed village or a murdered civilian provides an empirical anchor that forces the world to confront material truth.` ,
          `The goal of photographic literacy should not be cynical disbelief, but disciplined contextualization. We must learn to read photographs alongside forensic evidence, witness testimony, and historical documentation, recognizing that while an image may not tell the whole truth, it often reveals truths that words would gladly conceal.`
        ]
      }
    },
    sources: [
      { title: 'Camera Lucida: Reflections on Photography (Roland Barthes)', url: 'https://us.macmillan.com/books/9780374532338/cameralucida', note: 'Seminal philosophical exploration of indexicality, the punctum, and photographic death.' },
      { title: 'Ways of Seeing (John Berger)', url: 'https://www.penguinrandomhouse.com/books/261073/ways-of-seeing-by-john-berger/', note: 'Classic BBC treatise analyzing how images reproduce ideology and male gaze.' },
      { title: 'On Photography (Susan Sontag)', url: 'https://us.macmillan.com/books/9780312420093/onphotography', note: 'Critical essays exploring the ethics, voyeurism, and consumption of photographic images.' }
    ],
    interpret: [
      { id: '21i1', type: 'mc', tag: 'Main idea', q: `What is the central philosophical thesis of the main essay regarding photography?`, options: [`Digital cameras are superior to analog cameras in every way.`, `A photograph is an active, subjective interpretation rather than a neutral objective mirror, because framing, visual grammar, time-slicing, and power dynamics shape meaning.`, `Photographs should be banned from courtrooms because light cannot be trusted.`, `All photojournalists are dishonest.`], answer: 1, explain: `The essay demonstrates how technical framing, visual grammar, and selective moments transform mechanical recordings into subjective interpretations.` },
      { id: '21i2', type: 'mc', tag: 'Inference', q: `What does the author identify as the "category error" committed by defenders of photographic neutrality?`, options: [`Confusing color photography with black-and-white photography.`, `Confusing the physical fidelity of an optical sensor (indexicality) with the neutrality and truthfulness of the resulting image.`, `Thinking that cameras require lenses.`, `Believing that painters work faster than photographers.`], answer: 1, explain: `Paragraph 2 shows that physical indexical fidelity does not equal narrative or contextual neutrality.` },
      { id: '21i3', type: 'tf', tag: 'Detail', q: `According to paragraph 6, the presence of a photographer has zero effect on how human subjects behave in a war zone or crisis.`, answer: false, explain: `Paragraph 6 explicitly states that human subjects react, perform, and pose when a camera enters their environment.` },
      { id: '21i4', type: 'mc', tag: 'Counterpoint argument', q: `Why does the counterpoint warn against extreme skepticism toward photographic truth?`, options: [`Because photography equipment is expensive.`, `Because denying the evidentiary baseline of photography enables historical denialism of real atrocities (like concentration camps or war crimes).`, `Because newspapers will lose advertising revenue.`, `Because painting is too slow.`], answer: 1, explain: `The counterpoint emphasizes that indexical photographs provide essential forensic evidence against historical denialism.` },
      { id: '21i5', type: 'open', tag: 'Evidence vs interpretation', q: `In paragraph 3, what hypothetical example does the author use to illustrate how framing alters the political interpretation of a crisis?`, rows: 4, guide: [`A photojournalist frames a starving child in isolation (natural tragedy), but crops out a luxury resort 50 meters away (structural inequality).`] },
      { id: '21i6', type: 'open', tag: 'Synthesis & comparison', q: `How does the author distinguish between "indexical accuracy" (light hitting a sensor in a millisecond) and "historical truth" (understanding an event)?`, rows: 5, guide: [`Indexical accuracy captures a physical split-second (e.g. a politician sneezing or closing eyes), but this can create a false narrative portrait of incompetence or malice.`] },
      { id: '21i7', type: 'open', tag: 'Application', q: `Choose a well-known viral photograph from Brazilian news or social media and analyze what was included in the frame versus what was excluded from the wider context.`, rows: 5, guide: [`Mention specific visual framing: e.g. a street protest image framing police vs demonstrator, or an environmental fire image framing isolated trees vs agribusiness borders.`] }
    ],
    notice: [
      {
        title: 'Advanced, reduced, and non-defining relative clauses',
        sub: 'Layering descriptive nuance, spatial qualifications, and historical context with syntactic elegance',
        examples: [
          `The camera, <b>which had been celebrated as an innocent eye</b>, proved to be an ideological weapon. (Non-defining relative clause)`,
          `The photograph <b>[which was] taken during the raid</b> served as the central forensic exhibit. (Reduced passive relative clause)`,
          `War photographers, <b>whose institutional funding often dictates their access</b>, navigate extreme ethical tensions. (Possessive relative clause)`
        ],
        questions: [
          `How does a non-defining relative clause (with commas) add parenthetical analysis without restricting the subject?`,
          `How does reducing a relative clause (*the image taken by...* instead of *the image that was taken by...*) enhance sentence economy?`
        ],
        explain: `<p>Sophisticated visual analysis uses layered relative clauses to weave context into sentences:</p><ul><li><b>Reduced participle clauses:</b> <i>Photographs [that are] produced under state censorship... → Photographs produced under state censorship...</i></li><li><b>Prepositional relative clauses:</b> <i>The lens through which we view poverty... / The conditions under which the image was made...</i></li><li><b>Non-defining relative clauses (with commas):</b> Add essential historical evaluation without breaking the main clause.</li></ul>`,
        compare: { head: ['Choppy clauses', 'Reduced relative clause', 'Stylistic gain'], rows: [['The image was captured in 1972. It changed public opinion on the war.', 'The iconic image, captured in 1972, fundamentally altered public perception of the war.', 'Flows as a single, authoritative sentence.']] },
        practice: [
          [`Reduce into a participle relative phrase: <i>The evidence that was presented by the photojournalist silenced the critics.</i>`, `The evidence presented by the photojournalist silenced the critics.`, `Reduces relative clause to past participial phrase.`],
          [`Combine using a prepositional relative pronoun: <i>The photographer worked under dangerous conditions. These conditions are rarely discussed.</i>`, `The dangerous conditions under which the photographer worked are rarely discussed.`, `Uses "under which" prepositional structure.`]
        ],
        radar: [
          { wrong: 'The camera who took the picture was broken.', right: 'The camera that / which took the picture was broken.', why: 'Use which/that for inanimate objects (cameras) and who for people.' },
          { wrong: 'The photo, that was taken in Rio, won the prize.', right: 'The photo, which was taken in Rio, won the prize.', why: 'Use which (not that) in non-defining clauses with commas.' }
        ],
        help: `<p><b>Em português:</b> Orações relativas reduzidas (<i>The image [which was] taken...</i> = A imagem tirada...) e pronomes preposicionados (<i>the lens through which...</i> = a lente através da qual...) enriquecem a análise estética.</p>`
      },
      {
        title: 'Participle clauses for background, cause, and simultaneous action',
        sub: 'Setting atmospheric scene lines and linking visual observation to critical deduction',
        examples: [
          `<b>Tilting the camera upward</b>, the photographer transformed the politician into a monumental hero. (Present participle: action/manner)`,
          `<b>Having witnessed the destruction of the village</b>, the journalist refused to sanitize the scene. (Perfect participle: prior cause)`,
          `<b>Cropped tightly around the eyes</b>, the portrait conveys intense psychological intimacy. (Past participle: condition)`
        ],
        questions: [
          `How does an initial present participle clause (*Tilting the camera...*) establish cause or manner before the main subject?`,
          `Why must the implicit subject of an introductory participle clause match the grammatical subject of the main clause?`
        ],
        explain: `<p>Participle clauses provide cinematic flow and economic causation in essay writing:</p><ul><li><b>Present participle (-ing):</b> Simultaneous action or cause (<i>Looking through the viewfinder, she noticed...</i>).</li><li><b>Past participle (-ed/en):</b> State or condition (<i>Surrounded by military guards, the detainee...</i>).</li><li><b>Perfect participle (Having + participle):</b> Prior completed event explaining a subsequent action (<i>Having examined the raw negative, the forensic team concluded...</i>).</li></ul>`,
        compare: { head: ['Two separate sentences', 'Introductory participle clause', 'Cinematic flow'], rows: [['The photographer selected a high angle. She made the crowd look disorganized.', 'Selecting a high angle, the photographer rendered the crowd visibly disorganized.', 'Creates instant, fluid visual analysis.']] },
        practice: [
          [`Combine using a present participle: <i>The editor zoomed in on the tear. He intensified the melodrama of the image.</i>`, `Zooming in on the tear, the editor intensified the melodrama of the image.`, `Combines action and result into participial frame.`]
        ],
        radar: [
          { wrong: 'Looking at the photo, the tears came to my eyes.', right: 'Looking at the photo, I began to weep.', why: 'Dangling participle: the subject looking at the photo must be "I", not "the tears".' }
        ],
        help: `<p><b>Em português:</b> Orações participiais (<i>Zooming in on the face,...</i> = Ao dar zoom no rosto,... / <i>Having analyzed the negative,...</i> = Tendo analisado o negativo,...) criam fluidez quase cinematográfica no texto analítico.</p>`
      }
    ],
    vocab: [
      ['indexicality', 'noun', 'The semiotic quality of a sign that points directly to its referent through a physical causal connection.', 'The legal authority of photography rests on its presumed indexicality.', 'A shadow possesses indexicality because it is caused by light and form.', ['indexical link', 'photographic indexicality', 'indexical trace'], ['physical trace', 'direct evidence'], 'Semiotic noun.', '/ˌɪn.dekˈsɪk.əl.i.ti/', null],
      ['viewfinder', 'noun', 'The optical or digital device on a camera that indicates the exact field of view being photographed.', 'By looking through the viewfinder, the artist decides what to include and omit.', 'She framed the landscape in the electronic viewfinder.', ['look through the viewfinder', 'optical viewfinder', 'frame in the viewfinder'], ['viewer', 'framing window'], 'Photography noun.', '/ˈvjuːˌfaɪn.dər/', null],
      ['emulsion', 'noun', 'A light-sensitive coating on photographic film or paper.', 'Light struck the silver halide emulsion, creating a latent image.', 'Traditional film relies on chemical emulsion.', ['photographic emulsion', 'chemical emulsion', 'sensitive emulsion'], ['coating', 'film layer'], 'Technical noun.', '/ɪˈmʌl.ʃən/', null],
      ['discontinuous', 'adjective', 'Having intervals or gaps; not continuous or unbroken.', 'A photograph severs a discontinuous slice of time from the ongoing flow of life.', 'The documentary presented a discontinuous sequence of historical events.', ['discontinuous slice', 'discontinuous time', 'discontinuous narrative'], ['fragmented', 'broken', 'interrupted'], 'Philosophical adjective.', '/ˌdɪs.kənˈtɪn.ju.əs/', 'continuous'],
      ['telephoto', 'adjective / noun', 'A lens with a long focal length that produces a large image of distant objects.', 'A telephoto lens compresses spatial depth and isolates the subject.', 'He used a 400mm telephoto lens for wildlife photography.', ['telephoto lens', 'telephoto perspective', 'compression of a telephoto'], ['long lens', 'magnifying lens'], 'Photography technical term.', '/ˌtel.ɪˈfəʊ.təʊ/', 'wide-angle'],
      ['deranged', 'adjective', 'Mad; insane; severely disordered in mind or behavior.', 'Freezing an accidental facial twitch can make a calm speaker appear deranged.', 'The villain gave a deranged laugh.', ['appear deranged', 'deranged expression', 'deranged behavior'], ['unhinged', 'insane', 'demented'], 'Descriptive adjective.', '/dɪˈreɪndʒd/', 'sane'],
      ['spectator', 'noun', 'A person who watches at a show, event, or scene; an observer.', 'The photographer was not a detached spectator, but an active participant.', 'Thousands of spectators filled the stadium.', ['detached spectator', 'passive spectator', 'critical spectator'], ['observer', 'onlooker', 'viewer'], 'High-frequency noun.', '/spekˈteɪ.tər/', null],
      ['sanctify', 'verb', 'Make legitimate, holy, or beyond question.', 'The indexical nature of film was used to sanctify news photographs as objective truth.', 'Custom was used to sanctify political dominance.', ['sanctify an image', 'sanctify as truth', 'morally sanctify'], ['legitimize', 'consecrate'], 'Essayistic verb.', '/ˈsæŋk.tɪ.faɪ/', 'condemn'],
      ['voyeurism', 'noun', 'The practice of gaining pleasure or interest from watching other people’s intimate lives, pain, or secrets.', 'Disaster photography risks descending into moral voyeurism.', 'The reality show exploited the audience’s voyeurism.', ['moral voyeurism', 'aesthetic voyeurism', 'uncomfortable voyeurism'], ['peeping', 'intrusion', 'sensationalism'], 'Critical aesthetic noun.', '/ˈvwɑː.jɜː.rɪ.zəm/', null],
      ['incontestable', 'adjective', 'Not able to be disputed or questioned; indisputable.', 'Forensic photographs provided incontestable proof of the mass grave.', 'Her mathematical proof was incontestable.', ['incontestable evidence', 'incontestable fact', 'incontestable proof'], ['indisputable', 'undeniable', 'irrefutable'], 'Epistemic adjective.', '/ˌɪn.kənˈtes.tə.bəl/', 'contestable']
    ],
    chunks: [
      ['the fallacy of the innocent eye', 'The mistaken belief that human observation or cameras can view the world without interpretive bias.', 'Deconstructing visual neutrality', 'Philosophical · aesthetic', 'Art history begins with deconstructing the fallacy of the innocent eye.', 'Critique photographic objectivity.', `The camera does not possess an innocent eye; it is always guided by cultural assumptions.`, 'Core Gombrich/Berger chunk.'],
      ['indexical fidelity versus narrative truth', 'Distinguishing the accurate physical recording of light from the truthfulness of the story told.', 'Making semiotic distinctions', 'Academic · philosophical', 'We must separate indexical fidelity from narrative truth when analyzing viral images.', 'Evaluate documentary evidence.', `An image may possess total indexical fidelity while delivering a profound narrative lie.`, 'Foundational semiotic chunk.'],
      ['the decisive tyranny of the frozen millisecond', 'How freezing a split-second out of context can permanently distort reality.', 'Critiquing snapshot distortion', 'Essayistic · critical', 'Public figures are constantly subjected to the decisive tyranny of the frozen millisecond.', 'Analyze political photos.', `A sneeze or blink becomes an eternal scandal under the decisive tyranny of the frozen millisecond.`, 'Sharp critical chunk.'],
      ['the radical act of selection and omission', 'The deliberate choice of what to keep inside the frame and what to exclude.', 'Explaining framing mechanics', 'Critical · analytical', 'Every photograph performs a radical act of selection and omission.', 'Analyze media images.', `Framing the disaster without showing historical context is a radical act of selection and omission.`, 'Framing analysis chunk.'],
      ['the camera is an argument, not a mirror', 'Reframing photography as a rhetorical visual claim rather than passive reflection.', 'Stating core thesis', 'Essayistic · rhetorical', 'Never forget that the camera is an argument, not a mirror.', 'Introduce visual critique.', `Documentary photography proves that the camera is an argument about human dignity.`, 'Core visual rhetoric chunk.'],
      ['the physical trace of reflected light', 'Describing the scientific and indexical nature of photographic chemistry/sensors.', 'Explaining indexicality', 'Formal · scientific', 'A photograph is the physical trace of reflected light striking a sensor.', 'Ground photographic physics.', `Unlike a painting, a photograph carries the physical trace of reflected light from a real event.`, 'Indexical definition chunk.'],
      ['a relational encounter between unequal actors', 'Viewing portraiture as a power dynamic between photographer and subject.', 'Analyzing social power', 'Sociological · ethical', 'Documentary photography is always a relational encounter between unequal actors.', 'Critique ethnographic photos.', `Photographing vulnerable refugees is a relational encounter between unequal actors requiring immense care.`, 'Ethical critique chunk.'],
      ['the silent grammar of the lens', 'How focal length, angle, lighting, and depth of field create implicit meaning.', 'Explaining technical rhetoric', 'Aesthetic · analytical', 'Viewers are unconsciously persuaded by the silent grammar of the lens.', 'Analyze camera techniques.', `Low angles and wide lenses constitute the silent grammar of the lens in political propaganda.`, 'Technical visual chunk.'],
      ['an empirical anchor against historical denialism', 'Photographs acting as undeniable forensic evidence of real atrocities.', 'Defending documentary evidence', 'Historical · legal', 'Forensic images provide an empirical anchor against historical denialism.', 'Defend war photography.', `Photographs of liberated concentration camps remain an indispensable empirical anchor against denialism.`, 'Powerful counterpoint chunk.'],
      ['cross-examine the visual frame', 'Interrogating an image’s boundaries, origins, and motives with critical rigor.', 'Promoting visual literacy', 'Philosophical · concluding', 'Critical literacy demands that citizens learn to cross-examine the visual frame.', 'Conclude visual essay.', `Instead of accepting photos as facts, we must cross-examine the visual frame and ask what was omitted.`, 'Actionable closing chunk.']
    ],
    collocations: [
      [`We must deconstruct the fallacy of the ______ eye in photography.`, [`innocent`, `substantive`, `discretionary`, `regressive`], 0, `Fallacy of the innocent eye is the classical art theory phrase.`],
      [`A photograph retains an ______ link to the light reflected from an object.`, [`indexical`, `contingent`, `visceral`, `panoptic`], 0, `Indexical link is the established semiotic collocation.`],
      [`Documentary images provide an empirical ______ against historical denialism.`, [`anchor`, `straitjacket`, `vacuum`, `cleavage`], 0, `Empirical anchor describes grounding forensic truth.`],
      [`Every photograph involves a radical act of selection and ______.`, [`omission`, `telemetry`, `hubris`, `precarity`], 0, `Selection and omission is the standard pairing in visual analysis.`]
    ],
    upgrades: [
      [`Photos show what really happened because cameras don't lie.`, `While photography possesses indexical fidelity, every image constitutes a subjective interpretation shaped by selection, framing, and visual grammar.`],
      [`The photographer zoomed in to make the politician look crazy.`, `By selecting a tight focal length and freezing a fleeting micro-expression, the photographer engineered an uncharitable narrative portrait.`],
      [`We need war photos so people know about war crimes.`, `Forensic and documentary photographs serve as an indispensable empirical anchor against historical denialism and state obfuscation.`]
    ],
    think: {
      title: 'Selection, Omission and the Frame Problem in Visual Epistemology',
      lead: 'In visual epistemology, the fundamental question is not whether what is inside the frame is real, but what interpretive conclusion is forced upon the viewer by what has been banished to the margins.',
      defs: [
        ['The Frame Problem', `The cognitive and epistemic challenge of determining what surrounding context is relevant when evaluating an isolated piece of information or image.`],
        ['Salience bias', `The cognitive tendency to focus only on visible, striking elements while completely ignoring invisible background conditions.`],
        ['Decontextualization', `The extraction of an image, quote, or event from its original historical and spatial context, altering its perceived meaning.`]
      ],
      items: [
        { id: '21t1', type: 'mc', tag: 'Frame problem check', q: `A photograph shows a protester throwing a stone at an armored vehicle. An uncropped wider shot reveals that three seconds earlier, soldiers fired tear gas into a peaceful crowd. What epistemic error does the first photo induce?`, options: [`Salience bias through decontextualization: it isolates the reaction while omitting the prior provocation that explains it.`, `The substitution fallacy.`, `Goodhart’s Law.`, `The Great Gatsby Curve.`], answer: 0, explain: `Cropping isolates the stone thrower, reversing cause and effect through selective omission.` },
        { id: '21t2', type: 'open', tag: 'Steelmanning', q: `Steelman the defense of war photojournalism: explain why showing graphic, unedited images of civilian casualties is essential for democratic accountability, despite concerns about voyeurism.`, rows: 5, guide: [`Focus on piercing state propaganda, confronting citizens with the human cost of foreign policy, preventing denialism, and mobilizing humanitarian aid.`] },
        { id: '21t3', type: 'open', tag: 'Visual grammar deconstruction', q: `Analyze how two different camera angles (a low-angle shot looking up versus a high-angle shot looking down) alter the viewer's psychological perception of a homeless person.`, rows: 5, guide: [`Low angle: grants monumental dignity, resilience, and presence; High angle: diminishes into a small, helpless, pitied object viewed from above.`] },
        { id: '21t4', type: 'open', tag: 'Core synthesis', q: `Can a photograph be simultaneously 100% indexically accurate and 100% ideologically deceptive? State one clear principle and illustrate with an example.`, rows: 6, guide: [`Principle: Indexicality guarantees that light hit a sensor in a millisecond, but meaning depends on context and framing; Example: a photo showing a leader smiling while passing a funeral—the smile was an unrelated greeting to an aide, but the image frames them as callous.`] }
      ]
    },
    writing: {
      focus: {
        title: 'Writing an Analytical / Argumentative Essay on Visual Culture',
        text: 'A C1 essay on visual culture moves beyond treating images as illustrations. You must analyze the camera as an active rhetorical instrument, deconstructing technical parameters (framing, focal length, angle) alongside profound semiotic and epistemological theory.',
        weak: 'Photos are not always true because photographers can crop things out and use photoshop to change colors.',
        strong: 'While photography maintains an indexical relationship to physical light, the inevitable mechanics of framing, visual grammar, and temporal fragmentation transform every photographic capture into a silent, subjective interpretation of reality.'
      },
      short: {
        kind: 'Visual deconstruction', title: 'The Rhetoric of the Lens: Deconstructing a Photojournalistic Frame',
        prompt: 'Analyze how an apparently objective news photograph (such as an image of a migrant or a political candidate) is structured by the silent grammar of the lens—framing, focal length, and camera angle. Use reduced relative clauses and participle clauses.',
        min: 160, max: 260, support: 'light',
        guide: ['Use reduced relative clauses and introductory participle clauses (-ing / -ed).', 'Incorporate the terms indexicality, visual grammar, and selection and omission.']
      },
      main: {
        kind: 'Analytical / argumentative essay', title: 'The Camera as Argument: Photography, Neutrality and the Ethics of the Frame',
        prompt: 'Can a photograph ever document reality without also interpreting it? Write a sustained essay evaluating the tension between photographic indexicality (mechanical witness) and visual rhetoric (framing, selection, and ideological construction).',
        min: 450, max: 650, support: 'light',
        guide: [
          'Introduction: contrast the historical myth of the innocent eye with modern semiotics, and state your thesis.',
          'Body 1: examine the mechanics of interpretation (the boundary of the frame, selection and omission, the silent grammar of lenses and angles).',
          'Body 2: analyze the distortion of time (freezing a millisecond from the continuum, indexical fidelity vs narrative truth).',
          'Body 3: address the counterpoint (photography as an indispensable empirical anchor against historical denialism, forensic documentation).',
          'Conclusion: synthesize the dual nature of the medium and advocate for disciplined visual literacy to cross-examine the frame.'
        ]
      }
    },
    edit: {
      checklist: [
        'Did I balance the semiotic critique of framing with the forensic value of photographic evidence?',
        'Did I use reduced and non-defining relative clauses accurately with proper punctuation?',
        'Did I employ introductory participle clauses (present, past, perfect) without dangling modifiers?',
        'Did I integrate at least three STEAL structures naturally?',
        'Does my conclusion provide a mature standard for critical visual literacy?'
      ],
      challenges: [
        'Include at least one non-defining relative clause with commas ("The camera, which had been..., proved...").',
        'Include one sentence starting with an introductory participle clause ("Tilting the camera upward,...").',
        'Use the chunk "the fallacy of the innocent eye" or "the camera is an argument, not a mirror".'
      ]
    },
    retrieve: {
      content: 'Explain the difference between "indexical fidelity" and "narrative truth" in photography.',
      contentGuide: ['Indexical fidelity is the physical accuracy of light hitting a sensor; narrative truth is the honesty and completeness of the contextual story told.'],
      grammar: 'Write one sentence with a reduced relative clause and one with an introductory present participle clause (-ing).',
      grammarGuide: ['Verify that the participial subject matches the main clause subject.'],
      reasoning: 'How does the "Frame Problem" explain why cropping out surrounding context can reverse cause and effect in a news image?',
      reasoningGuide: ['Cropping isolates an action (e.g. throwing a rock) while omitting the prior provocation (tear gas), reversing moral attribution.'],
      cumulative: 'Connect Unit 21 to Unit 16: how does visual framing in photography mirror cognitive framing and euphemism in political language?',
      summary: `<p><b>Main claim:</b> photographs are not neutral mirrors; through framing, visual grammar, temporal isolation, and social power dynamics, the camera functions as an active visual argument, though it retains forensic power against denialism.</p><p><b>Grammar:</b> reduced relative clauses and introductory participle clauses (-ing / -ed / having done) enable cinematic, dense analytical prose.</p><p><b>Reasoning:</b> distinguish indexical fidelity from narrative truth; identify selection and omission in visual epistemology.</p>`
    }
  });

  const u = K.units['21'];
  u.listening = [
    {
      id: 'l1', title: 'The Edge of the Frame', format: 'Curator talk at an art museum',
      file: '/audio/en/unit-21/u21-listening-01.mp3', duration: 135, level: 'B2+ → C1',
      audioReady: false,
      voice: 'One museum curator (Dr. Aris Thorne); passionate, scholarly, British English',
      passes: ['First listen · understand why Dr. Thorne focuses on what is outside the borders of famous photographs', 'Second listen · note reduced relative and participle clauses', 'Third listen · examine the distinction between recording and composing'],
      transcript: `When visitors walk through this retrospective of twentieth-century photojournalism, they invariably stop before the famous icons of war, famine, and political triumph. They gaze at the prints and say: “What an extraordinary moment to have witnessed.” They speak as if the camera were an open window through which they are peering directly into the past.\n\nCaptured on silver gelatin paper, these images do indeed possess extraordinary indexical power. But as a curator, what fascinates me most is never what sits at the center of the print. What fascinates me is the invisible line that borders the frame.\n\nConsider this photograph from nineteen sixty-eight, depicting a student barricade in Paris. Framed tightly around three young men shouting behind paving stones, the composition conveys a sense of heroic, epochal revolution. But looking at the contact sheet—examining the five uncropped frames taken immediately before and after—you discover that three yards to the right, life proceeded with utter indifference: a café was open, a waiter was serving coffee, and a couple was reading newspapers. By selecting that precise twenty-eighth millimeter crop, the photographer did not simply record Paris in nineteen sixty-eight. He composed a visual myth about Paris in nineteen sixty-eight. The frame is never innocent. It is the boundary where reality ends and ideology begins.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Curatorial insight', q: 'What does the contact sheet reveal about the famous 1968 Paris barricade photograph according to Dr. Thorne?', options: ['The photograph was taken in London, not Paris.', 'The uncropped context showed ordinary life continuing normally just three yards away, proving that the heroic revolutionary framing was a deliberate compositional choice.', 'The camera had a broken lens.', 'The students were professional actors.'], answer: 1, explain: 'Dr. Thorne shows that examining the wider contact sheet reveals how tight framing manufactured a visual myth.' },
        { id: 'q2', type: 'open', tag: 'Aphorism deconstruction', q: 'Explain Dr. Thorne’s closing statement: "The frame is never innocent. It is the boundary where reality ends and ideology begins."', rubric: ['Explains that framing is an ideological selection that excludes competing context', 'Shows that choosing what to hide is as much an act of power as choosing what to show'] }
      ]
    },
    {
      id: 'l2', title: 'The Camera as Forensic Witness', format: 'Human rights investigator interview',
      file: '/audio/en/unit-21/u21-listening-02.mp3', duration: 125, level: 'C1',
      audioReady: false,
      voice: 'Two voices (Interviewer Maya Lin and Forensic Investigator David Ramos); solemn, precise, International English',
      passes: ['First listen · understand how forensic photography differs from artistic or editorial photography', 'Second listen · track the criteria for establishing incontrovertible photographic evidence'],
      transcript: `Maya: David, as a forensic investigator documenting human rights violations in conflict zones, you spend your life taking photographs. When cultural theorists argue that all photography is merely subjective interpretation, how do you respond?\n\nDavid: I understand the academic critique of framing, Maya. But in an international criminal tribunal, when we present geotagged, timestamped, uncompressed raw photographs of a mass grave or a bombed hospital, those images are not “subjective interpretations.” They are physical, indexical traces of war crimes.\n\nMaya: And what prevents them from being dismissed as selective or biased?\n\nDavid: Rigorous forensic methodology. We do not take single dramatic, cinematic snapshots. We shoot three-hundred-and-sixty-degree spherical coverage, we include physical metric scales in the frame, we preserve cryptographic metadata, and we cross-reference the images with satellite radar and ballistic trajectories. When combined with rigorous forensic standards, the camera ceases to be an artistic tool. It becomes an incorruptible witness that pierces state denialism and preserves the dignity of victims who can no longer speak.`,
      questions: [
        { id: 'q1', type: 'mc', tag: 'Forensic reality', q: 'How does forensic photography overcome the critique of subjective framing according to David?', options: ['By using black-and-white film exclusively.', 'By using 360-degree spherical coverage, metric scales, cryptographic metadata, and cross-referencing with satellite and ballistic data.', 'By asking the permission of the perpetrators.', 'By printing photos on larger paper.'], answer: 1, explain: 'Forensic methodology uses comprehensive multi-angle documentation and data verification to eliminate selective bias.' },
        { id: 'q2', type: 'open', tag: 'Ethical purpose', q: 'What is the ultimate purpose of forensic photography according to David Ramos?', rubric: ['To pierce state denialism of atrocities', 'To provide incontrovertible evidence for international criminal tribunals', 'To preserve the dignity and memory of victims of violence'] }
      ]
    }
  ];

  u.speaking = {
    id: 's1', label: 'SAY IT', level: 'B2+ → C1', seconds: [60, 120],
    prompt: 'A media commentator asserts: “News photographs are objective historical facts; you can trust a picture in a way you can never trust written words.” Respond in 60–120 seconds. Deconstruct the fallacy of the innocent eye, explain the role of framing and visual grammar, and balance this critique with the forensic power of photographic evidence.',
    prepare: 'Keywords only: fallacy of the innocent eye · indexical fidelity vs narrative truth · framing & omission · visual grammar (angles/lenses) · empirical anchor against denialism. Do not script.',
    grammar: 'Reduced relative clauses (captured in 1972); participle clauses (Selecting a high angle); formal stance hedging',
    targets: ['the fallacy of the innocent eye', 'indexical fidelity versus narrative truth', 'the radical act of selection and omission', 'an empirical anchor against historical denialism'],
    rubric: [
      'Directly and articulately challenges the commentator’s naive realism',
      'Explains why framing and visual grammar constitute an active visual argument',
      'Accurately employs reduced relative clauses and participle clauses',
      'Provides a balanced conclusion that preserves the forensic value of photographic witness'
    ]
  };
})(window.KLANG);
