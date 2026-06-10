import z from 'zod';
import { passwordRegex } from '../utils/variables.utils';

export const passwordValidationSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined ? 'Password is required' : 'Not a string',
  })
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password Should be at most 64 characters')
  .regex(
    passwordRegex,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  );

export const confirmPassValidationSchema = z.string({
  error: (issue) =>
    issue.input === undefined ? 'Confirm Password is required' : 'Not a string',
});
