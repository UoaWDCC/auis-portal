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

import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import ExecScreen from "./screens/ExecScreen.tsx";
import SignUpScreen from "./screens/SignUpScreen.tsx";
import AboutUsScreen from "./screens/AboutUsScreen.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
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
import CheckoutInformationScreen from "./screens/CheckoutInformationScreen.tsx";

// @Ratchet7x5: keys etc need to be parsed before route creation.
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

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
      <Route path="/aboutus" element={<AboutUsScreen navbar={<Header />} />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route
        path="/checkout/information/:id"
        element={<CheckoutInformationScreen />}
      />
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
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ApolloProvider client={graphqlClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApolloProvider>
    </ClerkProvider>
  </React.StrictMode>
);
