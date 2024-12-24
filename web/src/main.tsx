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
import PartnersScreen from "./screens/PartnersScreen.tsx";
import Header from "@components/navigation/Header.tsx";
import MembershipScreen from "./screens/MembershipScreen.tsx";
import EventInformationScreen from "./screens/EventInformationScreen.tsx";
import SignUpInformationScreen from "./screens/SignUpInformationScreen.tsx";
import ErrorScreen from "./screens/ErrorScreen.tsx";
import CheckoutInformationScreen from "./screens/CheckoutInformationScreen.tsx";
import AttendanceScreen from "./screens/AttendanceScreen.tsx";
import EventAttendanceSelectScreen from "./screens/EventAttendanceSelectScreen.tsx";
import { ExecRoute } from "@utils/AdminRouteProtection.tsx";
import { getUserMetaData } from "./api/apiRequests.ts";
import { UserRoute } from "@utils/UserRouteProtection.tsx";

//supertokens code
SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME,
    apiDomain: import.meta.env.VITE_API_URL,
    websiteDomain: import.meta.env.VITE_APP_URL,
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
      let redirectionURL = import.meta.env.VITE_APP_URL + "/";
      try {
        const userMetadata = await getUserMetaData();
        if (userMetadata.status === 200) {
          if (userMetadata.data!.bIsUserInfoComplete === false) {
            redirectionURL =
              import.meta.env.VITE_APP_URL + "/signup/information";
          } else if (
            userMetadata.data!.bIsUserInfoComplete &&
            userMetadata.data!.bIsMembershipPaymentComplete === false
          ) {
            redirectionURL = import.meta.env.VITE_APP_URL + "/membership";
          } else {
            redirectionURL = import.meta.env.VITE_APP_URL + "/";
          }
        } else {
          // Request Failed
          alert("Unknown error occured while trying to fetch user data. ");
        }
      } catch (error) {
        // Error
        alert(
          "There was error after logging in. Please contact the AUIS admin for further assistance."
        );
      }
      return redirectionURL;
    } else if (context.action === "TO_AUTH") {
      return import.meta.env.VITE_APP_URL + "/signup";
    }
  },
});

//Add any routes for screens below
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorScreen />}>
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
      <Route
        path="/checkout/information"
        element={<CheckoutInformationScreen />}
      />
      <Route path="/checkout/payment" element={<CheckoutScreen />} />
      <Route path="/return" element={<ReturnScreen />} />
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
        element={
          <UserRoute>
            <SignUpInformationScreen navbar={<Header />} />
          </UserRoute>
        }
      />
      <Route
        path="/admin/attendance/:id"
        element={
          <ExecRoute>
            <AttendanceScreen navbar={<Header />} />
          </ExecRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <ExecRoute>
            <EventAttendanceSelectScreen navbar={<Header />} />
          </ExecRoute>
        }
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
