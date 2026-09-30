import { z } from 'zod';

export const businessSchema = z.object({
    businessName: z
        .string()
        .trim()
        .min(1, '*Business name is required'),

    category: z
        .string()
        .trim()
        .min(1, '*Select Catgory'),

    number: z
        .string()
        .trim()
        .min(1, '*WhatsApp number is required'),

    currency: z
        .string()
        .trim()
        .min(1, '*Select Currency'),
});