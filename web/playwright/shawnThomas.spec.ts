import { test, expect } from "@playwright/test";

test("user1 members only single entry ticket", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("sign-in-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  await page.waitForTimeout(250);

  console.log("navigating to events page...");
  await page.getByRole("link", { name: "Events" }).click();
  await page.waitForTimeout(250);
  await page.getByRole("img", { name: "Dance Series: Shawn Thomas" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Get Tickets$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$15\.00Get Tickets$/ })
    .getByRole("button")
    .click();

  await page.waitForTimeout(250);

  console.log("Filling in checkout information form...");
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().pressSequentially("John Smith");
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).pressSequentially("test@example.com");
  await page.getByRole("textbox").nth(1).press("Tab");
  await page.getByRole("textbox").nth(2).pressSequentially("12345678901");
  await page.getByRole("button", { name: "Continue" }).click();

  const errorMessageLocator = await page.locator("text=An error").isVisible();
  console.log(
    "Is error message visible in checkout info form: ",
    errorMessageLocator
  );

  test.fail(
    errorMessageLocator === true,
    "A paid ticket for this user and event ticket exists already. Delete it from the database for case to succeed. "
  );

  console.log("Filling in Stripe payment form...");
  const paymentFrame = await page
    .locator('iframe[name="embedded-checkout"]')
    .contentFrame();
  await paymentFrame
    .getByPlaceholder("1234 1234 1234")
    .pressSequentially("4242424242424242");
  await paymentFrame.getByPlaceholder("MM / YY").pressSequentially("1242");
  await paymentFrame.getByPlaceholder("CVC").pressSequentially("999");
  await paymentFrame
    .getByPlaceholder("Full name on card")
    .pressSequentially("test");
  await paymentFrame.getByTestId("hosted-payment-submit-button").click();

  console.log("Verifying post-payment URL...");
  await expect(page).toHaveURL(
    /http:\/\/localhost:5173\/return\?session_id=cs_test_.+/
  );

  console.log("Test completed successfully.");
});

// user1 signs in, buys a double entry ticket with another valid member's email added in there
test("user1 members only double entry ticket", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("sign-in-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  //await page.waitForTimeout(250);

  console.log("navigating to events page...");
  await page.getByRole("link", { name: "Events" }).click();
  await page.waitForTimeout(250);
  await page
    .getByRole("heading", { name: "Dance Series: Shawn Thomas" })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Get Tickets$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$28\.00Get Tickets$/ })
    .getByRole("button")
    .click();

  //await page.waitForTimeout(250);

  console.log("Filling in checkout information form...");
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().pressSequentially("John Smith");
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).pressSequentially("test@example.com");
  await page.getByRole("textbox").nth(1).press("Tab");
  await page.getByRole("textbox").nth(2).pressSequentially("12345678901");

  //dance partner email
  await page
    .locator("div")
    .filter({ hasText: /^What is your dance partners' email\?$/ })
    .getByRole("textbox")
    .pressSequentially("test2@example.com");
  //dance partner name
  await page
    .locator("div")
    .filter({ hasText: /^What is your dance partners' name\?$/ })
    .getByRole("textbox")
    .pressSequentially("partner 1");
  //do you have food allergies
  await page
    .locator("div")
    .filter({
      hasText:
        /^Do you have any food allergies\? Examples: Peanuts, Gluten, Milk$/,
    })
    .getByRole("textbox")
    .pressSequentially("No allergies.");

  await page.getByRole("button", { name: "Continue" }).click();

  //const response = await page.waitForResponse(
  //  (response) =>
  //    response.url().includes("api/user/user-ticket-info") &&
  //    response.status() === 500
  //);
  //const responseBody = await response.json();
  //console.log("Specific response detected!", responseBody);

  console.log("Filling in Stripe payment form...");
  const paymentFrame = await page
    .locator('iframe[name="embedded-checkout"]')
    .contentFrame();
  await paymentFrame
    .getByPlaceholder("1234 1234 1234")
    .pressSequentially("4242424242424242");
  await paymentFrame.getByPlaceholder("MM / YY").pressSequentially("1242");
  await paymentFrame.getByPlaceholder("CVC").pressSequentially("999");
  await paymentFrame
    .getByPlaceholder("Full name on card")
    .pressSequentially("test");
  await paymentFrame.getByTestId("hosted-payment-submit-button").click();

  console.log("Verifying post-payment URL...");
  await expect(page).toHaveURL(
    /http:\/\/localhost:5173\/return\?session_id=cs_test_.+/
  );

  await page.getByText("Payment Successful").isVisible();

  console.log("Test completed successfully.");
});

// user1 signs in, buys a double entry ticket with an invalid member's email
test("user1 double entry ticket invalid member email", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("sign-in-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  //await page.waitForTimeout(250);

  console.log("navigating to events page...");
  await page.getByRole("link", { name: "Events" }).click();
  await page.waitForTimeout(250);
  await page
    .getByRole("heading", { name: "Dance Series: Shawn Thomas" })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Get Tickets$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$28\.00Get Tickets$/ })
    .getByRole("button")
    .click();

  //await page.waitForTimeout(250);

  console.log("Filling in checkout information form...");
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().pressSequentially("John Smith");
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).pressSequentially("test@example.com");
  await page.getByRole("textbox").nth(1).press("Tab");
  await page.getByRole("textbox").nth(2).pressSequentially("12345678901");

  //dance partner email
  await page
    .locator("div")
    .filter({ hasText: /^What is your dance partners' email\?$/ })
    .getByRole("textbox")
    .pressSequentially("test4@example.com");
  //dance partner name
  await page
    .locator("div")
    .filter({ hasText: /^What is your dance partners' name\?$/ })
    .getByRole("textbox")
    .pressSequentially("partner 1");
  //do you have food allergies
  await page
    .locator("div")
    .filter({
      hasText:
        /^Do you have any food allergies\? Examples: Peanuts, Gluten, Milk$/,
    })
    .getByRole("textbox")
    .pressSequentially("No allergies.");

  await page.getByRole("button", { name: "Continue" }).click();

  const response = await page.waitForResponse(
    (response) =>
      response.url().includes("api/user/user-ticket-info") &&
      response.status() === 500
  );
  const responseBody = await response.json();
  console.log("Specific response detected!", responseBody);
});
