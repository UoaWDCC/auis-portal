import { MockedProvider } from "@apollo/client/testing"
import { GET_SOME_PHOTOS } from "../../src/graphql/queries"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import SomePhotos from "../../src/components/SomePhotos"
import React from "react"
import { GraphQLError } from "graphql"

const mocks = [
  {
    request: {
      query: GET_SOME_PHOTOS
    },
    result: {
      data: {
        somePhotos: {
          data: [
            {
              id: 1,
              attributes: {
                Title: "AUIS Stein",
                Year: "2024",
                Image: {
                  data: {
                    attributes: {
                      url: "/uploads/john_doe.jpg"
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  }
]

const noDataMock = {
  request: {
    query: GET_SOME_PHOTOS
  },
  result: {
    data: {
      somePhotos: {
        data: []
      }
    }
  }
}

describe("SomePhotos Component", () => {
  it("renders loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SomePhotos />
      </MockedProvider>
    )
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  it("renders the mocked data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SomePhotos />
      </MockedProvider>
    )
    expect(await screen.findByText("AUIS Stein")).toBeInTheDocument()
    expect(await screen.findByText("2024")).toBeInTheDocument()
  })
  it("renders error", async () => {
    const execMock = {
      request: {
        query: GET_SOME_PHOTOS
      },
      error: new GraphQLError("Error!")
    }
    render(
      <MockedProvider mocks={[execMock]} addTypename={false}>
        <SomePhotos />
      </MockedProvider>
    )
    expect(await screen.findByText("CMS Offline")).toBeInTheDocument()
  })
  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <SomePhotos />
      </MockedProvider>
    )
    expect(
      await screen.findByText("There are no photos to display")
    ).toBeInTheDocument()
  })
})
