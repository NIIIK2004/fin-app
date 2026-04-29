import { Navigate } from "react-router-dom";
import { useAuth } from "../../../shared/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { SplashScreen } from "../../../pages/splash";

export const ProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user, loading } = useAuth();

    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [isSplashClosing, setIsSplashClosing] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsSplashClosing(true);

            const timer = setTimeout(() => {
                setIsSplashVisible(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (loading) {
        return <SplashScreen isClosing={false} />;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <>
            {children}

            {isSplashVisible && (
                <SplashScreen
                    isClosing={isSplashClosing}
                />
            )}
        </>
    );
};