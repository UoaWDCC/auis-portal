import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Socials from "../../src/components/navigation/Socials";
import {
  FacebookLink,
  InstagramLink,
  LinkedinLink,
  EmailLink,
  TiktokLink,
} from "../../src/data/data";

describe("Socials component", () => {
  it("should render social media links", () => {
    render(<Socials />);
    const socialMediaLinks = [
      {
        name: "Tiktok",
        link: TiktokLink,
      },
      {
        name: "Instagram",
        link: InstagramLink,
      },
      { name: "Facebook", link: FacebookLink },
      { name: "Email", link:"mailto:"+ EmailLink },
      {
        name: "LinkedIn",
        link: LinkedinLink,
      },
    ];

    socialMediaLinks.forEach(({ name, link }) => {
      const socialMediaIcon = screen.getByRole("link", {
        name: new RegExp(name, "i"),
      });
      expect(socialMediaIcon).toHaveAttribute("href",  link);
    });
  });
});
