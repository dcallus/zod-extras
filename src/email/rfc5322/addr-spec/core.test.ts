import { describe, it, expect } from "vitest";
import { isAddrSpec_Core } from "./core";

describe("isAddrSpec_Core", () => {
	it("accepts dot-atom local + dot-atom domain", () => {
		expect(isAddrSpec_Core("user@example.com")).toBe(true);
		expect(isAddrSpec_Core("first.last@sub.domain.co.uk")).toBe(true);
	});

	it("accepts quoted-string local + dot-atom domain", () => {
		expect(isAddrSpec_Core('"weird name"@example.com')).toBe(true);
		expect(isAddrSpec_Core('"foo\\\"bar"@example.com')).toBe(true);
	});

	it("accepts dot-atom local + domain-literal", () => {
		expect(isAddrSpec_Core("user@[127.0.0.1]")).toBe(true);
		expect(isAddrSpec_Core("user@[IPv6:abcd]")).toBe(true); // permissive literal
	});

	it("rejects missing local-part or domain", () => {
		expect(isAddrSpec_Core("@example.com")).toBe(false);
		expect(isAddrSpec_Core("user@")).toBe(false);
	});

	it("rejects invalid local-part", () => {
		expect(isAddrSpec_Core("bad..dots@example.com")).toBe(false);
		expect(isAddrSpec_Core("foo bar@example.com")).toBe(false);
	});

	it("rejects invalid domain", () => {
		expect(isAddrSpec_Core("user@example..com")).toBe(false);
		expect(isAddrSpec_Core("user@exa_mple.com")).toBe(false);
		expect(isAddrSpec_Core("user@[]")).toBe(false);
	});
});
