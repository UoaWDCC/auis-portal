import { MockedProvider } from "@apollo/client/testing";
import {
  GET_INTRODUCTION,
  GET_VALUES,
  GET_PARTNERS,
  GET_PARTNER_IMAGES,
  GET_PURCHASEABLE_MEMBERSHIPS,
} from "../../src/graphql/queries";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MembershipScreen from "../../src/screens/MembershipScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// use navigate hook mock
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});
const queryClient = new QueryClient();

// tanstack query hook mock - not working
var nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 15);
var prevDate = new Date();
prevDate.setDate(prevDate.getDate() - 1);

vi.mock("./myFetchFunction", () => ({
  fetchUserMembershipExpiry: () =>
    Promise.resolve({
      userExpiryDate: nextDate,
    }),
}));

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

// Mock data for GET_PURCHASEABLE_MEMBERSHIPS query
const introMock = {
  request: {
    query: GET_PURCHASEABLE_MEMBERSHIPS,
  },
  result: {
    data: {
      purchasableMemberships: {
        data: [
          {
            id: 0,
            attributes: {
              Title: "title",
              Expiry: "1/2/3",
              Price: 24,
              Stripe_Link: "stripe",
              Description: "description",
              Membership_Link_Bypass: false,
              Bypass_Membership_Link: "link",
            },
          },
        ],
      },
    },
  },
};

const noIntroMock = {
  request: {
    query: GET_PURCHASEABLE_MEMBERSHIPS,
  },
  result: {
    data: {
      introductions: {
        data: [],
      },
    },
  },
};

const mocks = [introMock];
const noDataMocks = [noIntroMock];

describe("Membership Screen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MembershipScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_PURCHASEABLE_MEMBERSHIPS,
        },
        error: new GraphQLError("Error!"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MembershipScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    expect(
      await screen.findByText(
        "Sorry there are no memberships available at this time. Come back later"
      )
    ).toBeInTheDocument();
  });

  // I was unable to figure out the mock for the tanstack query hook so will do this test case later

//   it("renders purchase memberships correctly", async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <QueryClientProvider client={queryClient}>
//           <MemoryRouter>
//             <MembershipScreen navbar={<></>} />
//           </MemoryRouter>
//         </QueryClientProvider>
//       </MockedProvider>
//     );

//     expect(
//       await screen.findByText("Your current membership expires on")
//     ).toBeInTheDocument();
//   });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MembershipScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    expect(
      await screen.findByText(
        "Sorry there are no memberships available at this time. Come back later"
      )
    ).toBeInTheDocument();
  });
});
