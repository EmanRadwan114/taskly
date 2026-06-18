import { projectDescriptionSchema } from '@/shared/validation/project-description.validation';
import z from 'zod';

export const epicsSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Epic title is required' : 'Not a string',
    })
    .min(3, 'Epic title must be at least 3 characters')
    .max(100, 'Epic title must be at most 100 characters'),
  description: projectDescriptionSchema,
  assignee_id: z.string().nullable().optional(),
  deadline: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        const selectedDate = new Date(val).getTime();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today.getTime();
      },
      {
        message: 'Deadline must be today or in the future',
      }
    )
    .optional(),
});

export type TEpicsInput = z.infer<typeof epicsSchema>;
