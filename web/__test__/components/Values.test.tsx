import { MockedProvider } from "@apollo/client/testing"
import { GET_VALUES } from "../../src/graphql/queries"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Values from "../../src/components/Values"
import React from "react"
import { GraphQLError } from "graphql"

const mocks = [
  {
    request: {
      query: GET_VALUES
    },
    result: {
      data: {
        values: {
          data: [
            {
              id: 1,
              attributes: {
                Title: "Hate",
                Description: "Be a Professional Hater",
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
    query: GET_VALUES
  },
  result: {
    data: {
      values: {
        data: []
      }
    }
  }
}

describe("SomePhotos Component", () => {
  it("renders loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Values />
      </MockedProvider>
    )
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  it("renders the mocked data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Values />
      </MockedProvider>
    )
    expect(await screen.findByText("Hate")).toBeInTheDocument()
    expect(
      await screen.findByText("Be a Professional Hater")
    ).toBeInTheDocument()
  })
  it("renders error", async () => {
    const execMock = {
      request: {
        query: GET_VALUES
      },
      error: new GraphQLError("Error!")
    }
    render(
      <MockedProvider mocks={[execMock]} addTypename={false}>
        <Values />
      </MockedProvider>
    )
    expect(await screen.findByText("CMS Offline")).toBeInTheDocument()
  })
  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <Values />
      </MockedProvider>
    )
    expect(
      await screen.findByText("There are no values to display")
    ).toBeInTheDocument()
  })
})
