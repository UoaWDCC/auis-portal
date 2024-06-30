import { describe, expect, it } from "vitest";
import { Answer } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";
import { NoDataError } from "../../src/classes/NoDataError";

describe("mapToAnswers", () => {
  it("should map valid data correctly", () => {
    const data = {
      answers: {
        data: [
          {
            id: 1,
            attributes: {
              Answer: "Answer 1",
            },
          },
        ],
      },
    };

    const expected: Answer[] = [
      {
        id: 1,
        answer: "Answer 1",
      },
    ];

    expect(Mapper.mapToAnswers(data)).toEqual(expected);
  });

  it("should handle completely missing answer gracefully", () => {
    const data = {
      answers: {
        data: [
          {
            id: 1,
            attributes: {
              Answer: null,
            },
          },
        ],
      },
    };

    const expected: Answer[] = [
      {
        id: 1,
        answer: "",
      },
    ];

    expect(Mapper.mapToAnswers(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      answers: {
        data: [
          {
            id: 1,
            attributes: null,
          },
        ],
      },
    };

    const expected: Answer[] = [
      {
        id: 1,
        answer: "",
      },
    ];

    expect(Mapper.mapToAnswers(data)).toEqual(expected);
  });

  it("should throw NoDataError when answers.data is empty", () => {
    const data = {
      answers: {
        data: [],
      },
    };

    expect(() => Mapper.mapToAnswers(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToAnswers(data)).toThrow("No data");
  });

  it("should throw NoDataError when answers is empty", () => {
    const data = {
      answers: {},
    };

    expect(() => Mapper.mapToAnswers(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToAnswers(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToAnswers(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToAnswers(data)).toThrow("No data");
  });
});
