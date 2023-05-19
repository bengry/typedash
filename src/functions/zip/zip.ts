export function zip<T, U>(first: readonly T[], second: readonly U[]): [T, U][] {
  const result: [T, U][] = [];

  for (let index = 0; index < Math.min(first.length, second.length); index++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we're getting the min length first
    result.push([first[index]!, second[index]!]);
  }

  return result;
}
