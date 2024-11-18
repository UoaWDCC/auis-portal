import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

//supertokens
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { SignInAndUpCallback } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";

import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import ExecScreen from "./screens/ExecScreen.tsx";
import SignUpScreen from "./screens/SignUpScreen.tsx";
import AboutUsScreen from "./screens/AboutUsScreen.tsx";
import { graphqlClient } from "./graphql/client.ts";
import CreditsScreen from "./screens/CreditsScreen.tsx";
import SignInScreen from "./screens/SignInScreen.tsx";
import CheckoutScreen from "./screens/CheckoutScreen.tsx";
import ReturnScreen from "./screens/ReturnScreen.tsx";
import EventScreen from "./screens/EventScreen.tsx";
import InformationScreen from "./screens/InformationScreen.tsx";
import PartnersScreen from "./screens/PartnersScreen.tsx";
import Header from "@components/navigation/Header.tsx";
import MembershipScreen from "./screens/MembershipScreen.tsx";
import EventInformationScreen from "./screens/EventInformationScreen.tsx";
import SignUpInformationScreen from "./screens/SignUpInformationScreen.tsx";

//supertokens code
SuperTokens.init({
  enableDebugLogs: true,
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

//Add any routes for screens below
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen navbar={<Header />} />} />
      <Route path="/events" element={<EventScreen navbar={<Header />} />} />
      <Route path="/credits" element={<CreditsScreen navbar={<Header />} />} />
      <Route path="/exec" element={<ExecScreen navbar={<Header />} />} />
      <Route
        path="/sponsors"
        element={<PartnersScreen navbar={<Header />} />}
      />
      <Route path="/login" element={<SignInScreen navbar={<Header />} />} />
      <Route path="/signup" element={<SignUpScreen navbar={<Header />} />} />
      <Route path="/signup/callback/google" element={<SignInAndUpCallback />} />
      <Route path="/aboutus" element={<AboutUsScreen navbar={<Header />} />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/return" element={<ReturnScreen />} />
      <Route path="/userinfo" element={<InformationScreen />} />
      <Route
        path="/membership"
        element={<MembershipScreen navbar={<Header />} />}
      />
      <Route
        path="/events/:id"
        element={<EventInformationScreen navbar={<Header />} />}
      />
      <Route
        path="/signup/information"
        element={<SignUpInformationScreen navbar={<Header />} />}
      />
    </Route>
  )
);

const queryClient = new QueryClient();
const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <ApolloProvider client={graphqlClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApolloProvider>
    </SuperTokensWrapper>
  </React.StrictMode>
);
