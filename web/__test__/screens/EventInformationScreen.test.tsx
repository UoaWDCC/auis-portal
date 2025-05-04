import { MockedProvider } from "@apollo/client/testing";
import {
  GET_INTRODUCTION,
  GET_VALUES,
  GET_PARTNERS,
  GET_PARTNER_IMAGES,
  getEventById,
} from "../../src/graphql/queries";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EventInformationScreen from "../../src/screens/EventInformationScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// // Mock data for GET_INTRODUCTION query
// const introMock = {
//   request: {
//     query: getEventById({id: 1}),
//   },
//   result: {
//     data : {
//         event: {
//           data: {
//             id: 1,
//             attributes: {
//               Title: "Event 1",
//               Description: "Description 1",
//               Subtitle: "Subtitle 1",
//               Location: "Location 1",
//               Event_Date_Start: "2024-01-01",
//               Event_Date_End: "2024-01-02",
//               isLive: false,
//               Terms_And_Conditions: "Terms and Conditions 1",
//               Event_Capacity_Remaining: 50,
//               Image: {
//                 data: {
//                   attributes: {
//                     url: "/uploads/event1.jpg",
//                   },
//                 },
//               },
//               Ticket_ID: {
//                 data: [
//                   {
//                     id: 1,
//                     attributes: {
//                       Name: "name",
//                       Price: 45,
//                       Is_Member_Only: true,
//                       Is_Double: false,
//                       Number_Tickets_Left: 5,
//                       Ticket_Description: "description",
//                       Start_Date_Ticket_Sales: "1/2/3",
//                       Is_Ticket_Live: true,
//                       Ticket_Link_Bypass: false,
//                       Bypass_Ticket_Link: "link",
//                       Stripe_Link: "stripe",
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       }
//   },
// };

// const noIntroMock = {
//   request: {
//     query: getEventById({id: -1}),
//   },
//   result: {
//     data: {
//         event: {
//         data: [],
//       },
//     },
//   },
// };

// const mocks = [introMock];
// const noDataMocks = [noIntroMock];

vi.mock("../../api/apiRequests", () => ({
  useUserMemberTicketInfo: () =>
    Promise.resolve({
      ticketIdCode: "ticketIdCode",
      ticketName: "ticketName",
      qrCode: "qrCode",
    }),
}));

// const mockedUseUserMembershipExpiry = vi.fn(() =>
//     {
//         data: {useUserMembershipExpiry: nextDate.toString()}
//     }
// );
vi.mock("../hooks/api/useUserMemberTicketInfo", async () => {
  const mod = await vi.importActual<
    typeof import("../../src/hooks/api/useUserMemberTicketInfo")
  >("../../src/hooks/api/useUserMemberTicketInfo");
  return {
    ...mod,
    useUserMemberTicketInfo: () => () => ({
      data: {
        ticketIdCode: "ticketIdCode",
        ticketName: "ticketName",
        qrCode: "qrCode",
      },
      isLoading: false,
      error: undefined,
    }),
  };
});

// supertoken hook working
vi.mock("supertokens-auth-react/recipe/session", async () => {
  const mod = await vi.importActual<
    typeof import("supertokens-auth-react/recipe/session")
  >("supertokens-auth-react/recipe/session");
  return {
    ...mod,
    useSessionContext: () => ({
      loading: false,
      doesSessionExist: false,
    }),
  };
});

describe("EventInformationScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <EventInformationScreen navbar={<></>} />
          </QueryClientProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: getEventById({ id: -1 }),
        },
        error: new GraphQLError("Error!"),
      },
    ];
    Object.defineProperty(window, "location", {
      value: { pathname: "/events/-1" },
    });

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <EventInformationScreen navbar={<></>} />
          </QueryClientProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("This event is not available at this time")
    ).toBeInTheDocument();
  });

  //   it("renders queries correctly", async () => {
  //     Object.defineProperty(window, "location", {
  //         value: { pathname: "/events/1" },
  //       });

  //     render(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <MemoryRouter>
  //           <EventInformationScreen navbar={<></>} />
  //         </MemoryRouter>
  //       </MockedProvider>
  //     );

  //     expect(await screen.findByText("Event 1")).toBeInTheDocument();
  //   });
});
