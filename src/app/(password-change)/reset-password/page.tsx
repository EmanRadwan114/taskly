import ExpiredResetPassMsg from '@/features/auth/components/forget-password/ExpiredResetPassMsg';
import ResetPasswordForm from '@/features/auth/components/forget-password/ResetPasswordForm';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ access_token: string }>;
}) {
  const { access_token } = await searchParams;

  if (!access_token) return <ExpiredResetPassMsg />;

  return <ResetPasswordForm accessToken={access_token} />;
}
