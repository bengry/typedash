import { expect, it } from 'vitest';

import { ensureSuffix } from './ensureSuffix';

it('should return the string with the suffix if it does not end with the suffix', () => {
  expect(ensureSuffix('foo', 'bar')).toBe('foobar');
});

it('should return the string without modification if it already ends with the suffix', () => {
  expect(ensureSuffix('foobar', 'bar')).toBe('foobar');
});

it('should handle empty strings as input', () => {
  expect(ensureSuffix('', 'bar')).toBe('bar');
  expect(ensureSuffix('foo', '')).toBe('foo');
  expect(ensureSuffix('', '')).toBe('');
});

it('should handle suffixes that are longer than the string', () => {
  expect(ensureSuffix('foo', 'barbaz')).toBe('foobarbaz');
});

it('should handle suffixes that are equal to the string', () => {
  expect(ensureSuffix('foo', 'foo')).toBe('foo');
});

it('should handle suffixes that are substrings of the string', () => {
  expect(ensureSuffix('foobar', 'bar')).toBe('foobar');
  expect(ensureSuffix('foobar', 'oob')).toBe('foobaroob');
});

it('should handle suffixes with special characters', () => {
  expect(ensureSuffix('foo', '-bar')).toBe('foo-bar');
  expect(ensureSuffix('foo-', '-bar')).toBe('foo--bar');
  expect(ensureSuffix('foo', '_bar')).toBe('foo_bar');
});
