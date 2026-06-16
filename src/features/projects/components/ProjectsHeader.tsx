import Button from '@/shared/components/ui/Button';
import Link from 'next/link';
import PlusIcon from '@/assets/icons/plus.svg';

const ProjectsHeader: React.FC = ({}) => {
  return (
    <header className="flex justify-between items-end">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold  text-[30px] text-slate-dark capitalize">
          Projects
        </h1>
        <p className="text-secondary">Manage and curate your projects</p>
      </div>
      {/* desktop add project btn */}
      <Button className="lg:w-fit! p-0! font-medium! hidden lg:flex">
        <Link
          href={'/project/add'}
          className="w-full h-full px-6! py-3! flex gap-1.75 items-center"
        >
          <PlusIcon className="text-white size-2.75" />
          Create New Project
        </Link>
      </Button>
    </header>
  );
};

export default ProjectsHeader;
