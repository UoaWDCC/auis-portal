import { describe, expect, it } from "vitest";
import { Ticket } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";
import { NoDataError } from "../../src/classes/NoDataError";

describe("mapToTickets", () => {
  it("should map valid data correctly", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing name field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: null,
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing discount code field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: null,
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing discount price field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: null,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 0,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing price field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: null,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 0,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing is member only field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: null,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: false,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing is double field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: null,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: false,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing number tickets left field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: null,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 0,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing ticket description field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: null,
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "",
        startDateTicketSales: "2024-01-01",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing start date ticket sales field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: null,
              Is_Ticket_Live: true,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "",
        isTicketLive: true,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle missing is ticket live field gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Ticket 1",
              Discount_Code: "Ticket 1 Code",
              Discount_Price: 5,
              Price: 10,
              Is_Member_Only: true,
              Is_Double: true,
              Number_Tickets_Left: 50,
              Ticket_Description: "Ticket 1 Description",
              Start_Date_Ticket_Sales: "2024-01-01",
              Is_Ticket_Live: null,
            },
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "Ticket 1",
        discountCode: "Ticket 1 Code",
        discountPrice: 5,
        price: 10,
        isMemberOnly: true,
        isDouble: true,
        numTicketsLeft: 50,
        ticketDescription: "Ticket 1 Description",
        startDateTicketSales: "2024-01-01",
        isTicketLive: false,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      tickets: {
        data: [
          {
            id: 1,
            attributes: null,
          },
        ],
      },
    };

    const expected: Ticket[] = [
      {
        id: 1,
        name: "",
        discountCode: "",
        discountPrice: 0,
        price: 0,
        isMemberOnly: false,
        isDouble: false,
        numTicketsLeft: 0,
        ticketDescription: "",
        startDateTicketSales: "",
        isTicketLive: false,
      },
    ];

    expect(Mapper.mapToTickets(data)).toEqual(expected);
  });

  it("should throw NoDataError when tickets.data is empty", () => {
    const data = {
      tickets: {
        data: [],
      },
    };

    expect(() => Mapper.mapToTickets(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTickets(data)).toThrow("No data");
  });

  it("should throw NoDataError when tickets is empty", () => {
    const data = {
      tickets: {},
    };

    expect(() => Mapper.mapToTickets(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTickets(data)).toThrow("No data");
  });

  it("should throw NoDataError when data is empty", () => {
    const data = {};

    expect(() => Mapper.mapToTickets(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToTickets(data)).toThrow("No data");
  });
});
