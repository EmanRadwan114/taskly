import LogoImg from '@/assets/icons/logo.svg';
import Link from 'next/link';

const Logo: React.FC = ({}) => {
  return (
    <Link href={'/'} className="flex gap-8px items-center">
      <LogoImg className="w-4.5 text-primary-container" />
      <span className="text-xl leading-7 tracking-[-0.5px] font-bold text-slate-dark uppercase">
        Taskly
      </span>
    </Link>
  );
};

export default Logo;
