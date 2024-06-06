import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ExecScreen from "../src/screens/ExecScreen";
import { describe } from "node:test";
import { execs } from "../src/data/data";

describe("ExecScreen component", () => {
  it("should display President", () => {
    render(<ExecScreen execs={execs} />);
    const message = screen.getAllByText(/President/i);
    const president = message[0];
    expect(president).toBeInTheDocument();
  });
});
