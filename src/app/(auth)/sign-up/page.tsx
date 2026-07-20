import SignUpForm from '@/features/auth/components/auth/SignUpForm';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />;
    </Suspense>
  );
}
