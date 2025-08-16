import { describe, it, expect } from "vitest";
import { isBaseAddrSpec } from "./base";

describe("isBaseAddrSpec", () => {
    it("accepts a single '@'", () => {
      expect(isBaseAddrSpec("foo@bar")).toBe(true);
    });
  
    it("rejects zero '@'", () => {
      expect(isBaseAddrSpec("foobar")).toBe(false);
    });
  
    it("rejects multiple '@'", () => {
      expect(isBaseAddrSpec("foo@bar@baz")).toBe(false);
    });
  });
  