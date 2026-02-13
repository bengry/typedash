import { expect, expectTypeOf, it } from 'vitest';

import { shuffle } from './shuffle';

it('returns an array with the same length as the input', () => {
  const result = shuffle([1, 2, 3, 4]);
  expect(result).toHaveLength(4);
});

it('returns an array containing all the same elements', () => {
  const input = [1, 2, 3, 4, 5];
  const result = shuffle(input);
  expect(result).toHaveLength(input.length);
  expect(result).toEqual(expect.arrayContaining(input));
  expect(input).toEqual(expect.arrayContaining(result));
});

it('does not mutate the original array', () => {
  const input = [1, 2, 3, 4];
  const copy = [...input];
  shuffle(input);
  expect(input).toEqual(copy);
});

it('returns an empty array for an empty input', () => {
  expect(shuffle([])).toEqual([]);
});

it('returns an empty array for null', () => {
  expect(shuffle(null)).toEqual([]);
});

it('returns an empty array for undefined', () => {
  expect(shuffle(undefined)).toEqual([]);
});

it('returns a single-element array unchanged', () => {
  expect(shuffle([42])).toEqual([42]);
});

it('returns a new array reference', () => {
  const input = [1, 2, 3];
  const result = shuffle(input);
  expect(result).not.toBe(input);
});

it('should return T[] type', () => {
  expectTypeOf(shuffle([1, 2, 3])).toEqualTypeOf<number[]>();
  expectTypeOf(shuffle(['a', 'b'])).toEqualTypeOf<string[]>();
});

it('should accept readonly arrays', () => {
  const input: readonly number[] = [1, 2, 3];
  const result = shuffle(input);
  expectTypeOf(result).toEqualTypeOf<number[]>();
  expect(result).toHaveLength(3);
});

it('should accept null and undefined inputs', () => {
  const nullResult = shuffle(null);
  const undefinedResult = shuffle(undefined);
  expectTypeOf(nullResult).toBeArray();
  expectTypeOf(undefinedResult).toBeArray();
});
