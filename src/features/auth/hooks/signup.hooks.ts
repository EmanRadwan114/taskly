import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { createUserAccountAction } from '../server-actions/signup.actions';
import { toast } from 'react-toastify';
import { TSignupInput } from '../validation/signup.validation';

export const useCreateAccount = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createUserAccountAction,
    null
  );
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
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
