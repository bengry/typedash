import { expect, it } from 'vitest';

import { count } from './count';

it('returns the number of elements in an array', () => {
  expect(count([1, 2, 3])).toBe(3);
  expect(count([])).toBe(0);
});

it('returns the number of elements in an iterable', () => {
  const set = new Set([1, 2, 3]);
  expect(count(set)).toBe(3);
  expect(count(new Set())).toBe(0);
});

it('returns the number of elements that satisfy a predicate', () => {
  expect(count([1, 2, 3], (x) => x % 2 === 0)).toBe(1);
  expect(count([1, 2, 3], (x) => x >= 2)).toBe(2);
  expect(count([], (x) => x >= 1)).toBe(0);
});

it('returns 0 for null or undefined input', () => {
  expect(count(null)).toBe(0);
  expect(count(undefined)).toBe(0);
});
