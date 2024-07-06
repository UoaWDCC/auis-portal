import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ValueCard from "../../src/components/ValueCard";
import React from "react";
import { Value } from "../../src/types/types";

const mockValue: Value = {
  id: 1,
  title: "Community",
  description: "Great sense of community in AUIS",
  image: "/uploads/community.jpg",
};

describe("ValueCard", () => {
  it("renders ValueCard with correct data", () => {
    render(<ValueCard value={mockValue} />);

    expect(screen.getByAltText("Value Image")).toBeInTheDocument();
    const valueImage = screen.getByAltText("Value Image");
    expect(valueImage).toHaveAttribute("src", mockValue.image);
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(
      screen.getByText("Great sense of community in AUIS")
    ).toBeInTheDocument();
  });
});
