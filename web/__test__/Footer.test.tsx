import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../src/components/Footer";

describe("Footer component", () => {
  it("should render the logo images", () => {
    render(<Footer />);
    const peacockLogo = screen.getByAltText("Peacock Logo");
    const whiteName = screen.getByAltText("Logo Text");

    expect(peacockLogo).toBeInTheDocument();
    expect(whiteName).toBeInTheDocument();
  });

  it("should render the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  it("should render social media links", () => {
    render(<Footer />);
    const socialMediaLinks = [
      { name: "Facebook", link: "https://www.facebook.com/auis.uoa/" },
      {
        name: "Instagram",
        link: "https://www.instagram.com/au.indiansociety/?hl=en",
      },
      {
        name: "Linkedin",
        link: "https://www.linkedin.com/company/auindiansociety/",
      },
      { name: "GitHub", link: "https://github.com/UoaWDCC/auis-portal" },
    ];

    socialMediaLinks.forEach(({ name, link }) => {
      const socialMediaIcon = screen.getByRole("link", {
        name: new RegExp(name, "i"),
      });
      expect(socialMediaIcon).toHaveAttribute("href", link);
    });
  });
});
