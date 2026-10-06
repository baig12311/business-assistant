import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, '*Name is required'),

    email: z
      .string()
      .trim()
      .min(1, '*Email is required')
      .email('*Enter a valid email'),

    password: z
      .string()
      .min(1, '*Password is required')
      .min(8, '*Password must be at least 8 characters')
      .regex(/[A-Z]/, '*Password must contain an uppercase letter')
      .regex(/[a-z]/, '*Password must contain a lowercase letter')
      .regex(/[0-9]/, '*Password must contain a number')
      .regex(
        /[^A-Za-z0-9]/,
        '*Password must contain a special character',
      ),

    confirmPassword: z
      .string()
      .min(1, '*Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });