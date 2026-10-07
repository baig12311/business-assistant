import { z } from 'zod';

export const restockSchema = z.object({
    quantity: z
        .string()
        .min(1, 'Quantity is required')
        .refine((value) => {
            const number = Number(value);
            return Number.isInteger(number) && number >= 1;
        }, '*Quantity must be at least 1'),
});