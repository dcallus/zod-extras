import { describe, it, expect } from "vitest";
import { isLocalPartQuotedString } from "./quotedString";

describe("isLocalPartQuotedString", () => {
	it("accepts simple quoted words", () => {
		expect(isLocalPartQuotedString('"user"')).toBe(true);
		expect(isLocalPartQuotedString('"John.Doe"')).toBe(true);
	});

	it("accepts escaped quotes and backslashes", () => {
		expect(isLocalPartQuotedString('"foo\\\"bar"')).toBe(true);
		expect(isLocalPartQuotedString('"foo\\\\bar"')).toBe(true);
	});

	it("rejects missing quotes", () => {
		expect(isLocalPartQuotedString('user"')).toBe(false);
		expect(isLocalPartQuotedString('"user')).toBe(false);
	});

	it("rejects unescaped quote inside", () => {
		expect(isLocalPartQuotedString('"foo"bar"')).toBe(false);
	});

	it("rejects dangling backslash", () => {
		expect(isLocalPartQuotedString('"foo\\')).toBe(false);
	});

	it("rejects control characters", () => {
		expect(isLocalPartQuotedString('"\u0001"')).toBe(false);
	});
});
