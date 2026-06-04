import { useActionState, useEffect, useTransition } from 'react';
import { forgetPasswordAction } from '../server-actions/forget-password.actions';
import { TforgetPasswordInput } from '../validation/forget-password.validation';
import { toast } from 'react-toastify';

export const useForgetPassword = () => {
  const [state, formAction, isPending] = useActionState(
    forgetPasswordAction,
    null
  );
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state?.success) toast.error(state?.message);
  }, [state]);

  // handlers
  const onHandleForgetPassword = (data: TforgetPasswordInput) => {
    const formData = new FormData();
    formData.append('email', data.email);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleForgetPassword, isPending, actionStateResult: state };
};
