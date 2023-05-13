import { expect, it } from 'vitest';

import { min } from './min';

it('should return the minimum value of an array of numbers', () => {
  const result = min([5, 3, 8, 2, 9]);
  const expected = 2;
  expect(result).toEqual(expected);
});

it('should return undefined when given an empty array', () => {
  const result = min([]);
  const expected = undefined;
  expect(result).toEqual(expected);
});

it('should return undefined when given null or undefined', () => {
  const result1 = min(null);
  const expected1 = undefined;
  expect(result1).toEqual(expected1);

  const result2 = min(undefined);
  const expected2 = undefined;
  expect(result2).toEqual(expected2);
});

it('should return the minimum value of an array of objects using a value extractor', () => {
  const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 },
  ];

  const result = min(people, (person) => person.age);
  const expected = 20;
  expect(result).toEqual(expected);
});
