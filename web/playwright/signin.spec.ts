import { test } from "@playwright/test";

test("user1 signin", async ({ page }) => {
  await page.setDefaultTimeout(15000);
  await page.goto("http://localhost:5173/");
  await page.getByTestId("sign-in-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN IN" }).click();

  await page.waitForTimeout(2000);
});

test("user2 signin", async ({ page }) => {
  await page.setDefaultTimeout(15000);
  await page.goto("http://localhost:5173/");
  await page.getByTestId("sign-in-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test2@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN IN" }).click();

  await page.waitForTimeout(2000);
});
