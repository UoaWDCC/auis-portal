import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ExecCard from "../../src/components/ExecCard";
import React from "react";
import { Exec } from "../../src/types/types";

const mockExec: Exec = {
  id: 1,
  image: "/uploads/john_doe.jpg",
  position: "President",
  role: "President",
  name: "Gury Singh",
  description: "A great leader",
};

describe("ExecCard", () => {
  it("renders ExecCard with correct data", () => {
    render(<ExecCard exec={mockExec} />);

    // Check if the elements are rendered correctly
    expect(screen.getByAltText("Exec Image")).toBeInTheDocument();
    const execImage = screen.getByAltText("Exec Image");
    expect(execImage).toHaveAttribute("src", mockExec.image);
    expect(screen.getByText("Gury Singh")).toBeInTheDocument();
    expect(screen.getByText("President")).toBeInTheDocument();
    expect(screen.getByText("A great leader")).toBeInTheDocument();
  });
});
