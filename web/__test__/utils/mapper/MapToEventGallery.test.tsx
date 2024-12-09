import { describe, expect, it } from "vitest";
import { EventGallery } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToEventsGallery", () => {
  it("should map the valid data correctly", () => {
    const data = {
      eventGalleries: {
        data: [
          {
            id: 1,
            attributes: {
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/event1.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: EventGallery[] = [
      {
        id: 1,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      eventGalleries: {
        data: [
          {
            id: 1,
            attributes: {
              Image: null,
            },
          },
        ],
      },
    };

    const expected: EventGallery[] = [
      {
        id: 1,
        image: "",
      },
    ];

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      eventGalleries: {
        data: [
          {
            id: 1,
            attributes: null,
          },
        ],
      },
    };

    const expected: EventGallery[] = [
      {
        id: 1,
        image: "",
      },
    ];

    expect(Mapper.mapToEventsGallery(data)).toEqual(expected);
  });

  it("should throw NoDataError when eventGalleries.data is empty", () => {
    const data = {
      eventGalleries: {
        data: [],
      },
    };

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data");
  });

  it("should throw NoDataError when eventGalleries is empty", () => {
    const data = {
      eventGalleries: {},
    };

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToEventsGallery(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsGallery(data)).toThrow("No data");
  });
});
