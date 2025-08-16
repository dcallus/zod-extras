
/* -------------------- tests -------------------- */
import { describe, it, expect } from "vitest";
import { isDomainDotAtom } from "./dotAtom";

describe("isDomainDotAtom", () => {
	it("accepts normal domains", () => {
		expect(isDomainDotAtom("example.com")).toBe(true);
		expect(isDomainDotAtom("sub.domain.co.uk")).toBe(true);
	});

	it("rejects empty string", () => {
		expect(isDomainDotAtom("")).toBe(false);
	});

	it("rejects single label unless allowed", () => {
		expect(isDomainDotAtom("localhost")).toBe(false);
		expect(isDomainDotAtom("localhost", true)).toBe(true);
	});

	it("rejects labels > 63 chars", () => {
		const long = "a".repeat(64);
		expect(isDomainDotAtom(`${long}.com`)).toBe(false);
	});

	it("rejects domain > 253 chars", () => {
		const label = "a".repeat(63);
		const tooLong = Array(5).fill(label).join(".") + ".com"; // >253
		expect(isDomainDotAtom(tooLong)).toBe(false);
	});

	it("rejects leading/trailing hyphen", () => {
		expect(isDomainDotAtom("-foo.com")).toBe(false);
		expect(isDomainDotAtom("foo-.com")).toBe(false);
	});

	it("rejects invalid characters", () => {
		expect(isDomainDotAtom("exa_mple.com")).toBe(false);
		expect(isDomainDotAtom("example!.com")).toBe(false);
	});
});
