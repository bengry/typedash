import { expect, expectTypeOf, it } from 'vitest';

import { difference } from './difference';

it('should return an array of values that are in array1 but not in array2', () => {
  const array1: number[] = [1, 2, 3, 4, 5];
  const array2: number[] = [2, 4];
  const result = difference(array1, array2);
  expect(result).toEqual([1, 3, 5]);
  expectTypeOf(result).toEqualTypeOf<number[]>();
});

it('should keep the type when one of the arrays is a literal', () => {
  expectTypeOf(difference([1, 2, 3] as number[], [2])).toEqualTypeOf<
    number[]
  >();
});

it('should return an array of values that are in array1 but not in array2 using a custom comparator', () => {
  const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const array2 = [{ id: 2 }, { id: 4 }];
  const comparator = (a: { id: number }, b: { id: number }) => a.id === b.id;
  const result = difference(array1, array2, comparator);
  expect(result).toEqual([{ id: 1 }, { id: 3 }, { id: 5 }]);
  expectTypeOf(result).toEqualTypeOf<Array<{ id: number }>>();
});

it('should return an empty array if array1 and array2 have the same values', () => {
  const result1 = difference([1, 2, 3], [1, 2, 3]);
  expect(result1).toEqual([]);
  expectTypeOf(result1).toEqualTypeOf<never[]>();

  const result2 = difference([1, 2, 3] as number[], [1, 2, 3] as number[]);
  expect(result2).toEqual([]);
  expectTypeOf(result2).toEqualTypeOf<number[]>();
});

it('should return array1 if array2 is empty', () => {
  const array1 = [1, 2, 3];
  const array2: number[] = [];
  const result = difference(array1, array2);
  expect(result).toEqual([1, 2, 3]);
  expectTypeOf(result).toEqualTypeOf<number[]>();
});

it('should return an empty array if array1 is empty', () => {
  const array1: number[] = [];
  const array2 = [1, 2, 3];
  const result = difference(array1, array2);
  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<number[]>();
});

it('should return an empty array if both arrays are empty', () => {
  const array1: number[] = [];
  const array2: number[] = [];
  const result = difference(array1, array2);
  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<number[]>();
});
