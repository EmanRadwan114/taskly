'use client';

import Image from 'next/image';
import emptyEpicsImg from '@/assets/imgs/empty-epics.png';
import LinkButton from '@/shared/components/ui/LinkButton';
import EnergyIcon from '@/assets/icons/energy.svg';
import GoalsIcon from '@/assets/icons/goals.svg';
import HeirarchyIcon from '@/assets/icons/heirarchy.svg';
import VelocityIcon from '@/assets/icons/velocity.svg';
import { useParams } from 'next/navigation';

const EmptyEpics: React.FC = ({}) => {
  const { projectId } = useParams();

  const epicsDescData = [
    {
      icon: <GoalsIcon className="w-5.5" />,
      title: 'High-Level Goals',
      desc: 'Define the broad objectives that span across multiple cycles.',
    },
    {
      icon: <HeirarchyIcon className="w-4.5" />,
      title: 'Hierarchy Design',
      desc: `Link individual tasks to parent epics for a consolidated view.`,
    },
    {
      icon: <VelocityIcon className="w-5.5" />,
      title: 'Track Velocity',
      desc: `Visualize percentage completion at a macro project level.`,
    },
  ];
  return (
    <section className="lg:min-h-[80vh] flex items-center justify-center sm:max-w-3/4 xl:max-w-2/3 sm:mx-auto">
      <div>
        <div className="flex flex-col justify-center items-center gap-6 mb-20">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={emptyEpicsImg}
              width={250}
              height={250}
              alt="Empty projects"
              className="backdrop-blur-xs -mb-7"
            />
            <h1 className="font-semibold text-slate-dark text-heading-2 letter-spacing-xs text-center">
              No epics in this project yet.
            </h1>
            <p className="text-center leading-6 letter-spacing-md max-w-2/3 mx-auto">
              Break down your large project into manageable epics to track
              progress better and maintain architectural clarity.
            </p>
          </div>
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            className="backdrop-blur-sm!"
          >
            <EnergyIcon className="text-white w-4" />
            Create First Epic
          </LinkButton>
        </div>

        {/* epics desc */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {epicsDescData?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-lg bg-surface-low p-5"
            >
              <div className="size-10 bg-white rounded-sm flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-slate-dark text-body-lg">
                  {item.title}
                </h2>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default EmptyEpics;
