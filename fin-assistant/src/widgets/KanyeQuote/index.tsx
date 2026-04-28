import { useEffect, useState } from "react";
import styles from "./KanyeQuote.module.css";
import { Card } from "../../shared/ui/Card/Card";
import { Button } from '../../shared/ui/Button/Button';

export const KanyeQuote = () => {
    const [quote, setQuote] = useState("");
    const [translated, setTranslated] = useState("");
    const [mode, setMode] = useState<"en" | "ru">("en");
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        setTranslated("");
        setMode("en");

        try {
            const res = await fetch("https://api.kanye.rest/");
            const data = await res.json();
            setQuote(data.quote);
        } finally {
            setLoading(false);
        }
    };

    const translate = async () => {
        if (!quote) return;

        if (translated) {
            setMode(mode === "en" ? "ru" : "en");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    quote
                )}&langpair=en|ru`
            );

            const data = await res.json();
            setTranslated(data.responseData.translatedText);
            setMode("ru");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const textToShow =
        mode === "ru" && translated
            ? translated
            : quote;

    return (
        <div className={styles.wrapper}>
            {loading ? (
                <span className="loader"></span>
            ) : (
                <>
                    <p className="titleDescriptionModal">
                        “{textToShow}”
                    </p>

                    {/* <span className={styles.author}>
                            — Kanye West
                        </span> */}

                    <div className={styles.actions}>
                        <Button
                            className="smallButtonWhite"
                            onClick={translate}
                        >
                            {mode === "en" ? "Translate quote" : "Show original"}
                        </Button>

                        <Button
                            className="smallButtonWhite"
                            onClick={fetchQuote}
                        >
                            New
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};