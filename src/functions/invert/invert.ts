export function invert<T extends Record<PropertyKey, PropertyKey>>(
  object: T
): Inverted<T> {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [value, key])
  ) as Inverted<T>;
}

type Inverted<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
