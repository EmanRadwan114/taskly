import { emailValidationSchema } from '@/shared/validation/email.validation';
import { z } from 'zod';

export const addMemberSchema = z.object({
  email: emailValidationSchema,
});

export type TAddMemberInput = z.infer<typeof addMemberSchema>;
