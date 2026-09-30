/* UNIT 23 · WHY SOME IMAGES STAY WITH US */
(function (K) {
  K.units['23'] = K.makeUnit('23', {
    module: 5, title: 'Why some images', titleEm: 'stay with us',
    question: 'Why do some images remain vivid in memory while thousands of others disappear?',
    knowLead: `Every day, the average human scrolls past thousands of photographs, digital graphics, and video thumbnails. Within seconds, virtually all of them vanish without leaving a cognitive trace. Yet a tiny fraction of images manage to pierce through the mental static, lodging themselves permanently into our individual memory and collective historical consciousness. What gives an image this extraordinary power of endurance? Is it technical mastery, intense emotional shock, narrative ambiguity, or an elusive personal resonance that defies rational analysis? Consider the mechanics of visual memory as you read.`,
    terms: [
      ['Studium', `Roland Barthes\'s term for the general, culturally mediated, and rational interest we take in a photograph\'s historical, political, or aesthetic content.`],
      ['Punctum', `Barthes\'s term for the unintended, highly personal detail in a photograph that pricks, wounds, or pierces the viewer, creating an intense emotional rupture.`],
      ['Salience', `The psychological quality by which an item or stimulus stands out relative to its neighbors and immediately grabs cognitive attention.`],
      ['Visual iconography', `A collection of visual images, symbols, or motifs associated with a particular subject, movement, or historical era that become universally recognized archetypes.`],
      ['Epistemic resonance', `The quality in an artwork or image that seems to uncover a deep, pre-existing, but unarticulated truth about human existence or history.`]
    ],
    views: [
      'Two perspectives on iconic images',
      'The intrinsic resonance thesis',
      `Enduring images possess a unique combination of compositional tension, emotional vulnerability, and narrative ambiguity that strikes deep, universal archetypes in human psychology.`,
      'The institutional curation thesis',
      `No image is inherently unforgettable; visual icons are manufactured through relentless institutional repetition, media monopolies, cultural hegemony, and selective archiving.`,
      `The core challenge is understanding whether an image endures because of its internal aesthetic resonance or the external cultural machinery that circulates it.`
    ],
    knowPrompt: `Think of a specific photograph from your life or history that has remained vividly in your mind for years. What exact detail or quality makes it unforgettable?`,
    knowGuide: [
      `Distinguish between the general subject matter of the photograph and the specific detail that holds your emotional attention.`,
      `Reflect on whether your memory of the image is based on personal emotion or frequent social exposure.`
    ],
    read: {
      main: {
        format: 'Philosophical & aesthetic essay', title: 'The Punctum, the Brain, and the Shadow of Memory',
        standfirst: `In an age of digital hyper-production, what separates a fleeting visual impression from an indelible psychological monument?`,
        pull: { after: 5, text: `What pricks me in an image is rarely what the photographer consciously set out to show.` },
        notes: { 1: `<b>Roland Barthes</b> published his seminal meditation on photography, <i>Camera Lucida</i>, in 1980, shortly before his death.`, 3: `<b>Dorothea Lange</b> photographed Florence Owens Thompson in 1936, creating the world-famous *Migrant Mother*.` },
        paras: [
          `In his poignant and enigmatic 1980 treatise *Camera Lucida*, French semiotician Roland Barthes embarked on a deeply personal quest to understand why most photographs leave viewers indifferent, while a select few possess an almost supernatural ability to haunt the mind for a lifetime. To resolve this paradox, Barthes formulated a vital distinction between two distinct dimensions of visual reception: the *studium* and the *punctum*. The studium, he argued, refers to the vast field of cultural, political, and historical interest that a photograph elicits. When we inspect a photo with studium, we appreciate its composition, understand its historical context, and admire its journalistic competence. We like it politely, rationally, and intellectually; yet it does not shake our soul.`,
          `It is the second element—the *punctum*—that creates the enduring psychological wound. The punctum is not something deliberately engineered by the photographer’s craft; rather, it is a tiny, often accidental detail that leaps out from the frame, pierces the spectator’s defenses, and establishes an instantaneous, unmediated emotional intimacy. It might be the worn strap of a peasant woman’s shoe, the peculiar angle of a dying soldier’s collar, the subtle curl of a child’s finger, or an enigmatic expression of exhaustion that defies easy categorization. What makes the punctum so devastatingly memorable is its refusal to be tamed by language or political consensus; it bypasses intellectual analysis to trigger a visceral, deeply subjective shock of recognition.`,
          `Modern cognitive neuroscience and evolutionary psychology offer a complementary, albeit more mechanical, explanation for why certain images achieve cognitive immortality. The human brain was not engineered to process billions of high-definition digital pixels delivered across glowing handheld screens. Evolutionary survival depended upon rapid, high-stakes visual salience—the ability to immediately identify emotional authenticity, structural anomalies, mortal danger, or profound communal vulnerability. When an image presents a human face frozen in an ambiguous, unscripted micro-expression—such as Dorothea Lange’s *Migrant Mother*, where desperation, dignified resilience, maternal anxiety, and distant contemplation coexist across a single furrowed brow—the brain’s visual cortex and amygdala are caught in a permanent interpretive loop. Because the emotional narrative cannot be cleanly resolved, the image refuses to be filed away and forgotten.`,
          `Furthermore, iconic photographs almost invariably function as visual metaphors that synthesize complex historical epochs into an accessible, archetypal tableau. When Nick Ut captured a terrified nine-year-old girl running naked down a highway after a napalm attack, or when Jeff Widener photographed an anonymous man carrying shopping bags and halting a column of military tanks near Tiananmen Square, the images transcended their immediate journalistic coordinates. They ceased to be merely factual records of isolated occurrences; they transformed into universal allegories of innocence destroyed by war, and individual human agency confronting the monolithic brutality of the state. It is this allegorical elasticity—the ability to speak simultaneously to a specific historical crisis and to timeless philosophical truths—that grants an image permanent residency in the human imagination.`,
          `Yet visual memory is not merely a matter of emotional shock; it is fundamentally governed by aesthetic rhythm and compositional tension. The masterworks of photojournalism and fine art photography often rely on subtle geometric harmonies—the golden ratio, dynamic diagonals, dramatic chiaroscuro, and the interplay between light and deep shadow—that create visual music for the retina. What holds our gaze is not symmetry, which produces passive tranquility, but productive disequilibrium: a visual composition where disparate elements are held in electric suspension, inviting the eye to wander endlessly across the frame without exhausting its possibilities.`,
          `Finally, an image endures because it acknowledges its own mortality. In *Camera Lucida*, Barthes observed that every photograph carries an implicit catastrophe: the temporal certainty that the person depicted, no matter how young, vibrant, and alive they appear within the silver emulsion or digital sensor, has already died or will inevitably die. Photography is an art of the past tense—a melancholic *memento mori* that freezes a split-second of fugitive existence that can never be repeated. What pierces us when we look at an old family portrait or an iconic war photograph is the terrible, beautiful realization that we are looking at the living ghost of a moment that has vanished forever into the abyss of time.`,
          `In our contemporary culture of algorithmic hyper-saturation, where billions of disposable photographs are generated, consumed, and deleted every hour, understanding the architecture of visual memory becomes a vital human necessity. The images that truly stay with us are not those that shout the loudest or boast the most saturated colors. What survives the relentless erosion of digital noise are those rare visual encounters that possess the courage of stillness, the resonance of the punctum, and the profound, haunting mystery of genuine human truth.`
        ]
      },
      counter: {
        format: 'Sociological critique', title: 'The Myth of the Unforgettable Image: Curation as Power',
        standfirst: `Images do not survive on aesthetic merit alone; they are canonized by institutional power, media monopolies, and manufactured nostalgia.`,
        paras: [
          `To believe that iconic photographs endure solely because of an elusive "punctum" or intrinsic psychological genius is to embrace a romanticized myth that ignores the brutal sociology of cultural distribution.` ,
          `Visual memory is not an unmediated dialogue between an individual brain and a piece of photographic paper. It is an aggressively curated, politically mediated terrain shaped by museum curators, textbook publishers, wire service editors, and multinational media conglomerates who decide which historical narratives deserve immortality and which deserve erasure.` ,
          `Why do Western audiences instantly recognize the *Migrant Mother* or the *Afghan Girl*, while thousands of equally devastating and artistically superior photographs taken by African, Asian, or Latin American photographers remain completely unknown? The answer lies not in cognitive neuroscience, but in cultural hegemony and institutional gatekeeping.` ,
          `Furthermore, cognitive repetition creates a self-fulfilling prophecy: an image becomes "unforgettable" simply because it has been reprinted millions of times on magazine covers, posters, coffee mugs, and documentary intros. What we are remembering is often not the photograph itself, but our hundredth encounter with its commercial reproduction.`
        ]
      }
    },
    sources: [
      { title: 'Camera Lucida: Reflections on Photography (Roland Barthes)', url: 'https://us.macmillan.com/books/9780374532338/cameralucida', note: 'Seminal philosophical work introducing the concepts of studium and punctum.' },
      { title: 'Ways of Seeing (John Berger)', url: 'https://www.penguinrandomhouse.com/books/11796/ways-of-seeing-by-john-berger/', note: 'Classic visual culture analysis examining how ideology shapes the act of looking.' },
      { title: 'Visual Memory and Emotional Salience (Journal of Cognitive Neuroscience)', url: 'https://direct.mit.edu/jocn', note: 'Neuroscientific studies on how affective arousal enhances long-term visual encoding.' }
    ],
    interpret: [
      { id: '23i1', type: 'mc', tag: 'Main idea', q: `What is the fundamental thesis of the main essay regarding why certain images endure?`, options: [`Images endure exclusively because they are heavily promoted by corporate advertising agencies.`, `Certain images achieve permanent psychological resonance through a convergence of accidental personal details (the punctum), narrative ambiguity, structural tension, and their status as melancholic mementos of mortality.`, `Only high-resolution digital photographs have the capacity to stimulate long-term human memory.`, `People remember photographs solely when they contain famous political leaders.`], answer: 1, explain: `The essay explores how Barthes's punctum, cognitive salience, visual metaphors, and temporal melancholy create enduring psychological resonance.` },
      { id: '23i2', type: 'mc', tag: 'Detail', q: `According to Roland Barthes, how does the *punctum* differ from the *studium*?`, options: [`The studium is an accidental wound, whereas the punctum is general cultural and historical interest.`, `The studium represents rational, culturally mediated interest, while the punctum is an unintended, subjective detail that pierces and moves the spectator.`, `The studium is used only in digital cameras, while the punctum refers to analogue chemical film.`, `The studium is an award given by photojournalism juries, whereas the punctum is a technical lens filter.`], answer: 1, explain: `Barthes defines studium as general cultural interest and punctum as the piercing, personal detail.` },
      { id: '23i3', type: 'mc', tag: 'Inference', q: `Why does the brain get caught in an "interpretive loop" when observing Dorothea Lange's *Migrant Mother*?`, options: [`Because the camera resolution was extremely poor and blurry.`, `Because the emotional expression contains contradictory, unresolved states (despair, dignity, resilience, anxiety) that resist simple narrative closure.`, `Because the viewer is distracted by the children's bright clothing.`, `Because the photograph was taken in a foreign country with unfamiliar cultural customs.`], answer: 1, explain: `The essay explains that unresolved emotional ambiguity in human faces keeps cognitive processing active.` },
      { id: '23i4', type: 'quote', tag: 'Evidence', q: `Which phrase from the text describes photography\'s inherent relationship with time and mortality?`, find: `memento mori that freezes a split-second of fugitive existence`, quote: `a melancholic *memento mori* that freezes a split-second of fugitive existence that can never be repeated.`, explain: `The text explicitly identifies photography as an art of the past tense and a memento mori.` },
      { id: '23i5', type: 'mc', tag: 'Synthesis', q: `How does the counter-perspective challenge the intrinsic resonance thesis?`, options: [`By arguing that visual icons are manufactured through institutional gatekeeping, media hegemony, and relentless repetition rather than sheer artistic magic.`, `By claiming that human memory cannot store visual images for longer than three minutes.`, `By demonstrating that black-and-white photography is scientifically invisible to the human eye.`, `By asserting that only paintings, not photographs, can be remembered.`], answer: 0, explain: `The counter-text demonstrates how cultural power and repetitive distribution construct "unforgettable" status.` },
      { id: '23i6', type: 'mc', tag: 'Vocabulary in context', q: `In the context of the essay, what is the meaning of "allegorical elasticity"?`, options: [`The ability of a photo paper to bend without ripping.`, `The capacity of a visual image to represent both a specific historical event and universal philosophical truths simultaneously.`, `The quick delivery of digital photographs across social networks.`, `The technical flexibility of zoom lenses.`], answer: 1, explain: `Allegorical elasticity refers to an image's capacity to stretch from specific reporting to timeless universal themes.` },
      { id: '23i7', type: 'mc', tag: 'Critical thinking', q: `If both the neuro-aesthetic view and the sociological critique are valid, what is the most balanced synthesis?`, options: [`Photographs are entirely irrelevant in modern culture.`, `While intrinsic emotional ambiguity and compositional power make an image capable of resonance, institutional power determines which resonant images are amplified into collective historical icons.`, `Cognitive neuroscience has disproved all sociological theories of culture.`, `Repetition alone can make any random, blurry photo universally unforgettable.`], answer: 1, explain: `A sophisticated synthesis acknowledges both the internal psychological potential and the external structural mechanisms of distribution.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Cleft sentences for focus & dramatic emphasis',
        lead: `Cleft sentences divide a single clause into two sections to highlight a specific element (the subject, object, reason, or circumstance) and create sophisticated rhetorical emphasis.`,
        examples: [
          `*It is* the second element—the punctum—*that* creates the enduring psychological wound.`,
          `*What makes* the punctum so devastatingly memorable *is* its refusal to be tamed by language.`,
          `*It was* only after decades of study *that* Barthes unlocked the mystery of the photograph.`
        ],
        questions: [
          `How does saying "It is the punctum that wounds us" alter the rhetorical force compared to "The punctum wounds us"?`,
          `Notice how *It-clefts* (*It is X that...*) isolate the true causal agent, while *Wh-clefts* (*What X does is...*) foreground an abstract quality before revealing its essence.`
        ],
        explain: `In advanced analytical writing, cleft structures prevent monotonous subject-verb-object cadence and allow the writer to direct the reader’s intellectual spotlight onto key distinctions.`,
        compare: [
          [`Standard statement`, `The accidental detail holds the viewer's memory.`],
          [`It-cleft`, `It is the accidental detail that holds the viewer's memory.`],
          [`Wh-cleft / Pseudo-cleft`, `What holds the viewer's memory is the accidental detail.`]
        ],
        practice: [
          { q: `Rewrite this sentence using an It-cleft: "The photo's unresolved ambiguity captures our imagination."`, a: `It is the photo's unresolved ambiguity that captures our imagination.` },
          { q: `Rewrite this sentence using a Wh-cleft: "The photographer's restraint creates dramatic tension."`, a: `What creates dramatic tension is the photographer's restraint.` },
          { q: `Rewrite using a reversed pseudo-cleft: "We seek emotional honesty in visual journalism."`, a: `Emotional honesty is what we seek in visual journalism.` }
        ],
        radar: [
          `Overusing cleft sentences can make prose feel artificially theatrical. Reserve them for moments of core thematic revelation or counter-intuitive distinction.`,
          `Ensure agreement: "What we need *is* a clear perspective" (singular concept) vs "What we need *are* clearer criteria" (plural elements).`
        ],
        help: `Use cleft sentences when you want to establish a decisive contrast: "It is not technical perfection, but raw authenticity, that distinguishes great portraiture."`
      },
      {
        title: 'Focus 2 · Sentence rhythm, balance & tripartite structures',
        lead: `C1 writing achieves musicality and persuasive momentum through deliberate sentence variation, balanced antithesis, and triadic parallel phrasing (tricolon).`,
        examples: [
          `We like it politely, rationally, and intellectually; yet it does not shake our soul.`,
          `...where desperation, dignified resilience, maternal anxiety, and distant contemplation coexist across a single furrowed brow...`,
          `What survives the relentless erosion of digital noise are those rare visual encounters that possess the courage of stillness, the resonance of the punctum, and the profound mystery of human truth.`
        ],
        questions: [
          `How does combining short, punchy sentences with sprawling, rhythmic periodic sentences affect the reader's engagement?`,
          `Observe the rhythmic build in three parallel clauses: rhythm, symmetry, and cadence reinforce the logical authority of the argument.`
        ],
        explain: `Stylistic control at C1 requires matching grammatical pacing to cognitive intent. A series of identical clauses numbs the reader; dynamic rhythmic modulation commands sustained intellectual attention.`,
        compare: [
          [`Flat sequence`, `The photo has good lighting. It also has balance. It has strong emotion.`],
          [`Rhythmic tricolon`, `The photograph commands attention through the precision of its light, the geometry of its balance, and the raw vulnerability of its emotional core.`]
        ],
        practice: [
          { q: `Combine these ideas into a balanced sentence with parallel prepositional phrases: "She looked at the image. She felt grief, curiosity, and awe."`, a: `She gazed at the image with quiet grief, intense curiosity, and profound awe.` },
          { q: `Craft a periodic sentence where the main claim appears at the very end after introductory dependent clauses.`, a: `Having surveyed the archives, examined the contact sheets, and cross-examined the historical record, the curator finally understood the true power of the frame.` }
        ],
        radar: [
          `Maintain parallel grammatical structure across elements of a list or balanced clause (e.g., noun + noun + noun, or gerund + gerund + gerund).`,
          `Avoid bloated ornamentation that obscures meaning; rhythm must serve clarity, not masquerade as depth.`
        ],
        help: `Read your sentences aloud. If you run out of breath before reaching the main verb, re-balance the clause or introduce a caesura (dash or semicolon).`
      }
    ],
    vocab: [
      ['studium', 'noun', 'The rational, culturally mediated interest or informational appeal of a photograph.', 'The historian inspected the photograph with meticulous studium.', 'His studium was evident in his analysis of the uniform.', ['cultural studium', 'intellectual studium', 'pure studium'], ['informational appeal', 'cultural context', 'objective interest'], 'Critical semiotic noun.', '/ˈstuː.di.əm/', null],
      ['punctum', 'noun', 'The poignant, piercing detail in a photograph that creates an intense, subjective emotional wound.', 'The child’s unbuttoned collar served as the punctum of the entire image.', 'She found the punctum in the woman’s worn wedding band.', ['poignant punctum', 'accidental punctum', 'haunting punctum'], ['emotional sting', 'piercing detail', 'visceral hook'], 'Aesthetic & semiotic noun.', '/ˈpʌŋk.təm/', null],
      ['indelible', 'adjective', 'Making marks that cannot be erased, removed, or forgotten; permanent.', 'The image left an indelible impression on the nation’s conscience.', 'War leaves an indelible scar on surviving communities.', ['indelible mark', 'indelible memory', 'indelible impression'], ['permanent', 'ineffaceable', 'unforgettable'], 'Literary & formal adjective.', '/ɪnˈdel.ə.bəl/', 'erasable'],
      ['salience', 'noun', 'The quality of being particularly noticeable, prominent, or cognitively striking.', 'Emotional salience determines which memories are consolidated long-term.', 'The visual salience of the red flag drew immediate attention.', ['visual salience', 'emotional salience', 'cognitive salience'], ['prominence', 'conspicuousness', 'strikingness'], 'Psychological & formal noun.', '/ˈseɪ.li.əns/', 'obscurity'],
      ['iconography', 'noun', 'The visual images, symbols, and traditional motifs associated with a subject or historical era.', 'Religious iconography heavily influences modern cinema.', 'The photo entered the iconography of the civil rights struggle.', ['visual iconography', 'religious iconography', 'cultural iconography'], ['symbolism', 'visual rhetoric', 'imagery'], 'Art historical noun.', '/ˌaɪ.kəˈnɒɡ.rə.fi/', null],
      ['memento mori', 'noun', 'An object, image, or symbol serving as a warning or reminder of the inevitability of death.', 'Barthes viewed every portrait as a melancholic memento mori.', 'The skull in the Dutch painting was an explicit memento mori.', ['melancholic memento mori', 'haunting memento mori', 'timeless memento mori'], ['reminder of mortality', 'warning of death', 'vanitas'], 'Philosophical & artistic term.', '/məˌmen.toʊ ˈmɔːr.aɪ/', null],
      ['tableau', 'noun', 'A vivid, dramatic, and picturesque scene or arrangement of figures representing a scene from history or life.', 'The photo formed a tragic tableau of displacement and loss.', 'The crowd froze in a chaotic tableau.', ['dramatic tableau', 'tragic tableau', 'composed tableau'], ['scene', 'spectacle', 'vignette'], 'Literary & aesthetic noun.', '/ˈtæb.loʊ/', null],
      ['haunting', 'adjective', 'Poignant and evocative in a way that stays persistently in the memory or mind.', 'The haunting gaze of the refugee child transfixed the world.', 'The film possessed a haunting visual beauty.', ['haunting gaze', 'haunting melody', 'haunting resonance'], ['unforgettable', 'evocative', 'poignant'], 'Aesthetic adjective.', '/ˈhɔːn.tɪŋ/', null],
      ['ephemeral', 'adjective', 'Lasting for a very short time; transient and fleeting.', 'Digital stories are designed to be ephemeral and easily replaced.', 'The artist captured the ephemeral light of dawn.', ['ephemeral nature', 'ephemeral moment', 'ephemeral digital content'], ['transient', 'fleeting', 'fugitive'], 'Literary adjective.', '/ɪˈfem.ər.əl/', 'permanent'],
      ['consolidation', 'noun', 'The neurological and psychological process by which short-term memories become permanent and stable.', 'Sleep plays an essential role in visual memory consolidation.', 'The consolidation of traumatic memories alters perception.', ['memory consolidation', 'neural consolidation', 'long-term consolidation'], ['stabilization', 'solidification', 'reinforcement'], 'Neuroscientific noun.', '/kənˌsɒl.ɪˈdeɪ.ʃən/', null]
    ],
    chunks: [
      ['an indelible psychological monument', 'An image, idea, or experience that remains permanently fixed in consciousness.', 'Describing enduring memories', 'Literary · formal', 'That photograph became an indelible psychological monument for a generation.', 'Characterize iconic images.', `Certain historical photographs function as indelible psychological monuments against indifference.`, 'High-register memory chunk.'],
      ['the visceral shock of recognition', 'An immediate, deeply physical emotional realization when encountering an image or truth.', 'Explaining emotional impact', 'Aesthetic · psychological', 'Looking at the portrait triggered a visceral shock of recognition.', 'Describe encountering authentic art.', `The viewer experiences a visceral shock of recognition upon spotting the punctum.`, 'Core Barthesian chunk.'],
      ['a melancholic memento mori', 'A poignant reminder that all living things and frozen moments will perish.', 'Philosophizing photography', 'Philosophical · literary', 'Every vintage family portrait is a melancholic memento mori.', 'Reflect on time in photos.', `Photography remains a melancholic memento mori, preserving the light of people long gone.`, 'Philosophical memory chunk.'],
      ['refuse to be tamed by language', 'An aesthetic or emotional quality so raw and profound that words cannot fully capture or neutralize it.', 'Describing profound art', 'Essayistic · critical', 'The haunting ambiguity of her gaze refuses to be tamed by language.', 'Highlight inexplicable beauty.', `The punctum is powerful precisely because it refuses to be tamed by official language.`, 'Expressive nuance chunk.'],
      ['an accessible archetypal tableau', 'A visual scene that embodies universal, timeless human themes and emotional archetypes.', 'Analyzing iconic photos', 'Art historical · analytical', 'The image transformed the protest into an accessible archetypal tableau.', 'Explain political symbolism.', `The iconic photo synthesized centuries of peasant struggle into an accessible archetypal tableau.`, 'Visual culture chunk.'],
      ['the relentless erosion of digital noise', 'The constant overwhelming flow of disposable media that degrades attention and memory.', 'Critiquing modern saturation', 'Cultural · essayistic', 'Few images survive the relentless erosion of digital noise.', 'Evaluate modern media.', `To produce meaningful art today requires resisting the relentless erosion of digital noise.`, 'Contemporary culture chunk.'],
      ['held in electric suspension', 'Visual or emotional elements balanced with intense dynamic tension rather than static symmetry.', 'Analyzing visual composition', 'Aesthetic · descriptive', 'The figures in the frame are held in electric suspension.', 'Analyze dramatic framing.', `The confrontation between the monk and the soldier is held in electric suspension.`, 'Compositional chunk.'],
      ['the courage of stillness', 'The rare artistic decision to resist hyperactivity, sensory overload, and dramatic exaggeration.', 'Praising artistic restraint', 'Aesthetic · evaluative', 'Her portraits endure because they possess the courage of stillness.', 'Evaluate photographic style.', `In a cinema of explosions, this quiet documentary relies on the courage of stillness.`, 'Aesthetic restraint chunk.'],
      ['a permanent interpretive loop', 'A state where the mind repeatedly examines an ambiguous image without reaching final closure.', 'Describing cognitive engagement', 'Cognitive · psychological', 'Unresolved expressions trap the human brain in a permanent interpretive loop.', 'Explain mysterious masterpieces.', `The Mona Lisa’s smile keeps the viewer in a permanent interpretive loop.`, 'Cognitive theory chunk.'],
      ['cross-examine the visual archive', 'Critically interrogating which images were preserved, canonized, or excluded by historical institutions.', 'Promoting critical history', 'Historiographical · critical', 'Historians must cross-examine the visual archive to uncover erased perspectives.', 'Conclude cultural critique.', `We cannot accept iconic status passively; we must cross-examine the visual archive and ask who funded the lens.`, 'Actionable critical chunk.']
    ],
    collocations: [
      [`The iconic photograph left an ______ mark on the collective consciousness.`, [`indelible`, `discretionary`, `regressive`, `panoptic`], 0, `Indelible mark is the fixed collocation for permanent memory.`],
      [`Barthes described the ______ as the accidental detail that wounds the viewer.`, [`punctum`, `studium`, `tableau`, `panopticon`], 0, `Punctum is the specific semiotic term for the piercing detail.`],
      [`Photographs carry an inherent quality of a melancholic memento ______.`, [`mori`, `facie`, `facto`, `nihilo`], 0, `Memento mori is the classical Latin phrase for a reminder of mortality.`],
      [`The composition held the two opposing figures in ______ suspension.`, [`electric`, `blatant`, `coercive`, `rudimentary`], 0, `Electric suspension describes dynamic, charged compositional balance.`]
    ],
    upgrades: [
      [`People remember this photo because it is very sad.`, `The photograph achieves permanent psychological resonance through its devastating emotional salience and archetypal narrative vulnerability.`],
      [`I noticed a small shoe in the corner of the picture that made me cry.`, `What pierced my defenses was not the grand historical spectacle, but an unexpected punctum: the scuffed, unlaced shoe of an abandoned child.`],
      [`Too many digital photos make us forget everything.`, `In an era dominated by algorithmic hyper-saturation, the relentless erosion of digital noise obliterates ephemeral visual impressions within seconds.`]
    ],
    think: {
      title: 'Visual Salience, Roland Barthes, and the Construction of Memory',
      lead: 'Analyze the epistemic tension between what makes an image intrinsically resonant to human consciousness and how institutional curation engineers collective historical memory.',
      defs: [
        ['Intrinsic Resonance Hypothesis', `The theory that certain visual compositions tap directly into universal neurological and emotional archetypes, causing spontaneous, long-term memory encoding independent of social conditioning.`],
        ['Institutional Canonization', `The process through which political, educational, and commercial gatekeepers select, reprint, and celebrate specific images to reinforce dominant cultural narratives.`]
      ],
      items: [
        {
          id: '23t1',
          tag: 'Deconstruction',
          title: 'The Anatomy of the Punctum',
          task: `Explain why a deliberate, technically perfect element in a photograph often fails to function as a punctum, whereas a minor, unintended flaw or detail can pierce the viewer's memory.`,
          guide: `Differentiate between intentional rhetoric (the studium) and the accidental, unscripted rupture (the punctum) that evades the photographer's conscious calculation.`
        },
        {
          id: '23t2',
          tag: 'Comparative Analysis',
          title: 'Neuroscience vs. Media Sociology',
          task: `Compare the cognitive neuroscience argument (emotional salience, facial ambiguity, memory consolidation) with the sociological critique (gatekeeping, textbook curation, media hegemony). Are they contradictory or mutually reinforcing?`,
          guide: `Demonstrate that cognitive architecture explains what *can* be remembered, while sociological power dictates which images *get the opportunity* to be repeatedly viewed and consolidated.`
        },
        {
          id: '23t3',
          tag: 'Empirical Evaluation',
          title: 'The Ambiguity Factor in Iconic Art',
          task: `Why do propagandistic, unambiguous photographs often lose their power over time, while morally and narratively ambiguous images (like *Migrant Mother* or *Tank Man*) gain cultural endurance?`,
          guide: `Analyze how cognitive closure terminates reflection, whereas unresolved narrative tension creates a perpetual interpretive cycle.`
        },
        {
          id: '23t4',
          tag: 'Visual Literacy Lab',
          title: 'The Survival of Meaning in the Digital Deluge',
          task: `Formulate three criteria that distinguish a photograph capable of leaving an indelible psychological impression from an ephemeral viral thumbnail designed for algorithmic dopamine.`,
          guide: `Focus on stillness versus spectacle, narrative depth versus shock value, and the presence of an authentic punctum versus engineered aestheticization.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Crafting Pacing, Rhythm and Focus through Clefts and Balanced Antithesis',
        text: `In essays on visual art, psychology, and aesthetics, sophisticated writers alternate between laser-focused emphatic structures (cleft sentences) and expansive, rhythmic tripartite clauses. This creates an authoritative intellectual voice that controls both the emotional velocity and the cognitive depth of the prose.`,
        weak: `The photo is famous because of its lighting. It also has a weird detail in the background. That detail makes people remember it forever.`,
        strong: `What elevates the photograph beyond mere technical competence is not the symmetry of its lighting, but an elusive, haunting punctum: a solitary scuffed shoe that anchors the entire historical tragedy in fragile human vulnerability.`
      },
      short: {
        kind: 'Analytical reflection',
        title: 'The Anatomy of a Lasting Image',
        min: 180,
        max: 260,
        prompt: `Select a photograph (either personal or historical) that has remained fixed in your memory. Using at least one cleft sentence and balanced sentence rhythm, analyze whether its power stems from its *studium* (its general historical/cultural meaning) or its *punctum* (a piercing, unscripted detail).`,
        support: [
          `Identify the exact photograph and briefly establish its visual context.`,
          `Apply Barthes's distinction between studium and punctum to explain its impact.`,
          `Employ a Wh-cleft or It-cleft for dramatic emphasis (*What keeps this image alive in my mind is...*).`,
          `Conclude on whether the image acts as a personal or collective memento mori.`
        ],
        guide: [
          `State the image clearly: "Dorothea Lange's portrait of Florence Owens Thompson..." or "A faded 35mm snapshot of my grandmother at age twenty..."`,
          `Deploy clefts naturally: "It is not the historical setting that wounds me, but the hesitant curl of her fingers against her cheek."`
        ]
      },
      main: {
        kind: 'Personal / analytical essay',
        title: 'Why Some Images Stay With Us: The Architecture of Visual Resonance',
        min: 500,
        max: 750,
        main: true,
        prompt: `Why do certain photographs remain indelibly etched into human memory while millions of others vanish without a trace? In a structured essay, evaluate the interplay between intrinsic psychological resonance (Barthes's punctum, cognitive ambiguity, compositional tension) and external sociological curation (media distribution, institutional canonization, cultural repetition). Use sophisticated cleft structures, varied sentence rhythms, and precise aesthetic vocabulary.`,
        support: [
          `Introduction: Contrast the modern digital flood with the rare phenomenon of visual immortality; state your central thesis.`,
          `Body Paragraph 1: Analyze the intrinsic psychological mechanics—the punctum, unresolved facial micro-expressions, and cognitive salience.`,
          `Body Paragraph 2: Examine the formal and philosophical dimensions—compositional tension, allegorical elasticity, and photography as a melancholic memento mori.`,
          `Body Paragraph 3: Confront the counter-perspective—how institutional power, media gatekeeping, and repetitive distribution manufacture "unforgettable" status.`,
          `Conclusion: Synthesize the internal aesthetic potential with external cultural machinery; offer a final verdict on what makes an image truly endure.`
        ],
        guide: [
          `Ensure high lexical precision: *epistemic resonance*, *studium*, *punctum*, *salience*, *allegorical elasticity*, *tableau*.`,
          `Incorporate at least two distinct cleft sentences (*It is X that...*, *What X reveals is...*) to highlight turning points in your argument.`,
          `Maintain disciplined register: avoid colloquial enthusiasm ("it's a super cool photo"); write with measured, analytical authority.`
        ]
      }
    },
    edit: {
      checklist: [
        `Are cleft sentences (It-clefts, Wh-clefts) constructed with precise subject-verb agreement?`,
        `Does the prose demonstrate deliberate rhythmic variety (combining punchy claims with balanced periodic sentences)?`,
        `Are Barthesian semiotic terms (studium, punctum) used accurately and distinguished clearly?`,
        `Does the analysis avoid simplistic binaries by acknowledging both neuro-aesthetic and sociological factors?`,
        `Is the tone consistently formal, analytical, and essayistic throughout?`
      ],
      challenges: [
        {
          id: '23e1',
          title: 'Transforming Monotonous Clauses into an Emphatic Cleft',
          bad: `The photographer used high contrast lighting. That made the portrait look very scary and intense.`,
          task: `Rewrite the sentence using a cleft structure and C1 visual vocabulary (*chiaroscuro*, *visceral intensity*, *punctum*).`,
          good: `It was not merely the high contrast, but the calculated use of dramatic chiaroscuro, that lent the portrait its haunting, visceral intensity.`
        },
        {
          id: '23e2',
          title: 'Polishing Rhythm with a Balanced Tricolon',
          bad: `The photo stays in our mind because it has history, it has good framing, and people feel sad looking at it.`,
          task: `Revise into a rhythmic tripartite sentence exhibiting grammatical parallelism and analytical gravity.`,
          good: `The photograph establishes its enduring psychological resonance through the gravity of its historical moment, the electric tension of its framing, and the raw vulnerability of its human subject.`
        }
      ]
    },
    retrieve: {
      content: `How does Roland Barthes's concept of the *punctum* explain why an accidental, imperfect detail often holds memory far more effectively than a technically flawless composition?`,
      contentGuide: `Mention that the studium is polite, rational cultural interest, whereas the punctum is an unintended, piercing detail that bypasses rational analysis to strike personal emotional vulnerability.`,
      grammar: `Rewrite this claim using a Wh-cleft for maximum rhetorical focus: "The photograph's unresolved narrative ambiguity forces the brain into an endless interpretive cycle."`,
      grammarGuide: `Expected: "What forces the brain into an endless interpretive cycle is the photograph's unresolved narrative ambiguity."`,
      reasoning: `Why is an explanation based purely on cognitive neuroscience insufficient to explain which historical photographs become universally recognized cultural icons?`,
      reasoningGuide: `Neuroscience explains cognitive retention mechanisms, but institutional power, media gatekeeping, and distribution monopolies determine which images are actually published, circulated, and preserved in the public sphere.`,
      summary: `In Unit 23, you analyzed the cognitive, semiotic, and sociological forces that grant certain images permanent psychological and cultural endurance. You mastered cleft sentences for dramatic emphasis, rhythmic sentence balancing, and sophisticated visual arts vocabulary.`
    }
  });

  K.units['23'].listening = K.pendingListening('23', [
    {
      id: '23l1',
      title: 'Dialogue: The Photograph That Refuses to Fade',
      format: 'Conversation between an art curator and a cognitive psychologist',
      lead: 'Listen to a discussion on why certain photographs achieve permanent psychological resonance while millions of others are instantly forgotten.',
      audio: 'audio/unit-23-listening-1.mp3',
      transcript: `[Curator]: Marcus, when people walk through this retrospective, they pass hundreds of technically brilliant prints. But almost everyone stops in front of this single 1948 snapshot of a street musician in Prague. Why does this particular frame hold people in place?\n\n[Psychologist]: What fascinates me as a cognitive scientist is the absence of theatrical drama in this photo. It isn’t a violent war scene or a famous celebrity. What catches the eye is an unexpected contradiction: the violinist is playing with total, transcendent joy, but his coat is frayed to threads, and in the shadow behind him, a small boy is staring directly into the lens with an expression of weary, adult skepticism.\n\n[Curator]: That aligns perfectly with Barthes’s idea of the punctum. The musician is the studium—the general historical subject of postwar European poverty. But that boy’s skeptical gaze is the punctum that punctures the romantic narrative.\n\n[Psychologist]: Exactly. From a neuro-cognitive standpoint, ambiguous emotional cues prevent the brain from achieving quick cognitive closure. When an image presents competing emotional narratives, our visual cortex and amygdala stay engaged in an active interpretive loop. The brain doesn’t file it away as 'solved'; it keeps searching the frame for resolution.\n\n[Curator]: But we also have to be honest about the institutional side. This photograph became iconic partly because John Berger wrote an entire essay about it in the 1970s. Had it remained buried in a private archive in Prague, no amount of cognitive salience would have made it a global icon.\n\n[Psychologist]: A crucial point. Cognitive salience provides the psychological gunpowder, but institutional curation is the spark that ignites the cultural canon.`,
      questions: [
        {
          id: '23l1q1',
          type: 'mc',
          q: 'Why does the photograph of the street musician hold the attention of gallery visitors?',
          options: [
            'Because it features a globally famous political figure.',
            'Because it contains an emotional contradiction (joyful musician vs. skeptical boy) that prevents quick cognitive closure.',
            'Because the camera used was the most expensive model available in 1948.',
            'Because the background was painted with gold leaf.'
          ],
          answer: 1,
          explain: 'The psychologist explains that ambiguous, conflicting emotional cues keep the brain engaged in an active interpretive loop.'
        },
        {
          id: '23l1q2',
          type: 'mc',
          q: 'How does the curator characterize the role of institutional curation in the photo’s fame?',
          options: [
            'It was completely irrelevant to the photo’s success.',
            'It provided the cultural spark (via John Berger’s essay) that turned psychological salience into a recognized global icon.',
            'It ruined the artist’s original reputation.',
            'It proved that the photo was a forgery.'
          ],
          answer: 1,
          explain: 'The curator notes that without Berger’s essay and institutional circulation, the photo would have remained forgotten in an archive.'
        }
      ]
    },
    {
      id: '23l2',
      title: 'Monologue: Roland Barthes and the Wound of the Image',
      format: 'Academic lecture on visual culture and semiotics',
      lead: 'A lecture examining Roland Barthes\'s personal journey in *Camera Lucida* and the concept of photography as a memento mori.',
      audio: 'audio/unit-23-listening-2.mp3',
      transcript: `When Roland Barthes wrote *Camera Lucida* in 1979, he was not attempting to produce a dry academic taxonomy of photography. He was mourning the death of his mother, Henriette, searching through hundreds of family photographs for an image that captured the essential truth of her being.\n\nMost of the pictures he examined offered only what he termed the *studium*—the historical clothing, the familiar setting, the polite likeness that confirmed she was his mother without conveying her unique soul. Then, in a small, sepia-toned print from 1898 showing her as a five-year-old child standing in a winter garden, Barthes experienced the devastating shock of the *punctum*. What pierced him was the child’s innocent posture, the delicate lace of her collar, and the tragic foreknowledge that this vibrant young girl was destined to grow old, suffer, and die.\n\nThis led Barthes to his most profound realization: every photograph is fundamentally an ontological wound. Photography does not say 'this is present'; it says 'this has been'—*ça a été*. It presents a living body that is simultaneously an inescapable corpse of the future. When we are haunted by an image, what we are feeling is the vertiginous pull of time itself—the realization that we are looking at light reflected from a moment that has been irrevocably swallowed by the past.`,
      questions: [
        {
          id: '23l2q1',
          type: 'mc',
          q: 'What motivated Roland Barthes to write *Camera Lucida*?',
          options: [
            'A commercial contract from a camera manufacturing corporation.',
            'The personal grief of mourning his deceased mother and seeking an image that captured her essence.',
            'A scientific study on digital sensor resolution.',
            'A political campaign against documentary photojournalism.'
          ],
          answer: 1,
          explain: 'The lecturer emphasizes that Barthes was mourning his mother and searching for an authentic visual trace of her spirit.'
        },
        {
          id: '23l2q2',
          type: 'mc',
          q: 'According to Barthes, what is the ultimate temporal message of every photograph?',
          options: [
            '"This is happening right now in front of you."',
            '"This will never change in the future."',
            '"This has been" (*ça a été*)—an ontological confirmation of a past moment that can never return.',
            '"This is an artificial computer simulation."'
          ],
          answer: 2,
          explain: 'Barthes argued that photography is characterized by the phrase "ça a été" (this has been), testifying to a lost moment.'
        }
      ]
    }
  ]);

  K.units['23'].speaking = K.canonicalSpeaking({
    part1: [
      { q: `Do you have a printed photograph in your home that holds special sentimental value? What makes it significant?`, guide: `Identify the photo, describe its setting, and explain the specific personal memory or emotion attached to it.` },
      { q: `When browsing social media, what usually makes you pause on an image rather than scrolling past it immediately?`, guide: `Discuss qualities like visual contrast, authentic facial expressions, unusual composition, or emotional resonance.` },
      { q: `Do you prefer candid, spontaneous photographs or carefully posed and composed portraits? Why?`, guide: `Compare the raw authenticity of candid snapshots with the deliberate aesthetic harmony of posed photography.` }
    ],
    part2: {
      topic: `Describe an iconic or memorable photograph that made a strong impression on you.`,
      prompts: [
        `What the photograph depicts and when you first saw it`,
        `What specific visual details or qualities stood out to you`,
        `Why you think this image has remained fixed in your memory`,
        `And explain how this photograph makes you feel about history or human nature.`
      ],
      guide: `Structure your response with a clear introduction, detailed visual description using C1 vocabulary (chiaroscuro, punctum, expression), and a reflective conclusion on its broader philosophical impact.`
    },
    part3: [
      { q: `In an era where billions of AI-generated and filtered images flood the internet daily, is the cultural value of authentic photography increasing or decreasing?`, guide: `Argue whether scarcity of truth makes real photographs more precious or whether synthetic saturation induces universal skepticism.` },
      { q: `Can a society truly understand its own history without having iconic visual photographs of its triumphs and tragedies?`, guide: `Evaluate the role of visual iconography in constructing collective memory versus the risk of oversimplifying complex historical events into single frames.` },
      { q: `To what extent do you agree with Roland Barthes that every photograph is a reminder of human mortality (a memento mori)?`, guide: `Reflect on the temporal nature of freezing time and whether looking at past moments inherently evokes a sense of loss and transience.` }
    ],
    followUp: `If an image is so shocking that it causes distress, should it still be displayed in public exhibitions?`,
    rubric: {
      pronunciation: `Accurate stress on words like 'in·del·i·ble', 'punc·tum', 'stu·di·um', 'i·co·nog·ra·phy', 'sa·li·ence'.`,
      grammar: `Natural deployment of cleft sentences for emphasis ('What strikes me most is...', 'It was the expression that...') and balanced rhythmic phrasing.`,
      discourse: `Cohesive transitions between descriptive observation and philosophical interpretation using advanced signposting.`,
      vocabulary: `Effective use of terms such as 'memento mori', 'cognitive salience', 'tableau', 'aesthetic restraint', and 'archetypal symbolism'.`
    }
  });
})(window.KLANG = window.KLANG || {});
