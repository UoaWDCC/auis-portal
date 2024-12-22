import { MockedProvider } from "@apollo/client/testing";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUpInformationScreen from "../../src/screens/SignUpInformationScreen";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});
const queryClient = new QueryClient();

describe("AboutUsScreen", () => {
  it("renders questions correctly", async () => {
    render(
      <MockedProvider addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SignUpInformationScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    expect(await screen.findByText("Enter your name")).toBeInTheDocument();
    expect(await screen.findByText("University ID number")).toBeInTheDocument();
    expect(
      await screen.findByText("Enter your UPI number")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Enter your field of study")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Enter your year of study")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Enter student study status")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Enter the institute you study at")
    ).toBeInTheDocument();
  });

  it("does not render errors on load up", async () => {
    render(
      <MockedProvider addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SignUpInformationScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );
    expect(await screen.queryByText("Please enter your full name")).toBeNull();
    expect(await screen.queryByText("Please enter your ID number")).toBeNull();
    expect(
      await screen.queryByText("Please enter your field of study")
    ).toBeNull();
    expect(
      await screen.queryByText("Please select a year of study")
    ).toBeNull();
    expect(await screen.queryByText("Please enter your UPI")).toBeNull();
    expect(
      await screen.queryByText("Please select a student status")
    ).toBeNull();
    expect(await screen.queryByText("Please select an institute")).toBeNull();
  });

  it("renders error correctly", async () => {
    render(
      <MockedProvider addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SignUpInformationScreen navbar={<></>} />
          </MemoryRouter>
        </QueryClientProvider>
      </MockedProvider>
    );

    const button = await screen.findByRole("button", {
      name: "Submit!",
    });
    expect(button).toBeDefined();
    await fireEvent.click(button);

    fireEvent.click(button);

    expect(
      await screen.findByText("Please enter your full name")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter your ID number")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter your field of study")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please select a year of study")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter your UPI")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please select a student status")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please select an institute")
    ).toBeInTheDocument();
  });
});
