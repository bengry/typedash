/**
 * Generates a unique identifier.
 *
 * If a `prefix` is provided, the resulting identifier will start with the prefix.
 * @param prefix A prefix for the identifier.
 * @returns A unique identifier.
 * @example
 * ```ts
 * uniqueId('prefix-') // 'prefix-1q2w3e4r5t'
 * ```
 */
export function uniqueId<Prefix extends string>(
  prefix: Prefix
): `${Prefix}${string}`;
/**
 * Generates a unique identifier.
 *
 * If no `prefix` is provided, the resulting identifier will not have a prefix.
 * @param prefix An optional prefix for the identifier.
 * @returns A unique identifier.
 * @example
 * ```ts
 * uniqueId() // '1q2w3e4r5t'
 * uniqueId('prefix-') // 'prefix-1q2w3e4r5t'
 * ```
 */
export function uniqueId(prefix?: string): string;
/**
 * Implementation for all overloads.
 * @param prefix An optional prefix for the identifier.
 * @returns A unique identifier.
 */
export function uniqueId(prefix = '') {
  const suffix = generateUUID();
  return `${prefix}${suffix}`;
}

function generateUUID() {
  if (typeof crypto === 'object' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return pseudoRandomUUID();
}

function pseudoRandomUUID(): string {
  const random = Math.random();
  return random.toString(36).slice(2, 11);
}
