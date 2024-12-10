import { MockedProvider } from "@apollo/client/testing";
import { GET_EVENTS_SLIDER, GET_SOME_PHOTOS } from "../../src/graphql/queries";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../../src/screens/HomeScreen";
import React from "react";
import { GraphQLError } from "graphql";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

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

var nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);
var prevDate = new Date();
prevDate.setDate(prevDate.getDate() - 1);
const eventSliderMock = {
  request: {
    query: GET_EVENTS_SLIDER,
  },
  result: {
    data: {
      events: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Event 1",
              Location: "Location 1",
              Event_Date_Start: nextDate,
              isLive: true,
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/event1.jpg",
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              Title: "Event 2",
              Location: "Location 2",
              Event_Date_Start: prevDate,
              isLive: true,
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/event2.jpg",
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

const noEventSliderMock = {
  request: {
    query: GET_EVENTS_SLIDER,
  },
  result: {
    data: {
      events: {
        data: [],
      },
    },
  },
};

// Mock data for GET_VALUES query
const valuesMock = {
  request: {
    query: GET_SOME_PHOTOS,
  },
  result: {
    data: {
      somePhotos: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Nature",
              Year: "2023",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/nature.jpg",
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              Title: "Cityscape",
              Year: "2022",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/cityscape.jpg",
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
    query: GET_SOME_PHOTOS,
  },
  result: {
    data: {
      somePhotos: {
        data: [],
      },
    },
  },
};

const mocks = [eventSliderMock, valuesMock];
const noDataMocks = [noEventSliderMock, noValuesMock];

describe("AboutUsScreen", () => {
  it("renders loading spinner initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <HomeScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_SOME_PHOTOS,
        },
        error: new GraphQLError("Error!"),
      },
      {
        request: {
          query: GET_EVENTS_SLIDER,
        },
        error: new GraphQLError("Error!"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <HomeScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Photos coming soon!")).toBeInTheDocument();

    expect(
      await screen.findAllByText("No Upcoming Events Right Now")
    ).toHaveLength(3);

    expect(await screen.queryByText("No Past Events Right Now")).toBeNull();
  });

  it("renders queries correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <HomeScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Event 1")).toBeInTheDocument();
    expect(await screen.queryByText("Event 2")).toBeNull();
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <HomeScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.queryByText("No Past Events Right Now")).toBeNull();
    expect(
      await screen.findAllByText("No Upcoming Events Right Now")
    ).toHaveLength(3);
    expect(await screen.findByText("Photos coming soon!")).toBeInTheDocument();
  });
});
