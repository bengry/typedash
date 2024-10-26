import { expect, it } from 'vitest';

import { isNonNullable } from './isNonNullable';

it('returns true for non-null and non-undefined values', () => {
  expect(isNonNullable(0)).toBe(true);
  expect(isNonNullable('')).toBe(true);
  expect(isNonNullable(false)).toBe(true);
  expect(isNonNullable({})).toBe(true);
  expect(isNonNullable([])).toBe(true);
  // biome-ignore lint/suspicious/noEmptyBlockStatements: is is the test
  expect(isNonNullable(() => {})).toBe(true);
});

it('returns false for null and undefined values', () => {
  expect(isNonNullable(null)).toBe(false);
  expect(isNonNullable(undefined)).toBe(false);
});
