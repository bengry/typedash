export const objectFromEntries: ObjectFromEntries = Object.fromEntries;

interface ObjectFromEntries {
  <K extends PropertyKey, V>(entries: Iterable<readonly [K, V]>): Record<K, V>;
}
