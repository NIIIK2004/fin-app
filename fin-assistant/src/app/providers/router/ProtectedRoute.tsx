// import { Navigate } from "react-router-dom";

import type React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    isAuth: boolean;
    children: React.ReactNode;
};

export const ProtectedRoute = ({
    isAuth,
    children,
}: Props) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

