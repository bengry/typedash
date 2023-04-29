import { expect, it } from 'vitest';

import { without } from './without';

it('returns an array without the items to exclude', () => {
  expect(without([1, 2, 3, 4, 5], [1, 3, 5])).toEqual([2, 4]);
});

it('returns an array without the items to exclude (with duplicates)', () => {
  expect(without([1, 2, 3, 4, 5], [1, 1, 3, 5])).toEqual([2, 4]);
});

it('should return an empty array when given an empty array and any items to exclude', () => {
  const result = without([] as number[], [1, 2, 3]);
  expect(result).toEqual([]);
});

it('should return the same array when given an array with no items to exclude', () => {
  const input = [1, 2, 3];
  const result = without(input, []);
  expect(result).toEqual(input);
});

it('should exclude a single item from the array', () => {
  const input = [1, 2, 3];
  const result = without(input, [2]);
  expect(result).toEqual([1, 3]);
});

it('should exclude multiple items from the array', () => {
  const input = [1, 2, 3, 4, 5];
  const result = without(input, [2, 4]);
  expect(result).toEqual([1, 3, 5]);
});

it('should handle arrays with duplicate items', () => {
  const input = [1, 2, 2, 3, 3, 3];
  const result = without(input, [2]);
  expect(result).toEqual([1, 3, 3, 3]);
});

it('should handle arrays with items of different types', () => {
  const input = ['a', 1, true, 'b', false, 2];
  const result = without(input, [1, 'b']);
  expect(result).toEqual(['a', true, false, 2]);
});
