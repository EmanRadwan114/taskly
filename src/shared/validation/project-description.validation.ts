import z from 'zod';

export const projectDescriptionSchema = z
  .string()
  .max(500, 'Description must be at most 500 characters')
  .optional();
