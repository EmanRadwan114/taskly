import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { userLogoutAction } from '../server-actions/logout.actions';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(userLogoutAction, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
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
