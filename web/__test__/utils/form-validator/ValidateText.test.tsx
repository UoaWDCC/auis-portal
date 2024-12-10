import { describe, expect, it } from "vitest";
import { FormValidate } from "../../../src/utils/FormValidate";

describe("Validate Text", () => {
  it("should return true with a text", () => {
    const answer = "gury";
    const output = FormValidate.validateAnswers([{ answer: answer }]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true with a random string", () => {
    const answer = "aslfdj-//asdfkj;";
    const output = FormValidate.validateAnswers([{ answer: answer }]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true without an empty string", () => {
    const answer = "";
    const output = FormValidate.validateAnswers([{ answer: answer }]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false without an large string", () => {
    const validAnswer = "Test";
    const answer =
      "1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345@gmail.com";
    const output = FormValidate.validateAnswers([
      { answer: validAnswer },
      { answer: answer },
      { answer: validAnswer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });

  it("should return true with a text multiple answers", () => {
    const validAnswer = "Test";
    const answer = "gury";
    const output = FormValidate.validateAnswers([
      { answer: validAnswer },
      { answer: answer },
      { answer: validAnswer },
    ]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true with a random string multiple answers", () => {
    const validAnswer = "Test";
    const answer = "aslfdj-//asdfkj;";
    const output = FormValidate.validateAnswers([
      { answer: validAnswer },
      { answer: answer },
      { answer: validAnswer },
    ]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return true without an empty string multiple answers", () => {
    const validAnswer = "Test";
    const answer = "";
    const output = FormValidate.validateAnswers([
      { answer: validAnswer },
      { answer: answer },
      { answer: validAnswer },
    ]);
    const expected = true;
    expect(output).toEqual(expected);
  });

  it("should return false without an large string multiple answers", () => {
    const validAnswer = "Test";
    const answer =
      "1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345@gmail.com";
    const output = FormValidate.validateAnswers([
      { answer: validAnswer },
      { answer: answer },
      { answer: validAnswer },
    ]);
    const expected = false;
    expect(output).toEqual(expected);
  });
});
