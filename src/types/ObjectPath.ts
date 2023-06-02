import { AnyFunction } from './_internal/AnyFunction';

type RecordFunctions<T> = keyof {
  [K in keyof T as NonNullable<T[K]> extends AnyFunction ? K : never]: K;
};

// The below two helper types are here to make sure the property in a path is not nullable
// If it is, we still want to be able to use it in the path.
type NormalizedPath<Type, ExcludeFromType> = Path<
  NonNullable<Type>,
  Exclude<keyof NonNullable<Type>, ExcludeFromType>
>;
type OfType<D, E> = NonNullable<D> extends E ? true : false;

type Path<T, K extends keyof T> = K extends string
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    OfType<T[K], Record<string, any>> extends true
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      OfType<T[K], ArrayLike<any>> extends true
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        K | `${K}.${NormalizedPath<T[K], keyof any[]>}` | `${K}[${number}]`
      : K | `${K}.${NormalizedPath<T[K], RecordFunctions<T[K]>>}`
    : K
  : never;

/**
 * A string type that represents a valid path to a property in an object.
 *
 * @example
 * ```ts
 * type ObjectPathExample = ObjectPath<{
 *   a: {
 *     b: 1
 *   }
 * }>; 'a' | 'a.b'
 * ```
 */
export type ObjectPath<T> = string & (Path<T, keyof T> | keyof T);
