export const formatCurrency = (amount: number, locale: string = "es-ES", currency: string = "EUR"): string =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount)