'use server';

import { cookies } from 'next/headers';
import { createProject } from '../services/project.services';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { revalidatePath } from 'next/cache';

// ^ ------------------------- Create Project Action ------------------------- //
export const createProjectAction = async (_: unknown, formData: FormData) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const values = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };

  try {
    if (accessToken) {
      await createProject({ data: values, accessToken });
      revalidatePath('/project');
    }

    return {
      success: true,
      message: 'Project created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
