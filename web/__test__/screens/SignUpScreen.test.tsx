import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpScreen from "../../src/screens/SignUpScreen";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

describe("Sign Up Screen", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <SignUpScreen />
        </ClerkProvider>
      </MemoryRouter>
    );
  });

  const resizeWindow = (width: number) => {
    global.innerWidth = width;
    fireEvent(window, new Event("resize"));
  };

  it("should render the Peacock logo", () => {
    const peacockLogo = screen.getByAltText("AUIS Peacock Logo");
    expect(peacockLogo).toBeInTheDocument();
  });

  it("should render the Clerk component", () => {
    const peacockLogo = screen.getByTestId("clerk-sign-in");
    expect(peacockLogo).toBeInTheDocument();
  });

  it("should render the AUIS logo", () => {
    const auisLogo = screen.getByAltText("AUIS Logo");
    expect(auisLogo).toBeInTheDocument();
  });

  it("should not render the AUIS logo on small screens", () => {
    resizeWindow(500); // Simulate a small screen
    expect(screen.queryByTestId("AUIS Logo")).toBeNull();
  });

  it("should not render the Peacock logo on small screens", () => {
    resizeWindow(500); // Simulate a small screen
    expect(screen.queryByTestId("AUIS Peacock Logo")).toBeNull();
  });
});
