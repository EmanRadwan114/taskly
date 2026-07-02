import { useEffect } from 'react';
import {
  forgetPasswordAction,
  resetPasswordAction,
} from '../server-actions/forget-password.actions';
import {
  TforgetPasswordInput,
  TResetPasswordInput,
} from '../validation/forget-password.validation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

// ^---------------------- Forget Password Hook ------------------------
export const useForgetPassword = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await forgetPasswordAction(formData);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleForgetPassword = (data: TforgetPasswordInput) => {
    const formData = new FormData();
    formData.append('email', data.email);

    mutate(formData);
  };

  return { onHandleForgetPassword, isPending, isSuccess };
};

// ^---------------------- Reset Password Redirect Hook ------------------------
export const useResetPassRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window.location.hash) return;

    const hashValue = window.location.hash.substring(1);

    const params = new URLSearchParams(hashValue);

    const accessToken = params.get('access_token');
    const type = params.get('type');

    if (type === 'recovery')
      router.replace(`/reset-password?access_token=${accessToken}`); // Replaces the login#access_token entry

    if (!accessToken) toast.error('Invalid or expired reset link.');
  }, []);
};

// ^---------------------- Reset Password Logic Hook ------------------------
export const useResetPassword = (accessToken: string) => {
  const resetPassWithToken = resetPasswordAction.bind(null, accessToken);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await resetPassWithToken(formData);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleResetPassword = (data: TResetPasswordInput) => {
    const formData = new FormData();
    formData.append('password', data.password);

    mutate(formData);
  };

  return { onHandleResetPassword, isPending };
};
