import { plans } from '@/lib/constants/plans';
import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { parseBoolean } from '../utils';

export type PaddlePrices = Record<string, {
    total: string;
    customData: Record<string, unknown> | null,
    subtotalNumber: number
    formattedTotals: any,
    totalsNumber: any,
    isSubscribe: boolean
}>;

function normalizeCustomData(customData: Record<string, unknown> | null) {
    if (!customData) return null;

    const normalized = { ...customData };
    const features = normalized.features;

    if (typeof features === 'string') {
        try {
            const parsed = JSON.parse(features);
            if (Array.isArray(parsed)) {
                normalized.features = parsed;
            }
        } catch {
            // Keep original string if parsing fails.
        }
    }

    return normalized;
}

function getLineItems(): PricePreviewParams['items'] {
    const filteredPrices = plans.filter((price) => price.id !== 'free')

    const priceId = filteredPrices.map((tier) => tier.priceId);
    return priceId.flat().map((priceId) => ({ priceId, quantity: 1 }));
}

function getPriceAndCustomData(prices: PricePreviewResponse) {
    return prices.data.details.lineItems.reduce((acc, item) => {
        const customData = normalizeCustomData(
            item.price.customData ?? item.product.customData ?? null,
        );

        acc[item.price.id] = {
            total: item.formattedTotals.total,
            totalsNumber: {
                discount: parseInt(item.totals.discount),
                subtotal: parseInt(item.totals.subtotal),
                tax: parseInt(item.totals.tax),
                total: parseInt(item.totals.total)
            },
            formattedTotals: item.formattedTotals,
            subtotalNumber: parseInt(item.totals.subtotal),
            customData,
            isSubscribe: parseBoolean(customData?.isSubscribe ?? 'false'),
        };
        return acc;
    }, {} as PaddlePrices);
}

export function usePaddlePrices(
    paddle: Paddle | undefined,
    country: string,
): { pricesData: PaddlePrices; loading: boolean } {
    const [pricesData, setPricesData] = useState<PaddlePrices>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
            items: getLineItems(),
            ...(country !== 'OTHERS' && { address: { countryCode: country } }),
        };
        setLoading(true);
        paddle?.PricePreview(paddlePricePreviewRequest as PricePreviewParams).then((prices) => {
            const getPricesAmountResponse = getPriceAndCustomData(prices);
            setPricesData((prevState) => {
                return ({ ...prevState, ...getPricesAmountResponse })

            });
            setLoading(false);
        });
    }, [country, paddle]);
    return { pricesData, loading };
}
