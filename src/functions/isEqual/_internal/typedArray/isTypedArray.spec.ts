import { expect, it, vi } from 'vitest';

import { assert } from '../../../assert';

import { isTypedArray } from './isTypedArray';

it('should return true for typed arrays', () => {
  assert(isTypedArray !== null, 'isTypedArray is null');

  expect(isTypedArray(new Int8Array())).toBe(true);
  expect(isTypedArray(new Uint8Array())).toBe(true);
  expect(isTypedArray(new Uint8ClampedArray())).toBe(true);
  expect(isTypedArray(new Int16Array())).toBe(true);
  expect(isTypedArray(new Uint16Array())).toBe(true);
  expect(isTypedArray(new Int32Array())).toBe(true);
  expect(isTypedArray(new Uint32Array())).toBe(true);
  expect(isTypedArray(new Float32Array())).toBe(true);
  expect(isTypedArray(new Float64Array())).toBe(true);
});

it('should return false for non-typed arrays', () => {
  assert(isTypedArray !== null, 'isTypedArray is null');

  expect(isTypedArray([])).toBe(false);
  expect(isTypedArray({})).toBe(false);
  expect(isTypedArray(null)).toBe(false);
  expect(isTypedArray(undefined)).toBe(false);
  expect(isTypedArray('')).toBe(false);
  expect(isTypedArray(0)).toBe(false);
  expect(isTypedArray(true)).toBe(false);
  expect(isTypedArray(false)).toBe(false);
});

it('should be null if ArrayBuffer is not available', () => {
  vi.stubGlobal('ArrayBuffer', undefined);

  expect(isTypedArray).toBe(null);

  vi.clearAllMocks();

  vi.stubGlobal('ArrayBuffer', {
    isView: undefined,
  });

  expect(isTypedArray).toBe(null);

  vi.clearAllMocks();
});
