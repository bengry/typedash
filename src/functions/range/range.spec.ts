import { describe, expect, it } from 'vitest';

import { range } from './range';

describe('first', () => {
  it('should return an array of numbers from 0 to `end`', () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it('should return an empty array if `end` is 0', () => {
    expect(range(0)).toEqual([]);
  });

  it('should return an empty array if `end` is negative', () => {
    expect(range(-1)).toEqual([]);
  });

  it('should return an array of numbers from `start` to `end`', () => {
    expect(range(1, 4)).toEqual([1, 2, 3]);
  });

  it('should return an empty array if `start` is greater than `end`', () => {
    expect(range(4, 1)).toEqual([]);
  });

  it('should return an empty array if `start` is equal to `end`', () => {
    expect(range(1, 1)).toEqual([]);
  });

  it('should return an array if `start` is negative', () => {
    expect(range(-1, 1)).toEqual([-1, 0]);
  });

  it('should return an array of numbers from `start` to `end` with `step`', () => {
    expect(range(1, 5, 2)).toEqual([1, 3]);
  });

  it('should return an empty array if `step` is 0', () => {
    expect(range(1, 5, 0)).toEqual([]);
  });

  it('should return an empty array if `step` is negative', () => {
    expect(range(1, 5, -1)).toEqual([]);
  });
});
