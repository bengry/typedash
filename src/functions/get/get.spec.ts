import { expect, it } from 'vitest';

import { get } from './get';

it('returns the value at the specified path', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, 'a.b.c');
  expect(result).toBe(1);
});

it('returns undefined for non-existent paths', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, 'a.b.d');
  expect(result).toBeUndefined();
});

it('returns the default value for non-existent paths when provided', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, 'a.b.d');
  expect(result).toBeUndefined();
});

it('returns the value at the specified array path', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, ['a', 'b', 'c']);
  expect(result).toBe(1);
});

it('returns undefined for non-existent array paths', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, ['a', 'b', 'd']);
  expect(result).toBeUndefined();
});

it('returns the default value for non-existent array paths when provided', () => {
  const object = { a: { b: { c: 1 } } };
  const result = get(object, ['a', 'b', 'd']);
  expect(result).toBeUndefined();
});
