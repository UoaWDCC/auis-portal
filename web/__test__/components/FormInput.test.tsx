import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "../../src/components/FormInput";
import React from "react";

describe("FormInput Component", () => {
  it("renders input field", () => {
    render(<FormInput placeholder="e.g Clark" name="firstName" />);
    expect(screen.getByPlaceholderText(/e.g Clark/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <FormInput
        placeholder="e.g Clark"
        name="firstName"
        errorMessage="First Name is Required"
      />
    );
    expect(screen.getByText(/First Name is Required/i)).toBeInTheDocument();
  });

  it("handles input change", () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        placeholder="e.g Clark"
        name="firstName"
        onChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText(/e.g Clark/i);
    fireEvent.change(input, { target: { value: "John" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders radio options", () => {
    const options = ["International", "Domestic"];
    render(<FormInput type="radio" name="residency" options={options} />);

    expect(screen.getByLabelText(/International/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Domestic/i)).toBeInTheDocument();
  });
});
