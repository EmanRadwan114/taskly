import CalenderIcon from '@/assets/icons/calender.svg';
import UnassignIcon from '@/assets/icons/unassigned.svg';
import EpicAvatar from './EpicAvatar';
import { IEpics } from '../types/epics.types';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import LinkButton from '@/shared/components/ui/LinkButton';
import CloseIcon from '@/assets/icons/close.svg';
import EditableFormField from '@/shared/components/ui/EditableFormField';
import { useForm } from 'react-hook-form';
import { epicsSchema, TEpicsInput } from '../validation/validation.epics';
import { zodResolver } from '@hookform/resolvers/zod';
import EpicIdIcon from '@/assets/icons/epic-id.svg';
import Label from '@/shared/components/ui/Label';
import { useAppSelector } from '@/shared/libs/store/store';
import { useState } from 'react';

interface IProps {
  epic: IEpics;
}

const EpicDetails: React.FC<IProps> = ({ epic }) => {
  const [dateType, setDateType] = useState('text');
  const members = useAppSelector((state) => state.members.members);
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TEpicsInput>({
    resolver: zodResolver(epicsSchema),
    mode: 'onBlur',
    defaultValues: {
      title: epic?.title,
      description: epic?.description,
      assignee_id: epic?.assignee?.sub,
      deadline: epic?.deadline,
    },
  });

  const userInitial = getNameInitials(epic?.created_by?.name!);
  const assigneeInitial = getNameInitials(epic?.assignee?.name!);

  const formattedDeadline = formateDateString(epic?.deadline!, 'en-US');
  const formattedCreatedDate = formateDateString(epic?.created_at, 'en-US');

  const metaLabelStyle = `text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`;

  const metaContentStyle = `font-medium leading-5 text-body text-slate-dark`;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="flex flex-col gap-1 light-gradient pt-6 lg:pt-8 px-6 lg:px-8 lg:border-b lg:border-b-slate-light/15">
        {/* epic id */}
        <div className="flex gap-2">
          <EpicIdIcon className="w-5 text-primary hidden lg:block" />
          <span className="font-bold text-body-xs text-primary lg:text-body-sm leading-4 letter-spacing-md lg:text-slate-dark/40 uppercase">
            {epic?.epic_id}
          </span>
        </div>
        {/* epic title */}
        <div className="flex justify-between items-start">
          <EditableFormField
            inputClassName="font-bold text-heading-5 leading-6 lg:text-heading-4 text-slate-dark lg:leading-8 capitalize mb-6"
            control={control}
            name="title"
            label={epic?.title}
            placeholder="Enter title"
            className="bg-transparent!"
          />

          {/* close btn */}
          <LinkButton
            href=""
            variant="ghost"
            btnClassName="-mt-4"
            className="p-0.5!"
          >
            <CloseIcon className="size-3.5 text-slate-dark/40" />
          </LinkButton>
        </div>
      </div>
      {/* epic info */}
      <div className="flex flex-col gap-5 lg:gap-8 px-6 lg:px-8 pb-6 lg:pb-8">
        {/* details */}
        <div className="flex flex-col gap-2 mb-2">
          <Label
            htmlFor="description"
            className="lg:hidden text-label-sm text-secondary uppercase"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            description
          </Label>
          <EditableFormField
            control={control}
            name="description"
            label={epic?.description || 'No description provided'}
            placeholder={`Provide a high-level overview of the project's architectural objectives and key milestones...`}
            inputClassName="text-secondary text-body leading-5 lg:text-slate-dark/80 lg:text-body-lg lg:leading-6.5 resize-none min-h-10"
            isTextArea
            className="bg-transparent!"
          />
        </div>
        {/* meta */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-y-6">
          {/*1. created by */}
          <div className={`flex flex-col gap-2`}>
            <span
              className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
            >
              created by
            </span>
            <div className="flex items-center gap-2">
              <span>
                <EpicAvatar content={userInitial} />
              </span>
              <span className={metaContentStyle}>{epic?.created_by?.name}</span>
            </div>
          </div>
          {/*2. assignee */}
          <div className="flex flex-col gap-2 mb-2">
            <Label
              htmlFor="assignee_id"
              className={metaLabelStyle}
              activeVariant={errors.assignee_id ? 'error' : 'default'}
            >
              assignee
            </Label>
            <div className="flex items-center gap-2">
              <span>
                <EpicAvatar
                  className="bg-surface-dark text-slate-dark/80!"
                  content={
                    epic?.assignee?.name ? (
                      assigneeInitial
                    ) : (
                      <UnassignIcon className="size-3 text-secondary" />
                    )
                  }
                />
              </span>

              <EditableFormField
                control={control}
                name="assignee_id"
                label={epic?.assignee?.name || 'Unassigned'}
                placeholder={`Assign an epic`}
                className={`bg-transparent! ${metaContentStyle} -ms-0.5`}
                isSelect
              >
                <option value="">{epic?.assignee?.name || 'Unassigned'}</option>
                {members?.map((member) => (
                  <option
                    key={member?.user_id}
                    value={member?.user_id}
                    className={metaContentStyle}
                  >
                    {member?.metadata?.name}
                  </option>
                ))}
              </EditableFormField>
            </div>
          </div>
          <div className="lg:hidden border-t border-t-slate-dark/30 col-span-2"></div>
          {/*3. deadline */}
          {epic?.deadline && (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="deadline"
                className={metaLabelStyle}
                activeVariant={errors.deadline ? 'error' : 'default'}
              >
                deadline
              </Label>
              <Label htmlFor="deadline">
                <EditableFormField
                  control={control}
                  type={dateType}
                  name="deadline"
                  label={formattedDeadline}
                  inputClassName={`${metaContentStyle} order-2 w-full`}
                  className="gap-2! bg-transparent! items-center mt-1"
                  placeholder="YYYY-MM-DD"
                  onFocus={() => setDateType('date')}
                  onBlur={() => setDateType('text')}
                  icon={
                    <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
                  }
                  iconClassName="px-0! py-0!"
                />
              </Label>
            </div>
          )}
          {/*4. created at */}
          <div className={`flex flex-col gap-2`}>
            <span
              className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
            >
              created at
            </span>
            <div className="flex items-center gap-2 mt-1">
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
