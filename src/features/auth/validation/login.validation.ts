import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? 'Email is required'
        : 'Please Provide a valid email',
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Password is required' : 'Not a string',
    })
    .min(1, { error: 'Password is required' }),
});

export type TLoginInput = z.infer<typeof loginSchema>;
