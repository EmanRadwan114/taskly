import React from 'react';
import { IProject } from '../types/project.types';

interface IProps {
  project: IProject;
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
  return (
    <div className="rounded-8px p-24px bg-white flex flex-col gap-y-14px h-full">
      <h2 className="text-title-md text-slate-dark capitalize">
        Skyline Residence Phase II
      </h2>
      <p className="mb-24px">
        Structural review and aesthetic curation for the high-rise residential
        complex in the downtown district.
      </p>
      <div className="flex justify-between items-end mt-auto">
        <span className="font-bold text-label text-secondary-light uppercase tracking-[-0.55px]">
          Created At
        </span>
        <span className="font-medium text-secondary">12 oct 2026</span>
      </div>
    </div>
  );
};

export default ProjectCard;
