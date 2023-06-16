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

it('should use a pseudo-random UUID if crypto.randomUUID is not available', () => {
  vi.stubGlobal('crypto', undefined);

  const result = uniqueId();
  expect(result).toMatch(/^[\da-z-]+$/);

  vi.unstubAllGlobals();

  vi.stubGlobal('crypto', {
    randomUUID: undefined,
  } satisfies Partial<Crypto>);
  const result2 = uniqueId();
  expect(result2).toMatch(/^[\da-z-]+$/);

  vi.unstubAllGlobals();
});
