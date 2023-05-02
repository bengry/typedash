import { expect, it } from 'vitest';

import { unique } from './unique';

it('returns an empty array if given empty values', () => {
  expect(unique([], (a, b) => a === b)).toEqual([]);
  expect(unique(undefined)).toEqual([]);
  expect(unique(null)).toEqual([]);
});

it('returns an array with only one element if given a single-element iterable', () => {
  expect(unique([1])).toEqual([1]);
});

it('returns an array with only unique elements based on a custom comparator that compares object properties', () => {
  expect(
    unique(
      [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'alice' },
        { id: 5, name: 'eve' },
      ],
      (a, b) => a.name.toLowerCase() === b.name.toLowerCase()
    )
  ).toEqual([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 5, name: 'eve' },
  ]);
});

it('returns an array with the same elements if given an iterable with no duplicates', () => {
  expect(unique([1, 2, 3], (a, b) => a === b)).toEqual([1, 2, 3]);
});

it('returns an array with only unique elements if given an iterable with duplicates', () => {
  expect(unique([1, 2, 2, 3, 3, 3], (a, b) => a === b)).toEqual([1, 2, 3]);
});

it('preserves the order of the elements in the input iterable', () => {
  const input = [1, 3, 2, 1, 2, 3];
  const expected = [1, 3, 2];
  expect(unique(input)).toEqual(expected);
});
