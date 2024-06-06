import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestScreen from "../src/screens/Test";
import { describe } from "node:test";

describe("TestScreen component", () => {
  it("should display the 'Test' message", () => {
    render(<TestScreen />);
    const message = screen.getByText(/Test/i);
    expect(message).toBeInTheDocument();
  });
});
