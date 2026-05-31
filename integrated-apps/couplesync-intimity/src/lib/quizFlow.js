export function getVisibleQuestions(questions, answers) {
  const gateAnswer = answers.q_topic_gate;
  if (gateAnswer && gateAnswer !== "yes") {
    return questions.filter((question) => question.id === "q_topic_gate");
  }
  return questions;
}
