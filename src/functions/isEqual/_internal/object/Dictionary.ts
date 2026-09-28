export interface Dictionary<Value = unknown> {
  readonly [key: string | symbol]: Value | undefined;
}
