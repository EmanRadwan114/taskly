import Link from 'next/link';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';

const AddProjectCard: React.FC = ({}) => {
  return (
    <Link
      href={'/project/add'}
      className="rounded-8px p-24px bg-white flex justify-center items-center gap-y-14px h-full"
    >
      <div className="flex flex-col items-center gap-14px">
        <div className="flex justify-center items-center size-48pz rounded-12px bg-surface-low">
          <PlusBorderIcon className="size-5 text-slate-dark" />
        </div>
        <span className=" text-slate-dark uppercase font-bold">
          Add Project
        </span>
      </div>
    </Link>
  );
};

export default AddProjectCard;
