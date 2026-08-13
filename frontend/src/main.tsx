import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoutes from "./auth/ProtectedRoutes";
import Canvas from "./pages/Canvas";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import ErrorHandle from "./ErrorHandle";
import Dashboard from "./components/Dashboard";
import "./api";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorHandle />,
      },
      {
        path: "/canvas/:id",
        element: <Canvas />,
        errorElement: <ErrorHandle />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorHandle />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorHandle />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorHandle />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
