/**
 * Returns an array of numbers from 0 to the specified end value (exclusive).
 * @param end The end value of the range.
 * @returns An array of numbers from 0 to the specified end value (exclusive).
 * @example
 * ```ts
 * range(5) // [0, 1, 2, 3, 4]
 * ```
 */
export function range(end: number): number[];
/**
 * Returns an array of numbers from the specified start value to the specified end value (exclusive).
 * @param start The start value of the range.
 * @param end The end value of the range.
 * @param step The step between each value in the range.
 * @returns An array of numbers from the specified start value to the specified end value (exclusive).
 * @example
 * ```ts
 * range(2, 5) // [2, 3, 4]
 * range(2, 5, 2) // [2, 4]
 * ```
 */
export function range(start: number, end: number, step?: number): number[];
/**
 * Implementation for all overloads.
 * @param startOrEnd The start value of the range, or the end value of the range if the `end` parameter is specified.
 * @param end The end value of the range.
 * @param step The step between each value in the range.
 * @returns An array of numbers from the specified start value to the specified end value (exclusive).
 */
export function range(startOrEnd: number, end?: number, step = 1): number[] {
  if (step <= 0) {
    return [];
  }

  const calculatedStart = end == null ? 0 : startOrEnd;
  const calculatedEnd = end ?? startOrEnd;

  const result = [];

  for (let index = calculatedStart; index < calculatedEnd; index += step) {
    result.push(index);
  }

  return result;
}
