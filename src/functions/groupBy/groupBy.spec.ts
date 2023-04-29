import { expect, it } from 'vitest';

import { groupBy } from './groupBy';

it('should group an array with groups of single items', () => {
  const array = [
    { name: 'a', value: 1 },
    { name: 'b', value: 2 },
    { name: 'c', value: 3 },
  ];

  const result = groupBy(array, (item) => item.name);
  expect(result).toEqual({
    a: [{ name: 'a', value: 1 }],
    b: [{ name: 'b', value: 2 }],
    c: [{ name: 'c', value: 3 }],
  });
});
