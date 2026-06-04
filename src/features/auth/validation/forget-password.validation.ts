import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? 'Email is required'
        : 'Please Provide a valid email',
  }),
});

export type TforgetPasswordInput = z.infer<typeof forgetPasswordSchema>;
