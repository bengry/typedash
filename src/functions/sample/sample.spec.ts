import { expect, expectTypeOf, it } from 'vitest';

import type { Maybe } from '../../types';

import { sample } from './sample';

it('returns a random item from the input iterable', () => {
  const source = [1, 2, 3];
  const result = sample(source);
  expect(source).toContain(result);
});

it('returns undefined if the input iterable is null or undefined', () => {
  expect(sample(null)).toBeUndefined();
  expect(sample(undefined)).toBeUndefined();
});

it('returns undefined if the input iterable is empty', () => {
  expect(sample<number>([])).toBeUndefined();
});

it('returns a random item from the input iterable with one item', () => {
  const source = [1];
  const result = sample(source);
  expect(result).toBe(1);
});

it('returns a random item from the input iterable with multiple items', () => {
  const source = [1, 2, 3];
  const result = sample(source);
  expect(source).toContain(result);
});

it('should have a non-nullable return type when a non-nullable iterable is provided', () => {
  expectTypeOf(sample([1, 2, 3])).toEqualTypeOf<1 | 2 | 3>();
  expectTypeOf(sample<number>([1, 2, 3])).toBeNumber();
});

it('should have a nullable return type when a non-nullable iterable is provided', () => {
  expectTypeOf(sample([1, 2, 3] as Maybe<number[]>)).toBeNullable();
});

it('should allow specifying a count for the number of items to return', () => {
  const source = [1, 2, 3];
  const sampleSize = 2;
  const result = sample(source, sampleSize);
  expect(result).toHaveLength(sampleSize);

  for (const item of result) {
    expect(item).oneOf(source);
  }
});

it('should return undefined if count is less than or equal to zero', () => {
  const source = [1, 2, 3];
  expect(sample(source, 0)).toEqual([]);
  expect(sample(source, -1)).toEqual([]);
});
