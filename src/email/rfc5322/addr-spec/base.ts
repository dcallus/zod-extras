/**
 * RFC 5322 — addr-spec (base shape)
 * Spec: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 * Ensures the address contains exactly one '@' separator.
 * (No grammar validation of local-part/domain yet.)
 */
export function isBaseAddrSpec(input: string): boolean {
  const atCount = (input.match(/@/g) || []).length;
  return atCount === 1;
}