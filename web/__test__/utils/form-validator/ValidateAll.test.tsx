import { describe, expect, it } from "vitest";
import { FormValidate } from "../../../src/utils/FormValidate";

describe("Validate Text", () => {
  it("should return true with all valid", () => {
    const name = "gury";
    const answer = "gury";
    const email = "test@email.com";
    const phoneNumber = "123456789123";
    const output = FormValidate.validateAll(name, email, phoneNumber, [
      { answer: answer },
    ]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false with email not valid", () => {
    const name = "gury";
    const answer = "gury";
    const email = "test@em//ail.com";
    const phoneNumber = "123456789123";
    const output = FormValidate.validateAll(name, email, phoneNumber, [
      { answer: answer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false with name not valid", () => {
    const name = "";
    const answer = "gury";
    const email = "test@email.com";
    const phoneNumber = "123456789123";
    const output = FormValidate.validateAll(name, email, phoneNumber, [
      { answer: answer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false with phoneNumber not valid", () => {
    const name = "gury";
    const answer = "gury";
    const email = "test@email.com";
    const phoneNumber = "1234567891asdfa23";
    const output = FormValidate.validateAll(name, email, phoneNumber, [
      { answer: answer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return false with answers not valid", () => {
    const name = "gury";
    const answer =
      "answeransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweranswer";
    const email = "test@email.com";
    const phoneNumber = "123456789123";
    const output = FormValidate.validateAll(name, email, phoneNumber, [
      { answer: answer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });
});
