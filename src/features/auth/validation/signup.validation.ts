import { passwordValidationSchema } from '@/shared/validation/password.validation';
import { z } from 'zod';

export const signupSchema = z
  .object({
    data: z.object({
      name: z
        .string({
          error: (issue) =>
            issue.input === undefined ? 'Name is required' : 'Not a string',
        })
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters')
        .regex(/^(?=\p{L})(?!.* {2})[\p{L} ]*(?<=\p{L})$/u),
      job_title: z.string().optional(),
    }),
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? 'Email is required'
          : 'Please Provide a valid email',
    }),
    password: passwordValidationSchema,
    confirm_password: z.string({
      error: (issue) =>
        issue.input === undefined
          ? 'Confirm Password is required'
          : 'Not a string',
    }),
  })
  .refine((data) => data.confirm_password === data.password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type TSignupInput = z.infer<typeof signupSchema>;
