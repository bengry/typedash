import { expect, it } from 'vitest';
import { isEmpty } from './isEmpty';

it('should return true for empty string', () => {
  expect(isEmpty('')).toBe(true);
});

it('should return false for non-empty string', () => {
  expect(isEmpty('hello')).toBe(false);
});

it('should return true for zero number', () => {
  expect(isEmpty(0)).toBe(true);
});

it('should return true for NaN', () => {
  expect(isEmpty(Number.NaN)).toBe(true);
});

it('should return false for non-zero number', () => {
  expect(isEmpty(42)).toBe(false);
});

it('should return true for empty array', () => {
  expect(isEmpty([])).toBe(true);
});

it('should return false for non-empty array', () => {
  expect(isEmpty([1, 2, 3])).toBe(false);
});

it('should return true for empty object', () => {
  expect(isEmpty({})).toBe(true);
});

it('should return false for non-empty object', () => {
  expect(isEmpty({ a: 1, b: 2 })).toBe(false);
});

it('should return true for empty Map', () => {
  expect(isEmpty(new Map())).toBe(true);
});

it('should return false for non-empty Map', () => {
  const map = new Map([['a', 1]]);
  expect(isEmpty(map)).toBe(false);
});

it('should return true for empty Set', () => {
  expect(isEmpty(new Set())).toBe(true);
});

it('should return false for non-empty Set', () => {
  const set = new Set([1]);
  expect(isEmpty(set)).toBe(false);
});

it('should return true for null or undefined', () => {
  expect(isEmpty(null)).toBe(true);
  // eslint-disable-next-line unicorn/no-useless-undefined
  expect(isEmpty(undefined)).toBe(true);
});

it('should return false for non-empty value', () => {
  expect(isEmpty(1)).toBe(false);
  expect(isEmpty('hello')).toBe(false);
  expect(isEmpty([1])).toBe(false);
  expect(isEmpty({ a: 1 })).toBe(false);
  expect(isEmpty(new Map([[1, 2]]))).toBe(false);
  expect(isEmpty(new Set([1]))).toBe(false);
});
