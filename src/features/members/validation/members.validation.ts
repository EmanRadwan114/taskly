import { emailValidationSchema } from '@/shared/validation/email.validation';
import { z } from 'zod';

export const inviteMemberSchema = z.object({
  email: emailValidationSchema,
});

export type TInviteMemberInput = z.infer<typeof inviteMemberSchema>;
