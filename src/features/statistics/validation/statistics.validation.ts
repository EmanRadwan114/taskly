import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { differenceInCalendarDays } from 'date-fns';
import z from 'zod';

export const tasksCalendarSchema = z.object({
  // Group the range into a single object for DayPicker compatibility
  dateRange: z
    .object({
      from: z.date({
        error: (issue) =>
          issue.input === undefined ? 'Start date is required' : 'Not a date',
      }),
      to: z.date({
        error: (issue) =>
          issue.input === undefined ? 'End date is required' : 'Not a date',
      }),
    })
    .refine(
      (range) => {
        if (!range.from || !range.to) return false;
        const totalDays = differenceInCalendarDays(range.to, range.from) + 1;
        return totalDays <= 7;
      },
      {
        message: 'The maximum allowed selection window is 7 days.',
      }
    ),
  p_project_id: z.string().nullable().optional(),
  p_status: z.union([
    z.enum(TaskStatusEnum).nullable(),
    z.string().length(0).optional(),
  ]),
});

export type TTasksCalendarInput = z.infer<typeof tasksCalendarSchema>;
