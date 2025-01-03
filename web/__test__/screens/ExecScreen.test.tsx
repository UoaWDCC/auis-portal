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

const noExecsMock = {
  request: {
    query: GET_EXECS,
  },
  result: {
    data: {
      execs: {
        data: [],
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
              Year: "2022",
            },
          },
          {
            id: 2,
            attributes: {
              Name: "Janet Doe",
              Role: "Executive",
              Year: "2022",
            },
          },
        ],
      },
    },
  },
};

const noPreviousTeamMock = {
  request: {
    query: GET_PREVIOUS_TEAMS,
  },
  result: {
    data: {
      previousTeams: {
        data: [],
      },
    },
  },
};

const mocks = [execsMock, previousTeamsMock];
const noDataMocks = [noExecsMock, noPreviousTeamMock];

describe("ExecScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen navbar={<></>} />
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
          <ExecScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findAllByText("There are no execs to display")
    ).toHaveLength(2);
  });

  it("renders current execs correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Guryash")).toBeInTheDocument();
    expect(await screen.findByText("A great leader")).toBeInTheDocument();
    expect(await screen.findAllByText("President")).toHaveLength(3);
    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(await screen.findByText("People")).toBeInTheDocument();
    expect(await screen.findByText("An amazing executive")).toBeInTheDocument();
  });

  it("renders previous teams correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Previous Teams")).toBeInTheDocument();
    expect(await screen.findByText("2022")).toBeInTheDocument();
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("Executives")).toBeInTheDocument();
    expect(await screen.findByText("Janet Doe")).toBeInTheDocument();
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <ExecScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    // Message should appear twice
    const noExecs = await screen.findAllByText("There are no execs to display");
    expect(noExecs).toHaveLength(2);
    expect(
      await screen.findByText("There are no previous teams to display")
    ).toBeInTheDocument();
  });
});
