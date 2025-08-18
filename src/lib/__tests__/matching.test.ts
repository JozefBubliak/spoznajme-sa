import { describe, it, expect } from 'vitest';
import { isRejectionAnswer, type AnswerOption } from '../../types/domain';
import { calculateCompatibility, generateSessionResult } from '../matching';

describe('isRejectionAnswer', () => {
  it('detects explicit rejection flag', () => {
    expect(
      isRejectionAnswer({ kind: 'single_choice', rejection: true })
    ).toBe(true);
  });

  it('detects rejection by value', () => {
    expect(
      isRejectionAnswer({ kind: 'single_choice', value: 'nie' })
    ).toBe(true);
  });

  it('detects rejection option flag', () => {
    const options: AnswerOption[] = [
      { value: 'nope', is_rejection: true },
      { value: 'yes' },
    ];
    expect(
      isRejectionAnswer(
        { kind: 'single_choice', value: 'nope' },
        options
      )
    ).toBe(true);
  });
});

describe('calculateCompatibility', () => {
  it('matches single choice', () => {
    expect(
      calculateCompatibility(
        'single_choice',
        { kind: 'single_choice', value: 'a' },
        { kind: 'single_choice', value: 'a' }
      )
    ).toBe(100);
    expect(
      calculateCompatibility(
        'single_choice',
        { kind: 'single_choice', value: 'a' },
        { kind: 'single_choice', value: 'b' }
      )
    ).toBe(60);
  });

  it('calculates multiple choice overlap', () => {
    expect(
      calculateCompatibility(
        'multiple_choice',
        { kind: 'multiple_choice', values: ['a', 'b'] },
        { kind: 'multiple_choice', values: ['b', 'c'] }
      )
    ).toBe(50);
  });
});

describe('generateSessionResult', () => {
  it('hides when any rejection', () => {
    const res = generateSessionResult(
      'single_choice',
      { kind: 'single_choice', value: 'nie' },
      { kind: 'single_choice', value: 'ano' }
    );
    expect(res.shouldDisplay).toBe(false);
  });

  it('shows compatibility otherwise', () => {
    const res = generateSessionResult(
      'single_choice',
      { kind: 'single_choice', value: 'a' },
      { kind: 'single_choice', value: 'a' }
    );
    expect(res.shouldDisplay).toBe(true);
    expect(res.compatibilityScore).toBe(100);
  });
});
