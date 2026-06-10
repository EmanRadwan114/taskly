import z from 'zod';

// ^ ------------------ add project schema ------------------
export const addProjectSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Project title is required'
          : 'Not a string',
    })
    .min(3, 'Project title must be at least 3 characters')
    .max(100, 'Project title must be at most 100 characters'),
  description: z
    .string()
    .max(500, 'Project description must be at most 500 characters')
    .optional(),
});

export type TAddProjectInput = z.infer<typeof addProjectSchema>;
