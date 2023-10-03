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
  expectTypeOf(resultNull).toEqualTypeOf<[]>();

  expect(resultUndefined).toEqual([]);
  expectTypeOf(resultUndefined).toEqualTypeOf<[]>();
});

it('should remove from end for a negative count', () => {
  const result = take([1, 2, 3], -1);

  expect(result).toEqual([1, 2]);
  expectTypeOf(result).toEqualTypeOf<[1, 2]>();
});
