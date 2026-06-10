import {
  confirmPassValidationSchema,
  passwordValidationSchema,
} from '@/shared/validation/password.validation';
import { z } from 'zod';

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
