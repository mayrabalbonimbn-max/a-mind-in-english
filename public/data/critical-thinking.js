/* Explicit cumulative critical-thinking spine. This is curriculum metadata, not a tenth stage. */
(function () {
  const K = window.KLANG = window.KLANG || {};
  const focus = {
    '01':'evidence vs inference · uncertainty','02':'fact, claim and interpretation','03':'memory evidence and alternative explanations','04':'assumptions inside self-narratives','05':'what is missing · calibrated conclusions',
    '06':'necessary vs sufficient conditions','07':'possibility vs probability','08':'ambiguity and competing explanations','09':'fact vs value · counterexamples','10':'competing principles and justified exceptions',
    '11':'premise → conclusion','12':'relevance of evidence','13':'generalisation and sample limits','14':'framing and omitted information','15':'source quality · reporting vs analysis','16':'basic steelman of an opposing position',
    '17':'correlation vs causation','18':'confounders and reverse causality','19':'causal chains and unintended consequences','20':'trade-offs · second-order effects · prediction vs evidence',
    '21':'selection and omission','22':'perspective and context','23':'competing interpretations','24':'limits of interpretation and uncertainty',
    '25':'hierarchy and quality of evidence','26':'epistemic confidence and cognitive bias','27':'motivated reasoning and argument failures','28':'necessary evidence and falsifiability','29':'steelman, rebuttal, principle vs consequence',
    '30':'structure an ambiguous problem · known vs unknown','31':'competing hypotheses · evidence and counterevidence','32':'qualified synthesis · coherent final argument'
  };
  const bands = [
    {units:'01–05',title:'Foundations',tools:'fact · claim · evidence · inference · assumption · interpretation · uncertainty · alternatives'},
    {units:'06–10',title:'Reasoning with alternatives',tools:'necessary/sufficient · possibility/probability · ambiguity · competing explanations · fact/value · principles · counterexamples'},
    {units:'11–16',title:'Argument analysis',tools:'premises · conclusions · relevance · generalisation · framing · missing information · source quality · steelman'},
    {units:'17–20',title:'Causal and systems reasoning',tools:'correlation/causation · confounders · reverse causality · causal chains · second-order effects · trade-offs'},
    {units:'21–24',title:'Perspective and interpretation',tools:'selection · omission · perspective · context · competing interpretations · limits · uncertainty'},
    {units:'25–29',title:'Advanced reasoning',tools:'evidence quality · confidence · bias · motivated reasoning · falsifiability · rebuttal · principle/consequence'},
    {units:'30–32',title:'Synthesis',tools:'ambiguous problems · unknowns · hypotheses · counterevidence · qualified conclusions'}
  ];
  K.criticalThinking = { focus, bands };
  (K.curriculum && K.curriculum.modules || []).forEach(m => (m.units || []).forEach(u => { u.criticalThinking = focus[u.id] || ''; }));
})();
