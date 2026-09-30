// Configures every AI function with the same stub model name (tests never reach the network).
export const allModels = (m: string) => ({
  explain: m, writing: m, speakingFeedback: m, listening: m, outline: m, teacherLens: m,
  lightLanguage: m, interpretItem: m, explainQuestion: m,
  characterChat: m, conversationHelp: m, conversationReview: m, registerCompare: m,
  mainWrite: m, nightlyLearningReview: m,
});
