export const formatCurrency = (amount: number, locale: string, currency: string): string =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);