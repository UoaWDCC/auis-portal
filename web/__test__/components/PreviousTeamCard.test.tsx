import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PreviousTeamCard from "../../src/components/PreviousTeamCard";
import React from "react";

const mockTeams = {
  Presidents: [
    {
      id: 1,
      name: "John Doe",
      role: "President",
      year: "2023",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "President",
      year: "2023",
    },
  ],
  Executives: [
    {
      id: 3,
      name: "Jack Smith",
      role: "Executive",
      year: "2023",
    },
    {
      id: 4,
      name: "Jill Brown",
      role: "Executive",
      year: "2023",
    },
  ],
};

describe("PreviousTeamCard", () => {
  it("renders PreviousTeamCard with correct data", () => {
    render(<PreviousTeamCard year="2023" teams={mockTeams} />);

    // Check if the year is rendered correctly
    expect(screen.getByText("2023")).toBeInTheDocument();

    // Check Presidents
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();

    // Check Executives
    expect(screen.getByText("Jack Smith")).toBeInTheDocument();
    expect(screen.getByText("Jill Brown")).toBeInTheDocument();
  });
});
