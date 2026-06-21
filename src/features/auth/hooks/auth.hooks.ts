import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import {
  createUserAccountAction,
  userLoginAction,
  userLogoutAction,
} from '../server-actions/auth.actions';
import { TLoginInput, TSignupInput } from '../validation/auth.validation';

// ^---------------------- Create Account Hook ------------------------
export const useCreateAccount = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createUserAccountAction,
    null
  );
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state) return;

    if (state?.success) {
      toast.success(state.message);
      router.push('/project');
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleCreateAccount = (data: TSignupInput) => {
    const formData = new FormData();
    if (data.data.job_title) {
      formData.append('job_title', data.data.job_title);
    }
    formData.append('name', data.data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleCreateAccount, isPending };
};

// ^---------------------- Login Hook ------------------------
export const useLogin = (rememberMe: boolean) => {
  const router = useRouter();

  const loginActionRemeberMe = userLoginAction.bind(null, rememberMe);
  const [state, formAction, isPending] = useActionState(
    loginActionRemeberMe,
    null
  );
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state) return;

    if (state?.success) {
      toast.success(state.message);
      router.push('/project');
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleLogin = (data: TLoginInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleLogin, isPending };
};

// ^---------------------- Logout Hook ------------------------
export const useLogout = () => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(userLogoutAction, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state) return;

    if (state?.success) {
      router.push('/login');
      toast.success(state.message);
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleLogout = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return { onHandleLogout, isPending };
};
