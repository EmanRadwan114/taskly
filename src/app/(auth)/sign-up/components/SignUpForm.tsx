import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import PassValidationItem from './PassValidationItem';
import Link from 'next/link';

const SignUpForm: React.FC = ({}) => {
  return (
    <>
      <div className="space-y-8px self-start md:text-center">
        <h1 className="form-headline">Create your workspace</h1>
        <p className="text-slate-md">
          Join the editorial approach to task management.
        </p>
      </div>
      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16px gap-y-24px">
        {/* name */}
        <FormField
          label="name"
          placeholder="Enter your full name"
          containerClassName="md:col-span-2"
          fieldMsg="3-50 characters, letters only."
        />
        {/* email */}
        <FormField
          label="email"
          placeholder="yourname@company.com"
          containerClassName="md:col-span-2"
        />
        {/* job title */}
        <FormField
          label="job title"
          placeholder="e.g. Project Manager"
          containerClassName="md:col-span-2"
          isOptional
        />

        {/* password & confirm password */}
        <FormField
          label="password"
          placeholder="Password"
          containerClassName="md:col-span-1"
          type="password"
        />
        <FormField
          label="confirm password"
          placeholder="Repeat your password"
          containerClassName="md:col-span-1"
          type="password"
        />

        {/* password validation */}
        <div className="hidden md:block space-y-1.75 rounded-8px p-16px bg-slate-lighter md:col-span-2">
          <PassValidationItem label="At least 8 characters" isValid={true} />
          <PassValidationItem label="One uppercase, lowercase, and digit" />
          <PassValidationItem label="One special character" />
        </div>

        {/* submit */}
        <Button className="md:col-span-2 py-14px">Create Account</Button>
      </form>

      {/* sign in link */}
      <div className="flex items-center justify-center gap-x-4px">
        <span className="text-slate-md">Already have an account?</span>
        <Link href="/sign-in" className="text-primary font-semibold">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
