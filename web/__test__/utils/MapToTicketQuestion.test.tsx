import { describe, expect, it } from "vitest";
import { TicketAndQuestion, Value } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";
import { NoDataError } from "../../src/classes/NoDataError";

describe("mapToTicketQuestion", () => {
  it("should map valid data correctly", () => {
    const data = {
      ticket: {
        data: {
          id: 0,
          attributes: {
            Question_ID: {
              data: [
                {
                  id: 0,
                  attributes: {
                    Question: "string",
                  },
                },
                {
                  id: 1,
                  attributes: {
                    Question: "string1",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: TicketAndQuestion = {
      ticketId: 0,
      questions: [
        { id: 0, question: "string" },
        { id: 1, question: "string1" },
      ],
    };
    expect(Mapper.mapToTicketQuestion(data)).toEqual(expected);
  });

  it("should map invalid data correctly", () => {
    const data = {
      ticket: {
        data: {
          id: 0,
          attributes: {
            Question_ID: {
              data: [
                {
                  id: 0,
                  attributes: {
                    Question: "",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: TicketAndQuestion = {
      ticketId: 0,
      questions: [
        { id: 0, question: "" },
      ],
    };
    expect(Mapper.mapToTicketQuestion(data)).toEqual(expected);
  });

  it("should map no questions data correctly", () => {
    const data = {
      ticket: {
        data: {
          id: 0,
          attributes: {
            Question_ID: {
              data: [],
            },
          },
        },
      },
    };

    const expected: TicketAndQuestion = {
      ticketId: 0,
      questions: [],
    };
    expect(Mapper.mapToTicketQuestion(data)).toEqual(expected);
  });

  it("should throw NoDataError when values.data is empty", () => {
    const data = {
      values: {
        data: [],
      },
    };

    expect(() => Mapper.mapToTicketQuestion(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTicketQuestion(data)).toThrow("No data");
  });

  it("should throw NoDataError when values is missing", () => {
    const data = {};

    expect(() => Mapper.mapToTicketQuestion(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTicketQuestion(data)).toThrow("No data");
  });

  it("should throw NoDataError when values.data is missing", () => {
    const data = {
      values: {},
    };

    expect(() => Mapper.mapToTicketQuestion(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTicketQuestion(data)).toThrow("No data");
  });
});
