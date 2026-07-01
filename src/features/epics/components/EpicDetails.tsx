'use client';

import CalenderIcon from '@/assets/icons/calender.svg';
import UnassignIcon from '@/assets/icons/unassigned.svg';
import { IEpics } from '../types/epics.types';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import CloseIcon from '@/assets/icons/close.svg';
import { useForm } from 'react-hook-form';
import { epicsSchema, TEpicsInput } from '../validation/epics.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import EpicIdIcon from '@/assets/icons/epic-id.svg';
import Label from '@/shared/components/ui/Label';
import { useParams, useRouter } from 'next/navigation';
import FormField from '@/shared/components/ui/FormField';
import { useUpdateEpic } from '../hooks/epics.hooks';
import Button from '@/shared/components/ui/Button';
import { useFetchMembers } from '@/shared/hooks/shared.hooks';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { ReactNode, useEffect, useRef } from 'react';

interface IProps {
  epic: IEpics | undefined;
}

const EpicDetails: React.FC<IProps> = ({ epic }) => {
  const { projectId } = useParams();
  const router = useRouter();
  const previousValues = useRef({
    title: epic?.title || '',
    description: epic?.description || '',
    assignee_id: epic?.assignee?.sub || '',
    deadline: epic?.deadline || '',
  });

  const { members } = useFetchMembers(projectId as string);

  const {
    control,
    getValues,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<TEpicsInput>({
    resolver: zodResolver(epicsSchema),
    mode: 'onBlur',
    defaultValues: {
      title: epic?.title,
      description: epic?.description || '',
      assignee_id: epic?.assignee?.sub || '',
      deadline: epic?.deadline,
    },
  });

  const { onHandleSubmitEpic, isPending } = useUpdateEpic(epic?.id as string);

  // handlers
  const handleUpdateEpic = async (fieldName: keyof TEpicsInput) => {
    const isFieldValid = await trigger(fieldName);
    const { isDirty: isFieldDirty } = getFieldState(fieldName);

    const isValueChanged =
      getValues(fieldName) !== previousValues.current[fieldName];

    if (isFieldValid && (isFieldDirty || isValueChanged)) {
      if (fieldName === 'assignee_id' && getValues(fieldName) === '') {
        onHandleSubmitEpic({
          assignee_id: null,
        });
      } else {
        onHandleSubmitEpic({
          [fieldName]: getValues(fieldName),
        });
      }
      // update previous values if field is valid
      previousValues.current[fieldName] = getValues(fieldName) || '';
    }
  };

  const userInitial = getNameInitials(epic?.created_by?.name);
  const formattedDeadline = formateDateString(epic?.deadline, 'en-US');
  const formattedCreatedDate = formateDateString(epic?.created_at, 'en-US');

  const metaLabelStyle = `text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`;
  const metaContentStyle = `font-medium leading-5 text-body text-slate-dark focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;

  const membersOptions = [
    {
      value: '',
      label: 'Unassigned',
      icon: (
        <UserAvatar
          className="bg-surface-dark text-slate-dark/80!"
          content={<UnassignIcon className="w-3 text-secondary" />}
        />
      ),
    },
    ...(members?.map((member) => ({
      value: member?.user_id,
      label: member?.metadata?.name,
      icon: (
        <UserAvatar
          className="bg-surface-dark text-slate-dark/80!"
          content={getNameInitials(member?.metadata?.name)}
        />
      ),
    })) || []),
  ];

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="flex flex-col gap-1 light-gradient pt-6 lg:pt-8 px-6 lg:px-8 lg:border-b lg:border-b-slate-light/15">
        {/* epic id */}
        <div className="flex gap-2 cursor-default">
          <EpicIdIcon className="w-5 text-primary hidden lg:block" />
          <span className="font-bold text-body-xs text-primary lg:text-body-sm leading-4 letter-spacing-md lg:text-slate-dark/40 uppercase">
            {epic?.epic_id}
          </span>
        </div>
        {/* epic title */}
        <div className="flex justify-between items-start">
          <FormField
            control={control}
            name="title"
            label={epic?.title as string}
            placeholder="Enter title"
            isEditing
            disabled={isPending}
            onBlur={(e) => handleUpdateEpic('title')}
            inputClassName="font-bold text-heading-5 leading-6 lg:text-heading-4 text-slate-dark lg:leading-8 capitalize mb-3"
            className="focus-within:border-b focus-within:border-b-primary-container focus-within:rounded-b-none mb-6"
          />

          {/* close btn */}
          <Button
            variant="ghost"
            className="-mt-4 w-fit! p-0.5! items-end!"
            onClick={() => router.back()}
          >
            <CloseIcon className="size-3.5 text-slate-dark/40" />
          </Button>
        </div>
      </div>
      {/* epic info */}
      <div className="flex flex-col gap-5 lg:gap-8 px-6 lg:px-8 pb-6 lg:pb-8">
        {/* details */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="description"
            className="lg:hidden text-label-sm text-secondary uppercase"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            description
          </Label>
          <FormField
            control={control}
            name="description"
            label={epic?.description as string}
            placeholder={`No description provided`}
            isTextArea
            isEditing
            disabled={isPending}
            onBlur={(e) => handleUpdateEpic('description')}
            inputClassName="text-secondary text-body leading-5 lg:text-slate-dark/80 lg:text-body-lg lg:leading-6.5 resize-none min-h-10"
            className="focus-within:border-b focus-within:border-b-primary-container focus-within:rounded-b-none"
          />
        </div>
        {/* meta */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-6">
          {/*1. created by */}
          <div className={`flex flex-col gap-2 cursor-default`}>
            <span
              className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
            >
              created by
            </span>
            <div className="flex items-center gap-2">
              <span>
                <UserAvatar content={userInitial} />
              </span>
              <span className={metaContentStyle}>{epic?.created_by?.name}</span>
            </div>
          </div>
          {/*2. assignee */}
          <div className="flex flex-col gap-2 mb-2 w-full">
            <Label
              htmlFor="assignee_id"
              className={metaLabelStyle}
              activeVariant={errors.assignee_id ? 'error' : 'default'}
            >
              assignee
            </Label>
            <FormField
              control={control}
              name="assignee_id"
              label={epic?.assignee?.name || 'Unassigned'}
              placeholder={`Assign an epic`}
              className={`bg-transparent! ${metaContentStyle} p-0!`}
              isSelect
              isEditing
              disabled={isPending}
              onChange={() => {
                handleUpdateEpic('assignee_id');
              }}
              options={membersOptions}
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center gap-2 cursor-pointer ">
                  <span>{icon}</span>
                  <span>{label as string}</span>
                </div>
              )}
            />
          </div>
          <div className="lg:hidden border-t border-t-slate-dark/30 col-span-2"></div>
          {/*3. deadline */}
          {epic?.deadline && getValues('deadline') && (
            <div className="flex flex-col gap-2 relative">
              <Label
                htmlFor="deadline"
                className={metaLabelStyle}
                activeVariant={errors.deadline ? 'error' : 'default'}
              >
                deadline
              </Label>
              <FormField
                control={control}
                type="date"
                name="deadline"
                label={formattedDeadline}
                inputClassName={`${metaContentStyle} order-2 w-full`}
                className="gap-2! bg-transparent! items-center date relative"
                placeholder="YYYY-MM-DD"
                isEditing={true}
                disabled={isPending}
                onBlur={() => {
                  handleUpdateEpic('deadline');
                }}
                icon={
                  <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
                }
                iconClassName="px-0! py-0!"
              />
            </div>
          )}
          {/*4. created at */}
          <div className={`flex flex-col gap-2 cursor-default`}>
            <span
              className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
            >
              created at
            </span>
            <div className="flex items-center gap-2">
              <span>
                <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
              </span>
              <span className="font-medium leading-5 text-body text-slate-dark">
                {formattedCreatedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicDetails;
