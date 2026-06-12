import { projectDescriptionSchema } from '@/shared/validation/project-description.validation';
import z from 'zod';

// ^ ------------------ add project schema ------------------
export const projectSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Project title is required'
          : 'Not a string',
    })
    .min(3, 'Project title must be at least 3 characters')
    .max(100, 'Project title must be at most 100 characters'),
  description: projectDescriptionSchema,
});

export type TProjectInput = z.infer<typeof projectSchema>;
