import test from 'node:test';
import assert from 'node:assert/strict';
import { store } from './store.ts';

test('pickCode generates uniformly distributed characters', () => {
  store.games.clear();
  const totalCodes = 10000;
  const counts: Record<string, number> = {};
  for (let i = 0; i < totalCodes; i++) {
    const code = store.createGame().code;
    for (const ch of code) {
      counts[ch] = (counts[ch] ?? 0) + 1;
    }
  }
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const totalChars = totalCodes * 6;
  const expected = totalChars / alphabet.length;
  const tolerance = expected * 0.1; // 10% tolerance
  for (const ch of alphabet) {
    const count = counts[ch] ?? 0;
    assert.ok(Math.abs(count - expected) <= tolerance, `${ch}=${count} outside tolerance`);
  }
});
