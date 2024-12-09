import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckoutInformationScreen from "../../src/screens/CheckoutInformationScreen";
import React from "react";
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

vi.mock("@components/checkout-page/CheckoutError", () => ({
  default: () => {
    return <div>CheckoutError</div>;
  },
}));

vi.mock("@components/forms/CheckoutInformation", () => ({
  default: () => {
    return <div>CheckoutInformation</div>;
  },
}));

describe("AboutUsScreen", () => {
  it("renders screen properly", () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter
          initialEntries={[
            {
              state: { data: { priceId: "1234", ticketId: 5678 } },
            },
          ]}
        >
          <CheckoutInformationScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("CheckoutInformation")).toBeInTheDocument();
  });

  it("renders screen properly", () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <CheckoutInformationScreen />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("CheckoutError")).toBeInTheDocument();
  });
});
