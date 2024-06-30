import { beforeEach, describe, expect, it, vi } from 'vitest';

import { throttle } from './throttle'; // Adjust the import path as needed

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    return () => {
      vi.useRealTimers();
    };
  });

  it('should call the function immediately on the first call', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function more than once within the wait time', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function again after the wait time', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    vi.advanceTimersByTime(50);
    throttled();
    vi.advanceTimersByTime(51);
    throttled();

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should call the function with the correct arguments', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('a', 'b');
    expect(func).toHaveBeenCalledWith('a', 'b');
  });

  it('should call the function with the correct context', () => {
    const context = { name: 'test' };
    const func = vi.fn(function mockFunction(this: typeof context) {
      expect(this).toBe(context);
    });
    const throttled = throttle(func, 100);

    throttled.call(context);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function on the leading edge when leading option is false', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100, { leading: false });

    throttled();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function on the trailing edge when trailing option is false', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100, { trailing: false });

    throttled();
    throttled();
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel future calls when cancel is called', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should execute pending calls immediately when flush is called', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled.flush();

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should work correctly with a wait time of 0', () => {
    const func = vi.fn();
    const throttled = throttle(func, 0);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should use default wait time of 0 if not provided', () => {
    const func = vi.fn();
    const throttled = throttle(func);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(3);
  });
});
