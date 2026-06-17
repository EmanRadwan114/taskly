'use client';

import React, { useState } from 'react';
import { IProject } from '../types/project.types';
import Link from 'next/link';
import EditIcon from '@/assets/icons/edit.svg';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';

interface IProps {
  project: IProject;
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projectFormatedDate = new Date(project.created_at).toLocaleDateString(
    'en-GB',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <div
      className="relative flex flex-col gap-y-3.5 rounded-lg p-6 bg-white"
      onClick={() => setIsMenuOpen(false)}
    >
      {/* actions  */}
      <header className="flex items-center justify-between">
        <h2 className="text-title-md text-slate-dark capitalize">
          {project?.name}
        </h2>
        <Button
          variant="ghost"
          className="p-1! justify-end w-fit! "
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <DotsIcon className="w-1 text-slate-dark/20" />
        </Button>
        <ul
          className={`absolute list-none bg-background shadow-sm rounded-sm p-2 top-14 inset-e-2.5 w-26 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <li>
            <Link
              href={`/project/${project?.id}/edit`}
              className="flex items-center gap-2 p-0.5"
            >
              <EditIcon className="w-5 text-primary" />
              <span className="text-body-md">Edit</span>
            </Link>
          </li>
        </ul>
      </header>
      <Link
        href={`/project/${project?.id}/epics`}
        className="w-full flex flex-col gap-y-3.5"
      >
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
    </div>
  );
};

export default ProjectCard;
