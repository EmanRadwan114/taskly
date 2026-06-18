'use client';

import Link from 'next/link';
import React from 'react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import { useParams, usePathname } from 'next/navigation';
import { IProject } from '@/features/projects/types/project.types';

interface IProps {
  projectItem?: IProject;
}

const BreadCrumb: React.FC<IProps> = ({ projectItem }) => {
  const pathname = usePathname();
  const { projectId, epicId } = useParams();

  const segments = pathname
    .split('/')
    .filter((item) => item !== '')
    .slice(1);

  return (
    <header className={`flex gap-2 ${segments.length !== 0 && 'mb-4'}`}>
      {segments.length !== 0 && (
        <Link
          href={'/project'}
          className={`text-secondary/60 text-body-sm uppercase font-bold letter-spacing-xl`}
        >
          Projects
        </Link>
      )}
      {segments.map((segment, index) => {
        if (segment === epicId) return;

        const isLastSegment = index === segments.length - 1;

        const href =
          segment === projectId
            ? `/project/${projectId}/edit`
            : `/project/${segments.slice(0, index + 1).join('/')}`;

        let label =
          segment === projectId && projectItem?.name
            ? projectItem?.name
            : segment.replace(/-/g, ' ');

        if (label.includes('add')) {
          label = 'add new project';
        }

        if (label.includes('new')) {
          label = 'new epic';
        }

        return (
          <div className="flex font-bold gap-2" key={label}>
            <ChevronRightIcon className="text-secondary/40 w-1" />
            {!isLastSegment ? (
              <Link
                href={href}
                className={`text-secondary/60 text-body-sm uppercase letter-spacing-xl`}
              >
                {label}
              </Link>
            ) : (
              <span className="text-primary text-body-sm uppercase letter-spacing-xl">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </header>
  );
};

export default BreadCrumb;
