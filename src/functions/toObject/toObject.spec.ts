import { expect, it } from 'vitest';

import { toObject } from './toObject';

it('should return an empty object when given an empty array', () => {
  const result = toObject([]);
  expect(result).toEqual({});
});

it('should convert an array of strings to an object with the same keys and values', () => {
  const input = ['a', 'b', 'c'];
  const result = toObject(input);
  expect(result).toEqual({ a: 'a', b: 'b', c: 'c' });
});

it('should handle arrays with duplicate values', () => {
  const input = ['a', 'b', 'b', 'c', 'c', 'c'];
  const result = toObject(input);
  expect(result).toEqual({ a: 'a', b: 'b', c: 'c' });
});

it('should handle arrays with special characters', () => {
  const input = ['a', 'b_c', 'd-e'];
  const result = toObject(input);
  expect(result).toEqual({
    a: 'a',
    // biome-ignore lint/style/useNamingConvention: this is the correct key post-transformation
    b_c: 'b_c',
    'd-e': 'd-e',
  });
});

it('should handle arrays with empty strings', () => {
  const input = ['a', '', 'b'];
  const result = toObject(input);
  expect(result).toEqual({ a: 'a', '': '', b: 'b' });
});

it('should preserve the order of the keys', () => {
  const input = ['b', 'a', 'c'];
  const result = toObject(input);
  expect(Object.keys(result)).toEqual(['b', 'a', 'c']);
});
