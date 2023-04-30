import { expect, it } from 'vitest';

import { castArrayIfDefined } from './castArrayIfDefined';

it('should cast a readonly array to a readonly array', () => {
  const array: readonly number[] = [1, 2, 3];
  const result = castArrayIfDefined(array);
  expect(result).toEqual([1, 2, 3]);
  expect(result).toBe(array);
});

it('should cast a mutable array to a mutable array', () => {
  const array: number[] = [1, 2, 3];
  const result = castArrayIfDefined(array);
  expect(result).toEqual([1, 2, 3]);
  expect(result).toBe(array);
});

it('should cast a non-null value to a single-element array', () => {
  expect(castArrayIfDefined(42)).toEqual([42]);
  expect(castArrayIfDefined('hello')).toEqual(['hello']);
  expect(castArrayIfDefined(true)).toEqual([true]);
});

it('should return null for null input', () => {
  expect(castArrayIfDefined(null)).toBeNull();
});

it('should return undefined for undefined input', () => {
  // eslint-disable-next-line unicorn/no-useless-undefined
  expect(castArrayIfDefined(undefined)).toBeUndefined();
});

it('should handle empty input', () => {
  expect(castArrayIfDefined([])).toEqual([]);
});

it('should handle nested arrays', () => {
  const array: number[][] = [
    [1, 2],
    [3, 4],
  ];
  const result = castArrayIfDefined(array);
  expect(result).toEqual([
    [1, 2],
    [3, 4],
  ]);
});
