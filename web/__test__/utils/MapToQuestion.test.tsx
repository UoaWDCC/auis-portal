import { describe, expect, it } from "vitest"
import { Question } from "../../src/types/types"
import { Mapper } from "../../src/utils/Mapper"
import { NoDataError } from "../../src/classes/NoDataError"

describe("mapToQuestions", () => {
  it("should map valid data correctly", () => {
    const data = {
      questions: {
        data: [
          {
            id: 1,
            attributes: {
              Question: "Question 1",
              Check_For_Member_Email: true
            }
          }
        ]
      }
    }

    const expected: Question[] = [
      {
        id: 1,
        question: "Question 1",
        checkForMemberEmail: true
      }
    ]

    expect(Mapper.mapToQuestions(data)).toEqual(expected)
  })

  it("should handle missing question gracefully", () => {
    const data = {
      questions: {
        data: [
          {
            id: 1,
            attributes: {
              Question: null,
              Check_For_Member_Email: true
            }
          }
        ]
      }
    }

    const expected: Question[] = [
      {
        id: 1,
        question: "",
        checkForMemberEmail: true
      }
    ]

    expect(Mapper.mapToQuestions(data)).toEqual(expected)
  })

  it("should handle missing check for member email gracefully", () => {
    const data = {
      questions: {
        data: [
          {
            id: 1,
            attributes: {
              Question: "Question 1",
              Check_For_Member_Email: null
            }
          }
        ]
      }
    }

    const expected: Question[] = [
      {
        id: 1,
        question: "Question 1",
        checkForMemberEmail: false
      }
    ]

    expect(Mapper.mapToQuestions(data)).toEqual(expected)
  })

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      questions: {
        data: [
          {
            id: 1,
            attributes: null
          }
        ]
      }
    }

    const expected: Question[] = [
      {
        id: 1,
        question: "",
        checkForMemberEmail: false
      }
    ]

    expect(Mapper.mapToQuestions(data)).toEqual(expected)
  })

  it("should throw NoDataError when questions.data is empty", () => {
    const data = {
      questions: {
        data: []
      }
    }

    expect(() => Mapper.mapToQuestions(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToQuestions(data)).toThrow("No data")
  })

  it("should throw NoDataError when questions is empty", () => {
    const data = {
      questions: {}
    }

    expect(() => Mapper.mapToQuestions(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToQuestions(data)).toThrow("No data")
  })

  it("should throw NoDataError when data is empty", () => {
    const data = {}

    expect(() => Mapper.mapToQuestions(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToQuestions(data)).toThrow("No data")
  })
})
