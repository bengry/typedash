import { CastToString } from '../../types';

interface ClampOptions {
  /**
   * Whether the clamping should be inclusive of the range.
   * @default true
   */
  inclusive?: boolean | 'min' | 'max';
}

/**
 * Clamps a number to a specified range.
 * @param value The number to clamp.
 * @param range The range to clamp to, as a tuple of min and max values.
 * @param options Optional parameters.
 * @param options.inclusive Whether the clamping should be inclusive of the min and/or max value.
 * - If `true`, the clamping is inclusive of both min and max.
 * - If `false`, the clamping is exclusive of both min and max.
 * - If `'min'`, the clamping is inclusive of the min value but exclusive of the max value.
 * - If `'max'`, the clamping is exclusive of the min value but inclusive of the max value.
 * @returns The clamped number.
 * @example
 * ```typescript
 * clamp(3, [1, 5]); // 3
 * clamp(5, [1, 5]); // 5
 * clamp(5, [1, 5], { inclusive: false }); // 4
 * clamp(1, [1, 5], { inclusive: 'max' }); // 5
 * ```
 */
// eslint-disable-next-line consistent-return -- we have an exhaustive check, so we never get to the end of the function
export function clamp(
  value: number,
  range: readonly [min: number, max: number],
  options?: ClampOptions
): number {
  const [min, max] = range;
  if (min > max) {
    throw new RangeError(`Invalid range: [${min},${max}]`);
  }

  const { inclusive = true } = options ?? {};

  return {
    true: () => Math.max(min, Math.min(max, value)),
    false: () => Math.max(min + 1, Math.min(max - 1, value)),
    min: () => Math.max(min, Math.min(max - 1, value)),
    max: () => Math.max(min + 1, Math.min(max, value)),
  }[inclusive as CastToString<typeof inclusive>]();
}
