/**
 * Zod + extras namespace (no monkey-patching).
 *
 * Usage:
 *   import { zx } from "./zod-extra";
 *   zx.string().min(1)                 // core Zod
 *   zx.strictEmail.parse("a@b.co")     // extra
 *
 * Also available as a direct export:
 *   import { strictEmail } from "./zod-extra";
 */

import { z as Z } from "zod";
import { isAddrSpec_Core } from "./email/rfc5322/addr-spec/core";

// Base extra(s)
export const strictEmail = Z.string().refine(isAddrSpec_Core, {
	message: "Invalid email address (RFC 5322 core)",
});

// Zod + extras in one object
export const zx = {
	...Z,          // all core Zod APIs (string, object, etc.)
	strictEmail,   // our extras
};

// (Optional) factory to bind to a specific z instance (multi-version setups)
export const createZodX = (z: typeof Z) => ({
	...z,
	strictEmail: z.string().refine(isAddrSpec_Core, {
		message: "Invalid email address (RFC 5322 core)",
	}),
});

// Optional branded type if you want it in app code:
// export type Email = string & { __brand: "Email" };
