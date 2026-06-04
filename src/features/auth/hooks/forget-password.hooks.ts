import { useActionState, useTransition } from 'react';
import { forgetPasswordAction } from '../server-actions/forget-password.actions';
import { TforgetPasswordInput } from '../validation/forget-password.validation';

export const useForgetPassword = () => {
  const [state, formAction, isPending] = useActionState(
    forgetPasswordAction,
    null
  );
  const [_, startTransition] = useTransition();

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
