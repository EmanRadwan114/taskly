import Image from 'next/image';
import emptyProjectImg from '@/assets/imgs/projects.png';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
const EmptyProjects: React.FC = ({}) => {
  return (
    <section className="lg:min-h-[80vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-11">
        <Image
          src={emptyProjectImg}
          width={250}
          height={250}
          alt="Empty projects"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-semibold text-slate-dark text-heading-2 letter-spacing-xs text-center">
            No Projects
          </h1>
          <p className="text-center leading-6 letter-spacing-md">
            You don’t have any projects yet. Start by defining your first
            architectural workspace to begin tracking tasks and epics.
          </p>
        </div>
        <LinkButton href="/project/add">
          <PlusBorderIcon className="text-white size-5" />
          Create New Project
        </LinkButton>
      </div>
    </section>
  );
};

export default EmptyProjects;
