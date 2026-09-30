/* UNIT 01 · WHEN A LANGUAGE GOES QUIET */
window.KLANG = window.KLANG || {};
window.KLANG.units = window.KLANG.units || {};
const existing01 = window.KLANG.units['01'] || {};
window.KLANG.units['01'] = Object.assign(existing01, {
  id: '01',
  module: 1,
  title: 'When a language',
  titleEm: 'goes quiet',
  question: 'Can you really forget a language you once spoke well?',

  /* ───────────────────────── KNOW ───────────────────────── */
  know: {
    lead: `You don't need to be a linguist to read this unit's text, but a few ideas will make it far more interesting. Read this primer once, slowly. Everything here comes back later.`,
    terms: [
      { term: 'Language attrition', def: `The gradual loss of ability in a language that a person once knew well, usually because it is no longer used regularly. It can affect a second language (your German after you leave Germany) or even a first language (a Brazilian who has lived in Canada for forty years).` },
      { term: 'Receptive vs productive knowledge', def: `Receptive knowledge lets you <b>recognise</b> language when you read or hear it. Productive knowledge lets you <b>retrieve</b> it yourself and use it when you speak or write. Recognition gets help from context; production does not. That is why most people understand far more than they can say.` },
      { term: 'Accuracy, fluency, automaticity', def: `Three different things we tend to call "being good at a language". <b>Accuracy</b>: getting the forms right. <b>Fluency</b>: producing language at a natural speed without constant pauses. <b>Automaticity</b>: doing both without conscious effort, so your attention is free for meaning. You can be accurate but slow, or fluent but careless.` },
      { term: 'Savings', def: `A term from the German psychologist Hermann Ebbinghaus (1885). Material you can no longer recall is often relearned faster the second time. The time you "save" is evidence that something was retained, even if you couldn't access it.` },
      { term: 'Permastore', def: `A term coined by the psychologist Harry Bahrick (1984) for knowledge that, after an initial decline, remains stable for decades without being used.` }
    ],
    timeline: [
      { when: '1885', what: `Hermann Ebbinghaus publishes <i>On Memory</i>, including the idea of "savings" in relearning.` },
      { when: '1980', what: `A conference on "the loss of language skills" at the University of Pennsylvania is often cited as the starting point of language attrition as a research field.` },
      { when: '1984', what: `Harry Bahrick publishes his study of people who learned Spanish at school up to 50 years earlier.` },
      { when: '2003', what: `Christophe Pallier and colleagues study adults adopted from Korea by French families in childhood.` },
      { when: '2017', what: `Jiyoun Choi, Anne Cutler and Mirjam Broersma publish a study suggesting that Korean-born adoptees in the Netherlands retained traces of their birth language from infancy.` }
    ],
    views: {
      title: 'Two ways of explaining the same experience',
      a: { name: 'The storage view', text: `Knowledge that is not used decays. Like a path in a forest that nobody walks on, it gradually disappears. When you "forget" a word, the word is, in some meaningful sense, gone.` },
      b: { name: 'The access view', text: `Knowledge is still stored, but the routes to it have weakened. When you "forget" a word, the problem is retrieval, not storage. With enough use, the route can be rebuilt.` },
      note: `Most researchers today think both processes happen, in different proportions for different people and different parts of a language. The interesting question is not which view is right, but how much of each is at work in a particular case.`
    },
    items: [
      { id: 'k1', type: 'open', tag: 'Before you read', q: `Think of a language, or any skill, that you used to use every day and no longer do. What do you think happened to it: <b>storage</b>, <b>access</b>, or both? Write two or three sentences. You'll come back to this at the end of the unit.`, rows: 4 }
    ]
  },

  /* ───────────────────────── READ ───────────────────────── */
  read: {
    main: {
      label: 'Main reading',
      format: 'Reflective essay',
      title: 'Everything Is Still in the House',
      standfirst: `On forgetting a language you once lived in, and on why "forgetting" may be the wrong word.`,
      pull: { after: 7, text: `The house is still full; it's the <em>corridors</em> that have become dark.` },
      notes: {
        4: `<b>attrition</b> comes from the Latin <i>atterere</i>, "to rub away".`,
        8: `Bahrick, 1984, <i>Journal of Experimental Psychology: General</i>.`,
        9: `Ebbinghaus tested himself for years, memorising lists of nonsense syllables such as "DAX" and "BUP".`
      },
      paras: [
`The first time I noticed it, I was standing in a bakery in Hamburg, holding a coin I didn't need and a sentence I couldn't find. I had lived in Germany for four years in my twenties. I had argued with landlords in German, cried on the phone to a friend in German, and once, memorably, explained the plot of a Brazilian soap opera to a room of bored engineers in German. Eleven years later, I understood every word the woman behind the counter said. She asked whether I wanted the rolls sliced, whether I needed a bag, whether I was visiting. I understood all of it at once, the way you understand weather. And then it was my turn to speak, and nothing came.`,
`It wasn't that I had forgotten the words. The word I needed, the ordinary, unglamorous word for a bread roll, was on the tip of my tongue. I could feel its shape, even its first syllable. But between knowing it and saying it there was a gap I had never noticed before, and the woman was waiting, politely, with her tongs in the air. I pointed. She smiled. I said <i>danke</i> with the enthusiasm of someone who has just been rescued, and I walked out feeling, absurdly, like a fraud.`,
`Most people who have lived part of their life in another language have had some version of that moment. It is {{unsettling|unsettling}} in a very specific way. Losing a skill you never had is not dramatic. Losing something you once did {{effortlessly|effortless}} feels different: it feels like a small betrayal, and you are not sure who has betrayed whom.`,
`Linguists have a name for what was happening to me: language {{attrition|attrition}}, the gradual loss of ability in a language that is no longer used regularly. At first glance, the term sounds like an accurate description of that bakery. Something was {{eroding|erode}}; something was gone. But the more I have read about attrition, the less sure I am that "loss" is the right way to describe what most of us experience. What is often overlooked is that a language does not live in one place in the mind. It lives in several, and they do not fade at the same speed.`,
`It helps, first, to draw a distinction between receptive and productive knowledge. Receptive knowledge is what you use when you read or listen: you recognise a word when you meet it. Productive knowledge is what you need when you speak or write: you have to {{retrieve|retrieve}} the word yourself, without a prompt, and put it into a sentence in real time. Recognition is generous. It gives you clues: the context, the sound, the half-familiar shape of a phrase. Retrieval gives you nothing. Unsurprisingly, recognition tends to survive much longer than production. The woman in the bakery was doing all the retrieving; I only had to recognise.`,
`The second distinction is between knowing a language and being fluent in it, and here it helps to separate three things we tend to lump together. Accuracy is getting the form right: the correct tense, the right preposition, the article in its proper place. Fluency is producing language at a natural speed without constant pauses. Automaticity is the ability to do all this without conscious effort, so that your attention is free for what you actually want to say. It is also the one we take for granted until it fails us. When a language has been in daily use for years, most of it is automatic. When it falls out of use, automaticity is often the first thing to go. You still know the rule; you just have to think about it. And the moment you have to think about the past participle, you have stopped thinking about the conversation.`,
`This is why attrition can be so {{deceptive|deceptive}}. From the inside, it feels like forgetting. You {{falter|falter}}, you search, you {{settle for|settle-for}} a simpler word. But much of what has disappeared is not the knowledge itself but the speed of access to it. The house is still full; it's the corridors that have become dark.`,
`There is good evidence for this, and some of it is surprisingly old. In 1984, the psychologist Harry Bahrick published a study of nearly 800 people who had learned Spanish at school or university, some of them as long as fifty years earlier. Most had rarely used it since. Their knowledge dropped sharply in the first three to six years after they stopped studying. Then something unexpected happened: the decline stopped. What remained stayed remarkably stable for decades, a {{residual|residual}} core that Bahrick called the "permastore". The people who had kept the most were not those with the most talent but those who had studied longer and more intensively in the first place. In other words, the depth of the original learning mattered more than the time that had passed since.`,
`An even older idea points in the same direction. In the 1880s, Hermann Ebbinghaus noticed that material he could no longer recall at all was relearned faster the second time. He called the difference "savings". Anyone who has returned to a language after years away has felt this. For the first few days, everything is effortful and embarrassing. Then, in a matter of weeks, words begin to {{resurface|resurface}} that you had no idea you still had. They don't arrive as new information; they arrive as recognition, like meeting someone in the street whose name comes back to you just as they say hello.`,
`None of this means attrition isn't real. Far from being a myth, it is well documented. Researchers who have studied people living for decades in another country have found real changes: slower retrieval, more hesitation, {{interference|interference}} from the language that now dominates their days, and occasionally structures that have quietly shifted. Some studies suggest that emotional history matters too: people who left a country under painful circumstances sometimes show more attrition in the language they associate with it, as if the mind had its own reasons for letting it go. But there is little reason to assume that what most of us experience amounts to the total erasure we imagine when we say, "I've forgotten my German."`,
`It is worth considering why the word "forgotten" comes so easily. Part of it is that we measure ourselves against our best moments. I don't compare my German today with a beginner's German; I compare it with the German I spoke at twenty-six, on a topic I cared about. Against that version of myself, almost anything is a failure. Part of it, I suspect, is also a matter of identity. For many people, a language they once lived in is tied to a period of their life: a city, a relationship, a younger self. To admit that the language has gone quiet is to admit that the period is over. Saying it is "gone" is, oddly, more {{reassuring|reassuring}} than saying it is still there but unused, because "gone" asks nothing of us.`,
`That, perhaps, is the underlying issue. {{Dormant|dormant}} knowledge is an invitation, and invitations can be uncomfortable. If the language is still in the house, then the question is no longer whether you have lost it, but whether you are willing to go back in, turn on the lights, and put up with the awkward first weeks of hearing yourself sound worse than you remember.`,
`I have been doing that for the past few months. I have read more German this year than in the previous decade combined. I have started writing short, {{clumsy|clumsy}} paragraphs in the evenings and checking them the next morning, which is {{humbling|humbling}} in a way I did not enjoy at first. Some things have come back in a matter of days. Others still haven't. The subjunctive, which I used to handle with a certain pride, now feels like a door I remember but can't find.`,
`What I have stopped doing is describing myself as someone who "used to speak German". It isn't accurate. I speak German slowly, with gaps, and with more effort than I would like. To a certain extent, that is what everyone who speaks a second language does on a bad day. The difference is that I now know the gaps are not empty. They are rooms I haven't visited in a while.`,
`Last month I went back to the same bakery. The woman was different; the rolls were the same. I asked for them (the word arrived a second late, but it arrived), and when she asked whether I wanted a bag, I said no, I had brought my own. It was a sentence of about seven words. Nobody in the shop could have known what it cost, or what it meant. I walked out with the rolls under my arm and a feeling I did not expect: not pride, exactly, but the quiet relief of finding something exactly where you left it.`
      ]
    },
    counter: {
      label: 'Counterpoint',
      format: 'Opinion column',
      title: 'Against the Hopeful Metaphor',
      standfirst: `Why "it's all still in there" may be the wrong thing to tell yourself.`,
      paras: [
`There is a story we like to tell about forgotten languages, and it goes like this: nothing is ever really lost. The words are all still there, stored somewhere in the dark, waiting for us to come back with a torch. It is a lovely story. I am not convinced it is a true one. More precisely, I am not convinced it is the kind of story that could ever turn out to be false.`,
`Consider how the metaphor handles evidence. If you return to a language and it comes back quickly, that proves the knowledge was there all along. If it doesn't come back, that proves the corridors are still dark and you haven't practised enough. Either way, the house is full. A claim that fits every possible outcome is comforting, but it isn't telling us very much.`,
`The research is also less reassuring than it is often made to sound. In 2003, a team led by Christophe Pallier studied adults who had been born in Korea and adopted by French families when they were between three and eight years old. As adults, they could not identify Korean sentences any better than French people who had never heard the language, and brain scans showed their brains responding to Korean much as they did to other unfamiliar languages. Whatever these children had once known, it was no longer doing anything visible.`,
`Defenders of the hopeful view point to a later study. In 2017, Jiyoun Choi, Anne Cutler and Mirjam Broersma found that Korean-born adults adopted by Dutch families as babies or toddlers learned to produce certain Korean sounds better, after training, than Dutch adults with no Korean background. It is a fascinating result, and it suggests that something remained. But notice what that something is: a small head start in relearning a few sounds. That is not a language waiting in a house. It is a faint footprint.`,
`Ebbinghaus's "savings" work the same way. Relearning faster is real, and it is useful. But being able to relearn something quickly is not the same as knowing it, any more than an old path through a forest is the same as a road. You still have to walk it, clear it, and walk it again.`,
`Why does this matter? Because metaphors shape what we do. If I believe my German is "all still there", I may treat my gaps as temporary inconveniences, waiting for the right trip or the right conversation to switch the lights back on. If I accept that parts of it are genuinely gone, or so weakened that the difference hardly matters, I am more likely to do the unglamorous work: the drills, the reading, the corrections, the writing I would rather not show anyone.`,
`I am not arguing that attrition is total, or that it is hopeless. The evidence clearly shows that people who once knew a language well have an advantage when they return to it. My objection is smaller and, I think, more practical. We should describe that advantage honestly: as a head start, not as a hidden inheritance. The house image flatters us. A more accurate picture might be a garden that has been left alone for a few years. The shape is still visible. Some things have survived. But nobody walks into an overgrown garden and calls it finished.`
      ]
    }
  },

  /* ─────────────────────── INTERPRET ─────────────────────── */
  interpret: {
    lead: `Questions 1–7 have answers you can check. Questions 8–14 are open: there is no single right answer, but there are stronger and weaker ones. Answer before you check anything.`,
    items: [
      { id: 'i1', type: 'mc', tag: 'Main idea', q: `Which statement best summarises the writer's central argument in the main reading?`,
        options: [
          `Language attrition is a myth invented by people who stopped practising.`,
          `What feels like forgetting a language is often a loss of speed of access rather than a loss of the knowledge itself.`,
          `Receptive knowledge is more valuable than productive knowledge for adult learners.`,
          `Emotional history is the main reason people lose a second language.`
        ], answer: 1,
        explain: `The whole essay builds towards the idea in paragraph 7: "much of what has disappeared is not the knowledge itself but the speed of access to it". A is wrong because paragraph 10 explicitly says attrition is real. C is never argued. D is mentioned only as something "some studies suggest", one factor among others.` },
      { id: 'i2', type: 'mc', tag: 'Vocabulary in context', q: `In paragraph 5, the writer says "Recognition is generous." What does <i>generous</i> mean here?`,
        options: [
          `Recognition is kind to the listener's feelings.`,
          `Recognition gives you plenty of help, in the form of context and clues.`,
          `Recognition happens slowly, giving you time.`,
          `Recognition allows you to understand more than one language at once.`
        ], answer: 1,
        explain: `The next sentence explains the metaphor: "It gives you clues: the context, the sound, the half-familiar shape of a phrase." <i>Generous</i> here means "giving a lot", contrasted with retrieval, which "gives you nothing".` },
      { id: 'i3', type: 'mc', tag: 'Author\'s purpose', q: `Why does the writer return to the bakery in the final paragraph?`,
        options: [
          `To show that the bakery had changed as much as her German had.`,
          `To give a concrete, small-scale example that supports the idea that the language was dormant rather than gone.`,
          `To prove that her German is now as good as it was when she was twenty-six.`,
          `To criticise people who give up on languages too easily.`
        ], answer: 1,
        explain: `The return creates a frame: the same situation, now with a different outcome ("the word arrived a second late, but it arrived"). It supports the essay's thesis on a human scale. C overstates it: she is careful to say she speaks "slowly, with gaps".` },
      { id: 'i4', type: 'tf', tag: 'Detail + justification', q: `According to the writer, Bahrick found that the people who retained the most Spanish were those with the greatest natural talent.`, answer: false,
        explain: `False. Paragraph 8: "The people who had kept the most were not those with the most talent but those who had studied longer and more intensively in the first place." The depth of the original learning mattered most.` },
      { id: 'i5', type: 'tf', tag: 'Detail + justification', q: `The writer argues that attrition never involves any genuine change in a person's language.`, answer: false,
        explain: `False. Paragraph 10 lists "real changes: slower retrieval, more hesitation, interference ... and occasionally structures that have quietly shifted". Her claim is narrower: most experiences are not "total erasure".` },
      { id: 'i6', type: 'mc', tag: 'Inference', q: `In paragraph 11 the writer says "'gone' asks nothing of us". What does she imply?`,
        options: [
          `That people who say a language is "gone" are lying deliberately.`,
          `That describing a language as lost can be a way of avoiding the effort of recovering it.`,
          `That languages disappear without any action on our part.`,
          `That the word "gone" is grammatically more accurate than "dormant".`
        ], answer: 1,
        explain: `If the language is gone, there is nothing to do. If it is dormant, you have to "go back in" (paragraph 12). The implication is that "gone" can be a comfortable story. A is too strong: she says this is "oddly" reassuring, not dishonest.` },
      { id: 'i7', type: 'mc', tag: 'Figurative language', q: `"The house is still full; it's the corridors that have become dark." In this metaphor, what do the corridors represent?`,
        options: [
          `The years spent away from the country.`,
          `The routes of access to stored knowledge, that is, retrieval.`,
          `The emotional memories attached to a language.`,
          `The grammar rules the writer has forgotten.`
        ], answer: 1,
        explain: `The house holds the knowledge (storage); the corridors are how you get to it (access). This maps exactly onto the "access view" from KNOW.` },
      { id: 'i8', type: 'open', tag: 'Interpretation', q: `Why do you think the writer felt "like a fraud" after the first bakery visit? What does this suggest about the link between language and identity?`,
        guide: [`Consider the gap between who she was in German (arguing, crying, joking) and who she was at the counter.`, `"Fraud" suggests someone claiming an identity they don't have. What identity was she afraid of losing?`, `Connect with paragraph 11: the language is tied to "a younger self".`] },
      { id: 'i9', type: 'open', tag: 'Argument structure', q: `The writer separates accuracy, fluency and automaticity. Which of the three does she believe is most affected by attrition? Quote the evidence.`,
        guide: [`Paragraph 6: "automaticity is often the first thing to go".`, `Explain her example: thinking about the past participle means you stop thinking about the conversation.`, `A strong answer notices that accuracy may remain (she "still knows the rule") while automaticity disappears.`] },
      { id: 'i10', type: 'open', tag: 'Fact vs interpretation', q: `Find one sentence in paragraphs 8–9 that <b>reports evidence</b>, and one sentence where the writer <b>interprets</b> that evidence. How can you tell the difference?`,
        guide: [`Evidence: "Their knowledge dropped sharply in the first three to six years after they stopped studying."`, `Interpretation: "In other words, the depth of the original learning mattered more than the time that had passed since."`, `Signals of interpretation: "In other words", generalising language, claims about why rather than what.`] },
      { id: 'i11', type: 'open', tag: 'What is left unsaid', q: `The writer lived in Germany for four years as an adult and used German for everything. What does she <i>not</i> discuss about her situation that might make her experience different from someone else's? Would her conclusions apply to someone who studied a language only in class?`,
        guide: [`Her original learning was deep, immersive and emotional: exactly the conditions Bahrick links to retention.`, `She also has the time, motivation and money to read and return to Hamburg.`, `A strong answer notices that she generalises from a favourable case, and says whether that weakens her argument or only limits it.`] },
      { id: 'i12', type: 'open', tag: 'Comparing texts', q: `What is the counterpoint writer's strongest objection to the main essay? Does the main essay answer it, even partly?`,
        guide: [`The strongest objection is probably paragraph 2: the metaphor fits every outcome, so it can't be tested.`, `Another: faster relearning is not the same as knowing.`, `The main essay partly anticipates this in paragraph 10 ("None of this means attrition isn't real"), but never says what evidence would prove the language was truly gone.`] },
      { id: 'i13', type: 'open', tag: 'Word choice', q: `The unit is called "When a Language Goes <b>Quiet</b>", not "When a Language Is Lost". Why might this word have been chosen? What does "quiet" suggest that "lost" does not?`,
        guide: [`"Quiet" suggests something still present but not audible: silence, not absence.`, `It also suggests a state that can change: things that go quiet can speak again.`, `Connect with "dormant" and with KLANG's own idea of language as sound.`] },
      { id: 'i14', type: 'open', tag: 'Does it follow?', q: `The essay ends: "the gaps are not empty. They are rooms I haven't visited in a while." Does this conclusion follow from the evidence presented? What would need to be true for it to be fully justified?`,
        guide: [`The evidence (Bahrick, Ebbinghaus, her own experience) supports "something remains"; it does not show that <i>every</i> gap contains retrievable knowledge.`, `For full justification, we'd need evidence that specific forgotten items return with practice, not just that general ability recovers.`, `A strong answer may conclude that the ending is partly a rhetorical choice, and say whether that is legitimate in a reflective essay.`] }
    ]
  },

  /* ─────────────────────── NOTICE ─────────────────────── */
  notice: {
    focuses: [
      {
        id: 'n1',
        title: 'Present Perfect vs Past Simple',
        sub: 'Two ways of looking at the past',
        noticeIt: [
          `In 1984, the psychologist Harry Bahrick <b>published</b> a study of nearly 800 people.`,
          `Most people who <b>have lived</b> part of their life in another language <b>have had</b> some version of that moment.`,
          `I <b>have read</b> more German this year than in the previous decade combined.`,
          `Last month I <b>went</b> back to the same bakery.`,
          `Some things <b>have come</b> back in a matter of days. Others still <b>haven't</b>.`,
          `But the more I <b>have read</b> about attrition, the less sure I am...`
        ],
        ask: [
          { id: 'n1a', type: 'open', q: `Which sentences point to a specific, finished time? Which words tell you that?`, rows: 2 },
          { id: 'n1b', type: 'open', q: `In sentence 2, no time is mentioned at all. Why is the Present Perfect natural here?`, rows: 2 },
          { id: 'n1c', type: 'open', q: `Sentence 3 says "this year". What would change if it said "last year"?`, rows: 2 },
          { id: 'n1d', type: 'open', q: `"Others still haven't." What does this tell you about the writer's expectations for the future?`, rows: 2 }
        ],
        explain: `
<p>Both tenses talk about the past. The difference is the <b>time frame</b> the speaker has in mind.</p>
<h4>Past Simple: a closed time frame</h4>
<p>Use it when the action belongs to a period that is finished and separated from now, whether you say when (<i>in 1984, last month, in my twenties</i>) or the context makes it clear (<i>I pointed. She smiled.</i>). A story told in sequence is almost always in the Past Simple.</p>
<h4>Present Perfect: a time frame that is still open</h4>
<p>Use it when the period you're thinking about reaches up to the present. There are three common reasons:</p>
<ul>
<li><b>Experience in a life that is still going on:</b> <i>Most people who have lived abroad have had this moment.</i> When doesn't matter; what matters is that it's part of their experience now.</li>
<li><b>An unfinished period:</b> <i>this year, this month, so far, recently, since March</i>. <i>I have read more German this year</i>, and the year isn't over.</li>
<li><b>A past action whose relevance is present:</b> <i>Some things have come back.</i> They are back now.</li>
</ul>
<h4>The key test</h4>
<p>Ask yourself: <b>is the time I'm thinking of finished?</b> If yes, Past Simple. If it connects to now, Present Perfect. This is why a finished time expression (<i>yesterday, in 2014, when I was 25</i>) is incompatible with the Present Perfect, even though Portuguese <i>já</i> might make you want to use it.</p>
<h4>Nuances worth knowing</h4>
<ul>
<li><b>For works with both, but the meaning changes.</b> <i>I lived in Germany for four years</i> (I don't live there now). <i>I have lived in São Paulo for eleven years</i> (I still do).</li>
<li><b>People who are no longer alive</b> take the Past Simple for life experience: <i>Ebbinghaus never learned Spanish</i>, not <i>has never learned</i>. Their life is a closed time frame.</li>
<li><b>News and academic writing</b> often open with the Present Perfect, then move to the Past Simple for details: <i>Researchers have found real changes. In one study, they tested ...</i></li>
<li><b>American English</b> is more relaxed: <i>Did you eat yet?</i> is common in the US. In careful writing, and in British English, <i>Have you eaten yet?</i> is the norm.</li>
</ul>`,
        compare: {
          head: ['Sentence', 'Time frame', 'What it tells you'],
          rows: [
            ['I lived in Germany for four years.', 'Closed', 'That period is over. She lives elsewhere now.'],
            ['I have lived in São Paulo for eleven years.', 'Open', 'She still lives there.'],
            ['I read a lot of German last year.', 'Closed', 'Last year is finished; no link to now.'],
            ['I have read a lot of German this year.', 'Open', 'The year and the reading are still going on.'],
            ['I forgot the word.', 'Closed', 'At a specific moment (in the bakery).'],
            ['I have forgotten the word.', 'Open', 'I still can\'t remember it now.']
          ]
        },
        make: [
          { id: 'n1m1', type: 'produce', q: `Complete with the verb in brackets: <i>Researchers ______ (study) language attrition since the 1980s.</i>`, model: [`have studied`, `have been studying`], explain: `"Since the 1980s" describes a period that runs up to now, so the Present Perfect (simple or continuous) is needed. "Studied" would suggest the research has stopped, which contradicts "since".` },
          { id: 'n1m2', type: 'produce', q: `Complete: <i>When I ______ (move) to Hamburg, I ______ (not / speak) a word of German.</i>`, model: [`moved · didn't speak`], explain: `"When I moved" places us at a specific, finished moment; everything in that frame stays in the Past Simple.` },
          { id: 'n1m3', type: 'produce', q: `Correct the error: <i>I have visited Hamburg in 2014, and I have loved it.</i>`, model: [`I visited Hamburg in 2014, and I loved it.`], explain: `"In 2014" closes the time frame. Both verbs belong to that finished period.` },
          { id: 'n1m4', type: 'produce', q: `Correct the error: <i>Since I left Germany, I didn't speak German once.</i>`, model: [`Since I left Germany, I haven't spoken German once.`], explain: `The main clause describes the period from leaving until now, so it needs the Present Perfect. Note that the "since" clause itself stays in the Past Simple (<i>since I left</i>), because leaving happened at one point in the past.` },
          { id: 'n1m5', type: 'produce', q: `Combine into one sentence using the Present Perfect: <i>I started writing short paragraphs in March. I still write them every evening.</i>`, model: [`I have been writing short paragraphs every evening since March.`, `I have written short paragraphs every evening since March.`], explain: `An activity that started in the past and continues now: Present Perfect (continuous emphasises the ongoing activity, which you'll study in Unit 02).` },
          { id: 'n1m6', type: 'produce', q: `Choose the more natural option and explain why: <i>(a) Did you ever teach a C1 group? / (b) Have you ever taught a C1 group?</i>`, model: [`(b) Have you ever taught a C1 group?`], explain: `The question is about life experience up to now. (a) is possible in American English, but (b) is the standard, especially in writing and in British English.` },
          { id: 'n1m7', type: 'open', q: `<b>Make it personal.</b> Write three true sentences about a language or skill in your life: one in the Past Simple with a finished time expression, one about life experience with the Present Perfect, and one about an unfinished period (<i>this year, recently, since...</i>).`, rows: 4,
            guide: [`Check that each finished time expression (last year, in 2019, when I was...) goes with the Past Simple.`, `Check that "since" + a point in time goes with the Present Perfect in the main clause.`] }
        ],
        radar: [
          { wrong: 'I have lived in Germany when I was 25.', right: 'I lived in Germany when I was 25.', why: '"When I was 25" is a finished time.' },
          { wrong: 'I live here since 2015.', right: "I've lived / I've been living here since 2015.", why: 'Portuguese "moro aqui desde" uses the present; English needs the Present Perfect for a period up to now.' },
          { wrong: 'I have seen her yesterday.', right: 'I saw her yesterday.', why: 'A finished time expression never goes with the Present Perfect.' },
          { wrong: 'Since I have moved here, I have made friends.', right: 'Since I moved here, I have made friends.', why: 'The "since" clause refers to a point in time, so it takes the Past Simple.' },
          { wrong: 'This is the first time I read this author.', right: "This is the first time I've read this author.", why: '"It\'s the first / second time..." always takes the Present Perfect.' },
          { wrong: 'I have been in London three times last year.', right: 'I was in London three times last year.', why: 'Counting experiences is fine with the Present Perfect, unless the period is closed ("last year").' }
        ],
        help: `<p><b>Resumo em português.</b> O Present Perfect não é "o passado recente" nem uma tradução de "tenho feito". Ele existe porque o falante está olhando para um período que <b>ainda não fechou</b>: a vida da pessoa, "este ano", "desde março".</p><p>Se você consegue colocar um marcador de tempo terminado (<i>ontem, em 2014, quando eu tinha 25</i>), use o Past Simple. Cuidado com duas armadilhas do português: <i>"moro aqui há 10 anos"</i> vira <b>I've lived here for 10 years</b> (não <i>I live</i>), e <i>"já"</i> nem sempre pede Present Perfect: <i>Já fui a Hamburgo em 2014</i> é <b>I went to Hamburg in 2014</b>.</p>`
      },
      {
        id: 'n2',
        title: 'Tense consistency',
        sub: 'Changing tense only when the time frame changes',
        noticeIt: [
          `She <b>asked</b> whether I <b>wanted</b> the rolls sliced, whether I <b>needed</b> a bag, whether I <b>was</b> visiting.`,
          `Recognition <b>is</b> generous. It <b>gives</b> you clues. <i>(inside an essay that began as a story in the past)</i>`,
          `The woman in the bakery <b>was doing</b> all the retrieving; I only <b>had</b> to recognise.`,
          `It <b>wasn't</b> that I <b>had forgotten</b> the words.`,
          `I <b>have been doing</b> that for the past few months. I <b>have read</b> more German this year...`
        ],
        ask: [
          { id: 'n2a', type: 'open', q: `In sentence 1, the woman's actual questions were in the present ("Do you want them sliced?"). Why are they all in the past here?`, rows: 2 },
          { id: 'n2b', type: 'open', q: `Sentence 2 is in the present, although the essay started in the past. Is this inconsistent? Why or why not?`, rows: 2 },
          { id: 'n2c', type: 'open', q: `Why does the writer use "had forgotten" in sentence 4 instead of "forgot"?`, rows: 2 },
          { id: 'n2d', type: 'open', q: `The last section moves into the Present Perfect. What has changed in the essay at that point?`, rows: 2 }
        ],
        explain: `
<p>"Tense consistency" is often misunderstood as "use the same tense all the way through". Good writers change tense constantly. What they don't do is change tense <b>without a reason</b>.</p>
<h4>Each tense signals a time frame</h4>
<p>This essay moves through four frames, and each has its own tense:</p>
<ul>
<li><b>The story</b> (the bakery, eleven years later): Past Simple and Past Continuous, with Past Perfect for things that happened before (<i>I had lived in Germany</i>, <i>I hadn't forgotten</i>).</li>
<li><b>General truths</b> (how memory works): Present Simple. <i>Recognition is generous.</i> These are true at any time, so they stay in the present even inside a past-tense essay.</li>
<li><b>Past research</b>: Past Simple. <i>Bahrick published...</i></li>
<li><b>The writer's situation now</b>: Present Perfect and present. <i>I have been doing that. I speak German slowly.</i></li>
</ul>
<h4>The rule, stated properly</h4>
<p>Stay in the same tense <b>as long as you stay in the same time frame</b>. When you shift frames, the tense shifts with you, and it's usually helpful to signal the shift with a time expression (<i>Eleven years later</i>, <i>In 1984</i>, <i>for the past few months</i>).</p>
<h4>Where B1/B2 writing breaks</h4>
<p>The most common problem is <b>drifting</b>: a narrative in the past slides into the present in the middle of a sentence (<i>I was at the counter and she asks me...</i>). This happens in spoken storytelling (the "historic present"), and it can be effective as a deliberate choice for a whole passage. But in writing, an unplanned switch confuses the reader about <i>when</i> things are happening.</p>`,
        compare: {
          head: ['Drifting (confusing)', 'Consistent (clear)'],
          rows: [
            ['I was at the counter and she asks me if I want a bag.', 'I was at the counter and she asked me if I wanted a bag.'],
            ['Bahrick studied 800 people. He finds that knowledge drops in the first years.', 'Bahrick studied 800 people. He found that knowledge dropped in the first years.'],
            ['Research showed that recognition survived longer than production.', 'Research has shown that recognition survives longer than production. <i>(still true)</i>']
          ]
        },
        make: [
          { id: 'n2m1', type: 'produce', q: `Rewrite with consistent tenses: <i>Last week I was reading an article about attrition when I realise that I don't use my Spanish for years.</i>`, model: [`Last week I was reading an article about attrition when I realised that I hadn't used my Spanish for years.`], explain: `The frame is "last week", so "realise" becomes "realised". The years of not using Spanish happened before that moment: Past Perfect.` },
          { id: 'n2m2', type: 'produce', q: `Is this sentence consistent? If not, correct it: <i>When I was a child, my grandmother told me that languages are like muscles.</i>`, model: [`It is acceptable as it is. "Are" can stay in the present if the speaker still considers it true; "were" is also correct and more neutral.`], explain: `Reported general truths can keep the present tense. Choosing "are" signals that you, the writer, accept the idea; "were" simply reports it.` },
          { id: 'n2m3', type: 'open', q: `Write a four-sentence paragraph that moves through three time frames: a specific past moment (Past Simple), something that is generally true (Present Simple), and your situation now (Present Perfect). Signal each shift with a time expression.`, rows: 5,
            guide: [`Example frame markers: "Two years ago...", "In general...", "Since then...".`, `Check that you do not drift inside a frame.`] }
        ],
        radar: [
          { wrong: 'I was nervous and I start to speak very fast.', right: 'I was nervous and I started to speak very fast.', why: 'Drifting into the present inside a past narrative.' },
          { wrong: 'She said she is tired.', right: 'She said she was tired.', why: 'In reported speech, backshift is the default unless the fact is still true and relevant.' },
          { wrong: 'The study showed that people forgot quickly. It also shows that...', right: '...It also showed that...', why: 'Keep the same frame when you continue describing the same study.' }
        ]
      }
    ],
    mini: {
      id: 'n3',
      title: 'A small point: articles with abstract nouns',
      explain: `<p>Look at <b>language attrition, the gradual loss of ability in a language</b> and <b>Recognition is generous.</b></p><p>When you talk about an abstract idea <b>in general</b> (language, memory, recognition, fluency, research), English uses <b>no article</b>. Use <b>the</b> when the noun is made specific, usually by a phrase or clause after it: <i>the loss <u>of ability</u></i>, <i>the woman <u>in the bakery</u></i>, <i>the German <u>I spoke at twenty-six</u></i>.</p><p>Portuguese uses the article with general abstract nouns (<i>a memória é...</i>), so this is one of the most persistent errors for Brazilian speakers, even at C1.</p>`,
      items: [
        { id: 'n3a', type: 'produce', q: `Correct if necessary: <i>The memory is not a recording.</i>`, model: [`Memory is not a recording.`], explain: `Memory in general: no article. <i>The memory</i> would mean one specific memory.` },
        { id: 'n3b', type: 'produce', q: `Correct if necessary: <i>Research on the attrition has grown since 1980s.</i>`, model: [`Research on attrition has grown since the 1980s.`], explain: `"Attrition" in general: no article. Decades take "the": <i>the 1980s</i>.` },
        { id: 'n3c', type: 'produce', q: `Correct if necessary: <i>Fluency I had in my twenties is gone.</i>`, model: [`The fluency I had in my twenties is gone.`], explain: `Here fluency is specific: defined by "I had in my twenties". Specific → <i>the</i>.` }
      ]
    }
  },

  /* ─────────────────────── STEAL ─────────────────────── */
  steal: {
    vocab: [
      { key: 'attrition', w: 'attrition', pron: '/əˈtrɪʃ.ən/', pos: 'noun, uncountable', def: 'The gradual reduction or weakening of something, especially through lack of use or through sustained pressure.', ctx: 'Linguists have a name for what was happening to me: language attrition, the gradual loss of ability in a language that is no longer used regularly.', ex: 'The company lost a third of its staff through attrition, simply by not replacing people who left.', col: ['language attrition', 'staff attrition', 'a war of attrition', 'the rate of attrition'], syn: ['erosion', 'gradual loss', 'wearing down'], note: 'Formal and academic. A "war of attrition" is a conflict won by exhausting the other side rather than defeating it quickly.' },
      { key: 'erode', w: 'erode', pron: '/ɪˈrəʊd/', pos: 'verb', def: 'To damage or weaken something gradually, often so slowly that it is hard to notice.', ctx: 'Something was eroding; something was gone.', ex: 'Years of small broken promises had quietly eroded her trust in him.', col: ['erode confidence / trust / support', 'gradually erode', 'be eroded by'], syn: ['wear away', 'undermine', 'weaken'], ant: ['strengthen', 'reinforce'], note: 'Literal (rock, coastlines) and figurative (trust, rights, authority). The figurative use is very common in journalism.' },
      { key: 'unsettling', w: 'unsettling', pron: '/ʌnˈset.əl.ɪŋ/', pos: 'adjective', def: 'Making you feel slightly worried or uncomfortable, often without a clear reason.', ctx: 'It is unsettling in a very specific way.', ex: 'There was something unsettling about how quiet the office was on a Monday morning.', col: ['deeply / strangely unsettling', 'an unsettling experience / question / feeling'], syn: ['disconcerting', 'unnerving'], ant: ['reassuring'], note: 'Weaker than "disturbing". It suggests unease rather than fear.' },
      { key: 'effortless', w: 'effortless / effortlessly', pron: '/ˈef.ət.ləs/', pos: 'adjective / adverb', def: 'Done without apparent effort; seeming easy.', ctx: 'Losing something you once did effortlessly feels different.', ex: 'Her effortless English hides years of deliberate practice.', col: ['seemingly effortless', 'effortless fluency / style', 'make it look effortless'], syn: ['easy', 'smooth', 'natural'], ant: ['laboured', 'strained'], note: '"Seemingly effortless" is useful for things that look easy but aren\'t.' },
      { key: 'retrieve', w: 'retrieve', pron: '/rɪˈtriːv/', pos: 'verb · noun: retrieval', def: 'To find and bring back something, such as information from memory.', ctx: 'You have to retrieve the word yourself, without a prompt, and put it into a sentence in real time.', ex: 'I knew her name perfectly well; I just couldn\'t retrieve it under pressure.', col: ['retrieve information / a memory / a word', 'retrieve something from memory', 'retrieval practice'], syn: ['recall', 'recover', 'access'], note: 'In psychology, "retrieval" is the technical term for getting information out of memory. "Retrieval practice" means testing yourself, which is exactly what the RETRIEVE stage of this book does.' },
      { key: 'deceptive', w: 'deceptive', pron: '/dɪˈsep.tɪv/', pos: 'adjective', def: 'Giving a false impression, not necessarily on purpose.', ctx: 'This is why attrition can be so deceptive.', ex: 'The task is deceptively simple: most people get the second part wrong.', col: ['deceptively simple', 'appearances can be deceptive', 'a deceptive impression'], syn: ['misleading'], note: 'Different from "deceitful", which describes people who lie deliberately. "Deceptive" often describes things and situations.' },
      { key: 'falter', w: 'falter', pron: '/ˈfɔːl.tər/', pos: 'verb', def: 'To lose strength, confidence or momentum; to hesitate or stumble while speaking.', ctx: 'You falter, you search, you settle for a simpler word.', ex: 'Her voice faltered when she got to the part about her father.', col: ['voice / confidence / economy falters', 'without faltering', 'begin to falter'], syn: ['hesitate', 'waver', 'stumble'], note: 'Common with voice, confidence, courage, the economy and growth.' },
      { key: 'settle-for', w: 'settle for', pos: 'phrasal verb', def: 'To accept something that is less than you wanted, because it is the best available.', ctx: 'You falter, you search, you settle for a simpler word.', ex: 'We couldn\'t find a flat near the park, so we settled for one near the station.', col: ['settle for less', 'settle for second best', 'refuse to settle for'], syn: ['make do with', 'accept'], note: 'Not the same as "settle on", which means to decide or choose.' },
      { key: 'residual', w: 'residual', pron: '/rɪˈzɪdʒ.u.əl/', pos: 'adjective', def: 'Remaining after most of something has gone.', ctx: 'What remained stayed remarkably stable for decades, a residual core that Bahrick called the "permastore".', ex: 'Even after the apology, there was some residual tension between them.', col: ['residual effect / risk / tension / knowledge'], syn: ['remaining', 'leftover', 'lingering'], note: 'Formal. Common in science and finance, but also useful for feelings.' },
      { key: 'resurface', w: 'resurface', pron: '/ˌriːˈsɜː.fɪs/', pos: 'verb', def: 'To appear again after being hidden or forgotten.', ctx: 'Then, in a matter of weeks, words begin to resurface that you had no idea you still had.', ex: 'Old tensions resurfaced as soon as the family sat down to dinner.', col: ['memories / doubts / problems resurface', 'resurface years later'], syn: ['re-emerge', 'reappear', 'come back'] },
      { key: 'interference', w: 'interference', pron: '/ˌɪn.təˈfɪə.rəns/', pos: 'noun', def: 'One thing disturbing or blocking another; in language learning, one language affecting your use of another.', ctx: '...interference from the language that now dominates their days...', ex: 'Many Brazilian learners\' mistakes with "for" and "since" come from interference from Portuguese.', col: ['interference from / with', 'political interference', 'without interference'], syn: ['disruption', 'intrusion', '(linguistics) transfer'], note: 'Usually negative in politics ("interference in someone\'s affairs"); neutral and technical in linguistics.' },
      { key: 'reassuring', w: 'reassuring', pron: '/ˌriː.əˈʃɔː.rɪŋ/', pos: 'adjective', def: 'Making you feel less worried.', ctx: 'Saying it is "gone" is, oddly, more reassuring than saying it is still there but unused.', ex: 'It\'s reassuring to know that the results can be checked independently.', col: ['reassuring to know', 'a reassuring presence / sign', 'find something reassuring'], syn: ['comforting', 'encouraging'], ant: ['unsettling', 'worrying'] },
      { key: 'dormant', w: 'dormant', pron: '/ˈdɔː.mənt/', pos: 'adjective', def: 'Inactive for a period, but able to become active again.', ctx: 'Dormant knowledge is an invitation, and invitations can be uncomfortable.', ex: 'The volcano has been dormant for three centuries.', col: ['lie dormant', 'remain dormant', 'a dormant talent / account / volcano'], syn: ['inactive', 'latent', 'sleeping'], ant: ['active'], note: 'The key word of this unit: dormant is not the same as dead.' },
      { key: 'humbling', w: 'humbling', pron: '/ˈhʌm.blɪŋ/', pos: 'adjective', def: 'Making you realise that you are less skilled or important than you thought.', ctx: '...checking them the next morning, which is humbling in a way I did not enjoy at first.', ex: 'Teaching my first C1 group was a humbling experience.', col: ['a humbling experience / reminder', 'deeply humbling', 'it is humbling to...'], syn: ['sobering', 'chastening'], note: 'Often neutral or positive: a humbling experience teaches you something.' },
      { key: 'clumsy', w: 'clumsy', pron: '/ˈklʌm.zi/', pos: 'adjective', def: 'Awkward and unskilful; of language, badly expressed.', ctx: 'I have started writing short, clumsy paragraphs in the evenings.', ex: 'The translation was accurate but clumsy; no native speaker would phrase it that way.', col: ['clumsy attempt / phrasing / wording', 'feel clumsy'], syn: ['awkward', 'stilted (for language)'], ant: ['elegant', 'graceful'] }
    ],
    chunks: [
      { key: 'tip-tongue', c: 'on the tip of my tongue', meaning: 'Almost remembered, but not quite possible to say.', func: 'Describing a retrieval failure', reg: 'Neutral · informal', ex: 'The actor\'s name is on the tip of my tongue. He was in that series about chess.',
        task: { id: 'c1', type: 'produce', q: `Rewrite using the chunk: <i>I almost remember her surname, but I can't say it.</i>`, model: [`Her surname is on the tip of my tongue.`] } },
      { key: 'first-glance', c: 'at first glance', meaning: 'When you first look, before examining something carefully.', func: 'Introducing a first impression that you will question', reg: 'Neutral · very common in essays', ex: 'At first glance, the data looks encouraging; the problem only appears when you compare regions.',
        task: { id: 'c2', type: 'mc', q: `Which sentence uses the chunk most naturally?`, options: [`At first glance, I have studied here for three years.`, `At first glance, the argument seems convincing, but it relies on a single study.`, `I saw him at first glance in the café.`], answer: 1, explain: `"At first glance" prepares a contrast between appearance and reality, typically followed by <i>but</i> or <i>however</i>.` } },
      { key: 'overlooked', c: 'what is often overlooked is (that)...', meaning: 'An important point that people tend not to notice.', func: 'Redirecting attention to a neglected point', reg: 'Formal · academic', ex: 'What is often overlooked is that most teachers are also learners.',
        task: { id: 'c3', type: 'produce', q: `Complete in your own words: <i>People talk a lot about speaking practice, but what is often overlooked is...</i>`, model: [`...that writing is where accuracy gets built, because it gives you time to notice your own mistakes.`] } },
      { key: 'distinction', c: 'to draw a distinction between X and Y', meaning: 'To show clearly that two things are different.', func: 'Structuring an argument', reg: 'Formal · academic', ex: 'It is important to draw a distinction between criticism and contempt.',
        task: { id: 'c4', type: 'produce', q: `Fill the gaps: <i>The writer ____ a clear ____ between recognising a word and retrieving it.</i>`, model: [`draws · distinction`], explain: `You can also <i>make</i> a distinction. Useful adjectives: a clear / sharp / useful / crucial distinction.` } },
      { key: 'out-of-use', c: 'to fall out of use', meaning: 'To stop being used.', func: 'Describing change over time', reg: 'Neutral', ex: 'Many regional words have fallen out of use in the past fifty years.',
        task: { id: 'c5', type: 'produce', q: `Rewrite: <i>People no longer use this expression.</i>`, model: [`This expression has fallen out of use.`], explain: `Related: <i>fall out of fashion</i>, <i>fall out of favour</i>.` } },
      { key: 'for-granted', c: 'to take something for granted', meaning: 'To fail to notice or value something because it has always been there.', func: 'Pointing to an unexamined assumption', reg: 'Neutral', ex: 'You take clean water for granted until the supply stops.',
        task: { id: 'c6', type: 'produce', q: `Put the words in order: <i>for / our first language / most of us / granted / take</i>`, model: [`Most of us take our first language for granted.`], explain: `Pattern: take + <b>object</b> + for granted. Also: <i>take it for granted that...</i>` } },
      { key: 'matter-of', c: 'in a matter of (days / weeks / hours)', meaning: 'In only a short time.', func: 'Emphasising speed', reg: 'Neutral', ex: 'The video spread across the country in a matter of hours.',
        task: { id: 'c7', type: 'produce', q: `Rewrite: <i>It only took a few days for the words to come back.</i>`, model: [`The words came back in a matter of days.`] } },
      { key: 'far-from', c: 'far from being...', meaning: 'Not at all; the opposite is closer to the truth.', func: 'Rejecting an idea forcefully', reg: 'Neutral · formal · argumentative', ex: 'Far from being a waste of time, the delay gave us a chance to rethink the plan.',
        task: { id: 'c8', type: 'produce', q: `Rewrite starting with <i>Far from being</i>: <i>Attrition is not a myth at all. It is well documented.</i>`, model: [`Far from being a myth, attrition is well documented.`] } },
      { key: 'little-reason', c: 'there is little reason to assume that...', meaning: 'The evidence does not really support this belief.', func: 'Challenging an assumption politely', reg: 'Formal', ex: 'There is little reason to assume that older learners cannot reach a high level.',
        task: { id: 'c9', type: 'mc', q: `Which meaning is closest?`, options: [`We have strong evidence that...`, `The evidence does not really support the idea that...`, `It is completely impossible that...`], answer: 1, explain: `"Little" (not "a little") is negative: almost no reason. It is a measured, hedged way of rejecting an idea, much more common in academic writing than "it's impossible".` } },
      { key: 'worth-considering', c: 'it is worth considering why / whether...', meaning: 'This deserves some thought.', func: 'Opening a new line of inquiry', reg: 'Neutral · formal', ex: 'It is worth considering whether the survey reached people without internet access.',
        task: { id: 'c10', type: 'produce', q: `Write a sentence with the chunk about something in your own teaching or learning.`, model: [`It is worth considering why students remember songs so much better than grammar rules.`] } },
      { key: 'underlying', c: 'the underlying issue is...', meaning: 'The real, deeper problem beneath the visible one.', func: 'Moving from symptom to cause', reg: 'Neutral · formal', ex: 'Students say they hate writing, but the underlying issue is that nobody has ever shown them how to revise.',
        task: { id: 'c11', type: 'produce', q: `Complete: <i>People say they "have no time" to read in English, but the underlying issue is...</i>`, model: [`...that reading in a second language still feels like work rather than pleasure.`] } },
      { key: 'certain-extent', c: 'to a certain extent', meaning: 'Partly, but not completely.', func: 'Hedging: partial agreement', reg: 'Neutral · formal', ex: 'To a certain extent, every translation is an interpretation.',
        task: { id: 'c12', type: 'mc', q: `"To a certain extent, that is what everyone who speaks a second language does on a bad day." What does the chunk signal?`, options: [`Complete agreement`, `Partial agreement, with limits`, `Strong disagreement`], answer: 1, explain: `It limits the claim. Related: <i>to some extent</i> (similar), <i>to a large extent</i> (mostly), <i>to what extent...?</i> (a classic essay question).` } }
    ],
    practice: [
      { id: 's1', type: 'match', title: 'Chunks and their functions', q: `Match each chunk to what it does in an argument.`,
        pairs: [
          ['at first glance', 'introduces an impression that will be questioned'],
          ['what is often overlooked is', 'redirects attention to a neglected point'],
          ['there is little reason to assume that', 'challenges a belief politely'],
          ['to a certain extent', 'agrees only partly'],
          ['far from being', 'rejects an idea and suggests the opposite'],
          ['the underlying issue is', 'moves from the symptom to the cause']
        ] },
      { id: 's2', type: 'group', title: 'Choose the natural collocation', items: [
        { id: 's2a', type: 'mc', q: `Her confidence began to ______ after the third rejection.`, options: ['erode', 'retrieve', 'resurface'], answer: 0, explain: `Confidence, trust and support <i>erode</i>. <i>Resurface</i> would mean it came back.` },
        { id: 's2b', type: 'mc', q: `The talent had lain ______ for years before she started painting again.`, options: ['residual', 'dormant', 'deceptive'], answer: 1, explain: `<i>Lie dormant</i> is a fixed collocation: inactive but still there.` },
        { id: 's2c', type: 'mc', q: `The task looks easy, but it is ______ simple: most people get it wrong.`, options: ['effortlessly', 'reassuringly', 'deceptively'], answer: 2, explain: `<i>Deceptively simple</i> = it looks simple but isn't. <i>Reassuringly simple</i> would mean it really is simple, which contradicts the second half.` },
        { id: 's2d', type: 'mc', q: `Old doubts ______ when she started teaching advanced groups.`, options: ['resurfaced', 'faltered', 'settled'], answer: 0, explain: `Doubts, memories and problems <i>resurface</i>: they come back after being hidden.` },
        { id: 's2e', type: 'mc', q: `We couldn't get tickets for Friday, so we ______ Sunday afternoon.`, options: ['settled on', 'settled for', 'settled with'], answer: 1, explain: `<i>Settle for</i> = accept something less than ideal. <i>Settled on</i> is possible but would only mean "chose", without the disappointment.` }
      ] },
      { id: 's3', type: 'group', title: 'Upgrade a basic sentence', lead: 'Rewrite each sentence using language from this unit. Then compare with the model: yours can be different and still be good.', items: [
        { id: 's3a', type: 'produce', q: `I forgot a lot of my Spanish.`, model: [`My Spanish hasn't disappeared so much as gone dormant: I can recognise far more than I can retrieve.`] },
        { id: 's3b', type: 'produce', q: `It was strange and a bit scary when I couldn't find the word.`, model: [`It was unsettling not to be able to retrieve such an ordinary word.`] },
        { id: 's3c', type: 'produce', q: `Some old words came back quickly.`, model: [`Some words I thought I had lost resurfaced in a matter of days.`] }
      ] }
    ]
  },

  /* ─────────────────────── THINK ─────────────────────── */
  think: {
    title: 'Claim, evidence, assumption, inference',
    lead: `Every argument in this book, including yours, is built from four kinds of material. Learning to tell them apart is the foundation for everything that comes later.`,
    defs: [
      { term: 'Claim', def: 'What the writer wants you to believe. It can be true or false, and it can be disputed.' },
      { term: 'Evidence', def: 'Information offered in support of a claim: data, observations, examples, testimony.' },
      { term: 'Inference', def: 'A conclusion drawn from evidence. It goes one step beyond what the evidence literally says.' },
      { term: 'Assumption', def: 'Something the argument takes for granted without stating it. Hidden assumptions are often where arguments are weakest.' }
    ],
    items: [
      { id: 't1', type: 'label', tag: 'Sort it', q: `Label each statement from the two texts.`, labels: ['Claim', 'Evidence', 'Inference', 'Assumption'],
        rows: [
          { text: `"Their knowledge dropped sharply in the first three to six years after they stopped studying."`, answer: 'Evidence', explain: `A report of what the study found. It describes data.` },
          { text: `"Much of what has disappeared is not the knowledge itself but the speed of access to it."`, answer: 'Claim', explain: `This is the essay's central claim: debatable, and the evidence is offered to support it.` },
          { text: `"In other words, the depth of the original learning mattered more than the time that had passed since."`, answer: 'Inference', explain: `"In other words" signals that the writer is drawing a conclusion from Bahrick's findings.` },
          { text: `Behind the sentence "I can't produce the word, so I've forgotten it": if I really know something, I can produce it on demand.`, answer: 'Assumption', explain: `Never stated, but needed for the conclusion to follow. The essay's whole point is to challenge it.` },
          { text: `"As adults, they could not identify Korean sentences any better than French people who had never heard the language."`, answer: 'Evidence', explain: `A finding from Pallier's study, used by the counterpoint.` },
          { text: `"A claim that fits every possible outcome ... isn't telling us very much."`, answer: 'Claim', explain: `The counterpoint's key claim about the metaphor, and one you could argue against.` }
        ] },
      { id: 't2', type: 'mc', tag: 'Find the hidden assumption', q: `A colleague says: <i>"I've spoken English at work every day for ten years, so my grammar must be accurate."</i> Which assumption does this depend on?`,
        options: [
          `That ten years is a long time.`,
          `That frequent use automatically produces accuracy.`,
          `That grammar matters at work.`,
          `That her colleagues speak English well.`
        ], answer: 1,
        explain: `The conclusion ("my grammar must be accurate") only follows if use leads to accuracy. But use builds fluency and automaticity; it can just as easily automate errors (this is sometimes called <i>fossilisation</i>). That's exactly the profile this book was designed for.` },
      { id: 't3', type: 'mc', tag: 'Does it follow?', q: `<i>"Bahrick's participants kept a stable core of Spanish for decades. Therefore, anyone who learns a language will keep it forever."</i> What is the main problem?`,
        options: [
          `Bahrick's study was too old to be trusted.`,
          `The conclusion goes far beyond the evidence: a specific group, a "core" rather than full ability, and "forever" rather than decades.`,
          `Spanish is easier to remember than other languages.`,
          `The argument uses a metaphor instead of data.`
        ], answer: 1,
        explain: `This is an overgeneralisation. The evidence is about school learners of Spanish, a residual core, over about 50 years. The conclusion extends it to <i>anyone</i>, <i>any language</i>, full ability, <i>forever</i>. Age alone doesn't make a study wrong (A).` },
      { id: 't4', type: 'open', tag: 'Weaken and strengthen', q: `What kind of evidence would <b>weaken</b> the main essay's claim that most attrition is a problem of access rather than storage? What would <b>strengthen</b> it? Describe one piece of each.`,
        guide: [`Weaken: people who, even after long and intensive relearning, never recover specific items or structures faster than new learners.`, `Strengthen: a study showing that "forgotten" words are relearned much faster than new, matched words.`, `Notice: the counterpoint's Korean adoptee study (2003) is a partial weakener; the 2017 study is a partial strengthener.`] },
      { id: 't5', type: 'open', tag: 'Apply it to yourself', q: `Describe one moment when you "couldn't" say something in English that you know you know. Offer two interpretations (storage and access). What evidence, from your own life, would help you decide between them?`, rows: 6,
        guide: [`A good answer separates the observation (what happened) from the interpretation (what it means).`, `Possible evidence: does the item come back when you see it? Does it come back when you are relaxed? Do you produce it correctly in writing but not in speech?`] }
    ]
  },

  /* ─────────────────────── WRITE ─────────────────────── */
  write: {
    focus: {
      title: 'Writing focus · A clear main idea',
      text: `Before anything else, a reader needs to know what you think. A main idea is not a topic ("language attrition") or a question ("Can we forget a language?"). It is a statement someone could disagree with.`,
      weak: `In this text I will talk about the idea of forgetting a language, which is very interesting and has different points of view.`,
      strong: `The dormant-language metaphor is useful not because it is accurate, but because it makes people more willing to return.`
    },
    items: [
      { id: 'w1', type: 'writing', kind: 'Short response', title: 'Is the metaphor too comforting?', min: 120, max: 200,
        prompt: `The counterpoint argues that "it's all still in there" is too comforting to be useful, and that we should describe what remains as "a head start, not a hidden inheritance". Do you agree? Respond with <b>one clear main idea</b>, stated in your first two sentences.`,
        support: [`State your position early.`, `Engage with the counterpoint's strongest point, not its weakest.`, `Use at least one example (from the texts or from your life).`],
        guide: [`A strong response takes a position that could be disputed, not "both sides have a point".`, `It deals with the "unfalsifiable" objection or the "savings ≠ knowing" objection directly.`, `It may distinguish between whether a metaphor is <i>true</i> and whether it is <i>useful</i>.`] },
      { id: 'w2', type: 'writing', kind: 'Reflective essay', title: 'Something that went quiet', min: 300, max: 500, main: true,
        prompt: `Write about a language, a skill or a version of yourself that has <b>gone quiet</b>, or one you're afraid might. Begin with one specific moment, then move into reflection: what did that moment reveal? Is what went quiet gone, dormant, or something else?`,
        support: [`Use the Past Simple for the moment, the Present Perfect for what has happened since, and the present for what you think now.`, `Use at least three chunks from this unit.`, `Aim for one clear main idea, even in a personal essay.`],
        guide: [`The opening moment should be concrete: a place, a sentence, a physical detail.`, `The reflection should say something the moment alone doesn't: why it mattered.`, `Strong endings return to an image or offer a new understanding, rather than summarising.`] }
    ]
  },

  /* ─────────────────────── EDIT ─────────────────────── */
  edit: {
    draftOf: 'w2',
    checklist: [
      'Can I state my main idea in one sentence? Is that sentence actually in the essay?',
      'Does my opening moment lead into the reflection, or is it just decoration?',
      'Past Simple for finished moments, Present Perfect for what connects to now: did I choose each time?',
      'Did I change tense only when the time frame changes?',
      'Are "for" and "since" used correctly?',
      'Abstract nouns in a general sense (memory, language, fluency): did I avoid "the"?',
      'Did I use at least three chunks from this unit, and do they sound natural where they are?',
      'Did I repeat "forget", "lose" or "English" too often? Could vocabulary from this unit replace some of them?',
      'Is there a sentence that says the same thing as the one before it?',
      'Does this sound like me, or like an exam answer?'
    ],
    challenges: [
      'Cut 10% of the words without losing meaning.',
      'Replace five vague words (thing, good, bad, very, a lot).',
      'Add one sentence that acknowledges the other side: maybe it really is gone.',
      'Rewrite the opening so it begins inside the moment, not before it.',
      'Replace three basic verbs (get, have, do, make) with more precise ones.',
      'End with an image instead of a summary.'
    ],
    revised: { id: 'w2r', type: 'writing', kind: 'Reflective essay · revised', title: 'Something that went quiet · second draft', min: 300, max: 500, revisionOf: 'w2',
      prompt: `Paste or rewrite your essay here after applying the checklist and your chosen challenges.` }
  },

  /* ─────────────────────── RETRIEVE ─────────────────────── */
  retrieve: {
    lead: `Close the book. Don't scroll up. Retrieval is effortful on purpose: the effort is what makes the language yours.`,
    items: [
      { id: 'r1', type: 'open', q: 'Write 8 vocabulary items you remember from this unit.', rows: 3 },
      { id: 'r2', type: 'open', q: 'Write 5 chunks you remember.', rows: 3 },
      { id: 'r3', type: 'open', q: 'Use 3 of those chunks in new sentences of your own.', rows: 4 },
      { id: 'r4', type: 'open', q: 'Explain the main argument of the main reading, and the counterpoint\'s main objection.', rows: 4 },
      { id: 'r5', type: 'open', q: 'Reconstruct one grammar pattern from memory: when do you use the Present Perfect rather than the Past Simple?', rows: 3 },
      { id: 'r6', type: 'open', q: 'Explain the distinction between evidence and inference in your own words, then apply it to a new micro-case: a colleague hesitates for three seconds before answering a question in a meeting. What is the evidence, and what would be an inference?', rows: 4 },
      { id: 'r7', type: 'open', q: 'Write a 100-word summary of the unit.', rows: 5, target: [90, 110] },
      { id: 'r8', type: 'open', q: 'Go back to what you wrote in KNOW. Has your view changed? What changed it?', rows: 3 },
      { id: 'r9', type: 'open', q: 'Write one question this unit left unanswered.', rows: 2 }
    ],
    reveal: {
      summary: `<p><b>Main argument:</b> what feels like forgetting a language is often a loss of access (speed, automaticity) rather than a loss of knowledge. Evidence: Bahrick's "permastore" and Ebbinghaus's "savings".</p><p><b>Counterpoint:</b> the "it's all still there" metaphor can't be proven false, and relearning faster is not the same as knowing. A head start, not a hidden inheritance.</p><p><b>Grammar:</b> Past Simple for a closed time frame; Present Perfect for a time frame still open to now (life experience, unfinished periods, present relevance). Change tense only when the time frame changes. No article for abstract nouns in a general sense.</p><p><b>Thinking Lab:</b> claim, evidence, inference, assumption. Evidence is the directly observable record (the 3-second pause); an inference goes beyond the data (inferring uncertainty, incompetence, or careful thought). Hidden assumption of the unit: "if I know it, I can produce it on demand."</p>`
    }
  }
});
