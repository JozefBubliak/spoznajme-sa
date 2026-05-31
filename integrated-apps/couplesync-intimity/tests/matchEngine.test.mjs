import test from "node:test";
import assert from "node:assert/strict";
import { computePairMatch, MATCH_LEVELS } from "../src/lib/matchEngine.js";

test("matches strong interest values from generated questionnaires", () => {
  assert.equal(computePairMatch("strong_yes", "yes"), MATCH_LEVELS.MATCH);
});

test("keeps fantasy-only and hard boundaries distinct", () => {
  assert.equal(computePairMatch("fantasy_only", "fantasy_only"), MATCH_LEVELS.FANTASY_ONLY);
  assert.equal(computePairMatch("hard_no", "yes"), MATCH_LEVELS.REJECTED);
});

test("treats a future reality option as a possible match", () => {
  assert.equal(computePairMatch("reality_now", "reality_someday"), MATCH_LEVELS.POSSIBLE);
});
