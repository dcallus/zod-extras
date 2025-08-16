/**
 * RFC 5322 — addr-spec core composer
 * Spec: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 *
 * addr-spec = local-part "@" domain
 *
 * local-part = dot-atom / quoted-string
 * domain     = dot-atom / domain-literal
 *
 * Simplifications:
 * - No CFWS/comments
 * - Naive split on "@" (will replace with context-aware scanner later)
 * - Length caps not enforced yet
 */

import { isLocalPartDotAtom } from "../local-part/dotAtom";
import { isLocalPartQuotedString } from "../local-part/quotedString";
import { isDomainDotAtom } from "../domain/dotAtom";
import { isDomainLiteral } from "../domain/domainLiteral";
import { isBaseAddrSpec } from "./base";
import { splitAddrSpec } from "./split";

/* -------------------- wrappers -------------------- */

export function isLocalPart(input: string): boolean {
	return isLocalPartDotAtom(input) || isLocalPartQuotedString(input);
}

export function isDomain(input: string): boolean {
	return isDomainDotAtom(input) || isDomainLiteral(input);
}

/* -------------------- composer -------------------- */

export function isAddrSpec_Core(input: string): boolean {
	if (!isBaseAddrSpec(input)) return false;

	const [local, domain] = splitAddrSpec(input);

	// Both must be non-empty
	if (!local || !domain) return false;

	if (!isLocalPart(local)) return false;
	if (!isDomain(domain)) return false;

	return true;
}