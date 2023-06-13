import { expect, expectTypeOf, it } from 'vitest';

import { camelCase } from './camelCase';

it('should convert kebab-case to camelCase', () => {
  const result = camelCase('foo-bar-baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert snake_case to camelCase', () => {
  const result = camelCase('foo_bar_baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert PascalCase to camelCase', () => {
  const result = camelCase('FooBarBaz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert spaces to camelCase', () => {
  const result = camelCase('foo bar baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return the same for non-alphabetic strings', () => {
  const result = camelCase('123');
  const expected = '123';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return an empty string for an empty string', () => {
  const result = camelCase('');
  const expected = '';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single uppercase letter to lowercase', () => {
  const result = camelCase('A');
  const expected = 'a';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single lowercase letter to lowercase', () => {
  const result = camelCase('z');
  const expected = 'z';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only uppercase letters to lowercase', () => {
  const result = camelCase('FOOBARBAZ');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only lowercase letters to camelCase', () => {
  const result = camelCase('foobarbaz');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with mixed case and non-alphabetic characters to camelCase', () => {
  const result = camelCase('foo-bar123-baz');
  const expected = 'fooBar123Baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with non-alphabetic characters to camelCase', () => {
  const result = camelCase('foo-bar_baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with leading and trailing spaces to camelCase', () => {
  const result = camelCase('  foo bar baz  ');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive spaces to camelCase', () => {
  const result = camelCase('foo   bar   baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive underscores to camelCase', () => {
  const result = camelCase('foo___bar___baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive hyphens to camelCase', () => {
  const result = camelCase('foo---bar---baz');
  const expected = 'fooBarBaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});
