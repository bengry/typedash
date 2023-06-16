import { expect, it, vi } from 'vitest';

import { uniqueId } from './uniqueId';

it('should generate a unique identifier with the specified prefix', () => {
  const prefix = 'test-';
  const result = uniqueId(prefix);
  expect(result).toMatch(new RegExp(`^${prefix}[\\da-z-]+$`));
});

it('should generate a unique identifier without a prefix', () => {
  const result = uniqueId();
  expect(result).toMatch(/^[\da-z-]+$/);
});

it('should use the built-in crypto.randomUUID function if available', () => {
  const fakeUUID = 'c208ff76-32df-46fc-ae75-e7e1abc52438';
  vi.stubGlobal('crypto', {
    randomUUID() {
      return fakeUUID;
    },
  } satisfies Partial<Crypto>);

  const result = uniqueId();
  expect(result).toBe(fakeUUID);

  vi.clearAllMocks();
});
