import { MockedProvider } from "@apollo/client/testing";
import {
  GET_INTRODUCTION,
  GET_VALUES,
  GET_PARTNERS,
  GET_PARTNER_IMAGES,
} from "../../src/graphql/queries";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AboutUsScreen from "../../src/screens/AboutUsScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

// Mock data for GET_INTRODUCTION query
const introMock = {
  request: {
    query: GET_INTRODUCTION,
  },
  result: {
    data : {
      introductions: {
        data: [
          {
            attributes: {
              Description: "Introduction description",
              Events: "Upcoming events",
              Members: "Current members",
              Followers: "Followers count",
            },
          },
        ],
      },
    }
  }
};

const noIntroMock = {
  request: {
    query: GET_INTRODUCTION,
  },
  result: {
    data: {
      introductions: {
        data: [],
      },
    },
  },
};

// Mock data for GET_VALUES query
const valuesMock = {
  request: {
    query: GET_VALUES,
  },
  result: {
    data : {
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
                    url: "/uploads/value_one.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};

const noValuesMock = {
  request: {
    query: GET_VALUES,
  },
  result: {
    data: {
      values: {
        data: [],
      },
    },
  },
};

// Mock data for GET_PARTNERS query
const partnersMock = {
  request: {
    query: GET_PARTNER_IMAGES,
  },
  result: {
    data: {
      partners: {
        data:  [
          {
            id: 1,
            attributes: {
              Name: "Partner One",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_one.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};

const noPartnersMock = {
  request: {
    query: GET_PARTNERS,
  },
  result: {
    data: {
      partners: {
        data: [],
      },
    },
  },
};

const mocks = [introMock, valuesMock, partnersMock];
const noDataMocks = [noIntroMock, noValuesMock, noPartnersMock];

describe("AboutUsScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_INTRODUCTION,
        },
        error: new GraphQLError("Error!"),
      },
      {
        request: {
          query: GET_VALUES,
        },
        error: new GraphQLError("Error!"),
      },
      {
        request: {
          query: GET_PARTNERS,
        },
        error: new GraphQLError("Error!"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("There is no introduction to display")).toBeInTheDocument();
    expect(await screen.findByText("There are no values to display")).toBeInTheDocument();
    expect(await screen.findByText("There are no partners to display")).toBeInTheDocument();
  });

  it("renders queries correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Our Introduction")).toBeInTheDocument();
    expect(await screen.findByText("Introduction description")).toBeInTheDocument();
    expect(await screen.findByText("Value One")).toBeInTheDocument();
    const partnerImage = await screen.findByAltText("Partner One");
    expect(partnerImage).toHaveAttribute("src", "/uploads/partner_one.jpg");
  });


  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("There is no introduction to display")).toBeInTheDocument();
    expect(await screen.findByText("There are no values to display")).toBeInTheDocument();
    expect(await screen.findByText("There are no partners to display")).toBeInTheDocument();
  });

  it("redirects user when join us clicked", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

  const button = (await screen.findByRole('button', {name: "Join Us Now!"}))
  expect(button).toBeDefined();
  await fireEvent.click(button)
  
  expect(mockedUseNavigate);
  })

});
