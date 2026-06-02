import { ISignUp } from '../types/signup.types';
import { TLoginInput } from '../validation/login.validation';

// ^------------------------ SignUp -------------------------
export const createUserAccount = async (data: ISignUp) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to create account');

  return result;
};

// ^------------------------ Login -------------------------
export const userLogin = async (data: TLoginInput) => {
  const response = await fetch(
    `${process.env.BASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to login');

  return result;
};
