import { MockedProvider } from "@apollo/client/testing";
import {
  GET_INTRODUCTION,
  GET_VALUES,
  GET_PARTNERS,
  GET_PARTNER_IMAGES,
  GET_EVENTS_SLIDER,
  GET_EVENTS_GALLERY,
} from "../../src/graphql/queries";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EventScreen from "../../src/screens/EventScreen";
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

// Mock data for GET_INTRODUCTION query
var nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);
var prevDate = new Date();
prevDate.setDate(prevDate.getDate() - 1);
const eventSliderMock = {
  request: {
    query: GET_EVENTS_SLIDER,
  },
  result: {
    data : {
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
      }
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
    query: GET_EVENTS_GALLERY,
  },
  result: {
    data : {
        eventGalleries: {
          data: [
            {
              id: 1,
              attributes: {
                Image: {
                  data: {
                    attributes: {
                      url: "/uploads/event1.jpg",
                    },
                  },
                },
              },
            },
          ],
        },
      }
  },
};

const noValuesMock = {
  request: {
    query: GET_EVENTS_GALLERY,
  },
  result: {
    data: {
        eventGalleries: {
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
          <EventScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message when query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_EVENTS_GALLERY,
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
          <EventScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findByText("There are no event photos to display")
    ).toBeInTheDocument();
    
    expect(
      await screen.findAllByText("No Upcoming Events Right Now")
    ).toHaveLength(3);

    expect(
        await screen.findAllByText("No Past Events Right Now")
      ).toHaveLength(3);
  });

  it("renders queries correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EventScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Event 1")).toBeInTheDocument();
    expect(
      await screen.findByText("Event 2")
    ).toBeInTheDocument();
  });

  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <MemoryRouter>
          <EventScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(
      await screen.findAllByText("No Past Events Right Now")
    ).toHaveLength(3);
    expect(
      await screen.findAllByText("No Upcoming Events Right Now")
    ).toHaveLength(3);
  });
});
