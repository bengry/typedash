import { expect, it } from 'vitest';

import { inRange } from './inRange.js';

it('should return true if the value is within the range', () => {
  expect(inRange(3, [1, 5])).toBe(true);
  expect(inRange(5, [1, 5], { inclusive: true })).toBe(true);
  expect(inRange(1, [1, 5], { inclusive: 'end' })).toBe(false);
});

it('should return false if the value is outside the range', () => {
  expect(inRange(5, [1, 5])).toBe(false);
  expect(inRange(0, [1, 5])).toBe(false);
  expect(inRange(6, [1, 5])).toBe(false);
});

it('should handle inclusive start', () => {
  expect(inRange(1, [1, 5], { inclusive: true })).toBe(true);
  expect(inRange(1, [1, 5], { inclusive: 'start' })).toBe(true);
  expect(inRange(1, [1, 5], { inclusive: 'end' })).toBe(false);
  expect(inRange(5, [1, 5], { inclusive: 'start' })).toBe(false);
});

it('should handle inclusive end', () => {
  expect(inRange(5, [1, 5], { inclusive: true })).toBe(true);
  expect(inRange(5, [1, 5], { inclusive: 'end' })).toBe(true);
  expect(inRange(5, [1, 5], { inclusive: 'start' })).toBe(false);
  expect(inRange(1, [1, 5], { inclusive: 'end' })).toBe(false);
});

it('should throw an error if the range is invalid', () => {
  expect(() => inRange(3, [5, 1])).toThrowError('Invalid range: [5,1]');
});
