import { sharedProjectEpicSchema } from '@/shared/validation/shared-project-epics.validation';
import z from 'zod';

// ^ ------------------ add project schema ------------------
export const projectSchema = sharedProjectEpicSchema;

export type TProjectInput = z.infer<typeof projectSchema>;
