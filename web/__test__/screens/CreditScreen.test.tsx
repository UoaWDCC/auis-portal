import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import {  render, screen } from "@testing-library/react";
import CreditsScreen from "../../src/screens/CreditsScreen";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

describe("CreditScreen", () => {
  it("renders loading spinner initially", async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter>
          <CreditsScreen navbar={<></>} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Primary Developers")).toBeInTheDocument();
    expect(await screen.findByText("Harsheel Singh")).toBeInTheDocument();
    expect(await screen.findByText("Secondary Developers")).toBeInTheDocument();
    expect(await screen.findByText("Karmveer Singh")).toBeInTheDocument();
  });

});
