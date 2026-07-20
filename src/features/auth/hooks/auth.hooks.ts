import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  createUserAccountAction,
  userLoginAction,
  userLogoutAction,
} from '../server-actions/auth.actions';
import { TLoginInput, TSignupInput } from '../validation/auth.validation';
import { useMutation } from '@tanstack/react-query';

// ^---------------------- Create Account Hook ------------------------
export const useCreateAccount = () => {
  const router = useRouter();
  const redirectToParam = useSearchParams().get('redirectTo');

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await createUserAccountAction(formData);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      if (redirectToParam) {
        router.replace(redirectToParam);
      } else {
        router.replace('/project');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // handlers
  const onHandleCreateAccount = (data: TSignupInput) => {
    const formData = new FormData();
    if (data.data.job_title) {
      formData.append('job_title', data.data.job_title);
    }
    formData.append('name', data.data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    mutate(formData);
  };

  return { onHandleCreateAccount, isPending };
};

// ^---------------------- Login Hook ------------------------
export const useLogin = (rememberMe: boolean) => {
  const router = useRouter();
  const redirectToParam = useSearchParams().get('redirectTo');

  const loginActionRemeberMe = userLoginAction.bind(null, rememberMe);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await loginActionRemeberMe(formData);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      if (redirectToParam) {
        router.replace(redirectToParam);
      } else {
        router.replace('/project');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleLogin = (data: TLoginInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    mutate(formData);
  };

  return { onHandleLogin, isPending };
};

// ^---------------------- Logout Hook ------------------------
export const useLogout = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await userLogoutAction();
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      router.push('/login');
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleLogout = () => {
    mutate();
  };

  return { onHandleLogout, isPending };
};
