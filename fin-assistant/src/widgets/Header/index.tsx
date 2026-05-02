import { Hamburger, Settings2 } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../app/providers/auth";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import styles from "./Header.module.css";

type HeaderProps = {
    title?: string;
    logo?: React.ReactNode;
    onSettingsClick?: () => void;
    onHistoryClick?: () => void;
};

export const Header = ({
    title,
    logo,
    onSettingsClick,
    onHistoryClick,
}: HeaderProps) => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <ul className={styles.headerWrapper}>
                <button
                    className={styles.iconButton}
                    onClick={() => setMenuOpen(true)}
                >
                    <Hamburger size={20} />
                </button>

                <li className={styles.center}>
                    {title ? (
                        <h1 className="titleBody">
                            {title}
                        </h1>
                    ) : (
                        <div className="titleBody">
                            Money
                        </div>
                    )}
                </li>

                <li className={styles.right}>
                    <NavLink
                        to="/settings"
                        className={styles.iconButton}
                        style={{ width: "fit-content" }}
                    >
                        <Settings2 size={20} />
                    </NavLink>

                </li>
            </ul>

            <BottomSheet isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}>
                <nav className={styles.menu}>
                    <div className={styles.menuWrapper}>
                        <NavLink
                            to="/home"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.menuBtn
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/history"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.menuBtn
                            }
                        >
                            History
                        </NavLink>

                        <NavLink
                            to="/settings"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.menuBtn
                            }
                        >
                            Settings
                        </NavLink>

                    </div>

                    <button className={styles.menuBtnLogout} onClick={logoutUser}>
                        EXIT
                    </button>
                </nav>

                <h2 className={styles.logoTitle}><Link to="https://solu.id/14577">FIIINIIIK</Link></h2>
            </BottomSheet>
        </header>
    );
};