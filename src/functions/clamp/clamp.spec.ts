import { expect, it } from 'vitest';

import { clamp } from './clamp';

it('should return the value if it is within the range', () => {
  expect(clamp(3, [1, 5])).toBe(3);
  expect(clamp(1, [1, 5])).toBe(1);
  expect(clamp(5, [1, 5])).toBe(5);
});

it('should return the minimum value if the value is below the range', () => {
  expect(clamp(0, [1, 5])).toBe(1);
  expect(clamp(-1, [1, 5])).toBe(1);
});

it('should return the maximum value if the value is above the range', () => {
  expect(clamp(6, [1, 5])).toBe(5);
  expect(clamp(10, [1, 5])).toBe(5);
});

it('should handle exclusive ranges', () => {
  expect(clamp(1, [1, 5], { inclusive: false })).toBe(2);
  expect(clamp(5, [1, 5], { inclusive: false })).toBe(4);
});

it('should handle "min" option', () => {
  expect(clamp(1, [1, 5], { inclusive: 'min' })).toBe(1);
  expect(clamp(0, [1, 5], { inclusive: 'min' })).toBe(1);
});

it('should handle "max" option', () => {
  expect(clamp(5, [1, 5], { inclusive: 'max' })).toBe(5);
  expect(clamp(6, [1, 5], { inclusive: 'max' })).toBe(5);
});

it('should throw an error if the range is invalid', () => {
  expect(() => clamp(3, [5, 1])).toThrow('Invalid range: [5,1]');
});
