import { MockedProvider } from "@apollo/client/testing";
import { GET_INTRODUCTION } from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Introductions from "../../src/components/Introductions";
import React from "react";
import { GraphQLError } from "graphql";

const mocks = [
  {
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
                Events: "Hate",
                Description: "Be a Professional Hater",
                Followers: "1000",
                Members: "2000",
              },
            },
          ],
        },
      },
    },
  },
];

const noDataMock = {
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

describe("Introductions Component", () => {
  it("renders loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Introductions />
      </MockedProvider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders the mocked data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Introductions />
      </MockedProvider>
    );
    expect(await screen.findByText("Hate")).toBeInTheDocument();
    expect(
      await screen.findByText("Be a Professional Hater")
    ).toBeInTheDocument();
    expect(await screen.findByText("1000")).toBeInTheDocument();
    expect(await screen.findByText("2000")).toBeInTheDocument();
  });
  it("renders error", async () => {
    const execMock = {
      request: {
        query: GET_INTRODUCTION,
      },
      error: new GraphQLError("Error!"),
    };
    render(
      <MockedProvider mocks={[execMock]} addTypename={false}>
        <Introductions />
      </MockedProvider>
    );
    expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  });
  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <Introductions />
      </MockedProvider>
    );
    expect(
      await screen.findByText("There is no introduction to display")
    ).toBeInTheDocument();
  });
});
