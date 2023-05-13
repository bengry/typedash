import { expect, it } from 'vitest';

import { capitalize } from './capitalize';

it('should capitalize the first letter of a string', () => {
  const result = capitalize('hello world');
  const expected = 'Hello world';
  expect(result).toEqual(expected);
});

it('should not modify an already capitalized string', () => {
  const result = capitalize('Hello world');
  const expected = 'Hello world';
  expect(result).toEqual(expected);
});

it('should return an empty string if given an empty string', () => {
  const result = capitalize('');
  const expected = '';
  expect(result).toEqual(expected);
});
