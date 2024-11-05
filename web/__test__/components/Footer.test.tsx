import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "../../src/components/navigation/Footer";
import "@testing-library/jest-dom";

// Mock the Socials component
vi.mock("../../src/components/Socials", () => ({
  default: () => <div>Socials Component</div>,
}));

describe("Footer component", () => {
  it("should render the logo images", () => {
    render(<Footer />);
    const peacockLogo = screen.getByAltText("Peacock Logo");

    expect(peacockLogo).toBeInTheDocument();
  });
});
