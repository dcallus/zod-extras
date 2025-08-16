import { describe, it, expect } from "vitest";
import { splitAddrSpec } from "./split";

describe("splitAddrSpec", () => {
    it("splits into local and domain", () => {
      expect(splitAddrSpec("user@example.com")).toEqual(["user", "example.com"]);
    });
  
    it("throws when no '@'", () => {
      expect(() => splitAddrSpec("plainaddress")).toThrow();
    });
  
    it("throws when multiple '@'", () => {
      expect(() => splitAddrSpec("a@b@c")).toThrow();
    });
  
    it("allows empty local-part or domain at this stage", () => {
      expect(splitAddrSpec("@example.com")).toEqual(["", "example.com"]);
      expect(splitAddrSpec("user@")).toEqual(["user", ""]);
    });
  });