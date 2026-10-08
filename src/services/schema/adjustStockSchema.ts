import { z } from 'zod';
export const adjustStockSchema = z.object({
    newStock: z
        .string()
        .min(1, '*New stock is required')
        .refine((value) => {
            const number = Number(value);

            return Number.isInteger(number) && number >= 0;
        }, '*Stock must be a whole number and cannot be negative'),

    reason: z
        .string()
        .min(1, '*Please select a reason'),
});