import { sharedProjectEpicSchema } from '@/shared/validation/shared-project-epics.validation';
import z from 'zod';

export const epicsSchema = sharedProjectEpicSchema.extend({
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .refine(
      (val) => {
        if (!val) return false;
        const selectedDate = new Date(val).getTime();
        return selectedDate > new Date().getTime();
      },
      {
        message: 'Deadline must be in the future',
      }
    )
    .optional(),
});

export type TEpicsInput = z.infer<typeof epicsSchema>;
