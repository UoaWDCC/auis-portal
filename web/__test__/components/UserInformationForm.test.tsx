import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UserInformationForm from "../../src/components/UserInformationForm";
import React from "react";

describe("UserInformationForm Component", () => {
  it.todo("TESTING");
  // it("renders the form", () => {
  //   render(<UserInformationForm />);
  //   expect(screen.getByText(/Thanks for joining/i)).toBeInTheDocument();
  // });

  // it("validates form fields", async () => {
  //   render(<UserInformationForm />);

  //   const submitButton = screen.getByText(/Purchase membership/i);
  //   fireEvent.click(submitButton);

  //   expect(
  //     await screen.findByText(/First Name is Required/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByText(/Last Name is Required/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByText(/Your University is Required/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByText(/Your Graduation Year is Required/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByText(/Membership Type is Required/i)
  //   ).toBeInTheDocument();
  // });
});
