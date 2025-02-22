import { MockedProvider } from "@apollo/client/testing";
import { GET_PARTNERS } from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SponsorsScreen from "../../src/screens/SponsorsScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

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
          {
            id: 2,
            attributes: {
              Type: "Silver",
              Name: "Subi's Desserts",
              Location: "128 White Swan Road, Mount Roskil",
              Description: "15% off Everything",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/subi.jpg",
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              Type: "Bronze",
              Name: "Beso",
              Location: "256 Manukau Road, Epsom, Auckland",
              Description: "10% off Everything",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/beso.jpg",
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

const mocks = [partnersMock];
const noDataMocks = [noPartnersMock];

describe("PartnersScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
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
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("No gold partners to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No silver partners to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No bronze partners to display")
    ).toBeInTheDocument();
  });

  it("renders current gold partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("The Kebab and Chicken House")
    ).toBeInTheDocument();
    expect(await screen.findByText("20% off Everything")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const goldPartnerImages = await screen.findByAltText(
      "The Kebab and Chicken House"
    );
    expect(goldPartnerImages).toHaveAttribute("src", "/uploads/kebab.jpg");
  });

  it("renders current silver partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Subi's Desserts")).toBeInTheDocument();
    expect(await screen.findByText("15% off Everything")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const silverPartnerImages = await screen.findByAltText("Subi's Desserts");
    expect(silverPartnerImages).toHaveAttribute("src", "/uploads/subi.jpg");
  });

  it("renders current bronze partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Beso")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const bronzePartnerImages = await screen.findByAltText("Beso");
    expect(bronzePartnerImages).toHaveAttribute("src", "/uploads/beso.jpg");
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <SponsorsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("No gold partners to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No silver partners to display")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No bronze partners to display")
    ).toBeInTheDocument();
  });
});
