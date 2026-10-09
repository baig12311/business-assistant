export const formatAmount = (amount: number) => {
    if (amount >= 1_000_000_000) {
        return `${(amount / 1_000_000_000).toFixed(2).replace(/\.?0+$/, '')}B`;
    }

    if (amount >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`;
    }

    if (amount >= 1_000) {
        return `${(amount / 1_000).toFixed(2).replace(/\.?0+$/, '')}K`;
    }

    return amount.toLocaleString();
};