import { z } from 'zod';

export const productSchema = z.object({
    productName: z
        .string()
        .trim()
        .min(1, '*Product name is required'),

    description: z
        .string()
        .trim()
        .optional(),

    price: z
        .string()
        .trim()
        .min(1, '*Selling price is required')
        .refine((value) => !isNaN(Number(value)), {
            message: 'Enter a valid selling price',
        })
        .refine((value) => Number(value) >= 0, {
            message: '*Price cannot be negative',
        }),

    costPrice: z
        .string()
        .trim()
        .min(1, 'Cost price is required')
        .refine((value) => !isNaN(Number(value)), {
            message: '*Enter a valid cost price',
        })
        .refine((value) => Number(value) >= 0, {
            message: '*Cost price cannot be negative',
        }),

    stockQuantity: z
        .string()
        .trim()
        .min(1, '*Stock quantity is required')
        .refine((value) => !isNaN(Number(value)), {
            message: '*Enter a valid stock quantity',
        })
        .refine((value) => Number(value) >= 0, {
            message: '*Stock cannot be negative',
        })
        .refine((value) => Number.isInteger(Number(value)), {
            message: '*Stock must be a whole number',
        }),

    lowStockThreshold: z
        .string()
        .trim()
        .min(1, '*Low stock threshold is required')
        .refine((value) => !isNaN(Number(value)), {
            message: 'Enter a valid threshold',
        })
        .refine((value) => Number(value) >= 0, {
            message: '*Threshold cannot be negative',
        })
        .refine((value) => Number.isInteger(Number(value)), {
            message: '*Threshold must be a whole number',
        }),
});