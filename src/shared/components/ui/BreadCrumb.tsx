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
  const { projectId } = useParams();

  const segments = pathname
    .split('/')
    .filter((item) => item !== '')
    .slice(1);

  return (
    <header className={`flex gap-8px ${segments.length !== 0 && 'mb-16px'}`}>
      {segments.length !== 0 && (
        <Link
          href={'/project'}
          className={`text-secondary/60 text-[12px] uppercase font-bold tracking-[1.2px]`}
        >
          Projects
        </Link>
      )}
      {segments.map((segment, index) => {
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
          <div className="flex font-bold gap-8px" key={label}>
            <ChevronRightIcon className="text-secondary/40 w-1" />
            {!isLastSegment ? (
              <Link
                href={href}
                className={`text-secondary/60 text-[12px] uppercase tracking-[1.2px]`}
              >
                {label}
              </Link>
            ) : (
              <span className="text-primary text-[12px] uppercase tracking-[1.2px]">
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
