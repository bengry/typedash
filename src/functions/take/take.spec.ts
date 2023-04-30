import { expect, it } from 'vitest';

import { take } from './take';

it('should return the first `count` elements of the array', () => {
  expect(take([1, 2, 3], 2)).toEqual([1, 2]);
});

it('should return an empty array if the array is empty', () => {
  expect(take([], 2)).toEqual([]);
});

it('should return an empty array if the array is `null` or `undefined`', () => {
  expect(take(null, 2)).toEqual([]);
  expect(take(undefined, 2)).toEqual([]);
});

it('should return an empty array for a negative count', () => {
  expect(take([1, 2, 3], -1)).toEqual([]);
});
