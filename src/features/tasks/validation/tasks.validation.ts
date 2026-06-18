import { projectDescriptionSchema } from '@/shared/validation/project-description.validation';
import z from 'zod';
import { TaskStatusEnum } from '../types/tasks.types';

// ^ ------------------ add project schema ------------------
export const projectSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Project title is required'
          : 'Not a string',
    })
    .min(3, 'Project title must be at least 3 characters')
    .max(100, 'Project title must be at most 100 characters'),
  description: projectDescriptionSchema,
  status: z
    .enum([
      TaskStatusEnum.TODO,
      TaskStatusEnum.IN_PROGRESS,
      TaskStatusEnum.BLOCKED,
      TaskStatusEnum.IN_REVIEW,
      TaskStatusEnum.READY_FOR_QA,
      TaskStatusEnum.REOPENED,
      TaskStatusEnum.READY_FOR_PRODUCTION,
      TaskStatusEnum.DONE,
    ])
    .optional()
    .default(TaskStatusEnum.TODO),
  assignee_id: z.string().nullable().optional(),
  due_date: z
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

export type TProjectInput = z.infer<typeof projectSchema>;
