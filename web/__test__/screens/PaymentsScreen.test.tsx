import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { ClerkProvider } from "@clerk/clerk-react";
import PaymentScreen from "../../src/screens/PaymentScreen";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

describe("Sign In Screen", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <PaymentScreen />
        </ClerkProvider>
      </MemoryRouter>
    );
  });

  const resizeWindow = (width: number) => {
    global.innerWidth = width;
    fireEvent(window, new Event("resize"));
  };

  it("should render the text", () => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  it("should render the text", () => {
    const subTitle = screen.getByTestId("subTitle");
    expect(subTitle).toBeInTheDocument();
  });

  it("should render the text", () => {
    const firstListItem = screen.getByTestId("firstListItem");
    expect(firstListItem).toBeInTheDocument();
  });

  it("should render the text", () => {
    const secondListItem = screen.getByTestId("secondListItem");
    expect(secondListItem).toBeInTheDocument();
  });

  it("should render the icon", () => {
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render the text cost", () => {
    const price = screen.getByTestId("price");
    expect(price).toBeInTheDocument();
  });

  it("should render the text continue", () => {
    const continueButton = screen.getByTestId("button");
    expect(continueButton).toBeInTheDocument();
  });
});
