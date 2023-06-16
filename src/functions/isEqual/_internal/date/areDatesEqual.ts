/**
 * Whether the dates passed are equal in value.
 * @param value1 The first date.
 * @param value2 The second date.
 * @returns true if the two dates are equal, false otherwise.
 */
export function areDatesEqual(value1: Date, value2: Date): boolean {
  return Object.is(value1.getTime(), value2.getTime());
}
