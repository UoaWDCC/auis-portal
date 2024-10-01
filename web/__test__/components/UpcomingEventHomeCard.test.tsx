import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import UpcomingEventHomeCard from "../../src/components/UpcomingEventHomeCard";
import React from "react";

const mockEvents = {
  Events: [
    {
      id: 1,
      title: "Test event",
      description: "Test description",
      subtitle: "Test subtitle",
      location: "Test location",
      locationLink: "Test link",
      eventDateStart: "25 December",
      eventDateEnd: "26 December",
      isLive: false,
      termsAndConditions: "Test terms and conditions",
      eventCapacityRemaining: 12,
      image: "/uploads/john_doe.jpg",
    },
  ],
};

describe("UpcomingEventHomeCard", () => {
  it("renders the event card", () => {
    render(<UpcomingEventHomeCard events={mockEvents} />);
    expect(screen.getByText("25 December")).toBeInTheDocument();
    expect(screen.getByText("Test event")).toBeInTheDocument();
    const partnerImage = screen.getByAltText("Event Image");
    expect(partnerImage).toHaveAttribute("src", mockEvents.image);
  });
});
