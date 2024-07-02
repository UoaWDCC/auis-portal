import { describe, expect, it } from "vitest"
import { EventGallery } from "../../src/types/types"
import { Mapper } from "../../src/utils/Mapper"
import { NoDataError } from "../../src/classes/NoDataError"

describe("mapToEventsGallery", () => {
  it("should map the valid data correctly", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/event1.jgp"
                  }
                }
              }
            }
          }
        ]
      }
    }

    const expected: EventGallery[] = [
      {
        id: 1,
        image: "/uploads/event1.jgp"
      }
    ]

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected)
  })

  it("should handle missing image field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Image: null
            }
          }
        ]
      }
    }

    const expected: EventGallery[] = [
      {
        id: 1,
        image: ""
      }
    ]

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected)
  })

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: null
          }
        ]
      }
    }

    const expected: EventGallery[] = [
      {
        id: 1,
        image: ""
      }
    ]

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected)
  })

  it("should throw NoDataError when eventsGallery.data is empty", () => {
    const data = {
      eventsGallery: {
        data: []
      }
    }

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data")
  })

  it("should throw NoDataError when eventsGallery is empty", () => {
    const data = {
      eventsGallery: {}
    }

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data")
  })

  it("should throw NoDataError when data is empty", () => {
    const data = {}

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError)
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data")
  })
})
