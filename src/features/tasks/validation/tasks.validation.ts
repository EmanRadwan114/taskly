import { projectDescriptionSchema } from '@/shared/validation/project-description.validation';
import z from 'zod';
import { TaskStatusEnum } from '../types/tasks.types';

// ^ ------------------ add project schema ------------------
export const taskSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Task title is required' : 'Not a string',
    })
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be at most 100 characters'),
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
    ]),
  assignee_id: z.string().nullable().optional(),
  epic_id: z.string().nullable().optional(),
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

export type TTaskInput = z.infer<typeof taskSchema>;
