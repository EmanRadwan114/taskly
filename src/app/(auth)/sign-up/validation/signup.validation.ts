import { z } from 'zod';

export const signupSchema = z
  .object({
    data: z.object({
      name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters')
        .regex(/^(?=\p{L})(?!.* {2})[\p{L} ]*(?<=\p{L})$/u),
      job_title: z.string().optional(),
    }),
    email: z.email('Please Provide a valid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password Should be at most 64 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.confirm_password === data.password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type TSignupInput = z.infer<typeof signupSchema>;
