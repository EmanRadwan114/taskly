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
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
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
