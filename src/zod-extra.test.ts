import { describe, it, expect } from "vitest";
import { zx, strictEmail, createZodX } from "./zod-extra";
import { z } from "zod";

describe("zod-extra (Zod + extras)", () => {
	it("zx.strictEmail accepts valid emails", () => {
		expect(zx.strictEmail.parse("user@example.com")).toBe("user@example.com");
		expect(zx.strictEmail.parse("first.last@sub.domain.co.uk"))
			.toBe("first.last@sub.domain.co.uk");
	});

	it("zx.strictEmail rejects invalid emails", () => {
		expect(() => zx.strictEmail.parse("bad..dots@example.com")).toThrow();
		expect(() => zx.strictEmail.parse("no-at-symbol")).toThrow();
	});

	it("zx still exposes core Zod APIs", () => {
		const s = zx.string().min(3);
		expect(s.parse("abc")).toBe("abc");
	});

	it("named export strictEmail works", () => {
		expect(strictEmail.parse("test@foo.org")).toBe("test@foo.org");
	});

	it("createZodX binds to a provided z instance", () => {
		const my = createZodX(z);
		expect(my.strictEmail.parse("a@b.co")).toBe("a@b.co");
		expect(() => my.strictEmail.parse("nope")).toThrow();
	});
});
