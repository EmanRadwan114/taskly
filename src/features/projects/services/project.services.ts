import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TAddProjectInput } from '../validation/project.validation';

// ^------------------------ create project -------------------------
export const createProject = async ({
  data,
  accessToken,
}: {
  data: TAddProjectInput;
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/projects`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create project');
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create project'
    );
  }
};
