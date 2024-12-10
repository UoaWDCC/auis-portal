import { describe, expect, it } from "vitest";
import { EventsSlider } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToEventsSlider", () => {
  it("should map valid data correctly", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Event 1",
              Location: "Location 1",
              Event_Date_Start: "2024-01-01",
              isLive: false,
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

    const expected: EventsSlider[] = [
      {
        id: 1,
        title: "Event 1",
        location: "Location 1",
        eventDateStart: "2024-01-01",
        image: "/uploads/event1.jpg",
        isLive: false,
      },
    ];

    expect(Mapper.mapToEventsSlider(data)).toEqual(expected);
  });

  it("should handle missing fields gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "",
              Location: "",
              Event_Date_Start: "",
              isLive: false,
              Image: {
                data: {
                  attributes: {
                    url: "",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: EventsSlider[] = [
      {
        id: 1,
        title: "",
        location: "",
        eventDateStart: "",
        image: "",
        isLive: false,
      },
    ];

    expect(Mapper.mapToEventsSlider(data)).toEqual(expected);
  });

  it("should throw NoDataError when events.data is empty", () => {
    const data = {
      events: {
        data: [],
      },
    };

    expect(() => Mapper.mapToEventsSlider(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsSlider(data)).toThrow("No data");
  });

  it("should throw NoDataError when events is empty", () => {
    const data = {
      events: {},
    };

    expect(() => Mapper.mapToEventsSlider(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsSlider(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToEventsSlider(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEventsSlider(data)).toThrow("No data");
  });
});
