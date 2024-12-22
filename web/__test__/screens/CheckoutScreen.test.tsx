import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckoutScreen from "../../src/screens/CheckoutScreen";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

vi.mock("@components/checkout-page/CheckoutError", () => ({
  default: () => {
    return <div>CheckoutError</div>;
  },
}));

const queryClient = new QueryClient();

describe("AboutUsScreen", () => {
  it("renders error screen properly", () => {
    render(
      <MockedProvider addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <CheckoutScreen />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    expect(screen.getByText("CheckoutError")).toBeInTheDocument();
  });
});
