import { expect, it } from 'vitest';

import { castArray } from './castArray';

it('should cast null to an empty array', () => {
  expect(castArray(null)).toEqual([]);
});

it('should cast undefined to an empty array', () => {
  expect(castArray(undefined)).toEqual([]);
});

it('should cast a readonly array to a readonly array', () => {
  const array: readonly number[] = [1, 2, 3];
  const result = castArray(array);
  expect(result).toEqual([1, 2, 3]);
  expect(result).toBe(array);
});

it('should cast a mutable array to a mutable array', () => {
  const array: number[] = [1, 2, 3];
  const result = castArray(array);
  expect(result).toEqual([1, 2, 3]);
  expect(result).toBe(array);
});

it('should cast a non-null value to a single-element array', () => {
  expect(castArray(42)).toEqual([42]);
  expect(castArray('hello')).toEqual(['hello']);
  expect(castArray(true)).toEqual([true]);
});

it('should handle empty input', () => {
  expect(castArray([])).toEqual([]);
  expect(castArray(null)).toEqual([]);

  expect(castArray(undefined)).toEqual([]);
});

it('should handle nested arrays', () => {
  const array: number[][] = [
    [1, 2],
    [3, 4],
  ];
  const result = castArray(array);
  expect(result).toEqual([
    [1, 2],
    [3, 4],
  ]);
});
