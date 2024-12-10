import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import {  fireEvent, render, screen } from "@testing-library/react";
import ErrorScreen from "../../src/screens/ErrorScreen";
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

describe("CreditScreen", () => {
  it("renders 404 not found", async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <ErrorScreen />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText("404 page not found :(")).toBeInTheDocument();
  });
  
  it("renders error", async () => {
    
    Object.defineProperty(window, 'location', { value: { pathname: "/error"} });
    
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <ErrorScreen/>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText("Oops... an error has occurred :(")).toBeInTheDocument();
  });

  it("redirects user when return clicked", async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
        <ErrorScreen/>
        </MemoryRouter>
      </MockedProvider>
    );

    const button = await screen.findByRole("button", { name: "Return to Home screen" });
    expect(button).toBeDefined();
    await fireEvent.click(button);

    expect(mockedUseNavigate);
  });

});
