import { describe, it, expect } from "vitest";
import { isDomainLiteral } from "./domainLiteral";

describe("isDomainLiteral", () => {
	it("accepts basic literals", () => {
		expect(isDomainLiteral("[127.0.0.1]")).toBe(true);
		expect(isDomainLiteral("[abc]")).toBe(true);
	});

	it("accepts escaped brackets", () => {
		expect(isDomainLiteral("[foo\\]bar]")).toBe(true);
		expect(isDomainLiteral("[foo\\\\bar]")).toBe(true);
	});

	it("rejects missing brackets", () => {
		expect(isDomainLiteral("127.0.0.1")).toBe(false);
		expect(isDomainLiteral("[abc")).toBe(false);
		expect(isDomainLiteral("abc]")).toBe(false);
	});

	it("rejects empty literal", () => {
		expect(isDomainLiteral("[]")).toBe(false);
	});

	it("rejects control characters", () => {
		expect(isDomainLiteral("[\u0001]")).toBe(false);
	});

	it("rejects raw [ or ] inside", () => {
		expect(isDomainLiteral("[foo[bar]")).toBe(false);
		expect(isDomainLiteral("[foo]bar]")).toBe(false);
	});
});
