import { z } from 'zod';
import {
  confirmPassValidationSchema,
  passwordValidationSchema,
} from '@/shared/validation/password.validation';

// ^ ------------------ forget password schema ------------------
export const forgetPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? 'Email is required'
        : 'Please Provide a valid email',
  }),
});

export type TforgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

// ^ ------------------ reset password schema ------------------
export const resetPasswordSchema = z
  .object({
    password: passwordValidationSchema,
    confirm_password: confirmPassValidationSchema,
  })
  .refine((data) => data.confirm_password === data.password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type TResetPasswordInput = z.infer<typeof resetPasswordSchema>;
