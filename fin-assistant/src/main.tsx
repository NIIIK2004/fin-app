import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./app/layouts/MainLayout";
import { ProtectedRoute } from "./app/providers/router/ProtectedRoute";
import { HistoryPage } from "./pages/history";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/not-found";
import { routes } from "./shared/config/routes";
import { getCurrentUser } from "./shared/lib/auth";
import { CreateGoalPage } from "./pages/create-goal";

const isAuth = !!getCurrentUser();

const router = createBrowserRouter([
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute isAuth={isAuth}>
      <MainLayout />
      // </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.history.slice(1),
        element: <HistoryPage />,
      },
      {
        path: routes.createGoal.slice(1),
        element: <CreateGoalPage />,
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


