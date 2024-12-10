import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import SignInScreen from "../../src/screens/SignInScreen";

//supertokens
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

describe("Sign In Screen", () => {
  //supertokens code
  SuperTokens.init({
    enableDebugLogs: false,
    appInfo: {
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      appName: "AUIS",
      apiDomain: "http://localhost:3000",
      websiteDomain: "http://localhost:5173",
      apiBasePath: "/api/auth",
      websiteBasePath: "/signup",
    },
    disableAuthRoute: true,
    recipeList: [
      ThirdParty.init({
        signInAndUpFeature: {
          providers: [Google.init()],
        },
      }),
      EmailPassword.init(),
      Session.init(),
    ],
    getRedirectionURL: async (context) => {
      if (context.action === "SUCCESS" && context.newSessionCreated) {
        if (context.createdNewUser) {
          // user signed up
          return "/signup/information"; // defaults to "/"
        } else {
          // user signed in
          return "/";
        }
      } else if (context.action === "TO_AUTH") {
        // The user will be taken to this path when they need to login.
        return "/signup"; // return the path where you are rendering the Auth UI
      }
    },
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SuperTokensWrapper>
          <SignInScreen navbar={<></>} />
        </SuperTokensWrapper>
      </MemoryRouter>
    );
  });

  const resizeWindow = (width: number) => {
    global.innerWidth = width;
    fireEvent(window, new Event("resize"));
  };

  it("should render the Peacock logo", () => {
    const peacockLogo = screen.getByAltText("AUIS Peacock Logo");
    expect(peacockLogo).toBeInTheDocument();
  });
  it("should render the Supertokens component", () => {
    const peacockLogo = screen.getByTestId("supertokens-sign-in");
    expect(peacockLogo).toBeInTheDocument();
  });
  it("should render the AUIS logo", () => {
    const auisLogo = screen.getByAltText("AUIS Logo");
    expect(auisLogo).toBeInTheDocument();
  });

  it("should not render the AUIS logo on small screens", () => {
    resizeWindow(500); // Simulate a small screen
    expect(screen.queryByTestId("AUIS Logo")).toBeNull();
  });

  it("should not render the Peacock logo on small screens", () => {
    resizeWindow(500); // Simulate a small screen
    expect(screen.queryByTestId("AUIS Peacock Logo")).toBeNull();
  });
});
