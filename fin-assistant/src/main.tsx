import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MainLayout } from "./app/layouts/MainLayout";
import { ProtectedRoute } from "./app/providers/router/ProtectedRoute";
import { AuthPage } from "./pages/auth";
import { ComingSoonPage } from "./pages/coming-soon";
import { CreateGoalPage } from "./pages/create-goal";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { TransactionsPage } from "./pages/transactions";
import "./app/styles/reset.css";
import "./app/styles/global.css";
import "./app/styles/fonts.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-goal",
        element: (
          <ProtectedRoute>
            <CreateGoalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <ComingSoonPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);


