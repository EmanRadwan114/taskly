import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TSignupInput } from '../validation/signup.validation';
import { userLoginAction } from '../server-actions/login.actions';
import { TLoginInput } from '../validation/login.validation';

export const useLogin = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(userLoginAction, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push('/');
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
