import React from 'react';
import { IProject } from '../types/project.types';

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
    <div className="rounded-8px p-24px bg-white flex flex-col gap-y-14px h-full">
      <h2 className="text-title-md text-slate-dark capitalize">
        {project?.name}
      </h2>
      <p className="mb-24px">{project?.description}</p>
      <div className="flex justify-between items-end mt-auto">
        <span className="font-bold text-label text-secondary-light uppercase tracking-[-0.55px]">
          Created At
        </span>
        <span className="font-medium text-secondary">
          {projectFormatedDate}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
