/**
 * RFC 5322 — domain (dot-atom form)
 * Spec: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 *
 * For addr-spec, domain can be:
 *   - dot-atom (normal hostnames)
 *   - domain-literal ([...])
 *
 * Here we implement dot-atom with DNS-style tightening:
 * - Labels: letters, digits, hyphen
 * - No leading/trailing hyphen
 * - Max 63 chars per label
 * - At least one dot (configurable for localhost/test)
 * - Whole domain ≤ 253 chars (practical DNS cap)
 */

export function isDomainDotAtom(input: string, allowSingleLabel = false): boolean {
	if (!input) return false;
	if (input.length > 253) return false;

	const labels = input.split(".");

	// Require at least 2 labels unless allowSingleLabel=true
	if (!allowSingleLabel && labels.length < 2) return false;

	for (const label of labels) {
		// Empty labels not allowed
		if (!label) return false;
		if (label.length > 63) return false;

		// Must start and end with letter or digit
		if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label)) {
			return false;
		}
	}

	return true;
}
