import { AnyFunction } from '../../types/_internal';

/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.
 * @param func The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @param options Optional configuration options.
 * @param options.leading Whether to call the function on the leading edge of the timeout.
 * @returns A debounced function that can be called multiple times, but only invokes `func` once per `delay` milliseconds.
 */
export function debounce<TFunction extends AnyFunction<void | undefined>>(
  func: TFunction,
  delay: number,
  options: {
    /**
     * Whether to call the function on the leading edge of the timeout.
     * @default false
     */
    leading?: boolean;
  } = {}
): DebouncedFunction<TFunction> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isCalled = false;
  let latestArguments: Parameters<TFunction>;

  function debouncedFunction(...args: Parameters<TFunction>): void {
    latestArguments = args;

    if (options.leading && !isCalled) {
      func(...args);
      isCalled = true;
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (!options.leading) {
        func(...args);
      }
      isCalled = false;
    }, delay);
  }

  debouncedFunction.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    func(...latestArguments);
  };

  debouncedFunction.clear = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedFunction;
}

interface DebouncedFunction<TFunction extends AnyFunction<void | undefined>> {
  (...args: Parameters<TFunction>): void;
  clear(): void;
  flush(): void;
}
