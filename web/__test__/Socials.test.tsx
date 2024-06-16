import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Socials from "../src/components/Socials";

describe("Socials component", () => {
	it("should render social media links", () => {
		render(<Socials />);
		const socialMediaLinks = [
            {
				name: "Instagram",
				link: "https://www.instagram.com/au.indiansociety/?hl=en",
			},
			{ name: "Facebook", link: "https://www.facebook.com/auis.uoa/" },
            { name: "Email", link: "mailto: au.indiansociety@gmail.com" },
			{
				name: "LinkedIn",
				link: "https://www.linkedin.com/company/auindiansociety/",
			},
		];

		socialMediaLinks.forEach(({ name, link }) => {
			const socialMediaIcon = screen.getByRole("link", {
				name: new RegExp(name, "i"),
			});
			expect(socialMediaIcon).toHaveAttribute("href", link);
		});
	});
});
