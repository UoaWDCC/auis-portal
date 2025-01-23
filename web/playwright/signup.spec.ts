import { test, expect } from "@playwright/test";

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
