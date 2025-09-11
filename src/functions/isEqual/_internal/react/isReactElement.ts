/**
 * Check if an object is a React element by examining its $$typeof property.
 * Supports both React 18 and React 19 element types.
 *
 * React <=18: Symbol.for('react.element')
 * React 19: Symbol.for('react.transitional.element')
 */
export function isReactElement(obj: unknown): boolean {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj !== null &&
    '$$typeof' in obj &&
    typeof (obj as { $$typeof: unknown }).$$typeof === 'symbol' &&
    ((obj as { $$typeof: symbol }).$$typeof
      .toString()
      .includes('react.element') ||
      (obj as { $$typeof: symbol }).$$typeof
        .toString()
        .includes('react.transitional.element'))
  );
}
