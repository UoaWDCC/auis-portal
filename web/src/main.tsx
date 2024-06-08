import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import TestScreen from "./screens/Test.tsx";
import ExecScreen from "./screens/ExecScreen.tsx";
import SignUpScreen from "./screens/SignUpScreen.tsx";
import PhotosScreen from "./screens/PhotosScreen.tsx";
import PVVScreen from "./screens/PVVScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";



//Add any routes for screens below
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/"  element={<App />}>
            <Route index={true} element={<HomeScreen />} />
            <Route path="/test" element={<TestScreen />} />
            <Route path="/exec" element={<ExecScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/pvv" element={<PVVScreen />} />
            <Route path="/photos" element={<PhotosScreen />} />
        </Route>
    )
);
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient();
const root = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
