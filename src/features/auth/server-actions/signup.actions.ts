'use server';

import z from 'zod';
import { createUserAccount } from '../services/signup.services';
import { signupSchema } from '../validation/signup.validation';

export const createUserAccountAction = async (
  prevState: any,
  formData: FormData
) => {
  const values = {
    data: {
      name: formData.get('name') as string,
      job_title: formData.get('job_title') as string,
    },
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const response = await createUserAccount(values);
    console.log(response);
    return {
      success: true,
      data: response,
      message: 'User account created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
