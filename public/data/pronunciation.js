/* PRONUNCIATION IN CONTEXT · Units 01–10
   One small focus per unit, taken from that unit's own reading, vocabulary, chunks,
   grammar, listening or speaking. It is shown inside STEAL; it is not a stage.

   IPA: broad phonemic transcription with British English (southern standard) as the
   reference, because the course texts use British spelling. `us` gives the General
   American form only where it differs in a way worth noticing. Where varieties differ,
   `variety` says so; neither form is presented as the only correct one.

   `listen` points to an EXISTING recording only. Its `phrase` must occur verbatim in
   that activity's transcript, and it is offered only when the audio is ready. */
window.KLANG = window.KLANG || {};

(function (K) {
  'use strict';

  K.pronunciation = {
    '01': {
      focus: 'Contracted <i>have</i> in the Present Perfect',
      tags: ['weak forms', 'contractions'],
      why: 'In the Present Perfect, <i>have</i>/<i>has</i> is an auxiliary, so in ordinary speech it is unstressed: <i>I’ve</i> /aɪv/, <i>has</i> /həz/ or /əz/, and <i>been</i> is usually weak /bɪn/. The whole difference between a Past Simple and a Present Perfect sentence can be one short /v/.',
      listenFor: 'A /v/ glued to the pronoun with no vowel after it, and the beat falling on the participle (for<b>GOT</b>ten), not on <i>have</i>.',
      items: [
        { text: 'I’ve forgotten my German.', ipa: '/aɪv fəˈɡɒtn maɪ ˈdʒɜːmən/', us: '/aɪv fərˈɡɑːtn maɪ ˈdʒɝːmən/', src: 'Reading · Listening 2' },
        { text: 'I have read more German this year…', ipa: '/aɪv ˈred mɔː ˈdʒɜːmən ðɪs ˈjɪə/', src: 'Reading', note: '<i>read</i> is /red/ here (participle). With identical forms, /v/ is the only clue: <i>I read it</i> × <i>I’ve read it</i>.' },
        { text: '…a garden that has been left alone for a few years.', ipa: '/ə ˈɡɑːdn ðət əz bɪn ˈleft əˈləʊn/', src: 'Reading', note: '<i>has</i> → /əz/, <i>been</i> → /bɪn/: both nearly disappear; <i>left</i> and <i>alone</i> carry the beats.' },
        { text: 'What I have stopped doing is describing myself…', ipa: '/ˈwɒt aɪv ˈstɒpt ˈduːɪŋ/', src: 'Reading', note: '<i>stopped</i> is one syllable: /stɒpt/.' },
        { text: 'I have lived in São Paulo for eleven years.', ipa: '/aɪv ˈlɪvd ɪn ˌsaʊ ˈpaʊləʊ fər ɪˈlevn ˈjɪəz/', src: 'Notice' }
      ],
      brazil: 'Portuguese has no reduced auxiliary like <i>’ve</i>, so two habits are common: saying a full, stressed <i>I HAVE</i> every time (correct but heavy), or dropping it (<i>I forgotten</i>). Aim for the light /v/.',
      also: '<b>strict</b> /strɪkt/ in Listening 1 is one syllable: no vowel before /s/ and none after /kt/ — not [isˈtɾiktʃi].',
      listen: [
        { lid: 'l2', phrase: 'I\'ve forgotten my German', cue: 'Speaker B, explaining why that sentence can be misleading' },
        { lid: 'l1', phrase: 'the word strict', cue: 'the opening story' }
      ],
      task: {
        q: 'Say each pair aloud, keeping the /v/ light but audible: <i>I forgot the word</i> / <i>I’ve forgotten the word</i> · <i>I read it</i> / <i>I’ve read it</i> · <i>It was dormant</i> / <i>It’s been dormant</i>. Which pair is hardest to hear, and what else (besides /v/) tells a listener which tense it is?',
        model: 'With <i>forget</i>, the participle itself helps (<i>forgot</i> × <i>forgotten</i>). With <i>read</i>, the forms are identical, so /v/ is the only clue: /aɪ ˈred ɪt/ × /aɪv ˈred ɪt/. <i>It’s been</i> = /ɪts bɪn/, where ’s is <i>has</i>, not <i>is</i>.',
        explain: 'Context (a finished time expression, <i>yesterday</i>, <i>in 2014</i>) also tells the listener which tense to expect.'
      }
    },

    '02': {
      focus: 'Word stress in Portuguese–English cognates',
      tags: ['word stress', 'schwa'],
      why: 'Latin-based words look familiar, and that is the trap: English often stresses a different syllable from Portuguese, and the unstressed syllables shrink to /ə/ or /ɪ/. Misplaced stress costs more intelligibility than a slightly different vowel.',
      listenFor: 'One strong syllable per word; the others are short and central.',
      items: [
        { text: 'repertoire', ipa: '/ˈrepətwɑː/', us: '/ˈrepərtwɑːr/', src: 'Reading · Listening 1', note: '<b>RE</b>-per-toire, not reper-<b>TOIRE</b>.' },
        { text: 'affordance', ipa: '/əˈfɔːdəns/', us: '/əˈfɔːrdəns/', src: 'Reading · Listening 1', note: 'Both <i>af-</i> and <i>-ance</i> are schwa.' },
        { text: 'resonance', ipa: '/ˈrezənəns/', src: 'Know', note: '<b>RE</b>-so-nance, with /z/.' },
        { text: 'salient', ipa: '/ˈseɪliənt/', src: 'Reading · Steal', note: '<b>SAY</b>-li-ent: /eɪ/ in the stressed syllable.' },
        { text: 'personalities', ipa: '/ˌpɜːsəˈnælətiz/', us: '/ˌpɝːsəˈnælətiz/', src: 'Listening 1', note: '<i>-ity</i> puts the stress just before it: perso<b>NAL</b>ities.' },
        { text: 'exaggeration', ipa: '/ɪɡˌzædʒəˈreɪʃn/', src: 'Listening 1', note: '<i>-ation</i> takes the main stress; <i>x</i> is /ɡz/.' }
      ],
      variety: '<b>migrate</b>: British English usually /maɪˈɡreɪt/, American English /ˈmaɪɡreɪt/. Both are standard.',
      brazil: '<i>repertório, ressonância, personalidades, exagero</i>: Portuguese stress habits transfer easily to the English cognate, and the unstressed English syllables stay too full.',
      listen: [
        { lid: 'l1', phrase: 'We switch repertoires', cue: 'the final sentence' },
        { lid: 'l1', phrase: 'the linguistic affordance of the room', cue: 'near the end' }
      ],
      task: {
        q: 'Before checking, mark the stressed syllable in <i>repertoire, affordance, resonance, salient, personality, migrate</i>. Then read aloud the reading’s sentence: <i>“What began as two personalities now feels more like one expanding repertoire.”</i>',
        model: '<b>RE</b>pertoire · af<b>FOR</b>dance · <b>RE</b>sonance · <b>SA</b>lient · perso<b>NA</b>lity · mi<b>GRATE</b> (UK) / <b>MI</b>grate (US). Beats in the sentence: be<b>GAN</b> · <b>TWO</b> · perso<b>NAL</b>ities · <b>FEELS</b> · <b>ONE</b> · ex<b>PAND</b>ing · <b>RE</b>pertoire.',
        explain: 'Content words carry the beats; <i>as, now, more like</i> stay light.'
      }
    },

    '03': {
      focus: 'Past-tense <i>-ed</i>: /t/, /d/ or /ɪd/',
      tags: ['suffixes', 'consonant clusters'],
      why: 'Narrative lives in the past tense, and in speech the past tense is often a single final consonant. <i>-ed</i> is /ɪd/ only after /t/ or /d/. After other voiceless sounds it is /t/; after voiced sounds it is /d/. It never adds a syllable to <i>wrapped</i> or <i>remembered</i>.',
      listenFor: 'Count syllables: <i>wrapped</i> = 1, <i>remembered</i> = 3, <i>reconstructed</i> = 4.',
      items: [
        { text: 'I remembered the coat as blue.', ipa: '/aɪ rɪˈmembəd ðə ˈkəʊt əz ˈbluː/', us: '/aɪ rɪˈmembərd ðə ˈkoʊt əz ˈbluː/', src: 'Reading', note: '/d/ after a voiced sound.' },
        { text: '…a cheese sandwich wrapped in paper', ipa: '/ˈræpt ɪn ˈpeɪpə/', src: 'Reading', note: '/t/ after /p/, linked straight into <i>in</i>: [ˈræp tɪn].' },
        { text: '…and I had refused to eat the crusts.', ipa: '/aɪd rɪˈfjuːzd tʊ ˈiːt ðə ˈkrʌsts/', src: 'Reading', note: '<i>crusts</i> /krʌsts/ ends in three consonants; don’t add a vowel.' },
        { text: 'Investigators reconstructed the sequence.', ipa: '/ˌriːkənˈstrʌktɪd/', src: 'Steal', note: '/ɪd/ after /t/.' },
        { text: 'Two messages corroborated her account.', ipa: '/kəˈrɒbəreɪtɪd/', us: '/kəˈrɑːbəreɪtɪd/', src: 'Steal', note: 'In American English this /t/ is often a quick flap.' },
        { text: 'Certainty dissolved under scrutiny.', ipa: '/dɪˈzɒlvd/', us: '/dɪˈzɑːlvd/', src: 'Steal', note: '/lvd/ with no vowel in between.' }
      ],
      brazil: 'Two opposite habits: turning every <i>-ed</i> into an extra syllable (<i>wrap-ed</i>), or dropping it, which quietly moves the story into the present. A third: adding a vowel after the ending ([ˈræpti]).',
      variety: '<b>smelled</b> /smeld/ is usual everywhere; British English also uses <b>smelt</b> /smelt/.',
      task: {
        q: 'Sort these verbs from the unit by ending — /t/, /d/ or /ɪd/: <i>remembered, wrapped, refused, reconstructed, smelled, dissolved, misattributed, corroborated, asked</i>. Then retell the Blue Coat scene aloud in three sentences, with every ending audible but no extra syllable.',
        model: '/d/: remembered, refused, smelled, dissolved · /t/: wrapped, asked · /ɪd/: reconstructed, misattributed, corroborated.',
        explain: '<i>asked</i> /ɑːskt/ (US /æskt/) is one syllable; in fast speech it often simplifies to [ɑːst], but never [ˈɑːskɪd].'
      }
    },

    '04': {
      focus: 'Stress shift in word families',
      tags: ['suffix stress', 'stress shift'],
      why: 'Some suffixes move the stress: <i>-ial, -ion, -ity</i> put it on the syllable just before the suffix. Others, like <i>-ive</i>, keep the stem’s stress but can change its vowel. The unit’s reasoning vocabulary is full of these families.',
      listenFor: 'The beat jumping to a new syllable (<b>CON</b>sequence → conse<b>QUEN</b>tial), and vowels changing even when the beat stays (re<b>VISE</b> → re<b>VI</b>sion).',
      items: [
        { text: 'consequence → consequential', ipa: '/ˈkɒnsɪkwəns/ → /ˌkɒnsɪˈkwenʃl/', us: '/ˈkɑːnsəkwens/ → /ˌkɑːnsəˈkwenʃl/', src: 'Reading', note: '“…we make consequential choices.”' },
        { text: 'revise → revision', ipa: '/rɪˈvaɪz/ → /rɪˈvɪʒn/', src: 'Reading', note: 'Same stressed syllable, but /aɪ/ → /ɪ/ and /z/ → /ʒ/.' },
        { text: 'redeem → redemptive', ipa: '/rɪˈdiːm/ → /rɪˈdemptɪv/', src: 'Know · Reading', note: 'Stress stays; /iː/ shortens to /e/, then /mpt/.' },
        { text: 'integrate → integration', ipa: '/ˈɪntɪɡreɪt/ → /ˌɪntɪˈɡreɪʃn/', src: 'Reading', note: '“…hard-won integration.”' },
        { text: 'legible → legibility', ipa: '/ˈledʒəbl/ → /ˌledʒəˈbɪləti/', src: 'Counterpoint · Unit 08', note: '<i>legibility</i> returns as key vocabulary in Unit 08.' }
      ],
      also: '<b>hard-won</b> /ˌhɑːdˈwʌn/: <i>won</i> sounds exactly like <i>one</i>.',
      brazil: 'Cognates again pull towards Portuguese stress (<i>consequência, revisão, integração</i>), and the vowel changes inside English families (<i>redeem → redemptive</i>) have no Portuguese equivalent.',
      task: {
        q: 'Say each pair and tap the stressed syllable: <i>consequence – consequential · revise – revision · integrate – integration · legible – legibility</i>. Then read aloud: <i>“Lives are shaped by conditions we did not choose, and within those conditions we make consequential choices.”</i>',
        model: '<b>CON</b>sequence – conse<b>QUEN</b>tial · re<b>VISE</b> – re<b>VI</b>sion · <b>IN</b>tegrate – inte<b>GRA</b>tion · <b>LE</b>gible – legi<b>BI</b>lity. Sentence beats: <b>LIVES</b> · <b>SHAPED</b> · con<b>DI</b>tions · <b>CHOOSE</b> · con<b>DI</b>tions · conse<b>QUEN</b>tial <b>CHOI</b>ces.',
        explain: 'The rule for <i>-ion/-ial/-ity</i> is very reliable; check any new family member against it.'
      }
    },

    '05': {
      focus: '<i>used to</i> /ˈjuːstə/ and weak <i>would</i>',
      tags: ['connected speech', 'weak forms'],
      why: 'In <i>used to</i> (past habit) and <i>be used to</i> (familiarity), <i>used</i> has /s/, not /z/, and its /t/ merges with <i>to</i>: /ˈjuːstə/. The ordinary verb <i>use</i> keeps /z/: <i>used</i> /juːzd/. In the future in the past, <i>would</i> is usually weak /wəd/ or <i>’d</i>.',
      listenFor: 'One /st/ in the middle of <i>used to</i>, and <i>to</i> reduced to /tə/.',
      items: [
        { text: 'I used to think fast walking signalled anxiety.', ipa: '/aɪ ˈjuːstə ˈθɪŋk/', src: 'Reading' },
        { text: 'He said, “You used to know what things cost.”', ipa: '/ju ˈjuːstə ˈnəʊ/', us: '/ju ˈjuːstə ˈnoʊ/', src: 'Reading' },
        { text: 'I was used to walking to services…', ipa: '/aɪ wəz ˈjuːstə ˈwɔːkɪŋ/', src: 'Reading', note: 'Same /s/ in <i>be used to</i>; <i>was</i> → /wəz/.' },
        { text: '…knowledge … can be used badly.', ipa: '/kən bi ˈjuːzd ˈbædli/', src: 'Reading', note: 'Here <i>use</i> is the normal verb: /z/ and /d/.' },
        { text: 'By sunset I would be flying south.', ipa: '/baɪ ˈsʌnset aɪ wəd bi ˈflaɪɪŋ ˈsaʊθ/', src: 'Reading', note: 'Or <i>I’d be flying</i> /aɪd bi/.' }
      ],
      brazil: 'Reading <i>used to</i> letter by letter gives something like [ˈjuzdʒi tu]: /z/, an extra vowel and a full <i>to</i>.',
      task: {
        q: 'Write /s/ or /z/ for each <i>use</i>, then read the sentences aloud: (a) <i>I photographed streets I used to cross without looking.</i> (b) <i>I was used to walking to services that now required a car.</i> (c) <i>…the knowledge arrives unevenly and can be used badly.</i> (d) <i>The cinema used to be on the corner.</i>',
        model: '(a) /s/ — used to · (b) /s/ — be used to · (c) /z/ — passive of the verb <i>use</i> · (d) /s/ — used to.',
        explain: 'Grammar decides the sound: habit/familiarity = /s/; the verb “to use” = /z/.'
      }
    },

    '06': {
      focus: 'Weak <i>can</i>, strong <i>can’t</i> / <i>cannot</i>',
      tags: ['weak forms', 'sentence stress'],
      why: 'In affirmative sentences <i>can</i> is usually weak /kən/ and the main verb carries the beat. <i>Can’t</i> and <i>cannot</i> are stressed. Because the final /t/ of <i>can’t</i> is often not released, listeners rely on the vowel and the stress more than on /t/ — and so should you when you speak.',
      listenFor: 'Affirmative: a short /kən/ and a beat on the verb. Negative: a full vowel and a beat on <i>can’t</i>.',
      items: [
        { text: 'We can be attached to someone who diminishes us.', ipa: '/wi kən bi əˈtætʃt/', src: 'Reading', note: 'The beat is on at<b>TACHED</b>.' },
        { text: 'Idealisation can help a bond begin.', ipa: '/aɪˌdɪəlaɪˈzeɪʃn kən ˈhelp ə ˈbɒnd bɪˈɡɪn/', src: 'Reading' },
        { text: '…care cannot be audited gesture by gesture.', ipa: '/ˈkeə ˈkænɒt bi ˈɔːdɪtɪd/', us: '/ˈker ˈkænɑːt bi ˈɑːdətɪd/', src: 'Reading', note: '<i>cannot</i> is stressed (also heard as /ˈkænət/).' },
        { text: 'Reduced intensity need not mean reduced love.', ipa: '/ˈniːd ˈnɒt miːn/', src: 'Reading', note: 'In <i>need not</i>, <b>NOT</b> is prominent.' },
        { text: 'That statement can’t be universally true.', ipa: '/ˈðæt ˈsteɪtmənt ˈkɑːnt bi/', us: '/ˈkænt/', src: 'Listening 2 (script)' }
      ],
      variety: '<b>can’t</b> is /kɑːnt/ in southern British English and /kænt/ in American English (and in much of northern England). Stressed <i>can</i> is /kæn/ in both. Neither is more correct; with American speakers, stress and vowel length matter even more.',
      brazil: 'A full, nasal [kẽ] in every position can make an affirmative sound like <i>can’t</i>, especially to American listeners, whose <i>can’t</i> vowel is similar.',
      task: {
        q: 'Say each sentence twice — first affirmative, then negative: <i>We can be attached to someone who diminishes us</i> / <i>We can’t be…</i>; <i>Idealisation can help a bond begin</i> / <i>…can’t help…</i>. Where exactly is the difference?',
        model: 'Affirmative: /wi kən bi əˈtætʃt/ — short <i>can</i>, beat on -<b>TACHED</b>. Negative: /wi ˈkɑːnt bi əˈtætʃt/ (UK) or /wi ˈkænt bi əˈtætʃt/ (US) — <i>can’t</i> has a full vowel and its own beat.',
        explain: 'If you rely only on /t/, the contrast often disappears in fast speech.'
      }
    },

    '07': {
      focus: 'Modal perfects in connected speech',
      tags: ['weak forms', 'connected speech'],
      why: 'In modal perfects, <i>have</i> is an unstressed /əv/ attached to the modal: <i>might have</i> → /ˈmaɪtəv/, <i>should have</i> → /ˈʃʊdəv/. The beats fall on the modal and on the participle. Hearing /əv/ quickly is what lets you follow speculation and blame in real time.',
      listenFor: 'Modal + /əv/ as one unit, then a beat on the participle: <b>MIGHT</b>’ve <b>BEEN</b>, <b>SHOULD</b>’ve <b>SPO</b>ken.',
      items: [
        { text: 'She might have been trying to protect me.', ipa: '/ʃi ˈmaɪtəv bɪn ˈtraɪɪŋ tə prəˈtekt mi/', src: 'Notice' },
        { text: 'I may have made each cancellation heavier.', ipa: '/aɪ ˈmeɪəv ˈmeɪd iːtʃ ˌkænsəˈleɪʃn ˈheviə/', src: 'Notice' },
        { text: 'Júlia must have noticed the coldness.', ipa: '/ˈmʌstəv ˈnəʊtɪst ðə ˈkəʊldnəs/', us: '/ˈmʌstəv ˈnoʊtɪst ðə ˈkoʊldnəs/', src: 'Reading', note: '<i>noticed</i> ends in /t/.' },
        { text: 'We should have spoken earlier.', ipa: '/wi ˈʃʊdəv ˈspəʊkən ˈɜːliə/', us: '/wi ˈʃʊdəv ˈspoʊkən ˈɝːliər/', src: 'Reading' },
        { text: 'I could have said I was afraid of becoming optional.', ipa: '/aɪ ˈkʊdəv ˈsed/', src: 'Reading' }
      ],
      variety: 'In American English the /t/ of <i>might have</i> is usually a flap, [ˈmaɪɾəv]; in British English it may be a clear or a glottal /t/.',
      brazil: 'Because /əv/ sounds like <i>of</i>, even native writers produce <i>could of</i>. In writing it is always <i>have</i> or <i>’ve</i>. In speech, the common Brazilian pattern is the opposite: a full, stressed <i>HAVE</i> that makes the sentence sound slow and emphatic.',
      task: {
        q: 'Write the spoken contracted form, then say it: <i>might have been · may have made · must have noticed · should have spoken · can’t have known</i>. Finally, correct: <i>We should of spoken earlier.</i>',
        model: 'might’ve been /ˈmaɪtəv bɪn/ · may’ve made /ˈmeɪəv ˈmeɪd/ · must’ve noticed /ˈmʌstəv ˈnəʊtɪst/ · should’ve spoken /ˈʃʊdəv ˈspəʊkən/ · can’t have known /ˈkɑːnt əv ˈnəʊn/ (US /ˈkænt/). Correction: <i>We should have (should’ve) spoken earlier.</i>',
        explain: '<i>of</i> is a spelling of the weak sound, not of the grammar.'
      }
    },

    '08': {
      focus: 'Relative clauses you can hear',
      tags: ['intonation', 'rhythm'],
      notation: '<b>|</b> marks a break between intonation units; <b>CAPITALS</b> mark the main stress in each unit.',
      why: 'A non-defining clause is spoken as its own intonation unit — a short break before and after, often on a lower, quicker pitch, like a spoken parenthesis. A defining clause runs on without a break, because it identifies the noun. In speech, this is how a listener knows whether <i>all</i> the guests smiled or only some of them.',
      listenFor: 'Is there a break before <i>who/which</i>? Does the clause drop in pitch and speed up?',
      items: [
        { text: 'The guests who knew them smiled.', ipa: '| the guests who knew them SMILED |', src: 'Notice', note: 'Defining: one unit — only some guests.' },
        { text: 'The guests, who knew them, smiled.', ipa: '| the GUESTS | who KNEW them | SMILED |', src: 'Notice', note: 'Non-defining: three units — all the guests.' },
        { text: 'The photograph, which now sits at home, needs no footnote.', ipa: '| the PHOtograph | which now sits at HOME | needs no FOOTnote |', src: 'Notice' },
        { text: '…onto the people who left those traces.', ipa: '| …onto the people who left those TRACES |', src: 'Reading', note: 'No break before <i>who</i>: it tells us which people.' }
      ],
      brazil: 'This works much as with Portuguese <i>orações restritivas</i> and <i>explicativas</i>, so the principle transfers well. The useful habit is the reverse direction: read a sentence aloud to decide whether it needs commas when you write.',
      task: {
        q: 'Read each version aloud and explain the difference in meaning: <i>The guests who knew them smiled</i> / <i>The guests, who knew them, smiled.</i> Then read <i>“It is tempting to place present identities directly onto the people who left those traces.”</i> — why would a break before <i>who</i> sound wrong?',
        model: 'One unit: only the guests who knew the couple smiled; others may not have. Three units: all the guests smiled, and all of them knew the couple. A break before <i>who left those traces</i> would turn an identifying clause into a comment about all people.',
        explain: 'Commas in writing and breaks in speech carry the same grammatical meaning here.'
      }
    },

    '09': {
      focus: '<i>’d</i> = <i>had</i> or <i>would</i>? Contractions in conditionals',
      tags: ['contractions', 'weak forms', 'consonant clusters'],
      why: 'In third and mixed conditionals, <i>had</i> and <i>would</i> are both unstressed and both contract to <i>’d</i>. What follows tells you which: <i>’d</i> + past participle = <i>had</i>; <i>’d</i> + base form = <i>would</i>. <i>Would have</i> becomes /ˈwʊdəv/ (<i>would’ve</i>).',
      listenFor: 'The verb form right after <i>’d</i>: <i>I’d left</i> (had) × <i>I’d be</i> (would).',
      items: [
        { text: 'If I had left earlier, I would be safer now.', ipa: '/ɪf aɪd ˈleft ˈɜːliə | aɪd bi ˈseɪfə ˈnaʊ/', us: '/ɪf aɪd ˈleft ˈɝːliər | aɪd bi ˈseɪfər ˈnaʊ/', src: 'Notice', note: 'First <i>’d</i> = had (+ <i>left</i>); second <i>’d</i> = would (+ <i>be</i>).' },
        { text: 'If she had called it tuition, she might have stopped sooner.', ipa: '/ɪf ʃiːd ˈkɔːld ɪt tjuˈɪʃn | ʃi ˈmaɪtəv ˈstɒpt ˈsuːnə/', us: '/… tuˈɪʃn … ˈstɑːpt ˈsuːnər/', src: 'Notice', note: '<i>tuition</i>: UK /tjuˈɪʃn/ (also /tʃuˈɪʃn/), US /tuˈɪʃn/.' },
        { text: 'I wish I had asked for an inspection.', ipa: '/aɪ ˈwɪʃ aɪd ˈɑːskt fər ən ɪnˈspekʃn/', us: '/… ˈæskt …/', src: 'Notice', note: '<i>asked</i> is one syllable; /skt/ may simplify to [st] in fast speech.' },
        { text: '“Then everything we’ve paid will have been for nothing.”', ipa: '/wiːv ˈpeɪd wɪl əv bɪn fə ˈnʌθɪŋ/', src: 'Reading', note: 'Three light syllables before <b>NOTH</b>ing.' }
      ],
      brazil: 'Portuguese keeps auxiliaries as full syllables (<i>eu teria</i>, <i>se eu tivesse</i>), so <i>’d</i> is easy to miss when listening — and a full <i>I would have</i> in speech can sound more emphatic than intended.',
      task: {
        q: 'Decide whether each <i>’d</i> is <i>had</i> or <i>would</i>, then say the sentences: (a) <i>If we’d stepped back earlier, we’d have saved money.</i> (b) <i>If I’d known, I’d be somewhere else now.</i> (c) <i>I wish I’d asked.</i>',
        model: '(a) had · would (<i>we’d have saved</i> = would have saved) · (b) had · would · (c) had.',
        explain: 'After <i>wish</i>, <i>’d</i> + participle is always <i>had</i>.'
      }
    },

    '10': {
      focus: 'Contrastive stress: where the evidence ends and the speaker begins',
      tags: ['contrastive stress', 'intonation'],
      notation: '<b>CAPITALS</b> mark the main stress.',
      why: 'English normally puts the main stress on the last content word. Moving it creates contrast — or doubt. With reporting verbs this matters: <i>He said he was TIRED</i> reports neutrally; <i>He SAID he was tired</i> suggests you don’t fully believe it. Stress is part of distancing language in speech.',
      listenFor: 'Where the strongest syllable falls, and whether it is on a reporting verb.',
      items: [
        { text: 'where the evidence ends and the speaker begins', ipa: '| where the EVidence ENDS | and the SPEAKer beGINS |', src: 'Steal · Reading', note: '<i>evidence</i> /ˈevɪdəns/; the two nouns contrast.' },
        { text: 'He said that he was tired.', ipa: 'neutral: | he said that he was TIRED |  ·  doubtful: | he SAID that he was tired |', src: 'Notice' },
        { text: 'It has been alleged that records were hidden.', ipa: '| it has been alLEGED | that records were HIDden |', src: 'Notice', note: '<i>alleged</i> /əˈledʒd/ is two syllables; <i>allegedly</i> /əˈledʒɪdli/ is four.' },
        { text: 'He insisted that he was simply being honest…', ipa: '| he inSISted | that he was SIMply being HONest |', src: 'Listening 1 (script)', note: '<i>honest</i> /ˈɒnɪst/ (US /ˈɑːnɪst/): silent <i>h</i>.' }
      ],
      brazil: 'Portuguese more often marks focus with word order or clefts (<i>foi ele que disse…</i>); English frequently just moves the stress. A flat delivery can therefore make a reported claim sound as if you endorse it.',
      task: {
        q: 'Say <i>“She agreed with an important caveat”</i> three ways, stressing <i>agreed</i>, then <i>important</i>, then <i>caveat</i>. What does each version imply?',
        model: 'a<b>GREED</b>: contrast with refusing — she did agree. im<b>POR</b>tant: the caveat was not minor. <b>CA</b>veat /ˈkæviæt/: neutral, new information at the end (the default).',
        explain: 'The default is the last content word; any other placement is a choice the listener will interpret.'
      }
    },

    '11': {
      focus: 'Weak forms in passive auxiliary chains',
      tags: ['passive voice', 'weak forms'],
      why: 'In passive structures (<i>is said to be</i>, <i>has been decided</i>, <i>was alleged</i>), the auxiliary verbs <i>is/was/been</i> are unstressed. Brazilian learners often over-pronounce every auxiliary with full vowels, making the passive sound heavy rather than fluid.',
      listenFor: 'The main stress falling squarely on the past participle and the following infinitive, while <i>has been</i> reduces to /əz bɪn/.',
      items: [
        { text: 'It has been argued that voting is insufficient.', ipa: '/ɪt əz bɪn ˈɑːɡjuːd ðət ˈvəʊtɪŋ ɪz ˌɪnsəˈfɪʃnt/', src: 'Notice' },
        { text: 'The minority is said to be excluded from debate.', ipa: '/ðə maɪˈnɒrəti ɪz ˈsed tə bi ɪkˈskluːdɪd/', src: 'Reading' },
        { text: 'Democracy is regarded as an ongoing struggle.', ipa: '/dɪˈmɒkrəsi ɪz rɪˈɡɑːdɪd əz ən ˈɒnˌɡəʊɪŋ ˈstrʌɡl/', src: 'Steal' }
      ],
      brazil: 'Avoid saying full [hæz biːn]; reduce to light /əz bɪn/ so the listener focuses on the lexical verb.',
      task: {
        q: 'Say: "It has been said that power is exercised silently." Keep <i>has been</i> under 0.3 seconds.',
        model: '/ɪt əz bɪn ˈsed ðət ˈpaʊər ɪz ˈeksəsaɪzd ˈsaɪləntli/',
        explain: 'Auxiliaries carry grammatical glue; participles carry semantic weight.'
      }
    },

    '12': {
      focus: 'Stress shifts in constitutional and political terms',
      tags: ['word stress', 'political vocabulary'],
      why: 'Political vocabulary derived from Latin frequently shifts stress when changing form: <i>LEGislate</i> → <i>legisLAtion</i> → <i>leGISlative</i> → <i>LEGislature</i>.',
      listenFor: 'The primary stress jumping between the second and third syllable depending on the suffix.',
      items: [
        { text: 'legislative', ipa: '/ˈledʒ.ɪ.slə.tɪv/', us: '/ˈledʒ.ə.sleɪ.tɪv/', src: 'Know' },
        { text: 'coalition', ipa: '/ˌkəʊ.əˈlɪʃ.n/', src: 'Reading' },
        { text: 'presidentialism', ipa: '/ˌprez.ɪˈden.ʃəl.ɪ.zəm/', src: 'Know' },
        { text: 'institutional', ipa: '/ˌɪn.stɪˈtjuː.ʃən.l/', us: '/ˌɪn.stəˈtuː.ʃən.l/', src: 'Reading' }
      ],
      brazil: 'Portuguese <i>legislativo</i> stresses the penultimate syllable; English <i>legislative</i> stresses the first.',
      task: {
        q: 'Pronounce the family: <i>legislate</i>, <i>legislator</i>, <i>legislative</i>, <i>legislature</i>, <i>legislation</i>.',
        model: '<b>LE</b>gislate, <b>LE</b>gislator, <b>LE</b>gislative, <b>LE</b>gislature, legis<b>LA</b>tion.',
        explain: 'Only <i>legislation</i> moves the primary stress to the suffix.'
      }
    },

    '13': {
      focus: 'Contrastive pitch contours: <i>whereas</i>, <i>while</i>, <i>as opposed to</i>',
      tags: ['intonation', 'contrast'],
      why: 'When presenting two contrasting political positions in a single sentence, English uses a rising intonation on the first concessive clause, followed by a falling intonation on the main assertion.',
      listenFor: 'The musical lift on <i>whereas</i> followed by the definitive drop at the end of the sentence.',
      items: [
        { text: 'Whereas the left emphasizes equality, the right prioritizes liberty.', ipa: '| weərˈæz ðə ˈleft ˈemfəsaɪzɪz iːˈkwɒləti ↗ | ðə ˈraɪt praɪˈɒrətaɪzɪz ˈlɪbəti ↘ |', src: 'Reading' },
        { text: 'Individual responsibility, as opposed to structural reform…', ipa: '| ˌɪndɪˈvɪdʒuəl rɪˌspɒnsəˈbɪləti ↗ | əz əˈpəʊzd tə ˈstrʌktʃərəl rɪˈfɔːm ↘ |', src: 'Notice' }
      ],
      brazil: 'Brazilian learners often deliver contrasts with a flat pitch, making the nuance sound monotonous. Use the pitch rise to signal that the second half of the contrast is coming.',
      task: {
        q: 'Read the sentence aloud, raising pitch on <i>collective</i> and lowering pitch on <i>individual</i>: "While collectivism seeks cohesion, liberalism defends autonomy."',
        model: 'Voice rises on <i>cohesion</i> and drops definitively on <i>autonomy</i>.',
        explain: 'Pitch movement guides the listener’s cognitive expectation across complex clauses.'
      }
    },

    '14': {
      focus: 'Quantitative rhythm & multi-syllabic stress: <i>disproportionately</i>',
      tags: ['syllable timing', 'quantitative discourse'],
      why: 'Statistical arguments rely on long adverbs. In English, these words must maintain a single primary stress without turning into separate, equal syllables.',
      listenFor: 'Six syllables compressed into a smooth single rhythmic foot: dis-pro-<b>POR</b>-tion-ate-ly.',
      items: [
        { text: 'disproportionately', ipa: '/ˌdɪs.prəˈpɔː.ʃən.ət.li/', us: '/ˌdɪs.prəˈpɔːr.ʃən.ət.li/', src: 'Reading' },
        { text: 'socio-economic', ipa: '/ˌsəʊ.si.əʊˌiː.kəˈnɒm.ɪk/', src: 'Notice' },
        { text: 'intergenerational', ipa: '/ˌɪn.təˌdʒen.əˈreɪ.ʃən.l/', src: 'Steal' }
      ],
      brazil: 'Portuguese gives equal time to every syllable (syllable-timed); English compresses unstressed syllables around the tonic stress (stress-timed).',
      task: {
        q: 'Say: "Wealth is disproportionately concentrated among top earners." Tap your desk only on <b>WEALTH</b>, <b>POR</b>, <b>CON</b>, and <b>TOP</b>.',
        model: 'Four physical beats across twelve spoken words.',
        explain: 'English sentence rhythm is defined by stress beats, not syllable counts.'
      }
    },

    '15': {
      focus: 'Causative linking: <i>get them to agree</i> vs <i>have it done</i>',
      tags: ['causatives', 'catenation'],
      why: 'In causative structures, pronouns link smoothly into the following verb: <i>get them to</i> becomes /ˈɡet ðəm tə/, with <i>them</i> reducing to /ðəm/ or /əm/.',
      listenFor: 'The reduction of <i>to</i> to /tə/ and the elision of pronouns.',
      items: [
        { text: 'The state had the infrastructure repaired.', ipa: '/ðə ˈsteɪt həd ði ˈɪnfrəstrʌktʃə rɪˈpeəd/', src: 'Notice' },
        { text: 'Citizens got the government to listen.', ipa: '/ˈsɪtɪznz ɡɒt ðə ˈɡʌvnmənt tə ˈlɪsn/', src: 'Reading' }
      ],
      brazil: 'Portuguese uses <i>fazer com que</i> (a full subjunctive clause); English uses a tight causative infinitive with connected speech.',
      task: {
        q: 'Say: "They got the council to lower the tax." Link <i>got the</i> and reduce <i>to</i>.',
        model: '/ðeɪ ɡɒt ðə ˈkaʊnsl tə ˈləʊə ðə ˈtæks/',
        explain: 'Smooth catenation prevents stiff, robotic delivery.'
      }
    },

    '16': {
      focus: 'Cleft sentence tonic placement: <i>It was the FRAMING that...</i>',
      tags: ['cleft sentences', 'tonic stress'],
      why: 'In cleft sentences (<i>It is X that...</i>, <i>What X does is...</i>), the entire purpose of the grammar is to shift the primary tonic stress onto the focus element.',
      listenFor: 'A sharp, prominent pitch peak on the clefted noun, followed by a low pitch contour on the relative clause.',
      items: [
        { text: 'It was the framing that shaped public opinion.', ipa: '| ɪt wəz ðə ˈFRAMing | ðət ʃeɪpt ˈpʌblɪk əˈpɪnjən |', src: 'Reading' },
        { text: 'What politicians exploit is narrative ambiguity.', ipa: '| wɒt ˌpɒlɪˈtɪʃnz ɪkˈsplɔɪt | ɪz ˈNARRative ˌæmbɪˈɡjuːəti |', src: 'Notice' }
      ],
      brazil: 'Portuguese clefts (<i>foi o enquadramento que...</i>) work similarly, but English requires a steeper pitch drop on the subsequent relative clause.',
      task: {
        q: 'Say: "It is not the data, but the story, that moves voters." Place strong tonic peaks on <b>DATA</b> and <b>STORY</b>.',
        model: 'High pitch on <i>data</i>, higher pitch on <i>story</i>, low flat finish on <i>moves voters</i>.',
        explain: 'Clefts use both syntax and intonation to direct the listener’s attention.'
      }
    },

    '17': {
      focus: 'Future auxiliary compression: <i>will’ve completed</i> & <i>will be doing</i>',
      tags: ['future forms', 'weak forms'],
      why: 'In the Future Perfect and Future Continuous, <i>will have</i> contracts to /ˈwɪləv/, and <i>will be</i> to /ˈwɪlbi/. Over-stressing <i>will</i> makes future statements sound artificially emphatic.',
      listenFor: 'A light, swift /ˈwɪləv/ leading into the stressed participle.',
      items: [
        { text: 'By 2035, AI will have transformed cognitive labor.', ipa: '/baɪ ˈtwenti ˌθɜːti ˈfaɪv | ˌeɪ ˈaɪ wɪləv trænsˈfɔːmd ˈkɒɡnətɪv ˈleɪbə/', src: 'Reading' },
        { text: 'We will be interacting with synthetic agents daily.', ipa: '/wi wɪlbi ˌɪntərˈæktɪŋ wɪð sɪnˈθetɪk ˈeɪdʒənts ˈdeɪli/', src: 'Notice' }
      ],
      brazil: 'Avoid saying [wɪw hævi]; pronounce <i>will have</i> as two fast syllables /ˈwɪləv/.',
      task: {
        q: 'Say: "By tomorrow, the system will have processed the archive." Keep <i>will have</i> light.',
        model: '/wɪləv ˈprəʊsest/',
        explain: 'Future milestones carry the beat on the participle, not the modal auxiliary.'
      }
    },

    '18': {
      focus: 'De-stressing prepositions in complex noun phrases',
      tags: ['nominal chains', 'prepositional reduction'],
      why: 'Complex noun phrases (e.g., <i>the algorithmic capture of human attention by digital platforms</i>) sound heavy if prepositions (<i>of, by, in</i>) are stressed. Prepositions must reduce to schwa.',
      listenFor: 'Prepositions (<i>of</i> → /əv/, <i>by</i> → /baɪ/, <i>for</i> → /fə/) acting as tiny unstressed bridges between lexical nouns.',
      items: [
        { text: 'the algorithmic capture of human attention', ipa: '/ði ˌælɡəˈrɪðmɪk ˈkæptʃər əv ˈhjuːmən əˈtenʃn/', src: 'Reading' },
        { text: 'the feedback loops of digital addiction', ipa: '/ðə ˈfiːdbæk luːps əv ˈdɪdʒɪtl əˈdɪkʃn/', src: 'Steal' }
      ],
      brazil: 'Portuguese <i>de</i> is naturally weak; transfer that light habit to English <i>of</i> /əv/ without inserting extra vowels.',
      task: {
        q: 'Say: "The monetization of user behavior by tech monopolies." Identify the four content nouns that take the beats.',
        model: 'Beats fall on <b>MON</b>etization, be<b>HAV</b>ior, <b>TECH</b>, mo<b>NOP</b>olies.',
        explain: 'De-stressing structural prepositions gives rhythm to dense analytical prose.'
      }
    },

    '19': {
      focus: 'Inverted conditional rhythm: <i>Had we known...</i> & <i>Were they to act...</i>',
      tags: ['conditional inversion', 'rhythm'],
      why: 'Inverted conditionals eliminate <i>if</i> and front the auxiliary: <i>Had we known</i> /hæd wi ˈnəʊn/, <i>Were they to</i> /wɜː ðeɪ tə/. The fronted auxiliary receives a light introductory beat.',
      listenFor: 'A crisp, authoritative opening cadence without the word <i>if</i>.',
      items: [
        { text: 'Had we recognized the privacy divide earlier…', ipa: '/həd wi ˈrekəɡnaɪzd ðə ˈprɪvəsi dɪˈvaɪd ˈɜːliə/', src: 'Reading' },
        { text: 'Were users to demand transparency…', ipa: '/wɜː ˈjuːzəz tə dɪˈmɑːnd trænsˈpærənsi/', src: 'Notice' }
      ],
      brazil: 'Portuguese uses subjunctive inflections (<i>se tivéssemos sabido</i>); English conditional inversion creates high-register rhetorical elegance in speech.',
      task: {
        q: 'Say: "Had society acted sooner, data rights would be protected." Practice the inverted opening.',
        model: '/həd səˈsaɪəti ˈæktɪd ˈsuːnə | ˈdeɪtə raɪts wəd bi prəˈtektɪd/',
        explain: 'Inversion sounds formal and commanding when delivered with crisp tempo.'
      }
    },

    '20': {
      focus: 'Pro-form reductions & ellipsis: <i>that of</i> & <i>do so</i>',
      tags: ['substitution', 'ellipsis'],
      why: 'Substitutions like <i>that of</i> /ðæt əv/, <i>those of</i> /ðəʊz əv/, and <i>do so</i> /duː səʊ/ prevent repetition. <i>That</i> and <i>those</i> carry moderate stress, while <i>of</i> is weak.',
      listenFor: 'Smooth linking across <i>that of</i> with /ðæt əv/.',
      items: [
        { text: 'Our agency differs from that of automated machines.', ipa: '/ˈaʊər ˈeɪdʒənsi ˈdɪfəz frəm ˈðæt əv ˈɔːtəmeɪtɪd məˈʃiːnz/', src: 'Reading' },
        { text: 'When requested to adapt, users refuse to do so.', ipa: '/wən rɪˈkwestɪd tə əˈdæpt | ˈjuːzəz rɪˈfjuːz tə ˈduː səʊ/', src: 'Notice' }
      ],
      brazil: 'Brazilian speakers often repeat the full noun instead of substituting. In speech, using <i>that of</i> or <i>do so</i> sounds concise and native-like.',
      task: {
        q: 'Say: "The friction of craft is greater than that of automated convenience." Link <i>than that of</i>.',
        model: '/ðən ˈðæt əv ˈɔːtəmeɪtɪd kənˈviːniəns/',
        explain: 'Substitution markers connect ideas without cognitive drag.'
      }
    },

    '21': {
      focus: 'Semiotic vocabulary: <i>indexical</i>, <i>omission</i>, <i>panoptic</i>',
      tags: ['semiotics', 'word stress'],
      why: 'Aesthetic and semiotic analysis uses technical Greek and Latin derivatives where stress placement is critical: <i>inDEXical</i>, <i>oMISsion</i>, <i>panOPtic</i>.',
      listenFor: 'Penultimate and antepenultimate stress patterns: in-<b>DEX</b>-i-cal /ɪnˈdek.sɪ.kəl/.',
      items: [
        { text: 'indexical fidelity', ipa: '/ɪnˈdek.sɪ.kəl faɪˈdel.ə.ti/', src: 'Reading' },
        { text: 'selection and omission', ipa: '/sɪˈlek.ʃn ənd əʊˈmɪʃ.n/', src: 'Steal' },
        { text: 'panoptic surveillance', ipa: '/pænˈɒp.tɪk sɜːˈveɪ.ləns/', src: 'Know' }
      ],
      brazil: 'Avoid saying [in-de-ʃi-kow]; pronounce <i>indexical</i> with a crisp /ks/ cluster: /ɪnˈdeksɪkəl/.',
      task: {
        q: 'Say: "A photograph possesses indexical fidelity." Keep the /ks/ in <i>indexical</i> sharp.',
        model: '/ə ˈfəʊtəɡrɑːf pəˈzesɪz ɪnˈdeksɪkəl faɪˈdeləti/',
        explain: 'Precise consonant clusters give authority to philosophical commentary.'
      }
    },

    '22': {
      focus: 'Impersonal passive distancing: <i>is widely alleged to be</i>',
      tags: ['impersonal passive', 'distancing'],
      why: 'Journalistic distancing uses passive reporting verbs with neutral, even stress: <i>is alLEGED to be</i>, <i>is conTENded that</i>. Over-stressing sounds biased.',
      listenFor: 'Flat, measured intonation that signals objective reporting rather than personal opinion.',
      items: [
        { text: 'War photography is frequently alleged to exploit trauma.', ipa: '/ˈwɔː fəˌtɒɡrəfi ɪz ˈfriːkwəntli əˈledʒd tə ɪkˈsplɔɪt ˈtrɔːmə/', src: 'Notice' },
        { text: 'It is widely contended that images shock the conscience.', ipa: '/ɪt ɪz ˈwaɪdli kənˈtendɪd ðət ˈɪmɪdʒɪz ˈʃɒk ðə ˈkɒnʃəns/', src: 'Reading' }
      ],
      brazil: '<i>alleged</i> is two syllables /əˈledʒd/, not three [a-le-dʒe-dʒi].',
      task: {
        q: 'Say: "The photographer was alleged to have crossed the boundary." Pronounce <i>alleged</i> as two syllables.',
        model: '/wəz əˈledʒd tə həv ˈkrɒst/',
        explain: '-ed endings after /dʒ/ add only /d/, not an extra vowel.'
      }
    },

    '23': {
      focus: 'Aesthetic loanwords: <i>studium</i>, <i>punctum</i>, <i>tableau</i>',
      tags: ['loanwords', 'aesthetic vocabulary'],
      why: 'Literary and artistic theory integrates Latin and French terms with standardized English pronunciations: <i>studium</i> /ˈstjuːdiəm/, <i>punctum</i> /ˈpʌŋktəm/, <i>tableau</i> /ˈtæbloʊ/.',
      listenFor: 'The British /juː/ in <i>studium</i> and the nasal /ŋk/ in <i>punctum</i>.',
      items: [
        { text: 'studium', ipa: '/ˈstjuː.di.əm/', us: '/ˈstuː.di.əm/', src: 'Reading' },
        { text: 'punctum', ipa: '/ˈpʌŋk.təm/', src: 'Reading' },
        { text: 'memento mori', ipa: '/məˌmen.təʊ ˈmɔːr.aɪ/', src: 'Steal' },
        { text: 'tableau', ipa: '/ˈtæb.ləʊ/', us: '/ˈtæb.loʊ/', src: 'Notice' }
      ],
      brazil: 'Do not nasalize the vowel in <i>punctum</i> as in Portuguese <i>ponto</i>; pronounce the full /ŋ/ followed by /k/: /ˈpʌŋktəm/.',
      task: {
        q: 'Say: "The punctum pierces the cultural studium of the tableau." Pronounce all three terms accurately.',
        model: '/ðə ˈpʌŋktəm ˈpɪəsɪz ðə ˈkʌltʃərəl ˈstjuːdiəm əv ðə ˈtæbləʊ/',
        explain: 'Art historical vocabulary marks C1 analytical sophistication.'
      }
    },

    '24': {
      focus: 'High-register diplomatic stress: <i>sovereignty</i>, <i>epistemic</i>, <i>opacity</i>',
      tags: ['diplomatic language', 'word stress'],
      why: 'Diplomatic discourse demands precise syllable stress: <i>SOVer-eign-ty</i> (3 syllables, silent g), <i>epiSTEmic</i> (stress on 3rd), <i>oPACity</i> (stress on 2nd).',
      listenFor: '<b>SOV</b>-ren-ty /ˈsɒvrənti/ without pronouncing the \'g\'.',
      items: [
        { text: 'cultural sovereignty', ipa: '/ˈkʌl.tʃər.əl ˈsɒv.rən.ti/', src: 'Know' },
        { text: 'the right to opacity', ipa: '/ðə ˈraɪt tə oʊˈpæs.ə.ti/', src: 'Reading' },
        { text: 'epistemic humility', ipa: '/ˌep.ɪˈstiː.mɪk hjuːˈmɪl.ə.ti/', src: 'Steal' }
      ],
      brazil: 'Portuguese <i>soberania</i> stresses the \'i\'; English <i>sovereignty</i> stresses the first syllable: /ˈsɒvrənti/.',
      task: {
        q: 'Say: "We defend communal sovereignty and epistemic humility." Ensure <i>sovereignty</i> has 3 syllables.',
        model: '/kəˈmjuːnl ˈsɒvrənti ənd ˌepɪˈstiːmɪk hjuːˈmɪləti/',
        explain: 'Diplomatic register relies on flawless word stress.'
      }
    },

    '25': {
      focus: 'Epistemic modal calibration in speech: <i>would suggest</i> vs <i>proves</i>',
      tags: ['epistemic modality', 'hedging'],
      why: 'In scientific and academic debate, the pitch and stress of modal verbs indicate your degree of certainty. <i>would sugGEST</i> is soft and provisional; <i>conCLU-sively esTABlishes</i> is decisive and firm.',
      listenFor: 'The rising, open pitch contour on hedges vs the falling, closed pitch on boosts.',
      items: [
        { text: 'The preliminary findings would suggest a correlation…', ipa: '| ðə prɪˈlɪmɪnəri ˈfaɪndɪŋz wəd səɡˈdʒest ə ˌkɒrəˈleɪʃn ↗ |', src: 'Notice' },
        { text: 'Multiple meta-analyses conclusively establish the link.', ipa: '| ˈmʌltɪpl ˈmetərɪˌvjuːz kənˈkluːsɪvli ɪˈstæblɪʃ ðə ˈlɪŋk ↘ |', src: 'Notice' }
      ],
      brazil: 'Avoid delivering all scientific claims with the same flat pitch. Modulate between provisional exploration and definitive consensus.',
      task: {
        q: 'Say both: (1) "The data appears to indicate a trend." (hedged) (2) "The evidence conclusively proves the thesis." (boosted). Hear the pitch difference.',
        model: '(1) ends with slight upward tilt; (2) ends with strong downward drop.',
        explain: 'Pitch contour conveys epistemological calibration.'
      }
    },

    '26': {
      focus: 'Causal connector catenation: <i>attributable to</i> & <i>precipitated by</i>',
      tags: ['causal connectors', 'catenation'],
      why: 'Formal causal connectors link consonants across word boundaries: <i>attributable to</i> /əˈtrɪbjətəbl tə/, <i>precipitated by</i> /prɪˈsɪpɪteɪtɪd baɪ/.',
      listenFor: 'The reduction of <i>to</i> to /tə/ after the syllabic /l/ in <i>attributable</i>.',
      items: [
        { text: 'The collapse was largely attributable to inflation.', ipa: '/ðə kəˈlæps wəz ˈlɑːdʒli əˈtrɪbjətəbl tər ɪnˈfleɪʃn/', src: 'Reading' },
        { text: 'The crisis was precipitated by liquidity failure.', ipa: '/ðə ˈkraɪsɪs wəz prɪˈsɪpɪteɪtɪd baɪ lɪˈkwɪdəti ˈfeɪljə/', src: 'Notice' }
      ],
      brazil: 'Portuguese speakers often add a vowel after final /l/ ([atribu-ta-viw]); ensure a clean syllabic /l/ in English: /əˈtrɪbjətəbl/.',
      task: {
        q: 'Say: "The outcome is attributable to structural factors." Keep the /bl/ clean.',
        model: '/ði ˈaʊtkʌm ɪz əˈtrɪbjətəbl tə ˈstrʌktʃərəl ˈfæktəz/',
        explain: 'Clean syllabic consonants give precision to causal analysis.'
      }
    },

    '27': {
      focus: 'Stress shifts in psychological terms: <i>rationalize</i>, <i>dissonance</i>, <i>pariah</i>',
      tags: ['psychological vocabulary', 'word stress'],
      why: 'Cognitive terminology features distinctive stress patterns: <i>RA-tion-al-ize</i>, <i>DIS-son-ance</i>, and the tricky noun <i>pa-RI-ah</i> /pəˈraɪ.ə/.',
      listenFor: '<i>pariah</i> stressed on the SECOND syllable with /aɪ/: /pəˈraɪə/.',
      items: [
        { text: 'pariah', ipa: '/pəˈraɪ.ə/', src: 'Reading' },
        { text: 'cognitive dissonance', ipa: '/ˈkɒɡ.nə.tɪv ˈdɪs.ə.nəns/', src: 'Know' },
        { text: 'motivated numeracy', ipa: '/ˈməʊ.tɪ.veɪ.tɪd ˈnjuː.mər.ə.si/', us: '/ˈmoʊ.t̬əˌveɪ.t̬ɪd ˈnuː.mɚ.ə.si/', src: 'Reading' }
      ],
      brazil: 'Portuguese <i>pária</i> stresses the first syllable; English <i>pariah</i> stresses the second with the diphthong /aɪ/: /pəˈraɪə/.',
      task: {
        q: 'Say: "Dissidents feared becoming social pariahs." Stress the second syllable of <i>pariahs</i>.',
        model: '/ˈdɪsɪdənts ˈfɪəd bɪˌkʌmɪŋ ˈsəʊʃl pəˈraɪəz/',
        explain: 'Correct stress on irregular loanwords marks C1 vocabulary mastery.'
      }
    },

    '28': {
      focus: 'Tricolon cadence: the 1-2-3 melodic build of rhetorical parallelism',
      tags: ['tricolon', 'rhetorical prosody'],
      why: 'A balanced tricolon (three parallel clauses) follows a universal oratorical melody: pitch rises slightly on item 1, rises higher on item 2, and drops authoritatively on item 3.',
      listenFor: 'The 1 (mid-rise), 2 (high-rise), 3 (low-fall) musical rhythm.',
      items: [
        { text: 'to enlighten public understanding, to inspire moral courage, and to mobilize democratic action.', ipa: '| tə ɪnˈlaɪtn ˈpʌblɪk ˌʌndəˈstændɪŋ ↗ | tə ɪnˈspaɪə ˈmɒrəl ˈkʌrɪdʒ ⇗ | ənd tə ˈməʊbəlaɪz ˌdeməˈkrætɪk ˈækʃn ↘ |', src: 'Notice' },
        { text: 'to speak with conviction, to listen with humility, and to yield to the evidence.', ipa: '| tə ˈspiːk wɪð kənˈvɪkʃn ↗ | tə ˈlɪsn wɪð hjuːˈmɪləti ⇗ | ənd tə ˈjiːld tə ði ˈevɪdəns ↘ |', src: 'Reading' }
      ],
      brazil: 'Portuguese oratorical style often uses continuous high emotion; English classical rhetoric relies on the disciplined triadic musical cadence.',
      task: {
        q: 'Read the tricolon aloud, following the 1↗, 2⇗, 3↘ melody: "To seek the truth, to steelman our rivals, and to speak with restraint."',
        model: 'Musical build culminating in an authoritative terminal drop.',
        explain: 'Parallel prosody reinforces parallel syntax in the listener’s ear.'
      }
    },

    '29': {
      focus: 'Negative inversion pitch reset: <i>Rarely do...</i> & <i>Not only does...</i>',
      tags: ['negative inversion', 'intonation'],
      why: 'Negative and limiting fronted adverbs (<i>Rarely</i>, <i>Seldom</i>, <i>Not only</i>) act as rhetorical alarm bells. The fronted negative receives a strong high pitch, resetting the sentence melody.',
      listenFor: 'The sharp, dramatic high pitch on <b>RARE</b>-ly or <b>NOT</b> only, followed by rapid auxiliary inversion.',
      items: [
        { text: 'Rarely do individuals update their convictions when insulted.', ipa: '| ˈRAREly do in-di-VID-u-als | UP-date their con-VIC-tions |', src: 'Reading' },
        { text: 'Not only does steelmanning disarm hostility, but it also reveals truth.', ipa: '| NOT ONly does STEELman-ning | dis-ARM hos-TIL-i-ty |', src: 'Notice' }
      ],
      brazil: 'Portuguese uses word order like <i>Raramente as pessoas mudam...</i> without auxiliary inversion. In English, emphasize the negative adverb and keep the auxiliary /duː/ or /dʌz/ crisp.',
      task: {
        q: 'Say: "Rarely does an opponent surrender under contempt." Place maximum emphasis on <i>Rarely</i>.',
        model: '/ˈreəli dəz ən əˈpəʊnənt səˈrendə/',
        explain: 'Inverted sentences require confident initial pitch attack.'
      }
    },

    '30': {
      focus: 'Punctuation as acoustic pauses: Colon vs Semicolon vs Em-dash',
      tags: ['punctuation', 'pausing'],
      why: 'In speech, punctuation translates directly into acoustic timing: a colon is an expectant micro-pause (suspense); a semicolon is a balanced step (half-cadence); an em-dash is an abrupt tempo shift (whisper).',
      listenFor: 'The split-second hold before a colon announcement: <i>The secret is simple [hold]: truth.</i>',
      items: [
        { text: 'The secret is deceptively simple: you must delete your favorite words.', ipa: '| ðə ˈsiːkrət ɪz dɪˈseptɪvli ˈsɪmpl ‖ ju məst dɪˈliːt jə ˈfeɪvərɪt ˈwɜːdz |', src: 'Notice' },
        { text: 'Jargon conceals insecurity; simplicity demonstrates mastery.', ipa: '| ˈdʒɑːɡən kənˈsiːlz ˌɪnsɪˈkjʊərəti | sɪmˈplɪsəti ˈdemənstreɪts ˈmɑːstəri |', src: 'Reading' },
        { text: 'When we write under anxiety—desperate to sound smart—we ruin our voice.', ipa: '| wən wi ˈraɪt ˈʌndər æŋˈzaɪəti | ˈdespərət tə ˈsaʊnd ˈsmɑːt | wi ˈruːɪn ˈaʊə ˈvɔɪs |', src: 'Notice' }
      ],
      brazil: 'Brazilian speakers often rush through punctuation marks without pausing. In English analytical speech, silent pauses create intellectual authority.',
      task: {
        q: 'Deliver the sentence with a distinct 0.5-second pause at the colon: "There is only one rule: write what is true."',
        model: 'Clear vocal pause before the declaration.',
        explain: 'Silence is the most powerful punctuation mark in spoken English.'
      }
    },

    '31': {
      focus: 'The cadence of restraint: terminal drop on concrete monosyllables',
      tags: ['restraint', 'terminal drop'],
      why: 'Prose written with Hemingwayesque restraint achieves its power by ending on unadorned, heavy monosyllables (<i>bone, ash, ice, light, dark</i>) with a decisive low pitch drop.',
      listenFor: 'The heavy, flat terminal drop on the final noun without melodic lingering.',
      items: [
        { text: 'Life changes in the instant. The ordinary instant.', ipa: '| ˈlaɪf ˈtʃeɪndʒɪz ɪn ði ˈɪnstənt ↘ | ði ˈɔːdnri ˈɪnstənt ↘ |', src: 'Reading' },
        { text: 'In the end, she kept only her name.', ipa: '| ɪn ði ˈend | ʃi ˈkept ˈəʊnli hɜː ˈneɪm ↘ |', src: 'Notice' },
        { text: 'We walked away through the smoke.', ipa: '| wi ˈwɔːkt əˈweɪ θruː ðə ˈsməʊk ↘ |', src: 'Notice' }
      ],
      brazil: 'Avoid turning final consonants into open syllables ([neimi], [smouki]). End crisply on the final consonant /m/ and /k/.',
      task: {
        q: 'Say: "He closed the door and turned off the light." Drop your pitch flat on <i>light</i> /laɪt/.',
        model: 'Decisive, unadorned terminal drop.',
        explain: 'Restraint in speech mirrors restraint on the page.'
      }
    },

    '32': {
      focus: 'Grand valedictory cadence: periodic breathing and oratorical delivery',
      tags: ['valedictory prosody', 'master cadence'],
      why: 'The culmination of C1 speaking is the ability to deliver expansive periodic sentences with controlled breathing, rhythmic clause grouping, and authoritative vocal presence.',
      listenFor: 'Deep inhalation before the periodic build, clear pauses between subordinate clauses, and an inspiring, resonant conclusion.',
      items: [
        { text: 'To possess a mind in English is to enter into a sacred covenant with reality.', ipa: '| tə pəˈzes ə ˈmaɪnd ɪn ˈɪŋɡlɪʃ | ɪz tə ˈentər ˈɪntə ə ˈseɪkrɪd ˈkʌvənənt wɪð riˈæləti ↘ |', src: 'Reading' },
        { text: 'The road is yours. The voice is yours. The mind is yours.', ipa: '| ðə ˈrəʊd ɪz ˈjɔːz ↗ | ðə ˈvɔɪs ɪz ˈjɔːz ↗ | ðə ˈmaɪnd ɪz ˈjɔːz ↘ |', src: 'Listening 2' }
      ],
      brazil: 'You have completed 32 units of phonetic and prosodic training. Speak with the full resonance, authority, and freedom of your sovereign mind.',
      task: {
        q: 'Deliver the final motto aloud: "The road is yours. The voice is yours. The mind is yours." Feel the rhythmic triadic mastery.',
        model: 'Authoritative, resonant, sovereign spoken delivery.',
        explain: 'You possess a mind in English.'
      }
    }
  };
})(window.KLANG);
