import { expect, it } from 'vitest';

import { Maybe } from '../../types';

import { sumBy } from './sumBy';

it('should return the sum of the values in the array', () => {
  expect(sumBy([1, 2, 3], (value) => value)).toEqual(6);
});

it('should return 0 if the array is empty', () => {
  expect(sumBy([], (value) => value)).toEqual(0);
});

it('should return 0 if the array is `null` or `undefined`', () => {
  expect(sumBy(null as Maybe<number[]>, (value) => value)).toEqual(0);
  expect(sumBy(undefined as Maybe<number[]>, (value) => value)).toEqual(0);
});

it('should return the sum the values in the array, using the iteratee', () => {
  expect(sumBy([1, 2, 3], (value) => value * 2)).toEqual(12);
});
