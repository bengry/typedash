import { expect, it } from 'vitest';

import { chunk } from './chunk';

it('should divide an array into chunks of the given size', () => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  const result = chunk(array, 3);
  expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
});

it('should return an empty array when given an empty array', () => {
  const array: number[] = [];
  const result = chunk(array, 3);
  expect(result).toEqual([]);
});

it('should return an empty array when given a null or undefined array', () => {
  const array = null;
  const result = chunk(array, 3);
  expect(result).toEqual([]);

  const array2 = undefined;
  const result2 = chunk(array2, 3);
  expect(result2).toEqual([]);
});

it('should return a single chunk when the array length is less than the chunk size', () => {
  const array = [1, 2];
  const result = chunk(array, 3);
  expect(result).toEqual([[1, 2]]);
});
