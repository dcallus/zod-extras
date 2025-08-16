import { isBaseAddrSpec } from "./base";

/**
 * RFC 5322 — split addr-spec into [local-part, domain]
 * Throws if base shape is not satisfied.
 */
export function splitAddrSpec(input: string): [string, string] {
  if (!isBaseAddrSpec(input)) {
    throw new Error("Invalid addr-spec: must contain exactly one '@'");
  }
  const [local, domain] = input.split("@");
  return [local, domain];
}
