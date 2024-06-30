import { MockedProvider } from "@apollo/client/testing";
import { GET_EXECS, GET_PREVIOUS_TEAMS } from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ExecScreen from "../../src/screens/ExecScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

// Mock data for GET_EXECS query
const execsMock = {
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
              Name: "Guryash",
              Description: "A great leader",
              Position: "President",
              Role: "President",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/john_doe.jpg",
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              Name: "Jane Doe",
              Description: "An amazing executive",
              Position: "People",
              Role: "Executive",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/jane_doe.jpg",
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

// Mock data for GET_PREVIOUS_TEAMS query
const previousTeamsMock = {
  request: {
    query: GET_PREVIOUS_TEAMS,
  },
  result: {
    data: {
      previousTeams: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "John Doe",
              Role: "President",
              Year: "2023",
            },
          },
          {
            id: 2,
            attributes: {
              Name: "Janet Doe",
              Role: "Executive",
              Year: "2023",
            },
          },
        ],
      },
    },
  },
};

const mocks = [execsMock, previousTeamsMock];

describe("ExecScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen />
        </MemoryRouter>
      </MockedProvider>
    );
    
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_EXECS,
        },
        error: new GraphQLError("Error!"),
      },
      {
        request: {
          query: GET_PREVIOUS_TEAMS,
        },
        error: new GraphQLError("Error!"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  });

  it("renders current execs correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Guryash")).toBeInTheDocument();
    expect(await screen.findByText("A great leader")).toBeInTheDocument();
    expect(await screen.findByText("President")).toBeInTheDocument();
    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(await screen.findByText("People")).toBeInTheDocument();
    expect(await screen.findByText("An amazing executive")).toBeInTheDocument();
  });

  it("renders previous teams correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Previous Teams")).toBeInTheDocument();
    expect(await screen.findByText("2023")).toBeInTheDocument();
    expect(await screen.findByText("Presidents")).toBeInTheDocument();
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("Executives")).toBeInTheDocument();
    expect(await screen.findByText("Janet Doe")).toBeInTheDocument();
  });
});
