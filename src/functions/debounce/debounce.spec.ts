import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    const { useRealTimers } = vi.useFakeTimers({});
    return () => {
      useRealTimers();
    };
  });

  it('should debounce a function', () => {
    const func = vi.fn();
    const debouncedFunction = debounce(func, 100);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should debounce a function and call it with the last arguments', () => {
    const func = vi.fn();
    const debouncedFunction = debounce(func, 100);

    debouncedFunction(1);
    debouncedFunction(2);
    debouncedFunction(3);

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(3);
  });

  it('should have the same type signature as the original function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const func = vi.fn((a: number, b: string) => undefined);
    const debouncedFunction = debounce(func, 100);

    expectTypeOf(debouncedFunction).parameters.toEqualTypeOf<
      Parameters<typeof func>
    >();

    expectTypeOf(debouncedFunction).returns.toBeVoid();
  });

  it('should debounce a function with leading option', () => {
    const func = vi.fn();
    const debouncedFunction = debounce(func, 100, { leading: true });

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should clear the timeout', () => {
    const func = vi.fn();
    const debouncedFunction = debounce(func, 100);

    debouncedFunction();
    debouncedFunction.clear();

    vi.advanceTimersByTime(200);

    expect(func).not.toHaveBeenCalled();
  });

  it('should flush the function', () => {
    const func = vi.fn();
    const debouncedFunction = debounce(func, 100);

    debouncedFunction();
    debouncedFunction.flush();

    expect(func).toHaveBeenCalledTimes(1);
  });
});
