import type { Context } from '../types';

/**
 * Whether the `Set`s are equal in value.
 * @param set1 The first `Set`.
 * @param set2 The second `Set`.
 * @param context The context object.
 * @returns true if the two `Set`s are equal, false otherwise.
 */
export function areSetsEqual(
  set1: ReadonlySet<unknown>,
  set2: ReadonlySet<unknown>,
  context: Context
): boolean {
  if (set1.size !== set2.size) {
    return false;
  }

  const matchedIndices: Record<number, true> = {};

  for (const element1 of set1) {
    let hasMatch = false;
    let matchIndex = 0;

    for (const element2 of set2) {
      if (
        !hasMatch &&
        !matchedIndices[matchIndex] &&
        // biome-ignore lint/suspicious/noAssignInExpressions: faster and simpler in this case due to the nature of the callsite
        (hasMatch = context.equals(
          element1,
          element2,
          element1,
          element2,
          set1,
          set2,
          context
        ))
      ) {
        matchedIndices[matchIndex] = true;
      }

      matchIndex++;
    }

    if (!hasMatch) {
      return false;
    }
  }

  return true;
}
