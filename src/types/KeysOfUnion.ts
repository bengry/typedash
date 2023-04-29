/**
 * Gets the value at key of object. Similar to `keyof T`, but gets the keys of all the types in a union.
 *
 * See https://stackoverflow.com/a/49402091/2677913 for more details.
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;
