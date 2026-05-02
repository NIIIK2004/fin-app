export const formatCurrency = (
    value: number
) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
    }).format(value);
};

export const parseNumber = (value: string) => {
    return Number(value.replace(/[^\d]/g, ""));
};

export const formatNumber = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
};

export const formatPercent = (value: number) => {
    return value ? `${value}%` : "";
};