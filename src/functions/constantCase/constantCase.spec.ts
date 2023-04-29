import { it, expect } from 'vitest';
import { constantCase } from './constantCase';

it('should convert a camelCase string to constant case', () => {
  const result = constantCase('fooBar');
  expect(result).toBe('FOO_BAR');
});

it('should convert a kebab-case string to constant case', () => {
  const result = constantCase('foo-bar');
  expect(result).toBe('FOO_BAR');
});

it('should convert a snake_case string to constant case', () => {
  const result = constantCase('foo_bar');
  expect(result).toBe('FOO_BAR');
});

it('should convert a space separated string to constant case', () => {
  const result = constantCase('foo bar');
  expect(result).toBe('FOO_BAR');
});

it('should convert a string with multiple separators to constant case', () => {
  const result = constantCase('foo_bar-baz qux');
  expect(result).toBe('FOO_BAR_BAZ_QUX');
});

it('should return an empty string if given an empty string', () => {
  const result = constantCase('');
  expect(result).toBe('');
});

it('should return the same string if given a string with no word characters', () => {
  const result = constantCase('!@#$%^&*()_+-=');
  expect(result).toBe('');
});
