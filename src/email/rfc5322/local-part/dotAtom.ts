/**
 * RFC 5322 — local-part (dot-atom form)
 * Spec: https://datatracker.ietf.org/doc/html/rfc5322#section-3.2.3
 * dot-atom-text = 1*atext *("." 1*atext)
 * atext = ALPHA / DIGIT / ! # $ % & ' * + - / = ? ^ _ ` { | } ~
 *
 * Notes:
 * - No leading/trailing dot
 * - No consecutive dots
 * - No spaces or control chars
 * - This does NOT handle quoted-string (that’s a separate validator)
 */
const ATEXT = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~/-]+";
const DOT_ATOM_RE = new RegExp(`^(?:${ATEXT})(?:\\.(?:${ATEXT}))*$`);

export function isLocalPartDotAtom(input: string): boolean {
  return DOT_ATOM_RE.test(input);
}

