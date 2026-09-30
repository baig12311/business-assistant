import { z } from 'zod';

export const customerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, '*Customer name is required'),

    phone: z
        .string()
        .trim()
        .min(1, '*Phone number is required'),

    email: z
        .union([
            z.literal(''),
            z.email('*Enter a valid email'),
        ])
        .optional(),

    address: z
        .string()
        .trim()
        .optional()
        .or(z.literal('')),

    city: z
        .string()
        .trim()
        .optional()
        .or(z.literal('')),
});