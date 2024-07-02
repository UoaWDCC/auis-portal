import { describe, expect, it } from "vitest"
import { PreviousTeam } from "../../src/types/types"
import { Mapper } from "../../src/utils/Mapper"
import { NoDataError } from "../../src/classes/NoDataError"

describe("mapToPreviousTeams", () => {
  it("should map valid data correctly", () => {
    const data = {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Gury Singh",
              Role: "GOAT",
              Year: "2023"
            }
          }
        ]
      }
    }

    const expected: PreviousTeam[] = [
      {
        id: 1,
        name: "Gury Singh",
        role: "GOAT",
        year: "2023"
      }
    ]

    expect(Mapper.mapToPreviousTeams(data)).toEqual(expected)
  })

  it("should handle missing name field gracefully", () => {
    const data = {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: {
              Name: null,
              Role: "GOAT",
              Year: "2023"
            }
          }
        ]
      }
    }

    const expected: PreviousTeam[] = [
      {
        id: 1,
        name: "",
        role: "GOAT",
        year: "2023"
      }
    ]

    expect(Mapper.mapToPreviousTeams(data)).toEqual(expected)
  })

  it("should handle missing role field gracefully", () => {
    const data = {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Gury Singh",
              Role: null,
              Year: "2023"
            }
          }
        ]
      }
    }

    const expected: PreviousTeam[] = [
      {
        id: 1,
        name: "Gury Singh",
        role: "",
        year: "2023"
      }
    ]

    expect(Mapper.mapToPreviousTeams(data)).toEqual(expected)
  })

  it("should handle missing year field gracefully", () => {
    const data = {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Gury Singh",
              Role: "GOAT",
              Year: null
            }
          }
        ]
      }
    }

    const expected: PreviousTeam[] = [
      {
        id: 1,
        name: "Gury Singh",
        role: "GOAT",
        year: ""
      }
    ]

    expect(Mapper.mapToPreviousTeams(data)).toEqual(expected)
  })

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: null
          }
        ]
      }
    }

    const expected: PreviousTeam[] = [
      {
        id: 1,
        name: "",
        role: "",
        year: ""
      }
    ]

    expect(Mapper.mapToPreviousTeams(data)).toEqual(expected)
  })

  it("should throw NoDataError when previousTeams.data is empty", () => {
    const data = {
      previousTeams: {
        data: []
      }
    }

    expect(() => Mapper.mapToPreviousTeams(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToPreviousTeams(data)).toThrow("No data")
  })

  it("should throw NoDataError when previousTeams is empty", () => {
    const data = {
      previousTeams: {}
    }

    expect(() => Mapper.mapToPreviousTeams(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToPreviousTeams(data)).toThrow("No data")
  })

  it("should throw NoDataError when data is empty", () => {
    const data = {}

    expect(() => Mapper.mapToPreviousTeams(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToPreviousTeams(data)).toThrow("No data")
  })
})
