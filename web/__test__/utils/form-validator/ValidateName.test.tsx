import { describe, expect, it } from "vitest";
import { FormValidate } from "../../../src/utils/FormValidate";

describe("Validate Name", () => {
  it("should return true with a name", () => {
    const name = "gury";
    const output = FormValidate.validateName(name);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true with a random string", () => {
    const name = "aslfdj-//asdfkj;";
    const output = FormValidate.validateName(name);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false without an empty string", () => {
    const name = "";
    const output = FormValidate.validateName(name);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false without an large string", () => {
    const name =
      "1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345@gmail.com";
    const output = FormValidate.validateName(name);
    const expected = false;
    expect(output).toEqual(expected);
  });
});
