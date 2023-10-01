import { expect, expectTypeOf, it } from 'vitest';

import { Falsey } from '../../types';

import { compact } from './compact';

it('should remove all falsey values from the array', () => {
  const original = [...allFalsyValues, 1, false, 2, 3, 4];
  const result = compact(original);
  expect(result).toEqual([1, 2, 3, 4]);
  expectTypeOf(result).toEqualTypeOf<
    OmitFalseyArrayElements<typeof original>
  >();
});

it('should return an empty array when given an empty array', () => {
  expect(compact([])).toEqual([]);
});

it('should return an empty array when given an array of only falsey values', () => {
  const original = [...allFalsyValues];
  const result = compact(original);
  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<
    OmitFalseyArrayElements<typeof original>
  >();
});

it('should return a new array and not modify the original array', () => {
  const input = [1, 2, 3];
  const result = compact(input);

  expect(result).toEqual([1, 2, 3]);
  expect(result).not.toBe(input);

  expectTypeOf(result).toEqualTypeOf<OmitFalseyArrayElements<typeof input>>();
});

it('should handle arrays with null or undefined values', () => {
  const input = [1, null, 2, undefined, 3];
  const result = compact(input);
  expect(result).toEqual([1, 2, 3]);
  expectTypeOf(result).toEqualTypeOf<OmitFalseyArrayElements<typeof input>>();
});

it('should handle input being `null` or `undefined`', () => {
  expect(compact(null)).toEqual([]);
  expect(compact(undefined)).toEqual([]);
});

const allFalsyValues = [
  false,
  null,
  undefined,
  Number.NaN,
  '',
  0,
  BigInt(0),
] as const;

type OmitFalsey<T> = Exclude<T, Falsey>;
type OmitFalseyArrayElements<T extends readonly unknown[]> = OmitFalsey<
  T[number]
>[];
