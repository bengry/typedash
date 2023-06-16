import { Context } from '../types';

/**
 * Whether the `Map`s are equal in value.
 * @param value1 The first `Map`.
 * @param value2 The second `Map`.
 * @param context The context object.
 * @returns true if the two `Map`s are equal, false otherwise.
 */
export function areMapsEqual(
  value1: ReadonlyMap<unknown, unknown>,
  value2: ReadonlyMap<unknown, unknown>,
  context: Context
): boolean {
  if (value1.size !== value2.size) {
    return false;
  }

  const matchedIndices: Record<number, true> = {};

  let index = 0;

  for (const [aKey, aValue] of value1) {
    let hasMatch = false;
    let matchIndex = 0;

    for (const [bKey, bValue] of value2) {
      if (
        !hasMatch &&
        !matchedIndices[matchIndex] &&
        // eslint-disable-next-line no-cond-assign
        (hasMatch =
          context.equals(
            aKey,
            bKey,
            index,
            matchIndex,
            value1,
            value2,
            context
          ) &&
          context.equals(aValue, bValue, aKey, bKey, value1, value2, context))
      ) {
        matchedIndices[matchIndex] = true;
      }

      matchIndex++;
    }

    if (!hasMatch) {
      return false;
    }

    index++;
  }

  return true;
}
