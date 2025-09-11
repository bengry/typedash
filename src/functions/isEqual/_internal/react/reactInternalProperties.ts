/**
 * React internal properties that should be ignored during equality comparison.
 * These properties can differ between logically equivalent React elements:
 *
 * - _owner: React component that created this element (circular reference)
 * - ref: Reference to DOM node or component instance
 * - _store: Internal React state storage
 * - _debugInfo: React 19 debug information (dev mode)
 * - _debugStack: React 19 debug stack trace (dev mode)
 * - _debugTask: React 19 debug task information (dev mode)
 */
export const REACT_INTERNAL_PROPERTIES = new Set([
  '_owner',
  'ref',
  '_store',
  '_debugInfo',
  '_debugStack',
  '_debugTask',
]);

/**
 * Check if a property name is a React internal property that should be
 * ignored during equality comparison.
 */
export function isReactInternalProperty(
  propertyName: string | symbol
): boolean {
  // Only string properties can be React internal properties
  return (
    typeof propertyName === 'string' &&
    REACT_INTERNAL_PROPERTIES.has(propertyName)
  );
}
