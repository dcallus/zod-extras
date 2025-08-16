export function isDomainLiteral(input: string): boolean {
	if (input.length < 2) return false;
	if (input[0] !== "[" || input[input.length - 1] !== "]") return false;

	const content = input.slice(1, -1);
	if (content.length === 0) return false; // 👈 reject empty

	for (let i = 0; i < content.length; i++) {
		const ch = content[i];

		if (ch === "\\") {
			i++;
			if (i >= content.length) return false;
			const next = content[i];
			const code = next.charCodeAt(0);
			if (code < 0x20 || code > 0x7e) return false;
			continue;
		}

		const code = ch.charCodeAt(0);
		if (code < 0x21 || code > 0x7e || ch === "[" || ch === "]") {
			return false;
		}
	}

	return true;
}
