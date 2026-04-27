import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./app/layouts/MainLayout";
import { ProtectedRoute } from "./app/providers/router/ProtectedRoute";
import { AuthPage } from "./pages/auth";
import { CreateGoalPage } from "./pages/create-goal";
import { HistoryPage } from "./pages/history";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import "./app/styles/reset.css";
import "./app/styles/global.css";


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
            <HistoryPage />
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
  </React.StrictMode>
);


