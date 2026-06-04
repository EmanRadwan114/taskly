import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
  }, [router]);
};
