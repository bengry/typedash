/**
 * Whether the regexps passed are equal in value.
 * @param value1 The first regexp.
 * @param value2 The second regexp.
 * @returns true if the two regexps are equal, false otherwise.
 */
export function areRegExpsEqual(value1: RegExp, value2: RegExp): boolean {
  return value1.source === value2.source && value1.flags === value2.flags;
}
