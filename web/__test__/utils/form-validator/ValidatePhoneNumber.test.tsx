import { describe, expect, it } from "vitest";
import { FormValidate } from "../../../src/utils/FormValidate";

describe("Validate Phone Number", () => {
  it("should return true with a phone number", () => {
    const phoneNumber = "+64123456789";
    const output = FormValidate.validatePhoneNumber(phoneNumber);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true with a phone number", () => {
    const phoneNumber = "0123456789";
    const output = FormValidate.validatePhoneNumber(phoneNumber);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false when empty", () => {
    const phoneNumber = "";
    const output = FormValidate.validatePhoneNumber(phoneNumber);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false when not a number", () => {
    const phoneNumber = "asdfasdfasdf";
    const output = FormValidate.validatePhoneNumber(phoneNumber);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false without a large number", () => {
    const phoneNumber =
      "1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345@gmail.com";
    const output = FormValidate.validatePhoneNumber(phoneNumber);
    const expected = false;
    expect(output).toEqual(expected);
  });
});
