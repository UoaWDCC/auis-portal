import { MockedProvider } from "@apollo/client/testing";
import { GET_EXECS } from "../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ExecScreen from "../src/screens/ExecScreen";
import React from "react";
import { GraphQLError } from "graphql";

const mocks = [
  {
    request: {
      query: GET_EXECS,
    },
    result: {
      data: {
        execs: {
          data: [
            {
              id: 1,
              attributes: {
                name: "Guryash",
                bio: "A great leader",
                position: "President",
                image: {
                  data: {
                    attributes: {
                      url: "/uploads/john_doe.jpg",
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
];

describe("Exec Screen", () => {
  it("renders loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ExecScreen />
      </MockedProvider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders the mocked data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ExecScreen />
      </MockedProvider>
    );
    expect(await screen.findByText("Guryash")).toBeInTheDocument();
    expect(await screen.findByText("A great leader")).toBeInTheDocument();
    expect(await screen.findByText("President")).toBeInTheDocument();
  });
  it("renders error", async () => {
    const execMock = {
      request: {
        query: GET_EXECS,
      },
      error: new GraphQLError("Error!"),
    };
    render(
      <MockedProvider mocks={[execMock]} addTypename={false}>
        <ExecScreen />
      </MockedProvider>
    );
    expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  });
});
