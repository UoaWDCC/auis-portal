import { MockedProvider } from "@apollo/client/testing";
import {
  GET_INTRODUCTION,
  GET_VALUES,
  GET_PARTNERS,
} from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUsScreen from "../../src/screens/AboutUsScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

// Mock data for GET_INTRODUCTION query
const introMock = {
  request: {
    query: GET_INTRODUCTION,
  },
  result: {
    data: {
      introductions: {
        data: [
          {
            id: 1,
            attributes: {
              Description: "AUIS is a great club",
              Events: "30",
              Members: "500",
              Followers: "1000",
            },
          },
        ],
      },
    },
  },
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
    data: {
      values: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Community",
              Description: "We believe in a strong community",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/community.jpg",
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
    query: GET_PARTNERS,
  },
  result: {
    data: {
      partners: {
        data: [
          {
            id: 1,
            attributes: {
              Type: "Gold",
              Name: "The Kebab and Chicken House",
              Location: "17 Mount Street",
              Description: "20% off Everything",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/kebab.jpg",
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

    // expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  });

  it("renders introduction correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("AUIS is a great club")).toBeInTheDocument();
    expect(await screen.findByText("30+")).toBeInTheDocument();
    expect(await screen.findByText("500+")).toBeInTheDocument();
    expect(await screen.findByText("1000+")).toBeInTheDocument();
  });

  it("renders values correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Community")).toBeInTheDocument();
    expect(
      await screen.findByText("We believe in a strong community")
    ).toBeInTheDocument();
    const valueImage = await screen.findByAltText("Value Image");
    expect(valueImage).toHaveAttribute("src", "/uploads/community.jpg");
  });

  it("renders partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    const partnerImage = await screen.findByAltText("Partner Image");
    expect(partnerImage).toHaveAttribute("src", "/uploads/kebab.jpg");
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <AboutUsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("There is no introduction to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("There are no values to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("There are no partners to display")
    ).toBeInTheDocument();
  });
});
