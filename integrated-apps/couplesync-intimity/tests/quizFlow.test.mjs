import test from "node:test";
import assert from "node:assert/strict";
import { getVisibleQuestions } from "../src/lib/quizFlow.js";

const questions = [
  { id: "q_topic_gate" },
  { id: "q_interest" },
  { id: "q_hard_no" },
];

test("shows the full flow before the topic gate is answered", () => {
  assert.equal(getVisibleQuestions(questions, {}).length, 3);
});

test("ends a topic after a soft exit or rejection", () => {
  assert.deepEqual(getVisibleQuestions(questions, { q_topic_gate: "later" }), [{ id: "q_topic_gate" }]);
  assert.deepEqual(getVisibleQuestions(questions, { q_topic_gate: "no" }), [{ id: "q_topic_gate" }]);
});
