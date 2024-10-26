import type { AnyFunction } from '../../types/_internal';

interface ThrottleOptions {
  /**
   * Specify invoking on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean;
  /**
   * Specify invoking on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean;
}

/**
 * Creates a throttled function that limits the rate at which it can be called.
 * @param func The function to be throttled.
 * @param wait The number of milliseconds to wait between each invocation of the function.
 * @param options The options for the throttling behavior.
 * @param options.leading Whether to call the function on the leading edge of the timeout.
 * @param options.trailing Whether to call the function on the trailing edge of the timeout.
 * @returns The throttled function with `cancel` and `flush` methods.
 */
export function throttle<TFunction extends AnyFunction>(
  func: TFunction,
  wait = 0,
  options: ThrottleOptions = {}
): ThrottledFunction<TFunction> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArguments: Parameters<TFunction> | null = null;
  let lastContext: ThisParameterType<TFunction> | null = null;
  let lastInvokeTime = 0;

  const { leading = true, trailing = true } = options;

  function invokeFunc(time: number) {
    lastInvokeTime = time;
    func.apply(lastContext, lastArguments ?? []);
    lastContext = null;
    lastArguments = null;
  }

  function trailingEdge() {
    if (trailing && lastArguments) {
      invokeFunc(Date.now());
    }
    timeoutId = null;
  }

  function timerExpired() {
    const time = Date.now();
    if (time - lastInvokeTime >= wait) {
      trailingEdge();
    } else {
      timeoutId = setTimeout(timerExpired, wait - (time - lastInvokeTime));
    }
  }

  function throttledFunction(
    this: ThisParameterType<TFunction>,
    ...args: Parameters<TFunction>
  ) {
    const time = Date.now();
    if (!lastInvokeTime && !leading) {
      lastInvokeTime = time;
    }

    const remaining = wait - (time - lastInvokeTime);
    lastArguments = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      invokeFunc(time);
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(timerExpired, remaining);
    }
  }

  throttledFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = 0;
    lastArguments = null;
    lastContext = null;
    timeoutId = null;
  };

  throttledFunction.flush = () => {
    if (timeoutId) {
      invokeFunc(Date.now());
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttledFunction;
}

interface ThrottledFunction<TFunction extends AnyFunction> {
  (...args: Parameters<TFunction>): void;
  cancel: () => void;
  flush: () => void;
}
