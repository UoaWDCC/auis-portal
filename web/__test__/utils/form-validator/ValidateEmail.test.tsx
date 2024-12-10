import { describe, expect, it } from "vitest";
import { FormValidate } from "../../../src/utils/FormValidate";

describe("Validate Email", () => {
  it("should return true with an email", () => {
    const email = "gury.Is.Goat@gmail.com";
    const output = FormValidate.validateEmail(email);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false without an email", () => {
    const email = "aslfdj-//asdfkj;";
    const output = FormValidate.validateEmail(email);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false without an empty string", () => {
    const email = "";
    const output = FormValidate.validateEmail(email);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false without an large string", () => {
    const email =
      "1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345@gmail.com";
    const output = FormValidate.validateEmail(email);
    const expected = false;
    expect(output).toEqual(expected);
  });
});
