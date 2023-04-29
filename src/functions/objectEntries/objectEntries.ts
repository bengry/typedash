export const objectEntries: ObjetEntries = Object.entries;

interface ObjetEntries {
  <T extends object>(object: T): [keyof T, T[keyof T]][];
}
