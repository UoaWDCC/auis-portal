import { describe, expect, it } from "vitest";
import { Event } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";
import { NoDataError } from "../../src/classes/NoDataError";

describe("mapToEvents", () => {
  it("should map valid data correctly", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Event 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Event 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing title field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: null,
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing description field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: null,
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing subtitle field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: null,
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing location field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: null,
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing location link field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: null,
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing event start date field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: null,
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing event end date field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: null,
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing is live field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: null,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: false,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing terms and conditions field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: null,
              Event_Capacity_Remaining: 50,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "",
        eventCapacityRemaining: 50,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing event capacity remaining field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: null,
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

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 0,
        image: "/uploads/event1.jpg",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Title 1",
              Description: "Description 1",
              Subtitle: "Subtitle 1",
              Location: "Location 1",
              Location_Link: "http://location1.com",
              Event_Date_Start: "2024-01-01",
              Event_Date_End: "2024-01-02",
              Is_Live: true,
              Terms_And_Conditions: "Terms and Conditions 1",
              Event_Capacity_Remaining: 50,
              Image: null,
            },
          },
        ],
      },
    };

    const expected: Event[] = [
      {
        id: 1,
        title: "Title 1",
        description: "Description 1",
        subtitle: "Subtitle 1",
        location: "Location 1",
        locationLink: "http://location1.com",
        eventDateStart: "2024-01-01",
        eventDateEnd: "2024-01-02",
        isLive: true,
        termsAndConditions: "Terms and Conditions 1",
        eventCapacityRemaining: 50,
        image: "",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      events: {
        data: [
          {
            id: 1,
            attributes: null,
          },
        ],
      },
    };

    const expected: Event[] = [
      {
        id: 1,
        title: "",
        description: "",
        subtitle: "",
        location: "",
        locationLink: "",
        eventDateStart: "",
        eventDateEnd: "",
        isLive: false,
        termsAndConditions: "",
        eventCapacityRemaining: 0,
        image: "",
      },
    ];

    expect(Mapper.mapToEvents(data)).toEqual(expected);
  });

  it("should throw NoDataError when events.data is empty", () => {
    const data = {
      events: {
        data: [],
      },
    };

    expect(() => Mapper.mapToExec(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToExec(data)).toThrow("No data");
  });

  it("should throw NoDataError when events is empty", () => {
    const data = {
      events: {},
    };

    expect(() => Mapper.mapToExec(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToExec(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToExec(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToExec(data)).toThrow("No data");
  });
});
