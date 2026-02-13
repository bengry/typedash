import { expect, expectTypeOf, it } from 'vitest';

import { startCase } from './startCase';

it('should convert kebab-case to start case', () => {
  const result = startCase('foo-bar-baz');
  const expected = 'Foo Bar Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert snake_case to start case', () => {
  const result = startCase('foo_bar_baz');
  const expected = 'Foo Bar Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert camelCase to start case', () => {
  const result = startCase('fooBar');
  const expected = 'Foo Bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert PascalCase to start case', () => {
  const result = startCase('FooBarBaz');
  const expected = 'Foo Bar Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert spaces to start case', () => {
  const result = startCase('foo bar baz');
  const expected = 'Foo Bar Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle CONSTANT_CASE preserving uppercase', () => {
  const result = startCase('__FOO_BAR__');
  const expected = 'FOO BAR';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle leading and trailing dashes', () => {
  const result = startCase('--foo-bar--');
  const expected = 'Foo Bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return the same for non-alphabetic strings', () => {
  const result = startCase('123');
  const expected = '123';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return an empty string for an empty string', () => {
  const result = startCase('');
  const expected = '';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle a single lowercase letter', () => {
  const result = startCase('a');
  const expected = 'A';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle a single uppercase letter', () => {
  const result = startCase('A');
  const expected = 'A';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle consecutive separators', () => {
  const result = startCase('foo---bar___baz');
  const expected = 'Foo Bar Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle acronyms followed by lowercase', () => {
  const result = startCase('FOOBar');
  const expected = 'FOO Bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle strings with numbers', () => {
  const result = startCase('foo2bar');
  expect(result).toBe('Foo2 Bar');
});

it('should handle mixed case with numbers and separators', () => {
  const result = startCase('foo-bar123-baz');
  const expected = 'Foo Bar123 Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});
