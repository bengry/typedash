import { expect, it } from 'vitest';

import { isNonNullable } from './isNonNullable';

it('returns true for non-null and non-undefined values', () => {
  expect(isNonNullable(0)).toBe(true);
  expect(isNonNullable('')).toBe(true);
  expect(isNonNullable(false)).toBe(true);
  expect(isNonNullable({})).toBe(true);
  expect(isNonNullable([])).toBe(true);
  expect(isNonNullable(() => {})).toBe(true);
});

it('returns false for null and undefined values', () => {
  expect(isNonNullable(null)).toBe(false);
  // eslint-disable-next-line unicorn/no-useless-undefined
  expect(isNonNullable(undefined)).toBe(false);
});
