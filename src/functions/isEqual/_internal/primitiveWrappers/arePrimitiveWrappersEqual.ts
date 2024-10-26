/**
 * Whether the primitive wrappers passed are equal in value.
 * @param value1 The first primitive wrapper.
 * @param value2 The second primitive wrapper.
 * @returns true if the two primitive wrappers are equal, false otherwise.
 */
export function arePrimitiveWrappersEqual(
  value1: PrimitiveWrapper,
  value2: PrimitiveWrapper
): boolean {
  return Object.is(value1.valueOf(), value2.valueOf());
}

export type PrimitiveWrapper = boolean | number | string;
