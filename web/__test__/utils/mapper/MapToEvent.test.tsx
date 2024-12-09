import { describe, expect, it } from "vitest";
import { EventAndTickets } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToEvents", () => {
  it("should map valid data correctly", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "Event 1",
            Description: "Description 1",
            Subtitle: "Subtitle 1",
            Location: "Location 1",
            Event_Date_Start: "2024-01-01",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "description",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "Event 1",
      description: "Description 1",
      subtitle: "Subtitle 1",
      location: "Location 1",
      eventDateStart: "2024-01-01",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "description",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing title field gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "",
            Description: "Description 1",
            Subtitle: "Subtitle 1",
            Location: "Location 1",
            Event_Date_Start: "2024-01-01",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "description",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "",
      description: "Description 1",
      subtitle: "Subtitle 1",
      location: "Location 1",
      eventDateStart: "2024-01-01",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "description",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing all data fields gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "",
            Description: "",
            Subtitle: "",
            Location: "",
            Event_Date_Start: "",
            Event_Date_End: "",
            isLive: false,
            Terms_And_Conditions: "",
            Event_Capacity_Remaining: 0,
            Image: {
              data: {
                attributes: {
                  url: "",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "",
                    Price: 0,
                    Is_Member_Only: false,
                    Is_Double: false,
                    Number_Tickets_Left: 0,
                    Ticket_Description: "",
                    Start_Date_Ticket_Sales: "",
                    Is_Ticket_Live: false,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "",
                    Stripe_Link: "",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "",
      description: "",
      subtitle: "",
      location: "",
      eventDateStart: "",
      eventDateEnd: "",
      termsAndConditions: "",
      eventCapacityRemaining: 0,
      image: "",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "",
          name: "",
          price: 0,
          isMemberOnly: false,
          isDouble: false,
          numTicketsLeft: 0,
          startDateTicketSales: "",
          isTicketLive: false,
          ticketLinkBypass: false,
          bypassTicketLink: "",
          stripeLink: "",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle empty list of tickets", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "",
            Description: "",
            Subtitle: "",
            Location: "",
            Event_Date_Start: "",
            Event_Date_End: "",
            isLive: false,
            Terms_And_Conditions: "",
            Event_Capacity_Remaining: 0,
            Image: {
              data: {
                attributes: {
                  url: "",
                },
              },
            },
            Ticket_ID: {
              data: [],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "",
      description: "",
      subtitle: "",
      location: "",
      eventDateStart: "",
      eventDateEnd: "",
      termsAndConditions: "",
      eventCapacityRemaining: 0,
      image: "",
      isLive: false,
      tickets: [],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing description field gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "Event 1",
            Description: "",
            Subtitle: "Subtitle 1",
            Location: "Location 1",
            Event_Date_Start: "2024-01-01",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "Event 1",
      description: "",
      subtitle: "Subtitle 1",
      location: "Location 1",
      eventDateStart: "2024-01-01",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing subtitle field gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "Event 1",
            Description: "Description 1",
            Subtitle: "",
            Location: "Location 1",
            Event_Date_Start: "2024-01-01",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "description",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "Event 1",
      description: "Description 1",
      subtitle: "",
      location: "Location 1",
      eventDateStart: "2024-01-01",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "description",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing location field gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "Event 1",
            Description: "Description 1",
            Subtitle: "Subtitle 1",
            Location: "",
            Event_Date_Start: "2024-01-01",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "description",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "Event 1",
      description: "Description 1",
      subtitle: "Subtitle 1",
      location: "",
      eventDateStart: "2024-01-01",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "description",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should handle missing event start date field gracefully", () => {
    const data = {
      event: {
        data: {
          id: 1,
          attributes: {
            Title: "Event 1",
            Description: "Description 1",
            Subtitle: "Subtitle 1",
            Location: "Location 1",
            Event_Date_Start: "",
            Event_Date_End: "2024-01-02",
            isLive: false,
            Terms_And_Conditions: "Terms and Conditions 1",
            Event_Capacity_Remaining: 50,
            Image: {
              data: {
                attributes: {
                  url: "/uploads/event1.jpg",
                },
              },
            },
            Ticket_ID: {
              data: [
                {
                  id: 1,
                  attributes: {
                    Name: "name",
                    Price: 45,
                    Is_Member_Only: true,
                    Is_Double: false,
                    Number_Tickets_Left: 5,
                    Ticket_Description: "description",
                    Start_Date_Ticket_Sales: "1/2/3",
                    Is_Ticket_Live: true,
                    Ticket_Link_Bypass: false,
                    Bypass_Ticket_Link: "link",
                    Stripe_Link: "stripe",
                  },
                },
              ],
            },
          },
        },
      },
    };

    const expected: EventAndTickets = {
      title: "Event 1",
      description: "Description 1",
      subtitle: "Subtitle 1",
      location: "Location 1",
      eventDateStart: "",
      eventDateEnd: "2024-01-02",
      termsAndConditions: "Terms and Conditions 1",
      eventCapacityRemaining: 50,
      image: "/uploads/event1.jpg",
      isLive: false,
      tickets: [
        {
          id: 1,
          ticketDescription: "description",
          name: "name",
          price: 45,
          isMemberOnly: true,
          isDouble: false,
          numTicketsLeft: 5,
          startDateTicketSales: "1/2/3",
          isTicketLive: true,
          ticketLinkBypass: false,
          bypassTicketLink: "link",
          stripeLink: "stripe",
        },
      ],
    };

    expect(Mapper.mapToEvent(data)).toEqual(expected);
  });

  it("should throw NoDataError when events.data is empty", () => {
    const data = {
      events: {
        data: [],
      },
    };

    expect(() => Mapper.mapToEvent(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEvent(data)).toThrow("No data");
  });

  it("should throw NoDataError when events is empty", () => {
    const data = {
      events: {},
    };

    expect(() => Mapper.mapToEvent(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEvent(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToEvent(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToEvent(data)).toThrow("No data");
  });
});
