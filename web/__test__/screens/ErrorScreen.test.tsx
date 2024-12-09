import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import {  render, screen } from "@testing-library/react";
import ErrorScreen from "../../src/screens/ErrorScreen";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

describe("CreditScreen", () => {
  it("renders error", async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <ErrorScreen/>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText("Oops... an error has occurred :(")).toBeInTheDocument();
  });

  it("renders 404 not found", async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <ErrorScreen/>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText("Oops... an error has occurred :(")).toBeInTheDocument();
  });

});
