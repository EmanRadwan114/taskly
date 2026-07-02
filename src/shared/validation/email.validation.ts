import z from 'zod';

export const emailValidationSchema = z.email({
  error: (issue) =>
    issue.input === undefined
      ? 'Email is required'
      : 'Please Provide a valid email',
});
