// Fails type-checking if the built typings (resolved via package.json "exports") miss any export of src/index.ts.
import type * as dist from 'typedash';
import type * as src from '../src/index.ts';

type MissingFromDist = Exclude<keyof typeof src, keyof typeof dist>;

/** Typed `true` only if nothing is missing; otherwise the missing names, so `= true` errors. */
export const allExportsPresent: [MissingFromDist] extends [never]
  ? true
  : MissingFromDist = true;
