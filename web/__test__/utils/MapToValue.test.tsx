import { describe, expect, it } from "vitest"
import { Value } from "../../src/types/types"
import { Mapper } from "../../src/utils/Mapper"
import { NoDataError } from "../../src/classes/NoDataError"

describe("mapToValue", () => {
  it("should map valid data correctly", () => {
    const data = {
      values: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Value One",
              Description: "Description of Value One",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/value_one.jpg"
                  }
                }
              }
            }
          }
        ]
      }
    }

    const expected: Value[] = [
      {
        id: 1,
        title: "Value One",
        description: "Description of Value One",
        image: "/uploads/value_one.jpg"
      }
    ]

    expect(Mapper.mapToValue(data)).toEqual(expected)
  })

  it("should handle missing image field gracefully", () => {
    const data = {
      values: {
        data: [
          {
            id: 2,
            attributes: {
              Title: "Value Two",
              Description: "Description of Value Two",
              Image: null
            }
          }
        ]
      }
    }

    const expected: Value[] = [
      {
        id: 2,
        title: "Value Two",
        description: "Description of Value Two",
        image: ""
      }
    ]

    expect(Mapper.mapToValue(data)).toEqual(expected)
  })

  it("should handle missing title field gracefully", () => {
    const data = {
      values: {
        data: [
          {
            id: 3,
            attributes: {
              Title: null,
              Description: "Description of Value Three",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/value_three.jpg"
                  }
                }
              }
            }
          }
        ]
      }
    }

    const expected: Value[] = [
      {
        id: 3,
        title: "",
        description: "Description of Value Three",
        image: "/uploads/value_three.jpg"
      }
    ]

    expect(Mapper.mapToValue(data)).toEqual(expected)
  })

  it("should handle missing description field gracefully", () => {
    const data = {
      values: {
        data: [
          {
            id: 4,
            attributes: {
              Title: "Value Four",
              Description: null,
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/value_four.jpg"
                  }
                }
              }
            }
          }
        ]
      }
    }

    const expected: Value[] = [
      {
        id: 4,
        title: "Value Four",
        description: "",
        image: "/uploads/value_four.jpg"
      }
    ]

    expect(Mapper.mapToValue(data)).toEqual(expected)
  })

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      values: {
        data: [
          {
            id: 5,
            attributes: null
          }
        ]
      }
    }

    const expected: Value[] = [
      {
        id: 5,
        title: "",
        description: "",
        image: ""
      }
    ]

    expect(Mapper.mapToValue(data)).toEqual(expected)
  })
  it("should throw NoDataError when values.data is empty", () => {
    const data = {
      values: {
        data: []
      }
    }

    expect(() => Mapper.mapToValue(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToValue(data)).toThrow("No data")
  })

  it("should throw NoDataError when values is missing", () => {
    const data = {}

    expect(() => Mapper.mapToValue(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToValue(data)).toThrow("No data")
  })

  it("should throw NoDataError when values.data is missing", () => {
    const data = {
      values: {}
    }

    expect(() => Mapper.mapToValue(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToValue(data)).toThrow("No data")
  })
})
