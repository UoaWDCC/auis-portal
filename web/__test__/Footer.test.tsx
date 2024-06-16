import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../src/components/Footer";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  it("should render the logo images", () => {
    render(<Footer />);
    const peacockLogo = screen.getByAltText("Peacock Logo");

    expect(peacockLogo).toBeInTheDocument();
  });

  it("should render the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const expectedText = `© AUIS ${currentYear}. All Rights Reserved`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
