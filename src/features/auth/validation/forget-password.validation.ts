import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? 'Email is required'
        : 'Please Provide a valid email',
  }),
});

export type forgetPasswordInput = z.infer<typeof forgetPasswordSchema>;
