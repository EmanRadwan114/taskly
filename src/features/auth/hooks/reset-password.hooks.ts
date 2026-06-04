import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { resetPasswordAction } from '../server-actions/reset-password.actions';
import { TResetPasswordInput } from '../validation/reset-password.validation';

// ^---------------------- Reset Password Redirect ------------------------^^
export const useResetPassRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window.location.hash) return;

    const hashValue = window.location.hash.substring(1);

    const params = new URLSearchParams(hashValue);

    const accessToken = params.get('access_token');
    const type = params.get('type');

    if (type === 'recovery')
      router.push(`/reset-password?access_token=${accessToken}`);

    if (!accessToken) toast.error('Invalid or expired reset link.');
  }, []);
};

// ^---------------------- Reset Password Action ------------------------^^
export const useResetPassword = (accessToken: string) => {
  const resetPassWithToken = resetPasswordAction.bind(null, accessToken);

  const [state, formAction, isPending] = useActionState(
    resetPassWithToken,
    null
  );
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state?.success) toast.error(state?.message);
  }, [state]);

  // handlers
  const onHandleResetPassword = (data: TResetPasswordInput) => {
    const formData = new FormData();
    formData.append('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleResetPassword, isPending, state };
};
