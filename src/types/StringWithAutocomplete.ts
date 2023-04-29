/**
 * A utility type around `string` that allows for autocomplete on the string on a specific set of values, yet accepting any string.
 *
 * @see https://twitter.com/diegohaz/status/1524257274012876801
 */
export type StringWithAutocomplete<S extends string> =
  | S
  | (string & Record<never, never>);
