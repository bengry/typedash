import { Context, TypeEqualityComparator } from './types';

/**
 * Wrap the provided `areItemsEqual` method to manage the circular state, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 * @param areItemsEqual The comparator to wrap.
 * @returns A comparator that can handle circular references.
 */
export function createIsCircularTypeEqualityComparator<T>(
  areItemsEqual: TypeEqualityComparator<T>
) {
  return function isCircular(a: T, b: T, context: Context) {
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
      return areItemsEqual(a, b, context);
    }

    const { cache } = context;

    const cachedA = cache.get(a);
    const cachedB = cache.get(b);

    if (cachedA && cachedB) {
      return cachedA === b && cachedB === a;
    }

    cache.set(a, b);
    cache.set(b, a);

    const result = areItemsEqual(a, b, context);

    cache.delete(a);
    cache.delete(b);

    return result;
  };
}
