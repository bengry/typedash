import { expect, it } from 'vitest';

import { compact } from './compact';

it('should remove all falsey values from the array', () => {
  expect(compact([...allFalsyValues, 1, false, 2, 3, 4])).toEqual([1, 2, 3, 4]);
});

it('should return an empty array when given an empty array', () => {
  expect(compact([])).toEqual([]);
});

it('should return an empty array when given an array of only falsey values', () => {
  expect(compact([...allFalsyValues])).toEqual([]);
});

it('should return a new array and not modify the original array', () => {
  const input = [1, 2, 3];
  const output = compact(input);

  expect(output).toEqual([1, 2, 3]);
  expect(output).not.toBe(input);
});

it('should handle arrays with null or undefined values', () => {
  expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
});

const allFalsyValues = [
  false,
  null,
  undefined,
  Number.NaN,
  '',
  0,
  BigInt(0),
] as const;
