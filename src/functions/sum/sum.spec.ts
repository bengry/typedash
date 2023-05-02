import { expect, it } from 'vitest';

import { Maybe } from '../../types';

import { sum } from './sum';

it('should return the sum of the values in the array', () => {
  expect(sum([1, 2, 3], (value) => value)).toEqual(6);
});

it('should return 0 if the array is empty', () => {
  expect(sum([], (value) => value)).toEqual(0);
});

it('should return 0 if the array is `null` or `undefined`', () => {
  expect(sum(null as Maybe<number[]>, (value) => value)).toEqual(0);
  expect(sum(undefined as Maybe<number[]>, (value) => value)).toEqual(0);
});

it('should return the sum the values in the array, using the iteratee', () => {
  expect(sum([1, 2, 3], (value) => value * 2)).toEqual(12);
});

it('should sum numbers in a numbers array', () => {
  expect(sum([1, 2, 3])).toEqual(6);
});
