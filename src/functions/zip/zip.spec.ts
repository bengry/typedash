import { expect, it } from 'vitest';

import { zip } from './zip';

it('should return an array of tuples', () => {
  expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ]);
});

it('should return an array of tuples with the length of the shortest array', () => {
  expect(zip([1, 2, 3], ['a', 'b'])).toEqual([
    [1, 'a'],
    [2, 'b'],
  ]);
});

it('should return an empty array if at least one of the arrays is empty', () => {
  expect(zip([], ['a', 'b'])).toEqual([]);
  expect(zip([1, 2], [])).toEqual([]);
  expect(zip([], [])).toEqual([]);
});
