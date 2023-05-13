import { expect, it } from 'vitest';

import { uniqueId } from './uniqueId';

it('should generate a unique identifier with the specified prefix', () => {
  const prefix = 'test-';
  const result = uniqueId(prefix);
  expect(result).toMatch(new RegExp(`^${prefix}[\\da-z]+$`));
});

it('should generate a unique identifier without a prefix', () => {
  const result = uniqueId();
  expect(result).toMatch(/^[\da-z]+$/);
});
