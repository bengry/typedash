import { expect, it } from 'vitest';

import { single } from './single';

it('should return undefined for an empty iterable', () => {
  const result = single([]);
  expect(result).toBeUndefined();
});

it('should return the single element for an iterable with one element', () => {
  const result = single([1]);
  expect(result).toBe(1);
});

it('should return undefined for an iterable with multiple elements', () => {
  const result = single([1, 2]);
  expect(result).toBeUndefined();
});

it('should return the single matching element for a predicate that matches one element', () => {
  const result = single([1, 2, 3], (x) => x % 2 === 0);
  expect(result).toBe(2);
});

it('should return undefined for a predicate that matches multiple elements', () => {
  const result = single([1, 2, 3], (x) => x >= 1);
  expect(result).toBeUndefined();
});

it('should return undefined for a null source', () => {
  const result = single(null);
  expect(result).toBeUndefined();
});

it('should return undefined for an undefined source', () => {
  const result = single(undefined);
  expect(result).toBeUndefined();
});
