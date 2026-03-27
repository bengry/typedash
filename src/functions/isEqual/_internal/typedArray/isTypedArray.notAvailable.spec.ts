/**
 * We have to test this file separately because we need to stub the global and use `vi.hoisted`, which affects the whole file.
 */

import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  vi.stubGlobal('ArrayBuffer', undefined);
});

import { isTypedArray } from './isTypedArray';

describe('ArrayBuffer is not available', () => {
  it('should be null if ArrayBuffer is not available', () => {
    expect(isTypedArray).toBeNull();

    vi.stubGlobal('ArrayBuffer', {
      isView: undefined,
    });

    expect(isTypedArray).toBeNull();

    vi.unstubAllGlobals();
  });
});
