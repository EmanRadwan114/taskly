import LinkButton from './LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';

interface IProps {
  href: string;
  icon?: React.ReactNode;
  className?: string;
  position?: string;
}

const FloatingLink: React.FC<IProps> = ({
  href,
  icon = <PlusIcon className="text-white size-4.5" />,
  className,
  position,
}) => {
  return (
    <LinkButton
      href={href}
      className={`lg:hidden fixed ${position || 'bottom-20 inset-e-6'} z-99 rounded-3! size-14! shadow-primary! ${className || ''}`}
    >
      {icon}
    </LinkButton>
  );
};

export default FloatingLink;
