import { expect, it } from 'vitest';

import { max } from './max';

it('should return the maximum value of an array of numbers', () => {
  const result = max([5, 3, 8, 2, 9]);
  const expected = 9;
  expect(result).toEqual(expected);
});

it('should return undefined when given an empty array', () => {
  const result = max([]);
  const expected = undefined;
  expect(result).toEqual(expected);
});

it('should return undefined when given null or undefined', () => {
  const result1 = max(null);
  const expected1 = undefined;
  expect(result1).toEqual(expected1);

  const result2 = max(undefined);
  const expected2 = undefined;
  expect(result2).toEqual(expected2);
});

it('should return the maximum value of an array of objects using a value extractor', () => {
  const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 },
  ];

  const result = max(people, (person) => person.age);
  const expected = 30;
  expect(result).toEqual(expected);
});
