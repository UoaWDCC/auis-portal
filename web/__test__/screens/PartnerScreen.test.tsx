import { MockedProvider } from "@apollo/client/testing";
import { GET_PARTNERS } from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PartnersScreen from "../../src/screens/PartnersScreen";
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
              Name: "Beso Cafe and Kitchen",
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
          <PartnersScreen />
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
          <PartnersScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  });

  it("renders current gold partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <PartnersScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("The Kebab and Chicken House")
    ).toBeInTheDocument();
    expect(await screen.findByText("17 Mount Street")).toBeInTheDocument();
    expect(await screen.findByText("20% off Everything")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const goldPartnerImages = screen.getAllByAltText(
      "Partner Image"
    ) as HTMLImageElement[];
    const goldPartnerImage = goldPartnerImages.find((img) =>
      img.src.includes("/uploads/kebab.jpg")
    );

    expect(goldPartnerImage).toBeInTheDocument();
  });

  it("renders current silver partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <PartnersScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Subi's Desserts")).toBeInTheDocument();
    expect(
      await screen.findByText("128 White Swan Road, Mount Roskil")
    ).toBeInTheDocument();
    expect(await screen.findByText("15% off Everything")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const silverPartnerImages = screen.getAllByAltText(
      "Partner Image"
    ) as HTMLImageElement[];
    const silverPartnerImage = silverPartnerImages.find((img) =>
      img.src.includes("/uploads/subi.jpg")
    );

    expect(silverPartnerImage).toBeInTheDocument();
  });

  it("renders current bronze partners correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <PartnersScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("Beso Cafe and Kitchen")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("256 Manukau Road, Epsom, Auckland")
    ).toBeInTheDocument();
    expect(await screen.findByText("10% off Everything")).toBeInTheDocument();

    // Find the image element with alt text "Partner Image" and specific src
    const bronzePartnerImages = screen.getAllByAltText(
      "Partner Image"
    ) as HTMLImageElement[];
    const bronzePartnerImage = bronzePartnerImages.find((img) =>
      img.src.includes("/uploads/beso.jpg")
    );

    expect(bronzePartnerImage).toBeInTheDocument();
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <PartnersScreen />
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
