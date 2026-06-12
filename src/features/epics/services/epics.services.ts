import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TEpicsInput } from '../validation/validation.epics';

// ^-------------------------Create new epic -------------------------//
export const createEpic = async ({
  data,
  accessToken,
}: {
  data: TEpicsInput & { project_id: string };
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/epics`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create epic');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create epic';
    throw new Error(errMsg);
  }
};
