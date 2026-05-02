import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/Header";

export const MainLayout = () => {
    return (
        <div>
            <Header
                onSettingsClick={() => { }}
                onHistoryClick={() => { }}
            />

            <main>
                <Outlet />
            </main>

            <Toaster
                position="top-center"
                gutter={8}
                toastOptions={{
                    duration: 2500,
                    style: {
                        background: "var(--gray-bg)",
                        color: "var(--black-text)",
                        borderRadius: "100px",
                        padding: "10px 12px",
                        zIndex: 9999,
                        width: "100%",
                        fontSize: "14px",
                    },
                }}
            />
        </div>
    );
};