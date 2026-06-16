import React from 'react';
import { IProject } from '../types/project.types';
import Link from 'next/link';
import EditIcon from '@/assets/icons/edit.svg';

interface IProps {
  project: IProject;
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
  const projectFormatedDate = new Date(project.created_at).toLocaleDateString(
    'en-GB',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <div className="flex flex-col gap-y-3.5 rounded-lg p-6 bg-white">
      <Link
        href={`/project/${project?.id}/epics`}
        className="w-full flex flex-col gap-y-3.5"
      >
        <h2 className="text-title-md text-slate-dark capitalize">
          {project?.name}
        </h2>
        <p className="mb-6">{project?.description}</p>
        <div className="flex justify-between items-end mt-auto">
          <span className="font-bold text-label text-secondary-light uppercase letter-spacing-sm">
            Created At
          </span>
          <span className="font-medium text-secondary">
            {projectFormatedDate}
          </span>
        </div>
      </Link>
      <div className="flex gap-2 justify-end">
        <Link
          href={`/project/${project?.id}/edit`}
          className="flex justify-end p-0.5"
        >
          <EditIcon className="w-5 text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
