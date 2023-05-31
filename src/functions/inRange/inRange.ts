import { assertNever } from '../assertNever/assertNever';

interface InRangeOptions {
  /**
   * Whether the range is inclusive of the end value.
   * @default 'start'
   */
  inclusive?: boolean | 'start' | 'end';
}

/**
 * Checks if a number is within a specified range.
 *
 * @param value - The number to check.
 * @param range - The range to check against, as a tuple of start and end values.
 * @param options - Optional parameters.
 * @param options.inclusive - Whether the range is inclusive of the start and/or end value.
 *  - If `true`, the range is inclusive of both start and end.
 *  - If `false`, the range is exclusive of both start and end.
 *  - If `'start'`, the range is inclusive of the start value but exclusive of the end value.
 *  - If `'end'`, the range is exclusive of the start value but inclusive of the end value.
 *
 * @default 'start'
 *
 * @returns `true` if the number is within the range, `false` otherwise.
 *
 * @example
 * ```typescript
 * inRange(3, [1, 5]); // true
 * inRange(5, [1, 5]); // false
 * inRange(5, [1, 5], { inclusive: true }); // true
 * inRange(1, [1, 5], { inclusive: 'end' }); // false
 * ```
 */
// eslint-disable-next-line consistent-return -- we have an exhaustive check, so we never get to the end of the function
export function inRange(
  value: number,
  range: readonly [start: number, end: number],
  options?: InRangeOptions
): boolean {
  const [start, end] = range;
  const { inclusive = 'start' } = options ?? {};

  if (start > end) {
    throw new RangeError(`Invalid range: [${start},${end}]`);
  }

  switch (inclusive) {
    case true: {
      return value >= start && value <= end;
    }
    case false: {
      return value > start && value < end;
    }
    case 'start': {
      return value >= start && value < end;
    }
    case 'end': {
      return value > start && value <= end;
    }
    default: {
      assertNever(inclusive);
    }
  }
}
