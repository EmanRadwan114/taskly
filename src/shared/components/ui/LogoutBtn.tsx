'use client';
import { useLogout } from '@/features/auth/hooks/auth.hooks';
import Button from './Button';
import LogoutIcon from '@/assets/icons/logout.svg';

interface Props {
  isCollapsed?: boolean;
}

const LogoutBtn: React.FC<Props> = ({ isCollapsed }) => {
  const { onHandleLogout, isPending } = useLogout();

  return (
    <Button
      variant="ghost"
      className="text-error! leading-5 justify-start gap-12px px-12px! py-10px! hover:text-error-dark! transition-colors duration-500 group"
      onClick={onHandleLogout}
      disabled={isPending}
    >
      <span title="Logout">
        <LogoutIcon
          className={`w-4.25 ${isCollapsed ? 'group-hover:scale-110 mx-auto' : ''}`}
        />
      </span>
      {isPending ? 'Logging Out' : <>{!isCollapsed && <span>logout</span>}</>}
    </Button>
  );
};

export default LogoutBtn;
