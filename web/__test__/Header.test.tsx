import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import Header from "../src/components/Header";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  const resizeWindow = (width: number) => {
    global.innerWidth = width;
    fireEvent(window, new Event("resize"));
  };

  it("should render the logo", () => {
    const logo = screen.getByAltText("Peacock Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the navigation links", () => {
    const navLinks = ["Events", "About Us", "Leadership Team", "Credits"];
    navLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("should render the login and signup buttons", () => {
    const loginButton = screen.getByText("Log-in");
    const signUpButton = screen.getByText("Sign-up");
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it("should render the mobile menu button on small screens", () => {
    resizeWindow(500); // Simulate a small screen
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  it("should toggle the navigation menu when the menu button is clicked", () => {
    resizeWindow(500); // Simulate a small screen
    const menuButton = screen.getByTestId("menu");
    fireEvent.click(menuButton);
    const closeButton = screen.getByTestId("close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(screen.queryByTestId("close")).toBeNull();
  });

  it("should close the navigation menu when a navigation link is clicked", () => {
    resizeWindow(500); // Simulate a small screen
    const menuButton = screen.getByTestId("menu");
    fireEvent.click(menuButton);
    const link = screen.getByText("Events");
    fireEvent.click(link);
    expect(screen.queryByTestId("close")).toBeNull();
  });

  it("should display navigation links properly on large screens", () => {
    resizeWindow(1024); // Simulate a large screen
    const links = ["Events", "About Us", "Leadership Team", "Credits"];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
