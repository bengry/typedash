import { expect, expectTypeOf, it } from 'vitest';

import { snakeCase } from './snakeCase';

it('should convert camelCase to snake_case', () => {
  const result = snakeCase('fooBarBaz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert PascalCase to snake_case', () => {
  const result = snakeCase('FooBarBaz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert kebab-case to snake_case', () => {
  const result = snakeCase('foo-bar-baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert spaces to underscores', () => {
  const result = snakeCase('foo bar baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert CONSTANT_CASE to snake_case', () => {
  const result = snakeCase('FOO_BAR_BAZ');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return an empty string for an empty string', () => {
  const result = snakeCase('');
  const expected = '';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single uppercase letter to lowercase', () => {
  const result = snakeCase('A');
  const expected = 'a';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single lowercase letter to lowercase', () => {
  const result = snakeCase('z');
  const expected = 'z';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return the same for non-alphabetic strings', () => {
  const result = snakeCase('123');
  const expected = '123';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only uppercase letters to lowercase', () => {
  const result = snakeCase('FOOBARBAZ');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only lowercase letters to snake_case', () => {
  const result = snakeCase('foobarbaz');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle leading and trailing hyphens', () => {
  const result = snakeCase('--foo-bar--');
  const expected = 'foo_bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle leading and trailing underscores', () => {
  const result = snakeCase('__FOO_BAR__');
  const expected = 'foo_bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with mixed case and numbers to snake_case', () => {
  const result = snakeCase('fooBar123Baz');
  const expected = 'foo_bar123_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with mixed separators to snake_case', () => {
  const result = snakeCase('foo-bar_baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle leading and trailing spaces', () => {
  const result = snakeCase('  foo bar baz  ');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle multiple consecutive spaces', () => {
  const result = snakeCase('foo   bar   baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle multiple consecutive underscores', () => {
  const result = snakeCase('foo___bar___baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle multiple consecutive hyphens', () => {
  const result = snakeCase('foo---bar---baz');
  const expected = 'foo_bar_baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should handle acronyms at the start', () => {
  const result = snakeCase('FOOBar');
  const expected = 'foo_bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert snake_case input unchanged', () => {
  const result = snakeCase('foo_bar');
  const expected = 'foo_bar';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});
