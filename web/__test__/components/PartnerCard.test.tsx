import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PartnerCard from "../../src/components/PartnerCard";
import React from "react";
import { Partner } from "../../src/types/types";

const mockPartner: Partner = {
  id: 1,
  type: "Gold",
  name: "The Kebab and Chicken House",
  location: "17 Mount Street",
  description: "20% off Everything",
  image: "/uploads/kebab.jpg",
};

describe("PartnerCard", () => {
  it("renders PartnerCard with correct data", () => {
    render(<PartnerCard partner={mockPartner} colour="#F3CF0B" />);

    // Check if the elements are rendered correctly
    expect(screen.getByAltText("Partner Image")).toBeInTheDocument();
    const partnerImage = screen.getByAltText("Partner Image");
    expect(partnerImage).toHaveAttribute("src", mockPartner.image);
    expect(screen.getByText("The Kebab and Chicken House")).toBeInTheDocument();
    expect(screen.getByText("17 Mount Street")).toBeInTheDocument();
    expect(screen.getByText("20% off Everything")).toBeInTheDocument();
  });

  it("opens Google Maps with the correct query when 'View' button is clicked", () => {
    render(<PartnerCard partner={mockPartner} colour="#F3CF0B" />);

    const originalOpen = window.open;
    window.open = vi.fn();

    const viewButton = screen.getByText("View On Map");
    fireEvent.click(viewButton);

    expect(window.open).toHaveBeenCalledWith(
      "https://www.google.com/maps/search/?api=1&query=17%20Mount%20Street",
      "_blank"
    );

    window.open = originalOpen; // Restore original window.open
  });
});
