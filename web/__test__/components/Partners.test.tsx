import { MockedProvider } from "@apollo/client/testing"
import { GET_PARTNERS } from "../../src/graphql/queries"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Partners from "../../src/components/Partners"
import React from "react"
import { GraphQLError } from "graphql"

const mocks = [
  {
    request: {
      query: GET_PARTNERS
    },
    result: {
      data: {
        partners: {
          data: [
            {
              id: 1,
              attributes: {
                Name: "Dhruv",
                Type: "Dal",
                Location: "Nearest Dal Store",
                Description: "Come to me for Dal",
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
    query: GET_PARTNERS
  },
  result: {
    data: {
      partners: {
        data: []
      }
    }
  }
}

describe("Partner Component", () => {
  it("renders loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Partners />
      </MockedProvider>
    )
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  it("renders the mocked data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Partners />
      </MockedProvider>
    )
    expect(await screen.findByText("Dhruv")).toBeInTheDocument()
    expect(await screen.findByText("Dal")).toBeInTheDocument()
    expect(await screen.findByText("Nearest Dal Store")).toBeInTheDocument()
    expect(await screen.findByText("Come to me for Dal")).toBeInTheDocument()
  })
  it("renders error", async () => {
    const execMock = {
      request: {
        query: GET_PARTNERS
      },
      error: new GraphQLError("Error!")
    }
    render(
      <MockedProvider mocks={[execMock]} addTypename={false}>
        <Partners />
      </MockedProvider>
    )
    expect(await screen.findByText("CMS Offline")).toBeInTheDocument()
  })
  it("renders no data from cms", async () => {
    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <Partners />
      </MockedProvider>
    )
    expect(
      await screen.findByText("There are no partners to display")
    ).toBeInTheDocument()
  })
})
