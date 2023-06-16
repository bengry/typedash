export interface Dictionary<Value = unknown> {
  readonly [key: string | symbol]: Value | undefined;
  /**
   * Symbol used to identify the type of a React element.
   */
  readonly $$typeof?: Value;
}
