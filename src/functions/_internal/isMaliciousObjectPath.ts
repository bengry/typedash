import { createTypeGuard } from '../createTypeGuard';

/**
 * Determines whether the given property name is malicious or not (e.g. `__proto__` or `constructor`).
 * @param propertyName The property name to check for maliciousness.
 * @returns True if the property name is malicious, false otherwise.
 * @example
 * ```ts
 * isMaliciousObjectProperty('constructor'); // returns true
 * isMaliciousObjectProperty('nonMaliciousPath'); // returns false
 * isMaliciousObjectProperty('__proto__'); // returns true
 * ```
 */
export const isMaliciousObjectProperty = createTypeGuard<string, string>(
  Object.getOwnPropertyNames(Object.getPrototypeOf({}))
);
