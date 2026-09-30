/* UNIT 24 · PHOTOGRAPHING WHAT IS SACRED */
(function (K) {
  K.units['24'] = K.makeUnit('24', {
    module: 5, title: 'Photographing what', titleEm: 'is sacred',
    question: 'What responsibilities come with documenting something that holds sacred meaning for other people?',
    knowLead: `Throughout history, artists, anthropologists, and travel photographers have traveled to the ends of the earth to document religious rites, indigenous ceremonies, and sacred sanctuaries. Armed with the democratic ethos of visual transparency, documentary photography has often operated on the assumption that nothing on earth should be shielded from the curious gaze of the lens. Yet for communities whose sacred traditions depend upon secrecy, spiritual vulnerability, and ritual protection, the presence of an outsider’s camera can feel like an act of spiritual violation and cultural extraction. How can photographers navigate the boundary between legitimate cultural documentation and invasive epistemic arrogance? Consider the balance between artistic freedom and cultural sovereignty as you read.`,
    terms: [
      ['Extractive documentation', `The practice of entering a marginalized or traditional community to capture images, stories, or ritual knowledge for external profit or artistic prestige without reciprocity or consent.`],
      ['Epistemic humility', `The conscious recognition of the limits of one\'s own cultural perspective and the refusal to impose outside frameworks of interpretation upon sacred traditions.`],
      ['Cultural sovereignty', `The inherent right of an indigenous or cultural community to govern its own cultural heritage, sacred knowledge, representation, and visual self-determination.`],
      ['The secular gaze', `The ideological perspective that assumes all reality is objective, material, and publicly consumable, denying the spiritual reality or taboos of sacred traditions.`],
      ['Visual stewardship', `A collaborative model of documentary photography where the subjects retain co-ownership, editorial veto power, and control over how their sacred rites are shared.`]
    ],
    views: [
      'Two perspectives on documenting sacred rituals',
      'The imperative of visual universalism',
      `All human cultures belong to the shared heritage of humanity. Open photographic documentation breaks down prejudice, fosters intercultural empathy, and prevents dogmatic isolationism.`,
      'The defense of sacred sovereignty',
      `The sacred ceases to be sacred when transformed into a public visual commodity. Communities have an absolute moral right to protect their spiritual rites from unauthorized external surveillance.`,
      `The core challenge is formulating an ethical framework that honors communal boundaries without abandoning the vital bridges of intercultural understanding.`
    ],
    knowPrompt: `When an outsider photographs an intimate religious ceremony or an indigenous sacred rite that prohibits recording, who should have the final authority over whether those images are published or exhibited?`,
    knowGuide: [
      `Weigh the photographer\'s claim of journalistic freedom against the community\'s claim of spiritual and cultural sovereignty.`,
      `Consider whether certain sacred experiences lose their spiritual integrity when converted into digital spectacles.`
    ],
    read: {
      main: {
        format: 'Anthropological & philosophical essay', title: 'The Camera at the Threshold of the Sacred',
        standfirst: `When the secular desire to see everything collides with traditions that require reverent concealment, the lens becomes an instrument of cultural conflict.`,
        pull: { after: 5, text: `To declare that everything in the world exists to be photographed is an act of supreme imperial hubris.` },
        notes: { 1: `In the late 19th century, the <b>Hopi Tribe</b> of Arizona permanently banned all cameras from their sacred Snake Dance ceremonies after tourists commodified their rituals.`, 4: `In Brazil, Afro-Brazilian traditions such as <b>Candomblé</b> maintain strict secret-sacred distinctions regarding ritual initiations and spiritual possessions.` },
        paras: [
          `In 1899, following years of increasingly intrusive incursions by tourists, amateur photographers, and ethnographic collectors, the Hopi tribal council in Arizona took a historic decision: they permanently banned all cameras, sketchpads, and recording equipment from their sacred Snake Dance ceremonies. For decades, outsiders armed with the newly invented portable Kodak camera had pushed past tribal elders, stepped onto sacred altars, and treated deeply solemn ancestral prayers as thrilling exotic spectacles to be sold on postcards. By expelling the camera, the Hopi were not merely asserting privacy; they were enacting an ontological defense of the sacred itself against the relentless, entitled encroachment of the modern secular gaze.`,
          `The conflict between documentary photography and sacred traditions is rooted in two fundamentally incompatible philosophies of sight. The dominant Western Enlightenment ethos, inherited by photojournalism and tourism, views seeing as an absolute, democratic right. Under this framework, visual transparency is assumed to be an unalloyed virtue: to shine light into hidden corners is to dispel superstition, eliminate prejudice, and universalize human knowledge. The camera operates as an objective, roving eye that recognizes no borders, no taboos, and no private spiritual domains. What exists in the physical world is presumed to belong rightfully to the universal archive of human culture.`,
          `For traditional and indigenous communities, however, sight is never neutral; it is an active, relational, and frequently perilous spiritual transaction. In traditions spanning from Australian Aboriginal dreamings to Afro-Brazilian Candomblé terreiros and Tibetan esoteric rituals, sacred knowledge is not an intellectual commodity to be broadcast to anonymous strangers. It is a living power that requires spiritual initiation, moral preparation, and strict ancestral accountability. To photograph an initiation rite, an ancestral spirit possession, or a secret burial is not to "capture" it respectfully; it is to sever the ritual from its sacred ecology, strip it of its spiritual efficacy, and convert it into a profane visual trinket for aesthetic consumption.`,
          `This dynamic is compounded by the structural legacy of extractive ethnography. Throughout the nineteenth and twentieth centuries, colonial expeditions routinely photographed sacred ceremonies under the guise of "salvage anthropology"—the paternalistic belief that primitive cultures were doomed to vanish and therefore had to be preserved in European museum vaults. The communities themselves were treated not as sovereign authors of their own destiny, but as passive specimens. Sacred masks were cataloged, funeral chants were recorded without permission, and images of guarded spiritual secrets were published in academic volumes without the consent or comprehension of those depicted.`,
          `Notwithstanding these historical abuses, the relationship between the camera and the sacred need not be entirely antagonistic. When photographers abandon the posture of the entitled outsider and embrace the discipline of epistemic humility, the camera can transition from an instrument of extraction into a vehicle of visual stewardship. This collaborative model requires the photographer to submit to the community's protocols, accept their veto power, and respect what French philosopher Édouard Glissant termed "the right to opacity"—the right of any culture to keep certain dimensions of its existence hidden, unmeasured, and unexplained to outsiders.`,
          `Under such an ethic, the photographer understands that the most profound act of artistic respect is sometimes the decision not to press the shutter. When a photographer voluntarily lowers the lens during an intimate spiritual moment, they acknowledge that human dignity and sacred reverence transcend the demands of aesthetic portfolio-building. Visual documentation becomes legitimate only when it is invited, co-authored, and placed at the service of the community’s own survival and self-determination.`,
          `Ultimately, confronting the ethics of photographing the sacred forces modern society to question its own compulsive voyeurism. In a digital world where every private emotion, intimate dinner, and personal milestone is instantly broadcast across algorithmic networks, we have forgotten that certain realms of existence derive their power precisely from silence, reverent distance, and mystery. Respecting the sacred is not an act of anti-intellectual censorship; it is a vital reminder that not everything in the universe exists to be consumed by the human eye.`
        ]
      },
      counter: {
        format: 'Journalistic defense', title: 'The Universal Commons: Against Cultural Enclosure',
        standfirst: `While respecting sacred taboos is admirable, absolute cultural gatekeeping risks sliding into religious censorship and the suppression of human empathy.`,
        paras: [
          `While the critique of extractive colonialism is undeniable, pushing cultural sovereignty to an absolutist extreme creates dangerous intellectual and ethical blind spots.` ,
          `Documentary photography has historically served as one of the most powerful bridges for breaking down xenophobia, racism, and religious bigotry. When audiences in secular societies witness the breathtaking beauty and moral gravity of Sufi chanting, Hindu pilgrimages, or indigenous Brazilian rituals, their capacity for intercultural empathy expands dramatically.` ,
          `Furthermore, granting traditional religious authorities complete, unquestioned control over representation risks reinforcing internal hierarchies and silencing internal dissent. In many traditional societies, conservative patriarchal elders use claims of "sacred taboo" precisely to shield abusive practices, caste oppression, or gender discrimination from public scrutiny.` ,
          `To declare that only insiders may document or interpret a culture is to embrace a regressive essentialism that denies our shared humanity. The goal should be ethical dialogue and collaborative respect, not the construction of impenetrable cultural fortresses.`
        ]
      }
    },
    sources: [
      { title: 'Decolonizing Methodologies: Research and Indigenous Peoples (Linda Tuhiwai Smith)', url: 'https://www.bloomsbury.com/uk/decolonizing-methodologies-9781786998126/', note: 'Essential text on challenging extractive Western research and documentation practices.' },
      { title: 'Poetics of Relation (Édouard Glissant)', url: 'https://www.press.umich.edu/10257/poetics_of_relation', note: 'Philosophical treatise articulating the \'right to opacity\' for non-dominant cultures.' },
      { title: 'Visual Ethics in Anthropology (American Anthropological Association)', url: 'https://www.americananthro.org', note: 'Ethical guidelines on informed consent, cultural protocols, and collaborative visual research.' }
    ],
    interpret: [
      { id: '24i1', type: 'mc', tag: 'Main idea', q: `What is the core philosophical conflict explored in the main essay regarding photographing sacred traditions?`, options: [`Digital camera sensors are not sensitive enough to capture dimly lit temples.`, `The conflict arises between the Western secular ethos of universal visual transparency and traditional philosophies where sight is a spiritually active, restricted, and relational transaction.`, `Photographers refuse to travel to remote locations due to lack of hotel accommodations.`, `Indigenous communities have completely abandoned all sacred rites in favor of digital media.`], answer: 1, explain: `The text contrasts the secular assumption of unrestricted visibility with sacred traditions requiring initiation and boundary protection.` },
      { id: '24i2', type: 'mc', tag: 'Detail', q: `Why did the Hopi tribal council ban all cameras from their Snake Dance in 1899?`, options: [`Because the camera equipment broke their ceremonial drums.`, `Because tourists and photographers had intruded onto sacred altars and commodified solemn prayers as exotic tourist spectacles.`, `Because they wanted to manufacture and sell their own high-end cameras.`, `Because the United States federal government forced them to ban photography.`], answer: 1, explain: `The essay details how intrusive tourists and commercial postcard makers violated the sanctity of the Hopi rites.` },
      { id: '24i3', type: 'mc', tag: 'Inference', q: `What does Édouard Glissant\'s concept of "the right to opacity" imply for documentary photographers?`, options: [`Photographers should always use cloudy lens filters to make images darker.`, `Non-dominant cultures have a legitimate right to keep certain spiritual dimensions of their existence hidden and unexplained to outsiders.`, `All photographs must be printed in pure black and white.`, `Indigenous languages should never be translated into English.`], answer: 1, explain: `The right to opacity defends the legitimacy of keeping certain cultural practices outside the totalizing gaze of outside observers.` },
      { id: '24i4', type: 'quote', tag: 'Evidence', q: `Which sentence from the text defines the highest form of artistic respect when encountering the sacred?`, find: `most profound act of artistic respect is sometimes the decision not to press the shutter`, quote: `When a photographer voluntarily lowers the lens during an intimate spiritual moment, they acknowledge that human dignity and sacred reverence transcend the demands of aesthetic portfolio-building.`, explain: `The author highlights the decision to lower the lens as an expression of ethical restraint.` },
      { id: '24i5', type: 'mc', tag: 'Synthesis', q: `What legitimate concern does the counter-perspective raise against absolute cultural gatekeeping?`, options: [`Cameras will become obsolete if people cannot photograph temples.`, `Total cultural enclosure can prevent intercultural empathy and risk shielding internal abuses or patriarchal oppression behind claims of sacred taboo.`, `Tourists will stop spending money on airline tickets.`, `Museums will be forced to display only modern European paintings.`], answer: 1, explain: `The counter-essay warns against using sacred taboos to suppress internal critique or dismantle bridges of cross-cultural empathy.` },
      { id: '24i6', type: 'mc', tag: 'Vocabulary in context', q: `What is meant by the phrase "extractive ethnography"?`, options: [`Mining minerals from tribal lands while recording videos.`, `The historical practice of collecting sacred images and cultural knowledge from marginalized groups for external academic or commercial gain without consent or benefit.`, `Teaching indigenous youth how to operate digital video cameras.`, `Using drones to map uncontacted rainforest settlements.`], answer: 1, explain: `Extractive ethnography treats cultural heritage as a raw material to be extracted for outsider prestige or wealth.` },
      { id: '24i7', type: 'mc', tag: 'Critical thinking', q: `What is the defining characteristic of "visual stewardship" as an alternative to extractive documentation?`, options: [`The photographer donates their old camera to a museum.`, `The documentary project is co-authored with the community, respecting their protocols, boundaries, and veto power over representation.`, `The government takes legal ownership of all photographs taken within national borders.`, `Photographs are uploaded immediately to open-source social media networks.`], answer: 1, explain: `Visual stewardship replaces paternalistic capture with collaborative, co-authored representation guided by community consent.` }
    ],
    notice: [
      {
        title: 'Focus 1 · Advanced concession & diplomatic hedging',
        lead: `C1 analytical and ethical arguments navigate controversial disputes by deploying multi-layered concessive clauses and diplomatic qualification (*Notwithstanding X*, *Granted that Y, it does not follow that Z*).`,
        examples: [
          `*Notwithstanding* these historical abuses, the relationship between the camera and the sacred need not be entirely antagonistic.`,
          `*Granted that* documentation fosters intercultural empathy, *it does not follow that* photographers possess an unrestricted right of entry into guarded sanctuaries.`,
          `*While* the critique of extractive ethnography is indisputable, *one must guard against* sliding into total cultural isolationism.`
        ],
        questions: [
          `How does using "Notwithstanding X..." establish a higher register than simply starting a sentence with "But..."?`,
          `Notice the structure of "Granted that [strong point], it does not follow that [flawed deduction]": it concedes the opponent’s premise while dismantling their conclusion.`
        ],
        explain: `In complex cultural and ethical debates, crude assertions trigger defensive reactions. Diplomatic concession acknowledges the opposing argument’s strongest claims before systematically establishing your refined thesis.`,
        compare: [
          [`Blunt claim`, `Photographers shouldn't enter temples even if they want to teach people about religion.`],
          [`Diplomatic concession`, `Notwithstanding the legitimate pedagogical desire to foster intercultural understanding, the imperative to respect communal sacred boundaries must remain paramount.`]
        ],
        practice: [
          { q: `Rewrite this sentence using "Notwithstanding": "Even though colonial anthropology had many flaws, it preserved some valuable historical records."`, a: `Notwithstanding the grave methodological and ethical flaws of colonial anthropology, it inadvertently preserved certain invaluable historical records.` },
          { q: `Formulate a concessive sentence using "Granted that... it does not follow that...": (Point: Documentaries raise money; Flaw: Photographers can ignore sacred taboos)`, a: `Granted that humanitarian documentaries can raise vital charitable funds, it does not follow that photographers are entitled to violate ancestral sacred taboos.` }
        ],
        radar: [
          `Avoid conceding too much without a clear pivot; the subordinate concessive clause must serve to strengthen your primary thesis.`,
          `Ensure proper prepositional use: "Notwithstanding [noun phrase]" or "Notwithstanding the fact that [clause]".`
        ],
        help: `Use diplomatic concession when addressing potential accusations of censorship: "While artistic freedom remains a vital pillar of democratic society, it is not an absolute license to trespass upon vulnerable spiritual traditions."`
      },
      {
        title: 'Focus 2 · Register modulation & epistemic humility',
        lead: `Sustaining intellectual authority in high-level essays requires modulating between formal declarative claims and calibrated modal verbs of epistemic humility (*would suggest*, *tends to reinforce*, *cannot be readily dismissed*).`,
        examples: [
          `This dynamic *would suggest that* the secular gaze carries unconscious colonial assumptions.`,
          `Such historical evidence *cannot be readily dismissed* as mere traditionalist paranoia.`,
          `It is *arguably* through collaborative stewardship that documentary practice recovers its moral legitimacy.`
        ],
        questions: [
          `How do adverbs like "arguably", "subtly", and "fundamentally" fine-tune the precision of an analytical claim?`,
          `Observe how replacing absolute assertions ("This proves that...") with calibrated phrasing ("This lends weight to the view that...") invites thoughtful academic assent.`
        ],
        explain: `Intellectual independence at C1 is demonstrated not by aggressive overstatement, but by the disciplined control of tone, nuance, and academic restraint.`,
        compare: [
          [`Overstated`, `Everyone knows that Western photographers are completely evil and steal native culture.`],
          [`Epistemically calibrated`, `Extractive documentation frequently reproduces paternalistic power asymmetries, reducing complex ancestral rites to exotic commodities for foreign consumption.`]
        ],
        practice: [
          { q: `Calibrate this aggressive claim into scholarly register: "Religious elders only ban cameras because they want to control and brainwash people."`, a: `Certain critics contend that restrictive visual protocols may occasionally serve to insulate patriarchal hierarchies from necessary external accountability.` },
          { q: `Upgrade this simplistic sentence into formal diplomatic register: "Outside journalists don't understand how holy things work."`, a: `Uninitiated observers often lack the epistemic framework required to comprehend the profound spiritual ecology governing sacred traditions.` }
        ],
        radar: [
          `Do not confuse epistemic humility with weak indecisiveness; your argument must remain firm and cogent while acknowledging complexity.`,
          `Avoid passive voice overuse; balance impersonal diplomatic structures with active, vigorous verbs.`
        ],
        help: `When concluding an essay on competing values, use high-register synthesis markers: "Ultimately, the reconciliation of these competing imperatives demands..."`
      }
    ],
    vocab: [
      ['extractive', 'adjective', 'Involving the removal of valuable resources, knowledge, or culture without fair return or consideration for sustainability.', 'The museum was accused of maintaining an extractive relationship with indigenous communities.', 'Extractive ethnography treated rituals as raw materials.', ['extractive documentation', 'extractive relationship', 'extractive economy'], ['exploitative', 'draining', 'appropriative'], 'Critical & academic adjective.', '/ɪkˈstræk.tɪv/', 'reciprocal'],
      ['sovereignty', 'noun', 'The authority of a state or cultural group to govern itself and determine its own laws and cultural practices.', 'Indigenous communities demand visual sovereignty over their sacred ceremonies.', 'The treaty affirmed the cultural sovereignty of the tribe.', ['cultural sovereignty', 'visual sovereignty', 'tribal sovereignty'], ['autonomy', 'self-determination', 'independence'], 'Political & cultural noun.', '/ˈsɒv.rən.ti/', 'subjugation'],
      ['epistemic', 'adjective', 'Relating to knowledge, its validation, and the conditions under which something is known or understood.', 'The anthropologist approached the ritual with genuine epistemic humility.', 'Decolonization requires dismantling epistemic hierarchies.', ['epistemic humility', 'epistemic framework', 'epistemic violence'], ['cognitive', 'intellectual', 'philosophical'], 'Philosophical adjective.', '/ˌep.ɪˈstiː.mɪk/', null],
      ['incursion', 'noun', 'An invasion or sudden, unauthorized entry into another territory, domain, or private sphere.', 'Tribal elders condemned the media incursion into their sacred grounds.', 'The tourist incursion disrupted the monastery’s silence.', ['unauthorized incursion', 'cultural incursion', 'tourist incursion'], ['intrusion', 'trespass', 'encroachment'], 'Formal noun.', '/ɪnˈkɜː.ʒən/', null],
      ['profane', 'adjective', 'Relating or devoted to that which is not sacred or biblical; secular; disrespectful of religious things.', 'Converting prayer into entertainment risks rendering the sacred profane.', 'The temple was desecrated by profane commercial activities.', ['profane world', 'profane use', 'sacred and profane'], ['secular', 'temporal', 'unhallowed'], 'Religious & philosophical adjective.', '/prəˈfeɪn/', 'sacred'],
      ['stewardship', 'noun', 'The responsible overseeing, protection, and preservation of something entrusted to one’s care.', 'Collaborative visual stewardship replaces extractive photojournalism.', 'The elders embraced their role as guardians and stewards of ancestral memory.', ['visual stewardship', 'cultural stewardship', 'environmental stewardship'], ['custodianship', 'guardianship', 'management'], 'Ethical noun.', '/ˈstjuː.əd.ʃɪp/', null],
      ['opacity', 'noun', 'The quality of being obscure, impenetrable, or resistant to external interpretation and measurement.', 'Glissant defended the right to opacity against imperial totalization.', 'The ritual retained an intentional opacity to protect its secrets.', ['cultural opacity', 'right to opacity', 'mysterious opacity'], ['obscurity', 'impermeability', 'secrecy'], 'Philosophical noun.', '/oʊˈpæs.ə.ti/', 'transparency'],
      ['paternalistic', 'adjective', 'Restricting freedom and responsibilities of subordinates or non-dominant groups in their supposed best interest.', 'The 19th-century government adopted a paternalistic stance toward indigenous traditions.', 'Salvage anthropology was inherently paternalistic.', ['paternalistic attitude', 'paternalistic policy', 'paternalistic gaze'], ['condescending', 'patronizing', 'authoritarian'], 'Sociological adjective.', '/pəˌtɜː.nəlˈɪs.tɪk/', null],
      ['taboo', 'noun', 'A social or religious custom prohibiting or restricting a particular practice or forbidding association with a particular person, place, or thing.', 'Photographing the initiation chamber was a grave ancestral taboo.', 'The community strictly observed the visual taboo.', ['sacred taboo', 'cultural taboo', 'visual taboo'], ['prohibition', 'interdiction', 'ban'], 'Anthropological noun.', '/təˈbuː/', null],
      ['reciprocity', 'noun', 'The practice of exchanging things with others for mutual benefit and equitable respect.', 'Ethical documentary work must be grounded in genuine material reciprocity.', 'The relationship between researcher and community lacked reciprocity.', ['mutual reciprocity', 'material reciprocity', 'ethical reciprocity'], ['mutuality', 'give-and-take', 'interchange'], 'Sociological noun.', '/ˌres.ɪˈprɒs.ə.ti/', null]
    ],
    chunks: [
      ['the secular gaze', 'An ideological viewpoint that treats all reality as secular, material, and publicly accessible.', 'Critiquing universal transparency', 'Philosophical · critical', 'The secular gaze fails to comprehend the spiritual reality of sacred taboos.', 'Analyze cultural misunderstandings.', `Entering the shrine with a camera represents the entitled imposition of the secular gaze.`, 'Core philosophical chunk.'],
      ['an act of epistemic extraction', 'Taking cultural knowledge, imagery, or stories for external gain without meaningful consent.', 'Condemning unethical research', 'Academic · critical', 'Publishing the secret chants was condemned as an act of epistemic extraction.', 'Critique documentary misconduct.', `Without co-authorship, ethnographic photography risks becoming an act of epistemic extraction.`, 'High-register critique chunk.'],
      ['the right to opacity', 'The philosophical principle that cultures have the right to keep parts of their existence unrevealed.', 'Defending cultural sovereignty', 'Philosophical · postcolonial', 'We must defend the right to opacity against the demands of digital transparency.', 'Argue for cultural privacy.', `Glissant’s concept of the right to opacity affirms that not all truth belongs to the public eye.`, 'Foundational Glissantian chunk.'],
      ['collaborative visual stewardship', 'A partnership model where photographers and communities co-create and manage representation.', 'Proposing ethical alternatives', 'Methodological · ethical', 'The project embraced collaborative visual stewardship from inception.', 'Outline positive documentary practice.', `By instituting collaborative visual stewardship, the exhibition respected ancestral protocols.`, 'Actionable positive chunk.'],
      ['notwithstanding the legitimate imperative to', 'Conceding a valid counterpoint before affirming your core ethical priority.', 'Framing complex concession', 'Formal · rhetorical', 'Notwithstanding the legitimate imperative to document history, human dignity must take precedence.', 'Introduce structured rebuttal.', `Notwithstanding the legitimate imperative to foster cross-cultural dialogue, boundaries must be honored.`, 'Formal C1 linking chunk.'],
      ['an ontological defense of the sacred', 'A fundamental philosophical struggle to protect the spiritual essence of reality.', 'Elevating ethical stakes', 'Philosophical · formal', 'Banning the cameras was an ontological defense of the sacred.', 'Characterize indigenous resistance.', `The community’s refusal to be filmed represents an ontological defense of the sacred against commodification.`, 'Deep philosophical chunk.'],
      ['the posture of the entitled outsider', 'The arrogant attitude of assuming one has an automatic right to enter and record any community.', 'Critiquing photojournalistic hubris', 'Critical · essayistic', 'Too many travel photographers maintain the posture of the entitled outsider.', 'Condemn insensitive tourists.', `Documentary integrity requires abandoning the posture of the entitled outsider.`, 'Ethical critique chunk.'],
      ['a living spiritual transaction', 'Viewing rituals as active, potent spiritual engagements rather than passive performances.', 'Explaining ritual ontology', 'Anthropological · spiritual', 'In traditional communities, sight is understood as a living spiritual transaction.', 'Describe sacred ceremonies.', `Viewing the trance is not entertainment; it is a living spiritual transaction demanding reverence.`, 'Sacred ontology chunk.'],
      ['granting unrestricted right of entry', 'Giving outsiders total, unconditioned access to private or guarded spaces.', 'Analyzing access disputes', 'Formal · policy', 'The treaty avoided granting unrestricted right of entry to foreign media.', 'Discuss institutional guidelines.', `Cultural institutions must stop granting unrestricted right of entry into fragile sacred sites.`, 'Institutional policy chunk.'],
      ['salvage anthropology', 'The historical colonial practice of recording vanishing cultures without aiding their survival.', 'Historicizing anthropological bias', 'Historiographical · critical', 'The early recordings were framed as salvage anthropology rather than living dialogue.', 'Analyze historical archives.', `Salvage anthropology treated indigenous people as doomed relics rather than sovereign societies.`, 'Historiographical chunk.']
    ],
    collocations: [
      [`The photographer approached the sanctuary with deep epistemic ______.`, [`humility`, `discretion`, `omission`, `salience`], 0, `Epistemic humility is the fixed term for intellectual and cultural modesty.`],
      [`Glissant formulated the philosophical concept of the right to ______.`, [`opacity`, `sovereignty`, `studium`, `panopticon`], 0, `The right to opacity is Édouard Glissant's key postcolonial concept.`],
      [`Early ethnographic expeditions operated under the paternalistic banner of ______ anthropology.`, [`salvage`, `discretionary`, `coercive`, `rudimentary`], 0, `Salvage anthropology is the established historical term.`],
      [`Ethical documentary work must be grounded in mutual ______.`, [`reciprocity`, `cleavage`, `precarity`, `hubris`], 0, `Mutual reciprocity describes equitable give-and-take.`]
    ],
    upgrades: [
      [`Photographers should not take pictures of holy things if people say no.`, `Documentary photographers must recognize that cultural sovereignty and sacred taboos override the entitled demands of external visual transparency.`],
      [`Tourists think they can photograph whatever they want because they have expensive cameras.`, `Tourists frequently inhabit the posture of the entitled outsider, assuming that the secular gaze grants unrestricted right of entry into guarded ancestral spaces.`],
      [`Taking photos of native dances helps people learn about other cultures.`, `While visual documentation can foster intercultural empathy, it risks degenerating into extractive ethnography when conducted without communal consent and mutual reciprocity.`]
    ],
    think: {
      title: 'Visual Sovereignty, the Sacred, and the Ethics of the Frame',
      lead: 'Evaluate the profound ethical tensions between universalist claims to documentary transparency and the moral imperative of cultural sovereignty.',
      defs: [
        ['The Universal Transparency Axiom', `The secular Enlightenment principle that all knowledge, cultural practices, and historical occurrences should be open, visible, and accessible to universal human scrutiny.`],
        ['Visual Self-Determination', `The right of communities, particularly historically marginalized and indigenous groups, to control their own cultural narrative, photographic representation, and ritual secrecy.`]
      ],
      items: [
        {
          id: '24t1',
          tag: 'Ontological Conflict',
          title: 'The Secular Eye vs. Sacred Sight',
          task: `Analyze why the secular understanding of sight (as passive, neutral information gathering) clashes with the ontological understanding of sight in traditional sacred traditions (as an active, potent spiritual transaction).`,
          guide: `Explain how turning a sacred ritual into a public visual file fundamentally alters its spiritual meaning and communal efficacy.`
        },
        {
          id: '24t2',
          tag: 'Historical Deconstruction',
          title: 'The Legacy of Salvage Anthropology',
          task: `Deconstruct the concept of "salvage anthropology." How did the paternalistic assumption that indigenous cultures were "doomed to vanish" justify the non-consensual extraction of sacred knowledge?`,
          guide: `Show that treating living cultures as historical relics legitimized violating sacred taboos under the guise of scientific preservation.`
        },
        {
          id: '24t3',
          tag: 'Critical Synthesis',
          title: 'The Boundaries of Cultural Sovereignty',
          task: `Address the counter-argument: if a community claims that an internal practice is "sacred," does this claim completely eliminate the right of outside journalists or human rights advocates to investigate potential abuses?`,
          guide: `Formulate a nuanced distinction between preserving intimate spiritual rituals and shielding human rights violations behind the mantle of cultural taboo.`
        },
        {
          id: '24t4',
          tag: 'Applied Ethics Lab',
          title: 'Protocols of Visual Stewardship',
          task: `Design a four-point ethical protocol for a photojournalist invited to document a protected religious festival in a traditional community.`,
          guide: `Incorporate pre-production consultation, informed consent protocols, editorial co-authorship/veto rights, and long-term material reciprocity.`
        }
      ]
    },
    writing: {
      focus: {
        title: 'Sustaining Nuanced Arguments Across Long-Form Essays (800–1,200 Words)',
        text: `Long-form cultural essays require a masterclass in structural architecture. Rather than repeating a single point, a mature essay builds in escalating waves: historicizing the conflict, deconstructing opposing philosophical axioms, analyzing concrete case studies, addressing counter-arguments through diplomatic concession, and proposing a synthetic ethical resolution.`,
        weak: `People should not take photos of sacred places. It is rude. Some photographers say it is art, but they are wrong. We need to respect traditions.`,
        strong: `Notwithstanding the legitimate imperative to foster intercultural empathy through visual storytelling, the assumption that all reality belongs rightfully to the secular lens reflects an unexamined legacy of colonial entitlement. To restore moral legitimacy to documentary practice, photographers must embrace the discipline of epistemic humility and subordinate the camera to communal cultural sovereignty.`
      },
      short: {
        kind: 'Diplomatic evaluation',
        title: 'The Ethics of Sacred Access',
        min: 180,
        max: 260,
        prompt: `Evaluate a scenario where an international documentary crew seeks permission to film an unrecorded, secret ancestral healing ritual. Using sophisticated concessive structures (*Notwithstanding...*, *Granted that...*), formulate an ethical recommendation balancing intercultural education with communal sovereignty.`,
        support: [
          `Acknowledge the potential pedagogical and educational value of the documentary.`,
          `Deploy a formal concessive structure (*Notwithstanding the educational merits...*).`,
          `Establish the non-negotiable primacy of community consent, sacred taboos, and veto power.`,
          `Conclude with a recommendation for collaborative visual stewardship.`
        ],
        guide: [
          `Open with measured diplomatic phrasing: "When evaluating requests to film guarded ancestral rites..."`,
          `Deploy high-level vocabulary: *epistemic humility*, *cultural sovereignty*, *the right to opacity*, *extractive ethnography*.`
        ]
      },
      main: {
        kind: 'Long-form cultural essay',
        title: 'Photographing What Is Sacred: Visual Universalism, Cultural Sovereignty, and the Limits of the Lens',
        min: 800,
        max: 1200,
        main: true,
        prompt: `What responsibilities and moral boundaries govern the documentation of sacred traditions, rituals, and sanctuaries belonging to traditional or marginalized communities? In an expansive, highly structured long-form essay (800–1,200 words), critically evaluate the tension between the secular Enlightenment ethos of universal visual transparency and the imperative of communal cultural sovereignty. Integrate historical critique (salvage anthropology), philosophical inquiry (Édouard Glissant’s \'right to opacity\', the secular gaze), counter-arguments (the risk of cultural enclosure and censorship), and practical solutions (collaborative visual stewardship). Deploy sophisticated concessive clauses, diplomatic register, and rigorous C1 academic vocabulary throughout.`,
        support: [
          `Introduction (120–160 words): Frame the fundamental conflict between the universalist documentary impulse and the ontology of the sacred; introduce your central thesis on epistemic humility and visual stewardship.`,
          `Section 1 · Ontological Foundations (180–220 words): Contrast the secular gaze (seeing as an entitlement/right) with sacred sight (sight as a relational, potent, and restricted spiritual transaction).`,
          `Section 2 · The Colonial Legacy of Extractive Ethnography (180–220 words): Historicize how 19th- and 20th-century "salvage anthropology" treated living cultures as doomed relics, violating sacred taboos for academic prestige.`,
          `Section 3 · The Counter-Perspective and Its Limits (160–200 words): Address the legitimate arguments for visual universalism (breaking down prejudice, preventing isolationism, challenging internal abuses) using diplomatic concession (*Notwithstanding...*, *Granted that...*).`,
          `Section 4 · The Right to Opacity and Collaborative Stewardship (180–220 words): Introduce Glissant’s \'right to opacity\' and formulate the framework of visual stewardship (co-authorship, veto power, reciprocity).`,
          `Conclusion (100–140 words): Synthesize the debate; deliver a definitive verdict on why respecting sacred boundaries elevates rather than diminishes human understanding.`
        ],
        guide: [
          `Maintain an authoritative, scholarly, and nuanced essayistic voice throughout all sections.`,
          `Ensure seamless transitions between philosophical concepts, historical examples, and ethical recommendations.`,
          `Use advanced discourse markers: *notwithstanding*, *granted that... it does not follow that*, *insofar as*, *conversely*, *it is arguably the case that*.`,
          `Meet the full 800–1,200 word count requirement with substantive, deep argumentation.`
        ]
      }
    },
    edit: {
      checklist: [
        `Does the essay sustain deep, analytical argumentation across the full 800–1,200 word range without repetitive padding?`,
        `Are complex concessive structures (Notwithstanding, Granted that... it does not follow that) deployed accurately?`,
        `Does the text distinguish clearly between the secular gaze, extractive ethnography, and collaborative stewardship?`,
        `Are counter-arguments regarding cultural enclosure and human rights treated with intellectual honesty and nuance?`,
        `Is the tone consistently formal, diplomatic, and epistemically calibrated?`
      ],
      challenges: [
        {
          id: '24e1',
          title: 'Polishing Concession in High Register',
          bad: `Even though journalists want to show everything, they must know they can't go everywhere.`,
          task: `Rewrite using "Notwithstanding the legitimate imperative to..." and formal diplomatic vocabulary.`,
          good: `Notwithstanding the legitimate journalistic imperative to document global diversity, practitioners must recognize that the camera holds no automatic license to trespass upon guarded sacred domains.`
        },
        {
          id: '24e2',
          title: 'Calibrating Tone with Epistemic Humility',
          bad: `Western anthropology was just pure evil theft of native culture.`,
          task: `Revise into a sophisticated academic critique incorporating *extractive ethnography*, *paternalistic assumptions*, and *epistemic asymmetries*.`,
          good: `Early anthropological documentation frequently functioned as an extractive enterprise, operating on paternalistic assumptions that subordinated indigenous cultural sovereignty to Western institutional prestige.`
        }
      ]
    },
    retrieve: {
      content: `What is Édouard Glissant\'s concept of "the right to opacity," and why is it a vital defense against extractive documentary photography?`,
      contentGuide: `The right to opacity posits that non-dominant cultures have a fundamental right to keep dimensions of their spiritual and communal existence hidden and unmeasured by outside secular observers.`,
      grammar: `Combine these two conflicting ideas into a single sentence using "Notwithstanding" and "it does not follow that": 1. Visual media fosters empathy. 2. Photographers have an unrestricted right to record secret rituals.`,
      grammarGuide: `Expected: "Notwithstanding the proven capacity of visual media to foster intercultural empathy, it does not follow that photographers possess an unrestricted right to record secret sacred rituals."`,
      reasoning: `Why is the decision to *not* photograph a sacred moment sometimes the most profound demonstration of documentary ethics?`,
      reasoningGuide: `Voluntarily lowering the lens recognizes that human dignity, spiritual integrity, and communal sovereignty take ethical precedence over aesthetic self-promotion and uninvited curiosity.`,
      summary: `In Unit 24, you completed Module 5 by examining the complex ethics of documenting the sacred. You mastered advanced concessive clauses, diplomatic register modulation, epistemic humility, and long-form essay architecture.`
    }
  });

  K.units['24'].listening = K.pendingListening('24', [
    {
      id: '24l1',
      title: 'Dialogue: Access, Consent and the Sacred Sanctuary',
      format: 'Discussion between an ethnographic filmmaker and an indigenous cultural advisor',
      lead: 'Listen to a negotiation regarding the ethical boundaries of filming a traditional initiation ceremony.',
      audio: 'audio/unit-24-listening-1.mp3',
      transcript: `[Filmmaker]: Tane, our documentary team is deeply committed to presenting your community's heritage with maximum dignity. We believe that sharing the spiritual beauty of the initiation ceremony with a global audience will help dismantle centuries of racist stereotypes.\n\n[Advisor]: Elena, we appreciate your goodwill and your technical expertise. However, you are approaching this through a secular lens where visibility is assumed to be an automatic blessing. In our tradition, the initiation is not a performance for spectators; it is a sacred spiritual transformation that requires absolute isolation and spiritual protection.\n\n[Filmmaker]: But what if we agree to blur specific sacred objects and only film the elders speaking about the philosophical values of the community?\n\n[Advisor]: That is the beginning of genuine dialogue. But we must establish clear terms: the council of elders must retain full editorial veto power over every single frame before publication. Furthermore, any footage of the sacred altar must remain unrecorded.\n\n[Filmmaker]: Retaining complete veto power is challenging for independent documentary journalism, but given the sacred nature of the site, we accept that communal sovereignty overrides standard media autonomy.\n\n[Advisor]: When you accept that our boundaries are non-negotiable, you cease to be an extractive tourist and become a trusted collaborator in visual stewardship.`,
      questions: [
        {
          id: '24l1q1',
          type: 'mc',
          q: 'What is the primary objection raised by the cultural advisor regarding filming the ceremony?',
          options: [
            'The documentary crew did not offer enough money.',
            'The initiation is an active spiritual transformation requiring sacred isolation, not a secular public spectacle.',
            'The lighting equipment was too noisy for the forest.',
            'The filmmaker belonged to a rival indigenous group.'
          ],
          answer: 1,
          explain: 'The advisor emphasizes that the initiation is a sacred spiritual transformation that loses its integrity when treated as a public spectacle.'
        },
        {
          id: '24l1q2',
          type: 'mc',
          q: 'What compromise allows the filmmaker and the community to reach an agreement?',
          options: [
            'The filmmaker agrees to film in secret using hidden cameras.',
            'The team agrees not to record the sacred altar and grants the council of elders full editorial veto power.',
            'The elders agree to sell the rights to a commercial streaming platform.',
            'The community agrees to cancel the initiation ceremony entirely.'
          ],
          answer: 1,
          explain: 'The filmmaker agrees to respect sacred taboos and grant the elders editorial veto power, practicing collaborative stewardship.'
        }
      ]
    },
    {
      id: '24l2',
      title: 'Monologue: Édouard Glissant and the Defense of Opacity',
      format: 'Academic lecture on postcolonial philosophy and visual ethics',
      lead: 'A lecture analyzing Édouard Glissant\'s philosophy of opacity and its application to documentary representation.',
      audio: 'audio/unit-24-listening-2.mp3',
      transcript: `In his groundbreaking 1990 work *Poetics of Relation*, Martinican philosopher Édouard Glissant introduced a concept that fundamentally challenges Western documentary ethics: the right to opacity—*le droit à l'opacité*.\n\nFor centuries, Western imperial thought has equated understanding with transparency. To 'understand' a culture, in the Western tradition, meant to bring it into the light, measure it, translate it into European categories, and make it totally transparent to the observer's gaze. Glissant argued that this demand for total transparency is inherently coercive. It insists on evaluating the Other according to the observer's own universalized standards.\n\nIn response, Glissant demanded the right to opacity: the right of every culture, community, and individual to possess irreducible mysteries that refuse to be explained, cataloged, or fully understood by outsiders. Opacity is not a wall of ignorance; it is a shield of dignity. When applied to visual arts and photography, Glissant's philosophy reminds us that an ethical relationship with another human being does not require total visual exposure. True solidarity begins when we learn to respect and protect that which we cannot, and should not, fully grasp.`,
      questions: [
        {
          id: '24l2q1',
          type: 'mc',
          q: 'According to Édouard Glissant, why is the Western demand for cultural transparency problematic?',
          options: [
            'It makes books and photographs too expensive to print.',
            'It is inherently coercive, forcing other cultures to be measured and evaluated strictly by Western categories.',
            'It prevents people from learning foreign languages.',
            'It relies too heavily on black-and-white film.'
          ],
          answer: 1,
          explain: 'Glissant argued that demanding total transparency forces non-Western cultures into external, reductive interpretive frameworks.'
        },
        {
          id: '24l2q2',
          type: 'mc',
          q: 'How does Glissant define "opacity" in the context of human dignity?',
          options: [
            'As an intentional deception designed to spread false rumors.',
            'As a shield of dignity that protects a culture’s irreducible mysteries from invasive external totalization.',
            'As a failure of modern scientific education.',
            'As a technical term for photographic film density.'
          ],
          answer: 1,
          explain: 'Glissant defines opacity as an essential shield of dignity protecting cultural mystery and sovereignty.'
        }
      ]
    }
  ]);

  K.units['24'].speaking = K.canonicalSpeaking({
    part1: [
      { q: `Have you ever visited a sacred place (such as a church, temple, or historic memorial) where photography was prohibited? How did you feel about that rule?`, guide: `Describe the location, the specific restrictions in place, and your personal reflection on why silence and non-recording were required.` },
      { q: `Do you think taking selfies in places of solemn historical tragedy or religious worship is ever acceptable? Why or why not?`, guide: `Discuss the boundary between personal memory and disrespectful self-promotion (moral voyeurism).` },
      { q: `How should travelers educate themselves about local cultural taboos before taking photographs in foreign communities?`, guide: `Mention researching local customs, seeking local guides, asking explicit permission, and respecting community boundaries.` }
    ],
    part2: {
      topic: `Describe a situation involving cultural, religious, or personal privacy where someone took or wanted to take a photograph.`,
      prompts: [
        `What the situation or setting was`,
        `Who was involved and what they wanted to photograph`,
        `What tensions or concerns arose regarding privacy, respect, or consent`,
        `And explain how this situation illustrates the ethical boundaries of photography.`
      ],
      guide: `Organize your response with clear context, detailed examination of competing viewpoints (the photographer\'s desire vs the subject\'s dignity), and a thoughtful moral conclusion.`
    },
    part3: [
      { q: `In an era of ubiquitous smartphones and satellite surveillance, is it still possible for any human practice to remain truly sacred and private?`, guide: `Evaluate the impact of total digital transparency on human spiritual life and whether intentional secrecy is becoming impossible.` },
      { q: `Should international museums return sacred cultural and religious artifacts that were photographed and collected during colonial occupations?`, guide: `Discuss cultural sovereignty, historical restitution, and the ethics of public display versus ancestral ownership.` },
      { q: `Can an outsider ever truly understand a sacred tradition without having been initiated into it?`, guide: `Address Glissant\'s \'right to opacity\', epistemic humility, and the limits of secular rationalism when interpreting spiritual practices.` }
    ],
    followUp: `If an artist believes that an image has great aesthetic value, should that artistic value override a community\'s desire for privacy?`,
    rubric: {
      pronunciation: `Clear articulation and stress on words like 'sov·er·eign·ty', 'ep·i·ste·mic', 'o·pac·i·ty', 'pa·ter·nal·is·tic', 'rec·i·proc·i·ty'.`,
      grammar: `Sophisticated use of concessive clauses ('Notwithstanding the artistic intent...', 'Granted that...') and high-register epistemic hedging.`,
      discourse: `Seamless progression through multifaceted ethical dilemmas, balancing intellectual empathy with principled critical evaluation.`,
      vocabulary: `Accurate application of core concepts including 'extractive documentation', 'visual stewardship', 'the secular gaze', and 'the right to opacity'.`
    }
  });
})(window.KLANG = window.KLANG || {});
