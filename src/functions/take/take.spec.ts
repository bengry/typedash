import { expect, expectTypeOf, it } from 'vitest';

import { take } from './take';

it('should return the first `count` elements of the array', () => {
  const result = take([1, 2, 3], 2);

  expect(result).toEqual([1, 2]);
  expectTypeOf(result).toEqualTypeOf<[1, 2]>();
});

it('should return an empty array if the array is empty', () => {
  const result = take([], 2);

  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<[]>();
});

it('should return an empty array if the array is `null` or `undefined`', () => {
  const resultNull = take(null, 2);
  const resultUndefined = take(undefined, 2);

  expect(resultNull).toEqual([]);
  expectTypeOf(resultNull).toEqualTypeOf<unknown[]>();

  expect(resultUndefined).toEqual([]);
  expectTypeOf(resultUndefined).toEqualTypeOf<unknown[]>();
});

it('should return an empty array for a negative count', () => {
  const result = take([1, 2, 3], -1);

  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<[]>();
});

it('should return proper types for typed array', () => {
  const numberArray: number[] = [];
  const stringArray: string[] = [];
  const emptyArray: unknown[] = [];
  const objectArray: { a: string }[] = [];

  expectTypeOf(take(numberArray, 2)).toEqualTypeOf<number[]>();
  expectTypeOf(take(stringArray, 2)).toEqualTypeOf<string[]>();
  expectTypeOf(take(emptyArray, 2)).toEqualTypeOf<unknown[]>();
  expectTypeOf(take(objectArray, 2)).toEqualTypeOf<{ a: string }[]>();
});
