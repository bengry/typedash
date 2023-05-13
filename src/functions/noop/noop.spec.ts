import { expect, it } from 'vitest';

import { noop } from './noop';

it('should return undefined for any input', () => {
  const result1 = noop();
  const expected1 = undefined;
  expect(result1).toEqual(expected1);

  const result2 = noop(1, 'hello', { foo: 'bar' });
  const expected2 = undefined;
  expect(result2).toEqual(expected2);
});
