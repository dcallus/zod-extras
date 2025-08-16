import { describe, it, expect } from "vitest";
import { isLocalPartDotAtom } from "./dotAtom";

describe("isLocalPartDotAtom", () => {
    // valid dot-atom cases
    it("accepts simple atoms", () => {
      expect(isLocalPartDotAtom("user")).toBe(true);
      expect(isLocalPartDotAtom("user_name")).toBe(true);
      expect(isLocalPartDotAtom("user-name")).toBe(true);
      expect(isLocalPartDotAtom("user+tag")).toBe(true);
      expect(isLocalPartDotAtom("abc/def")).toBe(true);
    });
  
    it("accepts dotted atoms", () => {
      expect(isLocalPartDotAtom("first.last")).toBe(true);
      expect(isLocalPartDotAtom("a.b.c")).toBe(true);
    });
  
    // invalid shapes
    it("rejects leading/trailing dot and consecutive dots", () => {
      expect(isLocalPartDotAtom(".user")).toBe(false);
      expect(isLocalPartDotAtom("user.")).toBe(false);
      expect(isLocalPartDotAtom("user..name")).toBe(false);
    });
  
    it("rejects spaces and disallowed characters", () => {
      expect(isLocalPartDotAtom("user name")).toBe(false);
      expect(isLocalPartDotAtom("user(name)")).toBe(false);
      expect(isLocalPartDotAtom("user,name")).toBe(false);
      expect(isLocalPartDotAtom("user;name")).toBe(false);
      expect(isLocalPartDotAtom("user@name")).toBe(false); // '@' not allowed in local-part (unquoted)
      expect(isLocalPartDotAtom('"quoted"')).toBe(false); // quoted-string handled elsewhere
    });
  
    it("rejects empty string", () => {
      expect(isLocalPartDotAtom("")).toBe(false);
    });
  });
  