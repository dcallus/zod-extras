/**
 * RFC 5322 — local-part (quoted-string form)
 * Spec: https://datatracker.ietf.org/doc/html/rfc5322#section-3.2.4
 *
 * quoted-string  = DQUOTE *([FWS] qcontent) [FWS] DQUOTE
 * qcontent       = qtext / quoted-pair
 * qtext          = %d33 / %d35-91 / %d93-126
 *                  ; Printable US-ASCII excl. "\" and DQUOTE
 * quoted-pair    = "\" (VCHAR / WSP)
 *
 * Simplified here:
 * - Must start and end with a double quote.
 * - Inside: printable ASCII except unescaped " or \.
 * - Allow \" and \\ escapes.
 * - No folding whitespace (CFWS) yet.
 */

export function isLocalPartQuotedString(input: string): boolean {
	if (input.length < 2) return false;
	if (input[0] !== '"' || input[input.length - 1] !== '"') return false;

	// Extract content between quotes
	const content = input.slice(1, -1);

	for (let i = 0; i < content.length; i++) {
		const ch = content[i];

		if (ch === "\\") {
			// Escape: must be followed by one char
			i++;
			if (i >= content.length) return false; // dangling \
			const next = content[i];
			// Next must be printable US-ASCII (0x20–0x7E)
			const code = next.charCodeAt(0);
			if (code < 0x20 || code > 0x7e) return false;
			continue;
		}

		// Otherwise, must be qtext: %d33, %d35-91, %d93-126
		const code = ch.charCodeAt(0);
		const isQText =
            code === 32 || // space
            code === 33 || // !
            (code >= 35 && code <= 91) ||
            (code >= 93 && code <= 126);

		if (!isQText) return false;
	}

	return true;
}