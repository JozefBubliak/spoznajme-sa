import { describe, it, expect } from 'vitest';
import { isRejectionAnswer } from '../../types/domain';
import { calculateCompatibility, generateSessionResult } from '../matching';

describe('isRejectionAnswer', () => {
  it('detects explicit rejection flag', () => {
    expect(isRejectionAnswer({ rejection: true })).toBe(true);
  });

  it('detects rejection by value', () => {
    expect(isRejectionAnswer({ value: 'nie' })).toBe(true);
  });
});

describe('calculateCompatibility', () => {
  it('matches single choice', () => {
    expect(
      calculateCompatibility('single_choice', { value: 'a' }, { value: 'a' })
    ).toBe(100);
    expect(
      calculateCompatibility('single_choice', { value: 'a' }, { value: 'b' })
    ).toBe(60);
  });

  it('calculates multiple choice overlap', () => {
    expect(
      calculateCompatibility(
        'multiple_choice',
        { values: ['a', 'b'] },
        { values: ['b', 'c'] }
      )
    ).toBe(50);
  });
});

describe('generateSessionResult', () => {
  it('hides when any rejection', () => {
    const res = generateSessionResult(
      'single_choice',
      { value: 'nie' },
      { value: 'ano' }
    );
    expect(res.shouldDisplay).toBe(false);
  });

  it('shows compatibility otherwise', () => {
    const res = generateSessionResult(
      'single_choice',
      { value: 'a' },
      { value: 'a' }
    );
    expect(res.shouldDisplay).toBe(true);
    expect(res.compatibilityScore).toBe(100);
  });
});
