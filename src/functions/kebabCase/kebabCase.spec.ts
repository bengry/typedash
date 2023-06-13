import { expect, expectTypeOf, it } from 'vitest';

import { kebabCase } from './kebabCase';

it('should convert camelCase to kebab-case', () => {
  const result = kebabCase('fooBarBaz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert PascalCase to kebab-case', () => {
  const result = kebabCase('FooBarBaz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert spaces to hyphens', () => {
  const result = kebabCase('foo bar baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert underscores to hyphens', () => {
  const result = kebabCase('foo_bar_baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return the same for non-alphabetic strings', () => {
  const result = kebabCase('123');
  const expected = '123';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should return an empty string for an empty string', () => {
  const result = kebabCase('');
  const expected = '';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single uppercase letter to lowercase', () => {
  const result = kebabCase('A');
  const expected = 'a';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a single lowercase letter to lowercase', () => {
  const result = kebabCase('z');
  const expected = 'z';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only uppercase letters to lowercase', () => {
  const result = kebabCase('FOOBARBAZ');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with only lowercase letters to kebab-case', () => {
  const result = kebabCase('foobarbaz');
  const expected = 'foobarbaz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with mixed case and non-alphabetic characters to kebab-case', () => {
  const result = kebabCase('fooBar123Baz');
  const expected = 'foo-bar123-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with non-alphabetic characters to kebab-case', () => {
  const result = kebabCase('foo-bar_baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with leading and trailing spaces to kebab-case', () => {
  const result = kebabCase('  foo bar baz  ');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive spaces to kebab-case', () => {
  const result = kebabCase('foo   bar   baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive underscores to kebab-case', () => {
  const result = kebabCase('foo___bar___baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});

it('should convert a string with multiple consecutive hyphens to kebab-case', () => {
  const result = kebabCase('foo---bar---baz');
  const expected = 'foo-bar-baz';
  expect(result).toBe(expected);
  expectTypeOf(result).toEqualTypeOf<typeof expected>();
});
