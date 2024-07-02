import { describe, expect, it } from "vitest"
import { Social } from "../../src/types/types"
import { Mapper } from "../../src/utils/Mapper"
import { NoDataError } from "../../src/classes/NoDataError"

describe("mapToSocials", () => {
  it("should map valid data correctly", () => {
    const data = {
      socials: {
        data: [
          {
            id: 1,
            attributes: {
              Type: "Twitter",
              Link: "https://twitter.com/example"
            }
          },
          {
            id: 2,
            attributes: {
              Type: "LinkedIn",
              Link: "https://www.linkedin.com/example"
            }
          }
        ]
      }
    }

    const expected: Social[] = [
      {
        id: 1,
        type: "Twitter",
        link: "https://twitter.com/example"
      },
      {
        id: 2,
        type: "LinkedIn",
        link: "https://www.linkedin.com/example"
      }
    ]

    expect(Mapper.mapToSocials(data)).toEqual(expected)
  })

  it("should handle missing Type field gracefully", () => {
    const data = {
      socials: {
        data: [
          {
            id: 3,
            attributes: {
              Type: null,
              Link: "https://instagram.com/example"
            }
          }
        ]
      }
    }

    const expected: Social[] = [
      {
        id: 3,
        type: "",
        link: "https://instagram.com/example"
      }
    ]

    expect(Mapper.mapToSocials(data)).toEqual(expected)
  })

  it("should handle missing Link field gracefully", () => {
    const data = {
      socials: {
        data: [
          {
            id: 4,
            attributes: {
              Type: "Instagram",
              Link: null
            }
          }
        ]
      }
    }

    const expected: Social[] = [
      {
        id: 4,
        type: "Instagram",
        link: ""
      }
    ]

    expect(Mapper.mapToSocials(data)).toEqual(expected)
  })

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      socials: {
        data: [
          {
            id: 5,
            attributes: null
          }
        ]
      }
    }

    const expected: Social[] = [
      {
        id: 5,
        type: "",
        link: ""
      }
    ]

    expect(Mapper.mapToSocials(data)).toEqual(expected)
  })
  it("should throw NoDataError when socials.data is empty", () => {
    const data = {
      socials: {
        data: []
      }
    }

    expect(() => Mapper.mapToSocials(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToSocials(data)).toThrow("No data")
  })

  it("should throw NoDataError when socials is missing", () => {
    const data = {}

    expect(() => Mapper.mapToSocials(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToSocials(data)).toThrow("No data")
  })

  it("should throw NoDataError when socials.data is missing", () => {
    const data = {
      execs: {}
    }

    expect(() => Mapper.mapToSocials(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToSocials(data)).toThrow("No data")
  })
})
