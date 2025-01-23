import { test, expect } from "@playwright/test";

// Base file - DELETE LATER 

test("signup1 - membership purchase", async ({ page }) => {
  console.log("Navigating to signup page...");
  await page.goto("http://localhost:5173/");
  await page.getByTestId("Sign-up-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN UP" }).click();

  const errorMessage = await page.locator(
    'div[data-supertokens="inputErrorMessage"]:has-text("This email already exists. Please sign in instead")'
  );

  await page.waitForTimeout(1000);

  console.log("errorMessage: " + (await errorMessage.isVisible()));

  if (await errorMessage.isVisible()) {
    console.log("Trying to exit the test case...");
    test.skip(
      true,
      "User was already signed up. Remove the test user from the database for this case to succeed."
    );
  } else {
    console.log("Filling in user information...");
    await page.getByPlaceholder("Eg. John Smith").click();
    await page
      .getByPlaceholder("Eg. John Smith")
      .pressSequentially("John Smith");
    await page.getByPlaceholder("Eg. John Smith").press("Tab");
    await page
      .getByPlaceholder("Enter 000000000 if you don't")
      .pressSequentially("123456789");
    await page.getByPlaceholder("Enter 000000000 if you don't").press("Tab");
    await page
      .getByPlaceholder("Enter 0000000 if you don't")
      .pressSequentially("00000000");
    await page.getByPlaceholder("Eg. Software Engineering").click();
    await page
      .getByPlaceholder("Eg. Software Engineering")
      .pressSequentially("Software Engineering");
    await page.locator('select[name="yearOfStudy"]').selectOption("1");
    await page
      .locator('select[name="isDomestic"]')
      .selectOption("Domestic Student");
    await page
      .locator('select[name="institution"]')
      .selectOption("The University of Auckland");
    await page.getByRole("button", { name: "Submit!" }).click();

    console.log("Selecting membership and proceeding to payment...");
    await page.getByRole("button", { name: "Purchase" }).nth(1).click();

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
  }
});

test("signup2 - membership purchase", async ({ page }) => {
  console.log("Navigating to signup page...");
  await page.goto("http://localhost:5173/");
  await page.getByTestId("Sign-up-mobile").click();
  await page.getByPlaceholder("Email address").click();
  await page
    .getByPlaceholder("Email address")
    .pressSequentially("test2@example.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").pressSequentially("Password123");
  await page.getByRole("button", { name: "SIGN UP" }).click();

  const errorMessage = await page.locator(
    'div[data-supertokens="inputErrorMessage"]:has-text("This email already exists. Please sign in instead")'
  );

  await page.waitForTimeout(1000);

  console.log("errorMessage: " + (await errorMessage.isVisible()));

  if (await errorMessage.isVisible()) {
    console.log("Trying to exit the test case...");
    test.skip(
      true,
      "User was already signed up. Remove the test user from the database for this case to succeed."
    );
  } else {
    console.log("Filling in user information...");
    await page.getByPlaceholder("Eg. John Smith").click();
    await page
      .getByPlaceholder("Eg. John Smith")
      .pressSequentially("Kate Edgar");
    await page.getByPlaceholder("Eg. John Smith").press("Tab");
    await page
      .getByPlaceholder("Enter 000000000 if you don't")
      .pressSequentially("123456789");
    await page.getByPlaceholder("Enter 000000000 if you don't").press("Tab");
    await page
      .getByPlaceholder("Enter 0000000 if you don't")
      .pressSequentially("11111111");
    await page.getByPlaceholder("Eg. Software Engineering").click();
    await page
      .getByPlaceholder("Eg. Software Engineering")
      .pressSequentially("Computer Science");
    await page.locator('select[name="yearOfStudy"]').selectOption("1");
    await page
      .locator('select[name="isDomestic"]')
      .selectOption("International Student");
    await page
      .locator('select[name="institution"]')
      .selectOption("Auckland University of Technology");
    await page.getByRole("button", { name: "Submit!" }).click();

    console.log("Selecting 6month membership and proceeding to payment...");
    await page.getByRole("button", { name: "Purchase" }).nth(0).click();

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
  }
});

test("signin", async ({ page }) => {
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

test("signin and buy single entry members only shawn thomas ticket", async ({
  page,
}) => {
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

test("signin and buy double entry members only shawn thomas ticket", async ({
  page,
}) => {
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
